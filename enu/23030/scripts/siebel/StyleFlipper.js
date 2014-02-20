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
SiebelApp.ThemeManager=function(){var e={};var g=[];var a=0;var f=[];var b=[];function d(k){$.ajaxSetup({async:false});for(var l=0,j=k.length;l<j;l++){$.getScript(k[l],function(i,m){})}$.ajaxSetup({async:true})}d(b);function c(l){var k,j;if(l&&l.objList){for(k=0,j=l.objList.length;k<j;k++){l.objList[k].detach()}}for(k=0,j=f.length;k<j;k++){$("#"+f[k]).remove()}f=[]}function h(k){if(k){if(typeof(k.css)==="object"){for(var j in k.css){if(k.css.hasOwnProperty(j)){if(k.css[j]){if($("#"+j)[0]){$("#"+j).attr("href",k.css[j])}else{if(document.createStyleSheet){document.createStyleSheet(k.css[j]);$("link[href='"+k.css[j]+"'").attr("id",j)}else{$("head").append("<link id='"+j+"' type='text/css' href='"+k.css[j]+"' rel='stylesheet' />")}f.push(j)}}}}}if(typeof(k.reqJs)==="object"&&k.reqJs.length){d(k.reqJs)}k.reqJs=[];if(typeof(k.objList)==="object"){for(var i in k.objList){if(k.objList.hasOwnProperty(i)){if(typeof k.objList[i]!="function"){k.objList[i].attach()}}}}k.firstLoad=(k.firstLoad===undefined)?true:false}}return{getActiveTheme:function(){return g[a]},getTheme:function(i){return e[i]||{}},isChangeAllowed:function(){return true},addTheme:function(i,j){e[i]=j;g.push(i);if(g.length===1){this.flipTheme(i)}},addResource:function(i,k){if(SiebelApp.Utils.IndexOf(g,i)!==-1){var j=(this.getActiveTheme()===i);if(j){c(e[i])}$.extend(true,e[i],k);if(j){h(e[i])}}return false},flipTheme:function(i){var j=-1;if(i){for(var k=0;k<g.length;k++){if(g[k]==i){j=k;break}}if(j==-1){return}}else{j=(a+1)%g.length}c(e[g[a]]);h(e[g[j]]);a=j;setTimeout(function(){SiebelApp.EventManager.fireEvent("themechange",{theme:g[j]})},(e[g[j]].firstLoad)?500:10)}}}();SiebelApp.ThemeFlipper=function(b){var a=b;this.getDelegate=function(){return a}};SiebelApp.ThemeFlipper.prototype.FlipStyle=function(){this.getDelegate().flipTheme()};SiebelApp.ThemeFlipper.prototype.setStyleState=function(){this.getDelegate().setStyleState()};new SiebelApp.ThemeFlipper(SiebelApp.ThemeManager);SiebelApp.LayoutTransitionsMgr=(function(){var c="";var a=null;function d(){if(a===null){a=false;var f=$("#_svf0")[0],e=f.style;a="transform" in e||"WebkitTransform" in e||"MozTransform" in e||"OTransform" in e||"msTransform" in e;f=e=null}return a}function b(e){return e==="_svf0"}return{setTransition:function(e){e=e.toLowerCase();$(".siebui-prev-"+c+"-begin").removeClass("siebui-prev-"+c+"-begin");$(".siebui-prev-"+c+"-end").removeClass("siebui-prev-"+c+"-end");$(".siebui-next-"+c+"-begin").removeClass("siebui-next-"+c+"-begin");$(".siebui-next-"+c+"-end").removeClass("siebui-next-"+c+"-end");c=e},IsEnable:function(){if(c==="none"||!c.match(/\S/)){return false}else{return true}},Setup:function(f){if(this.IsEnable()&&b(f)){if(typeof(c)==="function"){c.call(window,"setup",f)}else{if(c&&d()){var e=$("#"+f);if($("#"+f+"_temp").length===0){e.after("<div id='"+f+"_temp'></div>")}$("#"+f+"_temp").empty().removeClass("siebui-prev-"+c+"-begin siebui-prev-"+c+"-end").append(e.children().clone().removeAttr("id").removeAttr("name").find("*").removeAttr("id").removeAttr("name").end()).show().addClass("siebui-prev-"+c+"-begin");e.removeClass("siebui-next-"+c+"-begin siebui-next-"+c+"-end").addClass("siebui-next-"+c+"-begin");e=null}}}},ShowTransition:function(e){if(this.IsEnable()){if(typeof(c)==="function"){c.call(window,"execute",e)}else{if(c&&d()){$("#"+e+"_temp").addClass("siebui-prev-"+c+"-end");setTimeout(function(){$("#"+e).addClass("siebui-next-"+c+"-end")},1);setTimeout(function(){$("#"+e+"_temp").empty()},500)}}}}}})();