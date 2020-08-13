<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.net.URLDecoder" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String filepath = request.getParameter("filepath");
    String loginStyle = request.getParameter("loginStyle");
    String title = request.getParameter("title");
    if (title != null && !title.equals("")) {
        title = URLDecoder.decode(title, "utf-8");
    }
    if (filepath != null) {
        filepath = filepath.replaceAll("\"", "\\\"").replaceAll("\'", "\\\'");
    }
    String templateId = (String) session.getAttribute("templateId");
    boolean isTv = "2".equals(templateId);
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>导学应用</title>
    <meta http-equiv="x-ua-compatible" content="IE=EmulateIE7"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
    <style type="text/css">
        <!--
        .STYLE1 {
            font-size: 14px;
            font-weight: bold;
        }

        -->
    </style>
    <script type="text/javascript">
        function ResumeError() {
            return true;
        }

        window.onerror = ResumeError;
    </script>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" style="overflow:hidden;">
<div id="htmlHide" style="position: absolute;top: -50px;"></div>
<%if ("0".equals(loginStyle)) {%>
<iframe src='' width="100%" height="95%" id="iframe2"></iframe>
<%} else {%>
<div id="frameDiv" style="width:1020px;height:700px;">
    <iframe src='' width="100%" scrolling="auto" height="100%" id="iframe2"></iframe>
</div>
<% }%>

<div class="btn" id="btn">
    <%if ("0".equals(loginStyle)) {%>
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <%}%>
    <h3 id="_flash"><%=title%>
    </h3>
</div>
<script type="text/javascript">
    var loginStyle = "<%=loginStyle%>";
    if (loginStyle == 1) document.getElementById("btn").innerHTML = '<h3 id="_flash"><%=title%></h3>';
    try {
        document.getElementById("iframe2").src = '<%=filepath %>';
    } catch (e) {
    }
    iframe2.height = document.body.clientHeight - 60;

    function tocloseorbg(obj, type) {
        if (type == 1) {
            if (loginStyle == 0) window.location.href = "close://";
            else window.close();
        } else {
            if (obj.className.indexOf("btnA") >= 0) {
                obj.className = "btnB";
                window.location.href = "max://";
            } else {
                obj.className = "btnA";
                window.location.href = "recover://";
            }
        }
    }

    function tochangebg(obj, type) {
        if (type == 1) {
            obj.className = "playCloseH";
        } else {
            obj.className = "playClose";
        }
    }

    window.onresize = function () {
        changeWindow();
    }

    function changeWindow() {
        if (loginStyle == 0) {
            document.getElementById("iframe2").style.height = document.body.clientHeight - 55;
        } else {
            document.getElementById("frameDiv").style.height = window.screen.availHeight - 75;
            document.getElementById("frameDiv").style.width = window.screen.availWidth - 15;
        }
    }

    changeWindow();
</script>
</body>
</html>
