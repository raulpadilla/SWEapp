OL.RegisterHandler("PRODUCT_SELECTED", window, "DL_HandleProductSelected");
OL.RegisterHandler("DATAONLY_SELECTED", window, "DL_HandleDataOnlySelected");
OL.RegisterHandler("INFOONLY_SELECTED", window, "DL_HandleInfoOnlySelected");
function DL_HandleProductSelected(event,win,argList)
{
OL.WaitForModules(new OL.Function_Obj(OL.dataloadcode, "DataSelected",event,win,argList), "dataloadcode");
}
function DL_HandleDataOnlySelected(event,win,argList)
{
argList.fileList = new Array();
argList.fileList[0]= "configData";
argList.fileList[1]= "featureData";
argList.sendEvent = "DATAONLY_LOADED";
OL.WaitForModules(new OL.Function_Obj(OL.dataloadcode, "DataSelected",event,win,argList), "dataloadcode");
}
function DL_HandleInfoOnlySelected(event,win,argList)
{
argList.fileList = new Array();
argList.fileList[0]= "infoData";
argList.sendEvent = "INFOONLY_LOADED";
OL.WaitForModules(new OL.Function_Obj(OL.dataloadcode, "DataSelected",event,win,argList), "dataloadcode");
}