var zjxl = new ZJXL();

//ͬ���ڿ�ģ�����
function ZJXL() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.firstMenu = null;        //
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.allList = []; //ȫ����Դ
    this.zyCount = null;
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ
    this.typeList = [{id: "zjxl_RT001", name: "��ʦѵ��", data: []},
        {id: "zjxl_RT002", name: "�Ž�ѵ��", data: []},
        {id: "zjxl_RT003", name: "�ҵ�ѵ��", yunMenuType: "1"},
        {id: "zjxl_RT004", name: "ֽ�ʵ���", data: []},
        {id: "zjxl_RT005", name: "�׾�Ƿ�", data: []}
    ];
}

//������Ŀ,���������˵���
ZJXL.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + _treeVersion.currentCourseName + "<span class=\"bgImg\"></span></div>");
    //��ʾ�����˵�
    zjxl.showQuickTeachThredMenu();

}
//��ʾ�����˵���Ŀ
ZJXL.prototype.showQuickTeachThredMenu = function () {
    var data = "lessionId=" + _treeVersion.currentCourseId;
    ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/hw/practiceFamousTeach.action", data, "gbk", zjxl.getDynamicMenu);
}
//��̬��ȡ�˵�
ZJXL.prototype.getDynamicMenu = function (rdata) {
    //��ȡ��̬�˵� ��ʦѵ�����Ž�ѵ��
    var tMenuCode = new Array();
    //������˵���
    if (rdata && rdata.isShowFamous == 1) {
        if (tMenuCode.length == 0) {
            zjxl.firstMenu = zjxl.typeList[0].id;
        }
        tMenuCode.push("<a href='#' id='" + zjxl.typeList[0].id + "' onclick='zjxl.clickQuickTeach(\"" + zjxl.typeList[0].id + "\");' >" + zjxl.typeList[0].name + "</a>");
    }
    if (rdata && rdata.isShowTeach == 1) {
        if (tMenuCode.length == 0) {
            zjxl.firstMenu = zjxl.typeList[1].id;
        }

        if (typeof subMenuYouJiaoKey != "undefined") {
            zjxl.typeList[1].name = zjxl.typeList[1].name.replace("�Ž�", subMenuYouJiaoKey);
        }
        tMenuCode.push("<a href='#' id='" + zjxl.typeList[1].id + "' onclick='zjxl.clickQuickTeach(\"" + zjxl.typeList[1].id + "\");' >" + zjxl.typeList[1].name + "</a>");
    }

    for (var i = 2; i < zjxl.typeList.length; i++) {
        var temp = zjxl.typeList[i];
        //�ж��Ƿ���ʾ�׾�Ƿֲ˵�,���豸����ʾ�׾�Ƿ�
        if (getDeviceType() == 0 && temp.name == "�׾�Ƿ�") {
            continue;
        }
        if (tMenuCode.length == 0) {
            zjxl.firstMenu = temp.id;
        }

        var yunMenuType = "";
        if (temp.yunMenuType == "1") {
            yunMenuType = "yunMenuType";
        }

        tMenuCode.push("<a href='#' id='" + temp.id + "' class='" + yunMenuType + "' onclick='zjxl.clickQuickTeach(\"" + temp.id + "\");' >" + temp.name + "</a>");

    }
    $(".subMenu").html("");
    $(".subMenu").append(tMenuCode.join(""));
    $(".subMenu").show();

    $("#" + zjxl.firstMenu).click();
}
//�����˵������¼�
ZJXL.prototype.clickQuickTeach = function (resflag) {
    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".resList").remove();
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");

    if (resflag == "zjxl_RT001") {
        //��ʦѵ��
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&loginStyle=0&username=" + teachernumber + "&paperType=2";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/practice/queryPracticeByPaperType.action", data, "gbk", zjxl.parseResList);
        return;
    } else if (resflag == "zjxl_RT002") {
        //�Ž�ѵ��
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&loginStyle=0&username=" + teachernumber + "&paperType=1";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/practice/queryPracticeByPaperType.action", data, "gbk", zjxl.parseResList);
        return;
    } else if (resflag == "zjxl_RT003") {
        //�ҵ�ѵ��
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&loginStyle=0&username=" + teachernumber + "&paperType=0";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/practice/queryPracticeByPaperType.action", data, "gbk", zjxl.parseResList);
        return;
    } else if (resflag == "zjxl_RT004") {
        try {
            var padStatus = LessionOcx.ReadSchoolbag(1);

            if (padStatus != 0 && typeof padStatus != 'undefined') {
                //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
                var warn = "���ȹر�" + padStatus + "���ܣ�";
                alert(warn);
                return;
            } else {
                //�޸������ļ�ƽ������ʹ��
                setIsUsingPad(11);
            }

            $(_pMain.getMainRight()).append("<ul class=\"testList\"><li><center>��ʹ���Ҳ๤�߽��д������</center></li></ul>");

            ClientAnswer.CloseOcxWindow();
            //ֽ�ʵ���
            //���͵�¼��
            ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
            //�ر�
            ClientAnswer.CloseOcxWindow();
            //��
            ClientAnswer.OpenSingle();
        } catch (err) {

        }

    } else if (resflag == "zjxl_RT005") {

        try {
            var padStatus = LessionOcx.ReadSchoolbag(1);

            if (padStatus != 0 && typeof padStatus != 'undefined') {
                //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
                var warn = "���ȹر�" + padStatus + "���ܣ�";
                alert(warn);
                return;
            } else {
                //�޸������ļ�ƽ������ʹ��
                setIsUsingPad(12);
            }

            ClientAnswer.CloseOcxWindow();
            //�׾�Ƿ�
            //���͵�¼��
            ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
            //�ر�
            ClientAnswer.CloseOcxWindow();
            //��
            ClientAnswer.OpenMore();
        } catch (err) {

        }
    }

}

