function Chep_Order_Entry__Order_Form_Applet_Applet_InvokeMethod (name, inputPropSet)
{


}

function Chep_Order_Entry__Order_Form_Applet_Applet_PreInvokeMethod (name, inputPropSet)
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

function Chep_Order_Entry__Order_Form_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Order_Entry__Order_Form_Applet_Applet (null);

Chep_Order_Entry__Order_Form_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_Order_Entry__Order_Form_Applet_Applet.prototype.OnInvokeMethod = Chep_Order_Entry__Order_Form_Applet_Applet_InvokeMethod;
Chep_Order_Entry__Order_Form_Applet_Applet.prototype.OnPreInvokeMethod = Chep_Order_Entry__Order_Form_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;