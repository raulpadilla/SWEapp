function Chep_Audit_Plan_Header_Attachment_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	if (( name == "Get_Accounts" ) || ( name == "CreateTemplate" ) || ( name == "ImportSheet" ))
            {                        
                        return( CancelOperation );  
            }
            else 
            {
                        return (ContinueOperation);
            }
}

function Chep_Audit_Plan_Header_Attachment_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Audit_Plan_Header_Attachment_List_Applet_Applet (null);

Chep_Audit_Plan_Header_Attachment_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_Audit_Plan_Header_Attachment_List_Applet_Applet.prototype.OnPreInvokeMethod = Chep_Audit_Plan_Header_Attachment_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;