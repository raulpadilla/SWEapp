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
if(typeof(SiebelApp.S_App.BCField)){(function(){var a=SiebelApp.Utils;var d=SiebelApp.Constants;var b=SiebelApp.S_App.BCField;var f=SiebelApp.S_App.BCField.prototype;var e=SiebelApp.S_App.BCField;SiebelApp.S_App.BCField=function(){e.call(this);var i={};var g=[];var h=0;this.GetExtObj=function(){return i};this.SetExtObjProp=function(k,j){this.GetExtObj()[k]=j};this.GetExtObjProp=function(j){if(!((this.GetExtObj()).hasOwnProperty(j))){this.GetExtObj()[j]=null}return(this.GetExtObj()[j])};this.GetForDepArray=function(){return g};this.SetForDepArray=function(j){g=j};this.SetNumImmediateDep=function(j){h=j};this.GetNumImmediateDep=function(){return h}};SiebelApp.S_App.BCField.prototype=f;SiebelApp.S_App.BCField.prototype.constructor=SiebelApp.S_App.BCField;var c=b.prototype.ProcessObjectInfo;b.prototype.ProcessObjectInfo=function(o,l){if(SiebelApp.OfflineAppSettings.GetMode()){var j;if(l){j=o.GetPropertyAsStr(d.get("SWE_PROP_TYPE"))}var m=o.GetType();if(m!=d.get("SWE_PST_FIELD")){throw new Error()}var n=a.Curry(SiebelApp.S_App.constructor.prototype.DefineAccessor,this,o);n("GetName","SWE_PROP_NAME");n("GetDataType","SWE_PROP_TYPE",true);if(!this.GetDataType()){this.GetDataType=function(){return""}}n("GetValidationSpec","VALIDATIONSPEC");n("GetPrcn","PRECISION");n("GetNoCopy","NOCOPY");n("GetPostDefault","POSTDEFAULT");n("GetPickList","PICKLISTNAME");n("GetLinkName","LINKNAME");n("GetForceCase","FORCE_CASE");n("GetForceActive","FORCE_ACTIVE");n("IsDisableSort","DISABLE_SORT");n("IsDisableSearch","DISABLE_SEARCH");n("GetColName","COLUMN_NAME");n("GetCalcExpr","CALCEXPR");if(o.GetProperty("fDeps")){var h=o.GetProperty("fDeps");var g=o.GetProperty("fDeps").length;for(var k=0;k<g;k++){this.AddForwardDependency(h[k])}}}c.call(this,o);if(SiebelApp.OfflineAppSettings.GetMode()&&l){this.GetDataType=function(){return j}}};b.prototype.HasDefaultValue=function(){var g=this.GetDefn();if(a.IsEmpty(g.PreDefault)&&a.IsEmpty(g.PostDefault)){return false}return true};b.prototype.GetDefn=function(){return(this.GetBusComp().GetFieldDefn(SiebelApp.S_App.LookupStringCache(this.GetName())))};b.prototype.IsInactive=function(g){return(false)};b.prototype.AreValuesEqual=function(h,g){if(h===g){return(false)}else{return(true)}};b.prototype.GetColName=function(){var g;return(g)};b.prototype.GetName=function(){if(!this.GetExtObjProp("m_name")){this.SetExtObjProp("m_name","")}return(this.GetExtObjProp("m_name"))};b.prototype.SetName=function(g){this.SetExtObjProp("m_name",g)};b.prototype.IsSystemField=function(){return false};b.prototype.IsConstrainingField=function(){return true};b.prototype.IsActivated=function(){if(!this.GetExtObjProp("m_activated")){this.SetExtObjProp("m_activated",false)}return(this.GetExtObjProp("m_activated"))};b.prototype.SetActivated=function(g){this.SetExtObjProp("m_activated",g)};b.prototype.GetCalcQuery=function(){return true};SiebelApp.S_App.BCField.prototype.Validate=function(j,g,h,i){return true};SiebelApp.S_App.BCField.prototype.GetTableName=function(){return""};SiebelApp.S_App.BCField.prototype.ForwardDeps=function(j,l,h){if(j){h=0}var g=this.GetForDepArray();var k;var i;var m=(l)?this.GetNumImmediateDep():g.length;for(;h<m;h++){k=g[h];i=this.GetBusComp().GetFieldMap()[k];if(i){if(!i.IsInactive()){return true}}}return false};SiebelApp.S_App.BCField.prototype.AddForwardDependency=function(k,g){var i;var j=[];var h=this.GetForDepArray();if(k===this.GetName()){j.push(this.GetName());j.push(fieldDef.GetName());retObj.err=true;retObj.retVal=j}if(g){h.splice(0,0,k);this.SetNumImmediateDep(this.GetNumImmediateDep()+1)}else{h.push(k)}};SiebelApp.S_App.BCField.prototype.EnumDefaultValDependencies=function(n,i,m){var h=m?i.PreDefault:i.PostDefault;var g=[];var k=h.search("Field:");var l=h.search("Expr:");var j=SiebelApp.Query.GetFieldsFromExp(h)}}())};