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
if(typeof(SiebelApp.S_App.BCBroker)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBroker");SiebelApp.S_App.BCBroker=(function(){var f=SiebelApp.Constants;var i=SiebelApp.Offlineconstants;var h=SiebelJS.Dependency("SiebelApp.Utils");var c=i.get("SAVE_BC_STATE_ALL");var b=i.get("SAVE_BC_STATE_NONE");function a(){var q=0;var r=null;var j=null;var m="";var l=-1;var n=null;var o=false;var s=[];var p=0;var k={};this.GetFieldMap=function(){return k};this.AddReference=function(){return ++q};this.SetGenerateNotifyInfo=function(t){o=t};this.GenerateNotifyInfo=function(t){return o};this.GetNumOfRefs=function(){return q};this.RemoveReference=function(){return --q};this.GetView=function(){return r};this.SetView=function(t){r=t};this.GetBC=function(){return j};this.SetBC=function(t){j=t};this.SetBCId=function(t){m=t};this.GetBCId=function(){return m};this.GetNotifyArray=function(){return s};this.ResetNotifyArray=function(){s=[]};this.AddToNotifyArray=function(t){s.push(t)};this.IsMarkedRemove=function(){return p};this.MarkToRemove=function(t){p=t};this.AddMarkedToRmCnt=function(){p++};this.GetNotComp=function(){return n};this.SetNotComp=function(t){n=t};this.GetNotIdComp=function(){return l};this.SetNotIdComp=function(t){l=t};this.ReSetNotIdComp=function(){l=-1}}a.prototype.EndLife=function(){this.GetBC().UnRegNotifyObj(this.GetNotIdComp());this.SetBC(null);this.ReSetNotIdComp();this.SetNotIdComp(-1);this.SetNotComp(null);this.EnableGenerateNotifyInfo(false)};a.prototype.Initialize=function(j,l){this.SetView(j);this.SetBC(l);l.AddRef();this.SetBCId(l.GetVarName());this.SetNotComp(new SiebelApp.S_App.BCBrokerNotify(this));this.SetNotIdComp(l.RegNotifyObj(this.GetNotComp()));var k=this.GetNotIdComp();l.SetWorkSetSizeX(k,1,false);l.WSHomeX(this.GetNotIdComp())};a.prototype.GetObjInfo=function(j,k){g.call(this,j);$.callback(this,function(){this.EnableGenerateNotifyInfo(true)})};a.prototype.GetDataObjInfo=function(){};a.prototype.GetNewFieldsObjInfo=function(){};a.prototype.GetRecordArraysObjInfo=function(){};a.prototype.GetDefaultFieldObjInfo=function(){};function g(k){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.GetOMObjInfo")}var m=this.GetBC().GetFieldMap();var l=this.GetBC();for(var j in m){if(m[j]){this.GetFieldMap()[j]=m[j].index}}if(l.HasAssocList()){k.SetProperty(i.get("SWE_PROP_HAS_ASSOC"),"1")}if(l.CanAssociate()){k.SetProperty(i.get("SWE_PROP_CAN_ASSOC"),"1")}if(l.IsInQueryState()){k.SetProperty(i.get("SWE_PROP_IS_IN_QUERY"),"1")}if(l.IsCommitPending()){k.SetProperty(f.get("SWE_PROP_IS_COMMIT"),"1")}if(l.IsDeleteRecordPending()){k.SetProperty(i.get("SWE_PROP_IS_DELETE"),"1")}if(l.IsInsertPending()){k.SetProperty(i.get("SWE_PROP_IS_NEW_REC_PEND"),"1")}l.CanDelete();$.callback(this,function(n){var o=n.retVal;if(!o){k.SetProperty(i.get("SWE_PROP_CAN_DELETE"),"1")}if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.GetOMObjInfo")}})}a.prototype.StringToTokenArray=function(){};a.prototype.GetBCStateShortName=function(){};a.prototype.CanInvokeMethod=function(){};a.prototype.SetupFields=function(){};a.prototype.SetupClientActiveFields=function(){};a.prototype.InvokeMethod=function(n,o){var r="";if(o){r=o.GetChildByType("FieldValues")}if(r){var k=r.GetProperty("ValueArray");var l=r.GetProperty("FieldArray");if(!l||!k){$.setReturnValue({err:false,retVal:null});return}var p=[];var s=[];CCFMiscUtil_StringToArray(k,p);CCFMiscUtil_StringToArray(l,s);if(s.length!==p.length){$.setReturnValue({err:false,retVal:null});return}len=s.length;var m="";var q=this.GetBC();var j=function(t){return[s[t],p[t]]};if(n==="SetFieldSearchSpec"){if(len){m={iterations:len,execute:q.SetSearchSpec,executeScope:q,preExecute:j};$.eachAsyncOp(this,m);$.callback(this,function(t){$.setReturnValue({err:false,retVal:null})})}}else{if(n==="SetFieldValue"){if(len){m={iterations:len,execute:q.SetFieldValueX,executeScope:q,preExecute:j};$.eachAsyncOp(this,m);$.callback(this,function(t){$.setReturnValue({err:false,retVal:null})})}}}}};a.prototype.GetNotifyPropSet=function(){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.GetNotifyPropSet")}var k=false;var j=CCFMiscUtil_CreatePropSet();var l=this.GetNotifyArray();if((l.length-this.IsMarkedRemove())===0){$.setReturnValue({err:false,retVal:j});return}this.GetBC().SaveCanMethodStates(c);$.callback(this,function(){this.GetBC().SaveBusCompStates(c);var m=0;var v=l.length;var w=[],p=0;for(var t=0;t<v;t++){var o=l[t];var u;if(o.IsMarkedToRemove()){continue}else{w[p]=o;p++}}if(p>0){var s=0;k=true;var n=function(z){var y=z.GetNotifyPropSet();var x=z.GetBasePS().GetProperty("type");if(y){if((!h.IsEmpty(x))&&(x.indexOf("SWEI")!==-1)){j.InsertChildAt(y,m);m++}else{j.AddChild(y)}delete y}};var r=function(x){var y=w[x].GetRecord();if(y){if(w[x].GetNotifyType()===17){this.BCFieldValue(w[x].GetFieldName(),y,w[x].GetValPS())}else{this.BCFieldValues(y,w[x].GetValPS())}$.callback(this,function(z){if(!z.err){if(z.retVal){w[x].SetValPS(z.retVal)}n.call(this,w[x])}x++;if(x<p){r.call(this,x)}})}else{n.call(this,w[x]);x++;if(x<p){r.call(this,x)}}};r.call(this,s)}var q=function(){var x=CCFMiscUtil_CreatePropSet();this.GetNotComp().SetDefaultProperty(x,true);x.SetPropertyStr("OP","bn");j.InsertChildAt(x,0);var y=CCFMiscUtil_CreatePropSet();this.GetNotComp().SetDefaultProperty(y,true);y.SetPropertyStr("OP","en");j.AddChild(y);$.setReturnValue({err:false,retVal:j});if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.GetNotifyPropSet")}};if(k){$.callback(this,q)}else{q.call(this)}})};a.prototype.ResetNotifyPropSet=function(){e.call(this)};function e(){var k;var m=this.GetNotifyArray();var j=m.length;for(var l=0;l<j;l++){k=m[l];if(k){k.EndLife();delete k}}this.ResetNotifyArray();this.MarkToRemove(0)}a.prototype.EnableGenerateNotifyInfo=function(j){this.SetGenerateNotifyInfo(j);e.call(this)};a.prototype.AddNotifyInfo=function(n,k,s,o,r,j,m){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.AddNotifyInfo")}var l,p=false;if(!this.GenerateNotifyInfo()){delete s;delete o;delete r;return}if((!(n&&o))||(this.GetNotifyArray().length>1000)){}var q=this.GetBC();if(m&&m!==0){q.SaveBusCompStates(m);q.SaveCanMethodStates(m)}$.callback(this,function(){if(j===4){var v;var E="";var t;v=s.GetProperty("nr");t=v;var u=this.GetNotifyArray();var B=u.length;var D;if(t===-1){for(var A=0;A<B;A++){l=u[A];if(l.IsMarkedToRemove()){continue}D=false;if(l.GetRecord()){D=true}else{switch(l.GetNotifyType){case 15:case 4:case 3:case 10:case 11:case 17:case 21:case 22:case 27:D=true;break;case 30:E=l.GetBasePS().GetProperty("state");if(E==="activeRow"){D=true}break;default:break}}if(D){l.SetMarkedRemoved(true);this.AddMarkedToRmCnt()}}}if(t===1||t>=1){var C=[],x=0;for(var A=0;A<B;A++){l=u[A];if(l.IsMarkedToRemove()){continue}else{C[x]=l;x++}}if(x>0){var z=0;p=true;var y=function(F){var G=C[F].GetRecord();if(G&&(n===G)){if(l.GetNotifyType===17){this.BCFieldValue(GetFieldName,G,l.GetValPS())
}else{this.BCFieldValues(G,l.GetValPS())}$.callback(this,function(H){if(!H.err){if(H.retVal){l.SetValPS(H.retVal)}}l.SetRecord(null);F++;if(F<x){y.call(this,F)}})}else{F++;if(F<x){y.call(this,F)}}};y.call(this,z)}}}var w=function(){var F=q.GetNotifyInfo(this.GetNotIdComp());l=new SiebelApp.S_App.BCBrokerNotifyInfo(n,k,s,o,r,F,j);this.AddToNotifyArray(l);if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.AddNotifyInfo")}};if(p){$.callback(this,function(){n=null;w.call(this)})}else{w.call(this)}})};a.prototype.BCFieldValue=function(l,n,o,r){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.BCFieldValue")}var q;var j;var s;var t=[];var p=[];var m;var k;q=!n?false:true;if(!o){o=CCFMiscUtil_CreatePropSet();o.SetType("FieldValues")}s=this.GetFieldMap()[l];if(h.IsEmpty(s)&&this.GetBC().GetFieldMap()[l]){s=this.GetBC().GetFieldMap()[l].index}if(h.IsEmpty(l)||h.IsEmpty(s)){$.setReturnValue({err:false,retVal:false});return}this.GetBC().FieldValue(l,n);$.callback(this,function(u){if(!u.err){j=u.retVal;if(!q&&j===null){}var v=h.IsEmpty(j)?"":j.toString();t.push(s.toString());p.push(v);m=d.call(this,t);k=d.call(this,p);o.SetProperty("FieldArray",m);o.SetProperty("ValueArray",k);$.setReturnValue({err:u.err,retVal:o})}if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.BCFieldValue")}})};a.prototype.BCFieldValues=function(s,t){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.BCFieldValues")}var v=[];var u;var m;var n;var o;var x,k=[];x=this.GetBC().GetFieldList();if(!t){t=CCFMiscUtil_CreatePropSet();t.SetType("FieldValues")}var l=x.length;if(l>0){u=!s?false:true;var w=false;var q=0;for(var r=0;r<l;r++){o=SiebelApp.S_App.LookupStringCache(x[r]);if(h.IsEmpty(o)){continue}else{k[q]=o;q++}}var m;var p={};p.iterations=q;p.preExecute=function(j){return[k[j],s]};p.execute=this.GetBC().FieldValue;p.executeScope=this.GetBC();p.postExecute=function(j){if(!j.err){m=j.retVal;if(!u&&m===null){}var y=h.IsEmpty(m)?"":m.toString();v.push(y)}};$.eachAsyncOp(this,p);$.callback(this,function(j){if(!j.err){n=d.call(this,v);t.SetProperty("ValueArray",n);$.setReturnValue({err:false,retVal:t});if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.BCFieldValues")}}})}else{$.setReturnValue({err:false,retVal:false})}};function d(m){var l="";for(var k=0;k<m.length;k++){var j=m[k].length;j=j.toString();l=l+j.concat("*",m[k])}return l}a.prototype.AddField=function(){};a.prototype.BCCreateFieldList=function(){};a.prototype.BCActiveFieldsChanged=function(){};a.prototype.BCEnumFields=function(){};a.prototype.SetWorkSetSize=function(j){var k=this.GetNotIdComp();var m=this.GetBC();if(m){var l=m.GetWorkSetSize(k);if(l>=j){return}}m.SetWorkSetSizeX(k,j)};return a}())}if(typeof(SiebelApp.S_App.BCBrokerNotify)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBrokerNotify");SiebelApp.S_App.BCBrokerNotify=(function(){var d=SiebelApp.Constants;var b=SiebelJS.Dependency("SiebelApp.Utils");var a=SiebelApp.Offlineconstants;var c=a.get("SAVE_BC_STATE_NONE");function e(f){var g=f;var h=[];var i=[];this.RegBusCompArray=function(j){h.push(j)};this.RegNtfyIdArray=function(j){i.push(j)};this.GetRegBcArray=function(){return h};this.GetNtfyIdArray=function(){return i};this.GetBroker=function(){return g}}e.prototype.Add=function(g,f){this.RegBusCompArray(g);this.RegNtfyIdArray(f)};e.prototype.Remove=function(l,k){var j=this.GetRegBcArray();var g=j.length;var f=this.GetNtfyIdArray();for(var h=0;h<g;h++){if((j[h]===l)&&(f[h]===k)){j.splice(h,1);f.splice(h,1);return true}}return false};e.prototype.SetDefaultProperty=function(i,h){var g=this.GetBroker();i.SetPropertyStr("bc",g.GetBCId());var f=g.GetView();if(!b.IsEmpty(f)){i.SetPropertyStr("Zone",f)}if(!h){var j=g.GetBC().GetActiveRow();i.SetPropertyStr("ar",j)}};e.prototype.NotifyBeginQuery=function(){var j=CCFMiscUtil_CreatePropSet();var k;var g=this.GetBroker();this.SetDefaultProperty(j,null);j.SetPropertyStr("OP","bq");k=g.GetBC().GetFieldList();var l=k.length;var f;for(var h=0;h<l;h++){f=SiebelApp.S_App.LookupStringCache(k[h]);if(b.IsEmpty(f)){continue}this.NotifyNewQuerySpec(f)}};e.prototype.NotifyChangeSelection=function(){var g=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(g,null);g.SetPropertyStr("OP","cs");f.AddNotifyInfo(null,null,g,null,null,2)};e.prototype.NotifyDeleteWorkSet=function(j,f,i){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_DELETE_WORKSET"));h.SetPropertyStr("index",j);h.SetPropertyStr("nr",f);g.AddNotifyInfo(i,null,h,null,null,4)};e.prototype.NotifyDeleteRecord=function(i,h){var g=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(g,null);g.SetProperty(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_DELETE_RECORD"));g.SetProperty("bSetup",i?true:false);g.SetProperty("bUp",h?true:false);f.AddNotifyInfo(null,null,g,null,null,3,(i)?0:1)};e.prototype.NotifyNewSelIds=function(g){var j=CCFMiscUtil_CreatePropSet();var k="r";var f=this.GetBroker();this.SetDefaultProperty(j,null);j.SetPropertyStr("OP","nsi");for(var h=0;h<g.length;h++){var k="r";k=k.concat(h);j.SetPropertyStr(k,g[h])}f.AddNotifyInfo(null,null,j,null,null,25)};e.prototype.NotifyEndQuery=function(){};e.prototype.NotifyExecute=function(){};e.prototype.NotifyGeneric=function(j,g){var i=CCFMiscUtil_CreatePropSet();var h;var f=this.GetBroker();h=(j.indexOf("SWEI")===-1||j.indexOf("SWEA")===-1);this.SetDefaultProperty(i,h);i.SetPropertyStr("OP","g");i.SetPropertyStr("type",j);g=SiebelApp.OfflineUtils.NotifyValueArray(g);i.SetPropertyStr("ArgsArray",g);f.AddNotifyInfo(null,null,i,null,null,8)};e.prototype.NotifyInsertWorkSet=function(g,i){var h=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(h);h.SetProperty(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_INSERT_WORKSET"));h.SetProperty("index",g);f.AddNotifyInfo(i,null,h,null,null,11)};e.prototype.NotifyInsertWSFieldVals=function(){};e.prototype.NotifyLongOpProgress=function(){};e.prototype.NotifyNewActiveFieldList=function(){};e.prototype.NotifyNewActiveRow=function(){var g=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(g,null);g.SetPropertyStr("OP","nar");f.AddNotifyInfo(null,null,g,null,null,15)};e.prototype.NotifyNewData=function(g){var j=null;var f=this.GetBroker();var i=b.IsEmpty(g);var k=i?null:g;var h=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(h,null);if(k){j="SAVE_BC_STATE_CANDELETE | SAVE_BC_STATE_ROWNUMINFO";h.SetPropertyStr("f",k);h.SetPropertyStr("OP","nfd")}else{h.SetPropertyStr("OP","nd")}f.AddNotifyInfo(null,k,h,null,null,16)};e.prototype.NotifyNewDataWS=function(j){var h=this.GetBroker();if(b.IsEmpty(j)){return}var g=h.GetBC();var k=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(k,null);k.SetPropertyStr("OP","ndw");k.SetPropertyStr("f",j);
var i=g.GetActiveRow();var f=g.FindWorkSet(i);h.AddNotifyInfo(f,j,k,null,null,17)};e.prototype.NotifyNewFieldList=function(){};e.prototype.NotifyNewQuerySpec=function(i){var j=CCFMiscUtil_CreatePropSet();var h=this.GetBroker();var g=h.GetBC();var f=g.GetFieldSearchSpec(i);this.SetDefaultProperty(j,null);j.SetPropertyStr("op","nfq");j.SetPropertyStr("f",i);j.SetPropertyStr("v",f);h.AddNotifyInfo(null,i,j,null,null,23)};e.prototype.NotifyNewPrimary=function(){};e.prototype.NotifyNewRecord=function(f){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h);h.SetPropertyStr(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_NEW_RECORD"));h.SetPropertyStr("bInsertBefore",f?"true":"false");g.AddNotifyInfo(null,null,h,null,null,d.get("SWE_PROP_BC_NOTI_NEW_RECORD"),1)};e.prototype.NotifyNewRecordData=function(){var g=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(g);g.SetPropertyStr(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA"));f.AddNotifyInfo(null,null,g,null,null,d.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA"))};e.prototype.NotifyNewRecordDataWS=function(){var i;var h=this.GetBroker();var g=h.GetBC();var j=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(j);j.SetPropertyStr(d.get("SWE_PROP_BC_OPERATION"),d.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA_WS"));i=g.GetActiveRow();var f=g.FindWorkSet(i);h.AddNotifyInfo(f,null,j,null,null,d.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA_WS"))};e.prototype.NotifyInsertWSFieldVals=function(){};e.prototype.NotifyNewSelection=function(){var h="";var f=this.GetBroker();var g=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(g,null);g.SetPropertyStr("OP","ns");g.SetPropertyStr("bSelected",h?true:false);f.AddNotifyInfo(null,null,g,null,null,24)};e.prototype.NotifyNewSelIds=function(){};e.prototype.NotifyPageRefresh=function(){};e.prototype.NotifyScrollData=function(i,g){var h=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","sa");h.SetPropertyStr("bUp",i?true:false);h.SetPropertyStr("scrollAmount",g);f.AddNotifyInfo(null,null,h,null,null,28)};e.prototype.NotifySelModeChange=function(h){var g=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(g,null);g.SetPropertyStr("OP","smc");g.SetPropertyStr("bInMultiSelMode",h?true:false);f.AddNotifyInfo(null,null,g,null,null,"SWE_BCNOTIFY_SELMODECHANGE")};e.prototype.NotifyStateChanged=function(g,i){var h=CCFMiscUtil_CreatePropSet();var f=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","sc");h.SetPropertyStr("state",g);h.SetPropertyStr("value",i);f.AddNotifyInfo(null,g,h,null,null,"SWE_BCNOTIFY_STATECHANGED")};e.prototype.NotifyTotalsChanged=function(){};return e}())}if(typeof(SiebelApp.S_App.BCBrokerNotifyInfo)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBrokerNotifyInfo");SiebelApp.S_App.BCBrokerNotifyInfo=(function(){function a(j,f,n,k,m,q,e){var l=0;var r=0;var d=0;var i=j;var h=f;var g=n;var c=k;var b=m;var p=e;var o=false;if(q){l=q.GetBegRow();r=q.GetCurrRow();d=q.GetSize()}if(!n){n=CCFMiscUtil_CreatePropSet()}n.SetPropertyStr("br",l);n.SetPropertyStr("cr",r);n.SetPropertyStr("l",d);this.SetRecord=function(s){i=s};this.IsMarkedToRemove=function(){return o};this.SetMarkedRemoved=function(s){o=s};this.GetValPS=function(s){return c};this.SetValPS=function(s){c=s};this.GetFieldPS=function(s){return b};this.GetRecord=function(){return i};this.GetNotifyType=function(){return p};this.GetFieldName=function(){return h};this.GetBasePS=function(){return g}}a.prototype.EndLife=function(){var c=this.GetBasePS();var d=this.GetValPS();var b=this.GetFieldPS();if(c){delete c}if(d){delete d}if(b){delete b}};a.prototype.GetNotifyPropSet=function(e){var c=this.GetBasePS();if(this.IsMarkedToRemove()){return}var d=this.GetValPS();if(d){c.AddChild(d)}var b=this.GetFieldPS();if(b){c.AddChild(b)}return(c?c:null)};return a}())}if(typeof(SiebelApp.S_App.NotifyInfo)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.NotifyInfo");SiebelApp.S_App.NotifyInfo=(function(){function a(){var h=0;var c={};var d={};var g=0;var b=null;var f=1;var e=[];this.SetBusCompNotify=function(i){b=i};this.GetBusCompNotify=function(i){return b};this.SetBegRow=function(m,k){h=m;if(k){c[k]=m}else{var l=e.length;for(var j=0;j<l;j++){c[e[j]]=m}}};this.GetAppletArray=function(){return e};this.SetAppletArray=function(i){e.push(i);c[i]=h;d[i]=g};this.GetBegRow=function(i){if(i){return(c[i])}return h};this.SetCurrRow=function(m,k){g=m;if(k){d[k]=m}else{var l=e.length;for(var j=0;j<l;j++){d[e[j]]=m}}};this.GetCurrRow=function(i){if(i){return(d[i])}return g};this.SetSize=function(i){f=i};this.GetSize=function(){return f}}return a}())};