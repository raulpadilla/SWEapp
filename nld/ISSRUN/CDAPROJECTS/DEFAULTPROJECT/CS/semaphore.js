var nav=navigator.userAgent.toUpperCase();
var browser=navigator.appName;
var msie="Microsoft Internet Explorer";
var mac=nav.match(/MAC/);
var isMacIE = (mac!=null&&browser==msie);
if (isMacIE) {
var MAC_TIMEOUT = new Array();
var CURR_FN = -1;
}
function WakeMac() {
eval(MAC_TIMEOUT[++CURR_FN]);
MAC_TIMEOUT[CURR_FN] = null;
}
function OL_SetTimeout(fnCall, delay) {
if (isMacIE && delay <= 1) {
MAC_TIMEOUT[MAC_TIMEOUT.length]=fnCall;
OL.setTimeout("WakeMac()",delay);
} else {
OL.setTimeout(fnCall, delay);
}
}
var UNLIMITED = -1000000000;
function Semaphore_Obj() {
this.events = new Object();
this.actions = new Array();
this.actionID = -1;
}
Semaphore_Obj.prototype.Wait = Semaphore_Wait;
Semaphore_Obj.prototype.Signal = Semaphore_Signal;
Semaphore_Obj.prototype.ClearDone = Semaphore_ClearDone;
Semaphore_Obj.prototype.CancelAction = Semaphore_CancelAction;
Semaphore_Obj.prototype.IsDone = Semaphore_IsDone;
Semaphore_Obj.prototype.GetEvent = Semaphore_GetEvent;
Semaphore_Obj.prototype.ClearActions = Semaphore_ClearActions;
Semaphore_Obj.prototype.GetNextActionID = Semaphore_GetNextActionID;
function Semaphore_GetNextActionID() {
return ++this.actionID;
}
function Semaphore_ClearActions() {
for (var event in this.events) {
this.events[event].ClearActions();
}
this.actions = new Array();
}
function Semaphore_Wait(action, eventString, timeoutCheck, timeout, priority) {
var	actionObj = new Action_Obj(this.GetNextActionID(), action, eventString, timeoutCheck, timeout, priority);
this.actions[actionObj.ID] = actionObj;
actionObj.Run();
if (actionObj.IsDone()) return null;
var orList = eventString.split("||");
var eventList;
for (var i = 0; i < orList.length; i++) {
eventList = orList[i].split("&&");
for (var j = 0; j < eventList.length; j++) {
if (typeof this.events[eventList[j]] == "undefined") {
this.events[eventList[j]] = new Event_Obj(eventList[j]);
}
this.events[eventList[j]].AddAction(actionObj);
}
}
return actionObj;
}
function Semaphore_CancelAction(action) {
action.done;
this.actions[action.ID] = null;
}
function Semaphore_Signal(event, numSignal) {
if (typeof this.events[event] == "undefined") {
this.events[event] = new Event_Obj(event);
}
this.events[event].SignalDone(numSignal);
}
function Semaphore_ClearDone(eventString) {
var orList = eventString.split("||");
var eventList;
for (var i = 0; i < orList.length; i++) {
eventList = orList[i].split("&&");
for (var j = 0; j < eventList.length; j++) {
if (typeof this.events[eventList[j]] == "undefined") {
this.events[eventList[j]] = new Event_Obj(eventList[j]);
}
this.events[eventList[j]].ClearDone();
}
}
}
function Semaphore_IsDone(events) {
var orList = events.split("||");
var eventList;
var j;
var stillValid = true;
for (var i=0; i < orList.length; i++) {
eventList = orList[i].split("&&");
j=0;
stillValid = true;
while (stillValid && j < eventList.length) {
if (eventList[j] != "") {
if (typeof this.events[eventList[j]] == "undefined") {
this.events[eventList[j]] = new Event_Obj(eventList[j]);
}
if (!this.events[eventList[j]].IsDone()) stillValid = false;
}
j++;
}
if (stillValid) return true;
}
return stillValid;
}
function Semaphore_GetEvent(event) {
return this.events[event];
}
function Event_Obj(eventName) {
this.name = eventName;
this.done = 0;
this.actions = new Array();
}
Event_Obj.prototype.AddAction = Event_AddAction;
Event_Obj.prototype.SignalDone = Event_SignalDone;
Event_Obj.prototype.UnSignalDone = Event_UnSignalDone;
Event_Obj.prototype.IsDone = Event_IsDone;
Event_Obj.prototype.RunActions = Event_RunActions;
Event_Obj.prototype.ClearAction = Event_ClearAction;
Event_Obj.prototype.ClearDone = Event_ClearDone;
Event_Obj.prototype.ClearActions = Event_ClearActions;
function Event_AddAction(action) {
for (var i=0; i < this.actions.length; i++) {
if (this.actions[i] != null && this.actions[i].priority > action.priority) {
for (var j=this.actions.length; j > i; j--) {
this.actions[j] = this.actions[j-1]
}
this.actions[i] = action;
return action;
}
}
this.actions[this.actions.length] = action;
return action;
}
function Event_SignalDone(numSignal) {
if (typeof numSignal == "undefined") this.done = UNLIMITED;
else this.done += numSignal;
if (this.IsDone()) {
this.RunActions();
}
}
function Event_UnSignalDone() {
if (this.done == UNLIMITED) return;
else this.done --;
}
function Event_IsDone() {
return (this.done > 0 || this.done == UNLIMITED);
}
function Event_RunActions() {
if (!this.IsDone()) return;
for (var i = 0; i < this.actions.length; i++) {
if (this.actions[i] != null) {
if (this.actions[i].Run()) {
this.actions[i] = null;
}
}
}
}
function Event_ClearAction(action) {
var newActions = new Array();
for (var i = 0; i < this.actions.length; i++) {
if (action != this.actions[i].action.action) {
newActions[newActions.length] = this.actions[i];
} else {
semaphore.actions[this.actions[i].ID] = null;
}
}
this.actions = newActions;
}
function Event_ClearDone() {
this.done = 0;
}
function Event_ClearActions() {
this.actions = new Array();
}
function action_run(actionID) {
var action = semaphore.actions[actionID];
if (typeof action == "undefined" || action == null) return;
if (action.action != null) {
action.action.Run();
}
semaphore.actions[action.ID] = null;
}
function TimeoutTest(actionID) {
var action = semaphore.actions[actionID];
if (typeof action == "undefined" || action == null || action.done) return;
if (action.timeoutFn.Run()) {
OL_SetTimeout("TimeoutTest("+actionID+")", action.timeout);
} else {
action.done = true;
semaphore.actions[action.ID] = null;
}
}
function Action_Obj(actID, act, cond, timeoutCheck, timeout, priority) {
this.ID = actID;
this.action = act;
this.conditions = cond;
this.done = false;
this.timeoutFn = timeoutCheck;
this.timeout = timeout;
if (typeof priority == "undefined" ||  priority == null) priority = 0;
this.priorty = priority;
this.timeoutID = null;
if (typeof timeoutCheck != "undefined" && timeoutCheck != null) {
this.timeoutID = OL_SetTimeout("TimeoutTest("+this.ID+")", timeout)
}
}
Action_Obj.prototype.TimeoutTest = TimeoutTest;
Action_Obj.prototype.IsDone = Action_IsDone;
Action_Obj.prototype.Run = Action_Run;
function Action_IsDone() {
return this.done;
}
function Action_Run() {
if (this.IsDone()) return false;
if (!semaphore.IsDone(this.conditions)) {
return false;
}
var orList = this.conditions.split("||");
var eventList;
var j;
var stillValid;
for (var i=0; i < orList.length; i++) {
eventList = orList[i].split("&&");
for (j = 0; j < eventList.length; j++) {
if (eventList[j] != "") {
if (semaphore.GetEvent(eventList[j]) != null) {
semaphore.GetEvent(eventList[j]).UnSignalDone();
}
}
}
}
this.done = true;
if (this.timeoutID != null) {
OL.clearTimeout(this.timeoutID);
}
OL_SetTimeout("action_run("+this.ID+")",1);
return true;
}
function Function_Obj(ob, fnCall) {
this.obj = ob
this.fn = fnCall;
this.args = new Array();
for (var i = 2; i < arguments.length; i++) {
this.args[this.args.length] = arguments[i];
}
}
Function_Obj.prototype.Run = Function_Run;
function Function_Run() {
var a = this.args;
if ((typeof this.fn == "undefined") || (this.fn == null)) {return null;}
if ((typeof this.obj == "undefined") || (this.obj == null)) {this.obj = OL;}
if (typeof this.obj[this.fn] == "undefined") {alert("unable to call "+this.fn);return null;}
return this.obj[this.fn](a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30]);
}
var semaphore = new Semaphore_Obj();
