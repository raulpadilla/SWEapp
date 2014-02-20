OL.RegisterHandler("ENGINE_RESULTS_GENERATED",window,"OC_GrabEngineResults");
OL.RegisterHandler("ADD_ITEM",window,"OC_CreatePackage"); 
OL.RegisterHandler("PACKAGE_IN", window, "OC_LinkBack");
var OC_ENGINE_RESULTS = null;
function OC_GrabEngineResults(event, sender, results)
{
if(!OL.IsLoaded('ordercode')){
OC_ENGINE_RESULTS = results;	
}
else{
OL.ordercode.GrabEngineResults(results);
}
}
function OC_CreatePackage(event, sender)
{
var argArray = new Array();
for(var i=2; i<OC_CreatePackage.arguments.length;i++){
if(typeof OC_CreatePackage.arguments[i]!= "undefined"){
argArray[argArray.length]= OC_CreatePackage.arguments[i];
}
}
if(!OL.IsLoaded('ordercode')){
OL.WaitForModules(new OL.Function_Obj(OL.ordercode,"CreatePackage",argArray, OC_ENGINE_RESULTS),"ordercode");
}
else{
OL.ordercode.CreatePackage(argArray, null);
}
}
function OC_LinkBack(event, sender, linkback)
{	
if(!OL.IsLoaded('ordercode')){
OL.WaitForModules(new OL.Function_Obj(OL.ordercode,"LinkBack",linkback),"ordercode");
}
else{
OL.ordercode.LinkBack(linkback);
}
}
