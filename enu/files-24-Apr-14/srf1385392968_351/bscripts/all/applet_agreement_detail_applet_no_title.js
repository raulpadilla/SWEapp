function Agreement_Detail_Applet_No_Title_Applet_PreInvokeMethod (name, inputPropSet)
{
//SM - Code to ask user for confirmation of Cancelling an Agreement.
	
	
	if (name == "CancelAgreement")
		{
			
        // Ask the user to confirm 
        	
		        if(confirm("You are about to cancel one or more Agreement(s).\n Are you sure you want to do this?"))
		        {	
		        	return ("ContinueOperation");
				}
			    else
				{   // User clicked Cancel
					return("CancelOperation");
				 }
		}

	return ("ContinueOperation");
}

function Agreement_Detail_Applet_No_Title_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Agreement_Detail_Applet_No_Title_Applet (null);

Agreement_Detail_Applet_No_Title_Applet.prototype = new top.JSSAppletShadow ();

Agreement_Detail_Applet_No_Title_Applet.prototype.OnPreInvokeMethod = Agreement_Detail_Applet_No_Title_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;