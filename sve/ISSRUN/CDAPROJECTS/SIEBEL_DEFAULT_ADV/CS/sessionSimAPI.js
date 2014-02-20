var WFM = OL.WaitForModules;
var FN = OL.Function_Obj;
function SessionKeepAlive(alive) {
WFM(new FN(OL.sessionSim,"SessionKeepAlive", alive),"sessionSim");
}
function SessionKeepAliveOn() {
WFM(new FN(OL.sessionSim,"SessionKeepAliveOn"),"sessionSim");
}
function SimulateSession() {
WFM(new FN(OL.sessionSim,"SimulateSession"),"sessionSim");
}