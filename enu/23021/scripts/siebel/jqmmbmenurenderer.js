if(typeof(SiebelAppFacade.MBMenuRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.MBMenuRenderer");SiebelAppFacade.MBMenuRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function b(e){var d=e;this.GetPM=function(){return d}}b.prototype.ShowUI=function(){var f=this.GetPM();var g=f.Get("GetPlaceHolder");var d=g+"div";var e;if(SiebelApp.S_App.IsMobileApplication()==="true"){$(".AppletMenu").each(function(i){$(this).removeAttr("style");var j=$(this).find("#"+g).html();if(j!==null){$(this).empty();var h=f.Get("GetLabel");h=h.replace(/ /g,"&nbsp;");if(h!==""){h=h+"&nbsp;"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MENU_TITLE")}else{h=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MENU_TITLE")}e="<div id= "+d+' data-role="menu"><button id = '+g+' data-icon="custom-gear" data-iconpos="center" data-inline="true" title= '+h+" ></button>";e+="</div>";$(this).append(e).trigger("create")}})}};b.prototype.EndLife=function(){$("#tbm_3").undelegate(" a","click")};b.prototype.BindEvents=function(){var f=this.GetPM().Get("GetPlaceHolder");var d=f+"div";var e=this.GetPM();$("#tbm_3").undelegate(" a","click");$("#tbm_3").delegate(" a","click",function(){var g="*Browser* *Logoff* *";if(IsOfflineModeEnabled()&&SiebelApp.OfflineAppSettings.GetMode()===true){$("#tbm_3").disabled=true}else{e.OnControlEvent("HandleMenuClick",g)}});$("#"+f).bind("click",{ctx:this},function(g){if($("body").find(".aSwipeBtn").length){$(".aSwipeBtn").remove()}if($("body").find(".pdqitem").length){$(".pdqitem").remove()}var i="menuitem_"+f;var h=$("#"+d).find("#"+i).html();if(h===null){$(".menuitem").remove();g.data.ctx.GetPM().OnControlEvent("HandleClick",["Click"])}else{$("#"+i).remove()}return false});$("body").click(function(g){$(".menuitem").remove()})};b.prototype.BindData=function(){};function c(){var g=this.GetPM().Get("GetConcreteMenu");var f=[];var n=a.get("CMDMGR_CAPTION");var j=a.get("CMDMGR_ENABLED");var l=a.get("CMDMGR_COMMAND");var m=a.get("CMDMGR_SEPARATOR");var e=function(i,o){return function(q,p){i.GetPM().OnControlEvent("HandleMenuClick",o)}};for(var h=0;h<g.length;h++){var d=g[h];var k={};k.name=String(d[n]);k.disabled=String(d[j])==="false";k.displayType=String(d[l]);k.callback=e(this,String(d[l]));f[h]=k}return f}b.prototype.ShowMenu=function(){var h=c.call(this);var o=this.GetPM().Get("GetPlaceHolder");var g=o+"div";var f="menuitem_"+o;var j='<div class= "menuitem" id= '+f+' ><ul data-role="listview" data-inset="true">';var p=a.get("CMDMGR_SEPARATOR");for(var k=0;k<h.length;k++){var d=h[k];if(d.displayType!==p){var e=d.name;var l;if(d.disabled){l='<li data-icon="false" id='+k+' class="ui-disabled"> '+e+" </li>"}else{l='<li data-icon="false" id='+k+"> "+e+" </li>"}j+=l}}$("#"+g).append(j).trigger("create");var n=$("#"+g).offset().left-50;var m=$(".menuitem").find(".ui-listview").width();if(n<m){$(".menuitem").css("right","-100%")}else{$(".menuitem").css("right","0%")}$("#"+g).find("#"+f).find("li").click(function(r){$(".menuitem").remove();var q=$(this).attr("id");h[q].callback.call()})};return b}())};