function CHEP_Blue_Sheets__By_Position_Report_Parameter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new CHEP_Blue_Sheets__By_Position_Report_Parameter_Applet_Applet (null);

CHEP_Blue_Sheets__By_Position_Report_Parameter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;