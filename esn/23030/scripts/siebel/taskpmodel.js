/*<ORACLECOPYRIGHT>
* Copyright (C) 1994-2013 Oracle and/or its affiliates. All rights reserved.
* Oracle and Java are registered trademarks of Oracle and/or its affiliates.
* Other names may be trademarks of their respective owners.
* UNIX is a registered trademark of The Open Group.
*
* This software and related documentation are provided under a license agreement
* containing restrictions on use and disclosure and are protected by intellectual property laws.
* Except as expressly permitted in your license agreement or allowed by law, you may not use, copy,
* reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish,
* or display any part, in any form, or by any means. Reverse engineering, disassembly,
* or decompilation of this software, unless required by law for interoperability, is prohibited.
*
* The information contained herein is subject to change without notice and is not warranted to be error-free.
* If you find any errors, please report them to us in writing.
*
* U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S.
* Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable
* Federal Acquisition Regulation and agency-specific supplemental regulations.
* As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and
* license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the
* Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License
* (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065.
*
* This software or hardware is developed for general use in a variety of information management applications.
* It is not developed or intended for use in any inherently dangerous applications, including applications that
* may create a risk of personal injury. If you use this software or hardware in dangerous applications,
* then you shall be responsible to take all appropriate fail-safe, backup, redundancy,
* and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any
* damages caused by use of this software or hardware in dangerous applications.
*
* This software or hardware and documentation may provide access to or information on content,
* products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and
* expressly disclaim all warranties of any kind with respect to third-party content, products, and services.
* Oracle Corporation and its affiliates will not be responsible for any loss, costs,
* or damages incurred due to your access to or use of third-party content, products, or services.
</ORACLECOPYRIGHT>*/
if(typeof(SiebelAppFacade.TaskPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.TaskPresentationModel");SiebelAppFacade.TaskPresentationModel=(function(){var e=SiebelJS.Dependency("SiebelApp.Constants");var i=SiebelJS.Dependency("SiebelApp.Utils");var j=e.get("TSK_PST_TYPE_LOCALE");var a=e.get("TSK_PST_TYPE_TASKCONTEXT");var c=e.get("TSK_PST_TYPE_CURRENTTASK");function f(){SiebelAppFacade.TaskPresentationModel.superclass.constructor.call(this,{GetName:function(){return"TaskObject"}})}SiebelJS.Extend(f,SiebelAppFacade.PresentationModel);f.prototype.Init=function(){this.AddProperty("GetContainer","s_TaskUIPane");this.AddProperty("TaskRefresh",false);this.AddMethod("InvokeServiceMethod",function(m,n,o){var l=SiebelApp.S_App.GetService(e.get("NAME_TASKUISVC"));if(l){o=l.InvokeMethod(m,n,true)}});this.AddMethod("OnTaskNavigate",function(m,n){var o=CCFMiscUtil_CreatePropSet();var l=CCFMiscUtil_CreatePropSet();o.SetProperty(e.get("SWE_VIEW_ID_STR"),e.get("TASKPANE_VIEWNAME"));o.SetProperty("TaskName",n.data.key);o.SetProperty("GroupName",n.parent.data.key);this.ExecuteMethod("InvokeServiceMethod",m,o,l)});this.AttachEventHandler("TaskNavigate","OnTaskNavigate");this.AttachEventHandler(e.get("TASK_PANE_CLOSE"),function(){var m=CCFMiscUtil_CreatePropSet();var l=CCFMiscUtil_CreatePropSet();m.SetProperty(e.get("SWE_VIEW_ID_STR"),e.get("TASKPANE_VIEWNAME"));this.ExecuteMethod("InvokeServiceMethod",e.get("METH_TOGGLETASKPANE"),m,l);SiebelApp.S_App.UnregisterExtObject("TaskUIPane")});this.AttachEventHandler(e.get("TASK_NAVIGATE_INBOX"),function(){var m=CCFMiscUtil_CreatePropSet();var l=CCFMiscUtil_CreatePropSet();m.SetProperty(e.get("SWE_VIEW_ID_STR"),e.get("TASKPANE_VIEWNAME"));this.ExecuteMethod("InvokeServiceMethod",e.get("METH_GOTOINBOX"),m,l)})};f.prototype.Setup=function(l){l.SetProperty("SWE_OUI_RENDERER","TaskPhyRenderer");SiebelAppFacade.TaskPresentationModel.superclass.Setup.call(this,l);b.call(this,l)};f.prototype.HandleNotify=function(l){this.AddProperty("TaskContext",{});this.AddProperty("LocaleInfo",{});this.AddProperty("CurrentTask",{});this.AddProperty("CurrentTaskChapter",{});b.call(this,l);this.SetProperty("TaskRefresh",true)};function b(m){for(var n=0,l=m.GetChildCount();n<l;n++){var o=m.GetChild(n);switch(o.GetType()){case j:this.AddProperty("LocaleInfo",d.call(this,o));break;case a:this.AddProperty("TaskContext",g.call(this,o));break;case c:this.AddProperty("CurrentTask",k.call(this,o));this.AddProperty("CurrentTaskChapter",h.call(this,o));break}}}function d(p){if(p.GetType()!==j){return}var o=true;var r;var m;var q={};for(var n=0,l=p.GetPropertyCount();n<l;n++){if(o){r=p.GetFirstProperty();o=false}else{r=p.GetNextProperty()}m=p.GetProperty(r);if(r==="IDS_TASKPANE_CAPTION"){q.CAPTION=m}else{if(r==="IDS_TASKPANE_PROGRESS"){q.PROGRESS=m}else{if(r==="IDS_TASKPANE_GOTOINBOX"){q.GOTOINBOX=m}}}}return q}function g(r){if(r.GetType()!==a){return}var u=[];for(var p=0,q=r.GetChildCount();p<q;p++){var t={};var s=r.GetChild(p);var n=[];t={GrpDispName:s.GetProperty(e.get("TSK_GROUP_DISPLAY_NAME")),grpName:s.GetProperty(e.get("TSK_GROUP_NAME")),goupSeq:s.GetProperty(e.get("TSK_GROUP_SEQUENCE"))};for(var o=0,m=s.GetChildCount();o<m;o++){var l={};var v=s.GetChild(o);l={TaskDispName:v.GetProperty(e.get("TSK_TASK_DISPLAY_NAME")),TaskName:v.GetProperty(e.get("TSK_TASK_NAME")),TaskSeq:v.GetProperty(e.get("TSK_SEQUENCE_NUMBER")),ItemType:v.GetProperty(e.get("TSK_ITEM_TYPE"))};n.push(l)}t.TASKLIST=n;u.push(t)}return u}function k(l){return{TACS:l.GetProperty(e.get("TSK_ACTIVE_CHAPTER_SEQ")),TASS:l.GetProperty(e.get("TSK_ACTIVE_STEP_SEQ")),TAT:l.GetProperty(e.get("TSK_ACTIVE_TASK")),TaskDispName:l.GetProperty(e.get("TSK_TASK_DISPLAY_NAME"))}}function h(r){var u=[];for(var o=0,q=r.GetChildCount();o<q;o++){var s=r.GetChild(o);var m={CDN:s.GetProperty(e.get("TSK_CHAPTER_DISPLAY_NAME")),CS:s.GetProperty(e.get("TSK_CHAPTER_SEQUENCE"))};var t=[];for(var n=0,l=s.GetChildCount();n<l;n++){var p=s.GetChild(n);t.push({TSN:p.GetProperty(e.get("TSK_SEQUENCE_NUMBER")),TSDN:p.GetProperty(e.get("TSK_STEP_DISPLAY_NAME")),SN:p.GetProperty(e.get("TSK_STEP_NAME")),TID:p.GetProperty(e.get("TSK_STEP_INSTANCE_ID"))})}m.STEPS=t;u.push(m)}return u}return f}())};