function Quote_Item_List_Applet__Short_Applet_PreInvokeMethod (name, inputPropSet)
{
	switch (name) {
		case "ReconfigureCxProd":
		case "GetEligibility":
		case "QuotesAndOrdersValidate":
			var sessionCookie = document.cookie;
			var sblUrl = document.location.toString();
			var index = sblUrl.lastIndexOf("/");
			var sblServerUrl = sblUrl.substring(0, index+1);
			TheApplication().SetProfileAttr("czSblUrl", sblServerUrl);
			TheApplication().SetProfileAttr("czSblSesCookie", sessionCookie);
		break;
	}
	return ("ContinueOperation");
}

function Quote_Item_List_Applet__Short_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Quote_Item_List_Applet__Short_Applet (null);

Quote_Item_List_Applet__Short_Applet.prototype = new top.JSSAppletShadow ();

Quote_Item_List_Applet__Short_Applet.prototype.OnPreInvokeMethod = Quote_Item_List_Applet__Short_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;