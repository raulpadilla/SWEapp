function XMLP_Report_Schedule_Applet_Applet_ChangeFieldValue (field, value)
{
}

function XMLP_Report_Schedule_Applet_Applet_Load ()
{

}

function XMLP_Report_Schedule_Applet_Applet_SetLayout()
{
}

function XMLP_Report_Schedule_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new XMLP_Report_Schedule_Applet_Applet (null);

XMLP_Report_Schedule_Applet_Applet.prototype = new top.JSSAppletShadow ();

XMLP_Report_Schedule_Applet_Applet.prototype.OnChangeFieldValue = XMLP_Report_Schedule_Applet_Applet_ChangeFieldValue;
XMLP_Report_Schedule_Applet_Applet.prototype.OnLoad = XMLP_Report_Schedule_Applet_Applet_Load;
XMLP_Report_Schedule_Applet_Applet.prototype.OnSetLayout = XMLP_Report_Schedule_Applet_Applet_SetLayout;
theApplication = top.theApplication;
TheApplication = top.theApplication;