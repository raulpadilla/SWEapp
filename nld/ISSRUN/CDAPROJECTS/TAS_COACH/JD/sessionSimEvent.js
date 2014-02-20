OL.RegisterHandler("INPUT_CHANGED",window,"SessionSimKeepAliveHandler");
OL.RegisterHandler("PRODUCT_SELECTED", window, "SessionSimKeepAliveHandler");
OL.RegisterHandler("INFOONLY_SELECTED", window, "SessionSimKeepAliveHandler");
OL.RegisterHandler("UI_LOAD_FILE", window, "SessionSimKeepAliveHandler");
function SessionSimKeepAliveHandler(event, sender) {
OL.WaitForModules(new OL.Function_Obj(OL.sessionSim, "SessionKeepAlive", true), "sessionSim");
}
