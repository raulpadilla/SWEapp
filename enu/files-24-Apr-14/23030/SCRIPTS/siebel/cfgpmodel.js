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
if(typeof(SiebelAppFacade.ConfiguratorPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ConfiguratorPresentationModel");define("siebel/cfgpmodel",["siebel/puicfgclient","siebel/puicfgui"],function(){SiebelAppFacade.ConfiguratorPresentationModel=(function(){var consts=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants");var siebConsts=SiebelJS.Dependency("SiebelApp.Constants");function ConfiguratorPresentationModel(proxy){SiebelAppFacade.ConfiguratorPresentationModel.superclass.constructor.call(this,proxy)}SiebelJS.Extend(ConfiguratorPresentationModel,SiebelAppFacade.PresentationModel);ConfiguratorPresentationModel.prototype.Init=function(){SiebelAppFacade.ConfiguratorPresentationModel.superclass.Init.call(this);this.AddProperty("CfgControls",null);this.AddProperty("ObjectId","");this.AddProperty("RootIntId","");this.AddProperty("RootId","");this.AddProperty("ProductId","");this.AddProperty("ProductName","");this.AddProperty("Version","");this.AttachNotificationHandler(siebConsts.get("SWE_PROP_BC_NOTI_GENERIC"),function(propSet){var type=propSet.GetProperty("type");var encodedArgsArray=propSet.GetProperty(siebConsts.get("SWE_PROP_ARGS_ARRAY"));var argsArray=[];if(encodedArgsArray){CCFMiscUtil_StringToArray(encodedArgsArray,argsArray)}if(type.search(jqSelector(this.Get("GetName")))>0){if(type.search("EvalJS")===0){var js=argsArray[0];if(typeof(js)!=="undefined"){eval(js)}}else{if(type.search("RefreshSpanInnerHTML")===0){var strHTML=argsArray[0];var divObj=$("div[id$="+jqSelector(this.Get("GetName"))+"]");divObj.empty().append(strHTML)}else{SiebelJS.Log("OpenUI_CFG::Unhandled Event::"+type)}}}})};ConfiguratorPresentationModel.prototype.CfgInit=function(ui_framework){this.SetProperty("CfgControls",m_UIFramework.m_controlPropSet.Clone());this.SetProperty("ObjectId",m_UIFramework.CFG_frameworkObjId);this.SetProperty("RootIntId",m_UIFramework.CFG_frameworkRootIntId);this.SetProperty("RootId",m_UIFramework.CFG_frameworkRootId);this.SetProperty("ProductId",m_UIFramework.CFG_frameworkProdId);this.SetProperty("ProductName",m_UIFramework.CFG_frameworkProdName);this.SetProperty("Version",m_UIFramework.CFG_frameworkVersion)};return ConfiguratorPresentationModel}());return"SiebelAppFacade.ConfiguratorPresentationModel"})};