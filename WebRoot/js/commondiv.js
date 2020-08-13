//�༶����
var _commonDiv = new commonDiv();
var mac_class = null;//mac��Ӧclassid
//�༶ѡ�񹤾���
function commonDiv() {
    this.callback = null;//�ص�����
    this.unSelectClass = null;//��ѡ��
    this.selDefault = true;//�Ƿ�ѡ��Ĭ�ϰ༶
    this.classDataCache = null;
    this.showtype = 1;//��ʾ��ʽ1��ѡ��2��ѡ
    this.limitGrade = null;//�Ƿ������꼶�������꼶��id--�����,�ָ�
    this.limitClass = null;//����ѡ��İ༶��ֻ�ܴ���ѡ��İ༶--�����,�ָ�
    this.title = null;//���⣬���ֵ�����Դ;
    this.timer = null;//��ʱ��
    this.clientToolInterfaceLock = false;
    this.loginInfo = null;
    this.deviceType = null;

}

//�༶ѡ����ʾ
commonDiv.prototype.tip = function (tip, type) {
    if (type == 1) {
        document.getElementById('net.tip').className = "";
        document.getElementById('net.tip').innerHTML = "";
    } else {
        document.getElementById('net.tip').className = "tipsInfo";
        document.getElementById('net.tip').innerHTML = tip;
    }
}
//�����༶ѡ�񴰿�
//showtype 1��ѡ��2��ѡ��seldefault�Ƿ�ѡ��Ĭ�ϰ༶��unSelectClass����ѡ�༶(��ʾΪ��ɫѡ��)
commonDiv.prototype.openWindow = function (showtype, divtitle, description, callback, seldefault, unSelectClass, limitGrade, limitClass) {
    //20150205Ϊʲô��������Ͳ�ִ�У��ڿ��ֲ�����div
    //if(_mask.isVisible()) return;
    if (_common.isBlank(divtitle)) {
        this.title = "�༶����";
    } else {
        this.title = divtitle;
    }
    if (_common.isBlank(showtype)) {
        this.showtype = 2;
    } else {
        this.showtype = showtype;
    }
    if (_common.isBlank(description)) {
        this.description = "��ѡ�������ڵ��ڿΰ༶!";
    } else {
        this.description = description;
    }
    if (_common.isBlank(callback)) {
        this.callback = _commonDiv.saveUserClass;
    } else {
        this.callback = callback;
    }
    if (!_common.isBlank(unSelectClass) && unSelectClass != "null") {
        this.unSelectClass = "," + unSelectClass + ",";
    } else {
        this.unSelectClass = null;
    }
    if (!_common.isBlank(limitClass) && limitClass != "null") {
        this.limitClass = "," + limitClass + ",";
    } else {
        this.limitClass = null;
    }
    if (!_common.isBlank(seldefault)) {
        this.selDefault = seldefault;
    } else {
        this.selDefault = true;
    }
    if (typeof (limitGrade) != "undefined" && limitGrade != null) {
        this.limitGrade = limitGrade;
    } else {
        this.limitGrade = null;
    }
    _commonDiv.tip("", 1);//������ʾ��Ϣ
    $("#class_commondivWindow").css("display", "block");

    $("#_commontitle").html(this.title);
    $("#_commonmessage").html(this.description);

    $("#maskAll").css("display", "block");
    $("#classselBtn").css('display', 'block');

    if (this.title == "�༶����") {
        $("#_commonmessage").css('display', 'none');
        _commonDiv.showUserClass();	//�༶���õ���
    } else {
        //���ְ༶
        $("#classselBtn").css('display', 'none');
        $("#_commonmessage").css('display', 'block');
        _commonDiv.showUserClass();  //�Ƽ��ȹ��ܵ����û��༶

    }
    //��ʾȷ����ť
    document.getElementById("classConfig.confirm").disabled = false;
}

