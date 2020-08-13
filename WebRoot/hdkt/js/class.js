//�༶����
var classes = new ClassObj();

function ClassObj() {
    this.classId = null;//�༶���
    this.teacherId = null;//��ʦ���
    this.stuList = null;//ѧ���б�
    this.stuNum = 0;//�༶������
    this.callback = null;//��ȡ�༶��Ϣ��Ļص�����
    this.commentImgList = null;//����ͼƬ��
}

//��ʼ���༶��Ϣ
ClassObj.prototype.init = function (data, callback) {
    this.teachernumber = data.teachernumber;
    this.schoolId = data.schoolId;
    this.classId = data.classId;
    this.teachername = decodeURIComponent(decodeURIComponent(data.teachername));
    this.schoolName = decodeURIComponent(decodeURIComponent(data.schoolName));
    this.callback = callback;
    //this.commentImgList=["newteach/hdkt/image/chengzan.gif","newteach/hdkt/image/guli.gif", "newteach/hdkt/image/guzhang.gif","newteach/hdkt/image/sahua.gif"];
    this.commentImgList = ["/newteach/hdkt/swf/guli.swf", "/newteach/hdkt/swf/chengzhan.swf", "/newteach/hdkt/swf/sahua.swf"];
    this.stuList = new Array();
    this.setStuList();
}
//���õ�ǰ�༶ѧ���б���Ϣ
ClassObj.prototype.setStuList = function () {
    this.stuList.length = 0;
    this.stuNum = 0;
    var url = transferProtocol_web + _config["TMS"] + "/tms/interface/queryStudent.jsp?";
    url += "queryType=answerToolByClass&schoolClassId=" + this.classId;
    try {
        if (teachComputerMac && teachComputerMac != null && teachComputerMac != 'null') {
            url += "&teachComputerMac=" + teachComputerMac + "&smartPaperEnable=1"
        }
    } catch (e) {

    }

    ajaxJson(url, null, "gbk", this.getStuListByJson);
    //����ʱʹ��
    //ajaxJson(url,null,"gbk",this.getStuListByJsonAndSetToolCode);
}
//����ѧ���б�
ClassObj.prototype.getStuListByJson = function (data) {
    if (null == data || undefined == data || null == data.result) {
        return;
    }
    classes.stuList = data.rtnArray;
    classes.stuNum = data.result;
    if (null != classes.callback) {
        classes.callback();
    }
}
//����ѧ���б�
ClassObj.prototype.getStuListByJsonAndSetToolCode = function (data) {
    if (null == data || undefined == data || null == data.result) {
        return;
    }
    classes.stuList = data.rtnArray;
    classes.stuNum = data.result;
    for (var i = 0; i < classes.stuNum; i++) {
        var istr = i;
        if (i < 10) {
            istr = "0" + i;
        }
        var id = "44A8BD" + istr;
        classes.stuList[i].answerToolCode = id;
    }
    classes.stuList[0].answerToolCode = "44A8BD52";
    if (null != classes.callback) {
        classes.callback();
    }
}
//���ݴ�������Ż�ȡ��Ӧѧ��
ClassObj.prototype.getStuById = function (id) {
    for (var i = 0; i < this.stuNum; i++) {
        var stu = this.stuList[i];
        //studentNumber
        if (id == stu.answerToolCode || id == stu.studentNumber || id == stu.smartPaperMac) {
            return stu;
        }
    }
    return null;
}
//
//����id����ȡѧ���б�
ClassObj.prototype.getStuByIds = function (idlist) {
    var list = new Array();
    if ("" == idlist || null == idlist || undefined == idlist || idlist.length < 0) {
        return list;
    }
    for (var i = 0; i < idlist.length; i++) {
        var temp = idlist[i];
        var student = {"id": temp.id, "name": temp.id, "isTrueName": false};
        var stu = this.getStuById(temp.id);
        if (null != stu) {
            student.name = stu.realname;
            student.isTrueName = true;
        }
        list.push(student);
    }
    return list;
}
//����������Ϣ ���༶Ȧ
ClassObj.prototype.commends = function (content, callback) {
    if (0 == this.stuNum) {
        alert("��ǰ�༶����δ���ѧ��");
        return;
    }
    if (null == content || content.length == 0 || "" == content || undefined == content) {
        alert("��ѡ��ҪҪ�����ѧ��");
        return;
    }
    classes.comments_show(callback);//��ʾ������Ϣ
    classes.sendMail(content);//����վ����	
    classes.sendClass(content);//���͵��༶Ȧ
}
//���Ͱ༶Ȧ��Ϣ
ClassObj.prototype.sendClass = function (content) {

    content += "ͬѧ�����ϱ��ֺܰ���Ϊ�����ޣ�";
    var url = transferProtocol_web + _config["ILEARN"] + "/exportInterface/share.action?";
    url += "says.content=" + encodeURIComponent(content);
    url += "&classidList=" + classes.classId;
    url += "&username=" + classes.teachernumber;
    url += "&truename=" + encodeURIComponent(classes.teachername);
    url += "&schoolId=" + classes.schoolId;
    url += "&schoolName=" + encodeURIComponent(classes.schoolName);
    ajaxJson(url, null, "gbk", function (data) {
        if (true == data.success) {
        }
    });
}
//����վ����
ClassObj.prototype.sendMail = function (content) {
    var timestamp = new Date().getTime();//ʱ�������
    var rnum = parseInt(Math.random() * 1000000);
    var opId = "6_" + timestamp + "_" + rnum;
    content += "ͬѧ�����ϱ��ֺܰ���Ϊ�����ޣ�";
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/sendCommend.jsp?";
    url += "command=sendMsg";
    url += "&username=" + classes.teachernumber;
    url += "&usertype=2";
    url += "&sendToClass=" + classes.classId;
    url += "&content=" + encodeURIComponent(encodeURIComponent(content));
    url += "&busId=4";
    url += "&msgType=1";
    url += "&opId=" + opId;
    url += "&sendType=1";
    ajaxJson(url, null, "gbk", function (data) {
        if (1 == data.result) {

        }
    });

}
//��ʾ����ͼ��
ClassObj.prototype.comments_show = function (callback) {
    var num = parseInt(this.commentImgList.length * Math.random());
    var url = transferProtocol_web + _config["PLS"] + this.commentImgList[num];
    try {
        var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        document.getElementById("byimgdiv").style.marginTop = winScroll + "px";
    } catch (e) {
    }
    //$("#comments_img").attr("src",url);
    //flash����
    var params = {};
    params.quality = "high";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    params.WMode = "transparent";
    swfobject.embedSWF(url, "byimgdiv", "90%", "90%", "1.0", null, null, params);
    $("#comments").css("display", "");
    setTimeout(function () {
        swfobject.removeSWF("byimgdiv");
        $("#comments").html("<div id='byimgdiv'></div>");

        if (callback != null) {
            callback();
        }
    }, 3000);
}