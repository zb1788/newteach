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
    <title>ƽ��ǩ��</title>
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
            font: normal 18px/30px "΢���ź�";
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
        //Э��δ����Ĭ��http
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
        <h2 id="theme">״̬�鿴</h2>
        <span class="top-s" id="signtops">���������豸����<b class="w-red"><span id="linkedStudentAmount">0</span></b><span
                style="display:none;" id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <p class="discuss" id="tips" style="display:none;">�������ѿ�����ѧ����������ǰ�����ĸͨ����д����а󶨡�</p>
        <div class="boxCon">
            <ul class="stuList dm-ul" id="studentList">

            </ul>
            <div class="ts" style="position: absolute;bottom: 40px;width:100%;">
                <ul class="iconTips" id="statusList">
                    <span id="statusColor_10" class="bon"></span>�����ӣ�<font id="onlineCount">0</font>��
                    <span id="statusColor_0" class="bGray"></span>δ���ӣ�<font id="offlineCount">0</font>��
                    <span id="statusColor_7" class="bunbind"></span>δ�󶨣�<font id="unBindCount">0</font>��
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="suo-btn" style="display: block;bottom:2px;">
                <a id="startBind" class="bBlue" style="cursor: pointer;" onclick="startBind()">��ʼ��</a>
                <a id="changeBind" class="bBlue" style="display: none;cursor: pointer;"
                   onclick="changeBind()">����ѧ����д��</a>
                <a id="bindTypeChange" class="bBlue" style="display: none;cursor: pointer;" onclick="bindTypeChange()">�л���ģʽ</a>
                <a id="goOrderBind" class="bBlue" style="display: none;cursor: pointer;"
                   onclick="goOrderBind()">������д����</a>
            </div>
        </div>
    </div>
</div>
<i id="exit" class="pbottom-i-none" disabled="disabled" style="display: none;z-index:99999" onclick="closePage();"></i>

<div id="changePage" style="display:none;">

</div>

