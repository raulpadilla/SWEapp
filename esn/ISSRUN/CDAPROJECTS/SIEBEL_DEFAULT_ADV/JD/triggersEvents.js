OL.RegisterHandler("PRODUCT_SELECTED",window,"Triggers_ProductSelected");
function Triggers_ProductSelected(event,win,argList)
{
if (!OL.IsLoaded('triggers')) {
OL.WaitForModules(new OL.Function_Obj(OL.triggerscode,"ClearTriggers",event,win,argList),"triggerscode");
}
else {
OL.triggerscode.ClearTriggers(event,win,argList);
}
}
