/** Class Candy.Wrapper
 * Wrapper Class for Siebel
 *
 * Parameters:
 *   (Candy.Wrapper) self - itself
 */
/*global Namespace, Candy, Mustache, SIEBEL_BUILD, setTimeout, window, jQuery, navigator*/
Candy.Wrapper = (function(self, $) {
    "use strict";

    self.renderer       = null;
    self.onAgentTyping  = function() {};
    self.onHoldTab      = function() {};
    self.onSendMessage  = function() {};
    self.onSwitchChat   = function() {};
    self.implicitSave   = function() {};
    self.focusToTitleBar   = function() {};

    self.init = function(options) {
        // Process options
        if ( options ) {
            self.renderer       = options.renderer;
            self.onAgentTyping  = options.onAgentTyping;
            self.onHoldTab      = options.onHoldTab;
            self.onSendMessage  = options.onSendMessage;
            self.onSwitchChat   = options.onSwitchChat;
            self.implicitSave   = options.implicitSave;
            self.focusToTitleBar   = options.focusToTitleBar;
        }

        Candy.Extension.init();

        // Setup QTP Automation support
        // Candy.Extension.Automation.enable(true);

        Candy.Accessibility.init();
    };

    self.getCurrentRoomJid = function() {
        return Candy.View.getCurrent().roomJid;
    };

    self.showWarning = function(message, nDelay) {
        Candy.View.Pane.Chat.Modal.showWarning(message, nDelay);
    };

    self.Room = {
        appendMessage: function(roomJid, name, message, timestamp) {
            if(self.Room.exists(roomJid)) {
                Candy.View.Pane.Message.show(roomJid, name, message, timestamp);
            }
        },

        clearMessage: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                Candy.View.Pane.Room.getPane(roomJid, '.message-pane').children().remove();
            }
        },

        close: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                Candy.View.Pane.Room.close(roomJid);
            }
        },

        disable: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                var messageForm = Candy.View.Pane.Room.getPane(roomJid, '.message-form');
                messageForm.attr('disabled', true);
                messageForm.children('.field').attr('disabled', true);
                messageForm.children('.submit').attr('disabled', true).removeClass('appletButton').addClass('appletButtonDis');
                //$('#chat-tab-' + roomJid).attr('disabled', true);
                $('#chat-log-' + roomJid).attr('disabled', true);
            }
        },

        enable: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                var messageForm = Candy.View.Pane.Room.getPane(roomJid, '.message-form');
                messageForm.removeAttr('disabled');
                messageForm.children('.field').removeAttr('disabled');
                messageForm.children('.submit').removeAttr('disabled').removeClass('appletButtonDis').addClass('appletButton');
                //$('#chat-tab-' + roomJid).removeAttr('disabled');
                $('#chat-log-' + roomJid).removeAttr('disabled');
            }
        },

        exists: function(roomJid) {
            return (Candy.View.Pane.Chat.rooms[roomJid] !== undefined);
        },

        getInputText: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                return $('#chat-input-' + roomJid).val();
            }
        },

        init: function(roomJid, roomName, roomType) {
            if(!self.Room.exists(roomJid)) {
                // by default, supports "chat" (private chat)
                roomType = roomType || "chat";
                Candy.View.Pane.Room.init(roomJid, roomName, roomType);
                Candy.View.Pane.Chat.getTab(roomJid).find('.close').hide();
                Candy.Accessibility.Room.connect(roomJid);
                self.Room.showUnreadCount(roomJid, 0);
            }
        },

        setInputText: function(roomJid, text) {
            if(self.Room.exists(roomJid)) {
                $('#chat-input-' + roomJid).val(text);
            }
        },

        show: function(roomJid) {
            if(self.Room.exists(roomJid)) {
                Candy.View.Pane.Room.show(roomJid);
                if (Candy.Accessibility.Room.Input.isDisabled(roomJid)) {
                    Candy.Accessibility.Room.Tab.setFocus(roomJid);
                } else {
                    Candy.Accessibility.Room.Input.setFocus(roomJid);
                }
                Candy.Accessibility.Room.Log.showStatus(roomJid, $('#chat-tab-' + roomJid).attr('aria-label'));
            }
        },

        showUnreadCount: function(roomJid, count) {
            if(self.Room.exists(roomJid)) {
                if (count === 0) {
                    Candy.View.Pane.Chat.getTab(roomJid).find('.unread').hide();
                } else {
                    Candy.View.Pane.Chat.getTab(roomJid).find('.unread').show().text(count);
                }
            }
        },

        addClassToTab: function (roomJid, classname) {
            Candy.View.Pane.Chat.getTab(roomJid).find('.label').addClass(classname);
        },

        removeClassToTab: function (roomJid, classnames) {
            Candy.View.Pane.Chat.getTab(roomJid).find('.label').removeClass(classnames);
        },

        updateTabTooltip: function (roomJid, tabTooltip) {
            Candy.View.Pane.Chat.getTab(roomJid).attr('title', tabTooltip);
        },

        getChatTab: function (roomJid) {
            return Candy.View.Pane.Chat.getTab(roomJid).find('.label');
        },

        updateTabCaption: function (roomJid, roomName) {
            if(self.Room.exists(roomJid) &&
                Candy.View.Pane.Chat.rooms[roomJid].name !== roomName) {
                var roomId = Candy.Util.jidToId(roomJid),
                    html = Mustache.to_html(Candy.View.Template.Chat.tab, {
                        roomJid: roomJid,
                        roomId: roomId,
                        name: roomName,
                        privateUserChat: true,
                        roomType: "chat"
                    }),
                    tab = $(html);

                Candy.View.Pane.Chat.rooms[roomJid].name = roomName;
                $('#chat-tabs').children('#chat-tab-' + roomJid).replaceWith(tab);
                tab.click(Candy.View.Pane.Chat.tabClick);
                // TODO: maybe we find a better way to get the close element.
                $('a.close', tab).click(Candy.View.Pane.Chat.tabClose);
                Candy.View.Pane.Chat.fitTabs();

                Candy.View.Pane.Chat.getTab(roomJid).find('.close').hide();
                Candy.Accessibility.Room.Tab.connectEvents(roomJid);
            }
        }
    };

    self.TypingIndicator = {
        show: function(roomJid, customerName) {
            $('#chat-typing-' + roomJid).html((customerName || '') + ' is typing...').attr('role', 'status');
            Candy.View.Pane.Room.scrollToBottom(roomJid);
        },

        hide: function(roomJid) {
            $('#chat-typing-' + roomJid).html('').removeAttr('role');
        }
    };

    return self;

}(Candy.Wrapper || {}, jQuery));

