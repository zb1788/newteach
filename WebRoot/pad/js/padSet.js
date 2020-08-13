var pad = new Pad();

function Pad() {
    this.lockVisible = false;
    this.canSel = false;
    this.timeFlag = false;//����������/������ 3���ڲ�����������Ϣ
    this.screenStuids = "";////���Ͷ����ѧ�����ɴ�δ���ӣ���Ҫͨ�����֪ͨͶ������
    this.kqStatusList = [

        {id: "0", name: "δ����", color: "off"},
        {id: "1", name: "����", color: "kqStatus_1"},
        {id: "2", name: "�ٵ�", color: "kqStatus_2"},
        {id: "3", name: "���", color: "kqStatus_3"},
        {id: "4", name: "����", color: "kqStatus_4"}

    ];
    this.statusList = [

        {id: "0", name: "δ���ӵ�����", color: "none", icon: "off", studentIcon: "off"},
        {id: "10", name: "������", color: "bGreen", icon: "on", studentIcon: "on"},

        {id: "1", name: "��������", color: "bOpaque", icon: "down", studentIcon: "down"},
        {id: "3", name: "����ʧ��", color: "bRed", icon: "downFail", studentIcon: "downFail"},
        {id: "4", name: "��������", color: "bYellow", icon: "write", studentIcon: "write"},
        {id: "91", name: "�������", color: "bBlue", icon: "writeOk", studentIcon: "writeOk"},

        {id: "8", name: "��������", color: "bOrange", icon: "talk", studentIcon: "offLine"},

        {id: "7", name: "���ڷ���", color: "bGrass", icon: "share", studentIcon: "offLine"},
        {id: "92", name: "�������", color: "bPink", icon: "shareOk", studentIcon: "offLine"},
        //11�������������سɹ� 12��������������ʧ��

        {id: "13", name: "δ����", color: "bGreen", icon: "versionError", studentIcon: "versionError"}
    ];
}

Pad.prototype.sign = function () {
    _common.addTjPv("pbgl", loginInfo.teachernumber, loginInfo.classId, "03.99");//pvͳ��
    //�Ƿ���ʾ����
    pad.lockVisible = true;
    //�Ƿ�����ѡ��
    pad.canSel = false;

    //�����ϰ�������
    $("#theme").html("ƽ����ÿ���");
    $(".sign").css("display", "block");
    $("#signtops").css("display", "block");

    $(".discuss").css("display", "none");

    $("#status_10").css("display", "inline");
    $("#status_0").css("display", "inline");

    //�Ƿ���ʾ���½ǹرհ�ť
    $("#exit").css("display", "block");
    //$("#closeBtn").css("display","none");
    $("#closeBtn").html('������������ʼ�ϿΣ�');

}
Pad.prototype.finishClass = function () {
    pad.sign();
    //�������1.0����ʾ�������ȹ���
    if (typeof VcomPadTool.padlock != "undefined" && typeof VcomPadTool.padunlock != "undefined") {
        //��������ť
        $("#studentScreen-allsel").css("display", "inline-block");
        $("#studentScreen-lockBtn").css("display", "inline-block");
        $("#studentScreen-unlockBtn").css("display", "inline-block");
        //�Ƿ�����ѡ��
        pad.canSel = true;
    }

    $("#closeBtn").html('�¿Σ�ƽ�����');
}
Pad.prototype.padStatus = function () {
    //�Ƿ���ʾ����
    pad.lockVisible = true;
    //�Ƿ�����ѡ��
    pad.canSel = true;

    $("#theme").html("ƽ��״̬");
    $(".sign").css("display", "block");
    $("#signtops").css("display", "block");

    $(".discuss").css("display", "none");

    $("#status_10").css("display", "inline");
    $("#status_0").css("display", "inline");

    //�Ƿ���ʾ���½ǹرհ�ť
    $("#exit").css("display", "block");
    $("#closeBtn").css("display", "none");
    $("#closeBtn").html('������������ʼ�ϿΣ�');

    //$(".box-btn").css("display","none");
    $(".box-btn").css("display", "block");
    $(".suo-btn").css("display", "block");


}

