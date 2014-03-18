/****************************************************************
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *  FILE:      alarm.js
 *  $Revision:   0 $
 *  $Date:      02/12/02 2:00pm $
 *  $Author:   ibeliaus $ of last update
 *  CREATOR:    ibeliaus
 *  DESCRIPTION: Alarm Manager 
 *****************************************************************/
var nCurrentItem              = -1;
var alarmGlobalArray          = new Array();
var balarmFired               = false;
var bInitialize               = true;
var strSnoozeTimes            = "";
var defUserSnoozeTime         = 5; 
var PropSetIndx               = 0;
var defaultSnooze             = 5;
var nOptionCount              = 0;
var JSSAlarmMgr_Locale        = null;
var JSSAlarmMgr_dateFormat    = "";
var JSSAlarmMgr_timeFormat    = "";
var JSSAlarmMgr_formatDateIn  = "MM/DD/YYYY";
var JSSAlarmMgr_formatTimeIn  = "HH:mm";
var dAlarmOpenWimdow          = null;
var bmoveAlarmWindow          = false;
var bUIStringsLoaded          = false;
var bIsRTL                    = false;
var startTitle, startLable, endLable, snoozeForLable, snoozeLable, snoozeAllLable;
var dismissLable, dismissAllLable, prevLable, nextLable, closeLable, minutesLable;
var typeLabel, despLabel;

function sortDate(a,b)
{
   if (a.date.valueOf() > b.date.valueOf())
      return 1;
   else if (a.date.valueOf() < b.date.valueOf())
      return -1;
   else
      return 0;
}

function sortTime(a,b)
{
   if (Number(a) > Number(b))
      return 1;
   else if (Number(a) < Number(b))
      return -1;
   else
      return 0;
}

function JSSAlarmMgr_CreateArrayObjects(date, time, desc, id, endDate, endTime, apptType, apptRepAct, leadTime, defSnoozeTime)
{
   var p             = new Object();
   var apptDate      = new String(date);
   var apptTime      = new String(time);
   var apptEndDate   = new String(endDate);
   var apptEndTime   = new String(endTime);
   var description   = new String(desc);
   var apptId        = new String(id);
   var apptType      = new String(apptType);
   var apptRepAct    = new String(apptRepAct);
   var actualDate    = new Date(apptDate.slice(6), (apptDate.slice(0,2) - 1), apptDate.slice(3,5), apptTime.slice(0,2), apptTime.slice(3,5), apptTime.slice(6));
   var enddate       = new Date(apptEndDate.slice(6), (apptEndDate.slice(0,2) - 1), apptEndDate.slice(3,5), apptEndTime.slice(0,2), apptEndTime.slice(3,5), apptEndTime.slice(6));

   p.actualDate = (1 + actualDate.getMonth()) + "/" + actualDate.getDate() + "/" + actualDate.getFullYear();
   p.actualTime =  actualDate.getHours() + ":" + actualDate.getMinutes();
   p.endDate    = (1 + enddate.getMonth()) + "/" + enddate.getDate() + "/" + enddate.getFullYear();
   p.endTime    = enddate.getHours() + ":" + enddate.getMinutes();
   
   p.date = new Date(apptDate.slice(6), (apptDate.slice(0,2) - 1), apptDate.slice(3,5), apptTime.slice(0,2), apptTime.slice(3,5), apptTime.slice(6));
   p.date.setTime (p.date.getTime() - (leadTime * 60 * 1000));

   p.description   = description;
   p.apptId        = apptId;
   p.apptType      = apptType;
   p.apptRepAct    = apptRepAct;
   p.SnoozeTimeVal = defSnoozeTime;
   
   return (p);
}

