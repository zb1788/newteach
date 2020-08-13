//_fileUtil.setPathNav(navStr)//����Ŀ¼����
FileUtilObj.prototype.setPathNav = function (navStr) {

    if (0 != _fileUtil.comeFrom && undefined == navStr) {
        //alert(_fileUtil.teacherName);
        //alert(navStr);
        var level = _fileUtil.currLevel - 1;
        var dirObj = _dirUtil.getDirByLevel(level);
        try {
            navStr = _fileUtil.teacherName + dirObj.navStr;
        } catch (e) {
            window.status = '�����д�';
        }
        //navStr=_fileUtil.teacherName+navStr.substring(5,navStr.length);
    } else if (undefined == navStr) {
        navStr = _fileUtil.parentDir;
    }
    if (navStr.length > 32)
        navStr = "��" + navStr.substring(navStr.length - 32, navStr.length);
    document.getElementById("nav.dir").innerHTML = navStr;	//��ʾ���ܰ�ť
}


//_fileUtil.validateFileName(fileName)//��֤�ļ���
FileUtilObj.prototype.validateFileName = function (fileName) {

    var patrn = /^[a-zA-Z0-9\u4e00-\u9fa5._\(\)����������]+$/g;
    if (!patrn.exec(fileName)) {
        alert('�ļ���ֻ�ܰ��������֡�������ĸ���������֡������»��ߣ�_���������㣨.�������ַ�!');
        return false;
        //return false  

    }
    return true;

}
//_fileUtil.validateFolderName(folderName)//��֤�ļ���
FileUtilObj.prototype.validateFolderName = function (folderName) {

    var patrn = /^[a-zA-Z0-9\u4e00-\u9fa5._]+$/g;
    if (!patrn.exec(folderName)) {
        alert('�ļ���ֻ�ܰ��������֡�������ĸ���������֡������»��ߣ�_���������㣨.�������ַ�!');
        return false;
        //return false  

    }
    return true;

}


//_fileUtil.appendFile(fCode, fileName, fileType,fileSize,type,dir)//����ļ�
FileUtilObj.prototype.appendFile = function (fCode, fileName, fileType, fileSize, type, dir) {

    //FileObj(id,fCode, fileName, fileType,fileSize,type,dir,shareType,sharePassword);
    var i = this.fileList.length;
    var fileObj = new FileObj(i, fCode, fileName, fileType, fileSize, type, dir);
    _fileUtil.addFile(fileObj);


    //alert(fileType);  
    var dclick = '';
    var sclick = "";//����


    var iconPath = 'images/folder.gif';
    //alert(iconPath);
    if (1 == type) {//1-�ļ��н����¼�
        dclick = '_fileUtil.createFileArrayByClick(\'' + fCode + '\');';
        dclick += '_fileUtil.currIndex=' + i + ';';
        //
        //if(1==shareType)  iconPath='images/folderShare.png';

    } else {
        iconPath = this.createIconPath(fileType);
        dclick = "dbclicplay('" + fileObj.fCode + "',2,1," + i + ");";
    }

    sclick += '_fileUtil.setSelectStatusByIndex(' + i + ');';//��ʾ��ѡ��
    sclick += '_fileUtil.setSelectStatusCss(\'' + i + '\');';//��ʾ��ѡ��

    sclick += '_fileUtil.currIndex=' + i + ';';
    var pId_str = 'pid_' + i;


    var contextmenuStr = "";

    //֧���Ҽ��˵�
    // if(0==_fileUtil.comeFrom&&0==_fileUtil.searchFlag)
    // contextmenuStr="_rightMenu.showRightMenu("+i+");";


    var h = '<li index="' + i + '" fcode="' + fCode + '" onMouseDown="readyDrag(event)" ondrag="return false;"  oncontextmenu ="' + contextmenuStr + '" ondblclick="' + dclick + '"  onclick="' + sclick + '"><p id="' + pId_str + '"  index="' + i + '"><img  index="' + i + '" src="' + iconPath + '" /></p>' + fileName + '</li>';
    // alert(h);    

    var fileElement = document.createElement(h);

    var folderListHtmlObj = document.getElementById('folderList');
    if (null != folderListHtmlObj) {
        folderListHtmlObj.innerHTML += h;
        // alert(folderListHtmlObj.outerHTML);
    }
    // alert(fileElement);

}
//_fileUtil.getUserClass��ȡ�û��༶��Ϣ
FileUtilObj.prototype.getUserClass = function (url, username) {
    //var data="data={\"queryType\":\"byUserName\",\"userName\":\""+username+"\"}";
    var data = "queryType=byUserName&userName=" + username;
    var myDate = new Date();
    jQuery(function ($) {
        //$.getJSON(url+"TMS.401&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?",data,function(result){
        $.getJSON(url + "?time=" + myDate.getSeconds() + "&reqEncoding=gbk&jsoncallback=?", data, function (result) {
            $(result.rtnArray).each(function () {
                $("#userclass").append('<input name="input3" type="checkbox" value="' + $(this).attr("classId") + "," + $(this).attr("className") + '" />' + $(this).attr("className") + '');
            });
        })
    });
}

