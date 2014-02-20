function Package_Obj()
{
this.items = null;
this.linkBack = null;
}
function CreateItemTree(engineResults){
var retItem = new Object();
retItem = CreateItem(engineResults,engineResults.GetResults("TOP"), null);
return retItem;
}
function AddSubConfig(engineResults, item)
{
var subProducts = new Array();
for(var i = 0; i<item.inputState.children.length;i++){
var subProd = engineResults.GetResults(item.inputState.children[i]);
if(typeof subProd != "undefined" && subProd != null){
subProducts[subProd.instanceName] = CreateItem(engineResults,subProd);
}
}
return subProducts;
}
function AddSubitems(data, parentItem)
{
if(USE_SUBVAR == true){
var subvar = OL.GetConfigVar("ORDER","SUBVAR");
}
var lastTable = "";
var curTable = "";
var tmpItem = new Object();
var subitems = new Array();
var isItemFlag = false;
if(USE_SUBVAR == true && typeof subvar == "undefined" || USE_SUBVAR == true && subvar == null || USE_SUBVAR == true && subvar == ""){return null;}
if( USE_SUBVAR == true && subvar.indexOf("*") == 0){
subvar = "";
}
for(var col in data){
var dotPos = col.indexOf('.');
if(dotPos != -1){
curTable = col.substring(0,dotPos);
if(curTable != lastTable){
if(isItemFlag == true){
subitems[lastTable] = ParseChild(lastTable,tmpItem, parentItem);
isItemFlag = false;
}
tmpItem = new Object();
lastTable = curTable;
}
tmpItem[col.substring(dotPos+1,col.length)] = data[col];
if(USE_SUBVAR == true){
if(col.indexOf(subvar) != -1 && data[curTable+"."+subvar] != ""){
isItemFlag = true;
}
}
else{	
if(typeof ID_COLS[lastTable] != "undefined" && typeof data[ID_COLS[lastTable]] != "undefined" && data[ID_COLS[lastTable]] != ""){
isItemFlag = true;
}
}
}
}
if(isItemFlag == true){
subitems[lastTable] = ParseChild(lastTable,tmpItem,parentItem);
}
return subitems;
}
function ParseChild(itemName,item,parentItem)
{
var partID = "";
var relationship = "";
var qty = 1;
if(typeof item["QUANTITY"] != "undefined" && item["QUANTITY"]){
qty = item["QUANTITY"];
}
if(typeof item["QTY"] != "undefined" && item["QTY"]){
qty = item["QTY"];
}
if(USE_SUBVAR == true){
var subvar = OL.GetConfigVar("ORDER","SUBVAR");
desc = item["DESC"];
partno = item[subvar];
price = item["PRICE"];
}
else{
if(typeof ID_COLS[itemName] != "undefined"){
partID = parentItem.data[ID_COLS[itemName]];
}
var attributes = new Object();
if(typeof ATTR_COLS[itemName] != "undefined"){
for(var attr in ATTR_COLS[itemName]){
attributes[ATTR_COLS[itemName][attr]] = parentItem.data[attr];	
}
}
ATTR_COLS[itemName] = null;
}
if(typeof item["RELATIONSHIP"] != "undefined"){
relationship = item["RELATIONSHIP"];
}
if(USE_SUBVAR == false){
var retItem = new Complex_Item_Obj(partID,qty,item, relationship);
retItem.attributes = attributes;
}
else{
var retItem = new Item_Obj('',parentItem.pagesetName,parentItem.pagesetItemized,desc,partno,qty,price,item, parentItem.instanceName, parentItem.alt_oms_url);
}
return retItem;
}
function LinkBack(linkback)
{
var dynDefObj = new OL.DynDef_Obj();
for(var i in linkback){
if(linkback == null || typeof linkback == "undefined" || typeof linkback[i] == "undefined"){return;}
var version = linkback[i].pagesetVersion;
var instanceInputState = linkback[i].inputSelections;
if(version != null){
instanceInputState["OL_Pageset_Version"]= version;
}
dynDefObj.inputState[linkback[i].instanceName] = instanceInputState;
}		
if(CheckAppDataVersion(linkback)){
var argList = new Object();
argList["instanceName"] = OL.GetTopInstanceStr();
if(typeof OL["COP_BeforePackageIn"] != "undefined"){
OL.COP_BeforePackageIn(linkback["TOP"].pagesetName,dynDefObj,argList);
}
OL.LoadPagesetWithDynDefObj(linkback["TOP"].pagesetName, dynDefObj,argList);
}
}
function CreateLinkBack(engineResults)
{
var codesetVersion = OL.GetConfigVar("CODESET", "VERSION");
var appVersion = OL.GetConfigVar("APP", "DATA_VERSION");
var retObj = new Array();
var curProj = "";
if(USE_SUBVAR != true){
var curProj = OL.GetCurrentProject();
}
var allInstanceStates = new Array();
for(var x in engineResults.inputState.instanceInputs){
allInstanceStates[x] = engineResults.inputState.GetInstanceInputs(x);
}
for(var i in allInstanceStates){
if(typeof allInstanceStates[i] == "undefined" || allInstanceStates[i] == null){continue;}
if(typeof engineResults.GetResults(i) == "undefined"){return null;}
var newInputObj = new Object();
var prodName = curProj + "|" + allInstanceStates[i].product;
var inputSelections = allInstanceStates[i].inputSelections; 
var instance = allInstanceStates[i]["instanceName"];
var version = engineResults.GetResults(i).infoTables.version;
for(var x in inputSelections){
if (allInstanceStates[i].featureData.GetTable(x) != null) {
newInputObj[x] = allInstanceStates[i].featureData.GetTable(x).GetRowCode(inputSelections[x]);
}
else{
newInputObj[x] = inputSelections[x];	
}
}
retObj[i] = new LinkBack_Obj(prodName, version, newInputObj, instance, codesetVersion, appVersion);
} 
return retObj;
}
function CheckAppDataVersion(linkback)
{
if(typeof linkback == "undefined" || typeof linkback["TOP"] == "undefined"){return false;}
var appDataVersion = linkback["TOP"].appVersion;
var currAppDataVersion = OL.GetConfigVar("APP","DATA_VERSION");
var paramObj = new Object();
paramObj.linkback = linkback;
paramObj.appDataVersion = appDataVersion;
paramObj.currAppDataVersion = currAppDataVersion;
if(appDataVersion == currAppDataVersion){
return true;
}
if(typeof OL["COP_AppDataVersionCheck"] == "undefined"){
return true;
}
else{
return(OL.COP_AppDataVersionCheck(paramObj));
}	
}
function LinkBack(linkback)
{
var dynDefObj = new OL.DynDef_Obj();
for(var i in linkback){
if(linkback == null || typeof linkback == "undefined" || typeof linkback[i] == "undefined"){return;}
var version = linkback[i].pagesetVersion;
var instanceInputState = linkback[i].inputSelections;
if(version != null){
instanceInputState["OL_Pageset_Version"]= version;
}
dynDefObj.inputState[linkback[i].instanceName] = instanceInputState;
}		
if(CheckAppDataVersion(linkback)){
var argList = new Object();
argList["instanceName"] = OL.GetTopInstanceStr();
if(typeof OL["COP_BeforePackageIn"] != "undefined"){
OL.COP_BeforePackageIn(linkback["TOP"].pagesetName,dynDefObj,argList);
}
OL.LoadPagesetWithDynDefObj(linkback["TOP"].pagesetName, dynDefObj,argList);
}
}
function CheckAppDataVersion(linkback)
{
if(typeof linkback == "undefined" || typeof linkback["TOP"] == "undefined"){return false;}
var appDataVersion = linkback["TOP"].appVersion;
var currAppDataVersion = OL.GetConfigVar("APP","DATA_VERSION");
var paramObj = new Object();
paramObj.linkback = linkback;
paramObj.appDataVersion = appDataVersion;
paramObj.currAppDataVersion = currAppDataVersion;
if(appDataVersion == currAppDataVersion){
return true;
}
if(typeof OL["COP_AppDataVersionCheck"] == "undefined"){
return true;
}
else{
return(OL.COP_AppDataVersionCheck(paramObj));
}	
}
function LinkBack_Obj(pagesetName, pagesetVersion, inputSelections, instanceName, codesetVersion, appVersion)
{
this.pagesetName = pagesetName;
this.pagesetVersion = pagesetVersion;
this.inputSelections = inputSelections;
this.instanceName = instanceName;
this.codesetVersion = codesetVersion;
this.appVersion = appVersion;
}
var ENGINE_RESULTS = null;
function GrabEngineResults(engineResults)
{
ENGINE_RESULTS = engineResults;
}
function SendPackage(pckg, argArray)
{
if(typeof OL["COP_BeforePackageOut"] != "undefined"){
OL.COP_BeforePackageOut(pckg, argArray);
}
if(typeof OL["PEP_PACKAGE_OUT"] != "undefined"){
if(OL.PEP_PACKAGE_OUT(pckg, argArray) == false){return;}
}
if(pckg != null){
OL.SendEvent('PACKAGE_OUT',window, pckg, argArray);	
}
return;
}
