var mswk = new MSWK();

//΢��ģ�����
function MSWK() {
    this.userCourseList = new Array();
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.threeMenu = null;        //�����˵�
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.subjectCode = null;//��ǰ��Ŀ
    this.gradeCode = null;//��ǰ�꼶
    this.subjectName = null;//��ǰ��Ŀ����
    this.gradeName = null;//��ǰ�꼶����
    this.gradeArr = null;
    this.subjectArr = null;
}

MSWK.prototype.createLeftHtml = function () {
    //�����ڿ���ർ����
    var courseDiv = "<dl id='mswk_tree' class=\"course\">";
    var pnum = 1;

    //if(mswk.userCourseList==null||mswk.userCourseList.length==0)
    if (mswk.gradeCode == null || mswk.subjectCode == null) {

        mswk.gradeCode = _treeVersion.currentGrade;
        mswk.subjectCode = _treeVersion.currentSubject;
        //��ȡĬ���꼶��ѧ��
        mswk.getGradeList();
        return;
    }


    if (mswk.userCourseList != null) {
        for (var i = 0; i < mswk.userCourseList.length; i++) {
            var treeNode = mswk.userCourseList[i];
            var treeNodeName = treeNode.name;
            var treeNodeId = treeNode.id;

            var click = "mswk.getRes('" + treeNodeId + "','" + convertHtml(treeNodeName) + "');";

            if (i == _treeVersion.resTreeList.length - 1) {
                courseDiv += "<dd class=\"end\"><li><a move=\"left\" id=\"" + treeNodeId + "\" onclick=\"" + click + "\" title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
            } else {
                courseDiv += "<dd><li><a move=\"left\" id=\"" + treeNodeId + "\" onclick=\"" + click + "\"  title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
            }
        }
        courseDiv += "</dl>";
    }

    courseDiv += "<div class=\"page pageLeft\" pageattr='pageLeft'><div class=\"pages\" id=\"splitpage\"></div>";
    courseDiv = mswk.createVersionBar(mswk.gradeName + "|" + mswk.subjectName) + courseDiv;

    $(_pMain.getMainLeft()).html(courseDiv);
    $("#mswk_tree").css("height", _pMain.height - 110);
    var hasNoNodeTitle = "���޿γ�";

    $("#pageRightNav").hide();
    $("#pageRightNavbar").remove();
    $(".mainRight").append('<DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pageNow></DIV></DIV>');

    _common.splitpage("#mswk_tree li", pnum, _pMain.menupagesize, "#splitpage", null, true, hasNoNodeTitle);

}
//�����汾��ǩ
MSWK.prototype.createVersionBar = function (name) {
    var maxLength = 15;
    var h = "";
    if (undefined == name || null == name || "null|null" == name) name = '';
    if ('' != name && name.length > maxLength) name = name.substring(0, maxLength - 1) + "����";
    h = "<div id='mswkVersionName' class=\"courseName\" ><a onclick=mswk.setSelectPanel()>" + name + "</a></div>";
    return h;
}
//��ʾ�汾ѡ�����
MSWK.prototype.setSelectPanel = function () {
    var data = "";
    var url = transferProtocol_web + _config["MICRO"] + "/own/gradeSubject/getGrade.action";
    ajaxJson(url, data, "gbk", mswk.setVersionPanel);
}
//��ʾ�汾ѡ�����
MSWK.prototype.getGradeList = function () {
    var data = "";
    var url = transferProtocol_web + _config["MICRO"] + "/own/gradeSubject/getGrade.action";
    ajaxJson(url, data, "gbk", mswk.getGradeListByJson);
}
MSWK.prototype.getGradeListByJson = function (rdata) {
    var isAllGrade = "true";
    var gradeId = "-1";
    for (var i = 0; i < rdata.length; i++) {
        var temp = rdata[i];
        if (temp.nameCode == mswk.gradeCode) {
            //��Ϊ ȫ��
            isAllGrade = "false";
            mswk.gradeName = temp.name;
            gradeId = temp.id;
            break;
        }
    }
    if (isAllGrade == "true") {
        mswk.gradeCode = "-1";
        mswk.gradeName = "ȫ��";
        gradeId = "-1";
    }
    var data = "parentid=" + gradeId;
    var url = transferProtocol_web + _config["MICRO"] + "/own/gradeSubject/getclasslist.action";
    ajaxJson(url, data, "gbk", mswk.getSubjectListByJson);
}
MSWK.prototype.getSubjectListByJson = function (rdata) {
    var isAllSubject = "true";
    for (var i = 0; i < rdata.length; i++) {
        var temp = rdata[i];
        if (temp.nameCode == mswk.subjectCode) {
            //��Ϊ ȫ��
            isAllSubject = "false";
            mswk.subjectName = temp.name;
            break;
        }
    }
    if (isAllSubject == "true") {
        mswk.subjectCode = "-1";
        mswk.subjectName = "ȫ��";
    }
    mswk.createCourseArray();
}
//���ð汾���
MSWK.prototype.setVersionPanel = function (rdata) {
    var sp = document.getElementById("mswkSelectPanel"), h = "";
    sp.innerHTML = ""
    var Code = new Array();
    Code.push('<ul class="classSet" ><li style="width:600px"><b>�꼶��</b></li>');//ѡ���꼶
    if (mswk.gradeCode == "-1") {
        Code.push('<li><LABEL><input name="v_grade" onclick="mswk.setResSubjectList();" checked="checked" type="radio" id="-1" value="-1" title="ȫ��" >ȫ��</LABEL></li>');
    } else {
        Code.push('<li><LABEL><input name="v_grade" onclick="mswk.setResSubjectList();" type="radio" id="-1" value="-1" title="ȫ��" >ȫ��</LABEL></li>');
    }
    for (var i = 0; i < rdata.length; i++) {
        var temp = rdata[i];
        if (temp.nameCode == mswk.gradeCode) {
            Code.push('<li><LABEL><input name="v_grade" onclick="mswk.setResSubjectList();"  type="radio" checked="checked" id="' + temp.id + '" value="' + temp.nameCode + '" title="' + temp.name + '" >' + temp.name + '</LABEL></li>');
        } else {
            Code.push('<li><LABEL><input name="v_grade" onclick="mswk.setResSubjectList();" type="radio" id="' + temp.id + '" value="' + temp.nameCode + '" title="' + temp.name + '" >' + temp.name + '</LABEL></li>');
        }
    }

    Code.push('</ul>');

    Code.push('<ul class="classSet" id="mswkSubjectList">');
    Code.push('</ul>');

    var page = "<div class=pageNext ><a href='javascript:void(mswk.closePanel());'>�� ��</a></div>";
    page += "<div class=pageNext ><a href='javascript:void(mswk.setVersion());'>ȷ ��</a></div>";

    var h = "<div class=divTop id=mswkDivTop style='height:" + (540 + _treeVersion.viewHeightMove) + "px'>";
    h += "<div class=divClose onclick='javascript:void(mswk.closePanel());'></div>";
    h += "<div class=divTitle>΢�ΰ汾����</div>";
    h += "<div class=divContent style='overflow:visible'>";
    h += "<div id='mswkVersion_tips' style='height:40px;color:#ba0505;display=none' align='center'></div>"
    h += "<div id='sp' style='height:" + (460 + _treeVersion.viewHeightMove) + "px;overflow:auto' align='left'>" + Code.join("") + "</div>";
    h += "<div class=page>" + page + "</div></div></div>";
    h += "<div class=divBottom></div>";
    sp.innerHTML = h;
    sp.style.display = document.getElementById("maskAll").style.display = 'block';
    if (rdata.length == 0) {
        document.getElementById("mswkVersion_tips").style.display = '';
        document.getElementById("mswkVersion_tips").innerHTML = "ѧУ��δ���ð汾���������Ա��ϵ���߲���ͷ��绰400-637-1319����";
        $("#mswkDivTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("mswkVersion_tips").style.display = 'none';
        $("#mswkDivTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    mswk.setResSubjectList();

}
//��ȡ��Ŀ�б�
MSWK.prototype.setResSubjectList = function () {
    var gradeId = "-1";
    var sel = document.getElementsByName("v_grade"), i = 0;
    if (sel.length == 0) {
        document.getElementById("mswkVersion_tips").style.display = '';
        document.getElementById("mswkVersion_tips").innerHTML = "��δ���õ�ǰ�汾!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("mswkVersion_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    for (var i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
            //if(mswk.currKsName!=sel[i].value)
            {
                mswk.gradeCode = sel[i].value;
                mswk.gradeName = sel[i].title;
                gradeId = sel[i].id;
            }
            break;
        }
    }

    var data = "parentid=" + gradeId;
    var url = transferProtocol_web + _config["MICRO"] + "/own/gradeSubject/getclasslist.action";
    ajaxJson(url, data, "gbk", mswk.setResSubjectListByJson);
}
//
MSWK.prototype.setResSubjectListByJson = function (rdata) {
    var isAllSubject = "true";
    var Code = "";

    for (var i = 0; i < rdata.length; i++) {
        var temp = rdata[i];
        if (temp.nameCode == mswk.subjectCode) {
            //��Ϊ ȫ��
            isAllSubject = "false";
            Code += '<li><LABEL><input name="v_subject" type="radio" checked="checked" value="' + temp.nameCode + '" title="' + temp.name + '" >' + temp.name + '</LABEL></li>';
        } else {
            Code += '<li><LABEL><input name="v_subject" type="radio" value="' + temp.nameCode + '" title="' + temp.name + '" >' + temp.name + '</LABEL></li>';
        }
    }


    if (isAllSubject == "true") {
        Code = '<li><LABEL><input name="v_subject" checked="checked" type="radio" id="-1" value="-1" title="ȫ��" >ȫ��</LABEL></li>' + Code;
    } else {
        Code = '<li><LABEL><input name="v_subject"  type="radio" id="-1" value="-1" title="ȫ��" >ȫ��</LABEL></li>' + Code;
    }
    Code = '<li style="width:600px"><b>��Ŀ��</b></li>' + Code;//ѡ���Ŀ

    document.getElementById("mswkSubjectList").innerHTML = Code;

}

//����ѡ�а汾
MSWK.prototype.setVersion = function () {
    var v_subject = document.getElementsByName("v_subject");
    var v_grade = document.getElementsByName("v_grade");
    var gradeSelect = "false";
    var subjectSelect = "false";
    for (var i = 0; i < v_grade.length; i++) {
        if (v_grade[i].checked) {
            mswk.gradeCode = v_grade[i].value;
            mswk.gradeName = v_grade[i].title;
            gradeSelect = "true";
            break;
        }
    }
    for (var i = 0; i < v_subject.length; i++) {
        if (v_subject[i].checked) {
            mswk.subjectCode = v_subject[i].value;
            mswk.subjectName = v_subject[i].title;
            subjectSelect = "true";
            break;
        }
    }
    //if(mswk.gradeCode==null||mswk.subjectCode==null){
    if (gradeSelect == "false" || subjectSelect == "false") {
        document.getElementById("mswkVersion_tips").style.display = '';
        document.getElementById("mswkVersion_tips").innerHTML = "��ѡ���꼶���Ŀ!";
        $("#mswkDivTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("mswkVersion_tips").style.display = 'none';
        $("#mswkDivTop").css("height", 540 + _treeVersion.viewHeightMove);
        $("#sp").css("height", 460 + _treeVersion.viewHeightMove);
    }

    document.getElementById("mswkSelectPanel").style.display = document.getElementById("maskAll").style.display = 'none';
    // sendJsonRequest(transferProtocol_web+_config["PLS"]+'/youjiao/baceContent.do?data={\'parentCode\':\''+pid+'\',\'listType\':\'0\'}&ajaxdate='+new Date(),this.createCourseArray,false);

    mswk.createCourseArray();
}
MSWK.prototype.closePanel = function () {
    /*if(mswk.gradeCode==null||mswk.subjectCode==null){
        document.getElementById("mswkVersion_tips").style.display='';
        document.getElementById("mswkVersion_tips").innerHTML="��ѡ���꼶���Ŀ!";
        $("#mswkDivTop").css("height",580+_treeVersion.viewHeightMove);
        return;
    }*/
    document.getElementById("mswkSelectPanel").style.display = document.getElementById("maskAll").style.display = 'none';
}
MSWK.prototype.createCourseArray = function () {
    if (mswk.userCourseList != null) {
        mswk.userCourseList.length = 0;
        mswk.userCourseList = null;
    }
    //time ���������޷�ʹ��ajaxJson
    var data = "gradeCode=" + mswk.gradeCode + "&subjectCode=" + mswk.subjectCode + "&time=0&limit=100";
    var url = transferProtocol_web + _config["MICRO"] + "/own/gradeSubject/getcourselist.action?" + data;
    $.ajax({
        url: url,
        type: "get",
        async: true,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "utf-8",
        success: function (rdata) {
            if (rdata && rdata.items && rdata.items.length > 0) {
                mswk.userCourseList = rdata.items;
            }
            mswk.createLeftHtml();
            shouajaxpro(2);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            //alert("error"+textStatus + errorThrown);
            //�첽��������޷�����쳣
            //alert('����ʱ��');
            shouajaxpro(2);
        }
    });
}
//΢��
MSWK.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    // if(this.currResTypeName.length>25)this.currResTypeName=this.currResTypeName.substring(0,24)+"��";
    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + this.currResTypeName + "<span class=\"bgImg\"></span></div>");
    var data = "catalogId=" + ksId + "&isMyCatalog=false";
    var url = transferProtocol_web + _config["MICRO"] + "/common/resouceList.action";
    ajaxJson(url, data, "utf-8", mswk.parseResList);
}

//����΢���б�����
MSWK.prototype.parseResList = function (rdata) {
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata && rdata.length > 0) {
        //temphtml.push("<div class=\"sendBtn\" ><a href=\"javascript:mswk.sendWKRecommend('"+mswk.currentKsid+"')\" >�Ƽ�</a></div>");
        for (var i = 0; i < rdata.length; i++) {
            //����������һ��
            var temp = rdata[i];

            var RTitle = temp.resourceName;
            var resourceType = temp.resourceType;
            var RCode = "";
            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/mp4.png\"  />";
            if (resourceType == 1) {
                RCode = temp.resourceId;
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/xunlian.png\"  />";
            } else if (resourceType == 2) {
                RCode = temp.resourceId;
            }
            var playjs = "mswk.wkplay('" + RCode + "','" + resourceType + "','" + convertHtml(RTitle) + "')";//<span><a href=\"javascript:mswk.sendWKRecommend('"+RCode+"')\">����</a></span>

            temphtml.push("<li>" + imagepic + "<a title=\"" + RTitle + "\" href=\"javascript:" + playjs + "\" id=\"" + RCode + "\" ><p class=\"zy-tm\">" + RTitle + "</p></a></li>");
        }
    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).append(temphtml.join(""));

    $("#pageRightNavbar").remove();

    if (rdata && rdata.length > 0) {
        //var previous = transferProtocol_web+_config["PLS"]+"/newteach/images/new/tuijian.png";
        $(".mainRight").append('<DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pageNext></DIV><DIV class=pageNow></DIV><a href="javascript:mswk.sendWKRecommend(\'' + mswk.currentKsid + '\');" class="send" ><span >�Ƽ�</span></a></DIV>');
    } else {
        $(".mainRight").append('<DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pageNow></DIV></DIV>');
    }
    temphtml = null;
    mswk.pagesize = _pMain.newcontentpagesize + 1;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, mswk.pagesize, "#pageRightNavbar .pageNow");
}
//΢�η����Ƽ�
MSWK.prototype.sendWKRecommend = function (currentKsid) {
    //�˽ӿ�encodeURIComponent����һ��
    _commonDiv.openWindow(1, "������Դ", "��ѡ��༶��", function (selclassArray) {
        var sendToClass = new Array();
        for (var i = 0; i < selclassArray.length; i++) {
            sendToClass.push(selclassArray[i].classId);
        }//&fromUsername="+teachernumber+"&fromTruename="+encodeURIComponent(teachername)+"
        var tdata = "ownMyCatalog.catalogId=" + currentKsid + "&username=" + teachernumber + "&truename=" + encodeURIComponent(teachername) + "&classIdList=" + sendToClass.join(",");
        ajaxJson(transferProtocol_web + _config["MICRO"] + "/teacher/ownpc/recommendCatalogByClass.action", tdata, "utf-8", function (rdata) {
            try {
                maskAllall.style.display = "none";
                waithtml.style.display = "none";
            } catch (e) {
            }
            if (rdata.success) {
                if (rdata.msg) {
                    setTimeout(function () {
                        _commonDiv.tip(rdata.msg);
                    }, 700);
                } else {
                    setTimeout(function () {
                        _commonDiv.tip("���ͳɹ���");
                    }, 700);
                }
                //�Ƽ�+U��
                _common.addUb("u_tuijianziyuan", "�ڿζ˷����Ƽ���Դ", currentKsid);
                _commonDiv.closeWindow(2000);
            } else {
                _commonDiv.tip("����ʧ�ܣ�");
                _commonDiv.closeWindow(2500);
            }
        });
    }, true, null, null);
}
//����΢����Դ
MSWK.prototype.wkplay = function (rcode, resourceType, RTitle) {
    var url;
    if (resourceType == 2) {
        var height = "590";
        var width = "620";
        var loadUrl = transferProtocol_web + _config["MICRO"] + "/user/resource/play/doMutiplePlayJsonOwn.action?rcode=" + rcode + "&ut=" + sso_ut;
        var target = transferProtocol_web + _config["PLS"] + "/newteach/play/mp4/mp4.jsp?1=1&type=3" + "&loadUrl=" + encodeURIComponent(loadUrl) + "&teachernumber=" + teachernumber;
        _common.openResPage(width, height, target);
    } else if (resourceType == 1) {
        //�Ծ�
        //zjxl.view(rcode,RTitle);

        data = "?rcode=" + rcode + "&rsType=2&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
        var playjs = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
        zjxl.zuoda(playjs);
    }
}
MSWK.prototype.wkmp4play = function (rdata) {

    var flist = "";
    if (rdata && rdata.success && rdata.path) {

        flist = '[{"path":"' + rdata.path + '","start_time":"","file_name":"' + rdata.title + '","file_type":"mp4","file_id":"","end_time":"","newSwfType":"0","brows_image":""}]';

    }
    writeCookie("flist", flist, 1);


    var url = transferProtocol_web + _config["PLS"] + "/newteach/play/mp4/wkmp4.jsp?" + "loginStyle=" + loginStyle;
    _common.openResPage(620, 590, url);

}