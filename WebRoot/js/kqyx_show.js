var kqyx = new KQYX();

//ͬ���ڿ�ģ�����
function KQYX() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.systype = null;          //
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.backCache = null;
    this.pageCache = null;//��ҳ״̬����
    this.firstMenu = null; //��һ���˵���
    this.buttonType = null;//1.Ԥ�� 2.���� 3.��������鿴����
    this.rcode = null;//Ԥϰid
    this.kqyxObjList = new Array();//Ԥϰ��������Դ����
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ
    this.typeList = [
        /* {id:"kqyx_RT001",name:"��ʦԤϰ",data:[]},
         {id:"kqyx_RT002",name:"�Ž�Ԥϰ",data:[]},*/
        {id: "kqyx_RT003", name: "�ҵ�Ԥϰ", data: []}
    ];
}

//������Ŀ,���������˵���
KQYX.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //if(_treeVersion.currentCourseName.length>_pMain.newpagefontsize)_treeVersion.currentCourseName=_treeVersion.currentCourseName.substring(0,_pMain.newpagefontsize)+"��";
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");

    //��ʾ�����˵�
    kqyx.showQuickTeachThredMenu();

}
//��ʾ�����˵���Ŀ
KQYX.prototype.showQuickTeachThredMenu = function () {
    //��ȡ��̬�˵� ��ʦ�μ����Ž̿μ����ο��μ��Ȳ˵���
    var data = "ksid=" + _treeVersion.currentCourseId;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getCourseTypeShow.do", data, "gbk", kqyx.getDynamicMenu)

}

//��̬��ȡ�˵�
KQYX.prototype.getDynamicMenu = function (rdata) {
    //��ȡ��̬�˵� ��ʦ�μ����Ž̿μ����ο��μ�
    var tMenuCode = new Array();
    if (rdata && rdata.sysjobTypeList) {
        var k = 0;
        $(rdata.sysjobTypeList).each(function () {
            k++;
            var id = "kqyx_" + k;
            if (tMenuCode.length == 0) {
                kqyx.firstMenu = id;
            }
            if (typeof subMenuYouJiaoKey != "undefined") {
                this.systypeName = this.systypeName.replace("�Ž�", subMenuYouJiaoKey);
            }
            tMenuCode.push("<a href='#' id='" + id + "' onclick='kqyx.clickQuickTeach(\"" + id + "\",\"" + this.systype + "\");' >" + this.systypeName + "</a>");

        });
    }
    //���ع̶��˵�
    for (var i = 0; i < kqyx.typeList.length; i++) {
        var temp = kqyx.typeList[i];
        if (tMenuCode.length == 0) {
            kqyx.firstMenu = "kqyx_" + temp.id;
        }
        tMenuCode.push("<a  class='yunMenuType' id='" + temp.id + "' onclick='kqyx.clickQuickTeach(\"" + temp.id + "\");' >" + temp.name + "</a>");
    }

    $(".subMenu").html("");
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();
    $("#" + kqyx.firstMenu).click();

}
//�����˵������¼�
KQYX.prototype.clickQuickTeach = function (resflag, systype) {
    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    this.systype = systype;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".yuxiDescList").remove();
    $(".resList").remove();
    $("#pageBar").remove();

    //$(".courseTitle").html(_treeVersion.currentCourseName+"<span class=\"bgImg\"></span>");

    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");
    if (resflag == "kqyx_RT003") {
        //�ҵ�Ԥϰ
        var data = "ksid=" + _treeVersion.currentCourseId + "&username=" + teachernumber + "&classId=" + userclass + "&ut=" + sso_ut;
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getSelfCourseJobList.do", data, "gbk", kqyx.parseResList);
        return;
    } else {
        //��ʦԤϰ �Ž�Ԥϰ
        var data = "ksid=" + _treeVersion.currentCourseId + "&systype=" + systype + "&username=" + teachernumber + "&classId=" + userclass;
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getCourseJobList.do", data, "gbk", kqyx.parseResList);
        return;
    }
}

