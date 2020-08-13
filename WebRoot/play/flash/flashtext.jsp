<%@ page contentType="text/html; charset=GBK" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String filename = request.getParameter("filename");
    filename = java.net.URLDecoder.decode(filename, "utf-8");
    String flapath = request.getParameter("flapath");
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>flash播放器</title>
    <style type="text/css">
        <!--
        .STYLE1 {
            font-size: 14px;
            font-weight: bold;
        }

        -->
    </style>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <jsp:include page="/js/config_pls_include.jsp"/>
    <script type="text/javascript" src="<%=path%>/newLogin/pages/youjiaoplay/js/swfobject.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/adapter/jquery/juery-v1-2-6.js"></script>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" scroll="no" style="background-color:#000000">
<div id="htmlHide" style="position: absolute;top: -50px;"></div>

<div class="btn">
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <h3 id="_flash">FLASH浏览</h3>
</div>

<table width="100%" height="94%" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <div class="players">
                <div id="flashContent"><p> 如果没有安装flashPlayer或者FlashPlayer版本太低。 </p></div>
            </div>
        </td>
    </tr>
</table>

<script type="text/javascript">
    var flapath = "<%=flapath%>";
    var filename = "<%=filename%>";
    try {
        if (flapath.length > 0) {
            if (flapath[0].text.length > 40) {
                _flash.innerHTML = flapath[0].text.substring(0, 40) + "...";
            } else {
                _flash.innerHTML = flapath[0].text;
            }
        }
    } catch (e) {
    }
    if (flapath.length == 0) {
        try {
            _flash.innerHTML = "没有可播放的资源!";
        } catch (e) {
            alert("没有可播放的资源!");
        }
    }
    flashContent.height = document.body.clientHeight - 40;

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

    var swfVersionStr = "11.1.0";
    // To use express install, set to playerProductInstall.swf, otherwise the empty string.
    var xiSwfUrlStr = "<%=path%>/newLogin/pages/youjiaoplay/playerProductInstall.swf";
    var mainflashpath = "<%=path%>/newLogin/pages/youjiaoplay/FlexPaperApp.swf";

    showFlexPager(encodeURIComponent(flapath), mainflashpath);

</script>
</body>
</html>
