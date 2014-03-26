/*UIF-Core : JSHint compliant */
if (typeof (SiebelAppFacade.VisDropdownPresentationModel) === "undefined"){
    SiebelJS.Namespace('SiebelAppFacade.VisDropdownPresentationModel');
    
    //Module with its dependencies
    define("siebel/visibilitydropdownpmodel", [], function () {
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
                this.AddProperty( "ResetVisDropdown", false );
                this.AddMethod( "DecodePropertySet", null, {core : true } );

                this.AttachEventHandler( "OnClick", function(selectedIndex)
                {
                    var selectItemIndex = parseInt(selectedIndex, 10);
                    var oldIndex = this.Get("SelectedItemIndex");

                    if (oldIndex === selectItemIndex) {
                        return;
                    }

                    var screenTabInfo = this.Get("VisDropDownItem");
                    var view = screenTabInfo[selectItemIndex].defaultViewName;
                    var newValue = screenTabInfo[selectItemIndex].captionName;
                    var oldValue = String(this.Get("SelectedItem"));

                    this.SetProperty("SelectedItem", newValue);
                    this.SetProperty("SelectedItemIndex", selectItemIndex);

                    var bReturn = SiebelApp.S_App.GotoView(view, "", "", "");
                    if(bReturn !== undefined && !bReturn)
                    {
                        this.SetProperty( "SelectedItem", oldValue );
                        this.SetProperty("SelectedItemIndex", oldIndex);
                        this.SetProperty( "ResetVisDropdown", true );
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

                var selectedIndex = parseInt(inTabPropSet.GetProperty(consts.get("SWE_PROP_NC_SELECTED_INDEX")), 10);
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
                    if (selectedIndex === (screenTabInfo.length - 1))
                    {
                        this.AddProperty("SelectedItem", String(current.captionName));
                        this.AddProperty("SelectedItemIndex", selectedIndex);
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
        } ());

        return "SiebelAppFacade.VisDropdownPresentationModel";
    });
}