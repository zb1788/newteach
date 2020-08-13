function stopPropagation(e) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
}

function nofind(_this) {
    _this.src = "img/default1.png";
    _this.onerror = null;
}

//�ַ����滻
String.prototype.replaceAll = function (AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText)
}
//�ַ�������ǰ��ո�
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trimStr = function (str) {
    return this.replace(eval("/(^" + str + "*)|(" + str + "*$)/g"), "");
};

function readCookie(name) {
    var cookieValue = null;
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
}

function writeCookie(name, value, days) {
    var expire = ";expires=-1";
    if (days && days != null && days > 0) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        expire = ";expires=" + exp.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + ";path=/" + expire;
}

function writeLoginInfoCookie(name, value, days, domain) {
    var expire = "; expires=-1";
    if (days && days != null && days > 0) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        expire = ";expires=" + exp.toGMTString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + "; domain=" + domain + "; path=/" + expire;
}

/********  ���� begin*********/
var resPublishertype = 0;//�ڿ��Ƿ���ʾ������
//ͨ�÷��������
function CommonObj() {
    this.hasNoRes = "���޶�Ӧ����";
    this.settingClass = "�������ð༶��";
    this.currServerPath;
    this.cssName;
    this.teacherId;
    this.interfaceurl;
    this.channelid;//��Ŀid
    this.dirCode;//��ǰѡ����ԴĿ¼id
    this.iePath = null;
    //���п�Ŀ����
    this.sectionMap = [{id: "0001", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0002", name: "��ѧ", use_stage: "0001,0002,0003"}
        , {id: "0003", name: "Ӣ��", use_stage: "0001,0002,0003"}
        , {id: "0004", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0005", name: "��ѧ", use_stage: "0001,0002,0003"}
        , {id: "0006", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0007", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0008", name: "��ѧ", use_stage: "0001,0002,0003"}
        , {id: "0009", name: "�����뷨��", use_stage: "0001,0002,0003"}
        , {id: "0010", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0011", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0012", name: "����", use_stage: "0001,0002,0003"}
        , {id: "0013", name: "��ʷ", use_stage: "0001,0002,0003"}
        , {id: "0014", name: "��Ϣ����", use_stage: "0001,0002,0003"}
        , {id: "0015", name: "ͨ�ü���", use_stage: "0001,0002,0003"}
        , {id: "0016", name: "����", use_stage: "0001,0002,0003"}];
    //����ѧ�ζ���
    this.stageName = {"0001": "Сѧ", "0002": "����", "0003": "����"};
    //�����꼶����
    this.gradeMap = {"0001": {id: "0001", name: "һ�꼶"}, "0002": {id: "0002", name: "���꼶"}};
    this.termMap = [{id: "0001", name: "��ѧ��"}, {id: "0002", name: "��ѧ��"}];
    this.socketUrlPort = -1;
}

var _common = new CommonObj();
//���downOcx�汾�����:cversionҪ�ȶ԰汾��;return 0ʧ��,1���ڻ���ڣ�-1С��(�汾�Ŷ�����ͬ��ζ�Ĵ�)
CommonObj.prototype.checkOcxVersion = function (cversion) {
    if (cversion && cversion != null && cversion.trim().length > 0) {
        try {
            var nowversion = ocx.GetVersion();//��ǰocx�汾
            if (nowversion != null && nowversion.trim().length > 0) {
                var nvArr = nowversion.split(".");
                var cvArr = cversion.split(".");
                if (nvArr.length == cvArr.length) {
                    for (var vi = 0; vi < cvArr.length; vi++) {
                        var nvai = Number(nvArr[vi]);
                        var cvai = Number(cvArr[vi]);
                        if (nvai == cvai) {
                            if (vi == (cvArr.length - 1)) {
                                //ȫ��
                                return 1;
                            }
                        } else if (nvai > cvai) {
                            //��ǰ���ڱȶ԰汾��
                            return 1;
                        } else {
                            //��ǰС�ڱȶ԰汾��
                            return -1;
                        }
                    }
                } else if (nvArr.length > cvArr.length) {
                    //�汾�ų��Ĵ�
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return 0;
            }
        } catch (e) {
            return 0;
        }
    } else {
        return 0;
    }
}

CommonObj.prototype.compareVersion = function (version1, version2) {
    varsion1 = _common.strTrim(version1);
    varsion2 = _common.strTrim(version2);

    var nvArr = version2.split(".");
    var cvArr = version1.split(".");


    if (nvArr.length > cvArr.length) {
        var len = nvArr.length - cvArr.length;
        for (var i = 0; i < len; i++) {
            cvArr.push(0);
        }
    } else if (nvArr.length < cvArr.length) {
        var len = cvArr.length - nvArr.length;
        for (var i = 0; i < len; i++) {
            nvArr.push(0);
        }
    }
    //�ڿζ�ר�ã����жϵڶ�λ
    cvArr.splice(1, 1);
    nvArr.splice(1, 1);
    for (var vi = 0; vi < cvArr.length; vi++) {
        var nvai = Number(nvArr[vi]);
        var cvai = Number(cvArr[vi]);

        if (nvai == cvai) {
            if (vi == (cvArr.length - 1)) {
                //ȫ��
                return 0;
            }
        } else if (nvai > cvai) {
            //verson2����version1
            return 1;
        } else {
            return -1;
        }
    }
}
//�Ƚϰ汾��С version2����version1 1 ����0 version2С��version1 -1 ʧ�ܷ��ؿ�
CommonObj.prototype.compareVersionBak = function (version1, version2) {
    if (version1 && version1 != null && version1.trim().length > 0) {
        try {
            if (version2 != null && version2.trim().length > 0) {
                var nvArr = version2.split(".");
                var cvArr = version1.split(".");
                if (nvArr.length == cvArr.length) {
                    for (var vi = 0; vi < cvArr.length; vi++) {
                        var nvai = Number(nvArr[vi]);
                        var cvai = Number(cvArr[vi]);
                        if (nvai == cvai) {
                            if (vi == (cvArr.length - 1)) {
                                //ȫ��
                                return 0;
                            }
                        } else if (nvai > cvai) {
                            //��ǰ���ڱȶ԰汾��
                            return 1;
                        } else {
                            //��ǰС�ڱȶ԰汾��
                            return -1;
                        }
                    }
                } else if (nvArr.length > cvArr.length) {
                    //�汾�ų��Ĵ�
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return "";
            }
        } catch (e) {
            return "";
        }
    } else {
        return "";
    }
}
//��ȡ��Ӧid�Ŀ�Ŀ����
CommonObj.prototype.getSection = function (sectionid) {
    for (var i = 0; i < this.sectionMap.length; i++) {
        if (this.sectionMap[i].id == sectionid) {
            return this.sectionMap[i];
        }
    }
    return null;
}
//�űҴ�����ýӿ�,u�Ҵ���code,��������,��Ӧ������Դid
CommonObj.prototype.addUb = function (ucode, desc, rid) {
    if (_common.isBlank(ucode)) {
        return;
    }
    var descParm = "";
    if (!_common.isBlank(desc)) {
        descParm = encodeURIComponent(encodeURIComponent(desc))
    }
    var rcode = "";
    if (!_common.isBlank(rid)) {
        rcode = "&r=" + rid;
    }
    //var data="a="+teachernumber+"&ut=2&ac="+areaId+rcode+"&at=u&c="+ucode+"&i="+descParm;
    var data = "sys=UB&code=UB.01&a=" + teachernumber + "&ac=" + areaId + "&at=u&c=" + ucode + "&n=1&ut=2&i=" + descParm;
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/trains.jsp?" + data;

    $.ajax({
        url: url,
        type: 'get',
        scriptCharset: 'gbk',
        success: function (re) {

        },
        error: function (e) {

        }
    })
}

//��Դ�Ƽ�
function sendRecommend(resType, resId) {
//��PLS�ӿ�
//http://jk.youjiaotong.com/pls6/youjiao/saveTuiJianXClass.do
//?userName=41010122220001&userType=2&resId=20150114185841224807826367074&resType=2&sendToClass=140860047002520425&truename=%E6%95%99%E5%B8%882
//�ڼ��� 2015/1/21 13:53:39
//truename ʹ��js��������
//��Դ���ͣ�1����Դ��2�ļ���
    var limitGrade = null;//_vsp.getCurrentVersion().gradeId;
    _commonDiv.openWindow(1, "�Ƽ���Դ", "��ѡ��༶��", function (selclassArray) {
        var sendToClass = new Array();
        for (var i = 0; i < selclassArray.length; i++) {
            sendToClass.push(selclassArray[i].classId);
        }
        var tdata = "userName=" + teachernumber + "&userType=2&resId=" + resId + "&resType=" + resType + "&sendToClass=" + sendToClass.join(",") + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&schoolId=" + schoolId;
        ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiao/saveTuiJianXClass.do", tdata, "GBK", function (rdata) {
            if (rdata.failCount > 0) {
                _commonDiv.tip("����ʧ�ܣ�");
                _commonDiv.closeWindow(2500);
            } else {
                if (rdata.msg) {
                    _commonDiv.tip(rdata.msg);
                } else {
                    _commonDiv.tip("���ͳɹ���");
                }
                //�Ƽ�+U��
                _common.addUb("u_tuijianziyuan", "�ڿζ��Ƽ���Դ", resId);
                _commonDiv.closeWindow(2000);
            }
        });
    }, true, null, limitGrade);
}

//�ַ���ת��dom����
function createXml(str) {
    if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(str);
        return xmlDom;
    } else {
        return new DOMParser().parseFromString(str, "text/xml");
    }
}

//�Ƚ�ʱ�䷵��ʱ���,ʱ���ʽΪ�ַ�����yyyy-mm-dd HH:mm:ss,������Ĭ�ϵ�ǰʱ��
function compareTime(startDate, endDate) {
    if (_common.isBlank(startDate) && _common.isBlank(endDate)) {
        //ʱ�䲻��Ϊ��
        return null;
    } else {
        var allStartDate = null;
        var allEndDate = null;
        if (!_common.isBlank(startDate)) {
            var startDateTemp = startDate.split(" ");
            var arrStartDate = startDateTemp[0].split("-");
            var arrStartTime = startDateTemp[1].split(":");
            var month = parseInt(arrStartDate[1], 10) - 1;//�·�0-11
            if (arrStartTime[2] == null) {
                arrStartTime[2] = "00"
            }
            ;
            allStartDate = new Date(arrStartDate[0], month, arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
        } else {
            //allStartDate=new Date();//�ͻ���ʱ�����׳��ִ���,151028��Ϊҳ�������ʱ��nowtimes
            allStartDate = new Date(nowtimes);
        }
        if (!_common.isBlank(endDate)) {
            var endDateTemp = endDate.split(" ");
            var arrEndDate = endDateTemp[0].split("-");
            var arrEndTime = endDateTemp[1].split(":");
            var month = parseInt(arrEndDate[1], 10) - 1;//�·�0-11
            if (arrStartTime[2] == null) {
                arrStartTime[2] = "00"
            }
            ;
            allEndDate = new Date(arrEndDate[0], month, arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);
            allEndDate = strToDate(endDate);
        } else {
            //allEndDate=new Date();//�ͻ���ʱ�����׳��ִ���,151028��Ϊҳ�������ʱ��nowtimes
            allEndDate = new Date(nowtimes);
        }
        return (allEndDate.getTime() - allStartDate.getTime());
    }
}

CommonObj.prototype.getIconName = function (rtype) {
    if (typeof (rtype) != "undefined" && rtype != null) {
        rtype = rtype.toLowerCase();
    }
    var iconTypes = " 264avi, 264ts, amr, avi, bmp, caj, css, doc, docx, ept, exe, flv, folder, gif, h264, htm, html, ico, jpeg, jpg, mp3, mp4, mpeg, mpeg1, mpeg2, mpeg4, pdf, png, pps, ppt, pptx, psd, rar, rm, rmvb, swf, txt, wav, wma, wmv, xls, xlsx, xml, zip,";
    if (iconTypes.indexOf(rtype) == -1) {
        rtype = "blank";
    }
    if (_common.cssName == "dianxinxuhong") {
        rtype = _common.cssName + "/" + rtype;
    }
    return rtype;
}
//ostr���滻�ַ�����str1�滻���ݣ�str2�滻�������ַ�
CommonObj.prototype.replaceAllStr = function (ostr, str1, str2) {
    //��֧��Ŀ�����Դ���滻���ᵼ����ѭ��
    if (str2.indexOf(str1) > -1) {
        return ostr;
    }
    while (ostr.indexOf(str1) > -1) {
        ostr = ostr.replace(str1, str2);
    }
    return ostr;
}
//ȥ�����ҿո�
CommonObj.prototype.strTrim = function (str) {
    str = str.replace(/(^��*)|(^\s*)/g, "");
    return str;
}
//����������Ƿ��Ѵ��ڵ�ǰ��Ŀ
CommonObj.prototype.isExit = function (objArray, objValue) {
    if (objArray == null || objValue == null) {
        return false;
    }
    for (var i = 0; i < objArray.length; i++) {
        if (objArray[i] == objValue) return true;
        else continue;
    }
    return false;
}
//�ж��ַ���������Ƿ�Ϊnull�ջ�undefined
CommonObj.prototype.isBlank = function (tStr) {
    //��undefined
    if (typeof (tStr) == "undefined") {
        return true;
    }
    //��null
    if (tStr == null) {
        return true;
    }
    //�ǿ��ַ���
    if (typeof (tStr) == "string" && tStr.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return true;
    }
    return false;
}
//�Ҳ�����ҳ����
CommonObj.prototype.splitpage = function (selectmark, pagenum, pagesize, targetSPDiv, defaultTreeNode, clickTargetNode, hasNoNodeTitle, withoutPages) {
    try {
        var istart = pagesize * (pagenum - 1);
        var iend = pagesize * pagenum;
        var count = istart, currId = null;//count:��һ��   currId:Ĭ�ϴ�����
        var targetobj = null; //������Ķ���
        $(selectmark).each(function (num) {
            if (num < istart || num >= iend) {
                $(this).hide();
            } else {
                $(this).show();

                //Ĭ�ϴ�����һ���ڵ�
                if (num == istart) {
                    targetobj = $(this).find("a").first();
                    if (targetobj.length == 0) {
                        istart++;
                    }
                }
                //�������Ĭ�Ͻڵ㣬����Ĭ�Ͻڵ�
                if (defaultTreeNode != null && $(this).children("a").attr("id") == defaultTreeNode) {
                    targetobj = $(this).children("a");
                }

            }

        });
        //clickTargetNode �Ƿ񴥷�Ĭ�Ͻڵ㣬���������ҳ�򴥷�
        if (clickTargetNode != null && clickTargetNode != "null" && clickTargetNode != "undefined") {
            if (targetobj != null && targetobj != "undefined") {
                targetobj.click();
                targetobj.focus();
            }
            //�Ҳ������Ե���Ľڵ�
            else {
                if (hasNoNodeTitle == null || hasNoNodeTitle == "undefined")
                    hasNoNodeTitle = _common.hasNoRes;
                $(_pMain.getMainRight()).html("<ul class='testList'><li><center>" + hasNoNodeTitle + "</center></li></ul>");
            }

        }

        var allpagenum = Math.ceil($(selectmark).length / pagesize);
        var mainRighthtmlbody = "";
        if (allpagenum >= 1) {
            if (pagenum > 1) {
                mainRighthtmlbody += "<a id=\"_nextpage\" title=\"��һҳ\" href=\"#\" onclick=\"_common.splitpage('" + selectmark + "'," + (pagenum - 1) + "," + pagesize + ",'" + targetSPDiv + "',null,'" + clickTargetNode + "','" + hasNoNodeTitle + "')\" >&lt;</a>";
            } else {
                mainRighthtmlbody += '<a href="#" title=\"��һҳ\" class="disabled">&lt;</a>';
            }
            if (pagenum < allpagenum) {
                mainRighthtmlbody += "<a id=\"_perpage\" title=\"��һҳ\" href=\"#\" onclick=\"_common.splitpage('" + selectmark + "'," + (pagenum + 1) + "," + pagesize + ",'" + targetSPDiv + "',null,'" + clickTargetNode + "','" + hasNoNodeTitle + "')\" >&gt;</a>";
            } else {
                mainRighthtmlbody += '<a href="#" title=\"��һҳ\" class="disabled">&gt;</a>';
            }
        }

        if (withoutPages != true) {
            $(targetSPDiv).html("<div class=\"pages\">" + mainRighthtmlbody + "</div>");
        } else {
            $(targetSPDiv).html(mainRighthtmlbody);
        }

    } catch (e) {
        alert(e);
    }


}
//�����Ƚ�ȡ�ַ���,����str����ȡ�ַ�������󳤶ȣ��Ƿ�Ͼ䣬�Ƿ����ʡ�Ժ�
CommonObj.prototype.cutStr = function (tStr, ilength, sentenceflag, ifEllipsis) {
    if (this.isBlank(ifEllipsis)) {
        ifEllipsis = false;
    }
    if (this.isBlank(sentenceflag)) {
        sentenceflag = false;
    }
    if (tStr.length > ilength) {
        var tempResult = null;
        if (sentenceflag && tStr.indexOf("��") > 0 && tStr.indexOf("��") < ilength) {
            tempResult = tStr.substring(0, tStr.indexOf("��"));
        } else {
            if (ifEllipsis) {
                //����ʡ�Ժŵ���������ٶ��1
                tempResult = tStr.substring(0, ilength - 1) + "..";
            } else {
                tempResult = tStr.substring(0, ilength);
            }
        }
        return tempResult;
    } else {
        return tStr;
    }
}
//_common.getIP()
CommonObj.prototype.getIP = function () {
    return alert(document.getElementById("teachIpAddress").value);
}
CommonObj.prototype.formatTwoStr = function (anum) {
    anum = anum + "";
    if (anum.length == 1) {
        anum = "0" + anum;
    }
    return anum;
}
//_common.count(Ŀ¼id)
CommonObj.prototype.count = function (dirCode) {
    //http://192.168.104.196:3129/stat/a.html?c=�û��ʺ�&cookie=2014101112312312&channelid=21.04&rc=&mc=��ԴĿ¼��
    var adate = new Date();
    var irand = Math.random() * 999999999;
    if (irand < 99999999) {
        irand = irand + 100000000;
    }
    irand = Math.floor(irand);
    var smonth = this.formatTwoStr(adate.getMonth() + 1);
    var sday = this.formatTwoStr(adate.getDate());
    var shours = this.formatTwoStr(adate.getHours());
    var sminutes = this.formatTwoStr(adate.getMinutes());
    var sseconds = this.formatTwoStr(adate.getSeconds());

    var url = transferProtocol_web + _config["STAT_PV"] + "/stat/a.html?"
    url += 'c=' + this.teacherId;//�û��ʺ�
    url += '&cookieid=' + adate.getFullYear() + smonth + sday + shours + sminutes + sseconds + adate.getMilliseconds() + irand;//cookieid
    url += '&channelid=' + this.channelid;//channelid
    url += '&rc=';//��Դ
    url += '&mc=' + dirCode;//��Ŀ���
    //alert(url);
    //alert(document.getElementById('iframe_count').src);

    document.getElementById('iframe_count').src = url;
// alert(document.getElementById('iframe_count').src);
};
//_common.countRes(��Դid) ��Դͳ�ƣ���ԴĿ¼ÿ����Ŀ������գ�Ŀ¼������Ǽ�¼��_common.dirCode;
CommonObj.prototype.countRes = function (resCode) {
    //http://192.168.104.196:3129/stat/a.html?c=�û��ʺ�&cookie=2014101112312312&channelid=21.04&rc=&mc=��ԴĿ¼��
    var adate = new Date();
    var irand = Math.random() * 999999999;
    if (irand < 99999999) {
        irand = irand + 100000000;
    }
    irand = Math.floor(irand);
    var smonth = this.formatTwoStr(adate.getMonth() + 1);
    var sday = this.formatTwoStr(adate.getDate());
    var shours = this.formatTwoStr(adate.getHours());
    var sminutes = this.formatTwoStr(adate.getMinutes());
    var sseconds = this.formatTwoStr(adate.getSeconds());

    var url = transferProtocol_web + _config["STAT_PV"] + "//stat/a.html?";
    //var url="http://statpvhenan.czbanbantong.com//stat/a.html?";
    url += 'c=' + teachernumber;//�û��ʺ�
    url += '&cookieid=' + adate.getFullYear() + smonth + sday + shours + sminutes + sseconds + adate.getMilliseconds() + irand;//cookieid
    url += '&channelid=' + this.channelid;//channelid
    url += '&rc=' + resCode;//��Դ
    url += '&mc=' + _common.dirCode;//��Ŀ���
    url += '&&so=C';//so=c��ʾ���Է��ʣ�so=p��ʾ�ֻ����ʣ�so=d��ʾƽ�����

    //ajaxJson(url,null,"utf-8",function(result){});
    document.getElementById('iframe_count').src = url;

};

CommonObj.prototype.addTjPv = function (act, teachernumber, userclass, channelid) {
    var irand = Math.random() * 999999999;
    if (irand < 99999999) {
        irand = irand + 100000000;
    }
    irand = Math.floor(irand);
    var url = transferProtocol_web + _config["STAT_PV"] + "/stat/a.html?c=" + teachernumber + "&cookieid=" + irand + "&channelid=" + channelid + "&rc=&mc=&so=tls&act=" + act + "&con=" + userclass;
    //$.getScript(url,function(){var result = pvres;});
    $.getScript(url, function () {
    });
}

//_common.setTeacherId()
CommonObj.prototype.setTeacherId = function (teacherId) {
    this.teacherId = teacherId;
};
//_common.getTeacherId()
CommonObj.prototype.getTeacherId = function () {
    return this.teacherId;
};


//_common.getCurrServerPath() ��÷�����·��
CommonObj.prototype.getCurrServerPath = function () {
    return this.currServerPath;
};
//���÷�����·��
CommonObj.prototype.setCurrServerPath = function (path) {
    this.currServerPath = path;
};

CommonObj.prototype.setCssName = function (cssName) {
    this.cssName = cssName;
};
//_common.getCssName()
CommonObj.prototype.getCssName = function () {
    return this.cssName;
};


//��������·�� _common.getMainTeachSeverPath();
CommonObj.prototype.getMainTeachSeverPath = function () {
    if ("error" == main_teach_path) return '';
    else return main_teach_path;
};

function getMainTeachSeverPath() {
}

//�˳�ϵͳ _common.exitSystem();
CommonObj.prototype.exitSystem = function () {
    location.href = "close://";
};
//ϵͳ��ʱ _common.timeout(xmlHttp);
CommonObj.prototype.timeout = function (req) {
    if (req != null && req != "undefined") {
        //alert(xmlHttp.responseText=="");

        if (req.responseText == "") {
            top.location.href = "gobackmy://";
        }//��ʱ
    } else {

        top.location.href = "gobackmy://";//��ʱ
    }
};
//_common.createId();
CommonObj.prototype.createId = function (row, line) {
    return "index_" + row + "_" + line;
};

function getSocketUrlPort() {
    var port = -1;
    try {
        if (_common.socketUrlPort != -1) {
            port = _common.socketUrlPort;//alert("_common.socketUrlPort:"+port)
        } else {
            port = ocx.GetVcomiePort();
            _common.socketUrlPort = port;
            //alert("ocx.GetVcomiePort:"+port);
        }
    } catch (e) {
    }
    return port;
}

//��ʾ��Դ
CommonObj.prototype.openResPage = function (width, height, url, type) {
    //type 1 socket 2 window.location.href=newUrl;
    if (url == null || width == null || height == null) return;
    url += "&loginStyle=" + loginStyle;
    if (url.indexOf('http') != 0) {
        url = basePath + url;
    }
    if (loginStyle == 0) {
        var newUrl = "mybrowser://width:" + width + "&&height:" + height + "@@" + url;
        /*window.location.href=newUrl;
            return;*/

        var port = getSocketUrlPort();
        //
        if ((type && type == 2) || port == -1 || port == 0) {
            window.location.href = newUrl;
        } else {
            ajaxJson("http://127.0.0.1:" + port, "socketUrl=" + newUrl + "&endSocket", "gbk", function (r) {
                return;
            });
        }
    } else {
        var iTop = (window.screen.availHeight - 30 - height) / 2;
        //��ô��ڵ�ˮƽλ��
        var iLeft = (window.screen.availWidth - 10 - width) / 2;

        var param = "height=" + height + ",width=" + width + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no, status=no,z-look=yes";
        if (height == screen.height) {
            param = "toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no,z-look=yes";
        }
        if (url.indexOf("?") !== -1) {
            url += "&loginStyle=" + loginStyle;
        } else {
            url += "?loginStyle=" + loginStyle;
        }
        window.open(url, "��Դ����", param);
    }
};
CommonObj.prototype.openByIE = function (url) {
    if (loginStyle == 0) {
        if (null == this.iePath || "" == this.iePath) {
            this.iePath = this.getIEPath();
            if ("" == this.iePath) {
                alert("����ie���������");
                return;
            }
        }
        var path = '\"' + this.iePath + '\"' + " " + url;
        var ret = ocx.playFile(path);
        //return ret;
    } else {
        if (url.indexOf("?") !== -1) {
            url += "&loginStyle=" + loginStyle;
        } else {
            url += "?loginStyle=" + loginStyle;
        }
        window.open(url);
    }
}
CommonObj.prototype.getIEPath = function () {
    try {
        return document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\IEXPLORE.EXE\\");
    } catch (e) {
        return "C:\\Program Files\\Internet Explorer\\iexplore.exe";
    }
}
CommonObj.prototype.getCMSData = function (url, successFunc) {
    $.ajax({
        url: url,
        dataType: "script",
        scriptCharset: "utf-8",
        success: successFunc
    });
}

/*********  ���� end*********/


/********  ҳ�������� begin*********/
var _pm = new PagMemoryObj();

function PagMemoryObj() {
    this.pageFlag = 0;
}

//��ݼ��������: ���뵱ǰ�������еĻҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-֪ʶ��չ 3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ   _pm.putActMainPage(1)
PagMemoryObj.prototype.putActMainPage = function (pageFlag) {
    this.pageFlag = pageFlag;
};
//ȡ����ǰ�������еĻҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-֪ʶ��չ 3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ
PagMemoryObj.prototype.getActMainPage = function () {
    return this.pageFlag;
};
/*********  ҳ�������� end*********/


/********  ���� begin*********/
var _mask = new MaskObj();

function MaskObj() {
    this.id = "maskAll";
}

//�����ֲ� _mask.openMask()
MaskObj.prototype.openMask = function () {
    //alert("style:"+ document.getElementById(this.id).style.display);
    document.getElementById(this.id).style.display = "block";
};
//�ر����ֲ�
MaskObj.prototype.closeMask = function () {
    document.getElementById(this.id).style.display = "none";
};
//_mask.isVisible()�Ƿ�ɼ��� true �ɼ���false���ɼ�
MaskObj.prototype.isVisible = function () {
    //alert("style:"+ document.getElementById(this.id).style.display);
    if ("block" != document.getElementById(this.id).style.display) {
        //alert("style:"+ document.getElementById(this.id).style.display);
        return false;
    } else {
        return true;
    }
    alert();
};
/*********  ����  end*********/


/********  ҳ������ begin*********/
var _pMain = new PageMainObj();

function PageMainObj() {
    this.id = "bg";
    this.height = 500;
    this.menupagesize = 15;//��Ŀ��ҳ
    this.contentpagesize = 15;//���ݷ�ҳ
    this.pagefontsize = Math.floor((screen.width - 415) / 24);
    this.newpagefontsize = Math.floor((screen.width - 415 + 350) / 24);
    if (this.pagefontsize < 1) {
        this.pagefontsize = 5;
    }
}

//��ȡ������Ŀ����
PageMainObj.prototype.getSecendMenuHtml = function (currendid) {
    if (!currendid) return;
    var secendmenu = "";
    for (var i = 0; i < _naUtil.secendMainMenuList.length; i++) {
        var mainCell = _naUtil.secendMainMenuList[i];
        var currendids = currendid.split(".");
        if (currendids.length == 2) {
            if (mainCell.menuid.indexOf(currendid) >= 0) {
                if (secendmenu == "") secendmenu += '<li class="on">';
                else secendmenu += '<li>';
                secendmenu += '<a menuid="' + mainCell.menuid + '" move="top" href="#" onclick=' + mainCell.method + '  name="menu_cell">' + mainCell.name + '</a></li>';
            }
        } else {
            if (mainCell.menuid.indexOf(currendids[0] + "." + currendids[1]) >= 0) {
                if (mainCell.menuid == currendid) secendmenu += '<li class="on">';
                else secendmenu += '<li>';
                secendmenu += '<a menuid="' + mainCell.menuid + '" move="top" href="#" onclick=' + mainCell.method + '  name="menu_cell">' + mainCell.name + '</a></li>';
            }
        }
    }//end of for
    return secendmenu;
}
//��ʦ��չ��ʽ�����div _pMain.keStyle()
PageMainObj.prototype.keStyle = function (currendid) {
    /****�޸���ʽ begin*******/
    var css = "containers setBg1";
    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
    var secendmenu = this.getSecendMenuHtml(currendid);
    $("#secendmenu").html(secendmenu);
    if (secendmenu == "") {
        $(".topMenu").hide();
    } else {
        $(".topMenu").show();
    }

    var h = "<div class=\"middle-box\"></div><div class=\"mainLeft fl\" id=\"mainLeft\"></div><div class=\"mainRight fl\"><div class=\"rightCon\" id=\"mainRight\"></div></div>";
    h += "<div class=\"clearfix\"></div>";
    this.getMain().innerHTML = h;
    //��ʾ�γ�
    //$("#topCourseName").show();
    $("#pageRightNav").show();
    //�������򱣳־���
    $(".floatDiv").css("margin-left", -353 * myZoom.zoom);
    //�汾ѡ�񣬸㲻����bottom��ͬ�ֱ��ʲ�һ������
    //if(myZoom.zoom>1.9){
    //    $(".pos-list02").css("zoom",2);
    //    $(".pos-list02").css("bottom","120px");
    //}
    $(".mainLeft").css("width", 0);
    $(".rightCon").css("margin-left", 0);

    //���ÿ��
    $(".containers").css("width", myZoom.baseWidth);

    this.getCurrentHeight();
    if (secendmenu == "") {
        //�޶�����Ŀ ����ҳ��߶�����Ӧ
        $(".main").css("height", this.height);
        $(".mainLeft").css("height", this.height);
        $(".mainRight").css("height", this.height);
        $(".rightCon").css("height", this.height);
        this.height = this.height;
    } else {
        //����ҳ��߶�����Ӧ
        $(".main").css("height", this.height - 40);
        $(".mainLeft").css("height", this.height);
        $(".mainRight").css("height", this.height);
        $(".rightCon").css("height", this.height);
        this.height = this.height - 40;
    }

    //�ر�ֽ�ʵ��⹤����
    if (loginStyle == 0) {
        try {
            ClientAnswer.CloseOcxWindow();
        } catch (err) {

        }
    }
};
PageMainObj.prototype.getCurrentHeight = function () {
    //this.height=$(window).height()-230;
    //������ʾ����߼�����Դ�б�߶�
    //Ĭ�ϸ߶�-�����ߣ��ײ���
    this.height = 768 - 150 - 110 - myZoom.toolHeight - 45;
    //this.height=(768-190)*myZoom.zoom-myZoom.toolHeight;
    this.height += myZoom.extraHeight;
    this.menupagesize = parseInt((this.height - 40) / 30);
    this.contentpagesize = parseInt((this.height - 85) / 38);//-85
    this.newcontentpagesize = parseInt((this.height - 50) / 41);//-85
    //console.log(this.height+'|'+this.newcontentpagesize);
    if ($("#secendmenu").html() == "") {
        //this.menupagesize=this.menupagesize+1;
        this.contentpagesize = this.contentpagesize + 1;
    }
};
PageMainObj.prototype.setSplitePageHeight = function (height) {
    if (height == undefined || height == null) {
        height = 0;
    }
    _pMain.height += height;
    $(".main").css("height", _pMain.height);
    $(".mainLeft").css("height", _pMain.height);
    $(".mainRight").css("height", _pMain.height);
    //$(".rightCon").css("height",_pMain.height);
}
PageMainObj.prototype.hideSubMenu = function () {
    var height = 40;
    if (height == undefined || height == null) {
        height = 0;
    }
    _pMain.height += height;
    $(".subMenu").hide();
    $(".main").css("height", _pMain.height);
    $(".mainLeft").css("height", _pMain.height);
    $(".mainRight").css("height", _pMain.height);
    $(".rightCon").css("height", _pMain.height);
}

PageMainObj.prototype.changePageHeight = function () {
    /*var kj_tmDiv=document.getElementById("kj_tmDiv");
         if($("#secendmenu").html()==""){
         $(".pageLeft").css("top",this.height-10);
         if(typeof(kj_tmDiv)!="undefined"&&kj_tmDiv!=null){
         //��������Ŀ
         $(".pageRight").css("top",this.height-40);
         }else{
         $(".pageRight").css("top",this.height-10);
         }
         }else{
         $(".pageLeft").css("top",this.height-48);
         //����Ҳ���������Ŀ,������߷�ҳ�߶�
         if($(".subMenu").html() && $(".subMenu").html().length>0){
         $(".pageRight").css("top",this.height-83);
         }else{
         $(".pageRight").css("top",this.height-48);
         }
         }*/
}
PageMainObj.prototype.changeCloseHeight = function () {

}
//_pMain.usbStyle()
PageMainObj.prototype.usbStyle = function () {
    var css = "containers setBg3";
    document.getElementById(this.id).className = css;
};
//_pMain.folderStyle()
PageMainObj.prototype.folderStyle = function () {
    var css = "containers setBg5";
    document.getElementById(this.id).className = css;
};
//_pMain.netToolsStyle()
PageMainObj.prototype.netToolsStyle = function () {
    var css = "containers setBg5";
    document.getElementById(this.id).className = css;
};


//_pMain.liveStyle() ֱ����ʽ
PageMainObj.prototype.liveStyle = function () {
    var css = "containers setBg7";
    document.getElementById(this.id).className = css;
};


//_pMain.getMain()
PageMainObj.prototype.getMain = function () {
    return document.getElementById("main");
};
//_pMain.getMainLeft()
PageMainObj.prototype.getMainLeft = function () {
    return document.getElementById("mainLeft");
};

//_pMain.getMainRight()
PageMainObj.prototype.getMainRight = function () {
    return document.getElementById("mainRight");
};
PageMainObj.prototype.getRightMenu = function () {
    return document.getElementById("mainRight");
};
//_pMain.getRightMenu()   <ul class="rightMenu" id="rightMenu"></ul>
PageMainObj.prototype.getRightMenu = function () {
    return document.getElementById("rightMenu");
};
//_pMain.getRightResList()   <ul class="resList" id="resList"></ul>//�Ҳ���Դ
PageMainObj.prototype.getRightResList = function () {
    return document.getElementById("resList");
};
// _pMain.getRightResPage()   <div class="page" id="resPage"></div>//��Դ��ҳ
PageMainObj.prototype.getRightResPage = function () {
    return document.getElementById("resPage");
};
/********* ҳ������ end*********/


/*******checkBox Tools******/
var _checkBox = new CheckBoxTools();

function CheckBoxTools() {
    //this.id="";
}


/*�õ�ѡ�е�CheckBoxֵ,���ص�������,�ָ�  _checkBox .getCheckBoxvalue(param)*/
CheckBoxTools.prototype.getCheckBoxvalue = function (objField) {

    var idvalue = "";
    if (typeof (objField) != "undefined") {
        if (typeof (objField.length) == "undefined") {
            if (objField.checked == true) idvalue = objField.value;
        } else {
            for (var i = 0; i < objField.length; i++) {
                if (objField[i].checked == true) {
                    if (idvalue == "")
                        idvalue = objField[i].value;
                    else
                        idvalue = idvalue + "," + objField[i].value;
                }
            }
        }
    }
    return idvalue;
}
/*�õ�CheckBox�Ƿ�ѡ���˶��������ѡ�е�checkbox�ĸ���*/
//_checkBox.getCheckBoxSelectCount(param)
CheckBoxTools.prototype.getCheckBoxSelectCount = function (objField) {

    var idvalue = 0;
    if (typeof (objField) != "undefined") {
        if (typeof (objField.length) == "undefined") {
            if (objField.checked == true) idvalue = 1;
        } else {
            for (var i = 0; i < objField.length; i++) {
                if (objField[i].checked == true) {
                    idvalue = idvalue + 1;
                }
            }
        }
    }
    return idvalue;
}

///_checkBox.getAllCheckBoxProperty(param,propertyName)
CheckBoxTools.prototype.getAllCheckBoxProperty = function (objField, propertyName) {

    var idvalue = "";
    if (typeof (objField) != "undefined") {
        if (typeof (objField.length) == "undefined") {
            if (objField.checked == true) idvalue = objField.value;

        } else {
            for (var i = 0; i < objField.length; i++) {
                // alert("propertyName:"+propertyName);
                var propertyValue = objField[i].getAttribute(propertyName);
                //alert("propertyValue:"+propertyValue);
                if (idvalue == "")
                    idvalue = propertyValue;
                else
                    idvalue = idvalue + "," + propertyValue;

            }
        }
    }
    return idvalue;
}//end of function


/*�õ�ѡ�е�CheckBoxֵ��ѡ��״̬,���ص�������,�ָ�  _checkBox.getAllCheckBoxCheckedStatus(param)*/
CheckBoxTools.prototype.getAllCheckBoxCheckedStatus = function (objField) {

    var idvalue = "";
    if (typeof (objField) != "undefined") {
        if (typeof (objField.length) == "undefined") {
            if (objField.checked == true) idvalue = objField.value;
        } else {
            for (var i = 0; i < objField.length; i++) {
                if (objField[i].checked == true) {
                    if (idvalue == "")
                        idvalue = '1';
                    else
                        idvalue = idvalue + "," + '1';
                } else {
                    //alert('not ture ,and the idvalue is'+idvalue);
                    if (idvalue == "")
                        idvalue = '0';
                    else
                        idvalue = idvalue + "," + '0';
                }
                //alert( 'idvalue '+i+':   '+ idvalue);
            }//end of for
        }
    }
    return idvalue;
}//end of function
//ת��ΪHTML��ʾ����
function convertHtml(str) {
    try {
        if (typeof (str) != "undefined" && str != null) {
            str = str.replaceAll("\"", "��").replaceAll("'", "��");
        }
        return str;
    } catch (e) {
    }
    return str;
}

//������˫����ת�崦��
function filterContent(str) {
    try {
        if (typeof (str) != "undefined" && str != null) {
            str = str.replace('"', '\\"');
            str = str.replace("'", "\\'");
            //str=str.replaceAll('\"','��').replaceAll("'","��");
        }
        return str;
    } catch (e) {
    }
    return str;
}

function showOrHide(flag) {
    if (flag == 1) {
        document.getElementById("top").style.display = "block";
        document.getElementById("below").style.display = "block";
    }
    if (flag == 2) {
        document.getElementById("top").style.display = "none";
        document.getElementById("below").style.display = "none";
    }
}

//���Ż�ȡ���ص�ַ
function getLoadAddress(url, callback, type) {
    //1 ��Դ 2��ʦ�ļ��� 3��ʦ΢��
    if (typeof (type) == "undefined") {
        type = 1;
    }

    ajaxJsonWithoutWait(url, null, "utf-8", function (rdata) {
        var flist = null;
        if (type == 1) {
            if (rdata && rdata.jsonList && rdata.jsonList.length > 0 && rdata.jsonList[0].list && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                flist = rdata.jsonList[0].list;
                for (var i = 0; i < flist.length; i++) {
                    flist[i].file_name = flist[i].filepath.replace("/", "");
                    flist[i].path = handleLoadAddress(flist[i].path);
                }
            } else if (rdata.errormsges) {
                flist = "û�пɲ��ŵ���Դ";
                try {
                    var ecode = rdata.errormsges.rcode.ecode;
                    if (ecode) {
                        if (ecode == "2" || ecode == "7") {
                            flist = data.errormsges.rcode.errmsg;
                        }
                    }
                } catch (e) {

                }
            }
        } else if (type == 2) {
            if (rdata && rdata.list && rdata.list.length > 0 && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                flist = rdata.list;
                for (var i = 0; i < flist.length; i++) {
                    flist[i].file_name = flist[i].filepath.replace("/", "");
                    flist[i].path = handleLoadAddress(flist[i].path);
                }
            } else if (rdata.errormsges) {
                flist = "û�пɲ��ŵ���Դ";
                try {
                    var ecode = rdata.errormsges.rcode.ecode;
                    if (ecode) {
                        if (ecode == "2" || ecode == "7") {
                            flist = data.errormsges.rcode.errmsg;
                        }
                    }
                } catch (e) {

                }
            }
        } else if (type == 3) {
            if (rdata.path && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                flist = '[{"path":"' + rdata.path + '","file_name":"' + rdata.filepath.replace("/", "") + '"}]';
                flist = eval('(' + flist + ')');
                for (var i = 0; i < flist.length; i++) {
                    //���ص�ַ��Ӳ���cd=shouke
                    flist[i].path = handleLoadAddress(flist[i].path);
                }
            } else if (rdata.errormsges) {
                flist = "û�пɲ��ŵ���Դ";
                try {
                    var ecode = rdata.errormsges.rcode.ecode;
                    if (ecode) {
                        if (ecode == "2" || ecode == "7") {
                            flist = data.errormsges.rcode.errmsg;
                        }
                    }
                } catch (e) {

                }
            }
        }
        callback(flist);
    }, null, null, "callback");
}

function handleLoadAddress(url) {
    if (typeof url == "undefined" || url == null) {
        return "";
    }
    url = url + "&cd=shouke";
    return url;
}

/*******checkBox Tools******/