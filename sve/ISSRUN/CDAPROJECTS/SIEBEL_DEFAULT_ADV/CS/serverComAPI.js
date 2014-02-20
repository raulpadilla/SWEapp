var IS = OL.IsLoaded;
var WFM =OL.WaitForModules;
var FN = OL.Function_Obj;
function GetWorkspace()
{
if(typeof OL["sebl_wrkspc"] != "undefined"){
return OL.sebl_wrkspc;
}
else{
return null;
}
}