//_fileUtil.getUserClass_fileUp��ȡ�û��༶��Ϣ�ļ��ϴ���
FileUtilObj.prototype.getUserClass_fileUp = function (url, username) {
    //var data="data={\"queryType\":\"byUserName\",\"userName\":\""+username+"\"}";
    var data = "queryType=byUserName&userName=" + username;
    var myDate = new Date();
    jQuery(function ($) {
        // $.getJSON(url+"TMS.401&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?",data,function(result){
        $.getJSON(url + "?time=" + myDate.getSeconds() + "&reqEncoding=gbk&jsoncallback=?", data, function (result) {
            $(result.rtnArray).each(function () {
                $("#tuijian_ul").append('<li><input name="fileUpTjClassName" type="checkbox" value="' + $(this).attr("classId") + "," + $(this).attr("className") + '" />' + $(this).attr("className") + '</li>');
            });
        })
    });
}

////_fileUtil.getPanduanExt()�ж��û��Ƿ����ڻ��߲�����
FileUtilObj.prototype.getPanduanExt = function (url, username, groupid, type) {
    //var data="data={\"queryType\":\"byUserName\",\"userName\":\""+username+"\"}";
    var data = "queryType=byUserName&userName=" + username;
    //var interface="TMS.401";
    //if(type==1)interface="TMS.401";//�༶
    //else interface="TMS.402";//Ⱥ��
    var myDate = new Date();

    var userper = 0;
    jQuery(function ($) {
        //$.getJSON(url+interface+"&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?",data,function(result){
        $.getJSON(url + "?time=" + myDate.getSeconds() + "&reqEncoding=gbk&jsoncallback=?", data, function (result) {
            $(result.rtnArray).each(function () {
                if (type == 1) {
                    if ($(this).attr("classId") == groupid) userper = 1;
                } else {
                    if ($(this).attr("gtId") == groupid) userper = 1;
                }
            });
        })
    });
    if (userper == 0) {
        //$("#btns\\.1").attr("disabled",true);
        //$("#btns\\.2").attr("disabled",true);
        //$("#btns\\.3").attr("disabled",true);
        //$("#btns\\.4").attr("disabled",true);
        //$("#btns\\.5").attr("disabled",true);
        //$("#btns\\.6").attr("disabled",true);
        //$(".del").hide();
    }
}
//_fileUtil.getUserClass��ȡ�û�Ⱥ����Ϣ
FileUtilObj.prototype.getUserGroup = function (url, username) {
    //var data="data={\"queryType\":\"byUserName\",\"userName\":\""+username+"\"}";
    var data = "queryType=byUserName&userName=" + username;
    var myDate = new Date();
    jQuery(function ($) {
        //$.getJSON(url+"TMS.402&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?",data,function(result){
        $.getJSON(url + "?time=" + myDate.getSeconds() + "&reqEncoding=gbk&jsoncallback=?", data, function (result) {
            $(result.rtnArray).each(function () {
                $("#usergroup").append('<input name="input3" type="checkbox" value="' + $(this).attr("gtId") + "," + $(this).attr("gtName") + '" />' + $(this).attr("gtName") + '');
            });
        })
    });
}
//_fileUtil.deleteteacherRecommendɾ���û�Ⱥ����Ϣ
FileUtilObj.prototype.deleteteacherRecommend = function (id) {
    if (window.confirm("��ȷ��Ҫɾ�������Ƽ���Դ?")) {
        var data = "data=" + id;
        jQuery(function ($) {
            $.getJSON(global_basePath + "youjiao/deleteTuiJianRes.do", data, function (result) {
                if (result) {
                    alert(result.Success.msg);
                    _fileUtil.getteacherRecommend(teachernumber);
                } else alert("ɾ���Ƽ���Դʧ��!");
            })
        })
    }

}
//_fileUtil.saveteacherRecommend��ȡ�û�Ⱥ����Ϣ
FileUtilObj.prototype.saveteacherRecommend = function (username, usertruename, teacherjyjg) {
    var myDate = new Date();
    var sel = _fileUtil.getSelectedFcodes();
    var resGroup = "";
    if (sel == "") {
        alert("��ѡ����Ƽ�����Դ");
        return;
    } else {
        for (var i = 0; i < _fileUtil.fileList.length; i++) {
            var selectfi = _fileUtil.fileList[i];
            if (selectfi.selected == true) {
                if (resGroup == "") {
                    resGroup = resGroup + selectfi.fCode + "," + selectfi.fileName + ",RT002," + selectfi.fileType;
                } else {
                    resGroup = resGroup + "___" + selectfi.fCode + "," + selectfi.fileName + ",RT002," + selectfi.fileType;
                }

            }
        }
    }
    var groupid = "";
    $("#userclass input").each(function () {
        if ($(this).attr("checked")) {
            if (groupid == "") groupid = $(this).attr("value");
            else groupid = groupid + "___" + $(this).attr("value");
        }
    });
    $("#usergroup input").each(function () {
        if ($(this).attr("checked")) {
            if (groupid == "") groupid = $(this).attr("value");
            else groupid = groupid + "___" + $(this).attr("value");
        }
    });
    if (groupid == "") {
        alert("��ѡ����Ƽ��İ༶������Ⱥ��!");
        return;
    }
    //var data="data={'resGroup':'"+encodeURI(encodeURI(resGroup))+"','groups':'"+encodeURI(encodeURI(groupid))+"','userCode':'"+username+"','userName':'"+encodeURI(encodeURI(usertruename))+"','recommentType':'3','schoolCode':'"+teacherjyjg+"'}";
    var data = {
        'resGroup': encodeURI(encodeURI(resGroup)),
        'groups': encodeURI(encodeURI(groupid)),
        'userCode': username,
        'userName': encodeURI(encodeURI(usertruename)),
        'recommentType': '3',
        'schoolCode': teacherjyjg
    };
    //prompt('',data)
    sendRequest(function (xml) {
        var backxml = eval("(" + xml + ")");
        alert(backxml.Success.msg);
        _rightMenu.hideRecommendClass();
    }, global_basePath + "youjiao/saveTuiJianGroupRes.do", "post", data);
}

