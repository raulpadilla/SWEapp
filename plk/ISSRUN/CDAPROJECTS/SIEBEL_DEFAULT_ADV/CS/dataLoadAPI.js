var IS = OL.IsLoaded;
var WFM =OL.WaitForModules;
var FN = OL.Function_Obj;
function InitMetaTable(Obj,inCODE, inDESC, optDEFAULT)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitMetaTable(Obj,inCODE,inDESC,optDEFAULT);
}
else{
WFM(new FN(OL.dataloadcode, "InitMetaTable",Obj,inCODE,inDESC,optDEFAULT), "dataloadcode");
}
}
function InitMetaTables(numTables)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitMetaTables(numTables);
}
else{
WFM(new FN(OL.dataloadcode, "InitMetaTables",numTables), "dataloadcode");
}
}
function SetMetaTable(tableName,metaTable)
{
if(IS('dataloadcode')){
OL.dataloadcode.SetMetaTable(tableName,metaTable);
}
else{
WFM(new FN(OL.dataloadcode, "SetMetaTable",tableName,metaTable), "dataloadcode");
}
}
function StartMeta(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.StartMeta(pagesetName);
}
else{
WFM(new FN(OL.dataloadcode, "StartMeta",pagesetName), "dataloadcode");
}
}
function EndMeta(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.EndMeta(pagesetName);   
}
else{
WFM(new FN(OL.dataloadcode, "EndMeta",pagesetName), "dataloadcode");
}
}
function SetTriggerTable(triggerWidget,targetWidget,metaTable) 
{
if(IS('dataloadcode')){
OL.dataloadcode.SetTriggerTable(triggerWidget,targetWidget,metaTable);	
}
else{
WFM(new FN(OL.dataloadcode, "SetTriggerTable",triggerWidget,targetWidget,metaTable), "dataloadcode");
}
}
function SetBusCompColumns()
{
var colType = SetBusCompColumns.arguments[0];
var colList = new Array();
for(var i=1; i<SetBusCompColumns.arguments.length; i++){
colList[i-1] = SetBusCompColumns.arguments[i];
}
if(IS('siebelcode')){
OL.dataloadcode.SetBusCompColumns(colType, colList);
}
else{
WFM(new FN(OL.dataloadcode, "SetBusCompColumns",colType, colList), "dataloadcode");
}
} 
function SetAttributeColumns()
{
var attributeList = new Array();
for(var i=0; i<SetAttributeColumns.arguments.length; i++){
attributeList[i] = SetAttributeColumns.arguments[i];
}
if(IS('dataloadcode')){
OL.dataloadcode.SetAttributeColumns(attributeList);
}
else{
WFM(new FN(OL.dataloadcode, "SetAttributeColumns",attributeList), "dataloadcode");
}
}
function StartData(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.StartData(pagesetName);   	}
else{
WFM(new FN(OL.dataloadcode, "StartData",pagesetName), "dataloadcode");
}	
}
function SetOrthTable(tableName)
{
if(IS('dataloadcode')){
OL.dataloadcode.SetOrthTable(tableName);
}
else{
WFM(new FN(OL.dataloadcode, "SetOrthTable",tableName), "dataloadcode");
}
}
function EndData(pagesetName)
{	
if(IS('dataloadcode')){
OL.dataloadcode.EndData(pagesetName);  
}
else{
WFM(new FN(OL.dataloadcode, "EndData",pagesetName), "dataloadcode");
}
}
function InitPagesetVersion(version)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitPagesetVersion(version);  
}
else{
WFM(new FN(OL.dataloadcode, "InitPagesetVersion",version), "dataloadcode");
}
}
function InitPagesetDesc(descStr)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitPagesetDesc(descStr);  
}
else{
WFM(new FN(OL.dataloadcode, "InitPagesetDesc",descStr), "dataloadcode");
}
}
function InitPagesetItemized(isItemized)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitPagesetItemized(isItemized);  
}
else{
WFM(new FN(OL.dataloadcode, "InitPagesetItemized",isItemized), "dataloadcode");
}
}
function InitAltOMSUrl(url)
{
if(IS('dataloadcode')){
OL.dataloadcode.InitAltOMSUrl(url);
}
else{
WFM(new FN(OL.dataloadcode, "InitAltOMSUrl",url), "dataloadcode");
}
}
function StartXInfo(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.StartXInfo(pagesetName);
}
else{
WFM(new FN(OL.dataloadcode, "StartXInfo",pagesetName), "dataloadcode");
}
}
function EndXInfo(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.EndXInfo(pagesetName);
}
else{
WFM(new FN(OL.dataloadcode, "EndXInfo",pagesetName), "dataloadcode");
}
}
function StartUIInfo(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.StartUIInfo(pagesetName);  
}
else{
WFM(new FN(OL.dataloadcode, "StartUIInfo",pagesetName), "dataloadcode");
}
}
function EndUIInfo(pagesetName)
{
if(IS('dataloadcode')){
OL.dataloadcode.EndUIInfo(pagesetName);  
}
else{
WFM(new FN(OL.dataloadcode, "EndUIInfo",pagesetName), "dataloadcode");
}
}
function RegisterFrameSet(name, frameSetName, frameLoc, path) {
if(IS('dataloadcode')){
OL.dataloadcode.RegisterFrameSet(name,frameSetName,frameLoc, path);
}
else{
WFM(new FN(OL.dataloadcode, "RegisterFrameSet",name,frameSetName,frameLoc,path), "dataloadcode");
}
}
function RegisterPageLocation(pageName, frameName, bVisib, path) {
if(IS('dataloadcode')){
OL.dataloadcode.RegisterPageLocation(pageName,frameName,bVisib,path);	
}
else{
WFM(new FN(OL.dataloadcode, "RegisterPageLocation",frameName,bVisib,path), "dataloadcode");
}
}
function RegisterPriorityPages(pageNames) {
if(IS('dataloadcode')){
OL.dataloadcode.RegisterPriorityPages(pageNames);
}
else{
WFM(new FN(OL.dataloadcode, "RegisterPriorityPages",pageNames), "dataloadcode");
}
}
function RegisterExceptionFrames(frameNames) {
if(IS('dataloadcode')){
OL.dataloadcode.RegisterExceptionFrames(frameNames);
}
else{
WFM(new FN(OL.dataloadcode, "RegisterExceptionFrames",frameNames), "dataloadcode");
}
}
function SetContentsListFrame(frameName) {
if(IS('dataloadcode')){
OL.dataloadcode.SetContentsListFrame(frameName);
}
else{
WFM(new FN(OL.dataloadcode, "SetContentsListFrame",frameName), "dataloadcode");
}
}
