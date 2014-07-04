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
if(typeof(SiebelApp.OfflineDataMgr)==="undefined"){Namespace("SiebelApp.OfflineDataMgr");SiebelApp.OfflineDataMgr=(function(){var n=SiebelApp.OfflineCacheConfig;var f=new m();var i=SiebelJS.Dependency("SiebelApp.Constants");var d=SiebelApp.Offlineconstants;var k=SiebelJS.Dependency("SiebelApp.Utils");var l;var c;var j;var b;var e;var a;var g={};var h=[];function m(){var o;p=function p(){return o};p.prototype=this;o=new p();o.constructor=p;return o}m.prototype.DeleteJsonRecord=function(p){var o=this.JsonRecordSet(p);window.localStorage.removeItem(o.SweCommands.SWERowId)};m.prototype.JsonRecordSet=function(u){var p={};var D={};var x=[];var t=[];var L=[];var A=[];var s;var M={};var z;var J=[];var y;var w=u.indexOf("?");var I;var H;var G;w=w+1;var E=u.substring(w,u.length);z=u.substring(0,w);var K=E.split("&");for(I=0;I<K.length;I++){if(K[I].search("OF_")===-1){t.push(K[I]);if(K[I]==="SWEMethod=DeleteRecord"){y="DeleteRecord"}}else{L.push(K[I])}}for(I=0;I<L.length;I++){w=L[I].indexOf("_")+1;A.push(L[I].substring(w,L[I].length))}for(I=0;I<A.length;I++){x.push(A[I].split("="))}for(I=0;I<x.length;I++){var r=x[I];for(H=0;H<1;H++){G=H+1;var o=unescape(r[H]);p[o]=unescape(r[G])}}s=t.join("&");s=z+s;for(I=0;I<t.length;I++){J.push(t[I].split("="))}for(I=0;I<J.length;I++){var v=J[I];for(H=0;H<1;H++){G=H+1;var B=unescape(v[H]);D[B]=unescape(v[G])}}var F=unescape(D.SWEView);var q=unescape(D.SWEActiveApplet);p.Id=D.SWERowId;p.MethodName=D.SWEMethod;if(!p.MethodName&&y){p.MethodName=y}if(K[0]!==undefined){D.SWEField=K[0].split("=")[1]}var C=JSON.stringify(p);M.Request=s;M.SweCommands=D;M.RecordSet=C;for(I=0;I<x.length;I++){for(H=0;H<x[I].length;H++){x[I][H]=unescape(x[I][H])}}M.FieldValue=x;return M};m.prototype.GetTempId=function(){var p=((new Date()).getTime());p=(p).toString(36);if(p.length>6){p=p.substring(p.length-6)}var q=(Math.round((Math.random()*46655))).toString(36);var o=(Math.round((Math.random()*46655))).toString(36);var r=(p.concat(":",q,o)).toUpperCase();return r};m.prototype.GetTempRowId=function(){var p=((new Date()).getTime());p=(p).toString(36);var o=Math.floor(Math.random()*5);if(p.length>6){p=p.substring(p.length-6);p=p.substring(0,o).concat(p.substring(o+1,6))}var q=(Math.round((Math.random()*46655))).toString(36);var r=(q.concat("-",p)).toUpperCase();return r};m.prototype.SetRecordParam=function(o,q){if(o){g={};h=[];var p=k.DecodeFromQueryString(q);if(unescape(p.GetProperty("SWEMethod"))==="NewRecord"||unescape(p.GetProperty("SWEMethod"))==="CreateRecord"){j=SiebelApp.OfflineDataMgr.GetTempId();c=unescape(p.GetProperty("SWEView"));l=unescape(p.GetProperty("SWEApplet"));b=i.get("SWE_PST_APPLET_MODE_NEW");a=SiebelApp.OfflineUtils.RemoveNonAlphaChars(unescape(p.GetProperty("bci")));SiebelApp.OfflineAppMgr.SetWriteDone(false)}else{if(unescape(p.GetProperty("SWEMethod"))==="EditRecord"){j=unescape(p.GetProperty("SWERowId"));c=unescape(p.GetProperty("SWEView"));l=unescape(p.GetProperty("SWEApplet"));b=i.get("SWE_PST_APPLET_MODE_EDIT")}}}else{j="";c="";b="";a=""}};m.prototype.GetRecordParam=function(){var o={};o.RowId=j;o.ViewName=c;o.AppletName=l;o.State=b;o.BC=a;return o};m.prototype.IsNewRecord=function(){return e};m.prototype.SetNewRecordCommit=function(o){e=o;if(!o){SiebelApp.OfflineAppMgr.SetWriteDone(true)}};m.prototype.GetRecordObj=function(){return g};return f}())};