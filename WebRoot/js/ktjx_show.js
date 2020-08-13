var ktjx = new KTJX();

//ͬ���ڿ�ģ�����
function KTJX() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.firstMenu = 'ktjx_1'; //��һ���˵���
    this.resComeType = null;//��Դ��� 1 �μ�  2 �ز� 3ѵ�� 4 ��չ
    //yunMenuType �Ƿ�Ϊ ��ʦ������Դ 1.�� 2.��  �������ƶ����ؽ�ʦ���̷���
//    this.typeList=[	{id:"ktjx_RT001",name:"��ѧ�ز�",resComeType:"3",yunMenuType:"0"},
//        {id:"ktjx_RT002",name:"�ҵĿμ�",resComeType:"1",yunMenuType:"1"},
//        {id:"ktjx_RT003",name:"�ҵ��ز�",resComeType:"3",yunMenuType:"1"}
//    ];
    this.typeList = [
        {id: "ktjx_1", name: "�μ�", resComeType: "1"},
        {id: "ktjx_2", name: "�ز�", resComeType: "2"},
        {id: "ktjx_3", name: "ѵ��", resComeType: "3"},
        {id: "ktjx_4", name: "��չ", resComeType: "4"},
        {id: "ktjx_5", name: "���ӽ̲�", resComeType: "5"},
        {id: "ktjx_6", name: "�����ڿΰ�", resComeType: "6"}
    ];
}

//������Ŀ,���������˵���
KTJX.prototype.getRes = function (ksId, _currResTypeName) {

    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //if(this.currResTypeName.length>_pMain.newpagefontsize)this.currResTypeName=this.currResTypeName.substring(0,_pMain.newpagefontsize)+"��";
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+this.currResTypeName+"<span class=\"bgImg\"></span></div>");


    //��ʾ�����˵�
    //ktjx.showQuickTeachThredMenu();
    //ktjx.showMenu();
    ktjx.getKeShi();
}

//�ж��Ƿ���Բ���������Դ
function checkAbleLinkRes() {
    var versionVar = IEVersion();
    if (versionVar == 6 || versionVar == 7 || versionVar == 8) {
        return false;
    } else {
        return true;
    }
}

function IEVersion() {
    var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ���
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //�ж��Ƿ�IE<11�����
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //�ж��Ƿ�IE��Edge�����
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE�汾<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1;//����ie�����
    }
}

//������ఴť
KTJX.prototype.showMore = function () {
    //$(_pMain.getMainLeft()).html('');
    //$('.subMenu').html('');
    //$('.topMenu').html('');
    var menuid = '03.44';
    _pMain.keStyle(menuid);
    ktjx.showMenu(0);
}

//��ʾ�������
//type:1.ѵ����2��ҵ
KTJX.prototype.showPaper = function (type) {
    try {
        ocx.WriteInfo("", "paperAddFlag.ini", "", 0);
    } catch (err) {
    }

    var obj = eval('(' + _commonDiv.loginInfo + ')');
    if (type == 1) {
        var url = transferProtocol_web + _config["ASSEM"] + '/testassemblyui/v1/newteach/practice/' + _config["QBMS"] + '/' + _treeVersion.currentCourseId + '/' + teachernumber + '?ut=' + obj.ssout;
    } else if (type == 2) {
        var url = transferProtocol_web + _config["ASSEM"] + '/testassemblyui/v1/newteach/homework/' + _config["QBMS"] + '/' + _treeVersion.currentCourseId + '/' + teachernumber + '?ut=' + obj.ssout;
    }

    _common.openResPage(screen.width, screen.height, url, 2);

    setTimeout("ktjx.checkPaperResult(" + type + ")", 500);
}

//�ر���������Ļص�
KTJX.prototype.checkPaperResult = function (type) {
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "paperAddFlag.ini");
    } catch (err) {
    }

    if (config_str != "-1" && config_str.length > 1) {
        var json = eval("(" + config_str + ")");
        var result = json.result;
        if (result) {
            //��ѵ����Ŀ
            if (type == 1) {
                var menuid = '03.44';
                _pMain.keStyle(menuid);
                ktjx.showMenu(2);
            } else {
                zy.clickQuickTeach('zy_RT003');
            }
        } else {
            //���ʧ��
            alert('���ʧ��');
            return false;
        }
    } else {
        //û�г���
        return false;
    }
    return false;
}

//��ȡ��ʱ�µ���Դ
KTJX.prototype.getKeShi = function () {
    $('#pageRightNav').hide();
    $('.subMenu').hide();

    var classHourId = _treeVersion.currentClassHourId;
    if (_common.isBlank(classHourId)) {
        //û�п�ʱID
        //console.log('��ʱID����Ϊ�գ�');
        /**
         $(_pMain.getMain()).find('div.middle-box').remove();
         $(_pMain.getMain()).children().show();
         var temphtml=new Array();
         temphtml.push("<div id=\"mainRight\" class=\"rightCon\">");
         temphtml.push("<ul class=\"testList\">");
         temphtml.push("<li><center>"+_common.hasNoRes+"</center></li>");
         temphtml.push("</ul>");
         temphtml.push("</div>");
         $(_pMain.getMain()).html(temphtml.join(""));
         $('#mainRight').css('height',$('#main').height());
         return false;
         */
        var data = null;
        ktjx.getKeShiRes(data);
        return false;
    }
    var url = transferProtocol_web + _config["PLS"] + "/prepare/queryClassHourPackByUserName.do?classHourId=" + classHourId + "&userName=" + teachernumber + '&classHourIcon=1';
    ajaxJson(url, null, "gbk", ktjx.getKeShiRes);

    //var data = '{"result":"1","classHour":{"id":"20180604133624971442524968244","name":"��ʱ1","type":"20180628160213967971316097004","note":"��ʱ1","ksId":"000102","sourceId":"","userName":"34010400010381","sortNum":"1","sysType":1},"linkedResList":[{"id":"20180706154634474645377109351","sourceCode":"20180604133624971442524968244","sourceType":8,"destCode":"20171110092958250471652196010","destType":1,"destTitle":"������ĥ���������졷����ʵ¼ƪ��MP4��","destDesc":"�ӿ���ʵ¼����ԡ������졷һ�ν��п����о����Խ�ʦ�Ϻñ���ָ���˷���","sort":5,"sysType":0,"iconType":"http://plsvcomyf.czbanbantong.com/public/images/typebg/F300.png","iconTitle":"������ĥ","iconX":0,"iconY":0,"page":0,"trueName":"��»�","formatMark":"mp4","mobileFormatMark":"mp4","uploadDate":"2017-11-10","downloadNum":428,"linkType":0,"format":"F300","typeCode":"RT002"},{"id":"20180706154634474645377109351","sourceCode":"20180604133624971442524968244","sourceType":8,"destCode":"20171110092958250471652196010","destType":1,"destTitle":"������ĥ���������졷����ʵ¼ƪ��MP4��","destDesc":"�ӿ���ʵ¼����ԡ������졷һ�ν��п����о����Խ�ʦ�Ϻñ���ָ���˷���","sort":5,"sysType":0,"iconType":"http://plsvcomyf.czbanbantong.com/public/images/typebg/F300.png","iconTitle":"������ĥ","iconX":0,"iconY":0,"page":0,"trueName":"��»�","formatMark":"mp4","mobileFormatMark":"mp4","uploadDate":"2017-11-10","downloadNum":428,"linkType":0,"format":"F300","typeCode":"RT002"}],"msg":"��ѯ������Դ�ɹ���"}';
    //ktjx.getKeShiRes(eval('('+data+')'));
}

