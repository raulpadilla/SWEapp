<html><body>
<h3>Upload Processed</h3>

<%
' This code is available for modification.
' Modify to follow the requirements of your server.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

Dim g_LogicalRefDestination
Dim g_objUpload
Dim g_binaryFormData 

ActOnPost

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

Sub ActOnPost()
	On Error Resume Next 

	Err.Clear

	Set g_objUpload = CreateObject("eWepAutoSvr5.EkFile")
	if g_objUpload is Nothing then
		CreateUploadErrorResponse("The eWepAutoSvr5.dll module could not be loaded.  It may not exist or it is not registered.")
		exit sub
	end if

	BinaryReadPackage
	if 0 <> Err.Number then
		CreateUploadErrorResponse("Could not read the binary packet data from the post.")
		exit sub
	end if

	CreateVirtualDestination  ' Sets up the Web path
	if 0 <> Err.Number then
		CreateUploadErrorResponse("Could not create the path to receive the uploaded files.  " & _
			"Please check permissions on file creation and folder writing.")
		exit sub
	end if

	'Recieve and save the files
	ProcessSubmittedForm
End Sub

'''''''''''''''''''''''''''''''''''''''''''''''''
' This function will Read the Post Information and detect errors.
' Only ASP should use this mechanism.
Sub BinaryReadPackage()
	On Error resume next
	Err.Clear
	g_binaryFormData = Request.BinaryRead(Request.TotalBytes)	
	If Err.Number <> 0 Then
		If -2147467259 = Err.Number Then
			response.write("Error: The file being upload is larger than what is allowed in IIS. " & _
				"Please change the ASPMaxRequestEntityAllowed entry to a larger value in the metabase.xml file (usually located in c:\windows\system32\inetsrv)." & _
				chr(13) & chr(10) & "<br/>")
		End If
		response.write(Err.Description)
	End If
End Sub		
	
'''''''''''''''''''''''''''''''''''''''''''''''''
' Examines the submitted for to determine what 
' the client is uploading and to perform the
' appropriate operation.
Sub ProcessSubmittedForm()
	Dim strCommand
	Dim ErrorCode
	
	' Extract the "actiontyp" field.
	' This contains the upload command.
	strCommand = g_objUpload.EkFormFieldValue(g_binaryFormData, "actiontyp", ErrorCode)
	
	' These are the possible commands:
	If strCommand = "uploadfile" Then
		ReceiveSubmittedFiles
	ElseIf strCommand = "uploadcontent" Then
		ReceiveContent
	End If
End Sub
	
