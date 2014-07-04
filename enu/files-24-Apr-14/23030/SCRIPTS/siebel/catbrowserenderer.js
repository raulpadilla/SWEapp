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
if(typeof(SiebelAppFacade.CatalogBrowseRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CatalogBrowseRenderer");define("siebel/catbrowserenderer",["siebel/treeappletphyrenderer"],function(){SiebelAppFacade.CatalogBrowseRenderer=(function(){var b=SiebelJS.Dependency("SiebelApp.Utils");var d=SiebelJS.Dependency("SiebelApp.Constants");function e(f){SiebelAppFacade.CatalogBrowseRenderer.superclass.constructor.call(this,f)}SiebelJS.Extend(e,SiebelAppFacade.TreeAppletPR);e.prototype.BindData=function(){SiebelAppFacade.CatalogBrowseRenderer.superclass.BindData.call(this);a()};e.prototype.BindEvents=function(){var f=this.GetPM();var g=f.Get("placeholder");$("#"+g).bind("open_node.jstree",function(k,j){if(j.args.length===1){var i=$(j.args[0]).closest("li");var l=$(i).attr("id");var h=j.rslt.obj;$("li[class*='jstree-open']").each(function(m,n){if((l!==this.id)&&($(this).parent()!==$(i).parent())&&(0===$(this).has(i).length)){f.OnControlEvent("OnTreeEvent","CollapseTreeItem",this.id)}});f.OnControlEvent("OnTreeEvent","SelectTreeItem",l)}});$("#"+g).bind("click",function(k,j){var i=$(k.target).closest("li");var l=$(i).attr("id");var h=f.Get("selectednode")?f.Get("selectednode").position:null;if((k.target.nodeName!=="A")){return}k.stopImmediatePropagation();if((l===h)&&(!($(i).hasClass("jstree-leaf")))){f.OnControlEvent("OnTreeEvent","ExpandTreeItem",$(k.target).parent("li")[0].id)}else{$("li[class*='jstree-open']").each(function(m,n){if((l!==this.id)&&($(this).parent()!==$(i).parent())&&(0===$(this).has(i).length)){f.OnControlEvent("OnTreeEvent","CollapseTreeItem",this.id)}});f.OnControlEvent("OnTreeEvent","SelectTreeItem",$(k.target).parent("li")[0].id)}});SiebelAppFacade.CatalogBrowseRenderer.superclass.BindEvents.call(this)};function c(){SiebelAppFacade.CatalogBrowseRenderer.superclass.AddRoots.call(this)}function a(f){$("div[class*='jstree']").addClass("jstree-browsecatalog");$("li[role='presentation'][id='1']").children(":first").hide().next().hide();$("a[role='treeitem'] > ins[class*='jstree-icon']").hide()}return e}());return"SiebelAppFacade.CatalogBrowseRenderer"})};