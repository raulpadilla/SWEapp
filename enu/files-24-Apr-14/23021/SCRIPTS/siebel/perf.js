if(typeof(SiebelApp.S_App.OUIPerfReporter)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.OUIPerfReporter");SiebelApp.S_App.OUIPerfReporter=(function(){function a(){}a.prototype.RefreshData=function(f){var g=CCFMiscUtil_CreatePropSet();g.DecodeFromString(f);if(!g.GetProperty("OpenUIPerf")){g=null;return}$(".siebui-perf-bar").remove();$("body").append("<div class='siebui-perf-bar'></div>");var j=g.GetProperty("SqlTime");var e=g.GetProperty("SqlCount");var c=["DB Time","DB Count"];var b=[j+"ms",e];var h="";h+="<div class='siebui-perf-data'>EAT MODE</div>";for(var d=0;d<c.length;d++){h+="<div class='siebui-perf-data'>"+c[d]+" : "+b[d]+"</div>"}$(".siebui-perf-bar").html("").append(h)};return new a()}())};