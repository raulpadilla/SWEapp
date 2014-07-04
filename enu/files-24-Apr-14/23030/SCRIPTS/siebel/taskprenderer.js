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
if(typeof(SiebelAppFacade.TaskPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.TaskPhyRenderer");var consts=SiebelJS.Dependency("SiebelApp.Constants");SiebelAppFacade.TaskPhyRenderer=(function(){function e(k){SiebelAppFacade.TaskPhyRenderer.superclass.constructor.call(this,k)}SiebelJS.Extend(e,SiebelAppFacade.BasePR);e.prototype.Init=function(){SiebelAppFacade.TaskPhyRenderer.superclass.Init.call(this);this.AttachPMBinding("TaskRefresh",this.BindData)};e.prototype.ShowUI=function(){SiebelAppFacade.TaskPhyRenderer.superclass.ShowUI.call(this);$("#SS_TaskUIPane").addClass(SiebelApp.S_App.GetDirection()?"siebui-task-pane siebui-rtl-element-right":"siebui-task-pane");d.call(this)};e.prototype.BindEvents=function(){SiebelAppFacade.TaskPhyRenderer.superclass.BindEvents.call(this);$("[id=s_close]").bind("click",{ctx:this},function(k){k.data.ctx.GetPM().OnControlEvent(consts.get("TASK_PANE_CLOSE"))});$("[id=s_gotoinbox]").bind("click",{ctx:this},function(k){k.data.ctx.GetPM().OnControlEvent(consts.get("TASK_NAVIGATE_INBOX"))})};e.prototype.BindData=function(){SiebelAppFacade.TaskPhyRenderer.superclass.BindData.call(this);try{$("#"+this.GetPM().Get("GetContainer")).dynatree("getRoot").removeChildren()}catch(k){}i.call(this);b.call(this);j.call(this)};function i(){var m=this.GetPM().Get("LocaleInfo");if(m){var l;var k;l=$("[id=IDS_TASKPANE_CAPTION]");k=l.parent();l.remove();k.append("<label>"+m.CAPTION+"</label>");l=$("[id=IDS_TASKPANE_GOTOINBOX ]");k=l.parent();l.remove();$("#s_gotoinbox").attr("href","javascript:void(0)");k.append(m.GOTOINBOX);$("#IDS_TASKPANE_PROGRESS").html(m.PROGRESS)}}function b(){var l=this.GetPM().Get("TaskContext");if(l&&l.length){var m=h.call(this);if(!m){return}for(var k=0;k<l.length;k++){f.call(this,l[k],m)}}}function c(k,n){var m=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_TSKLINKICON");var l=n.addChild({title:k.TaskDispName,isFolder:false,url:"",icon:m,activate:true,addClass:false,expand:true,key:k.TaskName})}function f(p,o){var m=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON");var n=o.addChild({title:p.GrpDispName,isFolder:true,icon:m,activate:true,expand:true,key:p.grpName,noLink:true});var l=p.TASKLIST;for(var k=0;k<l.length;k++){c.call(this,l[k],n)}}function h(){var l=$("#"+this.GetPM().Get("GetContainer"));if(!l.length){return}var k=l.dynatree("getRoot");var m=k.addChild({title:"TaskPane",key:"TBUI",addClass:"dynatree-root-tag",isFolder:true,expand:true,url:null});return m}function d(){var k=$("#"+this.GetPM().Get("GetContainer"));var l=this;k.dynatree({autoCollapse:true,imagePath:" ",classNames:{nodeIcon:null},clickFolderMode:3,minExpandLevel:1,persist:false,expandOnAdd:true,onClick:function(n,m){n.data.expand=true;if(n.data.isFolder===true){if(n.data.expand===true){n.data.expand=false;n.data.icon=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_COLLAPSEICON")}else{n.data.expand=true;n.data.icon=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON")}}else{l.GetPM().OnControlEvent("TaskNavigate","StartTask",n)}}})}function j(){var k=this.GetPM().Get("CurrentTask");if(k&&k.TaskDispName){var o=h.call(this);var l=o.addChild({title:k.TaskDispName,isFolder:false,icon:null,activate:true,expand:true,key:"",noLink:true});var n=this.GetPM().Get("CurrentTaskChapter");for(var m=0;m<n.length;m++){a.call(this,n[m],l)}}}function a(m,p){var k=m.STEPS;var o;if(k.length>0){o=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_COLLAPSEICON")}else{o=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON")}var l=p.addChild({title:m.CDN,isFolder:true,icon:o,activate:true,expand:true,key:"",noLink:true});for(var n=0;n<k.length;n++){g.call(this,k[n],l)}}function g(n,k){var m=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_TSKLINKICON");var l=k.addChild({title:n.TSDN,isFolder:false,url:"",icon:m,activate:true,addClass:false,expand:true,key:""})}e.prototype.Refresh=function(){$("#"+this.GetPM().GetContainer()).dynatree("getRoot").removeChildren();return};return e}())};