//_kTree.showSelPanel();չʾ������ʵ��init
function KnowledgeTree() {

    this.stage = "0001";//ѧ��
    this.section = _common.sectionMap[0];//��Ŀ
    this.select = null;//ѡ��id��ƴװ��
    this.lmtype = null;//ʹ����Ŀ��ʶ
}

var _kTree = new KnowledgeTree();

//��ѧ����
function JXFX() {
    this.ksId = null;
    this.ksName = null;
    this.pagesize = null;
    this.isTrueVersion = "";
    this.resList = null;
    this.typeList = [
        {id: "jxfx_RT001", name: "��Ҫ֪ʶ��"},
        {id: "jxfx_RT002", name: "����֪ʶ��"},
        {id: "jxfx_RT003", name: "δ����֪ʶ��"},
        {id: "jxfx_RT004", name: "ȫ��֪ʶ��"}
    ];


}

var jxfx = new JXFX();
//��Ŀ������Ӧ
JXFX.prototype.getRes = function (ksId, _currResTypeName) {
    //pvͳ��
    _common.countRes("E000");
    this.ksId = ksId;
    this.ksName = _currResTypeName;
    this.pagesize = _pMain.newcontentpagesize - 1;

    //�꼶��Ŀ����
    var ifShow = false;
    try {
        var version = _treeVersion.getCurrentVersion();
        //alert("stageCode:"+version.stageCode+"gradeId:"+version.gradeId+"subjectId:"+version.ksId+"subjectId:"+version.ksId)
        if (jxfxclassSubject && jxfxclassSubject && jxfxclassSubject != undefined && jxfxclassSubject != null) {
            eval("var jxfx_classSubject=" + jxfxclassSubject);
            var jxfx0001 = jxfx_classSubject.jxfx0001;
            var jxfx0002 = jxfx_classSubject.jxfx0002;
            var jxfx0003 = jxfx_classSubject.jxfx0003;
            var jxfxExcludeVersion = jxfx_classSubject.jxfxExcludeVersion;

            if (version.stageCode == "0001") {
                var gradesubject = ";" + version.gradeId + version.subjectId + ";";
                if ((";" + jxfx0001 + ";").indexOf(gradesubject) != -1)
                    ifShow = true;
            } else if (version.stageCode == "0002") {
                var gradesubject = ";" + version.gradeId + version.subjectId + ";";
                if ((";" + jxfx0002 + ";").indexOf(gradesubject) != -1)
                    ifShow = true;
            } else if (version.stageCode == "0003") {
                var gradesubject = ";" + version.subjectId + ";";
                if ((";" + jxfx0003 + ";").indexOf(gradesubject) != -1)
                    ifShow = true;
            }

            if (true) {
                var gradesubject = ";" + version.ksId + ";";
                if ((";" + jxfxExcludeVersion + ";").indexOf(gradesubject) != -1)
                    ifShow = false;
            }
        }

    } catch (e) {
        //alert("��ȡ�����ļ�ʧ�ܣ�");
        ifShow = true;
    }

    var tcode = new Array();
    //tcode.push("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");
    tcode.push("<div class='paperResultList' ><table><tr><th>֪ʶ��</th><th class='zhongkao' style='display: block;'>�п���Ҫ��</th><th>��Ȩ������</th><th>���ʹ���</th><th>��ַ���</th></tr><tbody id='resTable' ></tbody></table></div>");
    $(_pMain.getMainRight()).html(tcode.join(""));

    /*//�꼶��Ŀ����
    var version=_treeVersion.getCurrentVersion();
    //����0001����ѧ0002��Ӣ��0003������0004����ѧ0005������0010������0012������0011����ʷ0013
    var subjectIds=",0001,0002,0003,0004,0005,0010,0012,0011,0013,";
    if(subjectIds.indexOf(","+version.subjectId+",")==-1)
    {
        $("#resTable").html("<tr class='tal'><td colspan='5'><center>ѧ����δ���ߣ������ڴ�������������</center></td></tr>");
        $(".subMenu").html("");
        return;
    }*/

    $(".subMenu").show();
    if (!ifShow) {
        $("#resTable").html("<tr class='tal'><td colspan='5'><center>ѧ����δ���ߣ������ڴ�������������</center></td></tr>");
        $(".subMenu").html("");
        _common.splitpage("#resTable tr", 1, jxfx.pagesize, "#pageRightNav");
        return;
    }

    //0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ
    if (_treeVersion.currentmfFlag == 0 || _treeVersion.currentmfFlag == 1) {
        $(".subMenu").html("<span style='font-size: small'>��ܰ��ʾ�����ʹ���Ϊ�༶ѧ�������ʳ���60%�����⣬��Ȩ������Ϊѧ���������ײ�ͬ�ѶȲ�ε÷��ʵļ�Ȩ������</span>");
        jxfx.clickQuickTeach("jxfx_RT000");
    } else {
        //��ʾ�����˵�
        jxfx.showQuickTeachThredMenu();
    }

}
//��ʾ�����˵���Ŀ
JXFX.prototype.showQuickTeachThredMenu = function () {
    //���ز˵�
    var tMenuCode = new Array();
    for (var i = 0; i < jxfx.typeList.length; i++) {
        var temp = jxfx.typeList[i];
        if (tMenuCode.length == 0) {
            jxfx.firstMenu = temp.id;
        }
        tMenuCode.push("<a href='#' id='" + temp.id + "' onclick='jxfx.clickQuickTeach(\"" + temp.id + "\");' >" + temp.name + "</a>");
    }

    if (_treeVersion.currentmfFlag == 0 || _treeVersion.currentmfFlag == 1) {
        tMenuCode.length = 0;
        tMenuCode.push("<a href='#' id='" + temp.id + "' onclick='jxfx.clickQuickTeach(\"" + temp.id + "\");'></a>");
    }

    $(".subMenu").html(tMenuCode.join(""));
    $("#" + jxfx.firstMenu).click();
}
//�����˵������¼�
JXFX.prototype.clickQuickTeach = function (resflag) {
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");

    //0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ
    var type = 0;
    if (_treeVersion.currentmfFlag == 2 || _treeVersion.currentmfFlag == 3) {
        type = 1;
    }

    var requestType = 3;
    if (resflag == "jxfx_RT000") {
        requestType = 3;
        _common.countRes("E005");//pvͳ��
    } else if (resflag == "jxfx_RT001") {
        requestType = 0;
        _common.countRes("E006");//pvͳ��
    } else if (resflag == "jxfx_RT002") {
        requestType = 1;
        _common.countRes("E007");//pvͳ��
    } else if (resflag == "jxfx_RT003") {
        requestType = 2;
        _common.countRes("E008");//pvͳ��
    } else if (resflag == "jxfx_RT004") {
        requestType = 3;
        _common.countRes("E005");//pvͳ��
    }

    var data = "lessionId=" + _treeVersion.currentCourseId + "&classId=" + userclass + "&type=" + type + "&requestType=" + requestType;
    //ajaxJson(transferProtocol_web+_config["ANLS"]+"/analysis/cls/analysisInterface.action",data,"utf-8",jxfx.parseResList);
    ajaxJson(transferProtocol_web + _config["TIS"] + "/analysis/cls/analysisInterface.action", data, "utf-8", jxfx.parseResList);

}
//������Դ�б�
JXFX.prototype.parseResList = function (rdata) {
    var code = new Array();

    if (rdata && rdata.vos && rdata.vos.length > 0) {
        for (var i = 0; i < rdata.vos.length; i++) {
            var temp = rdata.vos[i];
            var RTitle = temp.knowledgeContent; //֪ʶ����
            var gradeFrequency = temp.gradeFrequency;//�п���Ҫ��
            var accuracy = temp.accuracy;//�ۺϵ÷��� ��Ȩ������
            var uncorrectAmount = temp.uncorrectAmount;//���ʹ�����
            var knowledgeId = temp.knowledgeId;//
            //֪ʶ�������ȴ���
            if (RTitle && RTitle.length > 31) RTitle = RTitle.substring(0, 30) + "��";
            //�п���Ҫ��
            if (null == gradeFrequency) {
                gradeFrequency = "--";
            }

            //��Ȩ������
            if (accuracy == "--") {
                accuracy = "--";
            } else {
                accuracy = Math.round(Number(accuracy) * 100) / 100 + "%";
            }
            //���ʹ�����
            if (0 == uncorrectAmount || uncorrectAmount == null || uncorrectAmount == "--") {
                uncorrectAmount = "--";
            } else {
                var url = transferProtocol_web + _config["QBMS"] + "/tqms/jxfx/typicalWrongQues.action?lessionId=" + _treeVersion.currentCourseId + "&username=" + teachernumber + "&class_id=" + userclass + "&knowledgeId=" + knowledgeId + "&accuracy=60&loginStyle=0";
                uncorrectAmount = "<a style='text-decoration: underline' href=\"javascript:openResPageWithClose('" + url + "','');\" >" + uncorrectAmount + "</a>";
            }

            var fourthKnowledgeId = knowledgeId;
            if (temp.child) {
                fourthKnowledgeId = temp.child;
            }
            code.push("<tr class='tal' title='" + temp.knowledgeContent + "' ><td><div align='left'class=''>" + RTitle + "</div></td><td class='zhongkao' style='display: block;'>" + gradeFrequency + "</td><td>" + accuracy + "</td><td>" + uncorrectAmount + "</td><td><a href=\"javascript:upExam.knowlageShow('" + knowledgeId + "','" + _treeVersion.currentCourseId + "','" + RTitle + "','jxfx');\"  class='tdBtn'>ѵ��</a>&nbsp;<a href=\"javascript:jxfx.upStudy('" + fourthKnowledgeId + "');_common.countRes('E004');;\" class='tdBtn'>΢��</a></td></tr>");

        }

    } else {
        code.push("<tr class='tal'><td colspan='5'><center>" + _common.hasNoRes + "</center></td></tr>");
    }

    $("#resTable").html(code.join(""));

    //0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ
    if (_treeVersion.currentmfFlag == 0 || _treeVersion.currentmfFlag == 1) {
        $(".zhongkao").css("display", "none");
    }
    _common.splitpage("#resTable tr", 1, jxfx.pagesize, "#pageRightNav");

    //code.push("<tr class='tal'  title='"+name+"' ><td><div align='left'class=''>"+resNameStr+"</div></td><td>"+rate_str+"</td><td>"+classGrade_str+"</td><td><a onclick=\"upExam.knowlageShow('"+pointid+"','"+jxfx.ksId+"','"+name+"','jxfx')\"  class='tdBtn'>��ѵ��</a>&nbsp;"+knowledge_str+"</td></tr>");

//�ҵ�ѵ��ǰ��
//$("#resTable").html(code.join(""));

}
//���ݽ��ջص�
JXFX.prototype.parseBaseRes = function (tdata) {
    var resList = tdata.pointclasslist;
    var ids = "";
    if (resList && resList.length > 0) {
        jxfx.resList = resList;
        for (var i = 0; i < resList.length; i++) {
            var resourceNode = resList[i];
            var knowledgeid = resourceNode.knowledgeid;//vcom֪ʶ��id
            if (0 == i) {
                ids += knowledgeid;
            } else {
                ids += "," + knowledgeid;
            }
        }
        jxfx.getResCount(ids);
    } else {
        $("#resTable").html("<tr class='tal'><td colspan='5'><center>" + _common.hasNoRes + "</center></td></tr>");
        _common.splitpage("#resTable tr", 1, jxfx.pagesize, "#pageRightNav");
    }
}
//�鿴��Ƶ
JXFX.prototype.examRate = function (pid) {
    var openurl = transferProtocol_web + _config["PLS"] + "/newteach/inc/examRate.jsp?username=" + teachernumber + "&pointid=" + pid;
//	var openurl=transferProtocol_web+_config["PLS"]+"/newteach/inc/examRate.jsp?username="+teachernumber+"&pointid="+pid;
    var widths = 600;
    var heights = 400;
    _common.openResPage(widths, heights, openurl);
}
//�鿴��Ƶ
JXFX.prototype.refreshRes = function () {
    this.getRes(this.ksId, this.ksName);
}
//ѧ�����γ�(��Դ)
JXFX.prototype.upStudy = function (kid) {
    var data = "kPoint=" + kid;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiao/getResInfoByKPoint.do", data, "utf-8", function (res) {
        if (res != null && res != "" && res != undefined && res.infos != null && res.infos != "" && res.infos != undefined && res.infos.length > 0) {
            var info = res.infos[0];
            var RTitle = info.RTitle;
            var RCode = info.RCode;
            var RFormatMark = info.RFormatMark;
            //ִ�л�����Դ����,�����������Դ���ڽ��з�֧�жϴ���
            eval("player.playResource('" + RCode + "','2','" + RFormatMark + "')");
        } else {
            document.getElementById('upTrainPanel.tip').className = '';
            document.getElementById('upTrainPanel.tip').innerHTML = '';
            document.getElementById('upTrainPanel_content').innerHTML = "<h3 align='center'>��ʾ</h3><div>���޿γ�</div>";
            document.getElementById('upTrainPanel').style.display = 'block';
            return;
        }
    });
}

