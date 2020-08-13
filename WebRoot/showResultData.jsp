<%@page contentType="application/json; charset=UTF-8"%><%
response.setContentType("application/json");
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
String data=(String)request.getParameter("data");
if(data!=null){
	out.print(data);
}else{
	out.print("error! data is NULL!");
}
%>