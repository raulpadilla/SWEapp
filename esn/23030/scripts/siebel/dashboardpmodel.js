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
if(typeof(SiebelAppFacade.DashboardPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.DashboardPresentationModel");SiebelAppFacade.DashboardPresentationModel=(function(){var f=SiebelJS.Dependency("SiebelApp.Constants");var i=SiebelJS.Dependency("SiebelApp.Utils");var e=false;var a;var g;function h(){}SiebelJS.Extend(h,SiebelAppFacade.PresentationModel);h.prototype.Init=function(){SiebelAppFacade.DashboardPresentationModel.superclass.Init.call(this);this.AddProperty("UpdateNavigation",false);this.AddMethod("InvokeServiceMethod",function(k,l,m){var j=SiebelApp.S_App.GetService(f.get("NAME_DASHBOARDSVC"));if(j){m=j.InvokeMethod(k,l,true)}});this.AttachEventHandler(f.get("PHYEVENT_CONTROL_FOCUS"),function(j){if(j.GetName()==="Quick Navigation"){this.ExecuteMethod("SetActiveControl",j);return false}return true});this.AttachEventHandler(f.get("PHYEVENT_INVOKE_COMBO"),function(j){this.ExecuteMethod("SetActiveControl",j);this.SetProperty("UpdateNavigation",true);return true});this.AttachEventHandler(f.get("DASHBOARD_CLOSE"),function(){var k=CCFMiscUtil_CreatePropSet();var j=CCFMiscUtil_CreatePropSet();this.ExecuteMethod("InvokeServiceMethod",f.get("METH_CLOSEDASHBOARD"),k,j);SiebelApp.S_App.UnregisterExtObject("Dashboard")})};h.prototype.SetProxy=function(j){SiebelAppFacade.DashboardPresentationModel.superclass.constructor.call(this,j)};h.prototype.Setup=function(j){c.call(this,j)};h.prototype.HandleNotify=function(j){c.call(this,j)};h.prototype.Show=function(){if(e){SiebelAppFacade.DashboardPresentationModel.superclass.Show.call(this)}};function c(u){e=false;if(i.IsEmpty(a)){a=new SiebelApp.S_App.BusObj()}if(i.IsEmpty(g)){g=new SiebelApp.S_App.View()}var n=u.EnumChildren(true);if(!n){return}var m=f.get("SWE_PST_BUSOBJ_INFO");var q=f.get("SWE_PST_VIEW_INFO");var v=f.get("SWE_PST_STR_CACHE");var k=f.get("SWE_GET_PICK_INFO");var o;var t=SiebelApp.S_App.GetActiveBusObj();var p=SiebelApp.S_App.GetActiveView();SiebelApp.S_App.SetActiveView(g);SiebelApp.S_App.SetActiveBusObj(a);do{var r=n.GetType();switch(r){case v:SiebelApp.S_App.AppendToStrCache(n.GetProperty(f.get("SWE_PROP_VALUE")));break;case m:a.ProcessObjectInfo(n);var w=a.GetBCMap();for(var s in w){if(w.hasOwnProperty(s)){w[s].SetBusObj(a)}}break;case q:d(n);g.GetFilesAndProcessObjectInfo(n);break;case k:o=n;break}}while((n=u.EnumChildren(false)));var y=g.GetAppletMap();for(var j in y){if(y.hasOwnProperty(j)){var l=y[j];l.SetBusComp(g.GetBusObj().GetBusComp(l.GetBCId()));l.GetBusComp().Register(l);l.SetPModel(this);l.IsEditable=function(){return"1"};var x=o&&o.GetChildCount()>0;l.GetCanInvokeByName()["Quick Navigate"].bCanInvoke=x;this.SetProxy(l)}}SiebelApp.S_App.SetActiveView(p);SiebelApp.S_App.SetActiveBusObj(t);if(o){b.call(this,o)}u.SetProperty("SWE_OUI_RENDERER","DashboardPhyRenderer");SiebelAppFacade.DashboardPresentationModel.superclass.Setup.call(this,u);e=true}function d(j){var l=j.EnumChildren(true);do{if(l){var k=l.EnumChildren(true);do{if(k){k.RemoveProperty(f.get("SWE_PST_CLIENT_DESCRIPTOR_INFO"))}}while((k=l.EnumChildren(false)))}}while((l=j.EnumChildren(false)))}function b(k){var j=[];var l=k.EnumChildren(true);if(!l){return}do{j.push(l.GetProperty("FieldValue"))}while((l=k.EnumChildren(false)));this.SetProperty("navigations",j)}return h}())};