//ˢ��ѧ�γ̰�ť
JXFX.prototype.getResCount = function (ids) {
    var url = transferProtocol_web + _config["PLS"] + "/youjiao/getResInfoCountByKpoint.do?kPoint=" + ids;
    ajaxJson(url, null, "GBK", jxfx.parseBaseResByCount);
}
//��ʾ��Դ�б�
JXFX.prototype.parseBaseResByCount = function (data) {
    var resList = jxfx.resList;
    var code = new Array();
    if (resList && resList.length > 0) {
        for (var i = 0; i < resList.length; i++) {
            var resourceNode = resList[i];
            var name = resourceNode.pointname; //֪ʶ����
            var classGrade = resourceNode.classgradeA;//ƽ��������

            var rate = resourceNode.frequency;//��Ƶ	
            rate = Math.floor(rate);//ȡ��
            var pointid = resourceNode.pointid;//����֪ʶ��id

            var knowledgeid = resourceNode.knowledgeid;//vcom֪ʶ��id

            var resNameStr = name;
            if (resNameStr.length > (_pMain.pagefontsize - 16)) {
                resNameStr = name.substring(0, (_pMain.pagefontsize - 16));
            }

            var rate_str = "";
            if (0 == rate) {
                rate_str = "<a class='tdLink'>--</a>"
            } else {
                var ratefrequency = resourceNode.gradefrequency;
                var grade = '(һ��)';
                if (ratefrequency == 4) {
                    grade = '(�ǳ���Ҫ)';
                } else if (ratefrequency == 3) {
                    grade = '(��Ҫ)';
                } else if (ratefrequency == 2) {
                    grade = '(�Ƚ���Ҫ)';
                }
                rate_str = "<a class='tdLink' style='color: #ff0000;' href=\"javascript:jxfx.examRate(\"" + pointid + "\");\" ><u>" + rate + grade + "</u></a>"
            }
            //�༶�����ʱ���2λ
            var classGrade_str = "";
            if (0 == classGrade) {
                classGrade_str = "--";
            } else {
                classGrade_str = Math.round(Number(classGrade) * 10000) / 100 + "%";
            }

            var knowledge_str = "";
            var knowledge_count = "";
            if (data && data.infos && data.infos.length > 0) {
                for (var j = 0; j < data.infos.length; j++) {
                    var info = data.infos[j];
                    if (knowledgeid == info.pointName) {
                        knowledge_count = info.count;
                        break;
                    }
                }
                if (knowledge_count > 0) {
                    knowledge_str = "<a href=\"javascript:jxfx.upStudy('" + knowledgeid + "');\"  class='tdBtn' >ѧ�γ�</a>";
                } else {
                    knowledge_str = "<a class='tdBtn gay' >ѧ�γ�</a>";
                }
            } else {
                knowledge_str = "<a href=\"javascript:jxfx.upStudy('" + knowledgeid + "');\"  class='tdBtn' >ѧ�γ�</a>";
            }
            code.push("<tr class='tal'  title='" + name + "' ><td><div align='left'class=''>" + resNameStr + "</div></td><td>" + rate_str + "</td><td>" + classGrade_str + "</td><td><a href=\"javascript:upExam.knowlageShow('" + pointid + "','" + jxfx.ksId + "','" + name + "','jxfx');\"  class='tdBtn'>��ѵ��</a>&nbsp;" + knowledge_str + "</td></tr>");
        }
        //�ҵ�ѵ��ǰ��
        $("#resTable").html(code.join(""));
    }
    _common.splitpage("#resTable tr", 1, jxfx.pagesize, "#pageRightNav");
}

