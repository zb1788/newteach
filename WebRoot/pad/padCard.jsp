<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String loginInfo = request.getParameter("data");
    String type = request.getParameter("type");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    if (loginInfo == null) {
        loginInfo = "null";
    }

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=8,ie=9"/>
    <title>平板签到</title>

    <%--
    <script type="text/javascript" src="<%=path%>/pad/js/init.js?stamp=<%=timestamp %>"></script>
    --%>

    <jsp:include page="/script/jquery172min.jsp?stamp=<%=timestamp %>"></jsp:include>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->

    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js"></script>
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/pad/js/padSet.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>

    <link href="<%=path %>/pad/css/style.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <style>
        body {
            padding: 0;
            background: #fff;
            font-size: 12px
        }

        .top-s {
            font-size: 18px;
            position: absolute;
            top: 0px;
            right: 50px;
        }

        .w-red {
            color: #DC0104;
            font-size: 22px;
        }

        .content {
            padding: 10px 0;
        }

        .content p {
            font: normal 18px/30px "微软雅黑";
            padding: 0 15px;
            height: 35px;
        }

        .dian {
            color: #DC0104;
            background: url(images/zhuyi.png) no-repeat left center;
            padding-left: 25px;
            margin-left: 20px;
        }

        .dian:hover {
            color: #f11518;
            text-decoration: underline;
        }

        .ts SPAN {
            vertical-align: middle;
        }
    </style>
</head>
<body>
<script type="text/javascript">
    var loginInfo =<%=loginInfo%>;
    var type = '<%=type%>';
</script>

<script language="JavaScript" for="VcomPadTool" event="OnGetStatus(nType, UserResults)">
    onSubmit(nType, UserResults);
</script>
<script language="JavaScript" for="VcomPadTool" event="OnGetLockInfo(stuids)">
    OnGetLockInfo(stuids);
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    onGetKeys(id, keys);
</script>
<%--
获取学生上报的结果
--%>
<script language="JavaScript" for="VcomPadTool" event="OnGetResults(userame, lpath)">
    OnGetResults(userame, lpath);
</script>
<div id="result" class="result">
    <div class="title"><a disabled="disabled" style="display: none" href="javascript:pad.exit();"
                          class="close-student-none"></a>
        <h2 id="theme"></h2>
        <span class="top-s" style="display:none" id="signtops">已连接：<b class="w-red"><span
                id="linkedStudentAmount">0</span></b>/<span id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <p class="discuss" style="display:none">小组讨论已开启，学生新建小组或已加入的小组进行讨论。<b>讨论时间： <span id="timer" class="w-red">00：00：00</span></b>
        </p>
        <p class="sign" id="contentDescId" style="display:none">平板互动课堂已开启，请学生按照以下方式连接到平板互动课堂。</p>
        <p class="sign" style="display:none">1.连接本教室wifi，2.使用学生账号登录学生平板。<a style="display: none" class="dian"
                                                                           onclick="alert('请手动设置平板的IP地址!')">仍未连接成功？</a>
        </p>
        <p class="shareTitle" style="display:none">请点击学生姓名，查看学生的分享内容</p>
        <div class="boxCon">
            <ul class="stuList dm-ul" id="studentList">
            </ul>
            <ul class="zu-list clear-fix" id="classGroupList_ul" style="display: none; padding: 90px 0;">
            </ul>

            <div class="ts">
                <ul class="iconTips" id="statusList">
                    <%--<span id="statusColor_10" class="bGreen"></span>已连接（<span id="statusNums_10">0</span>）
                    <span id="statusColor_0" class="bGray"></span>未连接到课堂（<span id="statusNums_0">0</span>）
                    <span id="statusColor_7" class="bGrass"></span>正在分享（<span id="statusNums_7">0</span>）--%>
                </ul>
                <div class="ts-right" style="display: none">
                    <a class="bg-blue" id="2Tab_0" onClick="Show_Tab(0);" href="javascript:">按学生查看</a>
                    <a id="2Tab_1" onClick="Show_Tab(1);" href="javascript:">按组查看</a>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="box-btn">
                <%-- <a class="none" href="javascript:closeBtn();" id="closeBtn" disabled="disabled">关闭</a>--%>
            </div>
            <div class="suo-btn" style="display: block">
                <span id="studentScreen-allsel" style="display: none; vertical-align: middle; line-height: 35px;"><input
                        class="selectAllCheck" onclick="selectAllStudent(this)" type="checkbox"><span>全选</span></span>
                <a id="studentScreen-lockBtn" class="bYellow" style="display: none;" onclick="padlock(1)"><img
                        src="images/suo1.png" class="suo-img" alt="">锁屏</a>
                <a id="studentScreen-unlockBtn" class="bGreen" style="display: none;" onclick="padlock(0)"><img
                        src="images/suo2.png" class="suo-img" alt="">解锁</a>
                <a id="closeBtn" disabled="disabled" class="bBlue-none" onclick="closeBtn()"
                   style="height: 25px;">投屏</a>
            </div>
            <div class="pbottom-top" style="display: none">
                <a id="kqStatusBtn">
                </a>
                <%--
                            <a class="a-word" id="manualCallNameBtn" href="javascript:" onclick="manualCallName()">手动点名</a>
                --%>
                <a id="kqClose" style="display: none" disabled="disabled" class="a-btn-none"
                   href="javascript:closeBtn();">关闭</a>
                <a id="exit2" disabled="disabled" class="a-btn-none" href="javascript:saveKq();">点名结束</a>

            </div>

        </div>
    </div>
