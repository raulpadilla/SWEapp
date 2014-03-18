#--------------------------------------------------------------------------------------------
#   This script merges a manifest file into another. It can be called with this command line:
#       perl mergemanifest.pl [-s source] -d destination [-f] [-b]
#
#   -s specifies the source manifest file to be read. This switch is optional and defauts to
#   custom.manifest in the folder where this script resides.
#
#   -d specifies the destination manifest file which source will be merged into. This switch
#   is required.
#
#   Both source and destination must exist, although they can be the same file.
#
#   -f and -b are optional and specify "merge to front" and "merge to back", respectively.
#   When both are absent or both are present, it will default to "merge to back",
#   which means the content of source will come after the content of destination.
#
#   Only the CACHE, NETWORK and FALLBACK sections of source will be merged to the
#   corresponding sections of destination.
#
#   If there are more than one sections of CACHE, NETWORK or FALLBACK in a file, they will
#   be consolidated and only one section (if any) of each type will be in the resulting
#   merged file. The consolidation does not change the order of the entries in the files.
#
#   Empty lines will not be included in the resulting file. For duplicate entries, the one
#   in the front will also be excluded and an entry is added to <destination>.log in the folder
#   where destination resides.
#
#   Destination will not be regenerated if the merge results in identical content.
#
#   Created Date: 04/3/13
#--------------------------------------------------------------------------------------------

#!/usr/bin/perl -w
use strict;
use File::Compare;
use Getopt::Std;
use vars qw($opt_s $opt_d $opt_f $opt_b);

$opt_s = "custom.manifest"; # default source

(getopts('s:d:fb')) or die "Usage: perl mergemanifest.pl [-s source] -d destination\n";

# -f indicates "merge to front"
# -b indicates "merge to back"
# Defaults to "merge to back" when both are absent
# When both switches are present, -f wins
my $merge_to_back = 1; # default to "merge after"
if (!$opt_b) {
    # -b is not present, it's up to -f now
    $merge_to_back = !$opt_f;
}
    
($opt_d) or die "Usage: perl mergemanifest.pl [-s source] -d destination\n";

my $log = $opt_d . ".log";
my $tmp = $opt_d . ".tmp";
my @source_manifest;
my @source_cache;
my @source_network;
my @source_fallback;
my @dest_manifest;
my @dest_cache;
my @dest_network;
my @dest_fallback;

# Ensure both input files are present
(-e $opt_s) or die "$opt_s does not exist. Program terminated.\n";
(-e $opt_d) or die "$opt_d does not exist. Program terminated.\n";

load ($opt_s, \@source_manifest, \@source_cache, \@source_network, \@source_fallback);
load ($opt_d, \@dest_manifest, \@dest_cache, \@dest_network, \@dest_fallback);

open (TMPFILE, ">$tmp") or die "Can't open $tmp: $!";
open (LOGFILE, ">$log") or die "Can't open $log: $!";

if ($merge_to_back) {
    append (\@dest_cache, \@source_cache);
    append (\@dest_network, \@source_network);
    append (\@dest_fallback, \@source_fallback);
    output ("CACHE MANIFEST", \@dest_manifest);
    output ("CACHE:", \@dest_cache);
    output ("NETWORK:", \@dest_network);
    output ("FALLBACK:", \@dest_fallback);
}
else {
    append (\@source_cache, \@dest_cache);
    append (\@source_network, \@dest_network);
    append (\@source_fallback, \@dest_fallback);
    output ("CACHE MANIFEST", \@dest_manifest); # Always use the header of destination
    output ("CACHE:", \@source_cache);
    output ("NETWORK:", \@source_network);
    output ("FALLBACK:", \@source_fallback);
}

close (TMPFILE);
close (LOGFILE);

if (compare($opt_d, $tmp) == 0) {
    # Merge result is same as destination, don't regenerate destination
    unlink $tmp;
}
else {
    # Merge result is different from destination, regenerate destination
    rename $tmp, $opt_d;
}

#--------------------------------------------------------------------------------------------
#   Read and split a manifest file into multiple sections
#--------------------------------------------------------------------------------------------
sub load {
    my ($file, $manifest, $cache, $network, $fallback) = @_;
    my $section;

    open (FILE, $file) or die "can't open $file: $!";
    while (<FILE>) {
        if (/^(CACHE MANIFEST|CACHE:|NETWORK:|FALLBACK:)/) {
            $section = $1;
        }
        else {
            if ($section eq "CACHE MANIFEST") { insert ($manifest, $_); }
            elsif ($section eq "CACHE:")      { insert ($cache,    $_); }
            elsif ($section eq "NETWORK:")    { insert ($network,  $_); }
            elsif ($section eq "FALLBACK:")   { insert ($fallback, $_); }
        }
    }
    close (FILE);
}

#--------------------------------------------------------------------------------------------
#   Insert a non-empty item into an array. If it is duplicate, undef the one in the front
#   so that it won't be included in the merged file.
#--------------------------------------------------------------------------------------------
sub insert {
    my ($array, $item) = @_;
    $item = trim ($item);
    if ($item) {
        my $i;
        foreach $i (@$array) {
            if (defined $i && $i eq $item) {
                print LOGFILE "Duplicate entry: $item\n";
                undef $i;
            }
        }
        push @$array, $item;
    }
}

#--------------------------------------------------------------------------------------------
#   Output only defined entries in an array
#--------------------------------------------------------------------------------------------
sub output {
    my ($section, $array) = @_;
    my $count = @$array;
    if ($count) {
        my $i;
        print TMPFILE "$section\n";
        foreach $i (@$array) {
            if (defined $i) {
                print TMPFILE $i . "\n";
            }
        }
    }
}

#--------------------------------------------------------------------------------------------
#   Append array2 to the end of array1
#--------------------------------------------------------------------------------------------
sub append {
    my ($array1, $array2) = @_;
    my $i;
    foreach $i (@$array2) {
        insert ($array1, $i);
    }
}

#--------------------------------------------------------------------------------------------
#   Remove whitespaces from both ends of the input string
#--------------------------------------------------------------------------------------------
sub trim($) {
	my $string = shift;
	$string =~ s/^\s+//;
	$string =~ s/\s+$//;
	return $string;
}