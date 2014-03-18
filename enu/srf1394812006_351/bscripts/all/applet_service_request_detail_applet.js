function Service_Request_Detail_Applet_Applet_ChangeFieldValue (field, value)
{
// MEKAA - 12/19/2013 Below Code is to display the prompt for the user to enter escalation details
//R2:000022328368 
   var Org = TheApplication().GetProfileAttr("OrganizationName");
   var postn = TheApplication().GetProfileAttr("Position");

  if(TheApplication().GetProfileAttr("OrganizationName") == "Org USA")
  {
      if(field == "Priority" && value == "0-Critical")
     {
         var sSubstatus = this.BusComp().GetFieldValue("Sub-Status");
         if(sSubstatus == "00-New Critical")
         { 
            var svc = TheApplication().GetService("CHEP Get Email Address");
            var inputs = TheApplication().NewPropertySet();
            var outputs = TheApplication().NewPropertySet();
            inputs.SetProperty("postn",postn);
            outputs = svc.InvokeMethod("CheckPosition",inputs);
            var match = outputs.GetProperty("match");
            if(outputs.GetProperty("match") == "Y")
            {
               alert("Please click on Escalation tab and enter the details");
            }
         }
     }
       
      if(field == "Sub-Status" && value == "00-New Critical")
     {
         var sSubstatus = this.BusComp().GetFieldValue("Priority");
         if(sSubstatus == "0-Critical")
         {
              var svc = TheApplication().GetService("CHEP Get Email Address");
              var inputs = TheApplication().NewPropertySet();
              var outputs = TheApplication().NewPropertySet();
              inputs.SetProperty("postn",postn);
              outputs = svc.InvokeMethod("CheckPosition",inputs);
              var match = outputs.GetProperty("match");
              if(outputs.GetProperty("match") == "Y")
             {
               alert("Please click on Escalation tab and enter the details");
             }
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