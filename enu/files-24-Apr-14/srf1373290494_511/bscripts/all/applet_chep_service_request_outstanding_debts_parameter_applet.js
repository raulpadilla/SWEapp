function Chep_Service_Request_Outstanding_Debts_Parameter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Service_Request_Outstanding_Debts_Parameter_Applet_Applet (null);

Chep_Service_Request_Outstanding_Debts_Parameter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;