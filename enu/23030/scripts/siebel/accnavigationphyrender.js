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
if(typeof(SiebelAppFacade.AccNavigationPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.AccNavigationPhyRenderer");define("siebel/accnavigationphyrender",[],function(){SiebelAppFacade.AccNavigationPhyRenderer=(function(){var k=SiebelJS.Dependency("SiebelApp.Constants");var m=k.get("SWE_SCREEN_NAV_CONTROL_STR");var j=k.get("SWE_AGGR_VIEW_NAV_CONTROL_STR");var p=k.get("SWE_DET_VIEW_NAV_CONTROL_STR");var d=k.get("SWE_DET_SUB_VIEW_NAV_CONTROL_STR");function f(u){var t=u;this.GetPM=function(){return t};this.Init()}f.prototype.Init=function(){if(this.GetPM().Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){this.GetPM().AttachPMBinding("Refresh",this.BindData,{scope:this})}};f.prototype.ShowUI=function(){var v=this.GetPM(),x=v.Get("placeholder"),w=$("div#"+x),u=(v.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL"))?"siebui-view-navs":"siebui-subview-navs";if(!w.hasClass(u)){w.addClass(u)}if(x===k.get("SWE_PROP_NC_ID_VIEW_CONTROL")){var t=v.Get("SubPlaceholder");if(($("div#"+t)).length!==0){x=t;w=$("div#"+x);if(!w.hasClass("siebui-subview-screennavs")){w.addClass("siebui-subview-screennavs")}}}v.SetProperty("LevelPlaceholder",x)};f.prototype.BindEvents=function(){var t=this.GetPM();var v=t.Get("placeholder");var u=t.Get("LevelPlaceholder");$("#"+v).undelegate(".AccNavBar");$("#"+v).delegate("#"+v+"_tabScreen a","click.AccNavBar",{ctx:this},b);$("#"+u).delegate("#"+u+"_tabView a","click.AccNavBar",{ctx:this},c);$("#"+v).delegate("select.siebui-nav-links","click.AccNavBar keypress.AccNavBar blur.AccNavBar",{ctx:this},o).delegate("select.siebui-nav-links","focus.AccNavBar",function(){$(this)[0].selectedIndex=-1});$(window).unbind("resize.NavBar").bind("resize.NavBar",{ctx:this},function(w){w.data.ctx.BindData(true)})};function b(x){var w=$(this);var z=w.attr("data-tabindex");var v=x.data.ctx.GetPM();var u=v.Get("GetTabInfo");if(u[z]){var t="viewName";if(v.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){t="defaultViewName";u[z]["level"]=m}else{u[z]["level"]=p}var y=u[z][t];if(y){if(!v.OnControlEvent("OnClick",u[z])){$("#"+v.Get("placeholder")+"_tabScreen").tabs("active",Number(v.Get("GetSelectedTabKey").replace("tabScreen",""))||0)}}}}function c(x){var w=$(this);var z=w.attr("data-tabindex");var v=x.data.ctx.GetPM();var u=v.Get("GetSelectedTabLinkInfo");if(v.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){u[z]["level"]=j}else{u[z]["level"]=d}if(u[z]){var t="viewName";var y=u[z][t];if(y){if(!v.OnControlEvent("OnClick",u[z])){$("#"+v.Get("LevelPlaceholder")+"_tabView").tabs("active",Number(v.Get("GetSelectedLinkKey").replace("tabView",""))||0)}}}}function o(t){if(t.type==="keypress"&&t.which!==$.ui.keyCode.ENTER){}else{var v=t.data.ctx.GetPM();var B=v.Get("placeholder");var u=$(this).attr("id");var w=$(this).val();var x={};var z=v.Get("GetType");if(w){if(u==="j_"+B+"_tabScreen"){x=v.Get("GetTabInfo");if(z===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){x[w]["level"]=m}else{x[w]["level"]=p}}else{if(u==="j_"+v.Get("LevelPlaceholder")+"_tabView"){x=v.Get("GetSelectedTabLinkInfo");if(z===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){x[w]["level"]=j}else{x[w]["level"]=d}}else{return}}var y=x[w]||{};var A=y.defaultViewName||y.viewName;if(A){v.OnControlEvent("OnClick",x[w])}}}}f.prototype.BindData=function(x){var t=this.GetPM();var v=t.Get("LevelPlaceholder");if(this.GetPM().Get("GetDataReload")===true||x){var w=t.Get("placeholder"),u=$("div#"+w);if(u.length===0){return}l.call(this,w,"tabScreen",t.Get("GetTabInfo"),t.Get("GetSelectedTabKey"));l.call(this,t.Get("LevelPlaceholder"),"tabView",t.Get("GetSelectedTabLinkInfo"),t.Get("GetSelectedLinkKey"));h.call(this);s.call(this)}};function l(A,y,w,v){var z=false;var u=A+"_"+y;var x=q.call(this,A,y,w,v);var t=$("#"+A).children("#"+u);t.remove();t=null;if(x){$("#"+A).append("<div class='siebui-nav-tabs siebui-nav-"+y+"' id="+u+">"+x+"</div>");$("#"+u).find("ol,ul").eq(0).bind(navigator.userAgent.toLowerCase().indexOf("firefox")>-1?"keypress":"keydown",{ctx:this},i);$("#"+u).tabs({active:Number((v||"").replace(y,""))||0,create:e,beforeActivate:function(B,C){return false}});g.call(this,u,y,w,v);x=null;z=true}else{if(y=="tabView"){$("#"+A).append("<div class='siebui-nav-tabs siebui-empty-tabs siebui-nav-"+y+"' id="+u+"></div>")}}return z}function i(t){if($(t.target).is("li")&&t.which===$.ui.keyCode.ENTER){$(document.activeElement.firstChild).trigger("click")}}function e(u,t){$(t.panel).hide()}function q(A,y,x,u){var t="",w=A+"_"+y+"_noop",v=SiebelApp.S_App.GetDirection();for(var z in x){if(x.hasOwnProperty(z)){t+="<li ";if(u===z){t+=v?" class='siebui-active-navtab siebui-rtl-element-right' ":" class='siebui-active-navtab' ";t+="><a data-tabindex='"+z+"' aria-label='"+String(x[z].captionName)+" "+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CKEDITOR_SELECTED")+"' href='#"+w+"' >"}else{if(v){t+=" class='siebui-rtl-element-right' "}t+="><a data-tabindex='"+z+"' href='#"+w+"' >"}if(x[z].tabIcon){t+="<img src='"+x[z].tabIcon+"'/>"}t+=String(x[z].captionName)+"</a></li>"}}if(t!==""){t="<ul>"+t+"</ul>";t+='<div class="siebui-invisible-el siebui-nav-'+y+'"  id="'+w+'" ></div>'}return t}function g(v,z,E,B){var J=this.GetPM();var y=$("#"+v);var u=Number((B||"").replace(z,""))||0;var A=Number(y.outerWidth());var D=25;var w=y.children("ul").children("li");D+=w.eq(u).outerWidth()+10;var K=0;for(var F=0,H=w.length;F<H;F++){if(F!==u){D+=w.eq(F).outerWidth()+10;if(D>A){K=(F-1);break}}}if(K!==0&&K<w.length){var I=SiebelApp.S_App.LocaleObject;var G="";if(J.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){G=(z==="tabScreen")?I.GetLocalString("IDS_SWE_FIRST_LEVEL_VIEW_BAR_TITLE"):I.GetLocalString("IDS_SWE_SECOND_LEVEL_VIEW_BAR_TITLE")}else{G=(z==="tabScreen")?I.GetLocalString("IDS_SWE_THIRD_LEVEL_VIEW_BAR_TITLE"):I.GetLocalString("IDS_SWE_FOURTH_LEVEL_VIEW_BAR_TITLE")}var t="<span></span><li><select class='siebui-nav-links "+(J.Get("IsScreen")?"siebui-nav-screenlist":"siebui-nav-viewlist")+"'  id='j_"+v+"' role='combo' aria-atomic='true' aria-label='"+G+"' >";var C=0;var x=K+1;var L;while(E[z+x]){if(x!==u){t+="<option value='"+(z+x)+"'>"+E[z+x].captionName+"</option>";L=y.children("ul").children("li").eq(x-C);L.remove();L=null;C++}x++}t+="</select></li>";y.tabs("refresh");y.children("ul").append(t);y.children("ul").children("li").last().eq(0).addClass(SiebelApp.S_App.GetDirection()?"siebui-rtl-element-right":"");n.call(this,"select#j_"+v)}}function n(u){if(!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())){var t=$(u).outerWidth();$(u).wrap("<span style='width:"+t+"px; overflow:hidden; float:right;'/>").width("auto").css({position:"relative",left:"-"+($(u).outerWidth()-t)+"px"})}}function h(){var w=this.GetPM();var z=w.Get("placeholder");var y=z+"_tabScreen";var v=w.Get("LevelPlaceholder")+"_tabView";var x=$("#"+y);var u=$("#"+v);var t=SiebelApp.S_App.LocaleObject;if(w.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){x.attr({role:"navigation",title:t.GetLocalString("IDS_SWE_FIRST_LEVEL_VIEW_BAR_TITLE")}).children("ul").eq(0).attr("aria-live","off");
u.attr({role:"navigation",title:t.GetLocalString("IDS_SWE_SECOND_LEVEL_VIEW_BAR_TITLE")}).children("ul").eq(0).attr("aria-live","off")}else{x.attr({role:"navigation",title:t.GetLocalString("IDS_SWE_THIRD_LEVEL_VIEW_BAR_TITLE")}).children("ul").eq(0).attr("aria-live","off");u.attr({role:"navigation",title:t.GetLocalString("IDS_SWE_FOURTH_LEVEL_VIEW_BAR_TITLE")}).children("ul").eq(0).attr("aria-live","off")}}function a(E,A,D,t){var v=k.get("SWE_PROP_QTP_OT");var C=k.get("SWE_PROP_QTP_RN");var B=k.get("SWE_PROP_QTP_UN");if(D&&(typeof(D.GetProperty)==="function")){E.children("ul").attr("ot",D.GetProperty(v)).attr("rn",D.GetProperty(C)).attr("un",D.GetProperty(B))}if(!t){return}var u=E.children("ul").children("li");for(var z=0;z<u.length-1;z++){if(t[z]&&(typeof(t[z].GetProperty)==="function")){u.eq(z).attr("ot",t[z].GetProperty(v)).attr("rn",t[z].GetProperty(C)).attr("un",t[z].GetProperty(B))}}var x=z;var w=(A==="tabScreen")?this.GetPM().Get("GetSelectedTabKey"):this.GetPM().Get("GetSelectedLinkKey");if(w){var y=parseInt(w.substring(A.length));if(y){x=(y<z)?z:y}}if(t[x]&&(typeof(t[x].GetProperty)==="function")){u.eq(z).attr("ot",t[x].GetProperty(v)).attr("rn",t[x].GetProperty(C)).attr("un",t[x].GetProperty(B))}}function r(C,B,t,y){var v=k.get("SWE_PROP_QTP_OT");var A=k.get("SWE_PROP_QTP_RN");var z=k.get("SWE_PROP_QTP_UN");if(B&&(typeof(B.GetProperty)==="function")){C.attr("ot",B.GetProperty(v)).attr("rn",B.GetProperty(A)).attr("un",B.GetProperty(z))}var u=C.children("option");for(var x=0;x<u.length;x++){var w=Number((u.eq(x).val()||"").replace(y,""));if(w&&t[w]&&(typeof(t[w].GetProperty)==="function")){u.eq(x).attr("ot",t[w].GetProperty(v)).attr("rn",t[w].GetProperty(A)).attr("un",t[w].GetProperty(z))}}}function s(){var x=this.GetPM();var w=x.Get("GetTabContainerQTPInfo");var y=x.Get("GetTabItemsQTPInfo");var u=x.Get("GetTabViewLinkContainerQTPInfo");var v=x.Get("GetTabViewLinkItemsQTPInfo");var z=x.Get("placeholder")+"_tabScreen";var t=x.Get("LevelPlaceholder")+"_tabView";a.call(this,$("#"+z),"tabScreen",w,y);a.call(this,$("#"+t),"tabView",u,v);r.call(this,$("#j_"+z),x.Get("GetJumpTabQTPInfo"),y,"tabScreen");r.call(this,$("#j_"+t),x.Get("GetJumpTabQTPInfo"),v,"tabView")}return f}());return"SiebelAppFacade.AccNavigationPhyRenderer"})};