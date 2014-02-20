function GetConfigVar(module, item)
{
if(CheckConfigModuleLoaded(module)){
var itemVar = module + "_" + item;
if(typeof OL[itemVar] != "undefined"){
return OL[itemVar];
}
}
return null;
}
function SetConfigVar(module, item, newValue)
{
if(CheckConfigModuleLoaded(module)){
var itemVar = module + "_" + item;
if(typeof OL[itemVar] != "undefined"){
OL[itemVar] = newValue;
return true;
}
}
return false;
}
function CheckConfigModuleLoaded(module)
{
var fileVar = module+"_CONFIG_LOADED";
if(!OL[fileVar]){
return false;
}
return true;
}
var SIEBEL_SERVER_URL = OL.GetConfigVarWithDefault("APP", "SIEBEL_SERVER_URL", "");
var PGSSET_DISPLAY_FRAME;
function SetPagesetDisplayArea(frameName) {
PGSSET_DISPLAY_FRAME = frameName;
}
function GetPagesetDisplayArea() {
return PGSSET_DISPLAY_FRAME;
}
function GetVisibleDisplayArea() {
return OL.GetDisplayArea()+".ol_ui";
}
function SetSiebelServerURL(url) {
SIEBEL_SERVER_URL = url;
}
function GetSiebelServerURL() {
return SIEBEL_SERVER_URL;
}
var TOP_LOC = ((OL.location.pathname.lastIndexOf('/')+1)>(OL.location.pathname.lastIndexOf('\\')+1))?OL.location.pathname.slice(0, OL.location.pathname.lastIndexOf('/')+1):OL.location.pathname.slice(0, OL.location.pathname.lastIndexOf('\\')+1);
if (TOP_LOC.charAt(0) == "/" && TOP_LOC.charAt(1)=="\\") TOP_LOC = TOP_LOC.slice(1);
var PG_DIR = "pg/";
var DS_DIR = "ds/";
var CS_DIR = "cs/";
var UI_DIR = "ui/";
var JD_DIR = "jd/";
var CUSTOM_DIR = "custom/";
var DEFAULT_PROJ = ((TOP_LOC.lastIndexOf('/')+1)>(TOP_LOC.lastIndexOf('\\')+1))?TOP_LOC.slice((TOP_LOC.slice(0,TOP_LOC.length-1)).lastIndexOf('/')+1, TOP_LOC.length-1):TOP_LOC.slice((TOP_LOC.slice(0,TOP_LOC.length-1)).lastIndexOf('\\')+1, TOP_LOC.length-1);
var CURRENT_PROJ = DEFAULT_PROJ;
if (OL.GetConfigVar("APP", "PG_DIR") != null) { PG_DIR = OL.GetConfigVar("APP", "PG_DIR"); }
if (OL.GetConfigVar("APP", "DS_DIR") != null) { DS_DIR = OL.GetConfigVar("APP", "DS_DIR"); }
if (OL.GetConfigVar("APP", "CS_DIR") != null) { CS_DIR = OL.GetConfigVar("APP", "CS_DIR"); }
if (OL.GetConfigVar("APP", "UI_DIR") != null) { UI_DIR = OL.GetConfigVar("APP", "UI_DIR"); }
if (OL.GetConfigVar("APP", "JD_DIR") != null) { JD_DIR = OL.GetConfigVar("APP", "JD_DIR"); }
if (OL.GetConfigVar("APP", "CUSTOM_DIR") != null) { CUSTOM_DIR = OL.GetConfigVar("APP", "CUSTOM_DIR"); }	
if (OL.GetConfigVar("APP", "DEFAULT_PROJECT") != null) { DEFAULT_PROJ = OL.GetConfigVar("APP", "DEFAULT_PROJECT"); }	
function SetTopURL(url) {
TOP_LOC = url;
}
function GetTopURL() {
return TOP_LOC;
}
function GetDefaultProject() {
return DEFAULT_PROJ;
}
function GetCurrentProject() {
return CURRENT_PROJ;
}
function SetCurrentProject(proj) {
CURRENT_PROJ = proj;
}
function GetDSURL() {
return TOP_LOC+DS_DIR;
}
function GetCSURL() {
return TOP_LOC+CS_DIR;
}
function GetUIURL() {
return TOP_LOC+UI_DIR;
}
function GetJDURL() {
return TOP_LOC+JD_DIR;
}
function GetPGURL() {
return TOP_LOC+PG_DIR;
}
function GetCUSTOMURL() {
return TOP_LOC+CUSTOM_DIR;
}
GetTopDir = GetTopURL;
GetDSDir = GetDSURL;
GetCSDir = GetCSURL;
GetUIDir = GetUIURL;
GetJDDir = GetJDURL;
GetPGDir = GetPGURL;
GetCUSTOMDir = GetCUSTOMURL;
function OpenDocument(doc, mimeType, replace) {
if (replace) {
doc.open(mimeType, "replace");
} else {
doc.document.open(mimeType);
}
}
function ErrIntern(errorCode){
var errMsg = "";
var extStr = "";
var args = ErrIntern.arguments;
var pattern = /[%]\d+/;
extStr += ExtString(errorCode);
for(i=0;extStr.search(pattern) != -1 && i<args.length-1; i++){
extStr = extStr.replace(pattern, args[i+1]);
}
return extStr;
}
function ExtString (strCode){
var str;
str = OL._SWEgetMessage(strCode);
return str;
}
function FrameToString(frame) {
if (frame.parent == frame) return "top";
return (FrameToString(frame.parent)+"."+frame.name);
}
function FrameToOLString(frame) {
var frName = ""
var fr = frame;
var displayArea = eval(OL.GetDisplayArea());
var visDisplayArea = (typeof displayArea!="undefined")?displayArea.ol_ui:null;
while (fr != visDisplayArea && fr != OL && fr != top) {
if (typeof fr.name == "unknown") return "";
frName = (frName!="")?fr.name+"."+frName:fr.name;
fr = fr.parent;
}
if (fr==visDisplayArea) return OLStr+".ol_ui"+((frName.length>0)?".":"")+frName;	
if (fr==OL) return OLStr+"."+frName;	
if (fr==top) return "top."+frName;
return frName;
}
function FrameStrToOLFrameStr(frameStr) {
var OLVisFrameStr = OL.GetDisplayArea()+".ol_ui";
var OLVisIndex = frameStr.indexOf(OLVisFrameStr);
if (OLVisIndex > -1) {
return OLStr+".ol_ui"+frameStr.slice(OLVisIndex+OLVisFrameStr.length);
} else {
var OLFrameStr = FrameToString(OL);
var OLIndex = frameStr.indexOf(OLFrameStr);
if (OLIndex == -1) {
return frameStr;
} else {
return OLStr+frameStr.slice(OLIndex+OLFrameStr.length);
}
}
}
var OVERRIDE_ORIGINAL_FN = new Array();
function OverrideFunction(fnName, fnPointer) {
OVERRIDE_ORIGINAL_FN[fnName] = OL[fnName];
OL[fnName] = fnPointer;
}
function ClearOverrideFunction(fnName) {
OL[fnName] = OVERRIDE_ORIGINAL_FN[fnName];
}
function ClearAllOverrideFunctions() {
for (fnName in OVERRIDE_ORIGINAL_FN) {
ClearOverrideFunction(fnName);
}
OVERRIDE_ORIGINAL_FN = new Array();
}
function GetOriginalFunction(fnName) {
return OVERRIDE_ORIGINAL_FN[fnName];
}
function ConvertToDynDefObj(inputState) {
var dynDefObj = new OL.DynDef_Obj();
var allInstanceStates = new Array();
for(var x in inputState.instanceInputs){
allInstanceStates[x] = inputState.GetInstanceInputs(x);
}
for(var i in allInstanceStates){
if(typeof allInstanceStates[i] == "undefined" || allInstanceStates[i] == null){continue;}
var newInputObj = new Object();
var prodName = allInstanceStates[i].product;
var inputSelections = allInstanceStates[i].inputSelections; 
var instance = allInstanceStates[i]["instanceName"];
for(var x in inputSelections){
if (allInstanceStates[i].featureData.GetTable(x) != null) {
newInputObj[x] = allInstanceStates[i].featureData.GetTable(x).GetRowCode(inputSelections[x]);
}
else{
newInputObj[x] = inputSelections[x];	
}
}
dynDefObj.inputState[instance] = newInputObj;
} 
return dynDefObj;
}
function DynDef_Obj()
{
this.inputState = new Object();
}
DynDef_Obj.prototype.GetValue = DynDef_GetValue;
DynDef_Obj.prototype.GetInstanceObjFromKey = DynDef_GetInstanceObjFromKey;
function DynDef_GetValue(key, instanceName)
{
if(typeof this.inputState[instanceName]!= "undefined" && typeof this.inputState[instanceName][key] !="undefined"){
return this.inputState[instanceName][key];
}
else{
return null;
}
}
function ConvertStrToDynDefObj(str, ins)
{
var retObj = new DynDef_Obj();
if(typeof str == "undefined" || str == null || str == ""){
return null;
}
var sepChar = ',';
var equalsChar='=';
if (OL.GetConfigVar("APP", "STR_SEP_CHAR") != null) { sepChar = OL.GetConfigVar("APP", "STR_SEP_CHAR"); }
if (OL.GetConfigVar("APP", "STR_EQUALS_CHAR") != null) { equalsChar = OL.GetConfigVar("APP", "STR_EQUALS_CHAR"); }
if(typeof ins == "undefined" || ins == null) {
ins = OL.GetTopInstanceStr();
}
var split = str.split(sepChar);
if(sepChar == equalsChar){
for(var i=0;i<split.length;i++){
retObj.GetInstanceObjFromKey(split[i],split[++i], ins);	
}
}
else{
for(var i=0;i<split.length;i++){
var pair = split[i].split(equalsChar);
if(pair.length>2){return null;}
retObj.GetInstanceObjFromKey(pair[0],pair[1], ins);
}
}
return retObj;
}
function DynDef_GetInstanceObjFromKey(key, val, ins)
{
key = Strip(key);
if(key.indexOf(":") == -1){
var tableName = key;
}
else{
ins+= (":" + key.substring(0,key.lastIndexOf(":")));
var tableName = key.substring(key.lastIndexOf(":")+1, key.length);
}
ins = GetInstanceName(ins);
if(typeof this.inputState[ins] == "undefined"){
this.inputState[ins] = new Object();
}
this.inputState[ins][tableName] = Strip(val);
}
function Strip(str)
{
if(typeof str == "undefined" && str == null){return "";}
match = str.match(/\S+(\s+\S+)*/);
if (match == null) {
return "";
} else {
return match[0];
}
}
function GetInstanceName(instanceName) {
var TOP = OL.GetTopInstanceStr();
var PARENT = OL.GetParentInstanceStr();
var INST_DELIM = OL.GetInstanceDelimeterStr();
if (typeof instanceName == "undefined") {
instanceName = TOP;
}
if (instanceName.lastIndexOf(TOP) == instanceName.length-TOP.length) {
return TOP;
}
if (instanceName.lastIndexOf(TOP+INST_DELIM) > TOP.length) {
return GetInstanceName(instanceName.slice(instanceName.lastIndexOf(TOP)));
}
var parentIndex = instanceName.indexOf(PARENT);
if ((parentIndex == instanceName.length-PARENT.length || instanceName.slice(parentIndex - INST_DELIM.length, parentIndex+PARENT.length+INST_DELIM.length) == INST_DELIM+PARENT+INST_DELIM) 
&&(instanceName.indexOf(INST_DELIM)+INST_DELIM.length < parentIndex)) {	
return GetInstanceName(instanceName.slice(0, instanceName.slice(0, parentIndex-1).lastIndexOf(INST_DELIM))+instanceName.slice(parentIndex+PARENT.length));
}
return instanceName;
}
function GetConfigVarWithDefault(context, key, defaultVal) {
var val = OL.GetConfigVar(context, key);
return (val == null || typeof val == "undefined")?defaultVal:val;
}
function GetTopInstanceStr() {
return OL.GetConfigVarWithDefault("APP", "TOP", "TOP");
}
function GetCodeStr() {
return OL.GetConfigVarWithDefault("APP", "CODE", "CODE");
}
function GetParentInstanceStr() {
return OL.GetConfigVarWithDefault("APP", "PARENT", "PARENT");
}
function GetInstanceDelimeterStr() {
return OL.GetConfigVarWithDefault("APP", "INST_DELIM", ":");
}
function GoBackToConfig(){
OL.Load("ol_ui", GetUIURL()+"ol_ui.htm", OLStr+".ol_ui", true) ;
var product=OL.GetProductName();
var thisInstance=OL.GetCurrInstance();
if(thisInstance!=null){
var instanceName = OL.GetInstanceName(thisInstance);
OL.WaitForModules(new OL.Function_Obj(OL, "LoadDisplayPages", instanceName, product), "ol_ui");
OL.WaitForModules(new OL.Function_Obj(OL, "ShowContentsList"),"ol_ui");
}
else{
OL.WaitForModules(new OL.Function_Obj(OL, "ShowContentsList"),"ol_ui");
}
}
var DECIMAL_BASE = 100
function ConvertFloatToCurrency(value){
var initialLength = String(value).length;
var fltValue = parseFloat(value);
if (!isNaN(fltValue)&&(initialLength==String(fltValue).length)){
with(Math){
value = round(fltValue * DECIMAL_BASE)/DECIMAL_BASE;
}		
}
value=value.toString();
if (value.indexOf(".")==-1){value+=".00"}
if (value.indexOf(".")==value.length-2){value+="0"} 
return(value);
}
function GetInstanceFromInstKey(fullName) {
return OL.GetInstanceName(fullName.slice(0,fullName.lastIndexOf(GetInstanceDelimeterStr())));
}
function GetKeyFromInstKey(fullName) {
return fullName.slice(fullName.lastIndexOf(GetInstanceDelimeterStr())+GetInstanceDelimeterStr().length);
}
function CheckPath(path) {
var URL = /[\\\/]$/;
return (path.match(URL)==null) ? path + "\/": path;
}	
OL.CLEARED_KERNEL=false;
function DISPLAY_SetUnloaded() {
OL.semaphore.ClearActions();	
OL.CLEARED_KERNEL = true;
OL.BACK_HIT = false;
if (typeof OL.History_GetCurrentIndex != "undefined") {
if (OL.History_GetCurrentIndex() >= 0) {
if (OL.History_GetPagesetName(OL.History_GetCurrentIndex()) != null) {
OL.History_ModifyPagesetLink(OL.History_GetPagesetName(OL.History_GetCurrentIndex()), OL.ConvertToDynDefObj(OL.GetInputState()), new Object(), new Object());
}
}
if (typeof OL.HISTORY_LIST != "undefined" && OL.HISTORY_LIST != null) {
OL.HISTORY_LIST.project = OL.GetCurrentProject();
}
}
OL.SetUnloaded("ol_ui");
OL.SetUnloaded("displayArea");
OL.SetUnloaded("historyMiddle");
if (!OL.semaphore.IsDone("RESOURCE_"+OL.GetDisplayArea())) {
OL.semaphore.ClearDone("RESOURCE_"+OL.GetDisplayArea());
OL.UnlockResource(OL.GetDisplayArea());
}
}