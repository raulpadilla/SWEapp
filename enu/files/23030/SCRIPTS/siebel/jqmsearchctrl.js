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
if(typeof(SiebelAppFacade.JQMSearchCtrl)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JQMSearchCtrl");SiebelAppFacade.JQMSearchCtrl=(function(){var b=SiebelApp.Constants;function e(f){var g;this.m_inProgress=false;this.SetContainer=function(h){this.GetContainer=function(){return h}};this.GetRenderer=function(){return f};this.SetColumnId=function(h){g=h};this.GetColumnId=function(){return g}}e.prototype.ShowUI=function(n,h){this.SetContainer($("#"+h));var f=$("#s_"+this.GetRenderer().GetPM().Get("GetFullId")+"_div");var p="";var g=this.GetRenderer().GetPM().Get("GetAppletLabel");var l=' rn="'+g+'_SearchCtrl" ot="SearchCtrl" un="'+g+'_SearchCtrl" ';var k=' rn="'+g+'_SearchInput" ot="SearchInput" un="'+g+'_SearchInput" ';for(var m=0,o=n.length;m<o;m++){p+="<option>"+n[m]+"</option>"}var j="";j='<div id="'+h+'_AppletSearch" class="AppletSearchContainer"><fieldset id="'+h+'_searchContainer" class="SearchFieldSet" data-role="controlgroup" data-type="horizontal"><label for="'+h+'_searchField"/><select id="'+h+'_searchField"'+l+">"+p+'</label><label for="'+h+'_searchInput"><input type="search" id="'+h+'_searchInput"'+k+' value="" /></fieldset></div>';$(this.GetContainer()).prepend(j).trigger("create");$("#"+h+"_searchField").bind("change",function(i){});var q=$("#"+h+"_searchField");q.selectedIndex=0;q.selectmenu("refresh");this.GetInputField=function(){return $("#"+h+"_searchInput")};this.GetSearchField=function(){return $("#"+h+"_searchField")};this.GetInputField().bind("focus",{ctx:this},a).bind("blur",{ctx:this},d).bind("keydown",{ctx:this},c).val(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_SEARCH_WATER_MARK"))};e.prototype.GetSelectedField=function(){return $(this.GetSearchField()).val()};e.prototype.GetSearchField=function(){return $()};e.prototype.BindData=function(g,f){};function a(j){var f=j.data.ctx;if($(this).val()===String(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_SEARCH_WATER_MARK"))){$(this).val("")}var g=f.GetRenderer().GetPM();if(!this.m_inProgress){var i=g.ExecuteMethod("InvokeMethod","ImplicitCommit");this.m_inProgress=true;var h=this;if(i){setTimeout(function(){$(h).unbind("focus",a);$(h).focus();$(h).val("");$(h).bind("focus",{ctx:f},a);h.m_inProgress=false},50)}else{setTimeout(function(){h.m_inProgress=false},20)}g.OnControlEvent(b.get("PHYEVENT_APPLET_FOCUS"))}}function d(){if(!$(this).val()){$(this).val(String(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_SEARCH_WATER_MARK")))}}function c(k){var g=k.data.ctx;if(k.which===$.ui.keyCode.ENTER){var l=g.GetInputField().val();var f={};var j=g.GetRenderer().GetPM().Get("ListOfColumns");for(var h=0;h<j.length;h++){if(j[h].control.GetDisplayName()===(g.GetSelectedField())){var m=j[h].control.GetSpanPrefix()+"0";g.SetColumnId(m);g.GetRenderer().GetPM().AddProperty("SearchColumnId",m);g.GetRenderer().GetPM().AddProperty("SearchValue",l);g.GetRenderer().GetPM().AddProperty("SearchField",j[h].control.GetName());break}}f[g.GetSelectedField()]=l;g.GetRenderer().GetPM().ExecuteMethod("Query",f);this.blur();return false}}return e}())};