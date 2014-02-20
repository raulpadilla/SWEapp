function NBLinkWrapper(url, preconfigObj, returntext) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"NBackLink",url,preconfigObj,returntext),"historyList");
} else {
OL.historyList.NBackLink(url,preconfigObj,returntext);
}
}
function History_GoBack() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"GoBack"),"historyList");
} else {
OL.HISTORY_LIST.GoBack();
}
}
function History_GoForward() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"GoForward"),"historyList");
} else {
OL.HISTORY_LIST.GoForward();
}
}
function History_ReplayCurrent() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"ReplayCurrent"),"historyList");
} else {
OL.HISTORY_LIST.ReplayCurrent();
}
}
function History_AddItem(obj, index) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"AddItem",obj,index),"historyList");
} else {
OL.HISTORY_LIST.AddItem(obj, index);
}
}
function History_ModifyItem(obj, index) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"ModifyItem",obj,index),"historyList");
} else {
OL.HISTORY_LIST.ModifyItem(obj, index);
}
}
function History_AddPagesetLink(pgset, dyndefs, optArgs, historyArgs) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"AddPagesetLink",pgset,dyndefs,optArgs,historyArgs),"historyList");
} else {
OL.HISTORY_LIST.AddPagesetLink(pgset, dyndefs, optArgs, historyArgs);
}
}
function History_ModifyPagesetLink(pgset, dyndefs, optArgs, historyArgs) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"ModifyPagesetLink",pgset,dyndefs,optArgs,historyArgs),"historyList");
} else {
OL.HISTORY_LIST.ModifyPagesetLink(pgset, dyndefs, optArgs);
}
} 
function History_GetItemAtIndex(index) {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
OL.HISTORY_LIST.GetItemAtIndex(index);
}
} 
function History_GetCurrentItem() {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetCurrentItem();
}
}
function History_GetPreviousItem() {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetPreviousItem();
}
}
function History_GetNextItem() {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetNextItem();
}
}
function History_GetCurrentIndex() {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetCurrentIndex();
}
}
function History_GetLength() {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetLength();
}
}
function History_Clear() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.HISTORY_LIST,"Clear"),"historyList");
} else {
OL.HISTORY_LIST.Clear();
}
}
function History_GetPagesetName(index) {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetPagesetName(index);
}
}
function History_GetPagesetOptArgs(index) {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.HISTORY_LIST.GetPagesetOptArgs(index);
}
}
function GoBack() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"GoBack"),"historyList");
} else {
OL.historyList.GoBack();
}
} 
function GoForward() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"GoForward"),"historyList");
} else {
OL.historyList.GoForward();
}
} 
function GetCurrentHistorySessionNum() {
if (!OL.IsLoaded('historyList')) {
return -1;
} else {
return OL.historyList.GetCurrentHistorySessionNum();
}
}
function GetHistorySessionLength() {
if (!OL.IsLoaded('historyList')) {
return -1;
} else {
return OL.historyList.GetHistorySessionLength();
}
}
function NewHistorySession(showContents) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"NewHistorySession", showContents),"historyList");
} else {
return OL.historyList.NewHistorySession(showContents);
}
}
function IncrementHistorySessionNum() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"IncrementHistorySessionNum"),"historyList");
} else {
return OL.historyList.IncrementHistorySessionNum();
}
}
function DecrementHistorySessionNum() {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"DecrementHistorySessionNum"),"historyList");
} else {
return OL.historyList.DecrementHistorySessionNum();
}
}
function SetHistorySession(num) {
if (!OL.IsLoaded('historyList')) {
OL.WaitForModules(new OL.Function_Obj(OL.historyList,"SetHistorySession", num),"historyList");
} else {
OL.historyList.SetHistorySession(num);
}
}
function GetHistorySession(num) {
if (!OL.IsLoaded('historyList')) {
return null;
} else {
return OL.historyList.GetHistorySession(num);
}
}