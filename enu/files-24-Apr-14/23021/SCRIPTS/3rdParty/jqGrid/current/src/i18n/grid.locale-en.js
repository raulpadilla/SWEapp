;(function($){
/**
 * jqGrid English Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: _SWEgetMessage("IDS_SWE_JQGRID_RECORD_TEXT"),
		emptyrecords: _SWEgetMessage("IDS_SWE_JQGRID_EMPTY_RECORDS"),
		loadtext: _SWEgetMessage("IDS_SWE_JQGRID_LOAD_TEXT"),
		pgtext : _SWEgetMessage("IDS_SWE_JQGRID_PG_TEXT")
	},
	search : {
		caption: _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_CAPTION"),
		Find: _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_FIND"),
		Reset: _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_RESET"),
		odata : [_SWEgetMessage("IDS_SWE_JQGRID_SEARCH_EQUAL"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_NOT_EQUAL"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_LESS"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_LESS_OR_EQUAL"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_GREATER"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_GREATER_OR_EQUAL"),
			_SWEgetMessage("IDS_SWE_JQGRID_SEARCH_BEGINS_WITH"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_NOT_BEGIN_WITH"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_IS_IN"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_NOT_IN"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_ENDS_WITH"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_NOT_END_WITH"),
            _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_CONTAINS"), _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_NOT_CONTAIN")],
		groupOps: [	{ op: "AND", text: _SWEgetMessage("IDS_SWE_JQGRID_ALL") },	{ op: "OR",  text: _SWEgetMessage("IDS_SWE_JQGRID_ANY") }	],
		matchText: _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_MATCH_TEXT"),
		rulesText: _SWEgetMessage("IDS_SWE_JQGRID_SEARCH_RULES_TEXT")
	},
	edit : {
		addCaption: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_ADD_CAPTION"),
		editCaption: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_CAPTION"),
		bSubmit: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_SUBMIT"),
		bCancel: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_CANCEL"),
		bClose: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_CLOSE"),
		saveData: _SWEgetMessage("IDS_SWE_JQGRID_EDIT_SAVE_DATA"),
		bYes : _SWEgetMessage("IDS_SWE_JQGRID_EDIT_YES"),
		bNo : _SWEgetMessage("IDS_SWE_JQGRID_EDIT_NO"),
		bExit : _SWEgetMessage("IDS_SWE_JQGRID_EDIT_EXIT"),
		msg: {
			required:_SWEgetMessage("IDS_SWE_JQGRID_MSG_REQUIRED"),
			number:_SWEgetMessage("IDS_SWE_JQGRID_MSG_NUMBER"),
			minValue:_SWEgetMessage("IDS_SWE_JQGRID_MSG_MIN_VALUE"),
			maxValue:_SWEgetMessage("IDS_SWE_JQGRID_MSG_MAX_VALUE"),
			email: _SWEgetMessage("IDS_SWE_JQGRID_MSG_EMAIL"),
			integer: _SWEgetMessage("IDS_SWE_JQGRID_MSG_INTEGER"),
			date: _SWEgetMessage("IDS_SWE_JQGRID_MSG_DATE"),
			url: _SWEgetMessage("IDS_SWE_JQGRID_MSG_URL"),
			nodefined : _SWEgetMessage("IDS_SWE_JQGRID_MSG_NODEFINED"),
			novalue : _SWEgetMessage("IDS_SWE_JQGRID_MSG_NO_VALUE"),
			customarray : _SWEgetMessage("IDS_SWE_JQGRID_MSG_CUSTOM_ARRAY"),
			customfcheck : _SWEgetMessage("IDS_SWE_JQGRID_MSG_CUSTOM_FUNCTION")
		}
	},
	view : {
		caption: _SWEgetMessage("IDS_SWE_JQGRID_VIEW_CAPTION"),
		bClose: _SWEgetMessage("IDS_SWE_JQGRID_VIEW_CLOSE")
	},
	del : {
		caption: _SWEgetMessage("IDS_SWE_JQGRID_DEL_CAPTION"),
		msg: _SWEgetMessage("IDS_SWE_JQGRID_DEL_MSG"),
		bSubmit: _SWEgetMessage("IDS_SWE_JQGRID_DEL_SUBMIT"),
		bCancel: _SWEgetMessage("IDS_SWE_JQGRID_DEL_CANCEL")
	},
	nav : {
		edittext: "",
		edittitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_EDIT_TITLE"),
		addtext:"",
		addtitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_ADD_TITLE"),
		deltext: "",
		deltitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_DEL_TITLE"),
		searchtext: "",
		searchtitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_SEARCH_TITLE"),
		refreshtext: "",
		refreshtitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_REFRESH_TITLE"),
		alertcap: _SWEgetMessage("IDS_SWE_JQGRID_NAV_ALERT_CAP"),
		alerttext: _SWEgetMessage("IDS_SWE_JQGRID_NAV_ALERT_TEXT"),
		viewtext: "",
		viewtitle: _SWEgetMessage("IDS_SWE_JQGRID_NAV_VIEW_TITLE")
	},
	col : {
		caption: _SWEgetMessage("IDS_SWE_JQGRID_COL_CAPTION"),
		bSubmit: _SWEgetMessage("IDS_SWE_JQGRID_COL_SUBMIT"),
		bCancel: _SWEgetMessage("IDS_SWE_JQGRID_COL_CANCEL")
	},
	errors : {
		errcap : _SWEgetMessage("IDS_SWE_JQGRID_ERR_CAP"),
		nourl : _SWEgetMessage("IDS_SWE_JQGRID_ERR_NO_URL"),
		norecords: _SWEgetMessage("IDS_SWE_JQGRID_ERR_NO_RECORDS"),
		model : _SWEgetMessage("IDS_SWE_JQGRID_ERR_MODEL")
	},
	formatter : {
		integer : {thousandsSeparator: _SWEgetMessage("IDS_SWE_JQGRID_THOUSANDS_SEPARATOR"), defaultValue: '0'},
		number : {decimalSeparator:_SWEgetMessage("IDS_SWE_JQGRID_DECIMAL_SEPARATOR"), thousandsSeparator: _SWEgetMessage("IDS_SWE_JQGRID_THOUSANDS_SEPARATOR"), decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:_SWEgetMessage("IDS_SWE_JQGRID_DECIMAL_SEPARATOR"), thousandsSeparator: _SWEgetMessage("IDS_SWE_JQGRID_THOUSANDS_SEPARATOR"), decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
                 _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_SUN"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_MON"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_TUE"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_WED"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_THR"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_FRI"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_SHORT_SAT"),
                 _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_SUNDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_MONDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_TUESDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_WEDNESDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_THURSDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_FRIDAY"), _SWEgetMessage("IDS_SWE_JQGRID_DAY_FULL_SATURDAY")
			],
			monthNames: [
                _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_JAN"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_FEB"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_MAR"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_APR"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_MAY"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_JUN"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_JUL"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_AUG"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_SEP"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_OCT"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_NOV"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_SHORT_DEC"),
                _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_JANUARY"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_FEBRUARY"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_MARCH"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_APRIL"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_MAY"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_JUNE"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_JULY"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_AUGUST"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_SEPTEMBER"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_OCTOBER"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_NOVEMBER"), _SWEgetMessage("IDS_SWE_JQGRID_MONTH_FULL_DECEMBER")
			],
			AmPm : [_SWEgetMessage("IDS_SWE_JQGRID_AM_LC"), _SWEgetMessage("IDS_SWE_JQGRID_PM_LC"), _SWEgetMessage("IDS_SWE_JQGRID_AM_UC"), _SWEgetMessage("IDS_SWE_JQGRID_PM_UC")],
			S: function (j) {return j < 11 || j > 13 ? [_SWEgetMessage("IDS_SWE_JQGRID_ORDINAL_NUM_SUFFIX_FIRST"), _SWEgetMessage("IDS_SWE_JQGRID_ORDINAL_NUM_SUFFIX_SECOND"), _SWEgetMessage("IDS_SWE_JQGRID_ORDINAL_NUM_SUFFIX_THIRD"), _SWEgetMessage("IDS_SWE_JQGRID_ORDINAL_NUM_SUFFIX_FOURTH")][Math.min((j - 1) % 10, 3)] : _SWEgetMessage("IDS_SWE_JQGRID_ORDINAL_NUM_SUFFIX_OTHERS")},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);
