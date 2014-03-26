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
if(typeof(SiebelAppFacade.ListRenderer)=="undefined"){Namespace("SiebelAppFacade.ListRenderer");SiebelAppFacade.ListRenderer=(function(){var b=SiebelApp.Utils;var d=SiebelAppFacade.FacadeConstants;var a=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);function c(e){this.superclass.constructor.call(this,e);var f={};this.GetAttribute=function(g){return(b.IsEmpty(f[g])?null:f[g])};this.SetAttribute=function(g,h){f[g]=h}}c.prototype.ShowUI=function(){this.superclass.ShowUI.call(this)};c.prototype.OnControlEvent=function(i){var h;switch(i[0]){case"sr":var k=i[1];var l=i[2];var g=i[3];h=this.GetProxy().HandleRowSelect(k,l,g);break;case"vs":var e=i[1];h=this.GetProxy().OnVerticalScroll(e);break;case"st":var f=i[1];var j=i[2];h=this.GetProxy().OnClickSort(f,j);break;case"CellChange":this.GetProxy().OnLeaveColInput(i[1],i[2],i[3]);break;default:h=this.superclass.OnControlEvent.call(this,i);break}return(h)};c.prototype.CreateRenderer=function(){var f="JQGRID";var g=SiebelAppFacade.JQGridRenderer;if(a){f="JQMLIST"}switch(f){case"JQGRID":var e=b.InheritCtor(SiebelAppFacade.PhysicalRenderer,SiebelAppFacade.JQGridRenderer);this.SetConcreteRenderer(new e(this));break;case"JQMLIST":var h=b.InheritCtor(SiebelAppFacade.PhysicalRenderer,SiebelAppFacade.JQMListRenderer);this.SetConcreteRenderer(new h(this));break}};c.prototype.FocusFirstControl=function(){this.GetConcreteRenderer().FocusFirstControl()};c.prototype.SetFocusToControl=function(e){return(this.GetConcreteRenderer().SetFocusToControl(e))};c.prototype.SetCellValue=function(f,g,e){this.GetConcreteRenderer().SetCellValue(f,g,e)};c.prototype.SetCellEdit=function(e){this.GetConcreteRenderer().SetCellEdit(e)};c.prototype.ShowSelection=function(){this.GetConcreteRenderer().ClearSelection();var e=this.GetConcreteRenderer().GetRowCount();for(var f=0;f<e&&f<this.GetProxy().GetRowsSelectedArray().length;f++){this.GetConcreteRenderer().SelectRow(f+1,this.GetProxy().GetRowsSelectedArray()[f])}};c.prototype.ShowSearch=function(){if(a){this.GetSearchCtrl().SetContainer($("#"+this.GetPlaceholder()))}else{this.GetSearchCtrl().SetContainer($("#"+this.GetPlaceholder()).parents("div.NotSelected").parent().find("tr td[width='100%']")[0]||$("#"+this.GetPlaceholder()).parents("td.AppletStylePopup").find("tr td[width='100%']")[0])}var f=[];var h=this.GetListOfColumns();for(var e in h){f.push(h[e].control.GetDisplayName())}this.GetSearchCtrl().ShowUI(f,this.GetPlaceholder());if(this.GetProxy().GetAppletLabel()!=""){this.GetSearchCtrl().GetInputField().attr("title",this.GetProxy().GetAppletLabel()+":Search");this.GetSearchCtrl().GetSearchField().attr("title",this.GetProxy().GetAppletLabel()+":Search")}var g=this;this.GetSearchCtrl().GetInputField().result(function(j,l,k){var i={};i[g.GetSearchCtrl().GetSelectedField()]=l;g.Query(i)});this.GetSearchCtrl().GetInputField().bind("keypress",function(m){if(m.which==13){var n=g.GetSearchCtrl().GetInputField().attr("value");var j={};var l=g.GetListOfColumns();for(var k=0;k<l.length;k++){if(l[k].control.GetDisplayName()==(g.GetSearchCtrl().GetSelectedField())){var o=l[k].control.GetSpanPrefix()+"0";g.GetSearchCtrl().SetColumnId(o)}}j[g.GetSearchCtrl().GetSelectedField()]=n;g.Query(j);return false}})};c.prototype.BindData=function(e){if(e==true){this.GetConcreteRenderer().ClearData()}this.GetConcreteRenderer().BindData();this.BindSearchData({matchContains:false,multiple:false,mustMatch:false,autoFill:false,minChars:0})};c.prototype.GetRowIdentifier=function(){var e=this.GetProxy().GetRowIdentifier();if(e==""||typeof(e)=="undefined"||e==null){e=this.GetListOfColumns()[0].name}return e};c.prototype.GetAppletSummary=function(){var e=this.GetProxy().GetAppletSummary();return e};c.prototype.GetListOfColumns=function(){var h=this.GetProxy().GetListOfColumns();var g=[];for(var f in h){if(h.hasOwnProperty(f)){var j=h[f];var e=f;var i={name:e,controlType:j.GetUIType(),isLink:this.GetProxy().CanNavigate(e),index:Number(j.GetColNum())+1,bCanUpdate:this.GetProxy().CanUpdate(e),control:j};this.GetControlKeyMap()[e]=f;g.push(i)}}g.sort(function(l,k){return(l.index-k.index)});this.GetListOfColumns=function(){return g};return g};return c}())};