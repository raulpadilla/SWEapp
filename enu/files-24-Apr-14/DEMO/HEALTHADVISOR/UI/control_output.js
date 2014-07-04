/*

  control_output.js


  When        Who   What
  ----------  ---   -----------------------------------
  03/08/2000  JFD   Created.  Done as part of prototype for Ariba.


  This file includes several functions that are highly context sensitive.
  They are intended to be used as part of a solution that enables you to
  selectively create comments in the output page.  This can be used to create
  the appearance of having multiple different output pages.

  Typically, this file is included into n_ui.htm or i4_ui.htm.  It could be
  included elsewhere.  The inclusion code looks something like this:
  <SCRIPT SRC="./control_output.js"></SCRIPT>

  If you are using this file, then you need to follow the guidlines in
  the control_output__README.txt.  The short version is this:
  - model must include a table named CONTROL_OUTPUT
  - table must include a column named INPUT_PAGE
  - names of the input pages must appear in INPUT_PAGE column

*/






/*
  function attempts to map between the page you want (test2, test3, etc)
  and the index value required to correctly set the "CONTROL_OUTPUT" feature
  table via WidgetChanged.

  input:
    new_page -  name of the new input page.  Also needs to be a name present
                in the column CONTROL_OUTPUT.INPUT_PAGE.

  output
    good case - returns the appropriate index.
    bad case  - Pops and alert window and returns -1.

*/
function get_widget_idx(new_page) {
  var widget_idx = -1;
  var table = OL.RefDataTable('CONTROL_OUTPUT');

  // Check whether or not table exists.
  //
  if (table == null) {
    alert('Error in file control_output.js, function get_widget_idx\n\nCONTROL_OUTPUT table does not exist.');
    return widget_idx;
  }

  // Check whether or not column exists.
  //
  if (table[0]['INPUT_PAGE'] == null) {
    alert('Error in file control_output.js, function get_widget_idx\n\nINPUT_PAGE column does not exist.');
    return widget_idx;
  }

  // Now look up the proper value.  Note, this could be done using the
  // engine function LookupTableValue.  Since that's another non-exposed API
  // point, and since this is a trivial loop, I decided to roll my own.
  //
  for (var i=0; i< table.length; i++) {
    if (new_page == table[i]['INPUT_PAGE']) {
      widget_idx = i;
      break;
    }
  }
  if (widget_idx < 0) {
    alert("Error in file control_output.js, function get_widget_idx\n\nKey not found in CONTROL_OUTPUT.INPUT_PAGE.\n\nKey is: " + new_page );
  }
  return widget_idx;
}






/*
  function causes several events to occur:
    - switch to the proper input page
    - change the state of the 'CONTROL_OUTPUT' table and cause the engine
      to run.  In this example, this may change the appearance of the output
      page because comments will be added and/or removed from the HTML.

  See 'get_widget_idx' for additional info.

*/
function switch_input_page(new_page) {
  var widget_idx = get_widget_idx(new_page);
  if (widget_idx >= 0) {
    top.onlink.ol_ui.catpage.location = new_page+'.htm';
    top.onlink.codeset.WidgetChanged('CONTROL_OUTPUT',widget_idx);
  }else{
    // do nothing
  }
}