/** Class Candy.Extension
 * Override & Extent Candy Chat
 *
 * Parameters:
 *   (Candy.Extension) self - itself
 */
Candy.Extension = (function(self) {
    "use strict";

    self.init = function() {
        Candy.View.Pane.Chat.rooms = {};
        Candy.Extension.replaceTemplate();

        // Init Candy View, language changed to map translation.
        if (typeof (SIEBEL_BUILD) !== 'undefined') {
            Candy.View.init($('#candy'), { language: 'siebel', resources: "./" + SIEBEL_BUILD + "3rdParty/candy-chat/res/" });
        }
        else {
            Candy.View.init($('#candy'), { language: 'siebel', resources: './candy-chat/res/' });
        }
        // Modal grays the entire UI, hide it.
        Candy.View.Pane.Chat.Modal.hide();
    };

    // Remove toolbar & roster
    self.replaceTemplate = function() {
        $('#candy').attr('role', 'widget').attr('aria-label', 'chat');

        Candy.View.Template.Chat.pane = '<div id="chat-pane">{{> tabs}}{{> rooms}}</div>{{> modal}}';
        Candy.View.Template.Room.pane = '<div id="chat-room-{{roomId}}" class="room-pane roomtype-{{roomType}}" data-roomjid="{{roomJid}}" data-roomtype="{{roomType}}">{{> messages}}{{> form}}</div>';

        Candy.View.Template.Chat.tab = '<li id="chat-tab-{{roomJid}}" tabindex="-1" class="chat-tab roomtype-{{roomType}}" data-roomjid="{{roomJid}}" data-roomtype="{{roomType}}" role="tab" aria-label="Chat with {{name}}"  title="{{name}}"><a href="#" class="label">{{name}}</a><a href="#" class="transition"></a><a href="#" class="close" role="button" aria-label="Close chat tab">\u00D7</a><small class="unread"></small></li>';

        // Chat Log
        Candy.View.Template.Message.pane = '<div id="chat-log-{{roomJid}}" tabindex="-1" class="message-pane-wrapper" role="log" aria-label="chat"><dl class="message-pane"></dl><div id="chat-typing-{{roomJid}}" class="chat-typing"></div><div id="chat-status-{{roomJid}}" class="chat-status"></div></div>';

        // Message & Send button
        Candy.View.Template.Room.form = '<div class="message-form-wrapper"></div><form method="post" class="message-form"><textarea id="chat-input-{{roomJid}}" tabindex="-1" name="message" class="field" type="textbox" autocomplete="off" maxlength="1000" rows="3" role="textbox" aria-label="Write new message" aria-multiline="true" /><input id="chat-submit-{{roomJid}}" tabindex="-1" type="submit" class="submit appletButton" name="submit" value="{{_messageSubmit}}" role="button" aria-label="Send message" /></form>';

        Candy.View.Template.Message.item = '<dt data-message="{{time}} {{displayName}}: {{message}}">{{time}}</dt><dd><span class="label"><a href="#" class="name">{{displayName}}</a></span>{{{message}}}</dd>';
    };

    // Override Candy default translation.
    // jQuery.i18n._() returns original string if not found in dict.
    Candy.View.Translation.siebel = {
        'messageSubmit' : 'Send',
        'dateFormat': 'dd.mm.yyyy',
        'timeFormat': 'HH:MM:ss'
    };

    // Event: Chat room close
    Candy.View.Pane.Chat.tabClose = function(e) {
        var roomJid = $(this).parent().attr('data-roomjid');
        //Candy.Wrapper.showWarning("Close chat room [roomJid = " + roomJid + "]");
        Candy.View.Pane.Room.close(roomJid);
        return false;
    };

    Candy.View.Pane.Chat.allTabsClosed = function() {
        // comment out the following line to prevent access undefine exception
        // reason: we never set up the Candy.Core in our extension
        // Candy.Core.disconnect();
        Candy.View.Pane.Chat.Toolbar.hide();
        return;
    };

    // Event: Send button on click
    Candy.View.Pane.Message.submit = function(event) {
        if ( Candy.Wrapper.renderer ) {
            var roomJid = Candy.View.getCurrent().roomJid,
                userName = Candy.View.Pane.Chat.rooms[roomJid].name,
                text = $(this).children('.field').val().substring(0, Candy.View.getOptions().crop.message.body);

            if ( text ) {
                var message = { 'chatId': roomJid, 'userName': userName, 'text': text };
                Candy.Wrapper.onSendMessage (Candy.Wrapper.renderer, message);
            }
        }

        $(this).children('.field').val('').focus();
        event.preventDefault();
    };

    /**
     * Override Event: Candy.View.Event.Room.onAdd
     */
    Candy.View.Event.Room.onAdd = function(args) {
        Candy.View.Pane.Room.getPane(args.roomJid, '.message-form').children('.field').keypress( function(e) {
            Candy.Wrapper.onAgentTyping (Candy.Wrapper.renderer, args.roomJid);
		});
    };

    // Show Warning message
    // TODO: support Ok/Yes/No buttons.
    Candy.View.Pane.Chat.Modal.showWarning = function(message, nDelay) {
        Candy.View.Pane.Chat.Modal.show(Mustache.to_html(Candy.View.Template.PresenceError.displayError, {
            _error: message
        }), true);

        // Auto close after nDelay (default 1) sec.
        nDelay = nDelay || 1000;
        setTimeout(function() {
            Candy.View.Pane.Chat.Modal.hide();
        }, nDelay);
    };

    // Automation support
    self.Automation = {
        enable: function(enabled) {
            if (enabled) {
                $('#candy').attr('ot', 'widget').attr('rn', 'Chat').attr('un', 'Chat');

                // Chat Tab Panel
                Candy.View.Template.Chat.tabs = '<ul id="chat-tabs" ot="tabpanel" rn="ChatTabPanel" un="ChatTabPanel"></ul>';

                // Chat Tab
                Candy.View.Template.Chat.tab = '<li id="chat-tab-{{roomJid}}" tabindex="-1" class="chat-tab roomtype-{{roomType}}" data-roomjid="{{roomJid}}" data-roomtype="{{roomType}}" role="tab" aria-label="Chat with {{name}}" ot="tab" rn="ChatTab" un="{{name}}"><a href="#" class="label">{{name}}</a><a href="#" class="transition"></a><a href="#" class="close" role="button" aria-label="Close chat tab" ot="button" rn="CloseTab" un="CloseTab">\u00D7</a><small class="unread"></small></li>';

                // Chat Log
                Candy.View.Template.Message.pane = '<div id="chat-log-{{roomJid}}" tabindex="-1" class="message-pane-wrapper" role="log" aria-label="chat" ot="log" rn="ChatLog" un="ChatLog"><dl class="message-pane"></dl><div id="chat-typing-{{roomJid}}" class="chat-typing"></div><div id="chat-status-{{roomJid}}" class="chat-status"></div></div>';

                // Message & Send button
                Candy.View.Template.Room.form = '<div class="message-form-wrapper"></div><form method="post" class="message-form"><textarea id="chat-input-{{roomJid}}" tabindex="-1" name="message" class="field" type="textbox" autocomplete="off" maxlength="1000" rows="3" role="textbox" aria-label="Write new message" aria-multiline="true" ot="textbox" rn="Message" un="Message" /><input id="chat-submit-{{roomJid}}" tabindex="-1" type="submit" class="submit appletButton" name="submit" value="{{_messageSubmit}}" role="button" aria-label="Send message" ot="button" rn="SendMessage" un="Send" /></form>';

                // Alert Dialog
                Candy.View.Template.Chat.modal = '<div id="chat-modal" ot="alertdialog" rn="Alert" un="Alert"><a id="admin-message-cancel" class="close" href="#">\u00D7</a><span id="chat-modal-body"></span><img src="{{resourcesPath}}img/modal-spinner.gif" id="chat-modal-spinner" /></div><div id="chat-modal-overlay"></div>';
            }
        }
    };

    Candy.View.Pane.Window.clearUnreadMessages = function(count) {};
    Candy.View.Pane.Window.renderUnreadMessages = function(count) {};
    Candy.View.Pane.Chat.Toolbar.onPlaySound = function() {};
    Candy.View.Pane.Chat.increaseUnreadMessages = function() {};

    Candy.Util.localizedTime = function (dateTime) {
        return dateTime;
    };

    return self;
}(Candy.Extension || {}));