//������Դ�б�
ZJXL.prototype.parseResList = function (rdata) {
    //���ͳɹ���ʧ��
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata && rdata.items && rdata.items.length > 0) {
        for (var i = 0; i < rdata.items.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.items[i];
            var RTitle = temp.rtitle;
            var feedbackFlag = temp.feedbackFlag; //����  0-�� 1-��
            var RFormatMark = temp.iconType;
            var hwPaperType = temp.hwPaperType;//��ҵ�Ծ����� system:ϵͳ�Ծ�;listening:Ӣ��ͬ����
            var RCode = temp.rcode;
            var brandcategory = temp.brandcategory;//���ֹ�Ӧ�� ����
            var jsdata = temp.jsdata;
            var useFlag = temp.useFlag;
            var choiceNum = temp.choiceNum;//ѡ������
            var totalNum = temp.totalNum;//������
            //����jsdata��ȡrcode��rsType
            var object = eval("(" + jsdata + ")");
            var rcode = object.rcode;
            var rsType = object.rsType;
            //paperType 0����ѵ�� 1ϵͳѵ��
            var paperType = 1;
            //�ѷ�ͼ��
            var yifa_pic = "";
            if (useFlag == 1) {
                yifa_pic = "<img width='60' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
            }
            var zhushiTotalNum = "&nbsp(" + choiceNum + "/" + totalNum + ")";
            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/xunlian.png\"  />";
            if (brandcategory == "d793e7143b5f460f9177cee2a7bcadb4") {
                //imagepic="<img width='20' height='20' src=\""+transferProtocol_web+_config["PLS"]+"/newteach/images/icon/zhile.png\"  />";
            }
            //����
            //teachername=teachername+teachername+teachername+teachername;
            //����
            var t = new Date().getSeconds();
            data = "?rcode=" + RCode + "&t=" + t + "&rsType=" + rsType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
            var zuoda = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
            var fankui = zuoda + "&viewFeedback=1";

            //����Ƿ�
            var button = "";//
            button = "<span><a onclick=zjxl.zuoda('" + zuoda + "',0);>����</a></span>";


            if (zjxl.resflag == "zjxl_RT001") {
                paperType = 1;//paperType 0����ѵ�� 1ϵͳѵ��
                if (_treeVersion.currentmfFlag != 0 && getDeviceType() != 0) {
                    //0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ  ���豸
                    button = button + "<span><a onclick=zjxl.dengfen('" + rcode + "','" + paperType + "')>�Ƿ�</a></span>";
                }
            } else if (zjxl.resflag == "zjxl_RT002") {
                paperType = 1;//paperType 0����ѵ�� 1ϵͳѵ��
            } else if (zjxl.resflag == "zjxl_RT003") {
                paperType = 0;//paperType 0����ѵ�� 1ϵͳѵ��
                yifa_pic = "";//�ҵ�Ԥϰ������ʾ"�ѷ�"��ť

                if (feedbackFlag == 1) {
                    button = "<span><a onclick=zjxl.zuoda('" + fankui + "',1);>����</a></span>" + button;
                } else {
                    button = "<span><a style='BACKGROUND: #ccc; cursor: not-allowed;'>����</a></span>" + button;
                }
                if (getDeviceType() != 0) {
                    button = button + "<span><a onclick=zjxl.dengfen('" + rcode + "','" + paperType + "')>�Ƿ�</a></span>";
                }
                //����Ӣ��
                if (hwPaperType == "listening") {
                    zhushiTotalNum = "";
                    imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/tin.png\"  />";
                    //ƴ�Ӳ��ŷ�����ַ
                    // ����/Device/ShowExamInfoTv?username=�û���&truename=��ʵ����&examsid=ѵ��ID&studentClassid=�༶ID&tms=tms��ַ&papername=url������Ծ�����&ks_code=�½�ID
                    ///����/Device/feedback?examsid=ѵ��ID&username=�û���&studentClassid=�༶ID&tms=tms��ַ
                    zuoda = transferProtocol_web + _config["ESLEANR"] + '/Device/ShowExamInfoTv?examsid=' + RCode + "&username=" + teachernumber + "&ks_code=" + _treeVersion.currentCourseId + "&truename=" + encodeURIComponent(encodeURIComponent(teachernumber)) + "&studentClassid=" + userclass + "&tms=" + _config["TMS"] + "&papername=" + encodeURIComponent(encodeURIComponent("1"));
                    fankui = transferProtocol_web + _config["ESLEANR"] + '/Device/feedback?examsid=' + RCode + "&username=" + teachernumber + "&studentClassid=" + userclass + "&tms=" + _config["TMS"];
                    button = "<span><a onclick=zjxl.zuoda('" + zuoda + "',0);>����</a><a style='BACKGROUND: #ccc; cursor: not-allowed;'>����</a></span>";
                    if (feedbackFlag == 1) {
                        button = "<span><a onclick=zjxl.zuoda('" + zuoda + "',0);>����</a><a onclick=openResPageWithClose('" + fankui + "','');>����</a></span>";
                    }
                }
            }

            //�ж��Ƿ�Ϊƽ�����
            if (hwPaperType != "listening" && getIsSchoolbag()) {
                if (getIsHavingClass() == 1) {
                    button = button + "<span><a onclick=zjxl.sendToPad('" + rsType + "','" + rcode + "');>���͵�ƽ��</a></span>";
                } else {
                    button = button + "<span><a style='BACKGROUND: #ccc; cursor: not-allowed;';>���͵�ƽ��</a></span>";
                }
            }
            //RTitle+=RTitle;
            temphtml.push("<li>" + button + imagepic + "<a move=\"right\" onclick=zjxl.zuoda('" + zuoda + "',0); title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + RTitle + "</p><b class='leix'>" + zhushiTotalNum + "</b>" + yifa_pic + "</a></li>");
        }

    } else {
        //�Ž�ѵ�������Ӣ����
        if (zjxl.resflag == "zjxl_RT002") {
            zjxl.zyCount = 0;
        } else {
            temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
        }
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));

    //������Դ���ƿ��
    //ϵͳ�Ծ���ʾ���ú�a/b
    var yiyongWidth = 142;
    if (zjxl.resflag == "zjxl_RT003") {
        //�ҵ��Ծ�ֻ��ʾa/b
        yiyongWidth = 67;
    }
    $(".zy-tm").css("max-width", $(".zy-tm").width() - yiyongWidth);
    $(".zy-tm").css("width", "auto");

    zjxl.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //_common.splitpage(".testList li",1,zjxl.pagesize,"#pageRightNav");
    //_common.splitpage(".testList li",1,zjxl.pagesize,"#pageRightNav",null,null,null,"ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a��");
    $("#pageRightNav").html("<div class='zhushi'>ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a����</div><DIV class=pages></DIV>");
    _common.splitpage(".testList li", 1, zjxl.pagesize, ".pages", null, null, null, true);
    //�Ž�ѵ�������Ӣ����
    if (zjxl.resflag == "zjxl_RT002") {
        var url2 = transferProtocol_web + _config["ESLEANR"] + "/device/GetExamList?datatype=0&logintype=1&username=" + teachernumber + "&sso=" + _config["TMS"] + "&ks_code=" + _treeVersion.currentCourseId + "&studentClassid=" + _commonDiv.getUserClassId() + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&areaId=" + areaId;
        ajaxJson(url2, null, "utf-8", zjxl.parseEnglishRes);
    }
}
ZJXL.prototype.sendToPad = function (rsType, rcode) {

    if (getIsHavingClass() == 0) {
        alert("����ƽ��ǩ����ʹ�ã�")
        return;
    }

    // var padStatus = getIsUsingPad();
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
        setIsUsingPad(16);
    }

    //���͵�ƽ��
    if (rsType == 2) {
        //ϵͳ�Ծ�
        rsType = 1;
    } else if (rsType == 6) {
        //�����Ծ�
        rsType = 0;
    } else {
        rsType = 1;
    }

    _common.addTjPv("stxl", teachernumber, userclass, _common.channelid);//pvͳ��
    var url = transferProtocol_web + _config["QBMS"] + "/online/interface/answerdevice/sendEBook.action?";
    url += 'data={"paper_id":\"' + rcode + '\","type":\"' + rsType + '\","lessionId":\"' + _treeVersion.currentCourseId + '\","tchId":\"' + teachernumber + '\","tchName":\"' + encodeURIComponent(encodeURIComponent(teachername)) + '\"}';

    ajaxJson(url, null, "gbk", function (rdata) {
        if (rdata && rdata.data && rdata.success) {
            var downloadurl = rdata.data.downloadurl;
            var paper_id = rdata.data.paper_id;

            loginInfo = "teachernumber:\"" + teachernumber + "\",teachername:\"" + encodeURIComponent(encodeURIComponent("")) + "\",schoolId:\"" + schoolId + "\",schoolName:\"" + encodeURIComponent(encodeURIComponent("")) + "\",classId:\"" + userclass + "\"";
            loginInfo += ",downloadurl:\"" + encodeURIComponent(encodeURIComponent(downloadurl)) + "\",paper_id:\"" + paper_id + "\"";

            var url = transferProtocol_web + _config["PLS"] + "/newteach/pad/pad.jsp?type=sendToPad&data={" + loginInfo + "}";

            _common.openResPage(1000, 720, url, 2);

            var matchintype = getDeviceType();

            //getfplatform_subtype()
            var stypeparm = "";
            if ("2" == matchintype) {
                stypeparm = "NUMBERANSWERDEVICE";
            } else if ("3" == matchintype) {
                stypeparm = "PAD";//pv ����
            }

            //�鿴����
            var data = "?rcode=" + paper_id + "&rsType=6&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername)) + "&areaId=" + areaId;
            var zuoda = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
            var fankui = zuoda + "&viewFeedback=1&isEbook=1&fplatform_subtype=" + stypeparm;


            //http://tqms.youjiaotong.com/online/interface/newteach/answerdevice/viewClassPracticeDevice.action?rcode=61d4f252ae284b6aaf9816a3b3400c3f&rsType=6&classId=00010203020402&studentClass=141982115612614619&username=41010155550019&userTrueName=%25E6%2596%25B0%25E8%2580%2581%25E5%25B8%25885%25E5%25B9%25B4%25E7%25BA%25A7%25E5%25AD%25A6%25E7%2594%259F%25E5%25A7%2593%25E5%2590%258D&areaId=1.1.1&viewFeedback=1&isEbook=1&loginStyle=0
            setTimeout("_common.openResPage('" + screen.width + "','" + screen.height + "','" + fankui + "')", 0);
        } else {
            alert("��ȡ���ص�ַʧ�ܣ�");
        }
    }, 30000, true);

}
ZJXL.prototype.view = function (rcode, RTitle) {
    //ѵ��Ԥ��
    url = transferProtocol_web + _config["QBMS"] + '/tqms/interface/queryPaper.action?paper_id=' + rcode
    openResPageWithClose(url, RTitle);
}
ZJXL.prototype.duoti = function (rcode) {
    //��ȡ��������
    var domain = _config["QBMS"].substring(_config["QBMS"].indexOf(".") + 1);

    writeLoginInfoCookie("loginInfo", _commonDiv.loginInfo, 1, domain);

    //����
    var xunlian = transferProtocol_web + _config["QBMS"] + '/online/interface/answerdevice/queryTblxPaper.action?paper_id=' + rcode + "&lessionId=" + _treeVersion.currentCourseId;
    //�ͻ�����ʱ��֧�ַ���https
    //var url= transferProtocol_web + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id='+rcode+"&morequestionflag&lessionId="+_treeVersion.currentCourseId;
    var url = "http://" + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id=' + rcode + "&morequestionflag&lessionId=" + _treeVersion.currentCourseId;
//���͵�¼��
    ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
    //�ر�
    ClientAnswer.CloseOcxWindow();
    //��
    ClientAnswer.OpenPaper(url);
    // alert(url);
    // _common.openByIE(url);
    openResPageWithClose(xunlian, "");
    //eval(_common.openResPage(screen.width,screen.height,url));
}
ZJXL.prototype.openAnswer = function (rcode, paperType) {

    //paperType 0����ѵ�� 1ϵͳѵ��  +"&type="+paperType
    //var url= transferProtocol_web + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id='+rcode+"&morequestionflag&lessionId="+_treeVersion.currentCourseId;
    var url = "http://" + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id=' + rcode + "&morequestionflag&lessionId=" + _treeVersion.currentCourseId;
    //���͵�¼��
    ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
    //�ر�
    ClientAnswer.CloseOcxWindow();
    //��
    ClientAnswer.OpenPaper(url);
}
ZJXL.prototype.dengfen = function (rcode, paperType) {
    _common.addTjPv("df", teachernumber, userclass, _common.channelid);//pvͳ��
    try {
        //paperType 0����ѵ�� 1ϵͳѵ��
        //����ѵ���Ƿֵ��ø�����ҵԤ���ӿڣ�ϵͳѵ���Ƿֵ���ϵͳ��ҵԤ���ӿ�
        var dengfenUrl = transferProtocol_web + _config["QBMS"] + "/online/interface/queryTblxPaper.action?paper_id=" + rcode + "&lessionId=" + _treeVersion.currentCourseId;
        if (paperType == 0) {
            dengfenUrl = transferProtocol_web + _config["QBMS"] + "/online/interface/queryZtlxPaper.action?paper_id=" + rcode + "&lessionId=" + _treeVersion.currentCourseId;
        }

        //��ȡ��������
        var domain = _config["QBMS"].substring(_config["QBMS"].indexOf(".") + 1);
        writeLoginInfoCookie("loginInfo", _commonDiv.loginInfo, 1, domain);

        zjxl.zuoda(dengfenUrl, 2);
        zjxl.openAnswer(rcode, paperType);
        return;

        // var padStatus = getIsUsingPad();
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
            setIsUsingPad(13);
        }
        //�ͻ�����ʱ�޷�����https
        //var url = transferProtocol_web+_config["QBMS"]+"/online/interface/answerdevice/volumeOfPointsQues.action?paper_id="+rcode+"&lessionId="+_treeVersion.currentCourseId;
        var url = "http://" + _config["QBMS"] + "/online/interface/answerdevice/volumeOfPointsQues.action?paper_id=" + rcode + "&lessionId=" + _treeVersion.currentCourseId;
        //�Ƿ�
        //���͵�¼��
        ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
        //�ر�
        ClientAnswer.CloseOcxWindow();
        //��
        ClientAnswer.OpenPaper(url);
    } catch (err) {

    }
}