//�򿪷����������
commonDiv.prototype.openTaskWindow = function (rcode) {
    var data = "id=" + rcode + "&username=" + teachernumber;
    $("#taskrcode").val(rcode);
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/editCourseJob.do", data, "gbk", function (rdata) {
        var temphtml = new Array();
        if (rdata.cj && rdata.cj.subJobList && rdata.cj.subJobList.length > 0) {
            for (var i = 0; i < rdata.cj.subJobList.length; i++) {
                var temp = rdata.cj.subJobList[i];
                var subjobid = temp.id;
                var subjobname = '<li><a><input type="checkbox" name="joblist" value="' + subjobid + '" checked="true"/>����' + (i + 1) + '</a></li>';
                temphtml.push(subjobname);
            }
        } else {
            temphtml.push('<li><a>��������<a></li>');
        }
        $('#taskDivSet').html(temphtml.join(''));
    });
    $("#class_taskWindow").css("display", "block");
    $("#maskAll").css("display", "block");
}
commonDiv.prototype.closeTaskWindow = function () {
    $("#class_taskWindow").hide();
    $("#maskAll").hide();
    //�����ʾ��Ϣ
    document.getElementById('tasktip').className = "";
    document.getElementById('tasktip').innerHTML = "";
};
//��ʾ��ʦ�༶
commonDiv.prototype.showUserClass = function () {

    this.getClassData(_commonDiv.getClassList);
    $("#userClass").attr("class", "selButton");
    $("#allClass").attr("class", "unselButton");
}

//��ʾȫ���༶
commonDiv.prototype.showAllClass = function () {

    this.getSchoolClassData(_commonDiv.getClassList);
    $("#userClass").attr("class", "unselButton");
    $("#allClass").attr("class", "selButton");
}

//�༶ѡ������-����ѡ��༶��������{classId,className}
commonDiv.prototype.selectClass = function () {
    var userselectclass = new Array();
    $("#classSet input").each(function () {
        if ($(this).attr("checked") && !$(this).attr("disabled")) {
            userselectclass.push({
                classId: $(this).attr("value"),
                className: $(this).attr("classname"),
                classType: $(this).attr("classType")
            });
        }
    });

    if (userselectclass.length < 1) {
        _commonDiv.tip("��ѡ��༶��");
        return;
    }
    //�û�ȷ����ť
    document.getElementById("classConfig.confirm").disabled = true;
    this.callback(userselectclass);
}
//���ýӿڻ�ȡ��ʦ�༶,������ѡ�м���ѡ
commonDiv.prototype.getClassData = function (funhandel, force) {
    try {
        if (force) {
            _commonDiv.classDataCache = null;
        }
        if (_commonDiv.classDataCache != null && _commonDiv.classDataCache.length > 0) {
            funhandel(_commonDiv.classDataCache, "userClass");
        } else {//20190723����֧�������
            var data = "queryType=byUserName&classType=a&userName=" + teachernumber;
            var myDate = new Date();
            ajaxJson(pls_config_all["TMS.401"], data, "gbk", function (result) {
                if (result && result.rtnArray && result.rtnArray.length > 0) {
                    _commonDiv.classDataCache = new Array();
                    $(result.rtnArray).each(function () {
                        _commonDiv.classDataCache.push({
                            classId: $(this).attr("classId"),
                            className: $(this).attr("className"),
                            classType: $(this).attr("classType"),
                            gradeCode: $(this).attr("gradeCode")
                        });
                    });
                }
                funhandel(_commonDiv.classDataCache, "userClass");
            });
        }
    } catch (e) {
        alert(e);
    }
}

