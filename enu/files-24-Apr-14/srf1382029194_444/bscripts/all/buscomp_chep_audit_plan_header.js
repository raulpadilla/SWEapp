function Chep_Audit_Plan_Header_BusComp_PreSetFieldValue (fieldName, value)
{

	return (ContinueOperation);
}

function Chep_Audit_Plan_Header_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new Chep_Audit_Plan_Header_BusComp (null);

Chep_Audit_Plan_Header_BusComp.prototype = new top.JSSBusCompShadow ();

Chep_Audit_Plan_Header_BusComp.prototype.OnPreSetFieldValue = Chep_Audit_Plan_Header_BusComp_PreSetFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;