function JSSAlarmMgr_GetAppointments()
{
   var now              = new Date();
   var inputArgs        = App ().NewPropertySet();
   var returnPropSet    = App ().NewPropertySet();
   var resultSetPropSet = App ().NewPropertySet();
   var testInterval     = new String((this.pollInterval / 60 / 1000) + (60 * 24));
   var tempArray;

   //UParthas: For FR 12-15TTHPA
   //alarmArray has the list of alarms that are pending to be fired. If one of the
   //alarms from this list is deleted, it is not deleted from the array. In order to 
   //overcome this caching, set the length to be zero. This might result in a slight
   //deterioration of performance, if there are many appointments in a day and all of them
   //have their alarms set.

   this.alarmArray.length = 0;
   var tempMinutes      = now.getMinutes();
   
   tempMinutes = (tempMinutes <10) ? "0" + tempMinutes : tempMinutes;
   
   inputArgs.SetProperty ("alarmDate", (1 + now.getMonth()) + "/" + now.getDate() + "/" + now.getFullYear());
   inputArgs.SetProperty ("now", now.getHours() + ":" + tempMinutes + ":" + now.getSeconds());
   inputArgs.SetProperty ("interval", testInterval);
   inputArgs.SetProperty ("SWEJI", "false");
   if (!bUIStringsLoaded)
      inputArgs.SetProperty ("packUIStrings", "true");

   returnPropSet = this.alarmService.InvokeMethod ("GetAlarms", inputArgs);

   if (returnPropSet != null)
   { 
      resultSetPropSet = returnPropSet.GetChildByType ("ResultSet");
      
      if (resultSetPropSet != null )
      {
         if (!bUIStringsLoaded) 
         {
            if (resultSetPropSet.GetProperty("strSnoozeTimes") != null) 
               strSnoozeTimes = resultSetPropSet.GetProperty("strSnoozeTimes");
          
            startTitle        = resultSetPropSet.GetProperty("Title");
            startLable        = resultSetPropSet.GetProperty("Start Time Label");
            endLable          = resultSetPropSet.GetProperty("End Time Label");
            snoozeForLable    = resultSetPropSet.GetProperty("Snooze For Label");
            snoozeLable       = resultSetPropSet.GetProperty("Snooze Button");
            snoozeAllLable    = resultSetPropSet.GetProperty("Snooze All Button");
            dismissLable      = resultSetPropSet.GetProperty("Dismiss Button");
            dismissAllLable   = resultSetPropSet.GetProperty("Dismiss All Button");
            prevLable         = resultSetPropSet.GetProperty("Previous Button");
            nextLable         = resultSetPropSet.GetProperty("Next Button");
            closeLable        = resultSetPropSet.GetProperty("Close Button");
            minutesLable      = resultSetPropSet.GetProperty("Minutes Label");
            typeLable         = resultSetPropSet.GetProperty("Type Label");
            despLable         = resultSetPropSet.GetProperty("Description Label");
            PropSetIndx       = 15;
            
            if (typeLable != null && typeLable != "")
               bUIStringsLoaded = true;
         }  
           
         var nPropertyCount = resultSetPropSet.GetPropertyCount();
         for (var i = 0; i * 11 < nPropertyCount - PropSetIndx; i++)
         {
            if (resultSetPropSet.GetProperty("apptDate" + i) == null)
               continue;
            var apptDate    = resultSetPropSet.GetProperty("apptDate" + i);
            var apptTime    = resultSetPropSet.GetProperty("apptTime" + i);
            var description = resultSetPropSet.GetProperty("apptDesc" + i);
            var apptId      = resultSetPropSet.GetProperty("apptId"   + i);
            var apptType    = resultSetPropSet.GetProperty("apptType" + i);
            var apptEndDate = resultSetPropSet.GetProperty("apptEndDate" + i);
            var apptEndTime = resultSetPropSet.GetProperty("apptEndTime" + i);
            var apptRepAct  = resultSetPropSet.GetProperty("repAct" + i);
            var AlarmLead   = resultSetPropSet.GetProperty("reminder" + i);
            var defSnoozeTime  = resultSetPropSet.GetProperty("defSnoozeTime" + i);
                     
            tempArray = this.CreateArrayObjects (apptDate, apptTime, description, apptId, apptEndDate, apptEndTime, apptType, apptRepAct, AlarmLead, defSnoozeTime);

            //UParthas: For FR 12-15TTHPA
            //Commented the block of code below. This block is redundant since at the very
            //beginning of this method, we are setting the array length to Zero. Not setting
            //the length to zero was causing caching of the alarms pending list. 
            /*
            var nArrayLen = this.alarmArray.length;
                                 
            if (nArrayLen != 0)
            {
               for (var j = 0; j < nArrayLen; j++)
               {
                  if (tempArray.apptId.indexOf(this.alarmArray[j].apptId) != -1)
                  {   
                     var tmpSnoozeTimeVal = this.alarmArray[j].SnoozeTimeVal;  
                     this.alarmArray[j] = tempArray;
                     this.alarmArray[j].SnoozeTimeVal = tmpSnoozeTimeVal;
                     break;
                  }
               }
           
               if (j == nArrayLen)
                  this.alarmArray[nArrayLen] = tempArray;
            }
            else
              this.alarmArray[0] = tempArray;
         }
         
			{
			}
	    */

	    //UParthas: For FR 12-15TTHPA. Add the item to the alarmArray
            this.alarmArray[i] = tempArray;
          }
         if (this.alarmArray.length > 1)
            this.alarmArray.sort(sortDate);
      }
      PropSetIndx = 0;
   } 
}

