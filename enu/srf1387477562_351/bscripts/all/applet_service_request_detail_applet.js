function Service_Request_Detail_Applet_Applet_ChangeFieldValue (field, value)
{
// MEKAA - 12/19/2013 Below Code is to display the prompt for the user to enter escalation details
//R2:000022328368 

  if(TheApplication().GetProfileAttr("OrganizationName") == "Org USA")
  {
    
       if(field == "Priority" && value == "0-Critical")
     {
         var sSubstatus = this.BusComp().GetFieldValue("Sub-Status");
         if(sSubstatus == "00-New Critical")
         { 
            var boPosition = TheApplication().GetBusObject("Position");
	        var bcPosition = boPosition.GetBusComp("Position");
	        var oPosRec = null;
	        var sPostnElg = "";
              with(bcPosition)
	            {
	               ClearToQuery();
	               SetViewMode(AllView);
	               ActivateField("Compensatable");
	               SetSearchSpec("Compensatable","Y");
	               ExecuteQuery(ForwardOnly);
	               oPosRec = bcPosition.FirstRecord();
	               //alert(oPosRec);
	               while(oPosRec)
	               { 
	                  bcPosition.ActivateField("Name");
	                  sPostnId = bcPosition.GetFieldValue("Name");
	                  
	                  if(sPostnId == TheApplication().PositionName())
	                  {
	                    alert("Please click on Escalation tab and fill out the details");
	                    oPosRec = null;
	                  }
	                  else {   bcPosition.NextRecord(); }
	               } //while
                 } //with
            }
       }
       
       if(field == "Sub-Status" && value == "00-New Critical")
     {
         var sSubstatus = this.BusComp().GetFieldValue("Priority");
         if(sSubstatus == "0-Critical")
         {
           var boPosition = TheApplication().GetBusObject("Position");
	        var bcPosition = boPosition.GetBusComp("Position");
	        var oPosRec = null;
	        var sPostnElg = "";
              with(bcPosition)
	            {
	               ClearToQuery();
	               SetViewMode(AllView);
	               ActivateField("Compensatable");
	               SetSearchSpec("Compensatable","Y");
	               ExecuteQuery(ForwardOnly);
	               oPosRec = bcPosition.FirstRecord();
	               while(oPosRec)
	               { 
	                  bcPosition.ActivateField("Name");
	                  sPostnId = bcPosition.GetFieldValue("Name");
	                  
	                  if(sPostnId == TheApplication().PositionName())
	                  {
	                    alert("Please click on Escalation tab and fill out the details");
	                    oPosRec = null;
	                  }
	                  else {   bcPosition.NextRecord(); }
	               } //while
                 } //with
         }
     }
  }
}

function Service_Request_Detail_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Service_Request_Detail_Applet_Applet (null);

Service_Request_Detail_Applet_Applet.prototype = new top.JSSAppletShadow ();

Service_Request_Detail_Applet_Applet.prototype.OnChangeFieldValue = Service_Request_Detail_Applet_Applet_ChangeFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;