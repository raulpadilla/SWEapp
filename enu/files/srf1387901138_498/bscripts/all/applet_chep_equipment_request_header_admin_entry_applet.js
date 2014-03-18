function Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
try
{
  if (name == "Submit ER" )
  {
     return(ContinueOperation);
  }

}//end try
catch (e)
{
  throw e;
}
	return ("ContinueOperation");
}

function Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet (null);

Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet.prototype.OnPreInvokeMethod = Chep_Equipment_Request_Header_Admin_Entry_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;