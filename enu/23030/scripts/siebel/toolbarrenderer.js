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
if(typeof(SiebelAppFacade.ToolbarRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ToolbarRenderer");var utils=SiebelJS.Dependency("SiebelApp.Utils");var consts=SiebelJS.Dependency("SiebelApp.Constants");var button=consts.get("SWE_PST_BUTTON_CTRL");var link=consts.get("SWE_CTRL_LINK");SiebelAppFacade.ToolbarRenderer=(function(){function c(d){SiebelAppFacade.ToolbarRenderer.superclass.constructor.call(this,d)}SiebelJS.Extend(c,SiebelAppFacade.BasePR);c.prototype.Init=function(){SiebelAppFacade.ToolbarRenderer.superclass.Init.call(this);this.AttachPMBinding("Update",a)};c.prototype.ShowUI=function(){SiebelAppFacade.ToolbarRenderer.superclass.ShowUI.call(this);var h=this.GetPM();var g=h.Get("itemArray");var e=h.Get("placeholder");var d="<ul class='siebui-toolbar' role='toolbar' aria-label='"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_APPTOOLBAR_TITLE")+"' >";var i,f=SiebelApp.S_App.GetDirection();for(i=0;i<g.length;i++){var j=g[i];var k=h.ExecuteMethod("CanInvoke",j.GetProperty("command"));var l=j.GetProperty("type");switch(l){case button:case link:d+="<li id = 'tb_"+i+"'class='"+(!k?"siebui-toolbar-disable":"siebui-toolbar-enable")+(f?"siebui-rtl-element-right":"")+"' data-cmd='"+j.GetProperty("command")+"' role = 'button'  title = '"+j.GetProperty("caption")+"' name='"+j.GetProperty("name")+"' tabindex='"+(i===0?0:-1)+"'><img src='"+((!k&&!!j.GetProperty("offbitmap"))?j.GetProperty("offbitmap"):j.GetProperty("onbitmap"))+"'class='"+(!k?"ToolbarButtonOff":"ToolbarButtonOn")+"' /></li>";break}}d=d+"</ul>";$("#"+e).html(d).parent().parent().addClass(SiebelApp.S_App.GetDirection()?"siebui-rtl-element-right":"")};c.prototype.BindEvents=function(){SiebelAppFacade.ToolbarRenderer.superclass.BindEvents.call(this);var e=new SiebelApp.UIStatus();var d=$("#"+this.GetPM().Get("placeholder"));d.delegate("li.siebui-toolbar-enable","click",{ctx:this},function(f){var g=$(this).attr("data-cmd");setTimeout(function(){f.data.ctx.GetPM().OnControlEvent("TOOLBAR_INVOKE",g)},0)});d.delegate("li.siebui-toolbar-enable","keydown",{ctx:this},function(f){b.call(f.data.ctx,$(this),f,e)});d=null};function b(g,h,j){var f=this.GetPM();j=j||new SiebelApp.UIStatus();if(g&&g.length===1&&h){switch(h.which){case $.ui.keyCode.LEFT:g=g.parent().children().filter('[tabindex^="0"]');var e=g.prevAll("li.siebui-toolbar-enable").eq(0);if(e.length===1){g.attr("tabIndex","-1");e.attr("tabIndex","0").focus()}break;case $.ui.keyCode.RIGHT:g=g.parent().children().filter('[tabindex^="0"]');var d=g.nextAll("li.siebui-toolbar-enable").eq(0);if(d.length===1){g.attr("tabIndex","-1");d.attr("tabIndex","0").focus()}break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:var i=$(g).attr("data-cmd");if(i){f.OnControlEvent("TOOLBAR_INVOKE",i)}break}}}c.prototype.BindData=function(){SiebelAppFacade.ToolbarRenderer.superclass.BindData.call(this)};function a(){var h=this.GetPM();var e=h.Get("itemArray");var d="#"+h.Get("placeholder");for(var g=0;g<e.length;g++){var i=e[g];var f=h.ExecuteMethod("CanInvoke",i.GetProperty("command"));if(i.GetProperty("type")==="Link"){$("li#tb_"+g,d).removeClass("siebui-toolbar-disable siebui-toolbar-enable").addClass(!f?"siebui-toolbar-disable":"siebui-toolbar-enable").children().eq(0).attr("src",(!f&&!!i.GetProperty("offbitmap"))?i.GetProperty("offbitmap"):i.GetProperty("onbitmap")).removeClass("ToolbarButtonOff ToolbarButtonOn").addClass(!f?"ToolbarButtonOff":"ToolbarButtonOn")}}}return c}())};