function JSSAlarmMgr()
{   
}

function JSSAlarmMgr_Init(isRTL, interval, reminderTime, acceptMsg, schedMsg, nowMsg)
{
   bIsRTL = isRTL;
   this.pollInterval    = interval * 60 * 1000;
   this.reminderTime    = reminderTime * 60 * 1000;
   this.nextPoll        = new Date();
   this.alarmArray      = new Array();
   this.initRetries     = 0;
   this.notifyGeneric   = 0;
   this.alarmService    = App().GetService ("Alarm Manager");   
}

function JSSAlarmMgr_NotifyGeneric (args)
{
   var now = new Date();
   this.notifyGeneric = 1;
   this.GetAppointments ();
   this.SettimeToSleep ();
}

function JSSAlarmMgr_Poll ()
{ 
   var firstElement;
   var now = new Date();

   if ((this.nextPoll <= now) && (this.alarmArray.length == 0) && (this.notifyGeneric == 0))
   {
      //Make sure RPC is ready
      try {
         this.GetAppointments();
      }
      catch (e) {
         this.initRetries++;
         if (this.initRetries <= 3)
         {
            //try again five seconds later if RPC was not ready
            this.timeoutId = setTimeout ("S_AlarmMgr.Poll()", 5000);
            return;
         } 
         else
         {
            //maximum attempts reached, wait for a longer time
            this.nextPoll.setTime (now.getTime() + this.pollInterval);
            this.timeoutId = setTimeout ("S_AlarmMgr.Poll()", this.pollInterval);
            this.initRetries = 0;
            return;
         }
      }
   }
   else 
   {
      this.notifyGeneric = 0;
      if (this.alarmArray.length != 0)
      { 
         firstElement = this.alarmArray[0];
     
         if (firstElement != null)
            JSSAlarmMgr_SetAlarmArray (firstElement);
           
         this.alarmArray = this.alarmArray.slice(1);
         if (!balarmFired)
            JSSAlarmMgr_OpenAlarmWindow();
      }
   }
   this.nextPoll.setTime (now.getTime() + this.pollInterval);
   this.SettimeToSleep ();
}

function JSSAlarmMgr_SettimeToSleep()
{
   var firstElement;
   var timeToSleep = 0;
   var now         = new Date();
   
   clearTimeout(this.timeoutId);

   firstElement = this.alarmArray[0];
   if (firstElement != null)
      timeToSleep = firstElement.date.getTime() - now.getTime();
   else
      timeToSleep = this.nextPoll.getTime() - now.getTime();    
   
   if (timeToSleep <= 0)
      timeToSleep = 0;
   else
      JSSAlarmMgr_moveAlarmWindow();

   this.timeoutId = setTimeout ("S_AlarmMgr.Poll()", timeToSleep);
}

function JSSAlarmMgr_SetApplication (app)
{
   this.application = app;
}

function JSSAlarmMgr_FocusAlarm()
{
   if (top.SWEPopupWinAlarm.closed != true)
      top.SWEPopupWinAlarm.focus();
} 

