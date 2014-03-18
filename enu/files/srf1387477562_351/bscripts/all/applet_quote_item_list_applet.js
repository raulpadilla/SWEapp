function Quote_Item_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	switch (name) {
		case "ReconfigureCxProd":
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

function Quote_Item_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Quote_Item_List_Applet_Applet (null);

Quote_Item_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Quote_Item_List_Applet_Applet.prototype.OnPreInvokeMethod = Quote_Item_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;