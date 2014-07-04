function OrderCheck()
{

	var sOrderType, sChannel, iQuantity;
	
	sOrderType = this.GetFieldValue("OrderType");
	sChannel = this.GetFieldValue("Channel");
	iQuantity = ToNumber(this.GetFieldValue("Quantity"));

	if( (sOrderType == "Return") && ((sChannel == "Emitter") || (sChannel == "Participating	Disrtibutor") || (sChannel == "Cooperative Distributor")) &&  (iQuantity <= 270))
	{
	}
}

function CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet_InvokeMethod (name, inputPropSet)
{


}

function CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet_PreInvokeMethod (name, inputPropSet)
{


	if (name == "SubmitToSAP")
	{
		if(confirm(Please review your Order.  Please advise if you would like to submit your order"))
		{
			return("CancelOperation");
		}
	}
	else
	{
		return ("ContinueOperation");
	}
}

function CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet (null);

CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet.prototype = new top.JSSAppletShadow ();

CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet.prototype.OnInvokeMethod = CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet_InvokeMethod;
CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet.prototype.OnPreInvokeMethod = CHEP_Order_Entry__Order_Form_Applet__No_Insert_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;