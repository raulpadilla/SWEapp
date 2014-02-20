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
if(typeof(SiebelAppFacade.PDQPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.PDQPhyRenderer");define("siebel/pdqphyrenderer",[],function(){SiebelAppFacade.PDQPhyRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Utils");var b=SiebelJS.Dependency("SiebelApp.Constants");function d(e){SiebelAppFacade.PDQPhyRenderer.superclass.constructor.call(this,e)}SiebelJS.Extend(d,SiebelAppFacade.BasePR);d.prototype.Init=function(){SiebelAppFacade.PDQPhyRenderer.superclass.Init.call(this);this.AttachPMBinding("PDQRefresh",this.BindData)};d.prototype.ShowUI=function(){SiebelAppFacade.PDQPhyRenderer.superclass.ShowUI.call(this);var f=this.GetPM().Get("GetContainer");if(a.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())){var e=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_PDQ_TITLE");$("[name="+f+"]").attr("title",e).parent().attr({role:"navigation",title:e})}};d.prototype.BindEvents=function(){SiebelAppFacade.PDQPhyRenderer.superclass.BindEvents.call(this);$("[name="+this.GetPM().Get("GetContainer")+"]").bind("click keypress blur",{ctx:this},function(e){if(e.type==="keypress"&&e.which!==$.ui.keyCode.ENTER){}else{e.data.ctx.GetPM().OnControlEvent("PDQSelect",$(this)[0].selectedIndex)}})};d.prototype.BindData=function(){SiebelAppFacade.PDQPhyRenderer.superclass.BindData.call(this);var h=this.GetPM();var g=$("[name="+h.Get("GetContainer")+"]");if(g.length!==1){SiebelJS.Log("Can't find single instance of PDQ - ["+h.Get("GetContainer")+"]");return}var e=h.Get("PDQItem")||[];var l="";if(h.Get("EmptyItem")==="TRUE"){l+="<option> </option>"}var k=h.Get("SelectedPDQItem");for(var f=0;f<e.length;f++){var j=e[f].replace(/ /g,"&nbsp;");l+="<option"+(Number(k)===f?" selected":"")+">"+j+"</option>"}g.html(l);c.call(this,g);g=null};function c(e){var h=b.get("SWE_PROP_QTP_OT");var k=b.get("SWE_PROP_QTP_RN");var j=b.get("SWE_PROP_QTP_UN");var m=this.GetPM().Get("PDQComboBoxQTPPS");var g=this.GetPM().Get("PDQItemQTPInfo")||[];if(m&&typeof m.GetProperty==="function"){e.attr("ot",m.GetProperty(h)).attr("rn",m.GetProperty(k)).attr("un",m.GetProperty(j))}for(var l=0;l<g.length;l++){if(g[l]&&typeof g[l].GetProperty==="function"){var p=g[l].GetProperty(j);var f=g[l].GetProperty(h);var o=g[l].GetProperty(k);var n=$(e).children().eq(l);if(n.length===1){n.attr("ot",f);n.attr("rn",o);n.attr("un",p)}}}}return d}());return"SiebelAppFacade.PDQPhyRenderer"})};