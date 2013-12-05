if(typeof(SiebelApp.S_App.CommToolbarUtil)==="undefined"){Namespace("SiebelApp.S_App.CommToolbarUtil");SiebelApp.S_App.CommToolbarUtil=(function(){function w(){return this}var c="";var o=new w();var m=CCFMiscUtil_CreatePropSet;var u=false;var g=3;var i=[];var f=false;function p(A){var z=this;z.height="600";z.width="800";z.polling="2";$.each(p.paramAttr,function(C,F){z[F]=A.attr(F);if(z[F]===undefined){return}z[F]=x(z[F]);if(F==="url"){var G=z[F].indexOf("?");if(G>0){var B=z[F].substring(G+1);B=B.replace(new RegExp("\\+","gm")," ");var E=B.split("&");var D=m();$.each(E,function(I,H){var J=[];J=H.split("=");if((J.length===2)&&(J[0].indexOf("swe")!==0)){D.SetProperty(J[0],J[1])}});z.urlParameters=D}else{return}}})}p.paramAttr=["name","value","control","message","url","target","applet","startTime","serverTime","encodedCmd","viewName","position","feature","checkPopup","popupErrMsg","polling","width","height","position","feature"];p.prototype.Invoke=function(z){if((this.name==="ChangeToolTip")&&z){this.value=this.value.replace(new RegExp("\\\\'","gm"),'"')}SiebelApp.S_App.CommToolbar.ExecuteCommand(this)};p.prototype.toString=function(){var A="command ["+this.name+"]: ";var z=this;$.each(p.paramAttr,function(B,C){if(z[C]!==undefined){A+="\n\t"+C+":"+z[C]}});return A};var j=true;var b="";var q=0;var t={bStarted:false,bRun:true,bPush:true,iInterval:3,sCmd:"SWECmd=WaitForCmd&SWEService=Communications Client"};var v=function(D,E,C){var A=m();for(var z in D){if(typeof(z)!=="function"){A.SetProperty(z,D[z])}}var B={async:true,cb:this.HandleResponse,opdecode:false,scope:this};if(typeof(E)==="function"){B.errcb=E}B.selfbusy=true;SiebelApp.S_App.CallServer(A,undefined,C,B)};w.prototype.getCookiesSession=function(){var z="";z="&"+SiebelApp.S_App.CommToolbar.GetSessionName()+"="+SiebelApp.S_App.CommToolbar.GetSessionId();z+=r();this.LogMsg(3,"getCookiesSession: "+z);return z};var s=function(z){return z.replace(new RegExp("&","gm")," __X__ ")};var x=function(z){return z.replace(new RegExp(" __X__ ","gm"),"&")};var r=function(){var z="&SRN="+b;return z};var l=function(){return document.cookie};w.prototype.isValidCookieSession=function(){if(j===true){if(l()!==""){return true}}else{if(this.getCookiesSession()!==""){return true}}return false};var e=function(z){this.LogMsg(3,"get push response of request "+q+": "+z);if(z==="Error"){SiebelApp.S_App.CommToolbar.PushError()}if(z!=="OK"){u=true;this.HandleResponse(z);u=false}t.bStarted=false;if(t.bRun){if(t.bPush){this.SendPush()}else{this.GetMsg()}}};var d=function(z){this.LogMsg(1,"sendCommand failed for push request<"+q+">");t.bStarted=false;if(t.bRun){if(t.bPush){h(this.SendPush,1000,this)}else{h(this.GetMsg,1000,this)}}};w.prototype.HandleResponse=function(E){if(!u){this.LogMsg(3,"Get command response: "+E)}var F=E;F=s(F);var D=/<HTML(.|\n)*/g;F=F.replace(D,"");F="<xml>"+F+"</xml>";var A;var C=false;try{A=$.parseXML(F)}catch(z){D=/\"([^>=]*)\"([^>=]*)\"(.*)\"/;F=F.replace(D,"\"$1'$2'$3\"");A=$.parseXML(F);C=true}if(A===undefined){return}var B=$(A).find("command");$.each(B,function(){var G=new p($(this));if(G.name.toUpperCase()==="SHOWDOCUMENT"){i.push([G,C])}else{G.Invoke(C)}});if(i.length>0&&!f){this.ExecuteNextCommand()}};w.prototype.ExecuteNextCommand=function(){var z=i.shift();if(f){SiebelApp.EventManager.removeListner("postload",this.ExecuteNextCommand,this);SiebelApp.EventManager.removeListner("posteoiload",this.ExecuteNextCommand,this);f=false}if(z){z[0].Invoke(z[1]);if(!f){this.ExecuteNextCommand()}}};w.prototype.GenInputPS=function(B,A){$.each(B.split("&"),function z(C,F){var G=F.split("=");if(G.length===2){var E=G[0];var D=G[1];A[E]=D}});return A};w.prototype.SendCommandStr=function(A,z){var B="";B=c+A;if(arguments.length>=2){$.get(x(B),this.HandleResponse).error(function(F,C,D){var E={errCode:F.status,errText:D};z(E)})}else{$.get(x(B),this.HandleResponse)}};var k=function(z){for(var A in t){if(typeof(A)!=="function"){if(typeof(z[A])!=="undefined"){if(A==="sCmd"){if(z[A].indexOf("start.swe?")===0){z[A]=z[A].substring(10)}z[A]=z[A].replace(new RegExp("\\+","gm")," ")}t[A]=z[A]}}}};var h=function(C,B,z){var A=z;var D=function(){C.call(A)};setTimeout(D,B)};w.prototype.SendCommand=function(A){if(typeof(A)!=="object"){this.LogMsg(1,"Invoking SendCommand, the input arg is not valid!");return}var z=A.url;var B=A.inputKV;var D=A.error;var C={};if(typeof(B)==="object"){C=B}if(typeof(z)==="string"){z=decodeURI(z);z=z.replace(new RegExp("\\+","gm")," ");if(z.indexOf("start.swe?")===0){z=z.substring(10)}C=this.GenInputPS(z,C)}v.call(this,C,D,A.needUIFProcessRP)};w.prototype.CallSWEAsString=function(B){var A=App();var z="";A.CallSWEAsString(B,false,z)};w.prototype.DoSweCmd=function(z){var A=SiebelApp.CommandManager.GetInstance();A.InvokeCommand(z)};w.prototype.ShowDocument=function(A,z,C,B){SiebelApp.EventManager.addListner("postload",this.ExecuteNextCommand,this);SiebelApp.EventManager.addListner("posteoiload",this.ExecuteNextCommand,this);f=true;if(B!==undefined&&B.length>0){this.LogMsg(3,"using SiebelApp.S_App.GotoView");this.PSRLog("[PSR] GotoView ["+B+"]");SiebelApp.S_App.GotoView(B,"",A,z,"",false)}else{if((z==="_sweview")&&(C!==undefined)&&(C.length>0)){this.LogMsg(3,"using CallSWEAsString");this.CallSWEAsString(C)}else{this.LogMsg(3,"using SiebelApp.S_App.GotoView");this.PSRLog("[PSR] GotoView");SiebelApp.S_App.GotoView("","",A,z,"",false)}}};w.prototype.GetRefId=function(){return q};w.prototype.SendPush=function(){if(t.bStarted===true){return}t.bStarted=true;q=q+1;var C=t.sCmd+"&refID="+q;var D={};D=this.GenInputPS(C,D);var A=m();for(var z in D){if(typeof(z)!=="function"){A.SetProperty(z,D[z])}}var E=false;var B={async:true,cb:e,errcb:d,opdecode:false,scope:this};if(t.bPush===true){this.LogMsg(3,"send a new push request: "+q)}else{this.LogMsg(3,"Send: "+C)}B.selfbusy=true;SiebelApp.S_App.CallServer(A,undefined,E,B)};w.prototype.GetMsg=function(){h(this.SendPush,t.iInterval*1000,this)};w.prototype.StartPush=function(z){if(typeof(z)==="object"){k(z)}if(typeof(z)==="object"){if(t.bPush===true){this.LogMsg(0,"Push Channel STARTED");h(this.SendPush,1500,this)}else{this.LogMsg(0,"Push Channel for RunGetMsgThread IS Started");h(this.GetMsg,1500,this)}return}};w.prototype.StopPush=function(){t.bRun=false;this.LogMsg(0,"PushCmd stopped!")};w.prototype.DoPopup=function(B,A,z){var C=m();C.SetProperty("URL",B);this.LogMsg(3,"doPopup: "+B);SiebelApp.S_App.GetPopupPM().ExecuteMethod("ProcessNewPopup",C)};w.prototype.UpdateCmdMgrMenu=function(B,A){var C=m();var z=SiebelApp.CommandManager.GetInstance();C.SetProperty(B,A);z.UpdateBatchMethods(C)};w.prototype.LogMsg=function(A,z){this.Log(A,"commToolbarUtil.js: "+z)};w.prototype.GetLogTime=function(){if(!Date.prototype.toISOString){(function(){function z(B){var A=String(B);if(A.length===1){A="0"+A}return A}Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+z(this.getUTCMonth()+1)+"-"+z(this.getUTCDate())+"T"+z(this.getUTCHours())+":"+z(this.getUTCMinutes())+":"+z(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2,5)+"Z"
}}())}return new Date().toISOString()+" UTC"};w.prototype.Log=function(B,A){var z=this.GetLogTime();if(B>=g){return}if(B===0){SiebelJS.Log("["+z+"]:INFO: "+A)}if(B===1){SiebelJS.Log("["+z+"]:ERROR: "+A)}if(B===2){SiebelJS.Log("["+z+"]:WARNING: "+A)}if(B>=3){SiebelJS.Log("["+z+"]:DEBUG: "+A)}};var y="";var a=false;var n=10240;w.prototype.SetEnablePSRLog=function(){a=true;this.LogMsg(0,"Enable PSR Log")};w.prototype.IsPSRLogEnabled=function(){return a};w.prototype.SetClientPSRLogLength=function(z){n=z;this.LogMsg(0,"Set Client PSR Log Length = "+z)};w.prototype.PSRLog=function(A){if(!a){return}var z=this.GetLogTime();if(y.length!==0){y+="\n"}y+="["+z+"]: "+A;if(y.length>n){y=""}};w.prototype.GetPSRLog=function(){var z=y;y="";return z};w.prototype.InitApplet=function(){c=SiebelApp.S_App.GetPageURL().replace("/start.swe","/");var A=SiebelApp.S_App.CommToolbar.GetParameter("NoOfInitCommands");b=SiebelApp.S_App.CommToolbar.GetSessionRN();j=SiebelApp.S_App.CommToolbar.IsUseCookies();if(A!==undefined){for(var z=0;z<A;z++){var C=1+z;var B=""+SiebelApp.S_App.CommToolbar.GetParameter("InitCommand"+C);if(B===undefined){B=SiebelApp.S_App.CommToolbar.GetParameter("InitCommand"+C)}if(B!==undefined){this.LogMsg(3,"Init Command is:"+B);this.SendCommand({url:B})}}}else{this.LogMsg(2,"NoOfInitCommands parameter is missing.")}};w.prototype.SetLogLevel=function(z){g=z};return o}())};