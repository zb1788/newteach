var ypzy = new YPZY();

//ͬ���ڿ�ģ�����
function YPZY() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.threeMenu = null;        //�����˵�
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.allList = []; //ȫ����Դ
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ
    this.typeList = [
        {id: "ypzy_RT001", name: "������Դ", data: []},
        /* {id:"RT001",name:"�̰�",data:[]},*/
        {id: "kqyx_RT003", name: "Ԥϰ", data: []},
        {id: "ktjx_RT002", name: "�μ�", data: []},
        {id: "ktjx_RT003", name: "�ز�", data: []},
        {id: "zjxl_RT003", name: "ѵ��", data: []},
        {id: "zy_RT003", name: "������ҵ", data: []},
        {id: "zy_RT004", name: "������ҵ", data: []},
        {id: "tzts_RT002", name: "��չ", data: []},
        {id: "ypzy_RT009", name: "������Դ", data: []}
    ];
}

//������Ŀ,���������˵���
YPZY.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");

    //��ʾ�����˵�
    ypzy.showQuickTeachThredMenu();

}
//��ʾ�����˵���Ŀ
YPZY.prototype.showQuickTeachThredMenu = function () {
    var tMenuCode = new Array();
    for (var i = 0; i < this.typeList.length; i++) {
        var temp = this.typeList[i];
        tMenuCode.push("<a onclick='ypzy.clickQuickTeach(\"" + temp.id + "\");' id='" + temp.id + "' >" + temp.name + "</a>");
    }
    //$(".subMenu").html("");
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();

    $("#ypzy_RT009").click();
}
//�����˵������¼�
YPZY.prototype.clickQuickTeach = function (resflag) {
    if (resflag == "ypzy_RT009") {
        //������Դ
        $(_pMain.getMainRight()).html("");
        $(_pMain.getMainRight()).attr("class", "cloudCon");
    } else {
        $(_pMain.getMainRight()).html("");
        //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");
        $(_pMain.getMainRight()).attr("class", "rightCon");
    }

    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".resList").remove();
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");

    if (resflag == "ypzy_RT001") {
        //������Դ
        //�ҵĿμ�
        var data = "parentfcode=&pageindex=1&pagesize=100&kscode=" + _treeVersion.currentCourseId + "&teachernumber=" + teachernumber + "&noforder=2&place=4&resComeType=1,2,3,4&orderby=1";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", data, "gbk", ypzy.parseFileResList);
        return;
    } else if (resflag == "kqyx_RT003") {
        //�ҵ�Ԥϰ
        kqyx.clickQuickTeach("kqyx_RT003");
        return;
    } else if (resflag == "ktjx_RT002") {
        //�ҵĿμ�
        ypzy.getResList("ktjx_RT002", 1);
        return;
    } else if (resflag == "ktjx_RT003") {
        ///�ҵ��ز�
        ypzy.getResList("ktjx_RT003");
        return;
    } else if (resflag == "zjxl_RT003") {
        //ѵ��
        zjxl.clickQuickTeach("zjxl_RT003");
        return;
    } else if (resflag == "zy_RT003") {
        //������ҵ
        zy.clickQuickTeach("zy_RT003");
        return;
    } else if (resflag == "zy_RT004") {
        //������ҵ
        zy.clickQuickTeach("zy_RT004");
        return;
    } else if (resflag == "tzts_RT002") {
        //��չ
        tzts.clickQuickTeach("tzts_RT002");
        return;
    } else if (resflag == "ypzy_RT009") {
        //������Դ
        qtzy_show();
        return;
    } else {
        return;
    }
}

YPZY.prototype.getResList = function (resflag, resComeType) {
    //��ѧ�ز�
    if (resflag == "ktjx_RT001") {
        var data = "listType=1&page=1&pageNum=100&menuCode=" + _treeVersion.currentCourseId + "&username=" + teachernumber + "&typeCode=RT002,RT004&yun=1&resComeType=" + resComeType + "&orderby=6";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/queryPreResInfo.do", data, "gbk", ktjx.parseResList);
        return;
    } else if (resflag == "ktjx_RT002") {
        //�ҵĿμ�
        var data = "parentfcode=&pageindex=1&pagesize=100&kscode=" + _treeVersion.currentCourseId + "&teachernumber=" + teachernumber + "&noforder=2&place=4&resComeType=1";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", data, "gbk", ktjx.parseFileResList);
        return;
    } else if (resflag == "ktjx_RT003") {
        //�ҵ��ز�
        var data = "parentfcode=&pageindex=1&pagesize=100&kscode=" + _treeVersion.currentCourseId + "&teachernumber=" + teachernumber + "&noforder=2&place=4&resComeType=3";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", data, "gbk", ktjx.parseFileResList);
        return;
    } else {
        //��ʦ�μ����Ž̿μ����ο��μ�
        var data = "listType=1&menuCode=" + _treeVersion.currentCourseId + "&username=" + teachernumber + "&yun=1&commonTypeId=" + resflag + "&resComeType=" + resComeType + "&commonType=1" + "&pageNum=100" + "&orderby=6";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/queryPreResInfo.do", data, "gbk", ktjx.parseResList);
        return;
    }
}

