if(typeof(SiebelApp.S_App.ListApplet)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.ListApplet");SiebelApp.S_App.ListApplet=(function(){var r=SiebelJS.Dependency("SiebelApp.Utils");var m=SiebelJS.Dependency("SiebelApp.Constants");var c=m.get("SWE_PST_COL_LIST");var v=m.get("SWE_FIELD_STR");var a=m.get("SWE_ROW_STR");var f=m.get("SWE_ROW_ID_STR");var u=m.get("SWE_APPLET_STR");var i=m.get("SWE_ACTIVE_APPLET_STR");var q=m.get("SWE_ROW_IDS_STR");var p=m.get("SWE_METHOD_STR");var k=m.get("SWE_VIEW_ID_STR");var b=m.get("SWE_VIEW_ARG");var d=m.get("SWE_REQ_ROW_ID_STR");var h=m.get("SWE_SHOW_POPUP_STR");function e(){SiebelApp.S_App.ListApplet.superclass.constructor.call(this);var x={};var y=[];var z="";var w=m.get("DELT_ROWCOUNT");this.GetRowListRowCount=function(){return Number(w)};this.SetRowListRowCount=function(A){w=A};this.GetRowsSelectedArray=function(){return y};this.GetListCol=function(A){return x[A]};this.GetListOfColumns=function(){return x};this.RemoveColumns=function(){x=null;x={}};this.GetListPrefs=function(){return z};this.SetListPrefs=function(A){z=A};this.GetBeginRow=function(){return(this.GetBusComp().GetNotifyObject().GetBegRow(this.GetName()))}}SiebelJS.Extend(e,SiebelApp.S_App.Applet);function n(w){this.GetListOfColumns()[w.GetName()]=w;this.GetControls()[w.GetName()]=w}e.prototype.EndLife=function(){var w=this.GetListOfColumns();for(var x in w){if(w.hasOwnProperty(x)){delete w[x]}}w=null;SiebelApp.S_App.ListApplet.superclass.EndLife.call(this)};e.prototype.GetPropArray=function(){var w=SiebelApp.S_App.ListApplet.superclass.GetPropArray.call(this);return w.concat(["GetListOfColumns","GetRowsSelectedArray","GetRowIdentifier","HasHierarchy","GetRowListRowCount","GetBeginRow"])};e.prototype.Show=function(){if(this.GetListPrefs()&&this.HasDynamicColumns()){g.call(this)}SiebelApp.S_App.ListApplet.superclass.Show.call(this)};e.prototype.ShowOnly=function(){if(this.GetListPrefs()&&this.HasDynamicColumns()){g.call(this)}SiebelApp.S_App.ListApplet.superclass.ShowOnly.call(this)};function g(){var w=m.get("SWE_LPF_TILDE");var K=m.get("SWE_LPF_PIPE");var G="";var F="";var y="";var L=0;var C=0;var D=null;var x=this.GetListOfColumns();var A="";var J=[];var B=0;var H=0;var E=[];if(!x){return}for(var z in x){if(x.hasOwnProperty(z)){++H}}A=this.GetListPrefs();B=A.indexOf(w);if(B<0){A=""}else{J=A.split(w)}for(var M=1;M<J.length&&C<H;M++){E=[];F=J[M];E=F.split(K);if(E.length>0&&E[0]==="0"){y=E[1];L=E[2]}else{continue}for(var I in x){D=x[I];if(D.GetName()===y){this.GetListOfColumns()[I].SetColNum(C);C++;break}}}for(var O in x){if(r.IsTrue(x[O].IsDynamic())){for(var N in x){if((x[N].GetColNum()>=x[O].GetColNum())&&!r.IsTrue(x[N].IsDynamic())){this.GetListOfColumns()[N].SetColNum(x[N].GetColNum()+1)}}}}}e.prototype.HasDynamicColumns=function(){var x=this.GetListOfColumns();if(x){for(var w in x){if(r.IsTrue(x[w].IsDynamic())){return true}}}return false};e.prototype.Initialize=function(){var w=this.GetBusComp();if(w){w.SetWorkSetSize(this.GetName(),this.GetRowListRowCount())}SiebelApp.S_App.ListApplet.superclass.Initialize.call(this)};e.prototype.GetMethodArray=function(){var w=SiebelApp.S_App.ListApplet.superclass.GetMethodArray.call(this);return w.concat(["HandleRowSelect","OnVerticalScroll","SetMultiSelectMode","OnClickSort","OnCtrlBlur","OnCtrlFocus","OnDrillDown","CellChange"])};e.prototype.ProcessSelfProps=function(w){SiebelApp.S_App.ListApplet.superclass.ProcessSelfProps.call(this,w);this.SetListPrefs(w.GetProperty(m.get("SWE_PROP_PREFERENCES")));var x=w.GetProperty(m.get("SWE_PROP_ROW_COUNT"));if(!r.IsEmpty(x)){this.SetRowListRowCount(x)}this.SetOnLoadRowSelection(w)};e.prototype.ProcessListControlInfo=function(w){var x=new SiebelApp.S_App.AppletControl();x.SetApplet(this);x.ProcessObjectInfo(w);n.call(this,x)};e.prototype.ProcessChildrenProps=function(B){var y=r.Curry(SiebelApp.S_App.constructor.prototype.DefineAccessor,this,B);var x=B.GetType();var A=m.get("SWE_PST_ACCESSIBILITY_INFO");var z=m.get("SWE_PST_REMOVE_COL_LIST");switch(x){case c:var w=B.EnumChildren(true);do{this.ProcessListControlInfo(w)}while((w=B.EnumChildren(false)));break;case z:this.RemoveColumns();SiebelApp.S_App.ListApplet.superclass.ProcessChildrenProps.call(this,B);break;case A:y("GetRowIdentifier","SWE_PST_ACCESSIBILITY_ROWID");if(this.GetRowIdentifier()==undefined){this.GetRowIdentifier=function(){return""}}SiebelApp.S_App.ListApplet.superclass.ProcessChildrenProps.call(this,B);break;default:SiebelApp.S_App.ListApplet.superclass.ProcessChildrenProps.call(this,B);break}if(this.GetRowIdentifier==undefined||this.GetRowIdentifier()==undefined){this.GetRowIdentifier=function(){return""}}};e.prototype.SetOnLoadRowSelection=function(w){var A=w.GetProperty(m.get("SWE_PROP_ROW_SELECTION"));if(!r.IsEmpty(A)){var x=[];CCFMiscUtil_StringToArray(A,x);s.call(this,null,x)}else{var z=this.GetSelection();if(!r.IsEmpty(z)){for(var y=0;y<z;y++){this.GetRowsSelectedArray()[y]=false}this.GetRowsSelectedArray()[y]=true}}return true};function s(x,z){if(!this.CanUpdateUI()){return}if(z.length>0){var w=z[0];if(w===this.GetName()){z.shift();t.call(this,z);var y={};y.ev=m.get("EVENT_ROW_SELECTION");this.SetUIEventMap(y)}}}function t(y){this.GetRowsSelectedArray().splice(0,this.GetRowsSelectedArray().length);var x;for(var w=0;w<y.length;w++){switch(y[w]){case"0":x=false;break;case"1":x=true;break;default:continue}this.GetRowsSelectedArray().push(x)}}e.prototype.NotifyGeneric=function(x,w){if(x==="SWEIRowSelection"){s.call(this,x,w)}else{SiebelApp.S_App.ListApplet.superclass.NotifyGeneric.call(this,x,w)}};function l(x,A){var z=this.GetMapFields();var y=null;if(z!==null&&z!=="undefined"&&r.IndexOf(z,A)>-1){for(var w=0;w<z.length;w++){y=x[z[w]];return y}}}e.prototype.GetRecordSet=function(){SiebelApp.S_App.ListApplet.superclass.GetRecordSet.call(this);var B=this.GetBusComp().GetFieldList();var x=this.GetBusComp().GetRawRecords().length;var E=[];var G=this.GetBusComp().GetRecordSet();var A;var H;var y=null;if(this.IsInQueryMode()){E[0]=this.GetEmptyRecordForQuery()}else{for(var z=0;z<x;z++){var D={};for(var I=0;I<B.length;I++){var J=B[I];J=SiebelApp.S_App.LookupStringCache(J);var F=this.GetListOfColumns();A=null;for(var K in F){if(F.hasOwnProperty(K)){var w=F[K];var C=w.GetFieldName();if(C===J){A=w}}}H="";if(!r.IsEmpty(A)){H=this.GetFormattedFieldValue(A,true,z)}else{y=l.call(this,G[z],J);if(!r.IsEmpty(y)){H=y}}D[J]=H}D["Outline Number"]=G[z]["Outline Number"];D["Has Children"]=G[z]["Has Children"];D["Is Expanded"]=G[z]["Is Expanded"];E.push(D)}if(true==this.GetBusComp().IsHierarchyBusComp()){E=this.GetBusComp().UpdateHierInfo(E)}}return E};e.prototype.GetAllFieldValues=function(z,B){var x=this.GetBusComp();if(x.GetParentBusComp()){var y=this.GetListOfColumns();for(var w in y){if(y.hasOwnProperty(w)){var A=y[w];z.SetProperty(A.GetSpanPrefix()+B,x.GetFieldValue(A.GetFieldName()))}}}};e.prototype.GetDrilldownURL=function(w,A,z){var y=CCFMiscUtil_CreatePropSet();var x=this.GetListCol(w);w=x.GetSpanPrefix()+A;y.SetProperty(v,w);
y.SetProperty(a,A);y.SetProperty(f,z);this.GetRowIds(y);this.GetAllFieldValues(y,A);y.SetProperty(u,this.GetName());y.SetProperty(i,this.GetName());return SiebelApp.S_App.GetDrilldownURL(y)};e.prototype.OnDrillDown=function(x,C){var B=CCFMiscUtil_CreatePropSet();var A=this.GetListOfColumns();this.GetBusComp().SetCurRow(this.GetName(),C-1);var z;for(var y in A){if(A.hasOwnProperty(y)){if(x===y){z=A[y]}}}var w=z.GetSpanPrefix()+C;B.SetProperty(v,w);B.SetProperty(a,C);this.GetRowIds(B);B.SetProperty(u,this.GetName());B.SetProperty(i,this.GetName());if(!this.PostChangesToBC(true,null)){return false}this.InvokeMethod("Drilldown",B,true)};e.prototype.HandleRowSelect=function(A,B,y){var x=true;var C=new SiebelApp.UIStatus();if(this.IsInQueryMode()){return true}var z=CCFMiscUtil_CreatePropSet();var w="PositionOnRow";SiebelApp.S_App.OfflineCallMethod("HandleRowSelect",A);w+=((B===true)?"1":"0")+((y===true)?"1":"0")+"0";z.SetProperty(p,w);z.SetProperty(k,"");if(!r.IsEmpty(this.GetView())){z.SetProperty(b,this.GetView().GetName())}z.SetProperty(u,this.GetName());z.SetProperty(a,A);z.SetProperty(d,"1");z.SetProperty(h,"false");return this.InvokeMethod(w,z,true)};e.prototype.NotifyNewPrimary=function(B){var y=this.GetBusComp();var z;if(r.IsEmpty(y)){return}z=y.GetNotifyObject();if(!z||!z.Get_EnableUIUpdate(this.GetName())){return}var x;var A=y.GetRawRecords().length;var w=y.GetSelection();for(x=0;x<A;x++){y.SetSelection(x);this.RepopulateField(B,true)}y.SetSelection(w)};e.prototype.NotifyNewActiveRow=function(){var w=this.GetBusComp().GetNotifyObject();if(!w||!w.Get_EnableUIUpdate(this.GetName())){return}};e.prototype.NotifyEndQuery=function(){var w;if(r.IsEmpty(this.GetBusComp())){return}w=this.GetBusComp().GetNotifyObject();if(!w||!w.Get_EnableUIUpdate(this.GetName())){return}w.SetDoPopulate(this.GetName(),true);this.GetBusComp().SetSelection(this.GetBusComp().GetSelection());SiebelApp.S_App.ListApplet.superclass.NotifyEndQuery.call(this)};e.prototype.NotifyExecute=function(){var w;if(r.IsEmpty(this.GetBusComp())){return}w=this.GetBusComp().GetNotifyObject();if(!w||!w.Get_EnableUIUpdate(this.GetName())){return}w.SetDoPopulate(this.GetName(),true);this.GetBusComp().SetSelection(this.GetBusComp().GetSelection())};e.prototype.DoExecuteUIUpdate=function(){var x;if(r.IsEmpty(this.GetBusComp())){return}x=this.GetBusComp().GetNotifyObject();if(!x||!x.Get_EnableUIUpdate(this.GetName())){return}var w=this.GetBusComp().tempCommitPending;if(x.Get_DoPopulate(this.GetName())){this.RefreshData(true);this.ShowSelection();this.GetBusComp().tempCommitPending=false;if(SiebelApp.S_App.GetEnablePerfHooks()&&SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().TimePopulateApplet(this.GetName(),"Finished Populate Applet")}}if(this.GetUpdateConditionals()){this.UpdateConditionals()}this.InvokeStateChange();x.Set_DoPopulate(this.GetName(),false);this.SetScrollDir(null);this.SetScrollAmount(0)};e.prototype.OnCtrlFocus=function(z,y,x){var w=this.EnterField(y,x,false)};e.prototype.EnterField=function(y,w,x){if(this.GetView()){if(!(this.GetView().SetActiveApplet(this))){SiebelApp.S_App.ErrorObject.ProcessError();return false}}this.SetActiveControl(y);return true};e.prototype.OnCtrlBlur=function(y,x,w){return this.LeaveField(x,w,false)};e.prototype.LeaveField=function(A,E,B){var C=this.GetBusComp();var x=A.GetFieldName();if(!A&&!this.GetActiveControl()){return true}var w=this.GetFormattedValue(A);if(w!==E){SiebelApp.S_App.OfflineCallMethod("PassOldValue",this,A,E,w);var z=E;if(this.IsInQueryMode()&&!r.IsEmpty(x)){var D=A.GetUIType();if(D==m.get("SWE_CTRL_DATE_TZ_PICK")||D==m.get("SWE_CTRL_DATE_TIME_PICK")){if(E&&!E.match(/[><=!&|]/g)){z=SiebelApp.S_App.LocaleObject.GetStringFromDateTime(E,m.get("ISO_DATETIME_FORMAT"),SiebelApp.S_App.LocaleObject.GetDateFormat()+" "+SiebelApp.S_App.LocaleObject.GetTimeFormat());if(!r.IsEmpty(z)){z='"'+z+'"'}if(r.IsEmpty(z)&&!r.IsEmpty(E)){z='"'+E+'"'}}}else{if(D==m.get("SWE_CTRL_DATE_PICK")){if(E&&!E.match(/[><=!&|]/g)){z=SiebelApp.S_App.LocaleObject.GetStringFromDateTime(E,m.get("ISO_DATE_FORMAT"),SiebelApp.S_App.LocaleObject.GetDateFormat());if(r.IsEmpty(z)&&!r.IsEmpty(E)){z='"'+E+'"'}}}}if(!r.IsEmpty(x)){C.GetFieldMap()[x].SetSearchSpec(z)}var y=C.GetNotifyObject();y.NotifyNewFieldQuerySpec(x)}else{if(this.CanUpdate(A.GetName())&&this.IsPrivateField(A.GetName())||C.GetSelection()>=0){if(SiebelApp.S_App.LocaleObject){var D=A.GetUIType();if(D==m.get("SWE_CTRL_DATE_TZ_PICK")||D==m.get("SWE_CTRL_DATE_TIME_PICK")){z=SiebelApp.S_App.LocaleObject.GetStringFromDateTime(E,m.get("ISO_DATETIME_FORMAT"),SiebelApp.S_App.LocaleObject.GetDateFormat()+" "+SiebelApp.S_App.LocaleObject.GetTimeFormat())}else{if(D==m.get("SWE_CTRL_DATE_PICK")){z=SiebelApp.S_App.LocaleObject.GetStringFromDateTime(E,m.get("ISO_DATE_FORMAT"),SiebelApp.S_App.LocaleObject.GetDateFormat())}}if(""===z&&""!==E){z=E}}if(!this.SetFormattedValue(A,z)){this.SetPrsrvControl(this.GetActiveControl());this.ProcessError();return false}}}}if(!B){if(this.GetActiveControl()){this.SetPrsrvControl(this.GetActiveControl());this.SetActiveControl(null)}}return true};e.prototype.SetFormattedValue=function(z,C){var w=z.GetName();var y=0;var x,B;if(this.IsPrivateField(w)){var D=this.GetPrivateFieldMap()[w];if(D.bInList&&this.GetBusComp()){y=this.GetBusComp().GetSelection()}if(D.valueArray.length>y){if(D.valueArray[y]!=C){this.GetPrivateFieldMap()[w].valueArray[y]=String(C);this.GetPrivateFieldMap()[w].bDirty=true}}else{this.GetPrivateFieldMap()[w].valueArray.push(C);this.GetPrivateFieldMap()[w].bDirty=true}this.CellChange(this.GetSelection(),w,C)}if(!r.IsEmpty(z.GetFieldName())){x=this.GetFormattedValue(z,true);B=this.GetBusComp().SetFormattedValue(z.GetFieldName(),C,z.GetDisplayFormat());if(!B){this.CellChange(this.GetSelection(),w,x);this.SetFocusToCtrl(w,true);return B}}else{return true}var A=this.GetBusComp().GetField(z.GetFieldName());C=this.GetFormattedValue(z,true);if(A&&(x!=C)&&(A.IsPostChanges()||A.IsBoundedPick())){B=this.PostChangesToBC(false,z.GetFieldName())}return B};e.prototype.OnClickSort=function(w,C){var z=this.GetListOfColumns();var y;for(var x in z){if(z.hasOwnProperty(x)){y=z[x];if(y.GetName()===w){break}}}var B=y.GetSpanPrefix()+"0";var A=CCFMiscUtil_CreatePropSet();A.SetProperty(v,B);switch(C){case"asc":this.InvokeMethod("SortAscending",A,true);break;case"desc":this.InvokeMethod("SortDescending",A,true);break;default:return}return};e.prototype.OnVerticalScroll=function(y){var w=null;var x=true;if(this.GetView()){if(!this.GetView().SetActiveApplet(this)){SiebelApp.S_App.ErrorObject.ProcessError();return false}}switch(y){case"pgup":w="GotoPreviousSet";break;case"pgdn":w="GotoNextSet";break;case"nxrc":w="GotoNext";break;case"pvrc":w="GotoPrevious";break;case"scrolldn":w="ScrollNextData";break;case"scrollup":w="ScrollPrevData";break;default:}if(w){var z=CCFMiscUtil_CreatePropSet();if((w==="ScrollPrevData"||w==="ScrollNextData")&&(SiebelApp.S_App.IsMobileApplication()==="true")){x=false}if(!this.CanInvokeMethod(w)){if(w==="GotoPreviousSet"&&this.GetBusComp().GetSelection()!==0&&this.GetBusComp().GetRawRecords().length>0){this.HandleRowSelect(0,false,false)
}else{if(w==="GotoNextSet"&&this.GetBusComp().GetSelection()!==(this.GetBusComp().GetRawRecords().length-1)&&this.GetBusComp().GetRawRecords().length>0){this.HandleRowSelect((this.GetBusComp().GetRawRecords().length-1),false,false)}}return}this.InvokeMethod(w,z,x)}};e.prototype.DoCollectFieldValues=function(y){var w=this.GetBusComp();if(w){var F="";var E=w.GetSelection();var D=this.GetListOfColumns();var x;var z="OF_";for(var G in D){if(D.hasOwnProperty(G)){var A=D[G];var C=A.GetFieldName();var B=A.GetName();if(C||this.IsPrivateField(B)){if(!this.CanUpdate(B)){continue}if(this.IsInQueryMode()){if(!r.IsEmpty(C)){y.SetProperty(A.GetSpanPrefix()+"0",(this.GetBusComp().GetFieldMap()[C]).GetSearchSpec())}}else{x=this.GetFormattedValue(A);y.SetProperty(A.GetSpanPrefix()+E,x);if(IsOfflineModeEnabled()){if(SiebelApp.OfflineAppSettings.GetMode()===true||(!navigator.onLine&&SiebelApp.OfflineAppMgr.GetCacheType()==="Reactive")){y.SetProperty(z+C,x)}}}}}}SiebelApp.S_App.ListApplet.superclass.DoCollectFieldValues.call(this,y)}};e.prototype.InvokeMethod=function(x,z,y){z=z||CCFMiscUtil_CreatePropSet();if(this.GetActiveControl()){if(x.indexOf("PositionOnRow")!==-1){return false}}var w=z.GetProperty(m.get("SWE_REQ_ROW_ID_STR"));if(w=="1"){var A=z.GetProperty(m.get("SWE_ROW_STR"));if(this.GetBusComp().GetSelection()!==Number(A)){var B;if(x.indexOf("PositionOnRow")!==-1){B=true}if(!this.PostChangesToBC(true,null,B)){return false}if(!this.GetBusComp().SetSelection(A)){return(false)}}}if(x.indexOf("PositionOnRow")!==-1){if(0){}else{this.GetBusComp().ClearUpdates();return(j.call(this,x,z))}}return(SiebelApp.S_App.ListApplet.superclass.InvokeMethod.call(this,x,z,y))};e.prototype.NotifyNewFieldData=function(w){this.RepopulateField(w)};e.prototype.NotifyNewDataWS=function(w){this.RepopulateField(w)};e.prototype.RepopulateField=function(y,x){var w=this.GetBusComp().GetIdValue();this.GetBusComp().SetCurRow(this.GetName(),this.GetBusComp().GetSelection());this.DoRepopulateField(w,y,x);SiebelApp.S_App.ListApplet.superclass.DoRepopulateField.call(this,y)};e.prototype.DoRepopulateField=function(w,D,B){var C;var z=this.IsInQueryMode();var A=this.GetListOfColumns();for(var E in A){if(A.hasOwnProperty(E)){var x=A[E];var y=x.GetFieldName();if(y===D){C=(z)?this.GetBusComp().GetFieldSearchSpec(D):this.GetFormattedFieldValue(x,B);this.CellChange(w,x.GetName(),C)}}}};e.prototype.CellChange=function(x,y,w){};e.prototype.DoSetAppletActive=function(w,x){if(!this.CanUpdateUI()){return true}this.SetHighlightState(w,x);SiebelApp.S_App.ErrorObject.ClearErrorMsg();return true};e.prototype.SetFocusToCtrl=function(w){};e.prototype.SetHighlightState=function(w,x){};e.prototype.HasHierarchy=function(){return this.GetBusComp().IsHierarchyBusComp()};e.prototype.GetFieldValue=function(B,w){var z="";var A=B.GetName();var C=B.GetFieldName();if(this.IsPrivateField(A)){var y=this.GetPrivateFieldMap()[A];if(y){var x=(y.bInList&&this.GetBusComp())?this.GetBusComp().GetSelection():0;if(w<y.valueArray.length){z=y.valueArray[w]}else{if(x<y.valueArray.length&&y.valueArray.length>0){z=y.valueArray[x]}}}}else{z=this.GetBusComp()?this.GetBusComp().GetFieldValue(C):""}return z};function o(y,x){var w;if(r.IsEmpty(this.GetBusComp())){return}w=this.GetBusComp().GetNotifyObject();if(!w||!w.Get_EnableUIUpdate(this.GetName())){return}if(!y){w.SetDoPopulate(this.GetName(),true)}}function j(x,A){var B="0";var z="0";var w="0";if(x.length>13){B=x.charAt(13);z=x.charAt(14);if(x.length>15){w=x.charAt(15)}}var y=A.Clone();y.SetProperty("SWEControlClicked",B);y.SetProperty("SWEShiftClicked",z);y.SetProperty("SWEIgnoreCtrlShift",w);return SiebelApp.S_App.ListApplet.superclass.InvokeMethod.call(this,"PositionOnRow",y)}return e}())};