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
if(typeof(SiebelApp.S_App.BCField)=="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCField");SiebelApp.S_App.BCField=(function(){var a=SiebelApp.Utils;var c=SiebelApp.Constants;function b(){var d;var e="";this.SetBusComp=function(f){d=f};this.GetBusComp=function(){return d};this.SetSearchSpec=function(f){e=f};this.GetSearchSpec=function(){return e}}b.prototype.ProcessObjectInfo=function(f){var d=f.GetType();if(d!=c.get("SWE_PST_FIELD")){throw new Error()}var e=a.Curry(SiebelApp.S_App.constructor.prototype.DefineAccessor,this,f);e("GetName","SWE_PROP_NAME");e("GetDataType","SWE_PROP_TYPE",true);if(!this.GetDataType()){this.GetDataType=function(){return""}}e("IsCalc","SWE_PROP_IS_CALC");e("IsHidden","SWE_PROP_IS_HIDDEN");e("IsReadOnly","SWE_PROP_IS_READONLY");e("IsRequired","SWE_PROP_IS_REQ");e("IsText","SWE_PROP_IS_TEXT");e("IsNum","SWE_PROP_IS_NUM");e("GetScale","SWE_PROP_SCALE");e("GetLength","SWE_PROP_LENGTH");e("IsPostChanges","SWE_PROP_IS_POST_CHANGES");e("IsBoundedPick","SWE_PROP_IS_BOUND_PICK");e("GetCurrField","SWE_PROP_CURR_FLD",true);f=null};return b}())};