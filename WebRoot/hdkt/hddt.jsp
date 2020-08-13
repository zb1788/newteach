<%@ page language="java" import="java.util.*,java.util.Map" pageEncoding="GBK" %>
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
    <title>互动答题</title>
    <link href="<%=path%>/hdkt/css/hddt.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/hdkt/css/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/dtq.js"></script>
    <script type="text/javascript" src="<%=path%>/newLogin/pages/youjiaoplay/js/swfobject.js"></script>
</head>
<body>
<script type="text/javascript">
    var loginInfo =<%=loginInfo%>;
</script>
<div style="display: none;">
    <OBJECT CLASSID="clsid：B02201C9-1789-4FF0-B95F-C1A03D8B6B99" ID="VCOMPlayer" Name="VCOMPlayer" WIDTH=0 HEIGHT=0>
    </OBJECT>
</div>

<!--答题情况-->
<div id="comments" style="display:none" class="comments">
    <div id='byimgdiv'>
        <img id="comments_img" src="">
    </div>
</div>
<div class="boxCon" id="student_result" style="min-height:430px;"></div>
<!--答题人数-->

<div class="boxCon" id="student_list" style="display: none;min-height:440px;">
    <ul class="stuList"></ul>
    <div class="b"><input class="but " type="button" value="表扬他们"/></div>
    <div class="b"><input class="but " type="button" value="返&nbsp&nbsp&nbsp&nbsp回" onclick="back(0)"/></div>