Pad.prototype.sendToPad = function () {
    $("#theme").html("�Ծ��������");
    $("#sendToPadtops").css("display", "block");
    $("#sendToPadtops").html('�������ص��ڿζˣ�<img class="tl-img" src="images/downloading.gif">');

    $(".result").css("border-left-width", "2px");
    $(".stuList").css("max-height", 550);

    $(".sign").css("display", "none");
    $(".discuss").css("display", "none");

    $("#status_0").css("display", "inline");
    $("#status_1").css("display", "inline");
    $("#status_3").css("display", "inline");
    $("#status_4").css("display", "inline");
    $("#status_91").css("display", "inline");

    $("#closeBtn").html('������� �鿴���');

}

Pad.prototype.discuss = function () {
    $("#theme").html("С������");
    $(".top-s").html('');
    $(".stuList").css("max-height", 510);
    $(".discuss").css("display", "block");
    $(".sign").css("display", "none");

    $("#status_0").css("display", "inline");
    $("#status_8").css("display", "inline");
    $("#closeBtn").html('�������ۣ�ƽ��������');

    var reg = /^\d$/;
    var sum = 0;
    setInterval(function () {
        sum++;
        var d = new Date("1111/1/1,0:0:0");
        d.setSeconds(sum);
        var h = d.getHours();
        h = reg.test(h) ? "0" + h + "��" : h + "��"
        var m = d.getMinutes();
        m = reg.test(m) ? "0" + m + "��" : m + "��"
        var s = d.getSeconds();
        s = reg.test(s) ? "0" + s : s;
        $("#timer").html(h + m + s);
    }, 1000);

}
Pad.prototype.share = function () {
    $("#theme").html("�ɹ�����");
    $(".stuList").css("max-height", 510);
    $(".shareTitle").css("display", "block");

    $(".ts-right").css("display", "block");

    $("#status_0").css("display", "inline");
    $("#status_7").css("display", "inline");
    $("#status_92").css("display", "inline");

    $("#closeBtn").html('ֹͣ����');
    //��ȡС�����ݲ���ʼ��ҳ��
    pad.initClassGroup();
}
Pad.prototype.studentScreen = function () {
    _common.addTjPv("tp", loginInfo.teachernumber, loginInfo.classId, "03.99");//pvͳ��
    //�Ƿ���ʾ����
    pad.lockVisible = true;
    //�Ƿ�����ѡ��
    pad.canSel = true;

    $("#theme").html("ѧ��ƽ��Ͷ��");
    $("#contentDescId").css("display", "block");
    $("#contentDescId").html("����ѧ����������ѧ��ƽ����ĻͶ�ŵ��ڿζ˴�����ѡ����ѧ�����ɽ��жԱȲ鿴��");

    $(".discuss").css("display", "none");

    $("#status_10").css("display", "inline");
    $("#status_0").css("display", "inline");

    //�Ƿ���ʾ���½ǹرհ�ť
    $("#exit").css("display", "block");
    $("#closeBtn").html('Ͷ��');
}
Pad.prototype.classkqHtml = function () {
    setKqStatus();
    $("ul.stuList li a").css("background-image", "none");
    $("ul.stuList li a").css("background-color", "#f5f5f5");

}
Pad.prototype.classkq = function () {
    _common.addTjPv("ktkq", loginInfo.teachernumber, loginInfo.classId, "03.99");//pvͳ��
    //���ÿ���ѧ����ѡ
    pad.canSel = true;
    $("#theme").html("���ÿ���");
    $("#contentDescId").css("display", "block");
    $("#contentDescId").html("ƽ�忼�ڣ����ӳɹ�����ɿ��ڡ�&nbsp;&nbsp;&nbsp;  ���⿨���ύ�������+���⣩����ɿ��ڡ�");

    $(".ts").css("display", "none");
    $("#status_10").css("display", "inline");
    $("#status_0").css("display", "inline");


    $(".box-btn").css("display", "none");
    $(".suo-btn").css("display", "none");
    $(".pbottom-top").css("display", "block");

    //�Ƿ���ʾ���½ǹرհ�ť
    //$("#exit").css("display","block");

    var btn = "";
    var temp = "";
    for (var i = 0; i < pad.kqStatusList.length; i++) {
        //δ��������� Ĭ��ѡ����Ϊ δ����
        if (i == 0) {
            temp = temp + '<span class="pb-cur" onclick="kqSetSelStatus(' + pad.kqStatusList[i].id + ')" id="kqStatus_' + pad.kqStatusList[i].id + '">' + pad.kqStatusList[i].name + '��<font id="kqStatusNum_' + pad.kqStatusList[i].id + '">0</font>��</span>';
        } else {
            btn = btn + '<span onclick="kqSetSelStatus(' + pad.kqStatusList[i].id + ')" id="kqStatus_' + pad.kqStatusList[i].id + '">' + pad.kqStatusList[i].name + '��<font id="kqStatusNum_' + pad.kqStatusList[i].id + '">0</font>��</span>';
        }
    }
    btn = btn + temp;
    $("#kqStatusBtn").html(btn);

    //�ֶ�����
    manualCallName();

}

