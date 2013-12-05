if(typeof(SiebelAppFacade.CommToolbarPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CommToolbarPhyRenderer");SiebelAppFacade.CommToolbarPhyRenderer=(function(){function e(f){this.m_toolbarUI=$(f.Get("GetPlaceholder"));this.m_bAccessibility=true;this.m_focusEditBeforeClick="";this.m_sSelText="";this.m_curFocusEditName="";this.m_timerId=0;this.m_oldtitle="";this.m_mapOrderToName={};this.m_mapNameToOrder={};this.m_tooltipMap={};this.m_mark=false;this.m_isTooltipShowing=false;this.m_bIsMakeCallPopupNeeded=f.Get("IsMakeCallPopupNeeded");this.GetPM=function(){return f}}e.prototype.GetControljqObj=function(h){var g=$('<div role="presentation"></div>');var f;if(h===undefined){g.replaceWith("");return g}this.m_tooltipMap[h.m_name]=h.m_tooltipFromTools;switch(h.m_type){case"button":var i=h.m_image;if(h.m_state==="disabled"){i=h.m_imgd}f=$("<img>");f.attr({name:h.m_name,id:h.m_id,title:h.m_tooltip,alt:a(h),src:i,role:"button","aria-label":a(h),tabindex:"-1"});if(h.m_name.indexOf("Agent State")>=0){f.attr("aria-pressed","false")}g.attr("id","CommBtn_"+h.m_id);if(h.m_name.indexOf("SidewayPopup")===0){g.addClass("commSidewayBtnContainer siebui-commbtn-enabled");f.addClass("commSidewayBtn commBtnEnabled")}else{if(h.m_index!==0){f.addClass("commSubBtn");g.addClass("commSubBtnContainer")}else{f.addClass("commTopBtn");g.addClass("commTopBtnContainer")}if(h.m_state==="enabled"){g.addClass("siebui-commbtn-enabled");f.addClass("commBtnEnabled")}else{g.addClass("siebui-commbtn-disabled")}}g.append(f);this.InjectQTPInfo(h,f);break;case"edit":f=$("<input/>");f.attr({id:h.m_id,name:h.m_name,title:h.m_tooltip,alt:h.m_name,type:"text",value:h.m_value,style:"width: "+h.m_width*0.7+"em",tabindex:"-1",role:"textbox","aria-label":h.m_name});f.addClass("commEdit");g.attr("id","CommEdit_"+h.m_id);g.addClass("commEditContainer");g.append(f);this.InjectQTPInfo(h,f);break;case"combo box":f=$("<select></select>");f.attr({id:h.m_id,name:h.m_name,title:h.m_tooltip,style:"width: "+h.m_width*0.7+"em",tabindex:"-1",role:"combobox","aria-label":h.m_name});f.addClass("commCombo");g.attr("id","CommCombo_"+h.m_id);g.addClass("commComboContainer");g.append(f);this.InjectQTPInfo(h,f);break;case"separator":f=$("<span></span>");f.attr({id:h.m_id,role:"separator"});f.addClass("commSep");g.attr("id","CommSep_"+h.m_id);g.addClass("commSepContainer");g.append(f);break;case"timer":f=$("<span></span>");f.text("00:00:00");f.attr({id:h.m_id,tabindex:"-1",role:"timer","aria-label":h.m_name});f.addClass("commTimerSpan");g.attr("id","CommTimer_"+h.m_id);g.addClass("commTimerContainer");g.append(f);this.InjectQTPInfo(h,f);break;default:g.replaceWith("");break}return g};e.prototype.InjectQTPInfo=function(g,f){if(this.GetPM().Get("IsAutomationEnabled")){f.attr({rn:g.m_name,un:g.m_id,ot:g.m_type})}};e.prototype.ShowUI=function(){var w=null;var l=null;var z=0;var u=this.GetPM();var h=u.Get("GetPopSidewayCtrl");var s=h.m_name;var y=0;var n=u.Get("GetTopControlNum");var p=u.Get("GetTopCtrlsSeqMap");var k=u.Get("GetSubCtrlsSeqMap");var g;var v=$("<div></div>");var o;var m=true;var q=0;this.m_toolbarUI.attr("role","toolbar");for(var t=1;t<=n;t++){w=p[t];if(w!==undefined){o=this.GetControljqObj(w);if(m){o.children().attr("tabindex","0");m=false}v.append(o);if(w.m_type!=="separator"){this.m_mapNameToOrder[w.m_id]=q;this.m_mapOrderToName[q++]=w.m_id}g=k[t];if(g===undefined){z=0}else{z=k[t].length-1}if(z>0){h.m_id=s+y++;o=this.GetControljqObj(h);v.append(o);this.m_mapNameToOrder[h.m_id]=q;this.m_mapOrderToName[q++]=h.m_id;var x=$("<div></div>");x.attr("id","SubCmdOf"+w.m_id);x.attr("role","group");x.addClass("commSubCmdContainer");for(var r=1;r<=z;r++){l=g[r];x.append(this.GetControljqObj(l));this.m_mapNameToOrder[l.m_id]=q;this.m_mapOrderToName[q++]=l.m_id}v.append(x)}}}o=$("<span></span>");o.attr({name:"Comm Status Box",id:"Comm_Status_Box",tabindex:"-1",style:"display:none;"});o.addClass("commStatusBox");this.m_mapNameToOrder.Comm_Status_Box=q;this.m_mapOrderToName[q++]="Comm_Status_Box";var f=$("<div></div>");f.attr({id:"CommStatusBox",role:"alert"});f.addClass("commStatusBoxContainer");f.append(o);v.append(f);this.m_toolbarUI.hide();this.m_toolbarUI.append(v.contents())};e.prototype.CollectComboValue=function(){var f={};$(".commCombo").each(function(){var h=$(this).attr("name");var g=$(this).find(":selected");if(g.length>0){f[h]=g.val()}else{f[h]=""}});return f};e.prototype.CollectEditText=function(){var f={};$(".commEdit").each(function(){var g=$(this).attr("name");var h=$(this).val();h=h.replace(/\s/g,"");f[g]=h});return f};e.prototype.GetFocusEditName=function(g){if(this.m_bAccessibility){return""}if(g){var f=document.activeElement.id;if(f!==""){return $("#"+f.replace(/\s/g,"\\ ")).attr("name")}else{return""}}else{return this.m_focusEditBeforeClick}};e.prototype.GetSelText=function(){var i="";if(window.getSelection){if(document.activeElement&&document.activeElement.tagName&&(document.activeElement.tagName.toLowerCase()==="textarea"||document.activeElement.tagName.toLowerCase()==="input")){var h=document.activeElement.value;i=h.substring(document.activeElement.selectionStart,document.activeElement.selectionEnd)}else{var f=window.getSelection();i=f.toString()}}else{if(document.selection&&document.selection.createRange){var g=document.selection.createRange();i=g.text}}return i};e.prototype.GetCtrlData=function(f){return{ComboValue:this.CollectComboValue(),EditText:this.CollectEditText(),FocusEdit:this.GetFocusEditName(f),SelText:this.GetSelText()}};e.prototype.BindEvents=function(){};e.prototype.BindEvents2=function(){var g=this;var f=g.GetPM();if(!g.m_bAccessibility){g.m_toolbarUI.find(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commEdit, .commCombo").tooltip({position:{my:"left top",at:"right bottom+5",collision:"flipfit"},show:null,hide:null}).tooltip("disable").end().find("#CommStatusBox").hide().attr("aria-hidden","true").children().hide()}else{g.m_toolbarUI.find(".commSidewayBtnContainer").hide().attr("aria-hidden","true").children().hide();g.m_toolbarUI.attr("title",SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CTI_TOOLBAR_TITLE"))}g.m_toolbarUI.delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commEdit, .commCombo","ShowTooltipEvt",function(){if($(this).data("hovered")&&!g.m_bAccessibility){window.status=$(this).attr("title");$(this).tooltip("enable").tooltip("open");g.m_isTooltipShowing=true}else{if(($(this).data("focused")||$(this).hasClass("commEdit"))&&g.m_bAccessibility){if($(this).data("tooltip")===undefined){if(!$(this).hasClass("commEdit")){var i=$(this).attr("aria-label");var h=$(this).attr("title");$(this).attr("aria-label",h).blur().focus()}$(this).tooltip({position:{my:"left top",at:"right bottom+5",collision:"flipfit"},show:null,hide:null}).tooltip("open");g.m_isTooltipShowing=true;if(!$(this).hasClass("commEdit")){var j=this;setTimeout(function(){$(j).attr("aria-label",i)},200)}}}}}).delegate(".commTopBtn, .commSubBtn","mousedown",function(){f.ExecuteMethod("CollectFocusInfo")
}).delegate(".commTopBtn, .commSubBtn","click",function(){var i=$(this).attr("name");if($(this).hasClass("commBtnEnabled")){var h=g.GetCtrlData();h.SelText=g.m_sSelText;f.OnControlEvent("CommCommandBtnClicked",i,h);if(!g.m_bAccessibility){f.ExecuteMethod("ApplySticky",$(this).attr("name"));if($(this).hasClass("commSubBtn")){$(this).parent().parent().hide()}}}if(g.m_toolbarUI.hasClass("floatToolbar")){$(this).focus()}SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Clicking ["+$(this).attr("name")+"]")}).delegate(".commCombo","change",function(){var i=$(this).attr("name");var h=g.GetCtrlData();h.SelText=g.m_sSelText;f.OnControlEvent("CommCommandBtnClicked",i,h)}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer","mousedown",function(h){if($(this).hasClass("commBtnEnabled")&&h.which===1){$(this).addClass("commBtnClicked")}}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer","mouseup",function(){$(this).removeClass("commBtnClicked")}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer","mouseout",function(){$(this).removeClass("commBtnClicked");if($(this).hasClass("commTopBtn")||$(this).hasClass("commSubBtn")){f.ExecuteMethod("ClearFocusInfo")}}).mouseup(function(h){g.m_mark=true}).delegate("[tabindex]","keydown",function(i){if($(this).attr("tabindex")!==0){return}switch(i.which){case $.ui.keyCode.RIGHT:if($(this)[0].tagName.toUpperCase()!=="INPUT"){g.MoveTabIndex(true,$(this).attr("id"),true);i.preventDefault()}break;case $.ui.keyCode.LEFT:if($(this)[0].tagName.toUpperCase()!=="INPUT"){g.MoveTabIndex(false,$(this).attr("id"),true);i.preventDefault()}break;case $.ui.keyCode.SPACE:case $.ui.keyCode.ENTER:$(this).trigger("click");i.preventDefault();break;case $.ui.keyCode.TAB:if($(this)[0].tagName.toUpperCase()==="INPUT"){if(i.shiftKey){g.MoveTabIndex(false,$(this).attr("id"),true)}else{g.MoveTabIndex(true,$(this).attr("id"),true)}i.preventDefault()}break;case $.ui.keyCode.UP:case $.ui.keyCode.DOWN:if(!(i.altKey||i.ctrlKey||i.shiftKey)){var j=$(this).find(":selected");if(j.length>0){var k=j.val();if(i.which===$.ui.keyCode.DOWN){k=Number(k)+1}else{k=Number(k)-1}var h=$(this).children("[value="+k+"]").first();if(h.length>0){k=k%$(this).children().removeAttr("selected");h.attr("selected","selected")}}i.preventDefault();$(this).trigger("change")}break;default:break}}).delegate("img, span, input, select","focus",function(){g.m_toolbarUI.find(".commFocused").removeClass("commFocused");g.FocusControl($(this));$(this).addClass("commFocused")}).delegate("img, span, input, select","blur",function(){$(this).removeClass("commFocused")});g.RegisterControlBtn($("#s_toolbar").find("[name='Toggle CTI Toolbar']"));$("body").delegate(".siebui-call-from-ui-enabled","click",function(h){if($(this).text().length>0){g.MakeCallToUIPhone($(this).text(),$(this),g.m_bIsMakeCallPopupNeeded)}});if(!g.m_bAccessibility){g.m_toolbarUI.children().has("div").hide().attr("aria-hidden","true");g.m_toolbarUI.delegate(".commSidewayBtn","click",function(){var h=$(this).parent().next();if(h.css("display")==="none"){$(this).parent().siblings().has("div").hide().attr("aria-hidden","true");h.show().removeAttr("aria-hidden")}else{h.hide().attr("aria-hidden","true")}if(g.m_focusEditBeforeClick!==""){g.m_toolbarUI.find("#"+g.m_focusEditBeforeClick.replace(/\s/g,"_")).focus()}else{if(g.m_toolbarUI.hasClass("floatToolbar")){$(this).focus()}}}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commEdit, .commCombo","mouseover mouseout",function(h){if(h.type==="mouseover"){$(this).data("hovered",true);var i=$(this).attr("name");f.ExecuteMethod("InvokeCommandToolTip",i,g.GetCtrlData(true))}else{$(this).data("hovered",false);if(g.m_isTooltipShowing){$(this).tooltip("close").tooltip("disable");g.m_isTooltipShowing=false}}}).delegate(".commEdit","focus",function(){g.m_curFocusEditName=$(this).attr("name")}).delegate(".commEdit","blur",function(){g.m_curFocusEditName=""}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commCombo","mousedown",function(){g.m_sSelText=g.GetSelText();g.m_focusEditBeforeClick=g.m_curFocusEditName})}else{g.m_toolbarUI.delegate(".commEdit","focus",function(){var h=$(this).attr("name");f.ExecuteMethod("InvokeCommandToolTip",h,g.GetCtrlData())}).delegate(".commStatusBox","keypress",function(h){var i=h.which;if(i===112){f.ExecuteMethod("ShowPreviousMessage")}else{if(i===110){f.ExecuteMethod("ShowNextMessage")}}}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commCombo","keypress",function(h){if(h.which===119&&$(this).data("tooltip")===undefined){var i=$(this).attr("name");f.ExecuteMethod("InvokeCommandToolTip",i,g.GetCtrlData())}}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commEdit, .commCombo","blur",function(){$(this).data("focused",false);if($(this).data("tooltip")){$(this).tooltip("close").tooltip("destroy");$(this).attr("title",g.m_tooltipMap[$(this).attr("name")]);g.m_isTooltipShowing=false}}).delegate(".commTopBtn, .commSubBtn, .commSidewayBtn, .commTimer, .commEdit, .commCombo","focus",function(){$(this).data("focused",true)})}$(document).mouseup(function(){if(g.m_timerId!==0){clearInterval(g.m_timerId);g.m_timerId=0;document.title=g.m_oldtitle}}).keydown(function(){if(g.m_timerId!==0){clearInterval(g.m_timerId);g.m_timerId=0;document.title=g.m_oldtitle}})};e.prototype.BindData=function(){};e.prototype.MakeCallToUIPhone=function(f,l,h){var g=this.GetPM();var j=this;if(h){var i=$("#comm_makecall_popup");if(i.length<=0){i=$('<div id="comm_makecall_popup"></div>');$("body").append(i)}var k={};k[SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CTI_CALL")]=function(){g.ExecuteMethod("CallContactFromUI",f,j.GetCtrlData());SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Make Call to phone number ["+f+"]");$(this).dialog("close");l.focus()};i.dialog({title:SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CTI_PHONE_LABEL")+" "+f,buttons:k,position:[l.offset().left+l.width()+10,l.offset().top+l.height()],dialogClass:"commMakeCallFromUIPopup",close:function(){l.focus()},width:200,height:80})}else{g.ExecuteMethod("CallContactFromUI",f,this.GetCtrlData());SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Make Call to phone number ["+f+"]")}};e.prototype.TriggerEvent=function(h,f){var g=h.replace(/\s/g,"\\ ");this.m_toolbarUI.find("#"+g).trigger(f)};e.prototype.RefreshControl=function(g,f){var h=g.m_id;var i;if(g.m_type==="button"){if(f==="state"){i=this.m_toolbarUI.find("#"+h).attr("src");if(i!==""){switch(g.m_state){case"enabled":i=g.m_image;this.m_toolbarUI.find("#"+h).attr("src",i).addClass("commBtnEnabled").removeAttr("aria-disabled").parent().addClass("siebui-commbtn-enabled").removeClass("siebui-commbtn-disabled");SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Enabled ["+g.m_name+"]");break;case"disabled":i=g.m_imgd;this.m_toolbarUI.find("#"+h).attr("src",i).removeClass("commBtnEnabled").attr("aria-disabled","true").parent().removeClass("siebui-commbtn-enabled").addClass("siebui-commbtn-disabled");break}}this.m_toolbarUI.find("#"+h).attr({alt:a(g),"aria-label":a(g)})
}else{if(f==="effect"){i=this.m_toolbarUI.find("#"+h).attr("src");if(i!==""){switch(g.m_effect){case"toggled":this.m_toolbarUI.find("#"+h).addClass("commBtnToggled").attr("aria-pressed","true");break;case"untoggled":g.m_effect="";this.m_toolbarUI.find("#"+h).removeClass("commBtnToggled");if(this.m_toolbarUI.find("#"+h).attr("aria-pressed")!==undefined){this.m_toolbarUI.find("#"+h).attr("aria-pressed","false")}break;case"blinking":this.m_toolbarUI.find("#"+h).addEffectForCommToolbar("blink");SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Blinking ["+g.m_name+"]");break;case"unblinking":g.m_effect="";this.m_toolbarUI.find("#"+h).addEffectForCommToolbar("stopblink");break}}this.m_toolbarUI.find("#"+h).attr({alt:a(g),"aria-label":a(g)})}else{if(f==="value"){if(g.m_bStatic){i=g.m_image}else{if(g.m_state==="enabled"){i=g.m_image}else{i=g.m_imgd}}if(i===""){this.m_toolbarUI.find("#"+h).attr("src",i).css("display","none");this.MoveTabIndex(true,h);this.m_toolbarUI.find("#"+h).attr("aria-hidden","true")}else{this.m_toolbarUI.find("#"+h).attr("src",i).css("display","inline").removeAttr("aria-hidden")}}}}}if(f==="tooltip"){if(!this.m_bAccessibility){this.m_toolbarUI.find("#"+h).tooltip("enable").attr("title",g.m_tooltip).tooltip("disable").trigger("ShowTooltipEvt")}else{this.m_toolbarUI.find("#"+h).attr("title",g.m_tooltip).trigger("ShowTooltipEvt")}}};e.prototype.MoveTabIndex=function(h,j,i){var f;var g;f=this.m_mapNameToOrder[j];if(h){g=this.m_mapOrderToName[++f]}else{g=this.m_mapOrderToName[--f]}while(g!==undefined&&(($("#"+g).hasClass("commSubBtn")&&$("#"+g).parent().parent().css("display")==="none")||$("#"+g).css("display")==="none")){if(h){++f}else{--f}g=this.m_mapOrderToName[f]}if(g===undefined){return}else{$("#"+j).attr("tabindex","-1");$("#"+g).attr("tabindex","0");if(i){$("#"+g).focus()}}};e.prototype.FocusControl=function(f){this.m_toolbarUI.find('[tabindex="0"]').attr("tabindex","-1");f.attr("tabindex","0")};e.prototype.UpdateHTMLControl=function(j,h,g){if(j===undefined||h===""){return}var k=j.m_id;switch(h){case"state":this.RefreshControl(j,"state");break;case"effect":this.RefreshControl(j,"effect");break;case"value":switch(j.m_type){case"edit":this.m_toolbarUI.find("#"+k).attr("value",j.m_value);break;case"combo box":this.m_toolbarUI.find("#"+k).children().replaceWith("");for(var f=0;f<g.length;f+=2){if(f+1<g.length){var l=$("<option></option>");l.append(g[f]).attr({value:g[f+1],role:"option"});this.m_toolbarUI.find("#"+k).append(l)}}break;case"button":this.RefreshControl(j,"value");break;default:break}break;case"starttimer":this.m_toolbarUI.find("#"+k).addEffectForCommToolbar("starttimer",{driverTime:g[0],serverTime:g[1]});break;case"stoptimer":this.m_toolbarUI.find("#"+k).addEffectForCommToolbar("stoptimer");break;case"changetooltip":this.RefreshControl(j,"tooltip");break;case"":break;default:break}};function a(f){var g;if(f.m_effect==="toggled"&&f.m_name.indexOf("Agent State")!==-1){g="Change To Ready. Enabled."}else{if(f.m_state==="enabled"&&f.m_name.indexOf("Agent State")!==-1){g="Change To Not Ready. Enabled."}else{if(f.m_effect!==""){g=f.m_effect}else{g=f.m_state}}}return f.m_name+". "+g}e.prototype.ShowStatusText=function(i,g){window.status=i;var h=$("#MsgLayer");h.html("").attr({"aria-hidden":"true",role:"alert"});if(h.length>0){var f=h.attr("timerid");if(f>0){clearTimeout(f)}if(i.length>75){var j=i;i=i.substr(0,75)+"...";h.html('<span id="MessageSpan" class="CommStatusMessage" title="'+j+'" role="alert">'+i+"</span>").removeAttr("aria-hidden")}else{h.html('<span id="MessageSpan" class="CommStatusMessage" role="alert">'+i+"</span>").removeAttr("aria-hidden")}f=setTimeout(function(){h.html("").attr("aria-hidden","true")},g);h.attr("timerid",f)}};e.prototype.ShowStatusTextForSI=function(h){var f=this.m_toolbarUI.find("#Comm_Status_Box").css("display","inline").css("overflow","scroll").attr("aria-label",h);f.html("<nobr>"+h+"</nobr>");window.status=h;var g=this;var i=$("#"+document.activeElement.id);setTimeout(function(){alert(h);if(i.length>0){i.blur();i.focus()}},500)};e.prototype.ShowMessageWithAlert=function(f){alert(f)};e.prototype.FlashTitle=function(g){if(this.m_timerId===0){this.m_oldtitle=document.title;var h=this.m_oldtitle;var f=0;this.m_timerId=setInterval(function(){if(f%2===1){document.title=g}else{document.title=h}f++},1000)}};e.prototype.PlaySound=function(f){if(this.m_toolbarUI.find("#CommSounderWrapper").length>0){this.m_toolbarUI.find("#CommSounderWrapper").empty()}else{this.m_toolbarUI.append('<div id="CommSounderWrapper" style="visibility:hidden" aria-hidden="true"></div>')}this.m_toolbarUI.find("#CommSounderWrapper").append('<audio autoplay src="'+f+'"></audio>')};var c;var b;var d={DOCK:{next_status:["HIDDEN"],status_func:function(f,g){g.removeClass("floatToolbar");g.css("display","inline");if(f.isBlink===true){f.isBlink=false;f.addEffectForCommToolbar("stopblink")}if(g.data("draggable")!==undefined){g.draggable("option","disabled",true)}}},HIDDEN:{next_status:["DOCK","FLOAT"],status_func:function(f,g){if(g.hasClass("floatToolbar")){c=g.offset();g.removeClass("floatToolbar")}g.css("display","none");if(f.isBlink===true){f.addEffectForCommToolbar("blink")}}},FLOAT:{next_status:["DOCK","HIDDEN"],status_func:function(f,h,g){h.css("display","inline");h.addClass("floatToolbar");if(h.data("draggable")===undefined){h.position({my:"left top",at:"right bottom",of:f,collision:"flipfit"});if($.ui.ddmanager){if($.ui.ddmanager.dragStart===undefined){$.ui.ddmanager.dragStart=function(){}}if($.ui.ddmanager.dragStop===undefined){$.ui.ddmanager.dragStop=function(){}}}h.draggable({containment:"window"});if(navigator.appName.indexOf("Microsoft")<0){h.mousedown(function(){if(f.status==="FLOAT"){var j=h.find('[tabindex="0"]').attr("id");var i=h.find(".commEdit");if(i.length>0){i.first().focus().blur()}if(!$("#"+j).hasClass("commEdit")){h.find("#"+j).focus()}}})}}else{h.offset(c);h.draggable("option","disabled",false)}if(f.isBlink===true){f.isBlink=false;f.addEffectForCommToolbar("stopblink")}}},UNKNOWN:{next_status:[],stauts_func:undefined}};e.prototype.CtrlBtnOp=function(m,l,f){var i=$(SiebelApp.S_App.CommToolbar.GetPlaceholder());if(m.status===undefined){if(i.css("display")==="inline"){m.status="DOCK"}else{if(i.css("display")==="none"){m.status="HIDDEN"}else{SiebelApp.S_App.CommToolbarUtil.Log(2,"commToolbarprender.js: toolbar control display is: "+i.css("display"));m.status="UNKNOWN"}}}var o=l;if(o==="TOGGLE"){if(m.status==="DOCK"){o="HIDDEN"}else{o="DOCK"}}else{if(o==="HIDDEN_FLOAT"){if(m.status!=="FLOAT"){return}else{o="HIDDEN"}}}var j=d[m.status];if(j==="undefined"){SiebelApp.S_App.CommToolbarUtil.Log(2,"commToolbarprender.js: unknown toolbar status: "+j);return}var g=j.next_status;for(var n in g){if(g.hasOwnProperty(n)){var h=g[n];if(h===o){m.status=o;var k=d[o];k.status_func(m,i,f);return}}}};e.prototype.BlinkParentBtn=function(){if(b===undefined||b.status===undefined){return}if(b.status==="HIDDEN"){b.isBlink=true;b.addEffectForCommToolbar("blink")}};e.prototype.StopBlinkCtrlBtn=function(){if(b===undefined){return
}b.isBlink=false;if(b.status!=="Dock"){b.addEffectForCommToolbar("stopblink")}};e.prototype.RegisterControlBtn=function(f){b=f;if(b.length===0){return}var g=this;b.mouseup(function(){g.CtrlBtnOp(b,"TOGGLE");g.m_mark=true});b.keydown(function(h){if(h.which===$.ui.keyCode.ENTER){g.CtrlBtnOp(b,"TOGGLE")}});$(document).mouseup(function(){if(g.m_mark===false){g.CtrlBtnOp(b,"HIDDEN_FLOAT")}g.m_mark=false});b.mouseover(function(h){g.CtrlBtnOp(b,"FLOAT",h)})};e.prototype.SetLocalizationStrings=function(f){};e.prototype.GotoCTIToolbar=function(){this.m_toolbarUI.find('[tabindex="0"]').focus()};e.prototype.ShowMsgOverCTIToolbar=function(){this.m_mapNameToOrder={};this.m_toolbarUI.children().hide().attr("aria-hidden","true");this.m_toolbarUI.children("#CommStatusBox").show().removeAttr("aria-hidden").children().attr("tabindex","0");if(b!==null&&b!==undefined&&b.length>0){b.hide()}};e.prototype.SetAccessibility=function(f){this.m_bAccessibility=f;this.BindEvents2();this.m_toolbarUI.show()};e.prototype.UpdateCallContactFromUI=function(f){if(f){$(".siebui-call-from-ui-disabled").removeClass("siebui-call-from-ui-disabled").addClass("siebui-call-from-ui-enabled")}else{$(".siebui-call-from-ui-enabled").removeClass("siebui-call-from-ui-enabled").addClass("siebui-call-from-ui-disabled");try{var h=$("#comm_makecall_popup");if(h.length>0){h.dialog("close")}}catch(g){SiebelApp.S_App.CommToolbarUtil.Log(2,"commToolbarprender.js: "+g)}}};e.prototype.OpenCallContactFromUIPopup=function(f,i){try{if(this.m_bIsMakeCallPopupNeeded){if(f.length>0){if(i===null||i===undefined){i=$(":focus").first()}this.MakeCallToUIPhone(f,i,true)}else{var h=$("#comm_makecall_popup");if(h.length>0){h.dialog("close")}}}else{if(f.length>0){this.MakeCallToUIPhone(f,i,false)}}}catch(g){SiebelApp.S_App.CommToolbarUtil.Log(2,"commToolbarprender.js: "+g)}};(function(h){function f(l){var k=Math.floor(l/1000);var i=Math.floor(k/3600);k-=i*3600;var j=Math.floor(k/60);k-=j*60;if(i<10){i="0"+i}if(j<10){j="0"+j}if(k<10){k="0"+k}return i+":"+j+":"+k}var g={blink:function(j){var k={delay:500,opacity:1};var i=h.extend(k,j);return this.each(function(){var l=h(this);if(l.attr("timerid")>0){clearInterval(l.attr("timerid"))}var m=setInterval(function(){if(l.css("opacity")==="1"){l.animate({opacity:0},i.delay/2,"",function(){if(l.attr("timerid")==="0"){l.css("opacity",i.opacity===1?1:0)}})}else{l.animate({opacity:1},i.delay/2)}},i.delay);l.attr("timerid",m)})},stopblink:function(j){var k={opacity:1};var i=h.extend(k,j);return this.each(function(){var l=h(this);if(l.attr("timerid")>0){clearInterval(l.attr("timerid"));l.attr("timerid",0);l.stop();l.css("opacity",i.opacity===1?1:0)}})},starttimer:function(j){var k={delay:1000};var i=h.extend(k,j);return this.each(function(){var o=h(this);var n=i.driverTime*1000;var l=i.serverTime*1000;var q=new Date();var m=new Date().getTime()-q.getTime()+l-n;o.text(f(m));if(o.attr("timerid")>0){clearInterval(o.attr("timerid"))}var p=setInterval(function(){m=new Date().getTime()-q.getTime()+l-n;o.text(f(m))},i.delay);o.attr("timerid",p)})},stoptimer:function(){return this.each(function(){var i=h(this);i.text("00:00:00");if(i.attr("timerid")>0){clearInterval(i.attr("timerid"));i.attr("timerid",0)}})}};h.fn.addEffectForCommToolbar=function(i){if(g[i]){return g[i].apply(this,Array.prototype.slice.call(arguments,1))}}}(jQuery));return e}())};