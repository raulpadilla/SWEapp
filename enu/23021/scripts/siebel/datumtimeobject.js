if(typeof(SiebelApp.S_App.DatumTimeObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.DatumTimeObject");var SECONDS_PER_DAY=86400;SiebelApp.S_App.DatumTimeObject=(function(){function a(){SiebelApp.S_App.DatumTimeObject.superclass.constructor.call(this)}SiebelJS.Extend(a,SiebelApp.S_App.DatumDateTimeObject);a.prototype.GetAsString=function(){return this._GetAsFormattedString("%H:%M:%S")};a.prototype.GetDataType=function(){return SiebelApp.Constants.get("DTYPE_TIME")};a.prototype.GetFormat=function(){if(this.m_sFormat.length===0){return SiebelApp.S_App.LocaleObject.GetProfile(SiebelApp.Constants.get("LOCAL_TIME_FORMAT"))}else{return(this.m_sFormat)}};a.prototype.GetValue=function(){return(this.m_nHour*3600+this.m_nMinute*60+this.m_nSecond)};a.prototype.SetValue=function(c){var b=0;this.m_bNull=false;b%=SECONDS_PER_DAY;this.m_nHour=c/3600;c%=3600;this.m_nMinute=c/60;this.m_nSecond=c%60};return a}())};