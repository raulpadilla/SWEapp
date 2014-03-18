/*****************************************************************************
 *
 * Copyright (C) 2001, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       
 *  $Revision: 14 $
 *      $Date: 11/04/01 12:07a $
 *    $Author: Mrfreeze $ of last update
 *
 * CREATOR:    Roy Selig
 *
 * DESCRIPTION:
 *    	Login Page Functions
 *****************************************************************************/	

//init
var ns=(navigator.appName.indexOf("Netscape")>-1 && parseInt(navigator.appVersion)>3)?true:false;
var ns6=(navigator.appName.indexOf("Netscape")>-1 && parseInt(navigator.appVersion)>4)?true:false;
var ie=(navigator.appName.indexOf("Microsoft")>-1 && parseInt(navigator.appVersion)>3)?true:false;
var loginWidth=653;
var loginHeight=365;
var loginLayer="login";
 
function userfocus()  {document.SWEEntryForm.SWEUserName.focus();}
function pwdcleaner() {document.SWEEntryForm.SWEPassword.value="";} 

//Centers login layer in NS4.x+ and IE4.x+  
function centerElement()
{	
	if (ns || ns6 || ie)			
	{	
		winWidth  = (ie) ? document.body.offsetWidth  : window.innerWidth;
		winHeight = (ie) ? document.body.offsetHeight : window.innerHeight;
		
		var left = parseInt((winWidth - loginWidth)/2);
		var top  = parseInt((winHeight - loginHeight)/2);	
		
		if (ie || ns6) 
		{	var obj=document.getElementById(loginLayer);
			if (obj){obj.style.left=left; 	obj.style.top=top;}					
		}
		else if (ns) 
		{	var obj = eval("document." + loginLayer);
			if (obj){obj.left=left; 	obj.top=top;}			
		}	
			
		window.onresize=centerElement;
	}
}

var   g_bInitialized = false;

//this function is only used in login page
function SWEExecuteLogin(formObj, action, target)
{
   if (! g_bInitialized)
      return;

   if (action != null)
      formObj.action = action;

   if (target != null)
      formObj.target = target;

   if (typeof(formObj.SWETS) != 'undefined') //always append timestamp
   {
      var now  = new Date();
      formObj.SWETS.value = now.getTime();
   }
   
   if (typeof(formObj.SWEC) != 'undefined')
   	formObj.SWEC.value = 0;

   formObj.SWECmd.value = "ExecuteLogin";
   formObj.submit();
}
