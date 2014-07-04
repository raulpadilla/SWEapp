function Chep_Task_Playbar_Applet__Top_Applet_PreInvokeMethod (name, inputPropSet)
{
	try
	{
		if(name == "NavigateNext" || name == "NavigatePrev" || name == "CancelTask" || name == "PauseTask")
		{
			var taskPaneObj = top.SWEFindFrame(top,"SS_TaskUIPane").TaskObj();
			if(taskPaneObj != null) taskPaneObj.HandleClose();
		}
	}
	catch(e)
	{/* do nothing */}
return (“ContinueOperation”);
}

function Chep_Task_Playbar_Applet__Top_Applet_Load ()
{
	try
	{
		var taskPaneObj = top.SWEFindFrame(top,"SS_TaskUIPane").TaskObj();
		if(taskPaneObj != null) taskPaneObj.HandleClose();
	}
	catch(e)
	{/* do nothing */}
}

function Chep_Task_Playbar_Applet__Top_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Task_Playbar_Applet__Top_Applet (null);

Chep_Task_Playbar_Applet__Top_Applet.prototype = new top.JSSAppletShadow ();

Chep_Task_Playbar_Applet__Top_Applet.prototype.OnPreInvokeMethod = Chep_Task_Playbar_Applet__Top_Applet_PreInvokeMethod;
Chep_Task_Playbar_Applet__Top_Applet.prototype.OnLoad = Chep_Task_Playbar_Applet__Top_Applet_Load;
theApplication = top.theApplication;
TheApplication = top.theApplication;