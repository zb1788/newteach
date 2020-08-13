<%@ page contentType="text/html; charset=utf-8" %>
<%@page import="java.util.Map,java.util.List" %>
<%@page import="java.net.URLDecoder" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//获取相应参数
    String flist = (String) request.getAttribute("flist");
    String loginStyle = request.getParameter("loginStyle");
    String teachernumber = (String) request.getParameter("teachernumber");
    String rcode = (String) request.getParameter("rcode");
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
%>
<html>
<head>
    <title>文本播放器</title>
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
    <jsp:include page="/js/config_pls_include.jsp"/>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
    <jsp:include page="/play/play.jsp"/>
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" scroll="no" onload="toonload();"
      style="overflow:hidden">
<div id="_div2" style="width: 100%;height:95%;">
    <iframe width="100%" height="100%" name="_iframe" id="_iframe" src="" scrolling="auto"></iframe>
</div>
<div class="btn">
    <%if ("0".equals(loginStyle)) { %>
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <%} %>
    <h3 id="_flash"></h3>
</div>
<script>
    var file = null;
    var xmlname = null;
    var basePath = "<%=basePath%>";
    var teachernumber = "<%=teachernumber%>";
    var rcode = "<%=rcode%>";
    //负载地址
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1为json 2 xml
    //设置图片列表
    getLoadAddress(url, playRes);

    function playRes(flist) {
        if (flist == null || typeof (flist) == 'string') {
            _iframe.location = "<%=path%>/play/err.jsp";
            return;
        }
        if (flist && flist.length > 0) {
            file = flist[0];
            xmlname = file.path;
            xmlname = file.path;
            _iframe.location = xmlname;
            document.getElementById("_flash").innerHTML = flist[0].file_name;
        } else {
            //_iframe.location="<%=path%>/play/err.jsp";
        }
    }

    function tochangeerr() {
        var path = xmlname;
        try {
            if (path == "" || path == "null") {
                _iframe.location = "<%=path%>/play/err.jsp";
            }
        } catch (e) {
        }
    }

    function toonload() {
        try {
            _div2.style.display = '';
            maskAllall.style.display = 'none';
            tochangeerr();
        } catch (e) {
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
</script>
</body>
</html>
