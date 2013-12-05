function Account_No_Link_BusComp_PreSetFieldValue (fieldName, value)
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

function Account_No_Link_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new Account_No_Link_BusComp (null);

Account_No_Link_BusComp.prototype = new top.JSSBusCompShadow ();

Account_No_Link_BusComp.prototype.OnPreSetFieldValue = Account_No_Link_BusComp_PreSetFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;