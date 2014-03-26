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
if(typeof(SiebelAppFacade.GanttLegendBar)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.GanttLegendBar");SiebelAppFacade.GanttLegendBar=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function b(){}b.prototype.init=function(c,d){this.element=c;this.id=d};b.prototype.createLegends=function(i,d){var c=$("#"+this.id),g,f=0,h=8;c.remove();g='<div class="siebui-legendTable" id='+this.id+' ot = "div" rn = "Legend" un = "Legend"><div class="siebui-legendTableRow">';for(var e in i){if(i.hasOwnProperty(e)){if(f>=h){g+='</div><div class="siebui-legendTableRow">';f=0}var j='<div class="siebui-legendTableCell"><div class="siebui-legendTable"><div class="siebui-legendTableRow"><div class="siebui-legendBoxCell"><span class="siebui-legendBox" style="color:'+i[e]+';">&#9632</span></div><div class="siebui-legendKeyCell"><div class="siebui-legendkey" title='+e+' ot = "div" rn = '+e+" un = "+e+">"+e+"</div></div></div></div></div>";g=g+j;f=f+1}}while(f<h&&f>=1){g=g+'<div class="siebui-legendTableCell"></div>';f=f+1}g=g+"</div></div>";this.element.append(g);this.ShowLegends(d)};b.prototype.ShowLegends=function(c){if(c){$("#"+this.id).css("display","table")}else{$("#"+this.id).css("display","none")}};return b}())};