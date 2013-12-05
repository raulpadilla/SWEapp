<%@ Language=VBScript %>
<HTML>
<HEAD>
<META NAME="GENERATOR" Content="Microsoft Visual Studio 6.0" charset="utf-8">
</HEAD>
<BODY BGCOLOR="#e0e0e0" >
<!-- #include file="strings.asp" -->
<script language="JavaScript" >
  function RadioButtonClicked(id)
         {
            if (id == "querybyname" && document.form.querybyname.status == true)
            {               
               document.form.result.disabled = true
               document.form.time.readOnly = true
               document.form.ip.readOnly = true
               document.form.username.readOnly = false
              
               document.form.result.style.backgroundColor = "silver"
               document.form.time.style.backgroundColor = "silver"
               document.form.ip.style.backgroundColor = "silver"
               document.form.username.style.backgroundColor = "white"
               
               document.form.time.value = "";
               document.form.ip.value = "";                             
            }
            else if (id == "querybyresult" && document.form.querybyresult.status == true)
            {
               document.form.username.readOnly = true
               document.form.time.readOnly = true
               document.form.ip.readOnly = true
               document.form.result.disabled = false
              
               document.form.username.style.backgroundColor = "silver"
               document.form.time.style.backgroundColor = "silver"
               document.form.ip.style.backgroundColor = "silver"
               document.form.result.style.backgroundColor = "white"
               
               document.form.time.value = "";
               document.form.ip.value = "";              
               document.form.username.value = "";            
            }
            else if (id == "querybytime" && document.form.querybytime.status == true)
            {
               document.form.result.disabled = true
               document.form.username.readOnly = true
               document.form.ip.readOnly = true
               document.form.time.readOnly = false
              
               document.form.result.style.backgroundColor = "silver"
               document.form.username.style.backgroundColor = "silver"
               document.form.ip.style.backgroundColor = "silver"
               document.form.time.style.backgroundColor = "white"
                                
               document.form.ip.value = "";              
               document.form.username.value = "";            
            }           
            else if (id == "querybyip" && document.form.querybyip.status == true)
            {
               document.form.result.disabled = true
               document.form.time.readOnly = true
               document.form.username.readOnly = true
               document.form.ip.readOnly = false
              
               document.form.result.style.backgroundColor = "silver"
               document.form.time.style.backgroundColor = "silver"
               document.form.username.style.backgroundColor = "silver"
               document.form.ip.style.backgroundColor = "white"
               
               document.form.time.value = "";               
               document.form.username.value = "";            
            }
            else if (id == "All")
            {
               document.form.result.disabled = true
               document.form.time.readOnly = true
               document.form.ip.readOnly = true
               document.form.username.readOnly = true
              
               document.form.result.style.backgroundColor = "silver"
               document.form.time.style.backgroundColor = "silver"
               document.form.ip.style.backgroundColor = "silver"
               document.form.username.style.backgroundColor = "silver"
               
               document.form.time.value = "";
               document.form.ip.value = "";              
               document.form.username.value = "";            
            }
         }
         
</script>
<%
   Dim uFname, rFname
   uFname = "c:\patchusers.txt"
   rFname = "c:\installresult.txt"	
   Dim queryStyle,querystylename,querystyleresult,querystyleip,querystyleall,querystyletime
   Dim respname, respresult,respip,resptime,successSelected, failSelected,incompleteSelected
   querystylename = ""
   querystyleresult = ""
   querystyleip = ""
   querystyleall = ""
   querystyletime = ""   
   successSelected = ""
   failSelected = ""
   respname = Request.Form("username").item
   respresult = Request.Form("result").item   
   if respresult = IDS_SUCCESS then
       successSelected = "SELECTED"
   elseif respresult = IDS_FAILURE then
       failSelected = "SELECTED"
   elseif respresult = IDS_INCOMPLETE then       
       incompleteSelected = "SELECTED"
   end if
   respip = Request.Form("ip").item
   resptime = Request.Form("time").item
   queryStyle = Request.Form("radio").item
   if queryStyle = "" then
      queryStyle = Session("QUERYSTYLE")
   end if
   if queryStyle = "querybyname" then
      querystylename = "CHECKED"  
   elseif querystyle = "querybyresult" then
      querystyleresult = "CHECKED"      
   elseif querystyle = "querybyip" then
      querystyleip = "CHECKED"      
   elseif querystyle = "querybytime" then
      querystyletime = "CHECKED"      
   elseif querystyle = "queryall" then
      querystyleall = "CHECKED"
   end if
   
