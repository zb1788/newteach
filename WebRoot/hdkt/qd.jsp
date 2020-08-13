<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    String type = request.getParameter("type");
    String teachComputerMac = request.getParameter("teachComputerMac");
    if (loginInfo == null) {
        loginInfo = "null";
    }
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y:hidden">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <base href="<%=basePath%>">
    <title>互动答题</title>
    <link href="<%=path%>/hdkt/css/hddt.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/hdkt/css/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/swfobject.js"></script>
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
    var type =<%=type%>;//抢答方式  1 平板抢答 0 答题器抢答
    var teachComputerMac = "<%=teachComputerMac%>";
    var currStu = null;//当前学生
    var currNum = 0;//答案个数
    var rightAnswer = null;//正确答案
    var imglist = {
        "A": "hdkt/image/A.png",
        "B": "hdkt/image/B.png",
        "C": "hdkt/image/C.png",
        "D": "hdkt/image/D.png"
    };
    var keyList = ["A", "B", "C", "D"];
</script>
<script language="JavaScript" for="VcomAQTool" event="OnReady()">
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    onSubmit(id, keys);
</script>
<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>
<br>
<!-------抢答-------->
<div id="comments" class="comments" style="display:none;">
    <div id='byimgdiv'>
    </div>
</div>
<div id="k_answer">
    <div class="box" id="qd_info"></div>
    <div class="box_t">
        <p id="qd.result"></p>
        <div class="b"><input disabled="disabled" class="but-none" type="button" value="表&nbsp&nbsp&nbsp&nbsp扬"
                              style="margin-right:15px;" onclick="commends();">
            <input disabled="disabled" class="but-none" type="button" value="继续抢答" style="margin-right:15px;"
                   onclick="Race();">
            <input disabled="disabled" class="but-none" type="button" value="关&nbsp&nbsp&nbsp&nbsp闭"
                   onclick="onclose();">
        </div>
    </div>
</div>
<script type="text/javascript">
    //_common.channelid = loginInfo.channelid;
    _common.addTjPv("qd", loginInfo.teachernumber, loginInfo.classId, "03.99");//pv统计
    classes.init(loginInfo, Race());

    function Race() {
        //type 1 平板抢答 0或者空时 答题器抢答
        if (document.getElementById("qd_info").innerHTML != "" && type == 1) {
            try {
                VcomAQTool.Stop();
            } catch (e) {

            }
        }
        if (type && type == 1) {
            padRace();
        } else {
            startRace();
        }
        setTimeout(function () {
            $("input.but-none").attr("class", "but").removeAttr("disabled");
        }, 1000);
    }

    function startRace() {	//开始抢答
        currStu = null;
        currNum = 0;
        rightAnswer = getRandomKey();
        var h = "<p>按以下字母键，再按答题，参与抢答</p>";
        h += "<i><img src='" + imglist[rightAnswer] + "'>";
        h += "<img src='hdkt/image/plus.png'>";
        h += "<span class='dati'>答&nbsp&nbsp题</span></i>";
        document.getElementById("qd_info").innerHTML = h;
        document.getElementById("qd.result").innerHTML = "";
        var timerId = setInterval(function () {
            clearInterval(timerId);
            try {
                VcomAQTool.Start();
            } catch (e) {

            }
        }, 1000);
    }

    function padRace() {	//平板抢答
        currStu = null;
        currNum = 0;

        /*var count=3;
        var timerId = setInterval(function(){
            var h= "";
            if(count<=0)
            {
                clearInterval(timerId);
                h="<p>&nbsp&nbsp</p>";
                h+="<p>请点击平板上的红色按钮，参与抢答！</p>";
                VcomAQTool.StartAnswerOrGroup(1,""); //1 表示不发题抢答（抢资格），2发题抢资格，3，发题抢答案 4, 表示分组
                VcomAQTool.Start();
            }
            else
            {
                h="<p>请在"+count+"秒后</p>";
                h+="<p>点击平板上的红色按钮，参与抢答！</p>";
                count--;
            }

            document.getElementById("qd_info").innerHTML=h;
        }, 1000);*/
        var timerId = setInterval(function () {
            clearInterval(timerId);
            try {
                VcomAQTool.StartAnswerOrGroup(1, ""); //1 表示不发题抢答（抢资格），2发题抢资格，3，发题抢答案 4, 表示分组
                VcomAQTool.Start();
            } catch (e) {

            }
        }, 1000);
        var h = "<p>请在" + 3 + "秒后</p>";
        h += "<p>点击平板上的按钮，参与抢答！</p>";

        document.getElementById("qd_info").innerHTML = h;

        document.getElementById("qd.result").innerHTML = "";

    }

    function onSubmit(id, key) {//提交事件
        //type 1 平板抢答 0或者空时 答题器抢答
        if (type && type == 1) {
            //平板抢答不判断答案
            rightAnswer = key;
        }
        if (currNum > 0 || rightAnswer != key) {
            return;
        }


        currStu = classes.getStuById(id);


        var title = "";
        if (null != currStu) {
            currNum++;
            title = currStu.realname;
        } else {
            title = id;
            //不是该班学生
            return;
        }
        var h = "<p>&nbsp&nbsp</p><p>恭喜" + title + "，抢答成功！</p>";
        //document.getElementById("qd_info").innerHTML=h;

        //var h="<p>请在"+3+"秒后</p>";
        //var h ="<p>恭喜，参与抢答！</p>";
        document.getElementById("qd_info").innerHTML = h;

        //平板抢答 通知平板id抢答成功
        if (type && type == 1) {
            try {
                VcomAQTool.SendFirstAnswer(id, title);
            } catch (e) {

            }
        } else {
            try {
                VcomAQTool.Stop();
            } catch (e) {

            }
        }
    }

    function getRandomKey() {//随机一个字符
        var i = parseInt(4 * Math.random());
        return keyList[i];
    }

    function commends() {

        if (null != currStu) {
            classes.commends(currStu.realname);
        } else if (currNum > 0) {
            alert("尚未绑定答题器，请绑定答题器后再抢答");
        } else {
            alert("没有学生成功抢答");
        }
    }

    function onclose() {
        try {
            VcomAQTool.Stop();
        } catch (e) {

        }

        location.href = "close://";
    }

    var loginStyle = 0;
    var ieBrowser = "true";

    function afterSendCallback(praiseType, selStuList, result) {
        var pdiv = $("#praise_Component_v1-by").parent().parent();
        pdiv.css("zoom", myZoom.zoom);
        var left = ($(window).width() - 600 * myZoom.zoom) / 2;
        var top = ($(window).height() - 440 * myZoom.zoom) / 2;
        pdiv.css("zoom", myZoom.zoom);
        pdiv.css("top", top + "px");
        pdiv.css("left", left + "px");
    }

    myZoom.baseWidth = 550;
    myZoom.baseHeight = 320;
    if (screen.width > 2600) {
        myZoom.setZoom("#k_answer");
        var fsize = Math.round(14 * myZoom.zoom);
        if (fsize > 30) {
            fsize = 30;
        }
        myZoom.setZoom(".b input");
//$("").css("font-size",fsize+"px");
        $("#k_answer").css("width", zoomWidth($(window).width() - 50) + "px");
    }
</script>
</body>
</html>
