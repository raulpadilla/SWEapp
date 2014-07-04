OL.RegisterHandler("ENGINE_RESULTS_GENERATED",window,"SurveyorGrabEngineResults");
OL.RegisterHandler("INPUT_CHANGED",window,"SurveyorWidgetChangedHandler");
OL.RegisterHandler("DATASET_LOADED", window, "SurveyorDatasetLoadedHandler");
OL.RegisterHandler("ITEM_ADDED",window,"SurveyorItemAddedHandler"); 
OL.RegisterHandler("LINK_CREATED",window,"SurveyorLinkCreatedHandler"); 
OL.RegisterHandler("LINK_SELECTED",window,"SurveyorLinkSelectedHandler"); 
OL.RegisterHandler("EXCEPTION_DISPLAY",window,"SurveyorExceptionDisplayHandler"); 
OL.RegisterHandler("LIST_ITEM_SELECT",window,"SurveyorListItemSelectHandler"); 
function SurveyorGrabEngineResults(event, sender, results) {
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"SaveResults",results),"surveyor");
}
function SurveyorWidgetChangedHandler(event, sender, product, widgetState, instance) {
if(OL.IsLoaded('surveyor')){
if (widgetState.IsReady()) { 
var widget = widgetState.changedInputs;
if (widget.length == 1 || widget.length == 2) {
var delim = OL.GetInstanceDelimeterStr();
var instArray = widget[0].split(delim);
var curInst = instArray.slice(0,instArray.length-1).join(delim);
var currRow = widgetState.GetValue(instArray[instArray.length-1],curInst);
var desc = widgetState.instanceInputs[curInst].featureData.GetTable(instArray[instArray.length-1]).GetRowDesc(currRow);
var data = OL.surveyor.KeyValueToData("Selection", desc) + OL.surveyor.TableRowToData(false);
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","102", instArray[instArray.length-1], data),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}
}			
}
}
function SurveyorDatasetLoadedHandler(event, sender, argList) {
if(OL.IsLoaded('surveyor')){
var data = OL.surveyor.TableRowToData(true);
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","2",argList.product,data),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}
}
function SurveyorItemAddedHandler(event, sender, qty, price, desc, partno) {
if(OL.IsLoaded('surveyor')){
var data = OL.surveyor.KeyValueToData("Qty", qty) +
OL.surveyor.KeyValueToData("Price",price) +
OL.surveyor.KeyValueToData("Desc",desc) +
OL.surveyor.KeyValueToData("Partno",partno) +
OL.surveyor.TableRowToData(false);
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","201","",data),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}
}
function SurveyorLinkCreatedHandler(event, sender, name, label) {
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","4", name, ""),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}
function SurveyorLinkSelectedHandler(event, sender, name) {
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","103", name, ""),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}
function SurveyorExceptionDisplayHandler(event, sender, exception, table, row) {
if(OL.IsLoaded('surveyor')){
var data = OL.surveyor.KeyValueToData("Exstring",exception) +
OL.surveyor.KeyValueToData("Extable",table) +
OL.surveyor.KeyValueToData("Exrow",row) +
OL.surveyor.TableRowToData(false);
OL.surveyor.RegisterEvent("3", "", data);
OL.surveyor.PostEvents();
}
}
function SurveyorListItemSelectHandler(event, sender, item) {
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"RegisterEvent","101", item, ""),"surveyor");
OL.WaitForModules(new OL.Function_Obj(OL.surveyor,"PostEvents"),"surveyor");
}