KTJX.prototype.getKeShiRes = function (data) {
    //console.log(data);
    var temphtml = new Array();
    if (data && data.result == 1 && data.linkedResList.length > 0) {
        var resArray = new Array();//��ʱ�б�����
        var tqmsInfoArr = new Array();//����Ծ���������
        resArray = data;

        //��ȡpaper��json�ַ���
        var str = '[';
        $.each(data.linkedResList, function (k, v) {
            if (v.destType == 2 || v.destType == 6 || v.destType == 9) {
                str += '{"rcode":"' + v.destCode + '","rsType":"' + v.destType + '"},';
            }
        });
        str = str.trimStr(",");
        str += ']';


        //str = '[]';//�������������ӿ�

        //�ж��Ƿ�������Ŀ�ʱ��
        if (str != '[]') {
            //��ȡ�����������ӿ�(source=1��ȡ��ʱ����������鴫ֵ1)
            var param = '?lessionId=' + data.classHour.ksId + '&username=' + teachernumber + '&classId=' + userclass + '&deviceType=lecture&source=1&papers=' + encodeURIComponent(str);
            var url = transferProtocol_web + _config["QBMS"] + '/tqms/interface/practice/practiceCurriculumResources.action' + param;
            ajaxJson(url, null, "gbk", function (result) {
                if (result && result.success && result.data && result.data.length > 0) {
                    $.each(result.data, function (kk, vv) {
                        var obj = {};
                        obj.typeCode = vv.typeCode;
                        obj.feedbackFlag = vv.feedbackFlag;//�Ƿ��з���
                        obj.degree = vv.hotDegree;//�ȶ�
                        obj.totalNum = vv.totalNum;//����
                        obj.iconTitle = vv.iconTitle;//��Ŀ����
                        obj.iconDesc = vv.iconDesc;//��Ŀ����
                        obj.iconType = vv.iconType;//��ĿͼƬ
                        obj.rcode = vv.rcode;//����Ծ�ID
                        obj.rsType = vv.rsType;//2ϵͳ 6���� 9Ӣ��ͬ����
                        //obj.hwPaperType = vv.hwPaperType;
                        obj.iconID = vv.iconID;
                        obj.iconDesc = vv.iconDesc;
                        obj.rtitle = vv.rtitle;
                        obj.iconShowStyle = vv.iconShowStyle;

                        if (vv.opt.volumeOfPoints && vv.opt.volumeOfPoints.viewUrl && vv.opt.volumeOfPoints.url) {
                            //���ڣ��еǷְ�ť
                            obj.dengfenViewUrl = vv.opt.volumeOfPoints.viewUrl;//Ԥ��
                            obj.dengFenUrl = vv.opt.volumeOfPoints.url;
                            obj.hasDengfen = true;
                        } else {
                            //�޵Ƿְ�ť
                            obj.hasDengfen = false;
                        }

                        if (vv.opt.sendEBook && vv.opt.sendEBook.url) {
                            //���ڣ��з���ƽ�尴ť
                            obj.sendEBookUrl = vv.opt.sendEBook.url;
                            obj.HasSendEBook = true;
                        } else {
                            //�޷���ƽ�尴ť
                            obj.HasSendEBook = false;
                        }
                        tqmsInfoArr[vv.rcode] = obj;
                    })
                    //console.log(tqmsInfoArr);
                    ktjx.showKeshiRes(resArray, tqmsInfoArr);
                } else {
                    ktjx.showKeshiRes(resArray, tqmsInfoArr);
                }
            });
        } else {
            ktjx.showKeshiRes(resArray, tqmsInfoArr);
        }
    } else {
        /**
         temphtml.push("<div id=\"mainRight\" class=\"rightCon\">");
         temphtml.push("<ul class=\"testList\">");
         temphtml.push("<li><center>"+_common.hasNoRes+"</center></li>");
         temphtml.push("</ul>");
         temphtml.push("</div>");
         $(_pMain.getMain()).html(temphtml.join(""));
         $('#mainRight').css('height',$('#main').height());
         $(_pMain.getMain()).find('div.middle-box').remove();
         $(_pMain.getMain()).children().show();
         */
        var arr = new Array();
        var tqmsarr = new Array();
        ktjx.showKeshiRes(arr, tqmsarr);
        //���û���ݣ��������
        //ktjx.showMore();
    }
}


//��ȡapptypeid����
function getAppTypeIdArr(arr, tqmsInfoArr) {
    var result = [];
    var tqmsResult = [];
    for (var i = 0; i < arr.length; i++) {
        if (!_common.isBlank(arr[i].appTypeId) && arr[i].destType != 2 && arr[i].destType != 6 && arr[i].destType != 9) {
            result.push(arr[i].appTypeId);
        }
        if (!_common.isBlank(tqmsInfoArr[arr[i].destCode]) && !_common.isBlank(tqmsInfoArr[arr[i].destCode].iconID) && (arr[i].destType == 2 || arr[i].destType == 6 || arr[i].destType == 9)) {
            tqmsResult.push(tqmsInfoArr[arr[i].destCode].iconID);
        }
    }
    var re = {};
    re.plsResult = result;
    re.tqmsResult = tqmsResult;
    return re;
}

//�ж�aapTypeId�ظ�����
function getSameNum(val, arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            count++;
        }
    }
    return count;
}


//�жϿ�ʱ�����Ƿ���ʾ��ť����ʾ��Щ��ť
KTJX.prototype.checkClassHourButton = function (obj, zuodaUrl, fankui) {
    var html = '';
    var count = 1;//��ť����(Ĭ������ť)

    //html += "<button onclick=ktjx.zuoda('"+zuodaUrl+"',0);>����</button>";

    //�жϷ���
    if (obj.feedbackFlag == 1) {
        if (obj.rsType == 9) {
            //Ӣ���´��ڴ�
            count++;
            html += "<button style=\"CURSOR: pointer\" onclick=openResPageWithClose('" + fankui + "','');stopPropagation(event);>����</button>";
        } else {
            count++;
            html += "<button style=\"CURSOR: pointer\" onclick=ktjx.zuoda('" + fankui + "',1);stopPropagation(event);>����</button>";
        }

    }

    //�жϵǷ�(ֻ���ж��豸���У���������ж�)
    if (obj.hasDengfen) {
        if (getDeviceType() != 0) {
            count++;
            html = html + "<button style=\"CURSOR: pointer\" onclick=ktjx.dengfen('" + obj.dengfenViewUrl + "','" + obj.dengFenUrl + "');stopPropagation(event);>�Ƿ�</button>";
        }
    }

    //�ж��Ƿ�Ϊƽ�����
    if (obj.HasSendEBook) {
        if (obj.rsType != 9 && getIsSchoolbag()) {
            if (getIsHavingClass() == 1) {
                count++;
                html = html + "<button style=\"CURSOR: pointer\" onclick=\"ktjx.sendToPad('" + obj.rsType + "','" + obj.sendEBookUrl + "');stopPropagation(event);\">����ƽ��</button>";
            }
        }
    }


    var result = {};
    result.num = count;
    result.html = html;

    return result;

}

KTJX.prototype.showButton = function (obj) {
    $(obj).toggleClass('aa');
    $(obj).siblings('.bbut').slideToggle();
}


