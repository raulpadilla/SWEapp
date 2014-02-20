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
if(typeof(SiebelApp.S_App.DatumDateObject)){(function(){var a=SiebelApp.S_App.DatumDateObject;a.prototype.add=function(b){return this.GetValue()+b};a.prototype.minus=function(b){return this.GetValue()-b}}())}if(typeof(SiebelApp.S_App.DatumUTCDateTimeObject)){(function(){var a=SiebelApp.S_App.DatumUTCDateTimeObject;a.prototype.add=function(b){if(b>=1){this.AddDays(b)}else{if(b<1){this.AddTime(b*24,0,0)}}return this};a.prototype.subtract=function(b){if(b>=1){this.AddDays(-b)}else{if(b<1&&b>0){this.AddTime(-b*24,0,0)}}return this};a.prototype.getClassName=function(){return"DatumUTCDateTimeObject"};a.prototype.minus=function(b){return this}}())}if(typeof(SiebelApp.S_App.DatumDateTimeObject)){(function(){var b=SiebelApp.S_App.DatumDateTimeObject;var a=b.prototype.JulianToDate;b.prototype.JulianToDate=function(){if(!SiebelApp.OfflineAppSettings.GetMode()){a.call(this);return}var g,f,l,k,i,j,h;j=this.m_nJulian+1;if(j<2299161){g=j}else{h=parseInt((j-1867216.25)/36524.25,10);g=j+1+h-h/4}f=g+1524;l=parseInt((f-122.1)/365.25,10);k=parseInt(365.25*l,10);i=parseInt((f-k)/30.6001,10);this.m_nDay=parseInt(f-k-parseInt(30.6001*i,10),10);this.m_nMonth=parseInt((i<13.5)?(i-1):(i-13),10);this.m_nYear=parseInt((this.m_nMonth>2.5)?(l-4716):(l-4715),10)}}())}if(typeof(SiebelApp.S_App.DatumTimeObject)){(function(){var a=SiebelApp.S_App.DatumTimeObject;a.prototype.greater=function(c){var b=false;if(this.GetValue()>c.GetValue()){b=true}return b};a.prototype.less=function(c){var b=false;if(this.GetValue()<c.GetValue()){b=true}return b}}())};