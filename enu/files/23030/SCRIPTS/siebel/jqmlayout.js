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
if(typeof(SiebelAppFacade.JQMLayout)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JQMLayout");SiebelAppFacade.JQMLayout=(function(){var c;var a=SiebelApp.Utils;var e=false;var f=function(){SiebelApp.EventManager.addListner("refreshview",this.ProcessMobileLayout,this);SiebelApp.EventManager.addListner("refreshlayout",this.ApplyMobileLayout,this);var i=false;this.GetToggleFlag=function(){return i};this.SetToggleFlag=function(j){i=j};var h;f=function(){return h};f.prototype=this;h=new f();h.constructor=f;return h};f.prototype.ProcessMobileLayout=function(){if(SiebelApp.S_App.IsMobileApplication()==="true"){var i=false;var h=jQuery.event.special.orientationchange.orientation();i=d.call(this,h);if($("#jqmToggleCtrl").length===1){g.call(this);b.call(this,i)}if(this.SetEditableMode()){this.SetEditableMode(false)}$("#_sweclient").unbind("orientationchange.SiebelAppFacade.JQMLayout");$("#_sweclient").bind("orientationchange.SiebelAppFacade.JQMLayout",{ctx:this},function(j){var k=false;k=d.call(j.data.ctx,j.orientation);b.call(j.data.ctx,k)})}};function d(i){var k=false;var h="div["+i+"='Default']";var j="div["+i+"='Show']";var l="div["+i+"='Hide']";if($(h).length>0){$(h).removeClass("toggle");$(h).show()}if($(j).length>0){$(j).show()}if($(l).length>0){$(l).hide();k=(this.GetEditableMode()!==true)?true:false}this.SetToggleFlag(false);return k}function g(){var l=$("#jqmToggleCtrl");var j;var k;var i;if(l.length===1){j=l.attr("ctrltype")||"button";k=l.attr("ctrllabel");if(!a.IsEmpty(k)){i=SiebelApp.S_App.LocaleObject.GetLocalString(k)}if(a.IsEmpty(i)){i="Back"}var h='<a id="jqmToggleBtn" href="#" data-role="'+j+'" data-inline="true" data-icon="arrow-l">'+i+"</a>";l.html(h);l.trigger("create")}$("#jqmToggleCtrl a").bind("click",{ctx:this},function(m){var n=true;m.data.ctx.ToggleMobileLayout(n)})}function b(i){var h=$("#jqmToggleCtrl");if(i){h.show()}else{if(h.is(":visible")){h.hide()}}}f.prototype.ToggleMobileLayout=function(q){var v;var o;var n={};var t={};var l=false;var r=$("#jqmToggleCtrl");var i=false;if($("#jqmToggleCtrl").children("a").length===0){g.call(this);i=true}function u(){if(/msie/.test(navigator.userAgent.toLowerCase())){$(s).show("slow")}else{$(s).show(v,t,500)}}if(q&&r.length===1){v=r.attr("effect");if(v!==undefined&&v!==""){var m=r.attr("hideoptions");if(m!==undefined&&m!==""){m=m.replace(/'/g,'"');n=jQuery.parseJSON(m)}var p=r.attr("showoptions");if(p!==undefined&&p!==""){p=p.replace(/'/g,'"');t=jQuery.parseJSON(p)}}}var h=jQuery.event.special.orientationchange.orientation();var k="div["+h+"='Default']";var s;var j;if(this.GetToggleFlag()){s="div["+h+"='Show']";j="div["+h+"='Hide']";$(k).removeClass("toggle")}else{s="div["+h+"='Hide']";j="div["+h+"='Show']";$(k).addClass("toggle")}if(i){if($(j).length>0){l=(this.GetEditableMode()!==true)?true:false}b.call(this,l)}if(v!==undefined&&v!==""){if(/msie/.test(navigator.userAgent.toLowerCase())){$(j).hide("fast",u)}else{$(j).hide(v,n,500,u)}}else{$(j).hide();$(s).show()}if(this.GetToggleFlag()){this.SetToggleFlag(false)}else{this.SetToggleFlag(true)}if(this.SetEditableMode()){this.SetEditableMode(false)}};f.prototype.ApplyMobileLayout=function(){if(this.GetToggleFlag()){this.SetToggleFlag(false);this.ToggleMobileLayout(false)}else{this.ProcessMobileLayout()}};f.prototype.GetEditableMode=function(){return e};f.prototype.SetEditableMode=function(h){e=h};c=new f();return c}())};