var IS = OL.IsLoaded;
var WFM = OL.WaitForModules;
var FN = OL.Function_Obj;
function ShowContentsList(prodlistdata) { 
if(OL["COP_BeforeContentsListDataLoad"]){
prodlistdata = OL.COP_BeforeContentsListDataLoad(prodlistdata);
}
if (OL.IsLoaded("ol_ui") == false) {
alert(OL.ErrIntern("ISSCDA_NO_UI_FOR_SHOW_CONTENTS"));
return;
}
if (typeof OL.prodlistFrame == "undefined" || OL.prodlistFrame == "" || OL.prodlistFrame == null) {
return;		
}	
if (typeof prodlistdata == "undefined" || prodlistdata=="") {
prodlistdata= "prodlistdata.htm";
}	
else if (prodlistdata != OL.prodlistFile) {  
OL.scrollPosX=0;
OL.scrollPosY=0;
OL.prodlistcode.LISTSTATE = new Array(0,0,0,0,0,0);
}
OL.Load("prodlistdata", OL.GetDSPath()+prodlistdata, OLStr+".prodlistdata");
if (OL.moduleLoad.GetLoadState("prodlistcode") == OL.INVALID) {
OL.Load("prodlistcode", OL.GetCSPath()+"prodlist.htm", OLStr+".prodlistcode");
}	
var frStr="";
var pattern = OL.prodlistFrame;
var res = pattern.match(OL.uiFrame);
frStr = (res != null) ? OL.ui_name : "ol_ui";
if (typeof frStr == "undefined") frStr="";
WFM(new FN(OL.prodlistcode,"InitList", OL.scrollPosX,OL.scrollPosY),"prodlistdata&&prodlistcode&&"+frStr);
OL.prodlistFile = prodlistdata;  
}
/*
function SetContentsListFrame(frame) {
if (typeof frame != "undefined" && frame != null && frame != "") {	
OL.prodlistFrame = frame;
}
ShowContentsList(OL.prodlistFile);
}
*/
function RegisterContentsListFrame(frameName) {
if (frameName != "") {
OL.prodlistFrame = frameName;
}
OL.SetLoaded("REG_PRODLIST_FRAME");
}
function StartList(frameName) {
}
function EndList(frameName) { 
OL.SendEvent('PRODLISTDATA_LOADED',window);
OL.SetLoaded("prodlistdata"); 
}
function RegisterUI(frameName) { 
OL.uiFrame = frameName;
OL.SetPagesetDisplayArea(frameName);
OL.SetLoaded("ol_ui");
}
function RefContentsList() {
return OL.prodlistdata.T;
}	
function GetContentsListLocation() {
return eval(OL.prodlistFrame);
}
function GetContentsListState() {
return OL.prodlistcode.GetListState();
}
