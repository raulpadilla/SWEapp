// custom code

// DO NOT REMOVE THIS FUNCTION
function InitApp() {
	
// insert initialization code here
	if (OL.GetConfigVarWithDefault("APP","LOAD_UI_ON_STARTUP",true)) {
	
	// start with contents listing	
	OL.ShowContentsList();

	// alternately can start with page in addition to or instead of showing contents list
	// OL.LoadPageset("...");

	//can use start on active feature to start with preconfigured pageset
	//OL.SOALoadPageset(OL.GetUIPath()+'welcome.htm');

	}


}
// END DO NOT REMOVE