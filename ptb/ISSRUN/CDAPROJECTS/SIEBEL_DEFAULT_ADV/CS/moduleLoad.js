var INVALID = -1;
var NOT_LOADED = 0;
var LOADING = 1;
var LOADED = 2;
var DEFAULT_TIMEOUT = OL.GetConfigVarWithDefault("APP", "DEFAULT_TIMEOUT", 5000);
function ModuleLoad_Obj() {
this.modules = new Array();
}
ModuleLoad_Obj.prototype.GetLoadState = ModuleLoad_GetLoadState;
ModuleLoad_Obj.prototype.SetLoadState = ModuleLoad_SetLoadState;
ModuleLoad_Obj.prototype.IsLoaded = ModuleLoad_IsLoaded;
ModuleLoad_Obj.prototype.IsLoading = ModuleLoad_IsLoading;
ModuleLoad_Obj.prototype.SetLoaded = ModuleLoad_SetLoaded;
ModuleLoad_Obj.prototype.SetUnloaded = ModuleLoad_SetUnloaded;
ModuleLoad_Obj.prototype.RegisterModule = ModuleLoad_RegisterModule;
ModuleLoad_Obj.prototype.WaitForModules = ModuleLoad_WaitForModules;
ModuleLoad_Obj.prototype.DefineFile =  ModuleLoad_DefineFile;
ModuleLoad_Obj.prototype.Load = ModuleLoad_Load;
ModuleLoad_Obj.prototype.Reload = ModuleLoad_Reload;
function ModuleLoad_GetLoadState(module) {
if (typeof this.modules[module] != "undefined") {
return this.modules[module].GetLoadState();
} else return INVALID;
}
function ModuleLoad_IsLoaded(module) {
return (this.GetLoadState(module) == LOADED);
}
function ModuleLoad_IsLoading(module) {
return (this.GetLoadState(module) == LOADING);
}
function ModuleLoad_SetLoadState(module, state) {
if (typeof this.modules[module] == "undefined") {
this.modules[module] = new Module_Obj(module);
}
this.modules[module].SetLoadState(state);
}
function ModuleLoad_SetLoaded(module) {
this.SetLoadState(module, LOADED);
}
function ModuleLoad_SetUnloaded(module) {
this.SetLoadState(module, NOT_LOADED);
}
function ModuleLoadTimeoutFn(module, fileLoc, frame, defersTo) {
var result = confirm(OL.ErrIntern("ISSCDA_MODULE_WAITING", module, defersTo));
return result;
}
function ModuleLoad_RegisterModule(module, fileLoc, frame, defersTo, timeoutFn, timeout) {
if (typeof this.modules[module] == "undefined") {
this.modules[module] = new Module_Obj(module, fileLoc, frame);
}
if (!this.IsLoaded(module)) {
if (typeof timeoutFn == "undefined" && defersTo != "ON_DEMAND") {
timeoutFn = new OL.Function_Obj(window, "ModuleLoadTimeoutFn", module, fileLoc, frame, defersTo);
}
if (typeof timeout == "undefined" && timeoutFn != null) {
timeout = DEFAULT_TIMEOUT;
}
semaphore.Wait(new Function_Obj(this, "Load", module), BuildCondition(module, defersTo), timeoutFn, timeout);
}
return this.modules[module];
}
function ModuleLoad_DefineFile(name, fileLoc, frameLoc) {
this.modules[name] = new Module_Obj(name, fileLoc, frameLoc);
return this.modules[name];
}
function ModuleLoad_Load(name, fileLoc, frameLoc, withHistory) {
var oldFile = this.modules[name];
if ((typeof fileLoc != "undefined" && fileLoc != null) || (typeof frameLoc != "undefined" && frameLoc != null)) {
if (typeof fileLoc == "undefined" || fileLoc == null) {
if (typeof oldFile == "undefined") {
return false;
}
fileLoc = oldFile.fileLocation;
} 
if (typeof frameLoc == "undefined" && frameLoc == null) {
if (typeof oldFile == "undefined") {
return false;
}
frameLoc = oldFile.frame;
}
this.DefineFile(name, fileLoc, frameLoc);
}
this.modules[name].Load(withHistory);
return true;
}
function ModuleLoad_Reload(name) {
if (typeof this.modules[name] == "undefined" || this.modules[name] == null) {
alert(OL.ErrIntern("ISSCDA_MODULE_DNE", name));
return false;
}
this.modules[name].Reload();
return true;
}
function BuildCondition(moduleName, defersTo) {
if (typeof defersTo == "undefined" || defersTo == "") {
return ("");
} else {
return (defersTo+"||"+moduleName+"NEEDED");
}
}
function ModuleLoad_WaitForModules(action, eventString, timeoutCheck, timeout, noPreempt, priority) {
if (!noPreempt) {
var orList = eventString.split("||");
var eventList;
for (var i = 0; i < orList.length; i++) {
eventList = orList[i].split("&&");
for (var j = 0; j < eventList.length; j++) {
semaphore.Signal(eventList[j]+"NEEDED");
}
}
}
if (action == null) return null;
return (semaphore.Wait(action, eventString, timeoutCheck, timeout, priority));
}
function Module_Obj(name, fileLoc, frameLoc) {
if (typeof name != "undefined" && name != null) {
semaphore.ClearDone(name);
}
this.moduleName = name;
this.fileLocation = fileLoc;
this.frame = frameLoc;
this.parentFrames = new Array();
if (typeof this.frame != "undefined") {
var parFrames = this.frame;
while (parFrames.lastIndexOf(".") >= 0) {
this.parentFrames[this.parentFrames.length] = parFrames.slice(0, parFrames.lastIndexOf("."));
parFrames = this.parentFrames[this.parentFrames.length-1]
}
}
this.loadState = NOT_LOADED;
}	
Module_Obj.prototype.GetLoadState = Module_GetLoadState;
Module_Obj.prototype.SetLoadState = Module_SetLoadState;
Module_Obj.prototype.Load = Module_Load;
Module_Obj.prototype.Reload = Module_Reload;			
Module_Obj.prototype.LockedLoad = Module_LockedLoad;
function Module_GetLoadState() {
return this.loadState;
}
function Module_SetLoadState(state) {
this.loadState = state;
if (state == LOADED) {
if (typeof this.frame != "undefined") {
for (var i = 0; i < this.parentFrames.length; i++) {
UnlockResource(this.parentFrames[i]);
}
UnlockResource(this.frame);
}
semaphore.Signal(this.moduleName);
} 
else {
if (state == NOT_LOADED) {
semaphore.ClearDone(this.moduleName);  
}
}
}
function ParseFrame(frameString) {
return eval(frameString);
}
function ContinueFrameWait(moduleName, frame) {
var result = confirm(OL.ErrIntern("ISSCDA_MODULE_WAITING_FOR_FRAME", moduleName, frame));
if (!result) {
UnlockResource(frame);
}
return true;
}
function Module_Load(withHistory) {
for (var i = 0; i <  this.parentFrames.length; i++) {
LockResource(null,  this.parentFrames[i]);
}
LockResource(new Function_Obj(this, "LockedLoad",withHistory), this.frame, new Function_Obj(window, "ContinueFrameWait", this.moduleName, this.frame), DEFAULT_TIMEOUT);
}
function Module_LockedLoad(withHistory) {
this.SetLoadState(LOADING);
var frame = ParseFrame(this.frame);
if (frame == null) {
alert(OL.ErrIntern("ISSCDA_FRAME_COULD_NOT_LOAD", this.frame));
return false;
}
if (OL.GetConfigVarWithDefault("APP", "SIEBEL_INTEGRATION_ON", false) && top.SWEIsHighInteract) {
withHistory = false;
}
if(withHistory != null && typeof withHistory != "undefined" && withHistory == true && frame.name == "backFix"){
frame.location = this.fileLocation;
}
else{
frame.location.replace(this.fileLocation);
}
return true;
}
function Module_Reload() {
for (var i = 0; i <  this.parentFrames.length; i++) {
LockResource(null,  this.parentFrames[i]);
}
LockResource(new Function_Obj(this, "LockedLoad",false), this.frame, new Function_Obj(window, "ContinueFrameWait", this.moduleName, this.frame), DEFAULT_TIMEOUT);
}
var moduleLoad = new ModuleLoad_Obj();
var MODULES = new Array();
var LEVELS = new Array();
var KERNEL = ""; 
LEVELS[0] = "ON_DEMAND"; 
LEVELS[2] = KERNEL;
