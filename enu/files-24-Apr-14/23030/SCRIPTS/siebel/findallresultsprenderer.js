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
if(typeof(SiebelAppFacade.FindAllResultsPRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.FindAllResultsPRenderer");define("siebel/findallresultsprenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.FindAllResultsPRenderer=(function(){var b=SiebelJS.Dependency("SiebelApp.Utils");var d=SiebelJS.Dependency("SiebelApp.Constants");var a=SiebelApp.S_App.LocaleObject;function e(g){SiebelAppFacade.FindAllResultsPRenderer.superclass.constructor.call(this,g);var f=g;this.GetPM=function(){return f}}SiebelJS.Extend(e,SiebelAppFacade.PhysicalRenderer);function c(f){var z=0;var y,x;var H,G,I,r,p,g,m,w,v,B;var F="";var u="#";var l=[];var h=[];var s='<span class="siebui-search-bigheadingtext-dialog">'+a.GetLocalString("IDS_SEARCH_OUI_SRCH_TITLE_TEXT")+"</span>";var o='<span class="siebui-search-bigheadingtext-dialog">'+a.GetLocalString("IDS_SWE_CKEDITOR_SOURCE")+"</span>";var t=f.Get("GetRecordSet");var E="<div id='div-find-results' class=siebui-applet-content><table title="+a.GetLocalString("RTCFindTxt")+a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT")+"><tbody><tr><th class=siebui-search-table-h1>"+s+"</th><th class=siebui-search-table-h2>"+o+"</th></tr>";var q="<tr class=siebui-row-first siebui-row-odd>";var D="<tr class=siebui-row-odd>";var A="<tr class=siebui-row-even>";var C=t.length;for(z=0;z<C;z++){H=t[z]["URL"];l=b.TokenizeString(H,u);G=b.Trim(l[0].substring(5));I=b.Trim(l[1].substring(7));r=b.Trim(l[2].substring(6));p=b.Trim(l[3].substring(8));m=t[z]["Result Field With Method"];h=b.TokenizeString(m,";");if(h.length%2===0){B=h.length/2}else{B=(h.length-1)/2}w="";v="";for(y=0;y<B;y++){w=w+h[y]+" ; "}for(x=B;x<h.length;x++){v=v+h[x]+" ; "}F="SWECmd=GotoView&SWEView="+G+"&SWEApplet0="+I+"&SWERowId0="+r;g='<a href="javascript:void(0)"id="URL'+z+'"value ="'+F+'">'+t[z]["Result Field"]+"</a>";var n="<td class=siebui-search-col1><p><span class=siebui-search-highlight>"+g+"</span></p><p><span class=siebui-search-subtext>"+w+"</span></p><p><span class=siebui-search-subtext>"+v+"</span></p></td><td class=siebui-search-col2>"+p+"</td></tr>";if(z===0){E+=q+n}else{if(z%2===0){E+=A+n}else{E+=D+n}}}E+="</tbody></table></div>";$("#findresulttable").append(E).trigger("create")}e.prototype.ShowUI=function(){var f=this.GetPM();SiebelAppFacade.FindAllResultsPRenderer.superclass.ShowUI.call(this);c.call(this,f)};e.prototype.BindEvents=function(j){var g=this.GetPM();if(j!=="drilldown"){SiebelAppFacade.FindAllResultsPRenderer.superclass.BindEvents.call(this)}switch(j){case"drilldown":default:var f=0;for(f=0;f<10;f++){var h="URL"+f;var k;$("#"+h+"").bind("click",{ctx:this},function(i){k=i.currentTarget.getAttribute("value");SiebelApp.S_App.GotoView("","",k,"")})}break}};e.prototype.BindData=function(g){var f=this.GetPM();SiebelAppFacade.FindAllResultsPRenderer.superclass.BindData.call(this);$("#div-find-results").remove();c.call(this,f);this.BindEvents("drilldown")};return e}());return"SiebelAppFacade.FindAllResultsPRenderer"})};