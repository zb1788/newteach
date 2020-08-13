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
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/swfobject.js"></script>

    <script type="text/javascript">
        var loginInfo =<%=loginInfo%>;
    </script>
</head>
<body>
<div id="comments" class="comments" style="display:none">
    <div id='byimgdiv'>
    </div>
</div>
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
<OBJECT id="VcomPadTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:57519B34-9C20-4096-AB5D-3D6B3D595253"></OBJECT>
<br>
<script type="text/javascript">
    var currindex = 0;
    var student = null;
    var timer = 0;

    var onlineArr = new Array();//在线学生
    var noOnLneArr = new Array();//不在线学生

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


    function checkIsOnline(stuList) {
        if (onlineArr.length == 0 && noOnLneArr.length == 0) {
            //如果在线和不在线数组都为0才能重新随机数组
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
            if (noOnLneArr.length > 0) {
                noOnLneArr = noOnLneArr.shuffle();
            }
            if (onlineArr.length > 0) {
                onlineArr = onlineArr.shuffle();
            }
        }
    }

    function getRandomNumNew() {
        if (onlineArr.length > 0) {
            var currStuNumber = onlineArr[0].studentNumber;
            onlineArr.splice(0, 1);
        } else if (noOnLneArr.length > 0) {
            var currStuNumber = noOnLneArr[0].studentNumber;
            noOnLneArr.splice(0, 1);
        } else {
            var currStuNumber = '';
        }
        return currStuNumber;
    }

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
        checkIsOnline(classes.stuList);
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
            var currStuNumber = getRandomNumNew();
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
            classes.commends($(".bgcRed").html());
        } else {
            alert("尚未选中学生，无法表扬");
        }
        /*if(null!=student&&undefined!=student){
            classes.commends(student.realname);
        }else{
            alert("尚未选中学生，无法表扬");
        }*/
    }

    function onclose() {
        location.href = "close://";
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
</script>
</body>
</html>
