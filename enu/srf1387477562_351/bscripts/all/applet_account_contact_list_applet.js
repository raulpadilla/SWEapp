function Account_Contact_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
/*--------------------------------------------------------------------
Description - Created to open outlook when user clicks on Email Field. 
This is a workaround for Siebel Bug. 
Note: Any change to the position of Email Address in weblayout 
should be considered as it would have impact to the below code.
Author - Yogeesha 
Created - 31/10/2011
---------------------------------------------------------------------*/

if(name == "Drilldown")
	{
		var SWEFieldPart = inputPropSet.GetProperty("SWEField");
		var sLastIndex = SWEFieldPart.lastIndexOf("_");
		var sControlId = SWEFieldPart.substring("0", sLastIndex);

		if(sControlId == "s_2_2_64") //Note: Any change to the position of Email Address in weblayout should be considered as it would have impact to the below code.
		{		
			var oBC = this.BusComp();
			var oFieldVale = oBC.GetFieldValue("Email Address");
			
			var objMSOutlook;
			var objNameSpace;
			var objMailMessage;
			
			objMSOutlook = new ActiveXObject("Outlook.Application");
			objNameSpace = objMSOutlook.GetNamespace("MAPI");
			objNameSpace.CurrentUser;
			objMailMessage = objMSOutlook.CreateItem("0"); // Create a new, empty, email
			objMailMessage.Recipients.Add(oFieldVale);
			//Opens the new Outlook email based on the input given above
			objMailMessage.Display();
			return ("CancelOperation");
		 }			
	}
	return ("ContinueOperation");
}

function Account_Contact_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Account_Contact_List_Applet_Applet (null);

Account_Contact_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Account_Contact_List_Applet_Applet.prototype.OnPreInvokeMethod = Account_Contact_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;