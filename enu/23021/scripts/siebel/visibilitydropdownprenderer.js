/*****************************************************************************
 *
 * Copyright (C) 2011 Oracle., All rights reserved.
 *
 * FILE:       visibilitydropdownprenderer.js
 *  $Revision: 0 $
 *      $Date: 02/09/12 0:00 $
 *    $Author: Rohan $ of last update
 *
 * CREATOR:    Rohan
 *
 * DESCRIPTION
 *    Physical rendering for Navigation dropdown.
 *
 *****************************************************************************/
/*UIF-Core : JSHint compliant */
if (typeof (SiebelAppFacade.VisDropdownPhyRenderer) === "undefined") {
    SiebelJS.Namespace('SiebelAppFacade.VisDropdownPhyRenderer');

    SiebelApp.S_App.RegisterConstructorAgainstKey (SiebelApp.Constants.get("SWE_UIDEF_VIS_PRENDR"), "SiebelAppFacade.VisDropdownPhyRenderer");

    SiebelAppFacade.VisDropdownPhyRenderer = (function(){

        var consts  = SiebelJS.Dependency( "SiebelApp.Constants" );
        var utils   = SiebelJS.Dependency( "SiebelApp.Utils" );
        
        function VisDropdownPhyRenderer( pm ){
            var m_pm = pm;
            this.GetPM = function(){ return m_pm; };
        }

        VisDropdownPhyRenderer.prototype.ShowUI = function(){
            var placeholder = this.GetPM().Get( "GetContainer" );
            $( "#" + placeholder ).html( "<select name=" + placeholder +" ></select>" );
            if( utils.IsTrue( SiebelApp.S_App.GetAccessibilityEnhanced() ) ){
                var title = this.GetPM().Get( "GetTitle" );
                
                $( "[name=" + placeholder + "]" )
                    .attr("title",title)
                    .parent()
                    .attr({
                        "role" : "navigation",
                        "title": title
                    });
            }
        };

        VisDropdownPhyRenderer.prototype.BindEvents = function(){
            $( "[name=" + this.GetPM().Get( "GetContainer" ) + "]" ).bind( "click keypress blur", { ctx : this }, function( event ){
                if(event.type === "keypress" && event.which !== $.ui.keyCode.ENTER){
                    // Do not do anything , if it is a keypress and Not Enter Key
                }
                else {
                    event.data.ctx.GetPM().OnControlEvent( "OnClick",$(this).val());
                }
            });
        };

        VisDropdownPhyRenderer.prototype.BindData = function(){
           var pm = this.GetPM();
           var element = $( "[name=" + pm.Get( "GetContainer" ) + "]" );
           var screenTabInfo = pm.Get( "VisDropDownItem" );
           var selectedItem = pm.Get( "SelectedItem" );
           var htmlmarkupstr = "";

           for( var i = 0; i < screenTabInfo.length; i++ ){
                var currentCaption = screenTabInfo[i].captionName;
                htmlmarkupstr +=  "<option" +
                                  ( selectedItem === String(currentCaption) ? " selected" : ""  ) +
                                  ">" + currentCaption +   "</option>";
            }
            element.html(htmlmarkupstr);
            InjectQTPInfo.call(this, element );
            element = null;
        };

        function InjectQTPInfo(visDropDownControl){
            var visDropDownComboBoxQTPPS = this.GetPM().Get( "VisDropdownComboBoxQTPPS" );
            var visDropDownItemQTPInfo = this.GetPM().Get( "VisDropDownItemQTPInfo" );
            var CONST_OT = consts.get("SWE_PROP_QTP_OT");
            var CONST_RN = consts.get("SWE_PROP_QTP_RN");
            var CONST_UN = consts.get("SWE_PROP_QTP_UN");

            if( visDropDownComboBoxQTPPS && (typeof(visDropDownComboBoxQTPPS.GetProperty) === "function")){
                //Visibility DropDown Combo box QTP Info
                visDropDownControl
                    .attr( "ot", visDropDownComboBoxQTPPS.GetProperty(CONST_OT))
                    .attr( "rn", visDropDownComboBoxQTPPS.GetProperty(CONST_RN))
                    .attr( "un", visDropDownComboBoxQTPPS.GetProperty(CONST_UN));
            }
            // VisDropDown Item QTP
            var options = $(visDropDownControl).children("option");
            for( var i = 0; i < visDropDownItemQTPInfo.length; i++ ){
                if( visDropDownItemQTPInfo[i] && (typeof(visDropDownItemQTPInfo[i].GetProperty) === "function")){
                    var qtpUIName = visDropDownItemQTPInfo[i].GetProperty (CONST_UN);
                    var qtpObjType = visDropDownItemQTPInfo[i].GetProperty (CONST_OT);
                    var qtpRepName = visDropDownItemQTPInfo[i].GetProperty (CONST_RN);

                    for(var j = 0; j< options.length; j++){
                        if(options[j].value === qtpUIName){
                            $(options[j])
                                .attr( "ot", qtpObjType)
                                .attr( "rn", qtpRepName)
                                .attr( "un", qtpUIName);
                        }
                    }
                }
            }
        }

        VisDropdownPhyRenderer.prototype.SetFocus = function(){
            $( "[name=" + this.GetPM().Get( "GetContainer" ) + "]" ).focus();
        };
        
        VisDropdownPhyRenderer.prototype.ResetVisDropdown = function(){
            $( "[name=" + this.GetPM().Get( "GetContainer" ) + "]" ).val(this.GetPM().Get("SelectedItem"));
        };

        return VisDropdownPhyRenderer;
    }());
 }
