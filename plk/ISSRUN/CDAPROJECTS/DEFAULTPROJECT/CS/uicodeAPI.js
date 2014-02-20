var IS = OL.IsLoaded;
var WFM = OL.WaitForModules;
var FN = OL.Function_Obj;
function LoadFile(frameName, fileName, path) {
WFM(new FN(OL.uicode,"LoadFile",frameName,fileName,path),"uicode");
}
function StartTemplate(frameName) {
}
function EndTemplate(frameName) {
WFM(new FN(OL.uicode,"EndTemplate",frameName),"uicode");
}
function EndResults(frameName) {
WFM(new FN(OL.uicode,"EndTemplate",frameName),"uicode");
}
function LoadFile(frameName, fileName, path) {
WFM(new FN(OL.uicode,"LoadFile",frameName,fileName,path),"uicode");
}
function LoadFramesInOrder(frFirst,frLast) {
WFM(new FN(OL.uicode,"LoadFramesInOrder",frFirst,frLast),"uicode");
}
function DisplayResults(result) {
WFM(new FN(OL.uicode,"DisplayResults",result),"uicode");
}
function SetInputValue(table,selIndex) {
WFM(new FN(OL.uicode,"SetInputValue",table,selIndex),"uicode");
}
function SelectProduct(pageSet) {
WFM(new FN(OL.uicode,"SelectProduct",pageSet),"uicode");
}
function BuildWidget(type,winObj,name,arg3,arg4,arg5,arg6,arg7,arg8,arg9) {
if(OL.IsLoaded('cust_ui')){
return OL.cust_ui.BuildWidget(type,winObj,name,arg3,arg4,arg5,arg6,arg7,arg8,arg9);
}
}
function BuildTarget(type,winObj,name,arg3,arg4,arg5,arg6,arg7,arg8,arg9) {
if(OL.IsLoaded('cust_ui')){
return OL.cust_ui.BuildTarget(type,winObj,name,arg3,arg4,arg5,arg6,arg7,arg8,arg9);
}
}
function LinkToSubConfig(tableName, window, objArg) {
WFM(new FN(OL.uicode,"LinkToSubConfig",tableName, window, objArg),"uicode");
}
function Label_Obj(widgetName) {
if(!OL.IsLoaded('uicode') || OL.uicode.WIDGET_STATE == null){return;}
var fullName = OL.uicode.CURRINSTANCE +OL.GetInstanceDelimeterStr()+ widgetName;
var instance = OL.GetInstanceFromInstKey(fullName);
var table = OL.GetKeyFromInstKey(fullName);
if (typeof OL.uicode.WIDGET_STATE.GetInstanceInputs(instance) != "undefined" && OL.uicode.WIDGET_STATE.GetInstanceInputs(instance) != null) {
this.dt = OL.uicode.WIDGET_STATE.GetInstanceInputs(instance).featureData.GetTable(table);
} else {
this.dt = null;
}
}
Label_Obj.prototype.GetNumLabels = GetNumLabels;
Label_Obj.prototype.GetLabelName = GetLabelName;
function GetLabelName(index,Name) {
if (this.dt == null) return "";
if (typeof Name == "undefined") {
return this.dt.rows[index].DESC;
}
else {
return this.dt.rows[index][Name];
}	
}
function GetNumLabels() {
if (this.dt == null) return 0;
return this.dt.rows.length;
}
function GetInputValue(InputName) {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetInputValue(InputName);
}
}
function GetResultsValue(widgetName) {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetResultsValue(widgetName);
}
}
function GetCurrInstance() {
if(OL.IsLoaded('uicode')){
return OL.uicode.CURRINSTANCE;
}
}	
function GetInputState() {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetInputState(); 
}	
}
function GetMetaData() {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetMetaData();
}
}
function GetFeatureData() {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetFeatureData();
}
}
function GetProductName() {
if(OL.IsLoaded('uicode')){
return OL.uicode.GetProductName();
}
}
function SetDisplayElementDone(element) {
if (IS("uicode")) {
OL.uicode.SetDisplayElementDone(element);
} else {
WFM(new FN(OL.uicode,"SetDisplayElementDone",element),"uicode");
}
}
function RegisterDisplayElements(elements) {
if (IS("uicode")) {
OL.uicode.RegisterDisplayElements(elements);
} else {
WFM(new FN(OL.uicode,"RegisterDisplayElements",elements),"uicode");
}
}
function RegisterUIElement(element, frame, isTarget) {
if(OL.IsLoaded('uicode')){
return OL.uicode.RegisterUIElement(element,frame,isTarget);
}
}
function SetImage(winobj, mapName, widget, index, targetPict) {
var source = "winobj.document."+mapName+"Img.src=targetPict";
eval(source);
OL.SetInputValue(widget,index);
}