//չʾ��ǰ��ʱ�µĿ�ʱ��
KTJX.prototype.showKeshiRes = function (resArray, tqmsInfoArr) {
    var tmpHtml = '<div class="middle-box"><div class="pad0-25"><ul class="fen-list fen5" >';//������С��� style="width:'+Math.round(window.screen.width*0.95/myZoom.zoom)+'px"
    if (resArray && resArray.linkedResList) {
        var AppTypeIdArr = getAppTypeIdArr(resArray.linkedResList, tqmsInfoArr);
        $.each(resArray.linkedResList, function (k, v) {
            /**
             if(v.destType!=2&&v.destType!=6&&v.destType!=9&&v.typeCode=='RT001'){
					//�ڿι��˽̰�������Դ
					return true;
				}
             */
            if (v.destType == 2 || v.destType == 6 || v.destType == 9) {
                //�����Դ��ť
                //����
                if (_common.isBlank(tqmsInfoArr[v.destCode])) {
                    //�����ϢΪ�գ��쳣����
                    return true;
                } else {
                    tmpHtml += '<li class="classhourlist"><div class="pad5">';
                    if (v.destType == 2 || v.destType == 6) {
                        var t = new Date().getSeconds();
                        data = "?rcode=" + v.destCode + "&t=" + t + "&rsType=" + tqmsInfoArr[v.destCode].rsType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURI(encodeURI(teachername)) + "&areaId=" + areaId;
                        var zuoda = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
                        var fankui = zuoda + "&viewFeedback=1";
                    } else {
                        // 9 Ӣ������
                        var zuoda = transferProtocol_web + _config["ESLEANR"] + '/Device/ShowExamInfoTv?examsid=' + v.destCode + "&username=" + teachernumber + "&ks_code=" + _treeVersion.currentCourseId + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&studentClassid=" + userclass + "&tms=" + _config["TMS"] + "&papername=" + encodeURIComponent(encodeURIComponent("1"));
                        var fankui = transferProtocol_web + _config["ESLEANR"] + '/Device/feedback?examsid=' + v.destCode + "&username=" + teachernumber + "&studentClassid=" + userclass + "&tms=" + _config["TMS"];
                    }

                    //console.log(tqmsInfoArr[v.destCode]);
                    //console.log(zuoda);
                    var re = ktjx.checkClassHourButton(tqmsInfoArr[v.destCode], zuoda, fankui);
                    /**
                     if(re.num == 1){
				        	//ֻ������ť
				        	tmpHtml += '<a onclick="javascript:ktjx.zuoda(\''+zuoda+'\',1)" style="cursor:pointer;">';
				        }else if(re.num>1){
				        	//����һ����ť
				        	tmpHtml += '<a>';
				        }
                     */
                    tmpHtml += '<a onclick="javascript:ktjx.zuoda(\'' + zuoda + '\',0)" style="cursor:pointer;">';
                }
            } else {
                tmpHtml += '<li class="classhourlist"><div class="pad5">';
                //PLS����Դֱ�Ӵ�
                var type = '';
                var playjs = '';
                if (v.destType == 3) {
                    //��ʦ�ļ���
                    var RCode = v.destCode;
                    var RFormatMark = v.formatMark;
                    playjs = "player.getTeacherFolderFile('" + RCode + "','" + RFormatMark + "')";
                } else if (v.destType == 5) {
                    type = 3;//΢��
                    playjs = "player.playResource('" + v.destCode + "'," + type + ",'" + v.formatMark + "')";
                } else {
                    type = 1;
                    playjs = "player.playResource('" + v.destCode + "'," + type + ",'" + v.formatMark + "')";
                }


                //���ӽ̲�
                if ("RT106" == v.typeCode && "xml" == v.formatMark) {
                    playjs = "player.getDZJC('" + v.destCode + "')";
                }
                if (v.format == "F800") {
                    //�ж��Ƿ�Ϊ���ӽ̲�����
                    playjs = "player.checkDZJCplay('" + v.destCode + "','" + v.formatMark + "')";
                }

                /**����60һ�¿ͻ���
                 if(v.destType !==3){
			           	if(v.typeCode == 'RT003'){
			           		playjs=playjs+";"+"ktjx.view('"+v.destCode+"','"+convertHtml(v.destTitle)+"',1)";    	
			           	}
		            }
                 */
                if (v.typeCode == 'RT003') {
                    playjs = playjs + ";" + "ktjx.view('" + v.destCode + "','" + convertHtml(v.destTitle) + "',1)";
                }

                if (v.linkType == 3 && !checkAbleLinkRes()) {
                    playjs = "this.parentElement.nextSibling.style.display='block'";
                }

                //�������û��Դ
                if (v.destType == 10) {
                    if (!checkAbleLinkRes()) {
                        //�Ͱ汾IE
                        playjs = "this.parentElement.nextSibling.style.display='block'";
                    } else {
                        playjs = "window.open('" + v.playUrl + "')";
                    }
                }

                tmpHtml += "<a onclick=\"javascript:" + playjs + "\" style=\"cursor:pointer;\">";
            }
            tmpHtml += '<div class="tabmiddle">';
            var url = 'http://tqmsvcomyf.czbanbantong.com/tqms/mobile/images/icon/gxxl.png';//��ʱ���� v.iconType
            //v.iconType = 'http://pls.youjiaotong.com/public/images/classHour/xml.png';
            if (v.destType == 2 || v.destType == 6 || v.destType == 9) {
                if (tqmsInfoArr[v.destCode].iconType) {
                    var imgurl = transferProtocol_web + _config["QBMS"] + "/tqms/pages/homeworkandtraining/images/icon/classhour/" + tqmsInfoArr[v.destCode].iconType + ".png";
                } else {
                    var imgurl = transferProtocol_web + _config["QBMS"] + "/tqms/pages/homeworkandtraining/images/icon/classhour/gxxl.png";
                }
            } else {
                var imgurl = v.iconType;
            }
            tmpHtml += '<span class="icontup"><img src="' + imgurl + '" style="max-height:60px;"/></span>';
            tmpHtml += '<span class="tabright"><h3>';
            if (v.ext6 && v.ext6 == 'ZYHOT') {
                tmpHtml += '<i class="ico-jing"></i>';
            }
            //��Ŀ����
            /**
             if(_common.isBlank(v.iconTitle)){
					if(_common.isBlank(tqmsInfoArr[v.destCode])){
						var typeTitle = '';
					}else{
						var typeTitle = tqmsInfoArr[v.destCode].iconTitle;
					}
				}else{
					var typeTitle = v.typeTitle;
				}
             */

            //�ж���ʾ��Ŀ���������ļ�����
            if (v.destType == 2 || v.destType == 6 || v.destType == 9) {
                //�����Ŀ�����ж�,���iconIDΨһ,iconShowStyle =2,��������Ϊ��ʱ��ʾ����
                if (_common.isBlank(tqmsInfoArr[v.destCode])) {
                    var appDesc = v.destTitle;
                    tmpHtml += '</h3>';
                } else {
                    if (_common.isBlank(tqmsInfoArr[v.destCode].iconTitle)) {
                        tmpHtml += '</h3>';
                    } else {
                        tmpHtml += tqmsInfoArr[v.destCode].iconTitle + '</h3>';
                    }
                    if (tqmsInfoArr[v.destCode].iconShowStyle == 2 && !_common.isBlank(tqmsInfoArr[v.destCode].iconDesc) && getSameNum(tqmsInfoArr[v.destCode].iconID, AppTypeIdArr.tqmsResult) == 1) {
                        var appDesc = tqmsInfoArr[v.destCode].iconDesc;
                    } else {
                        if (_common.isBlank(tqmsInfoArr[v.destCode].rtitle)) {
                            var appDesc = v.destTitle;
                        } else {
                            var appDesc = tqmsInfoArr[v.destCode].rtitle;
                        }
                    }
                }
            } else {
                tmpHtml += v.iconTitle + '</h3>';
                //PLS��ʱ�������ж�
                if (_common.isBlank(v.appTypeId)) {
                    var appDesc = v.destTitle;
                } else {
                    if (v.appTypeShowType == 2 && !_common.isBlank(v.appTypeDesc) && getSameNum(v.appTypeId, AppTypeIdArr.plsResult) == 1) {
                        //appTypeId���ظ�����appTypeShowType=2��������Ϊ��ʱ��ʾ����
                        var appDesc = v.appTypeDesc;
                    } else {
                        var appDesc = v.destTitle;
                    }
                }

            }


            tmpHtml += '<label class="jieduan-db">' + appDesc + '</label>';
            tmpHtml += '</span></div>';
            tmpHtml += '<div class="tabbttom">';
            if (v.destType == 2 || v.destType == 6 || v.destType == 9) {
                //������ 2ϵͳ�Ծ�6�����Ծ�9����ѵ��
                //ͼ��Ϊ�������ȶ�
                if (_common.isBlank(tqmsInfoArr[v.destCode])) {
                    //tmpHtml += '<div class="bbut"><button>����</button><button>ƽ��</button><button>�Ƿ�</button></div>';
                    tmpHtml += '<span><i class="iconsm hot"></i>0</span><span><i class="iconsm num"></i>0</span>';
                    tmpHtml += '<div></div><div></div><div class="clearfix"></div>';
                } else {
                    if (re.num == 1) {
                        //ֻ������ť
                        tmpHtml += '<span><i class="iconsm num"></i>' + tqmsInfoArr[v.destCode].totalNum + '</span><span><i class="iconsm hot"></i>' + tqmsInfoArr[v.destCode].degree + '</span>';
                        tmpHtml += '<div></div><div></div><div class="clearfix"></div>';
                    } else if (re.num > 1) {
                        //����һ����ť
                        tmpHtml += '<div class="bbut" style="cursor:default">' + re.html + '</div>';
                        tmpHtml += '<span><i class="iconsm num"></i>' + tqmsInfoArr[v.destCode].totalNum + '</span><span><i class="iconsm hot"></i>' + tqmsInfoArr[v.destCode].degree + '</span>';
                        tmpHtml += '<div></div><i class="ico-jj" onclick="ktjx.showButton(this);stopPropagation(event);"></i><div></div><div class="clearfix"></div>';
                    }
                }
                tmpHtml += '</div>';
            } else {
                //ͼ��Ϊ���ͺ��ȶ�(�����ļ�̽��)
                //tmpHtml += '<span><i class="iconsm doc"></i>'+v.formatMark+'</span><span><i class="iconsm hot"></i>'+v.downloadNum+'</span>';
                //tmpHtml += '<div class="clearfix"></div></div>';
                //�����ļ�̽��end
                var tmpButton = '';
                if ("RT106" == v.typeCode && "xml" == v.formatMark) {
                    tmpButton = '';
                } else {
                    if (getIsSchoolbag()) {
                        if (getIsHavingClass() == 1) {
                            var fileType = 1;
                            if (v.destType == 3) {
                                fileType = 2;
                            } else {
                                fileType = 1;
                            }
                            tmpButton = "<button style=\"CURSOR: pointer\" onclick=ypzy.sendToPad('" + v.destCode + "','" + fileType + "','" + v.formatMark + "');stopPropagation(event);>����̽��</button>";
                        }
                    }
                }
                if (tmpButton == "") {
                    //ֻ�в���
                    tmpHtml += '<span><i class="iconsm doc"></i>' + v.formatMark + '</span><span><i class="iconsm hot"></i>' + v.downloadNum + '</span>';
                    tmpHtml += '<div></div><div></div><div class="clearfix"></div>';
                } else {
                    tmpHtml += '<div class="bbut" style="cursor:default">' + tmpButton + '</div>';
                    tmpHtml += '<span><i class="iconsm doc"></i>' + v.formatMark + '</span><span><i class="iconsm hot"></i>' + v.downloadNum + '</span>';
                    tmpHtml += '<div></div><i class="ico-jj" onclick="ktjx.showButton(this);stopPropagation(event);"></i><div></div><div class="clearfix"></div>';
                }
                tmpHtml += '</div>';
            }
            tmpHtml += '</a></div><div class="tishi-bg" style="display:none;">������Դ�ݲ�֧�ֲ��ţ�������������汾��IE10������</div></li>';
        })
    }
    tmpHtml += '<li class="limore"><div class="pad5"><a style="CURSOR: pointer;font-size:1.6em;background-color: rgb(234, 234, 234);color: rgb(153, 153, 153);" onclick="javascript:ktjx.showPaper(1);"><img src="./images/ktjx/znzj.png" class="znzj">�������</a><a style="cursor: pointer;font-size: 1.4em;background-color: rgb(234, 234, 234);color: rgb(153, 153, 153);border-top: solid 1px #ddd;" onclick="javascript:ktjx.showMore();">����...</a></div></li><div class="clearfix"></div>';
    tmpHtml += '</ul></div></div>';

    $(_pMain.getMain()).children().hide();
    $(_pMain.getMain()).html(tmpHtml);

    //ֻչʾǰ14����ʱ��+һ������
    $('.middle-box ul li.classhourlist').each(function (key) {
        if (key > 14) {
            $(this).hide();
        }
    })

    //myZoom.setZoom('.pad0-25');

    //var top = $('.middle-box').css('top');
    //$('.middle-box').css("top",parseInt(top)*myZoom.zoom+'px');
    $('.middle-box').css("top", 140 * myZoom.zoom + 'px');

    //���ݸ߶ȿ���������Ļ
    $(".tabmiddle").css("min-height", Math.round(70 * document.body.clientHeight / 768) + "px");
    $(".tabbttom").css("height", Math.round(32 * document.body.clientHeight / 768) + "px");
    //$(".limore").find('a').css("height",Math.round(112*document.body.clientHeight/768)+"px");
    //alert($(".limore").prev('li').find('a').height());
    //alert($(".classhourlist").eq(0).find('a').eq(0).height());
    var h = $(".classhourlist").eq(0).find('a').eq(0).height();
    if (h != null) {
        $(".limore").find('a').css("height", h / 2 + "px").css("line-height", h / 2 + "px");
        //$(".limore").find('img').css("height",h/2+"px").css("line-height",h/2+"px");
    } else {
        $(".limore").find('a').css("height", "117px").css("height", "117px");
    }
    //setTimeout(function(){$(".limore").find('a').css("height",$(".classhourlist").eq(0).find('a').eq(0).height()+"px");},2000);
}