function JSSAlarmMgr_SetAlarmArray (newElement)
{
   var nGlobArrLen = alarmGlobalArray.length;
      
   if (nGlobArrLen != 0) 
   {
      for (var i = 0; i < nGlobArrLen; i++) 
      {
         // It is considered fired only if
         // 1. It is in the array
         // 2. The date (adjusted with leadtime) is the same (ZTONG)
         if (newElement.apptId.valueOf() == alarmGlobalArray[i].apptId.valueOf() &&
             newElement.date <= alarmGlobalArray[i].date) 
         {
            balarmFired = true;
            return;
         }
      }
   
      if (i == nGlobArrLen) 
      {
         alarmGlobalArray[nGlobArrLen] = newElement; 
         balarmFired = false;
         nCurrentItem++;
      }  
   }
   else 
   {
      alarmGlobalArray[0] = newElement;
      balarmFired = false;
      nCurrentItem = 0;
   }   
}

function JSSAlarmMgr_OpenAlarmWindow()
{
   var sAlarmBody, oAlarmDocument, body, deltaX, deltaY;
   
   if (!bUIStringsLoaded)
      return;
      
   if (top.SWEPopupWinAlarm == null)
   { 
      // Fix for 12-COWGQ7: Do not put the name of the new window created for alarm since if you open 2
      // applications it wil update the same window.
      top.SWEPopupWinAlarm = window.open('', '', 'toolbar=no,status=no,width=10,height=10,top=10250,left=250');
      sAlarmBody = S_AlarmMgr.BuildAlarmBody(); 
      oAlarmDocument = top.SWEPopupWinAlarm.document;
      oAlarmDocument.write(sAlarmBody);
      body = oAlarmDocument.body;
      deltaX  = body.scrollWidth - body.offsetWidth;
      deltaY  = body.scrollHeight - body.offsetHeight;
      top.SWEPopupWinAlarm.resizeBy(deltaX, deltaY);
      
      JSSAlarmMgr_UpdateSnoozeSelect();
      JSSAlarmMgr_UpdateAlarmWindow();
      dAlarmOpenWimdow = new Date();
   }
   else 
   {
      if (Date.parse(dAlarmOpenWimdow) < Date.parse(alarmGlobalArray[nCurrentItem].date))
         top.SWEPopupWinAlarm.document.write("<bgsound id=oBGSound src='files/ringin.au' volume=0>");
   
      JSSAlarmMgr_UpdateAlarmWindow();
   }
}

function JSSAlarmMgr_moveAlarmWindow()
{
   if (top.SWEPopupWinAlarm != null && !bmoveAlarmWindow)
   {
      bmoveAlarmWindow = true;
      top.SWEPopupWinAlarm.moveBy(0, -10000);
      top.SWEPopupWinAlarm.document.write("<bgsound id=oBGSound src='files/ringin.au' volume=0>");
   }
}

function JSSAlarmMgr_UpdateSnoozeSelect()
{
   var oSelect = top.SWEPopupWinAlarm.document.getElementById("SnoozeTime");
   var aSnoozeTimes = strSnoozeTimes.split("|");
   
   nOptionCount =  aSnoozeTimes.length;   
   aSnoozeTimes.sort(sortTime)
      
   for (var index=0; index < nOptionCount; index++)
   {
      var oOption = top.SWEPopupWinAlarm.document.createElement("OPTION");
      oOption.text = aSnoozeTimes[index] + " " + minutesLable;
      oOption.value = aSnoozeTimes[index];
      oSelect.add(oOption);
   }
}

function SelectSnoozeIndex (snoozeVal)
{
   var oSnoozeSelect = top.SWEPopupWinAlarm.document.getElementById("SnoozeTime");
   
   for (var index=0; index < nOptionCount; index++)
   {
      if (oSnoozeSelect.options[index].value == snoozeVal)
      {   
         oSnoozeSelect.options[index].selected = true;
         return;
      }
   }
}

