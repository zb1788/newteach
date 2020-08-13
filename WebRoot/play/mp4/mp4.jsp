<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@page import="vcom.util.ParseXml" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String ksId = (String) request.getParameter("ksId");
    String rFormat = (String) request.getParameter("rFormat");
    String catalogId = (String) request.getParameter("catalogId");
    String start = (String) request.getParameter("startTime");
    String linkType = (String) request.getAttribute("linkType");
    String teachernumber = (String) request.getParameter("teachernumber");
    String rcode = (String) request.getParameter("rcode");
    String type = (String) request.getParameter("type");//资源类型
    String loadUrl = (String) request.getParameter("loadUrl");//资源类型

    if (!"4".equals(linkType)) {
        linkType = "0";
    }
    String loginStyle = request.getParameter("loginStyle");
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
    if (start == null) start = "0";
    int startTime = (int) Float.parseFloat(start.equals("") ? "0" : start);
    String end = (String) request.getParameter("endTime");
    if (end == null) end = "0";
    int endTime = (int) Float.parseFloat(end.equals("") ? "0" : end);
    String versionpath = ParseXml.getXmlNode("vcomplayer");
    String vcomPlayerId = "clsid:AA0F838C-A6A3-44C8-B734-8189CA67A351";
    if ("1".equals(loginStyle)) {
        vcomPlayerId = "clsid:301DF37A-FEC8-41c9-AC7D-5D68E64EEC27";
    }
    String flist = (String) request.getAttribute("flist");
//String filename=(String)request.getAttribute("filename");
    String filename = flist;
    if (filename != null && filename.trim().length() > 0) {
        filename = URLDecoder.decode(filename, "UTF-8");
    } else {
        filename = (String) request.getAttribute("filename");
    }
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>预览</title>
    <style>
        .STYLE2 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
    <link href="<%=path%>/style/style.css" rel="stylesheet" type="text/css"/>
    <jsp:include page="/js/config_pls_include.jsp"/>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
    <jsp:include page="/play/play.jsp"/>

</head>
<script src="<%=basePath%>js/vcomplayer.js" type="text/javascript"></script>
<body topmargin="0" leftmargin="0" scroll="no">
<script type="text/javascript">
    var basePath = "<%=basePath%>";
    var teachernumber = "<%=teachernumber%>";
    var rcode = "<%=rcode%>";
    var opentupe = "1-1";
    var loginStyle = "<%=loginStyle%>";
    var loadUrl = "<%=loadUrl%>";
    var type = "<%=type%>";

    function intSize() {
        var ww = document.body.clientWidth;
        var wh = document.body.clientHeight;
        var playdiv = document.getElementById("playDiv");
        playdiv.style.height = (wh - 70) + "px";
//	document.getElementById("VCOMPlayer").height=playdiv.style.height;
    }

    //141105PAD隐藏视频、图片下部菜单按钮，由客户端展示

    function playRes(data) {
        if (data == null || data == undefined || data.length == 0) {
            _filename.innerHTML = "[没有可播放的资源]";
            return;
        } else if (typeof (data) == 'string') {
            _filename.innerHTML = "[" + data + "]";
            return;
        }
        var _url = data[0].path;
        var linkType = data[0].linkType;
        if (_url == "") _filename.innerHTML = "[没有可播放的资源]";
        var file_name = data[0].file_name;
        _filename.innerHTML = file_name;

        var playversion = "<%=versionpath%>";
        delayInit(_url, file_name);
    }

    function delayInit(_url, file_name, format) {
        playerObj.URL = _url;
        playerObj.startPlayTime = '<%=startTime / 1000%>';
        playerObj.endPlayTime = '<%=endTime / 1000%>';

        playerObj.name = file_name;
        playerObj.movieId = '<%=ksId%>';
        playerObj.RTypecode = '<%=type%>';
        playerObj.RFormat = '<%=rFormat%>';
        playerObj.catalogId = '<%=catalogId%>';
        playerObj.movieName = file_name;
        playerObj.playerUrl = '<%=basePath%>vcomueduplayer.exe';
        playerObj.playerClientUrl = '<%=basePath%>PstimWebClient.exe';
        setTimeout("playerObj.initPlayInfo()", 1000);

    }

    function tocloseorbg(obj, type) {
        if (type == 1) {
            window.location.href = "close://";
        } else {
            if (obj.className.indexOf("btnA") >= 0) {
                window.location.href = "max://";
                obj.className = "btnBH";
            } else {
                obj.className = "btnAH";
                window.location.href = "recover://";
            }
        }
    }

    function tochangebg(obj, type) {
        if (type == 1 || type == 2) {
            if (obj.className == "btnA") {
                obj.className = "btnAH";
            } else if (obj.className == "btnAH") {
                obj.className = "btnA";
            } else if (obj.className == "btnB") {
                obj.className = "btnBH";
            } else if (obj.className == "btnBH") {
                obj.className = "btnB";
            } else if (obj.className == "btnC") {
                obj.className = "btnCH";
            } else if (obj.className == "btnCH") {
                obj.className = "btnC";
            }
        }
    }

    window.onresize = function () {
        var wh = document.body.clientHeight;
        var playdiv = document.getElementById("playDiv");
        if (document.body.clientWidth > 700)
            VCOMPlayer.FullScreen = true;
        else
            VCOMPlayer.FullScreen = false;

        if (VCOMPlayer.FullScreen == false)
            wh = wh - 70
        playdiv.style.height = (wh) + "px";

        var bigwindow = document.getElementById("bigwindow");
        if (document.body.clientWidth > 900 && typeof (bigwindow) != "undefined" && bigwindow != null) {
            bigwindow.className = "btnB";
        } else {
            bigwindow.className = "btnA";
        }
    }