//_fileUtil.saveteacherRecommend��ȡ�û�Ⱥ����Ϣ
FileUtilObj.prototype.saveteacherRecommend_fileUp = function (username, usertruename, teacherjyjg, fileName) {
    var myDate = new Date();
    var resGroup = "";
    for (var i = 0; i < fileName.length; i++) {
        var selectfi = _fileUtil.getFileObjByFileName(fileName[i])

        if (resGroup == "") {
            resGroup = resGroup + selectfi.fCode + "," + selectfi.fileName + ",RT002," + selectfi.fileType;
        } else {
            resGroup = resGroup + "___" + selectfi.fCode + "," + selectfi.fileName + ",RT002," + selectfi.fileType;
        }
    }
    var groupid = "";
    $('input[name=fileUpTjClassName]:checked').each(function () {
        if (groupid == "") groupid = $(this).attr("value");
        else groupid = groupid + "___" + $(this).attr("value");
    });

    //var data="data={'resGroup':'"+encodeURI(encodeURI(resGroup))+"','groups':'"+encodeURI(encodeURI(groupid))+"','userCode':'"+username+"','userName':'"+encodeURI(encodeURI(usertruename))+"','recommentType':'3','schoolCode':'"+teacherjyjg+"'}";
    var data = {
        'resGroup': encodeURI(encodeURI(resGroup)),
        'groups': encodeURI(encodeURI(groupid)),
        'userCode': username,
        'userName': encodeURI(encodeURI(usertruename)),
        'recommentType': '3',
        'schoolCode': teacherjyjg
    };
    sendRequest(function (xml) {
        var backxml = eval("(" + xml + ")");
        alert(backxml.Success.msg);
        tocloseup();
    }, global_basePath + "youjiao/saveTuiJianGroupRes.do", "post", data);
}


