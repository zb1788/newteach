<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%

    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String loginInfo = request.getParameter("data");
    String updateDb = request.getParameter("updateDb");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    if (loginInfo == null) {
        loginInfo = "null";
    }

    if (updateDb == null) {
        updateDb = "0";
    }

    String teachComputerMac = request.getParameter("teachComputerMac");

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>平板签到</title>
    <script type="text/javascript" src="../script/jquery172min.js?stamp=<%=timestamp %>"></script>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="../script/artDialog/artDialog.js?skin=default"></script>
    <script type="text/javascript" src="../script/artDialog/artDialog.fix.js"></script>
    <script type="text/javascript" src="../script/artDialog/plugins/iframeTools.js"></script>
    <script type="text/javascript" src="../js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../js/commondiv.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../js/common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../script/base64.js"></script>
    <script type="text/javascript" src="./js/jquery.cookie.js"></script>
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <link href="../smartpaper/css/discuss.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <style>
        html, body {
            height: 100%;
            position: relative;
        }

        body {
            padding: 0;
            background: #fff;
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
            background: url(../pad/images/zhuyi.png) no-repeat left center;
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

        .backDev {
            display: inline-block;
            border: solid 1px #ddd;
            padding: 5px;
            cursor: pointer;
        }

        .checkedspan {
            background-color: rgba(51, 153, 255, 1)
        }
    </style>
</head>
<body>
<script type="text/javascript">
    var loginInfo =<%=loginInfo%>;
    var _config =<%=_config.toString() %>;
    var transferProtocol_web = _config.LOCAL_PROTOCOL;
    if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
        //协议未配置默认http
        transferProtocol_web = "http://";
    } else {
        transferProtocol_web = transferProtocol_web + "://";
    }
    var basePath = '<%=basePath%>';
</script>


<script language="JavaScript" for="VcomAQTool" event="OnGetOnlineMacs(strmacs,type)">
    OnGetOnlineMacs(strmacs, type);
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    OnGetKeys(id, keys);
</script>

<div id="result" class="result">
    <div class="title">
        <h2 id="theme">状态查看</h2>
        <span class="top-s" id="signtops">搜索到的设备数：<b class="w-red"><span id="linkedStudentAmount">0</span></b><span
                style="display:none;" id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <p class="discuss" id="tips" style="display:none;">按键绑定已开启，学生按照名字前面的字母通过手写板进行绑定。</p>
        <div class="boxCon">
            <ul class="stuList dm-ul" id="studentList">

            </ul>
            <div class="ts" style="position: absolute;bottom: 40px;width:100%;">
                <ul class="iconTips" id="statusList">
                    <span id="statusColor_10" class="bon"></span>已连接（<font id="onlineCount">0</font>）
                    <span id="statusColor_0" class="bGray"></span>未连接（<font id="offlineCount">0</font>）
                    <span id="statusColor_7" class="bunbind"></span>未绑定（<font id="unBindCount">0</font>）
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="suo-btn" style="display: block;bottom:2px;">
                <a id="startBind" class="bBlue" style="cursor: pointer;" onclick="startBind()">开始绑定</a>
                <a id="changeBind" class="bBlue" style="display: none;cursor: pointer;"
                   onclick="changeBind()">更换学生书写板</a>
                <a id="bindTypeChange" class="bBlue" style="display: none;cursor: pointer;" onclick="bindTypeChange()">切换绑定模式</a>
                <a id="goOrderBind" class="bBlue" style="display: none;cursor: pointer;"
                   onclick="goOrderBind()">进入书写板编号</a>
            </div>
        </div>
    </div>
</div>
<i id="exit" class="pbottom-i-none" disabled="disabled" style="display: none;z-index:99999" onclick="closePage();"></i>

<div id="changePage" style="display:none;">

</div>

<div id="changeType" style="display:none;">
    <span class="backDev" bindType="2">字母绑定</span>
    <span class="backDev" bindType="1">序号绑定</span>
</div>

<script type="text/javascript" src="../js/eruda.js"></script>
<script>
    setTimeout(function () {
        try {
            eruda.init();
        } catch (e) {
            alert("eruda is not defined!");
        }
    }, 100)
</script>

