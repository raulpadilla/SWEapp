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
if(typeof(SiebelApp.S_App.BusObj)=="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BusObj");SiebelApp.S_App.BusObj=(function(){var a=SiebelApp.Utils;var b=SiebelApp.Constants;function c(){var e={};var d;var f=0;var g=[];this.GetBusCompByName=function(h){var j=null;for(var i in e){if(e.hasOwnProperty(i)){if(h==e[i].GetName()){j=e[i];break}}}return j};this.GetBusComp=function(i){for(var j in e){if(e.hasOwnProperty(j)){var h=e[j].GetVarName();if(h==i){return e[j]}}}};this.RemoveBusComp=function(h){if(this.GetBCMap()[h.GetVarName()]){delete this.GetBCMap()[h.GetVarName()]}};this.GetBCMap=function(){return e};this.GetBCArray=function(){var h=0;for(var i in e){if(e.hasOwnProperty(i)){g[h]=e[i];h=h+1}}return g};this.GetView=function(){return d};this.SetView=function(h){d=h};this.GetBusCompEnum=function(){return f};this.SetBusCompEnum=function(h){f=h}}c.prototype.AddBusComp=function(d){if(!this.GetBCMap()[d.GetVarName()]){this.GetBCMap()[d.GetVarName()]=d}};c.prototype.EndLife=function(){var e=this.GetBCMap();for(var d in e){if(e.hasOwnProperty(d)){if(e[d]&&e[d].EndLife){e[d].EndLife()}delete e[d]}}e=null;this.SetView(null)};c.prototype.GetBCtoProcess=function(d){var e;if(!a.IsEmpty(d.GetValue())){e=this.GetBusComp(d.GetValue())}return e};c.prototype.ProcessObjectInfo=function(e){if(e.GetType()!=b.get("SWE_PST_BUSOBJ_INFO")){return}var f=a.Curry(SiebelApp.S_App.constructor.prototype.DefineAccessor,this,e);f("GetName","SWE_PROP_NAME");var d=e.GetValue();this.GetZone=function(){return d};this.ProcessChildObjInfo(e);e=null};c.prototype.ProcessChildObjInfo=function(l){var d=l.EnumChildren(true);if(!d){return}var f=SiebelApp.S_App.BusComp;var g=b.get("SWE_PST_NEW_BUSCOMP");var e=b.get("SWE_PST_BUSCOMP_INFO");do{var j=d.GetType();switch(j){case g:var k=d.GetChild(0);var i=this.GetBCtoProcess(k);if(a.IsEmpty(i)){i=new f()}i.ProcessObjectInfo(k);this.AddBusComp(i);break;case e:var h=this.GetBCtoProcess(d);if(!a.IsEmpty(h)){h.ProcessObjectInfo(d)}break}}while((d=l.EnumChildren(false)))};c.prototype.EnumBusComps=function(f){var e;var d;if(f){this.SetBusCompEnum(0)}if(this.GetBCArray()==null||this.GetBusCompEnum()>=this.GetBCArray().length){return(null)}e=this.GetBCArray()[this.GetBusCompEnum()];d=this.GetBusCompEnum()+1;this.SetBusCompEnum(d);return(e)};return c}())};