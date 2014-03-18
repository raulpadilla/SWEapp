function CHEP_Blue_Sheets__Next_Action_Status_Parameter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new CHEP_Blue_Sheets__Next_Action_Status_Parameter_Applet_Applet (null);

CHEP_Blue_Sheets__Next_Action_Status_Parameter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;