//���ýӿڻ�ȡ��ʦ����ѧУ���а༶(��������)
commonDiv.prototype.getSchoolClassData = function (funhandel) {
    try {//20190723����֧�������
        var data = "queryType=bySchool&classType=a&schoolId=" + schoolId;
        var myDate = new Date();
        ajaxJson(transferProtocol_web + _config["TMS"] + "/tms/interface/querySchoolClass.jsp", data, "gbk", function (result) {
            if (result && result.rtnArray && result.rtnArray.length > 0) {
                var schoolClassData = new Array();
                $(result.rtnArray).each(function () {
                    schoolClassData.push({
                        classId: $(this).attr("classId"),
                        className: $(this).attr("className"),
                        classType: $(this).attr("classType"),
                        gradeCode: $(this).attr("gradeCode")
                    });
                });
            }
            funhandel(schoolClassData, "allClass");
        });
    } catch (e) {
        alert(e);
    }
}
commonDiv.prototype.getClassList = function (classArray, classType) {
    var classHtml = new Array();
    if (classArray != null && classArray.length > 0) {
        for (var i = 0; i < classArray.length; i++) {
            var temp = classArray[i];
            //�����ǰ�༶�������꼶���ƣ������˰༶
            if ((typeof (_commonDiv.limitGrade) != "undefined" && _commonDiv.limitGrade != null && _commonDiv.limitGrade != "") && (_commonDiv.limitGrade.indexOf(temp.gradeCode) == -1)) {
                continue;
            }
            var checkedcode = "";
            //���ݲ�ƥ���û���Χ�����
            if (_common.isBlank(userclass) && mac_class != null && temp.classId == mac_class) {
                checkedcode = "checked='checked'";
            }
            if (_commonDiv.selDefault && temp.classId == userclass) {
                checkedcode = "checked='checked'";//Ĭ��ѡ���Ѿ����ù��İ༶
            }
            if (_commonDiv.unSelectClass != null && _commonDiv.unSelectClass.indexOf("," + temp.classId + ",") > -1) {
                checkedcode = "disabled='true' checked='checked'";
            }
            if (_commonDiv.limitClass != null && _commonDiv.limitClass != ",," && _commonDiv.limitClass.indexOf("," + temp.classId + ",") == -1) {
                continue;
            }
            var botype = "checkbox";
            if (_commonDiv.showtype != 1) {
                botype = "radio";
            }
            classHtml.push('<li><a href="#" onclick=document.getElementById("class_' + temp.classId + '").click();><input id="class_' + temp.classId + '" name="userclass" ' + checkedcode + ' type="' + botype + '" classname="' + temp.className + '" classType="' + temp.classType + '" value="' + temp.classId + '" />' + temp.className + '</a></li>');
            temp = null;
        }
    }

    if (_commonDiv.title == "�༶����" && classType == "userClass") {
        if (classHtml.length == 0) {
            //��ʾȫ���༶
            $("#userClass").attr("disabled", "disabled");
            _commonDiv.showAllClass();
        } else {
            $("#userClass").attr("disabled", false);
        }
    }

    if (null == userclass || "" == userclass || undefined == userclass) {
        document.getElementById("classConfig.close").style.display = "none";
    } else {
        document.getElementById("classConfig.close").style.display = "block";
    }
    if (classHtml.length == 0) {
        if (typeof (_commonDiv.limitGrade) != "undefined" && _commonDiv.limitGrade != null) {
            classHtml.push("<li><h3><center>�޷��϶�Ӧ�꼶�İ༶��ѡ!</center></h3></li>");
        } else {
            if (null == userclass || "" == userclass || undefined == userclass) {
                classHtml.push("<li><h3><center>δ��ȡ��������ѧУ�İ༶��Ϣ������ϵ����Ա��</center></h3></li>");
            } else {
                classHtml.push("<li><h3><center>��û�м����κΰ༶!�����ͬ��ѧϰ���û����ļ���༶��</center></h3></li>");
            }
        }
    }

    $("#classSet").html(classHtml.join(""));
}

