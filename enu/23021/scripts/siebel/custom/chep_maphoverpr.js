/*******************************************************************
 File: chep_MapHoverPR.js
 Description: Siebel Open UI Physical Renderer file
 for a custom map icon after the postal code field

   Uses control names of Account Summary Form Applet
*******************************************************************/
//*******************************************************************
//Open UI general class definition code for ChepMapHoverPR starts here
if (typeof(SiebelAppFacade.ChepMapHoverPR) === "undefined")
{
	SiebelJS.Namespace("SiebelAppFacade.ChepMapHoverPR");
	SiebelApp.S_App.RegisterConstructorAgainstKey("ChepMapHoverRenderer","SiebelAppFacade.ChepMapHoverPR");
	SiebelAppFacade.ChepMapHoverPR = ( function()
	{
		function ChepMapHoverPR(p)
		{
			SiebelAppFacade.ChepMapHoverPR.superclass.constructor.call(this,p);

            //attach the 'MapHover' function to the 'stPostalCodeHTML' property
            //when the property changes, the method will be invoked
			this.GetPM().AttachPMBinding("stPostalCodeHTML",MapHover,{scope:this});
		}
		
		SiebelJS.Extend(ChepMapHoverPR,SiebelAppFacade.PhysicalRenderer);

//Open UI general class definition code for chep_MapHoverPR ends here
//*****************************************************************

		function MapHover()
		{
            //get the controls
			var controls = this.GetPM().Get("GetControls");
			var ctrlPostalCode = controls["PostalCode"];
			var stPostalCode = ctrlPostalCode.GetInputName();
			var stPostalCodeHTML = this.GetPM().Get("stPostalCodeHTML");

            //jQuery magic...
			$('input[name="' + stPostalCode + '"]').parent().html(stPostalCodeHTML);
			//var stPostalCodeValue = $('input[name="' + stPostalCode + '"]').val();
			//var map_window;

            //colorbox magic...
			$(".iframe").colorbox({iframe:true,width:"65%",height:"75%",opacity:0.5});
		}
		
		return ChepMapHoverPR;
	}());
}