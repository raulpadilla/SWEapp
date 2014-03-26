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
if(typeof(SiebelAppFacade.ExplorerPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ExplorerPresentationModel");define("siebel/explorerpmodel",[],function(){SiebelAppFacade.ExplorerPresentationModel=(function(){var g=SiebelJS.Dependency("SiebelApp.Constants");var i=SiebelJS.Dependency("SiebelApp.Utils");function e(j){SiebelAppFacade.ExplorerPresentationModel.superclass.constructor.call(this,j)}SiebelJS.Extend(e,SiebelAppFacade.PresentationModel);e.prototype.Init=function(){SiebelAppFacade.ExplorerPresentationModel.superclass.Init.call(this);this.AddProperty("root",{});this.AddProperty("placeholder","s_"+this.Get("GetId")+"_treectrl");this.AddProperty("selectednode",null);this.AddProperty("currentnode",null);this.AddProperty("nodecount",0);this.AddProperty("refreshTree",false);this.AddProperty("cleartree",false);this.AddProperty("LandMarkTitle",this.Get("GetAppletLabel")+" "+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_TREE_APPLET"));this.AttachNotificationHandler(g.get("SWE_PROP_BC_NOTI_GENERIC"),function(j){var k=h(j.GetProperty("ArgsArray"));if(j.GetProperty("type")==="GetPage"){b.call(this,k[3])}});this.AttachEventHandler("OnTreeEvent",function(l,j){var k=CCFMiscUtil_CreatePropSet();k.SetProperty(g.get("SWE_TREE_ITEM_STR"),j);this.ExecuteMethod("InvokeMethod",l,k)});this.AddMethod("SetCurrentNode",function(j){f.call(this,j,this.Get("root"))})};e.prototype.Setup=function(j){SiebelAppFacade.ExplorerPresentationModel.superclass.Setup.call(this,j);b.call(this,j.GetProperty(g.get("SWE_PROP_UPDATE")))};function h(q){var o=[];var m=0;var j=q;while(true){if(o.length>3){break}var l=q.indexOf("*",m);var n=q.substring(m,l);var p=Number(n);if(n===0){o.push("");m=n.length+m+1}else{var k=q.substring(l+1,l+1+Number(n));o.push(k);m=n.length+m+1+Number(n)}}return o}function b(o){var m=o;var j=m.length;var q=0;var p=0;var l=0;var k="";this.SetProperty("cleartree",true);this.SetProperty("nodecount",0);while(q<=j){q=m.indexOf(" ",p);l=m.substring(p,q);p=q;q=Number(p)+Number(l)+1;k=m.substring(p+1,q);p=Number(q);var n=a.call(this,k);d.call(this,n)}this.SetProperty("refreshTree",true)}function a(k){var n=k.indexOf("|");if(n===-1){n=k.length}var m=k.substring(0,n);var j=m.split(" ",n-1);var l=k.substring(n+1);if(l!==""){j[j.length-1]=l}return j}function c(){var k=this.Get("currentnode");var j=k.child.length+1;if(k.position==="0"){return(""+j)}else{return(this.Get("currentnode").position+"."+j)}}function d(l){if(l[0]===g.get("CMD_SET_ROOT")){var j=this.Get("root");if(j.child==undefined){j={caption:"root",child:[],type:"0",position:"0"};this.SetProperty("root",j)}this.SetProperty("currentnode",j);var k={caption:l[1],child:[],type:g.get("TREENODE_TYPE_ROOT"),selected:"f",position:c.call(this),parent:this.Get("currentnode")};j.child.push(k);this.SetProperty("currentnode",k);this.SetProperty("nodecount",this.Get("nodecount")+1)}else{if(l[0]===g.get("CMD_ADD_CHILD")){var n={child:[],type:l[1],selected:l[2],caption:l[3],position:c.call(this),parent:this.Get("currentnode")};this.Get("currentnode").child.push(n);this.SetProperty("nodecount",this.Get("nodecount")+1)}else{if(l[0]===g.get("CMD_ADD_CHILDI")){var n={child:[],type:l[1],selected:l[2],icon:l[3],caption:l[4],position:c.call(this),parent:this.Get("currentnode")};this.Get("currentnode").child.push(n);this.SetProperty("nodecount",this.Get("nodecount")+1)}else{if(l[0]===g.get("CMD_GO_DOWN")){var m=this.Get("currentnode");this.SetProperty("currentnode",m.child[m.child.length-1])}else{if(l[0]===g.get("CMD_GO_UP")){this.SetProperty("currentnode",this.Get("currentnode").parent)}else{if(l[0]===g.get("CMD_EXPAND_ITEM")){this.Get("currentnode").expand=l[1]}else{if(l[0]===g.get("CMD_SELECT_ITEM")){f.call(this,l[1],this.Get("root"));this.SetProperty("selectednode",this.Get("currentnode"))}else{if(l[0]===g.get("CMD_DELETE_ALL")){this.SetProperty("root",{})}else{if(l[0]===g.get("CMD_DELETE_CHILDREN")){f.call(this,l[1],this.Get("root"));this.Get("currentnode").child=[];this.Get("currentnode").expand=""}}}}}}}}}}function f(j,k){if(k.position===j){this.SetProperty("currentnode",k);return}for(var l=0;l<k.child.length;l++){if(k.child[l].position===j){this.SetProperty("currentnode",k.child[l]);return}else{if(k.child[l].child.length>0){f.call(this,j,k.child[l])}}}}return e}());return"SiebelAppFacade.ExplorerPresentationModel"})};