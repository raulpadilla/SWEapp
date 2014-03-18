/*function Applet_PreInvokeMethod (name, inputPropSet)
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
*/

function Agreement_List_Applet_No_Parent__Read_Only_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Agreement_List_Applet_No_Parent__Read_Only_Applet (null);

Agreement_List_Applet_No_Parent__Read_Only_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;