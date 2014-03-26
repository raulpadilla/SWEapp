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
if(typeof(SiebelApp.BrowserLocalStorage)==="undefined"){Namespace("SiebelApp.BrowserLocalStorage");SiebelApp.BrowserLocalStorage=(function(){var a=new b();function b(){var c;d=function d(){return c};d.prototype=this;c=new d();c.constructor=d;this.SetPostTxnCallback=function(e){e()};return c}b.prototype.InsertRecord=function(g,f,d){var c={};var h=JSON.parse(window.localStorage.getItem(g));if(!h){h=[]}for(var e=0;e<(f.length&&d.length);e++){c[f[e]]=d[e]}h.push(c);window.localStorage.setItem(g,JSON.stringify(h))};b.prototype.SelectRecord=function(q,f,o,p,c,d){var m=JSON.parse(window.localStorage.getItem(q));var e;if(m){if(c===true){e=[]}for(var h=0;h<m.length;h++){var n=1;for(var g=0;g<f.length;g++){var k=o[g];if(typeof(k)!=="string"){if(k.indexOf(m[h][f[g]])===-1){n=0;break}}else{if(d&&d.indexOf(f[g])!==-1){var l=m[h][f[g]];if(l.indexOf(o[g])===-1){n=0;break}}else{if(m[h][f[g]]!==o[g]){n=0;break}}}}if(n){if(c===true){e.push(m[h])}else{e=m[h];break}}}}p(e)};b.prototype.SelectRecordSet=function(f,d,c,e,g){SiebelApp.BrowserLocalStorage.SelectRecord(f,d,c,g,true,e)};b.prototype.SelectFilterRecord=function(n,d,c,l,m){var k=JSON.parse(window.localStorage.getItem(n));var h=[];var g;if(k){for(var f=0;f<k.length;f++){if(k[f][c]===l){g=f+1;break}else{g=0}}for(var e=g;e<k.length;e++){h.push(k[e])}}m(h)};b.prototype.UpdateRecord=function(m,k,f,e,l){var h=JSON.parse(window.localStorage.getItem(m));if(h){for(var d=0;d<h.length;d++){if(h[d][e]===l){for(var c=0;c<(k.length&&f.length);c++){h[d][k[c]]=f[c]}try{window.localStorage.setItem(m,JSON.stringify(h))}catch(g){alert("Oops.Unable to update record: "+g.description)}break}if(d===h.length-1){alert("Oops.Record  is not present in table "+m+".")}}}return true};b.prototype.DeleteRecord=function(e,g,f){var j=JSON.parse(window.localStorage.getItem(e));var h;if(j){for(var d=0;d<j.length;d++){if(g==="RecordNum"){h=d}else{h=j[d][g];h=unescape(h)}if(h===f){j.splice(d,1);try{window.localStorage.setItem(e,JSON.stringify(j))}catch(c){alert("Oops.Unable to delete record: "+c.description)}}}return true}};b.prototype.DeleteFilterRecord=function(f,c,k,g){var j=JSON.parse(window.localStorage.getItem(f));var h;var d;if(j){for(var e=0;e<j.length;e++){if(j[e][k]===g){d=e}}j.splice(0,d+1);window.localStorage.setItem(f,JSON.stringify(j))}};b.prototype.SelectAll=function(d,f){var e=JSON.parse(window.localStorage.getItem(d));if(e){for(var c=0;c<e.length;c++){e[c].RecordNum=c}}f(e)};b.prototype.CreateTable=function(d,c){};b.prototype.DeleteTable=function(c){window.localStorage.removeItem(c)};return a}())};