//������Դ�б�
KQYX.prototype.parseResList = function (rdata) {
    //���ͳɹ���ʧ��
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata && rdata.items && rdata.items.length > 0) {
        for (var i = 0; i < rdata.items.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.items[i];
            var RTitle = temp.name;
            var desc = temp.desc;
            var jobtype = temp.jobtype;
            var genflag = temp.genflag; //1Ϊ�༭����0û�༭��
            var useFlag = temp.useFlag; //�ѷ�
            var RFormatMark = temp.RFormatMark;
            var RCode = temp.id;
            //�ѷ�ͼ��

            var yifa_pic = "";
            if (useFlag != null && useFlag == 2) {
                yifa_pic = "<img width='60' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
            }

            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/yuxi.png\"  />";
            var width = screen.width;
            var height = screen.height;

            var button = "<span><a href=\"javascript:_commonDiv.openTaskWindow('" + RCode + "');\">������ҵ</a></span>";
            //var button = "<span></span>";
            if (kqyx.resflag == "kqyx_RT003") {
                yifa_pic = "";//�ҵ�Ԥϰ������ʾ"�ѷ�"��ť
                button = "<span><a href=\"javascript:_commonDiv.openTaskWindow('" + RCode + "')\">������ҵ</a><A style='BACKGROUND: #ccc; cursor: not-allowed;'>����</A></span>";
                if (useFlag != null && useFlag == 2) {
                    button = "<span><a href=\"javascript:_commonDiv.openTaskWindow('" + RCode + "')\">������ҵ</a><a href=\"javascript:kqyx.view('" + RCode + "','" + convertHtml(RTitle) + "',2)\">����</a></span>";
                }
            }

            //�ж��Ƿ�Ϊƽ�����
            if (getIsSchoolbag()) {
                if (getIsHavingClass() == 1) {
                    button = button + "<span><a href=\"javascript:kqyx.sendToPad('" + RCode + "','" + convertHtml(RTitle) + "')\";>����̽��</a></span>";
                } else {
                    button = button + "<span><a style='BACKGROUND: #ccc;cursor: not-allowed;';>����̽��</a></span>";
                }
            }

            temphtml.push("<li>" + button + "" + imagepic + "<a move=\"right\" href=\"javascript:kqyx.view('" + RCode + "','" + convertHtml(RTitle) + "',1);\"  title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + RTitle + "</p>" + yifa_pic + "</a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).append(temphtml.join(""));
    temphtml = null;

    //������Դ���ƿ��
    $(".zy-tm").css("max-width", $(".zy-tm").width() - 75);
    $(".zy-tm").css("width", "auto");

    ////
    kqyx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, kqyx.pagesize, "#pageRightNav");
}
//ԤϰԤ��
KQYX.prototype.view = function (RCode, RTitle, buttonType) {
    //buttonType 1.Ԥ�� 2.���� 3.��������鿴����
    kqyx.rcode = RCode;
    kqyx.buttonType = buttonType;
    kqyx.backCache = $(_pMain.getMainRight()).html();
    kqyx.pageCache = $("#pageRightNav").html();

    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_common.cutStr(RTitle,_pMain.newpagefontsize-2)+"<span class=\"bgImg\"></span></div>");

    var data = "id=" + RCode + "&username=" + teachernumber;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/editCourseJob.do", data, "gbk", kqyx.parseViewResList);

}
//������Դ�б�
KQYX.prototype.parseViewResList = function (rdata) {
    kqyx.kqyxObjList.length = 0;
    var temphtml = new Array();
    var cssHtml = "overflow-y: auto;height: " + (_pMain.height - 50);
    temphtml.push("<ul class='yuxiDescList' style='" + cssHtml + "' >");
    if (rdata.cj && rdata.cj.subJobList && rdata.cj.subJobList.length > 0) {
        for (var i = 0; i < rdata.cj.subJobList.length; i++) {
            //����
            var temp = rdata.cj.subJobList[i];
            var subjobid = temp.id;
            var subjobname = temp.name;
            subjobname = '����' + (i + 1);
            var subjobdesc = temp.desc;
            if (temp.yjtContent && temp.yjtContent.content) {
                if (temp.yjtContent.content != "undefined") {
                    subjobdesc = temp.yjtContent.content;
                }
            }
            if (_common.isBlank(subjobdesc) || subjobdesc == 'undefined') {
                subjobdesc = "��������";
            }

            var subJobResList = temp.subJobResList;
            //��������
            var subJobResListHtml = new Array();
            //Ĭ����ʾԤϰ������ť
            var button = "<span class='task-btu'><A href=\"javascript:kqyx.yuxifankui('" + subjobid + "')\">Ԥϰ����</A></span>";

            for (var j = 0; subJobResList != null && j < subJobResList.length; j++) {
                var item = subJobResList[j];
                var destCode = item.destCode;
                var destType = item.destType;
                var destTitle = item.destTitle;
                var RFormatMark = item.formatMark;

                if (_common.isBlank(subjobdesc) || subjobdesc == 'undefined') {
                    continue;
                }

                //����iconType����RFormatMark
                /*if(iconType!=null)
                {
                    RFormatMark = iconType.substring(iconType.lastIndexOf("/")+1,iconType.lastIndexOf("."));
                }*/
                var imagepic = "<img class='yuxiDescListImg' width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
                if (RFormatMark != "null" && RFormatMark != "") {
                    imagepic = "<img class='yuxiDescListImg' width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
                }

                var playjs = "kqyx.playRes('" + destCode + "','" + destType + "','" + RFormatMark + "','" + convertHtml(destTitle) + "')";
                //destType//1,��Դ��2�Ծ�;3���ļ���;4��body��5��΢��;6�����Ծ�
                if (destType == 2 || destType == 6) {
                    //��ʾ��ⷴ����ť
                    button = "<span class='task-btu'><A style='background-color: #ff6600;' href=\"javascript:kqyx.jiancefankui('" + subjobid + "')\">��ⷴ��</A></span>";
                    //ͼ��Ϊѵ��ͼ��
                    imagepic = "<img class='yuxiDescListImg' width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/xunlian.png\"  />";
                } //destType//1,��Դ��2�Ծ�;3���ļ���;4��body��5��΢��;6�����Ծ�
                if (destType == 5) {
                    //ͼ��Ϊѵ��ͼ��
                    RFormatMark = "mp4";
                    imagepic = "<img class='yuxiDescListImg' width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/mp4.png\"  />";
                }
                if (destType == 1) {
                    //���ӽ̲�
                    if ("RT106" == item.typeCode && "xml" == item.formatMark) {
                        playjs = "player.getDZJC('" + destCode + "')";
                    }
                    if ("RT105" == item.typeCode) {
                        //�ж��Ƿ�Ϊ���ӽ̲�����
                        playjs = "player.checkDZJCplay('" + destCode + "','" + RFormatMark + "')";
                    }
                }

                subJobResListHtml.push("<li>" + imagepic + "<a move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + destTitle + "\"><p class=\"zy-tm\">" + destTitle + "</p>" + "</a></li>");
                //

                kqyx.kqyxObjList.push(new kqyxObjList(destCode, convertHtml(destTitle), destType, RFormatMark, subjobid, subjobname, subjobdesc));
            }
            //buttonType 1.Ԥ�� 2.���� 3.��������鿴����
            if (kqyx.buttonType == 1) {
                button = "";
            }
            temphtml.push("<li>" + button + "<div style='verflow-x: hidden; text-overflow: ellipsis;'><div><strong>" + subjobname + ":</strong>" + subjobdesc + "</div></div></li>");
            temphtml.push(subJobResListHtml.join(""));
        }

    } else {
        if (kqyx.buttonType == 2) {
            $(_pMain.getMainRight()).html(kqyx.backCache);
            return;
        } else {
            temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
        }

    }

    //var previous = transferProtocol_web+_config["PLS"]+"/newteach/images/previous.png";
    //$(_pMain.getMainRight()).append(temphtml.join(""));
    $(_pMain.getMainRight()).html(temphtml.join(""));
    var fanhui = "$(_pMain.getMainRight()).html(kqyx.backCache);$('#pageRightNav').html(kqyx.pageCache);";
    if (kqyx.buttonType == 3) {
        fanhui = "$('#kqyx_RT003').click();"
    }
    $("#pageRightNav").html('<DIV class=pageNext><A id="prove" title="������һ��" onclick="' + fanhui + '" ></A></DIV><DIV class=pageNow></DIV><a href=javascript:_commonDiv.openTaskWindow("' + kqyx.rcode + '"); class="send" ><span >������ҵ</span></a>');

    kqyx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".yuxiDescList li", 1, kqyx.pagesize, "#pageRightNav .pageNow");

    //ѧ�������б�
    //buttonType 1.Ԥ�� 2.���� 3.��������鿴����
    if (kqyx.buttonType == 2 || kqyx.buttonType == 3) {
        var data = "jobid=" + kqyx.rcode;
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getCourseJobQuestionList.do", data, "gbk", kqyx.parseQuestionList);
    }

}
KQYX.prototype.parseQuestionList = function (rdata) {
    //alert(rdata.questionList);
    //return;
    var temphtml = new Array();//����Ϊѧ��Ԥϰ���������������

    temphtml.push("<li id='onlyone'><span style='float:left;'><strong>ѧ�����ʣ�</strong><i>����Ϊѧ��Ԥϰ���������������</i></span></li>");

    if (rdata && rdata.questionList && rdata.questionList.length > 0) {
        for (var i = 0; i < rdata.questionList.length; i++) {
            var temp = rdata.questionList[i];
            var id = temp.id;
            var Rtitle = temp.question;
            var stuname = temp.stuname;
            Rtitle = Rtitle;
            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/preteach/public/images/teacher/ask.png\"  />";

            temphtml.push("<li>" + imagepic + "<a onclick=kqyx.showStudentQuestion('" + stuname + "','" + convertHtml(Rtitle) + "') title=\"" + Rtitle + "\"><p>" + stuname + "��<i>" + Rtitle + "</i></p>" + "</a></li>");

        }
    }
    if ($(".yuxiDescList li#onlyone").length == 0) {
        $(".yuxiDescList").append(temphtml.join(""));
    }
    _common.splitpage(".yuxiDescList li", 1, kqyx.pagesize, "#pageRightNav .pageNow");


}
KQYX.prototype.showStudentQuestion = function (stuname, Rtitle) {
    $("#lxzyPanelTitle").html(stuname);
    $("#lxzyContent").html(Rtitle);
    $("#lxzyPage").html("");
    $("#lxzyContent").css("text-align", "left");

    $("#lxzyView").show();

}
KQYX.prototype.playRes = function (destCode, destType, RFormatMark, destTitle, buttonType) {
    var matchintype = getDeviceType();

    //getfplatform_subtype()
    var stypeparm = "";
    if ("2" == matchintype) {
        stypeparm = "NUMBERANSWERDEVICE";
    } else if ("3" == matchintype) {
        stypeparm = "PAD";//pv ����
    }
    //buttonType������ 0.Ԥ�� 1 ��ⷴ��ѵ������
    if (buttonType && buttonType == 1) {
        //ϵͳ��������Ծ�����ӿ�
        //playjs �ҵ�ѵ����ҵԤ��/���� �ӿ�
        data = "?rcode=" + destCode + "&rsType=" + destType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
        var playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
        playjs = playjs + "&viewFeedback=1&fplatform_subtype=" + stypeparm;
        playjs = "javascript:_common.openResPage('" + screen.width + "','" + screen.height + "','" + playjs + "')";
        eval(playjs);
        return;
    }

    var playjs = "";
    //destType//1,��Դ��2�Ծ�;3���ļ���;4��body��5��΢��;6�����Ծ� 7��amr��Ƶ
    if (destType == 1) {
        playjs = "javascript:player.playResource('" + destCode + "','2','" + RFormatMark + "')";
    } else if (destType == 3) {
        playjs = "javascript:player.getTeacherFolderFile('" + destCode + "','" + RFormatMark + "')";
    } else if (destType == 4) {
        playjs = "alert('�ݲ�֧��body���ͣ�')";
    } else if (destType == 5) {
        //΢��
        wkzy.wkplay(destCode, destTitle);
    } else if (destType == 2 || destType == 6) {
        //�Ծ�(ѵ��������
        //zjxl.view(destCode,destTitle);
        data = "?rcode=" + destCode + "&rsType=" + destType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
        var playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
        zjxl.zuoda(playjs);
    }
    if (destType == 7) {
        //��Ƶ
        playjs = "javascript:_common.openByIE('" + destCode + "')";
    }
    eval(playjs);
}
KQYX.prototype.yuxifankui = function (subjobid) {
    //Ԥϰ����
    document.getElementById("maskAll").style.display = 'block';
    var temphtml = new Array();
    var fankui = new Array();
    $("#lxzyContent").html("");
    $("#lxzyPage").html("");
    $("#lxzyPanelTitle").html("Ԥϰ����");
    temphtml.push("<UL class=lxzyList style='min-height:150px;'>");
    for (var j = 0; j < kqyx.kqyxObjList.length; j++) {
        if (kqyx.kqyxObjList[j].subjobid == subjobid) {
            /* $("#lxzyPanelTitle").html(kqyx.kqyxObjList[j].subjobname);
             if(temphtml.length==1)
             {
                 temphtml.push("<h3 style='text-align: left'>" + kqyx.kqyxObjList[j].subjobdesc + "</h3>");
             }*/

            var RFormatMark = kqyx.kqyxObjList[j].RFormatMark;
            var link = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png";
            if (RFormatMark != "null" && RFormatMark != "") {
                link = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png";
            }
            imagepic = "<img src='" + link + "' />";
            //�ݲ���ʾͼƬw
            //temphtml.push("<li title='"+kqyx.kqyxObjList[j].name+"' onclick=\"kqyx.playRes('"+kqyx.kqyxObjList[j].rcode+"','"+kqyx.kqyxObjList[j].destType+"','"+RFormatMark+"','"+kqyx.kqyxObjList[j].name+"')\"><a ><p id="+kqyx.kqyxObjList[j].rcode+">"+imagepic+"</p></a>"+kqyx.kqyxObjList[j].name+"</li>");
        }
    }

    var data = "jobid=" + kqyx.rcode + "&username=" + teachernumber + "&classid=" + userclass + "&subjobid=" + subjobid;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getCourseJobStuFk.do", data, "gbk", function (rdata) {
        if (rdata && rdata.items && rdata.items.length > 0) {
            fankui.push('<UL id=studentSet class=classSet style="min-height:150px;display:block;padding-left: 40px;">');
            for (var i = 0; i < rdata.items.length; i++) {
                //�ڿ���Դ����������һ��
                var temp = rdata.items[i];
                var id = temp.id;
                var stuid = temp.stuid;
                var stuname = temp.stuname;
                var finishflag = temp.finishflag;
                if (stuname.length > 4) {
                    stuname = stuname.substring(0, 4) + "...";
                }
                if (finishflag == 1) {
                    fankui.push("<li style='width:11%;  float:left; display:inline;'> <a style='width:100%;' id='" + stuid + "' href='#' onclick=kqyx.personInfo(\'" + stuid + "\',\'" + stuname + "\',\'" + subjobid + "\') style='background-color:#5cc767; color:#fff;'>" + stuname + "</a> </li>")
                } else {
                    fankui.push("<li style='width:11%;  float:left; display:inline;'> <a style='width:100%;' id='" + stuid + "' style='background-color:#a7acc7; color:#fff;'>" + stuname + "</a> </li>")
                }

            }

        }
        fankui.push('</UL>');
        temphtml.push("</UL>");
        $("#lxzyContent").append(fankui.join(""));
        //�ײ��رհ�ť
        //$("#lxzyPage").append('<DIV class=pageNext><A style="float: none;" onclick="kqyx.fankuiClose(\'lxzyView\');">�� ��</A>');

        $("#lxzyView").show();
    });

}
KQYX.prototype.fankuiClose = function (id) {

    if (id == 'lxzyView') {
        document.getElementById("lxzyView").style.display = 'none';
        document.getElementById('maskAll').style.display = 'none';
    } else if (id == 'lxzyInfo') {
        document.getElementById('lxzyInfo').style.display = 'none';
        document.getElementById('lxzyView').style.display = 'block'
    }

}
KQYX.prototype.jiancefankui = function (subjobid) {
    //��ⷴ��
    document.getElementById("maskAll").style.display = 'block';
    var temphtml = new Array();
    var shijuanList = new Array();

    $("#lxzyContent").html("");
    temphtml.push("<UL class=lxzyList  style='min-height:150px;'>");
    $("#lxzyPanelTitle").html("��ⷴ��");
    temphtml.push("<h3>��ѡ��Ҫ�鿴�ļ��</h3>");
    for (var j = 0; j < kqyx.kqyxObjList.length; j++) {
        if (kqyx.kqyxObjList[j].subjobid == subjobid) {
            if (kqyx.kqyxObjList[j].destType == 2 || kqyx.kqyxObjList[j].destType == 6) {
                //$("#lxzyPanelTitle").html(kqyx.kqyxObjList[j].subjobname);
                //�Ծ�
                shijuanList.push(kqyx.kqyxObjList[j]);
                var RFormatMark = kqyx.kqyxObjList[j].RFormatMark;
                var link = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/xunlian.png";
                imagepic = "<img src='" + link + "' />"
                temphtml.push("<li title='" + kqyx.kqyxObjList[j].name + "' onclick=\"kqyx.playRes('" + kqyx.kqyxObjList[j].rcode + "','" + kqyx.kqyxObjList[j].destType + "','" + RFormatMark + "','" + kqyx.kqyxObjList[j].name + "',1)\"><a><p id=" + kqyx.kqyxObjList[j].rcode + ">" + imagepic + "</p></a>" + kqyx.kqyxObjList[j].name + "</li>");
            }
        }
    }
    temphtml.push("</UL>");

    if (shijuanList.length == 1) {
        //ֱ�Ӵ���Ӧ�Ծ�
        document.getElementById("maskAll").style.display = 'none';
        eval("kqyx.playRes('" + shijuanList[0].rcode + "','" + shijuanList[0].destType + "','" + shijuanList[0].RFormatMark + "','" + shijuanList[0].name + "',1)");
    } else {
        //��ⷴ���Ծ�ѡ�����
        $("#lxzyContent").html(temphtml.join(""));
        $("#lxzyView").show();
        //$("#lxzyPage").html('<DIV class=pageNext><A style="MARGIN-TOP: 4px;float: none;" onclick="kqyx.fankuiClose(\'lxzyView\');">�� ��</A>');
        $("#studentSet").hide();
    }

}
KQYX.prototype.personInfo = function (stuid, stuname, subjobid) {
    if (stuname != "") {
        $("#lxzyInfoTitle").html(stuname);
    }
    $("#lxzyInfoContent").html("");
    var temphtml = new Array();

    var data = "jobid=" + kqyx.rcode + "&username=" + stuid + "&classid=" + userclass + "&subjobid=" + subjobid;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/getCourseSubJobFk.do", data, "GBK", function (rdata) {
        var content = "";
        if (rdata.message && rdata.message.length > 0) {
            content = rdata.message[0].message;
        }
        var url = rdata.att;
        //content
        if (content == "" && url.length == 0) {
            temphtml.push("<h3 style='text-align: left;border-bottom:0px'>��ѧ��û���ύ���Ժ͸���</h3>");
        } else {
            temphtml.push("<h3 style='text-align: left'>" + content + "</h3>");
        }

        //url
        temphtml.push("<UL class=lxzyList  style='min-height:100px;'>");
        for (var i = 0; url && i < url.length; i++) {
            var RFormatMark = url[i].formatMark;
            var destTitle = url[i].destTitle;
            var destCode = url[i].destCode;
            var destType = url[i].destType;
            var destDesc = url[i].destDesc;

            var link = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png";
            if (typeof RFormatMark != "undefined" && RFormatMark != "null" && RFormatMark != "") {
                link = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png";
            } else {
                RFormatMark = "blank";
            }
            imagepic = "<img src='" + link + "' />"
            var playjs = "";
            if (RFormatMark.toUpperCase() == "AMR") {
                temphtml.push("<li title='" + destTitle + "' onclick=\"kqyx.playRes('" + destDesc + "','" + destType + "')\" ><a ><p id=" + destCode + ">" + imagepic + "</p></a>" + destTitle + "</li>");
            } else {
                temphtml.push("<li title='" + destTitle + "' onclick=\"kqyx.playRes('" + destCode + "','" + destType + "','" + RFormatMark + "','" + destTitle + "')\" ><a ><p id=" + destCode + ">" + imagepic + "</p></a>" + destTitle + "</li>");
            }

        }

        temphtml.push("</UL>");
        $("#lxzyInfoContent").html(temphtml.join(""));
        //$("#lxzyInfoPage").html('<DIV class=pageNext><A style="MARGIN-TOP: 4px;float: none;" onclick="kqyx.fankuiClose(\'lxzyInfo\');">�� ��</A>');

    });

    $("#lxzyInfo").show();
    $("#lxzyView").hide();

}


