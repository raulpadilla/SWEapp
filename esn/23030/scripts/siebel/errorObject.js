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
if(typeof(SiebelApp.S_App.ErrorObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.ErrorObject");var consts=SiebelJS.Dependency("SiebelApp.Constants");var utils=SiebelJS.Dependency("SiebelApp.Utils");SiebelApp.S_App.ErrorObject=(function(){function f(){var h=["Global"],i=[[]],g=true;this.GetErrorSuppressState=function(){return g};this.SetErrorSuppressState=function(j){g=j};this.AddCapableObject=function(k){var j=false;if(h.indexOf(k)===-1){h.push(k);i.push([]);j=true}return j};this.GetIndex=function(j){return(h.indexOf(j===undefined?"Global":j))};this.GetErrorArray=function(k){var j=this.GetIndex(k);return j===-1?null:i[j]};this.ResetErrorArray=function(k){var j=this.GetIndex(k);if(j!==-1){i[j]=[]}};this.DeleteErrorObj=function(k){var j=this.GetIndex(k);if(j>-1){h.splice(j,1);i.splice(j,1)}};this.AddErrorRecord=function(k,l){var j=this.GetIndex(l);if(j!==-1){i[j].push(k)}else{SiebelJS.Log("Failed to save error message")}}}f.prototype.AddErrorMsgText=function(h,i,g){b.call(this,h,i,g)};f.prototype.ProcessError=function(){c.apply(this,arguments)};f.prototype.SetErrorMsg=function(g,h){d.call(this,g,h)};f.prototype.ClearErrorMsg=function(){e.apply(this,arguments)};f.prototype.HasErrorMsg=function(){a.apply(this,arguments)};f.prototype.DecorateErrorCapability=function(g){if(this.AddCapableObject(g)){g.ProcessError=function(){if(!this.CanProcessError||this.CanProcessError(SiebelApp.S_App.ErrorObject.GetErrorArray(this))){c.call(SiebelApp.S_App.ErrorObject,this)}else{e.call(SiebelApp.S_App.ErrorObject,this)}};g.SetErrorMsg=function(h,i){d.call(SiebelApp.S_App.ErrorObject,h,i,this)};g.ClearErrorMsg=function(){e.call(SiebelApp.S_App.ErrorObject,this)};g.HasErrorMsg=function(){a.call(SiebelApp.S_App.ErrorObject,this)};g.AddErrorMsgText=function(i,j,h){b.call(SiebelApp.S_App.ErrorObject,i,j,h,this)}}};function c(m){var g=consts.get("SSAELErrUserDefinedError");var h=this.GetErrorArray(m);var l=h===null?0:h.length;var k="";if(l===0){return}for(var j=0;j<l;j++){if(h[j].errCode===g){k=h[j].errMsg;break}if(l>1){k+="["+(j+1)+"]"}k+=h[j].errMsg+"\n"}if(k){alert(HtmlDecode(k))}e.call(this,m)}function e(g){this.ResetErrorArray(g)}function d(g,j,i){var h={};e.call(this,i);if(g==="OK"){return true}h.errCode=g;h.errMsg=SiebelApp.S_App.LocaleObject.GetLocalString(g);if(!h.errMsg){h.errMsg=g}else{if(j){if(g==="LocaleErrFormattedToString"){h.errMsg='"'+j+'": '+h.errMsg}else{h.errMsg.replace("%1",j)}}}this.AddErrorRecord(h,i)}function b(h,i,g,k){var j={};j.errCode=h;j.errMsg=i;this.AddErrorRecord(j,k)}function a(i){var h=false;var g=this.GetErrorArray(i);if(g&&(g.length>0)){h=true}return h}return new f()}())};