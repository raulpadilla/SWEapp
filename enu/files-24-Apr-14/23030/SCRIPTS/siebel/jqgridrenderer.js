/*globals HtmlEncode */
if ( typeof ( SiebelAppFacade.JQGridRenderer ) === "undefined" ) {
    SiebelJS.Namespace( 'SiebelAppFacade.JQGridRenderer' );
    
    //Module with its dependencies
    define("siebel/jqgridrenderer", ["order!3rdParty/jqGrid/current/js/i18n/grid.locale-en", "order!3rdParty/jqGrid/current/js/jquery.jqGrid.min", "order!3rdParty/jqgrid-ext", "order!siebel/phyrenderer"],
      function () {
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

          function JQGridRenderer( pm ) {
            SiebelAppFacade.JQGridRenderer.superclass.constructor.call( this, pm );
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
          }

          SiebelJS.Extend( JQGridRenderer, SiebelAppFacade.PhysicalRenderer );

          JQGridRenderer.prototype.Init = function () {
              SiebelAppFacade.JQGridRenderer.superclass.Init.call(this);

              this.AttachPMBinding( "NavigateState", PreUpdateNavigateInfo );

              this.AttachPMBinding( "isControlPopupOpen", CloseControlPopup );

              this.AttachPMBinding( "MultiSelectMode", SetCellEdit );

              this.AttachPMBinding( "InQueryMode", SetCellEdit );

              this.AttachPMBinding( "SortRecord", AddSortInfo );

              this.AttachPMBinding( "SetFocusToGridCell", SetFocustoCell );

              this.AttachPMBinding( "CellChange", this.SetCellValue );

              this.AttachPMBinding( "TotalSet", ShowTotal );
          };

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
              this.GetGrid().removeData( "jqGrid" );
              /* Remove SearchCtrl */
              this.GetSearchCtrl().SetContainer( null );
              /* Remove All Custom Events */
              $( "#" + this.GetPM().Get( "GetFullId" ) ).off( "click.jqGrid" + this.GetPM().Get( "GetPlaceholder" ) );
              $( "#" + this.GetPM().Get( "GetPlaceholder" ) ).undelegate();
              
              $( window ).unbind( "resize.JQGrid" );
              SiebelApp.EventManager.removeListner( "themechange", this.resize, this );

              SiebelApp.EventManager.removeListner( "gridresize", this.fixHeight, this );
              
              this.GetColumnHelper().EndLife();
              this.GetGrid().jqGrid( "GridDestroy" );
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
          
          function OnCloseDatePicker(dateElement,ctrl,inputText){
              var pm = this.GetPM();
              dateElement.datetimepicker("destroy");
              this.SetFocusToControl(ctrl.GetName(), true);
              pm.SetProperty ( "isControlPopupOpen", false );
              var oldval = dateElement.attr("data");
              if(event.keyCode!=27){
                  if (oldval === inputText){
                     dateElement.val(oldval); 
                  }
                  pm.ExecuteMethod("LeaveField", ctrl, inputText, true);
              }
              else{
                  dateElement.val(oldval);
              }
              
              dateElement.removeAttr("data");
          }
          
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
            if (this.GetPM().Get("IsInQueryMode") && (cellvalue === localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK"))) {
                return HtmlEncode(cellvalue);
            }
            else {
              return "<a role=\"textbox\" href=\"javascript:void(0);\" class=\"drilldown\" name=\"" + this.GetColumnHelper().GetActualControlName( options.colModel.name ) + "\" tabindex=\"-1\" >" + HtmlEncode(cellvalue) + "</a>";
          }
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
            if (this.GetPM().Get("IsInQueryMode") && (cellvalue === localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK"))) {
                return HtmlEncode(cellvalue);
            }
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
             var value = "";
             var control = this.GetColumnHelper().GetColControl()[options.colModel.name];
             var bPvtField = this.GetPM().ExecuteMethod( "IsPrivateField", control.GetName());
             if(bPvtField){
                 value = this.GetPM().ExecuteMethod( "GetFormattedFieldValue", control,false);
                 return value + "<img src=\"" + cellvalue + "\" alt=\"" + control.GetDisplayName() + "\" title=\"" + control.GetDisplayName() + "\"></img>";
             }
             // render the image from the image path
             return "<img src=\"" + cellvalue + "\" alt=\"" + control.GetDisplayName() + "\" title=\"" + control.GetDisplayName() + "\"></img>";

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
          

          function textFormatter( cellvalue, canNavigate, options, rowObject) {
             var elem = $.parseHTML( cellvalue );
             cellvalue = "";
             var temp="";
             var aTage="";
             
             for(var i=0;elem && i<elem.length;i++){
                temp=  $( "<span></span>" ).append( elem[i] ).find("*").addBack();
                aTag=temp.filter("a");
                if(!canNavigate && aTag.length && aTag.attr("href")){
                   cellvalue= (utils.IsEmpty(cellvalue)? '':cellvalue+" ")+$(aTag).attr("target","_blank")[0].outerHTML;
                }
                else{
                   cellvalue=(utils.IsEmpty(cellvalue)? '':cellvalue+" ")+elem[i].textContent;
                }
             }
             if(canNavigate && elem ) // this control has drilldown property also
                cellvalue = drilldownFormatter.call(this,cellvalue, options, rowObject);
                         
             return cellvalue;
          };
             
          function textUnformatter( cellvalue, options, rowObject ){
             var control = this.GetColumnHelper().GetColControl()[options.colModel.name];
             var fieldvalue = this.GetPM().ExecuteMethod("GetFormattedFieldValue", control ,false) || cellvalue;
             return fieldvalue;
          };
          

          
          function PrepareColumnInfo( listOfColumns ) {
            var columnName  = [];
            var columnModel = [];
            var current = null;
            var that = this;
            var editable = utils.IsTrue(this.GetPM().Get("IsEditable")==="1");

            for( var index = 0, length = listOfColumns.length; index < length; index++ )
            {
              current = {};
              //Add the Column with FieldName as the key
              current.name = this.GetColumnHelper().AddColumn( listOfColumns[index].name, listOfColumns[index].control);
              current.editable = editable;
              current.editoptions = {"class" : "siebui-list-ctrl", "maxlength": (listOfColumns[index].control.GetMaxSize() || 256)};
              current.sortable = listOfColumns[index].control ? listOfColumns[index].control.IsSortable() === siebConsts.get( "SWE_NUMERIC_TRUE" ) : false;
              current.headerAlign    = listOfColumns[index].control.GetLabelJustification();
              current.align          = listOfColumns[index].control.GetJustification();
              switch( listOfColumns[index].controlType ){
                case combo:
                  current.editoptions.dataInit = function( element ) {
                    SiebelAppFacade.ControlBuilder.SelectCtrl({
                      target    : element,
                      className : 'applet-list-combo',
                      control   : that.GetColumnControl( $( element ).attr( "name" ) ),
                      scope     : that,
                      click     : function( ctrl){
                                    ShowDropDown.call(this, ctrl, null);
                                  }
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
                                if( ! this.GetPM().ExecuteMethod( "CanUpdate", ctrl.GetName() ) ){
                                    return;
                                }
                                var dateElement = $(tgt);
                                dateElement.attr("data",dateElement.val());
                                this.GetPM().SetProperty ("isControlPopupOpen", true);
                                var self = this;
                                SiebelAppFacade.ControlBuilder.DatePick({
                                    target    : tgt,
                                    className : 'applet-list-datetime',
                                    control   : ctrl,
                                    scope     : self,
                                    showPopup : true,
                                    yearRange : "c-100:c+100",
                                    getISOVal : function (){
                                        return utils.toISOFormat( $( this.target ).val(), false );;
                                    },
                                    onClose   : function ( inputText, inst) {
                                        OnCloseDatePicker.call(self,$(this),ctrl,inputText);
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
                                if( ! this.GetPM().ExecuteMethod( "CanUpdate", ctrl.GetName() ) ){
                                    return;
                                }
                                var dateElement = $(tgt);
                                dateElement.attr("data",dateElement.val());
                                this.GetPM().SetProperty ("isControlPopupOpen", true);
                                var self = this;
                                SiebelAppFacade.ControlBuilder.DateTimePick({
                                    target    : tgt,
                                    className : 'applet-list-datetime',
                                    control   : ctrl,
                                    scope     : self,
                                    showPopup : true,
                                    yearRange : "c-100:c+100",
                                    getISOVal : function (){
                                        return utils.toISOFormat( $( this.target ).val(), true );;
                                    },
                                    onClose   : function ( inputText, inst ){
                                        OnCloseDatePicker.call(self,$(this),ctrl,inputText);
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
                    current.classes = "siebui-element-ltr";
                    current.editoptions.dataInit = function( element ) {
                        SiebelAppFacade.ControlBuilder.Calculator({
                            target    : $(element),
                            className : (SiebelApp.S_App.GetDirection() ? 'applet-list-calculator siebui-text-align-left' : 'applet-list-calculator'),
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
                    current.classes = "siebui-element-ltr";
                    current.editoptions.dataInit = function( element ) {
                    SiebelAppFacade.ControlBuilder.Currency ({
                        target      : element,
                        className   : (SiebelApp.S_App.GetDirection() ? 'applet-list-pick siebui-text-align-left' :'applet-list-pick'),
                        scope       : that,
                        click       : function( ctrl , e ){
                                        this.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_INVOKE_CURRENCY"), ctrl);
                                        //VT:Why to reset the cell which popped this up, since we will need the icon position to position the currency applet all the time
                                        //that.resetCell( ctrl.GetName() );
                                      },
                      control       : that.GetColumnControl( $( element ).attr( "name" ) )
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
              
              if( listOfColumns[index].control.GetShowBase() &&
                listOfColumns[index].control.GetUIType()!= checkbox &&
                listOfColumns[index].control.GetUIType()!= url ){
                  
                 current.unformat = function( cellvalue, options, rowObject ){
                    return textUnformatter.call(that,cellvalue, options, rowObject );
                 };  

                 current.formatter = function( cellvalue, options, rowObject ){
                    var control = that.GetColumnHelper().GetActualControlName(options.colModel.name);
                    var canNavigate = that.GetPM().ExecuteMethod("CanNavigate", control );
                    return textFormatter.call( that, cellvalue ,canNavigate ,options ,rowObject);
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
              "columnModel": columnModel,
              "Direction"  : SiebelApp.S_App.GetDirection() || ""
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
            var listOfColumns = this.GetPM().Get("ListOfColumns");
            var map_col = this.GetColumnHelper().GetColMap();
            // See focus if for Column
            for (var i = 0; i < listOfColumns.length; i++) {
                for (var key in map_col) {
                    if (map_col.hasOwnProperty(key)) {
                        if (listOfColumns[i].name == map_col[key]) {
                            if (listOfColumns[i].name == name) {
                                var canUpdate = this.CanUpdateControl(null, key);
                                var iCol = listOfColumns[i].index;
                                jqGridCtrl.jqGrid('editCell', currentRow, iCol, false);
                                return true;
                            }
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
          var grid = this.GetGrid();
          var rowHeight = GetRowHeight.call(this);
          var ids = grid.getDataIDs();
          
          for (var i = 0, len = ids.length; i < len; i++)
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
                  
                totalcolumnWidth = Number(totalcolumnWidth) + Number(listOfColumns[i].control.GetWidth());
              }
              return totalcolumnWidth ;
          }
          
          JQGridRenderer.prototype.ShowUI = function( ) {
            SiebelAppFacade.JQGridRenderer.superclass.ShowUI.call( this );
            var that = this;
            var pm = this.GetPM();
            var listctrl = pm.Get( "ListOfColumns" );
            var columnInfo = PrepareColumnInfo.call( this, listctrl  );
            var placeHolder = pm.Get( "GetPlaceholder" );

            this.SetGrid( $( "#" + placeHolder ) );
            var jqGridCtrl = this.GetGrid();
            if(jqGridCtrl.length>0)
            {
               var colIndex=0;
               var gridHeight = CalcGridHeight.call(this) +Number(GridPadding);
               var parentWidth = $( "#" + placeHolder).parent().outerWidth();
               var totalcolwd = GetTotalColumnWidth.call( this );
               if( parentWidth > totalcolwd && listctrl.length > 0 ){
                   columnInfo.columnModel[columnInfo.columnModel.length - 1].width = ( Number( listctrl[listctrl.length -1].control.GetWidth() ) +
                                                                                       parentWidth - totalcolwd - Number(GridPadding) ).toString() + "px";
               }

               try {
                  var gridConfig = {
                         datatype      : "local",
                         direction     : columnInfo.Direction,
                         colModel      : columnInfo.columnModel,
                         colNames      : columnInfo.columnName,
                         autoencode    : true,
                         shrinkToFit   : false,
                         autowidth     : true,
                         pager         : '#pager_'+ placeHolder,
                         sortname      : 'name',
                         viewrecords   : true,
                         sortorder     : siebConsts.get("SORT_DESCENDING"),
                         multiselect   : true,
                         hoverrows     : false,
                         height        : gridHeight,
                         gridview      : true,
                         footerrow     : pm.Get("GetHasTotalRow"),
                         sortable      : {update: function(event, ui) {
                                            SiebelApp.S_App.uiStatus.Busy({
                                                target: SiebelApp.S_App.GetTargetViewContainer(),
                                                   mask: true
                                            });
                                            //remove hidden col.
                                            var cm = that.GetGrid().jqGrid( "getGridParam", "colModel" ),
                                                colob,
                                                ln,
                                                i,
                                                j = 1,
                                                colhelp = that.GetColumnHelper().GetColMap();
                                            if( cm && colhelp ){
                                                colob = {};
                                                ln = cm.length;
                                                for(i = 0;i < ln;i++){
                                                    if( cm[i].hidden === false ){
                                                        colob[ colhelp[cm[i].name] ] = j;
                                                        j++;
                                                    }
                                                }
                                                pm.OnControlEvent( siebConsts.get( "PHYEVENT_COL_ORDER_CHANGE" ), colob  );
                                            }
                                            cm = null;
                                            SiebelApp.S_App.uiStatus.Free();
                                         }}
                      };

                      if (pm.Get ("HasHierarchy")){
                         $.extend( gridConfig, {
                          gridview      : false,
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

                    //Accessibility :: Add the tags required for accessibility which can be refered in grid
                    if ( utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) ){
                       this.AddAccessibilityTags();
                    }
                  
                  
                    // Why JQGrid does not provide a way to set Tooltip? Also i18n?
                    // Before Changing tooltip, make sure to change in OnPagination
                    $( "#next_pager_"  + placeHolder ).children( "span" ).attr("title", localeObj.GetLocalString("NextRecToolTip") );
                    $( "#last_pager_"  + placeHolder ).children( "span" ).attr("title", localeObj.GetLocalString("NextRecSetToolTip"));
                    $( "#prev_pager_"  + placeHolder ).children( "span" ).attr("title", localeObj.GetLocalString("PrevRecToolTip"));
                    $( "#first_pager_" + placeHolder ).children( "span" ).attr("title", localeObj.GetLocalString("PrevRecSetToolTip"));
                    
                    // This bit is added to hide the page info content in the pager and View 1-10 of 10+ display
                    $("#sp_1_pager_" + placeHolder ).parent().css("display", "none");
                    $( "#pager_" + placeHolder + "_right div" ).hide();
                    //Add QTP info

                   for(colIndex=0; colIndex<columnInfo.columnModel.length; colIndex++)
                   {
                      var target = $("#jqgh_" + placeHolder + "_" + columnInfo.columnModel[colIndex].name);
                      SiebelAppFacade.JQGridRenderer.superclass.InjectQTPInfo.call(this,target,this.GetColumnControl(columnInfo.columnModel[colIndex].name));
                      jqGridCtrl.jqGrid ('setLabel', columnInfo.columnModel[colIndex].name, '', {'text-align':columnInfo.columnModel[colIndex].headerAlign} );
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
              var placeHolder = this.GetPM().Get("GetPlaceholder");

                var columns = [];
                var listOfColumns = this.GetPM().Get("ListOfColumns");
                var i = 0;
                var length = listOfColumns.length;
                for (; i < length; i++ ) {
                    columns.push(listOfColumns[i].control.GetDisplayName());
                }

                this.GetSearchCtrl().ShowUI(columns, placeHolder);

          };
          
          function ShowTotal( ){
            var pm = this.GetPM(),
                jqGridCtrl = this.GetGrid(),
                totalRow,
                totalSet = pm.Get( "TotalSet" ),
                failrt = jqGridCtrl.length === 0 || pm.Get("GetHasTotalRow") !== true || !totalSet;
            
            if ( !failrt ) {
                totalRow = pm.Get("GetTotalMap");    
                if ( totalRow ){
                    jqGridCtrl.jqGrid( 'footerData', 'set', this.GetColumnHelper().TranslateObject( pm.Get( "ListOfColumns" ), totalRow ) );
                }
                pm.SetProperty ( "TotalSet", false );
            }
          }
          
          function PreUpdateNavigateInfo( readOnly ){
              var pm = this.GetPM();
              if( !readOnly ){
                  pm.SetProperty( "UI_NavigateInfo", true );
              }
              else if( pm.Get( "UI_NavigateInfo" ) ){
                  pm.SetProperty( "UI_NavigateInfo", undefined );
                  UpdateNavigateInfo.call( this );
              }
          }
          
          function UpdateNavigateInfo ()
          {
             var colModel = this.GetGrid().jqGrid( "getGridParam", "colModel" ) || [];
             if(!colModel)
             {
                return;
             }
             function _textFormat( newValue, options, rowObject ){
                return textFormatter.call( that, newValue, true, options, rowObject );
             }

             function _textUnformat( cellvalue, options, rowObject ){
                return textUnformatter.call(that, cellvalue, options, rowObject );
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
                var control = this.GetColumnHelper().GetColControl()[this.GetColName(iCol)];
                var field = this.GetColumnHelper( ).GetActualControlName(ctrlName);
                var canNavigate = this.GetPM().ExecuteMethod( "CanNavigate", field );

                if(canNavigate)
                {
                   if( control && control.GetShowBase() &&
                     control.GetUIType()!= checkbox ){
                
                      colModel[ iCol ].formatter = _textFormat;
                      colModel[ iCol ].unformat =  _textUnformat;
                   }
                   else{
                      colModel[iCol].formatter = _drillDown;
                      colModel[ iCol ].unformat =  _plainFn;
                   }
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
            PreUpdateNavigateInfo.call( this, true );
            var recordSetLength = recordSet?recordSet.length:0;
            var currow = -1;
            
            
            
            if(jqGridCtrl.length>0)
            {
               if ( isHierarchy ){
                  jqGridCtrl.jqGrid( "setGridParam", { multiselect : false} );
               }

               //Accessibility
               var rowId = pm.Get( "GetRowIdentifier" );

               if ( utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) && !rowId && listCols.length > 0 ){
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

                         //Add data attributes for each row in hierarchical jqgrid to facilitate oepenscript.
                         this.GetGrid().find( "tr#" + ( recordIndex + 1 ) ).eq(0).attr({
                             "data-level": transObj.Hierarchy_Level,
                             "data-leaf": transObj.Is_Leaf,
                             "data-parentId": transObj.Parent_Id,
                             "data-expanded": transObj.Is_Expanded
                         });
                      }
                      //Accessibilty : Add the RowIdentifier, Column Identifier to the Cell
                      if ( utils.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) && rowId !== "") {
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
	           var record = recordSet[0];
                   var csLocalStr = localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK");
                   var controls = this.GetPM().Get("GetControls");
                   var fieldName;
                   for (var control in controls) {
                   	fieldName = controls[control].GetFieldName();
                        if (controls[control].GetCaseSensitive()) {
                        	record[fieldName] = utils.IsEmpty(record[fieldName]) ? csLocalStr : record[fieldName];
                          }
                          else {
                              record[fieldName] = utils.IsEmpty(record[fieldName]) ? '' : record[fieldName];
                          }
                   }
                  var qRec = this.GetColumnHelper( ).TranslateObject( listCols, recordSet[0] );

                  jqGridCtrl.clearGridData();

                  jqGridCtrl.jqGrid( 'addRowData', 1, qRec );
               }
               
               var enableDragAndDropInList = this.GetPM().Get("enableDragAndDropInList");
               if(enableDragAndDropInList){
                   $( "#" + this.GetPM().Get( "GetPlaceholder" ) ).find( "tr").draggable({
                        appendTo: "body", // Make the draggable object render on top of everything
                        revert: "invalid",
                        scroll: false,
                        helper: "clone",
                        cursor: "crosshair",
                        start: function(){
                            $(this).data("origPosition",$(this).position());
                            if($(this).parent().find( "tr.ui-state-highlight" ).not( ".ui-draggable-dragging").length > 1){
                                SiebelApp.S_App.GetPopupPM().SetProperty("ismultislectmode", true);
                            }
                            else{
                                SiebelApp.S_App.GetPopupPM().SetProperty("ismultislectmode", false);
                            }
                            $(this).data("appletRowId", pm.ExecuteMethod("GetDragInfo", [$(this).attr("id")-1]));
                        },
                        stop: function() {
                            $(".ui-draggable-dragging").remove(); // Remove previously dragging items
                        }
                    });
                }

               if ( isHierarchy  ){
                  jqGridCtrl.jqGrid( "setGridParam", { multiselect : true} );
               }
               ShowTotal.call( this );
               this.PostBindData();
            }
            else if(pm.Get("GetMode") === consts.get("SWE_PST_APPLET_MODE_BASE"))//VT:Only a base mode should rebind. Else unnessary NoOp processing will happen . which will slow down the operaton dramatically due to the number of DOM interactions involved.
            {
               //VT:This is a list applet which does not have any grid, but only a repetition of controls via a for-each tag. Any other applet which hits this point, even though it has a grid means that the list container dint get delivered to client which means a misconfiguration
               // To be converted to SiebelJS.Debug
               //SiebelJS.Log(pm.GetPMName() + " - This applet has either a foreach tag or does not have the correct grid container for the client to attach a list applet or is a list which is converted to form layout in one of the applet modes(Query,Edit,New) or is a list which is hidden via personalization");
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
                    var ISOVal;
                    if (this.GetPM().Get("IsInQueryMode") === false) {
                       ISOVal = utils.toISOFormat( fieldValue, ( ctrl.GetUIType() !== datePick ) );
                    }
                
                    if (!ISOVal){
                        ISOVal = fieldValue;

                    }
                    else {
                        // Put it back into the control. Might be needed later.
                        $(el).data(consts.get("SWE_DATA_ISOVAL"), ISOVal);
                    }
                    
                    value = ISOVal;
                    if(this.GetPM().Get("isControlPopupOpen")){

                        var isDatePick = type === datePick;
                        var toFormat = SiebelApp.S_App.LocaleObject.GetDateFormat(); 
                        var uiFormat = consts.get( "ISO_DATE_FORMAT" );
                        if( !isDatePick ){
                            toFormat += " " + SiebelApp.S_App.LocaleObject.GetTimeFormat();
                            uiFormat = consts.get( "ISO8601_DATETIME_FORMAT" );

                        }
                       var formattedValue = SiebelApp.S_App.LocaleObject.GetStringFromDateTime (
                                                                    ISOVal, 
                                                                    uiFormat, 
                                                                    ctrl.GetDisplayFormat() || toFormat );

                       $(el).val(formattedValue);
                       return;
                    }
                    break;
                    
                   
                default:
                    break;
            }
            // Fire the event on the PM.
            this.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_COLUMN_BLUR"), iRow, ctrl, value);
          }
          
          function BindColInputEvents( el, iRow, iCol ,control){
              /* Implemented as Custom Control cause JQGrid does not know how to handle checkbox correctly! */
              if( control.GetUIType() === checkbox ){
                  el.parent()
                      .attr("tabindex", "-1")
                      .bind( "focus", function(){
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
                  if (evt.data.ctx.GetPM().Get("IsInQueryMode") && ctrl.GetCaseSensitive() && value === localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK")) {
                  	$(this).val("");
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
                  if( $( this ).attr( "type" ) === "checkbox" ){
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
                  }
                  var value = ctrl.val();
                  ctrl = evt.data.ctx.GetColumnControl(ctrl.attr( "name" ));

                  if( evt.data.control.GetUIType() === combo ){
                      if( $( document.activeElement ).parents( ".ui-autocomplete" ).length > 0 || 
                              $( this ).data( "ui-autocomplete" ).menu.active ){
                          return;
                      }
                      if (evt.data.ctx.GetPM().Get("IsInQueryMode")){
                          value = FormatDDInQueryMode.call( evt.data.ctx, ctrl, value );
                      }
                  }

                  if( ctrl ){
                      InvokeColumnChange.call (evt.data.ctx, this, ctrl, evt.data.row, evt.data.col, value);
                  }
                  if (evt.data.ctx.GetPM().Get("IsInQueryMode") && ctrl.GetCaseSensitive() && value === "") {
                      $(this).val(localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK"));
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
                  var activeEl = $( document.activeElement );
                  if( ( ctrl.attr( "id" ) || "" ) !== ( activeEl.attr( "id") || "" ) ||
                      ( ctrl.attr( "name" ) || "" ) !==( activeEl.attr( "name") || "" )){
                      ctrl.focus();
                  }
              });
              
          }

          function FormatDDInQueryMode( control, value ){
              if( this.GetPM().Get( "IsInQueryMode" ) ){
                  var pmProp = this.GetPM().Get( "DDUserSelected" );
                  if( pmProp && pmProp.ctrl === control && pmProp.value ===value){
                      value = "\"" + value + "\"";
                      this.GetPM().SetProperty( "DDUserSelected", undefined );
                  }
              }
              return value;
          }
          
          function HandleDrillDown( evt ){
              SiebelApp.S_App.uiStatus.Busy({
                  target    : SiebelApp.S_App.GetTargetViewContainer(),
                  mask      : true
              });

              var self = evt.data.ctx;
              var el = $( this );
              var name = el.attr( "name" );
              var rowId = el.hasClass( "siebui-ctrl-drilldown" ) ? 
                              el.attr( "rowId" ): el.parents( "tr" ).eq(0).attr( "id" );

              el = null;
              if( rowId > 0 ){
                  if( self.OnRowSelect( rowId ) === false ||
                      self.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_DRILLDOWN_LIST"), name, rowId) === false) {
                      SiebelApp.S_App.uiStatus.Free();
                      return false;
                  }
              }
          }

          JQGridRenderer.prototype.BindEvents = function( controlSet ) {
              var pm = this.GetPM(),
                  grid = this.GetGrid(),
                  controls = pm.Get( "GetControls" ),
                  placeHolder = pm.Get( "GetPlaceholder" );
              
              //VT:In base mode , lets do only interactive control binding(like buttons) and not any columns/fields which are not interactive
              if( grid.length === 0 && pm.Get("GetMode") === consts.get("SWE_PST_APPLET_MODE_BASE")){
                  var limitedControls = {};
                  for( var control in controls ){
                      if( controls.hasOwnProperty( control ) ){
                          if(controls[control].GetControlType()!==colType){
                              //VT:DONOT bind column controls for grid less applets(Home Pages).This is so that we donot bind unnecessarily those that we know will not needs any events .This has to be done for normal list applets as well.But not for now.
                              limitedControls[control] = controls[control];
                          }
                      }
                  }

                  controls = limitedControls;
              }
              SiebelAppFacade.JQGridRenderer.superclass.BindEvents.call( this, controls );
            
              if( grid.length===1){
                  grid.data( "jqGrid", this );
                  grid.jqGrid( "NavigateByKey" );
                  $( "#" + pm.Get( "GetPlaceholder" ) ).on( "click.jqGrid" + placeHolder, "a.drilldown", {ctx : this}, HandleDrillDown );
                  grid.jqGrid( "setGridParam", {
                      cellEdit          : true,
                      cellsubmit        : 'clientArray',
                      onSortCol         : GridOnSortCol,
                      OnExpand          : GridOnExpand,
                      OnCollapse        : GridOnCollapse,
                      onSelectRow       : GridOnSelectRow,
                      beforeSelectRow   : GridBeforeSelectRow,
                      afterEditCell     : GridAfterEditCell,
                      beforeSaveCell    : GridBeforeSaveCell,
                      afterRestoreCell  : GridAfterRestoreCell,
                      resizeStop        : GridResizeStop
                  });
                  
                  if( pm.Get("enableDragAndDropInList") ){
                      $( "#s_" + this.GetPM().Get( "GetFullId" ) + "_div").droppable({
                        drop: function( event, ui ) {
                            var appletpm = ui.draggable.data('ctx') || pm;
                            var methodToExecute = ui.draggable.data( 'methodName' );
                            if(appletpm && methodToExecute){
                                ui.helper.detach();
                                appletpm.ExecuteMethod("HandleDragNDropInPopup", methodToExecute);
                            }
                        }
                      });
                  }
              }
              else{
                  //VT:This is a list applet which does not have any grid, but only a repetition of controls via a for-each tag. Any other applet which hits this point, even though it has a grid means that the list container dint get delivered to client which means a misconfiguration
                  $( "#s_" + pm.Get( "GetFullId" ) + "_div" ).off( "click.drilldown" );
                  $( "#" + pm.Get( "GetFullId" ) ).on( "click.jqGrid" + placeHolder, "a.siebui-ctrl-drilldown", {ctx : this}, HandleDrillDown );
              }
            
              if( pm.Get("enableDragAndDropInList") ){
                  $( "#s_" + pm.Get( "GetFullId" ) + "_div" )
                      .bind( "dragover", function( evt ){ 
                          //allow drop
                          evt.preventDefault();
                      })
                      .bind( "drop", {ctx: this }, function( evt ){ 
                          evt.preventDefault();
                          if(evt.originalEvent.dataTransfer){
                          var data = evt.originalEvent.dataTransfer.getData('Text');
                          }
                          if(data){
                              if(data.indexOf('\r') !== -1){
                                var dataArray = data.replace( /\n/g, "" ).split('\r');
                              }
                              else{
                              var dataArray = data.split('\n');
                              }
                              evt.data.ctx.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_RECORD_DROP"), dataArray);
                          }
                      });
              }
           
              /* Attaching Event for Pagination Button */
              $( "#next_pager_" + placeHolder + "," +
                 "#last_pager_" + placeHolder + "," + 
                 "#prev_pager_" + placeHolder + "," + 
                 "#first_pager_"+ placeHolder  )
                     .children( "span" )
                         .bind( "click", { ctx: this }, function(evt){
                             evt.data.ctx.OnPagination(
                                     $(this).parent().attr("id").replace("_" + evt.data.ctx.GetPM().Get("GetPlaceholder"), ""));
                             evt.stopImmediatePropagation();
                         });
              // Column sort feature.
              $( "tr.ui-jqgrid-labels", grid.parents( "div.ui-jqgrid" ) ).bind( "mousedown", { ctx: this }, function( e ){
                  e.data.ctx.UpdateSelectedRow();
              });

              /* Custom Events */
              $( window ).bind( "resize.JQGrid", {ctx: this }, function(event) {
                  event.data.ctx.resize();
              });

              SiebelApp.EventManager.addListner( "themechange", this.resize, this );

              SiebelApp.EventManager.addListner( "gridresize", this.fixHeight, this );
              pm = grid = controls = null;
          };
          
          function GridOnSortCol( index, iCol, sortorder ) {
              var self = $( this ).data("jqGrid");
              index = self.GetColumnHelper( ).GetActualControlName(index);
              if (!self.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_SORT_LIST"), index, sortorder)) {
                  // Error Handling ?
              }
              return ("stop");
          }
          
          function GridOnExpand( rowNum ){
              var self = $( this ).data("jqGrid");
              self.GetPM().OnControlEvent ( siebConsts.get( "PHYEVENT_HIER_EXPAND" ), rowNum );
          }
          
          function GridOnCollapse( rowNum ){
              var self = $( this ).data("jqGrid");
              //call 'OnCollapse' on PM
              self.GetPM().OnControlEvent ( siebConsts.get( "PHYEVENT_HIER_COLLAPSE" ), rowNum );
          }
          
          function GridOnSelectRow( rowId, status, e ){
              var self = $( this ).data("jqGrid");
              e = e || window.event;
              self.OnRowSelect(rowId, e.ctrlKey, e.shiftKey);
          }
          
          function GridBeforeSelectRow( rowId, e ) {
              var self = $( this ).data("jqGrid");
              if ( e.shiftKey && document.selection && document.selection.empty) {
                   document.selection.empty();
              }
              var ret = self.OnRowSelect(rowId, e.ctrlKey, e.shiftKey);//Important
              if( ret && e.type === "click" ){
                  self.GetGrid().data(self.GetGrid().attr("id"),"noselect");
              }
              return ret;
          }
          
          function GridAfterEditCell( rowid, cellname, value, iRow, iCol ){
              var self = $( this ).data("jqGrid");
              var control = self.GetColumnControl(cellname);
              if( !control ){
                  return;
              }
              var canUpdate = self.CanUpdateControl( rowid, cellname, value, iRow, iCol );
              var ctrlEl = self.GetGrid().find( "#" + iRow + "_" + cellname ).eq(0);
              var controlType = control.GetUIType();

              BindColInputEvents.call( self, ctrlEl, iRow, iCol,control );
          
              if( control.GetUIType() !== checkbox){
                  ctrlEl.attr( "role" ,"input").addClass("siebui-input-align-"+control.GetJustification());
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

              if( self.cellEditAllowed_  === false ){
                  self.GetGrid().jqGrid( "saveCell", iRow, iCol );
                  return;
              }
        
              if( !canUpdate ){
                  ctrlEl.attr( "readonly", true )
                      .attr( "aria-readonly", !canUpdate );
                  ctrlEl.parent().attr( "class", "edit-cell ui-state-disabled-cell"); // Oliver  -cell
              }
              if(self.GetPM().Get("IsInQueryMode")){
                  ctrlEl.removeAttr("maxLength" );
              }
              if( controlType === combo ){
                  ctrlEl
                      .autocomplete( {
                          source  : []                        
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
                      })
                      .bind( "autocompleteopen", { ctx : self, ctrl : control }, function ( evt){
                          evt.data.ctx.GetPM().SetProperty ( "isControlPopupOpen", true );
                      })
                      .bind( "autocompleteclose", { ctx : self, ctrl : control }, function ( evt){
                          if (evt.data.ctx.GetPM().Get("IsInQueryMode")){
                              evt.data.ctx.GetPM().SetProperty("DDUserSelected", { ctrl : evt.data.ctrl, value : evt.target.value} );
                          }
                          evt.data.ctx.GetPM().SetProperty ( "isControlPopupOpen", false );
                      })
                      .bind( "autocompleteselect", { ctx : self, ctrl : control }, function ( evt, ui){ // Bug#16385076
                          if (evt.data.ctx.GetPM().Get("IsInQueryMode")){
                              evt.data.ctx.GetPM().SetProperty("DDUserSelected", { ctrl : evt.data.ctrl, value : ui.item.value} );
                          }
                          evt.data.ctx.GetPM().ExecuteMethod("LeaveField", evt.data.ctrl, ui.item.value, true);
                      });
              }

              if( self.GetGrid().data(self.GetGrid().attr("id")) === "noselect" ){
                  self.GetGrid().removeData(self.GetGrid().attr("id"));
              }
              else{
                  setTimeout( function(){ ctrlEl.select(); ctrlEl = null; }, 1);
              }
          }    
          
          function GridBeforeSaveCell( rowid, cellname, value, iRow, iCol ) {
              var self = $( this ).data("jqGrid");
              //console.log( "[afterSaveCell] for " + cellname + " row = " + rowid + " value " + value );,
              var gridCtrl = self.GetGrid();
              var el = gridCtrl.find( "#" + iRow + "" + cellname );
              el.attr( "aria-describedby", el.attr( "data-describedby" ) ).removeAttr( "data-describedby" );
              var ctrl = self.GetColumnControl(cellname);
              if( ctrl ){
                  if (self.GetPM().Get("IsInQueryMode") && ctrl.GetCaseSensitive() && (value === localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK"))) {
                      value = "";
                  }
                  if( ctrl.GetUIType() === combo ){ // Bug#16385076
                      value = FormatDDInQueryMode.call( self, ctrl, value );
                  }
                  InvokeColumnChange.call( self, this, ctrl, iRow, iCol, value );
                  /*Bug#16001488 -Issue#1:: jqgrid internally replaces already formatted cell value(by the above InvokeColumnChange call) with the old value we are returning to it.
                   *We may lose formatted values in case of Date or Time typed fields. So, collecting formatted value from the updated cell and returning it to jqgrid.
                   */
                  value = $( "#" + iRow + "_" + cellname, gridCtrl ).val();
              }
              if ( iCol === 0 && self.GetPM().Get( "HasHierarchy" ) ) {
                  iRow = Number( iRow );
                  gridCtrl.jqGrid( "setTreeNode", iRow, iRow + 1 );
              }
              if (self.GetPM().Get("IsInQueryMode") && ctrl.GetCaseSensitive() && (value === "")) {
                    value = localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK");
              }

              gridCtrl = el = null;
              return value;
          }

          function GridAfterRestoreCell( rowid, value, iRow, iCol ) {
              var self = $( this ).data("jqGrid");
              //console.log( "[afterRestoreCell] for " + self.GetGrid().jqGrid( "getGridParam", "colModel" )[iCol].name + " row = " + rowid + " value " + value );
              var cellname = self.GetGrid().jqGrid( "getGridParam", "colModel" )[iCol].name;
              var el = self.GetGrid().find( "#" + iRow + "" + cellname );
              el.attr( "aria-describedby", el.attr( "data-describedby" ) ).removeAttr( "data-describedby" );

              var ctrl = self.GetColumnControl( cellname );

              if (self.GetPM().Get("IsInQueryMode") && ctrl.GetCaseSensitive() && (value === localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK"))) {
                  value = "";
              }
              
              var bc = self.GetPM().Get("GetBusComp");
              if( !bc || (bc && bc.GetUpdateArray()) ||
                      self.GetPM().Get("GetSelection") === (Number(iRow)-1) ){
                  InvokeColumnChange.call (self, this, ctrl, iRow, iCol, value);
              }
        
              self.GetGrid().find( "tr#" + iRow ).find( "td" ).eq( iCol ).removeClass("edit-cell ui-state-disabled-cell" ); //bug#15924151
              if ( iCol === 0 && self.GetPM().Get("HasHierarchy") ) {
                  iRow = Number( iRow );
                  self.GetGrid().jqGrid( "setTreeNode", iRow, iRow + 1 );
              }
              el = null;
          }
          
          function GridResizeStop( width, index ) {
              var self = $( this ).data("jqGrid") || $( this.bDiv ).find( "table.ui-jqgrid-btable") .data( "jqGrid" );
              SiebelApp.S_App.uiStatus.Busy({
                  target: SiebelApp.S_App.GetTargetViewContainer(),
                  mask: true
              });
              var cm = self.GetGrid().jqGrid( "getGridParam", "colModel" ),
                  colob = {};
              colob[ self.GetColumnHelper().GetColMap()[cm[index].name] ] = parseInt( width, 10 ).toString();
              self.GetPM().OnControlEvent( siebConsts.get( "PHYEVENT_COL_WIDTH_CHANGE" ), colob  );
              cm = null;
              SiebelApp.S_App.uiStatus.Free( );
          }


          JQGridRenderer.prototype.SetCellValue = function(rowId,fieldName,newValue){
            //console.log( "SetCellValue for cellname " + fieldName + " with value = " + newValue + " in row " + rowId );

            var jqGridCtrl = this.GetGrid();
            fieldName = this.GetColumnHelper( ).GetModifiedColumnName( fieldName );
            var rowid = jqGridCtrl.jqGrid('getGridParam', 'selrow');
            var el = $( "#" + rowid + "_" + fieldName, jqGridCtrl );
            var control = this.GetColumnControl(fieldName);
            if ( control && control.GetCaseSensitive() && this.GetPM().Get("InQueryMode") && (newValue == "")) {
                newValue = localeObj.GetLocalString("IDS_SWE_CSQ_WATERMARK");
            }
            if( el.length === 0 )
            {
               jqGridCtrl.setCell( rowid, fieldName, newValue, '', {editable: false}, true);
            }
            else{
               el.val(newValue);
            }
            el = null;
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
              var map_col = this.GetColumnHelper().GetColMap();
              for (var i = 0; i < listofColumns.length && colModel; i++) {
                  for (var key in map_col) {
                    if (map_col.hasOwnProperty(key)) {
                        if (listofColumns[i].name === map_col[key]) {
                            var canUpdate = this.CanUpdateControl(null, key);
                            var iCol;
                            for (iCol = 0; iCol < colModel.length; iCol++) {
                                if (colModel[iCol].hidden === false && colModel[iCol].name === key) { break; }
                            }
                            if (canUpdate) {
                                var el = $("#" + currentRow + "_" + key, jqGridCtrl);
                                setTimeout(function () {
                                    jqGridCtrl.data(jqGridCtrl.attr("id"), "noselect");
                                    if (el.length === 1) {
                                        el.focus();
                                    }
                                    else {
                                        jqGridCtrl.jqGrid('editCell', currentRow, iCol, true);
                                    }
                                }, 10);
                                return;
                            }
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
              var map_col = this.GetColumnHelper().GetColMap();
                for (var i = 0; i < listofColumns.length; i++) {
                    for (var key in map_col) {
                        if (map_col.hasOwnProperty(key)) {
                            if (listofColumns[i].name === map_col[key]) {
                                var canUpdate = this.CanUpdateControl(null, key);
                                var iCol = listofColumns[i].index;
                                if (canUpdate) {
                                    return iCol;
                                }
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
              var map_col = this.GetColumnHelper().GetColMap();
                // See focus if for Column
                if (!utils.IsEmpty(colModel)) {
                    for (var i = 0; i < listOfColumns.length; i++) {
                        for (var key in map_col) {
                            if (map_col.hasOwnProperty(key)) {
                                if (listOfColumns[i].name === map_col[key]) {
                                    if (listOfColumns[i].name === name) {
                                        var canUpdate = this.CanUpdateControl(null, key);
                                        var iCol;
                                        for (iCol = 0; iCol < colModel.length; iCol++) {
                                            if (colModel[iCol].hidden === false && colModel[iCol].name === key) {
                                                break;
                                            }
                                        }
                                        var el = "#" + currentRow + "_" + key;
                                        setTimeout(function () {
                                            jqGridCtrl.data(jqGridCtrl.attr("id"), "noselect");
                                            if (jqGridCtrl.find(el).length === 1) {
                                                jqGridCtrl.find(el).focus();
                                            }
                                            else {
                                                jqGridCtrl.jqGrid('editCell', currentRow, iCol, true);
                                            }
                                        }, 10);
                                    }
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
                     
                     if (this.GetPM().Get("IsInQueryMode") && control.GetCaseSensitive() 
                             && (fieldValue === SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CSQ_WATERMARK"))) {
                         fieldValue = "";
                     }

                     switch (control.GetUIType()) {
                         case datePick:
                         case dateTimePick:
                         case dateTimezonePick:
                             if (this.GetPM().Get("IsInQueryMode") === false) {
                             fieldValue = utils.toISOFormat( fieldValue, (control.GetUIType() !== datePick )) || fieldValue;
                             }
                             break;
                         case combo: //Bug#16385076
                             fieldValue = FormatDDInQueryMode.call( this, control, fieldValue );
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
            var map_col = this.GetColumnHelper().GetColMap();
            for (var key in map_col) {
                if (map_col.hasOwnProperty(key)) {
                    if ($("#" + rowId + "_" + key).length === 1) {
                        this.GetGrid().jqGrid(
                 "saveCell",
                 rowId,
                 utils.IndexOf(this.GetGrid().jqGrid("getGridParam", "colNames"), this.GetColumnHelper().GetActualColumnName(key)));
                    }
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
                  direction = siebConsts.get("PAG_NEXT_RECORD");
                break;
              case "last_pager": // Next Set of Record
                  direction = siebConsts.get("PAG_NEXT_SET");
                break;
              case "prev_pager":
                  direction = siebConsts.get("PAG_PREV_RECORD");
                break;
              case "first_pager":
                  direction = siebConsts.get("PAG_PREV_SET");
                break;
            }

            if (!this.GetPM().OnControlEvent(siebConsts.get("PHYEVENT_VSCROLL_LIST"), direction)) {
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
        return "SiebelAppFacade.JQGridRenderer";
    });

    SiebelAppFacade.GridColumnHelper = function()
    {
      var colMap = {};
      var colControl = {};
      var colField = {};
      var utils = SiebelJS.Dependency("SiebelApp.Utils");
      var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

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

      this.GetModString = function (inStr) {
          if (!inStr) {
              return inStr;
          }
          var escArr = siebConsts.get("SWE_ESCAPE_CHAR"),
              ln = escArr.length;
          for (var i = 0; i < ln; i++) {
              inStr = utils.replaceAll(inStr, escArr[i], "_");
          }
          return inStr;
      };
    };

    SiebelAppFacade.GridColumnHelper.prototype = {
        AddColumn : function( orig, control )
        {
          var modified = null;

          if( typeof( orig ) === "string" )
          {
            modified = this.GetModString(orig);

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
             modified = this.GetModString(col);
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
                    current[this.GetModString(colName)] = bcFields[fieldName];
                }
            }
                if( bcFields["Id"] ){
                  current[ "Id" ] = bcFields[ "Id" ];
                }
                return current;
            }
        };
}
