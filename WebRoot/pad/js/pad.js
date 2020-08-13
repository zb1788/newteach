/**
 * Created by Administrator on 2017/6/28.
 */
var pad = new Pad();

function Pad() {
    this.statusList = [

        {id: "status_0", name: "δ����", color: "none", icon: ""},
        {id: "status_10", name: "������", color: "bGreen", icon: ""},

        {id: "status_1", name: "��������", color: "bOpaque", icon: "download"},
        {id: "status_3", name: "����ʧ��", color: "bRed", icon: "down-fail"},
        {id: "status_4", name: "��������", color: "bYellow", icon: "writing"},
        {id: "status_91", name: "�������", color: "bBlue", icon: "done"},

        {id: "status_8", name: "��������", color: "bOrange", icon: "discussing"},

        {id: "status_7", name: "���ڷ���", color: "bGrass", icon: "share"},
        {id: "status_92", name: "�������", color: "bPink", icon: "share-done"}
        //11�������������سɹ� 12��������������ʧ��

    ];
}

Pad.prototype.sign = function () {
    $("#theme").html("ƽ�����ѧ��ǩ��");
    $(".sign").css("display", "block");
    $("#signtops").css("display", "block");

    $(".discuss").css("display", "none");

    $("#listatus_10").css("display", "inline");
    $("#listatus_0").css("display", "inline");

    //�Ƿ���ʾ���Ͻǹرհ�ť
    $("#exit").css("display", "block");

    $("#closeBtn").html('������������ʼ�ϿΣ�');

}

Pad.prototype.sendToPad = function () {
    $("#theme").html("�Ծ��������");
    $("#sendToPadtops").css("display", "block");
    $("#sendToPadtops").html('�������ص��ڿζˣ�<img class="tl-img" src="images/downloading.gif">');


    $(".sign").css("display", "none");
    $(".discuss").css("display", "none");

    $("#listatus_10").css("display", "inline");
    $("#listatus_0").css("display", "inline");
    $("#listatus_1").css("display", "inline");
    $("#listatus_3").css("display", "inline");
    $("#listatus_4").css("display", "inline");
    $("#listatus_91").css("display", "inline");

    $("#closeBtn").html('������� �鿴���');

}

Pad.prototype.discuss = function () {
    $("#theme").html("С������");
    $(".top-s").html('');
    $(".discuss").css("display", "block");
    $(".sign").css("display", "none");

    $("#listatus_10").css("display", "inline");
    $("#listatus_0").css("display", "inline");
    $("#listatus_8").css("display", "inline");
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

    $("#listatus_10").css("display", "inline");
    $("#listatus_0").css("display", "inline");
    $("#listatus_7").css("display", "inline");
    $("#listatus_92").css("display", "inline");

    $("#closeBtn").html('ֹͣ����');
}

Pad.prototype.exit = function () {
    VcomPadTool.UnInit();
    location.href = "close://";
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