//_fileUtil.getteacherRecommend��ʦ�Ƽ���Դ��ȡ
FileUtilObj.prototype.getteacherRecommend = function (classId) {
    //var data="data={'groupId':'"+classId+"','listType':'1','pageNum':'10'}";
    var data = {'groupId': classId, 'listType': '1', 'pageNum': '10'};
    var myDate = new Date();
    jQuery(function ($) {
        $.getJSON(global_basePath + "youjiao/listTuiJianRes.do?time=" + myDate.getSeconds(), data, function (result) {
            var h = "";
            var del = "";
            $(result.TuiJianList).each(function () {
                if (currentuser != classTeacher) del = '<a href="javascript:_fileUtil.deleteteacherRecommend(' + $(this).attr("id") + ')" class="del">ɾ��</a>';
                if (!typecode || typecode == "" || typecode == "null") {
                    h += '<li title="' + $(this).attr("resTitle") + '" filetype="' + $(this).attr("resFormat") + '" fcode="' + $(this).attr("fCode") + '" ondrag="return false;"  ondblclick=""  onclick=""><p><img src="' + _fileUtil.createIconPath($(this).attr("resFormat")) + '" /></p>' + $(this).attr("resTitle") + '</li>';
                } else {
                    h += '<tr class="list" >' +
                        '<td align="center" width="30"><input name="input" type="checkbox" value="1" disabled/></td>' +
                        '<td width="17" align="center"><img src="' + _fileUtil.createIconPath($(this).attr("resFormat")) + '" width="18" height="18" /></td>' +
                        '<td align="left">' + $(this).attr("resTitle") + '</td>' +
                        '<td width="70" align="center"></td>' +
                        '<td width="70" align="center">' + $(this).attr("userName") + '</td>' +
                        '<td width="100" align="center">' + $(this).attr("collectDate") + '</td>';
                    if ($(this).attr("recommentType") == 3) {
                        h += '<td width="100" align="left"><a href="javascript:dbclicplay(\'' + $(this).attr("RCode") + '\',2,1);" class="blue">Ԥ��</a> ' + del + '</td>';
                    } else {
                        h += '<td width="100" align="left"><a href="' + global_basePath + '/youjiaoplay/youJiaoPlay.do?data={\'username\':\'' + currentuser + '\',\'areaId\':\'' + areaId + '\',\'rcode\':\'' + $(this).attr("RCode") + '\',\'type\':\'1\',\'bodyId\':\'\',\'cusip\':\'' + ip + '\',\'filetype\':\'' + $(this).attr("resFormat") + '\'}" class="blue" target="_blank">Ԥ��</a> ' + del + '</td>';
                    }
                    h += '</tr>';
                }

            });
            if (h != "") {
                $("#recommendmess").show();
                $("#recommendhead").show();
                $("#recommendListtable").html(h);
                $("#teacherrecommendsize").html("��" + result.TuiJianList.length + "����");
                $("#allfilesize").html("��" + (parseInt($("#teacherrecommendsize").html().replace(/[^0-9]?/g, "")) + parseInt($("#spaceuploadsize").html().replace(/[^0-9]?/g, ""))) + "����");
            }

        })
    });
}
//_fileUtil.showFileList//��ʾֱ���б�
FileUtilObj.prototype.showFileList = function (currPage) {
    //alert(currPage);


    //�ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-ר��(֪ʶ��չ)3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ�� 8-��ϸҳ��
    _pm.putActMainPage(4);

    //alert(_fileUtil.fileList.length);

    var h = '';
    for (var i = 0; i < this.fileList.length; i++) {

        var fileObj = this.fileList[i];
        var id = fileObj.id;
        var fileName = fileObj.fileName;
        var fCode = fileObj.fCode;
        var type = fileObj.type;
        var fileType = fileObj.fileType;
        var shareType = fileObj.shareType;
        var dir = fileObj.dir;
        var fileSize = fileObj.fileSize;
        var c6 = fileObj.c6;
        var c7 = fileObj.c7;

        //alert(fileType);  
        var dclick = '';
        var sclick = "";//����


        var iconPath = 'images/folder.gif';
        //alert(iconPath);
        if (1 == type) {//1-�ļ��н����¼�
            _fileUtil.friendNumber
            if (0 == _fileUtil.comeFrom) {
                dclick = '_fileUtil.createFileArrayByClick(\'' + fCode + '\');';
            } else {
                //alert(_fileUtil.friendNumber );
                dclick = '_teacherUtil.createSharedFile(' + i + ',\'' + _fileUtil.friendNumber + '\',\'' + fCode + '\',\'' + _fileUtil.comeFrom + '\');';
            }
            dclick += '_fileUtil.currIndex=' + i + ';';
            //
            if (1 == shareType) iconPath = 'images/folderShare.png';

        } else {
            iconPath = this.createIconPath(fileType);
            dclick = "dbclicplay('" + fileObj.fCode + "',2,1," + i + ");";
        }

        sclick += '_fileUtil.setSelectStatusByIndex(' + i + ');';//��ʾ��ѡ��
        sclick += '_fileUtil.setSelectStatusCss(\'' + i + '\');';//��ʾ��ѡ��

        sclick += '_fileUtil.currIndex=' + i + ';';
        var pId_str = 'pid_' + i;
        var liId_str = 'liId_' + i;


        var contextmenuStr = "";

        //֧���Ҽ��˵�
        // if(0==_fileUtil.comeFrom&&0==_fileUtil.searchFlag)
        // contextmenuStr="_rightMenu.showRightMenu("+i+");";

        var title = '';
        if (1 == _fileUtil.searchFlag) title = '�ҵ��ļ���/' + dir;
        var del = "";
        if (currentuser == classTeacher) del = '<a href="#" class="del" onclick="_fileWindow.openFlag=0;_fileUtil.deleteFile(' + fCode + ');">ɾ��</a>';
        else if (c7 == currentuser) del = '<a href="#" class="del" onclick="' + sclick + '_fileWindow.openFlag=0;_fileUtil.deleteFile();">ɾ��</a>';
        if (!typecode || typecode == "" || typecode == "null") {
            h += '<li id="' + liId_str + '" title="' + title + '" filetype="' + fileType + '" index="' + i + '" fcode="' + fCode + '" onMouseDown="readyDrag(event)" ondrag="return false;"  ondblclick="' + dclick + '"  onclick="' + sclick + '"><p id="' + pId_str + '"  index="' + i + '"><img  index="' + i + '" src="' + iconPath + '" /></p>' + fileName + '</li>';
        } else {
            h += '<tr id="' + pId_str + '" title="' + title + '" index="' + i + '" fcode="' + fCode + '" class="list" >' +
                '<td align="center" width="30" onclick="' + sclick + '"><input name="input" id="' + pId_str + '_input" type="checkbox" value="1" /></td>' +
                '<td ondblclick="' + dclick + '"  onclick="' + sclick + '" width="17" align="center"><img src="' + iconPath + '" width="18" height="18" /></td>' +
                '<td ondblclick="' + dclick + '"  onclick="' + sclick + '" align="left">' + fileName + '</td>' +
                '<td width="70" ondblclick="' + dclick + '"  onclick="' + sclick + '" align="center">' + fileSize + '</td>' +
                '<td width="70" ondblclick="' + dclick + '"  onclick="' + sclick + '" align="center">' + c6 + '</td>' +
                '<td width="100" ondblclick="' + dclick + '"  onclick="' + sclick + '" align="center">2012-03-05</td>' +
                '<td width="100" align="left"><a href="javascript:teacherfileplay(\'' + fCode + '\',2,1);" class="blue">Ԥ��</a>��<a href="javascript:teacherfiledownload(\'' + fCode + '\',3);" class="blue">����</a> ' + del + '</td>' +
                '</tr>';
            // alert("ss");
            //$("#folderListtable").append(h);
        }

        // alert(dclick);     


    }//end of for

    var folderListHtmlObj = document.getElementById('folderList');
    //alert(_fileUtil.currLevel);
    if (!typecode || typecode == "" || type == "null") {
        $("#folderList").html(h);
    } else {
        $("#folderListtable").html(h);
    }
    if (document.getElementById("spaceuploadsize")) {
        $("#spaceuploadsize").html("��" + this.fileList.length + "����");
        $("#allfilesize").html("��" + (parseInt($("#teacherrecommendsize").html().replace(/[^0-9]?/g, "")) + parseInt($("#spaceuploadsize").html().replace(/[^0-9]?/g, ""))) + "����");
    }
    // this.refreshLeftFolderTree();
    //if(null!=folderListHtmlObj)  folderListHtmlObj.innerHTML=h;	
    //_dirUtil.addDir(new DirObj(_fileUtil.currLevel,_fileUtil.currParentFcode, _fileUtil.currPage));//��¼	

    //alert(_fileUtil.currParentObj.dir);
    // if(null!=_fileUtil.currParentObj){
    _fileUtil.setPathNav();////��ʾ����·��
    //}


    if (document.getElementById("btns") && 1 == _fileUtil.searchFlag) {
        //���ذ�ť
        document.getElementById("btns").style.display = '';	//
        document.getElementById("btns.1").style.display = 'none';	//
        document.getElementById("btns.2").style.display = 'none';	//
        document.getElementById("btns.3").style.display = 'none';	//
        document.getElementById("btns.4").style.display = 'none';	//
        document.getElementById("btns.5").style.display = 'none';	//
        document.getElementById("btns.6").style.display = 'none';	//

        document.getElementById("btns.7").style.display = '';	//
        document.getElementById("btns.8").style.display = '';	//

        document.getElementById("teachersize").style.display = 'none';	//���ؿռ��С
        document.getElementById("backDir").style.display = '';
        _fileUtil.setPathNav('�������');////��ʾ����·��
    } else if (document.getElementById("btns") && 0 == _fileUtil.searchFlag) {
        //reflashteachersize();  
        if (0 == _fileUtil.comeFrom) {
            //��ʾ��ť
            document.getElementById("btns").style.display = '';	//
            document.getElementById("btns.1").style.display = '';	//
            document.getElementById("btns.2").style.display = '';	//
            document.getElementById("btns.3").style.display = '';	//
            document.getElementById("btns.4").style.display = '';	//
            document.getElementById("btns.5").style.display = '';	//
            document.getElementById("btns.6").style.display = '';	//
            document.getElementById("btns.7").style.display = '';	//
            document.getElementById("btns.8").style.display = '';	//

            document.getElementById("teachersize").style.display = '';	//��ʾ�ռ��С
            //
            if (_fileUtil.currLevel == 0) {
                document.getElementById("backDir").style.display = 'none';
            } else {
                document.getElementById("backDir").style.display = '';
            }
        } else {
            if (document.getElementById("btns")) {
                //���ذ�ť
                document.getElementById("btns").style.display = '';	//
                document.getElementById("btns.1").style.display = 'none';	//
                document.getElementById("btns.2").style.display = 'none';	//
                document.getElementById("btns.3").style.display = 'none';	//
                document.getElementById("btns.4").style.display = 'none';	//
                document.getElementById("btns.5").style.display = 'none';	//
                document.getElementById("btns.6").style.display = 'none';	//

                //��һ��������ʾ��������ذ�ť
                if (_fileUtil.currLevel > 1) {
                    document.getElementById("btns.7").style.display = '';	//
                    document.getElementById("btns.8").style.display = '';	//
                } else {
                    document.getElementById("btns.7").style.display = 'none';	//
                    document.getElementById("btns.8").style.display = 'none';	//
                }

                document.getElementById("teachersize").style.display = 'none';	//���ؿռ��С

                //
                if (_fileUtil.currLevel == 0) {
                    document.getElementById("backDir").style.display = 'none';
                } else {
                    document.getElementById("backDir").style.display = '';
                }
            }

        }
    }
    if (document.getElementById("friend.btns")) {
        //end of searchFlag
        document.getElementById("friend.title").style.display = 'none';	//
        //document.getElementById("backDir").style.display='';	//

        document.getElementById("netshare.btns").style.display = 'none';	//��ʾ���ܰ�ť
        document.getElementById("netshare.title").style.display = 'none';	//��ʾ���ܰ�ť
        document.getElementById("friend.btns").style.display = 'none';	//

    }

    //alert(posNow.innerHTML);
    //alert(document.documentElement.clientHeight);
    if (document.getElementById('folderList')) {
        document.getElementById('folderList').style.height = document.documentElement.clientHeight - 105;
    }
    //alert(posNow.style.offsetHeight);
    //alert(posNow.style.top);

    //alert('��ǰ����='+_fileUtil.currLevel);
};
FileUtilObj.prototype.refreshLeftFolderTree = function () {
    //alert();
    _leftTree.createFileArray();

}
//_fileUtil.showLeftFileTree//��ʾ�����
FileUtilObj.prototype.showLeftFileTree = function () {

    var d11 = new dTree('d11');
    //d.config.folderLinks = true;

    var jsStr = '';
    //alert(jsStr);
    d11.add(0, -1, '�ҵ��ļ���', jsStr, '', '');
    d11.config.useCookies = false;
    d11.config.folderLinks = false;
    //d11.add(12,0,'Recycle Bin','example01.html','','img/folder.gif','img/folder.gif');
    for (var i = 0; i < this.fileList.length; i++) {

        var fileObj = this.fileList[i];
        var id = fileObj.id;
        var fileName = fileObj.fileName;
        var fCode = fileObj.fCode;
        var type = fileObj.type;
        if (1 == type) {
            jsStr = 'javascript:' + 'alert();;';
            //alert(jsStr);
            d11.add(fCode, 0, fileName, jsStr, 'img/folder.gif', 'img/folder.gif');


        }
    }
    alert('df');
    leftTree.innerHTML = d11;
    //parent.newLeft.leftTree.innerHTML=d1;

}


