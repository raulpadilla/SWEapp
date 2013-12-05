/*UIF-Core : JSHint compliant */
if (typeof (SiebelAppFacade.ListPresentationModel) === "undefined"){
    SiebelJS.Namespace('SiebelAppFacade.ListPresentationModel');

    // This below layer of code is added so that this renderer registers itself
    // against the application layer's key<=>constructor mapping. Future instantiaions
    // will happen based on this registration.
    SiebelApp.S_App.RegisterConstructorAgainstKey (SiebelApp.Constants.get("SWE_UIDEF_LIST_PMODEL"), "SiebelAppFacade.ListPresentationModel");

    SiebelAppFacade.ListPresentationModel = (function(){
        var siebConsts  = SiebelJS.Dependency( "SiebelApp.Constants" );

        function ListPresentationModel( proxy ){
            SiebelAppFacade.ListPresentationModel.superclass.constructor.call( this, proxy );
        }

        SiebelJS.Extend( ListPresentationModel, SiebelAppFacade.PresentationModel );

        ListPresentationModel.prototype.Init = function(){
            SiebelAppFacade.ListPresentationModel.superclass.Init.call( this );

            this.AddProperty( "ListOfColumns", GetListOfColumns );
            this.AddProperty( "MultiSelectMode", false);
            this.AddProperty( "InQueryMode", false);
            this.AddProperty( "LandMarkTitle", this.Get("GetAppletLabel") + " " + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LIST_APPLET"));
            this.AddProperty( "SortRecord", false );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_HIER_COLLAPSE" ), OnCollapse );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_HIER_EXPAND" ), OnExpand );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_SELECT_ROW" ), "HandleRowSelect" );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_VSCROLL" ), "OnVerticalScroll" );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_LIST_SORT" ), "OnClickSort" );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_COLUMN_CHANGE" ), "OnCtrlBlur" );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_COLUMN_FOCUS" ), "OnCtrlFocus" );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_DRILLDOWN" ), "OnDrillDown" );

            this.AttachPMBinding( "CellChange", function(){
               this.GetRenderer().SetCellValue.apply( this.GetRenderer(), arguments );
            });
            
            this.AddMethod( "ResetScrollpos", function(){} );

            this.AttachNotificationHandler (consts.get("SWE_PROP_BC_NOTI_GENERIC"), function(propSet){
                var ctrl = this.Get("GetActiveControl");
                if( propSet.GetProperty("type")==="ClosePopup" && ctrl ){
                    this.GetRenderer().SetCellValue( this.Get("GetSelection"), ctrl.GetFieldName(),
                    this.GetProxy().GetBusComp().GetFieldValue( ctrl.GetFieldName()) );
                }
            });
            
            this.AttachNotificationHandler (consts.get("SWE_PROP_BC_NOTI_SELECTION_MODE_CHANGE"), function(propSet){
                this.SetProperty ( "MultiSelectMode", 
                                        (propSet.GetProperty(consts.get("SWE_PROP_NOTI_MULTISEL")) === "true"));
            });
            
            this.AttachNotificationHandler (consts.get("SWE_PROP_BC_NOTI_EXECUTE"), function(propSet){
                this.ExecuteMethod("ResetScrollpos");                
            });
            
            this.AddMethod ( "BeginQueryState", function(){
                this.SetProperty ( "InQueryMode", true );
            }, { sequence:false, scope:this });
            
            this.AddMethod ( "EndQueryState", function(){
                this.SetProperty ( "InQueryMode", false );
            }, { sequence:false, scope:this });
            
            this.AttachPostProxyExecuteBinding( "SortAscending", function(methodName, inputPS, outputPS){
                AddSortProperty.call( this, inputPS, outputPS, "ascending" );
            });

            this.AttachPostProxyExecuteBinding( "SortDescending", function(methodName, inputPS, outputPS){
                AddSortProperty.call( this, inputPS, outputPS, "descending" );
            });
        };
        
        function AddSortProperty( inputPS, outputPS, type ){
            if( String( outputPS.GetProperty( siebConsts.get( "SWE_RPC_PROP_RETURN_STATUS" ) ) ) === siebConsts.get( "SWE_RPC_PROP_STATUS_COMPLETED" ) ){
                var fieldName = String( inputPS.GetProperty( siebConsts.get( "SWE_FIELD_STR" ) ));
                var listOfCols = this.Get( "GetListOfColumns" );
                for( var name in listOfCols ){
                    if( listOfCols.hasOwnProperty( name ) ){
                        if( listOfCols[name].GetInputName() === fieldName ){
                            this.SetProperty( "SortRecord", {
                                "name": listOfCols[name].GetName(),
                                "type": type,
                                "msg" : ( type === "ascending" ?
                                            SiebelApp.S_App.LocaleObject.GetLocalString( siebConsts.get( "SWE_SORTASC_TOOL_TIP" ) ) :
                                                SiebelApp.S_App.LocaleObject.GetLocalString( siebConsts.get( "SWE_SORTDSC_TOOL_TIP" ) ) ) 
                            });
                            break;
                        }
                    }
                }
            }
        }

        function GetListOfColumns(){
            var columns = this.Get( "GetListOfColumns" );
            var arrColumns = [];
            for( var columnName in columns ){
                if( columns.hasOwnProperty( columnName ) ){
                    var current = columns[ columnName ];
                    var currentName = columnName ;
                    var columnInfo = {
                            name          : currentName,
                            controlType   : current.GetUIType(),
                            isLink        : this.ExecuteMethod( "CanNavigate", currentName ),
                            index         : Number( current.GetColNum() ) + 1,  // Server Index is based on 0, adding 1 to this
                            bCanUpdate    : this.ExecuteMethod( "CanUpdate",  currentName ),
                            control       : current
                    };
                    arrColumns.push( columnInfo );
                }
            }

            arrColumns.sort(  function( a, b ){
                return ( a.index - b.index );
            });
            return arrColumns;
        }

        function OnExpand ( rowNum ){
           var psInputArgs = CCFMiscUtil_CreatePropSet();
           psInputArgs.SetProperty('SWER', rowNum);
           psInputArgs.SetProperty('SWEReqRowId', "1");

           this.ExecuteMethod("InvokeMethod", "Expand", psInputArgs);
        }

        function OnCollapse ( rowNum ){
           var psInputArgs = CCFMiscUtil_CreatePropSet();
           psInputArgs.SetProperty('SWER', rowNum);
           psInputArgs.SetProperty('SWEReqRowId', "1");

           this.ExecuteMethod("InvokeMethod", "Collapse", psInputArgs);
        }

        return ListPresentationModel;

    }());
}