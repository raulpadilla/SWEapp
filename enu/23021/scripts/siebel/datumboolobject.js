if(typeof(SiebelApp.S_App.DatumBoolObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.DatumBoolObject");SiebelApp.S_App.DatumBoolObject=(function(){function a(b){SiebelApp.S_App.DatumBoolObject.superclass.constructor.call(this);this.m_bValue=b}SiebelJS.Extend(a,SiebelApp.S_App.DatumObject);a.prototype.GetAsString=function(){var b;if(this.m_bNull){b=""}else{b=(this.m_bValue)?"Y":"N"}return b};a.prototype.GetDataType=function(){return SiebelApp.Constants.get("DTYPE_BOOL")};a.prototype.SetAsString=function(b){if(b&&b.length!==0){this.m_bNull=false;this.m_bValue=(b==="Y"||b==="y"||b==="1")}else{this.m_bNull=true;this.m_bValue=false}};a.prototype.GetValue=function(){return(this.m_bValue)};a.prototype.SetValue=function(b){this.m_bNull=false;this.m_bValue=b};return a}())};