var ce_module_name = "configEngine";
var ce_module_location = OL.configEngine;
OL.RegisterHandler("INPUT_CHANGED",window,"ConfigEngineInputChangedHandler");
OL.RegisterHandler("DATASET_LOADED",window,"ConfigEngineDataSetLoadedHandler");
OL.RegisterHandler("DATAONLY_LOADED",window,"ConfigEngineDataOnlyLoadedHandler");
function ConfigEngineInputChangedHandler(event, sender, product, inputState, instanceName) {
OL.WaitForModules(new OL.Function_Obj(ce_module_location, "InputChangedHandler", event, sender,
product, inputState, instanceName), ce_module_name);
}
function ConfigEngineDataSetLoadedHandler(event,sender, dataSet) {
OL.WaitForModules(new OL.Function_Obj(ce_module_location, "DataSetLoadedHandler", event, sender, dataSet, true), ce_module_name);
} 
function ConfigEngineDataOnlyLoadedHandler(event,sender, dataSet) {
OL.WaitForModules(new OL.Function_Obj(ce_module_location, "DataSetLoadedHandler", event, sender, dataSet, false), ce_module_name);
} 