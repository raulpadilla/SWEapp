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
if(typeof(SiebelAppFacade.PDQPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.PDQPresentationModel");define("siebel/pdqpmodel",[],function(){SiebelAppFacade.PDQPresentationModel=(function(){var d=SiebelJS.Dependency("SiebelApp.Constants");var b=SiebelJS.Dependency("SiebelApp.Utils");function c(h){this.constructor.superclass.constructor.call(this,h)}SiebelJS.Extend(c,SiebelAppFacade.PresentationModel);c.prototype.Init=function(){this.AddProperty("GetContainer","s_pdq");this.AddProperty("PDQRefresh",false);this.AddMethod("InvokeMethod",null,{core:true});this.AttachEventHandler("PDQSelect",function(h){if(this.Get("SelectedPDQItem")==h||h===-1){return}var i=this.Get("PDQItem");this.AddProperty("SelectedPDQItem",h);var j=CCFMiscUtil_CreatePropSet();j.SetProperty(d.get("SWE_PROP_QUERYNAME"),i[h]);this.ExecuteMethod("InvokeMethod",d.get("SWE_METHOD_EXECUTENAMEQUERY"),j)});this.AttachPSHandler(d.get("SWE_PROP_NC_PDQ_INFO"),function(h){g.call(this,h);this.SetProperty("PDQRefresh",true)})};c.prototype.Setup=function(){var h=CCFMiscUtil_CreatePropSet();if(SiebelApp.S_App.IsMobileApplication()==="true"){h.SetProperty("SWE_OUI_RENDERER","JQMPDQPhyRenderer")}else{h.SetProperty("SWE_OUI_RENDERER","PDQPhyRenderer")}SiebelAppFacade.PDQPresentationModel.superclass.Setup.call(this,h)};function g(h){var i=h.GetProperty("SHOW_EMPTY_STRING");if(i==="TRUE"){this.AddProperty("EmptyItem",i)}else{this.AddProperty("PDQItem",a.call(this,h));e.call(this,h)}i=h.GetProperty(d.get("SWE_PROP_NC_SELECTED_INDEX"));if(i!==""){if(0<=i&&i<this.Get("PDQItem").length){this.AddProperty("SelectedPDQItem",i)}}return}function a(n){var h=[];if(n){var k=n.GetChildCount();for(var j=0;j<k;j++){var l=n.GetChild(j);var m=l.GetProperty(d.get("SWE_PROP_NC_CAPTION"));if(!b.IsEmpty(m)){h.push(m)}}}return h}function f(m){var k=m.GetChildCount();var n=[];for(var j=0;j<k;j++){var l=m.GetChild(j);if(l.GetChildCount()>0){for(var h=0;h<l.GetChildCount();h++){if(l.GetChild(h).GetType()===d.get("SWE_PST_QTP_INFO")){n.push(l.GetChild(h))}}}}return n}function e(l){var j=l.GetChildCount();for(var h=0;h<j;h++){var k=l.GetChild(h);if(k.GetType()===d.get("SWE_PST_QTP_INFO")){this.AddProperty("PDQComboBoxQTPPS",k);break}}this.AddProperty("PDQItemQTPInfo",f.call(this,l))}return c}());return"SiebelAppFacade.PDQPresentationModel"})};