function Account_Matching_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{

	var obc = this.BusComp();
	var strAccountId = obc.GetFieldValue("Id");
	var inputs;
	var strNewChepId;
	//var outputs;
		if (name == "ChangeChepId")
		{
		strNewChepId = prompt("Please enter new Chep Id");
		if(strNewChepId != null && strNewChepId.length>0)
		{
		
		        // Ask the user to confirm his input
		        if(confirm("Are you sure you want to change the Chep id for this Account to "+strNewChepId+"?!"))
		        {
		            // User clicked OK
		           
		           	theApplication().SetProfileAttr("NewChepId",strNewChepId);
					theApplication().SetProfileAttr("AccountId",strAccountId);	
			  		this.BusComp().InvokeMethod("ChangeChepId");
				  	
				}
			else
				{
			
				        // User clicked Cancel
					return("CancelOperation");
				 }
		}
		else
				{
		
				        // User clicked cancel, do nothing
					return("CancelOperation");
				} 
		}
		
		if (name == "GetNewChepId")
		{
		        // Ask the user to confirm his input
		        if(confirm("This process will assign a new Chep Id to all the accounts selected by the current query.  Are you sure that you really want to do this?"))
		        {
		        	strFileName = prompt("Please enter File Name");
				if(strFileName != null && strFileName.length>0)
				{
		            // User clicked OK
		          	theApplication().SetProfileAttr("FileName",strFileName);
			  		this.BusComp().InvokeMethod("GetNewChepId");
			  	}
				  	
				}
			else
				{
			
				        // User clicked Cancel
					return("CancelOperation");
				 }
		}
	return("ContinueOperation");

}

function Account_Matching_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Account_Matching_List_Applet_Applet (null);

Account_Matching_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Account_Matching_List_Applet_Applet.prototype.OnPreInvokeMethod = Account_Matching_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;