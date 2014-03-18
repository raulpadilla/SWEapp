function Chep_Group_Audits_List_Applet_With_Stock_Button_Applet_PreInvokeMethod (name, inputPropSet)
{
	return ("ContinueOperation");
}

function Chep_Group_Audits_List_Applet_With_Stock_Button_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Group_Audits_List_Applet_With_Stock_Button_Applet (null);

Chep_Group_Audits_List_Applet_With_Stock_Button_Applet.prototype = new top.JSSAppletShadow ();

Chep_Group_Audits_List_Applet_With_Stock_Button_Applet.prototype.OnPreInvokeMethod = Chep_Group_Audits_List_Applet_With_Stock_Button_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;