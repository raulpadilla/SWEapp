function Order_Entry__Line_Item_List_Applet_Sales__Short_Applet_PreInvokeMethod (name, inputPropSet)
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

function Order_Entry__Line_Item_List_Applet_Sales__Short_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Order_Entry__Line_Item_List_Applet_Sales__Short_Applet (null);

Order_Entry__Line_Item_List_Applet_Sales__Short_Applet.prototype = new top.JSSAppletShadow ();

Order_Entry__Line_Item_List_Applet_Sales__Short_Applet.prototype.OnPreInvokeMethod = Order_Entry__Line_Item_List_Applet_Sales__Short_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;