function JSSAlarmMgr_UpdateAlarmWindow()
{
   var nglobArraylen = alarmGlobalArray.length;
      
   if (nglobArraylen == 0)
   {
      top.SWEPopupWinAlarm.close();
      return;   
   }
   
   if (nCurrentItem >= 0)
   {
      var TargetWindowDocument = top.SWEPopupWinAlarm.document;
      var displayStartDate, displayStartTime, displayEndDate, displayEndTime;
      
      if ( JSSAlarmMgr_Locale == null)
         JSSAlarmMgr_Locale = App().GetLocale ();
      if ( JSSAlarmMgr_dateFormat == "")
         JSSAlarmMgr_dateFormat   = JSSAlarmMgr_Locale.GetProfile (JSSConsts.LOCAL_LONG_DATE_FORMAT);
      if ( JSSAlarmMgr_timeFormat == "")
         JSSAlarmMgr_timeFormat   = JSSAlarmMgr_Locale.GetProfile (JSSConsts.LOCAL_TIME_NOSEC_FORMAT);

      displayStartDate = JSSAlarmMgr_Locale.GetStringFromDateTime(alarmGlobalArray[nCurrentItem].actualDate,  JSSAlarmMgr_formatDateIn, JSSAlarmMgr_dateFormat);
      displayStartTime = JSSAlarmMgr_Locale.GetStringFromDateTime(alarmGlobalArray[nCurrentItem].actualTime,  JSSAlarmMgr_formatTimeIn, JSSAlarmMgr_timeFormat);
      displayEndDate   = JSSAlarmMgr_Locale.GetStringFromDateTime(alarmGlobalArray[nCurrentItem].endDate,  JSSAlarmMgr_formatDateIn, JSSAlarmMgr_dateFormat);
      displayEndTime   = JSSAlarmMgr_Locale.GetStringFromDateTime(alarmGlobalArray[nCurrentItem].endTime,  JSSAlarmMgr_formatTimeIn, JSSAlarmMgr_timeFormat);
            
      TargetWindowDocument.getElementById("IDtype").innerText = alarmGlobalArray[nCurrentItem].apptType;
      TargetWindowDocument.getElementById("IDdesc").innerText = alarmGlobalArray[nCurrentItem].description;
      TargetWindowDocument.getElementById("IDdesc").title = alarmGlobalArray[nCurrentItem].description;
      TargetWindowDocument.getElementById("IDStartTime").innerText = displayStartDate + " " + displayStartTime;
      TargetWindowDocument.getElementById("IDEndTime").innerText = displayEndDate + " " + displayEndTime;
      SelectSnoozeIndex(alarmGlobalArray[nCurrentItem].SnoozeTimeVal);
                    
      if (nglobArraylen == 1)
      {
         JSSAlarmMgr_DisableButton("btnSnoozeAll");
         JSSAlarmMgr_DisableButton("btnDismissAll");
         JSSAlarmMgr_DisableButton("btnPrev");
         JSSAlarmMgr_DisableButton("btnNext");
      }
      else 
      {
         JSSAlarmMgr_EnableButton("btnSnoozeAll");
         JSSAlarmMgr_EnableButton("btnDismissAll");

         if (nCurrentItem == 0)
         {
            JSSAlarmMgr_DisableButton("btnPrev");
            JSSAlarmMgr_EnableButton("btnNext");
         }
         else if ( nCurrentItem == nglobArraylen - 1) 
         {
            JSSAlarmMgr_DisableButton("btnNext");
            JSSAlarmMgr_EnableButton("btnPrev");
         }
         else 
         {
            JSSAlarmMgr_EnableButton("btnPrev");
            JSSAlarmMgr_EnableButton("btnNext");
         }
      }
      JSSAlarmMgr_FocusAlarm();   
   }
}

function JSSAlarmMgr_PrevAlarm()
{
   if (!top.SWEPopupWinAlarm.document.getElementById("btnPrev").disabled)
   {
      if (nCurrentItem != 0) 
      {
         nCurrentItem--;
         JSSAlarmMgr_UpdateAlarmWindow();
      }
   }  
}

