function Chep_Opportunity_Statistics_Report_Parameter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Opportunity_Statistics_Report_Parameter_Applet_Applet (null);

Chep_Opportunity_Statistics_Report_Parameter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;