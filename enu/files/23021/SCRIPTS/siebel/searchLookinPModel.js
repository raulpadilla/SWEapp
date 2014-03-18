if(typeof(SiebelAppFacade.SearchLookinPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.SearchLookinPresentationModel");if(typeof(SiebelApp)!="undefined"&&typeof(SiebelApp.S_App)!="undefined"){if(typeof(SiebelApp.Constants)!="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_SEARCH_LOOKIN_PMODEL"),"SiebelAppFacade.SearchLookinPresentationModel")}}SiebelAppFacade.SearchLookinPresentationModel=(function(){var g=SiebelJS.Dependency("SiebelApp.Constants");var c=SiebelJS.Dependency("SiebelApp.Utils");var b="";var f=CCFMiscUtil_CreatePropSet();var e="";var d="";function a(h){SiebelAppFacade.SearchLookinPresentationModel.superclass.constructor.call(this,h)}SiebelJS.Extend(a,SiebelAppFacade.PresentationModel);a.prototype.Init=function(){this.AddProperty("GetContainer","s_srch");this.AddProperty("GetTitle","srch");this.AddProperty("GetSearchOutput","");this.AddProperty("GetSearchOutputFromAdvSearch","");this.AddProperty("GetAdvSearchOutputForCategory","");this.AddProperty("GetAdvSearchOutputForDataSource","");this.AddProperty("GetAdvSearchOutputForFileFormat","");this.AddProperty("GetSearchPrefOutputForSort","");this.AddProperty("GetSearchPrefOutputForPage","");this.AddProperty("ShowSearchResultsDialog","");this.AddProperty("ShowSearchResultsDialogFromAdvSearch","");this.AddProperty("showAdvancedSearchPopup","");this.AddProperty("showSearchPreferencePopup","");this.AddProperty("fillLookin","");this.AddProperty("SetLookinInput","");this.AddProperty("Freetext","");this.AddProperty("BCType","");this.AddProperty("Collection","");this.AddProperty("Fileformat","");this.AddProperty("SearchType","");this.AddProperty("Contains AND","");this.AddProperty("Contains NOT","");this.AddProperty("Contains EXACT","");this.AddProperty("Contains OR","");this.AddProperty("SEARCH_PER_PAGE","");this.AddProperty("SEARCH_SORT","");this.AddProperty("SearchResultSamePage","");this.AddProperty("DS","");this.AddProperty("GetSearchError","");this.AddProperty("Sort","");this.AddMethod("InvokeServiceMethod",function(z,h,v){var u=SiebelApp.S_App.GetService("Invoke Search");if(u){var q=0;var o=[];var t=[];v=u.InvokeMethod("GetOUISearchLookinValues",h);var p=v.GetChildCount();for(q=0;q<p;q++){var x=v.GetChild(q);if(x){var n=0;var m=x.GetChildCount();for(n=0;n<m;n++){var w=x.GetChild(n);var r=w.GetType();if(r==="CategoryType"){t.push(w.GetProperty("busCompName"+n))}else{if(r==="AllType"){var l=n+1;o.push(w.GetProperty("busCompName"+l))}else{if(r==="ParentType"){t.push(w.GetProperty("busCompName"+n))}else{if(r==="DataSrcType"){t.push(w.GetProperty("busCompName"+n));f.SetProperty("DS",w.GetProperty("busCompName"+n))}}}}}}}var s=0;var A="";var y=t.length;for(s=0;s<y;s++){A=t[s];o.push(A)}this.SetProperty("SetLookinInput",o);this.SetProperty("fillLookin",true)}});this.AttachEventHandler("OnLoadSearch",function(){var i=CCFMiscUtil_CreatePropSet();var h=CCFMiscUtil_CreatePropSet();this.ExecuteMethod("InvokeServiceMethod","GetOUISearchLookinValues",i,h)});this.AttachEventHandler("OnExecuteSearch",function(){var p=CCFMiscUtil_CreatePropSet();var t=CCFMiscUtil_CreatePropSet();var l=this.Get("SearchType");var o=this.Get("BCType");p.SetProperty("Sort",d);if(SiebelApp.S_App.GetActiveView()){var h=SiebelApp.S_App.GetActiveView().GetName();if(h===b){p.SetProperty("SearchResultSamePage",true)}}if(l==="BASIC"){var u=this.Get("Freetext");p.SetProperty("Freetext",u);if(f.GetPropertyCount()>0){var k=f.GetProperty("DS");var y=k.length;var r="1#"+y+"#"+k;if(r===o){p.SetProperty("BCType","");p.SetProperty("Collection","1#"+y+"#"+k)}else{p.SetProperty("BCType",o);p.SetProperty("Collection","1#7#buscomp")}}else{p.SetProperty("BCType",o);p.SetProperty("Collection","1#7#buscomp")}}else{if(l==="ADVANCED"){p.SetProperty("ContainsANDtext",this.Get("Contains AND"));p.SetProperty("ContainsNOTtext",this.Get("Contains NOT"));p.SetProperty("ContainsEXACTtext",this.Get("Contains EXACT"));p.SetProperty("ContainsORtext",this.Get("Contains OR"));p.SetProperty("Fileformat",this.Get("Fileformat"));p.SetProperty("BCType",o);p.SetProperty("Freetext","");p.SetProperty("Collection",this.Get("Collection"))}}var B=SiebelApp.S_App.GetService("Invoke Search");if(!B){return}t=B.InvokeMethod("Search",p);var s=CCFMiscUtil_CreatePropSet();var x=0;var n;s.SetType("Result");var z=t.GetChildCount();b=t.GetChild(0).GetProperty("GotoOUIResultsView");for(x=0;x<z;x++){var v=t.GetChild(x);if(v){if(v.GetType()==="ResultSet"){var w=0;var q=v.GetChildCount();for(w=0;w<q;w++){var A=v.GetChild(w);if(A){var m=CCFMiscUtil_CreatePropSet();m.SetProperty("DataSource",A.GetProperty("DataSource"));m.SetProperty("Date",A.GetProperty("Date"));m.SetProperty("Title",A.GetProperty("Title"));m.SetProperty("Summary",A.GetProperty("Summary"));s.AddChild(m)}}}else{if(v.GetType()==="Errors"){var A=v.GetChild(0);n=A.GetProperty("ErrMsg")}}}}if(l==="BASIC"){this.SetProperty("GetSearchOutput",s);this.SetProperty("GetSearchError",n);this.SetProperty("ShowSearchResultsDialog",true)}else{if(l==="ADVANCED"){this.SetProperty("GetSearchOutputFromAdvSearch",s);this.SetProperty("GetSearchError",n);this.SetProperty("ShowSearchResultsDialogFromAdvSearch",true)}}});this.AttachEventHandler("OnExecuteShowAllSearchResults",function(){SiebelApp.S_App.GotoView(b)});this.AttachEventHandler("OnExecuteAdvancedSearch",function(){var h=CCFMiscUtil_CreatePropSet();var s=CCFMiscUtil_CreatePropSet();h.SetProperty("Freetext",this.Get("Freetext"));h.SetProperty("BCType",this.Get("BCType"));h.SetProperty("Collection","1#7#buscomp");var p=SiebelApp.S_App.GetService("Invoke Search");if(!p){return}s=p.InvokeMethod("Search",h);var k=CCFMiscUtil_CreatePropSet();k.SetType("Result");var o=0;for(o=0;o<s.GetChildCount();o++){var l=0;var r=s.GetChild(o);if(r){var m=r.GetChildCount();for(l=0;l<m;l++){var q=r.GetChild(l);if(q){var n=CCFMiscUtil_CreatePropSet();n.SetProperty("DataSource",q.GetProperty("DataSource"));n.SetProperty("Date",q.GetProperty("Date"));n.SetProperty("Title",q.GetProperty("Title"));n.SetProperty("Summary",q.GetProperty("Summary"));k.AddChild(n)}}}}this.SetProperty("GetSearchOutputFromAdvSearch",k);this.SetProperty("ShowSearchResultsDialogFromAdvSearch",true)});this.AttachEventHandler("OnLoadAdvancedSearch",function(){var h=CCFMiscUtil_CreatePropSet();var r=CCFMiscUtil_CreatePropSet();var q=SiebelApp.S_App.GetService("Invoke Search");if(q){var o=0;var m=[];var u=[];r=q.InvokeMethod("GetOUISearchLookinValues",h);var n=r.GetChildCount();for(o=0;o<n;o++){var t=r.GetChild(o);if(t){var l=0;var k=t.GetChildCount();for(l=0;l<k;l++){var s=t.GetChild(l);var p=s.GetType();if(p==="CategoryType"){m.push(s.GetProperty("busCompName"+l))}else{if(p==="DataSrcType"){u.push(s.GetProperty("busCompName"+l))}}}}}var w=[];r=q.InvokeMethod("GetFileFormatLOVValues",h);for(o=0;o<n;o++){var t=r.GetChild(o);if(t){var l=0;var v=t.GetPropertyCount();if(t.GetType()==="ResultSet"){for(l=0;l<v;l++){w.push(t.GetProperty("Search File Format"+l))}}}}this.SetProperty("GetAdvSearchOutputForCategory",m);
this.SetProperty("GetAdvSearchOutputForFileFormat",w);this.SetProperty("GetAdvSearchOutputForDataSource",u);this.SetProperty("showAdvancedSearchPopup",true)}});this.AttachEventHandler("OnLoadSearchPreference",function(){var h=CCFMiscUtil_CreatePropSet();var r=CCFMiscUtil_CreatePropSet();var p=SiebelApp.S_App.GetService("Invoke Search");if(p){var q=[];r=p.InvokeMethod("GetPageLOVValues",h);var m=r.GetChildCount();var n=0;for(n=0;n<m;n++){var s=r.GetChild(n);if(s){var t=s.GetPropertyCount();if(s.GetType()==="ResultSet"){var l=0;for(l=0;l<t;l++){if(s.GetProperty("Search Per Page"+l)==="10"){q.push(s.GetProperty("Search Per Page"+l))}}}}}var o=[];r=p.InvokeMethod("GetSortLOVValues",h);for(n=0;n<m;n++){var s=r.GetChild(n);if(s){var l=0;var k;var t=s.GetPropertyCount();if(s.GetType()==="ResultSet"){for(l=0;l<t;l++){o.push(s.GetProperty("Search Sort"+l));if(o[l]===d&&l!=0){k=o[0];o[0]=o[l];o[l]=k}}}}}this.SetProperty("GetSearchPrefOutputForSort",o);this.SetProperty("GetSearchPrefOutputForPage",q);this.SetProperty("showSearchPreferencePopup",true)}});this.AttachEventHandler("OnExecuteSavePreference",function(){var j=CCFMiscUtil_CreatePropSet();var i=CCFMiscUtil_CreatePropSet();j.SetProperty("SEARCH_PER_PAGE",this.Get("SEARCH_PER_PAGE"));j.SetProperty("SEARCH_SORT",this.Get("SEARCH_SORT"));e=this.Get("SEARCH_PER_PAGE");d=this.Get("SEARCH_SORT");var h=SiebelApp.S_App.GetService("Invoke Search");if(!h){return}i=h.InvokeMethod("SaveSearchPreference",j)})};return a}())};