//�ֶ�����
function manualCallName() {
    $(".box-btn").css("display", "block");
    $(".box-btn").css("position", "relative");
    $(".box-btn").css("margin-top", "25px");
    var boxbtn = '<span style=" vertical-align: middle; line-height: 35px;">' +
        '<input class="selectAllCheck" onclick="selectAllStudent(this)" type="checkbox">ȫѡ</span>';
    for (var i = 1; i < pad.kqStatusList.length; i++) {
        boxbtn = boxbtn + '<a onclick="setkq(' + pad.kqStatusList[i].id + ')" class="' + pad.kqStatusList[i].color + '" href="javascript:">' + pad.kqStatusList[i].name + '</a> ';
    }
    $(".box-btn").html(boxbtn);
}

function kqSetSelStatus(id) {
    //
    $(".stuList li").css('display', 'none');
    for (var i = 0; i < pad.kqStatusList.length; i++) {
        $("#kqStatus_" + pad.kqStatusList[i].id).attr("class", "");
        if (pad.kqStatusList[i].id == id) {
            $(".stuList li").find("." + pad.kqStatusList[i].color).parent().css('display', 'block');
        }
    }
    $("#kqStatus_" + id).attr("class", "pb-cur");

}

Pad.prototype.exit = function () {
    if (type == "classkqCard") {
        VcomAQTool.Stop();
    } else {
        VcomPadTool.UnInit();
    }
    location.href = "close://";
}

Pad.prototype.initClassGroup = function () {
    var url = transferProtocol_web + _config["TMS"] + "/tms/interface/querySchoolClassGroup.jsp?";
    url += "queryType=bySchoolClassId&classGroupType=1&classId=" + loginInfo.classId + "&ut=" + loginInfo.ssout;
    ajaxJson(url, null, "gbk", function (data) {
        if (null == data || undefined == data || data.length == 0 || null == data[0].rtnArray) {
            return;
        }
        var stuListHtml = [];
        for (var i = 0; i < data[0].rtnArray.length; i++) {
            var item = data[0].rtnArray[i];
            var groupManager = "";
            var studentNumber = "";
            for (var j = 0; j < item.memberInfo.length; j++) {
                if (item.memberInfo[j].groupManagerFlg && item.memberInfo[j].groupManagerFlg == 1) {
                    groupManager = "�鳤��" + item.memberInfo[j].realName;
                    studentNumber = item.memberInfo[j].studentNumber;
                }
            }

            stuListHtml.push('<li><a id="classGroupStu_' + studentNumber + '" onclick="" class="w-gray" >' + item.classGroupName + ' <br><span>' + groupManager + '</span></a></li>')
        }
        $("#classGroupList_ul").html(stuListHtml.join(""));

    });

}

