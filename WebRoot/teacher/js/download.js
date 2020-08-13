//�ر��ϴ�����
var filearray = new Array();//��Ŵ����ص��ļ��б�
var filesavepath = defaultpath = "c:\\download";
var filedowntype = 0;
var currentfile;
var currentscroll = 0;
var errfilesize = 0;
var __beike;

function tocloseupload() {
    mask.style.display = "none";
    upload.style.display = "none";
    try {
        TB_remove();
    } catch (e) {
    }

    //if(currentscroll==1){
    //document.body.scroll="yes";
    //currentscroll=0;
    //}
    try {
        ocx.stopDownload();
    } catch (e) {
    }
    cleaninserthtml();
}

//ѡ���ļ���
function selectDir() {
    var downloaddirectory = document.getElementById("currentselectd").innerHTML;
    if (downloaddirectory != "") downloaddirectory = downloaddirectory.replace(/\\$/, "") + "\\";
    if (downloaddirectory.indexOf(":") < 0) downloaddirectory = "";
    var dirStr = ocx.SelectPath(downloaddirectory);
    document.getElementById("currentselectd").innerHTML = dirStr;
    filesavepath = dirStr.replace(/\\$/g, "");
    setCookie(dirStr);
}

//��ȡcookie��Ϣ
function getcookle() {
    var arr = document.cookie.match(new RegExp("(^| )teacherselectpath=([^;]*)(;|$)"));
    if (arr != null) {
        document.getElementById("currentselectd").innerHTML = unescape(arr[2]);
        filesavepath = unescape(arr[2]).replace(/\\$/g, "");
    } else {
        try {
            var userSavePath = ocx.GetUserSavePath();
            if (userSavePath) {
                document.getElementById("currentselectd").innerHTML = userSavePath;
                filesavepath = userSavePath.replace(/\\$/g, "");
            }
        } catch (e) {
        }
    }
}

function saveCookie(name, value, expires, path, domain, secure) {
    var strCookie = name + "=" + value;
    if (expires) {
        //   ����Cookie������,   ����Ϊ����  
        var curTime = new Date();
        curTime.setTime(curTime.getTime() + expires * 24 * 60 * 60 * 1000);
        strCookie += ";   expires=" + curTime.toGMTString();
    }
    //   Cookie��·��  
    strCookie += (path) ? ";   path=" + path : "";
    //   Cookie��Domain  
    strCookie += (domain) ? ";   domain=" + domain : "";
    //   �Ƿ���Ҫ���ܴ���,Ϊһ������ֵ  
    strCookie += (secure) ? ";   secure" : "";
    document.cookie = strCookie;
}

//����cookie��Ϣ
function setCookie(path) {
    if (!navigator.cookieEnabled) {

    } else {
        //document.cookie='teacherselectpath='+escape(path); 
        saveCookie("teacherselectpath", escape(path), 1000);
    }
}

function openfiledirect() {
    try {
        var downloaddirectory = document.getElementById("currentselectd").innerHTML;
        if (downloaddirectory == "") {
            alert("��ѡ������Ŀ¼!");
        } else {
            ocx.OpenDirectory(downloaddirectory.replace(/\\$/, "") + "\\");
        }
        //PlayOneFile("d:/home/teachFile",1);
    } catch (e) {
        if (window.confirm("���ļ��ؼ������������������ذ�װ!")) {
            window.location.href = global_basePath + 'downloadplay.exe'
        }
    }
}

//��ȡ��Ҫ���ص�xml�ļ�
function togetdownloadres(xmlurl, type, usetype) {
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
    //if(document.body.scroll!="no"){
    //currentscroll=1;
    //document.body.scroll="no";
    //scroll(0,0);
    //}
    filedowntype = type;
    if (type == 3) {
        __openfile.innerHTML = "�ļ�����";
    } else {
        __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";
    }
    try {
        //upload.style.left=document.documentElement.clientWidth/2-330;
        try {//�ж��Ƿ���Ҫ������������ʾ
            if (ocx.GetVersion() < ocxversion) {
                if (usetype == 1) {
                    insertocx(0);//����
                } else {
                    insertocx(1);
                }
                return;
            }
        } catch (e) {
            if (usetype == 1) {
                insertocx(0);//����
            } else {
                insertocx(1);
            }
            return;
        }
        ocx.GetXmlFromUrl(xmlurl);
    } catch (e) {
        if (usetype == 1) {
            insertocx(3);//����
        } else {
            insertocx(1);
        }
    }

}