'''''''''''''''''''''''''''''''''''''''''''''''''
' This function will receive the files and send back
' the required response data.  There is no processing
' of the files and there is no affecting the file data.
Sub ReceiveSubmittedFiles()
	On Error Resume Next
	Dim fileObj
	Dim ErrorCode
	Dim strPhysPath
	Dim fs

	strPhysPath =  Server.MapPath(g_LogicalRefDestination)

	Set fs = Server.CreateObject("Scripting.FileSystemObject")
	if fs is nothing then
		CreateUploadErrorResponse("Could not create the FileSystemObject for file copy.  " & _
			"Please set the permissions on the upload folder to allow browsing and writing by IIS and ASP users.  " & _
			strPhysPath & "] ")
		Set fs=nothing
		Exit Sub
	end if
	If true <> fs.FolderExists(strPhysPath) Then
		CreateUploadErrorResponse("Could not save the file onto the server.  The folder """ & _
			strPhysPath & _
			""" does not exist.  Please create the folder to store the files on the server.")
		Set fs=nothing
		Exit Sub
	End If
	Set fs = nothing

	strNewFileName = g_objUpload.EkFileSave(g_binaryFormData, "uploadfilephoto", _
			strPhysPath, ErrorCode, "makeunique")
	
	Set fileObj = g_objUpload.FileObject(1)
	if not fileObj is Nothing then
		' If you are using a port you will need to add the
		' port to the file path:
		'      & ":" & Request.ServerVariables("SERVER_PORT") 
		strNewFileName = fileObj.FileName()
		fileObj.FileUrl("HTTP://" & Request.ServerVariables("SERVER_NAME") & g_LogicalRefDestination & _
			"/" & fileObj.FileName())
	Else
		strNewFileName = "No File Selected"
	End If
	
	If 0 <> Err.Number or 0 <> ErrorCode then
		CreateUploadErrorResponse("(" & ErrorCode & ") Could not save the file onto the server after the upload.  Please check permissions. -- """ & _
			strPhysPath & strNewFileName & """ -- ")
	Else
		Response.Write("<p><b>Successfully uploaded and stored file.</b></p><p>The file resides at:<br />" & _
			g_LogicalRefDestination & "/" & strNewFileName & "</p>" & _
			g_objUpload.ResponseData()) 
	End If	
End Sub

'''''''''''''''''''''''''''''''''''''''''''''''''
' This routine processes the submission of the 
' content contained within the eWebEditPro editor.
Sub ReceiveContent()
	Dim strResp
	Dim ErrorCode
	
	strResp = strResp & "<H2>Content Successfully Received</h2>"
	strResp = strResp & "<p style='color:red'>However, the sample page that received the content <i>does not</i> save the posted content on the server.</p>"
	strResp = strResp & "<p style='color:red; font:bold'>The content is not saved.</p>"
	strResp = strResp & "<p style='color:red'>Modify the sample receiving page to save the content or specify another receiving page that does save the content.</p>"
	strResp = strResp & "<p style='color:red; font:bold'>Click on 'Undo' to restore your content.</p>"
	strResp = strResp & "<br>"
	strResp = strResp & "Content Title:&nbsp;&nbsp;" & g_objUpload.EkFormFieldValue(g_binaryFormData, "content_title", ErrorCode) & "<br>"
	strResp = strResp & "Content Size:&nbsp;&nbsp;" & g_objUpload.EkFormFieldValue(g_binaryFormData, "content_size", ErrorCode) & "<br>"
	strResp = strResp & "Content Description:&nbsp;&nbsp;" & g_objUpload.EkFormFieldValue(g_binaryFormData, "content_description", ErrorCode) & "<br>"
	
	strResp = strResp & "Content Type:&nbsp;&nbsp;" & g_objUpload.EkFormFieldValue(g_binaryFormData, "content_type", ErrorCode)
	strResp = strResp & "<br>"

	strResp = strResp & "<H3>Submitted Content Below</h3><hr>"
	strResp = strResp & Server.HTMLEncode(g_objUpload.EkFormFieldValue(g_binaryFormData, "content_text", ErrorCode))
	
	strResp = strResp & "<hr>"
	
	Response.Write(strResp)
End Sub

'''''''''''''''''''''''''''''''''''''''''''''''''
' This is where the files will be seen from the web,
' NOT the physical disk drive location.
Sub CreateVirtualDestination()
	Dim strCur, strDirs, iMax, idx
	Dim ErrorCode
	
	g_LogicalRefDestination = g_objUpload.EkFormFieldValue(g_binaryFormData, "editor_media_path", ErrorCode)
	If len(g_LogicalRefDestination) = 0 then
		' A directory was not sent to us.
		strCur = Request.ServerVariables("URL")
		strDirs = Split(strCur, "/")
		iMax = UBound(strDirs) 
		If iMax > 0 Then
			idx = 1
			strCur = strDirs(0)
			while idx < iMax
				strCur = strCur & "/" & strDirs(idx)
				idx = idx + 1
			Wend
			g_LogicalRefDestination = strCur & "/upload"
		Else
			'Could not split the directory.
			g_LogicalRefDestination = "/ewebeditpro5/upload"
		End If
	End If
	
End Sub

' This error response routine shows how to create the XML packet.
' In ASP the packet can be created by using g_objUpload.ResponseData().
' If you need to create your own response data packet then this
' is the format. 
Sub CreateUploadErrorResponse(strErrMsg)
	Response.Write("<p>ERROR:  "  & strErrMsg & "  [" & Err.Description & "]" & "</p>")

	' This is the packet used by eWebEditPro.
        Response.Write("<XML ID=EktronFileIO>" & vbCrLf)
        Response.Write("<UPLOAD>" & vbCrLf)
        Response.Write("<FILEINFO ID=""0"" discard=""False"">" & vbCrLf)
        Response.Write("<FSRC></FSRC>" & vbCrLf)
        Response.Write("<FURL></FURL>" & vbCrLf)
        Response.Write("<FID></FID>" & vbCrLf)
        Response.Write("<FSIZE></FSIZE>" & vbCrLf)
        Response.Write("<DESC></DESC>" & vbCrLf)
        Response.Write("<THUMBURL></THUMBURL>" & vbCrLf)
        Response.Write("<THUMBHREF></THUMBHREF>" & vbCrLf)
        Response.Write("<FTYPE></FTYPE>" & vbCrLf)
        Response.Write("<DWIDTH>0</DWIDTH>" & vbCrLf)
        Response.Write("<DHEIGHT>0</DHEIGHT>" & vbCrLf)
        Response.Write("<DBORDER>0</DBORDER>" & vbCrLf)
        Response.Write("<FRAGMENT></FRAGMENT>" & vbCrLf)
        Response.Write("<FERROR value=""" & Err.Number & """>" & strErrMsg & "  [" & Err.Description & "]" & "</FERROR>" & vbCrLf)
        Response.Write("</FILEINFO>" & vbCrLf)
        Response.Write("</UPLOAD>" & vbCrLf)
        Response.Write("</XML>" & vbCrLf)
End Sub

'''''''''''''''''''''''''''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''
' Below is an example of how you process
' the uploaded files and send back other
' file information such as thumbnail values.
'Sub CreateThumbnailsFromFiles()
'    Dim iClientMajorRev, iClientMinorRev, iFileCount
'    Dim g_binaryFormData, g_objUpload, fileObj, g_LogicalRefDestination
'    Dim strNewFileName, strFileLoc, ErrorCode, iFileIdx
' 
'    g_binaryFormData = Request.BinaryRead(Request.TotalBytes)
'    set g_objUpload = CreateObject("EwepTransfer.EkFile")
'	
'    strNewFileName = g_objUpload.EkFileSave(g_binaryFormData, "uploadfilephoto", _
'        Server.MapPath(g_LogicalRefDestination), ErrorCode, "makeunique")
'		
'    iFileCount = g_objUpload.FileCount()
'    If iFileCount > 0 then
'		Set fileObj = g_objUpload.FileObject(1)
'		strNewFileName = fileObj.FileName()
'		strFileLoc = "HTTP://" & Request.ServerVariables("SERVER_NAME") & g_LogicalRefDestination & "/" & strNewFileName
'		fileObj.FileUrl(strFileLoc)
'		fileObj.Thumbnail(CreateThumbnail(strFileLoc))
'		fileObj.ThumbReference(ExtractThumbnailRef(strFileLoc))
'    End If
'		
'    'Example of retrieving data sent from the client.
'    iClientMajorRev = g_objUpload.ClientMajorRev()
'    iClientMinorRev = g_objUpload.ClientMinorRev() 
'		
'    Response.Write(g_objUpload.ResponseData()) 
'	
'End Sub
%> 

</body></html>

