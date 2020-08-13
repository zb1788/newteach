<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
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
    <title>随机选人</title>
    <link href="<%=path%>/hdkt/css/hddt.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/hdkt/css/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/praise/praise.jsp"></script>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/swfobject.js"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>

    <script type="text/javascript">
        var loginInfo =<%=loginInfo%>;
    </script>
</head>
<body>
<%--,ie=8,ie=9
<iframe id="mysavesetformtargetId"  name="mysavesetformtarget" style="display: none"></iframe>
--%>
<!-- 
<div id="comments" class="comments" style="display:none">
    <div id='byimgdiv'>
    </div>
</div>
 -->
<div class="sj_xr">
    <div class="boxCon">
        <ul class="stuList" id="stuList_sj"></ul>
        <div class="b">
            <input class="but " type="button" value="表&nbsp&nbsp&nbsp&nbsp扬" onclick="commends();" id="comment_button"/>
            <input class="but " type="button" value="继续选人" onclick="selectBySJ()" ;/>
            <input class="but" type="button" value="关&nbsp&nbsp&nbsp&nbsp闭" onclick="onclose();">
        </div>
    </div>
</div>
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

    var currindex = 0;
    var student = null;
    var timer = 0;
    classes.init(loginInfo, function () {
        var h = "";
        for (var i = 0; i < classes.stuNum; i++) {
            var stu = classes.stuList[i];
            h += "<li><a href='javascript:void(0);' class='bgcGreen' id='stu_" + classes.stuList[i].studentNumber + "'>" + stu.realname + "</a></li>";
        }
        document.getElementById("stuList_sj").innerHTML = h;
        selectBySJ();
    });
    var stuArray = clone(classes.stuList);

    function getRandomNum() {
        var splitNums = 10; //10次之内不能重复选中该学生
        if (classes.stuNum - stuArray.length > splitNums || stuArray.length == 0) {
            stuArray = clone(classes.stuList);
        }
        var randomNum = parseInt(stuArray.length * Math.random());

        var currStuNumber = stuArray[randomNum].studentNumber;
        stuArray.remove(randomNum);

        return currStuNumber;
    }

    function selectBySJ() {

        $("#comment_button").hide();
        student = null;
        clearInterval(timer);
        timer = setInterval(function () {
            $(".bgcRed").removeClass("bgcRed");
            currindex = parseInt(classes.stuNum * Math.random());
            $("#stu_" + classes.stuList[currindex].studentNumber).addClass("bgcRed");
        }, 100);
        setTimeout(function () {
            clearInterval(timer);
            $(".bgcRed").removeClass("bgcRed");
            var currStuNumber = getRandomNum();
            $("#stu_" + currStuNumber).addClass("bgcRed");
            $("#comment_button").show();
            /*student=classes.stuList[currindex];
            if(null!=student){
                $("#comment_button").show();
            }*/

        }, 1000);
    }

    function clone(obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    }

    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }

    function commends() {
        if (0 == classes.stuNum) {
            alert("当前班级内没有学生，无法表扬");
            return;
        }
        //alert($(".bgcRed").html());
        if ($(".bgcRed").html() != "") {
            //classes.commends($(".bgcRed").html());
            var selStuList = [];
            var student = new Object();
            student.studentNumber = $(".bgcRed").attr("id").replace(/stu_/g, "");
            student.realname = $(".bgcRed").html();
            //student.headPhoto = $(this).attr("headPhoto");
            selStuList.push(student);
            Praise.execute(1, selStuList, []);
        } else {
            alert("尚未选中学生，无法表扬");
        }
        /*if(null!=student&&undefined!=student){
            classes.commends(student.realname);
        }else{
            alert("尚未选中学生，无法表扬");
        }*/
    }

    function afterSendCallback(praiseType, selStuList, result) {
        //alert("afterSendCallback");
        //return false;
    }

    function onclose() {
        location.href = "close://";
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
