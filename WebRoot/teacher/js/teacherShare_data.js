/********  ��ʦ�ļ��� begin*********/
var _teacherUtil = new TeacherUtilObj();

function TeacherUtilObj() {
    this.playStatusInfoId = 'playStatusInfoId';
    this.playBtnId = 'playBtnId';
    this.currParentFcode = 0;
    this.parentDir = '';
    this.currParentObj = null;//��ǰ������
    this.currPage = 1;//��ǰҳ
    this.currLevel = 0;//��ǰ�ȼ�
    this.titleId = "_mp3";
    this.FileNameId = "FileName";
    this.pageBarId = "pageBar";
    this.pageSize = 32;
    this.pageNum = 1;//��ҳ��
    this.pos = 1;//��߻����ұ�
    this.comeFrom = 1;//
    this.teacherList = new Array();
}

function TeacherObj(index, id, teacherName, teacherNumber, avatarurl) {

    this.index = index;
    this.id = id;
    this.teacherName = teacherName;// 
    this.teacherNumber = teacherNumber;// 
    this.avatarurl = avatarurl;
    this.selected = false;// 
    this.shared = false;// 


}

//_teacherUtil.add(obj)  
TeacherUtilObj.prototype.add = function (obj) {
    this.teacherList[this.teacherList.length] = obj;
}
//_teacherUtil.getFileObjByFcode(fCode) ����fcode����ļ�����
TeacherUtilObj.prototype.getFileObjByFcode = function (fCode) {
    for (var i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].fCode == fCode) {
            var tempObj = this.teacherList[i];
            //return tempObj;
            return new TeacherObj(-1, fCode, tempObj.fileName, tempObj.fileType, tempObj.fileSize, tempObj.type, '�ҵ��ļ���/' + tempObj.dir);
        }


    }//end of for
    //return new TeacherObj(id,fCode, fileName, fileType,fileSize,type,dir);
    return new TeacherObj('', '', '', '', '', '', '�ҵ��ļ���');
}
//_teacherUtil.setSelectStatus(i)//����ѡ��״̬  
TeacherUtilObj.prototype.setSelectStatusByIndex = function (index) {
    // alert(index);
    var i = parseInt(index);
    var fileObj = this.teacherList[i];
    if (fileObj.selected == false) {

        fileObj.selected = true;
        // alert( fileObj.fileName+'�ұ�ѡ����');
    } else {
        fileObj.selected = false;
        //alert( fileObj.fileName+'�ұ�ȡ��');
    }

};
//_teacherUtil.getSelectedFileObjCount()
TeacherUtilObj.prototype.getSelectedFileObjCount = function () {
    //if(undefined==index)
    var count = 0;
    for (var i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].selected == true)
            count++;

    }//end of for
    return count;

};

//_teacherUtil.getSelectedFileObjIndex()
TeacherUtilObj.prototype.getSelectedFileObjIndex = function () {
    //if(undefined==index)

    for (var i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].selected == true)
            return i;

    }//end of for
    return -1;

};


//_teacherUtil.backDir()  
TeacherUtilObj.prototype.backDir = function () {

};
//_teacherUtil.isContainFolderName(fileName)
TeacherUtilObj.prototype.isContainFolderName = function (fileName) {
    //if(undefined==index)

    for (var i = 0; i < this.teacherList.length; i++) {
        // if(1==type){//1-�ļ��н����½�
        if (this.teacherList[i].type == 1) {
            if (this.teacherList[i].fileName == fileName) {
                return true;
            }
        }

    }//end of for
    return false;

};
//_teacherUtil.isContainFileName(fileName,index)
TeacherUtilObj.prototype.isContainFileName = function (fileName, index) {
    //if(undefined==index)

    for (var i = 0; i < this.teacherList.length; i++) {
        if (index == i) break;
        else {
            if (this.teacherList[i].fileName == fileName) {
                return true;
            }
        }

    }//end of for
    return false;

};
TeacherUtilObj.prototype.createfriendlist = function () {

    _teacherUtil.comeFrom = 2;//
    _fileUtil.comeFrom = 2;

    _fileUtil.searchFlag = 0;
    _fileUtil.currLevel = 0;//��ǰ����Ϊ0
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, '-1', 1));//��¼	

    //var data="data={\"frdGroupId\":0,\"frdGroupName\":\"\",\"frdId\":0,\"frdRemark\":\"\",\"frdUserName\":\"\",\"interFaceType\":\"getFrdByUsername\",\"username\":\""+teachernumber+"\"}";
    var data = "data={'username':'" + teachernumber + "'}";
    ajaxJson("mcenter.friendlist", data, "gbk", function (result) {
        _teacherUtil.teacherList.length = 0;
        $(result.space_list).each(function (num) {
            //alert($(this).attr("truename"));
            var tempObj = new TeacherObj(num, $(this).attr("username"), $(this).attr("truename"), $(this).attr("username"), $(this).attr("avatarurl"));
            _teacherUtil.add(tempObj);
        });
        _teacherUtil.showTeacherList();
    });

}
//������������ //_teacherUtil.createHasSharedTeacherArrayRequest();  

