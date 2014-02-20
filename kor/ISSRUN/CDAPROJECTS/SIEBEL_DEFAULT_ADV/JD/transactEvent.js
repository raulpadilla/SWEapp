OL.RegisterHandler("PACKAGE_OUT",window,"SavePackage");
function SavePackage(event, sender, pckg, arglist)
{
var win = window;
var transact_active = OL.GetConfigVar("TRANSACT", "ACTIVE");
if (transact_active == true) {
OL.WaitForModules(new OL.Function_Obj(OL.transact, "PostPackage", pckg, win, arglist), "transact");
}
}
