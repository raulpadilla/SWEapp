function EventSystem_Obj()
{
this.event_list = new Array();
this.args = new Array();
this.RegisterHandler = Event_RegisterHandler;
this.UnRegisterHandler = Event_UnRegisterHandler;
this.SendEvent = Event_SendEvent;
this.SendEventReady = Event_SendEventReady;
}
function Event_RegisterHandler(event,handlerObj, handler, priority)
{
if(typeof this.event_list[event] == "undefined")
{
this.event_list[event] = new Array();
}
if (typeof priority == "undefined") priority = 0;
var handlers = this.event_list[event];
var handler_fn = new Function_Obj(handlerObj, handler);
handler_fn.priority = priority;
for (var i=0; i < handlers.length; i++) {
if (handlers[i].priority > priority) {
for (var j=handlers.length; j > i; j--) {
handlers[j] = handlers[j-1]
}
handlers[i] = handler_fn;
return handler_fn;
}
}
handlers[handlers.length] = handler_fn;
return handler_fn;
}
function Event_SendEvent(event, sendObj)
{
var currArgs = new Array();
currArgs[0] = event;
currArgs[1] = sendObj;
for (var j = 2; j < arguments.length; j++) {
currArgs[currArgs.length] = arguments[j];
}
if (!OL.IsLoaded("moduleRegistry")) { 
OL.WaitForModules(new OL.Function_Obj(this, "SendEventReady", event, sendObj, currArgs), "moduleRegistry");
} else {
this.SendEventReady(event, sendObj, currArgs);
}
}
function Event_SendEventReady(event, sendObj, currArgs) {
var event_array = this.event_list[event];
if (typeof event_array != "undefined"){
for(var i=0; i<event_array.length; i++){
this.args[this.args.length] = currArgs;
OL_SetTimeout("event_run('"+event+"', "+i+", "+(this.args.length-1)+")", 1);
}
}
if (typeof this.event_list[ALL_EVENTS] != "undefined"){
for(var k=0; k<this.event_list[ALL_EVENTS].length; k++){
this.args[this.args.length] = currArgs;
OL_SetTimeout("event_run('"+ALL_EVENTS+"', "+k+", "+(this.args.length-1)+")", 1);
}
}
}
function Event_UnRegisterHandler(event,handlerObj,handler)
{
if(typeof this.event_list[event] == "undefined"){
return;
}
var handlers = this.event_list[event];
for (var i=0; i < handlers.length; i++) {
if (handlers[i].obj == handlerObj && handlers[i].fn == handler) {
for (var j=i; j < handlers.length-1; j++) {
handlers[j] = handlers[j+1]
}
handlers.length--;
return;
}
}
}
var EVENT = new EventSystem_Obj();
function event_run(eventName, index, argNum) {
RefEvent().event_list[eventName][index].args = RefEvent().args[argNum];
RefEvent().args[argNum] = null;
RefEvent().event_list[eventName][index].Run();
}
function RefEvent()
{
return EVENT;
}