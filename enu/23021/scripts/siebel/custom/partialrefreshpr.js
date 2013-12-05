if( typeof( SiebelAppFacade.PartialRefreshPR ) === "undefined" ){
    SiebelJS.Namespace( "SiebelAppFacade.PartialRefreshPR" );
    
    SiebelApp.S_App.RegisterConstructorAgainstKey( "PartialRefreshRenderer", "SiebelAppFacade.PartialRefreshPR" );
    
    SiebelAppFacade.PartialRefreshPR = ( function(){
        
        function PartialRefreshPR( pm ){
            SiebelAppFacade.PartialRefreshPR.superclass.constructor.call( this, pm );
            this.GetPM().AttachPMBinding( "ShowJobTitleRelatedField",  ModifyLayout, { scope: this });
        }
        
        SiebelJS.Extend( PartialRefreshPR, SiebelAppFacade.PhysicalRenderer );
        
        function ModifyLayout( ){
            var controls = this.GetPM().Get( "GetControls" );
            var canShow = this.GetPM().Get( "ShowJobTitleRelatedField" );
            //var WorkPhoneNum = controls[ "WorkPhoneNum" ];
           // var FaxPhoneNum = controls[ "FaxPhoneNum" ];
              var Type = controls[ "Type" ];   
            
            
            if( canShow ){

                $( "div#Type_Label" ).show();
                $( "[name='" + Type.GetInputName() + "']" ).show();

               // $( "div#WorkPhoneNum_Label" ).show();
               // $( "[name='" + WorkPhoneNum.GetInputName() + "']" ).show();
               // $( "div#FaxPhoneNum_Label" ).show();
              //  $( "[name='" + FaxPhoneNum.GetInputName() + "']" ).show();
            }
            else{

                  $( "div#Type_Label" ).hide();
                 $( "[name='" + Type.GetInputName() + "']" ).hide();
                // $( "div#WorkPhoneNum_Label" ).hide();
               //  $( "[name='" + WorkPhoneNum.GetInputName() + "']" ).hide();
               //  $( "div#FaxPhoneNum_Label" ).hide();
                // $( "[name='" + FaxPhoneNum.GetInputName() + "']" ).hide();
            }
        }
        return PartialRefreshPR;
    }());
}
