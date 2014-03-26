if(typeof(SiebelAppFacade.JQMNavBarRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JQMNavBarRenderer");if(typeof(SiebelApp)!=="undefined"&&typeof(SiebelApp.S_App)!=="undefined"){if(typeof(SiebelApp.Constants)!=="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_UIDEF_SCRTAB_PRENDR"),"SiebelAppFacade.JQMNavBarRenderer")}}SiebelAppFacade.JQMNavBarRenderer=(function(){var f=SiebelApp.Constants;var d;var a;var b;var e=true;function c(j){var i=j;this.GetPM=function(){return i};var k=false;var h=false;this.GetTabClicked=function(){return k};this.SetTabClicked=function(l){k=l};this.GetViewClicked=function(){return h};this.SetViewClicked=function(l){h=l};this.GetPM().AttachPMBinding("Refresh",g,{scope:this})}c.prototype.ShowUI=function(){var k=this.GetPM();var j=k.Get("IsScreen");var h="";var n=navigator.userAgent.match(/iPad/i)!==null;var m=(navigator.userAgent.match(/android/i)!==null&&navigator.userAgent.match(/mobile/i)===null);var i=Math.abs(window.orientation)===90?"landscape":"portrait";$("#back-button").empty();$("#back-button").removeAttr("href");var l='<button id="back-button" data-iconpos="center" data-corners="false" data-icon="arrow-l" data-theme ="a" onclick="history.back();"></button>';$("#back-button").append(l).trigger("create");$("#back-button").attr("title",_SWEgetMessage("IDS_SWE_MOBIIE_BACK"));$("#tbm_3").children("a").attr("title",_SWEgetMessage("IDS_SWE_MOBIIE_LOGOUT"));$("#_swescrnbar").addClass("simplenavBarStyle ui-body-a");if(!j){this.CreateViewTabs()}if(!j){g.call(this,h)}if(j){b=this;var o=$("#jqmNavbar");if(o.length===0||o===undefined){this.LoadTree();$("#_swecontent").addClass("maxWidth");$("#_swecontent").show();$("#_swecontent").resize();$("#_swescrnbar").show();$("#_swescrnbar").resize()}else{if(this.GetTabClicked()){this.LoadTree();this.SetTabClicked(false)}else{if(k.Get("GetDataReload")){this.LoadTree()}}}}else{if(!$("#_swescrnbar").is(":visible")){$("#_swecontent").addClass("maxWidth");$("#_swecontent").show();$("#_swecontent").resize()}}};c.prototype.LoadTree=function(){var m=this.GetPM();var t=m.Get("placeholder");var k="";var p=navigator.userAgent.match(/(iPhone)|(iPod)|(Android.*Mobile)/i);if(p){$("#"+t).html("<div id='jqmNavbar' data-role='controlgroup'  data-type='horizontal'></div>")}else{$("#"+t).html("<div id='jqmNavbar' data-role='controlgroup'></div>")}var j=m.Get("GetTabInfo");var s=m.Get("GetSelectedTabLinkInfo");var r=m.Get("GetSelectedTabKey");for(var n in j){if(j.hasOwnProperty(n)){var i=j[n].captionName;var h=j[n].defaultViewName;var q=j[n].tabIcon;if(q!==undefined){k+="<a id='"+n+"' data-viewName='"+h+"' data-theme='a' data-role='button'><img src='"+q+"' alt=''><h5>"+i+"</h5></a>"}else{k+="<a class='siebui-navbar-noicon' id='"+n+"' data-viewName='"+h+"' data-theme='a' data-role='button' ><h5>"+i+"</h5></a>"}if(n===r&&(j[n].tabIcon)!==undefined){var u=j[n].tabIcon;var o=u;var l=u.lastIndexOf(".");var v=u.slice(0,l)+"_Highlight"+u.slice(l);$("#"+r).find("img").attr("src",v)}}}$("#"+r+" img").error(function(){$(this).attr("src",o)});$("div[id='jqmNavbar']").append(k);$("div[id='jqmNavbar']").addClass("siebui-jqmNavbar");$("#"+t).trigger("create")};c.prototype.CreateViewTabs=function(){var i=this.GetPM();var p="";var j="";if(e){g.call(this,p);e=false}var o=i.Get("GetTabInfo");var n=i.Get("GetSelectedTabKey");var k=i.Get("placeholder");var q=b.GetPM().Get("GetTabInfo");var h=b.GetPM().Get("GetSelectedTabKey");d=q[h].defaultViewName;if(k!==undefined||k!==null){k.innerHTML="";for(var m in o){if(o.hasOwnProperty(m)){var s=o[m];var r=s.viewName;var l=r.valueOf();if(l!==d){j+="<a id='"+m+"' data-viewName='"+r+"' data-role='button' data-icon='arrow-r' data-iconpos='right'>"+s.captionName+"</a>"}}}$("#"+k).append(j);$("#"+k).trigger("create")}$("#_MobileViewTabContainer #"+n).addClass("selectedviewmobile")};function g(m){var h;var n=b.GetPM().Get("GetTabInfo");if(m===""||typeof(m)==="undefined"){h=b.GetPM().Get("GetSelectedTabKey")}else{h=m}for(var j in n){if(n.hasOwnProperty(j)){var l=n[j].tabIcon;if(j===h&&(n[j].tabIcon)!==undefined){var o=n[h].tabIcon;var k=o;var i=o.lastIndexOf(".");var p=o.slice(0,i)+"_Highlight"+o.slice(i);$("#"+h).find("img").attr("src",p)}else{$("#"+j).find("img").attr("src",l)}}}$("#"+h+" img").error(function(){$(this).attr("src",k)})}c.prototype.BindEvents=function(){var i=this.GetPM();var h=this;var j=i.Get("placeholder");$("#"+j).undelegate(" a","click");$("#"+j).delegate(" a","click",function(){var l=$(this).attr("data-viewName");var k=$(this).attr("id");if(i.Get("GetType")===f.get("SWE_PROP_NC_ID_SCREEN_CONTROL")){if(l===undefined){l=$(this).parent().parent().attr("data-viewName")}else{h.SetViewClicked(true)}if(l!==undefined){h.SetTabClicked(true);SiebelApp.S_App.GotoView(l)}g.call(this,k)}else{if(l!==undefined){h.SetTabClicked(true);SiebelApp.S_App.GotoView(l)}}})};c.prototype.BindData=function(){};return c}())};