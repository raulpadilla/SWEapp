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
if(typeof(SiebelAppFacade.EditUIPModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.EditUIPModel");define("siebel/epuipmodel",["siebel/listpmodel"],function(){SiebelAppFacade.EditUIPModel=(function(){var h=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants");var g=SiebelJS.Dependency("SiebelApp.Constants");function f(m){SiebelAppFacade.EditUIPModel.superclass.constructor.call(this,m);var k=[];this.SetReadOnlyControl=function(o){k=o};this.GetReadOnlyControls=function(){return k};var n=[];this.SetHideControlPartInfo=function(o){n=o};this.GetHideControlPartInfo=function(){return n};var l=[];this.SetRowLevelControls=function(o){l=o};this.GetRowLevelControls=function(){return l};var j=[];this.SetControlDynCaptions=function(o){j=o};this.GetControlDynCaptions=function(){return j}}SiebelJS.Extend(f,SiebelAppFacade.ListPresentationModel);f.prototype.Init=function(){SiebelAppFacade.EditUIPModel.superclass.Init.call(this);this.AddProperty("LastBoundData",[]);this.AddProperty("RecordGroupField","");this.AddMethod("CanShowRowLevelControl",b,{scope:this});this.AddMethod("IsRowLevelControl",c,{scope:this});this.AddMethod("IsControlReadOnly",a,{scope:this});this.AddMethod("GetControlCaption",d,{scope:this})};f.prototype.Setup=function(j){SiebelAppFacade.EditUIPModel.superclass.Setup.call(this,j);i.call(this,j)};function e(l){var n=l.split(",");var j=n[0];var m=n[1];var k=n[2];return{Control:j,Info:{Field:m,Value:k}}}function i(l){var u=l.GetChildByType("apm");if(!u||typeof(u)==="undefined"){return}var t=u.EnumProperties(true);var v=[];var k=[];var n=[];var o=[];do{var s=u.GetProperty(t);if(t.indexOf("Row Level Hide Control")!==-1||t.indexOf("Hide Layout Part")!==-1){var p=e(s);k[p.Control]=p.Info}else{if(t.indexOf("Row Level Controls")!==-1){var j=s.split(",");for(var q=0;q<j.length;q++){n[j[q]]=true}}else{if(t.indexOf("Read Only Field")!==-1){var r=e(s);v[r.Control]=r.Info}else{if(t==="Record Group Field"){this.SetProperty("RecordGroupField",s)}else{if(t.indexOf("Dyn Caption Control")!==-1){var m=s.split(",");o[m[0]]=m[1]}}}}}}while(t=u.EnumProperties(false));this.SetHideControlPartInfo(k);this.SetReadOnlyControl(v);this.SetRowLevelControls(n);this.SetControlDynCaptions(o)}var b=function(l,k){var o=this.GetHideControlPartInfo();if(!o.hasOwnProperty(l)){return true}var p=o[l].Field;var j=o[l].Value;var n=this.Get("GetRawRecordSet");if(k>=n.length){return false}var m=n[k][p];return(m!==j)};var c=function(j){var k=this.GetRowLevelControls();if(k.hasOwnProperty(j)&&k[j]===true){return true}return false};var a=function(k,j){var n=this.GetReadOnlyControls();if(!n.hasOwnProperty(k)){return false}var p=n[k].Field;var o=n[k].Value;var m=this.Get("GetRawRecordSet");var l=m[j][p];return(l===o)};var d=function(l,j){var n=this.GetControlDynCaptions();if(!n.hasOwnProperty(l)){return""}var k=n[l];var m=this.Get("GetRawRecordSet");return m[j][k]};return f}());return"SiebelAppFacade.EditUIPModel"})};