//�豸����ֵ
function getfplatform_subtype() {
    // ������Ͽη��� 3PAD ���ü� NUMBERANSWERDEVICE ����Ϊ��
    var fplatform_subtype = "";
    if (getIsHavingClass() == 1) {
        fplatform_subtype = "PAD";
    } else if (getDeviceType() == 2) {
        fplatform_subtype = "NUMBERANSWERDEVICE";
    } else {
        fplatform_subtype = "";
    }

    return fplatform_subtype;
}

ZJXL.prototype.zuoda = function (zuoda, type) {

    //type 0���� 1���� 2 �Ƿ�
    // var padStatus = getIsUsingPad();
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
        if (type == 1) {
            setIsUsingPad(18);
        } else if (type == 0) {
            setIsUsingPad(14);
        } else if (type == 2) {
            setIsUsingPad(13);
        }
    }

    //�ر�
    try {
        ClientAnswer.CloseOcxWindow();
    } catch (err) {

    }

    var matchintype = getDeviceType();
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
        zuoda = zuoda + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=" + _macUtil.getMACAdd();
    } else {
        console.log("��ȡ����mac��ַ");
        zuoda = zuoda + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=";
    }

    if (type == 2) {
        //����
        zuoda = zuoda + "&loginStyle=" + loginStyle;
        eval(openResPageWithClose(zuoda, ""));
    } else {
        //����
        eval(_common.openResPage(screen.width, screen.height, zuoda));
    }

}