//�����ʦ�ļ�����Դ�б�
YPZY.prototype.parseFileResList = function (rdata) {
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
                playjs = "javascript:player.checkDZJCplay('" + C1code + "','" + RFormatMark + "','" + convertHtml(RTitle) + "')";
            }
            //�̰�����չ������ʾ�Ƽ���ť
            var fileType = 1;
            if (temp.storetypenum == 0) {
                id = RCode;
                fileType = 2;
            } else {
                id = C1code;
                fileType = 1;
            }
            var button = "";
            if (temp.resType == 2 || temp.resType == 4) {
                button = "<span><a href=\"javascript:sendRecommend('" + resType + "','" + tuijianId + "')\">�Ƽ�</a></span>";
            }
            //�ж��Ƿ�Ϊƽ�����
            if (getIsSchoolbag()) {
                if (getIsHavingClass() == 1) {
                    button = button + "<span><a href=\"javascript:ypzy.sendToPad('" + id + "','" + fileType + "','" + RFormatMark + "')\">����̽��</a></span>";
                } else {
                    button = button + "<span><a style='BACKGROUND: #ccc;cursor: not-allowed;';>����̽��</a></span>";
                }
            }
            temphtml.push("<li>" + button + "<small>[" + temp.storetype + "]</small>" + imagepic + "<a title=\"" + temp.filename + "\" href=\"" + playjs + "\" id=\"" + temp.fcode + "\" ><p class=\"zy-tm\">" + temp.filename + "</p>" + "</a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    temphtml = null;
    tzts.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, tzts.pagesize, "#pageRightNav");
}
YPZY.prototype.sendToPad = function (rcode, fileType, RFormatMark) {
    //fileType 1 ��ͨ��Դ  2��ʦ�ļ���
    if (getIsHavingClass() == 0) {
        alert("����ƽ��ǩ����ʹ�ã�");
        return;
    }

    var downloadUrl = "";
    if (fileType == 2) {
        //�ϵ�
        //var data="ids="+rcode+"&areaCode="+areaCode+"&teachernumber="+teachernumber+stat_param;
        //downloadUrl=transferProtocol_web+_config["PLS"]+"/newteach/nplayfile.do?"+data;
        //�µ�
        downloadUrl = transferProtocol_web + _config["PLS"] + "/teacherfile/nplayfile.do?ids=" + rcode + "&outType=1";
    } else {
        //���ص�ַ
        downloadUrl = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
        downloadUrl += "rcode=" + rcode;
        downloadUrl += "&userName=" + teachernumber;
        downloadUrl += "&filterType=0";
        downloadUrl += "&outType=1";//1Ϊjson 2 xml
    }

    getLoadAddress(downloadUrl, function (list) {
        if (list == null) {
            alert("��ȡ�ļ����ص�ַʧ�ܣ�");
            return;
        } else if (typeof (list) == 'string') {
            alert(list);
            return;
        } else if (list.length >= 1) {
            var res = list[0];
            var path = res.path;
            var name = res.file_name;
            var format = RFormatMark;
            if (typeof res.format != "undefined") {
                format = res.format.toLowerCase();
            }

            //var unableFormat = ",exe,xml,file,ico,zip,ept,html,htm,ept,avi,ogg,flv,asf,";
            var ableFormat = ",html,doc,docx,ppt,pptx,txt,xls,xlsx,pdf,gif,jpg,jpeg,png,bmp,swf,mp3,mp4,";
            if (ableFormat.indexOf("," + format + ",") == -1) {
                alert("�ݲ�֧��" + format + "��ʽ���ļ���");
                return;
            } else {
                var url = transferProtocol_web + _config["PLS"] + "/newteach/pad/fileExplor.jsp?loadUrl=" + encodeURIComponent(downloadUrl) + "&fileType=" + fileType + "&fileCode=" + rcode + "&format=" + format + "&teachernumber=" + teachernumber + "&data=" + _commonDiv.loginInfo;
                _common.openResPage(800, 250, url);
            }
        } else {
            alert("��ȡ�ļ����ص�ַʧ�ܣ�");
            return;
        }

    }, fileType);


}

