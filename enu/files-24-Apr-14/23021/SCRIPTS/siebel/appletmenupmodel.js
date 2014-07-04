if (typeof (SiebelAppFacade.AppletMenuPresentationModel) === "undefined"){
    SiebelJS.Namespace('SiebelAppFacade.AppletMenuPresentationModel');
    SiebelAppFacade.AppletMenuPresentationModel = (function(){

    var consts  = SiebelJS.Dependency( "SiebelApp.Constants" );
     var utils = SiebelJS.Dependency("SiebelApp.Utils");

        function AppletMenuPresentationModel( proxy ){
           // debugger;
            SiebelAppFacade.AppletMenuPresentationModel.superclass.constructor.call( this, proxy );
        }

        SiebelJS.Extend( AppletMenuPresentationModel, SiebelAppFacade.PresentationModel );

        AppletMenuPresentationModel.prototype.Init = function()
        {



            var methodArray = this.GetProxy().GetMethodArray();
            var propArray = this.GetProxy().GetPropArray();
            var i,len;
            for( i = 0, len = methodArray.length; i < len; i++ )
            {
                this.AddMethod( methodArray[i], null, {core : true } );
            }

            for( i = 0, len = propArray.length; i < len; i++ ){
                this.AddProperty( propArray[i], null, { core : true } );
            }
            methodArray = propArray = null;
            try{
                this.AddProperty( "GetPlaceHolder", consts.get("SWE_MENU_IDENTIFIER") + this.Get( "GetId" ) );
            }catch(e){}

           //this.AddProperty( "GetPlaceHolder", consts.get("SWE_MENU_IDENTIFIER") + this.GetProxy().GetId()  );
            this.AttachEventHandler("HandleClick", function(eventData){
                this.ExecuteMethod("OnMenuInvoke",consts.get("APPLET_NAME"), consts.get("SWE_PREPARE_APPLET_MENU"), consts.get("SWE_MENU_APPLET"),
                true);
            });

            this.AttachEventHandler("HandleMenuClick", function(eventData){
                this.ExecuteMethod("ProcessMenuCommand", eventData);
            });

           this.AttachPMBinding( "ShowMenu", function(){

               this.AddProperty( "GetConcreteMenu", CreateConcreteMenu.call(this, this.ExecuteMethod("GetMenuPS")));
               this.GetRenderer().ShowMenu();
            });

        };

          function CreateConcreteMenu ( menuPS ){
            var concreteMenu = [];
            var childCount = menuPS.GetChildCount();
            var bSkipSeparator = true;
            var bAddSeparator = false;

            var command = consts.get("CMDMGR_COMMAND");
            var separator = consts.get("CMDMGR_SEPARATOR");
            var menu = consts.get("CMDMGR_MENU");
            var caption  = consts.get("CMDMGR_CAPTION");
            var type = consts.get("CMDMGR_TYPE");

            // This section will be used to flesh out the separator and nested menu placement logic
            for (var i = 0; i < childCount; i++){
                var menuItemPS = menuPS.GetChild(i);
                if (!menuItemPS.IsEmpty()){
                    var strCaption = menuItemPS.GetProperty(caption);
                    var strCmdType = menuItemPS.GetProperty(type);

                    switch (strCmdType){
                        case command:
                            if (bAddSeparator && !bSkipSeparator)
                            {
                                concreteMenu.push( InsertSeparator.call(this));
                            }


                            if (utils.IsEmpty(menuItemPS.GetProperty(menu))){
                                var strCmd = menuItemPS.GetProperty(command);
                                menuItemPS.SetProperty(menu, strCmd);
                            }

                            concreteMenu.push( InsertItem.call (this, menuItemPS));

                            bAddSeparator = bSkipSeparator = false;
                            break;


                        case separator:
                            bAddSeparator = !bSkipSeparator;
                            break;

                        case menu:

                            if (bAddSeparator && !bSkipSeparator)
                            {   InsertSeparator.call (this);}
                            var subMenu = CreateConcreteMenu.call( this, menuItemPS);
                            var menuItem = InsertItem.call (this, menuItemPS);
                            menuItem.subMenu = subMenu;
                            concreteMenu.push( menuItem );
                            // TODO: This section will need to create logic for the submenu logic.

                            break;

                    }
                }
            }
            return concreteMenu;
        }

        function InsertItem (menuItemPS){

            var strEnabled = menuItemPS.GetProperty (consts.get("CMDMGR_ENABLED"));
            var strCommand = menuItemPS.GetProperty (consts.get("CMDMGR_COMMAND"));
            var strCaption = menuItemPS.GetProperty (consts.get("CMDMGR_CAPTION"));
            var qtpOT = menuItemPS.GetProperty (consts.get("SWE_PROP_QTP_OT"));
            var qtpRN = menuItemPS.GetProperty (consts.get("SWE_PROP_QTP_RN"));
            var qtpUN = menuItemPS.GetProperty (consts.get("SWE_PROP_QTP_UN"));

            // Caption would need to be formatted to standard.
            strCaption = utils.Expand (strCaption, consts.get("CMDMGR_OPSQR"), consts.get("CMDMGR_APPLETWIDTH"));

            var outputMenuItem = {};
            outputMenuItem [consts.get("CMDMGR_CAPTION")] = strCaption;
            outputMenuItem [consts.get("CMDMGR_COMMAND")] = strCommand;
            outputMenuItem [consts.get("CMDMGR_ENABLED")] = strEnabled;
            outputMenuItem [consts.get("SWE_PROP_QTP_OT")] = qtpOT;
            outputMenuItem [consts.get("SWE_PROP_QTP_RN")] = qtpRN;
            outputMenuItem [consts.get("SWE_PROP_QTP_UN")] = qtpUN;

            return outputMenuItem;
        }

        function InsertSeparator (){
            var outputMenuItem = {};
            outputMenuItem [consts.get("CMDMGR_COMMAND")] = consts.get("CMDMGR_SEPARATOR");
            return outputMenuItem;
        }


        return AppletMenuPresentationModel;
    }());
}