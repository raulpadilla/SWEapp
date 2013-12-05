if (typeof (SiebelAppFacade.Postload) == "undefined") {
    Namespace('SiebelAppFacade.Postload');

    (function(){
        SiebelApp.EventManager.addListner( "postload", OnPostload, this );
        function OnPostload( ){
            try{
                console.log("Loaded");
                
		var scr = $("#s_sctrl_tabScreen li").parent();
		scr.sortable({axis: "x",snap: true });

            }
            catch(error)
            {
                //No-Op
            }
        }
    }());
}