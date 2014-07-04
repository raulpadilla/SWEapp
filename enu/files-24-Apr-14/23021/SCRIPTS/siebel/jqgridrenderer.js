/*globals HtmlEncode */
if ( typeof ( SiebelAppFacade.JQGridRenderer ) === "undefined" ) {
    SiebelJS.Namespace( 'SiebelAppFacade.JQGridRenderer' );

            SiebelApp.S_App.RegisterConstructorAgainstKey (SiebelApp.Constants.get("SWE_UIDEF_LIST_PRENDR"), "SiebelAppFacade.JQGridRenderer");
            SiebelApp.S_App.RegisterConstructorAgainstKey (SiebelApp.Constants.get("SWE_UIDEF_GRID_PRENDR"), "SiebelAppFacade.JQGridRenderer");

    SiebelAppFacade.JQGridRenderer = ( function() {
      // dependencies
      var utils       = SiebelJS.Dependency( "SiebelApp.Utils" );
      var siebConsts  = SiebelJS.Dependency( "SiebelApp.Constants" );
      var localeObj   = SiebelJS.Dependency( "SiebelApp.S_App.LocaleObject" );

      var combo               = siebConsts.get( "SWE_CTRL_COMBOBOX" );
      var calc                = siebConsts.get( "SWE_CTRL_CALC" );
      var checkbox            = siebConsts.get( "SWE_CTRL_CHECKBOX" );
      var mailTo              = siebConsts.get( "SWE_CTRL_MAILTO" );
      var dateTimePick        = siebConsts.get( "SWE_CTRL_DATE_TIME_PICK" );
      var datePick            = siebConsts.get( "SWE_CTRL_DATE_PICK" );
      var dateTimezonePick    = siebConsts.get( "SWE_CTRL_DATE_TZ_PICK" );
      var textArea            = siebConsts.get( "SWE_CTRL_TEXTAREA" );
      var mvg                 = siebConsts.get( "SWE_CTRL_MVG" );
      var pick                = siebConsts.get( "SWE_CTRL_PICK" );
      var url                 = siebConsts.get( "SWE_CTRL_URL" );
      var currencyCal         = siebConsts.get( "SWE_CTRL_CURRENCY_CALC" );
      var imageControl        = siebConsts.get( "SWE_CTRL_IMAGECONTROL" );
      var ink                 = siebConsts.get( "SWE_CTRL_INKDATA" );
      var link                = siebConsts.get( "SWE_CTRL_LINK" );
      var rtcEditor           = siebConsts.get( "SWE_CTRL_RTCEMBEDDED" );
      var rtcEditorTextOnly   = siebConsts.get( "SWE_CTRL_RTCEMBEDDEDTEXTONLY" );
      var rtcLink             = siebConsts.get( "SWE_CTRL_RTCEMBEDDEDLINKFIELD" );
      var rtcPopup            = siebConsts.get( "SWE_CTRL_RTCPOPUP" );
      var rtcIO               = siebConsts.get( "SWE_CTRL_RTCIO" );        
      var btnControl          = siebConsts.get( "SWE_PST_BUTTON_CTRL");
      var detail              = siebConsts.get( "SWE_CTRL_DETAIL");
      var colType             = siebConsts.get("SWE_PST_COL");
      
      var GridPadding      =  "20";
      var colPadding      =  "5";
      var passwordCtrl     = siebConsts.get("SWE_CTRL_PWD");
      var effdat           = siebConsts.get("SWE_CTRL_EFFDAT");
      var text             = siebConsts.get( "SWE_CTRL_TEXT" );

      function JQGridRenderer( proxy ) {
        SiebelAppFacade.JQGridRenderer.superclass.constructor.call( this, proxy );
        //private
        var m_jqGrid = $();
        var m_colMap = new SiebelAppFacade.GridColumnHelper( );
        var m_PercentageWidth = 0;

        this.SetGrid = function( grid ){
          m_jqGrid = grid;
        };

        this.GetGrid = function(){
          return m_jqGrid;
        };


        this.GetRowCount = function(){
          return ( this.GetGrid().getRowData().length );
        };

        this.GetColCount = function(){
          return (  this.GetGrid().jqGrid( "getGridParam", "colNames" ).length );
        };

        this.GetColName = function(index){
          return (  this.GetGrid().jqGrid( "getGridParam", "colNames" )[index] );
        };

        this.GetColumnHelper = function(){
          return m_colMap;
        };

        this.GetPM().AttachPMBinding( "NavigateState", UpdateNavigateInfo, { scope : this } );
        
        this.GetPM().AttachPMBinding( "isControlPopupOpen", CloseControlPopup, { scope : this } );
        
        this.GetPM().AttachPMBinding( "MultiSelectMode", SetCellEdit, {scope : this} );
        
        this.GetPM().AttachPMBinding( "InQueryMode", SetCellEdit, {scope : this} );
        
        this.GetPM().AttachPMBinding( "SortRecord", AddSortInfo, {scope: this } );

        this.GetPM().AttachPMBinding ("SetFocusToGridCell", SetFocustoCell,{scope : this});

      }

      SiebelJS.Extend( JQGridRenderer, SiebelAppFacade.PhysicalRenderer );
      
      //VT:This funciton creates the new column model and refreshes the existing control with the new model
      //Used by NotifyCtrlDefChanged notification(use case:Work Flow policy actions for type ServiceRequest)
      JQGridRenderer.prototype.RefreshControl = function(control){
         var pm = this.GetPM();
         var listOfColumns = pm.Get("ListOfColumns");
         var bFound = false;
         for( var index = 0, length = listOfColumns.length; index < length; index++ ){
            if(listOfColumns[index].name === control.GetName())
            {
               var columnInfo = PrepareColumnInfo.call( this, [listOfColumns[index]]);
               var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );
               var newColumnModel = columnInfo.columnModel;
               for (var colIndex=0;colModel && colIndex<colModel.length;colIndex++){
                  if(colModel[colIndex].name === newColumnModel[0].name){
                     colModel[colIndex].editoptions = newColumnModel[0].editoptions;
                     if(colModel[colIndex].edittype != newColumnModel[0].edittype){
                         colModel[colIndex].edittype = newColumnModel[0].edittype;
                     }
                     bFound = true;
                     break;
                  }
               }
               columnInfo = null;
               colModel = null;
            }
         }
         listOfColumns = null;
         if(!bFound){
            SiebelAppFacade.JQGridRenderer.superclass.RefreshControl.call( this, control );
         }
      };
      
      JQGridRenderer.prototype.EndLife = function(){
          /* Remove SearchCtrl */
          this.GetSearchCtrl().SetContainer( null );
          /* Remove All Custom Events */
          $( "#" + this.GetPM().Get( "GetPlaceholder" ) ).undelegate();
          
          $( window ).unbind( "resize.JQGrid" );
          SiebelApp.EventManager.removeListner( "themechange", this.resize, this );

          SiebelApp.EventManager.removeListner( "gridresize", this.fixHeight, this );
          
          this.GetColumnHelper().EndLife();
          this.GetGrid().jqGrid( "GridUnload" );
          this.SetGrid(  null  );
          
          SiebelAppFacade.JQGridRenderer.superclass.EndLife.call( this );
      };
      
      JQGridRenderer.prototype.ResetRendererState = function() {
          if(SiebelApp.S_App.GetPopupPM().Get("isCurrencyOpen")){
            return false;
          }
          this.UpdateSelectedRow();
          SiebelAppFacade.JQGridRenderer.superclass.ResetRendererState.call( this );
      };
      
      JQGridRenderer.prototype.UpdatePick = function (){
          var arrValues = arguments[arguments.length-1];
          var control   = this.GetPM().Get( "GetActiveControl" );
          if( !control ){
              return;
          }
          ShowDropDown.call(this, control, arrValues );
          SiebelAppFacade.JQGridRenderer.superclass.UpdatePick.apply( this, arguments );
      };
      
      function ShowDropDown( control, dataArray ){
          var ctrlEl = $( "#" + this.GetSelectedRow() + "_" + this.GetColumnHelper().GetModifiedColumnName( control.GetName() ), this.GetGrid() );
          
          if( control ){
              if( !this.GetPM().ExecuteMethod( "CanUpdate", control.GetName() ) ){
                  // Sorry, control is not editable!
                  ctrlEl.focus();
                  return false;
              }
          }
          
          dataArray = dataArray || null;
          
          if( dataArray === null ){
              ctrlEl.autocomplete( "option", "source", [] );
              this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_INVOKE_COMBO" ),  control );
              return;
          }
          
          if( ctrlEl.length !== 0 ){
              if ( dataArray.length > 0 ){
                  this.GetPM().SetProperty ("isControlPopupOpen", true);
              }
              ctrlEl
                  .autocomplete( "option", "source",      dataArray )
                  .autocomplete( "option", "minLength",   0 )
                  .autocomplete( "search", "" );
              ctrlEl.autocomplete("widget").attr("role","combobox");
              ctrlEl.autocomplete("widget").children().find("a").attr("role","option");
              ctrlEl.focus();
          }
          ctrlEl = null;
          
      }

      function MoveToPreviousRow( e ) {
        var key = e.charCode || e.keyCode;

        if( e.shiftKey && key === 9 ){
          var that = this;

          var iRow = Number( this.GetSelectedRow() ) - 1;

          var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );

          for( var iCol = ( colModel.length - 1 ); iCol >= 0; iCol-- ){
            if( colModel[ iCol ].hidden === false ) { break; }
          }

          if( iRow >= 0 ){
            if( iRow === 0 ){
                setTimeout( function(){
                    that.GetGrid().find( "tr#" + ( iRow + 1 ) ).focus().children( "td" ).eq(1).attr("tabindex", "0");
                    SiebelApp.S_App.uiStatus.Free();
                }, 10);
                return;
            }
            else if( this.OnRowSelect( iRow ) === false ){
                return;
            }

            setTimeout( function(){
              that.GetGrid().jqGrid( 'editCell', iRow, iCol , true );
            }, 10);
          }
        }
      }

      function MoveToNextRow( e ){
        var key = e.charCode || e.keyCode;
        if( !e.shiftKey && key === 9 ){
          var that = this;
          
          var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );
          
          if( this.GetSelectedRow() == this.GetRowCount() ){
                for( var iCol = colModel.length - 1; iCol >= 0; iCol-- ){
                    if( colModel[ iCol ].hidden === false ) { break; }
                 }
                setTimeout( function(){
                    that.GetGrid().find( "tr#" + Number( that.GetSelectedRow() ) ).focus().children( "td" ).eq(iCol).attr("tabindex", "0");
                    SiebelApp.S_App.uiStatus.Free();
                }, 10);
                return;
           }

          var iRow = Number( this.GetSelectedRow() ) + 1;

          for( var iCol = 0; iCol < colModel.length; iCol++ ){
            if( colModel[ iCol ].hidden === false ) { break; }
          }

          if( iRow <= this.GetRowCount() ){
            if( this.OnRowSelect( iRow ) === false ){
                return;
            }

            setTimeout( function(){
              that.GetGrid().jqGrid( 'editCell', iRow, iCol, true);
            }, 10);
          }
          else{
            setTimeout( function(){
                that.GetGrid().jqGrid( 'editCell', Number( that.GetSelectedRow() ), iCol, true);
                SiebelApp.S_App.uiStatus.Free();
            }, 10);
          }
        }
      }

      function drilldownFormatter( cellvalue, options, rowObject ) {
          return "<a href=\"javascript:void(0);\" class=\"drilldown\" name=\"" + this.GetColumnHelper().GetActualControlName( options.colModel.name ) + "\" tabindex=\"-1\" >" + HtmlEncode(cellvalue) + "</a>";
      }

      function IconMapFormatter( cellvalue, options, rowObject ) {
         var IconMap = SiebelApp.S_App.GetIconMap();
         var control = this.GetColumnHelper().GetColControl()[options.colModel.name];
         var IconMapName = SiebelApp.S_App.LookupStringCache(control.GetIconMap());
         if(IconMapName)
         {
            var IconMapArray = IconMap[IconMapName];
            if(IconMapArray)
            {
                for(var i = 0; i< IconMapArray.length; i ++)
                {
                    if(IconMapArray[i].iconName == cellvalue)
                    {
                        if( control.GetUIType() === checkbox && typeof IconMapArray[i].iconImage === "string" ){
                            IconMapArray[i].iconImage = IconMapArray[i].iconImage.substr( 0, IconMapArray[i].iconImage.length -1 ) + " role = " + "\"presentation\"" + ">";
                        }
                        //Accessibility
                        var iconEl = $( IconMapArray[i].iconImage ),
                            ctrlDisplayName = control.GetDisplayName();
                        if( ctrlDisplayName ){
                            var attrString = iconEl.attr( "alt" );
                            iconEl.attr( "alt", ( attrString ? ( ctrlDisplayName + ":" + attrString) : attrString ) );
                            attrString = iconEl.attr( "title" );
                            iconEl.attr( "title", ( attrString ? ( ctrlDisplayName + ":" + attrString) : attrString ) );
                            iconEl = iconEl[0].outerHTML;
                        }
                        else{
                            iconEl = IconMapArray[i].iconImag;
                        }

                        return iconEl + "<span style='display:none;'>" + cellvalue + "</span>";
                    }
                }
            }
         }
         return cellvalue;
      }

      function urlFormatter(  cellvalue ) {

         cellvalue = HtmlEncode(cellvalue);
         var url = cellvalue;
         if( typeof( cellvalue ) === "string" ) {

            if( (url.indexOf( "http://" ) != 0) &&
               (url.indexOf( "https://" ) != 0)) {

                  url = "http://" + url;
            }
         }
         return "<a tabindex='-1' href='" + url + "' target='_blank' >" + cellvalue + "</a>";
      }
      
      function emailFormatter(  cellvalue ) {
        if(cellvalue) {
            cellvalue = HtmlEncode(cellvalue);
            return "<a tabindex='-1' href=\"mailto:" + cellvalue + "\">" + cellvalue + "</a>";
        }
        else{
            return "";
        }
      }
      
      
      function imageControlFormatter( cellvalue, options, rowObject ) {
         if(!cellvalue){
            return cellvalue;
         }
         var value;
         var control = this.GetColumnHelper().GetColControl()[options.colModel.name];
         var bPvtField = this.GetPM().ExecuteMethod( "IsPrivateField", control.GetName());
         if(bPvtField){
             value = this.GetPM().ExecuteMethod( "GetFormattedFieldValue", control,false);
         }
         return value + "<span style='display:none;'>" + cellvalue + "</span>";
      }
      
      function phoneFieldFormatter( cellvalue, options, rowObject) {
         var className = "siebui-call-from-ui-disabled";
         
         try {
            if (SiebelApp.S_App.CommToolbar.CallContactFromUIEnabled()) {
                className = "siebui-call-from-ui-enabled";
            }
         }catch(error){
            SiebelJS.Log(error);
         }

         return "<a href=\"javascript:void(0);\" class=\"" + className + "\" name=\"" + this.GetColumnHelper().GetActualControlName( options.colModel.name ) + "\" tabindex=\"-1\" >" + HtmlEncode(cellvalue) + "</a>";
      };
      
      function PrepareColumnInfo( listOfColumns ) {
        var columnName  = [];
        var columnModel = [];
        var current = null;
        var that = this;
        for( var index = 0, length = listOfColumns.length; index < length; index++ )
        {
          current = {};
          //Add the Column with FieldName as the key
          current.name = this.GetColumnHelper().AddColumn( listOfColumns[index].name, listOfColumns[index].control);
          current.editable = true;
          current.editoptions = {"class" : "siebui-list-ctrl", "maxlength": (listOfColumns[index].control.GetMaxSize() || 256)};
          current.sortable = listOfColumns[index].control ? listOfColumns[index].control.IsSortable() === siebConsts.get( "SWE_NUMERIC_TRUE" ) : false;
          switch( listOfColumns[index].controlType ){
            case combo:
              current.editoptions.dataInit = function( element ) {
                SiebelAppFacade.ControlBuilder.SelectCtrl({
                  target    : element,
                  className : 'applet-list-combo',
                  control   : that.GetColumnControl( $( element ).attr( "name" ) ),
                  scope     : that,
                  click     : ShowDropDown
                });
              };
              break;

            case datePick:
                current.editoptions.dataInit = function( element ) {
                    SiebelAppFacade.ControlBuilder.DatePick({
                        target    : element,
                        className : 'applet-list-date',
                        control   : that.GetColumnControl( $( element ).attr( "name" ) ),
                        scope     : that,
                        showPopup : false,
                        click     : function( ctrl, tgt ){
                            if( ! this.GetPM().ExecuteMethod( "CanUpdate",  $( tgt ).attr( "name" ) ) ){
                                return;
                            }
                            this.GetPM().SetProperty ("isControlPopupOpen", true);
                            var self = this;
                            SiebelAppFacade.ControlBuilder.DatePick({
                                target    : tgt,
                                className : 'applet-list-datetime',
                                control   : ctrl,
                                scope     : self,
                                showPopup : true,
                                getISOVal : function (){
                                    return utils.toISOFormat( $( this.target ).val(), false );;
                                },
                                onClose   : function ( inputText, inst) {
                                    $( this ).datetimepicker("destroy");
                                    self.SetFocusToControl(ctrl.GetName(), true);
                                    self.GetPM().GetProxy().LeaveField(ctrl, inputText, true);                                    
                                }
                            });
                        }
                    });
                };
                break;
                
            case dateTimePick:
            case dateTimezonePick:
                current.editoptions.dataInit = function( element ) {
                    var id = "#" + $(element).attr( "id" );
                    SiebelAppFacade.ControlBuilder.DateTimePick({
                        target    : element,
                        className : 'applet-list-datetime',
                        control   : that.GetColumnControl( $( element ).attr( "name" ) ),
                        scope     : that,
                        showPopup : false,
                        click     : function ( ctrl, tgt ){
                            if( ! this.GetPM().ExecuteMethod( "CanUpdate",  $( tgt ).attr( "name" ) ) ){
                                return;
                            }
                            this.GetPM().SetProperty ("isControlPopupOpen", true);
                            var self = this;
                            SiebelAppFacade.ControlBuilder.DateTimePick({
                                target    : tgt,
                                className : 'applet-list-datetime',
                                control   : ctrl,
                                scope     : self,
                                showPopup : true,
                                getISOVal : function (){
                                    return utils.toISOFormat( $( this.target ).val(), true );;
                                },
                                onClose   : function ( inputText, inst )
                                {
                                    $(this).datetimepicker("destroy");
                                    self.SetFocusToControl(ctrl.GetName(), true);
                                    self.GetPM().GetProxy().LeaveField(ctrl, $(this).val(), true);                                    
                                }
                            });
                        }
                    });
              };
              break;


            case url:
               current.formatter = function( cellvalue ){
                  return urlFormatter.call( that, cellvalue );
               };
               current.unformat = function( cellvalue ){
                  return cellvalue;
               };

               break;
            
            case imageControl:
                current.formatter = function( cellvalue, options, rowObject ){
                    return imageControlFormatter.call( that, cellvalue, options, rowObject );
                };
                current.unformat = function( cellvalue, options, cell ){
                    return cellvalue;
                };
               break;
               
            case calc:
                current.editoptions.dataInit = function( element ) {
                    SiebelAppFacade.ControlBuilder.Calculator({
                        target    : $(element),
                        className : 'applet-list-calculator',
                        control   : that.GetColumnControl( $( element ).attr( "name" ) ),
                        scope     : this,
                        click     : function( control, element ){
                            if( ! that.GetPM().ExecuteMethod( "CanUpdate",  control.GetName() ) ){
                                return;
                            }
                            that.GetPM().SetProperty ("isControlPopupOpen", true);
                            that.SetCellValue( that.GetGrid().jqGrid('getGridParam', 'selrow'), control.GetFieldName(),
                                    that.GetPM().ExecuteMethod( "GetFieldValue",  control ) );
                            SiebelAppFacade.ControlBuilder.Calculator({
                                target    : $(element),
                                className : 'applet-list-calculator',
                                control   : control,
                                show      : true,
                                close: function( ar ){
                                    var val = ar.replace(/\[/g, "").replace( /\]/g, "" );
                                    //VT:Saving the value into the control is sufficient to retain the right values.It may so happen that the control is no longer available due to the various mechanism of resetCell/saveCell 
                                    //that.SetCellValue( that.GetGrid().jqGrid('getGridParam', 'selrow'), control.GetFieldName(),val );
                                    if($(this).parent().length!==0)
                                    {
                                       $( this ).val(val).focus();
                                       $( this ).calculator("destroy");
                                       $( this ).next( "img" ).show();
                                    }
                                    //VT:The active control does not change in the proxy and hence removing this line. Also this could cause duplicate calls to OnEnter field, by constantly opening/closing the calc
                                    //that.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_COLUMN_FOCUS" ), that.GetSelectedRow(), control, "" );
                                }
                            });
                        }
                    });
                };
              break;

            case mailTo:
              current.formatter = function( cellvalue ){
                 return emailFormatter.call( that, cellvalue );
              };
              current.unformat = function( cellvalue ){
                 return cellvalue;
              };
              break;

            case textArea:
              current.formatter = function( cellvalue, options, rowObject ){
                 return '<div class="siebui-list-textareactrl-nofocus">' + HtmlEncode(cellvalue) +'</div>';
              };
              current.unformat = function( cellvalue, options, cell){
                 return cellvalue;
              };
              current.edittype = "textarea";
              var textAreaHeight = "height:"+ CalcGridHeight.call(this)/2 +"px;";
              var textAreawidth = "width:" + CalcTextAreaWidth.call(this, listOfColumns[index].control.GetWidth()) + "px;";
              var textAreaStyle= textAreaHeight + textAreawidth;
              current.editoptions = {"style" :textAreaStyle , "class" : "siebui-list-textareactrl", "maxlength": (listOfColumns[index].control.GetMaxSize() || 256)};

              break;

            case checkbox:
                current.edittype = "custom";
                current.editoptions = current.editoptions || {};
                current.editoptions.custom_element = function (value, options) {
                    var cb = $("<input type=\"checkbox\" role=\"checkbox\" tabindex=\"0\" value=\"" + value + "\" aria-checked= " + ( value === "Y" ? '"true"' : '"false"' ) + " " + ( value === "Y" ? "checked=checked" : "" ) + " />");
                    
                    if(options && options.dataEvents) {
                        $.each(options.dataEvents, function() {
                            cb.bind(this.type, this.fn);
                        });
                    }

                    return cb[0];
                };
                current.editoptions.custom_value = function(elem, operation, value) {
                    var el = $( elem );
                    if(operation === 'get') {
                        return el.val();
                    }
                    else if(operation === 'set') {
                        el.val( value );
                    }
                };
                break;

            case mvg :
              current.editoptions.dataInit = function( element ) {
                SiebelAppFacade.ControlBuilder.Mvg({
                  target    : element,
                  className : 'applet-list-mvg',
                  scope     : that,
                  click     : function( ctrl ){
                                  this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_INVOKE_MVG" ), ctrl );
                                  that.resetCell( ctrl.GetName() );
                              },
                  control   : that.GetColumnControl( $( element ).attr( "name" ) )
                });
              };
              break;
              
            case effdat:
              current.editoptions.dataInit = function( element ) {
                SiebelAppFacade.ControlBuilder.EffDat({
                  target    : element,
                  className : 'applet-list-effdat',
                  scope     : that,
                  click     : function( ctrl ){
                                  this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_INVOKE_EFFDAT" ), ctrl );
                                  that.resetCell( ctrl.GetName() );
                              },
                  control   : that.GetColumnControl( $( element ).attr( "name" ) )
                });
              };
              break;
            case pick:
              current.editoptions.dataInit = function( element ) {
                SiebelAppFacade.ControlBuilder.Pick({
                  target    : element,
                  className : 'applet-list-pick',
                  scope     : that,
                  click     : function( ctrl ){
                                  this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_INVOKE_PICK" ), ctrl );
                                  that.resetCell( ctrl.GetName() );
                              },
                  control   : that.GetColumnControl( $( element ).attr( "name" ) )
                });
              };
              break;
            case currencyCal:
                current.editoptions.dataInit = function( element ) {
                SiebelAppFacade.ControlBuilder.Currency ({
                    target    : element,
                    className : 'applet-list-pick',
                    scope     : that,
                    click     : function( ctrl , e ){
                                    this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_CURRENCY_POPUP" ),  ctrl  );
                                    //VT:Why to reset the cell which popped this up, since we will need the icon position to position the currency applet all the time
                                    //that.resetCell( ctrl.GetName() );
                              },
                  control   : that.GetColumnControl( $( element ).attr( "name" ) )
                });
              };
              break;
            case passwordCtrl:
                current.edittype = "password";
                current.formatter = function( cellvalue, options, rowObject ){
                    options.colModel.title = false;
                    return (cellvalue || "" ).replace( /./g, "." );
                };
                current.unformat = function( cellvalue, options, cell){
                    var ctrlName = that.GetColumnHelper().GetActualControlName( options.colModel.name );
                    var control = that.GetColumnControl(ctrlName);
                    return that.GetPM().ExecuteMethod( "GetFormattedFieldValue", control,true);
                };
                break;
            case text:
                current.editoptions.dataInit = function( element ) {
                if(that.GetColumnControl( $( element ).attr( "name" ) ).GetPopupType()){
                    SiebelAppFacade.ControlBuilder.DetailPopup({
                            target    : element,
                            className : 'applet-list-pick',
                            scope     : that,
                            click     : function( ctrl ){
                                            this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_INVOKE_DETAIL_POPUP" ),  ctrl  );
                                            that.resetCell( ctrl.GetName());
                                        },
                            control   : that.GetColumnControl( $( element ).attr( "name" ) )
                            });
                        }
                };
                break;
          }

          if( listOfColumns[index].isLink ){
            // Formatter needs to unformat while Cell Editing..
            current.formatter = function( cellvalue, options, rowObject ){
                  return drilldownFormatter.call( that, cellvalue, options, rowObject );
            };
            current.unformat = function( cellvalue, options, cell ){
              return cellvalue;
            };
          }

          if( listOfColumns[index].control.GetIconMap() ){
            current.formatter = function( cellvalue, options, rowObject ){
                return IconMapFormatter.call( that, cellvalue, options, rowObject );
            };
            current.unformat = function( cellvalue, options, cell ){
                return cellvalue;
            };
          }

          current.editoptions = current.editoptions || {};          
          current.editoptions.dataEvents = [{
              type  : 'keydown',
              fn    : function( event ){                           
                          HandleKeyEvents.call (that, $(this), event);
                      }
          }];

          
          //Accessibility : Give a unique ID to each cell so that we can refer the ID and append the accessibility attributes
          current.cellattr = function (rowId, tv, rawObject, cm, rdata) { var id = 'id=' + rowId + cm.name ; return id; };
          current.width = listOfColumns[index].control.GetWidth()+"px";

          // if comm enabled, need to check for phone field, for call contact from ui feature
          if (SiebelApp.S_App.CommToolbar) {
            var dataType = this.GetPM().ExecuteMethod( "GetFieldDataType", listOfColumns[index].name);
            if (dataType.toLowerCase() === siebConsts.get( "SWE_CTRL_PHONE" ).toLowerCase()) {
                current.formatter = function( cellvalue, options, rowObject ){
                    return phoneFieldFormatter.call( that, cellvalue, options, rowObject);
                };
                current.unformat = function( cellvalue, options, cell ){
                    return cellvalue;
                };
            }        
          }
          columnModel.push( current );
          //Push the DisplayName in the columnName of Grid. Please not that
          // we have FieldName in the columnModel
          columnName.push( listOfColumns[index].control.GetDisplayName());

        }

        if( this.GetPM().Get( "HasHierarchy" ) ){
           columnModel[0].unformat = columnModel[0].unformat || function( cellvalue, options, cell ){
                  return cellvalue;
           };

           columnModel.push({search:false,hidden:true,sortable:false,resizable:false,hidedlg:true});
           columnName.push("Search");
        }

        return {
          "columnName" : columnName,
          "columnModel": columnModel
        };
      }
      

      /* Section to Handle Key press events on controls. All key events will route here.
      /- Add additional key handlers as required here. Return true from a particular key's method
      /- if the event's propagation needs to be stopped and the default action needs to be avoided.
      /- Use bTouched to handle control to CommandManager */
      
      function HandleKeyEvents( el, event ){
          var bHandled = false;
          var bTouched = false;
          var pm = this.GetPM();
          if( el && el.length === 1 && event ){
              var control = this.GetColumnControl($(el).attr("name"));
              if (control) {
                  switch( event.which ){
                      case $.ui.keyCode.ENTER:
                          bHandled = HandleEnterKey.call (this, el, control, event);
                          bTouched = true;
                          break;
                      case $.ui.keyCode.ESCAPE:
                          bHandled = HandleEscapeKey.call (this, el, control, event);
                          bTouched = true;
                          break;
                      case $.ui.keyCode.TAB:                      
                          bHandled = HandleTabKey.call (this, el, control, event);                      
                          break;
                      case $.ui.keyCode.UP:
                          bHandled = HandleUpKey.call (this, el, control, event);
                          break;
                      case $.ui.keyCode.DOWN:
                          bHandled = HandleDownKey.call (this, el, control, event);
                          break;
                      case $.ui.keyCode.LEFT:
                      case $.ui.keyCode.RIGHT:
                          bHandled = HandleLeftRightKey.call (this, el, control, event);
                          break;
                      case $.ui.keyCode.BACKSPACE:
                          bHandled = HandleBackSpaceKey.call (this, el, control, event);
                          if (bHandled) {
                              event.preventDefault();
                          }
                          break;
                  }
              }
          }
          if (bHandled) {
              event.stopImmediatePropagation();
          }
          else if (bTouched) {
              // Nothing was done at the control level. Push the call to the command manager. 
              // We still want to stop prop since we dont want the grid's inherent handler kicking in.
              SiebelApp.S_App.GetCmdMgr().FireAccelerator(event, event.which, utils.GetEventNType(event));
              event.stopImmediatePropagation();
          }          
      }
      
      function HandleDownKey (el, control, event) {          
          switch (control.GetUIType()){
              case combo:
                  if( event.ctrlKey || event.altKey || event.shiftKey){
                      $(el).autocomplete( "option", "source", []);
                  }
                  else if( !( $(el).autocomplete('widget') .is(':visible') ) ){
                      ShowDropDown.call(this, control, null );
                      return true;
                  }
          }
          return false;
      }
      
      function HandleUpKey (el, control, event) {
          switch (control.GetUIType()){
              case combo:
                  if( event.ctrlKey || event.altKey || event.shiftKey){
                      $(el).autocomplete( "option", "source", []);
                  }
                  break;
          }
          return false;
      }
      
      function HandleLeftRightKey (el, control, event){
          var bHandled = false;
          if (event.altKey){
              // Alt + Left/Right = Browser navigation. Let's dismiss any control popups. Reuse escape handler.
              // TODO: Send a separate event to the model, if extension requirement demands.              
              bHandled = HandleEscapeKey.call (this, el, control, event);
          }
          return bHandled;
      }
      
      
      function HandleTabKey (el, control, event) {
          this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_ENTER_KEY_PRESS" ),  control );
          return false;
      }
      
      function HandleEnterKey (el, control, event){
          switch (control.GetUIType()){
              case textArea           :
              case url                :
              case ink                :
              case rtcEditor          :
              case rtcEditorTextOnly  :
              case rtcLink            :
              case rtcPopup           :
              case rtcIO              :
              case btnControl         :
                  // In these control cases, enter should never be sent to cmdmgr.
                  // The control will itself do something usually (like newline or invoke)
                  return true;
          }

          return ( this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_ENTER_KEY_PRESS" ),  control ) );
      }
    
      function HandleEscapeKey (el, control, event){
          var preState = this.GetPM().Get("isControlPopupOpen");
          this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_ESCAPE_KEY_PRESS" ),  control );
          if (this.GetPM().Get("isControlPopupOpen") !== preState) {
              return true;
          }
          return false;
      }
      
      function HandleBackSpaceKey (el, control, event){
          var type = el.attr( "type" );
          if (type === "checkbox" ) {
              return true;
          }
            
          var canUpdate = this.GetPM().ExecuteMethod( "CanUpdate",  control.GetName() );
          if (!canUpdate){
              return true;
          }
          else {
              return false;
          }
      }            
      
      
      function CloseControlPopup () {
          if (this.GetPM().Get("isControlPopupOpen") === false) {
              var control = this.GetPM().Get("GetActiveControl");
              if (control) {
                  var el;
                  if (control.GetFieldName()){
                      el = GetControlElement.call (this, control.GetFieldName());
                  }
                  else {
                      el = el = $($( "input[name=\"" + control.GetInputName() + "\"]" )[0] || $( "#" + control.GetInputName() )[0]);
                  }
                  if (el && el.length > 0){
                      switch (control.GetUIType()){
                          case combo              :
                              el.autocomplete("close");
                              break;
                          
                          case datePick           :
                          case dateTimePick       :
                          case dateTimezonePick   :
                              el.datetimepicker("hide");
                              break;
                                
                          case calc               :
                              el.calculator("hide");
                              break;
                      }
                  }
              }
          }
      }
      
      function GetControlElement (fieldName) {
          if (fieldName) {
              var jqGridCtrl = this.GetGrid();
              fieldName = this.GetColumnHelper( ).GetModifiedColumnName( fieldName );
              var rowid = jqGridCtrl.jqGrid('getGridParam', 'selrow');
              var el = $( "#" + rowid + "_" + fieldName, jqGridCtrl );
              return el;
          }              
      }
      
      JQGridRenderer.prototype.resetCell = function ( name ){
          var jqGridCtrl = this.GetGrid();
          var currentRow = Number(jqGridCtrl.jqGrid('getGridParam', 'selrow'));
          var listOfColumns = this.GetPM().Get( "ListOfColumns" );
          // See focus if for Column
          for(var i=0;i <listOfColumns.length;i++)
          {
               for(var key in this.GetColumnHelper().GetColMap())
               {
                   if(listOfColumns[i].name == this.GetColumnHelper().GetColMap()[key])
                   {
                      if(listOfColumns[i].name == name)
                      {
                         var canUpdate = this.CanUpdateControl(null, key);
                         var iCol = listOfColumns[i].index;
                         jqGridCtrl.jqGrid('editCell',currentRow,iCol,false);
                         return true;
                      }
                   }
               }
          }
      };
      
      /*Will return the listApplet header height,If header height is not define then it will return defult height*/
      function GetHeaderHeight()
      {
          var styleSheetName  = SiebelApp.S_App.GetStyleSheetName();
          var headerheight = utils.GetstyleSheetPropVal(styleSheetName , ".ListAppletHeader", "height");

          return headerheight || siebConsts.get( "DFLT_HEADHGT" );
      }
      /*Will return the listApplet row  height,If row  height is not define in css then it will return defult row  height*/
      function GetRowHeight()
      {
          var styleSheetName  = SiebelApp.S_App.GetStyleSheetName();
          var rowHeight = utils.GetstyleSheetPropVal(styleSheetName , ".ListAppletRow", "height");

          return rowHeight || siebConsts.get( "MIN_ROWHGT" );
      }

/* Will set row height of all row in the jqgrid*/
  function SetRowHeight()
  {
      var grid = $("#"+ this.GetPM().Get( "GetPlaceholder" ));
      var rowHeight = GetRowHeight.call(this);
      var ids = grid.getDataIDs();
      
      for (var i = 0; i < ids.length; i++)
      {
          grid.setRowData ( ids[i], false, {height: rowHeight} );
      }
  }
        
  /*Will calculate listapplet height based of number of row and list applet row height*/
    function CalcGridHeight()
    {
        var rowCount = Number(this.GetPM().Get("GetRowListRowCount"));
        var rowHeight = parseFloat(GetRowHeight.call(this));
        return  rowCount*rowHeight;
    }
/*if  sum of the all column width grater then is parent size then it will return false otherwise it will return true
 * So that all column display can we  expand as per parent size.
 *
 *  */
      function isShrinkToFit()
      {
          var pm = this.GetPM();
          var placeHolder = pm.Get( "GetPlaceholder" );
          var totalcolumnWidth = 0;
          var listOfColumns = pm.Get( "ListOfColumns" );
          var parentWidth = $( "#" + placeHolder).parent().outerWidth();
          if( $( "#gbox_" + placeHolder ).length > 0 ){
              parentWidth = $( "#gbox_" + placeHolder ).parent().width();
          }          
          for(var i=0; i< listOfColumns.length;i++)
          {
              totalcolumnWidth = Number(totalcolumnWidth) + Number(listOfColumns[i].control.GetWidth());
          }
          if(parentWidth<totalcolumnWidth)
          {
              return false;
          }

          return true;
      }
      
      /* Will calculate textarea width base on column width*/
      function CalcTextAreaWidth(columnwidth)
      {
          var listOfColumns = this.GetPM().Get( "ListOfColumns" );
          var totalcolumnWidth = 0;
          for(var i=0; i< listOfColumns.length;i++)
          {
              totalcolumnWidth = Number(totalcolumnWidth) + Number(listOfColumns[i].control.GetWidth());
          }
          
        var totalwidth = $( "#" + this.GetPM().Get( "GetPlaceholder" )).parent().width();

          var textAreaWidth = (totalwidth*columnwidth)/totalcolumnWidth;
          
          return textAreaWidth;
      }
      
      
       function GetTotalColumnWidth()
      {
          var pm = this.GetPM();
          var totalcolumnWidth = 0;
          var listOfColumns = pm.Get( "ListOfColumns" );
          var len = listOfColumns.length;

          for(var i=0; i< len; i++)
          {
              
            totalcolumnWidth = Number(totalcolumnWidth) + Number(listOfColumns[i].control.GetWidth()) + Number(colPadding);
          }
          return totalcolumnWidth ;
      }
      
      JQGridRenderer.prototype.ShowUI = function( ) {
        SiebelAppFacade.JQGridRenderer.superclass.ShowUI.call( this );
        var pm = this.GetPM();
        var columnInfo = PrepareColumnInfo.call( this, pm.Get( "ListOfColumns" )  );

        this.SetGrid( $( "#" + pm.Get( "GetPlaceholder" ) ) );
        var jqGridCtrl = this.GetGrid();
        if(jqGridCtrl.length>0)
        {
           var colIndex=0;
           var bShrinkToFit = true;
           
           // TO do : Will update below if condition when we standardize the shuttle.
           if(  $("[name='popup']").find( "tr.AppletStylePopup" ).length ===0)
           {
               bShrinkToFit = isShrinkToFit.call(this);
           }
           
           var gridHeight = CalcGridHeight.call(this) +Number(GridPadding);
           //var parentWidth = $( "#" + pm.Get( "GetPlaceholder" )).parent().outerWidth();

           try {
              var gridConfig = {
                     datatype      : "local",
                     colModel      : columnInfo.columnModel,
                     colNames      : columnInfo.columnName,
                     autoencode    : true,
                     shrinkToFit   : bShrinkToFit,
                     autowidth     : true,
                     pager         : '#pager_'+ pm.Get( "GetPlaceholder" ),
                     sortname      : 'name',
                     viewrecords   : true,
                     sortorder     : "desc",
                     multiselect   : true,
                     hoverrows     : false,
                     height        : gridHeight
                  };

                  if (pm.Get ("HasHierarchy")){
                     $.extend( gridConfig, {
                      treeGrid      : true,
                      treeGridModel : "adjacency",
                      treeIcons     : {
                                         plus  :'ui-icon-triangle-1-e',
                                         minus :'ui-icon-triangle-1-s',
                                         leaf  :'ui-icon-radio-off'
                                      },
                      treeReader    : {
                                         level_field     : "Hierarchy_Level",
                                         parent_id_field : "Parent_Id",
                                         leaf_field      : "Is_Leaf",
                                         expanded_field  : "Is_Expanded"
                                      },
                      ExpandColumn  : columnInfo.columnName[0]
                     });
                  }

                jqGridCtrl.jqGrid( gridConfig );
                
                jqGridCtrl.hideCol( 'cb' );

                $( "#s_" + pm.Get( "GetFullId" ) + "_div" ).find( ".ui-jqgrid-sortable" ).css('height',  GetHeaderHeight.call(this));

                this.resize();
              
                //Accessibility :: Add the tags required for accessibility which can be refered in grid
                if ( SiebelApp.S_App.GetAccessibilityEnhanced() !== undefined &&   utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) ){
                   this.AddAccessibilityTags();
                }
              
              
                // Why JQGrid does not provide a way to set Tooltip? Also i18n?
                // Before Changing tooltip, make sure to change in OnPagination
                $( "#next_pager_"  + pm.Get( "GetPlaceholder" ) ).children( "span" ).attr("title", localeObj.GetLocalString("NextRecToolTip") );
                $( "#last_pager_"  + pm.Get( "GetPlaceholder" ) ).children( "span" ).attr("title", localeObj.GetLocalString("NextRecSetToolTip"));
                $( "#prev_pager_"  + pm.Get( "GetPlaceholder" ) ).children( "span" ).attr("title", localeObj.GetLocalString("PrevRecToolTip"));
                $( "#first_pager_" + pm.Get( "GetPlaceholder" ) ).children( "span" ).attr("title", localeObj.GetLocalString("PrevRecSetToolTip"));
                
                // This bit is added to hide the page info content in the pager and View 1-10 of 10+ display
                $("#sp_1_pager_" + pm.Get( "GetPlaceholder") ).parent().css("display", "none");
                $( "#pager_" + pm.Get( "GetPlaceholder" ) + "_right div" ).hide();
                //Add QTP info

               for(colIndex=0; colIndex<columnInfo.columnModel.length; colIndex++)
               {
                  var target = $("#jqgh_" + pm.Get( "GetPlaceholder" ) + "_" + columnInfo.columnModel[colIndex].name);
                  SiebelAppFacade.JQGridRenderer.superclass.InjectQTPInfo.call(this,target,this.GetColumnControl(columnInfo.columnModel[colIndex].name));
               }

               
               
               var thd = $( "thead:first", jqGridCtrl[0].grid.hDiv )[0];
               if( thd ){
                var colModelln = columnInfo.columnModel?columnInfo.columnModel.length:0;
                var strsort = localeObj.GetLocalString( siebConsts.get( "IDS_SORTABLE_TOOL_TIP" ) );
                var strnosort = localeObj.GetLocalString( siebConsts.get( "IDS_NON_SORTABLE_TOOL_TIP" ) );
                for( var iCol = 0; iCol < colModelln; iCol++ ){
                    $("tr.ui-jqgrid-labels th:eq(" + ( iCol + 1 ) + ")", thd)
                        .attr("title", columnInfo.columnModel[iCol].sortable ? strsort : strnosort)
                        .attr( "role", "columnheader" );
                }
                $(thd)
                    .find( "tr.ui-jqgrid-labels th" ).eq(1).attr( "tabindex" , "0" );
               }
               var tableHeader= $( "table:first", jqGridCtrl[0].grid.hDiv );
               tableHeader.attr("aria-labelledby","");
               thd = null;
               tableHeader = null;
               
            }
            catch (error) {
               alert(error); // We need a better logging mechanism...
            }
        }
         jqGridCtrl = null;
         columnInfo = null;
      };

      JQGridRenderer.prototype.ShowSearch = function(){
          var placeHolder = this.GetPM().Get( "GetPlaceholder" );

          var columns = [];
          var listOfColumns = this.GetPM().Get( "ListOfColumns" );
          for(var columnName in listOfColumns){
              columns.push(listOfColumns[columnName].control.GetDisplayName());
          }

          this.GetSearchCtrl().ShowUI(columns, placeHolder);
      };
      
      function UpdateNavigateInfo ()
      {
         var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" ) || [];
         if(!colModel)
         {
            return;
         }
         var that = this;
         function _drillDown( newValue, options, rowObject ){
            return drilldownFormatter.call( that, newValue, options, rowObject );
         }

         function _plainFn( cellvalue, options, cell ){
            return cellvalue;
         }
         for(var iCol = 0,len = colModel.length; iCol < len; iCol++ )
         {
            var ctrlName = colModel[iCol].name;
            var field = this.GetColumnHelper( ).GetActualControlName(ctrlName);
            var canNavigate = this.GetPM().ExecuteMethod( "CanNavigate", field );

            if(canNavigate)
            {
               colModel[ iCol ].formatter = _drillDown;
               colModel[ iCol ].unformat =  _plainFn;
            }
         }
      }


      /* TODO: If addRowData is capable of taking multiple records, why aren't we pushing it. */
      JQGridRenderer.prototype.BindData = function( bRefresh ){
        if( this.inProgress  ) { return false; }
        if( bRefresh ){
            this.ClearData( );
        }

        var pm = this.GetPM();
        var listCols = pm.Get( "ListOfColumns" );
        var listColLength = listCols.length;
        var recordSet = pm.Get( "GetRecordSet" );
        var beginrow = pm.Get("GetBeginRow")||0;
        var recordLength = Number(this.GetPM().Get("GetRowListRowCount")) + Number(beginrow);
        var isHierarchy = pm.Get("HasHierarchy");
        var bQueryMode = pm.Get("IsInQueryMode");
        var jqGridCtrl = this.GetGrid();
        this.GetPM().ExecuteMethod("WSHome");
        var recordSetLength = recordSet?recordSet.length:0;
        var currow = -1;
        
        
        
        if(jqGridCtrl.length>0)
        {
           if ( pm.Get ("HasHierarchy") ){
              jqGridCtrl.jqGrid( "setGridParam", { multiselect : false} );
           }

           //Accessibility
           var rowId = pm.Get( "GetRowIdentifier" );

           if ( SiebelApp.S_App.GetAccessibilityEnhanced() !== undefined &&   utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) && !rowId && listCols.length > 0 ){
               var ln = listCols.length;
               //Set Non Checkbox colmun as identifier
               for( var index = 0; index < ln ; index++ ){
                if( listCols[index].controlType !== checkbox ){
                    rowId = listCols[index].name;
                    break;
                }
               }
               if( !rowId ){
                rowId = listCols[0].name;
               }
           }

           if (!bQueryMode) {
               for ( var recordIndex = beginrow, count =0; recordIndex < recordLength; recordIndex++, count++) {
                    
                    if(pm.ExecuteMethod("IsCurWSRecActive")){
                        currow = count;
                    }
                    
                    if(recordIndex>=recordSetLength){
                        break;
                    }
                  var transObj = this.GetColumnHelper( ).TranslateObject( listCols, recordSet[ recordIndex ] );
                  if( !isHierarchy ){
                     jqGridCtrl.jqGrid(
                              'addRowData',
                              recordIndex + 1,
                              transObj );
                              
                    this.GetPM().ExecuteMethod("WSNextRecord");
                    
                  }
                  else{
                     transObj.Hierarchy_Level = recordSet[ recordIndex ]["Hierarchy Level"];
                     transObj.Is_Leaf = recordSet[ recordIndex ]["Is Leaf"];
                     transObj.Parent_Id = recordSet[ recordIndex ]["Parent Id"];
                     transObj.Is_Expanded = recordSet[ recordIndex ]["Is Expanded"];

                     jqGridCtrl.jqGrid(
                              'addChildNode',
                              recordIndex + 1,
                              null,
                              transObj);
                  }
                  //Accessibilty : Add the RowIdentifier, Column Identifier to the Cell
                  if ( SiebelApp.S_App.GetAccessibilityEnhanced() !== undefined &&   utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) && rowId !== "") {
                     for(var iCol=0; iCol <listCols.length;iCol++){
                        var colName = listCols[iCol].name;
                        var element = (recordIndex+1)+ this.GetColumnHelper( ).GetModifiedColumnName( colName );
                        //VT:Some of the commonly used special columns characters.Need to expand this to a family and solve it via RegExp
                        element = element.replace('%','\\%');
                        element = element.replace('$','\\$');
                        element = element.replace('#','\\#');
                        element = "#" + element;
                        this.AddAccessibilityInfo(recordIndex,iCol,rowId, listCols[iCol],element);

                     }
                  }
               }
                if(currow >=0)
                {
                this.GetPM().ExecuteMethod("SetCurRow", currow);
                }
           }
           else {
              var qRec = this.GetColumnHelper( ).TranslateObject( listCols, recordSet[0] );

              jqGridCtrl.clearGridData();

              jqGridCtrl.jqGrid( 'addRowData', 1, qRec );
           }

           if ( pm.Get ("HasHierarchy") ){
              jqGridCtrl.jqGrid( "setGridParam", { multiselect : true} );
           }
           this.PostBindData();
        }
        else if(pm.Get("GetMode") === consts.get("SWE_PST_APPLET_MODE_BASE"))//VT:Only a base mode should rebind. Else unnessary NoOp processing will happen . which will slow down the operaton dramatically due to the number of DOM interactions involved.
        {
           //VT:This is a list applet which does not have any grid, but only a repetition of controls via a for-each tag. Any other applet which hits this point, even though it has a grid means that the list container dint get delivered to client which means a misconfiguration
           SiebelJS.Log(pm.GetPMName() + " - This applet has either a foreach tag or does not have the correct grid container for the client to attach a list applet or is a list which is converted to form layout in one of the applet modes(Query,Edit,New) or is a list which is hidden via personalization");
           if(listColLength>0)
           {
               var colIndex = 0;
               for(colIndex = 0; colIndex<listColLength;colIndex++)
               {
                  var column = listCols[colIndex];
                  if(listCols[colIndex].control.GetFieldName())
                  {
                     if(recordSetLength>0)
                     {
                        $('[name="' + listCols[colIndex].control.GetInputName() + '"]').slice(recordSetLength).closest("tr").hide();
                     }
                     else
                     {
                        //server sends the selection-1 as the last part of the inputName and injects uint 65535 instead of -1 in the DOM
                        $('[name="' + listCols[colIndex].control.GetInputName().replace("-1","65535") + '"]').closest("tr").hide();
                     }
                  }
               }
               
               for ( var recordIndex = 0; (recordIndex < recordLength) && (recordIndex < recordSet.length); recordIndex++) {
                  var transObj = this.GetColumnHelper( ).TranslateObject( listCols, recordSet[ recordIndex ] );
                  for(colIndex = 0; colIndex<listColLength;colIndex++)
                  {
                     var column = listCols[colIndex];
                     if(listCols[colIndex].control.GetFieldName())
                     {
                        //first show the row if hidden
                        $('[name="' + listCols[colIndex].control.GetInputName() + '"]').eq(recordIndex).closest("tr").show();
                        //call super class show selection to make sure formatting is taken care
                        SiebelAppFacade.JQGridRenderer.superclass.ShowSelection.call( this, recordIndex);
                     }
                  }
               }
           }
        }
      };
      
      JQGridRenderer.prototype.AddAccessibilityTags = function() {
            var pm              = this.GetPM(),
                jqGridCtrl      = this.GetGrid(),
                appletSummary   = pm.Get( "GetAppletSummary" ),
                placeHolder     = pm.Get( "GetPlaceholder" );
            
            if( appletSummary ){
                jqGridCtrl
                    .attr( "summary", appletSummary )
                    .attr( "aria-labelledby", "" )
                    .attr( "datatable", "1" );
            }
            
            /* Prepare htmlstring for span label which can be used by screenreader to announce 
               siebel specific control types */
            var htmlString =   "<span id='" + placeHolder + "_altpick'          title='" + localeObj.GetLocalString( "IDS_SWE_PICK_TITLE" )                 + "' />" +
                               "<span id='" + placeHolder + "_altmvg'           title='" + localeObj.GetLocalString( "IDS_SWE_MVG_TITLE" )                  + "' />" + 
                               "<span id='" + placeHolder + "_altCurrCalc'      title='" + localeObj.GetLocalString( "IDS_SWE_CURRENCY_CALC_FIELD_TITLE" )  + "' />" +
                               "<span id='" + placeHolder + "_altCalc'          title='" + localeObj.GetLocalString( "IDS_SWE_CALC_FIELD_TITLE" )           + "' />" + 
                               "<span id='" + placeHolder + "_altDate'          title='" + localeObj.GetLocalString( "IDS_SWE_DATE_FIELD_TITLE" )           + "' />" + 
                               "<span id='" + placeHolder + "_altDateTime'      title='" + localeObj.GetLocalString( "IDS_SWE_DATETIME_FIELD_TITLE" )       + "' />" + 
                               "<span id='" + placeHolder + "_altDateTimeZone'  title='" + localeObj.GetLocalString( "IDS_SWE_DATETIMEZONE_FIELD_TITLE" )   + "' />" +
                               "<span id='" + placeHolder + "_altEffDate'       title='" + localeObj.GetLocalString( "IDS_SWE_EFFECTIVE_DATE_TITLE" )       + "' />" + 
                               "<span id='" + placeHolder + "_altCombo'         title='" + localeObj.GetLocalString( "IDS_SWE_COMBO_FIELD" )                + "' />" +
                               "<span id='" + placeHolder + "_altLink'          title='" + localeObj.GetLocalString( "IDS_SWE_CKEDITOR_LINK" )              + "' />" +
                               "<span id='" + placeHolder + "_altCheckBox'      title='" + localeObj.GetLocalString( "IDS_SWE_CKEDITOR_CHECKBOX" )          + "' />";
            
            jqGridCtrl
                .attr( "tabindex", "0")
                .after( htmlString );
            
      };
      
      JQGridRenderer.prototype.AddAccessibilityInfo = function(recordIndex,iCol,rowId, listCol,element) {
            var altText="";
            var descby=$(element).attr("aria-describedby") || "";
            
            switch( listCol.controlType ){
                case mvg :
                    altText = "altmvg";
                    break;
                case pick:
                    altText = "altpick";
                    break;
                case currencyCal:
                    altText = "altCurrCalc";
                    break;
                case calc:
                    altText = "altCalc";
                    break;
                case datePick:
                    altText = "altDate";
                    break;
                case dateTimePick:
                    altText = "altDateTime";
                    break;
                case dateTimezonePick:
                    altText = "altDateTimeZone";
                    break;
                case effdat:
                    altText = "altEffDate";
                    break;
                case combo:
                    altText = "altCombo";
                    break;
                case checkbox:
                    altText = "altCheckBox";
                    break;
            }
            
            if ( listCol.isLink ){
                descby += " " + this.GetPM().Get( "GetPlaceholder" ) + "_" + "altLink";
            }
            
            if( altText ){
                descby += " " + this.GetPM().Get( "GetPlaceholder" ) + "_" + altText;
            }
            
            if ( rowId !== listCol.name ){ // If not a RowIdentifier Col, add the RowIdentifier for this Col
                descby = (recordIndex+1)+this.GetColumnHelper( ).GetModifiedColumnName( rowId ) + " " + descby;
            }
            
            $(element).attr("aria-describedby",descby);
            
            if( listCol.controlType === checkbox ){
                if( $(element).text() === "Y" ){
                    $(element).attr("title",localeObj.GetLocalString("IDS_BHC_CHECKED"));
                }
                else{
                    $(element).attr("title",localeObj.GetLocalString("IDS_BHC_UNCHECKED"));
                }
            }
      };

      JQGridRenderer.prototype.PostBindData = function() {
        var placeHolder = this.GetPM().Get( "GetPlaceholder" );
        var jqGridCtrl = this.GetGrid();
       
        SetRowHeight.call(this);
        
        var height = Number(jqGridCtrl.height()) + Number(GridPadding) - 2; //oliver: added -3 to better fit window
        
        if(height>CalcGridHeight.call(this))
        {
          jqGridCtrl.setGridHeight(height);
        }


        $( "#first_pager_" + placeHolder ).removeClass( "ui-state-disabled" );
        $( "#prev_pager_"  + placeHolder ).removeClass( "ui-state-disabled" );
        $( "#next_pager_"  + placeHolder ).removeClass( "ui-state-disabled" );
        $( "#last_pager_"  + placeHolder ).removeClass( "ui-state-disabled" );
      };

      //Focus model
      JQGridRenderer.prototype.IsValidClick = function( source ){
        return ( utils.IndexOf( [ "input", "button" , "a" ], source.tagName.toLowerCase() ) === -1 ) &&
                $( source ).parents( "#" + this.GetPM().Get( "GetPlaceholder" ) ).length <= 0 ;
      };
      
      function InvokeColumnChange (el, ctrl, iRow, iCol, value){
        var type = ctrl.GetUIType();
        switch (type){
                
            case datePick:
            case dateTimePick:
            case dateTimezonePick:
                var fieldValue = utils.Trim(value || "");
                var ISOVal = utils.toISOFormat( fieldValue, ( ctrl.GetUIType() !== datePick ) );
            
                if (!ISOVal){
                    ISOVal = fieldValue;
                }
                else {
                    // Put it back into the control. Might be needed later.
                    $(el).data(consts.get("SWE_DATA_ISOVAL"), ISOVal);
                }
                
                value = ISOVal;
                break;
               
            default:
                break;
        }
        // Fire the event on the PM.
        this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_COLUMN_CHANGE" ), iRow, ctrl, value );
      }
      
      function BindColInputEvents( el, iRow, iCol ,control){
          /* Implemented as Custom Control cause JQGrid does not know how to handle checkbox correctly! */
          if( control.GetUIType() === checkbox ){
              el.parent().bind( "focus", function(){
                  if( $( this ).parent().length > 0 ){
                      $( this ).children( "input" ).eq(0).focus();
                      return false;    
                  }                  
              });
          }

          el.bind( "focus", { ctx: this, row: iRow, col : iCol }, function( evt ){
              var ctrl = $( this  );
              var value = ctrl.val();
              ctrl = evt.data.ctx.GetColumnControl(ctrl.attr( "name" ));
              if( ctrl ){
                  evt.data.ctx.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_COLUMN_FOCUS" ), evt.data.row, ctrl, value );
              }
          })
          .bind( "keydown", function(event){
              SiebelApp.S_App.GetCmdMgr().FireAccelerator(event, event.which, utils.GetEventNType(event));
          })
          .bind( "keydown", { ctx: this, row: iRow, col : iCol }, function( evt ){
              if( evt.data.col === 1 ){
                  MoveToPreviousRow.call( evt.data.ctx, evt );
              }
              else if( evt.data.col === (evt.data.ctx.GetGrid().jqGrid( "getGridParam", "colModel" ).length - 1) ){
                  MoveToNextRow.call( evt.data.ctx, evt );
              }
              if( evt.which === 9 ){
                  evt.preventDefault();
              }
          })
          .bind( "mousedown", { ctx: this }, function(event){
              if( $( this ).attr( "type" ) === "checkbox" && $.browser.webkit ){
                  $( this ).data( "webkit-mousedown", true );
              }
          })
          .bind( "blur", { ctx: this, row: iRow, col : iCol,control:control }, function( evt ){
              var ctrl = $( this  );
              if( ctrl.attr( "type" ) === "checkbox"  ){
                  if( ctrl.data( "webkit-mousedown" ) ){
                      ctrl.removeData( "webkit-mousedown" );
                      return;
                  }
                  //TODO: grid has a bad habit of pushing the focus to body. Forcefully stopping for now.
                  if( ( $( document.activeElement ).prop( "tagName" ) || "" ).toLowerCase() === "body" ){
                      ctrl.focus();
                      return;
                  } 
              }
              var value = ctrl.val();
              ctrl = evt.data.ctx.GetColumnControl(ctrl.attr( "name" ));
              if( ctrl ){
                  InvokeColumnChange.call (evt.data.ctx, this, ctrl, evt.data.row, evt.data.col, value);
              }
          })
          .bind( "click", { ctx: this, row: iRow, col : iCol }, function( evt ){
              var ctrl = $( this  );
              if( ctrl.attr( "type" ) !== "checkbox" ){
                  return;
              }
              var attr = ctrl.attr('readonly');
              if ( typeof attr !== 'undefined' && attr !== false ) {
                  ctrl.prop( "checked", !el.prop( "checked" ) );
              }

              ctrl.val( ctrl.prop("checked") ? "Y":"N" );
              if( ctrl.data( "webkit-mousedown" ) ){
                  ctrl.removeData( "webkit-mousedown" );
              }
              if( $.browser.webkit ){
                  var activeEl = $( document.activeElement );
                  if( ( ctrl.attr( "id" ) || "" ) !== ( activeEl.attr( "id") || "" ) ||
                      ( ctrl.attr( "name" ) || "" ) !==( activeEl.attr( "name") || "" )){
                      ctrl.focus();
                  }
              }
          });
          
      }

      JQGridRenderer.prototype.BindEvents = function( controlSet ) {
        var pm = this.GetPM();
        var controls = pm.Get( "GetControls" );
        //VT:In base mode , lets do only interactive control binding(like buttons) and not any columns/fields which are not interactive
        if(this.GetGrid().length === 0 && pm.Get("GetMode") === consts.get("SWE_PST_APPLET_MODE_BASE")){
           var limitedControls = {};
           for( var control in controls ){
              if( controls.hasOwnProperty( control ) ){
                  if(controls[control].GetControlType()!==colType){//VT:DONOT bind column controls for grid less applets(Home Pages).This is so that we donot bind unnecessarily those that we know will not needs any events .This has to be done for normal list applets as well.But not for now.
                     limitedControls[control] = controls[control];
                  }
              }
           }
           SiebelAppFacade.JQGridRenderer.superclass.BindEvents.call( this, limitedControls );
           limitedControls = null;
        }
        else{
           SiebelAppFacade.JQGridRenderer.superclass.BindEvents.call( this, controls );
        }
        var that = this;
        this.GetGrid().jqGrid( "NavigateByKey" );

        if(this.GetGrid().length===1)
        {
           $( "#" + this.GetPM().Get( "GetPlaceholder" ) ).delegate("a.drilldown", "click", {ctx : this}, function( event ){

               SiebelApp.S_App.uiStatus.Busy({
                   target: SiebelApp.S_App.GetTargetViewContainer(),
                   mask: true
               });

               var self = event.data.ctx;
               var name = $( this ).attr( "name" );
               var rowId = $( this ).parents( "tr" ).eq(0).attr( "id" );


               if( rowId > 0 ){
                   if( self.OnRowSelect( rowId ) === false ||
                       self.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_DRILLDOWN" ), name, rowId )=== false ){
                       SiebelApp.S_App.uiStatus.Free();
                       return false;
                   }
               }
           });
        }
        else
        {
            //VT:This is a list applet which does not have any grid, but only a repetition of controls via a for-each tag. Any other applet which hits this point, even though it has a grid means that the list container dint get delivered to client which means a misconfiguration
            $( "#s_" + this.GetPM().Get( "GetFullId" ) + "_div" ).off( "click.drilldown" );
            $( "#" + this.GetPM().Get( "GetFullId" ) ).delegate("a.siebui-ctrl-drilldown", "click", {ctx : this}, function( event ){

               SiebelApp.S_App.uiStatus.Busy({
                   target: SiebelApp.S_App.GetTargetViewContainer(),
                   mask: true
               });

               var self = event.data.ctx;
               var name = $( this ).attr( "name" );
               var rowId = $( this ).attr( "rowId" );

               if( rowId > 0 ){
                   if( self.OnRowSelect( rowId ) === false ||
                       self.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_DRILLDOWN" ), name, rowId )=== false ){
                       SiebelApp.S_App.uiStatus.Free();
                       return false;
                   }
               }
           });
        }
       
        /* Attaching Event for Pagination Button */
        $.each(
          [ "#next_pager_", "#last_pager_", "#prev_pager_", "#first_pager_" ],
          function( index, value ){
            $( value + that.GetPM( ).Get("GetPlaceholder") ).children( "span" ).click(
                function( ){
                  that.OnPagination( $( this ).parent().attr( "id" ).replace( "_" + that.GetPM( ).Get("GetPlaceholder"), "" ) );
            });
        });

        // Column sort feature.
        $( "tr.ui-jqgrid-labels", this.GetGrid().parents( "div.ui-jqgrid" ) ).bind( "mousedown", function( e ){
            that.UpdateSelectedRow();
        });
        
        this.GetGrid().jqGrid( "setGridParam", {
            onSortCol: function( index, iCol, sortorder ) {
                index = that.GetColumnHelper( ).GetActualControlName(index);
                if (! that.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_LIST_SORT" ), index, sortorder ) ){
                    // Error Handling ?
                }
                return ("stop");
            }
        });

        this.GetGrid().jqGrid( "setGridParam", {
            OnExpand : function( rowNum )
            {
               //call 'OnExpand' on PM
               that.GetPM().OnControlEvent ( siebConsts.get( "PHYEVENT_HIER_EXPAND" ), rowNum );
            }
        });

        this.GetGrid().jqGrid( "setGridParam", {
            OnCollapse : function( rowNum )
            {
               //call 'OnCollapse' on PM
               that.GetPM().OnControlEvent ( siebConsts.get( "PHYEVENT_HIER_COLLAPSE" ), rowNum );
            }
        });

        /* Tabbed Cell Editing Feature */
        this.GetGrid().jqGrid( "setGridParam", { cellEdit: true, cellsubmit : 'clientArray' } );

        this.GetGrid().jqGrid( "setGridParam", {

          onSelectRow : function( rowId, status, e ){
              e = e || window.event;
              that.OnRowSelect(rowId, e.ctrlKey, e.shiftKey);
          },
          beforeSelectRow : function( rowId, e ) {
            var ret = that.OnRowSelect(rowId, e.ctrlKey, e.shiftKey);//Important
            if( ret && e.type === "click" ){
                that.GetGrid().data(that.GetGrid().attr("id"),"noselect");
            }
            return ret;
          },

          afterEditCell : function( rowid, cellname, value, iRow, iCol )
          {
              var control = that.GetColumnControl(cellname);
              if( !control ){
                  return;
              }
              var canUpdate = that.CanUpdateControl( rowid, cellname, value, iRow, iCol );
              var ctrlEl = that.GetGrid().find( "#" + iRow + "_" + cellname ).eq(0);
              var controlType = control.GetUIType();

              BindColInputEvents.call( that, ctrlEl, iRow, iCol,control );
              
              if( control.GetUIType() !== checkbox){
                  ctrlEl.attr( "role" ,"input");
              }
              //Accessibility :: Add the Accessibility Attributes to the control created within the Cell
              if ( SiebelApp.S_App.GetAccessibilityEnhanced() !== undefined &&   utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) ) {
                  var parentDescBy = ctrlEl.parent().attr( "aria-describedby");
                  if( controlType === checkbox ){
                    var prt = ctrlEl.parent().parent();
                    parentDescBy = prt ? prt.attr( "aria-describedby"):"";
                    ctrlEl.attr( "aria-describedby", parentDescBy );
                  }
                  else{
                    ctrlEl
                        .parent()
                            .removeAttr( "aria-describedby" )
                            .attr( "data-describedby", parentDescBy )
                        .end()
                        .attr( "aria-describedby", parentDescBy );
                  }
              }            

              if( that.cellEditAllowed_  === false ){
                  that.GetGrid().jqGrid( "saveCell", iRow, iCol );
                  return;
              }
            
              if( !canUpdate ){
                  ctrlEl.attr( "readonly", true )
                        .attr( "aria-readonly", !canUpdate );
                  ctrlEl.parent().attr( "class", "edit-cell ui-state-disabled-cell"); // Oliver  -cell
              }
              if(that.GetPM().Get("IsInQueryMode")){
                  ctrlEl.removeAttr("maxLength" );
              }
              if( controlType === combo ){
                  ctrlEl
                      .autocomplete( {
                          source  : [],
                          close   : function (event, ui){
                                        that.GetPM().SetProperty ("isControlPopupOpen", false);
                                    }                         
                      })
                      .autocomplete( "option", "position", {
                          my        : "center top",
                          at        : "center bottom",
                          of        : ctrlEl,
                          collision : "flip flip"
                      })
                      .attr("role","combobox")
                      .bind( "autocompletefocus", function(event, ui) {
                           $( this ).attr("aria-activedescendant",$( this ).autocomplete("widget").attr("aria-activedescendant"));
                      });
              }

              if( that.GetGrid().data(that.GetGrid().attr("id")) === "noselect" ){
                  that.GetGrid().removeData(that.GetGrid().attr("id"));
              }
              else{
                  setTimeout( function(){ ctrlEl.select(); ctrlEl = null; }, 1);
              }
          },
          beforeSaveCell : function( rowid, cellname, value, iRow, iCol ) {
            //console.log( "[afterSaveCell] for " + cellname + " row = " + rowid + " value " + value );,
            var el = that.GetGrid().find( "#" + iRow + "" + cellname );
            el.attr( "aria-describedby", el.attr( "data-describedby" ) ).removeAttr( "data-describedby" );
            var ctrl = that.GetColumnControl(cellname);
            if( ctrl ){
                InvokeColumnChange.call (that, this, ctrl, iRow, iCol, value);
            }
            if ( iCol === 0 && that.GetPM().Get("HasHierarchy") ) {
                iRow = Number( iRow );
                that.GetGrid().jqGrid( "setTreeNode", iRow, iRow + 1 );
            }
            
            el = null;
          },
          afterRestoreCell : function( rowid, value, iRow, iCol ) {
            //console.log( "[afterRestoreCell] for " + that.GetGrid().jqGrid( "getGridParam", "colModel" )[iCol].name + " row = " + rowid + " value " + value );
            var cellname = that.GetGrid().jqGrid( "getGridParam", "colModel" )[iCol].name;
            var el = that.GetGrid().find( "#" + iRow + "" + cellname );
            el.attr( "aria-describedby", el.attr( "data-describedby" ) ).removeAttr( "data-describedby" );

            var ctrl = that.GetColumnControl( cellname );

            var bc = that.GetPM().Get("GetBusComp");
            if( !bc || (bc && bc.GetUpdateArray()) ||
                that.GetPM().Get("GetSelection") === (Number(iRow)-1) ){
                InvokeColumnChange.call (that, this, ctrl, iRow, iCol, value);
            }

            that.GetGrid().find( "tr#" + iRow ).find( "td" ).eq( iCol ).removeClass("edit-cell ui-state-disabled-cell" ); //bug#15924151
            if ( iCol === 0 && that.GetPM().Get("HasHierarchy") ) {
                iRow = Number( iRow );
                that.GetGrid().jqGrid( "setTreeNode", iRow, iRow + 1 );
            }
            el = null;
          }
        });

        /* Custom Events */
        $( window ).bind( "resize.JQGrid", {ctx: this }, function(event) {
            event.data.ctx.resize();
        });

        SiebelApp.EventManager.addListner( "themechange", this.resize, this );

        SiebelApp.EventManager.addListner( "gridresize", this.fixHeight, this );
      };

      JQGridRenderer.prototype.SetCellValue = function(rowId,fieldName,newValue){
        //console.log( "SetCellValue for cellname " + fieldName + " with value = " + newValue + " in row " + rowId );

        var jqGridCtrl = this.GetGrid();
        fieldName = this.GetColumnHelper( ).GetModifiedColumnName( fieldName );
        var rowid = jqGridCtrl.jqGrid('getGridParam', 'selrow');
        var el = $( "#" + rowid + "_" + fieldName, jqGridCtrl );
        if( el.length === 0 )
        {
           jqGridCtrl.setCell( rowid, fieldName, newValue, '', {editable: false}, true);
        }
        else{
           el.val(newValue);
        }
      };

      //Focus model
      JQGridRenderer.prototype.FocusFirstControl = function(){
          var jqGridCtrl = this.GetGrid();
          var currentRow = Number(jqGridCtrl.jqGrid('getGridParam', 'selrow'));
          if( currentRow === 0 ){
              return;
          }
          var listofColumns = this.GetPM().Get("ListOfColumns");
          var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );
          if(!colModel){
              // This is list masquerading as a form. Let the base class handle it.
              SiebelAppFacade.JQGridRenderer.superclass.FocusFirstControl.call( this);
              return;
          }
          for(var i=0;i <listofColumns.length && colModel;i++)
          {
               for(var key in this.GetColumnHelper().GetColMap())
               {
                   if(listofColumns[i].name == this.GetColumnHelper().GetColMap()[key])
                   {
                      var canUpdate = this.CanUpdateControl(null, key);
                      var iCol;
                      for( iCol = 0; iCol < colModel.length; iCol++ ){
                        if( colModel[ iCol ].hidden === false && colModel[ iCol ].name === key) { break; }
                      }
                      if(canUpdate)
                      {
                         var el = $( "#" + currentRow + "_"+ key, jqGridCtrl );
                         setTimeout( function(){
                            jqGridCtrl.data( jqGridCtrl.attr("id"),"noselect" );
                            if( el.length === 1 ){
                                el.focus();
                            }
                            else{
                                jqGridCtrl.jqGrid('editCell',currentRow,iCol,true);
                            }
                         }, 10);
                         return;
                      }
                   }
               }
          }
          SiebelAppFacade.JQGridRenderer.superclass.FocusFirstControl.call( this);//call super class method if the foucs is for control
          return ;
      };

      JQGridRenderer.prototype.GetFirstEditControl = function(){
          var jqGridCtrl = this.GetGrid();
          var currentRow = Number(jqGridCtrl.jqGrid('getGridParam', 'selrow'));
          var listofColumns = this.GetPM().Get("ListOfColumns");
          for(var i=0;i <listofColumns.length;i++)
          {
               for(var key in this.GetColumnHelper().GetColMap())
               {
                   if(listofColumns[i].name == this.GetColumnHelper().GetColMap()[key])
                   {
                      var canUpdate = this.CanUpdateControl(null, key);
                      var iCol = listofColumns[i].index;
                      if(canUpdate)
                      {
                         return iCol;
                      }
                   }
               }
          }
          return;
      };

      JQGridRenderer.prototype.SetFocusToControl = function(name,setFocus){
          var jqGridCtrl = this.GetGrid();
          var currentRow = Number(jqGridCtrl.jqGrid('getGridParam', 'selrow'));
          if( currentRow === 0 ){
              return;
          }
          var listOfColumns = this.GetPM().Get( "ListOfColumns" );
          var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );
          // See focus if for Column
          if (!utils.IsEmpty (colModel)){
              for(var i=0;i <listOfColumns.length;i++)
              {
                  for(var key in this.GetColumnHelper().GetColMap())
                  {
                      if(listOfColumns[i].name == this.GetColumnHelper().GetColMap()[key])
                      {
                          if(listOfColumns[i].name == name)
                          {
                              var canUpdate = this.CanUpdateControl(null, key);
                              var iCol;
                              for( iCol = 0; iCol < colModel.length; iCol++ ){
                                 if( colModel[ iCol ].hidden === false && colModel[ iCol ].name === key){
                                     break;
                                 }
                              }
                              var el = "#" + currentRow + "_"+ key ;
                              setTimeout( function(){
                                 jqGridCtrl.data( jqGridCtrl.attr("id"),"noselect" );
                                 if( jqGridCtrl.find( el ).length === 1 ){
                                     jqGridCtrl.find( el ).focus();
                                 }
                                 else{
                                     jqGridCtrl.jqGrid('editCell',currentRow,iCol,true);
                                 }
                              }, 10);
                          }
                      }
                  }
              }
          }

          SiebelAppFacade.JQGridRenderer.superclass.SetFocusToControl.call( this, name, setFocus );//call super class method if the foucs is for control
          return false;
      };

      function SetCellEdit (){
          this.cellEditAllowed_ = this.GetPM().Get( "InQueryMode" ) ? true : (!this.GetPM().Get( "MultiSelectMode" ));
          
          if (!this.cellEditAllowed_){
              var control = this.GetPM().Get( "GetActiveControl" );
              if (control && control.GetFieldName()){
                  var el = GetControlElement.call (this, control.GetFieldName());
                  if (el && el.length > 0){
                      el.blur();
                  }
              }
          }
      }
      
      JQGridRenderer.prototype.GetPhysicalControlValue = function (control){
          var field, fieldValue;
          var jqGridCtrl = this.GetGrid();
          if(jqGridCtrl.length>0)
          {
             var rowid = jqGridCtrl.jqGrid('getGridParam', 'selrow');
             var colName = this.GetColumnHelper( ).GetModifiedColumnName( control.GetName() );
             if (control) {
                 this.GetPM().AddProperty("PhysicalCtrlVal", fieldValue);
                 field = $( "#" + rowid + "_" + colName, jqGridCtrl );
                 if(!this.GetColumnHelper().GetColControl()[colName] && field.length === 0){
                    field   = $( "[name='" + control.GetInputName() + "']");
                 }
                 fieldValue = ((field.length > 0 )? field.val() : jqGridCtrl.getCell(rowid, colName))  || "";

                 switch (control.GetUIType()) {
                     case datePick:
                     case dateTimePick:
                     case dateTimezonePick:
                         fieldValue = utils.toISOFormat( fieldValue, (control.GetUIType() !== datePick )) || fieldValue;
                         break;
                 }
                 this.GetPM().AddProperty("PhysicalCtrlVal", fieldValue);
             }
          }
          //VT: If list turned to form , then invoke base class method to get the value
          else{
             SiebelAppFacade.JQGridRenderer.superclass.GetPhysicalControlValue.call(this, control);
          }
      };
      
      JQGridRenderer.prototype.ShowSelection = function(index) {
        if( this.inProgress  ) { return false; }
        this.ClearSelection();
        var pm = this.GetPM();
        var beginrow = pm.Get("GetBeginRow") || 0;
        var rowCount = this.GetRowCount();
        var selArray = pm.Get( "GetRowsSelectedArray" );
        if (pm.Get("IsInQueryMode")) {
            this.GetGrid().setSelection( 1, false );
        }
        else {
        for (var i = 0; i < rowCount && i < selArray.length; i++){
            if( selArray [ i ]){
            this.GetGrid().setSelection( beginrow + i + 1, false );
            }
        }
        }
        SiebelAppFacade.JQGridRenderer.superclass.ShowSelection.call( this);
      };

      JQGridRenderer.prototype.SelectRow = function(index, bSelected) {
        if( this.inProgress  ) { return false; }
        if (bSelected){
          this.GetGrid().setSelection(index, false);
        }
      };

      JQGridRenderer.prototype.ClearSelection = function (){
        if( this.inProgress  ) { return false; }
        this.UpdateSelectedRow();
        this.GetGrid().resetSelection();
      };

      JQGridRenderer.prototype.UpdateSelectedRow = function (){
        if( this.inProgress  ) { return false; }
        var rowId = this.GetSelectedRow();
        for( var key in  this.GetColumnHelper().GetColMap() ) {
          if( $( "#" + rowId + "_" + key ).length === 1 ) {
             this.GetGrid().jqGrid(
                 "saveCell",
                 rowId,
                 utils.IndexOf( this.GetGrid().jqGrid( "getGridParam", "colNames" ),  this.GetColumnHelper( ).GetActualColumnName( key )));
          }
        }
      };

      JQGridRenderer.prototype.ClearData = function(){
        if( this.inProgress  ) { return false; }
        this.GetGrid().jqGrid( 'clearGridData' );
      };

      /* Event Handling Methods... */
      JQGridRenderer.prototype.OnPagination = function( title ) {
        var direction = "";
        switch (title)
        {
          case "next_pager" : // Next Record
              direction =  "nxrc" ;
            break;
          case "last_pager": // Next Set of Record
              direction =  "pgdn";
            break;
          case "prev_pager":
              direction =  "pvrc" ;
            break;
          case "first_pager":
              direction =  "pgup";
            break;
        }

        if (! this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_VSCROLL" ), direction ) ){
          // Error Handling ?
        }
      };

      JQGridRenderer.prototype.OnRowSelect = function( rowId, ctrlKey, shiftKey ) {
        //if (rowId != Number( this.GetGrid().jqGrid( "getGridParam", "selrow" ) ) && this.GetRendererBridge().OnControlEvent( ["sr", rowId - 1, ctrlKey, shiftKey] )){
        var that = this;
        if( !ctrlKey && !shiftKey &&
            Number(rowId) === Number( this.GetSelectedRow() ) &&
            this.GetSelectedRow( 'all' ).length === 1 )
        {
          return true;
        }
        this.UpdateSelectedRow();
        SiebelApp.S_App.uiStatus.Busy( {} );
        if ( !this.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_SELECT_ROW" ),  rowId - 1, ctrlKey, shiftKey  )){
          SiebelApp.S_App.uiStatus.Free();
          return false;
        }
        SiebelApp.S_App.uiStatus.Free();
        return true;
      };

      JQGridRenderer.prototype.CommitPending = function(){
          this.UpdateSelectedRow();
      };

      JQGridRenderer.prototype.CanUpdateControl = function( rowid, cellname, value, iRow, iCol ) {
        return this.GetPM().ExecuteMethod( "CanUpdate",  this.GetColumnHelper( ).GetActualControlName(cellname) );
      };

      JQGridRenderer.prototype.GetColumnControl = function( cellname) {
        return this.GetColumnHelper().GetColumnControl(cellname);
      };
      
      JQGridRenderer.prototype.resize = function( )
      {
          if( this.GetGrid().length > 0 ){
              this.GetGrid().setGridWidth( 0, false );
              var containerWidth = parseInt( $( "#gbox_" + this.GetPM().Get( "GetPlaceholder" ) ).parent().width(), 10 ); 
              this.GetGrid().setGridWidth( containerWidth, isShrinkToFit.call(this) );
          }
      };

      JQGridRenderer.prototype.fixHeight = function( data ) {
        if( data && data.id === ( "#s_" + this.GetRendererBridge().GetProxy().GetFullId() + "_div" ))
        {
          var parentContainer = $( "#s_" + this.GetRendererBridge().GetProxy().GetFullId() + "_div" );

          this.GetGrid().setGridHeight( parentContainer.height() -
              ( this.GetGrid().closest( ".ui-jqgrid" ).height()  -
                  this.GetGrid().closest( ".ui-jqgrid" ).find( ".ui-jqgrid-bdiv" ).height() )) ;
        }
      };

      JQGridRenderer.prototype.GetSelectedRow = function( mode ) {
        return ( mode === "all" ) ?
                this.GetGrid( ).jqGrid( "getGridParam", "selarrrow" ):
                this.GetGrid( ).jqGrid( "getGridParam", "selrow"    );
      };
      
      JQGridRenderer.prototype.ShowPopup = function(control){
          var jqGridCtrl = this.GetGrid();
          var currentRow = Number(jqGridCtrl.jqGrid('getGridParam', 'selrow'));
          var listofColumns = this.GetPM().Get("ListOfColumns");
          var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" );
          var controlName = control.GetName();
          if(!colModel){
            SiebelAppFacade.JQGridRenderer.superclass.ShowPopup.call( this,control );
            return;
          }
          var column_num = listofColumns.length;
          for(var i=0;i < column_num;i++)
          {
                   if(listofColumns[i].name === controlName)
                   {
                      var canUpdate = this.CanUpdateControl(null, controlName);
                      var fieldName = this.GetColumnHelper( ).GetModifiedColumnName( controlName );
                      var iCol;
                      var colModelLen = colModel.length;
                      for( iCol = 0; iCol < colModelLen ; iCol++ ){
                        if( colModel[ iCol ].hidden === false && colModel[ iCol ].name === fieldName) { break; }
                      }
                      if(canUpdate)
                      {
                         var el = $( "#" + currentRow + "_"+ fieldName, jqGridCtrl );
                        if( el.length !== 1 ){
                            jqGridCtrl.jqGrid('editCell',currentRow,iCol,true);
                        }
                        setTimeout( function(){
                            $( "#" + currentRow + "_"+ fieldName, jqGridCtrl ).next().click();
                         }, 10 );
                         return;
                      }
                   }
          }
      };

      function SetFocustoCell(){
          if(this.GetPM().Get("SetFocusToGridCell")){
              this.GetGrid().find( "tr.ui-state-highlight" ).children( "td" ).filter( ":visible" ).eq(0)
                  .attr("tabindex" , "0" )
                  .focus();
              this.GetPM().SetProperty("SetFocusToGridCell", false);
          }
        }
      
      function AddSortInfo( propName, propValue ){
          var id = this.GetPM().Get( "GetPlaceholder" ) + "_" + this.GetColumnHelper().GetModifiedColumnName( propValue.name );
          this.GetGrid()[0].p.focus = false;
          var el = this
                      .GetGrid()
                      .parents( "div.ui-jqgrid" )
                          .find( "tr.ui-jqgrid-labels" )
                          .children( "th" )
                              .removeAttr( "aria-sort" )
                              .removeAttr( "role" )
                          .end()
                          .children( "#" + id )
                              .attr( "aria-sort", propValue.type )
                              .attr( "role", "columnheader" )
                              .focus();
      }

      return JQGridRenderer;
    }() );

    SiebelAppFacade.GridColumnHelper = function()
    {
      var colMap = {};
      var colControl = {};
      var colField = {};

      this.GetColMap = function()
      {
        return colMap;
      };

      this.GetColControl = function()
      {
        return colControl;
      };

      this.GetColField = function()
      {
        return colField;
      };
      
      this.EndLife = function(){
          colMap = colControl = colField = {};
      };
    };

    SiebelAppFacade.GridColumnHelper.prototype = {
        AddColumn : function( orig, control )
        {
          var modified = null;

          if( typeof( orig ) === "string" )
          {
            modified = orig.replace( / /g, "_" );
            modified = modified.replace( /\//g, "_" );
            modified = modified.replace( /#/g, "_" );
            modified = modified.replace( /\(/g, "_" );
            modified = modified.replace( /\)/g, "_" );
            modified = modified.replace( /\?/g, "_" );
            modified = modified.replace( /\%/g, "_" );

            this.GetColMap( )[ modified ] = orig;
            this.GetColControl( )[ modified ] = control;
            this.GetColField( )[ control.GetFieldName() ] = orig;
          }

          return modified;
        },
        //This will return the Control Name
        GetActualControlName : function( col )
        {
             return this.GetColMap( )[ col ];

        },
        // This will return the Display Name/ Column Header in the List
        GetActualColumnName : function( col )
        {
            //Get the control's display Name
            return this.GetColControl( )[ col ].GetDisplayName();
        },

        GetModifiedColumnName : function( col )
        {
          var modified = null;

          if( typeof( col ) === "string" )
          {
            modified = col.replace( / /g, "_" );
            modified = modified.replace( /\//g, "_" );
            modified = modified.replace( /#/g, "_" );
            modified = modified.replace( /\(/g, "_" );
            modified = modified.replace( /\)/g, "_" );
            modified = modified.replace( /\?/g, "_" );
            modified = modified.replace( /\%/g, "_" );
          }
          return modified;
        },

        GetColumnControl : function( col )
        {
          return this.GetColControl( )[ col ];
        },

        GetColumnOfField : function( field )
        {
          return this.GetColField( )[ field ];
        },

        // TODO: Relook translate..
        TranslateObject : function(listOfColumns, bcFields )
        {
            var current = {};
            var colName = null;

            for(var i=0; i <listOfColumns.length;i++)
            {
                var fieldName = listOfColumns[i].control.GetFieldName();
                colName = listOfColumns[i].name;
                if(!SiebelApp.Utils.IsEmpty(colName)){
                  current[ colName.replace(/ /g, "_").replace( /\//g, "_" ).replace( /#/g, "_" ).replace( /\(/g, "_" ).replace( /\)/g, "_" ).replace( /\?/g, "_" ).replace( /\%/g, "_" ) ] = bcFields[ fieldName ];
                }
            }
                if( bcFields["Id"] ){
                  current[ "Id" ] = bcFields[ "Id" ];
                }
                return current;
            }
        };
}
