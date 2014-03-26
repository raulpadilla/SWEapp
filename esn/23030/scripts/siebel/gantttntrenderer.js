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
if(typeof(SiebelAppFacade.GanttTNTRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.GanttTNTRenderer");define("siebel/gantttntrenderer",["siebel/ganttrenderer"],function(){SiebelAppFacade.GanttTNTRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants"),c=a.get("SWE_GANTT_ACTIVITY_LABEL");function b(){SiebelAppFacade.GanttTNTRenderer.superclass.constructor.apply(this,arguments);var e=this.GetPM()}SiebelJS.Extend(b,SiebelAppFacade.GanttRenderer);b.prototype.ShowUI=function(){d.call(this);SiebelAppFacade.GanttTNTRenderer.superclass.ShowUI.call(this)};b.prototype.BindData=function(){SiebelAppFacade.GanttTNTRenderer.superclass.BindData.call(this);var e=this.GetPM();if(e.Get("Redraw Legends")==="Y"){e.SetProperty("Redraw Legends","");this.getGanttLegendBar().createLegends(e.ExecuteMethod("prepareLegendMap"),e.Get("ShowLegend"))}};b.prototype.BindEvents=function(){SiebelAppFacade.GanttTNTRenderer.superclass.BindEvents.call(this);var n=this,p,j,l,e,i=n.GetPM(),q,k,g,r,s,o,h,m=0,f=$("#s_"+i.Get("GetFullId")+"_div");q=i.Get("GetControls");k=q.TurnTime;if(k){g=k.GetInputName();f.find("[Name="+g+"]").bind("click",{ctx:this},function(t){i.SetProperty("TurnTime",$(this).val())})}r=q.ConfigSpacePattern;if(r){s=r.GetInputName();f.find("[Name="+s+"]").bind("click",{ctx:this},function(t){i.SetProperty("ConfigSpacePattern",$(this).val())})}p=q["Display Toggle"];if(p){j=p.GetInputName();f.find("[Name="+j+"]").unbind("autocompleteclose")}l=q["Color Display Toggle"];if(l){e=l.GetInputName();f.find("[Name="+e+"]").unbind("autocompleteclose");f.find("[Name="+e+"]").bind("blur",{ctx:this},function(t){h=i.Get("LIC Field")[$(this).val()];i.SetProperty("Color Display By",h);i.SetProperty("Redraw Legends","Y")})}f=null;q=null};b.prototype.GetDrilldownPropSet=function(h,g,j){var f=SiebelAppFacade.GanttTNTRenderer.superclass.GetDrilldownPropSet.call(this,h,g,j);if(($(h).attr("data-drilldown-type"))==="UGrid"){var l=$(h).closest("div.siebui-taskBox").attr("taskid");var k=$(h).closest("div.siebui-taskEditUtility").attr("taskid");var i=this.GetPM().ExecuteMethod("getEvent",k,l);var e=i?i.FI:0;if(e){f.SetProperty("Function Id",e)}}return f};function d(){var g=this.GetPM(),n=$(window).height(),m=$("#_sweappmenu").height(),e=$(".siebui-button-toolbar").height(),f=$("#_swethreadbar").height(),k=$("#_swescrnbar").height(),h=$("#s_"+g.Get("GetFullId")+"_div").find(".AppletButtons").height(),j=$("#seibui-formControls").height(),i=75,l=n-(m+e+f+k+h+j+i);this.setGanttCtrlHeight(l)}return b}());return"SiebelAppFacade.GanttTNTRenderer"})};