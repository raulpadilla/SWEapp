function Chep_Group_Activities_Form_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{
// JB - Code to ask user for confirmation of generating acitivities.
	if (name == "Generate Activities")
		{
        // Ask the user to confirm 
		        if(confirm("This action will create an activity for each location and may take several minutes.\n Are you sure you want to do this?"))
		        {	return ("ContinueOperation");
				}
			else
				{   // User clicked Cancel
					return("CancelOperation");
				 }
		}

	return ("ContinueOperation");
}

function Chep_Group_Activities_Form_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_Group_Activities_Form_Applet_Applet (null);

Chep_Group_Activities_Form_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_Group_Activities_Form_Applet_Applet.prototype.OnPreInvokeMethod = Chep_Group_Activities_Form_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;