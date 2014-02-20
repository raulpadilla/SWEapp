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
SiebelApp.UIStatus=function(){this.maskClass="siebui-mask-overlay";this.m_gbusy=0;this.timeout=false};SiebelApp.UIStatus.prototype={Busy:function(a){if(SiebelApp.UIStatus.Global){SiebelApp.UIStatus.Global.Free();delete SiebelApp.UIStatus.Global}this.m_gbusy++;var c=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LOADING_INDICATOR_TITLE");a=$.extend({message:c,target:"html",imgClass:"siebui-mask-image",timeOut:true},a);var b=this;if(this.m_gbusy>1&&a.timeOut){clearTimeout(this.timeoutid);this.timeoutid=setTimeout(function(){b.timeout=true;b.Free()},30000);return this}if(a.mask){$("#mask").removeClass().addClass(a.imgClass);if(a.imgClass!="siebui-mask-splash"){if(SiebelApp.S_App.IsMobileApplication()==="true"){$("#mask-img").show()}else{$("#mask-img").hide();setTimeout(function(){$("#mask-img").show()},900)}}$("div.siebui-mask-content").html(a.message);$("#maskoverlay").css({width:$(a.target).outerWidth(),height:$(a.target).outerHeight()||"100%",top:$(a.target).position().top,left:$(a.target).position().left,display:"block"});$("#mask").css({width:$(a.target).outerWidth(),height:$(a.target).outerHeight()||"100%",top:$(a.target).position().top,left:$(a.target).position().left,display:"block"})}$("html").addClass("siebui-busy");this.config=a;if(a.timeOut){this.timeoutid=setTimeout(function(){b.timeout=true;b.Free()},30000)}return this},Free:function(){if(this.m_gbusy>0){this.m_gbusy--}if(SiebelApp.S_App.GetEnablePerfHooks()&&SiebelApp.S_App.GetTimer()&&this.m_gbusy===0){SiebelApp.S_App.GetTimer().TimePopupApplet("","Reset Busy State");SiebelApp.S_App.GetTimer().TimeGoToView("","Reset Busy State");SiebelApp.S_App.GetTimer().TimeInvokeMethod("","","","Reset Busy State");SiebelApp.S_App.GetTimer().TimeRefreshView("","","Reset Busy State");SiebelApp.S_App.GetTimer().ShowTotal()}this.config=typeof(this.config)==="object"?this.config:{};if(this.m_gbusy<=0||this.timeout){if(this.config.mask){$("#maskoverlay").hide();$("#mask").hide()}$("html").removeClass("siebui-busy");clearTimeout(this.timeoutid);if(this.timeout){this.m_gbusy=0;this.timeout=false}}return this},IsBusy:function(){if($("html")[0].className=="siebui-busy"||this.m_gbusy>0){return true}else{return false}},LocalBusy:function(a){this.configLocal=this.configLocal||{};var b=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LOADING_INDICATOR_TITLE");$.extend(this.configLocal,{message:b,imgClass:"localLoading"});$.extend(this.configLocal,a);if(this.configLocal.mask===true){$(this.configLocal.target).addClass(this.configLocal.imgClass);$(this.configLocal.target).html(this.configLocal.message)}},LocalFree:function(){$(this.configLocal.target).removeClass(this.configLocal.imgClass)},ShowOnLoadIndicator:function(){$("body").append(" <div id='maskoverlay' class='siebui-mask-overlay' />         <div id='mask'>                                                <div id='mask-img' />                                        <div class='siebui-mask-content' />                        </div>                                                      ");var a=new SiebelApp.UIStatus({});a.Busy({target:"html",imgClass:"siebui-mask-splash",mask:true});SiebelApp.UIStatus.Global=a}};$(function(){if(!SiebelApp.S_App.PortletSessionMgr||!SiebelApp.S_App.PortletSessionMgr.GetInstance()||!SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction()||SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction().indexOf("SWECmd=GetApplet")===-1){SiebelApp.S_App.uiStatus.ShowOnLoadIndicator()}});