//�رհ༶ѡ�񴰿�
commonDiv.prototype.closeWindow = function (times) {
    if (null == userclass || "" == userclass || undefined == userclass) {
        _commonDiv.tip("�������õ�ǰ���ڰ༶��");
        return;
    }
    if (typeof (times) != "undefined") {
        this.timer = setTimeout(_commonDiv.closeWindow, times);
    } else {
        if (this.timer != null) clearTimeout(this.timer);
        $("#class_commondivWindow").hide();
        $("#maskAll").hide();
        //���¼��ť
        document.getElementById("classConfig.confirm").disabled = false;
        //�����ʾ��Ϣ
        document.getElementById('net.tip').className = "";
        document.getElementById('net.tip').innerHTML = "";
    }
};
//����༶��Ϣ����(Ĭ�ϴ���)
commonDiv.prototype.saveUserClass = function (classArray) {
    if (loginStyle == 0) {
        //ƽ���Ͽ�״̬�������л��༶
        if (getIsHavingClass() == 1) {
            alert("����ƽ���¿Σ�");
            return;
        }

        var padStatus;
        try {
            padStatus = LessionOcx.ReadSchoolbag(1);
            if (padStatus != 0 && typeof padStatus != 'undefined') {
                //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
                var warn = "���ȹر�" + padStatus + "���ܣ�";
                alert(warn);
                return;
            }
        } catch (e) {

        }
    }

    if (classArray.length != 1) {
        alert("��ѡ��һ���༶��Ϊ��ǰ�༶��");
        return;
    } else {
        userclass = classArray[0].classId;
        userClassName = classArray[0].className;
        userClassType = classArray[0].classType;
    }
    //����Ƿ�����ڵ�ǰ�б���
    _commonDiv.getClassData(function (classArr) {
        var addClass = true;
        if (classArr != null) {
            for (var i = 0; i < classArr.length; i++) {
                if (userclass == classArr[i].classId) {
                    addClass = false;
                }
            }
        }
        if (addClass) {
            ajaxJson(transferProtocol_web + _config["TMS"] + "/tms/interface/queryTeacher.jsp", "queryType=addClass&username=" + teachernumber + "&ut=" + sso_ut + "&schoolClassId=" + userclass, "gbk", function (rjson) {
                if (loginStyle == 1) {
                    $("#className").text(userClassName);
                    _commonDiv.tip("���óɹ���");
                    _commonDiv.closeWindow(1000);
                    _commonDiv.showUserClassName();
                    return;
                }
                if (rjson && rjson.opRsCode == '1') {
                    _commonDiv.RecodeClassForMac(userclass);
                } else {
                    _commonDiv.tip("��������ʧ�ܣ�");
                    //_commonDiv.closeWindow(2500);
                }
            });
        } else {
            if (loginStyle == 1) {
                $("#className").text(userClassName);
                _commonDiv.tip("���óɹ���");
                _commonDiv.closeWindow(1000);
                _commonDiv.showUserClassName();
                return;
            }
            _commonDiv.RecodeClassForMac(userclass);
        }
    });
}
//������ʷ��¼�ӿڼ���mac��Ӧ�༶
commonDiv.prototype.RecodeClassForMac = function (userselectclass) {
    var url = _common.getCurrServerPath() + '/AccessAddLog.do?1=1&current.c1=1&current.c6=' + userselectclass;
    url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
    url += '&current.account=' + teachernumber;//�˺�
    url += '&current.userName=' + encodeURI(encodeURI(teachername));//�û���
    sendRequestJsonNew(function (xmldoc) {
        if (!xmldoc) {
            return false;
        }
        //var back=xmldoc.selectNodes("//string");//��ȡ
        _commonDiv.tip(xmldoc.msg);

        if (xmldoc.status == "ok") {
            // userclass=userselectclass;
            // _commonDiv.tip("���óɹ���");
            // _commonDiv.closeWindow(1000);
            // _commonDiv.classDataCache=null;
            // //���¼��ص�ǰ��Ŀ
            // try{
            // if(_naUtil.selectMenu && _naUtil.selectMenu!=null){
            // 	_naUtil.selectMenu.click();
            // }
            // }catch(e){}
            // //��ʾ��ǰ�༶�����ô�������Ϣ
            // _commonDiv.showUserClassName();
        }
    }, url);

    userclass = userselectclass;
    _commonDiv.tip("���óɹ���");
    _commonDiv.closeWindow(1000);
    _commonDiv.classDataCache = null;
    //���¼��ص�ǰ��Ŀ
    try {
        if (_naUtil.selectMenu && _naUtil.selectMenu != null) {
            _naUtil.selectMenu.click();
        }
    } catch (e) {
    }
    //��ʾ��ǰ�༶�����ô�������Ϣ
    _commonDiv.showUserClassName();
}
//��ȡ�ڿΰ༶�����Ϊ���򵯳��༶����
commonDiv.prototype.getUserClassId = function () {
    if (userclass == "") {
        _commonDiv.openWindow();
        return null;
    } else {
        return userclass;
    }
}
//��ʾ�ڿΰ༶��
commonDiv.prototype.showUserClassName = function () {
    if (userclass == "" || userclass == null) {
        _commonDiv.openWindow();
    } else {
        this.getClassData(function (classArray) {
            if (classArray != null && classArray.length > 0) {
                for (var i = 0; i < classArray.length; i++) {
                    var temp = classArray[i];
                    if (temp.classId == userclass) {
                        userClassName = temp.className;
                        userClassType = temp.classType;
                        $("#className").text(userClassName);
                        //var  sel = $("#menu").children().find(".sel");
                        //if(sel.length==0)
                        //{
                        //    _naUtil.ktjx();//Ĭ�Ͽ��ý�ѧ
                        //}
                        if (_naUtil.isFirstLoad) {
                            var obj = $("#menuNew a:contains('���ý�ѧ')");
                            if (obj.length == 1) {
                                //�п��ý�ѧ��Ŀ
                                _naUtil.ktjx();//Ĭ�Ͽ��ý�ѧ
                            } else {
                                //û�п��ý�ѧ��չʾ��һ��
                                $("#menuNew").find('a').eq(0).click();
                            }
                        }
                        initDTQ(1);
                        break;
                    }
                    //����ʦû�е�ǰ�ڿζ�Ӧ�İ༶����������ѡ��༶
                    if (i == (classArray.length - 1)) {
                        mac_class = userclass;
                        userclass = "";
                        _commonDiv.openWindow();
                    }
                    temp = null;
                }
            } else {
                mac_class = userclass;
                userclass = "";
                _commonDiv.openWindow();
            }
        }, true);
    }
}

