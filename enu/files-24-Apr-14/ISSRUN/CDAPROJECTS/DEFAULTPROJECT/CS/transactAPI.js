var WFM = OL.WaitForModules;
var FN = OL.Function_Obj;
function TransactNotActive() {
WFM(new FN(OL.transact,"TransactNotActive"),"transact");
}
function SaveConfig() {
WFM(new FN(OL.transact,"SaveConfig"),"transact");
}
function GotSaveConfigName(config_name, is_new) {
WFM(new FN(OL.transact,"GotSaveConfigName", config_name, is_new),"transact");
}
function GetSaveConfigName() {
WFM(new FN(OL.transact,"GetSaveConfigName"),"transact");
}
function AddToCart() {
WFM(new FN(OL.transact,"AddToCart"),"transact");
}
function ConfigList(target) {
WFM(new FN(OL.transact,"ConfigList", target),"transact");
}
function ShowCart(view_only, quoteID) {
WFM(new FN(OL.transact,"ShowCart", view_only, quoteID),"transact");
}
function RestoreConfig(inLink) {
WFM(new FN(OL.transact,"RestoreConfig", inLink),"transact");
}
function SaveGeneric(inStr, inID) {
WFM(new FN(OL.transact,"SaveGeneric", inStr, inID),"transact");
}
function RestoreGeneric(inID) {
WFM(new FN(OL.transact,"RestoreGeneric", inID),"transact");
}
function DeleteGeneric(inID) {
WFM(new FN(OL.transact,"DeleteGeneric", inID),"transact");
}
function QuoteList(target) {
WFM(new FN(OL.transact,"QuoteList", target),"transact");
}
function RestoreQuote(quoteid, inLink) {
WFM(new FN(OL.transact,"RestoreQuote", quoteid, inLink),"transact");
}
function OpenFromUrl(query) {
WFM(new FN(OL.transact, "OpenFromUrl", query),"transact");
}
var query;
if (typeof OL.parent != "undefined") {
query = OL.parent.location.search.substring(1,  OL.parent.location.search.length);
}
else {
query = OL.location.search.substring(1,  OL.location.search.length);
}
if ((query.indexOf('quote_id') > -1) || (query.indexOf('config_id') > -1)  || (query.indexOf('om_session_id') > -1)  || (query.indexOf('om_order_id') > -1)) {
OpenFromUrl(query);
}
