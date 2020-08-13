<%@ page contentType="text/html; charset=gbk" %>
<%@page import="java.util.Map,java.util.List" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//获取相应参数
    String flist = (String) request.getAttribute("flist");
    System.out.println(flist);
    String loginStyle = request.getParameter("loginStyle");
    String linkType = (String) request.getAttribute("linkType");
    String sso_ut = (String) request.getParameter("sso_ut");
    if (sso_ut == null) {
        sso_ut = "";
    }
    if (null == linkType) {
        linkType = "1";
    }
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
%>
<html>
<head>
    <title>链接资源</title>
    <style type="text/css">
        <!--
        .STYLE1 {
            font-size: 14px;
            font-weight: bold;
        }

        #maskAllall {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1000;
            background: #fff;
        }

        #waithtml {
            top: 300px;
            left: 400px;
            position: absolute;
            font-size: 14px;
            font-weight: bold;
        }

        -->
    </style>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/common.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/adapter/jquery/juery-v1-2-6.js"></script>
    </div>
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" scroll="no" style="overflow:hidden">
<%if ("0".equals(loginStyle)) {%>
<jsp:include page="/inc/ieBrowser.jsp" flush="true">
    <jsp:param value="<%=loginStyle%>" name="loginStyle"/>
</jsp:include>
<!-- 插件面板 -->
<% }%>
<div id="_div2" style="width: 100%;height:92%;">
</div>
<div class="btn">
    <%if ("0".equals(loginStyle)) { %>
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <%} %>
    <h3 id="_flash"></h3>
</div>
<script type="text/javascript">
    var loginStyle = "<%=loginStyle%>";
    var linkType = "<%=linkType%>";
    var flist =<%=flist%>;

    var ut = "<%=sso_ut%>";
    if (ut == "") {
        ut = readCookie("sso_ut");
    }
    if (flist.length > 0) {
        var file = flist[0];
        var path = file.path;
        if (linkType == "2") {
            path += "&ut=" + ut;
        }
        if (0 == loginStyle) {
            var ret = _common.openByIE(path);
            setTimeout(function () {
                window.location.href = 'close:///';
            }, 500);
        } else {
            window.open(path);
            setTimeout(function () {
                window.close();
            }, 500);
        }
    } else {
        document.getElementById("_flash").innerHTML = "资源播放失败";
    }

    function closePage() {
        if ("1" == loginStyle) {
            window.close();
        } else {
            window.location.href = 'close:///';
        }
    }

    function tocloseorbg(obj, type) {
        if (type == 1) {
            window.location.href = "close://";
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

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
</script>
</body>
</html>