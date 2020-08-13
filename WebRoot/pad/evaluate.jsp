<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%@page import="java.net.URLEncoder" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String loginInfo = request.getParameter("data");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
    String code = URLEncoder.encode(loginInfo, "UTF-8");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <title>评价</title>
    <script type="text/javascript" src="jquery172min.js"></script>
    <script type="text/javascript" src="<%=path %>/js/json2.js"></script>
    <link href="<%=path %>/pad/css/style.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <jsp:include page="/script/jquery172min.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>
    <style type="text/css">
        .left-10 {
            font-size: 16px
        }

        .w-blue {
            font-size: 16px
        }

        .ts {
            width: 420px
        }
    </style>
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
</script>
<script language="JavaScript" for="VcomAQTool" event="OnReady()">
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    onSubmit(id, keys);
</script>
<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>
<br>
<!-------抢答-------->
<div class="title"><a id="exit" style="display: block" href="javascript:pad.exit();" class="close-student"></a>
    <h2 id="theme">班级投票</h2>
    <span class="top-s" style="display:block" id="sendToPadtops"></span>
</div>
<div id="analysis" class="result" style="">
    <div class="boxCon">
        <h3>总分：<b id="evaluateRecord_sum">--</b><b class="fenWord" style="display: none">分</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平均分：<b
                id="evaluateRecord_average">--</b><b class="fenWord" style="display: none">分</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最高分：<b
                id="evaluateRecord_highest">--</b><b class="fenWord" style="display: none">分</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最低分：<b
                id="evaluateRecord_lowest">--</b><b class="fenWord" style="display: none">分</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共<b
                id="allStudentAmount">--</b>人参与评价</h3>
        <div id="content" style="height:300px; overflow-x: hidden;">
            <%--<dl class="chart" id="A"><dt class="left-10">0分</dt>
                <dd class="jdb"><i style="height:20%;"></i>
                    <b class="w-blue">0人</b>
                    <a style="height:20%;" href="javascript:void(0);"  data-reveal-id="A" >
                    </a>
                </dd>
            </dl>--%>
        </div>
        <div class="clearfix"></div>
        <div class="ts">
            <p>注：学生评分可选择在0-5数值进行评分。</p>
        </div>
    </div>
