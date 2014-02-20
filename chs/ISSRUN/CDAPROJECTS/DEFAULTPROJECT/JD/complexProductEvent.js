OL.RegisterHandler("ENGINE_RESULTS_GENERATED",window,"GrabEngineResults");
OL.RegisterHandler("PACKAGE_IN", window, "LinkBack");
OL.RegisterHandler("ADD_SIEBEL_ITEM", window, "CreateSiebelPackage");
OL.RegisterHandler("PACKAGE_OUT", window, "CreateStringFromPackage");
var CP_ENGINE_RESULTS = null;
function GrabEngineResults(event, sender, results)
{
CP_ENGINE_RESULTS = results;
}
function CreateSiebelPackage(event, sender, linkback, prodStr,optArgs)
{
if(!OL.IsLoaded('complexProductCode')){
OL.WaitForModules(new OL.Function_Obj(OL.ordercode, "CreatePackage",linkback, prodStr, optArgs, CP_ENGINE_RESULTS), "complexProductCode");
}
else{
OL.ordercode.CreatePackage(linkback, prodStr, optArgs, CP_ENGINE_RESULTS);
}
}
function LinkBack(event, sender, linkback)
{	
if(!OL.IsLoaded('complexProductCode')){
OL.WaitForModules(new OL.Function_Obj(OL.ordercode,"LinkBack",linkback),"complexProductCode");
}
else{
OL.ordercode.LinkBack(linkback);
}
}
function CreateStringFromPackage(event,sender,pckg, data)
{
if(!OL.IsLoaded('complexProductCode')){
OL.WaitForModules(new OL.Function_Obj(OL.ordercode,"CreateStringFromPackage",pckg, data),"complexProductCode");
}
else{
OL.ordercode.CreateStringFromPackage(pckg, data);
}
}
