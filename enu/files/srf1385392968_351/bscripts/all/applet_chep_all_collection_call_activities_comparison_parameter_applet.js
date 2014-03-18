function Chep_All_Collection_Call_Activities_Comparison_Parameter_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_All_Collection_Call_Activities_Comparison_Parameter_Applet_Applet (null);

Chep_All_Collection_Call_Activities_Comparison_Parameter_Applet_Applet.prototype = new top.JSSAppletShadow ();

theApplication = top.theApplication;
TheApplication = top.theApplication;