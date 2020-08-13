<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String loginInfo = request.getParameter("data");
    String loadUrl = request.getParameter("loadUrl");
    String fileType = (String) request.getParameter("fileType");//资源类型
    String fileCode = (String) request.getParameter("fileCode");//资源类型
    String format = (String) request.getParameter("format");//资源类型
    String teachernumber = (String) request.getParameter("teachernumber");//资源类型
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());

    if (loginInfo == null) {
        loginInfo = "null";
    }

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <title>文件探究</title>
    <!--
    <script type="text/javascript" src="jquery172min.js"></script>
    -->
    <link href="<%=path %>/pad/css/style.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <jsp:include page="/script/jquery172min.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <jsp:include page="/play/play.jsp"/>
</head>

<body>
<div class="result" style="border-left-width: 2px;">
    <div class="title"><a id="exit" style="display: none" href="javascript:exit();" class="close-student"></a>
        <h2 id="theme">探究</h2>
        <span class="top-s" style="display:block" id="sendToPadtops"></span>
    </div>


    <div class="boxCon">
        <p class="" style="display:block; ">请选择探究的反馈形式</p>
        <div style="height: 80px;">
            <span class="ipt"><input type="checkbox" name="checkOption" value="1"><font>答题</font></span>
            <span class="ipt"><input type="checkbox" value="2"><font>文字</font></span>
            <span class="ipt"><input type="checkbox" value="3"><font>图片</font></span>
            <span class="ipt"><input type="checkbox" value="4"><font>录屏</font></span>
            <span class="ipt"><input type="checkbox" value="5"><font>录音</font></span>
            <span class="ipt"><input type="checkbox" value="6"><font>不反馈</font></span>
        </div>
        <div class="box-btn" style="position: relative; margin-top: 25px;">
            <a id="" class="" href="javascript:start()" style="background: #1e8ee9; color: #fff;">发起探究</a>
        </div>
    </div>

</div>
<i class="pbottom-i" onclick="exit();"></i>
<script>
    var loadUrl = "<%=loadUrl%>";
    var loginInfo =<%=loginInfo%>;
    var fileType = "<%=fileType%>";
    var fileCode = "<%=fileCode%>";
    var fileUrl = "";
    var fileName = "";
    var format = "<%=format%>";
    var teachernumber = "<%=teachernumber%>";
    var _config =<%=_config.toString() %>;
    var transferProtocol_web = _config.LOCAL_PROTOCOL;
    if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
        //协议未配置默认http
        transferProtocol_web = "http://";
    } else {
        transferProtocol_web = transferProtocol_web + "://";
    }


    $(document).ready(function () {
        getFileUrl();
    })
    $(function () {
        $(':checkbox[type="checkbox"]').each(function () {
            $(this).click(function () {
                if ($(this).attr('checked')) {
                    $(':checkbox[type="checkbox"]').removeAttr('checked');
                    $(this).attr('checked', 'checked');
//                    alert(this.id);
                }
            });
        });
    });

    function exit() {
        location.href = "close://";
    }

    function start() {
        if (typeof VcomPadTool.StartFilePreview == "undefined") {
            alert("要使用此功能请升级授课端！");
            return;
        }

        var ntype = $('input:checkbox:checked').attr('value');
        if (typeof ntype == "undefined") {
            alert("请选择探究的反馈形式！");
            return;
        }
        if (fileUrl == "") {
            alert("获取文件负载地址失败！");
            return;
        }
        //html类型不下载 其它类型文件下载
        var ndownload = 1;
        if (format == "html") {
            ndownload = 0;
        }
        //alert(ntype+","+fileUrl+","+fileCode+","+fileName);
        addPv(ntype);

        VcomPadTool.InitConnectPad("");
        //Int ntype  反馈形式：1答题卡;2文字；3图片；4录屏；5录音；6不反馈
        VcomPadTool.StartFilePreview(ntype, fileUrl, fileCode, fileName, ndownload);

        //VcomPadTool.StopFilePreview();

        VcomPadTool.UnInit();

        location.href = "fileExplorClose" + ntype + "://";
        //exit();
    }

    function getFileUrl() {

        if (loadUrl && loadUrl != "" && loadUrl != null && loadUrl != "null") {
            url = loadUrl;
        }
        if (typeof (type) == "undefined" || type == null || type == "null") {
            type = 1;
        }
        //1 资源 2教师文件夹 3名师微课
        //var fileUrl="";
        getLoadAddress(loadUrl, function (list) {
            if (list == null || typeof (list) == 'string') {
                return;
            }
            for (var i = 0; i < list.length; i++) {
                var res = list[i];
                var path = res.path;
                fileName = list[0].file_name;
                /*format = "html";
                if(typeof res.format != "undefined")
                {
                    format = res.format;
                }
                if(i!=0)
                {
                    fileUrl = fileUrl +";";
                }
                fileUrl = fileUrl + path;*/
                //只传主文件地址
                fileUrl = list[0].path;
            }


        }, fileType);

    }

    function addPv(type) {
        var act = 'wjtj01';
        if (type == 1) {
            act = 'wjtj01';
        } else if (type == 2) {
            act = 'wjtj02';
        } else if (type == 3) {
            act = 'wjtj03';
        } else if (type == 4) {
            act = 'wjtj04';
        } else if (type == 5) {
            act = 'wjtj05';
        } else if (type == 6) {
            act = 'wjtj06';
        }
        //_common.channelid = loginInfo.channelid;
        _common.addTjPv(act, teachernumber, loginInfo.classId, "03.99");
    }
</script>
<OBJECT id="VcomPadTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:57519B34-9C20-4096-AB5D-3D6B3D595253"></OBJECT>
<br>
</body>
</html>
