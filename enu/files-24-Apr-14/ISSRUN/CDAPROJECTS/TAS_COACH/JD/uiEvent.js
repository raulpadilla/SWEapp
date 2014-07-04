OL.RegisterHandler("DATASET_LOADED", window, "HandleDataSetLoaded",0);
OL.RegisterHandler("DATAONLY_LOADED", window, "HandleDataOnly");
OL.RegisterHandler("INFOONLY_LOADED", window, "HandleInfoOnly");
OL.RegisterHandler("ENGINE_RESULTS_GENERATED", window, "HandleEngineResult",0);
OL.RegisterHandler("UI_RESULTS_DONE", window, "HandleUIResults",0); 
OL.RegisterHandler("UI_TRIGGER_CHANGE", window, "HandleUITriggerChange",0); 
OL.RegisterHandler("UIINFODATA_LOADED", window, "HandleInfoData",0);
function HandleInfoData(event, win, data) { 
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "RegisterUIInfo",data), "uicode");
}
function HandleDataSetLoaded(event,win,data) { 
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "DataSetLoaded",event,win,data), "uicode");
} 
function HandleProductUI(event,win,data) {
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "DataSetLoaded",event,win,data), "uicode");
} 
function HandleDataOnly(event,win,data) {
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "DataOnlyLoaded",event,win,data), "uicode");
} 
function HandleInfoOnly(event,win,data) {
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "InfoOnlyLoaded",event,win,data), "uicode");
} 
/*
function DataLoaded(event, win)
{
OL.WaitForModules(new OL.Function_Obj(OL.prodlistcode, "InitList"), "prodlistcode");
}
*/
function HandleEngineResult(event,win,result) {
OL.WaitForModules(new OL.Function_Obj(OL.uicode, "DisplayResults", result), "uicode");
}
function HandleUIResults(event,win,result,loc) {
OL.WaitForModules(new OL.Function_Obj(OL.cust_ui, "DisplayRes", result, loc), "cust_ui");
}
function HandleUIDataLoaded(event,win,loc) {
OL.WaitForModules(new OL.Function_Obj(OL.cust_ui, "DisplayInp", loc), "cust_ui");
}
function HandleUITriggerChange(event,win,widgetArray,loc) {
OL.WaitForModules(new OL.Function_Obj(OL.cust_ui, "TriggerChange", widgetArray, loc), "cust_ui");
}
