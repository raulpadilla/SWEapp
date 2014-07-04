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
if(typeof(SiebelApp.S_App.PortletSessionMgr)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.PortletSessionMgr");SiebelApp.S_App.PortletSessionMgr=(function(){var d=SiebelJS.Dependency("SiebelApp.Constants");var c=SiebelJS.Dependency("SiebelApp.Utils");var a;function b(){var m=SiebelApp.S_App.LocaleObject;var k="";var r=0;var j=false;var o="";var p=0;var q=false;var h;var t;a=this;SiebelApp.S_App.PortletSessionMgr=function(){return a};SiebelApp.S_App.PortletSessionMgr.GetInstance=b.GetInstance;a.constructor=b;this.GetAction=function(){return k};this.ProcessPortalRequest=function(B,z){if(q){alert(m.GetLocalString("IDS_PORTLET_API_BLOCK_MSG").replace("%1",h));return}else{if(p>=t){i.call(this,true);return}else{if(typeof(z.Key)==="undefined"){p++;alert(m.GetLocalString("IDS_PORTLET_API_NULL_KEY"));return}else{if(!l(B)){p++;alert(m.GetLocalString("IDS_PORTLET_API_UNAUTHORIZED_DOMAIN_USER"));return}else{var v=d.get("SWE_PARAM_PORTLET_API_KEY");var A=d.get("SWE_CMD_ARG");var y=d.get("SWE_AUX_CMD_STR");var x=CCFMiscUtil_CreatePropSet();var u=CCFMiscUtil_CreatePropSet();var w={};w.selfbusy=true;w.scope=this;w.cb=function(){if(SiebelApp.S_App.ErrorObject.HasErrorMsg()){p++;SiebelApp.S_App.ErrorObject.ProcessError()}else{p=0}};u.SetProperty(v,z.Key);for(var C in z){if(z.hasOwnProperty(C)){if((C!==v)&&(C!==y)){u.SetProperty(C,z[C])}}}SiebelApp.S_App.CallServer(u,x,true,w)}}}}};function n(u){o=u.GetProperty(d.get("SWE_PROP_PORTLET_ORIGIN_LIST"));t=Number(u.GetProperty(d.get("SWE_PROP_PORTLET_API_FAILUREATTEMPT")));h=Number(u.GetProperty(d.get("SWE_PROP_PORTLET_API_BLOCK_TIME")));if(c.IsTrue(u.GetProperty(d.get("SWE_PARAM_PORTLET_API_BLOCKE_STATE")))){i.call(this,false)}}this.ProcessPortletInfo=function(u){r=u.GetProperty(d.get("SWE_PROP_SESSIONTIMEOUT_VALUE"));if(c.IsTrue(u.GetProperty(d.get("SWE_PARAM_KEEPALIVE")))){j=true}n.call(this,u);g.call(this,u.GetProperty(d.get("SWE_PROP_PORTLET_ACTION")));if(j){s.call(this)}};function g(u){u=u.replace(/SWEAC[\s]*=/g,"").replace("SWECmd%3d","SWECmd=");if(j){u+="&"+d.get("SWE_PARAM_KEEPALIVE")+"=1"}k=encodeURI(u)}function i(w){q=true;var x=CCFMiscUtil_CreatePropSet();var u=CCFMiscUtil_CreatePropSet();var v={};setTimeout(function(){q=false;p=0;u.SetProperty(d.get("SWE_PARAM_PORTLET_API_BLOCKE_STATE"),"0");SiebelApp.S_App.CallServer(u,x,false,v)},h*1000);if(w){u.SetProperty(d.get("SWE_PARAM_PORTLET_API_BLOCKE_STATE"),"1");SiebelApp.S_App.CallServer(u,x,false,v);alert(m.GetLocalString("IDS_PORTLET_API_BLOCK_MSG").replace("%1",h))}}function s(){var x=CCFMiscUtil_CreatePropSet();var u=CCFMiscUtil_CreatePropSet();var w=r*1000-100;var v={};u.SetProperty(d.get("SWE_CMD_ARG"),d.get("SWE_PROP_PING"));v.selfbusy=true;setInterval(function(){SiebelApp.S_App.CallServer(u,x,false,v)},w)}function l(u){var w=o.split(",");for(var v=0;v<w.length;v++){if(w[v]===u){return true}}return false}e.call(this);return a}b.GetInstance=function(){return a};function f(g){SiebelApp.S_App.PortletSessionMgr.GetInstance().ProcessPortalRequest(g.origin,g.data)}function e(){if(window.addEventListener){window.addEventListener("message",f,false)}else{window.attachEvent("onmessage",f,false)}}return b}())};