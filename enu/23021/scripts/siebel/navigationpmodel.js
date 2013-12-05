if(typeof(SiebelAppFacade.NavigationPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.NavigationPresentationModel");if(typeof(SiebelApp)!="undefined"&&typeof(SiebelApp.S_App)!="undefined"){if(typeof(SiebelApp.Constants)!="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_UIDEF_SCR_PMODEL"),"SiebelAppFacade.NavigationPresentationModel")}}SiebelAppFacade.NavigationPresentationModel=(function(){var k=SiebelJS.Dependency("SiebelApp.Constants");var l=SiebelJS.Dependency("SiebelApp.Utils");var i=k.get("SWE_SCREEN_NAV_CONTROL_STR");var j=k.get("SWE_AGGR_VIEW_NAV_CONTROL_STR");var d=k.get("SWE_DET_VIEW_NAV_CONTROL_STR");var g=k.get("SWE_DET_SUB_VIEW_NAV_CONTROL_STR");function f(o,p){this.type=p;SiebelAppFacade.NavigationPresentationModel.superclass.constructor.call(this,o)}SiebelJS.Extend(f,SiebelAppFacade.PresentationModel);f.prototype.Init=function(){this.AddProperty("LevelPlaceholder","");this.AddProperty("GetType",this.type);this.AddProperty("placeholder",this.type===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")?k.get("SWE_PROP_NC_ID_SCREEN_CONTROL"):k.get("SWE_PROP_NC_ID_VIEW_CONTROL"));this.AddProperty("SubPlaceholder",k.get("SWE_PROP_NC_ID_SUB_VIEW_CONTROL"));this.AddProperty("IsScreen",(this.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")));this.AddProperty("GetTitle",SiebelApp.S_App.GetScreenNavTitle());if(this.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){this.AttachPSHandler(k.get("SWE_PROP_NC_SCREENCTRL_INFO"),function(o){c.call(this,o)});this.AttachPSHandler(k.get("SWE_PROP_NC_FLOATING_TAB_INFO"),function(o){b.call(this,o);c.call(this,o)});this.AttachPSHandler(k.get("SWE_PROP_NC_AGGREGATE_INFO"),function(o){b.call(this,o);c.call(this,o)})}else{this.AttachPSHandler(k.get("SWE_PROP_NC_SUBDETAIL_INFO"),function(o){b.call(this,o);c.call(this,o)});this.AttachPSHandler(k.get("SWE_PROP_NC_DETAIL_INFO"),function(o){b.call(this,o);c.call(this,o)})}this.AddMethod("Refresh",null,{core:true});this.AttachEventHandler("OnClick",function(o){return n.call(this,o)})};function n(o){var p="",q="";switch(o.level){case i:p=o.defaultViewName;q=q+"&SWECmd=GotoView&SWEView="+p+"&SWEKeepContext=0&SWENeedContext=false";break;case j:case d:case g:p=o.viewName;q=q+"&SWECmd=GotoView&SWEView="+p+"&SWEKeepContext=1&SWENeedContext=false";break}return SiebelApp.S_App.GotoView(p,"",q,null)}f.prototype.Setup=function(o){SiebelAppFacade.NavigationPresentationModel.superclass.Setup.call(this,o);if(this.Get("GetType")===k.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){c.call(this,o)}};function c(o){var p=o.GetType();if(p===k.get("SWE_PROP_NC_SCREENCTRL_INFO")){m.call(this,o)}else{if(p===k.get("SWE_PROP_NC_FLOATING_TAB_INFO")){h.call(this,o)}else{if(p===k.get("SWE_PROP_NC_AGGREGATE_INFO")||p===SiebelApp.Constants.get("SWE_PROP_NC_SUBDETAIL_INFO")){e.call(this,o,false)}else{if(p===k.get("SWE_PROP_NC_DETAIL_INFO")){e.call(this,o,true)}else{return}}}}}function m(r){var s=r.GetChildCount();var v="";var u;var o=k.get("SWE_PST_QTP_INFO");var w=k.get("SWE_PROP_NC_ITEM_INFO");if(this.Get("GetTabInfo")===null||this.Get("GetTabInfo")===undefined){this.AddProperty("GetTabInfo",{})}if(this.Get("GetTabItemsQTPInfo")===undefined){this.AddProperty("GetTabItemsQTPInfo",[])}for(var q=0,p=0;q<s;q++){var t=r.GetChild(q);u=t.GetType();if(u===o){this.AddProperty("GetTabContainerQTPInfo",t);continue}else{if(u!==w){continue}}this.Get("GetTabInfo")["tabScreen"+p]=a.call(this,t);p++}v=r.GetProperty(k.get("SWE_PROP_NC_SELECTED_INDEX"));this.AddProperty("GetSelectedTabKey","tabScreen"+v);this.AddProperty("GetDataReload",true)}function a(o){if(l.IsEmpty(o)){return}var p={};p.screenName=o.GetProperty(k.get("SWE_PROP_NC_SCREEN_NAME"));p.defaultViewName=o.GetProperty(k.get("SWE_PROP_NC_VIEW_NAME"));p.captionName=o.GetProperty(k.get("SWE_PROP_NC_CAPTION"));p.tabIcon=o.GetProperty(k.get("SWE_PROP_NC_SCREEN_TAB_ICON"));var r=k.get("SWE_PST_QTP_INFO");for(var q=0;q<o.GetChildCount();q++){if(o.GetChild(q).GetType()===r){this.Get("GetTabItemsQTPInfo").push(o.GetChild(q))}}return p}function h(o){if(l.IsEmpty(o)||o.GetType()!==k.get("SWE_PROP_NC_FLOATING_TAB_INFO")){return}var s=o.GetChild(0);if(s.GetType()!==k.get("SWE_PROP_NC_ITEM_INFO")){return}var v=false;var t=0;var u=s.GetProperty(k.get("SWE_PROP_NC_SCREEN_NAME"));var r=k.get("SWE_PROP_NC_SELECTED_INDEX");var q;var p=this.Get("GetTabInfo");for(var w in p){if(p.hasOwnProperty(w)){if(this.Get("GetTabInfo")[w].screenName===u){u=q.GetProperty(r);if(u){this.AddProperty("GetSelectedTabKey","tabScreen"+u)}else{this.AddProperty("GetSelectedTabKey",w)}v=true}t++}}if(v){return}this.Get("GetTabInfo")["tabScreen"+t]=a.call(this,s);this.AddProperty("GetSelectedTabKey","tabScreen"+t);this.AddProperty("GetDataReload",true)}function e(w,z){if(z){this.AddProperty("GetTabInfo",{});this.AddProperty("GetTabContainerQTPInfo ",null);this.AddProperty("GetTabItemsQTPInfo",[])}else{var p={};this.AddProperty("GetSelectedTabLinkInfo",p);this.AddProperty("GetTabViewLinkContainerQTPInfo",null);this.AddProperty("GetTabViewLinkItemsQTPInfo",[])}var t=w.GetChildCount();var y;var o=k.get("SWE_PST_QTP_INFO");var A=k.get("SWE_PROP_NC_ITEM_INFO");if(!((t===1)&&(w.GetChild(0).GetType()===o))){for(var s=0,x=0;s<t;s++){var r={};var u=w.GetChild(s);var v=u.GetType();if(v===o){if(z){this.AddProperty("GetTabContainerQTPInfo ",u)}else{this.AddProperty("GetTabViewLinkContainerQTPInfo",u)}continue}else{if(v===k.get("SWE_QTP_JUMP_TAB_INFO")){if(u.GetChild(0).GetType()===o){this.AddProperty("GetJumpTabQTPInfo",u.GetChild(0))}continue}else{if(v!==A){continue}}}y=u.GetProperty(k.get("SWE_PROP_NC_VIEW_NAME"));r.viewName=y;y=u.GetProperty(k.get("SWE_PROP_NC_CAPTION"));r.captionName=y;if(z){this.Get("GetTabInfo")["tabScreen"+x]=r}else{this.Get("GetSelectedTabLinkInfo")["tabView"+x]=r}for(var q=0;q<u.GetChildCount();q++){if(u.GetChild(q).GetType()===o){if(z){this.Get("GetTabItemsQTPInfo").push(u.GetChild(q))}else{this.Get("GetTabViewLinkItemsQTPInfo").push(u.GetChild(q))}}}x++}}y=w.GetProperty(k.get("SWE_PROP_NC_SELECTED_INDEX"));if(y!==undefined){z?this.AddProperty("GetSelectedTabKey","tabScreen"+y):this.AddProperty("GetSelectedLinkKey","tabView"+y)}else{z?this.AddProperty("GetSelectedTabKey",y):this.AddProperty("GetSelectedLinkKey",y)}this.AddProperty("GetDataReload",true)}function b(t){var p=true;var w=null;var v=null;var r=SiebelApp.S_App;var s=k.get("SWE_PROP_NC_SELECTED_INDEX");var o=k.get("SWE_PST_QTP_INFO");v=t.GetType();if((v===k.get("SWE_PROP_NC_PDQ_INFO"))||(v===k.get("SWE_PST_QTP_INFO"))){return}for(p=true;(w=t.EnumProperties(p))!==null;p=false){if(w!==s){v=t.GetProperty(w);if(r===null||r===undefined){break}else{var u=r.LookupStringCache(v);if(u===null||u===undefined){continue}t.SetProperty(w,u)}}}for(var q=0;q<t.GetChildCount();q++){if(t.GetType()!==o){b.call(this,t.GetChild(q))}}}return f}())};