KTJX.prototype.showQuickTeachThredMenu = function () {
    //��ȡ��̬�˵� ��ʦ�μ����Ž̿μ����ο��μ��Ȳ˵���
    var data = "type=1&menuCode=" + _treeVersion.currentCourseId;
    ajaxJson(transferProtocol_web + _config["PLS"] + "/interface/queryCommonTypeListByType.do", data, "gbk", ktjx.getDynamicMenu)

}
//��̬��ȡ�˵�
KTJX.prototype.getDynamicMenu = function (rdata) {
    //��ȡ��̬�˵� ��ʦ�μ����Ž̿μ����ο��μ�
    var tMenuCode = new Array();
    //������˵���
    if (rdata && rdata.commonTypeList) {
        $(rdata.commonTypeList).each(function () {

            if (tMenuCode.length == 0) {
                ktjx.firstMenu = this.id;
            }
            var id = this.id;
            if (typeof subMenuYouJiaoKey != "undefined") {
                this.name = this.name.replace("�Ž�", subMenuYouJiaoKey);
            }
            tMenuCode.push("<a id='" + id + "' onclick='javascript:ktjx.clickQuickTeach(\"" + id + "\",\"1\");' >" + this.name + "</a>");

        });
    }

    //���������̶��˵�
    for (var i = 0; i < ktjx.typeList.length; i++) {
        var temp = ktjx.typeList[i];
        var id = temp.id;
        var yunMenuType = "";
        if (temp.yunMenuType == "1") {
            yunMenuType = "yunMenuType";
        }
        tMenuCode.push("<a  id='" + id + "' class='" + yunMenuType + "' onclick='javascript:ktjx.clickQuickTeach(\"" + id + "\",\"1\");' >" + temp.name + "</a>");
    }
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();
    $("#" + ktjx.firstMenu).click();


}