</div>
<script>
    var answerlist = null;//答案列表
    var countList = null;//答案统计
    var list = null;//学生列表
    classes.init(loginInfo, showCount);

    function getAnswerList() {//读取答案列表
        var cilent_str = VCOMPlayer.ReadInfo("", "clientTool.ini");
        if ("" == cilent_str || null == cilent_str || undefined == cilent_str) {
            back(0);
            return;
        }
        var data = eval("(" + cilent_str + ")");
        if (null != data && undefined != data && undefined != data.answerList) {
            answerlist = data.answerList;
        }
    }

    function setAnswerList() {//读取答案列表
        answerlist = new Array();
        var allAnswers = ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE", "BC", "BD", "BE", "CD", "CE", "DE",
            "ABC", "ABD", "ABE", "ACD", "ACE", "ADE", "BCD", "BCE", "BDE", "CDE",
            "ABCD", "ABCE", "ABDE", "ACDE", "BCDE", "ABCDE", "G", "H"];

        var num = parseInt(classes.stuNum * Math.random());//答案个数，每个学生一个答案

        for (var i = 0; i < num; i++) {
            var istr = i;
            var j = parseInt(33 * Math.random());
            if (i < 10) {
                istr = "0" + i;
            }
            var id = "44A8BD" + istr;
            var ans = {"id": id, "key": allAnswers[j]}
            answerlist.push(ans);
        }
    }

    function setCountList() {
        countList = [{"key": "G", "title": "<img src='newteach/hdkt/image/right.png'/>", "num": 0, "ids": []},
            {"key": "H", "title": "<img src='newteach/hdkt/image/wrong.png'/>", "num": 0, "ids": []},
            {"key": "A", "title": "A", "num": 0, "ids": []},
            {"key": "B", "title": "B", "num": 0, "ids": []},
            {"key": "C", "title": "C", "num": 0, "ids": []},
            {"key": "D", "title": "D", "num": 0, "ids": []},
            {"key": "E", "title": "E", "num": 0, "ids": []},
            {"key": "F", "title": "F", "num": 0, "ids": []}];
        if (null == answerlist) {
            return;
        }

        for (var i = 0; i < answerlist.length; i++) {//统计答题信息
            var ans = answerlist[i];
            for (var j = 0; j < countList.length; j++) {
                var ac = countList[j];
                if (ans.key.indexOf(ac.key) > -1) {
                    ac.num++;
                    var stu = {"id": ans.id, "name": ""};
                    ac.ids.push(stu);
                }
            }
        }
    }

    function initCountDiv() {
        var h = "";
        if (null == answerlist) {
            answerlist = new Array();
            answerlist.length = 0;
        }

        var num2 = classes.stuList.length - answerlist.length;
        if (num2 >= 0) {
            h += "<h3>本题提交人数：<b class='red'>&nbsp" + answerlist.length + "&nbsp</b>人，未提交人数：<b class='red'>&nbsp" + num2 + "&nbsp</b>人，总人数：<b class='red'>&nbsp" + classes.stuList.length + "&nbsp</b>人</h3>";
        } else {
            h += "<h3>本题提交人数：<b class='red'>&nbsp" + answerlist.length + "&nbsp</b>人</h3>";
        }

        var h1 = "";//对与错
        var h2 = "";//abcdef选项

        for (var i = 0; i < countList.length; i++) {
            var hcurr = "";
            var rate = 0;
            var ac = countList[i];
            if (answerlist.length > 0) {
                rate = Math.round(ac.num / answerlist.length * 100)
            }
            hcurr += "<dl class='chart'><dt>" + ac.title + "</dt><dd class='jdb'>";
            hcurr += "<a href='javascript:void(0);'";
            hcurr += " onclick='showStuList(\"" + ac.key + "\")'";
            if (0 == ac.num) {
                hcurr += "class='close-student'><i style='width:" + rate + "%;'></i><b>" + rate + "%</b></a>";
            } else {
                hcurr += "class='close-student hand'><i style='width:" + rate + "%;'></i><b>" + rate + "%</b></a>";
            }

            hcurr += "</dd><dd class='num'>" + ac.num + "人</dd></dl>";

            if (i < 2) {
                h1 += hcurr;
            } else {
                h2 += hcurr;
            }
        }
        if (countList[0].num > 0 || countList[1].num > 0) {
            h += h1 + h2;
        } else {
            h += h2 + h1;
        }


        h += "<div class='b'><input class='but' type='button' value='关&nbsp&nbsp&nbsp&nbsp&nbsp闭' onclick='onclose();'></div>";
        h += "<div class='clearfix'></div>";
        document.getElementById("student_result").innerHTML = h;
        back(0);
    }

    function showCount() {//显示统计信息
        //setAnswerList();//初始化答案列表
        getAnswerList();//获取答案列表
        setCountList();//初始化统计列表
        initCountDiv();//初始化并显示统计面板
    }

    function showStuList(op) {//显示学生列表
        var ids = "";//学生ids串
        for (var i = 0; i < countList.length; i++) {
            var ac = countList[i];
            if (ac.key == op) {
                ids = ac.ids;
                break;
            }
        }

        list = classes.getStuByIds(ids);//获取学生列表

        if (null == list || 0 == list.length) return null;

        var h = "<ul class='stuList'>";
        for (var i = 0; i < list.length; i++) {
            var stu = list[i];
            var title = "";
            if (null == stu.name || "" == stu.name) {
                title = stu.id;
            } else {
                title = stu.name;
            }
            h += "<li><a href='javascript:void(0);' class='bgcGreen'>" + title + "<span>（AB）</span></a></li>";
        }
        h += "</ul><div class='b'><input class='but' type='button' value='表扬他们' onclick='comments()'/>  <input class='but' type='button' value='返&nbsp&nbsp回' onclick='back(0)'/></div>"
        document.getElementById("student_list").innerHTML = h;
        back(1);
    }

    function back(flag) {
        if (0 == flag) {
            document.getElementById("student_result").style.display = "";
            document.getElementById("student_list").style.display = "none";
            list = null;
        } else {
            document.getElementById("student_result").style.display = "none";
            document.getElementById("student_list").style.display = "";
        }

    }

    function comments() {//表扬
        if (null == list || 0 == list.length) {
            return;
        }
        var names = "";
        for (var i = 0; i < list.length; i++) {
            var stu = list[i];
            if (stu.isTrueName && i == 0) {
                names += stu.name;
            } else if (stu.isTrueName) {
                names += "," + stu.name;
            }
        }
        if ("" == names) {
            alert("答题器没有绑定到学生，无法表扬");
            return;
        }
        classes.commends(names);
    }

    function onclose() {
        location.href = "close://";
    }

</script>
</body>
</html>