<div id="changeType" style="display:none;">
    <span class="backDev" bindType="2">��ĸ��</span>
    <span class="backDev" bindType="1">��Ű�</span>
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
    var studentListArr = [];//����ѧ������
    var baseKeyArr = [];//������ĸ����
    //�����ѡ�ַ���
    var testArray = ["A", "B", "C", "D", "E", "F", "G"];
    var studentByKey = [];//ѧ����ĸ���˺ŵĶ�Ӧ��ϵ

    var macIndex = {};//mac��studentListArr�е�λ��
    var studentIndex = {};//student��studentListArr�е�λ��
    var teachComputerMac = "<%=teachComputerMac%>";//���ҵ���mac
    var updateDb = 0;//�Ƿ�������ݿ�0������1����
    var smartPaperBindType;//��ǰ��ģʽ
    var tmsUrl;
    var smartPapersBackup = [];//����ƽ��
    var userType = loginInfo.userType;//�û����� 2 ��ʦ 4 ѧ�� 0 �ҳ� 3 ����Ա
    var isStart = false;//�Ƿ����ð�
    var isResetWhite = false;//�Ƿ���Ҫ�������ð�����
    var OnlineMacArr = [];//���ӵ�AP���豸����

    var isFilter = true;//�Ƿ���˲��ڰ�������mac
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

    //������ʽ
    function testCss() {
        alert($(window).height());
        alert($('ul.stuList li a').height());
        alert($('ul.stuList li a').css('padding'));
        alert($('ul.stuList li a span').height());
    }


    //��ʼ��ҳ�棬��ȡѧ����Ϣ
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

            //��д���ģʽ 0 ��д��δ���� 1 ������ȡ  2 ���û�
            smartPaperBindType = data.smartPaperBindType;
            if (smartPaperBindType == 0) {
                //��д��δ���ð�����ĸ��
                smartPaperBindType = 2;
            }
            if (stu.smartPaperMac == '') {
                //δ���û�
                h += "<li studentNumber='" + stu.studentNumber + "' ><a id='student_" + stu.studentNumber + "'  class='no'><span>" + stu.realname + "</span></a><i></i></li>";
            } else {
                //������
                macIndex['"' + stu.smartPaperMac + '"'] = i;

                var noHtml = "";
                if (smartPaperBindType == 1) {
                    //�����ȡ
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
        //һ���������������ð������������İ����޷����ӣ����ã�


        smartPapersBackup = data.smartPapersBackup;


        // for(var i=0;i<80;i++){
        // 	h += '<li studentNumber="34010110000001"><a class="no" id="student_34010110000001"><span>ynchild</span></a><i></i></li>';
        // }

        $(".stuList").html(h);


        if (smartPaperBindType == 1) {
            //���ӵ�ѡ��ť
            changeBindBtn();
            //��չʾ�󶨰�ť
            $('#startBind').hide();
        } else if (smartPaperBindType == 2) {
            //��Ҫ��

        }


        //����Ȩ���ж��Ƿ�չʾ�滻�豸���л���ģʽ��������
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

        //����״̬
        updateStudentStatus();

        //��ʼ�������ʼ��ȡ�����ϵ�mac
        setTimeout("initVcomTool();", 500);

    }

    function initVcomTool() {
        console.log('��������״̬�鿴');
        try {
            VcomAQTool.SetOnlineMacs();
        } catch (e) {
        }
    }


    //����������/δ����/δ��״̬
    function updateStudentStatus() {
        var sel = $(".stuList li").find(".on");
        $("#onlineCount").html(sel.length);

        var sel = $(".stuList li").find(".off");
        $("#offlineCount").html(sel.length);

        var sel = $(".stuList li").find(".no");
        $("#unBindCount").html(sel.length);
    }

    //չʾ��ѡ��
    function changeBindBtn() {

        $("ul.stuList li").each(function () {
            if ($(this).find('em').length != 0) {
                $(this).find('i').eq(0).attr('class', 'canSel');
            }
        })

        //������ȡ�Ĳ����滻�豸
        var noCheckedNum = $('i.canSel').size();
        if (noCheckedNum == 0) {
            //����û���û����ţ�����ʾ�滻��ť
            $('#changeBind').hide();
            if (userType != 3) {
                alert('����ϵ����Ա�Ƚ�����Ű󶨣�')
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
            // 	//��ѡ�������ѡ��
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

            //��ǰ��ťδѡ�У���ѡ����
            if (!isCheck) {
                $(this).children('i.canSel').addClass('dm-i');
            }
        });
    }

    //�л���ģʽ
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
            title: '��ѡ��Ҫ�л���ģʽ',
            content: pageDom,
            button: [
                {
                    name: '�л�',
                    callback: function () {
                        var nowBindType = $('#changeType span.checkedspan').attr('bindType');
                        var url = tmsUrl + "/tms/clientInterface/changeSmartPaperBindType.do?";
                        url += "schoolId=" + loginInfo.schoolId + "&smartPaperBindType=" + nowBindType + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();
                        ajaxJson(url, null, "gbk", function (rdata) {
                            //�ж��Ƿ����л�����Ű�
                            if (rdata.bindResult != 0) {
                                // window.location.reload();
                                //���»�ȡ������������
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
                                        alert('�豸������ʧ��');
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


    //�滻�豸
    function changeBind() {
        if (smartPapersBackup.length == 0) {
            alert('���ޱ����豸');
            return false;
        }
        var checkedNum = $('i.dm-i').size();
        if (checkedNum == 0) {
            alert('����ѡ��Ҫ�����豸��ѧ��');
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
            backHtml += '<span>���ޱ����豸</span>';
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
            title: '��ѡ��Ҫ�滻���豸���',
            content: pageDom,
            button: [
                {
                    name: '�滻',
                    callback: function () {
                        if (smartPapersBackup.length == 0) {
                            alert('û�б����豸�����滻��');
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
                                //���»�ȡ���ð���
                                var url = tmsUrl + "/tms/interface/queryStudent.jsp?";
                                url += "queryType=answerToolByClass&schoolClassId=" + loginInfo.classId + "&teachComputerMac=" + teachComputerMac + "&smartPaperEnable=1";
                                ajaxJson(url, null, "gbk", function (rdata) {
                                    smartPapersBackup = rdata.smartPapersBackup;
                                });
                                //isResetWhite = true;
                                //�滻֮���������ð�����
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


    //�������������ҳ��
    function goOrderBind() {
        try {
            VcomAQTool.Stop();
        } catch (e) {
            alert('VcomAQTool.Stop() failed')
        }
        window.location.href = 'smartPaperBindByManager.jsp?data=' + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac;
    }

    //��ʼ��
    function startBind() {
        $('#startBind').hide();
        $('#bindTypeChange').hide();

        for (var i = 1; i < 5; i++) {
            generateString("", i);
        }

        var i = 0;
        $('#studentList li').each(function () {
            //ÿ��ѧ�������ĸ
            var item = baseKeyArr[i];
            if (i < 70 && typeof item != 'undefined') {
                var tmpHtml = $(this).find('a').html();
                var str = '<em>' + item + '</em>' + tmpHtml;
                $(this).find('a').html(str);
                studentByKey[item] = $(this).attr('studentnumber');

                //��δ�󶨵ĸ�Ϊδ����
                if ($(this).find('a').attr('class') == 'no') {
                    //$(this).find('a').attr('class','');
                }
                i++;
            }
        })

        $('#tips').show();


        // return false;

        console.log('�رհ�����');
        //�رհ�����
        VcomAQTool.CloseWhiteCard();
        //��ʼ��
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


    //�ر�ҳ��
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
        //alert('���ð�����');
        console.log('���ð�����');
        //�򿪰�����
        var macList = Object.keys(macIndex).join(',').replace(/"/g, "");

        try {
            VcomAQTool.SetNewList(macList);
        } catch (e) {
            alert('�豸������ʧ��');
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

        //�򿪰�����
        var macList = Object.keys(macIndex).join(',').replace(/"/g, "");
        VcomAQTool.SetNewList(macList);
        console.log(myDate.getSeconds());
    }


    //�ص�������ȡ�û���������( idλmac��keysΪABCD)
    function OnGetKeys(mac, keys) {
        console.log('ԭʼmack|key:' + mac + '|' + keys);
        //���滻GΪF�����滻HΪG��˳���ܴ�
        keys = keys.replace("G", "F").replace("H", "G");
        console.log('�滻���key');
        console.log('mac:' + mac + '|keys:' + keys);
        console.log(studentByKey[keys]);
        var studentNumber = studentByKey[keys];

        if (typeof studentNumber != 'undefined') {
            var url = tmsUrl + "/tms/clientInterface/bindStudentSmartPaper.do?";
            url += "studentNumber=" + studentNumber + "&classId=" + loginInfo.classId + "&schoolId=" + loginInfo.schoolId + "&smartPaperMac=" + mac + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();

            ajaxJson(url, null, "gbk", function (rdata) {
                if (rdata.bindResult == 1) {
                    //�Ƚ��
                    if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                        var stu = studentListArr[macIndex['"' + mac + '"']];
                        $('#student_' + stu.studentNumber).attr('class', 'no');
                        studentListArr[macIndex['"' + mac + '"']].smartPaperMac = '';
                        delete macIndex['"' + mac + '"'];
                    }

                    //�ٰ�
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
                    //alert('��ʧ��');
                    if (rdata.bindResultInfo != '��Ǹ�����󶨵��豸������д��') {
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
            success: function (data, textStatus) {   //�ɹ���ص�
                console.log('a');
                console.log(data);
                console.log(textStatus);
            },
            error: function (e) {    //ʧ�ܺ�ص�
                console.log('error');
                console.log(e);
            }
        })
    }


    //�ص�������ȡ�����ϵ���д��mac,type1:���ӣ�2���Ͽ�
    function OnGetOnlineMacs(mac, type) {
        console.log(mac + '|' + type);

        if (!isStart) {
            //��ʼ�󶨾Ͳ�����������
            //������������ڰ�����������ֱ������
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
        //             //����
        //             $('#student_'+stu.studentNumber).attr('class','on');
        //             break;
        //         }
        //     }
        // }

    }


    //�����ַ���
    //����preStr�����øú���֮ǰ�����ɵ��ַ���
    //����layer�����ɵ����ڼ����ַ�
    function generateString(preStr, layer) {
        //��ٿ�ѡ�ַ���
        for (var i = 0; i < testArray.length; i++) {
            if (layer > 1) {
                if (preStr.indexOf(testArray[i]) == -1) {
                    generateString(preStr + testArray[i], layer - 1);
                }
            } else {
                //�Ѿ��������һ���ַ���������
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
            alert("�����ֻ���֧��Ԥ������");
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
            var hasOwnProperty = Object.prototype.hasOwnProperty, //ԭ���ϵķ�����ֻȡ�����е����ԣ�
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'), //ie6һ�£���֮�������Ϊfalse;
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

<!-------����-------->
</body>
</html>
