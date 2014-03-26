/*****************************************************************************************************
**
** Created By: 	?
** Created On: 	?
** Description: Code added for user input of Manual Chep Id.
**
** Upd On		Upd By				Description
** ----------	--------------		-----------------------------------------------------------
** 21/03/07 	Simon Strudwick		Changed while loop to allow for user cancelling the input box
** 11/24/2009	Shashi				Changed the length of Chep ID from 6 to 15 in While Stmnt.
****************************************************************************************************/
function Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet_PreInvokeMethod (name, inputPropSet)
{
	//Declarations and Instantiations
	var sReturn			= "ContinueOperation";
	var obc 			= this.BusComp();
	var strAccountId 	= obc.GetFieldValue("Id");
	var inputs;
	var srchExp;
	var strNewChepId;

	if (name == "ChangeChepId")
	{
		sReturn		 = "CancelOperation"
		strNewChepId = prompt("Please enter new Chep Id");
	
		if(strNewChepId != null && strNewChepId.length>0)
		{       
			while(strNewChepId.length != 15)
	        {
		        alert("The CHEP Id must be 15 characters long, please try again.");
		        strNewChepId = prompt("Please enter Chep Id");
		        
		        if(strNewChepId == null)
		        	return("CancelOperation");  //SJS - had to force exit here as while loop does not exit properly if users Cancel the input box
	        }
		
			// Ask the user to confirm his input
		    if(confirm("Are you sure you want to change the Chep id for this Account to "+strNewChepId+"?!"))
		    {   
		    	// User clicked OK
		       	theApplication().SetProfileAttr("NewChepId",strNewChepId);
				theApplication().SetProfileAttr("AccountId",strAccountId);
				sReturn	= "ContinueOperation"	
			}
		}
	}
	else if (name == "GetNewChepId")
	{		
		srchExp = obc.GetSearchExpr();
		if( srchExp != "" )
		{
	        // Ask the user to confirm his input
	        if(!confirm("This process will assign a new Chep Id to all the accounts selected by the current query. \n Are you sure that you really want to do this?"))
				sReturn = "CancelOperation";
		}
		else
		{
			alert("Please query for few Account Records");
			sReturn = "CancelOperation";
		}	 
	}

	return(sReturn);

}

function Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet (null);

Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet.prototype = new top.JSSAppletShadow ();

Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet.prototype.OnPreInvokeMethod = Chep_OrgLoc_List_Applet__Change_Chep_Id_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;