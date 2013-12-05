/*******************************************************************
 File: ChepMapHoverPM.js
 Description: Siebel Open UI Presentation Model file
  for a custom map icon after the postal code field

  Uses control names of Account Summary Form Applet
********************************************************************/
//*******************************************************************
//Open UI general class definition code for ChepMapHoverPM starts here

if(typeof(SiebelAppFacade.ChepMapHoverPM) === "undefined")
{
	SiebelJS.Namespace("SiebelAppFacade.ChepMapHoverPM");
	SiebelApp.S_App.RegisterConstructorAgainstKey("ChepMapHoverPModel","SiebelAppFacade.ChepMapHoverPM");
	SiebelAppFacade.ChepMapHoverPM = ( function()
	{
		function ChepMapHoverPM(p)
		{
			SiebelAppFacade.ChepMapHoverPM.superclass.constructor.call(this,p);
		}
		
		SiebelJS.Extend(ChepMapHoverPM,SiebelAppFacade.PresentationModel);

		ChepMapHoverPM.prototype.Init = function()
		{
			SiebelAppFacade.ChepMapHoverPM.superclass.Init.call(this);

//Open UI general class definition code for ChepMapHoverPM ends here
//*****************************************************************

            //add a property to hold custom HTML for the Postal Code field
            this.AddProperty("stPostalCodeHTML");
			
            //add two standard methods "ShowSelection" and "FieldChange"
            this.AddMethod("ShowSelection",SelectionChange,{sequence:false, scope:this});
			this.AddMethod("FieldChange",OnFieldChange,{sequence:false, scope:this});

            //add a custom method createMapHTML; must use this.ExecuteMethod to call!
            this.AddMethod("createMapHTML",createMapHTML,{sequence:false, scope:this});
		};
	
		function SelectionChange()
		{
            //execute the createMapHTML function
            var stPostalCodeHTML = this.ExecuteMethod("createMapHTML");

            //set the stPostalCodeHTML property
            this.SetProperty("stPostalCodeHTML",stPostalCodeHTML);
		}
		
		function OnFieldChange(control,value)
		{
			if (control.GetName() === "PostalCode")
			{
                var stPostalCodeHTML = this.ExecuteMethod("createMapHTML");
                this.SetProperty("stPostalCodeHTML",stPostalCodeHTML);
			}
		}

        function createMapHTML ()
        {
            try
            {
                //the map URL goes here (note 'output=embed' for Google Maps)
                var mapURL = "http://maps.google.com/maps?z=14&ie=UTF8&hl=en&output=embed&q=";

                //get a handle on the applet controls
                var controls = this.Get("GetControls");

                //get the address field values and concatenate
                var ctrlStreetAddress = controls["StreetAddress"];
                var ctrlPostalCode = controls["PostalCode"];
                var ctrlCity = controls["City"];
                var ctrlCountry = controls["Country"];
                var stStreetAddressValue = this.ExecuteMethod("GetFieldValue",ctrlStreetAddress);
                var stPostalCodeValue = this.ExecuteMethod("GetFieldValue",ctrlPostalCode);
                var stCityValue = this.ExecuteMethod("GetFieldValue",ctrlCity);
                var stCountryValue = this.ExecuteMethod("GetFieldValue",ctrlCountry);
                var stFullAddress = stStreetAddressValue + "," + stPostalCodeValue + "," + stCityValue + "," + stCountryValue;

                //get the element ID of the postal code field
                var fieldElemId = ctrlPostalCode.GetInputName();

                //build the HTML for the postal code filed
                var stPostalCodeHTML = '<input type="text" name="' + fieldElemId + '" value="' + stPostalCodeValue + '" style="float:left;width:105px;height:24px"></input><a class="iframe" href="' + mapURL + stFullAddress + '"><img name="myMapsIcon" src="images/Google-Maps-icon.jpg" height="16" width="16" style="float:right;"></img></a>';
            }
            catch(e)
            {
                alert("PM: Error in custom method 'createMapHTML()'\nError Message: " + e.toString());
            }
            return stPostalCodeHTML;
        }
		
		return ChepMapHoverPM;
	}());
}