//���濼�ڼ�¼
function saveKq() {


    var kqList = [];
    for (var i = 0; i < pad.kqStatusList.length; i++) {
        var sel = $(".stuList li").find("." + pad.kqStatusList[i].color);
        var list = "";
        for (var j = 0; j < sel.length; j++) {
            var id = sel[j].id.replace("student_", "");
            if (j != 0) {
                list = list + "|";
            }
            list = list + id;

        }
        kqList[i] = list;
    }
    if (kqList[0] != "" && kqList[4] != "") {
        kqList[4] = kqList[4] + "|";
    }
    kqList[4] = kqList[4] + kqList[0];


    //var url="http://192.168.165.27:8899/HistoryTrack/AddClassKQ?";
    var url = transferProtocol_web + _config["PAT"] + "/HistoryTrack/AddClassKQ?";
    data = "ClassCode=" + loginInfo.classId;
    data += "&TeaAccount=" + loginInfo.teachernumber;
    data += "&TeaName=" + loginInfo.teachername;
    data += "&KQTime=" + jsTimeToString(new Date());
    data += "&ClassType=" + loginInfo.userClassType;
    data += "&AttList=" + kqList[1];
    data += "&LateList=" + kqList[2];
    data += "&LeaList=" + kqList[3];
    data += "&AbsList=" + kqList[4];
    /*
        var AttList =
        ClassCode���༶����
        TeaAccount����ʦ�˻�
        TeaName����ʦ����
        KQTime������ʱ��
        AttList������ѧ���˺�/���ţ��ԡ�|���ָ���
    LateList���ٵ�ѧ���˺�/���ţ��ԡ�|���ָ���
    LeaList�����ѧ���˺�/���ţ��ԡ�|���ָ���
    AbsList������ѧ���˺�/���ţ��ԡ�|���ָ���
    ClassType:��s��or��t��(s:�����ࣻt:�����)
    */

    ajaxJson(url, data, "gbk", function (data) {

    });

    pad.exit();
}

function Show_Tab(number) {
    if (number == 0) {
        document.getElementById("classGroupList_ul").style.display = "none";
        document.getElementById("studentList").style.display = "block";
        document.getElementById("2Tab_1").className = "";
        document.getElementById("2Tab_0").className = "bg-blue";
    } else {
        document.getElementById("classGroupList_ul").style.display = "block";
        document.getElementById("studentList").style.display = "none";
        document.getElementById("2Tab_0").className = "";
        document.getElementById("2Tab_1").className = "bg-blue";
    }

}

Pad.prototype.addLog = function (content) {
    try {
        var strTime = jsTimeToString(new Date());

        config_str = ocx.ReadInfo("", "showkePadLog.txt");


        var log = "��" + strTime + "��" + "\r\n" + content;
        log = config_str + log;
        ocx.WriteInfo("", "showkePadLog.txt", log, 0);

    } catch (ex) {

    }
}

function selectAllStudent(obj) {
    //ȫѡ/��ȫѡ
    if ($(obj).prop("checked")) {
        //ֻ�е�ǰδ���ص�ѧ������ѡ��
        $('.dm-ul').children('li').filter(function (index, item, array) {
            if ($(this).css("display") == "block" || $(this).css("display") == "inline") {
                return true;
            }
            return false;
        }).children('i').attr("class", 'canSel dm-i');
        //$('.dm-ul').children('li').children('i').attr("class",'dm-i');

    } else {
        $('.dm-ul').children('li').children('i').attr("class", 'canSel');
    }
}

function addLockOnStudent(selStuList, locktype) {
    //locktype 0���� 1 ����
    var lockClass = "";
    if (locktype == 1) {
        lockClass = "lock";
    }
    for (var index = 0; index < selStuList.length; index++) {
        $("#student_" + selStuList[index].studentNumber).parent("li").children('b').attr("class", lockClass);
    }
}

