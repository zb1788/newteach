<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    if (loginInfo == null) {
        loginInfo = "null";
    }
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y:auto">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <base href="<%=basePath%>">
    <title>趣味选人</title>
    <link href="<%=path%>/hdkt/css/hddt.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/hdkt/css/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/praise/praise.jsp"></script>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/swfobject.js"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>
    <script type="text/javascript">
        var _config =<%=_config.toString() %>;
        var transferProtocol_web = _config.LOCAL_PROTOCOL;
        if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
            //协议未配置默认http
            transferProtocol_web = "http://";
        } else {
            transferProtocol_web = transferProtocol_web + "://";
        }
        var loginInfo =<%=loginInfo%>;
    </script>
</head>
<body>
<!-- 
<div id="comments" class="comments" style="display:none"><div id='byimgdiv'>
<img id="comments_img" src="">
</div></div>
 -->
<div class="qw_xr">
    <div class="boxCon">
        <ul class="stuList" id="stuList_qw"></ul>
        <div class="b">
            <input class="but " type="button" value="表&nbsp&nbsp&nbsp&nbsp扬" onclick="commends();">
            <input class="but" type="button" value="关&nbsp&nbsp&nbsp&nbsp闭" onclick="onclose();">
        </div>
    </div>
</div>
<OBJECT id="VcomPadTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:57519B34-9C20-4096-AB5D-3D6B3D595253"></OBJECT>
<br>
<script type="text/javascript">
    $(document).ready(function () {
        var teachernumber = loginInfo.teachernumber;
        var teachername = decodeURIComponent(loginInfo.teachername);
        var classId = loginInfo.classId;
        var subjectId = loginInfo.subjectId;
        var subjectName = decodeURIComponent(loginInfo.subjectName);
        var className = decodeURIComponent(loginInfo.userClassName);
        //var reUrl="http://"+_config["PLS"]+"/praiseResult.jsp";
        var reUrl = basePath + "/hdkt/praise/praiseResult.jsp";
        Praise.init({
            "teachernumber": teachernumber,
            "teachername": teachername,
            "classId": classId,
            "className": className,
            "subjectId": subjectId,
            "reUrl": reUrl,
            "subjectName": subjectName
        });
    })

    //_common.channelid = loginInfo.channelid;
    _common.addTjPv("qwxr", loginInfo.teachernumber, loginInfo.classId, "03.99");//pv统计
    var currindex = 0;
    var rlist = new Array();//学生列表
    var onlineArr = new Array();//在线学生
    var noOnLneArr = new Array();//不在线学生
    var nowArr = new Array();//翻牌后的学生位置
    classes.init(loginInfo, function () {
        var stuNum = classes.stuNum;

        /**
         rlist.length=0;
         while(classes.stuList.length>0){
		currindex=parseInt(stuNum*Math.random());
		var stu=classes.stuList[currindex];
		rlist.push(stu);		
		classes.stuList.splice(currindex,1);
		stuNum--;		
	}
         */
        rlist = classes.stuList;
        var h = "";
        for (var i = 0; i < rlist.length; i++) {
            //var stu=rlist[i];
            //h+="<li><a href='javascript:void(0);' class='bgcGreen'>点击翻牌<span>"+stu.realname+"</span></a></li>";
            h += "<li><a href='javascript:openCard(" + i + ");' class='bgcGreen'>点击翻牌<span></span></a></li>";
        }
        document.getElementById("stuList_qw").innerHTML = h;
        //testAddOnline(rlist);//测试用
        checkIsOnline(rlist);//正式
        $(function () {
            //$("#stuList_qw > li").click(function(){$(this).toggleClass("show");})
        })
    });

    //处理正式在线学生数据
    function checkIsOnline(stuList) {
        var online = "";
        try {
            online = VcomPadTool.GetOnlineStuds();
        } catch (e) {
        }

        online = ';' + online + ';';
        for (var i = 0; i < stuList.length; i++) {
            var stu = stuList[i];
            if (online.indexOf(';' + stu.studentNumber + ';') == -1) {
                noOnLneArr.push(stu);
            } else {
                onlineArr.push(stu);
            }
        }
        noOnLneArr = noOnLneArr.shuffle();
        onlineArr = onlineArr.shuffle();
    }

    //生成测试在线学生数据
    function testAddOnline(stuList) {
        for (var i = 0; i < stuList.length; i++) {
            if (i % 2 == 0) {
                noOnLneArr.push(stuList[i]);
            } else {
                onlineArr.push(stuList[i]);
            }
        }
        noOnLneArr = noOnLneArr.shuffle();
        onlineArr = onlineArr.shuffle();
    }


    function openCard(index) {
        if (typeof (nowArr[index]) == 'undefined') {
            //当前位置没有人
            if (onlineArr.length > 0) {
                nowArr[index] = onlineArr[0];
                $("#stuList_qw").find('li').eq(index).find('span').html(onlineArr[0].realname);
                $("#stuList_qw").find('li').eq(index).find('span').attr("sid", onlineArr[0].studentNumber);
                onlineArr.splice(0, 1);
            } else if (noOnLneArr.length > 0) {
                nowArr[index] = noOnLneArr[0];
                $("#stuList_qw").find('li').eq(index).find('span').html(noOnLneArr[0].realname);
                $("#stuList_qw").find('li').eq(index).find('span').attr("sid", noOnLneArr[0].studentNumber);
                noOnLneArr.splice(0, 1);
            }
        } else {
            //当前位置有人，直接取
            $("#stuList_qw").find('li').eq(index).find('span').html(nowArr[index].realname);
            $("#stuList_qw").find('li').eq(index).find('span').attr("sid", nowArr[index].studentNumber);
        }
        $("#stuList_qw").find('li').eq(index).toggleClass("show");
    }

    function commends() {
        var selStuList = [];
        var stunames = "";
        $("#stuList_qw > li").each(function () {
            var name = $(this).find("span").text();
            var selected = $(this).hasClass("show");
            if (selected) {
                if ("" == stunames) {
                    stunames += name;
                } else {
                    stunames += "," + name;
                }
                var student = new Object();
                student.studentNumber = $(this).find("span").attr("sid");
                student.realname = name;
                //student.headPhoto = $(this).attr("headPhoto");
                selStuList.push(student);
            }
        })
        //classes.commends(stunames);
        if (selStuList.length == 0) {
            alert("尚未选中学生，无法表扬");
            return false;
        }
        Praise.execute(1, selStuList, []);
    }

    function onclose() {
        location.href = "close://";
    }

    function afterSendCallback(praiseType, selStuList, result) {
        //$('#comments').hide();
        //alert("afterSendCallback");
        //return false;
    }

    Array.prototype.shuffle = function () {
        var input = this;
        for (var i = input.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    function afterSendCallback(praiseType, selStuList, result) {
        if (screen.width > 2600) {
            var pdiv = $("#praise_Component_v1-by").parent().parent();
            pdiv.css("zoom", myZoom.zoom);
            var left = ($(window).width() - 600 * myZoom.zoom) / 2;
            var top = ($(window).height() - 440 * myZoom.zoom) / 2;
            pdiv.css("zoom", myZoom.zoom);
            pdiv.css("top", top + "px");
            pdiv.css("left", left + "px");
        }
    }

    var loginStyle = 0;
    var ieBrowser = "true";

    if (screen.width > 2600) {
        myZoom.setZoom('.pbottom-i');
        $(".boxCon").css("width", zoomWidth($(window).width() * 0.995 - 100) + "px");
        myZoom.setZoom(".boxCon");
    }
</script>
</body>
</html>
