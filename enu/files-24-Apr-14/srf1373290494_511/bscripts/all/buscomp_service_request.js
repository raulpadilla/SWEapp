function Service_Request_BusComp_PreSetFieldValue (fieldName, value)
{

//*******************************************************************************************************************            			
// Mod History                                  				
// Date        Author       Ident      Desc  
// 08/09/2011   Anil Y 		YENUMUA	  Added browser script calling a client side BS for IR# HD0000001283721	
//*******************************************************************************************************************     
        
   try
   {     
     
      if(fieldName == "Status" && value == "Cancelled")
         {  
		 	var strId = this.GetFieldValue("Id"); 
		    var psInputs     = TheApplication().NewPropertySet();
		    var bsService    = TheApplication().GetService("Chep Valid Cancel SR");
   
		    with (psInputs) 
		    {
		     SetProperty("Object Id", strId);
		     }
		    var Op = bsService.InvokeMethod("Validate", psInputs);
		   var strValid = Op.GetProperty("Valid");
         
		   if(strValid == "Y")
		   {
		     if(confirm("You are cancelling a smart script generated Parent Service Request. Cancelling this Parent SR will also cancel the supporting child records which are still open for other teams."))
				 {
				  // TheApplication().SWEAlert("Confirm entered");
				  }
				  else
				  {
				   return("CancelOperation");
				  }
				  
			 }
	
	       }
	       
	return ("ContinueOperation");
	
	}
	
  catch(e)
   {
     //var e = ToString();
     throw e;
    }
  finally
   {
	psInputs = null;
	Op = null;
	strId = null;
	bsService = null;
	strValid = null;
    }
}

function Service_Request_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new Service_Request_BusComp (null);

Service_Request_BusComp.prototype = new top.JSSBusCompShadow ();

Service_Request_BusComp.prototype.OnPreSetFieldValue = Service_Request_BusComp_PreSetFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;