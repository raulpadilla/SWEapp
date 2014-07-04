/*UIF-Core : JSHint compliant */
if (typeof (SiebelAppFacade.ListPresentationModel) === "undefined"){
    SiebelJS.Namespace('SiebelAppFacade.ListPresentationModel');

    //Module with its dependencies
    define("siebel/listpmodel", [], function () {
    SiebelAppFacade.ListPresentationModel = (function(){
        var siebConsts  = SiebelJS.Dependency( "SiebelApp.Constants" );

        function ListPresentationModel( proxy ){
            SiebelAppFacade.ListPresentationModel.superclass.constructor.call( this, proxy );
        }

        SiebelJS.Extend( ListPresentationModel, SiebelAppFacade.PresentationModel );

            ListPresentationModel.prototype.Setup = function (propSet) {
                var apm,
                    visMode,
                    visModeArr,
                    visModeLDCArr;
                SiebelAppFacade.ListPresentationModel.superclass.Setup.call(this, propSet);
                if (propSet) {
                    apm = propSet.GetChildByType(siebConsts.get("SWE_APPLET_PM_PS"));
                }
                if (apm) {
                    visMode = apm.GetProperty(siebConsts.get("SWE_LDC_VIS_MODE_LIST"));
                    if (visMode) {
                        visModeLDCArr = [];
                        CCFMiscUtil_StringToArray(visMode, visModeLDCArr);
                        this.AddProperty(siebConsts.get("SWE_LDC_VIS_MODE_LIST"), visModeLDCArr);
                    }
                    visMode = apm.GetProperty(siebConsts.get("SWE_VIS_MODE_LIST"));
                    if (visMode) {
                        visModeArr = [];
                        CCFMiscUtil_StringToArray(visMode, visModeArr);
                        this.AddProperty(siebConsts.get("SWE_VIS_MODE_LIST"), visModeArr);
                    }
                    visMode = apm.GetProperty(siebConsts.get("SWE_VIS_MODE_DEFAULT"));
                    if (visMode) {
                        this.AddProperty(siebConsts.get("SWE_VIS_MODE_DEFAULT"), visMode);
                    }
                    visMode = apm.GetProperty(siebConsts.get("SWE_VIS_MODE_FLIP_METHOD"));
                    if (visMode) {
                        this.AddProperty(siebConsts.get("SWE_VIS_MODE_FLIP_METHOD"), visMode);
                    }
                }
            };

        ListPresentationModel.prototype.Init = function(){
            SiebelAppFacade.ListPresentationModel.superclass.Init.call( this );

            this.AddProperty( "ListOfColumns", GetListOfColumns );
            this.AddProperty( "TotalSet", true );
            this.AddProperty( "MultiSelectMode", false);
            this.AddProperty( "InQueryMode", false);
            this.AddProperty( "LandMarkTitle", this.Get("GetAppletLabel") + " " + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LIST_APPLET"));
            this.AddProperty( "SortRecord", false );
            this.AddProperty("ListDetail", siebConsts.get("SWE_LIST_DETAIL") + this.Get("GetVarName"));
            
            this.AttachEventHandler( siebConsts.get( "PHYEVENT_HIER_COLLAPSE" ), OnCollapse );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_HIER_EXPAND" ), OnExpand );

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_SELECT_ROW" ), "HandleRowSelect" );

                this.AttachEventHandler(siebConsts.get("PHYEVENT_VSCROLL_LIST"), "OnVerticalScroll");

                this.AttachEventHandler(siebConsts.get("PHYEVENT_SORT_LIST"), "OnClickSort");

                this.AttachEventHandler(siebConsts.get("PHYEVENT_COLUMN_BLUR"), "OnCtrlBlur");

            this.AttachEventHandler( siebConsts.get( "PHYEVENT_COLUMN_FOCUS" ), "OnCtrlFocus" );

                this.AttachEventHandler(siebConsts.get("PHYEVENT_DRILLDOWN_LIST"), "OnDrillDown");
            
            this.AttachEventHandler( siebConsts.get( "PHYEVENT_COL_ORDER_CHANGE" ), "UpdateColIndex" );
            
            this.AttachEventHandler( siebConsts.get( "PHYEVENT_COL_WIDTH_CHANGE" ), "UpdateColWidth" );
            
            this.AttachEventHandler( consts.get( "PHYEVENT_RECORD_DROP" ), "HandleDragNDrop" );
            
            this.AddMethod( "HandleDragNDrop", function(dataArray){
                var sortedDataArray = SortDataOnDnD.call(this, dataArray);
                var sortedControlArray = this.Get("GetSortControls");
                if(sortedDataArray.length > 0){
                    for(var i=0; i< sortedDataArray.length;i++){
                        if(this.ExecuteMethod("CanInvokeMethod", "NewRecord"))
                        {
                            this.ExecuteMethod("InvokeMethod", "NewRecord");
                            CollectDragNDropValues.call(this, sortedDataArray[i], sortedControlArray);
                            if(this.ExecuteMethod("CanInvokeMethod", "WriteRecord")){
                                this.ExecuteMethod("InvokeMethod", "WriteRecord");
                            }
                        }
                    }
                }
                this.SetProperty("GetSortControls", []);
            });
			
            this.AddMethod( "GetDragInfo", function (rowIndexArray) {
                var appletRowId = [];
                var recordSet = this.Get( "GetRawRecordSet" );
                appletRowId.appletName = this.Get( "GetName" );
                appletRowId.rowId = "";
                if(rowIndexArray && rowIndexArray.length > 0) {
                    for(var i=0; i < rowIndexArray.length; i++) {
                        appletRowId.rowId += recordSet[rowIndexArray[i]].Id;
                        if (i < rowIndexArray.length-1) {
                            appletRowId.rowId += ", ";
                        }
                    }
                } else {
                    appletRowId.rowId = recordSet[this.Get("GetSelection")].Id;
                }
                return appletRowId;
            });

            this.AddMethod( "ResetScrollpos", function(){} );

            this.AttachNotificationHandler (consts.get("SWE_PROP_BC_NOTI_GENERIC"), function(propSet){
                var ctrl = this.Get("GetActiveControl");
                if( propSet.GetProperty("type")==="ClosePopup" && ctrl ){
                    this.ExecuteMethod("CellChange", this.Get("GetSelection"), ctrl.GetFieldName(), this.ExecuteMethod("GetFieldValue", ctrl));
                }
            });

            this.AttachNotificationHandler ( consts.get("SWE_NOTIFY_TOTALS_CHANGED") ,function(propSet){
                this.SetProperty ( "TotalSet", true);
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
        
        function SortDataOnDnD (dataArray){
            var k =0,j=0;
            var colSortArray = [];
            var sortedData = [];
            var removeDataAtIndex = [];
            var listCols = this.Get("ListOfColumns");
            for(i=0; i < dataArray.length; i++){
                if( !dataArray[i] ){
                    continue;
                }
                var splitData = dataArray[i].split('\t');
                if(i == 0){
                    for(; j<splitData.length;j++){
                        for(;k<listCols.length;k++){
                            if(splitData[j].replace('\n','') === listCols[k].control.GetDisplayName()){
                                colSortArray.push(listCols[k].control);
                                k=0;
                                break;
                            }
                            else if(splitData[j].replace('\n','') !== listCols[k].control.GetDisplayName() && (k === listCols.length-1)){
                                removeDataAtIndex.push(j);
                                k=0;
                                break;
                            }
                        }
                    }
                    this.SetProperty("GetSortControls",colSortArray);
                }
                else{
                    for(var l = removeDataAtIndex.length -1; l>=0;l--){
                        splitData.splice(removeDataAtIndex[l], 1);
                    }
                    sortedData.push(splitData);
                }
            }
            return sortedData;
        };
        
        function CollectDragNDropValues (dataArray, sortedControlArray ){
            var column;
            var k=0, j=0;
            for(;j< dataArray.length;j++){
                if(k<sortedControlArray.length){
                    column = sortedControlArray[k];
                    if( !this.ExecuteMethod( "CanUpdate", column ) ){
                        k++;
                        continue;
                    }
                    this.ExecuteMethod("SetFormattedValue", column, dataArray[j]);
                    k++;
                }
            }
        };

        return ListPresentationModel;

    }());
        return "SiebelAppFacade.ListPresentationModel";
    });
}