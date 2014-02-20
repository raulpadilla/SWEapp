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
if(module == "CODESET" && OL["CODESET_CONFIG_LOADED"]){
return OL.SetCodesetConfigVar(item,newValue);
}
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
var CONFIG_LOADED = true;
