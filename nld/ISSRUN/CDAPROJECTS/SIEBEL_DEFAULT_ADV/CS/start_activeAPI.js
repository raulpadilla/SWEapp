function SOALoadPageset(defaultPg,isActive) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"SOALoadPageset",defaultPg,isActive),"start_activecode");
}
else {
OL.start_activecode.SOALoadPageset(defaultPg,isActive);
}
}
function SOAPassDynaObject() {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"SOAPassDynaObject"),"start_activecode");
}
else {
OL.start_activecode.SOAPassDynaObject();
}
}
function SOACleanQuery(qStr) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"CleanQuery",qStr),"start_activecode");
}
else {
OL.start_activecode.CleanQuery(qStr);
}
}
function SOAStartActive(parmStr) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"StartActive",parmStr),"start_activecode");
}
else {
OL.start_activecode.StartActive(parmStr);
}
}
function LoadSOAFrame(fileLoc) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"LoadSOAFrame",fileLoc),"start_activecode");
}
else {
OL.start_activecode.LoadSOAFrame(fileLoc);
}
}
function SOAGetPagesetID(parmStr) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"GetPagesetID",parmStr),"start_activecode");
}
else {
OL.start_activecode.GetPagesetID(parmStr);
}
}
function SOAGetConfigObj(parmStr) {
if (!OL.IsLoaded('start_activecode')) {
OL.WaitForModules(new OL.Function_Obj(OL.start_activecode,"GetConfigObj",parmStr),"start_activecode");
}
else {
OL.start_activecode.GetConfigObj(parmStr);
}
}
