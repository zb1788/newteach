//�鿴ѵ���������
function queryTestQuestionResult(id, title) {
    var width = screen.width;
    var heights = screen.height;
    var path = transferProtocol_web + _config["PLS"] + "/newteach/inc/paperResult.jsp?id=" + id;
    path = encodeURIComponent(path);
    title = "";
    //title=encodeURIComponent(encodeURIComponent(title));
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}

//����
function queryPracticePaperQuestion(paper_id, hid) {
    var width = screen.width;
    var heights = screen.height;
    //����������һ�����ڡ�
    //window.open(_common.interfaceurl+"OLMS.017&data={\"paper_id\":\""+paper_id+"\"}",'newwindow','height='+heights+',width='+width+',top=100,left=200,toolbar=no,menubar=no,alwaysRaised=yes,scrollbars=yes, resizable=no,location=no, status=no');
    //var path=encodeURIComponent(pls_config_all["OLMS.017"]+"?paper_id="+paper_id);
    //var title=encodeURIComponent(encodeURIComponent("������ϰ"));
    //var url=transferProtocol_web+_config["PLS"]+"/newteach/inc/windowframe.jsp?filepath="+path+"&title="+title;
    if (_commonDiv.getUserClassId() == null) {
        alert("����δ���õ�ǰ�༶��");
        return;
    }

    var padStatus;
    try {
        padStatus = LessionOcx.ReadSchoolbag(1);
    } catch (e) {

    }
    if (padStatus != 0 && typeof padStatus != 'undefined') {
        //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
        var warn = "���ȹر�" + padStatus + "���ܣ�";
        alert(warn);
        return;
    } else {
        //�޸������ļ�ƽ������ʹ��
        //Ĭ��Ϊ����
        setIsUsingPad(14);
    }


    //�ر�
    try {
        ClientAnswer.CloseOcxWindow();
    } catch (err) {

    }


    var matchintype = getDeviceType();

    //getfplatform_subtype()

    var stypeparm = "";
    if ("2" == matchintype) {
        stypeparm = "NUMBERANSWERDEVICE";
    } else if ("3" == matchintype) {
        stypeparm = "PAD";//pv ����
    } else if ("2,1" == matchintype) {
        //���ִ��⿨+ֽ��
        stypeparm = "NUMBERANSWERDEVICE;PAPERPEN";
    } else if ("0" == matchintype || "1" == matchintype || "3" == matchintype) {
        stypeparm = "";
    } else if ("0,1" == matchintype || "1,1" == matchintype || "4,1" == matchintype) {
        stypeparm = ";PAPERPEN";
    }

    if (_macUtil.isReady()) {
        var path = transferProtocol_web + _config["OLMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action?rcode=" + paper_id + "&rsType=6&studentClass=" + _commonDiv.getUserClassId() + "&username=" + teachernumber + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername)) + "&areaId=" + areaId + "&classId=" + _treeVersion.currentCourseId + "&t=" + Math.round(Math.random() * 1000) + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=" + _macUtil.getMACAdd();
    } else {
        console.log("��ȡ����mac��ַ");
        var path = transferProtocol_web + _config["OLMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action?rcode=" + paper_id + "&rsType=6&studentClass=" + _commonDiv.getUserClassId() + "&username=" + teachernumber + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername)) + "&areaId=" + areaId + "&classId=" + _treeVersion.currentCourseId + "&t=" + Math.round(Math.random() * 1000) + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=";
    }
    //var path=transferProtocol_web+_config["OLMS"]+"/online/interface/newteach/answerdevice/viewClassPracticeDevice.action?paper_id="+paper_id+"&studentClass="+_commonDiv.getUserClassId()+"&homeworkid="+hid+"&username="+teachernumber+"&userTrueName="+encodeURIComponent(encodeURIComponent(teachername))+"&areaId="+areaId;

    var url = path;
    _common.openResPage(width, heights, url);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}

//�����׾����
function openpracticepaper(paper_id) {
    var width = screen.width;
    var heights = screen.height;
    //����������һ������
    //window.open(_common.interfaceurl+"OLMS.016&data={\"paper_id\":\""+paper_id+"\"}",'newwindow','height='+heights+',width='+width+',top=100,left=200,toolbar=no,menubar=no,alwaysRaised=yes,scrollbars=yes, resizable=no,location=no, status=no');
    var path = encodeURIComponent(pls_config_all["OLMS.016"] + "?paper_id=" + paper_id);
    var title = encodeURIComponent(encodeURIComponent("�׾���ϰ"));
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}