TeacherUtilObj.prototype.createHasSharedTeacherArrayRequest = function (res_tite) {
    _teacherUtil.comeFrom = 1;//
    _fileUtil.comeFrom = 1;

    _fileUtil.searchFlag = 0;
    _fileUtil.currLevel = 0;//��ǰ����Ϊ0
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, '-1', 1));//��¼	


    var url = _common.getCurrServerPath() + "/teacher/getHasSharedTeacherListUI.do?1=1";
    var res_tite = $(".sou_box").attr("value");
    if (res_tite == "������ؼ���") {
        res_tite = ""
    }
    ;

    url += "&teachnumber=" + _common.getTeacherId();
    url += "&keyword=" + encodeURI(encodeURI(res_tite));
    url += "&ajaxdate=" + new Date();
    //alert(url);
    // prompt('',url);
    sendRequest(this.parseTeacherXmlToObject, url);/**/
    //this.parseFileXmlToObject();
};//end of ��������

//������������ //_teacherUtil.createFriendArrayRequest();  

TeacherUtilObj.prototype.createFriendArrayRequest = function () {
    _teacherUtil.comeFrom = 2;//
    _fileUtil.currLevel = 0;//��ǰ����Ϊ0
    _fileUtil.searchFlag = 0;
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, '-1', 1));//��¼	


    var url = _common.getCurrServerPath() + "/teacher/getFriendListUI.do?1=1";

    //createTeacherArrayRequesturl += "&parentfcode=" + parentfcode;
    url += "&teachnumber=" + _common.getTeacherId();
    url += "&ajaxdate=" + new Date();
    //alert(url);

    sendRequest(this.parseTeacherXmlToObject, url);/**/
    //this.parseFileXmlToObject();
};//end of ��������


//_teacherUtil ����������Ŀ��������Ŀ(���)
TeacherUtilObj.prototype.parseTeacherXmlToObject = function (xmldoc) {


    var fileNodes = xmldoc.selectNodes("//VCOM/teachers/teacher");//��ȡ

    //alert(fileNodes.length);
    _teacherUtil.teacherList.length = 0;//�����ʷ��¼
    for (var i = 0; i < fileNodes.length; i++) {
        var fileNode = fileNodes[i];


        var id = '';
        var teacherName = "";//
        var teacherNumber = "";//


        try {
            id = getXMLText(fileNode.selectNodes("id")); // 

            //alert(fileName);
        } catch (e) {
            //alert(e.message);
        }

        try {
            teacherName = getXMLText(fileNode.selectNodes("teacherName")); // 
        } catch (e) {
            //alert(e.message);
        }

        try {
            teacherNumber = getXMLText(fileNode.selectNodes("teacherNumber")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }


        var tempObj = new TeacherObj(i, id, teacherName, teacherNumber);
        //alert(tempObj.teacherName);
        _teacherUtil.add(tempObj);
    }// end of for
    //alert(_teacherUtil.teacherList.length);

    //alert('???');
    /****������ҳ�� begin******/
    var pageSize = _teacherUtil.pageSize;
    if (_teacherUtil.teacherList.length / (pageSize) > parseInt(_teacherUtil.teacherList.length / pageSize)) {
        _teacherUtil.pageNum = parseInt(_teacherUtil.teacherList.length / pageSize) + 1;
    } else {
        _teacherUtil.pageNum = parseInt(_teacherUtil.teacherList.length / pageSize);
    }
    //alert(_teacherUtil.pageNum); return;
    /*****������ҳ�� end*****/


    //alert();


    _teacherUtil.showTeacherList();
    /**
     if(_teacherUtil.pos=='left'){
			    _teacherUtil.showLeftFileTree();
			 }else{
		    	_teacherUtil.showFileList(1);
		     }*/

};// end of


//_teacherUtil.getSelectedTeacherNumber()
TeacherUtilObj.prototype.getSelectedTeacherNumber = function () {
    //if(undefined==index)

    var s = '';
    var count = 0;
    for (var i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].selected == true) {
            if (0 != count) s += ',';
            s += this.teacherList[i].teacherNumber;
            count++;
        }


    }//end of for

    return s;

};
//_teacherUtil.addFriend
TeacherUtilObj.prototype.addFriend = function (currentnum) {

    //alert(_teacherUtil.getSelectedTeacherNumber()); 
    var friendNumbers = _teacherUtil.getSelectedTeacherNumber();
    if ('' == friendNumbers) {
        alert('��ѡ����ѣ�');
        return;
    }
    if (friendNumbers.split(",").length > 1) {
        alert("һ��ֻ�������һ������!");
        return;
    }
    //var url = _common.getCurrServerPath() + "/teacher/addFriend.do?1=1";
    //url += "&teachnumber=" + _common.getTeacherId();
    //url += "&friendNumbers=" + friendNumbers;
    //url += "&ajaxdate=" + new Date();
    //alert(url);
    //prompt('',url);
    //sendRequest(this.parseStautsXml, url);/**/
    //this.parseFileXmlToObject();
    var data = "data={'username':'" + currentnum + "','fusername':'" + friendNumbers + "'}";
    ajaxJson("mcenter.addFriend", data, "gbk", function (result) {
        if (result.result == 0) {
            alert("�����ɹ�,��ȴ��Է����!");
        } else if (result.result == 1) {
            alert("��Ӻ���ʧ�ܣ�������(" + result.result + ")");
        } else if (result.result == 2) {
            alert("��Ӻ���ʧ�ܣ�������(" + result.result + ")");
        } else if (result.result == 3) {
            alert("��Ӻ���ʧ�ܣ�������(" + result.result + ")");
        } else if (result.result == 4) {
            alert("���ѷ��͹����󣬵ȴ��Է�ȷ��!");
        } else if (result.result == 5) {
            alert("�Է��Ѿ��Ǻ���!");
        } else if (result.result == 6) {
            alert("��Ӻ���ʧ�ܣ�������(" + result.result + ")");
        }
        // _teacherUtil.teacherList.length = 0;
        //$(result.rtnArray).each(function(num){
        //var tempObj =new  TeacherObj(num,$(this).attr("frdId"),$(this).attr("frdRealName"),$(this).attr("frdUserName"));
        //_teacherUtil.add(tempObj);
        //});//
        //_teacherUtil.showTeacherList();
    });
};//end of addFriend