function JSSAlarmMgr_NextAlarm()
{
   if (!top.SWEPopupWinAlarm.document.getElementById("btnNext").disabled)
   {
      if (nCurrentItem < alarmGlobalArray.length) 
      {
         nCurrentItem++;
         JSSAlarmMgr_UpdateAlarmWindow();
      }
   }
}

function JSSAlarmMgr_EnableButton(sBtnID)
{
   if (sBtnID == "btnNext" || sBtnID == "btnPrev" )
      top.SWEPopupWinAlarm.document.getElementById(sBtnID).disabled = false; 
   else
      top.SWEPopupWinAlarm.document.getElementById(sBtnID).style.visibility = "visible"; 
}

function JSSAlarmMgr_DisableButton(sBtnID)
{
   if (sBtnID == "btnNext" || sBtnID == "btnPrev" )
      top.SWEPopupWinAlarm.document.getElementById(sBtnID).disabled = true; 
   else
      top.SWEPopupWinAlarm.document.getElementById(sBtnID).style.visibility = "hidden"; 
}

function JSSAlarmMgr_SnoozeAlarm()
{
   var newElement;
   var now      = new Date();
   var oSelect = top.SWEPopupWinAlarm.document.getElementById("SnoozeTime");
   var nSnoozeTime = oSelect.options[oSelect.selectedIndex].value;
      
   alarmGlobalArray[nCurrentItem].date = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
   alarmGlobalArray[nCurrentItem].date.setTime(now.getTime() + (nSnoozeTime * 60 * 1000));
   newElement = alarmGlobalArray[nCurrentItem];
   
   alarmGlobalArray[nCurrentItem] = null;
   JSSAlarmMgr_RemoveFromGlobalArray();
   S_AlarmMgr.AddToAlarmArray(newElement);
   S_AlarmMgr.alarmArray.sort(sortDate);
   S_AlarmMgr.SettimeToSleep ();
   JSSAlarmMgr_UpdateAlarmWindow();
}

function JSSAlarmMgr_RemoveFromGlobalArray()
{   
   var j          = 0;
   var tempArray  = new Array();
   var nArrlen    = alarmGlobalArray.length;
   
   for (var i = 0; i < nArrlen; i++) 
   {
      if (alarmGlobalArray[i] != null) 
      {
         tempArray[j] = alarmGlobalArray[i];
         j++;
      }
   }
   alarmGlobalArray = tempArray;
   nCurrentItem = alarmGlobalArray.length - 1;
}

function JSSAlarmMgr_AddToAlarmArray (newElement)
{   
   var nArrlen = this.alarmArray.length;
   
   if (nArrlen != 0)
   {
      for (var i = 0; i < nArrlen; i++)
      {
         if (this.alarmArray[i].apptId.indexOf(newElement.apptId) != -1)
            this.alarmArray[i] = newElement; 
      }
     
      if (i == nArrlen)
         this.alarmArray[nArrlen] = newElement; 
   }
   else
     this.alarmArray[0] = newElement;
}

function JSSAlarmMgr_SnoozeAll()
{
   var newElement;
   var now         = new Date();
   var oSelect     = top.SWEPopupWinAlarm.document.getElementById("SnoozeTime");
   var nSnoozeTime = oSelect.options[oSelect.selectedIndex].value;

   if (nSnoozeTime <= 0)
      nSnoozeTime = defaultSnooze;

   while (alarmGlobalArray.length != 0) 
   {
      alarmGlobalArray[0].date = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
      alarmGlobalArray[0].date.setTime(now.getTime() + (nSnoozeTime * 60 * 1000));
      newElement = alarmGlobalArray[0];
      alarmGlobalArray[0] = null;
      JSSAlarmMgr_RemoveFromGlobalArray ();
      S_AlarmMgr.AddToAlarmArray (newElement);
   }
   
   top.SWEPopupWinAlarm.close ();
   S_AlarmMgr.alarmArray.sort (sortDate);
   S_AlarmMgr.SettimeToSleep ();
}

