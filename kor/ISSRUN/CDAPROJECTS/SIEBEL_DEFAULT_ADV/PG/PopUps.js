//Production script file created 9/22/00 by Catherine Quinones

// The following is a generic function for creating a new window.

function NewWindow(mypage, myname, w, h, scroll, tool, location) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',toolbar='+tool+',location='+location+',noresizable,status=yes'
	win = window.open(mypage, myname, winprops)

}


