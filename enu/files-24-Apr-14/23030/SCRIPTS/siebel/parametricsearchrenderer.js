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
if(typeof(SiebelAppFacade.ParametricSearchRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ParametricSearchRenderer");define("siebel/parametricsearchrenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.ParametricSearchRenderer=(function(){var d=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants");var a=SiebelJS.Dependency("SiebelApp.Constants");function b(g){SiebelAppFacade.ParametricSearchRenderer.superclass.constructor.call(this,g)}SiebelJS.Extend(b,SiebelAppFacade.PhysicalRenderer);b.prototype.Init=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.Init.call(this);this.AttachPMBinding("PopulateNeeded",function(){if(true===this.GetPM().Get("PopulateNeeded")){this.ShowUI();this.BindEvents();this.BindData()}})};b.prototype.BindEvents=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.BindEvents.call(this);c.call(this)};b.prototype.BindData=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.BindData.call(this);e.call(this)};b.prototype.ShowUI=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.ShowUI.call(this);f.call(this)};function f(){var k=this.GetPM();var o=k.Get("SpanInnerHTML");var j=$("#S_A"+k.Get("GetId"));if(o!==""){j.html(o)}k.SetProperty("SpanInnerHTML","");var m=$("#S_A"+k.Get("GetId")).find("[class=minibuttonOn]").find("a");for(var h=0;h<m.length;h++){var l=m.get(h);var n=/InvokeMethod[^,]+?,(\"|\&quot\;)([^\"\&]+?)(\"|\&quot\;),(\"|\&quot\;)([^\"\&]+?)(\"|\&quot\;)/;var g=l.outerHTML.match(n);if(g){$(l).replaceWith('<input class="appletButton" data-display="'+$(l).text()+'" action="action" type="button" mthbtn="'+g[2]+", "+g[5]+'" value="'+$(l).text()+'"/>')}else{$(l).replaceWith(l.outerHTML.replace(/^<[Aa]/,'<button class="appletButton"').replace(/<\/[Aa]>$/,"</button>"))}}$(j).closest("div[class*='siebui-catalogview-table']").addClass("siebui-searchview-table").removeClass("siebui-catalogview-table")}function c(){var l=this.GetPM();var m=$("#S_A"+l.Get("GetId"));var h=l.ExecuteMethod("GetFieldDefs","Dummy");for(var g in h){if(h.hasOwnProperty(g)){$(m).find("[id=ord_"+g+"]").unbind()}}var k=$(m).find("[name='DisplayName']");for(var n=0;n<k.length;n++){var j=k.get(n);var q=/ChangeSelectTag[^,]+[^;]+;([^"&]+)/;var p=j.outerHTML.match(q);if(p){$(j).removeAttr("onchange").bind("change",{ctx:this},function(i){l.OnControlEvent("EventOnChangeSelectTag",p[1],this.value)})}}var o=$(m).find("[id^=ord]");o.bind("change",{ctx:this},function(i){i.data.ctx.GetPM().OnControlEvent("SearchUpdateFieldValue",i.target.name,i.target.value)});$(m).find("input[class=appletButton]").each(function(){$(this).unbind();var r=/ mthbtn=([^"]*?)"([^,]+),\s*([^\\"]+)/;var i=this.outerHTML.match(r);if(i){$(this).bind("click",{ctx:this},function(s){l.OnControlEvent("EventInvokeMethod",i[2],i[3])})}})}function e(){this.GetPM().ExecuteMethod("SearchPurgeFieldValues")}return b}());return"SiebelAppFacade.ParametricSearchRenderer"})};