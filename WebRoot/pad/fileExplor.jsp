<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String loginInfo = request.getParameter("data");
    String loadUrl = request.getParameter("loadUrl");
    String fileType = (String) request.getParameter("fileType");//��Դ����
    String fileCode = (String) request.getParameter("fileCode");//��Դ����
    String format = (String) request.getParameter("format");//��Դ����
    String teachernumber = (String) request.getParameter("teachernumber");//��Դ����
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
    <title>�ļ�̽��</title>
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
        <h2 id="theme">̽��</h2>
        <span class="top-s" style="display:block" id="sendToPadtops"></span>
    </div>


    <div class="boxCon">
        <p class="" style="display:block; ">��ѡ��̽���ķ�����ʽ</p>
        <div style="height: 80px;">
            <span class="ipt"><input type="checkbox" name="checkOption" value="1"><font>����</font></span>
            <span class="ipt"><input type="checkbox" value="2"><font>����</font></span>
            <span class="ipt"><input type="checkbox" value="3"><font>ͼƬ</font></span>
            <span class="ipt"><input type="checkbox" value="4"><font>¼��</font></span>
            <span class="ipt"><input type="checkbox" value="5"><font>¼��</font></span>
            <span class="ipt"><input type="checkbox" value="6"><font>������</font></span>
        </div>
        <div class="box-btn" style="position: relative; margin-top: 25px;">
            <a id="" class="" href="javascript:start()" style="background: #1e8ee9; color: #fff;">����̽��</a>
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
        //Э��δ����Ĭ��http
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
            alert("Ҫʹ�ô˹����������ڿζˣ�");
            return;
        }

        var ntype = $('input:checkbox:checked').attr('value');
        if (typeof ntype == "undefined") {
            alert("��ѡ��̽���ķ�����ʽ��");
            return;
        }
        if (fileUrl == "") {
            alert("��ȡ�ļ����ص�ַʧ�ܣ�");
            return;
        }
        //html���Ͳ����� ���������ļ�����
        var ndownload = 1;
        if (format == "html") {
            ndownload = 0;
        }
        //alert(ntype+","+fileUrl+","+fileCode+","+fileName);
        addPv(ntype);

        VcomPadTool.InitConnectPad("");
        //Int ntype  ������ʽ��1���⿨;2���֣�3ͼƬ��4¼����5¼����6������
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
        //1 ��Դ 2��ʦ�ļ��� 3��ʦ΢��
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
                //ֻ�����ļ���ַ
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