//��ʾδ��װ�ռ����ֲ�
function showinsertocxmessage(num) {
    try {
        TB_show('test', 300, 650);
    } catch (e) {
    }
    mask.style.display = "";
    upload.style.display = "";
    insertocx(num);
}

function playrecommendfile(ids, type) {
    mask.style.display = "";
    upload.style.display = "";
    __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";
    upload.style.left = document.documentElement.clientWidth / 2 - 330
    var url = global_basePath + "/teacherfile/playfile.do?ids=" + ids;
    filedowntype = 2;
    try {
        ocx.GetXmlFromUrl(url);
    } catch (e) {
        insertocx(3);//����
    }
}

function dbclicplay(ids, type, beike, select) {
    try {
        _fileUtil.clearSelectStatus();
        _fileUtil.setSelectStatusByIndex(select);
        _fileUtil.setSelectStatusCss(select);
        //_fileUtil.createFileArrayByClick(ids);"<%=PlayAction.videotype %>".indexOf(","+RFormat.toUpperCase()+",")>=0
    } catch (e) {
    }
    teacherfileplay(ids, type, beike)
}

function teacherfileplay(ids, type, beike) {
    if (ids == null || ids == "") {
        alert("��ѡ���ļ�!");
        return;
    }
    var checkfiletype = 0;
    for (var i = 0; i < _fileUtil.fileList.length; i++) {
        if (ids.indexOf(_fileUtil.fileList[i].fCode) >= 0) {
            if (_pictype.indexOf("," + _fileUtil.fileList[i].fileType.toUpperCase() + ",") >= 0) {
                checkfiletype = 1;
            } else {
                checkfiletype = 0;
                break;
            }
        }
    }
    if (checkfiletype == 1) {
        if (beike) PlayVideo(ids, '-2', 'jpg', 2, 'ͼƬ����');
        else PlayVideo_shouke(ids, '-2', 'jpg', 2, 'ͼƬ����');
        return;
    }
    try {
        TB_show('test', 300, 650);
    } catch (e) {
    }
    mask.style.display = "";
    upload.style.display = "";
    filedowntype = type;
    __beike = beike;
    __openfile.innerHTML = "���ڼ�����Դ,���Ժ�....";
    var url = global_basePath + "/teacherfile/playfile.do?ids=" + ids + "&virtualDirectory=" + virtualDirectory + "&teachernumber=" + teachernumber + "&teacherjyjg=" + teacherjyjg + "&parentfcode=" + _fileUtil.currParentFcode;
    try {
        //upload.style.left=document.documentElement.clientWidth/2-330;
        try {//�ж��Ƿ���Ҫ������������ʾ
            if (ocx.GetVersion() != ocxversion) {
                if (beike) {
                    insertocx(0);//����
                } else {
                    insertocx(1);//�ڿ�
                }
                return;
            }
        } catch (e) {
            if (beike) {
                insertocx(0);//����
            } else {
                insertocx(1);//�ڿ�
            }
            return;
        }
        ocx.GetXmlFromUrl(url);
    } catch (e) {
        if (beike) {
            insertocx(3);//����
        } else {
            insertocx(1);//�ڿ�
        }
    }
}