function JSSAlarmMgr_DismissAlarm()
{
   var newElement = alarmGlobalArray[nCurrentItem];
   var inputArgs  = App().NewPropertySet ();
   
   alarmGlobalArray[nCurrentItem] = null;
   JSSAlarmMgr_RemoveFromGlobalArray();
   JSSAlarmMgr_UpdateAlarmWindow();
   
   if (newElement.apptRepAct == "N") 
   {
      inputArgs.SetProperty("alarmId", newElement.apptId + "|");
      inputArgs.SetProperty("SWEJSXInfo", "false");
      S_AlarmMgr.alarmService.InvokeMethod("DismissAlarm", inputArgs);
   }   
}

function JSSAlarmMgr_DismissAll()
{
   var inputArgs  = App().NewPropertySet ();
   var strTemp    = "";
      
   top.SWEPopupWinAlarm.close();
   
   while (alarmGlobalArray.length != 0)
   {
      var newElement = alarmGlobalArray[0];
      alarmGlobalArray[0] = null;
      JSSAlarmMgr_RemoveFromGlobalArray();
   
      if (newElement.apptRepAct == "N")
         strTemp += newElement.apptId + "|";
      else
         continue;   
   }
   
   if (strTemp != "" )
   {
      inputArgs.SetProperty("alarmId", strTemp);
      inputArgs.SetProperty("SWEJSXInfo", "false");
      S_AlarmMgr.alarmService.InvokeMethod("DismissAlarm", inputArgs);
   }
}

function JSSAlarmMgr_CloseWindow()
{
   top.SWEPopupWinAlarm = null;
   nCurrentItem         = -1;
   dAlarmOpenWimdow     = null;
   bmoveAlarmWindow     = false;
}

function JSSAlarmMgr_Close()
{
   top.SWEPopupWinAlarm.close();
}

function SnoozeTimeChange()
{
   var oSnoozeTime = top.SWEPopupWinAlarm.document.getElementById("SnoozeTime");
   
   alarmGlobalArray[nCurrentItem].SnoozeTimeVal = oSnoozeTime.options[oSnoozeTime.selectedIndex].value;
}

