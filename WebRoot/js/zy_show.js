var zy = new ZY();

//ͬ���ڿ�ģ�����
function ZY() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.firstMenu = null;        //
    this.backCache = null;
    this.pageCache = null;//��ҳ״̬����
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.allList = []; //ȫ����Դ
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ
    this.typeList = [{id: "zy_RT001", name: "��ʦ��ҵ", yunMenuType: "0"},
        {id: "zy_RT002", name: "�Ž���ҵ", yunMenuType: "0"},
        {id: "zy_RT003", name: "�ҵ�������ҵ", yunMenuType: "1"},
        {id: "zy_RT004", name: "�ҵ�������ҵ", yunMenuType: "1"}
    ];
}

//������Ŀ,���������˵���
ZY.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");

    //��ʾ�����˵�
    zy.showQuickTeachThredMenu();

}

//��ʾ�����˵���Ŀ
ZY.prototype.showQuickTeachThredMenu = function () {
    var data = "lessionId=" + _treeVersion.currentCourseId;
    ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/hw/homeworkFamousTeach.action", data, "gbk", zy.getDynamicMenu);
}
//��̬��ȡ�˵�
ZY.prototype.getDynamicMenu = function (rdata) {
    //��ȡ��̬�˵� ��ʦ��ҵ���Ž���ҵ
    var tMenuCode = new Array();
    //������˵���
    if (rdata && rdata.isShowFamous == 1) {
        if (tMenuCode.length == 0) {
            zy.firstMenu = zy.typeList[0].id;
        }
        tMenuCode.push("<a href='#' id='" + zy.typeList[0].id + "' onclick='zy.clickQuickTeach(\"" + zy.typeList[0].id + "\");' >" + zy.typeList[0].name + "</a>");
    }
    if (rdata && rdata.isShowTeach == 1) {
        if (tMenuCode.length == 0) {
            zy.firstMenu = zy.typeList[1].id;
        }
        if (typeof subMenuYouJiaoKey != "undefined") {
            zy.typeList[1].name = zy.typeList[1].name.replace("�Ž�", subMenuYouJiaoKey);
        }
        tMenuCode.push("<a href='#' id='" + zy.typeList[1].id + "' onclick='zy.clickQuickTeach(\"" + zy.typeList[1].id + "\");' >" + zy.typeList[1].name + "</a>");
    }

    for (var i = 2; i < zy.typeList.length; i++) {
        var temp = zy.typeList[i];
        var yunMenuType = "";
        if (temp.yunMenuType == "1") {
            yunMenuType = "yunMenuType";
        }
        tMenuCode.push("<a href='#' id='" + temp.id + "' class='" + yunMenuType + "' onclick='zy.clickQuickTeach(\"" + temp.id + "\");' >" + temp.name + "</a>");
    }
    //$(".subMenu").html("");
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();
    $("#" + zy.firstMenu).click();
}
//�����˵������¼�
ZY.prototype.clickQuickTeach = function (resflag) {
    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".resList").remove();
    $("#pageBar").remove();
    //$(".courseTitle").html(_treeVersion.currentCourseName+"<span class=\"bgImg\"></span>");
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });

    $("#" + resflag).addClass("cur");

    if (resflag == "zy_RT001") {
        //��ʦ��ҵ
        //���� loginStyle 0�ڿ� 1PC 2�ֻ�
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&username=" + teachernumber + "&paperType=2&loginStyle=0";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/homework/queryHomeworkByPaperType.action", data, "gbk", zy.parseResList);
        return;
    } else if (resflag == "zy_RT002") {
        //�Ž���ҵ
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&username=" + teachernumber + "&paperType=1&loginStyle=0";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/homework/queryHomeworkByPaperType.action", data, "gbk", zy.parseResList);
        return;
    } else if (resflag == "zy_RT003") {
        //�ҵ�������ҵ
        var data = "classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&start=0&type=0&limit=100&username=" + teachernumber + "&paperType=0&loginStyle=0";
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/homework/queryHomeworkByPaperType.action", data, "gbk", zy.parseResList);
        return;
    } else if (resflag == "zy_RT004") {
        //�ҵ�������ҵ
        var data = "command=jobSent&username=" + teachernumber + "&infoid=" + _treeVersion.currentCourseId + "&start=0&size=100";
        ajaxJson(transferProtocol_web + _config["WEBMAIL"] + "/src/msgInterFace.php", data, "gbk", lxzy.parseResList);
        return;

    } else {
        return;
    }
}
//������Դ�б�
ZY.prototype.parseResList = function (rdata) {
    //���ͳɹ���ʧ��
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\" id=\"zylist\">");
    if (rdata && rdata.items && rdata.items.length > 0) {
        for (var i = 0; i < rdata.items.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.items[i];
            var RTitle = temp.rtitle;
            RTitle = convertHtml(RTitle);
            var jsdata = temp.jsdata;
            //var feedbackFlag = temp.feedbackFlag; //�Ƿ��з���  0-�� 1-��
            var classPublishStatus = temp.classPublishStatus; //�Ƿ��з���  0-�� 1-��
            var status = temp.status; //�ҵ���ҵ�Ƿ��ѷ�  0-�� 1-��
            var useFlag = temp.useFlag; //ϵͳ�Ƿ��ѷ�  0-�� 1-��
            var iconTitle = temp.iconTitle; //
            var RFormatMark = temp.iconType;
            var hwPaperType = temp.hwPaperType;//��ҵ�Ծ����� system:ϵͳ�Ծ�;listening:Ӣ��ͬ����
            var RCode = temp.rcode;
            var brandcategory = temp.brandcategory;//���ֹ�Ӧ�� ����
            var homeworkId = temp.homeworkId;
            //����jsdata��ȡrcode��rsType
            var object = eval("(" + jsdata + ")");
            var rcode = object.rcode;
            var rsType = object.rsType;
            //�ѷ�ͼ�� ���status��useFlagͬʱ����
            var yifa_pic = "";

            if (zy.resflag == "zy_RT003") {
                /*if (status == 1) {
                    yifa_pic = "<img width='60' height='25' src='" + transferProtocol_web+_config["PLS"]+"/newteach/images/icon/res/yifa.png' >";
                }*/
            }
            if (zy.resflag == "zy_RT001" || zy.resflag == "zy_RT002") {
                if (useFlag == 1) {
                    yifa_pic = "<img width='60' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
                }
            }

            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/zuoye.png\"  />";
            if (brandcategory == "d793e7143b5f460f9177cee2a7bcadb4") {
                //imagepic="<img width='20' height='20' src=\""+transferProtocol_web+_config["PLS"]+"/newteach/images/icon/zhile.png\"  />";
            }

            //playjs ϵͳ��ҵԤ���ӿ�
            var playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/queryTblxPaper.action?paper_id=" + RCode;
            var width = screen.width;
            var heights = screen.height;
            //����
            data = "?rcode=" + RCode + "&rsType=" + rsType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId + "&viewFeedback=1";
            //var fankui = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;

            //��ʦ��ҵ���Ž���ҵ����һ�ڲ���
            var send = "zy.sendRecommend('sys','" + homeworkId + "','" + RCode + "');";
            var button = "<span><a href=\"javascript:" + send + "\">����</a></span>";
            if (zy.resflag == "zy_RT003") {
                //playjs �ҵ���ҵԤ���ӿ�
                playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/queryZtlxPaper.action?paper_id=" + RCode;
                send = "zy.sendRecommend('normal','" + homeworkId + "','" + RCode + "');";

                button = "<span><a href=\"javascript:" + send + "\">����</a><a style='BACKGROUND: #ccc; disabled=true'>����</a></span>";
                if (classPublishStatus == 1) {
                    button = "<span><a href=\"javascript:" + send + "\">����</a><a href=\"javascript:zy.fankui('" + RCode + "','" + RTitle + "','" + hwPaperType + "');\">����</a></span>";
                }
                //Ӣ����
                if (hwPaperType == "listening") {
                    button = "<span><a href=\"javascript:" + send + "\">����</a><a style='BACKGROUND: #ccc; disabled=true'>����</a></span>";
                    if (classPublishStatus == 1) {
                        button = "<span><a href=\"javascript:" + send + "\">����</a><a href=\"javascript:zy.englishfankui('" + RCode + "','" + RTitle + "','english');\">����</a></span>";
                    }
                }
            }
            if (hwPaperType == "listening") {
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/english.png\"  />";
                playjs = transferProtocol_web + _config["ESLEANR"] + '/Homework/Comhw/student_homework?paper_id=' + RCode;
            }
            temphtml.push("<li>" + button + "" + imagepic + "<a move=\"right\" id=index_1 href=\"javascript:openResPageWithClose('" + playjs + "','" + RTitle + "');\"  title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + RTitle + "</p>" + yifa_pic + "</a></li>");
        }
    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).append(temphtml.join(""));
    //������Դ���ƿ��
    $(".zy-tm").css("max-width", $(".zy-tm").width() - 75);
    $(".zy-tm").css("width", "auto");

    temphtml = null;
    zy.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����

    if (zy.resflag == 'zy_RT003') {
        $("#pageRightNav").html("<DIV class=pages style='float:right;'></DIV><div style='float:right;'><a onclick='ktjx.showPaper(2);'><img width='113' height='30'style='padding-right:5px;' src='./images/ktjx/znzj01.png'/></a></div>");
    } else {
        //$("#pageRightNav").html("");
    }
    _common.splitpage(".testList li", 1, zy.pagesize, ".pages", null, null, null, true);
//    _common.splitpage(".testList li",1,zy.pagesize,"#pageRightNav");
}
//��ҵ����
ZY.prototype.fankui = function (RCode, RTitle, paperType) {

    zy.backCache = $(_pMain.getMainRight()).html();
    zy.pageCache = $("#pageRightNav").html();

    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + RTitle + "<span class=\"bgImg\"></span></div>");

    var data = 'paperWorkId=' + RCode + '&type=PRACTICE&studentclass=' + userclass;
    ajaxJson(transferProtocol_web + _config["OLMS"] + "/tqms/interface/paper/JobStsCms.action", data, "utf-8", function (rjson) {
        if (!rjson) {
            return;
        }
        var errButt = '', playjs = "";
        var dhtml = new Array();
        dhtml.push("<ul class='testList' id='zytjlist' >");
        if (rjson && rjson.length > 0) {
            $(rjson).each(function (num) {//��ȡ����ͳ��
                    var answerNum = $(this).attr("answerNum");//������
                    var errorRate = $(this).attr("errorRate");//������
                    var errornum = $(this).attr("errornum");//	������
                    var question_id = $(this).attr("question_id");//����
                    var seq_no = $(this).attr("seq_no");//�����
                    //var seq_no_BB=$(this).attr("qSeq_no_chinese");//�����
                    if (paperType == "import") {
                        var errButt = '', playjs = "";
                    } else {
                        errButt = '<span><a href="#" onclick="zy.openzytj(\'' + RCode + '\',\'' + question_id + '\');"  >����ͳ��</a></span>';
                        playjs = '"zy.openzytj(\'' + RCode + '\',\'' + question_id + '\');"';
                    }
                    dhtml.push('<li>' + errButt + '<a href="#" onclick=' + playjs + '  ><nobr>��' + seq_no + '��&nbsp;&nbsp;�ύ��:' + answerNum + '&nbsp;&nbsp;���:' + errornum + '&nbsp;&nbsp;�����ʣ�' + errorRate + '</nobr></a></li>');
                }
            );
        } else {
            dhtml.push('<li><center>����������Ϣ��</center></li>');
        }
        //��ҳ�뷵��
        var previous = transferProtocol_web + _config["PLS"] + "/newteach/images/previous.png";
        $("#pageRightNav").html('<DIV class=pageNext><A id="prove" onclick="$(_pMain.getMainRight()).html(zy.backCache);$(\'#pageRightNav\').html(zy.pageCache);"><img src="' + previous + '"></A></DIV><DIV class=pageNow></DIV>');

        $(_pMain.getMainRight()).html(dhtml.join(""));
        _common.splitpage("#zytjlist li", 1, zy.pagesize, "#pageRightNav .pageNow");
    });
}
//Ӣ��������ͳ��
ZY.prototype.englishfankui = function (zyid, title, paperType) {
    zy.backCache = $(_pMain.getMainRight()).html();
    zy.pageCache = $("#pageRightNav").html();
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+title+"<span class=\"bgImg\"></span></div>");

    var data = 'paper_id=' + zyid + '&username=' + teachernumber + '&classId=' + userclass + '&num=20';
    ajaxJson(transferProtocol_web + _config["ESLEANR"] + "/Pubinterface/Index/getStuhwErrorFeedback", data, "utf-8", function (rjson) {
        if (!rjson) {
            return;
        }
        var errButt = '', playjs = "";
        var dhtml = new Array();
        dhtml.push("<ul class='testList' id='zytjlist' >");
        if (rjson.Wordread && rjson.Wordread.length > 0) {
            dhtml.push('<li>���ʸ���</li>');
            $(rjson.Wordread).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point = $(this).attr("average");//�÷�
                var url = $(this).attr("url");//����

                //playjs='"_common.openByIE(\''+url+'\');"';
                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;ƽ���֣�' + point + '</nobr></a></li>');
            });
        }
        if (rjson.Wordevaluat && rjson.Wordevaluat.length > 0) {
            dhtml.push('<li>����ƴд</li>');
            $(rjson.Wordevaluat).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point1 = $(this).attr("errornum");//�������
                var point2 = $(this).attr("errorrate");//�����
                var url = $(this).attr("url");//����

                //playjs='"_common.openByIE(\''+url+'\');"';
                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;���������' + point1 + '&nbsp;&nbsp;����ʣ�' + point2 + '</nobr></a></li>');
            });
        }
        if (rjson.Wordhy && rjson.Wordhy.length > 0) {
            dhtml.push('<li>Ӣ������</li>');
            $(rjson.Wordhy).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point1 = $(this).attr("errornum");//�������
                var point2 = $(this).attr("errorrate");//�����
                var url = $(this).attr("url");//����

                //playjs='"_common.openByIE(\''+url+'\');"';
                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;���������' + point1 + '&nbsp;&nbsp;����ʣ�' + point2 + '</nobr></a></li>');
            });
        }
        if (rjson.Wordxc && rjson.Wordxc.length > 0) {
            dhtml.push('<li>����ѡ��</li>');
            $(rjson.Wordxc).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point1 = $(this).attr("errornum");//�������
                var point2 = $(this).attr("errorrate");//�����
                var url = $(this).attr("url");//����

                //playjs='"_common.openByIE(\''+url+'\');"';
                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;���������' + point1 + '&nbsp;&nbsp;����ʣ�' + point2 + '</nobr></a></li>');
            });
        }
        if (rjson.Textread && rjson.Textread.length > 0) {
            dhtml.push('<li>�����ʶ�</li>');
            $(rjson.Textread).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point = $(this).attr("average");//�÷�
                var point2 = $(this).attr("speelrate");//ƴд��
                var url = $(this).attr("url");//����

                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;ƽ���֣�' + point + '</nobr></a></li>');
            });
        }
        if (rjson.examsquiz && rjson.examsquiz.length > 0) {
            dhtml.push('<li>����ѵ��</li>');
            $(rjson.examsquiz).each(function (num) {//��ȡ����ͳ��
                var title = $(this).attr("name");//����
                var allNum = $(this).attr("num");//��������
                var point1 = $(this).attr("errnum");//�����
                var point2 = $(this).attr("errorrate");//������
                var url = $(this).attr("url");//����

                playjs = 'zy.openEngPage(\'' + url + '\');';
                dhtml.push('<li><a href="#" onclick=' + playjs + '  ><nobr>' + title + '&nbsp;&nbsp;��������' + allNum + '&nbsp;&nbsp;�������' + point1 + '&nbsp;&nbsp;�����ʣ�' + point2 + '</nobr></a></li>');
            });
        }
        if (dhtml.length < 2) {
            dhtml.push('<li><center>����������Ϣ��</center></li>');
        }
        //��ҳ�뷵��
        var previous = transferProtocol_web + _config["PLS"] + "/newteach/images/previous.png";
        $("#pageRightNav").html('<DIV class=pageNext><A id="prove" onclick="$(_pMain.getMainRight()).html(zy.backCache);$(\'#pageRightNav\').html(zy.pageCache);"><img src="' + previous + '"></A></DIV><DIV class=pageNow></DIV>');
        $(_pMain.getMainRight()).html(dhtml.join(""));
        _common.splitpage("#zytjlist li", 1, zy.pagesize, "#pageRightNav .pageNow");
    });
}
ZY.prototype.openEngPage = function (url) {
    var pt = encodeURIComponent(encodeURIComponent("��ҵ�鿴"));
    if (transferProtocol_web == "https://" && url.indexOf("http://") > -1) {
        url.replace("http:", "https:");
    }
    var pp = encodeURIComponent(url);
    var pu = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + pp + "&title=" + pt;
    _common.openResPage(screen.width, screen.height, pu);
}
//�鿴��ҵͳ��������ϸ
ZY.prototype.openzytj = function (paper_id, qid) {
    //maskAll.style.display='block';
    var width = screen.width;
    var heights = screen.height;
    //����������һ�����ڡ�
    //window.open(_common.interfaceurl+"OLMS.019&data={\"question_id\":\""+qid+"\",\"paper_id\":\""+paper_id+"\"}",'newwindow','height='+heights+',width='+width+',top=100,left=200,toolbar=no,menubar=no,alwaysRaised=yes,scrollbars=yes, resizable=no,location=no, status=no');

    var title = encodeURIComponent(encodeURIComponent("����ͳ��"));
    var path = encodeURIComponent(pls_config_all["OLMS.019"] + "?question_id=" + qid + "&paper_id=" + paper_id + "&studentclass=" + userclass);
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/windowframe.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}
//������ҵ���༶
ZY.prototype.sendRecommend = function (publishType, homeworkId, paper_id) {
    //type 0ϵͳ��ҵ 1�ҵ���ҵ
    //ѡ�񷢲��༶�����ѷ����༶��Ϊ��ɫdisabled��
    //��ȡ�ѷ��͵İ༶
    var data = "publishType=" + publishType + "&homeworkId=" + homeworkId + "&paper_id=" + paper_id + "&username=" + teachernumber;
    ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/hw/getHomeworkPublishedClass.action", data, "gbk", function (rdata) {

        var alreadySendClass = new Array();
        for (var i = 0; i < rdata.length; i++) {
            alreadySendClass.push(rdata[i].id);
        }

        _commonDiv.openWindow(1, "������ҵ", "��ѡ��༶��", function (selectclass) {
            var sendToClass = new Array();
            var allclass = new Array();
            for (var i = 0; i < selectclass.length; i++) {
                sendToClass.push(selectclass[i].classId);
            }

            var data = "";
            var url = "";
            if (publishType == "sys") {
                data = "usertype=" + usertype + "&username=" + teachernumber + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&paper_id=" + paper_id + "&classIds=" + sendToClass.join(",") + "&areaId=" + areaId + "&lessionId=" + _treeVersion.currentCourseId;
                url = transferProtocol_web + _config["QBMS"] + "/tqms/mobile/homework/publishSysLessonPreByClassInterface.action" + "?" + data;
            } else if (publishType == "normal") {
                data = "usertype=" + usertype + "&username=" + teachernumber + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&storeHomeworkId=" + homeworkId + "&classIds=" + sendToClass.join(",") + "&areaId=" + areaId;
                url = transferProtocol_web + _config["QBMS"] + "/tqms/mobile/homework/publishHomeWorkByClassInterface.action" + "?" + data;
            }
            ajaxJson(url, null, "GBK", function (result) {
                if (result.status == true) {
                    _commonDiv.tip("���ͳɹ�!");
                    zy.clickQuickTeach(zy.resflag);//ˢ��
                } else {
                    if (result.msg) {
                        _commonDiv.tip(result.msg);
                    } else {
                        _commonDiv.tip("����ʧ��!");
                    }
                }
                _commonDiv.closeWindow(2000);
            })
        }, true, alreadySendClass);
    });
}
