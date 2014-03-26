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
if(typeof(SiebelAppFacade.SearchAllResultsPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.SearchAllResultsPresentationModel");define("siebel/searchallresultspmodel",["siebel/listpmodel"],function(){SiebelAppFacade.SearchAllResultsPresentationModel=(function(){var g=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants");var d=SiebelJS.Dependency("SiebelApp.Constants");var b=" ";var c="All";var e=0;var f=0;var i=0;var h=-1;function a(j){SiebelAppFacade.SearchAllResultsPresentationModel.superclass.constructor.call(this,j)}SiebelJS.Extend(a,SiebelAppFacade.ListPresentationModel);a.prototype.Init=function(){SiebelAppFacade.SearchAllResultsPresentationModel.superclass.Init.call(this);this.AddProperty("ShowRefineResultsDialog","");this.AddProperty("ShowRefineKeywords","");this.AddProperty("SubOperation","");this.AddProperty("Freetext","");this.AddProperty("BCType","");this.AddProperty("ShowTotResults","");this.AddProperty("ShowTotalCount","");this.AddMethod("InvokeServiceMethod",function(u,k,s){var j=CCFMiscUtil_CreatePropSet();var q=0;var x=[];var r=SiebelApp.S_App.GetService("Invoke Search");if(!r){return}s=r.InvokeMethod("GetResultParams",j);var m=s.GetChild(0);var y=m.GetProperty("Freetext");var l=m.GetProperty("BCType");var w=m.GetProperty("ContainsANDtext");var v=m.GetProperty("ContainsORtext");var o=m.GetProperty("ContainsEXACTtext");var t=m.GetProperty("ContainsNOTtext");var n=m.GetProperty("ResultsFound");var p=n.length;for(q=0;q<p;q++){if(n[q]===" "){break}x+=n[q]}k.SetProperty("TotalRecords",x);k.SetProperty("SearchFor",y);k.SetProperty("BCType",l);k.SetProperty("ContainsANDtext",w);k.SetProperty("ContainsORtext",v);k.SetProperty("ContainsEXACTtext",o);k.SetProperty("ContainsNOTtext",t);e=x;b=y;c=l;f=Number(m.GetProperty("RecordsPerPage"));i=0;h=f-1});this.AttachEventHandler("OnLoadGetParams",function(k){var j=CCFMiscUtil_CreatePropSet();this.ExecuteMethod("InvokeServiceMethod","GetResultParams",k,j)});this.AttachEventHandler("OnExecuteRefineResults",function(){var j=CCFMiscUtil_CreatePropSet();var s=CCFMiscUtil_CreatePropSet();j.SetProperty("Pagination","FALSE");j.SetProperty("SubOperation",this.Get("SubOperation"));var o=SiebelApp.S_App.GetService("Invoke Search");if(!o){return}s=o.InvokeMethod("Search",j);var k=true;var r=null;var q=null;var n=[];var m=0;var l=s.GetChildCount();for(m=0;m<l;m++){var p=s.GetChild(m);if(p&&p.GetType()==="ResultSet"){for(k=true;(r=p.EnumProperties(k))!=null;k=false){q=p.GetProperty(r);if(r!=="GotoOUIResultsView"){n.push(r)}}}}j.RemoveProperty("SubOperation");this.SetProperty("ShowRefineKeywords",n);this.SetProperty("ShowRefineResultsDialog",true)});this.AttachEventHandler("OnExecuteRefineSearch",function(){var q=0;var k=CCFMiscUtil_CreatePropSet();var u=CCFMiscUtil_CreatePropSet();k.SetProperty("Pagination","TRUE");k.SetProperty("Freetext",this.Get("Freetext"));k.SetProperty("BCType",this.Get("BCType"));k.SetProperty("SubOperation","");var r=SiebelApp.S_App.GetService("Invoke Search");if(!r){return}u=r.InvokeMethod("Search",k);var l=CCFMiscUtil_CreatePropSet();var o=[];var p=u.GetPropertyCount();for(q=0;q<p;q++){var s=u.GetChild(q);if(s){var n=0;var t=s.GetPropertyCount();if(s.GetType()==="ResultSet"){var m=s.GetProperty("TotalRecords")}}}this.SetProperty("ShowTotalCount",m);this.SetProperty("ShowTotResults",true)});this.AttachEventHandler("OnExecuteNextRecordSet",function(){if((i+f)<e){i+=f;if((i/f)<(e/f)){h+=f}else{h+=(e%f)}var l=CCFMiscUtil_CreatePropSet();var k=CCFMiscUtil_CreatePropSet();l.SetProperty("Pagination","TRUE");l.SetProperty("Freetext",this.Get("Freetext"));l.SetProperty("BCType",this.Get("BCType"));l.SetProperty("From",i);l.SetProperty("To",h);l.SetProperty("SubOperation","");var j=SiebelApp.S_App.GetService("Invoke Search");if(!j){return}k=j.InvokeMethod("Search",l)}});this.AttachEventHandler("OnExecutePrevRecordSet",function(){if((i-f)>=0){h-=(h-i+1);i-=f;var l=CCFMiscUtil_CreatePropSet();var k=CCFMiscUtil_CreatePropSet();l.SetProperty("Pagination","TRUE");l.SetProperty("Freetext",this.Get("Freetext"));l.SetProperty("BCType",this.Get("BCType"));l.SetProperty("From",i);l.SetProperty("To",h);l.SetProperty("SubOperation","");var j=SiebelApp.S_App.GetService("Invoke Search");if(!j){return}k=j.InvokeMethod("Search",l)}})};return a}());return"SiebelAppFacade.SearchAllResultsPresentationModel"})};