//չʾ���ý�ѧ�Ĺ̶��˵�(indexΪҪչʾ�ڼ�����Ŀ��������typeList������)
KTJX.prototype.showMenu = function (index) {
    var tMenuCode = new Array();
    //���������̶��˵�
    for (var i = 0; i < ktjx.typeList.length; i++) {
        var temp = ktjx.typeList[i];
        var id = temp.id;
        var yunMenuType = "";
        if (temp.yunMenuType == "1") {
            yunMenuType = "yunMenuType";
        }
        if (id == "ktjx_6") {
            tMenuCode.push("<a id='" + id + "' style='padding:0;' class='" + yunMenuType + "' onclick='ktjx.clickQuickTeach(\"" + id + "\",\"" + temp.resComeType + "\");' ><img height='40' src='./images/ktjx/return.png'/></a>");
        } else {
            tMenuCode.push("<a id='" + id + "' class='" + yunMenuType + "' onclick='ktjx.clickQuickTeach(\"" + id + "\",\"" + temp.resComeType + "\");' >" + temp.name + "</a>");
        }
    }
    //console.log(tMenuCode);
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();
    //$("#"+ktjx.firstMenu).click();
    $("#" + ktjx.typeList[index].id).click();

}


//�����˵������¼�
KTJX.prototype.clickQuickTeach = function (resflag, resComeType) {
    //��¼��ǰѡ�в˵�
    this.resflag = resflag;
    this.resComeType = resComeType;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".resList").remove();
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#" + resflag).addClass("cur");

    //����PLS�ӿ�
    if (resComeType == 1 || resComeType == 2 || resComeType == 4 || resComeType == 5) {
        var typeCode = "";
        var data = "menuCode=" + _treeVersion.currentCourseId + "&page=1&pageNum=0&listType=1&userName=" + teachernumber;
        if (resComeType == 1) {
            typeCode = "RT003";//�μ�
            data += '&containfile=1';
        } else if (resComeType == 2) {
            typeCode = "RT002,RT004";//�ز�
            data += '&containfile=1';
        } else if (resComeType == 4) {
            typeCode = "RT105";//��չ
            data += '&containfile=1';
        } else if (resComeType == 5) {
            typeCode = "RT106";//���ӽ̲�
        }
        data += "&typeCode=" + typeCode;
        ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiao/publicResInfo.do", data, "gbk", ktjx.parsePlsResList);
    } else if (resComeType == 3) {
        //ѵ��(source=3���������ѵ����ǩ��ֵ3)
        var data = 'lessionId=' + _treeVersion.currentCourseId + '&username=' + teachernumber + '&classId=' + userclass + '&deviceType=lecture&source=3';
        ajaxJson(transferProtocol_web + _config["QBMS"] + "/tqms/interface/practice/practiceCurriculumResources.action", data, "gbk", ktjx.parseTqmsResList);
    } else if (resComeType == 6) {
        //���γɹ���������Դ���б�
        ktjx.getKeShi();
    } else if (resComeType == 7) {
        //�ҵ��ز�
        var data = "parentfcode=&pageindex=1&pagesize=100&kscode=" + _treeVersion.currentCourseId + "&teachernumber=" + teachernumber + "&noforder=2&place=4&resComeType=3";
        ajaxJson(transferProtocol_web + _config["PLS"] + "/teacherfile/getfilelist.do", data, "gbk", ktjx.parseFileResList);
        return;
    }


    return false;

    //�������ϵķ�����������
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

