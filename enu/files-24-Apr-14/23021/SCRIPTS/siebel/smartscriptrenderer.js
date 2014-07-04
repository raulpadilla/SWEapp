if(typeof(SiebelAppFacade.SmartScriptRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.SmartScriptRenderer");if(typeof(SiebelApp)!=="undefined"&&typeof(SiebelApp.S_App)!=="undefined"){if(typeof(SiebelApp.Constants)!=="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey("SmartScriptPR","SiebelAppFacade.SmartScriptRenderer")}}var utils=SiebelJS.Dependency("SiebelApp.Utils");var siebConsts=SiebelJS.Dependency("SiebelApp.Constants");var btnControl=siebConsts.get("SWE_PST_BUTTON_CTRL");var mvg=siebConsts.get("SWE_CTRL_MVG");var pick=siebConsts.get("SWE_CTRL_PICK");var radioButton=siebConsts.get("SWE_CTRL_RADIO");var checkBoxCtrl=siebConsts.get("SWE_CTRL_CHECKBOX");var comboControl=siebConsts.get("SWE_CTRL_COMBOBOX");var text=siebConsts.get("SWE_CTRL_TEXT");var DFLT_SS_COMBO_WIDTH="175px";SiebelAppFacade.SmartScriptRenderer=(function(){function b(d){SiebelAppFacade.SmartScriptRenderer.superclass.constructor.call(this,d);this.GetPM().AttachPMBinding("FocusOnApplet",c,{scope:this});this.GetPM().AttachPMBinding("firstQuestionFocus",c,{scope:this});this.PopulateQuestionList=function(f){var e=$("#SSQuestionList");if(e.length){e.html(f)}e.show()};this.DisplayPageLabel=function(f){var e=$("#s_SSPageLabel");if(e.length&&f!==null){e.html(f.m_displayName)}};this.DisplayQuestion=function(e,g){var f=null;if(e.m_mustAnswer>0){$("#"+e.m_uiInputName+"_r").html(g)}$("#"+e.m_uiInputName+"_d").html(e.m_displayName)};this.ExtractHtmlForQuestions=function(j){var n=$("#SSQuestionList > table");var k,e,g;var l;var m;var f;if(n.length===0){SiebelJS.Log("SmartScript missing question list in SSQuestionList");return}for(f in j){if(j.hasOwnProperty(f)){var o=0;m=j[f];for(k=0;k<n.length;k++){var h;e=n[k];e=$(e);g=e.find("#"+m.m_uiInputName+"_d");if(g.length){o=1;h=$("<div></div>").append(e.clone());l=h.html();if(m.m_enabledHTML===undefined||m.m_enabledHTML===""){m.m_enabledHTML=l}break}}if(!o){SiebelJS.Log("SmartScript missing enabledHTML for question: "+m.m_uiInputName+":"+m.m_controlName)}}}}}SiebelJS.Extend(b,SiebelAppFacade.PhysicalRenderer);b.prototype.ShowUI=function(){SiebelAppFacade.SmartScriptRenderer.superclass.ShowUI.call(this)};b.prototype.BindEvents=function(){SiebelAppFacade.SmartScriptRenderer.superclass.BindEvents.call(this)};b.prototype.SetControlValue=function(g,f){if(!a(g)){return}var e=$("#"+g.GetInputName())[0]||$("[name="+g.GetInputName()+"]")[0];e=$(e);switch(g.GetUIType()){case radioButton:e=$("input[name="+g.GetInputName()+"][value="+f+"]");if(e.length){e.attr("checked",true)}break;case comboControl:if(f!==undefined&&f!==""){var d=e.find("option:contains('"+f+"')");if(d.length){d.attr("selected","selected")}else{e.append("<option value='"+f+"' selected>"+f+"</option>")}}e.attr("value",f);break;default:SiebelAppFacade.SmartScriptRenderer.superclass.SetControlValue.call(this,g,f);break}};b.prototype.ShowUIControl=function(d){if(!a(d)){return}SiebelAppFacade.SmartScriptRenderer.superclass.ShowUIControl.call(this,d);var e=$("[name="+d.GetInputName()+"]");switch(d.GetUIType()){case text:e.addClass("text");break;case comboControl:e.addClass("comboBox");if(d.GetWidth()==0){e.width(DFLT_SS_COMBO_WIDTH)}break;default:break}e.height(e.attr("height"));e.width(e.attr("width"))};b.prototype.BindControlEvents=function(d){SiebelAppFacade.SmartScriptRenderer.superclass.BindControlEvents.call(this,d);if(!a(d)){return}var e=$("[name="+d.GetInputName()+"]");switch(d.GetUIType()){case comboControl:e.unbind("blur");e.bind("blur",{ctx:this,ctrl:d},function(f){if(f.data.ctx.GetPM().ExecuteMethod("CanUpdate",f.data.ctrl.GetName())){f.data.ctx.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_VALUE_CHANGE"),f.data.ctrl,$(this).val())}});break;case text:break;default:break}};function a(d){return(typeof(d.GetInputName)==="function")}function c(){var d=this.GetPM().Get("firstQuestionFocus");SiebelJS.Log("SmartScript focus on control: "+d);setTimeout(function(){if(d!==null){var e=$("#"+d)[0]||$("[name="+d+"]")[0]||$("#"+d+"_d")[0];$(e).attr("tabindex",0).focus()}else{var e=$(".siebui-applet-btm-buttons  button:enabled")[0];$(e).attr("tabindex",0).focus()}},60)}return b}())};