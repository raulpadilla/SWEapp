function CHEP_Buying_Influences_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
if(name == "NewRecord")
{
	theApplication().SetProfileAttr("BInfluencesApplet", TheApplication().ActiveApplet().Name());
	theApplication().SetProfileAttr("BInfluencesBC", TheApplication().ActiveBusComp().Name());

}
	if(name == "ProspectProfiler")
	{
		var lsOpenUrl = "";
		var lsEmailId = this.BusComp().GetFieldValue("Email Address");
		var lsBS = theApplication().GetService("CHEP Get Env Var");
		var loInputs = theApplication().NewPropertySet();
		var loOutputs = theApplication().NewPropertySet();
		loOutputs = lsBS.InvokeMethod("GetEnvVar", loInputs);
		var lsUrl = loOutputs.GetProperty("EnvVar1");
		if(lsUrl != "" && lsUrl != null && lsUrl != 'unknown')
		{
			var lswin = window.open(lsUrl + lsEmailId );
			lswin =null;
		}
		else
		{
			alert("System issue with Prospect Profiler URL.Please contact your system administrator.");
		}
		lsOpenUrl = null;
		lsEmailId = null;
		loOutputs = null;
		loInputs = null;
		lsBS = null;
		
		return ("CancelOperation");
	}
	
	return ("ContinueOperation");
}

function CHEP_Buying_Influences_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new CHEP_Buying_Influences_Applet_Applet (null);

CHEP_Buying_Influences_Applet_Applet.prototype = new top.JSSAppletShadow ();

CHEP_Buying_Influences_Applet_Applet.prototype.OnPreInvokeMethod = CHEP_Buying_Influences_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;