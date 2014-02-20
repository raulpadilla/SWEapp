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
if(typeof(SiebelApp.S_App.CommToolbarUtil)==="undefined"){Namespace("SiebelApp.S_App.CommToolbarUtil");SiebelApp.S_App.CommToolbarUtil=(function(){function x(){return this}var c="";var p=new x();var n=CCFMiscUtil_CreatePropSet;var v=false;var g=3;var i=[];var f=false;var m=0;var z='<command name="ClientIP" value="';function q(C){var B=this;B.height="600";B.width="800";B.polling="2";$.each(q.paramAttr,function(E,H){B[H]=C.attr(H);if(B[H]===undefined){return}B[H]=y(B[H]);if(H==="url"){var I=B[H].indexOf("?");if(I>=0){var D=B[H].substring(I+1);D=D.replace(new RegExp("\\+","gm")," ");var G=D.split("&");var F=n();$.each(G,function(K,J){var L=[];L=J.split("=");if((L.length===2)&&(L[0].indexOf("swe")!==0)){F.SetProperty(L[0],L[1])}});B.urlParameters=F}else{return}}})}q.paramAttr=["name","value","control","message","url","target","applet","startTime","serverTime","encodedCmd","viewName","position","feature","checkPopup","popupErrMsg","polling","width","height","position","feature"];q.prototype.Invoke=function(B){if((this.name==="ChangeToolTip")&&B){this.value=this.value.replace(new RegExp("\\\\'","gm"),'"')}SiebelApp.S_App.CommToolbar.ExecuteCommand(this)};q.prototype.toString=function(){var C="command ["+this.name+"]: ";var B=this;$.each(q.paramAttr,function(D,E){if(B[E]!==undefined){C+="\n\t"+E+":"+B[E]}});return C};var j=true;var b="";var r=0;var u={bStarted:false,bRun:true,bPush:true,iInterval:3,sCmd:"SWECmd=WaitForCmd&SWEService=Communications Client",StopPushString:"",RetryBeforeStopPush:0};var w=function(F,G,E){var C=n();for(var B in F){if(F.hasOwnProperty(B)){C.SetProperty(B,F[B])}}var D={async:true,cb:this.HandleResponse,opdecode:false,scope:this};if(typeof(G)==="function"){D.errcb=G}D.selfbusy=true;SiebelApp.S_App.CallServer(C,undefined,E,D)};x.prototype.getCookiesSession=function(){var B="";B="&"+SiebelApp.S_App.CommToolbar.GetSessionName()+"="+SiebelApp.S_App.CommToolbar.GetSessionId();B+=s();this.LogMsg(3,"getCookiesSession: "+B);return B};var t=function(B){return B.replace(new RegExp("&","gm")," __X__ ")};var y=function(B){return B.replace(new RegExp(" __X__ ","gm"),"&")};var s=function(){var B="&SRN="+b;return B};var l=function(){return document.cookie};x.prototype.isValidCookieSession=function(){if(j===true){if(l()!==""){return true}}else{if(this.getCookiesSession()!==""){return true}}return false};var e=function(C){var B=false;this.LogMsg(3,"get push response of request "+r+": "+C);if(C==="Error"){SiebelApp.S_App.CommToolbar.PushError();this.LogMsg(1,"handlePushResponse: Error: "+C)}else{if((u.StopPushString.length>0&&C.indexOf(u.StopPushString)>=0)||C.indexOf(z)<0){this.LogMsg(1,"invalid push response of request "+r+", retry times: "+m);if(m>=u.RetryBeforeStopPush){this.LogMsg(1,"Stop push and disable the toolbar!");SiebelApp.S_App.CommToolbar.DisableAllButtons();u.bRun=false}else{this.LogMsg(1,"handlePushResponse: retry");B=true;++m}}else{if(C!=="OK"){m=0;v=true;this.HandleResponse(C);v=false}else{this.LogMsg(1,"handlePushResponse: else: "+C)}}}u.bStarted=false;if(u.bRun){if(u.bPush){if(B){this.LogMsg(1,"handlePushResponse: push: retry");h(this.SendPush,1000,this)}else{this.SendPush()}}else{if(B){this.LogMsg(1,"handlePushResponse: get: retry");h(this.GetMsg,1000,this)}else{this.GetMsg()}}}};var d=function(B){this.LogMsg(1,"sendCommand failed for push request<"+r+">");u.bStarted=false;if(u.bRun){if(u.bPush){if(m<u.RetryBeforeStopPush){m++;h(this.SendPush,1000,this)}else{this.LogMsg(1,"Stop push after few tries at handlePushException!")}}else{h(this.GetMsg,1000,this)}}};x.prototype.HandleResponse=function(E){if(!v){this.LogMsg(3,"Get command response: "+E)}var G=E;G=t(G);var H=/<HTML(.|\n)*/g;G=G.replace(H,"");G="<xml>"+G+"</xml>";var I;var D=false;try{I=$.parseXML(G)}catch(F){H=/\"([^>=]*)\"([^>=]*)\"(.*)\"/;G=G.replace(H,"\"$1'$2'$3\"");I=$.parseXML(G);D=true}if(I===undefined){return}var J=$(I).find("command");$.each(J,function(){var K=new q($(this));if(K.name.toUpperCase()==="SHOWDOCUMENT"){i.push([K,D])}else{K.Invoke(D)}});var B=SiebelApp.S_App.getExtObject("ChatPane");if(B){var C=$(I).find("chat");if(C.children().length>0){B.Notify(C)}}if(i.length>0&&!f){this.ExecuteNextCommand()}};x.prototype.ExecuteNextCommand=function(){var B=i.shift();if(f){SiebelApp.EventManager.removeListner("postload",this.ExecuteNextCommand,this);SiebelApp.EventManager.removeListner("posteoiload",this.ExecuteNextCommand,this);f=false}if(B){B[0].Invoke(B[1]);if(!f){this.ExecuteNextCommand()}}};x.prototype.GenInputPS=function(D,C){$.each(D.split("&"),function B(E,H){var I=H.split("=");if(I.length===2){var G=I[0];var F=I[1];C[G]=F}});return C};x.prototype.SendCommandStr=function(C,B){var D="";D=c+C;if(arguments.length>=2){$.get(y(D),this.HandleResponse).error(function(H,E,F){var G={errCode:H.status,errText:F};B(G)})}else{$.get(y(D),this.HandleResponse)}};var k=function(B){for(var C in u){if(u.hasOwnProperty(C)){if(typeof(B[C])!=="undefined"){if(C==="sCmd"){if(B[C].indexOf("start.swe?")===0){B[C]=B[C].substring(10)}B[C]=B[C].replace(new RegExp("\\+","gm")," ")}u[C]=B[C]}}}};var h=function(E,D,B){var C=B;var F=function(){E.call(C)};setTimeout(F,D)};x.prototype.SendCommand=function(C){if(typeof(C)!=="object"){this.LogMsg(1,"Invoking SendCommand, the input arg is not valid!");return}var B=C.url;var D=C.inputKV;var F=C.error;var E={};if(typeof(D)==="object"){E=D}if(typeof(B)==="string"){B=decodeURI(B);B=B.replace(new RegExp("\\+","gm")," ");if(B.indexOf("start.swe?")===0){B=B.substring(10)}E=this.GenInputPS(B,E)}w.call(this,E,F,C.needUIFProcessRP)};x.prototype.CallSWEAsString=function(D){var C=App();var B="";C.CallSWEAsString(D,false,B)};x.prototype.DoSweCmd=function(B){var C=SiebelApp.CommandManager.GetInstance();C.InvokeCommand(B)};x.prototype.ShowDocument=function(C,B,E,D){SiebelApp.EventManager.addListner("postload",this.ExecuteNextCommand,this);SiebelApp.EventManager.addListner("posteoiload",this.ExecuteNextCommand,this);f=true;if(D!==undefined&&D.length>0){this.LogMsg(3,"using SiebelApp.S_App.GotoView");this.PSRLog("[PSR] GotoView ["+D+"]");SiebelApp.S_App.GotoView(D,"",C,B,"",false)}else{if((B==="_sweview")&&(E!==undefined)&&(E.length>0)){this.LogMsg(3,"using CallSWEAsString");this.CallSWEAsString(E)}else{this.LogMsg(3,"using SiebelApp.S_App.GotoView");this.PSRLog("[PSR] GotoView");SiebelApp.S_App.GotoView("","",C,B,"",false)}}};x.prototype.GetRefId=function(){return r};x.prototype.SendPush=function(){if(u.bStarted===true){return}u.bStarted=true;r=r+1;var E=u.sCmd+"&refID="+r;var F={};F=this.GenInputPS(E,F);var C=n();for(var B in F){if(F.hasOwnProperty(B)){C.SetProperty(B,F[B])}}var G=false;var D={async:true,cb:e,errcb:d,opdecode:false,scope:this};if(u.bPush===true){this.LogMsg(3,"send a new push request: "+r)}else{this.LogMsg(3,"Send: "+E)}D.selfbusy=true;SiebelApp.S_App.CallServer(C,undefined,G,D)};x.prototype.GetMsg=function(){h(this.SendPush,u.iInterval*1000,this)};x.prototype.StartPush=function(B){if(typeof(B)==="object"){k(B)}if(typeof(B)==="object"){if(u.bPush===true){this.LogMsg(0,"Push Channel STARTED");
h(this.SendPush,1500,this)}else{this.LogMsg(0,"Push Channel for RunGetMsgThread IS Started");h(this.GetMsg,1500,this)}return}};x.prototype.StopPush=function(){u.bRun=false;this.LogMsg(0,"PushCmd stopped!")};x.prototype.DoPopup=function(D,C,B){var E=n();E.SetProperty("URL",D);this.LogMsg(3,"doPopup: "+D);SiebelApp.S_App.GetPopupPM().ExecuteMethod("ProcessNewPopup",E)};x.prototype.UpdateCmdMgrMenu=function(D,C){var E=n();var B=SiebelApp.CommandManager.GetInstance();E.SetProperty(D,C);B.UpdateBatchMethods(E)};x.prototype.LogMsg=function(C,B){this.Log(C,"commToolbarUtil.js: "+B)};x.prototype.GetLogTime=function(){if(!Date.prototype.toISOString){(function(){function B(D){var C=String(D);if(C.length===1){C="0"+C}return C}Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+B(this.getUTCMonth()+1)+"-"+B(this.getUTCDate())+"T"+B(this.getUTCHours())+":"+B(this.getUTCMinutes())+":"+B(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2,5)+"Z"}}())}return new Date().toISOString()+" UTC"};x.prototype.Log=function(D,C){var B=this.GetLogTime();if(D>=g){return}if(D===0){SiebelJS.Log("["+B+"]:INFO: "+C)}if(D===1){SiebelJS.Log("["+B+"]:ERROR: "+C)}if(D===2){SiebelJS.Log("["+B+"]:WARNING: "+C)}if(D>=3){SiebelJS.Log("["+B+"]:DEBUG: "+C)}};var A="";var a=false;var o=10240;x.prototype.SetEnablePSRLog=function(){a=true;this.LogMsg(0,"Enable PSR Log")};x.prototype.IsPSRLogEnabled=function(){return a};x.prototype.SetClientPSRLogLength=function(B){o=B;this.LogMsg(0,"Set Client PSR Log Length = "+B)};x.prototype.PSRLog=function(C){if(!a){return}var B=this.GetLogTime();if(A.length!==0){A+="\n"}A+="["+B+"]: "+C;if(A.length>o){A=""}};x.prototype.GetPSRLog=function(){var B=A;A="";return B};x.prototype.InitApplet=function(){c=SiebelApp.S_App.GetPageURL().replace("/start.swe","/");var C=SiebelApp.S_App.CommToolbar.GetParameter("NoOfInitCommands");b=SiebelApp.S_App.CommToolbar.GetSessionRN();j=SiebelApp.S_App.CommToolbar.IsUseCookies();if(C!==undefined){for(var B=0;B<C;B++){var E=1+B;var D=""+SiebelApp.S_App.CommToolbar.GetParameter("InitCommand"+E);if(D===undefined){D=SiebelApp.S_App.CommToolbar.GetParameter("InitCommand"+E)}if(D!==undefined){this.LogMsg(3,"Init Command is:"+D);this.SendCommand({url:D})}}}else{this.LogMsg(2,"NoOfInitCommands parameter is missing.")}};x.prototype.SetLogLevel=function(B){g=B};return p}())};