</div>
<i id="closeButton" class="" onclick="exit();"></i>
<script type="text/javascript">
    //style="background:url(images/out.png) no-repeat;position: fixed; width:50px;height:50px;bottom:55px;right:55px;display:block"
    myZoom.baseWidth = 640;
    myZoom.baseHeight = 430;

    $(document).ready(function () {
        //_common.channelid = loginInfo.channelid;
        _common.addTjPv("pj", loginInfo.teachernumber, loginInfo.classId, "03.99");//pv统计
        initPage();
        VcomAQTool.SetMode("2,5");
        VcomAQTool.Start();
    })

    function initPage() {

        var h = "";
        for (var i = 0; i <= 5; i++) {
            h += "<dl class='chart' id='evaluateCode" + i + "'><dt class='left-10'>" + i + "分</dt><dd class='jdb'><i id='evaluateHeight" + i + "' style='height:0%;'></i><b id='evaluateValue" + i + "' class='w-blue'>0人</b><a style='height:0%;right:0px' href='javascript:void(0);'  data-reveal-id='A' ></a></dd></dl>";
        }
        $("#content").html(h);

    }

    var evaluateList = [];
    classes.init(loginInfo, function () {
        //总人数

        //$("#allStudentAmount").html(classes.stuList.length);
        setTimeout(function () {
            showClose();
        }, 1000);
    })

    function showClose() {
        $("#closeButton").attr("class", "pbottom-i");
        if (screen.width > 2600) {
            myZoom.setZoom('#closeButton');
        }
        //$('#closeButton').css("bottom",55+"px").css("right",55+"px");
    }

    function setRecords(id, key) {
        //根据id获取答题器号和学生账号
        var currStu = classes.getStuById(id);
        //不是该班学生
        if (null == currStu) {
            return;
        }
        //判断该学生是否已投票
        for (var i = 0; i < evaluateList.length; i++) {
            if (evaluateList[i].studentId == currStu.answerToolCode || evaluateList[i].studentId == currStu.studentNumber) {
                return;
            }
        }
        //保存
        var obj = new Object();
        obj.studentId = id;
        obj.key = key;
        evaluateList.push(obj);

        key = parseInt(key);
        var evaluateRecord_sum = $("#evaluateRecord_sum").html();
        var evaluateRecord_average = $("#evaluateRecord_average").html();
        var evaluateRecord_highest = $("#evaluateRecord_highest").html();
        var evaluateRecord_lowest = $("#evaluateRecord_lowest").html();
        //var allStudentAmount = $("#allStudentAmount").html();
        if (isNaN(evaluateRecord_sum)) {
            evaluateRecord_sum = 0;
        }
        if (isNaN(evaluateRecord_average)) {
            evaluateRecord_average = 0;
        }
        if (isNaN(evaluateRecord_highest)) {
            evaluateRecord_highest = 0;
        }
        if (isNaN(evaluateRecord_lowest)) {
            evaluateRecord_lowest = key;
        }
        evaluateRecord_sum = parseInt(evaluateRecord_sum) + key;
        evaluateRecord_average = evaluateRecord_sum / evaluateList.length;
        evaluateRecord_average = evaluateRecord_average.toFixed(2);
        ;
        if (evaluateRecord_highest < key) {
            evaluateRecord_highest = key;
        }
        if (evaluateRecord_lowest > key) {
            evaluateRecord_lowest = key;
        }

        $("#evaluateRecord_sum").html(evaluateRecord_sum);
        $("#evaluateRecord_average").html(evaluateRecord_average);
        $("#evaluateRecord_highest").html(evaluateRecord_highest);
        $("#evaluateRecord_lowest").html(evaluateRecord_lowest);
        $("#allStudentAmount").html(evaluateList.length);
        $(".fenWord").css("display", "inline-block");


        //修改高度
        for (var i = 0; i <= 5; i++) {
            var evaluateValue = parseInt($("#evaluateValue" + i).html().replace("人", ""));
            //修改投票人数
            if (i == key) {
                $("#evaluateValue" + key).html((evaluateValue + 1) + "人");
                evaluateValue = evaluateValue + 1;
            }

            var height = evaluateValue / evaluateList.length * 100 + "%";
            $("#evaluateHeight" + i).css("height", height);

        }


    }

    function onSubmit(id, key) {//提交事件
        if (isNaN(key)) {
            alert("输入格式错误");
            return;
        }
        if (key > 5) {
            return;
        }
        //计算总分、平均分、最低分、最高分
        setRecords(id, key);

        return;
        if (type && type == 1) {
            //平板抢答不判断答案
            rightAnswer = key;
        }
        if (currNum > 0 || rightAnswer != key) {
            return;
        }
        currStu = classes.getStuById(id);
        currNum++;
        var title = "";
        if (null != currStu) {
            title = currStu.realname;
        } else {
            title = id;
        }
        var h = "<p>&nbsp&nbsp</p><p>恭喜" + title + "，抢答成功！</p>";
        //document.getElementById("qd_info").innerHTML=h;

        //var h="<p>请在"+3+"秒后</p>";
        //var h ="<p>恭喜，参与抢答！</p>";
        document.getElementById("qd_info").innerHTML = h;

        VcomAQTool.SendFirstAnswer(id, title);
    }

    function exit() {
        //保存到
        sendToCLASSREPORT();
        VcomAQTool.Stop();
        location.href = "close://";
    }

    function sendToCLASSREPORT() {
        //保存到课堂报告
        var evaluateRecord_sum = $("#evaluateRecord_sum").html();
        var evaluateRecord_average = $("#evaluateRecord_average").html();
        var evaluateRecord_highest = $("#evaluateRecord_highest").html();
        var evaluateRecord_lowest = $("#evaluateRecord_lowest").html();
        if (isNaN(evaluateRecord_sum)) {
            evaluateRecord_sum = 0;
        }
        if (isNaN(evaluateRecord_average)) {
            evaluateRecord_average = 0;
        }
        if (isNaN(evaluateRecord_highest)) {
            evaluateRecord_highest = 0;
        }
        if (isNaN(evaluateRecord_lowest)) {
            evaluateRecord_lowest = 0;
        }
        var url = transferProtocol_web + _config["CLASSREPORT"] + "/xxx/xxx";
        var messageBody = "";
        messageBody += '{';
        messageBody += "'evaluateRecord_students':" + JSON.stringify(evaluateList) + ",";
        messageBody += "'evaluateRecord_sum':'" + evaluateRecord_sum + "',";
        messageBody += "'evaluateRecord_average':'" + evaluateRecord_average + "',";
        messageBody += "'evaluateRecord_highest':'" + evaluateRecord_highest + "',";
        messageBody += "'evaluateRecord_lowest':'" + evaluateRecord_lowest + "',";
        messageBody += '}';
        ajaxJson(url, messageBody, "gbk", function (data) {
            if (null == data || undefined == data || null == data.result) {
                return;
            }
        });
    }

    //alert($(window).width()+"*"+$(window).height());
    if (screen.width > 2600) {
        myZoom.setZoom('.boxCon');
        $(".ts").css("width", (zoomWidth($(window).width() - 80)) + "px");
        $('#closeButton').css("bottom", "100px").css("right", "100px");
    }
</script>
</body>
</html>
