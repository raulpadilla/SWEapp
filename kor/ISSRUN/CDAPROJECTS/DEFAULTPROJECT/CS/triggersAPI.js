function RegisterCascade(cascadeName) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"RegisterCascade",cascadeName),"triggerscode");
}
function RegisterMVar(mvarName) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"RegisterMVar",mvarName),"triggerscode");
}
function Triggers_PreDatasetLoaded(event,window,data) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"Triggers_PreDatasetLoaded",event,window,data),"triggerscode");
}
function Triggers_AfterInputValueSet(table,selIndex) {
if (!OL.IsLoaded('triggerscode')) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"Triggers_AfterInputValueSet",table,selIndex),"triggerscode");
}
else {
OL.triggerscode.Triggers_AfterInputValueSet(table,selIndex);
}
}
function Triggers_EngineResultsGenerated(event,window,results) {
if (!OL.IsLoaded('triggerscode')) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"Triggers_EngineResultsGenerated",event,window,results),"triggerscode");
}
else {
OL.triggerscode.Triggers_EngineResultsGenerated(event,window,results);
}
}
