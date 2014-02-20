function Compatibility_Table_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	return ("ContinueOperation");
}

function Compatibility_Table_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Compatibility_Table_List_Applet_Applet (null);

Compatibility_Table_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Compatibility_Table_List_Applet_Applet.prototype.OnPreInvokeMethod = Compatibility_Table_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;