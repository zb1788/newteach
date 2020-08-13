<%@ page contentType="text/html; charset=GBK" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <title>flash²¥·ÅÆ÷</title>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" scroll="no">

<div class="btn">
   	<span>
       	<div class="btnA"></div>
           <div class="btnC"></div>
     </span>
    Í¼Æ¬ä¯ÀÀ
</div>

</body>
</html>
