if(typeof(SiebelAppFacade.PDQPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.PDQPhyRenderer");SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_UIDEF_PDQ_PRENDR"),"SiebelAppFacade.PDQPhyRenderer");SiebelAppFacade.PDQPhyRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Utils");var b=SiebelJS.Dependency("SiebelApp.Constants");function d(f){var e=f;this.GetPM=function(){return e}}d.prototype.ShowUI=function(){var f=this.GetPM().Get("GetContainer");if(a.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())){var e=this.GetPM().Get("GetTitle");$("[name="+f+"]").attr("title",e).parent().attr({role:"navigation",title:e})}};d.prototype.BindEvents=function(){$("[name="+this.GetPM().Get("GetContainer")+"]").bind("click keypress blur",{ctx:this},function(e){if(e.type==="keypress"&&e.which!==$.ui.keyCode.ENTER){}else{e.data.ctx.GetPM().OnControlEvent("PDQSelect",$(this)[0].selectedIndex)}})};d.prototype.BindData=function(){var h=this.GetPM();var g=$("[name="+h.Get("GetContainer")+"]");if(g.length!==1){SiebelJS.Log("Can't find single instance of PDQ - ["+h.Get("GetContainer")+"]");return}var e=h.Get("PDQItem")||[];var l="";if(h.Get("EmptyItem")==="TRUE"){l+="<option> </option>"}var k=h.Get("SelectedPDQItem");for(var f=0;f<e.length;f++){var j=e[f].replace(/ /g,"&nbsp;");l+="<option"+(Number(k)===f?" selected":"")+">"+j+"</option>"}g.html(l);c.call(this,g);g=null};function c(e){var h=b.get("SWE_PROP_QTP_OT");var k=b.get("SWE_PROP_QTP_RN");var j=b.get("SWE_PROP_QTP_UN");var m=this.GetPM().Get("PDQComboBoxQTPPS");var g=this.GetPM().Get("PDQItemQTPInfo")||[];if(m&&typeof m.GetProperty==="function"){e.attr("ot",m.GetProperty(h)).attr("rn",m.GetProperty(k)).attr("un",m.GetProperty(j))}for(var l=0;l<g.length;l++){if(g[l]&&typeof g[l].GetProperty==="function"){var p=g[l].GetProperty(j);var f=g[l].GetProperty(h);var o=g[l].GetProperty(k);var n=$(e).children().eq(l);if(n.length===1){n.attr("ot",f);n.attr("rn",o);n.attr("un",p)}}}}return d}())};