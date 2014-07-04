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
SiebelApp.OneAppletView=(function(){var j=[];var n=0;var e=0;var d="ontouchstart" in document.documentElement;var f=false;var o=false;var b=function(){j=[];$("a.next-item-applet").each(function(){var q=$(this).next();if(q.attr("id")){j.push({sel:"#"+q.attr("id"),height:q.height()})}});e=0};var a=function(){if(!d){return}if(f){return}var s=this;for(var r=0,q=j.length;r<q;r++){$(j[r].sel).swipe({swipeLeft:function(u,t){return function(){k.call(u,t,"L")}}(s,r),swipeRight:function(t,u){return function(){k.call(t,u,"R")}}(s,r)})}f=true};var k=function(r,q){if(!o){return}var r=r||e;if(q==="L"){if(r+1<j.length){$(j[r].sel).css("display","none");$(j[r+1].sel).css("display","").css("height",n);SiebelApp.EventManager.fireEvent("gridresize",{id:j[r+1].sel});e=r+1}}else{if(q==="R"){if(r-1>=0){$(j[r].sel).css("display","none");$(j[r-1].sel).css("display","").css("height",n);SiebelApp.EventManager.fireEvent("gridresize",{id:j[r-1].sel});e=r-1}}}};var l=function(){if(j.length>0){$(j[0].sel).css("height",n);SiebelApp.EventManager.fireEvent("gridresize",{id:j[0].sel});for(var r=1,q=j.length;r<q;r++){$(j[r].sel).css("display","none")}}};var h=function(){for(var r=0,q=j.length;r<q;r++){$(j[r].sel).css("display","").css("height",j[r].height);SiebelApp.EventManager.fireEvent("gridresize",{id:j[r].sel});$(j[r].sel).css("height","")}};var m=function(){if(d||$("div.applet-left-mover")[0]){return}$("body").append("<div class='applet-left-mover'></div><div class='applet-right-mover'></div>");var s=$("#_svf0").offset().top+$("#_svf0").outerHeight()/2;var r=$("#_svf0").offset().left;$("div.applet-left-mover").css("top",s).css("left",r);$("div.applet-right-mover").css("top",s).css("left",r+$("#_svf0").outerWidth());var q=this;$("div.applet-left-mover").click(function(){k.call(q,undefined,"R")}).hover(function(){$(this).toggleClass("applet-mover-highlight")});$("div.applet-right-mover").click(function(){k.call(q,undefined,"L")}).hover(function(){$(this).toggleClass("applet-mover-highlight")})};var i=function(){if(d){return}$("div.applet-left-mover").remove();$("div.applet-right-mover").remove()};var p=function(){o=true;n=parseInt(($("#_svf0").height()*0.9),10);b.call(this);a.call(this);m.call(this);l.call(this)};var c=function(){o=false;i.call(this);h.call(this)};var g=function(){f=false;if(o){p.call(this)}};return{attach:function(){p.call(this);SiebelApp.EventManager.addListner("refreshview",g,this)},detach:function(){c.call(this)}}})();SiebelApp.ThemeManager.getTheme("ipad-one-applet-view")["objList"].push(SiebelApp.OneAppletView);