function CHEP_AIM_Account_BusComp_PreSetFieldValue (fieldName, value)
{

	if (fieldName == "Account Status") 
	{
		if(this.GetFieldValue("Account Status") == "Active" && value == "Inactive")
		{
			l_MsgText = "Please check Products are inactive when making an Account inactive";
			TheApplication().SWEAlert(l_MsgText);
			return (ContinueOperation);
		}
		else if(this.GetFieldValue("Account Status") == "Active" && value == "Closed")
		{
			l_MsgText = "Please check Products are inactive when making an Account Closed";
			TheApplication().SWEAlert(l_MsgText);
			return (ContinueOperation);
		}
	}
	else
	{
		return (ContinueOperation);
	}
      
}

function CHEP_AIM_Account_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new CHEP_AIM_Account_BusComp (null);

CHEP_AIM_Account_BusComp.prototype = new top.JSSBusCompShadow ();

CHEP_AIM_Account_BusComp.prototype.OnPreSetFieldValue = CHEP_AIM_Account_BusComp_PreSetFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;