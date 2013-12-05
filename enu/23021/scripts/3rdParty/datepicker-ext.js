( function( $ ){
    
    /* Add DUMMY Localized Object Which gets values from SWE Localized String */
    $.datepicker.regional[ 'SWE' ] = {
        currentText     : _SWEgetMessage( "IDS_SWE_TIMEPICKER_CURRENT_TEXT" ),
        closeText       : _SWEgetMessage( "IDS_SWE_DATEPICKER_CLOSE_TEXT" ),
        amNames         : [_SWEgetMessage("IDS_SWE_JQGRID_AM_UC" ), _SWEgetMessage( "IDS_SWE_JQGRID_AM_ABBREVIATED" )],
        pmNames         : [_SWEgetMessage("IDS_SWE_JQGRID_PM_UC" ), _SWEgetMessage( "IDS_SWE_JQGRID_PM_ABBREVIATED" )],
        timeFormat      : 'hh:mm tt',
        timeSuffix      : '',
        timeOnlyTitle   : _SWEgetMessage( "IDS_SWE_TIMEPICKER_TIME_TITLE" ),
        timeText        : _SWEgetMessage( "IDS_SWE_TIMEPICKER_TIME" ),
        hourText        : _SWEgetMessage( "IDS_SWE_TIMEPICKER_HOUR" ),
        minuteText      : _SWEgetMessage( "IDS_SWE_TIMEPICKER_MINUTE" ),
        secondText      : _SWEgetMessage( "IDS_SWE_TIMEPICKER_SECOND" ),
        millisecText    : _SWEgetMessage( "IDS_SWE_TIMEPICKER_MILLISECOND" ),
        timezoneText    : _SWEgetMessage( "IDS_SWE_TIMEPICKER_TIME_ZONE" ),
        yearText        : _SWEgetMessage( "IDS_CALENDAR_YEAR_COMBOBOX_TITLE" ),
        monthText       : _SWEgetMessage( "IDS_CALENDAR_MONTH_COMBOBOX_TITLE" ),
        prevText        : _SWEgetMessage( "IDS_CALENDAR_PREVIOUS_MONTH_STRING" ),
        nextText        : _SWEgetMessage( "IDS_CALENDAR_NEXT_MONTH_STRING" ),
        isRTL           : false
    };
    
    $.datepicker.setDefaults( $.datepicker.regional[ 'SWE' ] );
    
    var SWE_onTimeChange = $.timepicker.constructor.prototype._onTimeChange;    
    $.timepicker.constructor.prototype._onTimeChange = function(){
    
        var returnValue = SWE_onTimeChange.apply( this, arguments );
        
        if( this.$timeObj ){
            var dpId = this.inst.id.toString().replace(/([^A-Za-z0-9_])/g, '');
            this.$timeObj.attr({
                "tabindex"          : "0",
                "aria-labelledby"   : "ui-tpicker_time_label_" + dpId
            });
        }
        
        if( this.hour_slider ){
            this.hour_slider
                .children( "a" )
                .attr({
                    "role"          : "slider",
                    "title"         : this._defaults.hourText,
                    "aria-valuemin" : "0",
                    "aria-valuemax" : this._defaults.hourMax,
                    "aria-valuenow" : this.hour,
                    "aria-valuetext": this.hour + " " + this._defaults.hourText
                });
        }
        
        if( this.minute_slider ){
            this.minute_slider
                .children( "a" )
                .attr({
                   "role"           : "slider",
                   "title"          : this._defaults.minuteText,
                   "aria-valuemin"  : "0",
                   "aria-valuemax"  : this._defaults.minuteMax,
                   "aria-valuenow"  : this.minute,
                   "aria-valuetext" : this.minute + " " + this._defaults.minuteText
                });
        }
        
        return returnValue; 
    };
    
    var SWE_showDatepicker = $.datepicker.constructor.prototype._showDatepicker;
    $.datepicker.constructor.prototype._showDatepicker = function(){
        var returnValue = SWE_showDatepicker.apply( this, arguments );
        
        if( $.datepicker._datepickerShowing ){
            
            var inst  = arguments[0].target || arguments[0];
            if (inst.nodeName.toLowerCase() != 'input') // find from button/image trigger
                inst = $('input', inst.parentNode)[0];
            if ($.datepicker._isDisabledDatepicker(inst) ) // already here
                return;

            inst = $.datepicker._getInst( inst );
            
            inst.dpDiv
                .find( ".ui-datepicker-close" )
                .unbind( "keydown.closePicker" )
                .bind( "keydown.closePicker" , function( evt ){
                    switch( evt.which ){
                        
                        case 27: // hide on escape
                                  $.datepicker._hideDatepicker();
                                  break; 
                        case 9: // hide on Tab
                                  if ( !evt.shiftKey){
                                      $.datepicker._hideDatepicker();
                                  }
                    }
                });
            
            inst.dpDiv
                .find( ".ui-datepicker-prev" )
                .unbind( "keydown.prevButton" )
                .bind( "keydown.prevButton", function( evt ) {
                    switch( evt.which ) {
                        
                        case 27 : //hide on escape
                                  $.datepicker._hideDatepicker();
                                  break;
                        case 9:   // hide on Shift Tab
                                  if ( evt.shiftKey){
                                      $.datepicker._hideDatepicker();
                                  }
                    }
                });
            
            inst.dpDiv
                .find( ".ui-datepicker-calendar" )
                .unbind( "keydown.dayDiv" )
                .bind( "keydown.dayDiv", { "inst": inst }, function( evt ){
                    
                    var inst = evt.data.inst,
                        handled = true,
                        isRTL = inst.dpDiv.is( ".ui-datepicker-rtl" );
                    
                    switch( evt.which ){
                        
                        case 13 :  var sel = inst.dpDiv.find('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')' );
                                    if( sel[0] ){
                                        $.datepicker._selectDay(inst.input, inst.selectedMonth, inst.selectedYear, sel[0] );
                                    }
                                    var onSelect = $.datepicker._get(inst, 'onSelect');
                                    if (onSelect) {
                                        var dateStr = $.datepicker._formatDate(inst);
                                        // trigger custom callback
                                        onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
                                    }
                                    else{
                                        $.datepicker._hideDatepicker();
                                    }
                                    return false; // don't submit the form
                                    break;
                                    
                        case 27 : $.datepicker._hideDatepicker();
                                   break;
                                   
                        case 33 : $.datepicker._adjustDate( inst.input, ( evt.altKey ? -12 : -1 ), "M" );
                                   break;
                                   
                        case 34 : $.datepicker._adjustDate( inst.input, ( evt.altKey ? +12 : +1 ), "M" );
                                   break;
                                   
                        case 35 : var lastDay = $.datepicker._getDaysInMonth( inst.drawYear, inst.drawMonth ),
                                       moveDays = lastDay - inst.selectedDay;
                                   $.datepicker._adjustDate( inst.input, ( isRTL ? -moveDays : + moveDays ), "D" );
                                   break;
                                   
                        case 36 : var moveDays = inst.selectedDay - 1;
                                   $.datepicker._adjustDate( inst.input, ( isRTL ? +moveDays : -moveDays ), "D" );
                                   break;
                                   
                        case 37 : $.datepicker._adjustDate( inst.input, ( isRTL ? +1 : -1 ), "D" );
                                   break; 
                        
                        case 38 : $.datepicker._adjustDate( inst.input, ( isRTL ? +7 : -7 ), "D" );
                                   break;
                                   
                        case 39 : $.datepicker._adjustDate( inst.input, ( isRTL ? -1 : +1 ), "D" );
                                   break;
                                   
                        case 40 : $.datepicker._adjustDate( inst.input, ( isRTL ? -7 : +7 ), "D" );
                                   break;
                        
                        default:  handled = false;
                                   
                    }
                    
                    if( handled ){
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                });
            
            inst = null;
        }
        
        return returnValue;
    };
    
    var SWE_updateDatePicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(){
        var returnValue = SWE_updateDatePicker.apply( this, arguments );
                
        var inst = arguments[0],
            id = "ui-datepicker-day-" + inst.selectedDay ; 
        
        inst.dpDiv
            .find( "a.ui-datepicker-prev, a.ui-datepicker-next" )
            .attr({
                "tabindex" : "0",
                "role"     : "button"
            })
            .children( "span" )
                .attr( "tabindex", "-1" );
        
        inst.dpDiv
            .find( "table.ui-datepicker-calendar" )
                .attr({
                    "role"          : "grid",
                    "aria-readonly" : "true",
                    "tabindex"      : "0",
                    "aria-relevant" : "text",
                    "aria-live"     : "assertive",
                    "aria-label"    : $.datepicker._defaults.monthNames[ inst.selectedMonth ] + inst.selectedYear,
                    "aria-activedescendant": "ui-datepicker-day-" + inst.selectedDay
                })
                .children( "thead" )
                    .attr( "role", "presentation" )
                    .children( "tr" )
                        .first()
                            .children( "th" )
                                .not( ".ui-datepicker-week-col" )
                                    .attr( "role", "columnheader" )
                                    .attr( "aria-label", function( index, attr ){
                                        return $( this ).children( "span" ).attr( "title" );
                                    })
                                .end()
                            .end()
                        .end()
                    .end()
                .end()
                .children( "tbody" )
                    .attr( "role", "presentation" )
                    .find( "td" )
                        .attr( "role", "gridcell" )
                        .attr( "id", function( index, attr ){
                            return "ui-datepicker-day-" + $( this ).children().text();
                        }) 
                        .children()
                            .attr( "tabindex", "-1" );
        
        inst.dpDiv
            .find( "div.ui-datepicker-title" )
                .attr( "id", "ui-datepicker-1-month-lbl" )
                .find( "select.ui-datepicker-month" )
                    .attr({
                        "role"      : "combobox",
                        "tabindex"  : "0",
                        "aria-label": inst.settings.monthText
                    })
                    .children( "option" )
                        .attr( "aria-label", function( index, attr){
                            return $.datepicker._defaults.monthNames[ $( this ).val() ];
                        })
                    .end()
               .end()
               .find( "select.ui-datepicker-year" )
                   .attr({
                       "role"       : "combobox",
                       "tabindex"   : "0",
                       "aria-label" : inst.settings.yearText
                   });
                    
        
        $( "#" + id )
            .addClass( "ui-datepicker-days-cell-over" )
            .children( "a" )
            .addClass( "ui-state-hover" );
        
        inst.dpDiv
            .find( ".ui-datepicker-calendar" )
            .attr( "tabindex", "0" )
            .focus();
        
        return returnValue;
    }
    
    
})( jQuery );