function JSSAlarmMgr_BuildAlarmBody()
{
   //check if this is RTL
   var bodyTag = "";
   if (bIsRTL)
      bodyTag = "<body dir='rtl' topmargin=0 leftmargin=0 marginwidth=0 marginheight=0 onbeforeunload=opener.JSSAlarmMgr_CloseWindow()>";
   else
      bodyTag = "<body topmargin=0 leftmargin=0 marginwidth=0 marginheight=0 onbeforeunload=opener.JSSAlarmMgr_CloseWindow()>"   

   var sScript = "<SCRIPT>function cancelClick(){return false;}document.oncontextmenu=cancelClick;</SCRIPT>"
      
   var AlarmDoc = "<html><head>"+sScript+"<title>"+startTitle+"</title>"+
   "<link href='files/main.css' rel='stylesheet'></head>"+
   bodyTag+
   "<table width=100% height=100% cellSpacing=0 cellPadding=0 align=center border=0>"+
      "<tr><td><table bgcolor=white width=100% cellSpacing=0 cellPadding=0 align=center border=0>"+
         "<tr>" +
            "<td width=80%>"+
               "<table width=100% cellpadding=2 cellspacing=1>"+
                  "<tr valign=top>"+
                     "<td>"+
                        "<div style=width:300;overflow:hidden><table cellpadding=0 cellspacing=0 border=0>"+
                           "<tr style='padding-bottom:5px'>"+
                              "<td>&nbsp;</td>"+
                              "<td class=scLabelRight nowrap>"+typeLable+"</td>"+
                              "<td style='padding-left:5px' id=IDtype nowrap></td>"+
                           "</tr>"+
                           "<tr style='padding-bottom:8px'>"+
                              "<td>&nbsp;</td>"+
                              "<td class=scLabelRight nowrap></td>"+
                              "<td style='padding-left:5px'><textarea id=IDdesc nowrap rows=3 cols=45 readonly></textarea></td>"+
                           "</tr>"+
                           "<tr>"+
                              "<td>&nbsp;</td>"+
                              "<td class=scLabelRight nowrap>"+startLable+"</td>"+
                              "<td style='padding-left:5px' id=IDStartTime nowrap></td>"+
                           "</tr>"+
                           "<tr>"+
                              "<td>&nbsp;</td>"+
                              "<td class=scLabelRight nowrap>"+endLable+"</td>"+
                              "<td style='padding-left:5px' id=IDEndTime nowrap></td>"+
                           "</tr>"+
                        "</table></div>"+
                     "</td></tr>"+
                  "<tr valign=top>"+
                     "<td>"+         
                        "<table border=0 cellpadding=6  cellspacing=0>"+
                           "<tr valign=top>"+
                              "<td valign=center width=45% nowrap>"+snoozeForLable+"</td>"+
                              "<td valign=center width=60%>"+
                                 "<select id=SnoozeTime name='SnoozeTime' onChange=opener.SnoozeTimeChange()></select>"+
                              "</td>"+
                           "</tr>"+
                        "</table>"+
                     "</td>"+
                  "<tr>"+
               "</table>"+
            "</td>"+
            "<td width=20%>"+
               "<table width=100% cellpadding=0 cellspacing=10>"+
                  "<tr><td>"+
                     "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
                             "<tr><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_SnoozeAlarm()>"+snoozeLable+"</A></nobr></td></tr>"+
                         "</table>"+
                  "</td></tr>"+
                  "<tr><td>"+
                     "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
                         "<tr><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_DismissAlarm()>"+dismissLable+"</A></nobr></td></tr>"+
                     "</table>"+
                  "</td></tr>"+
                  "<tr>"+
                     "<td>&nbsp;</td>"+
                  "</tr>"+
               "</table>"+
            "</td>"+
         "</tr>"+
      "</table></td></tr>"+
      "<tr><td><table width=100% cellSpacing=10 cellPadding=0 bgcolor=#cccccc>"+
         "<tr>"+
            "<td>"+
            "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
               "<tr id=btnSnoozeAll style=visibility:hidden><td class=minibuttonOn valign=middle><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_SnoozeAll()>"+snoozeAllLable+"</A></nobr></td></tr>" +
             "</table></td>" +
            "<td>" +
            "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>" +
               "<tr id=btnDismissAll style=visibility:hidden><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_DismissAll()>" + dismissAllLable + "</A></nobr></td></tr>"+
             "</table></td>"+
            "<td>"+
            "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
               "<tr id=btnPrev><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_PrevAlarm()>"+prevLable+"</A></nobr></td></tr>"+
             "</table></td>"+
            "<td>"+
            "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
               "<tr id=btnNext><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_NextAlarm()>"+nextLable+"</A></nobr></td></tr>"+
             "</table></td>"+
            "<td>"+
            "<table class=minibutton border=0 cellpadding=0 cellspacing=0 height=10>"+
               "<tr><td class=minibuttonOn align=center><nobr><A style=cursor:hand;overflow:visible;height:100% onclick=opener.JSSAlarmMgr_Close()>"+closeLable+"</A></nobr></td></tr>"+
             "</table></td>"+
         "</tr>"+
      "</table></td></tr>"+   
   "</table></body></html>";
   
   return AlarmDoc;
}

JSSAlarmMgr.prototype.CreateArrayObjects  = JSSAlarmMgr_CreateArrayObjects;
JSSAlarmMgr.prototype.GetAppointments     = JSSAlarmMgr_GetAppointments;
JSSAlarmMgr.prototype.Init                = JSSAlarmMgr_Init;
JSSAlarmMgr.prototype.NotifyGeneric       = JSSAlarmMgr_NotifyGeneric;
JSSAlarmMgr.prototype.Poll                = JSSAlarmMgr_Poll;
JSSAlarmMgr.prototype.SetApplication      = JSSAlarmMgr_SetApplication;
JSSAlarmMgr.prototype.BuildAlarmBody      = JSSAlarmMgr_BuildAlarmBody;
JSSAlarmMgr.prototype.AddToAlarmArray     = JSSAlarmMgr_AddToAlarmArray;
JSSAlarmMgr.prototype.SettimeToSleep      = JSSAlarmMgr_SettimeToSleep;