//��������ز����ʾ!typeΪ1��ʾ�ڿΣ�����Ϊ����
function insertocx(type) {
    try {
        __openfile.innerHTML = "������ز��ɹ�,���Ժ�....";
    } catch (e) {
    }
    if (type == 1) {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">������ؿؼ�û�а�װ�����Ѿ����������û���Զ�����������ϵ����Ա��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr></table></div>";
    } else if (type == 3) {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">������ؿؼ�û�а�װ������ҳ���·���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���������ֹ���װ����װ�������´�����������ؿؼ���\" onclick=\"window.location.href='" + global_basePath + "vcomueduplayer.exe'\"/></td></tr></table></div>";
    } else if (type == 0) {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">������ؿؼ��Ѿ�����������ҳ���·���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���������ֹ���װ!��װ�������´������!\" onclick=\"window.location.href='" + global_basePath + "vcomueduplayer.exe'\"/></td></tr></table></div>";
    } else if (type == 4) {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">����ϴ��ؼ�û�а�װ������ҳ���·���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���������ֹ���װ!��װ�������´������!\" onclick=\"window.location.href='" + global_basePath + "vcomueduplayer.exe'\"/></td></tr></table></div>";
    } else if (type == 5) {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">����ϴ��ؼ��Ѿ�����������ҳ���·���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���������ֹ���װ!��װ�������´������!\" onclick=\"window.location.href='" + global_basePath + "vcomueduplayer.exe'\"/></td></tr></table></div>";
    } else {
        uploadlist.outerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + global_basePath + "teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">������ؿؼ�û�а�װ������ҳ���Ϸ���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���������ֹ���װ����װ�������´�����������ؿؼ���\" onclick=\"window.location.href='" + global_basePath + "vcomueduplayer.exe'\"/></td></tr></table></div>";
    }

}

function cleaninserthtml() {
    try {
        uploadlist.outerHTML = "<div id=\"uploadlist\"></div>";
        downloadsize.outerHTML = "";
        downlaodbutton.outerHTML = "";
    } catch (e) {
    }
}


function teacherfiledownload(ids, type) {
    if (ids == null || ids == "") {
        alert("��ѡ���ļ�!");
        return;
    }
    mask.style.display = "";
    upload.style.display = "";

    __openfile.innerHTML = "�ļ�����";
    var url = global_basePath + "/teacherfile/playfile.do?ids=" + ids + "&virtualDirectory=" + virtualDirectory + "&teachernumber=" + teachernumber + "&teacherjyjg=" + teacherjyjg + "&parentfcode=" + _fileUtil.currParentFcode;
    try {
        //upload.style.left=document.documentElement.clientWidth/2-330;
        try {//�ж��Ƿ���Ҫ������������ʾ
            if (ocx.GetVersion() != ocxversion) {
                if (__beike) {
                    insertocx(0);//����
                } else {
                    insertocx(1);//�ڿ�
                }
                return;
            }
        } catch (e) {
            if (__beike) {
                insertocx(0);//����
            } else {
                insertocx(1);//�ڿ�
            }
            return;
        }
        ocx.GetXmlFromUrl(url);
        filedowntype = type;
    } catch (e) {
        alert(e);
        if (__beike) {
            insertocx(3);
        } else {
            insertocx(1);//�ڿ�
        }
    }
}

