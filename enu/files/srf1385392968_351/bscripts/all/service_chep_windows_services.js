function CHEP_Windows_Services_Service_PreCanInvokeMethod (methodName)
{
	if (methodName == "BringToTop")
	    return (1);

	return (ContinueOperation);
}

function CHEP_Windows_Services_Service_PreInvokeMethod (methodName, inputPropSet)
{
	if (methodName == "BringToTop")
	{
		window.focus();
	    return ("CancelOperation");
	}
	return ("ContinueOperation");
}

function CHEP_Windows_Services_Service (service)
{
   if (service != null)
   {
      this._service = service;
      service.shadow = this;
   }
}

new CHEP_Windows_Services_Service (null);

CHEP_Windows_Services_Service.prototype = new top.JSSServiceShadow ();

CHEP_Windows_Services_Service.prototype.OnPreCanInvokeMethod = CHEP_Windows_Services_Service_PreCanInvokeMethod;
CHEP_Windows_Services_Service.prototype.OnPreInvokeMethod = CHEP_Windows_Services_Service_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;