FileUtilObj.prototype.setSelectStatusCss = function (index) {
    var i = parseInt(index);
    var pId_str = 'pid_' + i;
    if (!typecode || typecode == "" || typecode == "null") {
        if (_fileUtil.fileList[i].selected == true) $("#" + pId_str).addClass('sel');
        else $("#" + pId_str).removeClass('sel');
    } else {
        if (_fileUtil.fileList[i].selected == true) {
            $("#" + pId_str + "_input").attr("checked", true);
            $("#" + pId_str).css("background", "#CCC");
        } else {
            $("#" + pId_str + "_input").attr("checked", false);
            $("#" + pId_str).css("background", "url(../teacher/images/xBg.png) left bottom repeat-x");
        }
    }


}
//type==1,��ʾȫѡ�������ʾȫ��ѡ_fileUtil.selectAll(1);
FileUtilObj.prototype.selectAll = function (type) {
    if (!typecode || typecode == "" || typecode == "null") {
        $("#folderList li").each(function () {
            var index = $(this).attr("index");
            var i = parseInt(index);
            var fileObj = _fileUtil.fileList[i];
            if (type && !fileObj.selected) {
                _fileUtil.setSelectStatusByIndex(index);
                _fileUtil.setSelectStatusCss(index);
            } else if (fileObj.selected) {
                _fileUtil.setSelectStatusByIndex(index);
                _fileUtil.setSelectStatusCss(index);
            }

        });
    } else {
        $("#folderListtable tr").each(function () {
            var index = $(this).attr("index");
            var i = parseInt(index);
            var fileObj = _fileUtil.fileList[i];
            if (type && !fileObj.selected) {
                _fileUtil.setSelectStatusByIndex(index);
                _fileUtil.setSelectStatusCss(index);
            } else if (fileObj.selected) {
                _fileUtil.setSelectStatusByIndex(index);
                _fileUtil.setSelectStatusCss(index);
            }

        });
    }
}

