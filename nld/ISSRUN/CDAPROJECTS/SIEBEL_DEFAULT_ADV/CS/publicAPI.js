var ON_DEMAND = -1;
var ALL_EVENTS = "*";
GetTopPath = GetTopURL;
GetJDPath = GetJDURL;
GetCSPath = GetCSURL;
GetPGPath = GetPGURL;
GetDSPath = GetDSURL;
GetUIPath = GetUIURL;
GetCustomPath = GetCUSTOMURL;
function SetLoaded(name) {
moduleLoad.SetLoaded(name);
}
function SetUnloaded(name)
{
moduleLoad.SetUnloaded(name);
}
function IsLoaded(name)
{
return moduleLoad.IsLoaded(name);
}
function WaitForModules(action, eventString, timeoutCheck, timeout, noPreempt, priority) {
return moduleLoad.WaitForModules(action, eventString, timeoutCheck, timeout, noPreempt, priority);
}
function Load(name, fileLoc, frameLoc, withHistory) {
return moduleLoad.Load(name, fileLoc, frameLoc,withHistory);
}
function Reload(name) {
return moduleLoad.Reload(name);
}
function DefineFile(name, fileLoc, frameLoc) {
return moduleLoad.DefineFile(name, fileLoc, frameLoc);
}
function RegisterModule(name, fileLoc, frameLoc, level, timeoutFn, timeout) {
if(navigator.userAgent.toUpperCase().match(/MAC/) && MODULES == null){window.parent.location.reload(true);return;}
if ((level < 1) && level !=ON_DEMAND) alert(OL.ErrIntern("ISSCDA_MODULE_REG_NUM", name));
MODULES[name] = new Object();
MODULES[name].moduleName = name;
MODULES[name].fileLocation = fileLoc;
MODULES[name].frame = frameLoc;
MODULES[name].timeoutFn = timeoutFn;
if (typeof timeout == "undefined") {
timeout = level * DEFAULT_TIMEOUT;
}
MODULES[name].timeout = timeout;
MODULES[name].orderLevel = level+2;
if (typeof LEVELS[level+2] == "undefined") {
LEVELS[level+2] = name;
} else {
LEVELS[level+2] += ("&&"+name);
}
}
function ModuleRegistrationComplete() {
if(MODULES == null){return;}
var prevLevel;
for (var mod in MODULES) {
prevLevel = MODULES[mod].orderLevel-1;
while (typeof LEVELS[prevLevel] == "undefined") prevLevel--;
moduleLoad.RegisterModule(MODULES[mod].moduleName, MODULES[mod].fileLocation, MODULES[mod].frame, LEVELS[prevLevel], MODULES[mod].timeoutFn, MODULES[mod].timeout);
}
}
var RESOURCES = new Object();
function LockResource(action, resource, timeoutAction, timeout) {
RESOURCES["RESOURCE_"+resource]=resource;
resource = "RESOURCE_"+resource;
if (semaphore.GetEvent(resource) == null) {
semaphore.Signal(resource, 1);
}
return (semaphore.Wait(action, resource, timeoutAction, timeout));
}
function UnlockResource(resource) {
semaphore.Signal("RESOURCE_"+resource, 1);
}
function ReleaseResources() {
for (var r in RESOURCES) {
OL.semaphore.ClearDone(r);
OL.UnlockResource(RESOURCES[r]);
}
RESOURCES = new Object();
}
function SendEvent(event, sendObj) {
var a = arguments;
RefEvent().SendEvent(event, sendObj,a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30]);
}
function RegisterHandler(event, handlerObj, handler, priority) {
return RefEvent().RegisterHandler(event, handlerObj, handler, priority);
}
function UnRegisterHandler(event, handlerObj, handler) {
return RefEvent().UnRegisterHandler(event, handlerObj, handler);
}
var ShowCDA_EntryArgs = new Object();
function ShowCDA(pageSet, linkbackStr, optArgs) {
var linkbackObj;
if ((typeof linkbackStr != 'undefined') && (linkbackStr != null)){
linkbackObj = new Object();
var startPos = 0;
var instanceName;
while (linkbackStr.indexOf('{') > -1) {
instanceName = linkbackStr.slice(0, linkbackStr.indexOf('=', 0));
currInst = new Object();
currInst.instanceName = instanceName;
startPos = linkbackStr.indexOf('{', startPos) + 1;
while (linkbackStr.charAt(0) != '}') {
fieldName = linkbackStr.slice(startPos, linkbackStr.indexOf('=', startPos));
if (linkbackStr.charAt(linkbackStr.indexOf('=', startPos) + 1) == '{') {
instSel = new Object();
startSel = linkbackStr.indexOf('=', startPos) + 2;
endSel = linkbackStr.indexOf('}', startSel);
selStr = linkbackStr.slice(startSel, endSel+1);
linkbackStr = linkbackStr.slice(endSel+1, linkbackStr.length);
if (linkbackStr.indexOf('&*') == 0) {
linkbackStr = linkbackStr.slice(2, linkbackStr.length);	
}
startSel = 0;
notDone = true;
while (notDone) {
if (selStr.indexOf('&*', startSel) > -1) {
endSel = selStr.indexOf('&*', startSel);
}
else {
endSel = selStr.indexOf('}', startSel);
notDone = false;
}
selName = selStr.slice(startSel, selStr.indexOf('=', startSel));
instSel[selName] = selStr.slice(selStr.indexOf('=', startSel) + 1, endSel);
startSel = endSel + 2;
}
currInst[fieldName] = instSel;
}
else {
if ((linkbackStr.indexOf('&*', startPos) == -1) || (linkbackStr.indexOf('}') < linkbackStr.indexOf('&*'))) {
endSel = linkbackStr.indexOf('}', startPos);
}
else {
endSel = linkbackStr.indexOf('&*', startPos);
}
startSel = linkbackStr.indexOf('=', startPos)+1;
fieldValue = linkbackStr.slice(startSel, endSel);
currInst[fieldName] = fieldValue;
if (linkbackStr.charAt(endSel) == '}') {
linkbackStr = linkbackStr.slice(endSel, linkbackStr.length);
}
else {
linkbackStr = linkbackStr.slice(endSel+2, linkbackStr.length);
}
}
startPos = 0;
}
if (linkbackStr.charAt(0) == '}') {
if (linkbackStr.indexOf('&*') == 1) {
startSel = 3;
}
else {
startSel = 1;
}
linkbackStr = linkbackStr.slice(startSel, linkbackStr.length);
}
linkbackObj[instanceName] = currInst;
}
} 
ShowCDAObj(pageSet, linkbackObj, optArgs);
} 
function ShowCDAWithDynDefObj(pageSet, dyndefObj, optArgs) {
if ((typeof optArgs == "undefined") || (optArgs == null)) {
optArgs = new Object();
}
optArgs['ShowCDAWithDynDefObj'] = true;
ShowCDAObj(pageSet, dyndefObj, optArgs);
}
function ShowCDAWithDynDefStr(pageSet, dyndefStr, optArgs) {
ShowCDAWithDynDefObj(pageSet, OL.ConvertStrToDynDefObj(dyndefStr), optArgs);
}
function ShowCDAObj(pageSet, linkbackObj, optArgs) {
var contentsListOn = true;
var project;
if (typeof optArgs == "undefined") {
optArgs = new Object();
}
if (OL.IsLoaded("ol_ui") == false && typeof optArgs.displayArea != "undefined" && optArgs.displayArea != null) {
OL.SetDisplayArea(optArgs.displayArea);
}
optArgs.versionChecked = true; 
if (typeof OL.savedLoadPagesetArgs != "undefined" && OL.savedLoadPagesetArgs != null) {
if (typeof OL.savedLoadPagesetArgs.optArgs != "undefined" && OL.savedLoadPagesetArgs.optArgs != null){
for (var elem in OL.savedLoadPagesetArgs.optArgs) {
optArgs[elem] = OL.savedLoadPagesetArgs.optArgs[elem];
}
}
linkbackObj = OL.savedLoadPagesetArgs.dynDefObj;
optArgs.ShowCDAWithDynDefObj = true;
OL.savedLoadPagesetArgs = null;
}
if ( OL.GetConfigVarWithDefault("APP","ENGINE_CHANGED", false) == true)
{
alert(OL.ErrIntern("ISSCDA_ERR_ENGINE_CHANGED"));
return;
}
if (typeof optArgs['showContents'] != "undefined") {
contentsListOn = optArgs.showContents;
}
if ((typeof pageSet != "undefined") && (pageSet != null) && (pageSet.indexOf('|') > -1)) {
project = pageSet.slice(0, pageSet.indexOf('|'));
pageSet = pageSet.slice(pageSet.indexOf('|')+1, pageSet.length);
if (pageSet == '|') {
pageSet = "";
}
}
if ((typeof project == 'undefined') || (project == "")) {
project = OL.GetDefaultProject();
}
var isDifferentProject = (project != OL.GetCurrentProject());
if  (isDifferentProject) {
ChangeProject(project);
}
if (! OL.IsLoaded('ol_ui')) { 
OL.Load('displayArea', OL.GetCSURL()+'displayArea.htm', OL.GetDisplayArea(), !(OL.GetConfigVarWithDefault("APP","LOAD_UI_ON_STARTUP", true)));
OL.SetUnloaded('ol_ui'); 
OL.WaitForModules(new OL.Function_Obj(OL,'Load','ol_ui', OL.GetUIURL()+'ol_ui.htm', OL.GetDisplayArea()+'.ol_ui'), 'displayArea'); 
}
else if (isDifferentProject) {
OL.Load('ol_ui', OL.GetUIURL()+'ol_ui.htm', OL.GetDisplayArea()+'.ol_ui'); 	
}
if (contentsListOn) {
OL.WaitForModules(new OL.Function_Obj(OL, 'ShowContentsList'), 'ol_ui');
}
if ((typeof linkbackObj != "undefined") && (linkbackObj != null) && (typeof optArgs['ShowCDAWithDynDefObj'] == 'undefined') ) {
OL.WaitForModules(new OL.Function_Obj(OL, 'SendEvent', 'PACKAGE_IN', window, linkbackObj), 'ol_ui');
}
else {
if (typeof pageSet != "undefined" && pageSet != null && pageSet != "") {
OL.WaitForModules(new OL.Function_Obj(OL, 'LoadPagesetWithDynDefObj', pageSet, linkbackObj, optArgs), 'ol_ui');
}
} /*
if (typeof optArgs['ShowCDAWithDynDefObj'] == "undefined") {
for (var elem in optArgs) {
ShowCDA_EntryArgs[elem] = optArgs[elem];
}
} */
for (var elem in optArgs) {
ShowCDA_EntryArgs[elem] = optArgs[elem];
}
}
function ChangeProject(project) {
var TOP_LOC = OL.GetTopURL();
if ((TOP_LOC.lastIndexOf('/')+1)>(TOP_LOC.lastIndexOf('\\')+1)) {
TOP_LOC = TOP_LOC.slice(0, (TOP_LOC.slice(0,TOP_LOC.length-1)).lastIndexOf('/')+1) + project + '/';
}
else {
TOP_LOC = TOP_LOC.slice(0, (TOP_LOC.slice(0,TOP_LOC.length-1)).lastIndexOf('\\')+1) + project + '\\';
}
OL.SetTopURL(TOP_LOC);
OL.SetCurrentProject(project);
}
function GetCDAEntryArgs() {
return ShowCDA_EntryArgs;
}
function GetCDAEntryArg(name) {
if (typeof ShowCDA_EntryArgs[name] != "undefined") {
return ShowCDA_EntryArgs[name];
}
else {
return null;
}
}
function StartApp() {
OL.SetLoaded("kernel");
if (typeof top.swe != "undefined") {
if (typeof top.swe.appURL != "undefined") {
OL.SetSiebelServerURL(top.swe.appURL);
}
}
if (OL.GetConfigVarWithDefault("APP","LOAD_UI_ON_STARTUP", true)) {
var SAoptArgs = new Object();
SAoptArgs.showContents = false;
ShowCDA(null,null,SAoptArgs);
OL.WaitForModules(new OL.Function_Obj(window, "AppReadyToStart"), "ol_ui&&REG_PRODLIST_FRAME");
} else {
AppReadyToStart();
}
}
function AppReadyToStart() {
var modReg;
if (typeof OL.InitApp != "undefined") {
modReg = OL.InitApp(); 
}

if (typeof modReg == "undefined" || modReg == null) {
modReg = OL.GetJDPath()+"moduleRegistry.htm";
}
OL.Load('moduleRegistry', modReg, OLStr+'.registry');
if (typeof top.tempCallShowCDA != "undefined" && top.tempCallShowCDA != null) {
	top.tempCallShowCDA();
	top.tempCallShowCDA=null;
}
}
function LoadDisplayPages(instanceName, product, optArgObj)
{
if(typeof optArgObj =="undefined" || optArgObj == null){
optArgObj = new Object();
}
optArgObj.product = product;
optArgObj.instanceName = instanceName;
OL.SendEvent("INFOONLY_SELECTED",window, optArgObj); 
OL.SessionKeepAlive(true); 
}
function LoadDataset(product, dynDefStr, optArgObj)
{
LoadDatasetWithDynDefObj(product, OL.ConvertStrToDynDefObj(dynDefStr), optArgObj);
}
function LoadDatasetWithDynDefObj(product, dynDefObj, optArgObj)
{
if(typeof optArgObj =="undefined" || optArgObj == null){
optArgObj = new Object();
}
optArgObj.product = product;
optArgObj.dynDefObj = dynDefObj;
OL.SendEvent("DATAONLY_SELECTED",window, optArgObj);  
}
function LoadPagesetWithDynDefObj(url, dynDefObj, optArgObj)
{
if (OL.IsLoaded("ol_ui") == false) {
alert(OL.ErrIntern("ISSCDA_NO_UI_FOR_LOAD_PAGESET"));
return;
}
if(typeof optArgObj =="undefined" || optArgObj == null){
optArgObj = new Object();
}
var projSepIndex = url.indexOf('|');
if(projSepIndex!=-1) {
if(OL.GetCurrentProject()!=url.slice(0,projSepIndex)){
if (OL.GetCDAEntryArg("IstwsiebelWebClient") && !optArgObj.versionChecked) {
OL.savedLoadPagesetArgs = new Object();
OL.savedLoadPagesetArgs.dynDefObj = dynDefObj;
OL.savedLoadPagesetArgs.optArgs = optArgObj;				
OL.CheckProjectVersionForShowCDA(url);
} else {
ShowCDAWithDynDefObj(url,dynDefObj,optArgObj);
}
return;
}
optArgObj.product = url.slice(projSepIndex+1, url.length);
if (optArgObj.product == '|') {
optArgObj.product = "";
}
}
else{
optArgObj.product = url;
}
optArgObj.dynDefObj = dynDefObj;
if (typeof OL.PEP_PRODUCT_SELECTED == "undefined" || OL.PEP_PRODUCT_SELECTED("PRODUCT_SELECTED",window,optArgObj)) {
OL.SendEvent("PRODUCT_SELECTED",window,optArgObj);  
}
OL.SessionKeepAlive(true);
optArgObj.versionChecked = false;
}
function LoadPageset(url, dynDefStr,optArgObj)
{
if(typeof optArgObj == "undefined" || optArgObj == null){optArgObj = new Object();}
LoadPagesetWithDynDefObj(url,ConvertStrToDynDefObj(dynDefStr),optArgObj);
}
var HELPPAGE = OL.GetConfigVarWithDefault("APP", "HELP_URL", OL.GetTopURL()+"ui/helpset.htm");
var ABOUTPAGE = OL.GetConfigVarWithDefault("APP", "ABOUT_URL", OL.GetTopURL()+"ui/about.htm");
var helpwin;
var aboutwin;
function ShowHelp() {
if (typeof helpwin=="undefined" || helpwin.closed) {
helpwin = window.open(HELPPAGE,'HelpWin',OL.GetConfigVarWithDefault("APP","HELP_WIN_ARGS",'status=0,scrollbars=0,resizable=0,menubar=1,width=525,height=375'));
} else {
helpwin.location.href = HELPPAGE;
helpwin.focus();
}
}
function ShowAbout() {
if (typeof aboutwin=="undefined" || aboutwin.closed) {
aboutwin = window.open(ABOUTPAGE,'AboutWin',OL.GetConfigVarWithDefault("APP","ABOUT_WIN_ARGS", 'status=0,scrollbars=1,resizable=0,width=450,height=300'));
} else {
aboutwin.location.href = ABOUTPAGE;
aboutwin.focus();
}
}
function DisplayError(msg) {
if (typeof OL.ORP_DisplayError != "undefined") {
OL.ORP_DisplayError(msg);
} else {
alert(msg);
}
}
function ClearSiebInitState() {
var entryArgs = OL.GetCDAEntryArgs();
for (var elem in entryArgs) {
if(elem != "versionChecked")
delete entryArgs[elem];
}
}