//setTimeout("_commonDiv.showUserClassName()",500);
function initDTQ(flag) {//��ʼ���Ž̹��ߵ�½��Ϣ  1 ��д  0 ���(�˳�)

    //���������ƣ���ֹ��½����������˳��������˳��ٶȿ����½
    if (_commonDiv.clientToolInterfaceLock) {
        //alert("��һ����������У����Եȣ�");
        return;
    }
    //��ִ����
    _commonDiv.clientToolInterfaceLock = true;
    var content = "";
    if (flag == 0) {
        clientToolTransmit("", flag);
        return;
    }
    //��½��༶�޸�д��ʱ�༶����Ϊ��
    if (userclass == "" || userclass == null || _treeVersion.currentSubject == null) {
        _commonDiv.clientToolInterfaceLock = false;
        return;
    }
    //������δ��ȡѧ����
    /*
    var loginInfo="teachernumber:\""+teachernumber+"\",teachername:\""+encodeURIComponent(encodeURIComponent(teachername))+"\",schoolId:\""+schoolId+"\",schoolName:\""+encodeURIComponent(encodeURIComponent(schoolName))+"\",classId:\""+userclass+"\",stuNum:0,ssout:\""+sso_ut+"\"";
    clientToolTransmit(loginInfo);//areaId
    */

    var url = transferProtocol_web + _config["TMS"] + "/tms/interface/queryStudent.jsp?queryType=answerToolByClass&schoolClassId=" + userclass;
    ajaxJson(url, null, "gbk", function (data) {
        var stuNum = data.result;
        var pls = transferProtocol_web + _config["PLS"];
        var className = $("#className").html();
        var subjectId = _treeVersion.currentSubject;
        var courseId = _treeVersion.currentCourseId;
        var subjectName = _treeVersion.currentSubjectName;

        //ѧУ�Ƿ�֧��ƽ����� 0��֧�� 1NECƽ�� 2vcomƽ�� 3NEC��vcomƽ��ͬʱ֧�֣� �ڿζ�ֻ֧��vcomƽ�� ����0��1ʱ����ƽ�幦�ܣ�
        // Ϊ�����ڿζ��ϰ�����������¼�������padTeachAble��2��3ʱ��1 �����0��1ʱ��0
        var padTeachAble_loginInfo = 0;
        if (padTeachAble == 2 || padTeachAble == 3) {
            padTeachAble_loginInfo = 1;
        } else {
            padTeachAble_loginInfo = 0;
        }
        var loginInfo = "teachernumber:\"" + teachernumber + "\",teachername:\"" + encodeURIComponent(encodeURIComponent(teachername)) + "\",schoolId:\"" + schoolId + "\",schoolName:\"" + encodeURIComponent(encodeURIComponent(schoolName)) + "\",classId:\"" + userclass + "\",className:\"" + className + "\",userClassType:\"" + userClassType + "\",userClassName:\"" + encodeURIComponent(encodeURIComponent(className)) + "\",areaId:\"" + areaId + "\",subjectId:\"" + subjectId + "\",courseId:\"" + _treeVersion.currentCourseId + "\",classHourId:\"" + _treeVersion.currentClassHourId + "\",lectureEndVersion:\"" + getSchoolBagVersion() + "\",subjectName:\"" + encodeURIComponent(encodeURIComponent(subjectName)) + "\",pls:\"" + pls + "\",padTeachAble:\"" + padTeachAble_loginInfo + "\",userType:\"" + usertype + "\",stuNum:" + stuNum;
        clientToolTransmit(loginInfo, flag);
    });
}

