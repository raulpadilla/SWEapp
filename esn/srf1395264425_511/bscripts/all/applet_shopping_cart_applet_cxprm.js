function Shopping_Cart_Applet_CXPRM_Applet_PreInvokeMethod (name, inputPropSet)
{
	switch (name) {
		case "ReconfigureCxProd":
		case "QuotesAndOrdersValidate":
			var sessionCookie = document.cookie;
			var sblUrl = document.location.toString();
			var index = sblUrl.lastIndexOf("/");
			if (index == -1) {
				//Todo: raise error text
			}
			var sblServerUrl = sblUrl.substring(0, index+1);
			TheApplication().SetProfileAttr("czSblUrl", sblServerUrl);
			TheApplication().SetProfileAttr("czSblSesCookie", sessionCookie);
		break;
	}
	return ("ContinueOperation");
}

function Shopping_Cart_Applet_CXPRM_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Shopping_Cart_Applet_CXPRM_Applet (null);

Shopping_Cart_Applet_CXPRM_Applet.prototype = new top.JSSAppletShadow ();

Shopping_Cart_Applet_CXPRM_Applet.prototype.OnPreInvokeMethod = Shopping_Cart_Applet_CXPRM_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;