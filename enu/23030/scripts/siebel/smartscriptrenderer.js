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
if(typeof(SiebelAppFacade.SmartScriptRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.SmartScriptRenderer");if(typeof(SiebelApp)!=="undefined"&&typeof(SiebelApp.S_App)!=="undefined"){if(typeof(SiebelApp.Constants)!=="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey("SmartScriptPR","SiebelAppFacade.SmartScriptRenderer")}}define("siebel/smartscriptrenderer",[],function(){SiebelAppFacade.SmartScriptRenderer=(function(){var l=SiebelJS.Dependency("SiebelApp.Utils");var h=SiebelJS.Dependency("SiebelApp.Constants");var i=h.get("SWE_PST_BUTTON_CTRL");var d=h.get("SWE_CTRL_MVG");var g=h.get("SWE_CTRL_PICK");var e=h.get("SWE_CTRL_RADIO");var f=h.get("SWE_CTRL_CHECKBOX");var j=h.get("SWE_CTRL_COMBOBOX");var m=h.get("SWE_CTRL_TEXT");var k="175px";function c(n){SiebelAppFacade.SmartScriptRenderer.superclass.constructor.call(this,n);this.AttachPMBinding("FocusOnApplet",a,{scope:this});this.AttachPMBinding("firstQuestionFocus",a,{scope:this});this.PopulateQuestionList=function(p){var o=$("#SSQuestionList");if(o.length){o.html(p)}o.show()};this.DisplayPageLabel=function(p){var o=$("#s_SSPageLabel");if(o.length&&p!==null){o.html(p.m_displayName)}};this.DisplayQuestion=function(o,q){var p=null;if(o.m_mustAnswer>0){$("#"+o.m_uiInputName+"_r").html(q)}$("#"+o.m_uiInputName+"_d").html(o.m_displayName)};this.ExtractHtmlForQuestions=function(s){var r=$("#SSQuestionList > table.AppletBack");var q,p,t;var o;var u;if(r.length===0){SiebelJS.Log("SmartScript missing question list in SSQuestionList");return}for(q=0;q<r.length;q++){p=r[q];t=$(p).find(".ssDisplayName");if(t.length){u=t.attr("id");u=u.substring(0,u.length-2);if(s.hasOwnProperty(u)){o=s[u];if(o.m_enabledHTML===undefined||o.m_enabledHTML===""){o.m_enabledHTML=p.outerHTML}}else{SiebelJS.Log("SmartScript unexpected quest id: "+t.attr("id"))}}}}}SiebelJS.Extend(c,SiebelAppFacade.PhysicalRenderer);c.prototype.ShowUI=function(){var n=this.GetPM();n.GetHtmlForQuestions();n.CcPopulate();SiebelAppFacade.SmartScriptRenderer.superclass.ShowUI.call(this);n.FocusOnFirstQuestion();SiebelApp.S_App.uiStatus.Free()};c.prototype.BindEvents=function(){SiebelAppFacade.SmartScriptRenderer.superclass.BindEvents.call(this)};c.prototype.SetControlValue=function(q,p){if(!b(q)){return}var o=$("#"+q.GetInputName())[0]||$("[name="+q.GetInputName()+"]")[0];o=$(o);switch(q.GetUIType()){case e:o=$("input[name="+q.GetInputName()+"][value="+p+"]");if(o.length){o.attr("checked",true)}break;case j:if(p!==undefined&&p!==""){var n=o.find("option:contains('"+p+"')");if(n.length){n.attr("selected","selected")}else{o.append("<option value='"+p+"' selected>"+p+"</option>")}}o.attr("value",p);break;default:SiebelAppFacade.SmartScriptRenderer.superclass.SetControlValue.call(this,q,p);break}};c.prototype.ShowUIControl=function(n){if(!b(n)){return}SiebelAppFacade.SmartScriptRenderer.superclass.ShowUIControl.call(this,n);var o=$("[name="+n.GetInputName()+"]");switch(n.GetUIType()){case m:o.addClass("text");break;case j:o.addClass("comboBox");if(n.GetWidth()==0){o.width(k)}break;default:break}o.height(o.attr("height"));o.width(o.attr("width"))};c.prototype.BindControlEvents=function(n){SiebelAppFacade.SmartScriptRenderer.superclass.BindControlEvents.call(this,n);if(!b(n)){return}var o=$("[name="+n.GetInputName()+"]");switch(n.GetUIType()){case j:o.unbind("blur");o.bind("blur",{ctx:this,ctrl:n},function(p){if(p.data.ctx.GetPM().ExecuteMethod("CanUpdate",p.data.ctrl.GetName())){p.data.ctx.GetPM().OnControlEvent(h.get("PHYEVENT_CONTROL_BLUR"),p.data.ctrl,$(this).val())}});break;case m:break;default:break}};function b(n){return(typeof(n.GetInputName)==="function")}function a(){var o=this.GetPM().Get("firstQuestionFocus");var n=(o===null)?null:o.GetInputName();SiebelJS.Log("SmartScript focus on control: "+n);setTimeout(function(){if(o!==null){var p=o.GetUIType();var q;if(p===e){q=$("#"+n+"_d")[0]}else{q=$("#"+n)[0]||$("[name="+n+"]")[0]||$("#"+n+"_d")[0]}$(q).attr("tabindex",0).focus()}else{var q=$(".siebui-applet-btm-buttons  button:enabled")[0];$(q).attr("tabindex",0).focus()}},60)}return c}());return"SiebelAppFacade.SmartScriptRenderer"})};