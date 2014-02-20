if(typeof(SiebelApp.OffResponseProcessor)==="undefined"){Namespace("SiebelApp.OffResponseProcessor");SiebelApp.OffResponseProcessor=(function(){var q=SiebelJS.Dependency("SiebelApp.Constants");var r=SiebelApp.Offlineconstants;SiebelApp.S_App.constructor.prototype.childBCArray=[];SiebelApp.S_App.constructor.prototype.bcArray=[];SiebelApp.S_App.constructor.prototype.bcIndex=0;SiebelApp.S_App.constructor.prototype.ProcessResponse=function(x){if(IsOfflineModeEnabled()&&(SiebelApp.OfflineAppSettings.GetMode()===true)){return n.call(this,x)}else{return SiebelApp.S_App.DelegateResponse(x)}};var e=SiebelApp.S_App.InitExecContext;SiebelApp.S_App.constructor.prototype.InitExecContext=function(x){e.call(this,x);this.OfflineCallMethod("SetSRN");SiebelJS.Log("app:InitExecContext")};function m(x){SiebelApp.S_App.childBCArray.push(x)}function w(){return SiebelApp.S_App.bcArray}function s(){return SiebelApp.S_App.childBCArray}function v(){return SiebelApp.S_App.bcIndex}function c(){SiebelApp.S_App.childBCArray=[]}function j(x){SiebelApp.S_App.bcArray.push(x)}function b(){SiebelApp.S_App.bcArray=[]}function i(x){SiebelApp.S_App.bcIndex=x}function a(){SiebelApp.S_App.bcIndex=0}function n(z){var y=CCFMiscUtil_CreatePropSet();y.DecodeFromString(z);var x=q.get("SWE_PST_APP_INFO");if(y.GetChildByType(x)){return u.call(this,z)}else{return SiebelApp.S_App.DelegateResponse(z)}}function u(ad){try{var Z=CCFMiscUtil_CreatePropSet();Z.DecodeFromString(ad);var D=null;var z=q.get("SWE_PST_APP_INFO");var E=Z.GetProperty(q.get("SWE_RPC_PROP_VIEW"));var aa=q.get("SWE_PST_NEW_VIEW");var y=q.get("SWE_PST_NEW_BUSOBJ");var P=[];var ae;var Q=Z.GetChildByType(z);var N=Q.GetType();var J=q.get("SWE_PROP_PARENT_ID");var X=q.get("SWE_RPC_PROP_NOTIFICATION");var B=q.get("SWE_PROP_SESSION_RANDOM_NUMBER");if(Z.GetProperty(B)){Z.SetPropertyStr(B,"")}var ac=Z.GetChildCount();for(var I=0;I<ac;I++){var G=Z.GetChild(I);var F=G.GetType();if(F===X){Z.RemoveChild(I);break}}var S=Z.GetProperty(q.get("SWE_RPC_PROP_RETURN_STATUS"));var A=Z.GetProperty(q.get("SWE_RPC_PROP_URL"));if(A&&S){var ai=utils.DecodeFromQueryString(A);if(ai){ai.SetProperty(q.get("SWE_RPC_PROP_RETURN_STATUS"),S);var ag=utils.EncodeToQueryString(ai,false);Z.SetProperty(q.get("SWE_RPC_PROP_URL"),(SiebelApp.S_App.GetPageURL()+q.get("SWE_ARG_START")+ag))}}D=Q;var H;if(D){var x=D.GetChildByType(aa);if(x){ae=x}else{ae=D}H=ae.GetChildByType(q.get("SWE_PST_VIEW_INFO"))}var R=0;var U=null;var ab=null;var L=null;ae=D.GetChildByType(y);if(!ae){ae=D}var af=ae.GetChildByType(q.get("SWE_PST_BUSOBJ_INFO"));if(Z.propArray.Status!=="NewPopup"){SiebelApp.OfflineAppMgr.SetContextParam(af.propArray.n,af.GetChildCount())}var T=af.GetChildCount();var V=[];for(var Y=0;Y<T;Y++){var M=af.GetChild(Y);var C={};if(M){var ah=M.GetChildByType(q.get("SWE_PST_BUSCOMP_INFO"));if(ah){L=ah.GetProperty(J);if(L){m.call(this,ah)}else{j.call(this,ah)}C.id=ah.GetValue();C.name=ah.GetProperty("n");V.push(C)}}}P=f.call(this,H,V);var W=w.call(this);if(W.length){var K=false;return k.call(this,W[0],P,E,Z,0,K)}}catch(O){b.call(this);a.call(this)}}function p(z,A,C,y,x,B){k.call(this,z,A,C,y,x,B)}function f(C,V){var U=[];var E;var H;var P;var N=C.GetChildCount();var B=false;if(SiebelApp.OfflineAppMgr.GetAppContext().ReqType===r.get("EDIT_FIELD")){B=true}if((SiebelApp.OfflineDataMgr.GetRecordParam()).State||B){var M=SiebelApp.S_App.GetActiveView();var S=M.GetAppletMap();var D=Object.keys(S);var F=D.length;var Q;var J;var y;var G;for(var L=0;L<F;L++){E=S[D[L]].GetBusComp().GetName();d.call(this,E,S[D[L]].GetName(),U);if(((SiebelApp.OfflineDataMgr.GetRecordParam()).State===q.get("SWE_PST_APPLET_MODE_EDIT")||(SiebelApp.OfflineDataMgr.GetRecordParam()).State===q.get("SWE_PST_APPLET_MODE_NEW")||B)&&S[D[L]].GetName()===((SiebelApp.OfflineDataMgr.GetRecordParam()).AppletName)){Q=S[D[L]].GetFullId();J=S[D[L]].GetBusComp().GetSelection();y=S[D[L]].GetView().GetName();G=S[D[L]].GetName();if(J<0){J=0}}}if(Q||(B&&G)){for(P=0;P<N;P++){H=C.GetChild(P);if(B){if((H.GetType()===q.get("SWE_PST_NEW_LIST_APPLET"))){H=H.GetChildByType(q.get("SWE_PST_APPLET_INFO"))}}if(H&&((H.GetType()===q.get("SWE_PST_APPLET_INFO")))&&((H.GetValue()===Q))||(B&&G)){if(B){var x="_";x=x.concat(G.toString(),r.get("SHOW_POP_UP").length,"_");H.SetPropertyStr(q.get("SWE_PROP_POP_BKMARK"),x)}var I=H.GetChildByType(q.get("SWE_PST_CNTRL_LIST"));if(I){var O=I.GetChildCount();for(var T=0;T<O;T++){var A=I.GetChild(T);if(A.GetType()===q.get("SWE_PST_CNTRL")){var R=A.GetChildByType(q.get("SWE_PST_INVK_MTHD_PARAMS"));if(!B){if(R&&R.GetProperty(q.get("SWE_ROW_STR"))){R.SetPropertyStr(q.get("SWE_ROW_STR"),J.toString())}}else{if(B&&R){if(R.GetProperty(q.get("SWE_VIEW_ARG"))){R.SetPropertyStr(q.get("SWE_VIEW_ARG"),y.toString())}if(R.GetProperty(q.get("SWE_POST_FORCE_STR"))){R.SetPropertyStr(q.get("SWE_POST_FORCE_STR"),G.toString())}}}}}}break}}}}if(!(SiebelApp.OfflineDataMgr.GetRecordParam()).State||B){for(P=0;P<N;P++){H=C.GetChild(P);if(H&&(H.GetType()===q.get("SWE_PST_NEW_APPLET")||H.GetType()===q.get("SWE_PST_NEW_LIST_APPLET"))){var K=H.GetChildByType(q.get("SWE_PST_APPLET_INFO"));var z=K.GetProperty(q.get("SWE_PST_BUSCOMP_INFO"));E=h.call(this,z,V);d.call(this,E,K.GetProperty(q.get("SWE_PROP_NAME")),U)}}}return U}function h(B,y){var z="";var x=y.length;for(var A=0;A<x;A++){if(y[A].id===B){z=y[A].name;break}}return z}function d(C,z,B){var x=B.length;var D=0;for(var y=0;y<x;y++){if(B[y].bci===C){D=1;break}}if(!D){var A={};A.bci=C;A.applet=z;B.push(A)}}function l(B,A){var x=A.length;var y=null;for(var z=0;z<x;z++){if(A[z].bci===B){y=A[z].applet;break}}return y}function g(E){var A=w.call(this);var z=A.length;var y=null;for(var B=0;B<z;B++){var G=A[B];var x=G.GetValue();if(x===E){var H=G.GetChildByType(q.get("SWE_PST_REC_LIST"));var D=H.GetChildByType(q.get("SWE_PROP_RECORD"));if(D){y=D.GetProperty(q.get("SWE_PROP_ID"))}break}}var C;var I=SiebelApp.OfflineAppMgr.GetAppContext();var F=I.BC.length;for(var J=0;J<F;J++){if((I.BC[J].ParentBC===undefined)){C=I.BC[J].Name}}C=SiebelApp.OfflineUtils.RemoveNonAlphaChars(C);if(SiebelApp.BrowserCacheMgr.CheckContext(C)){I=SiebelApp.OfflineAppMgr.GetAppContext();if(I.RowId!==""&&I.RowId!==undefined){y=I.RowId}}return y}function t(y,x){var z=new $.Deferred();var B=y.EncodeAsString();o.call(this);var A=x.DelegateResponse(B);A.done(function(){z.resolve()});return z.promise()}function o(){b.call(this);c.call(this);a.call(this)}function k(aq,R,D,ai,T,K){var ag=q.get("SWE_PROP_NAME");var I=q.get("SWE_PROP_PARENT_ID");var ao=q.get("SWE_PROP_LAST_RECORD");var ac=q.get("SWE_PROP_RECORD");var G=q.get("SWE_PROP_ID");var Z=w.call(this).length;var V=aq.GetProperty(ag);var ak=aq.GetValue();var L=new $.Deferred();if(ai.propArray.Status!=="NewPopup"){SiebelApp.OfflineAppMgr.SetBCContext(V,ak,aq.GetProperty(I))}var P=aq.GetChildByType(q.get("SWE_PST_FIELD_LIST"));var x=[];for(var am=0;am<P.GetChildCount();am++){var C=P.GetChild(am);if(C&&C.GetType()===q.get("SWE_PROP_NOTI_FIELD")){x.push(SiebelApp.S_App.LookupStringCache(C.GetProperty(ag)))
}}var O=aq.GetChildByType(q.get("SWE_PST_REC_LIST"));var Y=O.GetChildByType(ao);var ap=null;var J;var F="";var S;if(Y){ap=Y.Clone();S=Y.Clone();ap.SetType(ac);ap.SetPropertyStr(G,F);var H=false;var Q=SiebelApp.OfflineAppMgr.GetAppContext();var U=(Q.ReqType===r.get("NEWRECORD"))||(Q.ReqType===r.get("CREATERECORD"));var ae=Q.ReqType===r.get("EDITRECORD");if(ai.propArray.Status!=="NewPopup"||((ai.propArray.Status!=="NewPopup")&&!U)){if(K===true&&!U&&!ae){Q.RowChildNum=0}if(Q.RowChildNum!==undefined){for(var aa=0;aa<Q.BC.length;aa++){if(Q.BC[aa].ParentBC!==undefined){O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),Q.RowChildNum)}}for(var ah=0;ah<((Q.BC.length<Q.prevBC.length)?Q.BC.length:Q.prevBC.length);ah++){if((Q.BC[ah].Name!==Q.prevBC[ah].Name)){O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),0)}else{if(Q.prevBC.length===Q.BC.length){for(var aj=0;aj<Q.BC.length;aj++){if(!U&&!ae){if(Q.BC[aj].Name===Q.prevBC[aj].Name){O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),0)}}}}}}}if(SiebelApp.BrowserCacheMgr.CheckContext(aq.GetProperty(ag))){Q=SiebelApp.OfflineAppMgr.GetAppContext();var an=SiebelApp.OfflineDataMgr.GetRecordParam();var W=SiebelApp.OfflineAppMgr.GetAppContext().RowNum?SiebelApp.OfflineAppMgr.GetAppContext().RowNum:0;O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),W);for(var ad=0;ad<((Q.BC.length<Q.prevBC.length)?Q.BC.length:Q.prevBC.length);ad++){if(((U||ae)&&Q.BC[ad].Name===Q.prevBC[ad].Name)&&Q.nBC===1){O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),SiebelApp.OfflineAppMgr.GetAppContext().RowNum?SiebelApp.OfflineAppMgr.GetAppContext().RowNum:0)}}}}if(ai.propArray[r.get("STATUS")]===r.get("NEWPOPUP")&&O){O.SetPropertyStr(q.get("SWE_PROP_ACTIVE_ROW"),0)}var E=O.GetChildCount();for(var al=0;al<E;al++){var ab=O.GetChild(0);if(ab&&(ab.GetType()===ac||ab.GetType()===ao)){O.RemoveChild(0)}}}var M=l.call(this,V,R);var y=null;var X=v.call(this);var A=SiebelApp.S_App;if(K){var N=aq.GetProperty(I);if(N&&N!==""){y=g.call(this,N);if(y===null){O.AddChild(S);if(T<(Z-1)){++T;p.call(this,s.call(this)[T],R,D,ai,T,true);O.AddChild(S);return}else{if(X===Z){O.AddChild(S);var z=t.call(this,ai,A);z.done(function(){L.resolve()});return}}}}}if(x.length&&V&&M){var B=this;var af=SiebelApp.S_App.GetActiveView();SiebelApp.BrowserCacheMgr.GetRawRecordSet(D,M,V,x,y,function(ay){X++;SiebelApp.OfflineUtils.Log(V+"....Received some data from BrowserStore");if(ay.length!==0){SiebelApp.OfflineUtils.Log(V+"....Received "+ay.length+" records")}else{if(af){var az=af.GetApplet(M);if(az&&az.GetRecordSet()&&(az.GetRecordSet().length===0)&&((SiebelApp.OfflineDataMgr.GetRecordParam()).State===q.get("SWE_PST_APPLET_MODE_EDIT"))){alert("No Records to Update");SiebelApp.S_App.uiStatus.Free();SiebelApp.OfflineDataMgr.SetNewRecordCommit(false);SiebelApp.OfflineDataMgr.SetRecordParam(false);o.call(this);return}}}if(Y){var aB=ay.length;if(aB){for(var at=0;at<aB;at++){var au="";var ax="";au=ay[at].id;ax=ay[at].value;var aw=ap.Clone();aw.SetPropertyStr(G,au);aw.SetPropertyStr(q.get("SWE_PROP_VALUE"),ax);O.AddChild(aw)}}O.AddChild(S);var aA;if(T<(Z-1)){++T;aA=K?s.call(this)[T]:w.call(this)[T];p.call(this,aA,R,D,ai,T,K)}if(!K&&X===Z){if(s.call(this).length){a.call(this);K=true;aA=s.call(this)[0];p.call(this,aA,R,D,ai,0,K)}else{var ar=t.call(this,ai,A);ar.done(function(){L.resolve()})}}else{if(K&&X===Z){var av=t.call(this,ai,A);av.done(function(){L.resolve()})}}}})}return L.promise()}}())};