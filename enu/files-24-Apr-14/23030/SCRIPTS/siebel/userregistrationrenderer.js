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
if(typeof(SiebelAppFacade.UserRegistrationRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.UserRegistrationRenderer");define("siebel/userregistrationrenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.UserRegistrationRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function c(f){SiebelAppFacade.UserRegistrationRenderer.superclass.constructor.call(this,f)}SiebelJS.Extend(c,SiebelAppFacade.PhysicalRenderer);c.prototype.ShowUI=function(){$(".competitor_2").hide();$(".competitor_3").hide();$(".partner_2").hide();$(".partner_3").hide();SiebelAppFacade.UserRegistrationRenderer.superclass.ShowUI.call(this)};c.prototype.BindData=function(){$("textarea").each(function(){$(this).attr("placeholder",$(this).attr("aria-label"))});$("#compURL input").each(function(){$(this).attr("placeholder",$(this).attr("aria-label"))});SiebelAppFacade.UserRegistrationRenderer.superclass.BindData.call(this)};c.prototype.BindEvents=function(){$(".morecomp_1").bind("click",{ctx:this},e);$(".morecomp_2").bind("click",{ctx:this},e);$(".morepart_1").bind("click",{ctx:this},e);$(".morepart_2").bind("click",{ctx:this},e);var f=this.GetPM().Get("GetControls");for(var h in f){var i=f[h];var g=i.GetMethodName();if(f.hasOwnProperty(h)){if(g==="GetCompanyAddress"){$("[name="+i.GetInputName()+"]").bind("click",{ctx:this,ctrlset:f},b)}if(g==="FrameEventMethodWFBFCancel"){$("#"+(i.GetInputName()+"_Ctrl")).bind("click",{ctx:this,ctrl:i},d)}}}SiebelAppFacade.UserRegistrationRenderer.superclass.BindEvents.call(this)};function e(f){var g=$(this).attr("class");if(g==="morecomp_1"){$(".morecomp_1").hide();$(".competitor_2").show()}else{if(g==="morecomp_2"){$(".morecomp_2").hide();$(".competitor_3").show()}else{if(g==="morepart_1"){$(".morepart_1").hide();$(".partner_2").show()}else{if(g==="morepart_2"){$(".morepart_2").hide();$(".partner_3").show()}else{}}}}}function d(g){g.data.ctx.GetPM().OnControlEvent(a.get("PHYEVENT_INVOKE_CONTROL"),g.data.ctrl.GetMethodName(),"","");var f=SiebelApp.S_App.GetService("User Registration");var i=SiebelApp.S_App.NewPropertySet();i.SetProperty(consts.get("SWE_BUSINESS_SERVICE"),consts.get("SWE_NUMERIC_TRUE"));if(f){outPropSet=null;var h={};h.async=false;h.selfbusy=true;h.scope=this;f.InvokeMethod("ClearFieldMap",i,h)}g.stopImmediatePropagation()}function b(i){if($(this).is(":checked")){var h=0;var g=SiebelApp.S_App.GetService("User Registration");var k=SiebelApp.S_App.NewPropertySet();k.SetProperty(consts.get("SWE_BUSINESS_SERVICE"),consts.get("SWE_NUMERIC_TRUE"));var f=SiebelApp.S_App.NewPropertySet();if(g){f=null;var j={};j.async=false;j.selfbusy=true;j.scope=this;j.cb=function(){f=arguments[2];if(f!==null){var n=f.GetChildCount();for(var m=0;m<n;m++){var q=f.GetChild(m);if(q!==null&&q.GetType()==="ResultSet"){var l=q.GetProperty("AddressLine1");var t=q.GetProperty("AddressLine2");var o=q.GetProperty("City");var r=q.GetProperty("State");var p=q.GetProperty("Postal Code");var s=q.GetProperty("Country");break}}}$(".addressline1 input").focus().val(l).attr("readonly","readonly");$(".addressline2 input").focus().val(t).attr("readonly","readonly");$(".city input").focus().val(o).attr("readonly","readonly");$(".state input").focus().val(r).attr("readonly","readonly");$(".zipcode input").focus().val(p).attr("readonly","readonly");$(".country input").focus().val(s).attr("readonly","readonly")};g.InvokeMethod("GetCompanyAddress",k,j)}}else{$(".addressline1 input").focus().val("").removeAttr("readonly");$(".addressline2 input").focus().val("").removeAttr("readonly");$(".city input").focus().val("").removeAttr("readonly");$(".state input").focus().val("").removeAttr("readonly");$(".zipcode input").focus().val("").removeAttr("readonly");$(".country input").focus().val("").removeAttr("readonly");$(".addressline1 input").focus()}i.stopImmediatePropagation()}return c}());return"SiebelAppFacade.UserRegistrationRenderer"})};