</div>
<i id="exit" class="pbottom-i-none" disabled="disabled" style="display: none" onclick="pad.exit();"></i>

<script type="text/javascript">
    $(document).ready(function () {

        //开发使用
        if (type == "classkq") {
            //type="beginClass";
            //type="classkqCard";
            //type="studentScreen";
        }
        //
        var h = "";
        for (var i = 0; i < pad.statusList.length; i++) {
            h += "<li style='display:none' id='status_" + pad.statusList[i].id + "'><span class='icons " + pad.statusList[i].icon + "'></span>" + pad.statusList[i].name + "（<font id='statusNum_" + pad.statusList[i].id + "'>0</font>）</li>";
        }
        $("#statusList").html(h);

        if (type == "sign") {
            pad.sign();
        } else if (type == "padStatus") {
            pad.padStatus();
        } else if (type == "beginClass") {
            pad.padStatus();
        } else if (type == "endClass") {
            //新版 下课
            pad.padStatus();
        } else if (type == "finishClass") {
            pad.finishClass();
        } else if (type == "sendToPad") {
            pad.sendToPad();
        } else if (type == "yuxizuoda") {
            pad.sendToPad();
            $("#theme").html("互动探究情况");
            $("#closeBtn").html('探究结束，查看反馈');
        } else if (type == "discuss") {
            pad.discuss();
        } else if (type == "share") {
            pad.share();
        } else if (type == "classkq" || type == "classkqCard") {
            pad.classkq();
        } else if (type == "studentScreen") {
            pad.studentScreen();
        } else {
            alert("参数错误！");
        }
        classes.init(loginInfo, function () {
            var lockClass = "lock";
            if (pad.lockVisible == false) {
                lockClass = "";
            }
            var canSelClass = "canSel";
            var cursorClass = "cursor:pointer";
            if (pad.canSel == false) {
                canSelClass = "";
                cursorClass = "cursor:default";
            }
            var rlist = classes.stuList;
            var h = "";
            for (var i = 0; i < rlist.length; i++) {
                var stu = rlist[i];
                h += "<li studentNumber='" + stu.studentNumber + "' ><a style='" + cursorClass + "' id='student_" + stu.studentNumber + "'  onclick='' class='off'>" + stu.realname + "</a><b class=''></b><i class=" + canSelClass + "></i></li>";
            }
            $(".stuList").html(h);
            $("#allStudentAmount").html(rlist.length);
            $("#statusNum_0").html(rlist.length);


            if (type == "classkq" || type == "classkqCard") {
                pad.classkqHtml();
            }

            $('.dm-ul').children('li').click(function () {
                $(this).children('i.canSel').toggleClass('dm-i');
            });
        });

        setTimeout("initVcomPadTool();", 500);

    });

    function initVcomPadTool() {

        if (type == "sendToPad") {
            VcomPadTool.InitConnectPad("");
            VcomPadTool.StartPapersAnswer(decodeURIComponent(decodeURIComponent(loginInfo.downloadurl)), loginInfo.paper_id);
        } else if (type == "yuxizuoda") {
            VcomPadTool.InitConnectPad("");
            var downloadurl = decodeURIComponent(decodeURIComponent(loginInfo.downloadurl));
            VcomPadTool.StartPreviewWork(downloadurl, loginInfo.paper_id);
        } else if (type == "discuss") {
            VcomPadTool.InitConnectPad("");
            VcomPadTool.StartGroupTalk();
        } else if (type == "share") {
            VcomPadTool.InitConnectPad("");
            VcomPadTool.StartShareResult();
        } else if (type == "beginClass") {
            VcomPadTool.InitConnectPad("");
            VcomPadTool.StartClass();
        } else if (type == "endClass") {
            VcomPadTool.InitConnectPad("");
            VcomPadTool.StopClass();
        } else if (type == "classkqCard") {
            VcomAQTool.Start();//答题卡课堂考勤
        } else {
            VcomPadTool.InitConnectPad("");
        }

        setTimeout('' +
            '$("#closeBtn").attr("class","bBlue");$("#closeBtn").removeAttr("disabled");' +
            '$("#exit").attr("class","pbottom-i");$("#exit").removeAttr("disabled");' +
            '$("#exit2").attr("class","a-btn");$("#exit2").removeAttr("disabled");' +
            '$("#kqClose").attr("class","a-btn-close");$("#kqClose").removeAttr("disabled");', 2000);

    }

    function waitLockInfo(count) {
        var timerId = setInterval(function () {
            if (count <= 0) {
                pad.timeFlag = false;
                clearInterval(timerId);
            } else {
                count--;
                return false;
            }

        }, 1000);
    }

    function OnGetLockInfo(stuids) {
        if (pad.timeFlag) {
            //当设置锁屏/解锁后 3秒内不更新锁屏信息
            if (!waitLockInfo(3)) {
                return;
            }
        }
        //
        for (var j = 0; j < classes.stuList.length; j++) {
            var stu = classes.stuList[j];
            // 1锁屏 0 解屏
            //取消显示锁屏
            if ((";" + stuids + ";").indexOf(";" + stu.studentNumber + ",1;") == -1) {
                $("#student_" + stu.studentNumber).parent("li").children('b').attr("class", '');
            } else {
                $("#student_" + stu.studentNumber).parent("li").children('b').attr("class", 'lock');
            }
        }

    }

    function onSubmit(nType, UserResults) {
        //日志
        /*        var log = "功能:"+type+"; "+"nType:"+nType+"; "+"UserResults:"+UserResults+"; ";
                pad.addLog(log);*/

        if (nType == 11) {
            $("#sendToPadtops").html('下载到授课端成功！<img class="tl-img" src="images/ok.png">');
            return;
        } else if (nType == 12) {
            $("#sendToPadtops").html('下载到授课端失败！<img class="tl-img" src="images/fail.png">');
            return;
        } else if (nType == 10) {
            for (var j = 0; j < classes.stuList.length; j++) {
                var stu = classes.stuList[j];
                //将未连接的学生置灰
                if (("," + UserResults + ",").indexOf("," + stu.studentNumber + ",") == -1) {

                    //学生投屏 //如果投屏的学生若干次未连接，需要通过插件通知投屏界面
                    if (("," + pad.screenStuids + ",").indexOf("," + stu.studentNumber + ",") != -1) {
                        VcomPadTool.InsertIntoAddress(stu.studentNumber, "", "");
                    }

                    //自动点名连接一次后不再显示断开状态
                    if (type == "classkq") {
                        continue;
                    } else if (type == "studentScreen") {
                        $("#student_" + stu.studentNumber).siblings("i").attr("class", "");
                        $("#student_" + stu.studentNumber).attr("cursor", "default");
                    }

                    var student_css = $("#student_" + stu.studentNumber).attr("class");
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("on", "off"));
                } else {
                    //自动点名连接一次后不再显示断开状态
                    if (type == "classkq") {
                        //如果该学生为未点名才允许继续操作
                        if ($("#student_" + stu.studentNumber).attr("class") != pad.kqStatusList[0].color) {
                            continue;
                        }
                        $("#student_" + stu.studentNumber).attr("class", pad.kqStatusList[1].color);

                        //统计人数
                        setKqStatus(1);
                        //刷新当前类型下学生状态
                        $("#kqStatusBtn").find(".pb-cur").click();
                        continue;
                    } else if (type == "studentScreen") {
                        //alert($("#student_" + stu.studentNumber).siblings("i").attr("class"));
                        if ($("#student_" + stu.studentNumber).siblings("i").attr("class").indexOf("dm-i") == -1) {
                            $("#student_" + stu.studentNumber).siblings("i").attr("class", "canSel");
                            $("#student_" + stu.studentNumber).attr("cursor", "pointer");
                        }
                    }
                    var student_css = $("#student_" + stu.studentNumber).attr("class");
                    //alert(student_css);
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("off", "on"));
                    /*if($("#studentColor_" + stu.studentNumber).attr("class")!="bGreen")
                    {
                        $("#studentColor_" + stu.studentNumber).attr("class", "bGreen");
                    }*/
                }
            }
            //计算各状态人数
            setStatus();
            return;
        }

        var icon = "";
        for (var i = 0; i < pad.statusList.length; i++) {
            if (pad.statusList[i].id == nType) {
                icon = pad.statusList[i].icon;
            }
        }
        //如果命令无效，直接返回
        if (icon == "") {
            return;
        }

        var results = UserResults.split(",");
        for (var i = 0; i < results.length; i++) {

            var stuId = results[i];
            //设置学生颜色
            setLimitIcon(stuId, icon);
        }
        //计算各状态人数
        setStatus();

    }

    //设置学生颜色图标，过滤颜色该操作下是否允许出现
    function setLimitIcon(stuId, icon) {
        //设置不同功能允许的颜色变化限制
        var icons;
        if (type == "sign" || type == "beginClass" || type == "finishClass") { //仅允许未连接 已连接
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon;
        } else if (type == "sendToPad" || type == "yuxizuoda") {
            //仅允许未连接 已连接 正在下载 下载失败 正在作答 作答完成
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[2].icon + "," + pad.statusList[3].icon + "," + pad.statusList[4].icon + "," + pad.statusList[5].icon;
        } else if (type == "discuss") {
            //仅允许未连接 已连接 正在讨论
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[6].icon;
        } else if (type == "share") {
            //仅允许未连接 已连接 分享完成 正在分享
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[7].icon + "," + pad.statusList[8].icon;
        }
        if (icons.indexOf(icon) == -1)
            return;

        $("#student_" + stuId).attr("class", "on " + icon);
    }

    function setStatus() {
        //计算各状态人数
        for (var i = 0; i < pad.statusList.length; i++) {
            var sel = $(".stuList li").find("." + pad.statusList[i].icon);
            $("#statusNum_" + pad.statusList[i].id).html(sel.length);
            if (i == 1) {
                $("#linkedStudentAmount").html(sel.length);
            }
        }

    }

    function setKqStatus(id) {
        //考勤 计算各状态人数
        var sum = 0;
        for (var i = 1; i < pad.kqStatusList.length; i++) {
            var sel = $(".stuList li").find("." + pad.kqStatusList[i].color);
            $("#kqStatusNum_" + pad.kqStatusList[i].id).html(sel.length);
            sum = sum + sel.length;
        }
        //未点名为班级总人数-各状态之和
        $("#kqStatusNum_" + pad.kqStatusList[0].id).html(classes.stuList.length - sum);
    }

    function OnGetResults(username, submitType) {
        //日志
        /*            var log = "功能:"+type+"; "+"username:"+username+"; "+"submitType:"+submitType+"; ";
                    pad.addLog(log);*/

        //submitType 1 试卷作答完成  2 预习作答完成
        //alert("submitType:"+submitType +";username:"+username+";type:"+type);
        if ((type == "sendToPad" && submitType == "1") || (type == "yuxizuoda" && submitType == "2")) {
            //作答完成
            $("#student_" + username).attr("class", "on writeOk");
        } else if (type == "share" && submitType != "1" && submitType != "2") {
            //根据username获取realname
            var realname = "";
            var stu = classes.getStuById(username);
            if (stu != null) {
                realname = stu.realname
            } else {
                alert("获取学生" + username + "姓名失败！");
            }

            var url = "shareresource://username=" + realname + "&lpath=" + submitType + "&";
            //分享完成
            $("#student_" + username).attr("class", "on shareOk");
            $("#student_" + username).attr("style", "cursor:pointer");
            $("#student_" + username).bind("click", function () {
                eval(window.location.href = url);
            });
            //按组查看
            $("#classGroupStu_" + username).attr("class", "bBlue w-white");
            $("#classGroupStu_" + username).bind("click", function () {
                eval(window.location.href = url);
            });

        }
        setStatus();

    }

    function onGetKeys(id, key) {//提交事件

        var stu = classes.getStuById(id);

        var title = "";
        if (null != stu) {
            title = stu.realname;
        } else {
            title = id;
            //不是该班学生
            return;
        }
        //自动点名连接一次后不再显示断开状态
        if (type == "classkqCard") {
            //如果该学生为未点名才允许继续操作
            if ($("#student_" + stu.studentNumber).attr("class") != pad.kqStatusList[0].color) {
                return;
            }
            $("#student_" + stu.studentNumber).attr("class", pad.kqStatusList[1].color);

            //统计人数
            setKqStatus(1);
            //刷新当前类型下学生状态
            $("#kqStatusBtn").find(".pb-cur").click();
        }
        //VcomAQTool.Stop();
    }

    function closeBtn() {	//开始上课loginInfo.classId

        //$("#closeBtn").attr('class',"none");
        //$("#closeBtn").attr('disabled','disabled');

        if (type == "sign") {
            VcomPadTool.StartClass();
            VcomPadTool.UnInit();
            location.href = "padstart://";
        } else if (type == "finishClass") {
            VcomPadTool.StopClass();
            VcomPadTool.UnInit();
            location.href = "padstop://";
        } else if (type == "discuss") {
            VcomPadTool.StopGroupTalk();
            VcomPadTool.UnInit();
            location.href = "close://";
        } else if (type == "share") {
            if ($("#closeBtn").html() != "关闭") {
                VcomPadTool.StopShareResult();
                $("#closeBtn").html('关闭');
            } else {
                VcomPadTool.UnInit();
                location.href = "close://";
            }

        } else if (type == "sendToPad") {
            VcomPadTool.StopPapersAnswer();
            VcomPadTool.UnInit();
            location.href = "close://";
            //var fankui = "mybrowser://width:1280&&height:1024@@http://tqms.youjiaotong.com/online/interface/answerdevice/viewClassPracticeDevice.action?rcode=61d4f252ae284b6aaf9816a3b3400c3f&rsType=6&classId=00010203020402&studentClass=141982115612614619&username=41010155550019&userTrueName=%25E6%2596%25B0%25E8%2580%2581%25E5%25B8%25885%25E5%25B9%25B4%25E7%25BA%25A7%25E5%25AD%25A6%25E7%2594%259F%25E5%25A7%2593%25E5%2590%258D&areaId=1.1.1&viewFeedback=1&isEbook=1&loginStyle=0";
            //fankui = "mybrowser://width:1280&&height:1024@@https://www.baidu.com/";
            //location.href = fankui;
            //
            /*ajaxJson("http://127.0.0.1:9325","socketUrl="+fankui+"&endSocket","gbk",function(r){
                return;
            });*/

        } else if (type == "yuxizuoda") {
            VcomPadTool.StopPreviewWork(loginInfo.paper_id);
            VcomPadTool.UnInit();
            location.href = "close://";
        } else if (type == "studentScreen") {
            //投屏
            padlock(2);
        } else {
            VcomPadTool.UnInit();
            location.href = "close://";
        }

    }

    if (screen.width > 2600) {
        myZoom.setZoom('#result');
        var twidth = $(window).width();
        var theight = $(window).height();
        $("#result").css("width", zoomWidth(twidth - 20) + "px");
        $("#result").css("height", zoomWidth(theight) + "px");
    }
</script>
<%--
<OBJECT id="VcomPadTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:57519B34-9C20-4096-AB5D-3D6B3D595253"></OBJECT><br>
--%>
<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>
<br>
<!-------抢答-------->
</body>
</html>
