if(typeof(SiebelApp.S_App.LocaleObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.LocaleObject");var utils=SiebelApp.Utils;var consts=SiebelApp.Constants;SiebelApp.S_App.LocaleObject=(function(){function c(){this.m_currDataMap={};this.m_currDataMap.length=0;this.m_sCurrency="";this.m_nPhoneCountryMaxLen=0;this.m_phoneFormatMap={};this.m_phoneFormatMap.length=0;this.m_bPreLoadLocale=true;this.m_spProfilePS=null;this.m_spDayOfWeekPS=null;this.m_spMonthPS=null;this.m_spPhoneFormatPS=null;this.m_spCurrencyDataPS=null;this.m_spLocalStringPS=null;this.m_sCurrencyCode="";this.m_sDateFormat="";this.m_sTimeFormat="";this.m_sTimeZoneList={};this.m_sTimeZoneName="";this.m_nUtcOffset=0;this.m_sErrCode="";this.m_sExchDate="";this.m_nScale=0;this.m_localStringMap={};this.m_bLocalStringsInitialized=false;this.m_bClientStringsInitialized=false;var d;e=function e(){return d};e.prototype=this;d=new e();d.constructor=e;return d}function a(f){for(var d=0;d<f.GetChildCount();d++){var e=f.GetChild(d);var g=e.GetType();switch(g){case"Profile":this.m_spProfilePS=e;break;case"DayOfWeek":this.m_spDayOfWeekPS=e;break;case"Month":this.m_spMonthPS=e;break;case"GetPhoneFormats":this.m_spPhoneFormatPS=e;break;case"GetCurrencyData":this.m_spCurrencyDataPS=e;break;case"GetLocalString":this.m_spLocalStringPS=e;break;case"GetTimeZoneList":this.m_sTimeZoneList=e.GetProperty("TimeZoneList");break;case"GetTimeZoneName":this.m_sTimeZoneName=e.GetProperty("TimeZoneName");break}}}c.prototype.ProcessObjectInfo=function(d){if(d===null||d===undefined){return}var e=d.GetType();if(e!==consts.get("SWE_PST_LOCALE_INFO")){return}a.call(this,d);this.m_bPreLoadLocale=false};c.prototype.InitLocale=function(d){if(this.m_bPreLoadLocale){a.call(this,d);this.m_bPreLoadLocale=false}};c.prototype.FormattedToString=function(h,g,d){var e;this.PreLoadLocale();var f=this.GetDatum(h);if(f===undefined){return g}f.SetAsFormattedString(g,d);e=f.GetAsString();if(f.IsError()){this.m_sErrCode="LocaleErrFormattedToString"}return e};c.prototype.StringToFormatted=function(h,g,d){var e;this.PreLoadLocale();var f=this.GetDatum(h);if(f===undefined){return g}f.SetAsString(g);e=f.GetAsFormattedString(d);if(f.IsError()){this.m_sErrCode="LocaleErrStringToFormatted"}return e};c.prototype.SetCurrencyCode=function(d){this.m_sCurrencyCode=d};c.prototype.SetExchDate=function(d){this.m_sExchDate=d};c.prototype.GetStringFromDateTime=function(h,g,d){var e;this.PreLoadLocale();var f=this.GetDatum("DateTime");if(f===undefined){return h}f.SetAsFormattedString(h,g);e=f.GetAsFormattedString(d);return(e)};c.prototype.GetDateFormat=function(){if(this.m_sDateFormat.length>0){return(this.m_sDateFormat)}this.PreLoadLocale();var d=this.GetDatum(consts.get("FORMAT_DATE"));if(d){this.m_sDateFormat=d.GetFormat()}return(this.m_sDateFormat)};c.prototype.GetTimeFormat=function(){if(this.m_sTimeFormat.length>0){return(this.m_sTimeFormat)}this.PreLoadLocale();var d=this.GetDatum(consts.get("FORMAT_TIME"));if(d){this.m_sTimeFormat=d.GetFormat()}return(this.m_sTimeFormat)};c.prototype.GetTimeZoneList=function(){var e;if(this.m_sTimeZoneList.length>0){return(this.m_sTimeZoneList)}var h=CCFMiscUtil_CreatePropSet();var f=CCFMiscUtil_CreatePropSet();h.SetProperty("SWEJI","false");var d=SiebelApp.S_App.GetService("SWE Locale Service");if(d){f=d.InvokeMethod("GetTimeZoneList",h)}for(e=0;e<f.GetChildCount();e++){var g=f.GetChild(e);var j=g.GetType();if(j==="ResultSet"){this.m_sTimeZoneList=g.GetProperty("TimeZoneList");break}}return this.m_sTimeZoneList};c.prototype.GetTimeZoneName=function(){var e;if(this.m_sTimeZoneName.length>0){return(this.m_sTimeZoneName)}var h=CCFMiscUtil_CreatePropSet();var f=CCFMiscUtil_CreatePropSet();h.SetProperty("SWEJI","false");var d=SiebelApp.S_App.GetService("SWE Locale Service");if(d){f=d.InvokeMethod("GetTimeZoneName",h)}for(e=0;e<f.GetChildCount();e++){var g=f.GetChild(e);var j=g.GetType();if(j==="ResultSet"){this.m_sTimeZoneName=g.GetProperty("TimeZoneName");break}}return(this.m_sTimeZoneName)};c.prototype.GetUtcOffset=function(m,h,j){var o;var l;var g;l=h?"1":"0";var n=m;n+=":";n+=l;var p=CCFMiscUtil_CreatePropSet();var e=CCFMiscUtil_CreatePropSet();p.SetProperty("SWEJI","false");p.SetProperty("TimeZoneName",m);p.SetProperty("bLocal",l);p.SetProperty("TimeStamp",j);var f=SiebelApp.S_App.GetService("SWE Locale Service");if(f){e=f.InvokeMethod("GetUtcOffset",p)}for(g=0;g<e.GetChildCount();g++){var k=e.GetChild(g);var d=k.GetType();if(d==="ResultSet"){o=k.GetProperty("UtcOffset");this.m_nUtcOffset=parseInt(o,10);break}}return(this.m_nUtcOffset)};c.prototype.GetCurrencyList=function(){var d;this.m_spCurrencyDataPS=this.GetData("GetCurrencyData",this.m_spCurrencyDataPS);if(this.m_spCurrencyDataPS){d=this.m_spCurrencyDataPS.EncodeAsString()}return d};c.prototype.GetCurrency=function(k){var g;var n;if(this.m_currDataMap.length<1){var h;var e=new SiebelApp.S_App.DatumNumberObject();var j;var f;this.m_spCurrencyDataPS=this.GetData("GetCurrencyData",this.m_spCurrencyDataPS);this.m_sCurrency=this.m_spCurrencyDataPS.GetProperty("currency");var d=this.m_spCurrencyDataPS.GetChildCount();if(this.m_spCurrencyDataPS.PropertyExists("currency")){for(g=0;g<d;g++){var m=this.m_spCurrencyDataPS.GetChild(g);h=m.GetProperty("code");j=new SiebelApp.S_App.DatumCurrencyDataObject();j.m_sSymbol=m.GetProperty("symbol");if(!j.m_sSymbol||j.m_sSymbol.length===0){continue}f=m.GetProperty("stdScale");if(!f){continue}j.m_nStdScale=parseInt(f,10);f=m.GetProperty("extScale");if(!f){continue}j.m_nExtScale=parseInt(f,10);f=m.GetProperty("minAcctUnit");if(!f){continue}e.SetAsString(f);j.m_nMinAcctUnit=e.GetValue();f=m.GetProperty("bEuro");if(!f){j.m_bEuro=false}else{j.m_bEuro=(parseInt(f,10)===0)?false:true}this.m_currDataMap[h]=j;this.m_currDataMap.length++}}if(this.m_currDataMap.length===0){this.m_currDataMap["No Match"]=new SiebelApp.S_App.DatumCurrencyDataObject()}}n=k;var l;if(this.m_currDataMap[n]){return this.m_currDataMap[n]}else{return null}};c.prototype.GetDayOfWeek=function(h,e){var g;this.m_spDayOfWeekPS=this.GetData("DayOfWeek",this.m_spDayOfWeekPS);var d=parseInt(h,10);var f=d;f+=":";switch(e){case 0:f+="0";break;case 1:f+="1";break;case 2:f+="2";break;default:break}g=this.m_spDayOfWeekPS.GetProperty(f);return(g)};c.prototype.GetDispDateSeparator=function(){return(this.GetProfile(consts.get("LOCAL_DATE_SEPARATOR")))};c.prototype.GetDispNumberDecimal=function(){return(this.GetProfile(consts.get("LOCAL_NUMBER_DECIMAL")))};c.prototype.GetDispNumberSeparator=function(){return(this.GetProfile(consts.get("LOCAL_NUMBER_SEPARATOR")))};c.prototype.GetDispNumberScale=function(){var d=this.GetProfile(consts.get("LOCAL_NUMBER_SCALE"));if(d.length===0){return 2}else{return(parseInt(d,10))}};c.prototype.GetDispCurrencySeparator=function(){return(this.GetProfile(consts.get("LOCAL_CURRENCY_SEPARATOR")))};c.prototype.GetDispCurrencyDecimal=function(){return(this.GetProfile(consts.get("LOCAL_CURRENCY_DECIMAL")))};c.prototype.GetDispTimeAM=function(){return(this.GetProfile(consts.get("LOCAL_TIME_AM")))
};c.prototype.GetDispTimePM=function(){return(this.GetProfile(consts.get("LOCAL_TIME_PM")))};c.prototype.GetDispTimeSeparator=function(){return(this.GetProfile(consts.get("LOCAL_TIME_SEPARATOR")))};c.prototype.GetMonth=function(e,g){var d;this.m_spMonthPS=this.GetData("Month",this.m_spMonthPS);var f=parseInt(e,10);f+=":";f+=(g?"1":"0");d=this.m_spMonthPS.GetProperty(f);return(d)};c.prototype.PreLoadLocale=function(){if(this.m_bPreLoadLocale){var h=CCFMiscUtil_CreatePropSet();var f=CCFMiscUtil_CreatePropSet();h.SetProperty("SWEJI","false");var d=SiebelApp.S_App.GetService("SWE Locale Service");if(d){f=d.InvokeMethod("PreLoadLocale",h)}for(var e=0;e<f.GetChildCount();e++){var g=f.GetChild(e);var j;j=g.GetType();if(j==="ResultSet"){a.call(this,g);this.m_bPreLoadLocale=false;break}}}this.m_sErrCode="OK";return true};c.prototype.GetScale=function(){return(this.m_nScale)};c.prototype.SetScale=function(d){this.m_nScale=d;return true};c.prototype.GetLocalString=function(d){var g=null;g=this.m_localStringMap[d];if(!g&&!this.m_bClientStringsInitialized){b.call(this);this.m_bClientStringsInitialized=true;g=this.m_localStringMap[d];if(g){return g}}if(!g&&!this.m_bLocalStringsInitialized){if(!g){var f=null;var h=null;this.m_bLocalStringsInitialized=true;this.m_spLocalStringPS=this.GetData("GetLocalString",this.m_spLocalStringPS);for(var e=true;(f=this.m_spLocalStringPS.EnumProperties(e))!==null;e=false){h=this.m_spLocalStringPS.GetProperty(f);this.m_localStringMap[f]=h}g=this.m_localStringMap[d]}}return(g)};c.prototype.HasErrorMsg=function(){return(this.m_sErrCode.length>0&&this.m_sErrCode!=="OK")};c.prototype.GetErrorCode=function(){return(this.m_sErrCode)};c.prototype.GetProfile=function(f){var e;this.m_spProfilePS=this.GetData("Profile",this.m_spProfilePS);var d=parseInt(f,10);e=this.m_spProfilePS.GetProperty(d.toString());return e};c.prototype.GetPhoneFormat=function(d,p,o){var l;var g=d.toString().replace(/,/g,"");var k=p;var j=o;if(this.m_phoneFormatMap.length===0){var n;var f;this.m_spPhoneFormatPS=this.GetData("GetPhoneFormats",this.m_spPhoneFormatPS);for(var h=true;(n=this.m_spPhoneFormatPS.EnumProperties(h))!==null;h=false){f=this.m_spPhoneFormatPS.GetProperty(n);this.m_phoneFormatMap[n]=f;this.m_phoneFormatMap.length++;if(this.m_nPhoneCountryMaxLen<n.length){this.m_nPhoneCountryMaxLen=n.length}}if(this.m_phoneFormatMap.length===0){this.m_phoneFormatMap["No Match"]=""}}if(g.length>0){if(g.indexOf("+")===0){for(var e=2;((e<=this.m_nPhoneCountryMaxLen)&&(e<=g.length));e++){k=g.substring(0,e);j=this.m_phoneFormatMap[k];if(j){g=g.substring(k.length);return{sPhoneNumber:g,sPhoneCountry:k,sFormat:j}}}}else{k=this.GetProfile(consts.get("LOCAL_PHONE_COUNTRY"));if(this.m_phoneFormatMap[k]===j){return{sPhoneNumber:g,sPhoneCountry:k,sFormat:j}}}}k="";j="";return{sPhoneNumber:g,sPhoneCountry:k,sFormat:j}};c.prototype.GetExchangeRate=function(y,w,r){var v=1;if(y.length===0||w.length===0||(y.toLowerCase()===w.toLowerCase())){return(1)}var h=r;var m;var f;var o=[];var t;if(!h){h=new SiebelApp.S_App.DatumDateObject();h.SetToNow()}m=this.GetCurrency(y);if(!m){return(v)}var q=false;if(m.m_ExchDataMap.length>0){o=m.m_ExchDataMap[w];if(o.length>0){q=true}}if(!q){o=[];m.m_ExchDataMap[w]=o}for(t=0;t<o.length;t++){f=o[t];if(h.GetValue()>f.m_nDate2){break}if(h.GetValue()>=f.m_nDate1){return(f.m_nRate)}}var p;var g;var e;var s;var d;s.SetProperty("from",y);s.SetProperty("to",w);e=h.GetAsString();s.SetProperty("date",e);s.SetProperty("SWEJI","false");var l=SiebelApp.S_App.GetService("SWE Locale Service");if(l){d=l.InvokeMethod("GetExchangeRate",s)}var j;e="";for(var x=0;x<d.GetChildCount();x++){j=d.GetChild(x);var n=j.GetType();if(n==="ResultSet"){e=j.GetProperty("rate");break}}if(e.length===0){return(v)}g.SetAsString(e);v=g.GetValue();e=j.GetProperty("date1");if(e){return(v)}p.SetAsString(e);var k=new SiebelApp.S_App.DatumExchRate();k.m_nDate1=p.GetValue();k.m_nDate2=h.GetValue();k.m_nRate=v;for(t=0;t<o.length;t++){f=o[t];if(k.m_nDate2<f.m_nDate2){break}}if(t<o.length){o[t]=k}else{var u=o.length;o[u]=k}return(v)};c.prototype.GetDatum=function(f){var e;if(f.toLowerCase()==="phone".toLowerCase()){e=new SiebelApp.S_App.DatumPhoneObject()}else{if(f.toLowerCase()==="Bool".toLowerCase()){e=new SiebelApp.S_App.DatumBoolObject()}else{if(f.toLowerCase()==="DateTime".toLowerCase()){e=new SiebelApp.S_App.DatumDateTimeObject()}else{if(f.toLowerCase()==="Date".toLowerCase()){e=new SiebelApp.S_App.DatumDateObject()}else{if(f.toLowerCase()==="Time".toLowerCase()){e=new SiebelApp.S_App.DatumTimeObject()}else{if(f.toLowerCase()==="UtcDateTime".toLowerCase()){e=new SiebelApp.S_App.DatumUTCDateTimeObject()}else{if(f.toLowerCase()==="Number".toLowerCase()){e=new SiebelApp.S_App.DatumNumberObject()}else{if(f.toLowerCase()==="Integer".toLowerCase()){e=new SiebelApp.S_App.DatumIntegerObject()}else{if(f.toLowerCase()==="Currency".toLowerCase()){e=new SiebelApp.S_App.DatumCurrencyObject();if(this.m_sCurrencyCode&&this.m_sCurrencyCode.length!==0){e.SetCurrency(this.m_sCurrencyCode)}if(this.m_sExchDate&&(this.m_sExchDate.length!==0)){var d=new SiebelApp.S_App.DatumDateObject();d.SetAsString(this.m_sExchDate);e.SetExchangeDate(d)}}}}}}}}}}return(e)};c.prototype.GetData=function(j,f){if(f){return f}var k;var l=CCFMiscUtil_CreatePropSet();var m=CCFMiscUtil_CreatePropSet();var g=CCFMiscUtil_CreatePropSet();m.SetProperty("SWEJI","false");var h=SiebelApp.S_App.GetService("SWE Locale Service");if(h){g=h.InvokeMethod(j,m)}for(k=0;k<g.GetChildCount();k++){var e=g.GetChild(k);var d=e.GetType();if(d==="ResultSet"){return e}}return null};c.prototype.GetFuncCurrCode=function(){this.m_spCurrencyDataPS=this.GetData("GetCurrencyData",this.m_spCurrencyDataPS);return this.m_spCurrencyDataPS.GetProperty("currencyCode")};c.prototype.AddLocalString=function(f,e){var d=this.m_localStringMap[f];if(d){}this.m_localStringMap[f]=e};c.prototype.IsPhoneLeadingZeroAllowed=function(d){return false};function b(){var d=_SWEgetGlobalMsgAry();var e;for(e in d){this.m_localStringMap[e]=d[e]}}return new c()}())};