//�°��ȡ���ý�ѧ��Ŀ��ѵ��������Դ
KTJX.prototype.parseTqmsResList = function (rdata) {
    //console.log(rdata);
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata && rdata.success && rdata.data.length > 0) {
        for (var i = 0; i < rdata.data.length; i++) {
            var temp = rdata.data[i];
            var rtitle = temp.rtitle;
            var feedbackFlag = temp.feedbackFlag; //����  0-�� 1-��
            var RFormatMark = temp.iconType;
            var hwPaperType = temp.hwPaperType;//��ҵ�Ծ����� system:ϵͳ�Ծ�;listening:Ӣ��ͬ����
            var RCode = temp.rcode;
            var rsType = temp.rsType;//2ϵͳ 6���� 9����ѵ��
            var jsdata = temp.jsdata;
            var useFlag = temp.useFlag;
            var choiceNum = temp.choiceNum;//ѡ������
            var totalNum = temp.totalNum;//������
            var typeCode = temp.typeCode;//��Ŀ���ƣ�0���� 1�Ž� 2��ʦ 3����


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
            if (rsType == 2) {
                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/xunlian.png\"  />";
            } else if (rsType == 6) {
                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/my.png\"  />";
            }


            var t = new Date().getSeconds();
            data = "?rcode=" + RCode + "&t=" + t + "&rsType=" + rsType + "&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(teachername))) + "&areaId=" + areaId;
            var zuoda = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
            var fankui = zuoda + "&viewFeedback=1";

            //����Ƿ�
            var button = "";//
            button = "<span><a href=\"javascript:ktjx.zuoda('" + zuoda + "',0);\">����</a></span>";

            //�жϵǷְ�ť(ֻ���ж��豸���У���������ж�)
            if (temp.opt.volumeOfPoints && temp.opt.volumeOfPoints.viewUrl && temp.opt.volumeOfPoints.url) {
                if (getDeviceType() != 0) {
                    //0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ  ���豸
                    button = button + "<span><a href=\"javascript:ktjx.dengfen('" + temp.opt.volumeOfPoints.viewUrl + "','" + temp.opt.volumeOfPoints.url + "')\">�Ƿ�</a></span>";
                }
            }

            //�жϷ�����ť
            if (feedbackFlag == 1) {
                button = button + "<span><a href=\"javascript:ktjx.zuoda('" + fankui + "',1);\">����</a></span>";
            } else {
                //button = button + "<span><a style='BACKGROUND: #ccc; cursor: not-allowed;'>����</a></span>";
            }

            //�ж��Ƿ�Ϊƽ�����
            if (temp.opt.sendEBook && temp.opt.sendEBook.url) {
                if (temp.rsType != 9 && getIsSchoolbag()) {
                    if (getIsHavingClass() == 1) {
                        button = button + "<span><a href=\"javascript:ktjx.sendToPad('" + rsType + "','" + temp.opt.sendEBook.url + "');\">���͵�ƽ��</a></span>";
                    } else {
                        //button =button+"<span><a style='BACKGROUND: #ccc; cursor: not-allowed;';>���͵�ƽ��</a></span>";
                    }
                }
            }

            //����Ӣ��
            if (temp.rsType == 9) {
                zhushiTotalNum = "";
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/tin.png\"  />";
                //ƴ�Ӳ��ŷ�����ַ
                // ����/Device/ShowExamInfoTv?username=�û���&truename=��ʵ����&examsid=ѵ��ID&studentClassid=�༶ID&tms=tms��ַ&papername=url������Ծ�����&ks_code=�½�ID
                ///����/Device/feedback?examsid=ѵ��ID&username=�û���&studentClassid=�༶ID&tms=tms��ַ
                zuoda = transferProtocol_web + _config["ESLEANR"] + '/Device/ShowExamInfoTv?examsid=' + RCode + "&username=" + teachernumber + "&ks_code=" + _treeVersion.currentCourseId + "&truename=" + encodeURIComponent(encodeURIComponent(teachernumber)) + "&studentClassid=" + userclass + "&tms=" + _config["TMS"] + "&papername=" + encodeURIComponent(encodeURIComponent("1"));
                fankui = transferProtocol_web + _config["ESLEANR"] + '/Device/feedback?examsid=' + RCode + "&username=" + teachernumber + "&studentClassid=" + userclass + "&tms=" + _config["TMS"];
                //button = "<span><a href=\"javascript:ktjx.zuoda('"+zuoda+"',0);\">����</a><a style='BACKGROUND: #ccc; cursor: not-allowed;'>����</a></span>";
                button = "<span><a href=\"javascript:ktjx.zuoda('" + zuoda + "',0);\">����</a></span>";
                if (feedbackFlag == 1) {
                    button = "<span><a href=\"javascript:ktjx.zuoda('" + zuoda + "',0);\">����</a><a href=\"javascript:openResPageWithClose('" + fankui + "','');\">����</a></span>";
                }
            }

            if (rsType == 6) {
                yifa_pic = "";//�ҵ�Ԥϰ������ʾ"�ѷ�"��ť
            }
            temphtml.push("<li>" + button + imagepic + "<a move=\"right\" href=\"javascript:ktjx.zuoda('" + zuoda + "',0);\" title=\"" + rtitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + rtitle + "</p><b class='leix'>" + zhushiTotalNum + "</b>" + yifa_pic + "</a></li>");
        }
    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    //������Դ���ƿ��
    //$(".zy-tm").css("max-width",$(".zy-tm").width()-75);
    //$(".zy-tm").css("width","auto");

    //temphtml=null;
    //ktjx.pagesize=_pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //_common.splitpage(".testList li",1,ktjx.pagesize,"#pageRightNav");      


    //������Դ���ƿ��
    //ϵͳ�Ծ���ʾ���ú�a/b
    var yiyongWidth = 142;
    if (rsType == 6) {
        //�ҵ��Ծ�ֻ��ʾa/b
        yiyongWidth = 67;
    }
    $(".zy-tm").css("max-width", $(".zy-tm").width() - yiyongWidth);
    $(".zy-tm").css("width", "auto");

    ktjx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //_common.splitpage(".testList li",1,zjxl.pagesize,"#pageRightNav");
    //_common.splitpage(".testList li",1,zjxl.pagesize,"#pageRightNav",null,null,null,"ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a��");
    $("#pageRightNav").html("<div class='zhushi'>ע��ѵ�����ƺ�ģ�a/b����ʾ����ѵ����b���⣬����ѡ����ж���a����</div><DIV class=pages style='float:right;'></DIV><div style='float:right;'><a onclick='ktjx.showPaper(1);'><img width='113' height='30' style='padding-right:5px;' src='./images/ktjx/znzj01.png'/></a></div>");
    _common.splitpage(".testList li", 1, ktjx.pagesize, ".pages", null, null, null, true);
}