/**
 * Candy Chat Accessibility
 */
Candy.Accessibility = (function(self, $) {
    "use strict";

    // Clear all focus and set tabindex of first & last widgets to 0
    self.resetFocus = function() {
        self.clearAllFocus();
        $('#chat-tab-' + Candy.View.getCurrent().roomJid).attr('tabindex', '0');
        $('#chat-submit-' + Candy.View.getCurrent().roomJid).attr('tabindex', '0');
    };

    // Clear all focus
    self.clearAllFocus = function() {
        $('#chat-tabs li').attr('tabindex', -1);
        $('#chat-rooms input.field').attr('tabindex', -1);
        $('#chat-rooms input.submit').attr('tabindex', -1);
        $('#chat-rooms div.message-pane-wrapper').attr('tabindex', -1);
    };

    self.init = function() {
        self.Candy.connectEvents();
    };

    // Top level widget, Candy
    self.Candy = {
        connectEvents: function() {
            $('#candy').focusout(this.onFocusout);
        },

        // If focusout happens on the target which has tabindex=0, the focus is out of candy.
        // Thus reset focus.
        onFocusout: function(event) {
            // Work on Chrome, FF
            event = event || window.event;
            var target = event.srcElement || event.target;
            if (target.nodeType === 3) { // fix Opera text node issue
                target = target.parentNode;
            }

            //console.log(target.id + ' v.s. ' + $('[tabindex="0"]').attr('id'));
            if (target.id === $('[tabindex="0"]').attr('id')) {
                self.resetFocus();
            }
        }
    };

    self.Room = {
        connect: function(roomJid) {
            self.Room.Tab.connectEvents(roomJid);
            self.Room.Log.connectEvents(roomJid);
            self.Room.Input.connectEvents(roomJid);
            self.Room.Submit.connectEvents(roomJid);
        },

        // 1st level widgets, tab
        Tab: {
            connectEvents: function(roomJid) {
                $('#chat-tab-' + roomJid).unbind('click');
                $('#chat-tab-' + roomJid).keydown(this.onKeydown);
                $('#chat-tab-' + roomJid).click(this.onClick);
                $('#chat-tab-' + roomJid).focusin(this.onFocusin);
            },

            onKeydown: function(event) {
                var roomJid = Candy.View.getCurrent().roomJid;
                if (event.keyCode === 9 && !event.ctrlKey) { // Tab
                    if (event.shiftKey) { // [shift + tab]
                        self.resetFocus();
                        Candy.Wrapper.focusToTitleBar();
                    } else { // [tab]
                        self.Room.Log.setFocus(roomJid);
                    }
                } else if (event.keyCode === 37 || (event.ctrlKey && event.shiftKey && event.keyCode === 9)) { // [left] or Ctrl+Shift+Tab
                    var prevTab = $('#chat-tab-' + roomJid).prev();
                    var prevRoomJid = prevTab.attr('data-roomjid');
                    if (prevRoomJid) {
                        self.Room.Tab.onClick.call(prevTab);
                        $('#chat-tab-' + roomJid).attr('tabindex', '-1');
                        $('#chat-tab-' + prevRoomJid).attr('tabindex', '0').focus();
                    }
                } else if (event.keyCode === 39 || (event.ctrlKey && event.keyCode === 9)) { // [right] or Ctrl+Tab
                    var nextTab = $('#chat-tab-' + roomJid).next();
                    var nextRoomJid = nextTab.attr('data-roomjid');
                    if (nextRoomJid) {
                        self.Room.Tab.onClick.call(nextTab);
                        $('#chat-tab-' + roomJid).attr('tabindex', '-1');
                        $('#chat-tab-' + nextRoomJid).attr('tabindex', '0').focus();
                    }
                }

                event.preventDefault();
            },

            onClick: function(event) {
                // remember scroll position of current room
                var roomJid = Candy.View.getCurrent().roomJid,
                    clickedRoomJid = $(this).attr('data-roomjid');

                var renderer = Candy.Wrapper.renderer;
                if (renderer && roomJid !== clickedRoomJid) {
                    // Before selection change, invoke Implicit Save
                    if (!Candy.Wrapper.implicitSave(renderer)) {
                        return;
                    }
                    
                    Candy.Wrapper.onHoldTab(renderer, roomJid, true);
                    // Change selection
                    if (Candy.Wrapper.Room.exists(roomJid)) {
                        Candy.View.Pane.Chat.rooms[roomJid].scrollPosition = Candy.View.Pane.Room.getPane(roomJid, '.message-pane-wrapper').scrollTop();
                    }
                    Candy.Wrapper.Room.show(clickedRoomJid);
                    // After change
                    Candy.Wrapper.onSwitchChat(renderer, roomJid, clickedRoomJid);
                }
            },

            onFocusin: function(event) {
                // Work on Chrome, FF
                event = event || window.event;
                var target = event.srcElement || event.target;
                if (target.nodeType === 3) { // fix Opera text node issue
                    target = target.parentNode;
                }

                var roomJid = Candy.View.getCurrent().roomJid;

                //console.log(target.id + ' v.s. ' + $('[tabindex="0"]').attr('id'));
                if (target.id !== $('#chat-tab-' + roomJid).attr('id')) {
                    $('#chat-tab-' + roomJid).focus();
                }
            },

            setFocus: function(roomJid) {
                self.clearAllFocus();
                $('#chat-tab-' + roomJid).attr('tabindex', '0').focus();
            }
        },

        // 2nd level widgets, chat log
        Log: {
            connectEvents: function(roomJid) {
                $('#chat-log-' + roomJid).keydown(this.onKeydown);
                $('#chat-log-' + roomJid).mousedown(this.onMousedown);
            },

            onKeydown: function(event) {
                var roomJid = Candy.View.getCurrent().roomJid;

                if (event.keyCode === $.ui.keyCode.TAB && !event.ctrlKey) {
                    if (event.shiftKey) { // [shift + tab]
                        self.Room.Tab.setFocus(roomJid);
                    } else { // [tab]
                        var messageForm = Candy.View.Pane.Room.getPane(roomJid, '.message-form');
                        if (messageForm.attr('disabled') === 'disabled') {
                            self.resetFocus();
                            return;
                        } else {
                            self.Room.Input.setFocus(roomJid);
                        }
                    }
                } else if (event.keyCode === $.ui.keyCode.UP) {    // [Up Arrow]
                    self.Room.Log.readPrevMessage(roomJid);
                } else if (event.keyCode === $.ui.keyCode.DOWN) {  // [Down Arrow]
                    self.Room.Log.readNextMessage(roomJid);
                } else if (event.keyCode === $.ui.keyCode.HOME) {  // [Home]
                    self.Room.Log.readFirstMessage(roomJid);
                } else if (event.keyCode === $.ui.keyCode.END) {   // [End]
                    self.Room.Log.readLastMessage(roomJid);
                } else {
                    self.Room.Log.showStatus(roomJid, "Navigate chat history with Up or Down arrow key, press Home key to locate first message, End key to last message");
                }

                event.preventDefault();
            },

            onMousedown: function(event) {
                self.Room.Log.setFocus(Candy.View.getCurrent().roomJid);
            },

            setFocus: function(roomJid) {
                self.clearAllFocus();
                $('#chat-log-' + roomJid).attr('tabindex', '0').focus();
            },

            readPrevMessage: function(roomJid) {
                var readDt = $('#chat-log-' + roomJid).find('dt.read');

                if (readDt[0]) {
                    var prevDt = readDt.prev().prev();
                    if (prevDt[0]) {
                        var message = prevDt.attr('data-message');
                        self.Room.Log.showStatus(roomJid, message);

                        readDt.removeClass('read');
                        prevDt.addClass('read');

                        return;
                    }
                }

                self.Room.Log.readFirstMessage(roomJid);
            },

            readNextMessage: function(roomJid) {
                var readDt = $('#chat-log-' + roomJid).find('dt.read');

                if (readDt[0]) {
                    var nextDt = readDt.next().next();
                    if (nextDt[0]) {
                        var message = nextDt.attr('data-message');
                        self.Room.Log.showStatus(roomJid, message);

                        readDt.removeClass('read');
                        nextDt.addClass('read');

                        return;
                    }
                }

                self.Room.Log.readLastMessage(roomJid);
            },

            readFirstMessage: function(roomJid) {
                var readDt = $('#chat-log-' + roomJid).find('dt.read');
                var firstDt = $('#chat-log-' + roomJid).find('dt').first();

                if (firstDt[0]) {
                    var message = "First message " + firstDt.attr('data-message');
                    self.Room.Log.showStatus(roomJid, message);

                    readDt.removeClass('read');
                    firstDt.addClass('read');
                } else {
                    self.Room.Log.showStatus(roomJid, "No chat history");
                }
            },

            readLastMessage: function(roomJid) {
                var readDt = $('#chat-log-' + roomJid).find('dt.read');
                var lastDt = $('#chat-log-' + roomJid).find('dt').last();

                if (lastDt[0]) {
                    var message = "Last message " + lastDt.attr('data-message');
                    self.Room.Log.showStatus(roomJid, message);

                    readDt.removeClass('read');
                    lastDt.addClass('read');
                } else {
                    self.Room.Log.showStatus(roomJid, "No chat history");
                }
            },

            showStatus: function(roomJid, status) {
                $('#chat-status-' + roomJid).html(status).attr('role', 'status');

                setTimeout(function() {
                    $('#chat-status-' + roomJid).html('').removeAttr('role');
                }, 100);
            }
        },

        // 3rd level widgets, input textbox
        Input: {
            connectEvents: function(roomJid) {
                $('#chat-input-' + roomJid).keydown(this.onKeydown);
                $('#chat-input-' + roomJid).mousedown(this.onMousedown);
                $('#chat-input-' + roomJid).keyup(this.onKeyup);
            },

            isDisabled: function(roomJid) {
                return $('#chat-input-' + roomJid).attr('disabled');
            },

            onKeydown: function(event) {
                this.hasSubmit = false;
                var roomJid = Candy.View.getCurrent().roomJid;
                if (event.keyCode === 9) {
                    if (event.shiftKey) { // [shift + tab]
                        self.Room.Log.setFocus(roomJid);
                    } else { // [tab]
                        self.Room.Submit.setFocus(roomJid);
                    }
                    event.preventDefault();
                } else if (!event.shiftKey && event.keyCode === 13) {
                    Candy.View.Pane.Room.getPane(roomJid, '.message-form').submit();
                    event.preventDefault();
                    this.hasSubmit = true;
                }

                // Do not prevent default for input.
            },
            
            // in FF, after submit, there will be a new line in text input
            // the issue will not exist if we comment out Candy.Wrapper.onSendMessage (Candy.Wrapper.renderer, message); in onSendMessage
            // just a workaround to clear the input manually here
            onKeyup: function(event) {
                if (/firefox/.test(navigator.userAgent.toLowerCase()) && this.hasSubmit) {
                    $(this).val('');
                }
            },

            onMousedown: function(event) {
                self.Room.Input.setFocus(Candy.View.getCurrent().roomJid);
            },

            setFocus: function(roomJid) {
                self.clearAllFocus();
                $('#chat-input-' + roomJid).attr('tabindex', '0').focus();
            }
        },

        // 3rd level widgets, send button
        Submit: {
            connectEvents: function(roomJid) {
                $('#chat-submit-' + roomJid).keydown(this.onKeydown);
                $('#chat-submit-' + roomJid).mousedown(this.onMousedown);
            },

            isDisabled: function(roomJid) {
                return $('#chat-submit-' + roomJid).attr('disabled');
            },

            onKeydown: function(event) {
                if (event.keyCode === 9) {
                    if (event.shiftKey) { // [shift + tab]
                        self.Room.Input.setFocus(Candy.View.getCurrent().roomJid);
                    } else { // [tab]
                        // Move out of chat, do not prevent default action.
                        self.resetFocus();
                        return;
                    }
                } else if (event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) {
                    // for bug#17032497, this is a temp fix
                    // in next phase after adding more buttons, we need to put the key handler for all buttons in one place
                    $(this).trigger("click");
                }

                event.preventDefault();
            },

            onMousedown: function(event) {
                self.Room.Submit.setFocus(Candy.View.getCurrent().roomJid);
            },

            setFocus: function(roomJid) {
                self.clearAllFocus();
                $('#chat-submit-' + roomJid).attr('tabindex', '0').focus();
            }
        }
    };

    // Avoid default action.
    Candy.View.Pane.Room.setFocusToForm = function(roomJid) {};

    Candy.View.Event.Room.onShow = function(args) {
        // Candy.Accessibility.Input.setFocus(args.roomJid);
    };

    return self;
}(Candy.Accessibility || {}, jQuery));

