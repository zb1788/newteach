<%@page import="java.net.URLDecoder" %>
<%@ page contentType="text/html; charset=gbk" %>
<%@ page import="java.util.*" %>
<%@page import="vcom.util.ParseXml" %>
<%


    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String eptpath = request.getServerName() + ":" + request.getServerPort() + path + "/";
//负载地址
    String flist = (String) request.getAttribute("flist");
    String eptFlag = (String) request.getParameter("eptFlag");
    String loginStyle = (String) request.getParameter("loginStyle");
    String teachernumber = (String) request.getParameter("teachernumber");
    String rcode = (String) request.getParameter("rcode");
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <title>ept资源播放</title>
    <style type="text/css">
        .STYLE2 {
            color: #C3C1C2;
            font-weight: bold;
        }
    </style>
    <jsp:include page="/js/config_pls_include.jsp"/>
    <link href="<%=path%>/style/style.css" rel="stylesheet" type="text/css"/>
</head>
<script type="text/javascript" src="<%=path%>/js/vcomplayer.js"></script>
<script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
<script type="text/javascript" src="<%=path%>/play/ept/player.js"></script>
<jsp:include page="/play/play.jsp"/>
<body topmargin="0" leftmargin="0" scroll="no">
<div id="htmlHide" style="position: absolute; top: -50px;"></div>
<table width="100%" height="92%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td valign="top">
            <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td height="3"></td>
                </tr>
                <tr>
                    <td id="uploadlist">
                        <object classid="clsid:12A7666F-D12A-41B0-AB96-B886571BE863"
                                codebase="eptviewer.cab#version=2,5,2012,9"
                                width="100%"
                                height="100%"
                                hspace="0"
                                vspace="0"
                                id="eptviewer">
                        </object>
                    </td>
                </tr>
                <tr>
                    <td height="23" align="center"
                        bgcolor="#474546">
                        <span class="STYLE2" id="_filename"></span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<script for="VCOMPlayer" language="JavaScript" event="PlayerEvent(EventID,EventData)">
    if (EventID == 20) {
        if (EventData == 1) {//esc
            window.location.href = "recover://"
        } else if (EventData == 2) {
            window.location.href = "close://"
        } else if (EventData == 3) {
            window.location.href = "recover://"
        } else if (EventData == 4) {
            window.location.href = "max://"
        }
    } else if (EventID == 5) {
        if (EventData == "播放结束") {
            window.location.href = "recover://"
        }
    }
</script>
<div class="btn">
    <%if ("0".equals(loginStyle)) {%>
    <span>
          <div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
               onclick="tocloseorbg(this,2);"></div>
		  <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
               onclick="tocloseorbg(this,1);"></div>
     </span><%} %>
    ept资源播放
</div>
<script>
    var basePath = "<%=basePath%>";
    var eptFlag = "<%=eptFlag%>";
    var teachernumber = "<%=teachernumber%>";
    var rcode = "<%=rcode%>";
    //授课预览只支持方式2播放
    if ("<%=loginStyle%>" == 1) {
        eptFlag = 2;
    }
    window.onresize = function () {
        if (document.body.clientWidth > 900) {
            bigwindow.className = "btnB";
        } else {
            bigwindow.className = "btnA";
        }
    }
</script>
<script type="text/javascript">
    var eptpath = "<%=eptpath%>/play/ept";
    var flist =<%=flist%>;
    var filename = "";
    var file = "";
    var xmlname = "";
    //负载地址
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1为json 2 xml
    //设置图片列表
    getLoadAddress(url, setListByJson);

    function setListByJson(flist) {
        if (flist == null) {
            document.getElementById("_filename").innerHTML = "[没有可播放的资源]";
            return;
        } else if (typeof (list) == 'string') {
            document.getElementById("_filename").innerHTML = "[" + flist + "]";
            return;
        }
        if (flist && flist.length > 0) {
            file = flist[0];
            filename = file.file_name;
            xmlname = file.path;
            document.getElementById("_filename").innerHTML = filename;
            playRes(flist);
        }
    }

</script>
</body>
</html>
