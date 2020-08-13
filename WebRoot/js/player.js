var player = new PlayerObj();

function PlayerObj() {//���������󣬴򿪸�����Դ����¼�
    this.code = null;//��Դ����
    this.type = {};//��Դ�����б�
    this.ip = "";//IP��ַ
    this.currIndex = 0;//�������ص��ļ������
    this.currentfile;//�������ص��ļ�
    this.filearray = new Array();//��ǰ�ļ��б�
    this.filesavepath = null;//�ļ�����·��
    this.OnProccess = null;//���ȸ����¼�
    this.finishDownLoad = null;//����״̬�仯
    this.errfilesize = 0;//�����ļ�����
    this.progress = null;//���ؽ���
}

//********************************************���ñ�����Դ����*************************************************************
//����cookie
PlayerObj.prototype.checkUt = function () {
    var value = this.getCookie("sso_ut");
    if (null == value && "" != sso_ut && null != sso_ut) {
        writeCookie("sso_ut", sso_ut, 1);
    }
}
//��ȡcookie
PlayerObj.prototype.getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
PlayerObj.prototype.playResource = function (rcode, type, RFormat, startTime) {

    //��鴫��ut
    this.checkUt();
    //ͳ����Դ�㲥
    _common.countRes(rcode);

    maskAll.style.display = 'block';
    if (startTime == "undefined" || startTime == null) startTime = "";
    var playType = "";
    var target = ""
    var width = 620, height = 515;
    var channelid = "";
    try {
        //channelid=$(_naUtil.selectMenu).attr("menuid");
        channelid = _common.channelid;
    } catch (e) {
    }
    if (this.type["mp3"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����mp3
        width = 500;
        height = 345;
        playType = "play/mp3/mp3.jsp?channelid=" + channelid;
    } else if (this.type["mp4"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����mp4
        height = 590;
        //url1+="&startTime="+startTime+"&endTime="+endTime;
        playType = "play/mp4/mp4.jsp?&startTime=" + startTime + "&channelid=" + channelid;
    } else if (this.type["video"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//������Ƶ
        height = 590;
        playType = "play/mp4/mp4.jsp?&startTime=" + startTime + "&channelid=" + channelid;
    } else if (this.type["flash"].indexOf(RFormat.toUpperCase()) >= 0) {//����flash
        height = screen.height;
        width = screen.width;
        playType = "play/flash/flash.jsp?channelid=" + channelid;
    } else if (this.type["pic"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����ͼƬ
        height = "620";
        width = "705";
        playType = "play/img/img.jsp?channelid=" + channelid;
        //playType += "extral=12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
    } else if (",HTML,".indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����ͼƬ
        //���ص�ַ
        var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?channelid=" + channelid;
        url += "&rcode=" + rcode;
        url += "&userName=" + teachernumber;
        url += "&filterType=0&allowPcMain=1";
        url += "&outType=1";//1Ϊjson 2 xml
        ajaxJson(url, null, "utf-8", function (rdata) {
            if (rdata && rdata.jsonList && rdata.jsonList.length > 0 && rdata.jsonList[0].list) {
                var file = rdata.jsonList[0].list[0];
                if (file && typeof (file.format) == "undefined" || file.format.toLowerCase() == "html") {
                    var url = file.path;
                    if (url.indexOf("sso_ip") !== -1 && url.indexOf("sso") !== -1) {
                        url += "&ut=" + sso_ut;
                    }
                    window.open(url);
                    setTimeout(function () {
                        maskAll.style.display = 'none';
                    }, 800);//������������ص�ǰ�˵�
                } else {
                    player.playResource(rcode, type, file.format);
                }

            } else {
                var errorMsg = 'û�пɲ��ŵ���Դ';
                if (rdata.errormsges) {
                    try {
                        var ecode = rdata.errormsges.rcode.ecode;
                        if (ecode) {
                            if (ecode == "2" || ecode == "7") {
                                errorMsg = data.errormsges.rcode.errmsg;
                            }
                        }
                    } catch (e) {

                    }
                }
                alert(errorMsg);
                setTimeout(function () {
                    maskAll.style.display = 'none';
                }, 800);//������������ص�ǰ�˵�
            }
        });
        return;
    } else if (this.type["txt"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//�����ı�
        height = screen.height;
        width = screen.width;
        playType = "play/txt/txt.jsp?channelid=" + channelid;
    } else if (this.type["ept"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//������Ƶ
        width = 620;
        height = 590;
        //�°��ڿζ� eptFlagΪ1 �ɰ�Ϊ2 clientVersionδ����
        /*try {
         if (ocx.GetClientVersion() > clientVersion) {
         eptFlag = "1";
         } else {
         eptFlag = "2";
         }
         } catch(e) {
         eptFlag = "2";
         }*/
        playType = "play/ept/ept.jsp?eptFlag=1";

    } else {//����������
        this.getCommonFile(rcode, type, RFormat);
        return;
    }

    if (target == "") {
        target = playType + "&rcode=" + rcode + "&teachernumber=" + teachernumber;
    }

    _common.openResPage(width, height, target);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}

//��Դ����������
PlayerObj.prototype.playRes = function (rcode, type, RFormat, filetype, filename, startTime, endTime, opentype, videotype, catalogId) {
    //��鴫��ut
    this.checkUt();
    //ͳ����Դ�㲥
    _common.countRes(rcode);

    maskAll.style.display = 'block';
    if (catalogId == "undefined" || catalogId == null) catalogId = "";
    if (filetype == "undefined" || filetype == null) filetype = "";
    if (startTime == "undefined" || startTime == null) startTime = "";
    if (endTime == "undefined" || endTime == null) endTime = "";
    /*
    //����ie��ַ����512��SCRIPT122�쳣����
    if(filename.length>14)filename=filename.substring(0,14)+'...';
    */
    var channelid = "";
    try {
        channelid = $(_naUtil.selectMenu).attr("menuid");
    } catch (e) {
    }
    filename = encodeURIComponent(encodeURIComponent(filename));
    var url0 = transferProtocol_web + _config["PLS"] + '/newteach/getXMLPath.do?';
    var url1 = "";//��Ƶ���Ÿ��Ӳ���
    var width = 620, heights = 515;
    var eptFlag = "0";
    if (RFormat == "") {
        alert("ȱ����Դ��ʽ����������Դ���ļ�!");
        return;
    }
    if (this.type["mp3"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����mp3
        width = 500;
        heights = 345;
    } else if (this.type["mp4"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����mp4
        heights = 590;
        url1 += "&startTime=" + startTime + "&endTime=" + endTime;
    } else if (this.type["video"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//������Ƶ
        heights = 590;
        url1 += "&startTime=" + startTime + "&endTime=" + endTime;
    } else if (this.type["flash"].indexOf(RFormat.toUpperCase()) >= 0) {//����flash
        heights = screen.height;
        width = screen.width;
    } else if (this.type["pic"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//����ͼƬ
        heights = "620";
        width = "705";
    } else if (this.type["txt"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//�����ı�
        heights = screen.height;
        width = screen.width;
    } else if (this.type["ept"].indexOf("," + RFormat.toUpperCase() + ",") >= 0) {//������Ƶ
        width = 620;
        heights = 590;
        //�°��ڿζ� eptFlagΪ1 �ɰ�Ϊ2 clientVersionδ����
        /*try {
            if (ocx.GetClientVersion() > clientVersion) {
                eptFlag = "1";
            } else {
                eptFlag = "2";
            }
        } catch(e) {
             eptFlag = "2";
        }*/
        url1 += '&eptFlag=1';
    } else {//����������
        this.getCommonFile(rcode, type, RFormat, filetype, filename, catalogId, 2);
        return;
    }
    url0 += "catalogId=" + catalogId;
    url0 += "&ksId=" + rcode;
    url0 += "&format=" + RFormat;
    url0 += "&filetype=" + filetype;
    url0 += "&type=" + type;
    url0 += "&cusip=" + ip;
    //url0+="&filename="+filename;
    url0 += "&username=" + teachernumber;
    url0 += "&areaCode=" + areaCode;
    url0 += "&sso_ut=" + sso_ut;
    url0 += "&channelid=" + channelid;
    url0 += url1;
    _common.openResPage(width, heights, url0);
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 800);//������������ص�ǰ�˵�
}
//�����ļ�������Ϣ
PlayerObj.prototype.getCommonFile = function (rcode, type, RFormat) {
    TB_show('test', 100, 650);
    try {
        if (upload.style.display == "") return;
    } catch (e) {
        alert(e)
    }
    try {
        mask.style.display = "";
        upload.style.display = "";
        uploadlist.innerHTML = "";
    } catch (e) {
    }
    __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";


    this.OnProccess = this.updatePos_CommonFile;
    this.finishDownLoad = this.finishDownLoad_CommonFile;


    //���ص�ַ
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0";
    url += "&outType=1";//1Ϊjson 2 xml

    /**
     if(type == 2){
   		var url = transferProtocol_web+_config["PLS"]+"/teacherfile/nplayfile.do?ids="+rcode+"&outType=1";
   	}else{
   	    //���ص�ַ
        var url = transferProtocol_web+_config["PLS"]+"/youjiao2/doMutiplePlay.do?";
        url +="rcode="+rcode;
        url +="&userName="+teachernumber;
        url +="&filterType=0";
        url +="&outType=1";//1Ϊjson 2 xml
   	}
     */
    //ֻ��ppt������ļ�����
    if ((",ppt,pptx,").indexOf("," + RFormat.toLowerCase() + ",") == -1) {
        url += "&allowPcMain=1";//�Ƿ�ֻ�������ļ� &allowPcMain=1
    }
    getLoadAddress(url, this.downloadCommonFile);
    //ajaxJson(url,null,"gbk",this.downloadCommonFile);
}
//���س����ļ�
PlayerObj.prototype.downloadCommonFile = function (data) {
    //�����ص��ļ���ʽ
    var filterFormat = ",pdf,";//�����ִ�Сд���Զ��ſ�ͷ�ͽ��������ָ�ʽ�Զ��ŷָ� ���� ,mp3,mp4,png,
    player.filearray.length = 0;
    var list = null;
    try {
        player.filesavepath = ocx.GetMyDocumentPath() + "\\vcomDownload\\";
    } catch (e) {
    }
    /*if(data!=null&&data!="undefined"&&data.list!=null&&data.list!=null){
        list=data.list;
    }*/
    list = data;
    if (list == null) {
        setTimeout(function () {
            __openfile.innerHTML = "û�пɲ��ŵ���Դ....</font>";
            __openfile.innerHTML = list + "</>";
            maskAll.style.display = 'none';
        }, 3000);//������������ص�ǰ�˵�
    } else if (typeof (list) == 'string') {
        setTimeout(function () {
            __openfile.innerHTML = list + "</>";
            maskAll.style.display = 'none';
        }, 3000);//������������ص�ǰ�˵�
    } else {
        if (list && list.length > 0) {
            if (typeof (list[0].format) == "undefined") {
                _common.openByIE(list[0].path);
                return;
            }
            //��ȡ�ļ��б�
            for (var i = 0; i < list.length; i++) {
                var res = list[i];
                var path = res.path;
                var name = res.file_name;
                var format = res.format;

                if (filterFormat.indexOf(("," + format.toLowerCase() + ",")) != -1) {
                    //���ļ�Ϊppt��ʽ�Ķ��ļ��Ź���
                    if ((",ppt,pptx,").indexOf("," + list[0].format.toLowerCase() + ",") != -1) {
                        continue;
                    }
                }
                //name="/"+name;
                var file = {"id": "file_" + i, "url": path, "path": name, "index": i};
                player.filearray.push(file);
            }
            var table = '<div><table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="' + player.fileProgressID + '">';
            table += '<tr class="gray">';
            table += '<td><p id="file_0_pro" ></p></td>';
            table += '<td class="kd2" style="font-size: 14px;" id="file_pos">15%</td>';
            table += '<td style="padding-right: 15px;"><img src="' + transferProtocol_web + _config["PLS"] + '/teacher/images/laji.gif" id="file_0_img"></td>';
            table += '</tr>';
            table += '</table></div>';
            cleaninserthtml();
            uploadlist.innerHTML = table;
            player.progress = new Progress("file_0_pro", 0, 100, 0, 1, new ProgressStyle(470, 10, "#009999", "#00CCCC"));
            player.progress.create();
            if (player.filearray.length > 0) {
                player.currIndex = 0;
                player.currentfile = player.filearray[0];
                ClearSaveDirectory(player.filesavepath);
                ocx.StartDownload(player.currentfile.url, player.filesavepath + player.currentfile.path.replace(/\//g, "\\"));
            }
        }
    }
    maskAll.style.display = 'none';
}
//���½�����
PlayerObj.prototype.updatePos_CommonFile = function (pos, speed) {
    try {
        var currentspeed;
        //speed �ĵ�λ�� �ֽ�/��
        if (speed > 1024 * 1024)
            currentspeed = (speed / (1024 * 1024)).toFixed(2) + "MB/S";
        else if (speed > 1024)
            currentspeed = (speed / 1024).toFixed(2) + "KB/S";
        else if (speed < 0)  //�����Ѿ�ֹͣ
            currentspeed = "";
        else
            currentspeed = speed + "Bytes/S";
        if (this.filearray.length == 1) {
            this.progress.setPosition(pos);
            document.getElementById("file_pos").innerHTML = pos + "%";
        } else {
            if (pos == 100) {
                pos = parseInt(100 / this.filearray.length * (this.currIndex + 1 - this.errfilesize));
                this.progress.setPosition(pos);
                document.getElementById("file_pos").innerHTML = pos + "%";
            } else {
                var tempos = parseInt((this.currIndex - this.errfilesize) * (100 / this.filearray.length) + (100 / this.filearray.length * pos * 0.01));
                this.progress.setPosition(tempos);
                document.getElementById("file_pos").innerHTML = tempos + "%";
            }
        }
        if (pos == 100) {
            document.getElementById("file_0_img").src = transferProtocol_web + _config["PLS"] + "/teacher/images/success.gif";
        }
    } catch (e) {
    }
}
//����״̬�����仯
PlayerObj.prototype.updateState = function (state, errMsg) {
    switch (state) {
        case 1:
            break;
        case 2:
            break;
        case -1:
            this.errfilesize++;
            try {
                document.getElementById(this.currentfile.id + "_sta").innerHTML = "���س���:" + errMsg + "&nbsp;&nbsp;&nbsp;<a href='javascript:' onclick=\"window.open('" + transferProtocol_web + _config["PLS"] + "/teacher/frame/help.htm')\">����</a>";
            } catch (e) {
                if (__openfile)
                    __openfile.innerHTML = "<font style=\"color: green;\">�򿪳���:" + errMsg + "....</font>";
            }
            this.finishDownLoad();
            break;
        case 3:
            this.finishDownLoad();
            break;
        case 4:
            //stateLabel.value="�Ѿ�ֹͣ";
            //alert("�Ѿ�ֹͣ");
            break;
    }
}
//�������
PlayerObj.prototype.finishDownLoad_CommonFile = function () {
    if (upload.style.display == "none") {
        return;
    }
    if (this.currIndex == (this.filearray.length - 1)) {
        __openfile.innerHTML = "<font style=\"color: green;\">���ڴ���Դ�����Ժ�....</font>";
        if (this.filearray.length == 1) {
            PlayOneFile(this.filesavepath + this.currentfile.path.replace(/\//g, "\\"));
        } else if (this.filearray.length > 1) {
            PlayOneFile(this.filesavepath + this.filearray[0].path.replace(/\//g, "\\"));
        }
    } else {
        for (var i = 0; i < this.filearray.length; i++) {
            if (this.filearray[i].id == this.currentfile.id && i < (this.filearray.length - 1)) {
                this.currIndex = i + 1;
                this.currentfile = this.filearray[i + 1];
                if (i >= 3) {
                    uploadlist.scrollTop = (i - 2) * 40;
                }
                ocx.StartDownload(this.currentfile.url, this.filesavepath + this.currentfile.path.replace(/\//g, "\\"));
                break;
            }
        }
    }
}
//********************************************��ʦ�ļ�����Դ����***********************************************************
//����ģ���ʦ�ļ����ļ�������Ϣ
PlayerObj.prototype.getYPTeacherFolderFile = function (ids, type) {
    this.code = ids;
    this.OnProccess = this.updatePos_TeacherFolderFile;
    this.finishDownLoad = this.finishDownLoad_TeacherFolderFile;
    if (ids == null || ids == "") {
        alert("��ѡ���ļ�!");
        return;
    }
    if (player.type["pic"].toLowerCase().indexOf("," + type + ",") >= 0) {
        player.playRes(ids, '-2', 'jpg');
        return;
    }
    try {
        TB_show('test', 300, 650);
    } catch (e) {
    }
    mask.style.display = "";
    upload.style.display = "";
    filedowntype = 2;
    __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";
    var data = "ids=" + ids + "&virtualDirectory=" + virtualDirectory + "&teachernumber=" + teachernumber + "&teacherjyjg=" + teacherjyjg + "&parentfcode=" + _fileUtil.currParentFcode + "&areaCode=" + areaCode;
    var url = transferProtocol_web + _config["PLS"] + "/newteach/nplayfile.do?" + data;
    ajaxJson(url, null, "gbk", this.downloadTeacherFolderFile);
    //player.getCommonFile(ids,2,type);
}
//������ģ���ʦ�ļ����ļ�������Ϣ
PlayerObj.prototype.getTeacherFolderFile = function (ids, type) {

    this.code = ids;
    this.OnProccess = this.updatePos_TeacherFolderFile;
    this.finishDownLoad = this.finishDownLoad_TeacherFolderFile;
    if (ids == null || ids == "") {
        alert("��ѡ���ļ�!");
        return;
    }

    var data = "ids=" + ids + "&areaCode=" + areaCode + "&teachernumber=" + teachernumber;
    var url = transferProtocol_web + _config["PLS"] + "/teacherfile/nplayfile.do?ids=" + ids + "&outType=1";
    //var url=transferProtocol_web+_config["PLS"]+"/newteach/nplayfile.do?"+data;
    if (player.type["pic"].toLowerCase().indexOf("," + type + ",") >= 0) {
        var height = "620";
        var width = "705";
        var target = "play/img/img.jsp?1=1&type=2" + "&loadUrl=" + encodeURIComponent(url) + "&teachernumber=" + teachernumber;
        _common.openResPage(width, height, target);
        return;
    } else {
        try {
            TB_show('test', 300, 650);
        } catch (e) {
        }
        mask.style.display = "";
        upload.style.display = "";
        __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";
        ajaxJson(url, null, "gbk", this.downloadTeacherFolderFile);
    }
}
//�����ʦ�ļ�����Ϣ
PlayerObj.prototype.downloadTeacherFolderFile = function (data) {
    player.filearray.length = 0;
    try {
        player.filesavepath = ocx.GetMyDocumentPath() + "\\vcomDownload";
    } catch (e) {
    }
    try {
        mask.style.display = "";
        upload.style.display = "";
        uploadlist.innerHTML = "";
    } catch (e) {
    }
    /**
     if(data[0].error){
 		var error=data[0].error;
 		if(error=="much"){
 			__openfile.innerHTML="��ȡ��Դʧ�ܣ������������Դ̫�������Դ������....";
 		}else if(error=="small"){
 			__openfile.innerHTML="û�п����������Դ....";
 		}
 		reutrn;
 	}
     */
    if (data != null && data != "undefined" && data.list.length == 0) {
        __openfile.innerHTML = "û�п����������Դ....";
    }
    if (data != null && data != "undefined" && data.list.length > 0) {
        //��ȡ�ļ��б�
        var table = "";
        for (var i = 0; i < data.list.length; i++) {
            var res = data.list[i];
            var path = res.path;
            //path=decodeURIComponent(path);
            //path=encodeURI(path);
            //path=encodeURI(path);

            var name = res.filepath;
            //name="/"+decodeURIComponent(name);
            var file = {"id": "file_" + i, "url": path, "path": name, "index": i};
            player.filearray.push(file);

            var clor = "";
            if (i % 2 == 1) clor = "class=\"gray\"";
            table += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload"><tr' + clor + '><td style="width:360px;">';
            table += '<p style="font-size: 14px;">' + name.substring(name.lastIndexOf("/") + 1, name.length) + '</p>';
            table += '<p id="file_' + i + '_pro" ></p></td>';
            table += '<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;width:15px;"><img src="' + transferProtocol_web + _config["PLS"] + '/teacher/images/laji.gif" id="file_' + i + '_img"></td>';
            table += '<td valign="bottom" style="font-size: 12px;width:50px;display:none;" id="file_' + i + '_radio"><input name="openfile" type="radio" value="' + i + '" onclick="getPlayFile(1);"/>��</td>';
            table += '<td valign="bottom" style="font-size: 12px;" id="file_' + i + '_sta">������0%</td></tr></table> ';
        }
        var listend = '</div>';
        var filelength = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downloadsize">';
        filelength += '<tr class="gray linet"><td style="width:20%" >��' + data.list.length + '���ļ�</td>';
        filelength += '<td style="color:#111;font-size: 14px;" id="file_state"></td></tr></table>';
        var button = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload"><tr>';
        button += '<td class="up"><button onclick="getPlayFile(1);">��</button><button onclick="tocloseupload();">�ر�</button></td>';
        button += '</tr></table>';
        cleaninserthtml();
        if (player.filearray.length == 1) {
            var liststart = '<div id="uploadlist">';
            uploadlist.outerHTML = liststart + table + listend + filelength;
        } else {
            var liststart = '<div class="download_box" id="uploadlist">';
            uploadlist.outerHTML = liststart + table + listend + filelength;
        }

        player.progress = new Progress("file_0_pro", 0, 100, 0, 1, new ProgressStyle(470, 10, "#009999", "#00CCCC"));
        player.progress.create();
        if (player.filearray.length > 0) {
            player.currIndex = 0;
            player.currentfile = player.filearray[0];
            ClearSaveDirectory(player.filesavepath);
            ocx.StartDownload(player.currentfile.url, player.filesavepath + player.currentfile.path.replace(/\//g, "\\"));
        }
    } else {
        try {
            __openfile.innerHTML = "û�п��������Դ....</font>";
            cleaninserthtml();
        } catch (e) {
        }
    }
}
//��ʦ�ļ��н��ȸ���
PlayerObj.prototype.updatePos_TeacherFolderFile = function (pos, speed) {
    var currentspeed;
    //speed �ĵ�λ�� �ֽ�/��
    if (speed > 1024 * 1024)
        currentspeed = (speed / (1024 * 1024)).toFixed(2) + "M/S";
    else if (speed > 1024)
        currentspeed = (speed / 1024).toFixed(2) + "K/S";
    else if (speed < 0)  //�����Ѿ�ֹͣ
        currentspeed = "";
    else
        currentspeed = speed + "B/S";
    player.progress.setPosition(pos);
    //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"% ��ǰ�ٶ�"+currentspeed;
    try {
        if (pos != 100) {
            //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"%";
            document.getElementById(this.currentfile.id + "_sta").innerHTML = "�ٶ�" + currentspeed
        } else {
            document.getElementById(this.currentfile.id + "_sta").innerHTML = "���سɹ�";
            document.getElementById(this.currentfile.id + "_img").src = transferProtocol_web + _config["PLS"] + "/teacher/images/success.gif";
            document.getElementById(this.currentfile.id + "_radio").style.display = "";
        }
    } catch (e) {
    }
}
//��ʦ�ļ����������
PlayerObj.prototype.finishDownLoad_TeacherFolderFile = function (ids, type) {
    if (upload.style.display == "none") {
        return;
    }
    if (this.currentfile.index == (this.filearray.length - 1)) {
        if (this.filearray.length == 1) {
            if (this.filearray.length == 1) {
                PlayOneFile(this.filesavepath + this.currentfile.path.replace(/\//g, "\\"));
            } else if (filearray.length > 1) {
                PlayOneFile(this.filesavepath + this.filearray[0].path.replace(/\//g, "\\"));
            }
        } else {
            __openfile.innerHTML = "<font style=\"color: green;\">��Դ������ϣ���ѡ��򿪵���Դ....</font>";
        }
    } else {
        for (var i = 0; i < this.filearray.length; i++) {
            if (this.filearray[i].id == this.currentfile.id && i < (filearray.length - 1)) {
                this.currentfile = this.filearray[i + 1];
                if (i >= 3) {
                    uploadlist.scrollTop = (i - 2) * 40;
                }
                if (document.getElementById(this.currentfile.id + "_download")) {
                    if (document.getElementById(this.currentfile.id + "_download").checked) {
                        ocx.StartDownload(this.currentfile.url, this.filesavepath + this.currentfile.path.replace(/\//g, "\\"));
                    } else {
                        this.finishDownLoad();
                    }
                } else {
                    ocx.StartDownload(this.currentfile.url, this.filesavepath + this.currentfile.path.replace(/\//g, "\\"));
                }
                break;
            }
        }
    }
}
//���ӽ̲���Դ
PlayerObj.prototype.getDZJC = function (rcode) {
    player.code = rcode;
    /*var url=transferProtocol_web+_config["PLS"]+"/newteach/getXMLName.do?ksId="+rcode+"&format=PACKAGE&filetype=2&type=2&catalogId=&cusip="+ip;
    url+="&username="+teachernumber;*/
    //���ص�ַ
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1Ϊjson 2 xml
    getLoadAddress(url, this.downloadDZJC);
    //ajaxJson(url,null,"gbk",this.downloadDZJC);
}
//����Ƿ���ӽ̲������������
PlayerObj.prototype.checkDZJCplay = function (rcode, RFormatMark) {
    ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiaoplay/getInfoJson.do", "rcode=" + rcode + "&rsType=1", "gbk", function (rdata) {
        try {
            //if(rdata.info.RTypecode && "RT106"==rdata.info.RTypecode)
            if (rdata && rdata.infoTypeFormat == 12) {
                player.getDZJC(rcode);
            } else {
                player.playResource(rcode, '2', RFormatMark);
            }
        } catch (e) {
            alert("���ż���쳣!msg:" + e);
        }
    });
}
//
PlayerObj.prototype.downloadDZJC = function (list) {
    player.filearray.length = 0;
    if (list == null || typeof list == "undefined") {
        alert("û�пɲ��ŵ���Դ");
        return;
    } else if (typeof (list) == 'string') {
        alert(list);
        return;
    }
    //��ȡ�ļ��б�
    for (var i = 0; i < list.length; i++) {
        var res = list[i];
        var path = res.path;
        path = decodeURIComponent(path);
        var name = res.file_name;
        name = "/" + decodeURIComponent(name);
        var file = {"id": "file_" + i, "url": path, "path": name, "index": i};
        player.filearray.push(file);


        if (path.indexOf("data.xml") > -1) {
            var flashh = document.documentElement.clientHeight;
            var flashw = document.documentElement.clientWidth;
            var mtop = 0;

            maskAllDzjc.style.display = "block";
            document.getElementById("dzjcDiv").style.height = document.documentElement.clientHeight;
            document.getElementById("dzjcDiv").style.width = document.documentElement.clientWidth;
            var dzjccode = '<div style="height:' + flashh + 'px;width:' + flashw + 'px;text-align:center;margin-top:' + mtop + 'px;margin-left:auto;margin-right:auto;" ><object><embed src="/newteach/flash/dzjc.swf?rt=' + new Date().getTime() + '" wmode="transparent"  allowFullScreenInteractive="true" allowFullScreen="true" quality="high" width="' + flashw + '" height="' + flashh + '" align="L" scale="noborder" flashvars="mainXmlUrl=';
            //var yxurl=transferProtocol_web+_config["PLS"]+'/youjiao/playPersonalRightList.do?menuCode='+kjsk.currentKsid+'&page=1&pageNum=200&orderby=5&xmlFlag=1&t='+new Date().getMilliseconds();
            //var ypskurl=transferProtocol_web+_config["PLS"]+'/teacherfile/getfilelist.do?teachernumber='+teachernumber+'&pageindex=1&pagesize=200&noforder=2&place=4&kscode='+dzjc.currentKsid+'&xmlFlag=1&t='+new Date().getMilliseconds();
            //��Դ�б�
            var preferenceUrl = transferProtocol_web + _config["PLS"] + "/interface/queryEleTeachRes.do?menuCode=" + _treeVersion.currentCourseId + "&userid=" + teachernumber;
            //ͼ���б�
            // �����ɺ�̨�Զ�ƴ�� userid=yujikuan&ebookCode=20151215132203804892930051706&action=select
            var resUrl = transferProtocol_web + _config["PLS"] + "/interface/eteachInterface.do";
            //���ѵ���б�
            var tqmsUrl = transferProtocol_web + _config["QBMS"] + "/tqms/interface/practice/queryPractice.action?username=" + teachernumber + "&classId=" + _treeVersion.currentCourseId + "&type=0&limit=100";
            dzjccode = dzjccode + encodeURIComponent(path) + '&show=1'
            dzjccode = dzjccode + '&preferenceUrl=' + encodeURIComponent(preferenceUrl);
            dzjccode = dzjccode + '&resUrl=' + encodeURIComponent(resUrl);
            dzjccode = dzjccode + '&tqmsUrl=' + encodeURIComponent(tqmsUrl);
            dzjccode = dzjccode + '&ebookCode=' + player.code;
            dzjccode = dzjccode + '&statusLabel=1';
            dzjccode = dzjccode + '&userName=' + teachernumber;

            dzjccode = dzjccode + '" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed></object></div>';
            document.getElementById("dzjcDiv").innerHTML = dzjccode;
            document.getElementById("dzjcDiv").style.display = "block";
            return;
        }
    }
    alert("û�пɲ��ŵ���Դ");
}

//���ӽ̲���Դչʾ
PlayerObj.prototype.downloadDZJC2 = function (data) {
    player.filearray.length = 0;
    if (data != null && data != "undefined" && data.list != null && data.list != undefined) {
        var list = data.list;
        //��ȡ�ļ��б�
        for (var i = 0; i < list.length; i++) {
            var res = list[i];
            var path = res.path;
            path = decodeURIComponent(path);
            var name = res.file_name;
            name = "/" + decodeURIComponent(name);
            var file = {"id": "file_" + i, "url": path, "path": name, "index": i};
            player.filearray.push(file);


            if (path.indexOf("data.xml") > -1) {
                var flashh = document.documentElement.clientHeight;
                var flashw = document.documentElement.clientWidth;
                var mtop = 0;
                /*
                //3:4��������
                var poh=document.documentElement.clientHeight/3;
                var pow=document.documentElement.clientWidth/4;
                if(poh>pow){
                    flashw=Math.floor(4*pow);
                    flashh=Math.floor(3*pow);
                }else{
                    flashw=Math.floor(4*poh);
                    flashh=Math.floor(3*poh);
                }
                if(document.documentElement.clientHeight>flashh){
                    mtop=Math.floor((document.documentElement.clientHeight-flashh)/2);
                }
                */
                document.getElementById("dzjcDiv").style.height = document.documentElement.clientHeight;
                document.getElementById("dzjcDiv").style.width = document.documentElement.clientWidth;
                var dzjccode = '<div style="height:' + flashh + 'px;width:' + flashw + 'px;text-align:center;margin-top:' + mtop + 'px;margin-left:auto;margin-right:auto;" ><object><embed src="' + transferProtocol_web + _config["PLS"] + '/newteach/flash/dzjc.swf?rt=' + new Date().getTime() + '" wmode="transparent"  allowFullScreenInteractive="true" allowFullScreen="true" quality="high" width="' + flashw + '" height="' + flashh + '" align="L" scale="noborder" flashvars="mainXmlUrl=';
                var yxurl = transferProtocol_web + _config["PLS"] + '/youjiao/playPersonalRightList.do?menuCode=' + _treeVersion.currentCourseId + '&page=1&pageNum=200&orderby=5&xmlFlag=1&t=' + new Date().getMilliseconds();
                var ypskurl = transferProtocol_web + _config["PLS"] + '/teacherfile/getfilelist.do?teachernumber=' + teachernumber + '&pageindex=1&pagesize=200&noforder=2&place=4&kscode=' + _treeVersion.currentCourseId + '&xmlFlag=1&t=' + new Date().getMilliseconds();
                dzjccode = dzjccode + encodeURIComponent(path) + '&show=1&preferenceUrl=' + encodeURIComponent(yxurl) + '&shouKeUrl=' + encodeURIComponent(ypskurl);
                dzjccode = dzjccode + '" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed></object></div>';
                document.getElementById("dzjcDiv").innerHTML = dzjccode;
                document.getElementById("dzjcDiv").style.display = "block";
                return;
            }
        }
        alert("û�пɲ��ŵ���Դ");
    } else {
        alert("û�пɲ��ŵ���Դ");
    }
}
