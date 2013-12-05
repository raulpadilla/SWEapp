function LS_CIM_Action_BusComp_PreQuery ()
{
var SearchExpr;
SearchExpr = "[Status] ='In Progress' OR [Priority] = 'High'";
this.SetSearchExpr(SearchExpr);
   
this.ExecuteQuery();

	return (ContinueOperation);
}

function LS_CIM_Action_BusComp (busComp)
{
   if (busComp != null)
   {
      this._busComp = busComp;
      busComp.shadow = this;
   }
}

new LS_CIM_Action_BusComp (null);

LS_CIM_Action_BusComp.prototype = new top.JSSBusCompShadow ();

LS_CIM_Action_BusComp.prototype.OnPreQuery = LS_CIM_Action_BusComp_PreQuery;
theApplication = top.theApplication;
TheApplication = top.theApplication;