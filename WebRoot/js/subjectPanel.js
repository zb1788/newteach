/*******�汾ѡ����� begin*****/
//�������createSubjectPanel(parentKsid)
var _ssp = new SubjectSelectPanelObj();

function SubjectSelectPanelObj(mname) {
    this.userSubjectList = new Array();
    this.treeArray;
    this.firstKsId;
    this.firstKsName;
    this.currKsId;
    this.moduleid;
    //this.versionBarId="version_bar";
}

SubjectSelectPanelObj.prototype.showSubjectPanel = function () {
    //void(selectPanel_1.style.display=maskAll.style.display='block');
    //if(isAllowSimpleHotKey) _simpleHotKey.pid='selectPanel_1';
    //this.defautFocus('selectPanel_1');
    void (document.getElementById('subjectPanel').style.display = 'block');
}
/*****��ȡ����Ŀ���� begin******/
SubjectSelectPanelObj.prototype.createSubjectPanelArray = function (jsr) {
    if (_ssp.userSubjectList != null) {
        _ssp.userSubjectList.length = 0;
        _ssp.userSubjectList = null;
    }
    _ssp.userSubjectList = jsr.classes;
    var sindex = 0;
    _ssp.syncList(sindex);
    //return _ssp.userSubjectList;
}
//���ûص��ݹ�ͬ����������
SubjectSelectPanelObj.prototype.syncList = function (index) {
    if (index >= _ssp.userSubjectList.length) {
        _ssp.createSubjectPanelHtml();
        _ssp.refreshSubjectTree();
        return;
    }
    var turl = transferProtocol_web + _config["PLS"] + '/youjiao/baceContent.do?data={\'parentCode\':\'' + _ssp.userSubjectList[index].code + '\',\'listType\':\'0\'}&ajaxdate=' + new Date().getTime();
    ajaxJson(turl, null, "gbk", function (ndata) {
        //if(ndata.classes[0].pid)
        _ssp.userSubjectList[index].subList = ndata.classes;
        index++;
        _ssp.syncList(index);
    }, null, false);
}
/*****��������Ŀѡ�������� begin******/
SubjectSelectPanelObj.prototype.createSubjectPanel = function (pid, modid) {
    //С������0001 000147
    if (_common.isBlank(modid)) {
        modid = "kszt";
    }
    this.moduleid = modid + "_";
    var turl = transferProtocol_web + _config["PLS"] + '/youjiao/baceContent.do?data={\'parentCode\':\'' + pid + '\',\'listType\':\'0\'}&ajaxdate=' + new Date();
    ajaxJson(turl, null, "gbk", this.createSubjectPanelArray);
    _ssp.createSubjectPanelHtml();
}
//д��ѡ����HTML
SubjectSelectPanelObj.prototype.createSubjectBar = function () {
    var name = "";
    var lmlist = document.getElementsByName("kszt_ksId");
    if (lmlist) {
        for (var i = 0; i < lmlist.length; i++) {
            if (lmlist[i].checked) {
                name = lmlist[i].value.substring(0, lmlist[i].value.indexOf("+"));
            }
        }
    }
    var js = '_ssp.showSubjectPanel()';
    var maxLength = 15
    if (typeof (name) == "undefined") name = '';
    if ('' != name && name.length > maxLength)
        name = name.substring(0, maxLength - 1) + "����";
    document.getElementById("mainLeft").innerHTML = "<div id=\"subjectBarDiv\" class=\"courseName\" ><a onclick=" + js + ">" + name.replace("|", "&nbsp;|&nbsp;") + "</a></div>" + document.getElementById("mainLeft").innerHTML;
}
SubjectSelectPanelObj.prototype.createSubjectPanelHtml = function () {
    var h = new Array();
    for (var curr = 0; curr < _ssp.userSubjectList.length; curr++) {
        var fksName = _ssp.userSubjectList[curr].name;
        var gradeId = _ssp.userSubjectList[curr].rSubject;
        h.push('<UL class=classSet><li><LABEL>' + fksName + '&nbsp;|&nbsp;');
        for (var i = 0; i < _ssp.userSubjectList[curr].subList.length; i++) {
            var tempobj = _ssp.userSubjectList[curr].subList[i];
            var ksName = tempobj.name;
            var ksId = tempobj.code;
            var ksvalue = fksName + '|' + ksName + '+' + ksId;
            var checkflag = "";
            if (curr == 0 && curr == i && i == 0) {
                _ssp.firstKsId = ksId;
                checkflag = "checked='true'";
            }
            h.push('&nbsp;<input name="kszt_ksId" type="radio" value="' + ksvalue + '"  id="' + ksId + '" ' + checkflag + '  />' + ksName + "&nbsp;");
        }
        h.push('</LABEL></li></ul><SPAN class=clearfix></SPAN>');
    }//end of for currpage
    //prompt('',h.join(''));
    document.getElementById("subjectPanel_content").innerHTML = h.join("");
    //alert(selected_ksId);
    var selected_ksId = "";
    try {
        selected_ksId = _ssp.firstKsId;//
        //alert('firstid'+_ssp.firstKsId);
        document.getElementById(idSuf + selected_ksId).checked = "checked";//����Ĭ��ѡ����
    } catch (e) {
        window.status = '���ð汾ѡ������ѡ��״̬ʧ�ܣ�';
    }
    //document.getElementById("selectPanel_button").innerHTML=hb;
    //selectPanel_ch
    return selected_ksId;
}
SubjectSelectPanelObj.prototype.refreshSubjectTree = function () {
    var lmlist = document.getElementsByName("kszt_ksId");
    if (lmlist) {
        for (var i = 0; i < lmlist.length; i++) {
            if (lmlist[i].checked) {
                sendJsonRequest(transferProtocol_web + _config["PLS"] + '/youjiao/baceContent.do?data={\'parentCode\':\'' + lmlist[i].id + '\',\'listType\':\'0\'}&ajaxdate=' + new Date().getTime(), function (treejs) {
                    _ssp.treeArray = treejs.classes;
                    _ssp.parseSubjectTreeXml(1);
                }, false);
            }
        }
    }
}
SubjectSelectPanelObj.prototype.parseSubjectTreeXml = function () {
    var treeNodes = this.treeArray;
    var mainLefthtmlbody = "<dl id='courseExam_tree' class=\"course\">";
    var indextype = 0;
    var selNode = null;
    for (var i = 0; i < treeNodes.length; i++) {
        var treeNode = treeNodes[i];
        var isUnit = treeNodes[i].isUnit;// 1��Ԫ
        var treeNodeId = treeNodes[i].code;
        var treeNodeName = treeNodes[i].name;
        if (i == treeNodes.length - 1) {
            mainLefthtmlbody += "<dd class=\"end\"><li><a move=\"left\" id=index_" + (++indextype) + "_0 href=\"#\" onclick=\"javascript:_common.count('" + treeNodeId + "');" + this.moduleid + "getRes('" + treeNodeId + "','" + treeNodeName + "');\" title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
        } else {
            mainLefthtmlbody += "<dd><li><a move=\"left\" id=index_" + (++indextype) + "_0 href=\"#\" onclick=\"javascript:_common.count('" + treeNodeId + "');" + this.moduleid + "getRes('" + treeNodeId + "','" + treeNodeName + "')\" title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
        }
    }

    mainLefthtmlbody += "</dl>";


    //mainLefthtmlbody+="<div class=\"page pageLeft\" pageattr='pageLeft'><div class=\"pages\" id=\"subjectSplitPage\"></div><a href=\"#\" onclick='_ssp.showSubjectPanel();' class=\"setBtn\">ר��ѡ��</a></div>";
    mainLefthtmlbody += "<div class=\"page pageLeft\" pageattr='pageLeft'><div class=\"pages\" id=\"subjectSplitPage\"></div></div>";
    mainLeft.innerHTML = mainLefthtmlbody;

    $("#courseExam_tree").css("height", _pMain.height - 110);//������ҳ��ťλ��
    _common.splitpage("#courseExam_tree li", 1, _pMain.menupagesize, "#subjectSplitPage", null, true);
    this.createSubjectBar();
}