/**
 *����ѵ������
 **/
function upExamObj() {
    this.pid = null;
    this.pname = null;
    this.classId = null;
    this.modelFlag = "zjxl";
    this.question_num = 0;
};
var upExam = new upExamObj();
//��������֪ʶ��id��ʾ����ѵ�����ݻ�ȡ
upExamObj.prototype.knowlageShow = function (kid, class_id, kname, model) {
    this.modelFlag = model;
    this.pname = kname;
    this.pid = kid;
    this.classId = class_id;
    ajaxJson(transferProtocol_web + _config["OLMS"] + "/tqms/jxfx/getJxfxQuestions_Ids.action", "lessionId=" + _treeVersion.currentCourseId + "&knowledge_ids=" + kid + "&classIds=" + userclass + "&username=" + teachernumber, "utf-8", upExam.showCallback);
}

//����ѵ��չʾ�ص�����
upExamObj.prototype.showCallback = function (res) {
    document.getElementById('upTrainPanel.tip').className = '';
    document.getElementById('upTrainPanel.tip').innerHTML = '';
    if (res.success == false) {
        document.getElementById('upTrainPanel_content').innerHTML = "<h3 align='center'>��ʾ</h3><div>����ѵ����¼�в����������ѵ�����Ͻ�ѵ����</div>";
        document.getElementById('upTrainPanel').style.display = 'block';
        return;
    }
    var qnum = res.question_num;
    upExam.question_num = qnum;
    var ids = res.question_ids;
    var difficulty = res.difficulty;
    var h = "<h3>�Ծ��Ѷ�: " + difficulty + " &nbsp;&nbsp;��������: " + qnum + " &nbsp;&nbsp;�漰֪ʶ������:1 </h3>";
    h += "<ul class='divButton upTraindiv'>";
    h += "<li id='SysConfig.teachToolConfigButton'><a href=\"javascript:upExam.train('" + ids + "');_common.countRes('E001');\"  >��ʼѵ��</a></li>";
    h += "<li id='SysConfig.teachToolConfigButton'><a href=\"javascript:upExam.explain('" + ids + "');_common.countRes('E003');\"  >���ѵ������</a></li>";
    h += "<li id='SysConfig.teachToolConfigButton'><a href=\"javascript:upExam.send('" + ids + "');_common.countRes('E002');\"  >���͸�ѧ��</a></li>";
    h += "</ul>";
    document.getElementById('upTrainPanel_content').innerHTML = h;
    document.getElementById('upTrainPanel').style.display = 'block';
}
//����ѵ�����͸�ѧ��
upExamObj.prototype.send = function (questionids) {
    document.getElementById('upTrainPanel.tip').className = '';
    document.getElementById('upTrainPanel.tip').innerHTML = '';
    if (this.question_num == 0) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "�������Ϊ��";
        return;
    }
    if (_commonDiv.getUserClassId() == null) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "����δ���õ�ǰ�༶��";
        return;
    }
    var url = transferProtocol_web + _config["OLMS"] + "/tqms/jxfx/saveXunlianOrSendhomework.action?";
    var date = "question_ids=" + questionids;

    if ("zsdxl" == this.modelFlag) {
        date += "&knowledgeId=" + upExam.classId;
        date += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
    } else {
        date += "&class_id=" + upExam.classId;	//�½�Ŀ¼id 
        //date+="&course_id="+_treeVersion.getCurrentVersion().subjectId;//��Ŀid
        date += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
        date += "&material_id=" + _treeVersion.currKsId;//��ǰ�汾id
    }
    date += "&paper_name=" + encodeURIComponent(upExam.pname);
    date += "&classIds=" + _commonDiv.getUserClassId();//��ʦ�༶�б�
    date += "&hwCreateType=1";//��ʦ�༶�б�
    date += "&username=" + teachernumber;
    date += "&truename=" + encodeURIComponent(teachername);
    date += "&usertype=" + usertype;
    date += "&areaId=" + areaId;
    ajaxJson(url, date, "utf-8", function (result) {
        if (result.success) {
            document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
            document.getElementById('upTrainPanel.tip').innerHTML = result.msg;
        } else {
            document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
            document.getElementById('upTrainPanel.tip').innerHTML = result.msg;
        }
    });
}
//����ѵ���鿴����
upExamObj.prototype.explain = function (questionids) {
    document.getElementById('upTrainPanel.tip').className = '';
    document.getElementById('upTrainPanel.tip').innerHTML = '';
    if (this.question_num == 0) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "�������Ϊ��";
        return;
    }
    if (_commonDiv.getUserClassId() == null) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "����δ���õ�ǰ�༶��";
        return;
    }
    var path = transferProtocol_web + _config["OLMS"] + "/tqms/jxfx/queryNameByQuestionIds.action?";
    path += "question_ids=" + questionids;//����

    path += "&usertype=" + usertype;//�û�����
    path += "&areaId=" + areaId;//����id
    if ("zsdxl" == this.modelFlag) {
        path += "&Knowledge_id=" + upExam.classId;//֪ʶ��id
        path += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
    } else {
        path += "&lessionId=" + upExam.classId;//�½�id
        //path+="&course_id="+_treeVersion.getCurrentVersion().subjectId;//��Ŀid
        path += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
        path += "&material_id=" + _treeVersion.currKsId;//��ǰ�汾id
    }
    path += "&classIds=" + _commonDiv.getUserClassId();//�༶
    path += "&username=" + teachernumber;
    path += "&truename=" + encodeURIComponent(teachername);
    //path+="&paper_name="+encodeURIComponent(upExam.pname);//�Ծ�����

    //��ȡ��������
    var domain = _config["QBMS"].substring(_config["QBMS"].indexOf(".") + 1);

    writeLoginInfoCookie("jxfx_papername", upExam.pname, 1, domain);

    var width = screen.width;
    var height = screen.height;

    _common.openResPage(width, height, path);
}
//����ѵ����ʼѵ��
upExamObj.prototype.train = function (questionids) {
    document.getElementById('upTrainPanel.tip').className = '';
    document.getElementById('upTrainPanel.tip').innerHTML = '';
    if (this.question_num == 0) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "�������Ϊ��";
        return;
    }
    if (_commonDiv.getUserClassId() == null) {
        document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
        document.getElementById('upTrainPanel.tip').innerHTML = "����δ���õ�ǰ�༶��";
        return;
    }
    var url = transferProtocol_web + _config["OLMS"] + "/tqms/jxfx/saveXunlianOrSendhomework.action?";
    var date = "question_ids=" + questionids;
    if ("zsdxl" == this.modelFlag) {
        date += "&knowledgeId=" + upExam.classId;
        date += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
    } else {
        date += "&class_id=" + upExam.classId;	//�½�Ŀ¼id 
        //date+="&course_id="+_treeVersion.getCurrentVersion().subjectId;//��Ŀid
        date += "&course_id=" + _treeVersion.currentSubject;//��Ŀid
        date += "&material_id=" + _treeVersion.currKsId;//��ǰ�汾id
    }
    date += "&paper_name=" + encodeURIComponent(upExam.pname);
    date += "&classIds=" + _commonDiv.getUserClassId();//��ʦ�༶�б�
    date += "&hwCreateType=2";//��ǰ�༶
    date += "&username=" + teachernumber;
    date += "&truename=" + encodeURIComponent(teachername);
    date += "&usertype=" + usertype;
    ajaxJson(url, date, "utf-8", function (result) {
        var pid = result.paperId;
        var hid = result.homeworkId;
        if (result.success) {
            queryPracticePaperQuestion(pid, hid);
        } else {
            document.getElementById('upTrainPanel.tip').className = 'tipsInfo';
            document.getElementById('upTrainPanel.tip').innerHTML = result.msg;
        }
    });
}
//�ر����
upExamObj.prototype.close = function () {
    document.getElementById('upTrainPanel').style.display = 'none';
}