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
if(typeof(SiebelApp.servicechecktrunk)==="undefined"){SiebelJS.Namespace("SiebelApp.servicechecktrunk");define("siebel/offline/servchecktrunk",["siebel/offline/model"],function(){var b={};var a=SiebelApp.Offlineconstants;b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service FS Activity Recommended Parts & Tools List Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="servicechecktrunk";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service FS Activity Recommended Parts & Tools List Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="servicechecktrunk";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};SiebelApp.servicechecktrunk=(function(){function c(d){}SiebelJS.Extend(c,SiebelApp.ServiceModel);c.prototype.DoCanInvokeMethod=function(e){var d=CCFMiscUtil_CreatePropSet();var f="";f=e.GetProperty("MethodName").toString();if(f==="CheckTrunk"){d.SetProperty("Invoked",true);d.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:d})}else{if(f==="OrderParts"){d.SetProperty("Invoked",true);d.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:d})}else{d.SetProperty("Invoked",false);d.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:d})}}};c.prototype.DoInvokeMethod=function(e){var f="";var d=CCFMiscUtil_CreatePropSet();f=e.GetProperty("MethodName").toString();if(f==="CheckTrunk"){this.CheckTrunk();$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="OrderParts"){this.OrderParts();$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{d.SetProperty("Invoked",false);$.setReturnValue({err:false,retVal:d})}}};c.prototype.CheckTrunk=function(){SiebelJS.Log("Invoked Service Method Check Trunk");var i;var e;var g;var w;var n;var l;var f;var s;var q;var t;var d;var v;var p;var o;var u;var k;var x;var r;var l;var j;var m;var y;var q;var s;var h;var p;pActionBC=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetBusComp().GetParentBuscomp();e=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetBusComp();pActionBC.FieldValue("Primary Owner Id");$.callback(this,function(z){w=z.retVal;pActionBC.FieldValue("Primary Owned By");$.callback(this,function(A){n=A.retVal;if(!utils.IsEmpty(n)){i=SiebelApp.S_App.Model;v=SiebelApp.S_App.Model.GetBusObj("Employee").GetBusComp("Employee");v.ActivateField("Id");v.ActivateField("Primary Position Id");v.ActivateField("Full Name");v.ActivateField("Login Name");p='[Login Name] = "'+n+'"';v.SetSearchExpr(p);v.Execute();$.callback(this,function(B){v.Home();if(v.CheckActiveRow()===true){v.FieldValue("Primary Position Id");$.callback(this,function(D){u=D.retVal;i=SiebelApp.S_App.Model;k=SiebelApp.S_App.Model.GetBusObj("FS Part Browser").GetBusComp("FS Bucket - Part Browser");k.ActivateField("Id");k.ActivateField("Availability");k.ActivateField("Status");k.ActivateField("Quantity");i=SiebelApp.S_App.Model;x=SiebelApp.S_App.Model.GetBusObj("FS Part Browser").GetBusComp("FS Bucket Header - Part browser");x.ActivateField("Id");x.ActivateField("Product Id");x.ActivateField("Primary Position ID");x.ActivateField("Inventory Type");i=SiebelApp.S_App.Model;r=SiebelApp.S_App.Model.GetBusObj("FS Part Browser").GetBusComp("FS Substitute Part Bucket - Part Browser");r.ActivateField("Id");r.ActivateField("Availability");r.ActivateField("Status");r.ActivateField("Quantity");if(utils.IsEmpty(s)){s=0}if(utils.IsEmpty(q)){q=0}var C=function(){s=parseInt(s,10);q=parseInt(q,10);s=s+q;s=s.toString();e.SetFieldValue("Current Available Qty",s,true);$.callback(this,function(E){e.SetCommitPending(true);e.WriteRecord();$.callback(this,function(F){SiebelApp.OfflineAppMgr.PostActions(a.get("ACTION_RPC_COMPLETED"))})})};e.FieldValue("Product Id");$.callback(this,function(E){l=E.retVal;j=SiebelApp.S_App.Model.GetLovNameVal("Trunk","FS_INVLOCTYPE_TYPE");p='[Product ID] = "'+l+'" AND ';p+='[Primary Position ID] = "'+u+'" AND ';p+='[Inventory Type] = "'+j+'"';x.SetSearchExpr(p);x.Execute();$.callback(this,function(F){x.Home();if(x.CheckActiveRow()===true){m=SiebelApp.S_App.Model.GetLovNameVal("On Hand","FS_PRODINVCAT_AVAIL");y=SiebelApp.S_App.Model.GetLovNameVal("Good","FS_PRODINVCAT_STATUS");p='[Product ID] = "'+l+'" AND ';p+='[Availability] = "'+m+'" AND ';p+='[Status] = "'+y+'"';k.SetSearchExpr(p);k.Execute();$.callback(this,function(G){k.Home();if(k.CheckActiveRow()===true){k.FieldValue("Quantity");$.callback(this,function(H){s=H.retVal})}$.callback(this,function(H){r.SetSearchExpr(p);r.Execute();$.callback(this,function(I){r.Home();if(r.CheckActiveRow()===true){r.FieldValue("Quantity");$.callback(this,function(J){q=J.retVal})}$.callback(this,function(J){C.call(this)})})})})}else{C.call(this)}})})})}})}})})};c.prototype.OrderParts=function(){SiebelJS.Log("Invoked OrderParts Method..");var g;var j;var p;var r;var q;var n;var o;var f;var s;var h;var m;var i;var e;var l;var d;var k;var t;o=SiebelApp.S_App.Model;f=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetBusComp();f.FieldValue("Order Id");$.callback(this,function(u){g=u.retVal;if(g===""){f.FieldValue("Orderable");$.callback(this,function(v){sIsOrderable=v.retVal;if(sIsOrderable==="Y"){f.FieldValue("Product Id");$.callback(this,function(w){p=w.retVal;f.FieldValue("Product Name");$.callback(this,function(x){r=x.retVal;f.FieldValue("Recommended Quantity");$.callback(this,function(y){q=y.retVal;f.FieldValue("Id");$.callback(this,function(z){n=z.retVal;s=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetBusComp().GetParentBuscomp();s.FieldValue("Account Id");$.callback(this,function(A){sAccountId=A.retVal;s.FieldValue("Activity SR Id");$.callback(this,function(B){sSR_Id=B.retVal;o=SiebelApp.S_App.Model;t=SiebelApp.S_App.Model.GetBusObj("Order Entry");m=t.GetBusComp("Order Entry - Orders");i=t.GetBusComp("Order Entry - Line Items");m.Execute();$.callback(this,function(C){m.NewRecord(true);$.callback(this,function(D){e=SiebelApp.S_App.Model.GetLovNameVal("Service Order","FS_ORDER_TYPE");m.SetFieldValue("Order Type",e,true);$.callback(this,function(E){m.SetFieldValue("Account Id",sAccountId,true);$.callback(this,function(F){m.SetFieldValue("Service Request Id",sSR_Id,true);$.callback(this,function(G){m.SetCommitPending(true);m.WriteRecord();$.callback(this,function(H){m.FieldValue("Id");$.callback(this,function(I){l=I.retVal;m.FieldValue("Order Number");$.callback(this,function(J){k=J.retVal;i.Execute();$.callback(this,function(K){i.NewRecord(true);$.callback(this,function(L){i.SetFieldValue("Product Id",p,true);$.callback(this,function(N){var M=null;M=i.GetPickListInfo("Product");
if(M){M.SetSearchExpr("Id",p);M.Execute()}i.SetFieldValue("Product",r,true);$.callback(this,function(O){if(M){M.SetSearchExpr("IdSpec","");M.Execute()}i.SetFieldValue("Quantity Requested",q,true);$.callback(this,function(P){i.SetFieldValue("Activity Recommended Part Id",n,true);$.callback(this,function(Q){i.FieldValue("Id");$.callback(this,function(R){sOrderItemId=R.retVal;i.SetFieldValue("Order Header Id",l,true);$.callback(this,function(S){i.WriteRecord();$.callback(this,function(T){f.SetFieldValue("Primary Order Item Id",sOrderItemId,true);$.callback(this,function(U){f.SetFieldValue("Order Number Calc",k,true);$.callback(this,function(V){f.SetFieldValue("Order Id",l,true);$.callback(this,function(W){f.SetCommitPending(true);f.WriteRecord();$.callback(this,function(X){SiebelApp.S_App.Model.ReleaseBO(t);SiebelApp.OfflineAppMgr.PostActions(a.get("ACTION_RPC_COMPLETED"))})})})})})})})})})})})})})})})})})})})})})})})})})})})}})}else{SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted","OrderParts")}})};return c}());return"SiebelAppFacade.SiebelApp.servicechecktrunk"})};