function PUB_Activity_BusComp_PreQuery ()
{
var SearchExpr;
SearchExpr = "[Status] ='In Progress' OR [Priority] = 'High'";
this.SetSearchExpr(SearchExpr);
   
this.ExecuteQuery();

	return (ContinueOperation);
}

function PUB_Activity_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new PUB_Activity_BusComp (null);

PUB_Activity_BusComp.prototype = new top.JSSBusCompShadow ();

PUB_Activity_BusComp.prototype.OnPreQuery = PUB_Activity_BusComp_PreQuery;
theApplication = top.theApplication;
TheApplication = top.theApplication;