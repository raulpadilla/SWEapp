function Chep_GS_Activities_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	theApplication().SetProfileAttr("GSActivitiesLApplet", theApplication().ActiveApplet().Name());
	theApplication().SetProfileAttr("GSActivitiesBC", theApplication().ActiveBusComp().Name());
	return ("ContinueOperation");
}

function Chep_GS_Activities_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_GS_Activities_List_Applet_Applet (null);

Chep_GS_Activities_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_GS_Activities_List_Applet_Applet.prototype.OnPreInvokeMethod = Chep_GS_Activities_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;