//Ӣ����ѵ��
ZJXL.prototype.parseEnglishRes = function (data) {
    var temphtml = new Array();
    if (null != data && undefined != data && data.length > 0) {
        zjxl.count += data.length;
        for (var i = 0; i < data.length; i++) {
            var res = data[i];
            var RTitle = res.name;
            var resFK = res.isfankui;
            var resUrl = encodeURIComponent(res.showurl);
            var resFKurl = encodeURIComponent(res.fankuiurl);
            var resType = res.type;//5���� 6����

            var imagepic = "", button = "";
            imagepic = "<IMG  src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/ci.png\" width=20 height=20>";

            if ("5" == resType) {
                imagepic = "<IMG  src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/tin.png\" width=20 height=20>";
            }

            button = "<span><A onclick=\"zjxl.englishOpen('" + resUrl + "')\" >����</A></span>";

            //�ѷ�ͼ��

            var yifa_pic = "";
            if (resFK) {
                yifa_pic = "<img width='60' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
            }

            //resFKurl=resUrl;
            // resFK=1;
            /*if(resFK){
                button="<span><A onclick=\"zjxl.englishOpen('"+resFKurl+"',true)\" >���</A><A onclick=\"zjxl.englishOpen('"+resUrl+"')\" >����</A></span>";
            }*/
            //RTitle=RTitle+RTitle+RTitle+RTitle;

            temphtml.push("<li class='english'>" + button + imagepic + "<a onclick=\"zjxl.englishOpen('" + resUrl + "')\"; title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + RTitle + "</p>" + yifa_pic + "</a></li>");

        }
    } else {
        if (zjxl.zyCount == 0) {
            temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
        }
    }
    //Ӣ��������
    $(".testList").append(temphtml.join(""));

    //������Դ���ƿ��
    $(".english .zy-tm").css("max-width", $(".english .zy-tm").width() - 75);
    $(".english .zy-tm").css("width", "auto");

    //_common.splitpage(".testList li",1,zjxl.pagesize,"#pageRightNav",null,null,null,"ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a��");
    $("#pageRightNav").html("<div class='zhushi'>ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a����</div><DIV class=pages></DIV>");
    _common.splitpage(".testList li", 1, zjxl.pagesize, ".pages", null, null, null, true);
}
//Ӣ�������ڴ�
ZJXL.prototype.englishOpen = function (url, isie) {
    url = decodeURIComponent(url);
    url += "&loginStyle=" + loginStyle;
    if (isie) {
        _common.openByIE(url);
    } else {
        var width = screen.width;
        var heights = screen.height;
        _common.openResPage(width, heights, url);
    }
}
