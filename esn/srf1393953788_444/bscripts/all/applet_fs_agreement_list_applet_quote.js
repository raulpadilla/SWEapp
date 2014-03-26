function FS_Agreement_List_Applet_Quote_Applet_PreInvokeMethod (name, inputPropSet)
{
	//SM - Code to ask user for confirmation of Cancelling an Agreement.
	
		if (name == "AutoAgreement")
		{
        	// Display the message to the user
		        alert("Please note: This will generate an Agreement within 24 hours to the customer.");
		   }
	return ("ContinueOperation");
	
}

function FS_Agreement_List_Applet_Quote_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new FS_Agreement_List_Applet_Quote_Applet (null);

FS_Agreement_List_Applet_Quote_Applet.prototype = new top.JSSAppletShadow ();

FS_Agreement_List_Applet_Quote_Applet.prototype.OnPreInvokeMethod = FS_Agreement_List_Applet_Quote_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;