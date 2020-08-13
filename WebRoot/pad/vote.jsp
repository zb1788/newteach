<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%@page import="java.net.URLEncoder" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String loginInfo = request.getParameter("data");
    String teachComputerMac = request.getParameter("teachComputerMac");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <title>投票</title>
    <link href="<%=path %>/pad/css/style.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <jsp:include page="/script/jquery172min.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>
</head>

<body>
<script type="text/javascript">
    var _config =<%=_config.toString() %>;
    var transferProtocol_web = _config.LOCAL_PROTOCOL;
    if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
        //协议未配置默认http
        transferProtocol_web = "http://";
    } else {
        transferProtocol_web = transferProtocol_web + "://";
    }
    var loginInfo =<%=loginInfo%>;//登录信息
    var teachComputerMac = "<%=teachComputerMac%>";
</script>
<script language="JavaScript" for="VcomAQTool" event="OnReady()">
    //VcomAQTool.SetMode("0,7");
    VcomAQTool.Start();
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    onSubmit(id, keys);
</script>
<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>
<br>
<!-------抢答-------->
<div class="result">
    <div class="boxCon">
        <ul class="zu-list clear-fix" id="2s_1" style="">
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_1">0</b>
                <br><span>A</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_2">0</b>
                <br><span>B</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_3">0</b>
                <br><span>C</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_4">0</b>
                <br><span>D</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_5">0</b>
                <br><span>E</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_6">0</b>
                <br><span>F</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_7">0</b>
                <br><span>√</span></a></li>
            <li><a style="cursor: default;" class="bBlue w-white" href="javascript:">票数：<b id="voteRecord_8">0</b>
                <br><span>×</span></a></li>
        </ul>
        <span>投票说明：</span>
        <p>
            1、学生通过按"字母+答题"即可进行投票，例如"A+答题"代表投票给A；
        </p>
        <p>
            2、A、B、C、D、E、F、√、×所代表项，请教师在黑板上说明；
        </p>
        <p>
            3、仅支持一人一票，多选不计入投票数；
        </p>
        <%--<div class="suo-btn" style="display: block">
            <a class="bGreen" style="height:25px" onclick="startVote(this)">开始投票</a>
        </div>--%>

    </div>
</div>
<i id="closeButton" class="" onclick="exit();"></i>
<script type="text/javascript">
    $(document).ready(function () {
        //_common.channelid = loginInfo.channelid;
        _common.addTjPv("tpsk", loginInfo.teachernumber, loginInfo.classId, "03.99");//pv统计
        setTimeout(function () {
            showClose();
        }, 1000);
    })

    function showClose() {
        $("#closeButton").attr("class", "pbottom-i");
        if (screen.width > 2600) {
            myZoom.setZoom('.pbottom-i');
            $('.pbottom-i').css("height", 50 * myZoom.zoom + "px").css("width", 50 * myZoom.zoom + "px");
        }
    }

    var voteOptions = [
        {"id": 1, "key": "A"},
        {"id": 2, "key": "B"},
        {"id": 3, "key": "C"},
        {"id": 4, "key": "D"},
        {"id": 5, "key": "E"},
        {"id": 6, "key": "F"},
        {"id": 7, "key": "G"},//√
        {"id": 8, "key": "H"} //×
    ];
    var voteList = [];
    classes.init(loginInfo, function () {
    });

    function startVote(obj) {
        if ($(obj).html() == "开始投票") {
            $(obj).html("停止投票");
            VcomAQTool.Start();
        } else if ($(obj).html() == "停止投票") {
            $(obj).html("关闭");
            VcomAQTool.Stop();
        } else if ($(obj).html() == "关闭") {
            location.href = "close://";
        }
    }

    function setRecords(id, key) {
        //根据id获取答题器号和学生账号
        var currStu = classes.getStuById(id);
        //不是该班学生
        if (null == currStu) {
            return;
        }
        //判断该学生是否已投票
        for (var i = 0; i < voteList.length; i++) {
            if (voteList[i].id == currStu.answerToolCode || voteList[i].id == currStu.studentNumber || voteList[i].id == currStu.smartPaperMac) {
                return;
            }
        }

        //保存
        var obj = new Object();
        obj.id = id;
        obj.key = key;
        voteList.push(obj);

        //获取值为key的选项的统计个数
        var count = 0;
        for (var i = 0; i < voteOptions.length; i++) {
            if (voteOptions[i].key == key) {
                count = parseInt($("#voteRecord_" + voteOptions[i].id).html()) + 1;
                $("#voteRecord_" + voteOptions[i].id).html(count);
                return;
            }
        }

    }

    function onSubmit(id, key) {//提交事件

        if (key.length != 1) {
            //alert("不支持多选");
            return;
        }
        //计算总分、平均分、最低分、最高分
        setRecords(id, key);

    }

    function exit() {
        VcomAQTool.Stop();
        location.href = "close://";
    }

    if (screen.width > 2600) {
        myZoom.baseWidth = 780;
        myZoom.baseHeight = 360;
        var fsize = Math.round($(window).width() / 780 * 16);
        $('.boxCon').css("font-size", fsize + "px");
        $('.bBlue').css("font-size", fsize + "px");
        if (fsize > 40) {
            $('.bBlue span').css("font-size", "40px");
        } else {
            $('.bBlue span').css("font-size", fsize + "px");
        }
    }
    //myZoom.setZoom('.boxCon');
</script>
</body>
</html>
