function Siebel_Janna_Zone_Adapter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Siebel_Janna_Zone_Adapter_Applet_Applet (null);

Siebel_Janna_Zone_Adapter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;