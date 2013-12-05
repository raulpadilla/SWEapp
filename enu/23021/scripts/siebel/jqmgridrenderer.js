if(typeof(SiebelAppFacade.JQMGridRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JQMGridRenderer");var siebConsts=SiebelJS.Dependency("SiebelApp.Constants");var utils=SiebelJS.Dependency("SiebelApp.Utils");var btnControl=siebConsts.get("SWE_PST_BUTTON_CTRL");var btn=siebConsts.get("SWE_PST_BUTTON_CTRL");var pick=siebConsts.get("SWE_CTRL_PICK");var checkbox=siebConsts.get("SWE_CTRL_CHECKBOX");var combo=siebConsts.get("SWE_CTRL_COMBOBOX");var dateTimePick=siebConsts.get("SWE_CTRL_DATE_TIME_PICK");var datePick=siebConsts.get("SWE_CTRL_DATE_PICK");var dateTimezonePick=siebConsts.get("SWE_CTRL_DATE_TZ_PICK");var calc=siebConsts.get("SWE_CTRL_CALC");var mailTo=siebConsts.get("SWE_CTRL_MAILTO");var textArea=siebConsts.get("SWE_CTRL_TEXTAREA");var text=siebConsts.get("SWE_CTRL_TEXT");var url=siebConsts.get("SWE_CTRL_URL");var tel=siebConsts.get("SWE_CTRL_PHONE");var mvg=siebConsts.get("SWE_CTRL_MVG");var currencyCal=siebConsts.get("SWE_CTRL_CURRENCY_CALC");var passwordCtrl=siebConsts.get("SWE_CTRL_PWD");var localeObj=SiebelApp.S_App.LocaleObject;var ampmTxt=localeObj.GetLocalString("IDS_CALENDAR_PMAM_COMBOBOX_TITLE")||"AM or PM";var hrTxt=localeObj.GetLocalString("IDS_SWE_TIMEPICKER_HOUR")||"Hour";var minTxt=localeObj.GetLocalString("IDS_SWE_TIMEPICKER_MINUTE")||"Minute";var secTxt=localeObj.GetLocalString("IDS_SWE_TIMEPICKER_SECOND")||"Second";var dayTxt=localeObj.GetLocalString("IDS_SWE_MOBISCROLL_DAY")||"Day";var monTxt=localeObj.GetLocalString("IDS_CALENDAR_MONTH_COMBOBOX_TITLE")||"Month";var yearTxt=localeObj.GetLocalString("IDS_CALENDAR_YEAR_COMBOBOX_TITLE")||"Year";var sun=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_SUN")||"Sun";var mon=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_MON")||"Mon";var tue=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_TUE")||"Tue";var wed=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_WED")||"Wed";var thu=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_THU")||"Thu";var fri=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_FRI")||"Fri";var sat=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_SHORT_SAT")||"Sat";var dayShortArray=[sun,mon,tue,wed,thu,fri,sat];var sunday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_SUNDAY")||"Sunday";var monday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_MONDAY")||"Monday";var tuesday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_TUESDAY")||"Tuesday";var wednesday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_WEDNESDAY")||"Wednesday";var thursday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_THURSDAY")||"Thursday";var friday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_FRIDAY")||"Friday";var saturday=localeObj.GetLocalString("IDS_SWE_JQGRID_DAY_FULL_SATURDAY")||"Saturday";var dayArray=[sunday,monday,tuesday,wednesday,thursday,friday,saturday];var jan=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_JAN")||"Jan";var feb=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_FEB")||"Feb";var mar=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_MAR")||"Mar";var apr=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_APR")||"Apr";var may=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_MAY")||"May";var jun=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_JUN")||"Jun";var jul=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_JUL")||"Jul";var aug=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_AUG")||"Aug";var sep=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_SEP")||"Sep";var oct=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_OCT")||"Oct";var nov=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_NOV")||"Nov";var dec=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_SHORT_DEC")||"Dec";var monShortArray=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];var january=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_JANUARY")||"January";var february=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_FEBRUARY")||"February";var march=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_MARCH")||"March";var april=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_APRIL")||"April";var mayfull=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_MAY")||"May";var june=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_JUNE")||"June";var july=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_JULY")||"July";var august=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_AUGUST")||"August";var september=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_SEPTEMBER")||"September";var october=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_OCTOBER")||"October";var november=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_NOVEMBER")||"November";var december=localeObj.GetLocalString("IDS_SWE_JQGRID_MONTH_FULL_DECEMBER")||"December";var monthArray=[january,february,march,april,mayfull,june,july,august,september,october,november,december];if(typeof(SiebelApp)!=="undefined"&&typeof(SiebelApp.S_App)!=="undefined"){if(typeof(SiebelApp.Constants)!=="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_UIDEF_GRID_PRENDR"),"SiebelAppFacade.JQMGridRenderer")}}SiebelAppFacade.JQMGridRenderer=(function(){var m=SiebelJS.Dependency("SiebelApp.Constants");var o=m.get("SWE_PST_BUTTON_CTRL");function d(y){SiebelAppFacade.JQMGridRenderer.superclass.constructor.call(this,y);var z;var C;var E;var u;var x;var D;var B;var A=new SiebelAppFacade.GridColumnHelper();var t;var w;var v=false;var s=false;this.GetJQMList=function(){return z};this.SetJQMList=function(F){z=F};this.GetJQMListId=function(){return C};this.SetJQMListId=function(F){C=F};this.GetRowCount=function(){return($("#"+this.GetJQMRows()+" .jqmgrid_row").size())};this.GetCurRowSel=function(){return x};this.SetCurRowSel=function(F){x=F};this.GetDelControl=function(){return E};this.SetDelControl=function(F){E=F};this.GetDelBtnStatus=function(){return u};this.SetDelBtnStatus=function(F){u=F};this.GetJQMLabels=function(){return D};this.SetJQMLabels=function(F){D=F};this.GetJQMRows=function(){return B};this.SetJQMRows=function(F){B=F};this.GetColumnHelper=function(){return A};this.SetSortOrder=function(F){t=F};this.GetSortOrder=function(){return t};this.GetPM().AttachPMBinding("UpdateQuickPickInfo",this.UpdatePick,{scope:this});this.GetJQMRefresh=function(){return v};this.SetJQMRefresh=function(F){v=F};this.GetTapStatus=function(){return s};this.SetTapStatus=function(F){s=F}}SiebelJS.Extend(d,SiebelAppFacade.JQMScrollContainer);function k(t,s,u,v){return'<a id = "listcol_'+v+"_"+u+'" href="javascript:void(0);" class="drilldown" name="'+s+'">'+t+"</a>"}d.prototype.UpdatePick=function(){SiebelAppFacade.JQMGridRenderer.superclass.UpdatePick.call(this,arguments[arguments.length-1]);var u=this.GetPM();var x=arguments[arguments.length-1];var s=u.GetProxy().GetActiveControl();var y=u.Get("GetRecordSet")[u.Get("GetSelection")];var E=s.GetFieldName();var t=null;var H=0;if(HtmlEncode(u.GetProxy().GetBusComp().GetFieldValue(E))){t=HtmlEncode(u.GetProxy().GetBusComp().GetFieldValue(E))
}else{if(y&&y[E]){t=HtmlEncode(y[E])}}var z=u.Get("GetPlaceholder");var D=u.Get("GetSelection");var w=this.GetColumnHelper().GetModifiedColumnName(s.GetName());D=D+this.m_Offset;var G="jqmgrid_"+z+"_"+D+"_"+w;var C=$("#"+G);if((!this.IsPopup())&&C.find('option[data-placeholder="true"]').length===0){C.prepend('<option data-placeholder="true" value=""></option>');H=1}if(!utils.IsEmpty(E)&&(C.find('option[value=""]').length<=H)){C.prepend('<option value=""></option>')}C.children('option[value!=""]').attr("disabled","disabled");var B;var F;var v;for(var A=0;A<x.length;A++){B=HtmlEncode(x[A]);F=x[A];if(!utils.IsEmpty(F)){F=x[A].replace(/\"/g,'\\"')}v=C.find('option[value="'+F+'"]');if(v.length===0){C.append('<option value="'+B+'">'+B+"</option>")}else{v.removeAttr("disabled")}}C.children('option[disabled="disabled"]').remove();delete this.inProgress};d.prototype.ShowUI=function(E){SiebelAppFacade.JQMGridRenderer.superclass.ShowUI.call(this);this.m_Offset=0;var u=this.GetPM();u.GetProxy().SetActiveControl(null);var s=u.GetProxy().GetName();var y=u.Get("GetPlaceholder");this.SetJQMList($("#"+y));var F="scrollviewcontainer_"+y;var x="jqmgrid_"+y;var C="jqmgridlabel_"+y;var z="jqmchildgrid_"+y;var v=u.Get("ListOfColumns");var B=[];B[0]="ui-grid-a";B[1]="ui-grid-a";B[2]="ui-grid-b";B[3]="ui-grid-c";B[4]="ui-grid-d";var w=(v.length<=4)?v.length:4;this.GetJQMList().html("<div id='"+x+"'></div>");this.SetJQMListId($("#"+x));$("#"+x).html("<div id='"+C+"' class='"+B[w]+"'></div><div id='"+F+"'></div>");this.SetJQMLabels(C);this.SetScrollcontainer(F);$("#"+F).html("<div id='"+z+"' class='"+B[w]+"'></div>");this.SetJQMRows(z);var D=this.GetColumnHelper();this.SetSortOrder("asc");for(var A=0,t=v.length;A<t;A++){D.AddColumn(v[A].name,v[A].control)}this.ShowSearch();this.MakecontainerScrollable(null,false,false,true);F=null};d.prototype.SetControlValue=function(w,B){SiebelAppFacade.JQMGridRenderer.superclass.SetControlValue.call(this,w,B);var v=this.GetPM();var A=v.Get("GetPlaceholder");var z=this.GetCurRowSel();var t=z+this.m_Offset;var y=this.GetColumnHelper().GetModifiedColumnName(w.GetName());var x="jqmgrid_"+A+"_"+t+"_"+y;var s=w.GetUIType();if(s==="Pick"){var u=$("#"+x);u.attr("value",B)}};d.prototype.ShowSearch=function(){if(false===this.IsPopup()){var w=this.GetPM().Get("GetPlaceholder");var u=[];var v=this.GetPM().Get("ListOfColumns");for(var t=0,s=v.length;t<s;t++){u.push(v[t].control.GetDisplayName())}this.GetSearchCtrl().ShowUI(u,w)}};d.prototype.BindData=function(P){if(this.inProgress){return false}var I=this.GetJQMListId();var x=0;var z=this.GetPM();var Y=null;var L=0;Y=z.Get("GetScrollDir");L=z.Get("GetScrollAmount");L=parseInt(L,10);var E=z.Get("GetRecordSet").length;var s=E;var S=0;if(Y!==null&&L!==0&&L<E){var W=this.GetJQMLabels();var v="#"+W;$(v).empty();x=true;if(L<0){L=-L}if(Y){S=E-L;this.m_Offset=this.m_Offset+L}else{S=0;s=L;this.m_Offset=this.m_Offset-L}}else{if(P){SiebelJS.Log("Data Cleared");this.ClearData();this.SetJQMRefresh(true);this.m_Offset=0}}var t=z.Get("GetRecordSet");var N=z.Get("ListOfColumns");var B=z.Get("GetPlaceholder");var ae="jqmgrid_"+B+"_";var T=0;var u=[];u[0]="ui-block-a";u[1]="ui-block-b";u[2]="ui-block-c";u[3]="ui-block-d";u[4]="ui-block-e";var M=(N.length<=4)?N.length:4;var ac;var D;var J;var F;var ab;var Z;var H="";H=H.concat("<div class = 'jqmgrid_Label' id='jqmgrid_"+B+"_label'>");for(T=0;T<M;T++){var G=N[T].control.GetDisplayName();var af=N[T].name;var ad=this.GetColumnHelper().GetModifiedColumnName(af);var Q="jqmgrid_"+B+"_label_"+ad;H=H.concat("<div class='"+u[T]+"'> <div id='"+Q+"' class='ui-bar ui-bar-b jqmgrid_label_bar'>"+G+"</div> </div>")}H=H.concat("</div>");$("#"+this.GetJQMLabels()).append(H).trigger("create");var U=ae+"NR";if($("#"+U).length===1){$("#"+U).remove()}if(E<1){var V=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MOBILE_NO_RECORDS_TO_DISPLAY");var y='<div id="'+U+'" class="jqmNoRecord">';y=y.concat("<span>"+V+"</span></div>");$("#scrollviewcontainer_"+B).prepend(y)}H="";var A={JText:"text",JDatePick:"date",JDateTimePick:"datetime",JDateTimeZonePick:"datetime",Mailto:"email",Phone:"tel",URL:"url",JTextArea:"textarea",JCalculator:"number",JCheckBox:"checkbox",JComboBox:"select",Pick:"text",Detail:"text",JCurrencyCalc:"number",JPassword:"password"};for(ac=S;ac<s;ac++){var X=ac+this.m_Offset;H=H.concat("<div class='jqmgrid_row' id='jqmgrid_"+B+"_"+X+"'>");for(T=0;T<M+1;T++){if(T<M){D=HtmlEncode(t[ac][N[T].control.GetFieldName()]);J=N[T].controlType;Z=N[T].control.GetFieldName();if(!utils.IsEmpty(Z)&&this.GetPM().Get("GetBusComp").GetField(Z).GetDataType()==="phone"){J="Phone"}F=N[T].name;F=this.GetColumnHelper().GetModifiedColumnName(F);ab="jqmgrid_"+B+"_"+X+"_"+F;H=H.concat("<div class='"+u[T]+" ui-bar-d'> <div class='ui-bar jqmgrid_row_bar'>"+l(ab,F,D,J,A[J],this.IsPopup())+"</div> </div>")}else{var aa="jqmgrid_"+B+"_"+X+"_Delete";H=H.concat("<div class='"+u[T]+"'> <button class='jqmgrid_Delete ui-btn-delete-enabled' id = '"+aa+"' data-inline='true' data-iconpos='center' data-icon='custom-trashcan' ></button> </div> ")}}H=H.concat(" </div>")}H=H.concat("</div>");var R;if(Y!==null&&!Y){R=this.m_Offset+L;R=ae+R;$(H).insertBefore("#"+R).trigger("create")}else{$("#"+this.GetJQMRows()).append(H).trigger("create")}I.trigger("create");if(x){for(ac=1;ac<=L;ac++){if(Y){T=this.m_Offset-ac}else{T=this.m_Offset+ac+E-1}$("#"+ae+T).addClass("removeli")}I.children().find(".removeli").remove();this.SetNewscrollpos(Y,L);x=false}if(!this.IsPopup()){var w=$(".jqmgrid_select").prev();w.addClass("jqmgrid_customselect");$(".jqmgrid_select").selectmenu()}var C;if(!(this.GetDelBtnStatus())){C="#jqmgrid_"+B+" .jqmgrid_Delete";$(C).removeClass("ui-btn-delete-enabled").addClass("ui-btn-delete-disabled");$(C).button("disable")}else{C="#jqmgrid_"+B+" .jqmgrid_Delete";$(C).removeClass("ui-btn-delete-disabled").addClass("ui-btn-delete-enabled")}for(ac=S;ac<s;ac++){var O=ac+this.m_Offset;for(T=0;T<M;T++){D=HtmlEncode(t[ac][N[T].control.GetFieldName()]);J=N[T].controlType;F=N[T].name;F=this.GetColumnHelper().GetModifiedColumnName(F);ab="jqmgrid_"+B+"_"+O+"_"+F;var K=this.GetColumnHelper().GetColumnControl(F);this.PostUIGridPrep(ab,K,D)}}$("#jqmgrid_"+B+" .jqmgrid_checkbox").bind("click",{ctx:this},function(aj){aj.preventDefault();var ag=aj.data.ctx;SiebelJS.Log("check Box Clicked ");$(this).focus();var ai=$(this).attr("id");var ah=ag.GetSelectedRow($(this).attr("id"));var ak=$(this).attr("Value");if(ak==="Y"){$(this).attr("value","N")}else{if(ak==="N"){$(this).attr("value","Y")}}if(ag.OnRowSelect(ah)===false){return false}SiebelJS.Log("Check Box Click End")});this.CheckScrollboundries()};d.prototype.GetListHeight=function(){var t=this.GetPM().Get("GetPlaceholder");var s="#jqmchildgrid_"+t;return $("#"+this.GetScrollcontainer()).children(s).height()};function l(y,u,x,t,w,s){var v="";switch(t){case datePick:case dateTimePick:case dateTimezonePick:v=v.concat("<input type='text' id='"+y+"' name='"+y+"' class='mobiscroll' value='"+x+"'/>");break;
case text:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case calc:case currencyCal:w="text";v=v.concat("<input type='"+w+"' pattern='[0-9]*' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case url:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case tel:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case mailTo:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case textArea:v=v.concat("<textarea type='textarea' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case checkbox:v=v.concat("<input class='custom jqmgrid_checkbox'  type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/><label for='"+y+"' id='"+y+"_label'></label></fieldset>");break;case combo:if(!s){v=v.concat("<select data-native-menu='false' data-placeholder='true' class='jqmgrid_select' id='"+y+"' name='"+y+"' value='"+x+"'><option value='"+x+"' selected='selected'>"+x+"</option></select>")}else{v=v.concat("<select class='jqmgrid_select' id='"+y+"' name='"+y+"' value='"+x+"'><option value='"+x+"' selected='selected'>"+x+"</option></select>")}break;case pick:v=v.concat("<input class = 'jqmgrid_pick' type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;case passwordCtrl:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break;default:v=v.concat("<input type='"+w+"' id='"+y+"' name='"+y+"' value='"+x+"'/>");break}return v}function r(w,v){var s="";var x=SiebelApp.S_App.GetIconMap();var u=x[SiebelApp.S_App.LookupStringCache(w.GetIconMap())];if(u){for(var t=0;t<u.length;t++){if(!utils.IsEmpty(v)&&u[t].iconName===v){return u[t].iconImage}if(u[t].iconName==="Default"){s=u[t].iconImage}}if(!utils.IsEmpty(s)){return s}}return""}d.prototype.PostUIGridPrep=function(G,z,y){var F=z.GetFieldName();var u=z.GetUIType();var s=z;var A=this.GetPM().Get("GetPlaceholder");var E=(new Date()).getFullYear();var x={dFormat:"mm/dd/yy",tFormat:"HH:ii:ss",dOrder:"mmddyy",tWheels:"HHiiss"};if(!utils.IsEmpty(F)&&this.GetPM().GetProxy().GetBusComp().GetField(F).GetDataType()==="phone"){u="Phone"}var t=this.GetColumn(G);var B=this.GetPM().ExecuteMethod("CanUpdate",this.GetColumnHelper().GetActualControlName(t));this.EnableControl(z,B,G);switch(u){case datePick:SiebelAppFacade.JQMGridRenderer.superclass.ConvertLocale.call(this,x);$("#"+G).scroller({preset:"date",dateOrder:x.dOrder,dateFormat:x.dFormat,endYear:E+10,startYear:E-50,dayText:dayTxt,monthText:monTxt,yearText:yearTxt,dayNames:dayArray,dayNamesShort:dayShortArray,monthNames:monthArray,monthNamesShort:monShortArray});break;case dateTimePick:SiebelAppFacade.JQMGridRenderer.superclass.ConvertLocale.call(this,x);$("#"+G).scroller({preset:"datetime",timeFormat:x.tFormat,timeWheels:x.tWheels,dateOrder:x.dOrder,dateFormat:x.dFormat,endYear:E+10,startYear:E-50,ampmText:ampmTxt,hourText:hrTxt,minuteText:minTxt,secText:secTxt,dayText:dayTxt,monthText:monTxt,yearText:yearTxt,dayNames:dayArray,dayNamesShort:dayShortArray,monthNames:monthArray,monthNamesShort:monShortArray});break;case dateTimezonePick:SiebelAppFacade.JQMGridRenderer.superclass.ConvertLocale.call(this,x);$("#"+G).scroller({preset:"datetime",timeFormat:x.tFormat,timeWheels:x.tWheels,dateOrder:x.dOrder,dateFormat:x.dFormat,endYear:E+10,startYear:E-50,ampmText:ampmTxt,hourText:hrTxt,minuteText:minTxt,secText:secTxt,dayText:dayTxt,monthText:monTxt,yearText:yearTxt,dayNames:dayArray,dayNamesShort:dayShortArray,monthNames:monthArray,monthNamesShort:monShortArray});break;case mailTo:$("#"+G+"_mailto").addClass("email");break;case tel:$("#"+G+"_tel").addClass("tel");break;case url:$("#"+G+"_url").addClass("url");break;case combo:break;case checkbox:$("#"+G).attr("checked",utils.IsTrue(y));$("#"+G).checkboxradio("refresh");break;case pick:SiebelAppFacade.ControlBuilder.Pick({target:$("#"+G),className:"applet-jqmlist-pick",scope:this,click:function(K){SiebelApp.S_App.uiStatus.Busy({target:SiebelApp.S_App.GetTargetViewContainer(),mask:true});var J=z.GetMethodPropSet();var H=J.Clone();var I={};I.async=false;I.mask=true;I.target=SiebelApp.S_App.GetTargetViewContainer();I.cb=function(){SiebelApp.S_App.uiStatus.Free()};this.GetPM().OnControlEvent(m.get("PHYEVENT_INVOKE_PICK"),K,H,I)},control:z});break;default:if(z.GetShowBase()&&z.GetUIType()!=="checkBoxCtrl"){var w=r.call(this,z,y);if(!utils.IsEmpty(w)){var D=$("#"+G).parent();var C=$("#"+G).attr("id");var v=$("#"+G).attr("name");$(D).html(w);$(D).attr("id",C);$(D).attr("name",v)}}break}};d.prototype.EndLife=function(){$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row","click");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row input","focus");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row select","focus");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row input, .jqmgrid_row select","blur");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row .jqmgrid_pick","click");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row .jqmgrid_Delete","click");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_label_bar","click");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row .jqmgrid_customselect","blur");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row .jqmgrid_customselect","click tap");$("#jqmgrid_"+this.GetPM().Get("GetPlaceholder")).undelegate(".jqmgrid_row .jqmgrid_customselect","touchend mouseup");this.GetSearchCtrl().SetContainer(null);this.SetJQMList(null);this.SetJQMListId(null);SiebelAppFacade.JQMGridRenderer.superclass.EndLife.call(this)};d.prototype.BindEvents=function(s){SiebelAppFacade.JQMGridRenderer.superclass.BindEvents.call(this,s);var t=this;var u=this.GetPM().Get("GetPlaceholder");$("#jqmgrid_"+u).delegate(".jqmgrid_row","click",{ctx:this},c).delegate(".jqmgrid_row input","focus",{ctx:this},e).delegate(".jqmgrid_row input","blur",{ctx:this},a).delegate(".jqmgrid_row .jqmgrid_pick","click",{ctx:this},p).delegate(".jqmgrid_row .jqmgrid_pick","taphold",{ctx:this},g).delegate(".jqmgrid_row .jqmgrid_Delete","click",{ctx:this},f).delegate(".jqmgrid_label_bar","click",{ctx:this},h);if(!this.IsPopup()){$("#jqmgrid_"+u).delegate(".jqmgrid_row .jqmgrid_customselect","blur",{ctx:this},b);$("#jqmgrid_"+u).delegate(".jqmgrid_row .jqmgrid_customselect","click tap",{ctx:this},i);$("#jqmgrid_"+u).delegate(".jqmgrid_row .jqmgrid_customselect","touchend mouseup",{ctx:this},function(x){var v=$(window).height();var w;if(window.innerHeight>window.innerWidth){w=v*0.6}else{w=v*0.3}$(".ui-selectmenu").removeAttr("style");$(".ui-selectmenu").css("max-height",w+"px");$(this).next().selectmenu("close")})}else{$("#jqmgrid_"+u).delegate(".jqmgrid_row select","focus",{ctx:this},n);$("#jqmgrid_"+u).delegate(".jqmgrid_row select","blur",{ctx:this},a)}u=null};function c(u){var s=u.data.ctx;if($.browser.msie){s.GetPM().GetProxy().SetActiveControl(null)
}var t=s.GetSelectedRow($(this).attr("id"));SiebelJS.Log("Row being selected "+t);if(s.OnRowSelect(t)===false){return false}}function e(w){var s=w.data.ctx;SiebelJS.Log("Focus on Input Element.. ");var v=$(this).attr("id");var u=s.GetSelectedRow($(this).attr("id"));if(s.OnRowSelect(u)===false){return false}var t=s.GetSelectedControl($(this).attr("id"));var z=s.GetColumnControl(t);var y=$(this);var x=y.val();if(!(s.GetJQMRefresh())){s.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_FOCUS"),u,z,x);SiebelJS.Log("Focus on Input Element..set ")}s.SetJQMRefresh(false);SiebelJS.Log("Focus on Input Element..END ")}function n(v){var s=v.data.ctx;SiebelJS.Log("Focus on Select Element ");var u=s.GetSelectedRow($(this).attr("id"));if(s.OnRowSelect(u)===false){return false}var t=s.GetSelectedControl($(this).attr("id"));var y=s.GetColumnControl(t);if(!(s.GetJQMRefresh())){var x=$(this);var w=x.val();s.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_FOCUS"),u,y,w);j.call(s,y)}s.SetJQMRefresh(false);SiebelJS.Log("Focus on Select Element END")}function i(t){if(!$.browser.msie){var u=$(this).is(":focus");if(u){return}}$(this).focus();var A=t.data.ctx;var B=$(this).next().attr("id");var x;$(this).next().selectmenu("close");var v=A.GetSelectedRow($(this).next().attr("id"));var y=A.GetSelectedControl($(this).next().attr("id"));var w=A.GetColumnControl(y);SiebelJS.Log("Focus on Select Element "+v);if(A.OnRowSelect(v)===false){return false}SiebelApp.S_App.uiStatus.Busy({});x=$("#"+B);if(A.GetJQMRefresh()){A.SetJQMRefresh(false)}$(x).focus();if(!(A.GetJQMRefresh())){var s=$(x);var z=s.val();A.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_FOCUS"),v,w,z);j.call(A,w)}$(x).selectmenu("refresh",true);$(x).selectmenu("open");SiebelApp.S_App.uiStatus.Free();SiebelJS.Log("Focus on Select Element END")}function a(t){var B=t.data.ctx;SiebelJS.Log("Blur from Input Element.. ");var u=B.GetSelectedRow($(this).attr("id"));if(parseInt(u,10)!==B.GetCurRowSel()){SiebelJS.Log("blur not on same row");return false}var y=B.GetSelectedControl($(this).attr("id"));var v=B.GetColumnControl(y);var s=$(this);var x=s.attr("type");var z=s.val();if(x==="checkbox"){var w=$(this).attr("Value");B.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,w)}else{x=v.GetUIType();if(x===datePick||x===dateTimePick||x===dateTimezonePick){var A=utils.Trim(z);A=utils.toISOFormat(A,(x!==datePick))||A;B.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,A)}else{B.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,z)}}SiebelJS.Log("Blur from Input Element..END ")}function b(t){var A=t.data.ctx;SiebelJS.Log("Blur from next Input Element.. ");var u=A.GetSelectedRow($(this).next().attr("id"));if(parseInt(u,10)!==A.GetCurRowSel()){SiebelJS.Log("blur not on next same row");return false}var x=A.GetSelectedControl($(this).next().attr("id"));var v=A.GetColumnControl(x);var s=$(this).next();var w=s.attr("type");var y=s.val();if(w==="checkbox"){A.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,($(this).prop("checked")?"Y":"N"))}else{w=v.GetUIType();if(w===datePick||w===dateTimePick||w===dateTimezonePick){var z=utils.Trim(y);z=utils.toISOFormat(z,(w!==datePick))||z;A.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,z)}else{A.GetPM().OnControlEvent(m.get("PHYEVENT_COLUMN_CHANGE"),u,v,y)}}SiebelJS.Log("Blur from next Input Element..END ")}function q(u){var s=u.data.ctx;SiebelJS.Log("Checkbox click ");$(this).focus();var t=s.GetSelectedRow($(this).attr("id"));if(s.OnRowSelect(t)===false){return false}}function p(s){var y=this;var A=s.data.ctx;SiebelJS.Log("Click on PICK element...");if(!(A.GetTapStatus())){var v=A.GetSelectedRow($(this).attr("id"));if(A.OnRowSelect(v)===false){return false}var z=A.GetSelectedControl($(this).attr("id"));var w=A.GetColumnControl(z);SiebelApp.S_App.uiStatus.Busy({target:SiebelApp.S_App.GetTargetViewContainer(),mask:true});var u=w.GetMethodPropSet();var t=u.Clone();var x={};x.async=false;x.mask=true;x.target=SiebelApp.S_App.GetTargetViewContainer();x.cb=function(){SiebelApp.S_App.uiStatus.Free()};setTimeout(function(){$(y).focus();A.GetPM().OnControlEvent(m.get("PHYEVENT_INVOKE_PICK"),w,t,x)},0);$(this).blur();SiebelJS.Log("Click on PICK element End")}A.SetTapStatus(false)}function g(v){var u=this;var s=v.data.ctx;SiebelJS.Log("Tap&hold on PICK element...");if($(this).val()!==""){s.SetTapStatus(true);var t=this;var w=new SiebelApp.UIStatus();w.Busy({});setTimeout(function(){$(t).val("");$(t).blur();w.Free()},0)}}function f(x){x.preventDefault();var t=x.data.ctx;SiebelJS.Log("Click on DELETE element ");var v=t.GetSelectedRow($(this).attr("id"));if(t.OnRowSelect(v)===false){return false}var y=t.GetDelControl();var w=y.GetMethodPropSet();var s=w.Clone();var u={};u.async=false;u.mask=true;u.target=SiebelApp.S_App.GetTargetViewContainer();u.cb=function(){var z=Array.prototype.slice.call(arguments);if(z[z.length-1]===false){SiebelApp.S_App.uiStatus.Free()}};t.GetPM().OnControlEvent(m.get("PHYEVENT_INVOKE_CONTROL"),y.GetMethodName(),s,u)}function h(w){var t=w.data.ctx;SiebelJS.Log("Click on Sort element ");var v=t.GetSortOrder();if(v==="desc"){t.SetSortOrder("asc")}else{t.SetSortOrder("desc")}var s=$(this).attr("id");var u=t.GetSelectedControl($(this).attr("id"));var x=t.GetColumnHelper().GetActualControlName(u);t.GetPM().OnControlEvent(m.get("PHYEVENT_LIST_SORT"),x,v)}d.prototype.GetSelectedRow=function(t){var v=this.GetPM().Get("GetPlaceholder");var s="jqmgrid_"+v+"_";t=t.replace(s,"");var w=t;var u=t.indexOf("_");if(u>=0){w=t.slice(0,u)}w=parseInt(w,10);w=w-this.m_Offset;v=null;return w};d.prototype.GetSelectedControl=function(t){var v=this.GetPM().Get("GetPlaceholder");var s="jqmgrid_"+v+"_";t=t.replace(s,"");var u=t.indexOf("_");t=t.slice(u+1);v=null;return t};d.prototype.GetColumnControl=function(s){return this.GetColumnHelper().GetColumnControl(s)};d.prototype.ShowSelection=function(){if(this.inProgress){return false}this.ClearSelection();var s=this.GetRowCount();var u=this.GetPM().Get("GetRowsSelectedArray");for(var t=0;t<s&&t<u.length;t++){if(u[t]){this.setSelection(t,false)}}SiebelAppFacade.JQMGridRenderer.superclass.ShowSelection.call(this)};d.prototype.ClearData=function(){var u=this.GetJQMRows();var t=this.GetJQMLabels();var s="#"+u;$(s).empty();s="#"+t;$(s).empty()};d.prototype.setSelection=function(u){var w="jqmgrid_"+this.GetPM().Get("GetPlaceholder")+"_";var v=this.m_Offset+u;v=parseInt(v,10);var t=w+v;var s="#"+t;$(s).addClass("hilight");$(s).children(".ui-block-a").removeClass("ui-bar-d").addClass("ui-bar-b");$(s).children(".ui-block-b").removeClass("ui-bar-d").addClass("ui-bar-b");$(s).children(".ui-block-c").removeClass("ui-bar-d").addClass("ui-bar-b");$(s).children(".ui-block-d").removeClass("ui-bar-d").addClass("ui-bar-b");this.SetCurRowSel(u)};d.prototype.GetRowIndex=function(t){var v=this.GetPM().Get("GetPlaceholder");var s="jqmgrid_"+v+"_";t=t.replace(s,"");var u=t.indexOf("_");var w=t.slice(0,u);v=null;return w};d.prototype.GetColumn=function(u){var s=u;var w=this.GetPM().Get("GetPlaceholder");
var t="jqmgrid_"+w+"_";u=u.replace(t,"");var v=u.indexOf("_");var x=u.slice(0,v);t=t+x+"_";s=s.replace(t,"");w=null;return s};d.prototype.OnRowSelect=function(s){if(parseInt(s,10)===this.GetCurRowSel()){return true}if(!this.GetPM().OnControlEvent(m.get("PHYEVENT_SELECT_ROW"),s,false,false)){return false}return true};d.prototype.ClearSelection=function(){var t=this.GetJQMRows();var s="#"+t;$(s).children(".hilight").removeClass("hilight");$(s).children(".jqmgrid_row").children(".ui-block-a").removeClass("ui-bar-b").addClass("ui-bar-d");$(s).children(".jqmgrid_row").children(".ui-block-b").removeClass("ui-bar-b").addClass("ui-bar-d");$(s).children(".jqmgrid_row").children(".ui-block-c").removeClass("ui-bar-b").addClass("ui-bar-d");$(s).children(".jqmgrid_row").children(".ui-block-d").removeClass("ui-bar-b").addClass("ui-bar-d")};d.prototype.ShowUIControl=function(v,u,x){SiebelAppFacade.JQMGridRenderer.superclass.ShowUIControl.call(this,v,u,x);var y=v.GetUIType();var t;var w;var s=v.GetInputName();if(y===o){t=v.GetMethodName();if(t==="DeleteRecord"){w=this.GetPM().ExecuteMethod("CanInvokeMethod",t);this.SetDelControl(v);this.SetDelBtnStatus(w);$("#"+s).hide()}}};d.prototype.EnableControl=function(v,u,t){SiebelAppFacade.JQMGridRenderer.superclass.EnableControl.call(this,v,u);if(typeof(v.GetInputName)==="function"){if(v.GetUIType()===o){if(v.GetMethodName()==="DeleteRecord"){this.SetDelBtnStatus(u)}}var x=v.GetUIType();var w=$("#"+t);var s=u?"enable":"disable";if(x===datePick||x===dateTimePick||x===dateTimezonePick){if(!u){w.addClass("ui-disabled");w.prop("readonly",true)}}else{if(x===checkbox){w.checkboxradio(s)}else{if(x===combo){w.selectmenu(s)}else{if(!u){w.addClass("ui-disabled");w.removeAttr("readOnly").attr("readOnly",true)}}}}}};d.prototype.SetCellEdit=function(s){};d.prototype.SetCellValue=function(t,u,s){};d.prototype.GetPhysicalControlValue=function(y){SiebelAppFacade.JQMGridRenderer.superclass.GetPhysicalControlValue.call(this,y);var x,v;var t=this.GetPM();var z=t.Get("GetPlaceholder");var s=t.Get("GetSelection");s=s+this.m_Offset;if(y){var w=this.GetColumnHelper().GetModifiedColumnName(y.GetFieldName());var u="jqmgrid_"+z+"_"+s+"_"+w;x=$("#"+u);v=x.val()||"";switch(y.GetUIType()){case datePick:case dateTimePick:case dateTimezonePick:v=utils.toISOFormat(utils.Trim(v),(y.GetUIType()!==datePick))||v;break}if(x.length>0){t.AddProperty("PhysicalCtrlVal",v)}}};function j(u){this.inProgress=true;var t=this.GetPM();t.GetProxy().SetActiveControl(u);var s=CCFMiscUtil_CreatePropSet();this.GetPM().ExecuteMethod("InvokeMethod","EditPopup",s)}return d}());SiebelAppFacade.GridColumnHelper=function(){var b={};var a={};var c={};this.GetColMap=function(){return b};this.GetColControl=function(){return a};this.GetColField=function(){return c}};SiebelAppFacade.GridColumnHelper.prototype={AddColumn:function(c,b){var a=null;if(typeof(c)==="string"){a=c.replace(/ /g,"_");a=a.replace(/\//g,"_");a=a.replace(/#/g,"_");this.GetColMap()[a]=c;this.GetColControl()[a]=b;this.GetColField()[b.GetFieldName()]=c}return a},GetActualControlName:function(a){return this.GetColMap()[a]},GetActualColumnName:function(a){return this.GetColControl()[a].GetDisplayName()},GetModifiedColumnName:function(b){var a=null;if(typeof(b)==="string"){a=b.replace(/ /g,"_");a=a.replace(/\//g,"_");a=a.replace(/#/g,"_")}return a},GetColumnControl:function(a){return this.GetColControl()[a]},GetColumnOfField:function(a){return this.GetColField()[a]},TranslateObject:function(c,f){var d={};var b=null;for(var a=0;a<c.length;a++){var e=c[a].control.GetFieldName();b=c[a].name;if(!SiebelApp.Utils.IsEmpty(b)){d[b.replace(/ /g,"_").replace(/\//g,"_").replace(/#/g,"_")]=f[e]}}if(f.Id){d.Id=f.Id}return d}}};