//�ļ����ؽ�������ʾ
function OnXmlFinish3(xml) {//��Դ����ʹ��
    if (xml == "��ȡxmlʧ��" || xml.indexOf("<vcom>much</vcom>") > 0) {
        cleaninserthtml();
        __openfile.innerHTML = "��ȡ��Դʧ�ܣ��������ص���Դ̫�������Դ������....";
        return;
    } else if (xml.indexOf("<vcom>small</vcom>") > 0) {
        cleaninserthtml();
        __openfile.innerHTML = "û�п������ص���Դ....";
        return;
    }
    filearray = new Array();//
    var fileurl = new Array(), filepath = new Array();
    var reg = /\"([^\"]+)\"/ig;
    while ((__path = reg.exec(xml)) != null) {
        if ((__path + "").indexOf("http") >= 0) {
            fileurl.push(__path[1]);
        } else {
            filepath.push(__path[1]);
        }

    }
    if (fileurl.length > 0 && fileurl.length == filepath.length) {
        var table = "";

        for (var i = 0; i < fileurl.length; i++) {
            var clor = "";
            if (i % 2 == 1) clor = "class=\"gray\"";
            table = table + '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
                + '<tr ' + clor + '>'
                + '<td style="width:360px;">'
                + '<p style="font-size: 14px;">' + filepath[i].substring(filepath[i].lastIndexOf("/") + 1, filepath[i].length) + '</p>'
                + '<p><div style="float:left;width:450px;"><div style="float:left;width:20px;"><input type="checkbox" checked id="file_' + i + '_download"></div><div style="float:left;width:430px;margin-top:5px;" id="file_' + i + '_pro" ></div></div></p>'
                + '</td>'
                // +'<td class="kd2">'+size.toFixed(2)+'M</td>'
                + '<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;" style="width:10px;"><img src="' + global_basePath + '/teacher/images/laji.gif" id="file_' + i + '_img"></td>'
                + '<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;" id="file_' + i + '_sta">������0%</td>'
                + '<td valign="bottom" style="font-size: 12px;width:100px;display:none;" id="file_' + i + '_radio"><input name="openfile" type="radio" value="' + i + '" onclick="getPlayFile(1);"/>���ļ�</td>'
                + '</tr>'
                + '</table> ';
            filearray.push({"id": "file_" + i, "url": fileurl[i], "path": filepath[i], "index": i});

        }

        var listend = '</div>';
        var filelength = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downloadsize">'
            + '<tr class="gray linet">'
            + '<td style="width:50%">��' + fileurl.length + '���ļ�&nbsp;<span id="downlaodspead" style="color:red;"></span></td>'
            + '<td style="color:#111;font-size: 14px;" id="file_state"></td>'
            + '</tr>'
            + '</table>';
        var button = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downlaodbutton">'
            + '<tr>'
            + ' <td class="up" ><button onclick="togetdownloadfile(1);">����</button><button onclick="tocloseupload();">�ر�</button></td>'
            + '</tr>'
            + '</table>';
        cleaninserthtml();
        //if(fileurl.length==1){
        //var liststart='<div id="uploadlist">';
        //uploadlist.outerHTML=liststart+table+listend+filelength+button;
        //upload.style.top="40%";
        //}else{
        var liststart = '<div class="download_box" id="uploadlist">';
        liststart = liststart + '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
            + '<tr class="line">'
            + '<td class="add" style="text-align: left;"><button onclick="selectDir();">ѡ��Ŀ¼</button><span id="currentselectd"></span></td>'
            + '<td class="add" style="text-align: right;PADDING-RIGHT: 20px;"><a href="javascript:" onclick="openfiledirect();">��Ŀ¼</a></td>'
            + ' </tr>'
            + '</table>';
        uploadlist.outerHTML = liststart + table + listend + filelength + button;
        //upload.style.top="5%";
        //upload.style.left=document.documentElement.clientWidth/2-330;
        //}
        for (var j = 0; j < filearray.length; j++) {
            var progress1 = new Progress(filearray[j].id + "_pro", 0, 100, 0, 1, new ProgressStyle(430, 10, "#009999", "#00CCCC"));
            progress1.create();
            filearray[j].progress = progress1;
        }
        if (fileurl.length > 0) {
            currentfile = filearray[0];
            //ClearSaveDirectory(filesavepath);
            //alert(filesavepath+filearray[0].path.replace(/\//g,"\\"));
            //prompt('',encodeURI(filearray[0].url));
            //ocx.StartDownload(filearray[0].url,filesavepath+filearray[0].path.replace(/\//g,"\\"));
        }
        getcookle();
    } else {
        try {
            __openfile.innerHTML = "û�п����ص���Դ....</font>";
            cleaninserthtml();
        } catch (e) {
        }
    }
}

