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
if(typeof(SiebelAppFacade.Component)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.Component");SiebelAppFacade.Component=(function(){var i=SiebelJS.Dependency("SiebelApp.Constants");var j=i.get("SWE_CMP_REL_PARENT"),f=i.get("SWE_CMP_REL_SIBLING"),g=i.get("SWE_CMP_REL_CHILDREN"),c=i.get("SWE_PROP_OUI_PMODEL"),e=i.get("SWE_PROP_OUI_PRENDERER"),h="SWE_OUI_RENDERER";function k(){var l=null,m=null;this.GetPM=function(){return l};this.SetPM=function(n){l=n};this.GetPR=function(){return m};this.SetPR=function(n){m=n}}k.prototype.Init=function(){return this};k.prototype.Setup=function(l,m){if(this.GetPM()===null){var n=b.call(this,l,SiebelAppFacade.PresentationModel,c);if(n){this.SetPM(new n(m));this.GetPM().Setup(l);this.SetPR(l)}}return this};k.prototype.Show=function(){var n=this.GetPR();var m=null;if(n instanceof JSSPropertySet){var l=b.call(this,this.GetPR(),SiebelAppFacade.PhysicalRenderer||SiebelAppFacade.JQMFormRenderer,e,h);if(l){m=new l(this.GetPM());this.SetPR(m);this.GetPM().SetRenderer(m)}}else{if(n instanceof SiebelAppFacade.BasePR){m=n}}if(m){m.ShowUI();m.BindEvents();m.BindData()}return this};k.prototype.Get=function(){var l=this.GetPM();if(l){return l.Get.apply(l,arguments)}return null};k.prototype.ExecuteMethod=function(){var l=this.GetPM();if(l){return l.ExecuteMethod.apply(l,arguments)}};k.prototype.GetParent=function(){return SiebelAppFacade.ComponentMgr.FindComponent({cmp:this,rel:j})};k.prototype.GetSiblings=function(){return SiebelAppFacade.ComponentMgr.FindComponent({cmp:this,rel:f})};k.prototype.GetChildren=function(){return SiebelAppFacade.ComponentMgr.FindComponent({cmp:this,rel:g})};k.prototype.EndLife=function(){this.SetPM(null);this.SetPR(null)};k.prototype.SwitchPMnPR=function(l,m){var p=require(String(l.GetProperty(i.get("SWE_UIDEF_PM_CTR")))),o=require(String(l.GetProperty(i.get("SWE_UIDEF_PR_CTR")))),n=this.GetPM(),r=this.GetPR(),q=false;if(n){if(typeof(p)==="string"&&a.call(this,p)!==n.constructor){q=true}if(typeof(p)==="object"&&p!==n.constructor){q=true}}if(n){if(typeof(o)==="string"&&a.call(this,o)!==r.constructor){q=true}if(typeof(o)==="object"&&o!==r.constructor){q=true}}if(q){this.GetPM().EndLife();d.call(this,m);this.SetPM(null);this.Setup(l,m)}};function d(m){if(m&&m.GetMethodArray){var o=m.GetMethodArray();for(var n=0,l=o.length;n<l;n++){if(m.constructor.prototype[o[n]]&&m[o[n]]!==m.constructor.prototype[o[n]]){m[o[n]]=m.constructor.prototype[o[n]]}}}}function a(o){var n=null;o=typeof(o)==="string"?o.split("."):[];if(o[0]){n=window[o[0]];for(var m=1,l=o.length;m<l&&n;m++){n=n[o[m]]}}return n}function b(m,l,o,s){var q=null,r=null,n=null,p=null;if(m){if(o===i.get("SWE_PROP_OUI_PMODEL")){r=m.GetProperty(i.get("SWE_UIDEF_PM_CTR"))}else{if(o===i.get("SWE_PROP_OUI_PRENDERER")){r=m.GetProperty(i.get("SWE_UIDEF_PR_CTR"))}}if(!r){r=SiebelApp.S_App.GetConstructorFromKey(m.GetProperty(o))||""}n=m.GetProperty(s);if(String(r).indexOf("SiebelAppFacade.ViewP")===-1){p=require(String(r))}if(typeof(p)==="string"){r=p}if(typeof(p)!=="function"&&r){p=a.call(this,r)}q=p||SiebelAppFacade[n]||l}return q}return k}())};