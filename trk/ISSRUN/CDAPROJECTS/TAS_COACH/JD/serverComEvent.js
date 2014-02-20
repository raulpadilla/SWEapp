OL.RegisterHandler("SEND_TO_SERVER", window,"WriteToWorkspace");
function WriteToWorkspace(event, sender, data)
{
var method = "";
var service = "";
if(typeof data["method"] != "undefined"){
method = data["method"];
}
if(typeof data["service"] != "undefined"){
service = data["service"];
}
if(!OL.IsLoaded('serverComCode')){
OL.WaitForModules(new OL.Function_Obj(OL.orderCode, "WriteToWorkSpc", service, method, data), "serverComCode");
}
else{
OL.serverComCode.WriteToWorkSpc(service, method, data);
}
}
