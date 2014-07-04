function Chep_Drop_List_Status_Applet_Applet_PreInvokeMethod (name, inputPropSet)

{
       
if (name == "Create_Relationships")
{	        
	if(confirm("This will create relationships between the Informer and the Match Account.Are you sure you want to do this"))
	{
	// User clicked OK
		this.BusComp().InvokeMethod("Create_Relationships");
	}
	else
	{
		// User clicked Cancel
		return("CancelOperation");
	}
}

//SM 06-26-2006  Added to throw message on Delete button

if (name=="Delete_DropList")
	{	        
	        if(confirm("This will delete the Drop List and all Detail records.  Are you sure you want to delete the currenct record?"))
	 
		        {
		            // User clicked OK
			  	this.BusComp().InvokeMethod("Delete_DropList");	
				}
			else
				{
				   // User clicked Cancel
					return("CancelOperation");
				}
   }


if (name == "Open_File")
{  
	var SVC;
	var Inputs;
	var Outputs;
	var iReturn ;
	var sDropListPreviewed; 	//Possible values Yes/No
	var sRecordStatus;			//Possible values Yes/No
	var sDeleteRecords;			//Possible values Yes/No

	var sOldRecordExists = "No";
	var sDeleteRecordYesNo = "No";
	var sError = "";
	
	sDropListPreviewed = "No";
	sRecordStatus = "No";
	sDeleteRecords = "No";

	SVC = TheApplication().GetService("Chep Drop List");
	Inputs = TheApplication().NewPropertySet();
	Outputs = TheApplication().NewPropertySet();

	Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
	Inputs.SetProperty("DropListPreviewed", "No");
	Inputs.SetProperty("RecordStatus", "No");
	Inputs.SetProperty("DeleteRecords", "No");
//	Inputs.SetProperty("Account Id", this.BuComp().GetFieldValue("Account Id"));

	SVC.InvokeMethod("Open File", Inputs, Outputs);	//First call
//	iReturn = Outputs.GetProperty("Status");
	sOldRecordExists = TheApplication().GetProfileAttr("OldFileRecords");
TheApplication().SetProfileAttr("OldFileRecords","");
	iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
	sError = TheApplication().GetProfileAttr("OpenFileError");
	if(sError == "ERROR")
	{	
		alert(iReturn);
		TheApplication().SetProfileAttr("OpenFileStatus","");
		TheApplication().SetProfileAttr("OpenFileError","");
		return("CancelOperation");
	}	

	if(sOldRecordExists == "None")
	{
		if(confirm(iReturn))
		{
			Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
			Inputs.SetProperty("DropListPreviewed", "Yes");
			Inputs.SetProperty("RecordStatus", "No");
			Inputs.SetProperty("DeleteRecords", "No");
			SVC.InvokeMethod("Open File", Inputs, Outputs);
			iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
			sError = TheApplication().GetProfileAttr("OpenFileError");
			if(sError == "ERROR")
			{	
				alert(iReturn);
				TheApplication().SetProfileAttr("OpenFileStatus","");
				TheApplication().SetProfileAttr("OpenFileError","");
				return("ContinueOperation");
				//return("CancelOperation");
			}	
/*
			if(confirm(iReturn))
			{
				Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
				Inputs.SetProperty("DropListPreviewed", "Yes");
				Inputs.SetProperty("RecordStatus", "Yes");
				Inputs.SetProperty("DeleteRecords", "No");
				SVC.InvokeMethod("Open File", Inputs, Outputs);
				iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
				sError = TheApplication().GetProfileAttr("OpenFileError");
				if(sError == "ERROR")
				{	
					alert(iReturn);
					TheApplication().SetProfileAttr("OpenFileStatus","");
					TheApplication().SetProfileAttr("OpenFileError","");
					return("CancelOperation");
				}	
			}

			else
				return("CancelOperation");
*/
		}
		else
			return("CancelOperation");
	}			
	else	// sOldRecordExists != "None"
	{
		if(confirm(iReturn))
		{
			Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
			Inputs.SetProperty("DropListPreviewed", "Yes");
			Inputs.SetProperty("RecordStatus", "Yes");
			Inputs.SetProperty("DeleteRecords", "No");
			SVC.InvokeMethod("Open File", Inputs, Outputs);
			iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
			sError = TheApplication().GetProfileAttr("OpenFileError");
			if(sError == "ERROR")
			{	
				alert(iReturn);
				TheApplication().SetProfileAttr("OpenFileStatus","");
				TheApplication().SetProfileAttr("OpenFileError","");
				return("CancelOperation");
			}	
			sDeleteRecordYesNo = TheApplication().GetProfileAttr("DeleteRecords");
			TheApplication().SetProfileAttr("DeleteRecords","No");
			if(sDeleteRecordYesNo == "Yes")
			{
				if(confirm(iReturn))
				{
					Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
					Inputs.SetProperty("DropListPreviewed", "Yes");
					Inputs.SetProperty("RecordStatus", "Yes");
					Inputs.SetProperty("DeleteRecords", "Yes");
					SVC.InvokeMethod("Open File", Inputs, Outputs);
					iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
					sError = TheApplication().GetProfileAttr("OpenFileError");
					if(sError == "ERROR")
					{	
						alert(iReturn);
						TheApplication().SetProfileAttr("OpenFileStatus","");
						TheApplication().SetProfileAttr("OpenFileError","");
						return("ContinueOperation");
						//return("CancelOperation");
					}	
				}
				else
				{
					Inputs.SetProperty("Drop List Id", this.BusComp().GetFieldValue("Id"));
					Inputs.SetProperty("DropListPreviewed", "Yes");
					Inputs.SetProperty("RecordStatus", "Yes");
					Inputs.SetProperty("DeleteRecords", "No");
					SVC.InvokeMethod("Open File", Inputs, Outputs);
					iReturn = TheApplication().GetProfileAttr("OpenFileStatus");
					sError = TheApplication().GetProfileAttr("OpenFileError");
					if(sError == "ERROR")
					{	
						alert(iReturn);
						TheApplication().SetProfileAttr("OpenFileStatus","");
						TheApplication().SetProfileAttr("OpenFileError","");
						return("ContinueOperation");
						//return("CancelOperation");
					}	
				}
			}
		}
		else
			return("CancelOperation");
	}
		
	return("CancelOperation");
}
	return ("ContinueOperation");
}

function Chep_Drop_List_Status_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Drop_List_Status_Applet_Applet (null);

Chep_Drop_List_Status_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_Drop_List_Status_Applet_Applet.prototype.OnPreInvokeMethod = Chep_Drop_List_Status_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;