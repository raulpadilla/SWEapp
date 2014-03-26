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
if(typeof(SiebelApp.S_App.DatumCurrencyObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.DatumCurrencyObject");var consts=SiebelApp.Constants;SiebelApp.S_App.DatumCurrencyObject=(function(){function a(){SiebelApp.S_App.DatumCurrencyObject.superclass.constructor.call(this);this.m_exchangeDate=null;this.m_nMinAcctUnit=0.01;this.m_bEuro=false;this.m_sCurrencyCode=""}SiebelJS.Extend(a,SiebelApp.S_App.DatumNumberObject);a.prototype.GetDataType=function(){return consts.get("DTYPE_CURRENCY")};a.prototype.GetFormat=function(){if(this.m_sFormat.length===0){return SiebelApp.S_App.LocaleObject.GetProfile(consts.get("LOCAL_CURR_FORMAT"))}else{return(this.m_sFormat)}};a.prototype.GetAsForeignCurrency=function(f,c){if(!c){c=-1}if(this.m_nValue===0){return(0)}if(this.m_sCurrencyCode.length===0||f.length===0||this.m_sCurrencyCode===f){return(this.m_nValue)}var d;var e=0;var b=0;if(c===-1){c=(this.m_bEuro||((d=SiebelApp.S_App.LocaleObject.GetCurrency(f))&&d.m_bEuro))?1:0}if(c===0){b=SiebelApp.S_App.LocaleObject.GetExchangeRate(this.m_sCurrencyCode,f,this.m_exchangeDate);e=this.m_nValue*b}else{if(!this.m_bEuro){b=SiebelApp.S_App.LocaleObject.GetExchangeRate(this.m_sCurrencyCode,"EUR",this.m_exchangeDate);e=this.m_nValue*b}else{b=SiebelApp.S_App.LocaleObject.GetExchangeRate("EUR",this.m_sCurrencyCode,this.m_exchangeDate);e=this.m_nValue/b}b=SiebelApp.S_App.LocaleObject.GetExchangeRate("EUR",f,this.m_exchangeDate);e*=b}return(e)};a.prototype.GetCurrencyCode=function(){return this.m_sCurrencyCode};a.prototype.GetCurrencySymbol=function(){return this.m_sDispCurrSymbol};a.prototype.GetExchangeDate=function(){return this.m_exchangeDate};a.prototype.GetMinAccountableUnit=function(){return this.m_nMinAcctUnit};a.prototype.GetDispDecimal=function(){return(SiebelApp.S_App.LocaleObject.GetDispCurrencyDecimal())};a.prototype.GetDispSeparator=function(){return(SiebelApp.S_App.LocaleObject.GetDispCurrencySeparator())};a.prototype.SetCurrency=function(c){var b;if(c&&(b=SiebelApp.S_App.LocaleObject.GetCurrency(c))){this.m_nValue=this.GetAsForeignCurrency(c);this.m_sCurrencyCode=c;this.m_sDispCurrSymbol=b.m_sSymbol;this.m_nDispScale=b.m_nStdScale;this.m_nScale=b.m_nExtScale;this.m_nMinAcctUnit=b.m_nMinAcctUnit;this.m_bEuro=b.m_bEuro}else{this.m_nMinAcctUnit=0.01;this.m_bEuro=false;this.m_sCurrencyCode="";this.m_sDispCurrSymbol=""}};a.prototype.SetExchangeDate=function(b){this.m_exchangeDate=b};a.prototype.SetToFunctionalCurrency=function(){var b=SiebelApp.S_App.LocaleObject.GetFuncCurrCode();this.SetCurrency(b)};return a}())};