<script type="text/javascript">
    var studentListArr = [];//所有学生名单
    var baseKeyArr = [];//生成字母数组
    //定义可选字符集
    var testArray = ["A", "B", "C", "D", "E", "F", "G"];
    var studentByKey = [];//学生字母跟账号的对应关系

    var macIndex = {};//mac在studentListArr中的位置
    var studentIndex = {};//student在studentListArr中的位置
    var teachComputerMac = "<%=teachComputerMac%>";//教室电脑mac
    var updateDb = 0;//是否更新数据库0不更新1更新
    var smartPaperBindType;//当前绑定模式
    var tmsUrl;
    var smartPapersBackup = [];//备用平板
    var userType = loginInfo.userType;//用户类型 2 教师 4 学生 0 家长 3 管理员
    var isStart = false;//是否启用绑定
    var isResetWhite = false;//是否需要重新设置白名单
    var OnlineMacArr = [];//连接到AP的设备数组

    var isFilter = true;//是否过滤不在白名单的mac
    //teachComputerMac = '6C-4B-90-78-9B-E7';

    var d;
    $(function () {
        d = art.dialog.defaults;
        d.zIndex = 0;
        tmsUrl = transferProtocol_web + _config["TMS"];
        // tmsUrl = 'http://192.168.144.111';

        initPage();


        setTimeout('' +
            '$("#exit").attr("class","pbottom-i");$("#exit").removeAttr("disabled");$("#exit").show();', 2000);
    })

    //测试样式
    function testCss() {
        alert($(window).height());
        alert($('ul.stuList li a').height());
        alert($('ul.stuList li a').css('padding'));
        alert($('ul.stuList li a span').height());
    }


    //初始化页面，获取学生信息
    function initPage() {
        var url = tmsUrl + "/tms/interface/queryStudent.jsp?";
        url += "queryType=answerToolByClass&schoolClassId=" + loginInfo.classId + "&teachComputerMac=" + teachComputerMac + "&smartPaperEnable=1";
        ajaxJson(url, null, "gbk", showStudentList);
    }

    function showStudentList(data) {
        var rlist = data.rtnArray;
        var h = "";
        for (var i = 0; i < rlist.length; i++) {
            var obj = {};
            var stu = rlist[i];
            obj.studentNumber = stu.studentNumber;
            obj.smartPaperMac = stu.smartPaperMac;
            obj.realname = stu.realname;
            studentListArr.push(obj);

            studentIndex['"' + stu.studentNumber + '"'] = i;

            //手写板绑定模式 0 手写板未启用 1 按号领取  2 绑定用户
            smartPaperBindType = data.smartPaperBindType;
            if (smartPaperBindType == 0) {
                //手写板未启用按照字母绑定
                smartPaperBindType = 2;
            }
            if (stu.smartPaperMac == '') {
                //未绑定用户
                h += "<li studentNumber='" + stu.studentNumber + "' ><a id='student_" + stu.studentNumber + "'  class='no'><span>" + stu.realname + "</span></a><i></i></li>";
            } else {
                //不在线
                macIndex['"' + stu.smartPaperMac + '"'] = i;

                var noHtml = "";
                if (smartPaperBindType == 1) {
                    //序号领取
                    noHtml = "<em>" + stu.smartPaperGetNumber + "</em>";
                }
                h += "<li studentNumber='" + stu.studentNumber + "' ><a id='student_" + stu.studentNumber + "'  class='off'>" + noHtml + "<span>" + stu.realname + "</span></a><i></i></li>";
            }

        }
        console.log('studentListArr:');
        console.log(studentListArr);
        console.log('macIndex:');
        console.log(macIndex);
        console.log('studentIndex:');
        console.log(studentIndex);
        //一键排序后，如果不设置白名单，排序后的板子无法连接（弃用）


        smartPapersBackup = data.smartPapersBackup;


        // for(var i=0;i<80;i++){
        // 	h += '<li studentNumber="34010110000001"><a class="no" id="student_34010110000001"><span>ynchild</span></a><i></i></li>';
        // }

        $(".stuList").html(h);


        if (smartPaperBindType == 1) {
            //增加单选按钮
            changeBindBtn();
            //不展示绑定按钮
            $('#startBind').hide();
        } else if (smartPaperBindType == 2) {
            //需要绑定

        }


        //根据权限判断是否展示替换设备和切换绑定模式和批量绑定
        if (userType == 3) {
            $('#bindTypeChange').show();
            if (smartPaperBindType == 1) {
                $('#goOrderBind').show();
            }
        } else {
            $('#bindTypeChange').hide();
            $('#goOrderBind').hide();
        }


        $('#studentList').height($(window).height() - 190);

        //更新状态
        updateStudentStatus();

        //初始化插件开始获取连接上的mac
        setTimeout("initVcomTool();", 500);

    }

    function initVcomTool() {
        console.log('开启在线状态查看');
        try {
            VcomAQTool.SetOnlineMacs();
        } catch (e) {
        }
    }


    //更新已连接/未连接/未绑定状态
    function updateStudentStatus() {
        var sel = $(".stuList li").find(".on");
        $("#onlineCount").html(sel.length);

        var sel = $(".stuList li").find(".off");
        $("#offlineCount").html(sel.length);

        var sel = $(".stuList li").find(".no");
        $("#unBindCount").html(sel.length);
    }

    //展示单选框
    function changeBindBtn() {

        $("ul.stuList li").each(function () {
            if ($(this).find('em').length != 0) {
                $(this).find('i').eq(0).attr('class', 'canSel');
            }
        })

        //按号领取的才能替换设备
        var noCheckedNum = $('i.canSel').size();
        if (noCheckedNum == 0) {
            //如果用户都没有序号，则不显示替换按钮
            $('#changeBind').hide();
            if (userType != 3) {
                alert('请联系管理员先进行序号绑定！')
            }
        } else {
            if (smartPapersBackup.length == 0) {
                $('#changeBind').hide();
            } else {
                $('#changeBind').show();
            }
        }

        $('.dm-ul').children('li').click(function () {
            // var checkedNum = $('i.dm-i').size();

            // if(checkedNum > 0){
            // 	//单选，先清空选中
            // }

            var isCheck = false;
            if ($(this).children('i.canSel').hasClass('dm-i')) {
                isCheck = true;
            }
            $("ul.stuList li ").each(function () {
                if ($(this).find('em').length != 0) {
                    $(this).children('i').attr('class', 'canSel');
                }
            })

            //当前按钮未选中，就选中他
            if (!isCheck) {
                $(this).children('i.canSel').addClass('dm-i');
            }
        });
    }

    //切换绑定模式
    function bindTypeChange() {
        if (smartPaperBindType == 1) {
            $('#changeType').children('span').eq(1).addClass('checkedspan');
            $('#changeType').children('span').eq(0).removeClass('checkedspan');
        } else if (smartPaperBindType == 2) {
            $('#changeType').children('span').eq(0).addClass('checkedspan');
            $('#changeType').children('span').eq(1).removeClass('checkedspan');
        }

        $('#changeType').children('span').click(function () {
            $('#changeType span').each(function () {
                $(this).removeClass('checkedspan');
            })
            $(this).addClass('checkedspan');
        })


        var pageDom = document.getElementById("changeType");
        d.zIndex = 10000;
        art.dialog({
            title: '请选择要切换的模式',
            content: pageDom,
            button: [
                {
                    name: '切换',
                    callback: function () {
                        var nowBindType = $('#changeType span.checkedspan').attr('bindType');
                        var url = tmsUrl + "/tms/clientInterface/changeSmartPaperBindType.do?";
                        url += "schoolId=" + loginInfo.schoolId + "&smartPaperBindType=" + nowBindType + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();
                        ajaxJson(url, null, "gbk", function (rdata) {
                            //判断是否能切换到序号绑定
                            if (rdata.bindResult != 0) {
                                // window.location.reload();
                                //重新获取白名单并设置
                                var url = tmsUrl + "/tms/interface/queryStudent.jsp?";
                                url += "queryType=answerToolByClass&schoolClassId=" + loginInfo.classId + "&teachComputerMac=" + teachComputerMac + "&smartPaperEnable=1";
                                ajaxJson(url, null, "gbk", function (data) {
                                    var rlist = data.rtnArray;
                                    var macArrTmp = [];
                                    for (var i = 0; i < rlist.length; i++) {
                                        var stu = rlist[i];
                                        macArrTmp.push(stu.smartPaperMac);
                                    }
                                    try {
                                        VcomAQTool.SetNewList(macArrTmp.join(','));
                                    } catch (e) {
                                        alert('设备白名单失败');
                                    }
                                    setTimeout("window.location.reload();", 500);
                                });
                            } else {
                                alert(rdata.bindResultInfo);
                                //art.dialog.tips(rdata.bindResultInfo, 3)
                                return false;
                            }

                        });
                        d.zIndex = 0;
                    }
                }
            ]
        })
    }


    //替换设备
    function changeBind() {
        if (smartPapersBackup.length == 0) {
            alert('暂无备用设备');
            return false;
        }
        var checkedNum = $('i.dm-i').size();
        if (checkedNum == 0) {
            alert('请先选择要更换设备的学生');
            return false;
        }

        var smartPaperNumberFrom = $('.stuList i.dm-i').prev('a').find('em').html();
        var teacherNumberNow = $('.stuList i.dm-i').parent('li').attr('studentNumber');

        var backHtml = '';
        if (smartPapersBackup.length > 0) {
            smartPapersBackup.sort(sortBySmartPaperNumber);
            $.each(smartPapersBackup, function (k, v) {
                backHtml += '<span class="backDev" mac=' + v.smartPaperMac + '>' + v.smartPaperNumber + '</span>';
            })
        } else {
            backHtml += '<span>暂无备用设备</span>';
        }

        $('#changePage').html(backHtml);
        if (smartPapersBackup.length > 0) {
            $('#changePage span').eq(0).addClass('checkedspan');


            $('#changePage').children('span').click(function () {
                $('#changePage span').each(function () {
                    $(this).removeClass('checkedspan');
                })
                $(this).addClass('checkedspan');
            })
        }


        var pageDom = document.getElementById("changePage");
        d.zIndex = 10000;
        art.dialog({
            title: '请选择要替换的设备编号',
            content: pageDom,
            button: [
                {
                    name: '替换',
                    callback: function () {
                        if (smartPapersBackup.length == 0) {
                            alert('没有备用设备可以替换！');
                            return false;
                        }
                        var smartPaperNumberTo = $('#changePage span.checkedspan').html();
                        var smartChangeMac = $('#changePage span.checkedspan').attr('mac');
                        var url = tmsUrl + "/tms/clientInterface/exchangeSmartPaperOrder.do?";
                        url += "schoolId=" + loginInfo.schoolId + "&smartPaperNumberFrom=" + smartPaperNumberFrom + "&smartPaperNumberTo=" + smartPaperNumberTo + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();
                        ajaxJson(url, null, "gbk", function (rdata) {
                            //window.location.reload();
                            if (rdata.bindResult != 0) {
                                delete macIndex['"' + studentListArr[studentIndex['"' + teacherNumberNow + '"']].smartPaperMac + '"'];
                                macIndex['"' + smartChangeMac + '"'] = studentIndex['"' + teacherNumberNow + '"'];
                                studentListArr[studentIndex['"' + teacherNumberNow + '"']].smartPaperMac = smartChangeMac;
                                $('.stuList i.dm-i').prev('a').find('em').html(smartPaperNumberTo);
                                $('#student_' + teacherNumberNow).attr("class", 'off');
                                //重新获取备用板子
                                var url = tmsUrl + "/tms/interface/queryStudent.jsp?";
                                url += "queryType=answerToolByClass&schoolClassId=" + loginInfo.classId + "&teachComputerMac=" + teachComputerMac + "&smartPaperEnable=1";
                                ajaxJson(url, null, "gbk", function (rdata) {
                                    smartPapersBackup = rdata.smartPapersBackup;
                                });
                                //isResetWhite = true;
                                //替换之后重新设置白名单
                                setWhiteMac();
                                updateDb = 1;
                            } else {
                                alert(rdata.bindResultInfo);
                            }
                        });
                        d.zIndex = 0;
                        return true;
                    }
                }
            ]
        })

    }

    function sortBySmartPaperNumber(a, b) {
        return a.smartPaperNumber - b.smartPaperNumber;
    }


    //进入序号批量绑定页面
    function goOrderBind() {
        try {
            VcomAQTool.Stop();
        } catch (e) {
            alert('VcomAQTool.Stop() failed')
        }
        window.location.href = 'smartPaperBindByManager.jsp?data=' + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac;
    }

    //开始绑定
    function startBind() {
        $('#startBind').hide();
        $('#bindTypeChange').hide();

        for (var i = 1; i < 5; i++) {
            generateString("", i);
        }

        var i = 0;
        $('#studentList li').each(function () {
            //每个学生添加字母
            var item = baseKeyArr[i];
            if (i < 70 && typeof item != 'undefined') {
                var tmpHtml = $(this).find('a').html();
                var str = '<em>' + item + '</em>' + tmpHtml;
                $(this).find('a').html(str);
                studentByKey[item] = $(this).attr('studentnumber');

                //把未绑定的改为未连接
                if ($(this).find('a').attr('class') == 'no') {
                    //$(this).find('a').attr('class','');
                }
                i++;
            }
        })

        $('#tips').show();


        // return false;

        console.log('关闭白名单');
        //关闭白名单
        VcomAQTool.CloseWhiteCard();
        //开始绑卡
        setTimeout("start();", 100);
    }

    function start() {
        console.log('VcomAQTool.Start()');
        isStart = true;
        //isFilter = false;
        try {
            VcomAQTool.Start();
        } catch (e) {

        }
    }


    //关闭页面
    function closePage() {
        //setWhiteMac();
        if (isStart) {
            try {
                VcomAQTool.Stop();
            } catch (e) {
                alert('VcomAQTool.Stop() failed')
            }
            setWhiteMac();
            location.href = "updatedb://";
        } else {
            if (updateDb == 1) {
                location.href = "updatedb://";
            } else {
                location.href = "close://";
            }
        }


        // var sk_updatedb = $.cookie('sk_updatedb');
        // if(isResetWhite || sk_updatedb == '1'){
        // 	//setLocalStorage('setLocalStorage', '0');
        // 	setWhiteMac()
        // 	$.cookie('sk_updatedb', '0');
        // 	location.href = "updatedb://";
        // }else{
        // 	location.href = "close://";
        // }

        return false;
    }

    function setWhiteMac() {
        //alert('设置白名单');
        console.log('设置白名单');
        //打开白名单
        var macList = Object.keys(macIndex).join(',').replace(/"/g, "");

        try {
            VcomAQTool.SetNewList(macList);
        } catch (e) {
            alert('设备白名单失败');
        }

    }

    function clientMsg() {
        var port = getSocketPort();
        var myDate = new Date();
        // var url = "http://127.0.0.1:"+port+"?handwriteflag=UpdateClassstudent";
        console.log(myDate.getSeconds());
        ajaxJson("http://127.0.0.1:" + port, "handwriteflag=UpdateClassstudent", "gbk", function (r) {

        });
        console.log(myDate.getSeconds());

        //打开白名单
        var macList = Object.keys(macIndex).join(',').replace(/"/g, "");
        VcomAQTool.SetNewList(macList);
        console.log(myDate.getSeconds());
    }


    //回调函数获取用户按键内容( id位mac，keys为ABCD)
    function OnGetKeys(mac, keys) {
        console.log('原始mack|key:' + mac + '|' + keys);
        //先替换G为F，后替换H为G，顺序不能错
        keys = keys.replace("G", "F").replace("H", "G");
        console.log('替换后的key');
        console.log('mac:' + mac + '|keys:' + keys);
        console.log(studentByKey[keys]);
        var studentNumber = studentByKey[keys];

        if (typeof studentNumber != 'undefined') {
            var url = tmsUrl + "/tms/clientInterface/bindStudentSmartPaper.do?";
            url += "studentNumber=" + studentNumber + "&classId=" + loginInfo.classId + "&schoolId=" + loginInfo.schoolId + "&smartPaperMac=" + mac + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();

            ajaxJson(url, null, "gbk", function (rdata) {
                if (rdata.bindResult == 1) {
                    //先解绑
                    if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                        var stu = studentListArr[macIndex['"' + mac + '"']];
                        $('#student_' + stu.studentNumber).attr('class', 'no');
                        studentListArr[macIndex['"' + mac + '"']].smartPaperMac = '';
                        delete macIndex['"' + mac + '"'];
                    }

                    //再绑定
                    var stu = studentListArr[studentIndex['"' + studentNumber + '"']];

                    console.log('stu:' + stu);
                    console.log('#student_' + stu.studentNumber);
                    $('#student_' + stu.studentNumber).attr('class', 'on');
                    delete macIndex['"' + stu.smartPaperMac + '"'];
                    macIndex['"' + mac + '"'] = studentIndex['"' + studentNumber + '"'];
                    studentListArr[studentIndex['"' + studentNumber + '"']].smartPaperMac = mac;

                    updateStudentStatus();
                    //isResetWhite = true;
                } else {
                    //alert('绑定失败');
                    if (rdata.bindResultInfo != '抱歉，您绑定的设备不是手写板') {
                        alert(rdata.bindResultInfo);
                    }
                }
            });
        }

    }


    function getAjax(url) {
        $.ajax({
            url: url,
            dataType: "json",
            type: 'get',
            time: 5000,
            success: function (data, textStatus) {   //成功后回调
                console.log('a');
                console.log(data);
                console.log(textStatus);
            },
            error: function (e) {    //失败后回调
                console.log('error');
                console.log(e);
            }
        })
    }


    //回调函数获取连接上的手写板mac,type1:连接，2：断开
    function OnGetOnlineMacs(mac, type) {
        console.log(mac + '|' + type);

        if (!isStart) {
            //开始绑定就不过滤数据了
            //新增，如果不在白名单的数据直接抛弃
            if (typeof macIndex['"' + mac + '"'] == 'undefined') {
                return false;
            }
        }

        if (type == 1) {
            if (findEleInArr(mac, OnlineMacArr) == -1) {
                OnlineMacArr.push(mac);
            }

            if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                var stu = studentListArr[macIndex['"' + mac + '"']];
                $('#student_' + stu.studentNumber).attr('class', 'on');
            }
        } else {
            if (findEleInArr(mac, OnlineMacArr) == -1) {
                return false;
            }
            OnlineMacArr.splice(findEleInArr(mac, OnlineMacArr), 1);
            if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                var stu = studentListArr[macIndex['"' + mac + '"']];
                $('#student_' + stu.studentNumber).attr('class', 'off');
            }
        }

        var totalOnlineNum = OnlineMacArr.length;
        $('#linkedStudentAmount').html(totalOnlineNum);
        updateStudentStatus();

        // for(var i=0;i<studentListArr.length;i++){
        //     var stu=studentListArr[i];
        //     if(stu.smartPaperMac != ''){
        //         if(mac == stu.smartPaperMac){
        //             //在线
        //             $('#student_'+stu.studentNumber).attr('class','on');
        //             break;
        //         }
        //     }
        // }

    }


    //构造字符串
    //参数preStr：调用该函数之前已生成的字符串
    //参数layer：生成倒数第几个字符
    function generateString(preStr, layer) {
        //穷举可选字符集
        for (var i = 0; i < testArray.length; i++) {
            if (layer > 1) {
                if (preStr.indexOf(testArray[i]) == -1) {
                    generateString(preStr + testArray[i], layer - 1);
                }
            } else {
                //已经生成最后一个字符，输出结果
                if (preStr.indexOf(testArray[i]) == -1) {
                    var str = preStr + testArray[i];
                    if (findEleInArr(sortStr(str), baseKeyArr) == -1) {
                        baseKeyArr.push(str);
                        //document.write(str+'|');
                    }
                }
            }
        }
    }

    function checkLocalStorage() {
        if (!window.localStorage) {
            alert("您的手机不支持预览功能");
            return false;
        }
    }

    function setLocalStorage(name, value) {
        checkLocalStorage();
        window.localStorage.setItem(name, value);
    }

    function getLocalStorage(name) {
        checkLocalStorage();
        var value = window.localStorage.getItem(name);
        return decodeURI(value);
    }

    function sortStr(str) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr.push(str[i]);
        }

        arr.sort();
        return arr.join('');
    }


    function findEleInArr(ele, arr) {
        if (!Array.indexOf) {
            Array.prototype.indexOf = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == obj) {
                        return i;
                    }
                }
                return -1;
            };
        }
        var index = arr.indexOf(ele);
        return index;
    }


    (function () {
        var method;
        var noop = function () {
        };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty, //原型上的方法，只取自身有的属性；
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'), //ie6一下，！之后的内容为false;
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                    }
                }
                return result;
            }
        })()
    }
    ;
</script>
<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>

<!-------抢答-------->
</body>
</html>
