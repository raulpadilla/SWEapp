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
if(typeof(SiebelAppFacade.ComponentMgr)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ComponentMgr");SiebelAppFacade.ComponentMgr=(function(){var n=SiebelJS.Dependency("SiebelApp.Constants");var s=SiebelJS.Dependency("SiebelApp.Utils");var j=n.get("SWE_PROP_NAME"),w=n.get("SWE_CMP_REL_PARENT"),t=n.get("SWE_CMP_REL_SIBLING"),h=n.get("SWE_CMP_REL_CHILDREN");function v(){this.GetName=function(){return"RootNode"}}var p="keyObj_",i="cmpMap_";var o=new v(),b={keyObj_0:o,cmpMap_0:{}},f=[o],d=["0"],q=[0];function a(){}function g(z){var y=s.IndexOf(f,z),A=null;if(y!==-1){A=d[y]+"_"+(q[y]+1)}return A}function x(z){var y=s.IndexOf(f,z),A=null;if(y!==-1){A=d[y]}return A}function m(C,A){var z=b[p+C],B=s.IndexOf(f,z),y=q[B];return y!==Number(A)}a.prototype.RegisterLevel=function(y,z){var A=g.call(this,z||o);if(A){b[p+A]=y;b[i+A]={};f.push(y);d.push(A);q.push(0);q[s.IndexOf(f,z||o)]+=1}else{SiebelJS.Log("[ComponentMgr:RegisterLevel] - Can't find appropriate level to attach")}};a.prototype.DeRegisterLevel=function(G){var D=s.IndexOf(f,G),z=d[D],F,B;if(z){F=z.substring(0,z.lastIndexOf("_"));B=z.substring(z.lastIndexOf("_")+1);if(m.call(this,F,B)){SiebelJS.Log("[ComponentMgr-DeRegisterLevel] Phew! DeRegisterLevel call requires more work!")}else{var A=q[D];for(var C=1;C<=A;C++){this.DeRegisterLevel(f[s.IndexOf(d,z+"_"+C)])}var E=b[i+d[D]];for(var y in E){if(E.hasOwnProperty(y)){E[y].EndLife()}}delete b[p+z];delete b[i+z];f.splice(D,1);d.splice(D,1);q.splice(D,1);q[s.IndexOf(d,F)]-=1}}};a.prototype.FindComponent=function(y){var z=null;if(typeof(y)==="string"||y.id){z=r.call(this,y.id||y)}else{if(y.type){}else{if(y.cmp&&y.rel){z=u.call(this,y.cmp,y.rel)}else{if(y.level){}}}}return z};function r(C){var z=null;for(var y in b){if(b.hasOwnProperty(y)&&y.indexOf(i)===0){var B=b[y];for(var A in B){if(B.hasOwnProperty(A)&&A===C){z=B[A];break}}if(z){break}}}return z}function l(y){return null}function u(I,L){var F=null,y=null;for(var z in b){if(b.hasOwnProperty(z)&&z.indexOf(i)===0){var E=b[z];for(var G in E){if(E.hasOwnProperty(G)&&E[G]===I){y=z.replace(i,"");break}}}}if(y){if(L===w){var H=s.IndexOf(d,y);var J=f[H];var K=y.substring(0,y.lastIndexOf("_"));var B=b[i+K];var A=J.GetName?J.GetName():"";for(var z in B){if(B.hasOwnProperty(z)&&z===A){F=B[z];break}}}else{if(L===t){F=[];var B=b[i+y];for(var z in B){if(B.hasOwnProperty(z)&&B[z]!==I){F.push(B[z])}}F=F.length===0?null:F}else{if(L===h){F=[];var H=s.IndexOf(d,y);var C=q[H];if(C>0){for(var D=0;D<C;D++){var B=b[i+y+"_"+(D+1)];for(var z in B){if(B.hasOwnProperty(z)){F.push(B[z])}}}}F=F.length===0?null:F}}}}return F}function k(y){return null}function e(A,z,y){var B=x.call(this,A);if(B){b[i+B][z]=y}else{}}a.prototype.MakeComponent=function(C,y,B){var A=null;if(B&&B.GetName){A=B.GetName()}A=A||y.GetProperty(j);var z=new SiebelAppFacade.Component();e.call(this,C,A,z);z.Setup(y,B);if(B.SetPModel){B.SetPModel(z.GetPM())}};a.prototype.DeleteComponent=function(z,C){var E=null,B=null,A=null;if(C){E=x.call(this,C);B=b[i+E];if(B){for(A in B){if(B.hasOwnProperty(A)&&B[A]===z){B[A].EndLife();delete B[A];break}}}}else{for(var y in b){if(b.hasOwnProperty(y)&&y.indexOf(i)===0){var D=b[y];for(A in D){if(D.hasOwnProperty(A)&&D[A]===z){D[A].EndLife();delete D[A];break}}}}}};a.prototype.Show=function(y){var z=y||o;c.call(this,z)};function c(D){var A=s.IndexOf(f,D);if(A!==-1){var y=q[A];for(var B=1;B<=y;B++){c.call(this,f[s.IndexOf(d,d[A]+"_"+B)])}var C=b[i+d[A]];for(var z in C){if(C.hasOwnProperty(z)&&z!=="Persistent Customer Dashboard View"){C[z].Show()}}}}a.prototype.DisplayTree=function(A,y){A=A||o;y=y?"  "+y:"  ";var C=s.IndexOf(f,A);if(C!==-1){SiebelJS.Log(y+"Proxy Node -> "+(A.constructor.name||"Anonymous"));var z=q[C];for(var D=1;D<=z;D++){this.DisplayTree(f[s.IndexOf(d,d[C]+"_"+D)],y)}var E=b[i+d[C]];for(var B in E){if(E.hasOwnProperty(B)){SiebelJS.Log(y+"Component Node -> "+B)}}}};return new a()}())};