//_teacherUtil.getSelectedTeacherNumber()
TeacherUtilObj.prototype.getSelectedIds = function () {
    //if(undefined==index)

    var s = '';
    var count = 0;
    for (var i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].selected == true) {
            if (0 != count) s += ',';
            s += this.teacherList[i].id;
            count++;
        }


    }//end of for

    return s;

};
//_teacherUtil.parseStautsXml
TeacherUtilObj.prototype.parseStautsXml = function (xmldoc) {
    //alert(xmldoc);
    var status = xmldoc.selectNodes("//VCOM/status")[0].text;//
    //alert(status);
    if (1 == status) {
        alert(xmldoc.selectNodes("//VCOM/info")[0].text);
        return;
    }
    //alert();
    _teacherUtil.createHasSharedTeacherArrayRequest();
    //alert();


};// end of
//ɾ������
//_teacherUtil.deleteFriend()
TeacherUtilObj.prototype.deleteFriend = function () {

    var friendNumbers = _teacherUtil.getSelectedTeacherNumber();
    if ('' == friendNumbers) {
        alert('��ѡ����ѣ�');
        return;
    }
    if (friendNumbers.split(",").length > 1) {
        alert("һ��ֻ����ɾ��һ������!");
        return;
    }
    //var url = _common.getCurrServerPath() + "/teacher/deleteFriend.do?1=1";
    //url += "&teachnumber=" + _common.getTeacherId();
    //url += "&friendNumbers=" + friendNumbers;
    //url += "&ajaxdate=" + new Date();
    //alert(url);
    //prompt('',url);
    //sendRequest(this.parseDeleteFriendXml, url);/**/
    //this.parseFileXmlToObject();
    var data = "data={'username':'" + currentnum + "','fusername':'" + friendNumbers + "'}";
    ajaxJson("mcenter.delFriend", data, "gbk", function (result) {
        if (result.result == 0) {
            _leftTree.myFriend();
        } else {
            alert("ɾ������ʧ�ܣ�������(" + result.result + ")!");
        }
    });
};//end of deleteFriend


//_teacherUtil.parseStautsXml
TeacherUtilObj.prototype.parseDeleteFriendXml = function (xmldoc) {
    //alert(xmldoc);
    var status = xmldoc.selectNodes("//VCOM/status")[0].text;//
    //alert(status);
    if (1 == status) {
        alert(xmldoc.selectNodes("//VCOM/info")[0].text);
        return;
    }
    //alert();
    _teacherUtil.createFriendArrayRequest();
    //alert();


};// end of

/********    end*********/

