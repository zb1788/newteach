<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>Login ERROR</title>

</head>

<body>
<script type="text/javascript">
    alert("�û���֤��Ϣ�쳣!");
    window.location.href = "gobackmy://";
</script>
</body>
</html>