//_fileUtil.clearSelectStatus();//��������ļ���ѡ����ʽ
FileUtilObj.prototype.clearSelectStatus = function () {
    for (var i = 0; i < _fileUtil.fileList.length; i++) {
        _fileUtil.fileList[i].selected = false;//����ѡ����Ϊfalse����δѡ�У�

        //��һ�޸���ʽΪδѡ��
        var pId_str = 'pid_' + i;
        document.getElementById(pId_str).className = '';

    }//end of for

}//end of clearSelectStatus


//����ѡ��״̬
FileUtilObj.prototype.setSelectStatus = function (currObj) {
    if (undefined == currObj || null == currObj) {
        return;
    }
    var objs = document.getElementById(this.FileNameId).children;
    for (var i = 0; i < objs.length; i++) {
        objs[i].className = "";//�޸���ʽ
    }
    /****/
    currObj.className = "sel";
};


//�жϱ�ѡ�е��ļ��Ƿ�Ϊ�ļ��� _fileUtil.isFolder();
FileUtilObj.prototype.isFolder = function () {
    //if(undefined!=index)
    for (var i = 0; i < _fileUtil.fileList.length; i++) {
        var currObj = _fileUtil.fileList[i];
        if (currObj.selected == true) {
            if (1 != currObj.type) {
                //alert(currObj.type);
                //alert(currObj.fileName+'�����ļ��У�');
                return false;
            }
        }
    }//end of for

    return true;

}//end of isFolder


///_fileUtil.nextPage()��һҳ
FileUtilObj.prototype.nextPage = function () {
    var obj = document.getElementById(this.pageBarId).getElementsByTagName("a");
    for (var i = 0; i < obj.length; i++) {
        var currObj = obj[i];
        var text = currObj.innerHTML.replace(/\s/g, "");
        //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
        if (text == "��һҳ" || text == "��һҳ") {
            currObj.click();
            break;
        }
    }//end of for
};//��һҳ
///_fileUtil.nextPage()��һҳ
FileUtilObj.prototype.upPage = function () {
    var obj = document.getElementById(this.pageBarId).getElementsByTagName("a");
    for (var i = 0; i < obj.length; i++) {
        var currObj = obj[i];
        var text = currObj.innerHTML.replace(/\s/g, "");
        //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
        if (text == "��һҳ" || text == "��һҳ") {
            currObj.click();
            break;
        }
    }//end of for
};//��һҳ