//�����Դչʾ����
function gettbdxplay(type, code, userid, title) {
    var width = screen.width;
    var heights = screen.height;
    var title = encodeURIComponent(encodeURIComponent(title));
    var path = encodeURIComponent(pls_config_all["OLMS.014"] + "?paper_id=" + code);
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
}

//�鿴��ҵ����,��ҵid����ҵcontent������������ҵ�����Ƕ�Ӧ�����id����������ҵ���ݣ�����ҵ����(0��2�������ҵ)
function shouzycontent(id, cid, ztype) {
    if ("0" == ztype || "2" == ztype) {
        //���Ԥ���ӿ�
        var width = screen.width;
        var heights = screen.height;
        var title = encodeURIComponent(encodeURIComponent("�����ҵ"));
        var path = encodeURIComponent(pls_config_all["OLMS.016"] + "?paper_id=" + cid);
        var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
        _common.openResPage(width, heights, url);
    } else {
        //��ҵԤ����shouzuoye.jsp�е���
        maskAll.style.display = 'block';
        var url = transferProtocol_web + _config["PLS"] + "/newteach/shouzuoye.do?id=" + id;
        _common.openResPage(700, 400, url);
        setTimeout(function () {
            maskAll.style.display = 'none';
        }, 800);//������������ص�ǰ�˵�
    }
}

//��ʾ�رհ�ť
function openResPageWithClose(path, title) {
    var width = screen.width;
    var heights = screen.height;
    if (title == null || title == "undefined") {
        title = "";
    } else if (title.length > 6) {
        //title=title.substring(0,10)+"...";
    }
    var title = encodeURIComponent(encodeURIComponent(title));
    var path = encodeURIComponent(path);
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
}

//���ӽ̲Ĳ�������
function eTeachingMaterialResPlayer(datastr) {
    eval("var playDzjcRes=" + decodeURIComponent(datastr));
    try {
        if (playDzjcRes.rsType == "1") {
            //��Դ
            if (playDzjcRes.RFormatMark == "html") {
                //�ж��Ƿ�Ϊ���ӽ̲�����
                player.checkDZJCplay(playDzjcRes.rcode, playDzjcRes.RFormatMark);
            } else {
                player.playResource(playDzjcRes.rcode, "2", playDzjcRes.RFormatMark);
            }

        } else if (playDzjcRes.rsType == "3") {
            //��ʦ�ļ���
            player.getTeacherFolderFile(playDzjcRes.rcode, playDzjcRes.RFormatMark);

        } else if (playDzjcRes.rsType == "2" || playDzjcRes.rsType == "6") {
            //ϵͳ������Ծ�
            //zjxl.view(playDzjcRes.rcode,playDzjcRes.RTitle);
            data = "?rcode=" + playDzjcRes.rcode + "&rsType=" + playDzjcRes.rsType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
            var playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;

            ktjx.zuoda(playjs, 0);
        }
        /*else if (playDzjcRes.rsType=="6")
        {
            //�����Ծ�
            /!*url = transferProtocol_web + _config["QBMS"] + '/tqms/interface//queryNameById.action?paper_id='+playDzjcRes.rcode;
            openResPageWithClose(url,playDzjcRes.RTitle);*!/
            data = "?rcode=" + destCode +"&rsType="+destType+ "&classId="+_treeVersion.currentCourseId+"&studentClass="+userclass+ "&username=" + teachernumber +"&userTrueName="+encodeURI(encodeURI(teachername))+"&areaId="+areaId;
            var playjs=transferProtocol_web+_config["QBMS"]+"/online/interface/newteach/answerdevice/viewClassPracticeDevice.action"+data;
            zjxl.zuoda(playjs);
        }*/

    } catch (e) {
        alert("���Ž����쳣!");
    }
}

//���ӽ̲�Div�ر�
function requestVcomDivSignOut() {
    document.getElementById("dzjcDiv").style.display = "none";
    maskAllDzjc.style.display = "none";
    document.getElementById("dzjcDiv").innerHTML = "";
    document.getElementById("dzjcDiv").style.height = "0px";
}