//������Դչʾ���
function qtzy_show() {

    $("#pageRightNav").html('<DIV class=pageNext><A id="prove" onclick="proveFolder();"></A></DIV><DIV class=pageNow></DIV>');
    $(_pMain.getMainRight()).append("<UL class=folderList ></UL>");
    ypzy_ptree = null;
    ypzy_ptree = Array();
    yp_other_sel = null;
    openFolder("0");
}

/*������Դ(��ʦ�ļ��� ԭteacherFload_data.js�߼�)*/
function openFolder(pfcode) {
    ypzy_ptree.push(pfcode);
    qtzy_parseRes(pfcode);
}

function proveFolder() {
    //�Ƴ���ǰĿ¼�㼶����
    ypzy_ptree[ypzy_ptree.length - 1] = null;
    ypzy_ptree.length = ypzy_ptree.length - 1;
    //�Ƴ���ǰĩβ�㼶���Ǹ���
    qtzy_parseRes(ypzy_ptree[ypzy_ptree.length - 1]);
}

function clickYp(fcode) {
    $(".folderList .sel").each(function () {
        $(this).removeClass("sel");
    });
    document.getElementById("p_" + fcode).className = "sel";
}

//������Դ
function qtzy_parseRes(pfcode) {
    var channelid = "";
    try {
        channelid = $(_naUtil.selectMenu).attr("menuid");
    } catch (e) {
    }
    var random_five = String(Math.random().toFixed(5)).substring(2);
    var date = new Date();
    var cookieid = date.getFullYear() + (date.getMonth() + 1) + date.getDate() + random_five;
    var stat_param = "";
    if ("0" == loginStyle) {
        stat_param = "&channelid=" + channelid + "&cookieid=" + cookieid;
    }
    var tdata = "teachernumber=" + teachernumber + "&place=0&pageindex=1&pagesize=100&noforder=2&parentfcode=" + pfcode + stat_param;//0������Դ��4�ڿ���Դ
    ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", tdata, "gbk", function (rdata) {
        //���ͳɹ���ʧ�ܣ�
        var temphtml = new Array();
        if (rdata.data && rdata.data.length > 0) {
            for (var i = 0; i < rdata.data.length; i++) {
                //�ڿ���Դ����������һ��
                var temp = rdata.data[i];
                var RCode = temp.fcode;
                var RTitle = temp.filename;
                var RFormatMark = temp.filetype;
                try {
                    RFormatMark = RFormatMark.toLowerCase();
                } catch (e) {
                }

                var playjs = "javascript:player.getTeacherFolderFile('" + RCode + "','" + RFormatMark + "')";

                if (temp.filetype == "file") {
                    playjs = "javascript:openFolder('" + RCode + "',2)";
                }
                var imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png";
                if (RFormatMark != "null" && RFormatMark != "") {
                    if (RFormatMark == "file") {
                        imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/folder.png";
                    } else {
                        imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png";
                    }
                }
                imagepic = "<img width='45' height='45' src=\"" + imagepic + "\"  />";

                temphtml.push("<li ondblclick=\"" + playjs + "\" onclick=\"clickYp('" + temp.fcode + "');\" title='" + temp.filename + "'><a href=\"javascript:void(0);\" id=\"" + temp.fcode + "\" ><p id=\"p_" + temp.fcode + "\">" + imagepic + "</p></a><font style='font-size:14px;'>" + temp.filename + "</font></li>");
            }
        } else {
            temphtml.push("<h3><center>" + _common.hasNoRes + "</center></h3>");
        }
        $(".folderList").html(temphtml.join(""));
        if (pfcode == "0") {
            $("#prove").hide();
        } else {
            $("#prove").show();
        }
        //$(".cloudCon").css("height",_pMain.height);
        //var pagesize= Math.floor((screen.width-120)/115) * Math.floor((screen.height-300)/145);
        var pagesize = Math.floor(($('#mainRight').width() - 120) / 115) * Math.floor(($('#mainRight').height() - 30) / 145);
        //���¼����ҳ
        _common.splitpage(".folderList li", 1, pagesize, "#pageRightNav .pageNow");
    });
}