%>
    <script language="JavaScript" >
         function ValidateStyle()
         {            
            if (document.form.querybyname.status == true)             
            {                            
              return true;
            }
            else if (document.form.querybyresult.status == true)
            {                
               if (document.form.result.value != "<%=IDS_SUCCESS%>" && document.form.result.value != "<%=IDS_FAILURE%>" && document.form.result.value != "<%=IDS_INCOMPLETE%>" )
               {
                 alert("<%=IDS_ERR_RESULT_VALUE%>");
                 return false;
               }              
            }
            else if (document.form.querybytime.status == true)
            {               
               if (document.form.time.value == "")
               {
                  alert("<%=IDS_ERR_DATE_FORMAT%>");
                  return false;
               }              
            }
            else if (document.form.querybyip.status == true)
            {             
               if (document.form.ip.value == "")
               {
                  alert("<%=IDS_ERR_IP_FORMAT%>");
                  return false;
               }
            }
            else if (document.form.queryall.status == false)
            {
               alert("<%=IDS_ERR_DISPLAY_STYLE%>");
               return false;
            }            
            return true;
         }  
         
                  
    </script>
	<form name="form" method="POST" action="PatchAdmin.asp" onSubmit="return ValidateStyle();" >
	   <center><p><font size=3> <b><%=IDS_TITLE%></b> </font></p> </center><br>
	   <p><font size=3> <b><%=IDS_SELECT_DISPLAY%> </b> </font></p> <br>
	   <table width="100%" cellpadding=0 cellspacing=0 border=0 >
	   <tr >
	   <td valign="left" width="40%"><input id="querybyname" type=radio name=radio onclick="RadioButtonClicked('querybyname')"  value="querybyname" <%=querystylename%> ><%= IDS_DISPLAY_BY_NAME %></input></td>
	   <td valign="left" width="20%" ><b><%=IDS_USER_NAME%> </b></td>
	   <td valign="left" width="40%"><input type="textbox" name="username" value=<%=respname%>></td>
	   </tr>
	   <tr >
	   <td valign="left" width="40%"><input id="querybyresult" type=radio name=radio onclick="RadioButtonClicked('querybyresult')" value="querybyresult" <%=querystyleresult%> ><%= IDS_DISPLAY_BY_RESULT %></input></td>
	   <td valign="left" width="20%" ><b><%=IDS_RESULT%></b></td>
	   <td valign="left" width="40%"><select  name="result"><option value="<%=IDS_SUCCESS%>" <%=successSelected%> ><%=IDS_SUCCESS%></option><option value="<%=IDS_FAILURE%>" <%=failSelected%> ><%=IDS_FAILURE%></option><option value="<%=IDS_INCOMPLETE%>" <%=incompleteSelected%> ><%=IDS_INCOMPLETE%></option></select></td>
	   </tr>
	   <tr >
	   <td valign="left" width="40%"><input id="querybytime" type=radio name=radio onclick="RadioButtonClicked('querybytime')" value="querybytime" <%=querystyletime%> ><%=IDS_DISPLAY_BY_DOWNLOAD_DATE %></input></td>
	   <td valign="left" width="20%"><b><%=IDS_DATE %></b></td>
	   <td valign="left" width="40%"><input type="textbox" name="time" value=<%=resptime%>></td>
	   </tr>
	   <tr >
	   <td valign="left" width="40%"><input id="querybyip" type=radio name=radio onclick="RadioButtonClicked('querybyip')" value="querybyip" <%=querystyleip%> ><%=IDS_DISPLAY_BY_IP %></input></td>
	   <td valign="left" width="20%"><b><%=IDS_IP_ADDRESS%></b></td>
	   <td valign="left" width="40%"><input type="textbox" name="ip" value=<%=respip%> ></td>
	   </tr>
	   <tr >
	   <td valign="left" width="40%"><input id="queryall" type=radio name=radio onclick="RadioButtonClicked('All')" value="queryall" <%=querystyleall%> ><%= IDS_DISPLAY_ALL %></input></td>
	   <td valign="left" width="20%">&nbsp;</td>
	   <td valign="left" width="40%">&nbsp;</td>
	   </tr>	   
	   </table><br>
	   <center><input type="submit" name="submit" value="<%=IDS_SUBMIT%>"/></center>
	</form> <br><br>
<%
if queryStyle = "querybyname" then  
%>
     <script language="JavaScript">
      RadioButtonClicked("querybyname");
     </script>
<%          
   elseif querystyle = "querybyresult" then      
%>
     <script language="JavaScript">
      RadioButtonClicked("querybyresult");
     </script>
<%       
   elseif querystyle = "querybyip" then      
%>
     <script language="JavaScript">
      RadioButtonClicked("querybyip");
     </script>
<%       
   elseif querystyle = "querybytime" then      
%>
     <script language="JavaScript">
      RadioButtonClicked("querybytime");
     </script>
<%       
   elseif querystyle = "queryall" then      
%>
     <script language="JavaScript">
      RadioButtonClicked("All");
     </script>
<%       
   end if
      
      Dim res
      Session("QUERYSTYLE") = querystyle
      if querystyle = "querybyname" then
         Dim uName
         uName = Request.Form("username").Item         
         res = DisplayByName(uName,uFname,rFname)         
      elseif querystyle = "querybyresult" then
         Dim result
         result = Request.Form("result").Item         
         res = DisplayByResult(result,uFname,rFname)         
      elseif querystyle = "querybytime" then
         Dim time
         time = Request.Form("time").Item         
         res = DisplayByTime(time,uFname,rFname)         
      elseif querystyle = "querybyip" then
         Dim ip
         ip = Request.Form("ip").Item         
         res = DisplayByIP(ip,uFname,rFname)         
      elseif querystyle = "queryall" then         
         res = DisplayAll(uFname,rFname)
      end if
         
   
%>

<P>&nbsp;</P>
<!-- #include file="util.asp" -->
</BODY>
</HTML>
