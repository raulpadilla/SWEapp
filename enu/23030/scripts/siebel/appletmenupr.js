if( typeof ( SiebelAppFacade.AppletMenuPR ) === "undefined" ) {

    SiebelJS.Namespace( 'SiebelAppFacade.AppletMenuPR' );

    SiebelAppFacade.AppletMenuPR = (function () {

        var consts = SiebelJS.Dependency("SiebelApp.Constants");

        function AppletMenuPR(pm) {
            SiebelAppFacade.AppletMenuPR.superclass.constructor.call(this, pm);
        }

        SiebelJS.Extend(AppletMenuPR, SiebelAppFacade.BasePR);

        AppletMenuPR.prototype.Init = function () {
            SiebelAppFacade.AppletMenuPR.superclass.Init.call(this);

            this.AttachPMBinding("ShowMenu", function () {
                this.GetPM().ExecuteMethod("PrepareConcreteMenu");
                this.ShowMenu();
            });
        };

        AppletMenuPR.prototype.ShowUI = function () {
            SiebelAppFacade.AppletMenuPR.superclass.ShowUI.call( this );

            var pm = this.GetPM();

            //Accessibility :: Add the alt tag for Applet Label
            var menuTitle = pm.Get("GetLabel");
            if (menuTitle !== "") {
                $("#" + pm.Get("GetPlaceHolder"))
                    .attr("title", menuTitle + " " + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_MENU_TITLE"))
                    .attr("tabindex", "0")
                    .attr("data-seq", "0");
            }
        };

        AppletMenuPR.prototype.BindEvents = function () {
            SiebelAppFacade.AppletMenuPR.superclass.BindEvents.call( this );

            $("#" + this.GetPM().Get("GetPlaceHolder")).bind("click", { ctx: this }, function (event) {
                var parentComponent = SiebelAppFacade.ComponentMgr.FindComponent({ id: event.data.ctx.GetPM().Get("parentName") });
                if (parentComponent) {
                    //vt: this one should set the active applet first before sending out the default command
                    var inputPSFocus = CCFMiscUtil_CreatePropSet();
                    var ret = parentComponent.ExecuteMethod("InvokeMethod", "OnFocus", inputPSFocus);
                    //VT:prevent subsequent click handling by the applet PR. Captured the event in target phase.
                    if (!ret) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    }
                }
                event.data.ctx.GetPM().OnControlEvent("HandleClick");
            });
        };

        AppletMenuPR.prototype.BindData = function () {
            SiebelAppFacade.AppletMenuPR.superclass.BindData.call( this );
        };

        AppletMenuPR.prototype.GenMenuMarkup = function (itemSet, cssPrefix) {
            var markup = "";
            var caption = consts.get("CMDMGR_CAPTION");
            var enable = consts.get("CMDMGR_ENABLED");
            var itemMarkup = "";
            cssPrefix = cssPrefix || "siebui-menu";
            for (var i = 0, len = itemSet.length; i < len; i++) {
                var menuCaption = "";
                var className = cssPrefix + "-item ";
                var isEnable = String(itemSet[i][enable]) === "true";
                if (itemSet[i][caption]) {
                    menuCaption = itemSet[i][caption].charAt(0) === '&' ? itemSet[i][caption].substring(1) : itemSet[i][caption];
                    itemMarkup = "<a href='javascript:void(0)' " +
                                 "aria-disabled='" + (isEnable ? "false" : "true") +  "'" + 
                                 "class='" + (isEnable ? "" : "ui-state-disabled") + "' >" + menuCaption + "</a>";
                }
                else {
                    menuCaption = "";
                    itemMarkup = "<a href='javascript:void(0)' class='ui-state-disabled'></a>";
                    className += cssPrefix + "-separator";
                }

                if (SiebelApp.S_App.GetDirection()) {
                    className += "siebui-rtl-element-right";
                }
                markup += "<li data-caption=\"" + (itemSet[i][caption] || "") + "\" class='" + className + "' > " + itemMarkup;

                if (itemSet[i].subMenu) {
                    markup += "<ul>" + this.GenMenuMarkup(itemSet[i].subMenu, cssPrefix) + "</ul>";
                }
                markup += "</li>";
            }
            return markup;
        };

        AppletMenuPR.prototype.FindCommand = function (itemSet, key) {
            var caption = consts.get("CMDMGR_CAPTION");
            var menucommand = consts.get("CMDMGR_COMMAND");
            for (var i = 0, len = itemSet.length; i < len; i++) {
                if (itemSet[i][caption] === key) {
                    return itemSet[i][menucommand];
                }
                if (itemSet[i].subMenu) {
                    var found = this.FindCommand(itemSet[i].subMenu, key);
                    if (found) {
                        return found;
                    }
                }
            }
        };

        AppletMenuPR.prototype.UpdateMenuItems = function (itemSet, container) {
            var caption = consts.get("CMDMGR_CAPTION");
            var enable = consts.get("CMDMGR_ENABLED");
            for (var i = 0, len = itemSet.length; i < len; i++) {
                var isEnable = String(itemSet[i][enable]) === "true";
                if (itemSet[i][caption]) {
                    var item = $("li[data-caption=\"" + itemSet[i][caption] + "\"]", container).children("a");
                    if (isEnable) {
                        item
                           .removeClass("ui-state-disabled")
                           .attr("aria-disabled","false");
                    }
                    else {
                        item
                           .addClass("ui-state-disabled")
                           .attr("aria-disabled","true");
                    }
                    if (itemSet[i].subMenu) {
                        this.UpdateMenuItems(itemSet[i].subMenu, container);
                    }
                }
            }
        };

        AppletMenuPR.prototype.ShowMenu = function () {
            var pm = this.GetPM();
            var placeHolder = pm.Get("GetPlaceHolder");
            if ($("#" + placeHolder + "-menu").length === 0) {
                var rawItem = pm.Get("GetConcreteMenu");
                var markup = "<ul id='" + placeHolder +
                             "-menu' class='siebui-appletmenu" + (SiebelApp.S_App.GetDirection() ? " siebui-appletmenu-rtl" : "") +
                             "' style='display:none;'>" +
                             this.GenMenuMarkup(rawItem, "siebui-appletmenu") + "</ul>";

                $("#" + placeHolder)
                    .after(markup)
                    .next("#" + placeHolder + "-menu")
                    .menu({})
                    .css({ position: 'absolute', zIndex: 50 })
                    .hide()
                    .focusout(function (event) {
                        var el = $(this);
                        if ($(this).parent().find(document.activeElement).length === 0) {
                            setTimeout(function () {
                                el.hide();
                            }, 15);
                        }
                    })
                    .bind("menuselect", { ctx: this }, function (event, ui) {
                        $(this).hide();
                        if (ui && ui.item) {
                            var cmd = event.data.ctx.FindCommand(
                                        event.data.ctx.GetPM().Get("GetConcreteMenu"),
                                        ui.item.eq(0).attr("data-caption"));
                            if (cmd !== undefined) {
                                event.data.ctx.GetPM().OnControlEvent("HandleMenuClick", cmd);
                            }
                        }
                        return false;
                    });

                this.InjectQTPInfo($("#" + placeHolder + "-menu"));
                rawItem = null;
                markup = null;
            }
            else {
                // Update Menu Item Status...
                this.UpdateMenuItems(pm.Get("GetConcreteMenu"), $("#" + placeHolder + "-menu"));
            }

            $("#" + placeHolder + "-menu")
                .show()
                .position({
                    my: "center top",
                    at: "center bottom",
                    of: $("#" + placeHolder),
                    collision: "fit"
                })
                .focus()
                .focusin();
        };

        AppletMenuPR.prototype.InjectQTPInfo = function (menu) {
            //For Menu Container
            var pm = this.GetPM();
            var rawItem = pm.Get("GetConcreteMenu");
            if (pm) {
                if (typeof (pm.Get("GetObjectType")) === "string") {
                    $(menu).attr("ot", pm.Get("GetObjectType"));
                }
                if (typeof (pm.Get("GetRepstrName")) === "string") {
                    $(menu).attr("rn", pm.Get("GetRepstrName"));
                }
                if (typeof (pm.Get("GetUIName")) === "string") {
                    $(menu).attr("un", pm.Get("GetUIName"));
                }
            }
            // For menu items
            InjectQTPInfoForItems.call(this, rawItem, menu);
        };

        function InjectQTPInfoForItems(itemSet, container) {
            var caption = consts.get("CMDMGR_CAPTION");
            for (var i = 0, len = itemSet.length; i < len; i++) {
                if (itemSet[i][caption]) {
                    var el = container.find("li[data-caption=\"" + itemSet[i][caption] + "\"]").eq(0);
                    if (itemSet[i].qtpot) {
                        el.attr("ot", itemSet[i].qtpot);
                    }
                    if (itemSet[i].qtprn) {
                        el.attr("rn", itemSet[i].qtprn);
                    }
                    if (itemSet[i].qtpun) {
                        el.attr("un", itemSet[i].qtpun);
                    }
                    if (itemSet[i].subMenu) {
                        InjectQTPInfoForItems.call(this, itemSet[i].subMenu, el.children("ul"));
                    }
                }
            }
        }

        return AppletMenuPR;
    } ());
    
    /* Menu does not have its own PM/PR key and hence currently relying on hardcoded value.
     * with Mobile also using the same constructor name, I can't really change the reference from
     * MBMenuRenderer to AppletMenuPR since it will break mobile.
     */
    SiebelAppFacade.MBMenuRenderer = SiebelAppFacade.AppletMenuPR;
}
