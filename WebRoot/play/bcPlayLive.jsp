<%@ page contentType="text/html; charset=gbk" %>
<%@page import="java.util.*,vcom.util.ParseXml,vcom.util.MD5,java.net.URLDecoder" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String versionpath = ParseXml.getXmlNode("vcomplayerline");
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    String opentype = "1-1";
    String loginStyle = request.getParameter("loginStyle");
    String title = request.getParameter("infoTitle");
    if (title != null && title.trim().length() > 0) {
        title = URLDecoder.decode(title, "utf-8");
    }
    String liveid = request.getParameter("liveid");
    String liveType = request.getParameter("liveType");
    String username = request.getParameter("username");
    MD5 m = new MD5();
    int day = new Date().getDate();
    String sk = m.getMD5ofStr(username + day);
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <title>直播播放页</title>
    <style type="text/css">
        <!--
        .STYLE2 {
            color: #C3C1C2;
            font-weight: bold;
        }

        -->
    </style>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/config_pls.jsp"></script>
    <script src="<%=path%>/js/vcomplayer.js" type="text/javascript"></script>
    <script src="<%=basePath%>script/base64.js" type="text/javascript"></script>
</head>
<script type="text/javascript">
    var globalpath = "<%=path%>";
    var loginStyle = "<%=loginStyle%>";
</script>
<body topmargin="0" leftmargin="0" scroll="no">
<div id="htmlHide" style="position: absolute;top: -50px;"></div>
<table width="611" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td valign="top">
            <table width="100%" height="480" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td height="3"></td>
                </tr>
                <tr>
                    <td id="uploadlist">
                        <OBJECT CLASSID="clsid:AA0F838C-A6A3-44C8-B734-8189CA67A351"
                                CODEBASE="<%=basePath%>vcomplayer/plugins/no/VCOMPlayer.CAB#version=1,0,0,1"
                                ID="VCOMPlayer"
                                Name="VCOMPlayer"
                                WIDTH="616" HEIGHT="500"
                        >
                        </OBJECT>
                    </td>
                </tr>
                <tr>
                    <td height="5" align="center" bgcolor="#474546"><span class="STYLE2" id="_filename"></span></td>
                </tr>
                <tr style="display:none">
                    <td height="26" background="lessons/images/dhbg.gif">
                        <table width="100%" height="26" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="26" align="right">
                                    <img src="lessons/images/play.gif" id="PlayOrPause_id"
                                         onclick="playerObj.playOrPause();" style="cursor:hand" width="19" height="17"/>
                                </td>
                                <td width="26"><img src="lessons/images/stop.gif" onClick='playerObj.Stop();' alt="停止"
                                                    style="cursor:hand" ID="Button1" width="19" height="17"/></td>
                                <td width="26"><img src="lessons/images/ht.gif" onClick='playerObj.doPlaySlower();'
                                                    alt="快退" width="19" height="17" style="cursor:hand"/></td>
                                <td width="26"><img src="lessons/images/qj.gif" onClick='playerObj.doPlayFaster();'
                                                    alt="快进" width="19" height="17" style="cursor:hand"/></td>
                                <td width="265">
                                    <table width="308" border="0" height="17" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td background="lessons/images/jdt_hui.gif" id="Slider_ID"
                                                onmousedown="playerObj.startChangeSlider()" height="17"
                                                style="cursor:hand">
                                                <img id="Slider_Image_ID" src="lessons/images/jdt_blue.gif" width="0%"
                                                     height="17" disabled="true"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td width="107" align="center" id="stateTime_ID">00:00/00:00</td>
                                <td width="42" align="center"><img src="lessons/images/sound.gif"
                                                                   onclick="playerObj.changeSound(this);" width="20"
                                                                   height="17" style="cursor:hand"/></td>
                                <td width="55">
                                    <table width="46" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td background="lessons/images/sound_bg.gif" id="Sound_Slider_Id"
                                                onmousedown="playerObj.startChangeSound()" style="cursor:hand">
                                                <img src="lessons/images/sound_gree.gif" id="Sound_Slider_Image_Id"
                                                     width="80%" height="17" disabled="true"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td width="28"><img src="lessons/images/fullscreen.gif"
                                                    onclick="playerObj.fullScreen();" width="15" height="17"/></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<script for="VCOMPlayer" language="JavaScript" event="PlayerEvent(EventID,EventData)">
    if (EventID == 20) {
        if (EventData == 1) {//esc
            //alert("esc");
            //if(type==0)type=1;
            window.location.href = "recover://"
        } else if (EventData == 2) {
            //alert("close");
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
    <%if (loginStyle.equals("0")) {%>
    <span>
<div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
     onclick="tocloseorbg(this,2);"></div>
<div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
     onclick="tocloseorbg(this,1);"></div>
</span>
    <%}%><%=title %>
</div>
<script>
    window.onresize = function () {
        if (document.body.clientWidth > 950) VCOMPlayer.FullScreen = true;
        else VCOMPlayer.FullScreen = false;
        if (document.body.clientWidth > 900) {
            bigwindow.className = "btnB";
        } else {
            bigwindow.className = "btnA";
        }
    }
</script>

<script type="text/javascript">
    var _url = "";
    var liveType = "<%=liveType%>";
    var clientip = "<%=request.getRemoteAddr()%>";
    var opentupe = "<%=request.getAttribute("opentype")%>";
    var playversion = "<%=versionpath%>";
    var data = "userName=<%=username%>&lveid=<%=liveid%>&clientip=" + clientip + "&sk=<%=sk%>";
    ajaxJson(transferProtocol_web + _config["RLMS"] + "/rlms/interface/playlve.jsp", data, "gbk", function (rdata) {
        if (rdata != null && rdata.url != null && rdata.url != "") {
            var unicode = BASE64.decoder(rdata.url);
            var strArr = new Array();
            for (var i = 0, len = unicode.length; i < len; ++i) {
                strArr.push(String.fromCharCode(unicode[i]));
            }
            _url = strArr.join("");
        } else {
            var des = "[没有可播放的资源]";
            if (rdata.result == "0" && rdata.des && rdata.des.length > 0) {
                des = "[" + rdata.des + "]";
            }
            _filename.innerHTML = des;
        }
        delayInit();
    });

    function delayInit() {
        if ("xdzq" == liveType) {
            //现代中庆直播
            window.setTimeout(function () {
                try {
                    VCOMPlayer.OpenFile(_url, 0);
                } catch (e) {
                    if (window.confirm("直播播放器没有安装，或安装有误请重新安装!")) {
                        window.location.href = "<%=basePath%>vcomueduplayer.exe";
                    }
                }

            }, 500);
        } else {
            //Vcom直播
            playerObj.URL = _url;
            playerObj.startPlayTime = '0';
            playerObj.endPlayTime = '0';
            playerObj.name = '<%=title%>';
            playerObj.movieName = '<%=title%>';
            playerObj.playerUrl = '<%=basePath%>vcomueduplayer.exe';
            playerObj.playerClientUrl = '<%=basePath%>PstimWebClient.exe';
            setTimeout("playerObj.initPlayInfo()", 1000);
        }
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
</script>
</body>
</html>