</script>
<div id="htmlHide" style="position: absolute; top: -50px;"></div>
<div id="playDiv" style="width:100%;">
    <OBJECT CLASSID="<%=vcomPlayerId%>" CODEBASE="<%=basePath%>vcomplayer/plugins/no/VCOMPlayer.CAB#version=1,0,0,1"
            ID="VCOMPlayer" Name="VCOMPlayer" width='100%' height='100%'>
    </OBJECT>
</div>
<script for="VCOMPlayer" language="JavaScript" event="PlayerEvent(EventID,EventData)">
    if (EventID == 20) {
        if ("1" == loginStyle) {
            return;
        }
        if (EventData == 1) {
            window.location.href = "recover://"
        } else if (EventData == 2) {
            window.location.href = "close://"
        } else if (EventData == 3) {
            window.location.href = "recover://"
        } else if (EventData == 4) {
            window.location.href = "max://"
        }
    } else if (EventID == 5) {
        if ("1" == loginStyle) {
            return;
        }
        if (EventData == "播放结束") {
            window.location.href = "recover://"
        }
    }
</script>
<script for="VCOMPlayer" language="JavaScript" event="onload();">
    intSize();
</script>
<table style="display:none">
    <tr style="display: none" id='hcBar'>
        <td height="26" background="lessons/images/dhbg.gif">
            <table width="100%" height="26" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td <%= (startTime > 0) ? "style='display:none'" : "" %> width="26" align="right">
                        <img src="lessons/images/play.gif" id="PlayOrPause_id" onclick="playerObj.playOrPause();"
                             style="cursor: hand" width="19" height="17"/>
                    </td>
                    <td <%= (startTime > 0) ? "style='display:none'" : "" %> width="26">
                        <img src="lessons/images/stop.gif" onClick='playerObj.Stop();' alt="停止" style="cursor: hand"
                             ID="Button1" width="19" height="17"/>
                    </td>
                    <td <%= (startTime > 0) ? "style='display:none'" : "" %> width="26">
                        <img src="lessons/images/ht.gif" onClick='playerObj.doPlaySlower();' alt="快退" width="19"
                             height="17" style="cursor: hand"/>
                    </td>
                    <td <%= (startTime > 0) ? "style='display:none'" : "" %> width="26">
                        <img src="lessons/images/qj.gif" onClick='playerObj.doPlayFaster();' alt="快进" width="19"
                             height="17" style="cursor: hand"/>
                    </td>
                    <td width="265">
                        <table <%= (startTime > 0) ? "style='display:none'" : "" %> width="308" border="0" height="17"
                                                                                    cellspacing="0" cellpadding="0">
                            <tr>
                                <td background="lessons/images/jdt_hui.gif" id="Slider_ID"
                                    onmousedown="playerObj.startChangeSlider()" height="17" style="cursor: hand">
                                    <img id="Slider_Image_ID" src="lessons/images/jdt_blue.gif" width="0%" height="17"
                                         disabled="true"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td <%= (startTime > 0) ? "style='display:none'" : "" %> width="107" align="center"
                                                                             id="stateTime_ID">00:00/00:00
                    </td>
                    <td width="42" align="center">
                        <img src="lessons/images/sound.gif" onclick="playerObj.changeSound(this);" width="20"
                             height="17" style="cursor: hand"/>
                    </td>
                    <td width="55">
                        <table width="46" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td background="lessons/images/sound_bg.gif" id="Sound_Slider_Id"
                                    onmousedown="playerObj.startChangeSound()" style="cursor: hand">
                                    <img src="lessons/images/sound_gree.gif" id="Sound_Slider_Image_Id" width="80%"
                                         height="17" disabled="true"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td width="28">
                        <img <%= (startTime > 0) ? "style='display:none'" : "" %> src="lessons/images/fullscreen.gif"
                                                                                  onclick="playerObj.fullScreen();"
                                                                                  width="15" height="17"/>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<div id="titleDiv" style="height:25px;text-align:center;background-color:#333333;color:AEAEAE">
    <span class="STYLE2" id="_filename"></span>
</div>
<div class="btn">
    <%if ("0".equals(loginStyle) && "0".equals(linkType)) {%>
    <span id="padHiddenButton">
		 <div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
              onclick="tocloseorbg(this,2);"></div>
		 <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
              onclick="tocloseorbg(this,1);"></div>
	</span>
    <%} else if ("0".equals(loginStyle)) {%>
    <span style="width:53px">
	    <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
             onclick="tocloseorbg(this,1);"></div>
	</span>
    <%} %>
    视频播放
</div>
<div style="display: none">
</div>
<script type="text/javascript">
    intSize();
    //playRes(flist);

    //负载地址
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1为json 2 xml


    if (loadUrl && loadUrl != "" && loadUrl != null && loadUrl != "null") {
        url = loadUrl;
    } else {
        type = 1;
    }

    //1 资源 2教师文件夹 3名师微课
    getLoadAddress(url, playRes, type);
    if (readCookie("terminal") != null && readCookie("terminal") == "pad") {
        //是PAD客户端
        document.getElementById("padHiddenButton").style.display = "none";
    }
</script>
</body>
</html>