//����
function padlock(locktype) {
    //locktype 0���� 1 ����  2Ͷ��

    var selStuList = getSelectStuList();
    //У��
    if (selStuList.length == 0) {
        alert("��ѡ��ѧ����");
        return;
    } else if (locktype == 0 || locktype == 1) {
        //��ѧ����ӻ�ȥ������ͼ��
        addLockOnStudent(selStuList, locktype);
        pad.timeFlag = true;//����������/������ 3���ڲ�����������Ϣ
    } else if (selStuList.length > 4 && locktype == 2) {
        alert("���ѡ��4λѧ����");
        return;
    } else if (locktype == 2) {
        //���Ͷ����ѧ�����ɴ�δ���ӣ���Ҫͨ�����֪ͨͶ������
        var stuids = ",";
        for (var i = 0; i < selStuList.length; i++) {
            stuids += selStuList[i].studentNumber + ",";
        }

        pad.screenStuids = stuids;
    }


    var studids = "";
    //ȫ������  ͶƱʱ��ʹ��ȫ��Ҳ��ѧ��id�����ǿ�
    if (selStuList.length == classes.stuList.length && selStuList.length != 1 && locktype != 2) {
        studids = "";
    } else {
        for (var index = 0; index < selStuList.length; index++) {
            if (index != 0) {
                studids = studids + ",";
            }
            studids = studids + selStuList[index].studentNumber;
        }
    }

    //����
    if (locktype == 1) {
        VcomPadTool.padlock(studids);
    }
    //����
    else if (locktype == 0) {
        VcomPadTool.padunlock(studids);
    }
    //Ͷ��
    else if (locktype == 2) {
        //�Ƚϰ汾��С version2����version1 1 ����0 version2С��version1 -1 ʧ�ܷ��ؿ�
        var clientVersionFlag = _common.compareVersion("1.01.62", clientVersion);
        var locationhref = "studentpad://";
        if (clientVersionFlag >= 0) {
            //�°��ڿζ�֧��
            if (selStuList.length == 1) {
                locationhref = "studentpad://";
            }
            if (selStuList.length > 1) {
                locationhref = "studentpad" + selStuList.length + "://";
            }
        } else {
            //�����ϰ��ڿζ�
            var locationhref = "studentpad://";
            if (selStuList.length > 1) {
                locationhref = "studentpad4://";
            }
        }
        VcomPadTool.StartStudentscreen(studids);
        location.href = locationhref;
    }
    //ȡ��ѡ��
    $('.dm-ul').children('li').children('i').attr("class", 'canSel');
    $(".selectAllCheck").removeAttr("checked");

}

//ƽ��һ���ػ�
function padPowerOff() {
    //����confirmȷ�Ͽ�
    d.zIndex = 10000;
    art.dialog.confirm("ȷ��Ҫ�ر�ƽ��ô��", function () {
        d.zIndex = 0;
        //ȷ��
        //�ػ�
        try {
            //�ɹ�����0��ʧ�ܷ���-1��
            var result = VcomPadTool.CloseAllPad("0", "all");
        } catch (e) {
        }
    }, function () {
        //ȡ��
        d.zIndex = 0;
    });
}

function setkq(kqtype) {
    // 1 ���� 2�ٵ� 3��� 4����
    var selStuList = getSelectStuList();
    //У��
    if (selStuList.length == 0) {
        alert("��ѡ��ѧ����");
    }
    for (var index = 0; index < selStuList.length; index++) {
        $("#student_" + selStuList[index].studentNumber).attr("class", pad.kqStatusList[kqtype].color);
    }
    //ͳ������
    setKqStatus(kqtype);
    //ˢ�µ�ǰ������ѧ��״̬
    $("#kqStatusBtn").find(".pb-cur").click();

    //ȡ��ѡ��
    $('.dm-ul').children('li').children('i').attr("class", 'canSel');
    $(".selectAllCheck").removeAttr("checked");

}

function getSelectStuList() {
    //ͳ��ѡ���ѧ��
    var selStuList = [];
    $("ul.stuList li .dm-i ").each(function () {
        var student = new Object();
        student.studentNumber = $(this).parent("li").attr("studentNumber");
        selStuList.push(student);
    });

    return selStuList;
}

//��js��ʱ�����ת��Ϊ�ַ���yyyy-MM-dd HH:ss:mm
function jsTimeToString(time) {
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var strTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return strTime;
}
