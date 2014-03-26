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
if(typeof(SiebelAppFacade.MBMenuRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.MBMenuRenderer");define("siebel/jqmmbmenurenderer",[],function(){SiebelAppFacade.MBMenuRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function b(d){SiebelAppFacade.MBMenuRenderer.superclass.constructor.call(this,d)}SiebelJS.Extend(b,SiebelAppFacade.BasePR);b.prototype.Init=function(){SiebelAppFacade.MBMenuRenderer.superclass.Init.call(this);this.AttachPMBinding("ShowMenu",function(){this.GetPM().ExecuteMethod("PrepareConcreteMenu");this.ShowMenu()})};b.prototype.ShowUI=function(){var f=this.GetPM();var g=f.Get("GetPlaceHolder");var d=g+"div";var h="menuitem_"+g;var e;if(SiebelApp.S_App.IsMobileApplication()==="true"){$(".AppletMenu").each(function(j){$(this).removeAttr("style");var k=$(this).find("#"+g).html();if(k!==null&&k!==undefined){$(this).empty();var i=f.Get("GetLabel");i=i.replace(/ /g,"&nbsp;");if(i!==""){i=i+"&nbsp;"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MENU_TITLE")}else{i=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MENU_TITLE")}e="<div id= "+d+" ><a href= #"+h+" id = "+g+" un="+i+' data-rel="popup" data-role="button" data-icon="custom-gear" data-iconpos="center" data-inline="true" title= '+i+" ></a>";e+="</div>";$(this).append(e).trigger("create")}})}};b.prototype.EndLife=function(){$("#tbm_3").undelegate(" a","click")};b.prototype.BindEvents=function(){var f=this.GetPM().Get("GetPlaceHolder");var d=f+"div";var e=this.GetPM();$("#tbm_3").undelegate(" a","click");$("#tbm_3").delegate(" a","click",function(){var g="*Browser* *Logoff* *";if(IsOfflineModeEnabled()&&SiebelApp.OfflineAppSettings.GetMode()===true){$("#tbm_3").disabled=true}else{e.OnControlEvent("HandleMenuClick",g)}});$("#"+f).bind("click",{ctx:this},function(g){if($("body").find(".aSwipeBtn").length){$(".aSwipeBtn").remove()}if($("body").find(".pdqitem").length){$(".pdqitem").remove()}var i="menuitem_"+f;var h=$("#"+d).find("#"+i).html();if(h===null||h===undefined){$(".menuitem").remove();g.data.ctx.GetPM().OnControlEvent("HandleClick",["Click"])}else{$("#"+i).remove()}return false})};b.prototype.BindData=function(){};function c(){var g=this.GetPM().Get("GetConcreteMenu");var f=[];var n=a.get("CMDMGR_CAPTION");var j=a.get("CMDMGR_ENABLED");var l=a.get("CMDMGR_COMMAND");var m=a.get("CMDMGR_SEPARATOR");var e=function(i,o){return function(q,p){i.GetPM().OnControlEvent("HandleMenuClick",o)}};for(var h=0;h<g.length;h++){var d=g[h];var k={};k.name=String(d[n]);k.disabled=String(d[j])==="false";k.displayType=String(d[l]);k.callback=e(this,String(d[l]));f[h]=k}return f}b.prototype.ShowMenu=function(){var h=c.call(this);var m=this.GetPM().Get("GetPlaceHolder");var g=m+"div";var f="menuitem_"+m;var j='<div class= "menuitem" data-role="popup" id= '+f+' ><ul data-role="listview" data-inset="true">';var n=a.get("CMDMGR_SEPARATOR");for(var k=0;k<h.length;k++){var d=h[k];if(d.displayType!==n){var e=d.name;var l;if(d.disabled){l='<li data-icon="false" id='+k+' class="ui-disabled"> '+e+" </li>"}else{l='<li data-icon="false" id='+k+"> "+e+" </li>"}j+=l}}$("#"+g).append(j).trigger("create");$("#"+f).popup({positionTo:"#"+g});$("#"+f).popup("open");$("#"+f).find("li").click(function(p){$(".menuitem").remove();var o=$(this).attr("id");h[o].callback.call()})};return b}());return"SiebelAppFacade.MBMenuRenderer"})};