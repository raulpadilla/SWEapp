$(document).bind("mobileinit",function(){$.mobile.pushStateEnabled=false});var isPhone=navigator.userAgent.match(/(iPhone)|(iPod)|(Android.*Mobile)/i);if(isPhone){SiebelApp.ThemeManager.addTheme("SBL-MOBILE",{css:{sb_theme:"files/theme-black.css",sc_theme:"files/theme-phone.css"},objList:[]})}else{SiebelApp.ThemeManager.addTheme("SBL-MOBILE",{css:{sb_theme:"files/theme-black.css"},objList:[]})};