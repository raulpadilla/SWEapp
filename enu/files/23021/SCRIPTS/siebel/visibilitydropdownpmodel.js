/*UIF-Core : JSHint compliant */
if (typeof (SiebelAppFacade.VisDropdownPresentationModel) === "undefined"){
    SiebelJS.Namespace('SiebelAppFacade.VisDropdownPresentationModel');

    SiebelApp.S_App.RegisterConstructorAgainstKey (SiebelApp.Constants.get("SWE_UIDEF_VIS_PMODEL"), "SiebelAppFacade.VisDropdownPresentationModel");

    SiebelAppFacade.VisDropdownPresentationModel = (function(){

        var consts = SiebelJS.Dependency( "SiebelApp.Constants" );
        var utils = SiebelJS.Dependency( "SiebelApp.Utils" );

        function VisDropdownPresentationModel(proxy)
        {
            SiebelAppFacade.VisDropdownPresentationModel.superclass.constructor.call(this, proxy );
        }

        SiebelJS.Extend( VisDropdownPresentationModel, SiebelAppFacade.PresentationModel );

        VisDropdownPresentationModel.prototype.Init = function()
        {
            this.AddProperty( "GetContainer",  "s_vis_div" );
            this.AddProperty( "GetTitle", SiebelApp.S_App.GetVisibilityNavTitle() );
            this.AddMethod( "DecodePropertySet", null, {core : true } );

            this.AttachEventHandler( "OnClick", function(val)
            {
                if ( String(this.Get( "SelectedItem")) === val ){
                    return;
                }
                var oldValue = String( this.Get( "SelectedItem" ) );
                this.SetProperty( "SelectedItem", val );
                var screenTabInfo = this.Get("VisDropDownItem");
                var view ;
                for(var i=0; 1<screenTabInfo.length ; i++)
                {
                    if(val === String( screenTabInfo[i].captionName) )
                    {
                        view = screenTabInfo[ i].defaultViewName;
                        break;
                    }
                }
                var bReturn = SiebelApp.S_App.GotoView(view, "", "", "");
                if(bReturn !== undefined && !bReturn)
                {
                    this.SetProperty( "SelectedItem", oldValue );
                    this.GetRenderer().ResetVisDropdown();
                }
            });

              this.AttachPSHandler( consts.get("SWE_PROP_NC_VISIBILITY_INFO"), function(propSet){
                this.ExecuteMethod( "DecodePropertySet", propSet);
                ProcessTabsObjectInfo.call( this, propSet );
            });
        };


        VisDropdownPresentationModel.prototype.Setup = function()
        {
            var propSet = CCFMiscUtil_CreatePropSet();
            if(SiebelApp.S_App.IsMobileApplication() === "true")
            {
                propSet.SetProperty( "SWE_OUI_RENDERER", "JQMVisDropdownPhyRenderer" );
            }
            else
            {
                propSet.SetProperty( "SWE_OUI_RENDERER", "VisDropdownPhyRenderer" );
            }
            SiebelAppFacade.VisDropdownPresentationModel.superclass.Setup.call( this, propSet );
        };

        function ProcessTabsObjectInfo(inTabPropSet){
            if(inTabPropSet === null || inTabPropSet === undefined){
                return;
            }
            var nbChild = inTabPropSet.GetChildCount ();
            var screenTabInfo = [];
            var qtp_info = consts.get("SWE_PST_QTP_INFO");
            var item_info = consts.get("SWE_PROP_NC_ITEM_INFO");
            //clear the QTP array
            var visDropDownItemQTPInfo = [];

            var selectedIndex = inTabPropSet.GetProperty (consts.get("SWE_PROP_NC_SELECTED_INDEX"));
            for (var i = 0; i < nbChild; i++){
                var childPS = inTabPropSet.GetChild (i);
                var type = childPS.GetType ();

                if(type === qtp_info)
                {
                     this.AddProperty( "VisDropdownComboBoxQTPPS", childPS );
                     continue;
                }
                else if (type !==item_info)
                {
                   continue;
                }
                var current = CreateTabItem.call( this, childPS );
                screenTabInfo.push( current );
                if( Number(selectedIndex) === (screenTabInfo.length - 1 ))
                {
                   this.AddProperty( "SelectedItem", String(current.captionName));
                }

                // Collect QTP Information
                if(childPS.GetChildCount()>0)
                {
                      for(var index=0; index < childPS.GetChildCount(); index++)
                      {
                            if(childPS.GetChild(index).GetType() === qtp_info)
                            {
                                visDropDownItemQTPInfo.push(childPS.GetChild(index));
                            }
                      }
                }

            }

            this.AddProperty( "VisDropDownItemQTPInfo", visDropDownItemQTPInfo );
            this.AddProperty( "VisDropDownItem", screenTabInfo );
        }

        function CreateTabItem (inputPS){
            if (utils.IsEmpty(inputPS))
            {
                return;
            }


            var tabInfo = {};

            tabInfo.screenName      = inputPS.GetProperty (consts.get("SWE_PROP_NC_SCREEN_NAME"));
            tabInfo.defaultViewName = inputPS.GetProperty (consts.get("SWE_PROP_NC_VIEW_NAME"));
            tabInfo.captionName     = inputPS.GetProperty (consts.get("SWE_PROP_NC_CAPTION"));
            tabInfo.tabIcon         = inputPS.GetProperty (consts.get("SWE_PROP_NC_SCREEN_TAB_ICON"));

            return tabInfo;
        }

        return VisDropdownPresentationModel;
    }());
}