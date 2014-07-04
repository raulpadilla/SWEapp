function FINS_Action_Claims_BusComp_PreQuery ()
{
var SearchExpr;
SearchExpr = "[Status] ='In Progress' OR [Priority] = 'High'";
this.SetSearchExpr(SearchExpr);
   
this.ExecuteQuery();

	return (ContinueOperation);
}

function FINS_Action_Claims_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new FINS_Action_Claims_BusComp (null);

FINS_Action_Claims_BusComp.prototype = new top.JSSBusCompShadow ();

FINS_Action_Claims_BusComp.prototype.OnPreQuery = FINS_Action_Claims_BusComp_PreQuery;
theApplication = top.theApplication;
TheApplication = top.theApplication;