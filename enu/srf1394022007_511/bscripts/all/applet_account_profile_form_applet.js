/*****************************************************************************************************
**
** Created By: 	JB
** Created On: 	28 June 2006
** Description: Code added for user input of Manual Chep Id.
**
** Upd On	Upd By			Description
** ------	------			-----------
** 21/03/07 Simon Strudwick	Changed while loop to allow for user cancelling the input box
**
****************************************************************************************************/
function Account_Profile_Form_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	var strNewChepId;
	var bReturn = "ContinueOperation";

	if (name == "ManualChepId")
	{
		bReturn = "CancelOperation";
		strNewChepId = prompt("Please enter Chep Id");

		if(strNewChepId != null && strNewChepId.length>0)
		{
	        // Ask the user to confirm his input
	        while(strNewChepId.length != 6)
	        {
		        alert("The CHEP Id must be 6 characters long, please try again.");
		        strNewChepId = prompt("Please enter Chep Id");
		        
		        if(strNewChepId == null)
		        	return("CancelOperation");  //SJS - had to force exit here as while loop does not exit properly if users Cancel the input box
	        }
		     
		    //If the user has not hit cancel then raise the message to confirm Chep Id   
		    if(strNewChepId != null)
		    {
		        if(confirm("Are you sure you want to change the Chep Id for this Account to "+strNewChepId+"?!"))
		        {
		            // User clicked OK
		           	theApplication().SetProfileAttr("ManualChepId",strNewChepId);
					bReturn = "ContinueOperation";
				}
			}
		}
	}
	return (bReturn);
}

function Account_Profile_Form_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Account_Profile_Form_Applet_Applet (null);

Account_Profile_Form_Applet_Applet.prototype = new top.JSSAppletShadow ();

Account_Profile_Form_Applet_Applet.prototype.OnPreInvokeMethod = Account_Profile_Form_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;