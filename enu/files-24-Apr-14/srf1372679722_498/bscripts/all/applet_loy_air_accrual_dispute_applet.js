function LOY_Air_Accrual_Dispute_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
WshShell.Popup("Entered into Method");
if(MethodName=="WriteRecord" || Method=="ExplicitWriteRecord")
{
	var strPartnerName = this.BusComp().GetFieldValue("Partner Name");
	if(strPartnerName == "")
	{
	 TheApplication().RaiseErrorText("Partner Name is Required Field. Enter a value for Partner Name");
	}
}

	return ("ContinueOperation");
}

function LOY_Air_Accrual_Dispute_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new LOY_Air_Accrual_Dispute_Applet_Applet (null);

LOY_Air_Accrual_Dispute_Applet_Applet.prototype = new top.JSSAppletShadow ();

LOY_Air_Accrual_Dispute_Applet_Applet.prototype.OnPreInvokeMethod = LOY_Air_Accrual_Dispute_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;