//��ȡsocket�˿�
function getSocketPort() {
    var port = "9000";
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "clientport.ini");
    } catch (err) {
    }
    if (config_str != "-1" && config_str.length > 1) {
        //�������ڿζ�
        var configs = config_str.split(":");
        if (configs.length == 2) {
            if (configs[0] == "socketport") {
                //�ж�port�Ƿ�Ϊ����
                port = configs[1];
            }

        }
        //json��ʽ
        if (config_str.indexOf("{") != -1) {
            try {
                var json = eval("(" + config_str + ")");
                port = json.socketport;
            } catch (err) {
            }
        }

    }
    return port;
}

//��ȡ�ڿζ��Ƿ��ǵ�������汾
function getClientIsSchoolbag() {

    var isSchoolbag = "0";//1���ǵ�������汾 0�����ǵ�������汾

    try {
        isSchoolbag = LessionOcx.IsSchoolbag();
    } catch (err) {
    }

    return isSchoolbag;
}

//��ȡ�ڿ��Ƿ���ʾ���������ʶ
function getIsSchoolbag() {
    //ѧУ�Ƿ�֧��ƽ����� 0��֧�� 1NECƽ�� 2vcomƽ�� 3NEC��vcomƽ��ͬʱ֧�֣� �ڿζ�ֻ֧��vcomƽ�� ����0��1ʱ����ƽ�幦�ܣ�
    // Ϊ�����ڿζ��ϰ�����������¼�������padTeachAble��2��3ʱ��1 �����0��1ʱ��0
    if (loginStyle == 0) {
        if (padTeachAble == 2 || padTeachAble == 3) {
            if (getClientIsSchoolbag() == 1) {
                return true;
            }
        }
    }
    return false;
}

