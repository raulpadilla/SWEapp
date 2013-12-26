function Chep_GoldSheet_Strengths_List_Applet_Applet_ChangeFieldValue (field, value)
{
// JB - 04 June 2006 - Added code for Active Applet replacement in BC Code.
//-------------------------------------------------------//
// Description - If the Status is Authorised, update it to Awaiting Transfer.
// Author - Jayesh Bhavsar, Capgemini India
// Created - 10-June-2006
//---------------------------------------------------------/

if (field == "Record Type")
{
	TheApplication().SetProfileAttr("GSStrengthApplet", TheApplication().ActiveApplet().Name());
}
}

function Chep_GoldSheet_Strengths_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new Chep_GoldSheet_Strengths_List_Applet_Applet (null);

Chep_GoldSheet_Strengths_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

Chep_GoldSheet_Strengths_List_Applet_Applet.prototype.OnChangeFieldValue = Chep_GoldSheet_Strengths_List_Applet_Applet_ChangeFieldValue;
theApplication = top.theApplication;
TheApplication = top.theApplication;