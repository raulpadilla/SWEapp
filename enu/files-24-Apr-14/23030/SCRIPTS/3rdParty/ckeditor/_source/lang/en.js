/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object for the English
 *		language. This is the base file for all translations.
 */

/**#@+
   @type String
   @example
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['en'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : _SWEgetMessage("IDS_SWE_CKEDITOR_EDITOR_TITLE"),

	// ARIA descriptions.
	toolbars	: _SWEgetMessage("IDS_SWE_CKEDITOR_TOOLBARS"),
	editor		: _SWEgetMessage("IDS_SWE_CKEDITOR_EDITOR"),

	// Toolbar buttons without dialogs.
	source			: _SWEgetMessage("IDS_SWE_CKEDITOR_SOURCE"),
	newPage			: _SWEgetMessage("IDS_SWE_CKEDITOR_NEW_PAGE"),
	save			: _SWEgetMessage("IDS_SWE_CKEDITOR_SAVE"),
	preview			: _SWEgetMessage("IDS_SWE_CKEDITOR_PREVIEW"),
	cut				: _SWEgetMessage("IDS_SWE_CKEDITOR_CUT"),
	copy			: _SWEgetMessage("IDS_SWE_CKEDITOR_COPY"),
	paste			: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE"),
	print			: _SWEgetMessage("IDS_SWE_CKEDITOR_PRINT"),
	underline		: _SWEgetMessage("IDS_SWE_CKEDITOR_UNDERLINE"),
	bold			: _SWEgetMessage("IDS_SWE_CKEDITOR_BOLD"),
	italic			: _SWEgetMessage("IDS_SWE_CKEDITOR_ITALIC"),
	selectAll		: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_ALL"),
	removeFormat	: _SWEgetMessage("IDS_SWE_CKEDITOR_REMOVE_FORMAT"),
	strike			: _SWEgetMessage("IDS_SWE_CKEDITOR_STRIKE"),
	subscript		: _SWEgetMessage("IDS_SWE_CKEDITOR_SUBSCRIPT"),
	superscript		: _SWEgetMessage("IDS_SWE_CKEDITOR_SUPERSCRIPT"),
	horizontalrule	: _SWEgetMessage("IDS_SWE_CKEDITOR_HORIZONTAL_RULE"),
	pagebreak		: _SWEgetMessage("IDS_SWE_CKEDITOR_PAGE_BREAK"),
	pagebreakAlt	: _SWEgetMessage("IDS_SWE_CKEDITOR_PAGE_BREAK_ALT"),
	unlink			: _SWEgetMessage("IDS_SWE_CKEDITOR_UNLINK"),
	undo			: _SWEgetMessage("IDS_SWE_CKEDITOR_UNDO"),
	redo			: _SWEgetMessage("IDS_SWE_CKEDITOR_REDO"),

	// Common messages and labels.
	common :
	{
		browseServer	: _SWEgetMessage("IDS_SWE_CKEDITOR_BROWSE_SERVER"),
		url				: _SWEgetMessage("IDS_SWE_CKEDITOR_URL"),
		protocol		: _SWEgetMessage("IDS_SWE_CKEDITOR_PROTOCOL"),
		upload			: _SWEgetMessage("IDS_SWE_CKEDITOR_UPLOAD"),
		uploadSubmit	: _SWEgetMessage("IDS_SWE_CKEDITOR_UPLOAD_SUBMIT"),
		image			: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE"),
		flash			: _SWEgetMessage("IDS_SWE_CKEDITOR_FLASH"),
		form			: _SWEgetMessage("IDS_SWE_CKEDITOR_FORM"),
		checkbox		: _SWEgetMessage("IDS_SWE_CKEDITOR_CHECKBOX"),
		radio			: _SWEgetMessage("IDS_SWE_CKEDITOR_RADIO"),
		textField		: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT_FIELD"),
		textarea		: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT_AREA"),
		hiddenField		: _SWEgetMessage("IDS_SWE_CKEDITOR_HIDDEN_FIELD"),
		button			: _SWEgetMessage("IDS_SWE_CKEDITOR_BUTTON"),
		select			: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT"),
		imageButton		: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE_BUTTON"),
		notSet			: _SWEgetMessage("IDS_SWE_CKEDITOR_NOT_SET"),
		id				: _SWEgetMessage("IDS_SWE_CKEDITOR_ID"),
		name			: _SWEgetMessage("IDS_SWE_CKEDITOR_NAME"),
		langDir			: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR"),
		langDirLtr		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_LTR"),
		langDirRtl		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_RTL"),
		langCode		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_CODE"),
		longDescr		: _SWEgetMessage("IDS_SWE_CKEDITOR_LONG_DESCR"),
		cssClass		: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_CLASS"),
		advisoryTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVISORY_TITLE"),
		cssStyle		: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_STYLE"),
		ok				: _SWEgetMessage("IDS_SWE_CKEDITOR_OK"),
		cancel			: _SWEgetMessage("IDS_SWE_CKEDITOR_CANCEL"),
		close			: _SWEgetMessage("IDS_SWE_CKEDITOR_CLOSE"),
		preview			: _SWEgetMessage("IDS_SWE_CKEDITOR_PREVIEW"),
		generalTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_GENERAL_TAB"),
		advancedTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVANCED_TAB"),
		validateNumberFailed : _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_NUMBER_FAILED"),
		confirmNewPage	: _SWEgetMessage("IDS_SWE_CKEDITOR_CONFIRM_NEW_PAGE"),
		confirmCancel	: _SWEgetMessage("IDS_SWE_CKEDITOR_CONFIRM_CANCEL"),
		options			: _SWEgetMessage("IDS_SWE_CKEDITOR_OPTIONS"),
		target			: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET"),
		targetNew		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_NEW"),
		targetTop		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_TOP"),
		targetSelf		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_SELF"),
		targetParent	: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_PARENT"),
		langDirLTR		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_LTR_LABEL"),
		langDirRTL		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_RTL_LABEL"),
		styles			: _SWEgetMessage("IDS_SWE_CKEDITOR_STYLES"),
		cssClasses		: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_CLASSES"),
		width			: _SWEgetMessage("IDS_SWE_CKEDITOR_WIDTH"),
		height			: _SWEgetMessage("IDS_SWE_CKEDITOR_HEIGHT"),
		align			: _SWEgetMessage("IDS_SWE_CKEDITOR_ALIGNMENT"),
		alignLeft		: _SWEgetMessage("IDS_SWE_CKEDITOR_LEFT"),
		alignRight		: _SWEgetMessage("IDS_SWE_CKEDITOR_RIGHT"),
		alignCenter		: _SWEgetMessage("IDS_SWE_CKEDITOR_CENTER"),
		alignTop		: _SWEgetMessage("IDS_SWE_CKEDITOR_TOP"),
		alignMiddle		: _SWEgetMessage("IDS_SWE_CKEDITOR_MIDDLE"),
		alignBottom		: _SWEgetMessage("IDS_SWE_CKEDITOR_BOTTOM"),
		invalidHeight	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_HEIGHT"),
		invalidWidth	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_WIDTH"),
		invalidCssLength	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_CSS_LENGTH"),
		invalidHtmlLength	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_HTML_LENGTH"),
		invalidInlineStyle	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_INLINE_STYLE"),
		cssLengthTooltip	: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_LENGTH_TOOLTIP"),

		// Put the voice-only part of the label in the span.
		unavailable		: _SWEgetMessage("IDS_SWE_CKEDITOR_UNAVAILABLE")
	},

	contextmenu :
	{
		options : _SWEgetMessage("IDS_SWE_CKEDITOR_CONTEXT_MENU_OPTIONS")
	},

	// Special char dialog.
	specialChar	:
	{
		toolbar	: _SWEgetMessage("IDS_SWE_CKEDITOR_SPECIAL_CHAR_TOOLBAR"),
		title	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_SPECIAL_CHAR"),
		options : _SWEgetMessage("IDS_SWE_CKEDITOR_SPECIAL_CHAR_OPTIONS")
	},

	// Link dialog.
	link :
	{
		toolbar		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINK_TOOLBAR"),
		other 		: _SWEgetMessage("IDS_SWE_CKEDITOR_OTHER"),
		menu		: _SWEgetMessage("IDS_SWE_CKEDITOR_EDIT_LINK"),
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINK"),
		info		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINK_INFO"),
		target		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET"),
		upload		: _SWEgetMessage("IDS_SWE_CKEDITOR_UPLOAD"),
		advanced	: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVANCED"),
		type		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINK_TYPE"),
		toUrl		: _SWEgetMessage("IDS_SWE_CKEDITOR_URL"),
		toAnchor	: _SWEgetMessage("IDS_SWE_CKEDITOR_TO_ANCHOR"),
		toEmail		: _SWEgetMessage("IDS_SWE_CKEDITOR_EMAIL"),
		targetFrame		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_FRAME"),
		targetPopup		: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_POPUP"),
		targetFrameName	: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_FRAME_NAME"),
		targetPopupName	: _SWEgetMessage("IDS_SWE_CKEDITOR_TARGET_POPUP_NAME"),
		popupFeatures	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_FEATURES"),
		popupResizable	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_RESIZABLE"),
		popupStatusBar	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_STATUS_BAR"),
		popupLocationBar: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_LOCATION_BAR"),
		popupToolbar	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_TOOLBAR"),
		popupMenuBar	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_MENUBAR"),
		popupFullScreen	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_FULL_SCREEN"),
		popupScrollBars	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_SCROLL_BARS"),
		popupDependent	: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_DEPENDENT"),
		popupLeft		: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_LEFT"),
		popupTop		: _SWEgetMessage("IDS_SWE_CKEDITOR_POPUP_TOP"),
		id				: _SWEgetMessage("IDS_SWE_CKEDITOR_ID"),
		langDir			: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR"),
		langDirLTR		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_LTR"),
		langDirRTL		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_RTL"),
		acccessKey		: _SWEgetMessage("IDS_SWE_CKEDITOR_ACCCESS_KEY"),
		name			: _SWEgetMessage("IDS_SWE_CKEDITOR_NAME"),
		langCode		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_CODE"),
		tabIndex		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAB_INDEX"),
		advisoryTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVISORY_TITLE"),
		advisoryContentType	: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVISORY_CONTENT_TYPE"),
		cssClasses		: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_CLASSES"),
		charset			: _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET"),
		styles			: _SWEgetMessage("IDS_SWE_CKEDITOR_STYLES"),
		rel			    : _SWEgetMessage("IDS_SWE_CKEDITOR_REL"),
		selectAnchor	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_ANCHOR"),
		anchorName		: _SWEgetMessage("IDS_SWE_CKEDITOR_BY_ANCHOR_NAME"),
		anchorId		: _SWEgetMessage("IDS_SWE_CKEDITOR_BY_ANCHOR_ID"),
		emailAddress	: _SWEgetMessage("IDS_SWE_CKEDITOR_EMAIL_ADDRESS"),
		emailSubject	: _SWEgetMessage("IDS_SWE_CKEDITOR_EMAIL_SUBJECT"),
		emailBody		: _SWEgetMessage("IDS_SWE_CKEDITOR_EMAIL_BODY"),
		noAnchors		: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_ANCHORS"),
		noUrl			: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_URL"),
		noEmail			: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_EMAIL")
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: _SWEgetMessage("IDS_SWE_CKEDITOR_ANCHOR"),
		menu		: _SWEgetMessage("IDS_SWE_CKEDITOR_EDIT_ANCHOR"),
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_ANCHOR_PROPERTIES"),
		name		: _SWEgetMessage("IDS_SWE_CKEDITOR_ANCHOR_NAME"),
		errorName	: _SWEgetMessage("IDS_SWE_CKEDITOR_ERROR_NAME"),
		remove		: _SWEgetMessage("IDS_SWE_CKEDITOR_REMOVE_ANCHOR")
	},

	// List style dialog
	list:
	{
		numberedTitle		: _SWEgetMessage("IDS_SWE_CKEDITOR_NUMBERED_LIST_PROPERTIES"),
		bulletedTitle		: _SWEgetMessage("IDS_SWE_CKEDITOR_BULLETED_LIST_PROPERTIES"),
		type				: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE"),
		start				: _SWEgetMessage("IDS_SWE_CKEDITOR_START"),
		validateStartNumber	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_START_NUMBER"),
		circle				: _SWEgetMessage("IDS_SWE_CKEDITOR_CIRCLE"),
		disc				: _SWEgetMessage("IDS_SWE_CKEDITOR_DISC"),
		square				: _SWEgetMessage("IDS_SWE_CKEDITOR_SQUARE"),
		none				: _SWEgetMessage("IDS_SWE_CKEDITOR_NONE"),
		notset				: _SWEgetMessage("IDS_SWE_CKEDITOR_NOT_SET"),
		armenian			: _SWEgetMessage("IDS_SWE_CKEDITOR_ARMENIAN"),
		georgian			: _SWEgetMessage("IDS_SWE_CKEDITOR_GEORGIAN"),
		lowerRoman			: _SWEgetMessage("IDS_SWE_CKEDITOR_LOWER_ROMAN"),
		upperRoman			: _SWEgetMessage("IDS_SWE_CKEDITOR_UPPER_ROMAN"),
		lowerAlpha			: _SWEgetMessage("IDS_SWE_CKEDITOR_LOWER_ALPHA"),
		upperAlpha			: _SWEgetMessage("IDS_SWE_CKEDITOR_UPPER_ALPHA"),
		lowerGreek			: _SWEgetMessage("IDS_SWE_CKEDITOR_LOWER_GREEK"),
		decimal				: _SWEgetMessage("IDS_SWE_CKEDITOR_DECIMAL"),
		decimalLeadingZero	: _SWEgetMessage("IDS_SWE_CKEDITOR_DECIMAL_LEADING_ZERO")
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: _SWEgetMessage("IDS_SWE_CKEDITOR_FIND_AND_REPLACE"),
		find				: _SWEgetMessage("IDS_SWE_CKEDITOR_FIND"),
		replace				: _SWEgetMessage("IDS_SWE_CKEDITOR_REPLACE"),
		findWhat			: _SWEgetMessage("IDS_SWE_CKEDITOR_FIND_WHAT"),
		replaceWith			: _SWEgetMessage("IDS_SWE_CKEDITOR_REPLACE_WITH"),
		notFoundMsg			: _SWEgetMessage("IDS_SWE_CKEDITOR_NOT_FOUND_MSG"),
		findOptions			: _SWEgetMessage("IDS_SWE_CKEDITOR_FIND_OPTIONS"),
		matchCase			: _SWEgetMessage("IDS_SWE_CKEDITOR_MATCH_CASE"),
		matchWord			: _SWEgetMessage("IDS_SWE_CKEDITOR_MATCH_WORD"),
		matchCyclic			: _SWEgetMessage("IDS_SWE_CKEDITOR_MATCH_CYCLIC"),
		replaceAll			: _SWEgetMessage("IDS_SWE_CKEDITOR_REPLACE_ALL"),
		replaceSuccessMsg	: _SWEgetMessage("IDS_SWE_CKEDITOR_REPLACE_SUCCESS_MSG")
	},

	// Table Dialog
	table :
	{
		toolbar		    : _SWEgetMessage("IDS_SWE_CKEDITOR_TABLE"),
		title		    : _SWEgetMessage("IDS_SWE_CKEDITOR_TABLE_PROPERTIES"),
		menu		    : _SWEgetMessage("IDS_SWE_CKEDITOR_TABLE_PROPERTIES"),
		deleteTable	    : _SWEgetMessage("IDS_SWE_CKEDITOR_DELETE_TABLE"),
		rows		    : _SWEgetMessage("IDS_SWE_CKEDITOR_ROWS"),
		columns		    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLUMNS"),
		border		    : _SWEgetMessage("IDS_SWE_CKEDITOR_BORDER_SIZE"),
		widthPx		    : _SWEgetMessage("IDS_SWE_CKEDITOR_WIDTH_PX"),
		widthPc		    : _SWEgetMessage("IDS_SWE_CKEDITOR_WIDTH_PC"),
		widthUnit	    : _SWEgetMessage("IDS_SWE_CKEDITOR_WIDTH_UNIT"),
		cellSpace	    : _SWEgetMessage("IDS_SWE_CKEDITOR_CELL_SPACE"),
		cellPad		    : _SWEgetMessage("IDS_SWE_CKEDITOR_CELL_PAD"),
		caption		    : _SWEgetMessage("IDS_SWE_CKEDITOR_CAPTION"),
		summary		    : _SWEgetMessage("IDS_SWE_CKEDITOR_SUMMARY"),
		headers		    : _SWEgetMessage("IDS_SWE_CKEDITOR_HEADERS"),
		headersNone		: _SWEgetMessage("IDS_SWE_CKEDITOR_HEADERS_NONE"),
		headersColumn	: _SWEgetMessage("IDS_SWE_CKEDITOR_HEADERS_COLUMN"),
		headersRow		: _SWEgetMessage("IDS_SWE_CKEDITOR_HEADERS_ROW"),
		headersBoth		: _SWEgetMessage("IDS_SWE_CKEDITOR_HEADERS_BOTH"),
		invalidRows		: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_ROWS"),
		invalidCols		: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_COLS"),
		invalidBorder	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_BORDER"),
		invalidWidth	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_TABLE_WIDTH"),
		invalidHeight	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_TABLE_HEIGHT"),
		invalidCellSpacing	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_CELL_SPACING"),
		invalidCellPadding	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_CELL_PADDING"),

		cell :
		{
			menu			: _SWEgetMessage("IDS_SWE_CKEDITOR_CELL"),
			insertBefore	: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_BEFORE"),
			insertAfter		: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_AFTER"),
			deleteCell		: _SWEgetMessage("IDS_SWE_CKEDITOR_DELETE_CELLS"),
			merge			: _SWEgetMessage("IDS_SWE_CKEDITOR_MERGE_CELLS"),
			mergeRight		: _SWEgetMessage("IDS_SWE_CKEDITOR_MERGE_RIGHT"),
			mergeDown		: _SWEgetMessage("IDS_SWE_CKEDITOR_MERGE_DOWN"),
			splitHorizontal	: _SWEgetMessage("IDS_SWE_CKEDITOR_SPLIT_HORIZONTAL"),
			splitVertical	: _SWEgetMessage("IDS_SWE_CKEDITOR_SPLIT_VERTICAL"),
			title			: _SWEgetMessage("IDS_SWE_CKEDITOR_CELL_PROPERTIES"),
			cellType		: _SWEgetMessage("IDS_SWE_CKEDITOR_CELL_TYPE"),
			rowSpan			: _SWEgetMessage("IDS_SWE_CKEDITOR_ROW_SPAN"),
			colSpan			: _SWEgetMessage("IDS_SWE_CKEDITOR_COL_SPAN"),
			wordWrap		: _SWEgetMessage("IDS_SWE_CKEDITOR_WORD_WRAP"),
			hAlign			: _SWEgetMessage("IDS_SWE_CKEDITOR_H_ALIGN"),
			vAlign			: _SWEgetMessage("IDS_SWE_CKEDITOR_V_ALIGN"),
			alignBaseline	: _SWEgetMessage("IDS_SWE_CKEDITOR_ALIGN_BASELINE"),
			bgColor			: _SWEgetMessage("IDS_SWE_CKEDITOR_BGCOLOR"),
			borderColor		: _SWEgetMessage("IDS_SWE_CKEDITOR_BORDER_COLOR"),
			data			: _SWEgetMessage("IDS_SWE_CKEDITOR_DATA"),
			header			: _SWEgetMessage("IDS_SWE_CKEDITOR_HEADER"),
			yes				: _SWEgetMessage("IDS_SWE_CKEDITOR_YES"),
			no				: _SWEgetMessage("IDS_SWE_CKEDITOR_NO"),
			invalidWidth	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_CELL_WIDTH"),
			invalidHeight	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_CELL_HEIGHT"),
			invalidRowSpan	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_ROW_SPAN"),
			invalidColSpan	: _SWEgetMessage("IDS_SWE_CKEDITOR_INVALID_COL_SPAN"),
			chooseColor		: _SWEgetMessage("IDS_SWE_CKEDITOR_CHOOSE_COLOR")
		},

		row :
		{
			menu			: _SWEgetMessage("IDS_SWE_CKEDITOR_ROW"),
			insertBefore	: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_ROW_BEFORE"),
			insertAfter		: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_ROW_AFTER"),
			deleteRow		: _SWEgetMessage("IDS_SWE_CKEDITOR_DELETE_ROW")
		},

		column :
		{
			menu			: _SWEgetMessage("IDS_SWE_CKEDITOR_COLUMN"),
			insertBefore	: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_COL_BEFORE"),
			insertAfter		: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_COL_AFTER"),
			deleteColumn	: _SWEgetMessage("IDS_SWE_CKEDITOR_DELETE_COLUMN")
		}
	},

	// Button Dialog.
	button :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_BUTTON_PROPERTIES"),
		text		: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT"),
		type		: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE"),
		typeBtn		: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE_BUTTON"),
		typeSbm		: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE_SUBMIT"),
		typeRst		: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE_RESET")
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : _SWEgetMessage("IDS_SWE_CKEDITOR_CHECKBOX_PROPERTIES"),
		radioTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_RADIO_PROPERTIES"),
		value		: _SWEgetMessage("IDS_SWE_CKEDITOR_VALUE"),
		selected	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECTED")
	},

	// Form Dialog.
	form :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_FORM_PROPERTIES"),
		menu		: _SWEgetMessage("IDS_SWE_CKEDITOR_FORM_PROPERTIES"),
		action		: _SWEgetMessage("IDS_SWE_CKEDITOR_ACTION"),
		method		: _SWEgetMessage("IDS_SWE_CKEDITOR_METHOD"),
		encoding	: _SWEgetMessage("IDS_SWE_CKEDITOR_ENCODING")
	},

	// Select Field Dialog.
	select :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECTION_FIELD_PROPERTIES"),
		selectInfo	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_INFO"),
		opAvail		: _SWEgetMessage("IDS_SWE_CKEDITOR_AVAILABLE_OPTIONS"),
		value		: _SWEgetMessage("IDS_SWE_CKEDITOR_OP_VALUE"),
		size		: _SWEgetMessage("IDS_SWE_CKEDITOR_SIZE"),
		lines		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINES"),
		chkMulti	: _SWEgetMessage("IDS_SWE_CKEDITOR_CHK_MULTI"),
		opText		: _SWEgetMessage("IDS_SWE_CKEDITOR_OP_TEXT"),
		opValue		: _SWEgetMessage("IDS_SWE_CKEDITOR_OP_VALUE"),
		btnAdd		: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_ADD"),
		btnModify	: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_MODIFY"),
		btnUp		: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_UP"),
		btnDown		: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_DOWN"),
		btnSetValue : _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_SETV_ALUE"),
		btnDelete	: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_DELETE")
	},

	// Textarea Dialog.
	textarea :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXTAREA_PROPERTIES"),
		cols		: _SWEgetMessage("IDS_SWE_CKEDITOR_COLUMNS"),
		rows		: _SWEgetMessage("IDS_SWE_CKEDITOR_ROWS")
	},

	// Text Field Dialog.
	textfield :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT_FIELD_PROPERTIES"),
		name		: _SWEgetMessage("IDS_SWE_CKEDITOR_NAME"),
		value		: _SWEgetMessage("IDS_SWE_CKEDITOR_VALUE"),
		charWidth	: _SWEgetMessage("IDS_SWE_CKEDITOR_CHAR_WIDTH"),
		maxChars	: _SWEgetMessage("IDS_SWE_CKEDITOR_MAX_CHARS"),
		type		: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE"),
		typeText	: _SWEgetMessage("IDS_SWE_CKEDITOR_OP_TEXT"),
		typePass	: _SWEgetMessage("IDS_SWE_CKEDITOR_TYPE_PASSWORD")
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: _SWEgetMessage("IDS_SWE_CKEDITOR_HIDDEN_FIELD_PROPERTIES"),
		name	: _SWEgetMessage("IDS_SWE_CKEDITOR_NAME"),
		value	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALUE")
	},

	// Image Dialog.
	image :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE_PROPERTIES"),
		titleButton	: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE_BUTTON_PROPERTIES"),
		menu		: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE_PROPERTIES"),
		infoTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_IMAGE_INFO"),
		btnUpload	: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_UPLOAD"),
		upload		: _SWEgetMessage("IDS_SWE_CKEDITOR_UPLOAD"),
		alt			: _SWEgetMessage("IDS_SWE_CKEDITOR_ALT_TEXY"),
		lockRatio	: _SWEgetMessage("IDS_SWE_CKEDITOR_LOCK_RATIO"),
		resetSize	: _SWEgetMessage("IDS_SWE_CKEDITOR_RESET_SIZE"),
		border		: _SWEgetMessage("IDS_SWE_CKEDITOR_BORDER"),
		hSpace		: _SWEgetMessage("IDS_SWE_CKEDITOR_H_SPACE"),
		vSpace		: _SWEgetMessage("IDS_SWE_CKEDITOR_V_SPACE"),
		alertUrl	: _SWEgetMessage("IDS_SWE_CKEDITOR_ALERT_URL"),
		linkTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_LINK"),
		button2Img	: _SWEgetMessage("IDS_SWE_CKEDITOR_BUTTON_2_IMG"),
		img2Button	: _SWEgetMessage("IDS_SWE_CKEDITOR_IMG_2_BUTTON"),
		urlMissing	: _SWEgetMessage("IDS_SWE_CKEDITOR_URL_MISSING"),
		validateBorder	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_BORDER"),
		validateHSpace	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_HSPACE"),
		validateVSpace	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_VSPACE")
	},

	// Flash Dialog
	flash :
	{
		properties		: _SWEgetMessage("IDS_SWE_CKEDITOR_FLASH_PROPERTIES"),
		propertiesTab	: _SWEgetMessage("IDS_SWE_CKEDITOR_PROPERTIES"),
		title			: _SWEgetMessage("IDS_SWE_CKEDITOR_FLASH_PROPERTIES"),
		chkPlay			: _SWEgetMessage("IDS_SWE_CKEDITOR_CHK_PLAY"),
		chkLoop			: _SWEgetMessage("IDS_SWE_CKEDITOR_CHK_LOOP"),
		chkMenu			: _SWEgetMessage("IDS_SWE_CKEDITOR_CHK_MENU"),
		chkFull			: _SWEgetMessage("IDS_SWE_CKEDITOR_CHK_FULL"),
 		scale			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCALE"),
		scaleAll		: _SWEgetMessage("IDS_SWE_CKEDITOR_SCALE_ALL"),
		scaleNoBorder	: _SWEgetMessage("IDS_SWE_CKEDITOR_SCALENOBORDER"),
		scaleFit		: _SWEgetMessage("IDS_SWE_CKEDITOR_SCALEFIT"),
		access			: _SWEgetMessage("IDS_SWE_CKEDITOR_ACCESS"),
		accessAlways	: _SWEgetMessage("IDS_SWE_CKEDITOR_ALWAYS"),
		accessSameDomain: _SWEgetMessage("IDS_SWE_CKEDITOR_SAME_DOMAIN"),
		accessNever		: _SWEgetMessage("IDS_SWE_CKEDITOR_NEVER"),
		alignAbsBottom	: _SWEgetMessage("IDS_SWE_CKEDITOR_ABS_BOTTOM"),
		alignAbsMiddle	: _SWEgetMessage("IDS_SWE_CKEDITOR_ABS_MIDDLE"),
		alignBaseline	: _SWEgetMessage("IDS_SWE_CKEDITOR_BASELINE"),
		alignTextTop	: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT_TOP"),
		quality			: _SWEgetMessage("IDS_SWE_CKEDITOR_QUALITY"),
		qualityBest		: _SWEgetMessage("IDS_SWE_CKEDITOR_BEST"),
		qualityHigh		: _SWEgetMessage("IDS_SWE_CKEDITOR_HIGH"),
		qualityAutoHigh	: _SWEgetMessage("IDS_SWE_CKEDITOR_AUTO_HIGH"),
		qualityMedium	: _SWEgetMessage("IDS_SWE_CKEDITOR_MEDIUM"),
		qualityAutoLow	: _SWEgetMessage("IDS_SWE_CKEDITOR_AUTO_LOW"),
		qualityLow		: _SWEgetMessage("IDS_SWE_CKEDITOR_LOW"),
		windowModeWindow: _SWEgetMessage("IDS_SWE_CKEDITOR_WINDOW"),
		windowModeOpaque: _SWEgetMessage("IDS_SWE_CKEDITOR_OPAQUE"),
		windowModeTransparent : _SWEgetMessage("IDS_SWE_CKEDITOR_TRANSPARENT"),
		windowMode		: _SWEgetMessage("IDS_SWE_CKEDITOR_WINDOW_MODE"),
		flashvars		: _SWEgetMessage("IDS_SWE_CKEDITOR_FLASH_VARS"),
		bgcolor			: _SWEgetMessage("IDS_SWE_CKEDITOR_BGCOLORTITLE"),
		hSpace			: _SWEgetMessage("IDS_SWE_CKEDITOR_HSPACE"),
		vSpace			: _SWEgetMessage("IDS_SWE_CKEDITOR_VSPACE"),
		validateSrc		: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_SRC"),
		validateHSpace	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_HSPACE"),
		validateVSpace	: _SWEgetMessage("IDS_SWE_CKEDITOR_VALIDATE_VSPACE")
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: _SWEgetMessage("IDS_SWE_CKEDITOR_SPELL_CHECK"),
		title			: _SWEgetMessage("IDS_SWE_CKEDITOR_SPELL_CHECK"),
		notAvailable	: _SWEgetMessage("IDS_SWE_CKEDITOR_NOT_AVAILABLE"),
		errorLoading	: _SWEgetMessage("IDS_SWE_CKEDITOR_ERROR_LOADING"),
		notInDic		: _SWEgetMessage("IDS_SWE_CKEDITOR_NOT_IN_DIC"),
		changeTo		: _SWEgetMessage("IDS_SWE_CKEDITOR_CHANGE_TO"),
		btnIgnore		: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_IGNORE"),
		btnIgnoreAll	: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_IGNORE_ALL"),
		btnReplace		: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_REPLACE"),
		btnReplaceAll	: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_REPLACE_ALL"),
		btnUndo			: _SWEgetMessage("IDS_SWE_CKEDITOR_BTN_UNDO"),
		noSuggestions	: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_SUGGESTIONS"),
		progress		: _SWEgetMessage("IDS_SWE_CKEDITOR_PROGRESS"),
		noMispell		: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_MISPELL"),
		noChanges		: _SWEgetMessage("IDS_SWE_CKEDITOR_NO_CHANGES"),
		oneChange		: _SWEgetMessage("IDS_SWE_CKEDITOR_ONE_CHANGE"),
		manyChanges		: _SWEgetMessage("IDS_SWE_CKEDITOR_MANY_CHANGES"),
		ieSpellDownload	: _SWEgetMessage("IDS_SWE_CKEDITOR_IE_SPELL_DOWNLOAD")
	},

	smiley :
	{
		toolbar	: _SWEgetMessage("IDS_SWE_CKEDITOR_SMILEY"),
		title	: _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT_A_SMILEY"),
		options : _SWEgetMessage("IDS_SWE_CKEDITOR_SMILEY_OPTIONS")
	},

	elementsPath :
	{
		eleLabel : _SWEgetMessage("IDS_SWE_CKEDITOR_ELEMENTS_PATH"),
		eleTitle : _SWEgetMessage("IDS_SWE_CKEDITOR_ELEMENTS_PATH")
	},

	numberedlist	: _SWEgetMessage("IDS_SWE_CKEDITOR_NUMBERED_LIST"),
	bulletedlist	: _SWEgetMessage("IDS_SWE_CKEDITOR_BULLETED_LIST"),
	indent			: _SWEgetMessage("IDS_SWE_CKEDITOR_INDENT"),
	outdent			: _SWEgetMessage("IDS_SWE_CKEDITOR_OUTDENT"),

	justify :
	{
		left	: _SWEgetMessage("IDS_SWE_CKEDITOR_ALIGN_LEFT"),
		center	: _SWEgetMessage("IDS_SWE_CKEDITOR_CENTER"),
		right	: _SWEgetMessage("IDS_SWE_CKEDITOR_ALIGN_RIGHT"),
		block	: _SWEgetMessage("IDS_SWE_CKEDITOR_BLOCK")
	},

	blockquote : _SWEgetMessage("IDS_SWE_CKEDITOR_BLOCK_QUOTE"),

	clipboard :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_CLIPBOARD_TITLE"),
		cutError	: _SWEgetMessage("IDS_SWE_CKEDITOR_CUT_ERROR"),
		copyError	: _SWEgetMessage("IDS_SWE_CKEDITOR_COPY_ERROR"),
		pasteMsg	: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_MSG"),
		securityMsg	: _SWEgetMessage("IDS_SWE_CKEDITOR_SECURITY_MSG"),
		pasteArea	: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_AREA")
	},

	pastefromword :
	{
		confirmCleanup	: _SWEgetMessage("IDS_SWE_CKEDITOR_CONFIRM_CLEANUP"),
		toolbar			: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_FROM_WORD"),
		title			: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_FROM_WORD"),
		error			: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTER_ERROR")
	},

	pasteText :
	{
		button	: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_TEXT"),
		title	: _SWEgetMessage("IDS_SWE_CKEDITOR_PASTE_TEXT")
	},

	templates :
	{
		button			: _SWEgetMessage("IDS_SWE_CKEDITOR_TEMPLATES"),
		title			: _SWEgetMessage("IDS_SWE_CKEDITOR_CONTENT_TEMPLATES"),
		options         : _SWEgetMessage("IDS_SWE_CKEDITOR_TEMPLATE_OPTIONS"),
		insertOption	: _SWEgetMessage("IDS_SWE_CKEDITOR_REPLACE_ACTUAL_CONTENTS"),
		selectPromptMsg	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_PROMPT_MSG"),
		emptyListMsg	: _SWEgetMessage("IDS_SWE_CKEDITOR_EMPTY_LIST_MSG")
	},

	showBlocks      : _SWEgetMessage("IDS_SWE_CKEDITOR_SHOW_BLOCKS"),

	stylesCombo :
	{
		label		: _SWEgetMessage("IDS_SWE_CKEDITOR_STYLES_COMBO"),
		panelTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_PANEL_TITLE"),
		panelTitle1	: _SWEgetMessage("IDS_SWE_CKEDITOR_PANEL_TITLE1"),
		panelTitle2	: _SWEgetMessage("IDS_SWE_CKEDITOR_PANEL_TITLE2"),
		panelTitle3	: _SWEgetMessage("IDS_SWE_CKEDITOR_PANEL_TITLE3")
	},

	format :
	{
		label		: _SWEgetMessage("IDS_SWE_CKEDITOR_FORMAT"),
		panelTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_PANELTITLE"),
		tag_p		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_P"),
		tag_pre		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_PRE"),
		tag_address	: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_ADDRESS"),
		tag_h1		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H1"),
		tag_h2		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H2"),
		tag_h3		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H3"),
		tag_h4		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H4"),
		tag_h5		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H5"),
		tag_h6		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_H6"),
		tag_div		: _SWEgetMessage("IDS_SWE_CKEDITOR_TAG_DIV")
	},

	div :
	{
		title				: _SWEgetMessage("IDS_SWE_CKEDITOR_CREATE_DIV_CONTAINER"),
		toolbar				: _SWEgetMessage("IDS_SWE_CKEDITOR_CREATE_DIV_CONTAINER"),
		cssClassInputLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_CLASS"),
		styleSelectLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_CSS_STYLE"),
		IdInputLabel		: _SWEgetMessage("IDS_SWE_CKEDITOR_ID"),
		languageCodeInputLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_LANGUAGE_CODE_INPUT_LABEL"),
		inlineStyleInputLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_INLINE_STYLE_INPUT_LABEL"),
		advisoryTitleInputLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_ADVISORY_TITLE_INPUT_LABEL"),
		langDirLabel		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_LABEL"),
		langDirLTRLabel		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_LTR_LABEL"),
		langDirRTLLabel		: _SWEgetMessage("IDS_SWE_CKEDITOR_LANG_DIR_RTL_LABEL"),
		edit				: _SWEgetMessage("IDS_SWE_CKEDITOR_EDIT_DIV"),
		remove				: _SWEgetMessage("IDS_SWE_CKEDITOR_REMOVE_DIV")
  	},

	iframe :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME_PROPERTIES"),
		toolbar		: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME"),
		noUrl		: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME_NO_URL"),
		scrolling	: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME_SCROLLING"),
		border		: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME_BORDER")
	},

	font :
	{
		label		: _SWEgetMessage("IDS_SWE_CKEDITOR_FONT"),
		voiceLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_FONT"),
		panelTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_FONT_NAME")
	},

	fontSize :
	{
		label		: _SWEgetMessage("IDS_SWE_CKEDITOR_SIZE"),
		voiceLabel	: _SWEgetMessage("IDS_SWE_CKEDITOR_FONT_SIZE"),
		panelTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_FONT_SIZE")
	},

	colorButton :
	{
		textColorTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_TEXT_COLOR"),
		bgColorTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_BGCOLORTITLE"),
		panelTitle		: _SWEgetMessage("IDS_SWE_CKEDITOR_COLORS"),
		auto			: _SWEgetMessage("IDS_SWE_CKEDITOR_AUTO"),
		more			: _SWEgetMessage("IDS_SWE_CKEDITOR_MORE_COLORS")
	},

	colors :
	{
		'000'    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_BLACK"),
		'800000' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_MAROON"),
		'8B4513' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_SADDLE_BROWN"),
		'2F4F4F' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_DARK_SLATE_GRAY"),
		'008080' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_TEAL"),
		'000080' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_NAVY"),
		'4B0082' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_INDIGO"),
		'696969' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_DARK_GRAY"),
		'B22222' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_FIRE_BRICK"),
		'A52A2A' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_BROWN"),
		'DAA520' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_GOLDEN_ROD"),
		'006400' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_DARK_GREEN"),
		'40E0D0' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_TURQUOISE"),
		'0000CD' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_MEDIUM_BLUE"),
		'800080' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_PURPLE"),
		'808080' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_GRAY"),
		'F00'    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_RED"),
		'FF8C00' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_DARK_ORANGE"),
		'FFD700' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_GOLD"),
		'008000' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_GREEN"),
		'0FF'    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_CYAN"),
		'00F'    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_BLUE"),
		'EE82EE' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_VIOLET"),
		'A9A9A9' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_DIM_GRAY"),
		'FFA07A' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LIGHT_SALMON"),
		'FFA500' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_ORANGE"),
		'FFFF00' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_YELLOW"),
		'00FF00' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LIME"),
		'AFEEEE' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_PALE_TURQUOISE"),
		'ADD8E6' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LIGHT_BLUE"),
		'DDA0DD' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_PLUM"),
		'D3D3D3' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LIGHT_GREY"),
		'FFF0F5' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LAVENDER_BLUSH"),
		'FAEBD7' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_ANTIQUE_WHITE"),
		'FFFFE0' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LIGHT_YELLOW"),
		'F0FFF0' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_HONEYDEW"),
		'F0FFFF' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_AZURE"),
		'F0F8FF' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_ALICE_BLUE"),
		'E6E6FA' : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_LAVENDER"),
		'FFF'    : _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_WHILTE")
	},

	scayt :
	{
		title			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT"),
		opera_title		: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_OPERA"),
		enable			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_ENABLE"),
		disable			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_DISABLE"),
		about			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_ABOUT"),
		toggle			: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_TOGGLE"),
		options			: _SWEgetMessage("IDS_SWE_CKEDITOR_OPTIONS_TAB"),
		langs			: _SWEgetMessage("IDS_SWE_CKEDITOR_LANGS"),
		moreSuggestions	: _SWEgetMessage("IDS_SWE_CKEDITOR_MORE_SUGGESTIONS"),
		ignore			: _SWEgetMessage("IDS_SWE_CKEDITOR_IGNORE"),
		ignoreAll		: _SWEgetMessage("IDS_SWE_CKEDITOR_IGNORE_ALL"),
		addWord			: _SWEgetMessage("IDS_SWE_CKEDITOR_ADD_WORD"),
		emptyDic		: _SWEgetMessage("IDS_SWE_CKEDITOR_EMPTY_DIC"),

		optionsTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_OPTIONS_TAB"),
		allCaps			: _SWEgetMessage("IDS_SWE_CKEDITOR_ALL_CAPS"),
		ignoreDomainNames : _SWEgetMessage("IDS_SWE_CKEDITOR_IGNORE_DOMAIN_NAMES"),
		mixedCase		: _SWEgetMessage("IDS_SWE_CKEDITOR_MIXED_CASE"),
		mixedWithDigits	: _SWEgetMessage("IDS_SWE_CKEDITOR_MIXED_WITH_DIGITS"),

		languagesTab	: _SWEgetMessage("IDS_SWE_CKEDITOR_LANGUAGES_TAB"),

		dictionariesTab	: _SWEgetMessage("IDS_SWE_CKEDITOR_DICTIONARIES_TAB"),
		dic_field_name	: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_FIELD_NAME"),
		dic_create		: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_CREATE"),
		dic_restore		: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_RESTORE"),
		dic_delete		: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_DELETE"),
		dic_rename		: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_RENAME"),
		dic_info		: _SWEgetMessage("IDS_SWE_CKEDITOR_DIC_INFO"),

		aboutTab		: _SWEgetMessage("IDS_SWE_CKEDITOR_SCAYT_ABOUT")
	},

	about :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_ABOUT_CKEDITOR"),
		dlgTitle	: _SWEgetMessage("IDS_SWE_CKEDITOR_ABOUT_CKEDITOR"),
		help	    : _SWEgetMessage("IDS_SWE_CKEDITOR_HELP"),
		userGuide   : _SWEgetMessage("IDS_SWE_CKEDITOR_USER_GUIDE"),
		moreInfo	: _SWEgetMessage("IDS_SWE_CKEDITOR_MOREINFO"),
		copy		: _SWEgetMessage("IDS_SWE_CKEDITOR_COPYRIGHT")
	},

	maximize : _SWEgetMessage("IDS_SWE_CKEDITOR_MAXIMIZE"),
	minimize : _SWEgetMessage("IDS_SWE_CKEDITOR_MINIMIZE"),

	fakeobjects :
	{
		anchor		: _SWEgetMessage("IDS_SWE_CKEDITOR_ANCHOR"),
		flash		: _SWEgetMessage("IDS_SWE_CKEDITOR_FLASH_ANIMATION"),
		iframe		: _SWEgetMessage("IDS_SWE_CKEDITOR_IFRAME"),
		hiddenfield	: _SWEgetMessage("IDS_SWE_CKEDITOR_HIDDEN_FIELD"),
		unknown		: _SWEgetMessage("IDS_BHC_VALUE_UNKNOWN")
	},

	resize : _SWEgetMessage("IDS_SWE_CKEDITOR_RESIZE"),

	colordialog :
	{
		title		: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECT_COLOR"),
		options 	: _SWEgetMessage("IDS_SWE_CKEDITOR_COLOR_OPTIONS"),
		highlight	: _SWEgetMessage("IDS_SWE_CKEDITOR_HIGHLIGHT"),
		selected	: _SWEgetMessage("IDS_SWE_CKEDITOR_SELECTED_COLOR"),
		clear		: _SWEgetMessage("IDS_SWE_CKEDITOR_CLEAR")
	},

	toolbarCollapse	: _SWEgetMessage("IDS_SWE_CKEDITOR_TOOLBAR_COLLAPSE"),
	toolbarExpand	: _SWEgetMessage("IDS_SWE_CKEDITOR_TOOLBAR_EXPAND"),

	toolbarGroups :
	{
		document    : _SWEgetMessage("IDS_SWE_CKEDITOR_DOCUMENT"),
		clipboard   : _SWEgetMessage("IDS_SWE_CKEDITOR_CLIPBOARD"),
		editing     : _SWEgetMessage("IDS_SWE_CKEDITOR_EDITING"),
		forms       : _SWEgetMessage("IDS_SWE_CKEDITOR_FORMS"),
		basicstyles : _SWEgetMessage("IDS_SWE_CKEDITOR_BASIC_STYLES"),
		paragraph   : _SWEgetMessage("IDS_SWE_CKEDITOR_PARAGRAPH"),
		links       : _SWEgetMessage("IDS_SWE_CKEDITOR_LINKS"),
		insert      : _SWEgetMessage("IDS_SWE_CKEDITOR_INSERT"),
		styles      : _SWEgetMessage("IDS_SWE_CKEDITOR_STYLES_COMBO"),
		colors      : _SWEgetMessage("IDS_SWE_CKEDITOR_COLORS"),
		tools       : _SWEgetMessage("IDS_SWE_CKEDITOR_TOOLS")
	},

	bidi :
	{
		ltr         : _SWEgetMessage("IDS_SWE_CKEDITOR_BIDI_LTR"),
		rtl         : _SWEgetMessage("IDS_SWE_CKEDITOR_BIDI_RTL")
	},

	docprops :
	{
		label       : _SWEgetMessage("IDS_SWE_CKEDITOR_DOCUMENT_PROPERTIES"),
		title       : _SWEgetMessage("IDS_SWE_CKEDITOR_DOCUMENT_PROPERTIES"),
		design      : _SWEgetMessage("IDS_SWE_CKEDITOR_DESIGN"),
		meta        : _SWEgetMessage("IDS_SWE_CKEDITOR_META_TAGS"),
		chooseColor : _SWEgetMessage("IDS_SWE_CKEDITOR_CHOOSE"),
		other       : _SWEgetMessage("IDS_SWE_CKEDITOR_OTHER_DOT_DOT_DOT"),
		docTitle    : _SWEgetMessage("IDS_SWE_CKEDITOR_PAGE_TITLE"),
		charset     : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_ENCODING"),
		charsetOther : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_OTHER"),
		charsetASCII : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_ASCII"),
		charsetCE   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_CE"),
		charsetCT   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_CT"),
		charsetCR   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_CR"),
		charsetGR   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_GR"),
		charsetJP   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_JP"),
		charsetKR   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_KR"),
		charsetTR   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_TR"),
		charsetUN   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_UN"),
		charsetWE   : _SWEgetMessage("IDS_SWE_CKEDITOR_CHARSET_WE"),
		docType     : _SWEgetMessage("IDS_SWE_CKEDITOR_DOC_TYPE_HEADING"),
		docTypeOther : _SWEgetMessage("IDS_SWE_CKEDITOR_DOC_TYPE_OTHER"),
		xhtmlDec    : _SWEgetMessage("IDS_SWE_CKEDITOR_XHTML_DEC"),
		bgColor     : _SWEgetMessage("IDS_SWE_CKEDITOR_BGCOLOR"),
		bgImage     : _SWEgetMessage("IDS_SWE_CKEDITOR_BGIMAGE"),
		bgFixed     : _SWEgetMessage("IDS_SWE_CKEDITOR_BGFIXED"),
		txtColor    : _SWEgetMessage("IDS_SWE_CKEDITOR_TXT_COLOR"),
		margin      : _SWEgetMessage("IDS_SWE_CKEDITOR_MARGIN"),
		marginTop   : _SWEgetMessage("IDS_SWE_CKEDITOR_MARGIN_TOP"),
		marginLeft  : _SWEgetMessage("IDS_SWE_CKEDITOR_MARGIN_LEFT"),
		marginRight : _SWEgetMessage("IDS_SWE_CKEDITOR_MARGIN_RIGHT"),
		marginBottom : _SWEgetMessage("IDS_SWE_CKEDITOR_MARGIN_BOTTOM"),
		metaKeywords : _SWEgetMessage("IDS_SWE_CKEDITOR_META_KEYWORDS"),
		metaDescription : _SWEgetMessage("IDS_SWE_CKEDITOR_META_DESCRIPTION"),
		metaAuthor : _SWEgetMessage("IDS_SWE_CKEDITOR_META_AUTHOR"),
		metaCopyright : _SWEgetMessage("IDS_SWE_CKEDITOR_META_COPYRIGHT"),
		previewHtml : _SWEgetMessage("IDS_SWE_CKEDITOR_PREVIEW_HTML")
	}
};