function getSchoolBagVersion() {
    //0�ǵ������ 1�������1.0   2�������2.0
    var schoolBag = getClientIsSchoolbag();
    if (schoolBag == 0) {
        return 0;
    }
    var clientVersion = "0";
    try {
        clientVersion = LessionOcx.GetClientVer();
    } catch (err) {
    }
    //�Ƚϰ汾��С version2����version1 1 ����0 version2С��version1 -1 ʧ�ܷ��ؿ�
    var clientVersionFlag = _common.compareVersion("1.00.60", clientVersion);

    if (clientVersionFlag >= 0) {
        return 2;
    } else if (clientVersionFlag == -1) {
        return 1;
    } else {
        return 0;
    }

}

//��ȡƽ������Ͽ�״̬
function getIsHavingClass() {
    var isHavingClass = "0";
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "clientport.ini");
        if (config_str != "-1" && config_str.length > 1) {
            //json��ʽ
            if (config_str.indexOf("{") != -1) {
                var json = eval("(" + config_str + ")");
                isHavingClass = json.isHavingClass;
            }
        }
    } catch (err) {
    }

    return isHavingClass;
}

//�ж��Ƿ��б��ƽ��ҳ���Ѵ�
function getIsUsingPad() {

    //�ڿ�Ԥ��ʱ����ʾ
    if (loginStyle == 1) {
        return 0;
    }
    //�ԱȰ汾��ȷ�����÷�ʽ ocx�汾�ﵽ1.0.1.9����ʾ
    if (_common.checkOcxVersion("1.0.1.9") == -1) {
        return 0;
    }
    var flag = "0";
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "padflag.ini");
        if (config_str != "-1" && config_str.length > 1) {
            //json��ʽ
            if (config_str.indexOf("{") != -1) {
                var json = eval("(" + config_str + ")");
                flag = json.flag;
            }
        }
    } catch (err) {

    }


    return flag;
}

function getPadWarnName(id) {

    var warnArray = [
        {id: "11", name: "ֽ�ʵ���"},
        {id: "12", name: "�׾�Ƿ�"},
        {id: "13", name: "�Ƿ�"},
        {id: "14", name: "����"},
        {id: "15", name: "���⿨��"},
        {id: "16", name: "���͵�ƽ��"},
        {id: "17", name: "Ԥϰ��ҵ"},
        {id: "18", name: "ѵ������"},
        {id: "21", name: "ֽ�ʵ���"},
        {id: "22", name: "�׾�Ƿ�"},
        {id: "23", name: "����"},
        {id: "24", name: "ƽ��ǩ��"},
        {id: "25", name: "С������"},
        {id: "26", name: "�ɹ�����"}

    ];
    if (id != "0") {
        warn = "���ȹر�����ƽ�幦�ܣ�";
        for (var i = 0; i < warnArray.length; i++) {
            if (warnArray[i].id == id) {
                warn = "���ȹر�" + warnArray[i].name + "���ܣ�";
            }
        }
    }
    return warn;
}

//�޸������ļ�ƽ������ʹ��
function setIsUsingPad(newflag) {

    try {

        var fc = "{\"flag\":\"" + newflag + "\"}";
        //ֻ���ڿζ˲�����
        if (loginStyle == 0) {
            ocx.WriteInfo("", "padflag.ini", fc, 0);
        }
    } catch (err) {
    }
}