//�°��ȡ���ý�ѧ��Ŀ���μ�/�ز�/��չ/���ӽ̲ģ�����Դ
KTJX.prototype.parsePlsResList = function (data) {
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    //console.log(data);
    if (data && ((data.ResInfo && data.ResInfo.length > 0) || (data.teacherFiles && data.teacherFiles.length > 0))) {
        if (data.teacherFiles && data.teacherFiles.length > 0) {
            for (var i = 0; i < data.teacherFiles.length; i++) {
                var temp = data.teacherFiles[i];
                var RTitle = temp.filename;
                var RFormatMark = temp.filetype;
                var RCode = '';
                if (temp.RExt6) {
                    var ext6 = temp.RExt6;
                } else {
                    var ext6 = '';
                }

                //��Ʒ��ԴͼƬ
                var jing = "";
                if (ext6 == "ZYHOT") {
                    jing = "<i class='red'>(��)</i>";
                }

                try {
                    RFormatMark = RFormatMark.toLowerCase();
                } catch (e) {
                }

                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
                if (RFormatMark != "null" && RFormatMark != "") {
                    imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
                }

                var playjs = '';
                var fileType = 1;
                if (temp.c1 && temp.c1 != "") {
                    RCode = temp.c1;
                    playjs = "player.playResource('" + RCode + "',1,'" + RFormatMark + "')";
                    /**����60һ�¿ͻ���
                     if(temp.resType == 1){
		           		playjs=playjs+";"+"ktjx.view('"+v.destCode+"','"+convertHtml(v.destTitle)+"',3)";    	
		           	}
                     */
                    playjs = playjs + ";" + "ktjx.view('" + RCode + "','" + convertHtml(RTitle) + "',3)";
                    fileType = 1;//��ʦ�ļ���
                } else {
                    RCode = temp.fcode;
                    if (temp.storeType = "0") {
                        //��ʦ�ļ���
                        playjs = "player.getTeacherFolderFile('" + RCode + "','" + RFormatMark + "')";
                        fileType = 2;//��ʦ�ļ���
                    }
                }

                //���ӽ̲�
                if ("RT106" == temp.RTypecode && "xml" == RFormatMark) {
                    playjs = "player.getDZJC('" + RCode + "')";
                }
                if (temp.format == "F800") {
                    //�ж��Ƿ�Ϊ���ӽ̲�����
                    playjs = "player.checkDZJCplay('" + RCode + "','" + RFormatMark + "')";
                }

                //playjs=playjs+";"+"ktjx.view('"+RCode+"','"+convertHtml(RTitle)+"')";   
                var buttonHtml = "";
                if (getIsSchoolbag()) {
                    if (getIsHavingClass() == 1) {
                        buttonHtml = "<span><a href=javascript:ypzy.sendToPad('" + RCode + "','" + fileType + "','" + RFormatMark + "');>����̽��</a></span>";
                    }
                }
                temphtml.push("<li>" + buttonHtml + imagepic + "<a  move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + jing + RTitle + "</p></a></li>");
            }
        }
        if (data.gameInfos && data.gameInfos.length > 0) {
            for (var i = 0; i < data.gameInfos.length; i++) {
                var temp = data.gameInfos[i];
                var RTitle = temp.topic;
                var desc = temp.remark;

                var RFormatMark = "html";
                var RCode = temp.RCode;
                if (temp.RExt6) {
                    var ext6 = temp.RExt6;
                } else {
                    var ext6 = '';
                }

                //��Ʒ��ԴͼƬ
                var jing = "";
                if (ext6 == "ZYHOT") {
                    jing = "<i class='red'>(��)</i>";
                }

                try {
                    RFormatMark = RFormatMark.toLowerCase();
                } catch (e) {
                }

                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
                if (temp.typeIcon != "null" && temp.typeIcon != "") {
                    imagepic = "<img width='20' height='20' src=\"" + temp.typeIcon + "/>";
                }


                var playjs = "window.open('" + temp.playUrl + "')";

                var buttonHtml = "";

                temphtml.push("<li>" + buttonHtml + imagepic + "<a  move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + jing + RTitle + "</p></a></li>");
            }
        }
        if (data.ResInfo && data.ResInfo.length > 0) {
            for (var i = 0; i < data.ResInfo.length; i++) {
                var temp = data.ResInfo[i];
                var RTitle = temp.RTitle;
                var desc = temp.RDesc;

                var RFormatMark = temp.RFormatMark;
                var RCode = temp.RCode;
                if (temp.RExt6) {
                    var ext6 = temp.RExt6;
                } else {
                    var ext6 = '';
                }

                //��Ʒ��ԴͼƬ
                var jing = "";
                if (ext6 == "ZYHOT") {
                    jing = "<i class='red'>(��)</i>";
                }

                try {
                    RFormatMark = RFormatMark.toLowerCase();
                } catch (e) {
                }

                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
                if (RFormatMark != "null" && RFormatMark != "") {
                    imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
                }


                var playjs = "player.playResource('" + RCode + "',1,'" + RFormatMark + "')";

                var buttonHtml = "";

                //���ӽ̲�
                if ("RT106" == temp.RTypecode && "xml" == RFormatMark) {
                    playjs = "player.getDZJC('" + RCode + "')";
                } else {
                    if (getIsSchoolbag()) {
                        if (getIsHavingClass() == 1) {
                            var fileType = 1;//�ǽ�ʦ�ļ�����Դ
                            buttonHtml = "<span><a href=javascript:ypzy.sendToPad('" + RCode + "','" + fileType + "','" + RFormatMark + "');>����̽��</a></span>";
                        }
                    }
                }
                if (temp.format == "F800") {
                    //�ж��Ƿ�Ϊ���ӽ̲�����
                    playjs = "player.checkDZJCplay('" + RCode + "','" + RFormatMark + "')";
                }

                //ResInfo��������� ����RTypecode=RT001..֮������ж��ϵķ������ڿμ����ǽ̰������زġ�
                //����courseType�ж��Ƿ����ں�̨���õĿμ�������Դ  ͬ��lessionType�Ǻ�̨���õĽ̰�����

                //����60֮ǰ�ͻ���
                //if(temp.RTypecode=='RT003' && _common.isBlank(temp.courseType)){
                //�μ�
                playjs = playjs + ";" + "ktjx.view('" + RCode + "','" + convertHtml(RTitle) + "',1)";
                //}

                temphtml.push("<li>" + buttonHtml + imagepic + "<a  move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + jing + RTitle + "</p></a></li>");
            }
        }
    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    //������Դ���ƿ��
    $(".zy-tm").css("max-width", $(".zy-tm").width() - 75);
    $(".zy-tm").css("width", "auto");

    temphtml = null;
    ktjx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, ktjx.pagesize, "#pageRightNav");
}

//������Դ�б�
KTJX.prototype.parseResList = function (rdata) {
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
                yong_pic = "<img width='60' height='25' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/yiyong.png' >";
            }

            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
            if (RFormatMark != "null" && RFormatMark != "") {
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
            }

            //playjs="player.playResource('"+RCode+"','2','"+RFormatMark+"','2','"+convertHtml(RTitle)+"',null,null,1,null,'')";
            playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";

            //���ӽ̲�
            if ("RT106" == temp.RTypecode && "xml" == RFormatMark) {
                playjs = "player.getDZJC('" + RCode + "')";
            }
            if (temp.format == "F800") {
                //�ж��Ƿ�Ϊ���ӽ̲�����
                playjs = "player.checkDZJCplay('" + RCode + "','" + RFormatMark + "')";
            }
            //playjs=playjs+";"+"ktjx.view('"+RCode+"','"+convertHtml(RTitle)+"')";
            //RTitle=RTitle+RTitle+RTitle+RTitle;
            temphtml.push("<li>" + imagepic + "<a  move=\"right\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p style='width: 100%;' class=\"zy-tm\">" + jing + RTitle + "</p>" + yong_pic + "</a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    //$("ul.testList li a").css("width",_naUtil.testListWidth); //style='width:"+_naUtil.testListWidth+";'
    //������Դ���ƿ��
    $(".zy-tm").css("max-width", $(".zy-tm").width() - 75);
    $(".zy-tm").css("width", "auto");

    temphtml = null;
    ktjx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, ktjx.pagesize, "#pageRightNav");
}
//�ж��Ƿ�Ϊ���ӽ̲Ĳ�����
KTJX.prototype.playdzjc = function (RCode, RFormatMark, RTitle) {
    var data = "rcode=" + RCode;
    ajaxJson("http://" + _config["PLS"] + "/youjiaoplay/getInfoJson.do", data, "gbk", function (rdata) {

        var playjs = "";
        if (rdata && rdata.infoTypeFormat == 12) {
            playjs = "player.getDZJC('" + RCode + "')";
        } else {
            playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";
        }
        eval(playjs);
    });
}
//�����ʦ�ļ�����Դ�б�
KTJX.prototype.parseFileResList = function (rdata) {
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");

    if (rdata && rdata.data && rdata.data.length > 0) {
        for (var i = 0; i < rdata.data.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.data[i];
            var RCode = temp.rcode;
            var fcode = temp.fcode;
            var C1code = temp.c1;
            var RTitle = temp.filename;
            var RFormatMark = temp.filetype;//����洢��0������Դ���ӣ�1�����ļ�����(2),���屸�����ӣ�3��
            //�ϴ���Դfcode
            //���� c1=rcode
            try {
                RFormatMark = RFormatMark.toLowerCase();
            } catch (e) {
            }
            var playjs = "javascript:player.playResource('" + C1code + "','2','" + RFormatMark + "')";
            if (temp.storetypenum == 0) {
                //storetypenum 0�ϴ� 1ͬ��
                playjs = "javascript:player.getTeacherFolderFile('" + fcode + "','" + RFormatMark + "')";
            }
            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
            if (RFormatMark != "null" && RFormatMark != "") {
                imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
            }
            if (temp.storetypenum == 1 && "xml" == RFormatMark) {
                playjs = "javascript:player.checkDZJCplay('" + C1code + "','" + RFormatMark + "','" + convertHtml(RTitle) + "')";
            }
            //playjs=playjs+";"+"ktjx.view('"+fcode+"','"+convertHtml(RTitle)+"')";
            temphtml.push("<li><small>[" + temp.storetype + "]</small>" + imagepic + "<a title=\"" + temp.filename + "\" href=\"" + playjs + "\" id=\"" + temp.fcode + "\" ><p class=\"zy-tm\">" + temp.filename + "</p>" + "</a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    temphtml = null;
    ktjx.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, ktjx.pagesize, "#pageRightNav");
}

//sourcetype1��ʦ�μ����Ž̿μ�3�ҵĿμ�
KTJX.prototype.view = function (RCode, RTitle, sourcetype) {
    RTitle = _common.cutStr(RTitle, 30);
    ajaxJsonWithoutWait("http://127.0.0.1:" + getSocketPort(), "RCode=" + RCode + "&RTitle=" + RTitle + "&lessionId=" + _treeVersion.currentCourseId + "&sourcetype=" + sourcetype + "&", "gbk", function () {
    });
}
KTJX.prototype.viewOld = function (RCode, RTitle) {
    var sourcetype = 1;
    if (ktjx.resflag == "ktjx_RT002") {
        //�ҵĿμ�
        sourcetype = 3;
    }
    //ֻ����ʦ�μ����Ž̿μ����ҵĿμ���ppt�ŵ��ù�����
    if (ktjx.resComeType == 1) {
        //Ԥ��
        RTitle = _common.cutStr(RTitle, 30);
        ajaxJsonWithoutWait("http://127.0.0.1:" + getSocketPort(), "RCode=" + RCode + "&RTitle=" + RTitle + "&lessionId=" + _treeVersion.currentCourseId + "&sourcetype=" + sourcetype + "&", "gbk", function () {
        });
    }

}


KTJX.prototype.zuoda = function (zuoda, type) {
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
    var url = '';

    var matchintype = getDeviceType();


    //getfplatform_subtype()
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
        url = zuoda + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=" + _macUtil.getMACAdd();
    } else {
        console.log("��ȡ����mac��ַ");
        url = zuoda + "&fplatform_subtype=" + stypeparm + "&lectureEndVersion=" + getSchoolBagVersion() + "&teachComputerMac=";
    }

    if (type == 2) {
        //����
        //url = url+"&loginStyle="+loginStyle;
        eval(openResPageWithClose(zuoda, ""));
    } else {
        //����
        eval(_common.openResPage(screen.width, screen.height, url));
    }

}

KTJX.prototype.dengfen = function (viewUrl, url) {
    try {
        //paperType 0����ѵ�� 1ϵͳѵ��
        //����ѵ���Ƿֵ��ø�����ҵԤ���ӿڣ�ϵͳѵ���Ƿֵ���ϵͳ��ҵԤ���ӿ�
        //var dengfenUrl = transferProtocol_web+_config["QBMS"]+"/online/interface/queryTblxPaper.action?paper_id="+rcode+"&lessionId="+_treeVersion.currentCourseId;
        //if(paperType==0)
        //{
        //    dengfenUrl = transferProtocol_web+_config["QBMS"]+"/online/interface/queryZtlxPaper.action?paper_id="+rcode+"&lessionId="+_treeVersion.currentCourseId;
        //}


        //��ȡ��������
        var domain = _config["QBMS"].substring(_config["QBMS"].indexOf(".") + 1);
        writeLoginInfoCookie("loginInfo", _commonDiv.loginInfo, 1, domain);

        ktjx.zuoda(viewUrl, 2);
        ktjx.openAnswer(url);
        _common.addTjPv("df", teachernumber, userclass, _common.channelid);//pvͳ��
        return;

        /**
         var padStatus = getIsUsingPad();
         if(padStatus!=0  && typeof padStatus != 'undefined')
         {
            //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
            alert(getPadWarnName(padStatus));
            return;
        }
         else
         {
            //�޸������ļ�ƽ������ʹ��
            setIsUsingPad(13);
        }
         //�ͻ�����ʱ�޷�����https
         //var url = transferProtocol_web+_config["QBMS"]+"/online/interface/answerdevice/volumeOfPointsQues.action?paper_id="+rcode+"&lessionId="+_treeVersion.currentCourseId;
         var url= "http://" +_config["QBMS"]+"/online/interface/answerdevice/volumeOfPointsQues.action?paper_id="+rcode+"&lessionId="+_treeVersion.currentCourseId;
         //�Ƿ�
         //���͵�¼��
         ClientAnswer.Setlogins(_commonDiv.loginInfo,transferProtocol_web+_config["PLS"],ocx.GetSpecialFolderPath(100),getDeviceType());
         //�ر�
         ClientAnswer.CloseOcxWindow();
         //��
         ClientAnswer.OpenPaper(url);
         */
    } catch (err) {

    }
}
KTJX.prototype.openAnswer = function (url) {
    isUseClientAnswer = true;
    //paperType 0����ѵ�� 1ϵͳѵ��  +"&type="+paperType
    //var url= transferProtocol_web + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id='+rcode+"&morequestionflag&lessionId="+_treeVersion.currentCourseId;
    //var url= "http://" + _config["QBMS"] + '/online/interface/answerdevice/volumeOfPointsQues.action?paper_id='+rcode+"&morequestionflag&lessionId="+_treeVersion.currentCourseId;
    //���͵�¼��
    ClientAnswer.Setlogins(_commonDiv.loginInfo, transferProtocol_web + _config["PLS"], ocx.GetSpecialFolderPath(100), getDeviceType());
    //�ر�
    ClientAnswer.CloseOcxWindow();
    //��
    ClientAnswer.OpenPaper(url);
}
KTJX.prototype.sendToPad = function (rsType, url) {
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

    $.ajax({
        type: 'post',
        url: transferProtocol_web + _config["TQMS"] + '/api/msg/jxfx/init',
        data: {
            msg: {"lessonId": ktjx.currentKsid, "classId": userclass}
        },
        success: function (data) {
            //console.log(data);
        },
        error: function (e) {
        }
    })

    //���ܱ���������루���ж��Ƿ񱻽��룩
    if (url.indexOf('data={') != -1) {
        var tmpArr = url.split('data=');
        if (tmpArr.length > 1) {
            url = tmpArr[0] + 'data=' + encodeURIComponent(tmpArr[1]);
        }
    }

    var matchintype = getDeviceType();

    //getfplatform_subtype()
    var stypeparm = "";
    if ("2" == matchintype) {
        stypeparm = "NUMBERANSWERDEVICE";
    } else if ("3" == matchintype) {
        stypeparm = "PAD";//pv ����
    }

    ajaxJson(url, null, "gbk", function (rdata) {
        if (rdata && rdata.data && rdata.success) {
            var downloadurl = rdata.data.downloadurl;
            var paper_id = rdata.data.paper_id;

            loginInfo = "teachernumber:\"" + teachernumber + "\",teachername:\"" + encodeURIComponent(encodeURIComponent("")) + "\",schoolId:\"" + schoolId + "\",schoolName:\"" + encodeURIComponent(encodeURIComponent("")) + "\",classId:\"" + userclass + "\"";
            loginInfo += ",downloadurl:\"" + encodeURIComponent(encodeURIComponent(downloadurl)) + "\",paper_id:\"" + paper_id + "\"";

            var url = transferProtocol_web + _config["PLS"] + "/newteach/pad/pad.jsp?type=sendToPad&data={" + loginInfo + "}";

            _common.openResPage(1000, 720, url, 2);

            //�鿴����
            var data = "?rcode=" + paper_id + "&rsType=6&classId=" + _treeVersion.currentCourseId + "&studentClass=" + userclass + "&username=" + teachernumber + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername)) + "&areaId=" + areaId;
            var zuoda = transferProtocol_web + _config["QBMS"] + "/online/interface/newteach/answerdevice/viewClassPracticeDevice.action" + data;
            var fankui = zuoda + "&viewFeedback=1&isEbook=1&fplatform_subtype=" + stypeparm;

            //http://tqms.youjiaotong.com/online/interface/newteach/answerdevice/viewClassPracticeDevice.action?rcode=61d4f252ae284b6aaf9816a3b3400c3f&rsType=6&classId=00010203020402&studentClass=141982115612614619&username=41010155550019&userTrueName=%25E6%2596%25B0%25E8%2580%2581%25E5%25B8%25885%25E5%25B9%25B4%25E7%25BA%25A7%25E5%25AD%25A6%25E7%2594%259F%25E5%25A7%2593%25E5%2590%258D&areaId=1.1.1&viewFeedback=1&isEbook=1&loginStyle=0
            setTimeout("_common.openResPage('" + screen.width + "','" + screen.height + "','" + fankui + "')", 0);
        } else {
            alert("��ȡ���ص�ַʧ�ܣ�");
            setIsUsingPad(0);
        }
    }, 40000, true);

}