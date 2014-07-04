function FM_Stops_Assoc_Applet_Applet_Load ()
{





}

function FM_Stops_Assoc_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new FM_Stops_Assoc_Applet_Applet (null);

FM_Stops_Assoc_Applet_Applet.prototype = new top.JSSAppletShadow ();

FM_Stops_Assoc_Applet_Applet.prototype.OnLoad = FM_Stops_Assoc_Applet_Applet_Load;
theApplication = top.theApplication;
TheApplication = top.theApplication;