/** Class Candy.Simulation
 * Simulate Client Reply
 *
 * Parameters:
 *   (Candy.Simulation) self - itself
 */
Candy.Simulation = (function(self) {
    "use strict";

    var simulation = ["Any more steps?", "And then?", "What's next?"];
    var simUser = ["John", "Sara", "Jessica", "David", "George", "Mary", "Allison", "Kenny", "Jane", "Jeffrey"];

    // Event: Send button on click
    self.onSendMessage = function(renderer, message) {
        if (message && message.chatId && message.text) {
            // Operator says...
            Candy.Wrapper.Room.appendMessage(message.chatId, 'Agent', message.text);

            setTimeout(function() {
                Candy.Wrapper.TypingIndicator.show(message.chatId, message.userName);
            }, 1000);

            // Simulate customer says...
            setTimeout(function() {
                Candy.Wrapper.Room.appendMessage(message.chatId, message.userName, Candy.Simulation.GetRandMsg());
                Candy.Wrapper.TypingIndicator.hide(message.chatId);
            }, 2000);
        }
    };

    self.BindEvents = function() {

    /*
    <input type="button" id="simulate" name="simulate" value="Restart Chat Simulation" />
    <input type="button" id="start-new-chat" name="start-new-chat" value="Start a New Chat" />
    <input type="button" id="new-chat-message" name="new-chat-message" value="New Chat Message" />
    */

        $( "#simulate" ).unbind('click');
        $( "#start-new-chat" ).unbind('click');
        $( "#new-chat-message" ).unbind('click');

        $( "#simulate" ).click( function() {
            Candy.Simulation.InitSimulateChat();
        });
        $( "#start-new-chat" ).click( function() {
            Candy.Simulation.SimulateNewChat();
        });
        $( "#new-chat-message" ).click( function() {
            Candy.Simulation.SimulateNewMessage();
        });
    };

    self.GetRandMsg = function() {
        return simulation[self.Rand(simulation.length)];
    };

    self.Rand = function(range) {
        if (Math.random) {
            return Math.round(Math.random() * (range - 1));
        } else {
            var now = new Date();
            return (now.getTime() / 1000) % range;
        }
    };

    function simNextRoomId () {
        simNextRoomId.num++;
        return simNextRoomId.num.toString ();
    }

    self.InitSimulateChat = function  () {
        Candy.Simulation.BindEvents ();
        // Init Candy
        Candy.Wrapper.init();

        if ( !Candy.Wrapper.renderer ) {
            // assign to true to get around checking code when renderer is not passed in
            Candy.Wrapper.renderer = true;
            Candy.Wrapper.onSendMessage = this.onSendMessage;
            Candy.Wrapper.onAgentTyping = function(renderer, chatId) {
            };
            self.onHoldTab      = function(renderer, chatId, bKeepTerminatedTab) {
            };
            self.onSwitchChat   = function(renderer, currChatId, newChatId) {
                Candy.Wrapper.Room.show(newChatId);
            };
        }

        // reset room id
        simNextRoomId.num = -1;
        var roomId = simNextRoomId ();
        var userName = simUser[parseInt(roomId, 10)%simUser.length];
        var firstRoomId = roomId;

        // Open Chat Room 1
        Candy.Wrapper.Room.init(roomId, userName);
        Candy.Wrapper.Room.appendMessage(roomId, userName, "My iPhone always freezes, can you help me!");

        roomId = simNextRoomId ();
        userName = simUser[parseInt(roomId, 10)%simUser.length];

        // Open Chat Room 2
        Candy.Wrapper.Room.init(roomId, userName);
        Candy.Wrapper.Room.appendMessage(roomId, userName, "My Galaxy Note always freezes, can you help me!");

        roomId = simNextRoomId ();
        userName = simUser[parseInt(roomId, 10)%simUser.length];

        // Open Chat Room 3
        Candy.Wrapper.Room.init(roomId, userName);
        Candy.Wrapper.Room.appendMessage(roomId, userName, "My BlackBerry is slowing down recently, can you help!");
        Candy.Wrapper.Room.appendMessage(roomId, userName, "Thx, Bye!");
        //Candy.Wrapper.Room.disable("30");

        // Chat Room 1 on top
        Candy.Wrapper.Room.show(firstRoomId);
    };

    self.SimulateNewChat = function  () {
        // Open New Chat Room
        var bShowNewRoom = ($('#chat-rooms').children().length === 0);
        var roomId = simNextRoomId ();
        var userName = simUser[parseInt(roomId, 10)%simUser.length];
        Candy.Wrapper.Room.init(roomId, userName);
        Candy.Wrapper.Room.appendMessage(roomId, userName, "This is " + userName + ". My laptop hangs, please help!");
        if (bShowNewRoom) {
            Candy.Wrapper.Room.show(roomId);
        }
    };

    self.SimulateNewMessage = function  () {
        // New Message for the Last Tab
        var openRooms = $('#chat-rooms').children();
        if (openRooms.length === 0) {
            self.SimulateNewChat();
        }
        else {
            var roomId = openRooms.last().attr('data-roomjid');
            var userName = simUser[parseInt(roomId, 10)%simUser.length];
            Candy.Wrapper.Room.appendMessage(roomId, userName, "Hello, are you still there?");
        }
    };

    return self;
}(Candy.Simulation || {}));