function togetdownloadfile() {
    if (document.getElementById("currentselectd").innerHTML == "") {
        alert("��ѡ������Ŀ¼!");
        return;
    } else {
        if (filearray.length > 0) {
            currentfile = filearray[0];
            if (document.getElementById(currentfile.id + "_download").checked) {
                ocx.StartDownload(currentfile.url, filesavepath + currentfile.path.replace(/\//g, "\\"));
            } else {
                todownloadnext();
            }
        }
    }
}

function OnXmlFinishX(xml) {//��ʦ�ļ������ʹ��

    filesavepath = defaultpath;
    try {
        filesavepath = ocx.GetMyDocumentPath() + "\\vcomDownload";
    } catch (e) {
    }
    try {
        //filesavepath=ocx.GetUserSavePath();
        //alert(filesavepath);
    } catch (e) {
    }
    cleaninserthtml();
    if (xml == "��ȡxmlʧ��" || xml.indexOf("<vcom>much</vcom>") > 0) {
        __openfile.innerHTML = "��ȡ��Դʧ�ܣ������������Դ̫�������Դ������....";
        return;
    } else if (xml.indexOf("<vcom>small</vcom>") > 0) {
        __openfile.innerHTML = "û�п����������Դ....";
        //OnXmlFinish2(xml);
        return;
    }
    filearray = new Array();//
    var fileurl = new Array(), filepath = new Array();
    var reg = /\"([^\"]+)\"/ig;
    while ((__path = reg.exec(xml)) != null) {
        if ((__path + "").indexOf("http") >= 0) {
            fileurl.push(__path[1]);
        } else {
            filepath.push(__path[1]);
        }

    }
    if (fileurl.length > 0 && fileurl.length == filepath.length) {
        var table = "";

        for (var i = 0; i < fileurl.length; i++) {
            var clor = "";
            if (i % 2 == 1) clor = "class=\"gray\"";
            table = table + '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
                + '<tr ' + clor + '>'
                + '<td style="width:360px;">'
                + '<p style="font-size: 14px;">' + filepath[i].substring(filepath[i].lastIndexOf("/") + 1, filepath[i].length) + '</p>'
                + '<p id="file_' + i + '_pro" ></p>'
                + '</td>'
                // +'<td class="kd2">'+size.toFixed(2)+'M</td>'
                + '<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;width:15px;"><img src="' + global_basePath + '/teacher/images/laji.gif" id="file_' + i + '_img"></td>'
                + '<td valign="bottom" style="font-size: 12px;width:50px;display:none;" id="file_' + i + '_radio"><input name="openfile" type="radio" value="' + i + '" onclick="getPlayFile(1);"/>��</td>'
                + '<td valign="bottom" style="font-size: 12px;" id="file_' + i + '_sta">������0%</td>'
                + '</tr>'
                + '</table> ';
            filearray.push({"id": "file_" + i, "url": fileurl[i], "path": filepath[i], "index": i});

        }

        var listend = '</div>';
        var filelength = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downloadsize">'
            + '<tr class="gray linet">'
            + '<td style="width:20%" >��' + fileurl.length + '���ļ�</td>'
            + '<td style="color:#111;font-size: 14px;" id="file_state"></td>'
            + '</tr>'
            + '</table>';
        var button = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
            + '<tr>'
            + ' <td class="up"><button onclick="getPlayFile(1);">��</button><button onclick="tocloseupload();">�ر�</button></td>'
            + '</tr>'
            + '</table>';
        cleaninserthtml();
        if (fileurl.length == 1) {
            var liststart = '<div id="uploadlist">';
            uploadlist.outerHTML = liststart + table + listend + filelength;
            //if(__beike)
            //upload.style.top="5%";
            //else
            //upload.style.top="40%";
        } else {
            var liststart = '<div class="download_box" id="uploadlist">';
            uploadlist.outerHTML = liststart + table + listend + filelength;
            //if(__beike)
            //upload.style.top="5%";
            //else
            //upload.style.top="25%";
        }
        //upload.style.left=document.documentElement.clientWidth/2-330;
        for (var j = 0; j < filearray.length; j++) {
            var progress1 = new Progress(filearray[j].id + "_pro", 0, 100, 0, 1, new ProgressStyle(370, 10, "#009999", "#00CCCC"));
            progress1.create();
            filearray[j].progress = progress1;
        }
        if (fileurl.length > 0) {
            currentfile = filearray[0];
            ClearSaveDirectory(filesavepath);
            //alert(filesavepath+filearray[0].path.replace(/\//g,"\\"));
            ocx.StartDownload(filearray[0].url, filesavepath + filearray[0].path.replace(/\//g, "\\"));
        }

    } else {
        try {
            __openfile.innerHTML = "û�п��������Դ....</font>";
            cleaninserthtml();
        } catch (e) {
        }
    }
}

function OnXmlFinish2(xml) {//������Դ���ʹ��
    errfilesize = 0;
    filesavepath = defaultpath;
    try {
        filesavepath = ocx.GetMyDocumentPath() + "\\vcomDownload";
    } catch (e) {
    }
    try {
        //filesavepath=ocx.GetMyDocumentPath()+"\\download";
    } catch (e) {
    }
    if (xml == "��ȡxmlʧ��") {
        cleaninserthtml();
        __openfile.innerHTML = "��ȡ�������Դʧ��....";
        return;
    }
    filearray = new Array();//
    __openfile.innerHTML = "���ڼ�����Դ�����Ժ�....</font>";
    var fileurl = new Array(), filepath = new Array();
    var reg = /\"([^\"]+)\"/ig;

    while ((__path = reg.exec(xml)) != null) {
        //alert(__path);
        if ((__path + "").indexOf("http") >= 0) {
            fileurl.push(__path[1]);
        } else {
            filepath.push(__path[1]);
        }

    }
    if (fileurl.length > 0 && fileurl.length == filepath.length) {
        for (var i = 0; i < fileurl.length; i++) {
            filearray.push({"id": "file_" + i, "url": fileurl[i], "path": filepath[i], "index": i});
        }
        var table = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="' + this.fileProgressID + '">'
            + '<tr class="gray">'
            + '<td>'
            + '<p id="file_0_pro" ></p>'
            + '</td>'
            + '<td class="kd2" style="font-size: 14px;" id="file_pos">15%</td>'
            + '<td style="padding-right: 15px;"><img src="' + global_basePath + '/teacher/images/laji.gif" id="file_0_img"></td>'
            + '</tr>'
            + '</table> ';
        var listend = '</div>';
        var liststart = '<div>';
        cleaninserthtml();
        uploadlist.innerHTML = liststart + table + listend;

        //upload.style.top="40%";
        //upload.style.left=document.documentElement.clientWidth/2-330;
        progress1 = new Progress("file_0_pro", 0, 100, 0, 1, new ProgressStyle(470, 10, "#009999", "#00CCCC"));
        progress1.create();
        if (fileurl.length > 0) {
            currentfile = filearray[0];
            ClearSaveDirectory(filesavepath);
            ocx.StartDownload(currentfile.url, filesavepath + currentfile.path.replace(/\//g, "\\"));
        }

    } else {
        __openfile.innerHTML = "û�пɲ��ŵ���Դ....</font>";
    }
}

//���½�����
function updatePos2(pos, speed) {
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
        //alert(filearray.length);
        if (filearray.length == 1) {
            progress1.setPosition(pos);
            document.getElementById("file_pos").innerHTML = pos + "%";
        } else {
            if (pos == 100) {
                pos = parseInt(100 / filearray.length * (currentfile.index + 1 - errfilesize));
                progress1.setPosition(pos);
                document.getElementById("file_pos").innerHTML = pos + "%";
            } else {
                var tempos = parseInt((currentfile.index - errfilesize) * (100 / filearray.length) + (100 / filearray.length * pos * 0.01));
                progress1.setPosition(tempos);
                document.getElementById("file_pos").innerHTML = tempos + "%";
            }

        }
        if (pos != 100) {
            //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"%";
        } else {
            //document.getElementById(currentfile.id+"_sta").innerHTML="���سɹ�";
            document.getElementById("file_0_img").src = global_basePath + "/teacher/images/success.gif";

        }
    } catch (e) {
    }

}

//���½�����
function updatePos3(pos, speed) {
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
        currentfile.progress.setPosition(pos);
        //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"% ��ǰ�ٶ�"+currentspeed;
        if (pos != 100) {
            //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"%";
            document.getElementById(currentfile.id + "_sta").innerHTML = "�Ѽ���" + pos + "%";
            try {
                document.getElementById("downlaodspead").innerHTML = "��ǰ�ٶ�" + currentspeed
            } catch (e) {
            }
        } else {
            document.getElementById(currentfile.id + "_sta").innerHTML = "���سɹ�";
            try {
                document.getElementById("downlaodspead").innerHTML = "���سɹ�";
                document.getElementById(currentfile.id + "_radio").style.display = "";
            } catch (e) {
            }
            document.getElementById(currentfile.id + "_img").src = global_basePath + "/teacher/images/success.gif";


        }
    } catch (e) {
    }

}

function tosleepfile() {
    if (filearray.length == 1) {
        PlayOneFile(filesavepath + currentfile.path.replace(/\//g, "\\"));
    } else if (filearray.length > 1) {
        PlayOneFile(filesavepath + filearray[0].path.replace(/\//g, "\\"));
    }
}

//���½�����
function updatePos(pos, speed) {
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
    currentfile.progress.setPosition(pos);
    //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"% ��ǰ�ٶ�"+currentspeed;
    try {
        if (pos != 100) {
            //document.getElementById("file_state").innerHTML="���ڳ�ʼ����"+(currentfile.index+1)+"���ļ�>>"+pos+"%";
            document.getElementById(currentfile.id + "_sta").innerHTML = "�ٶ�" + currentspeed
        } else {
            document.getElementById(currentfile.id + "_sta").innerHTML = "���سɹ�";
            document.getElementById(currentfile.id + "_img").src = global_basePath + "/teacher/images/success.gif";
            document.getElementById(currentfile.id + "_radio").style.display = "";
        }
    } catch (e) {
    }

}

function getPlayFile(type) {
    var value = getradiovalue(document.getElementsByName("openfile"));
    if (value != "") {
        for (var i = 0; i < filearray.length; i++) {
            if (filearray[i].index == value) {
                PlayOneFile(filesavepath + filearray[i].path.replace(/\//g, "\\"), type);
                break;
            }
        }
    } else {
        if (type != null) {
            alert("��ѡ������ŵ��ļ�!");
        }
    }
}

//����һ���ļ�
function PlayOneFile(name, type) {
    //alert(name);
    var ret = ocx.playFile(name);
    switch (ret) {
        case -1:
            __openfile.innerHTML = "<font style=\"color: green;\">����ʧ�ܣ������ļ������ڻ��߼���ʧ��....</font><a href='javascript:' onclick=\"window.open('" + global_basePath + "teacher/frame/help.htm')\">����</a>";
            break;

        case -2:
            __openfile.innerHTML = "<font style=\"color: green;\">����ѡ��򿪷�ʽ....</font>";
            break;

        case -3:
            __openfile.innerHTML = "<font style=\"color: green;\">��Ч���ļ�·��....</font>";
            break;

        case 1:
            __openfile.innerHTML = "<font style=\"color: green;\">�ɹ���ʼ����....</font>";
            if (!type) window.setTimeout(closediv, 500);
            break;
    }
}

function closediv() {
    mask.style.display = "none";
    upload.style.display = "none";
    try {
        TB_remove();
    } catch (e) {
    }
    //if(currentscroll==1){
    //document.body.scroll="yes";
    //currentscroll=0;
    //}
}

//����״̬�����仯
function updateState(state, errMsg) {
    switch (state) {
        case 1:
            //stateLabel.value="��������";
            //alert(��������);
            break;
        case 2:
            //stateLabel.value="������";
            //alert();
            break;
        case -1:
            //stateLabel.value="���س���:"+errMsg;
            //startbtn.disabled=false;
            //stopbtn.disabled=true;
            //alert("���س���:"+errMsg);
            errfilesize = errfilesize + 1;
            try {
                document.getElementById(currentfile.id + "_sta").innerHTML = "���س���:" + errMsg + "&nbsp;&nbsp;&nbsp;<a href='javascript:' onclick=\"window.open('" + global_basePath + "teacher/frame/help.htm')\">����</a>";
            } catch (e) {
                if (__openfile)
                    __openfile.innerHTML = "<font style=\"color: green;\">�򿪳���:" + errMsg + "....</font>";
            }

            //__openfile.innerHTML="<font style=\"color: green;\">"+errMsg+"....</font>";
            todownloadnext();
            break;
        case 3:
            //stateLabel.value="�������";
            //startbtn.disabled=false;
            //stopbtn.disabled=true;
            //alert("�������");
            todownloadnext();

            break;

        case 4:
            //stateLabel.value="�Ѿ�ֹͣ";
            //alert("�Ѿ�ֹͣ");
            break;
    }

}

function todownloadnext() {
    if (upload.style.display == "none") {
        return;
    }
    if (currentfile.index == (filearray.length - 1) && filedowntype == 1) {
        __openfile.innerHTML = "<font style=\"color: green;\">���ڴ���Դ�����Ժ�....</font>";
        window.setTimeout(tosleepfile, 0);
    }
    if (currentfile.index == (filearray.length - 1) && filedowntype == 2) {
        if (filearray.length == 1) {
            window.setTimeout(tosleepfile, 0);
        } else {
            __openfile.innerHTML = "<font style=\"color: green;\">��Դ������ϣ���ѡ��򿪵���Դ....</font>";
        }

    } else {
        for (var i = 0; i < filearray.length; i++) {
            if (filearray[i].id == currentfile.id && i < (filearray.length - 1)) {
                currentfile = filearray[i + 1];
                if (i >= 3) {
                    uploadlist.scrollTop = (i - 2) * 40;
                }
                if (document.getElementById(currentfile.id + "_download")) {
                    if (document.getElementById(currentfile.id + "_download").checked) {
                        ocx.StartDownload(currentfile.url, filesavepath + currentfile.path.replace(/\//g, "\\"));
                    } else {
                        todownloadnext();
                    }
                } else {
                    ocx.StartDownload(currentfile.url, filesavepath + currentfile.path.replace(/\//g, "\\"));
                }
                break;
            }
        }
    }

}

//�������Ŀ¼
function ClearSaveDirectory(path) {
    var ret = ocx.clearSaveDirectory(path);
    switch (ret) {
        case 1:
            //clearRet.value = '�Ѿ����';
            break;
        case -1:
            //clearRet.value = '����һЩ�ļ����ڱ�ʹ�ã��޷�ɾ��';
            //__openfile.innerHTML="<font style=\"color: green;\">�ļ����ڱ�ʹ�ã��޷�ɾ��....</font>";
            break;
        case -2:
            //clearRet.value = '��Ч���ļ���·��';
            break;
    }
}

//ֹͣ����
function StopDownload() {
    ocx.stopDownload();
}

/*�õ�ѡ�е�radioֵ*/
function getradiovalue(objField) {
    var idvalue = "";
    if (typeof (objField) != "undefined") {
        if (typeof (objField.length) == "undefined") {
            if (radio.checked == true) idvalue = radio.value;
        } else {
            for (var i = 0; i < objField.length; i++) {
                if (objField[i].checked == true) {
                    idvalue = objField[i].value;
                    break;
                }
            }
        }
    }
    return idvalue;
}

//��ʾ��ɫJS���ֲ�
function showBg(ct, content) {

    var bH = $("body").height();
    var bW = $("body").width() + 16;
    var objWH = getObjWh(ct);


    $("#fullbg").css({width: bW, height: bH, display: "block"});
    var tbT = objWH.split("|")[0] + "px";
    var tbL = objWH.split("|")[1] + "px";
    $("#" + ct).css({top: tbT, left: tbL, display: "block"});
    $("#" + content).html("<div style='text-align:center'>���ڼ��أ����Ժ�...</div>");
    $(window).scroll(function () {
        resetBg()
    });
    $(window).resize(function () {
        resetBg()
    });
}

function getObjWh(obj) {
    var st = document.documentElement.scrollTop;//�������ඥ���ľ���
    var sl = document.documentElement.scrollLeft;//����������ߵľ���
    var ch = document.documentElement.clientHeight;//��Ļ�ĸ߶�
    var cw = document.documentElement.clientWidth;//��Ļ�Ŀ��
    var objH = $("#" + obj).height();//��������ĸ߶�
    var objW = $("#" + obj).width();//��������Ŀ��
    var objT = Number(st) + (Number(ch) - Number(objH)) / 2;
    var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
    return objT + "|" + objL;
}

function resetBg() {
    var fullbg = $("#fullbg").css("display");
    if (fullbg == "block") {
        var bH2 = $("body").height();
        var bW2 = $("body").width() + 16;
        $("#fullbg").css({width: bW2, height: bH2});
        var objV = getObjWh("dialog");
        var tbT = objV.split("|")[0] + "px";
        var tbL = objV.split("|")[1] + "px";
        $("#dialog").css({top: tbT, left: tbL});
    }
}

//�رջ�ɫJS���ֲ�Ͳ�������
function closeBg() {
    $("#fullbg").css("display", "none");
    $("#dialog").css("display", "none");
}