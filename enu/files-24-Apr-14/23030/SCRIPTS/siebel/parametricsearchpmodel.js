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
if(typeof(SiebelAppFacade.ParametricSearchPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ParametricSearchPresentationModel");define("siebel/parametricsearchpmodel",["siebel/pmodel"],function(){SiebelAppFacade.ParametricSearchPresentationModel=(function(){var j=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants");var i=SiebelJS.Dependency("SiebelApp.Constants");function d(m){SiebelAppFacade.ParametricSearchPresentationModel.superclass.constructor.call(this,m);this.CleanInternalStructs=function(){this.SetProperty("MltSelHTMLIdsToRowDefsMap",{});this.SetProperty("RowIdsToFieldDefsMap",{})}}SiebelJS.Extend(d,SiebelAppFacade.PresentationModel);d.prototype.Init=function(){SiebelAppFacade.ParametricSearchPresentationModel.superclass.Init.call(this);this.AddProperty("PopulateNeeded",true);this.AddProperty("SpanInnerHTML","");this.AddProperty("MltSelHTMLIdsToRowDefsMap",{});this.AddProperty("RowIdsToFieldDefsMap",{});this.AddMethod("CanNavigate",function(m){return false},{scope:this,override:true,core:false});this.AddMethod("AddFieldDef",g);this.AddMethod("AddMltSelRowDef",b);this.AddMethod("EventInvokeMethod",f);this.AddMethod("EventOnChangeSelectTag",k);this.AddMethod("GetFieldDefs",h);this.AddMethod("SearchPurgeFieldValues",c);this.AddMethod("SearchUpdateFieldValue",e);this.AttachEventHandler("SearchUpdateFieldValue",e);this.AttachEventHandler("EventInvokeMethod",f);this.AttachEventHandler("EventOnChangeSelectTag",k);this.AttachNotificationHandler(i.get("SWE_PROP_BC_NOTI_GENERIC"),function(m){var o=m.GetProperty("type");var q=[];var n=m.GetProperty(i.get("SWE_PROP_ARGS_ARRAY"));if(n){CCFMiscUtil_StringToArray(n,q)}switch(o){case"RefreshRowFieldDefs":var p=CCFMiscUtil_CreatePropSet();p.DecodeFromString(q[0]);l.call(this,p);break;case"RefreshSpanInnerHTML":this.SetProperty("SpanInnerHTML",q[0]);this.SetProperty("PopulateNeeded",true);break;case"RefreshAppletJS":default:break}})};d.prototype.Setup=function(m){SiebelAppFacade.ParametricSearchPresentationModel.superclass.Setup.call(this,m);var o=m.EnumChildren(true);if(o){do{if(o.GetType()===i.get("SWE_PST_CNTRL_LIST")){var n=o.EnumChildren(true);if(n){do{if(n.GetType()===i.get("SWE_PST_CUSTOM_CTRL")){a.call(this,n.GetChild(0));break}}while(n=o.EnumChildren(false));break}}}while(o=m.EnumChildren(false))}};function g(o,m,p){var n=this.Get("RowIdsToFieldDefsMap");if(!n[o]){n[o]={}}n[o][m]=p}function b(m,o,p){var n=this.Get("MltSelHTMLIdsToRowDefsMap");if(n.hasOwnProperty(m)){n[m].slice(0,1)}n[m]={};n[m]["RowId"]=o;n[m]["RowIndex"]=p}function f(m,q){var p;var r="";var o;p=CCFMiscUtil_CreatePropSet();p.SetProperty("SWEReqRowId","0");p.SetProperty("SWERowId",q);o=h.call(this,q);if(q!=="Dummy"&&!o){return false}for(var n in o){if(o.hasOwnProperty(n)){p.SetProperty(n,o[n])}}this.ExecuteMethod("InvokeMethod",m,p,true)}function k(m,n){var o=CCFMiscUtil_CreatePropSet();o.SetProperty("SWEReqRowId","0");o.SetProperty("FieldValue",n);this.ExecuteMethod("InvokeMethod",m,o,true)}function h(n){var m=this.Get("RowIdsToFieldDefsMap");if(m.hasOwnProperty(n)){return m[n]}else{return null}}function a(o){var n=o.EnumChildren(true);if(n){do{var m=n.GetType();switch(m){case"AppletJS":break;case"AppletRowData":l.call(this,n);break;case"SpanInnerHTML":var p=n.GetProperty("HTML_SRC");this.SetProperty("SpanInnerHTML",p);break;default:break}}while(n=o.EnumChildren(false))}}function l(m){for(var r=0;r<m.GetChildCount();r++){var v=m.GetChild(r);if(v.GetType()==="RowFields"){var p=v.GetProperty("row_id");for(var q=0;q<v.GetChildCount();q++){var s=v.GetChild(q);if(s.GetType()==="RowFields"){var n=s.GetProperty("name");var o=s.GetProperty("html_id");var u=s.GetProperty("CheckBoxRowIndex");var t=s.GetProperty("type");if(t==="MultiSelectCheckbox"){b.call(this,o,p,u)}else{g.call(this,p,n,o)}}}}}}function c(){var n=h.call(this,"Dummy");for(var m in n){if(n.hasOwnProperty(m)){n[m]=""}}}function e(m,o){var n=h.call(this,"Dummy");n[m]=o}return d}());return"SiebelAppFacade.ParametricSearchPresentationModel"})};