//Ԥϰ����
KQYX.prototype.sendRecommend = function (rcode, RTitle) {
    kqyx.sendByGroup(rcode);
    return;
    //�ж�Ԥϰ���Ƿ����������������
    var data = "id=" + rcode + "&username=" + teachernumber;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/editCourseJob.do", data, "gbk", function (rdata) {
        if (rdata.cj && rdata.cj.subJobList && rdata.cj.subJobList.length > 0) {
            var limitGrade = null;
            _commonDiv.openWindow(1, "�Ƽ���Դ", "��ѡ��༶��", function (selclassArray) {
                var classIds = new Array();
                var classNames = new Array();
                for (var i = 0; i < selclassArray.length; i++) {
                    classIds.push(selclassArray[i].classId);
                    classNames.push(selclassArray[i].className);
                }
                var tdata = "username=" + teachernumber + "&id=" + rcode + "&truename=" + encodeURIComponent(encodeURIComponent(teachername));
                tdata += "&classIds=" + classIds.join(",");
                tdata += "&classNames=" + encodeURIComponent(encodeURIComponent(classNames.join(",")));
                ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/sendPreparation.do", tdata, "GBK", function (rdata) {
                    if (rdata.flag == 1) {
                        _commonDiv.tip("���ͳɹ���");
                        //���͵�ѧ��/��ǰԤϰ+U��
                        _common.addUb("u_daoxuean", "�ڿζ˷��͵�ѧ��", rcode);
                        _commonDiv.closeWindow(1000);
                        kqyx.clickQuickTeach(kqyx.resflag, kqyx.systype);//ˢ��
                    } else {
                        // 2 "�ܱ�Ǹ�������췢��Ԥϰ�����������꣡"
                        // 3 "���Ѿ����͹���Ԥϰ��"
                        // 4 "������Ϣʧ��"
                        // 5 "�����Ծ���Ϣʧ��"
                        if (rdata.msg && rdata.msg.length > 0) {
                            _commonDiv.tip(rdata.msg);
                        } else {
                            _commonDiv.tip("����ʧ�ܣ�");
                        }
                        _commonDiv.closeWindow(1000);
                    }
                });
            }, true, null, null);
        } else {
            alert("���������ݣ���ѡ������Ԥϰ��ҵ����");
        }
    });
}
KQYX.prototype.sendByGroup = function () {
    var rcode = $('#taskrcode').val();
    //��ȡcheckboxѡ�е������б�
    var arrJob = []; //����һ������
    if ($('input[name="joblist"]:checked').length == 0) {
        document.getElementById('tasktip').className = "tipsInfo";
        document.getElementById('tasktip').innerHTML = '����ѡ��һ������';
        return false;
    }
    $('input[name="joblist"]:checked').each(function () {
        if ($(this).val() != '') {
            var obj = {};
            obj.code = $(this).val();
            arrJob.push(obj);//��ѡ�е������������
        }
    });
    var jobIds = JSON.stringify(arrJob);
    var obj = eval('(' + _commonDiv.loginInfo + ')');
    var loginInfo = '{teachernumber:"' + teachernumber + '",teachername:"' + teachername + '",classId:"' + _commonDiv.loginInfo.classId + '",userClassName:"' + decodeURIComponent(decodeURIComponent(_commonDiv.loginInfo.userClassName));
    loginInfo += '",ssout:"' + _commonDiv.loginInfo.ssout + '"}';
    //�ȹر�ѡ���������
    _commonDiv.closeTaskWindow();
    //����
    var url = '/newteach/pad/sendByGroup.jsp?rcode=' + rcode + '&data=' + encodeURIComponent(_commonDiv.loginInfo) + '&jobIds=' + encodeURIComponent(jobIds);
    art.dialog.open(url, {
        esc: false,
        lock: true,
        title: false,
        cancel: false,
        width: '900px',
        height: '600px',
        id: 'sendByGroup',
        close: function () {
            if (art.dialog.data("result") == 1) {
                _common.addUb("u_daoxuean", "�ڿζ˷��͵�ѧ��", rcode);
                kqyx.clickQuickTeach(kqyx.resflag, kqyx.systype);//ˢ��
            }
            //alert("close:"+art.dialog.data("returnValue"));
        }


    });
}
//����̽��
KQYX.prototype.sendToPad = function (rcode, RTitle) {

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

    }

    _common.addTjPv("kqyx", teachernumber, userclass, _common.channelid);//pvͳ��
    var tdata = "username=" + teachernumber + "&id=" + rcode + "&truename=" + encodeURIComponent(encodeURIComponent(teachername));
    tdata += "&classIds=" + userclass + "&sendPadFlag=1";
    tdata += "&classNames=" + encodeURIComponent(encodeURIComponent($("#className").html()));

    $.ajax({
        url: transferProtocol_web + _config["PLS"] + "/interface/sendPreparation.do",
        data: {
            username: teachernumber,
            truename: encodeURIComponent(encodeURIComponent(teachername)),
            classIds: userclass,
            classNames: encodeURIComponent(encodeURIComponent($("#className").html())),
            id: rcode,
            sendPadFlag: 1
        },
        type: "post",
        async: true,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: 'GBK',
        success: function (rdata) {
            if (rdata.flag == 1 || rdata.flag == 3) {
                //_commonDiv.tip("���ͳɹ���");
                //���͵�ѧ��/��ǰԤϰ+U��
                _common.addUb("u_daoxuean", "�ڿζ˷��͵�ѧ��", rcode);
                // _commonDiv.closeWindow(1000);
                //kqyx.clickQuickTeach(kqyx.resflag,kqyx.systype);//ˢ��

                //ƽ����� ����̽��
                var paper_id = "";//20170301173616524536218823834
                if (rdata && rdata.id) {
                    paper_id = rdata.id;
                }
                kqyx.openZuodaResult(paper_id, convertHtml(RTitle));
            } else {
                // 2 "�ܱ�Ǹ�������췢��Ԥϰ�����������꣡"
                // 3 "���Ѿ����͹���Ԥϰ��"
                // 4 "������Ϣʧ��"
                // 5 "�����Ծ���Ϣʧ��"
                if (rdata.msg && rdata.msg.length > 0) {
                    alert(rdata.msg);
                } else {
                    alert("����ʧ�ܣ�");
                }
                //_commonDiv.closeWindow(1000);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            if (console && console.log) {
                console.log("errorUrl:" + url + "error: textStatus:" + textStatus);
                for (name in errorThrown) {
                    console.log("Error-" + name + ":" + errorThrown[name]);
                }
            }
            //�첽��������޷�����쳣
            //alert('����ʱ��');
        }
    });

    /**
     ajaxJson(transferProtocol_web+_config["PLS"]+"/interface/sendPreparation.do",tdata,"GBK",function(rdata){
        if(rdata.flag==1||rdata.flag==3)
        {
            //_commonDiv.tip("���ͳɹ���");
            //���͵�ѧ��/��ǰԤϰ+U��
            _common.addUb("u_daoxuean","�ڿζ˷��͵�ѧ��",rcode);
           // _commonDiv.closeWindow(1000);
            //kqyx.clickQuickTeach(kqyx.resflag,kqyx.systype);//ˢ��

            //ƽ����� ����̽��
            var paper_id =  "";//20170301173616524536218823834
            if(rdata&&rdata.id)
            {
                paper_id =  rdata.id;
            }
            kqyx.openZuodaResult(paper_id,convertHtml(RTitle));
        }
        else
        {
            // 2 "�ܱ�Ǹ�������췢��Ԥϰ�����������꣡"
            // 3 "���Ѿ����͹���Ԥϰ��"
            // 4 "������Ϣʧ��"
            // 5 "�����Ծ���Ϣʧ��"
            if(rdata.msg&&rdata.msg.length>0)
            {
                alert(rdata.msg);
            }
            else
            {
                alert("����ʧ�ܣ�");
            }
            //_commonDiv.closeWindow(1000);
        }
    });
     */
}
KQYX.prototype.openZuodaResult = function (paper_id, RTitle) {

    //�޸������ļ�ƽ������ʹ��
    setIsUsingPad(17);

    var downloadurl = transferProtocol_web + _config["PLS"] + "/interface/downloadZipFile.do?id=" + paper_id + "&ut=" + sso_ut;

    var loginInfo = "teachernumber:\"" + teachernumber + "\",schoolId:\"" + schoolId + "\",classId:\"" + userclass + "\"";
    loginInfo += ",paper_id:\"" + paper_id + "\",downloadurl:\"" + encodeURIComponent(encodeURIComponent(downloadurl)) + "\"";

    var url = transferProtocol_web + _config["PLS"] + "/newteach/pad/pad.jsp?type=yuxizuoda&data={" + loginInfo + "}";
    _common.openResPage(1000, 720, url, 2);

    setTimeout("kqyx.openZuodaFankui('" + paper_id + "','" + RTitle + "')", 500);
}

KQYX.prototype.openZuodaFankui = function (paper_id, RTitle) {
    //�޸Ĳ˵�ѡ��Ч��
    //$(".testList").remove();

    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#kqyx_RT003").addClass("cur");

    kqyx.view(paper_id, RTitle, 3)
}

//��Դ����
function kqyxObjList(rcode, name, destType, RFormatMark, subjobid, subjobname, subjobdesc) {
    this.rcode = rcode;
    this.name = name;
    this.destType = destType;
    this.RFormatMark = RFormatMark;
    this.subjobid = subjobid;
    this.subjobname = subjobname;
    this.subjobdesc = subjobdesc;
}