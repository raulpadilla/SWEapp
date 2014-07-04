function FM_Order_Catalog_Template_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
	switch(name){
		case "OrderTemplate"
		alert ("Siebel 7 browser script!);
		return(CancelOperation);
		break;
	}
	return ("ContinueOperation");
}

function FM_Order_Catalog_Template_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new FM_Order_Catalog_Template_List_Applet_Applet (null);

FM_Order_Catalog_Template_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

FM_Order_Catalog_Template_List_Applet_Applet.prototype.OnPreInvokeMethod = FM_Order_Catalog_Template_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;