function getCityUrl() {
    var city_url = "";
    var config_str = ocx.ReadInfo("", "showkeip.ini");
    if (config_str != "-1" && config_str.length > 1) {
        var urls = config_str.split(";");
        for (var i = 0; i < urls.length; i++) {
            var configs = urls[i].split("=");
            for (var j = 0; j < configs.length; j++) {
                if (configs[0] == "showke.city_url") {
                    city_url = configs[1];
                    if (city_url.indexOf("/newteach")) {
                        city_url = city_url.replace("/newteach", "");
                    } else if (city_url.indexOf("/teach")) {
                        city_url = city_url.replace("/teach", "");
                    }
                }
            }

        }

    }
    return city_url;

}

function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;) ;
}

//�豸�¾������ж�
function getDeviceType() {
    //getIsHavingClass==1��Ϊ PAD �Ͽ�/0�¿�
    if ("1" == getIsHavingClass()) {
        return "3";
    }
    //1���豸(֧�ֶ����׾����豸ʱĬ��ֵ); 0���豸(����); 2���ִ��⿨(֧�����ּ�);3:pad��4:û���豸;
    //���ֽ�ʺ������豸�������Ǻ���׷�Ӹ�1�����ӣ����ִ��⿨+ֽ��2,1
    var deviceType = 0;
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "clientversion.ini");
    } catch (err) {
    }

    if (config_str != "-1" && config_str.length > 1) {
        var configs = config_str.split(":");
        if (configs.length == 2) {
            if (configs[0] == "devversion") {
                deviceType = configs[1];
            }

        }
    }
    if (deviceType == 4) {
        deviceType = 0;
    }
    _commonDiv.deviceType = deviceType;
    return _commonDiv.deviceType;

}

//�Ž̹���ͨ�Žӿ�
function clientToolTransmit(content, flag) {
//$(".header").css("color","yellow");
//$(".header").append("clientToolTransmit done &nbsp;##&nbsp;");
//$(".header").append("ocx version:"+ocx.GetVersion()+"&nbsp;##&nbsp;<br/><br/><br/>");
    //�ļ���ʽ
    var fc = "";
    if (content != "" && content != null) {
        fc = "{loginInfo:{" + content + "},answerList:[]}";
        //�Ž̹���2httpЭ�����ut
        content = "{" + content + ",ssout:\"" + sso_ut + "\"" + "}";
    } else {
        content = "{" + content + "}";
    }

    var obj = eval('(' + _commonDiv.loginInfo + ')');
    //��¼��¼��
    if (_commonDiv.loginInfo != null && obj.classId == content.classId && obj.classHourId == content.classHourId) {
        //�ͷ�ִ����
        _commonDiv.clientToolInterfaceLock = false;
        return;
    }
    _commonDiv.loginInfo = content;


    //ֻ���ڿζ˲ŷ��͵�¼��
    if (loginStyle != 0) {
        //�ͷ�ִ����
        _commonDiv.clientToolInterfaceLock = false;
        return;
    }
    //��ȡsocketport
    var port = getSocketPort();

    //�ԱȰ汾��ȷ�����÷�ʽ ocx�汾�ﵽ1.0.1.8��Ϊ�Ž̹���2
    if (_common.checkOcxVersion("1.0.1.8") == 1) {
        //�˳������Ž̹��߽ӿ�
        ajaxJson("http://127.0.0.1:" + port, "data=" + content, "gbk", function (r) {
            if (flag == 0) {
                location.href = "gobackmy://";
            }
            return;
        });
    } else if (_common.checkOcxVersion("1.0.1.8") == -1) {
        ocx.WriteInfo("", "clientTool.ini", fc, 0);
        if (flag == 0) {
            location.href = "gobackmy://";
        }
    } else {
        ocx.WriteInfo("", "clientTool.ini", fc, 0);
        //�˳������Ž̹��߽ӿ�
        ajaxJson("http://127.0.0.1:" + port, "data=" + content, "gbk", function (r) {
            if (flag == 0) {
                location.href = "gobackmy://";
            }
            return;
        });
    }
    //�ͷ�ִ����
    _commonDiv.clientToolInterfaceLock = false;
}