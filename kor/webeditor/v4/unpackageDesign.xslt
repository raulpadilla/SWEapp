<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>

<xsl:template match="/">
	<xsl:copy-of select="ektdesignpackage_forms/ektdesignpackage_form[1]/ektdesignpackage_designs/ektdesignpackage_design[1]/node()"/>
</xsl:template>

</xsl:stylesheet>
