<%@ page contentType="text/html; charset=gbk" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//负载地址
    String flist = (String) request.getAttribute("flist");
    String filename = (String) request.getParameter("filename");
    String loginStyle = (String) request.getParameter("loginStyle");
    String teachernumber = (String) request.getParameter("teachernumber");
    String rcode = (String) request.getParameter("rcode");

    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
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
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/play/flash/swfobject.js"></script>
    <jsp:include page="/play/play.jsp"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" scroll="no" style="background-color:#000000">
<div id="htmlHide" style="position: absolute;top: -50px;"></div>
<iframe src="" width="100%" height="95%" id="iframe2" style="display:none"></iframe>
<table width="100%" height="94%" border="0" cellpadding="0" cellspacing="0" id="table1">
    <tr>
        <td>
            <div class="players">
                <div id="flashContent"></div>
            </div>
        </td>
    </tr>
</table>
<div class="btn">
    <%if ("0".equals(loginStyle)) {%>
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <%}%>
    <h3 id="_flash">FLASH浏览</h3>
</div>
<script type="text/javascript">
    var path = "<%=path%>";
    var basePath = "<%=basePath%>";
    var flapath = new Array();
    var filename = "";
    var flist =<%=flist%>;
    var swfVersionStr = "11.1.0";
    // To use express install, set to playerProductInstall.swf, otherwise the empty string.
    var xiSwfUrlStr = "<%=path%>/newLogin/pages/youjiaoplay/playerProductInstall.swf";
    var mainflashpath = "<%=path%>/newLogin/pages/youjiaoplay/FlexPaperApp.swf";
    var iframe2 = document.getElementById('iframe2');
    var table1 = document.getElementById('table1');

    var teachernumber = "<%=teachernumber%>";
    var rcode = "<%=rcode%>";

    //负载地址
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1为json 2 xml

    //播放
    getLoadAddress(url, playRes);

    //setTimeout(function(){playRes(flist);},50);

    function playRes(data) {
        if (data == null || data == undefined || data.length == 0) {
            try {
                _flash.innerHTML = "没有可播放的资源!";
                //document.getElementById("flashContent").innerHTML="<p>没有可播放的资源</p>";
            } catch (e) {
                alert("没有可播放的资源!");
            }
            return;
        } else if (typeof (data) == 'string') {
            try {
                _flash.innerHTML = data;
                //document.getElementById("flashContent").innerHTML="<p>没有可播放的资源</p>";
            } catch (e) {
                alert("没有可播放的资源!");
            }
            return;
        }
        var _url = data[0].path;
//	_url=decodeURIComponent(_url);
        /*var linkType=data[0].linkType;
        if("1"==linkType){
            window.open(_url);
            window.location.href="close://";
            return;
        }*/
        var newswftype = data[0].newSwfType;
        flapath.length = 0;
        for (var i = 0; i < data.length; i++) {
            var file_id = data[i].sid;
            var file_name = data[i].file_name;
            file_name = file_name.substring(0, file_name.indexOf("."));
            var path = data[i].path;
            //var basepath2=path.substring(0, path.lastIndexOf("/")+1);
            var icon = basePath + "/ext/resources/images/im2.gif";
            flapath.push({
                "text": file_name,
                "icon": icon,
                "path": path,
                "type": 1,
                "depth": 1,
                "parentid": 0,
                "leaf": true,
                "draggable": false,
                "id": file_id
            });
        }
        if (newswftype == "1") {
            iframe2.style.display = "none";
            table1.style.display = "";
            playflash1();
        } else {
            table1.style.display = "none";
            iframe2.style.display = "";
            playflash0();
            iframe2.height = document.body.clientHeight - 40;
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
                iframe2.window.document.location.reload();
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

    String.prototype.replaceAll = function (AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return this.replace(raRegExp, ARepText)
    }

    function playflash0() {//播放普通Flash
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
        iframe2.src = path + "/play/flash/flashframe.jsp";
    }

    function playflash1() {//播放合成Flash
        try {
            if (filename.length > 0) {
                if (filename.length > 40) {
                    _flash.innerHTML = filename.substring(0, 40) + "...";
                } else {
                    _flash.innerHTML = filename;
                }
            }
        } catch (e) {
        }
        flashContent.height = document.body.clientHeight - 40;
        showFlexPager(flapath, mainflashpath);
    }
</script>
</body>
</html>
