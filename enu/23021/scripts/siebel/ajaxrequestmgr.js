if(typeof(SiebelApp.AjaxRequestMgr)==="undefined"){SiebelJS.Namespace("SiebelApp.AjaxRequestMgr");SiebelApp.AjaxRequestMgr=(function(){var b=SiebelJS.Dependency("SiebelApp.Utils");var d=SiebelJS.Dependency("SiebelApp.Constants");function a(){var f;e=function e(){return f};e.prototype=this;f=new e();f.constructor=e;return f}var c=new a();a.prototype.Get=function(e,g){var f={};f.url=e;f.type="GET";f.async=true;f.successfncallback=g;SiebelApp.AjaxRequestMgr.Ajax(f)};a.prototype.Post=function(e,g){var f={};f.successfncallback=g;SiebelApp.AjaxRequestMgr.Ajax(f)};a.prototype.Ajax=function(f,e){$.ajax({url:f.url,data:f.data,type:f.type,async:f.async,contentType:f.contentType,success:f.successfncallback,error:f.errfncb,context:f.context})};return c}())};