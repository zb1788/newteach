var tzts = new TZTS();

//ͬ���ڿ�ģ�����
function TZTS() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.threeMenu = null;        //�����˵�
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.allList = []; //ȫ����Դ
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ
    this.typeList = [{id: "tzts_RT001", name: "�Ž���Դ", yunMenuType: "0"},
        {id: "tzts_RT002", name: "�ҵ���Դ", yunMenuType: "1"}
    ];
}

//������Ŀ,���������˵���
TZTS.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + _treeVersion.currentCourseName + "<span class=\"bgImg\"></span></div>");

    //��ʾ�����˵�
    tzts.showQuickTeachThredMenu();

}
//��ʾ�����˵���Ŀ
TZTS.prototype.showQuickTeachThredMenu = function () {
    var tMenuCode = new Array();
    for (var i = 0; i < this.typeList.length; i++) {
        var temp = this.typeList[i];
        //
        var yunMenuType = "";
        if (temp.yunMenuType == "1") {
            yunMenuType = "yunMenuType";
        }
        if (typeof subMenuYouJiaoKey != "undefined") {
            temp.name = temp.name.replace("�Ž�", subMenuYouJiaoKey);
        }
        tMenuCode.push("<a href='#' id='" + temp.id + "' class='" + yunMenuType + "'  onclick='tzts.clickQuickTeach(\"" + temp.id + "\");' >" + temp.name + "</a>");
    }

    $(".subMenu").html("");
    $(".subMenu").append(tMenuCode.join(""));
    $(".subMenu").show();
    $("#tzts_RT001").click();
}
//�����˵������¼�
TZTS.prototype.clickQuickTeach = function (resflag) {
    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".resList").remove();
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");
    //�Ž���Դ
    if (resflag == "tzts_RT001") {
        var data = "listType=1&menuCode=" + _treeVersion.currentCourseId + "&username=" + teachernumber + "&typeCode=RT105&yun=1&resComeType=4" + "&pageNum=100" + "&orderby=6";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/queryPreResInfo.do", data, "gbk", tzts.parseResList);
        return;
    } else if (resflag == "tzts_RT002") {
        //�ҵ���Դ
        var data = "parentfcode=&pageindex=1&pagesize=100&kscode=" + _treeVersion.currentCourseId + "&teachernumber=" + teachernumber + "&noforder=2&place=4&resComeType=4";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", data, "gbk", tzts.parseFileResList);
        return;
    } else {
        return;
    }
}
//������Դ�б�
TZTS.prototype.parseResList = function (rdata) {
    //���ͳɹ���ʧ�ܣ�
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");

    if (rdata && rdata.ResInfo && rdata.ResInfo.length > 0) {
        for (var i = 0; i < rdata.ResInfo.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.ResInfo[i];
            var RTitle = temp.RTitle;
            var desc = temp.RDesc;

            var RFormatMark = temp.RFormatMark;
            var RCode = temp.RCode;
            var ext6 = temp.ext6;
            var yunFile = temp.yunFile;
            //��Ʒ��ԴͼƬ
            var jing = "";
            if (ext6 == "ZYHOT") {
                jing = "<i class='red'>(��)</i>";
            }
            //����ͼ��
            var yong_pic = "";
            if (yunFile == "1") {
                yong_pic = "<img width='58' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
            }
            /*var RCode=temp.id;
             var C1code=temp.c1;
             var RTitle=temp.filename;
             var RFormatMark=temp.filetype;
             var RType=temp.storetypenum;//����洢��0������Դ���ӣ�1�����ļ�����(2),���屸�����ӣ�3��*/
            //�ϴ���Դfcode
            //���� c1=rcode
            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
            if (RFormatMark != "null" && RFormatMark != "") {
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
            }
            var playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";
            //���ӽ̲�
            if ("RT106" == temp.RTypecode && "xml" == RFormatMark) {
                playjs = "player.getDZJC('" + RCode + "')";
            }
            if (temp.format == "F800") {
                //�ж��Ƿ�Ϊ���ӽ̲�����
                playjs = "player.checkDZJCplay('" + RCode + "','" + RFormatMark + "')";
            }
            temphtml.push("<li><span><a href=\"javascript:sendRecommend(1,'" + RCode + "')\">�Ƽ�</a></span>" + imagepic + "<a move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + jing + RTitle + "</p>" + yong_pic + "</a></li>");
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
    tzts.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, tzts.pagesize, "#pageRightNav");
}
//�����ʦ�ļ�����Դ�б�
TZTS.prototype.parseFileResList = function (rdata) {
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");

    if (rdata && rdata.data && rdata.data.length > 0) {
        for (var i = 0; i < rdata.data.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.data[i];
            var RCode = temp.fcode;
            var C1code = temp.c1;
            var RTitle = temp.filename;
            var RFormatMark = temp.filetype;
            var RType = temp.storetypenum;//����洢��0������Դ���ӣ�1�����ļ�����(2),���屸�����ӣ�3��
            //�ϴ���Դfcode
            //���� c1=rcode
            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }
            var playjs = "javascript:player.playResource('" + C1code + "','2','" + RFormatMark + "')";
            var resType = 1;
            var tuijianId = C1code;
            if (temp.storetypenum == 0) {
                //storetypenum 0�ϴ� 1ͬ��
                resType = 2;//�ϴ� 2
                tuijianId = RCode;
                playjs = "javascript:player.getTeacherFolderFile('" + RCode + "','" + RFormatMark + "')";
            }
            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
            if (RFormatMark != "null" && RFormatMark != "") {
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
            }
            if (temp.storetypenum == 1 && "xml" == RFormatMark) {
                playjs = "javascript:player.checkDZJCplay('" + C1code + "','" + RFormatMark + "')";
            }
            if (temp.format == "F800") {
                //�ж��Ƿ�Ϊ���ӽ̲�����
                playjs = "javascript:player.checkDZJCplay('" + RCode + "','" + RFormatMark + "')";
            }

            temphtml.push("<li><span><a href=\"javascript:sendRecommend('" + resType + "','" + tuijianId + "')\">�Ƽ�</a></span><small>[" + temp.storetype + "]</small>" + imagepic + "<a title=\"" + temp.filename + "\" href=\"" + playjs + "\" id=\"" + temp.fcode + "\" ><p class=\"zy-tm\">" + temp.filename + "</p>" + "</a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).append(temphtml.join(""));
    temphtml = null;
    tzts.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, tzts.pagesize, "#pageRightNav");
}