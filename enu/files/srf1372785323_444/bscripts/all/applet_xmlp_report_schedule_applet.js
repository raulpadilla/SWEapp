function XMLP_Report_Schedule_Applet_Applet_ChangeFieldValue (field, value)
{
  if (!top.SWEIsHighInteract)
  {
		return;
  }
	
  if (field == "ReportScheduleMode")
  {
  	  this.OnSetLayout();
  }	
  
  if (field == "DayOfMonth")
  {
  	  this.InvokeMethod("PostChanges", null);
  }
  if (field == "RunTimeHour")
  {
  	  this.InvokeMethod("PostChanges", null);
  }
  if (field == "RunTimeMinute")
  {
  	  this.InvokeMethod("PostChanges", null);
  }
  if (field == "ReportName")
  {
  	  this.OnSetLayout();
  }
}

function XMLP_Report_Schedule_Applet_Applet_Load ()
{
	this.OnSetLayout();
}

function XMLP_Report_Schedule_Applet_Applet_SetLayout()
{
	if (!top.SWEIsHighInteract)
	{
		return;
	}
	
	var objMap_RunOnce  = new Array("ReportStartDate", "ReportRunonceTimeZone");
	var objMap_RunTime  = new Array("ReportActiveStartDate", "ReportActiveEndDate", "ReportScheduleTimeZone", "RunTimeHour", "RunTimeMinute", "SelectAllLink");
	var objMap_RunWeek  = new Array("ReportDayOfWeekLabel", "ReportDayOfWeekSUN", "ReportDayOfWeekMON", "ReportDayOfWeekTUE", "ReportDayOfWeekWED", "ReportDayOfWeekTHU", "ReportDayOfWeekFRI", "ReportDayOfWeekSAT");
	var objMap_RunMonth = new Array("DayOfMonthHelp", "ReportDayOfMonth", "ReportMonthLabel", "ReportMonth1", "ReportMonth2", "ReportMonth3", "ReportMonth4", "ReportMonth5", "ReportMonth6", "ReportMonth7", "ReportMonth8", "ReportMonth9", "ReportMonth10","ReportMonth11","ReportMonth12");
	var objMap_Parameter = new Array("ScheduleParameterButton");
   	
   	var hideMap = new Array();
   	var showMap = new Array();
   	if ("N" == this.BusComp().GetFieldValue("ReportParameterFlg"))
	{
		hideMap = hideMap.concat(objMap_Parameter);
	}
	else if ("Y" == this.BusComp().GetFieldValue("ReportParameterFlg"))
	{
		showMap = showMap.concat(objMap_Parameter);
	}
	else if ("Y" == this.BusComp().GetFieldValue("RunImmediatelyFlg"))
	{
		  hideMap = hideMap.concat(objMap_RunOnce, objMap_RunTime, objMap_RunWeek, objMap_RunMonth);
	}
	else if ("Y" ==this.BusComp().GetFieldValue("RunOnceFlg"))
	{
		hideMap = hideMap.concat(objMap_RunTime, objMap_RunWeek, objMap_RunMonth);
		showMap = showMap.concat(objMap_RunOnce);
	}
	else if ("Y" ==this.BusComp().GetFieldValue("RunWeeklyFlg"))
	{
		hideMap = hideMap.concat(objMap_RunOnce, objMap_RunMonth);
		showMap = showMap.concat(objMap_RunTime, objMap_RunWeek);

	}
	else if ("Y" ==this.BusComp().GetFieldValue("RunMonthlyFlg"))
	{
		hideMap = hideMap.concat(objMap_RunOnce, objMap_RunWeek);
		showMap = showMap.concat(objMap_RunTime, objMap_RunMonth);

	}
	
	var ctrlIdx;
	for (ctrlIdx in hideMap)
	{
		var ctrlObj = this.FindControl(hideMap[ctrlIdx]);
		if (ctrlObj != null)
		{
			ctrlObj.SetProperty("Visible", "false");
			ctrlObj.SetLabelProperty("Visible", "hidden");
		}
	}
	
	for (ctrlIdx in showMap)
	{
		var ctrlObj = this.FindControl(showMap[ctrlIdx]);
		if (ctrlObj != null)
		{
			if ("Y" ==this.BusComp().GetFieldValue("RunWeeklyFlg")) 
			{
				if ("ReportDayOfWeekLabel" == showMap[ctrlIdx] ) 
				{
					ctrlObj.SetProperty("Visible", "false");	
				} 
			}
			if ("Y" ==this.BusComp().GetFieldValue("RunMonthlyFlg")) 
			{
				if("ReportMonthLabel" == showMap[ctrlIdx] ) 
				{
					ctrlObj.SetProperty("Visible", "false");	
				}
			}
			if ("ReportDayOfWeekLabel" != showMap[ctrlIdx] && "ReportMonthLabel" != showMap[ctrlIdx])
			{
				ctrlObj.SetProperty("Visible", "true");
			}
			ctrlObj.SetLabelProperty("Visible", "visible");
		}
	}
}

function XMLP_Report_Schedule_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new XMLP_Report_Schedule_Applet_Applet (null);

XMLP_Report_Schedule_Applet_Applet.prototype = new top.JSSAppletShadow ();

XMLP_Report_Schedule_Applet_Applet.prototype.OnChangeFieldValue = XMLP_Report_Schedule_Applet_Applet_ChangeFieldValue;
XMLP_Report_Schedule_Applet_Applet.prototype.OnLoad = XMLP_Report_Schedule_Applet_Applet_Load;
XMLP_Report_Schedule_Applet_Applet.prototype.OnSetLayout = XMLP_Report_Schedule_Applet_Applet_SetLayout;
theApplication = top.theApplication;
TheApplication = top.theApplication;