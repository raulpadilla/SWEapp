OL.RegisterHandler("ENGINE_RESULTS_GENERATED",window,"NB_GrabEngineResults");
OL.RegisterHandler("PRODUCT_SELECTED",window,"LogHistory");
function NB_GrabEngineResults(event, sender, results)
{
if(!OL.IsLoaded('historyList')){
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"NBackGrabEngineResults",results),"historyList");
} else {
OL.historyList.NBackGrabEngineResults(results);
}
}
function LogHistory(event, sender, optArg) {
if(!OL.IsLoaded('historyList')){
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"LogHistory",event, sender, optArg),"historyList");
} else {
OL.historyList.LogHistory(event, sender, optArg);
}
}
