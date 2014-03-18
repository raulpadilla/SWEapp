function FS_Agreement_Item_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	switch (name) {
		case "ReconfigureCxProd":
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

function FS_Agreement_Item_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new FS_Agreement_Item_List_Applet_Applet (null);

FS_Agreement_Item_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

FS_Agreement_Item_List_Applet_Applet.prototype.OnPreInvokeMethod = FS_Agreement_Item_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;