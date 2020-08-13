var _dirUtil = new DirUtilObj();

function DirUtilObj() {
    this.dirList = new Array();
}

//_dirUtil.addDir(dirObj)  
DirUtilObj.prototype.addDir = function (dirObj) {
    if (undefined == dirObj.navStr) dirObj.navStr = '';
    //alert('_dirUtil.addDir(dirObj)  level='+dirObj.level +' parentFcode='+dirObj.parentFcode);
    //�����ظ����
    for (var i = 0; i < this.dirList.length; i++) {
        //alert(this.dirList[i].level);
        if (dirObj.level == this.dirList[i].level) {
            // alert();
            // return this.dirList[i];
            this.dirList[i] = dirObj;
            //alert('�����ظ�');
            return;
        }
    }
    this.dirList[this.dirList.length] = dirObj;
};
//
DirUtilObj.prototype.getDirByLevel = function (level) {
    for (var i = 0; i < this.dirList.length; i++) {
        //alert(this.dirList[i].level);
        if (level == this.dirList[i].level) {
            // alert();
            return this.dirList[i];
        }
    }
    return null;
    //this.dirList[this.dirList.length] = dirObj;
};

// _dirUtil.addDir(new DirObj(level,parentFcode, currPage,navStr));
function DirObj(level, parentFcode, currPage, navStr) {

    this.level = level;
    this.parentFcode = parentFcode;// 
    this.currPage = currPage;// 
    this.navStr = navStr;// 
}


/********  ��ʦ�ļ��� begin*********/
var _fileUtil = new FileUtilObj();

function FileUtilObj() {
    this.playStatusInfoId = 'playStatusInfoId';
    this.playBtnId = 'playBtnId';
    this.currParentFcode = 0;
    this.parentDir = '';
    this.currParentObj = null;//��ǰ������
    this.currPage = 1;//��ǰҳ
    this.currLevel = -1;//��ǰ�ȼ�
    this.currIndex = 0;//��ǰ
    this.currSort = '';//��ǰ����
    this.titleId = "_mp3";
    this.FileNameId = "FileName";
    this.pageBarId = "pageBar";
    this.pageSize = 32;
    this.pageNum = 1;//��ҳ��
    this.pos = 1;//��߻����ұ�
    this.comeFrom = 0;// 1-���繲��2-���� _fileUtil.comeFrom
    this.friendNumber = '';//_fileUtil.friendNumber
    this.teacherName = '';//_fileUtil.teacherName
    this.searchFlag = 0;
    this.fileList = new Array();
}

function FileObj(id, fCode, fileName, fileType, fileSize, type, dir, shareType, sharePassword, c6, c7) {

    this.id = id;
    this.fCode = fCode;// 
    this.fileName = fileName;// 
    this.fileType = fileType;// 
    this.fileSize = fileSize;// 
    this.type = type;// 
    this.selected = false;// 

    this.dir = dir;// ����·��
    this.shareType = shareType;// 
    this.sharePassword = sharePassword;// 
    this.c6 = c6;
    this.c7 = c7;

}

FileUtilObj.prototype.selfCode = "0";
FileUtilObj.prototype.aredCode = "0";
//_fileUtil.getFileObjByFcode(fCode) ����fcode����ļ�����
FileUtilObj.prototype.getFileObjByFcode = function (fCode) {
    for (var i = 0; i < this.fileList.length; i++) {

        if (this.fileList[i].fCode == fCode) {
            var tempObj = this.fileList[i];
            //return tempObj;
            return new FileObj(-1, fCode, tempObj.fileName, tempObj.fileType, tempObj.fileSize, tempObj.type, '�ҵ��ļ���/' + tempObj.dir);
        }


    }//end of for
    //return new FileObj(id,fCode, fileName, fileType,fileSize,type,dir);
    return new FileObj('', '', '', '', '', '', '�ҵ��ļ���');
}

//_fileUtil.getFileObjByFcode(fCode) ����fcode����ļ�����
FileUtilObj.prototype.getFileObjByFileName = function (fName) {
    for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].fileName == fName) {
            var tempObj = this.fileList[i];
            //return tempObj;
            return new FileObj(-1, tempObj.fCode, tempObj.fileName, tempObj.fileType, tempObj.fileSize, tempObj.type, '�ҵ��ļ���/' + tempObj.dir);
        }
    }//end of for
    return new FileObj('', '', '', '', '', '', '�ҵ��ļ���');
}

//_fileUtil.setSelectStatus(i)//����ѡ��״̬  
FileUtilObj.prototype.setSelectStatusByIndex = function (index) {
    // alert(index);
    var i = parseInt(index);
    var fileObj = this.fileList[i];
    if (fileObj.selected == false) {

        fileObj.selected = true;
        // alert( fileObj.fileName+'�ұ�ѡ����');
    } else {
        fileObj.selected = false;
        //alert( fileObj.fileName+'�ұ�ȡ��');
    }

};
//_fileUtil.getSelectedFileObjCount()
FileUtilObj.prototype.getSelectedFileObjCount = function () {
    //if(undefined==index)
    var count = 0;
    for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].selected == true)
            count++;

    }//end of for
    return count;

};

//_fileUtil.getSelectedFileObjIndex()
FileUtilObj.prototype.getSelectedFileObjIndex = function () {
    //if(undefined==index)

    for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].selected == true)
            return i;

    }//end of for
    return -1;

};

//_fileUtil.getSelectedFcodes()
FileUtilObj.prototype.getSelectedFcodes = function () {
    //if(undefined==index)

    var s = '';
    var count = 0;
    for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].selected == true) {
            if (0 != count) s += ',';
            s += this.fileList[i].fCode;
            count++;
        }


    }//end of for
    return s;

};

//_fileUtil.backDir()  
FileUtilObj.prototype.backDir = function () {
    if (_fileUtil.searchFlag == 1) {
        _leftTree.myFolder();
        return;
    }
    //alert(this.currLevel-1);
    //alert('level1='+(this.currLevel-1));
    //alert('level2='+(this.currLevel-1));

    var level = this.currLevel - 1;
    //alert("level="+level);
    //alert('��ǰ�㼶Ϊ��'+this.currLevel+'  ��level='+level);
    var dirObj = _dirUtil.getDirByLevel(level);//ȡ����һ��Ŀ¼����Ϣ
    //var dirObj=_dirUtil.getDirByLevel(1);//ȡ����һ��Ŀ¼����Ϣ

    //alert('level3='+(this.currLevel-1));
    //
    if (null == dirObj) {
        alert('��ʱ���������µ�¼!');
        return;
    }


    //_fileUtil.currLevel=dirObj.level;
    _fileUtil.currParentFcode = dirObj.parentFcode;
    _fileUtil.currPage = dirObj.currPage;

    //alert('parentfcode='+_fileUtil.currParentFcode+'  level='+dirObj.level);

    if (0 == _fileUtil.comeFrom) {

        //_fileUtil.currLevel,_fileUtil.currParentFcode, _fileUtil.currPage
        //alert('�ϼ�Ŀ¼��parentFcode='+dirObj.parentFcode);
        this.createFileArrayBack(dirObj.parentFcode, _fileUtil.currPage);
    } else {
        //_teacherUtil.createFriendArrayRequest();  
        //_fileUtil.createSharedFileArray(friendnumber,parentfcode,comeFrom,currPage);
        //alert('level='+(this.currLevel-1));
        //alert(level+'  '+dirObj.parentFcode);
        if (level == 0 || dirObj.parentFcode < 0) {
            //alert(_fileUtil.comeFrom);
            if (1 == _fileUtil.comeFrom) _teacherUtil.createHasSharedTeacherArrayRequest();//createHasSharedTeacherArrayRequest
            if (2 == _fileUtil.comeFrom) _teacherUtil.createFriendArrayRequest();
            //if(2==_fileUtil.comeFrom) _teacherUtil.createfriendlist();
        } else {
            //alert('2  parentfcode='+_fileUtil.currParentFcode+'  level='+dirObj.level);
            _fileUtil.createSharedFileArrayBack(_fileUtil.friendnumber, _fileUtil.currParentFcode, _fileUtil.comeFrom, 1);
        }
    }
};
//_fileUtil.isContainFolderName(fileName)
FileUtilObj.prototype.isContainFolderName = function (fileName) {
    //if(undefined==index)

    for (var i = 0; i < this.fileList.length; i++) {
        // if(1==type){//1-�ļ��н����½�
        if (this.fileList[i].type == 1) {
            if (this.fileList[i].fileName == fileName) {
                return true;
            }
        }

    }//end of for
    return false;

};
//_fileUtil.isContainFileName(fileName,index)
FileUtilObj.prototype.isContainFileName = function (fileName, index) {
    //if(undefined==index)


    for (var i = 0; i < this.fileList.length; i++) {
        if (index == i) continue;
        else {
            if (this.fileList[i].fileName == fileName) {
                return true;
            }
        }

    }//end of for
    return false;

};
//_fileUtil.addFile(FileObj)  
FileUtilObj.prototype.addFile = function (fileObj) {
    this.fileList[this.fileList.length] = fileObj;
};

FileUtilObj.prototype.createFileArrayBack = function (parentfcode, currPage, nav) {
    _fileUtil.currLevel--;
    this.createFileArrayRequest(parentfcode, currPage);
}
FileUtilObj.prototype.createFileArrayByLeft = function (parentfcode, currPage, nav) {
    this.currParentObj = this.currParentObj = new FileObj(-1, '', '', '', '', '', nav);
    //alert();
    this.currSort = '';//�ָ�ΪĬ������
    this.createFileArrayRequest(parentfcode, currPage);
}
FileUtilObj.prototype.createFileArrayByClick = function (parentfcode, currPage) {
    this.currSort = '';//�ָ�ΪĬ������
    this.currParentObj = this.getFileObjByFcode(parentfcode);
    //alert("level="+_fileUtil.currLevel+"fcode="+_fileUtil.currParentFcode+"currPage="+ _fileUtil.currPage);
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, _fileUtil.currParentFcode, _fileUtil.currPage));//��¼	
    _fileUtil.currLevel++;
    this.createFileArrayRequest(parentfcode, currPage);
}

//ֻ��ˢ�µ�ǰҳ����������level  _fileUtil.createFileArray.(parentfcode,currPage,sort);
FileUtilObj.prototype.createFileArray = function (parentfcode, currPage) {
    this.createFileArrayRequest(parentfcode, currPage);
}
//
FileUtilObj.prototype.createSortFileArray = function (parentfcode, currPage, sort) {
    this.currSort = sort;
    this.createFileArrayRequest(parentfcode, currPage);
}


//�����ļ��������� //_fileUtil.createFileArrayRequest();  
FileUtilObj.prototype.createFileArrayRequest = function (parentfcode, currPage) {
    //alert(pos);
    this.currParentFcode = parentfcode;
    this.comeFrom = 0;// 1-���繲��2-���� _fileUtil.comeFrom
    this.searchFlag = 0;
    if (undefined == currPage) {
        this.currPage = 1;
    } else {
        this.currPage = currPage;
    }
    //
    //alert(this.pos);
    var url = _common.getCurrServerPath() + "/teacher/getFileList.do?1=1";

    url += "&parentfcode=" + parentfcode;
    url += "&teachnumber=" + _common.getTeacherId();


    url += "&sort=" + this.currSort; //��ǰ����;

    url += "&ajaxdate=" + new Date();

    _fileUtil.currParentFcode = parentfcode;
    //alert(_fileUtil.currParentFcode);
    //alert(url);
    sendRequest(this.parseFileXmlToObject, url);/**/
    //this.parseFileXmlToObject();
};//end of �����ļ�����

//���������ļ��������� //_fileUtil.createSharedFileArray(friendnumber,parentfcode,comeFrom,currPage);  
FileUtilObj.prototype.createSharedFileArray = function (friendnumber, parentfcode, comeFrom, currPage) {

    _fileUtil.currIndex = parseInt(_fileUtil.currIndex);
    //alert('???'+_fileUtil.currIndex);
    var level = _fileUtil.currLevel - 1;
    // alert(level);
    var navStr = '';
    var dirObj = _dirUtil.getDirByLevel(level);
    //alert('level='+level+'  '+dirObj.navStr);
    if (null != dirObj)
        navStr = dirObj.navStr + '/' + _fileUtil.fileList[_fileUtil.currIndex].fileName;

    //alert(navStr+'  navStr');
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, _fileUtil.currParentFcode, _fileUtil.currPage, navStr));//��¼	
    _fileUtil.currLevel++;
    window.status = '��ǰ��ȣ�' + _fileUtil.currLevel;
    this.createSharedFileArrayRequest(friendnumber, parentfcode, comeFrom, currPage);
}
//_fileUtil.createFirstSharedFileArray
FileUtilObj.prototype.createFirstSharedFileArray = function (friendnumber, parentfcode, comeFrom, currPage) {
    //alert('ll');

    var navStr = '';
    _fileUtil.currLevel = 1;
    _dirUtil.addDir(new DirObj(_fileUtil.currLevel, _fileUtil.currParentFcode, _fileUtil.currPage, navStr));//��¼	

    window.status = '��ǰ��ȣ�' + _fileUtil.currLevel;
    this.createSharedFileArrayRequest(friendnumber, '', comeFrom, currPage);
}

FileUtilObj.prototype.createSharedFileArrayBack = function (friendnumber, parentfcode, comeFrom, currPage) {
    //alert(_fileUtil.currLevel);
    _fileUtil.currLevel--;
    this.createSharedFileArrayRequest(friendnumber, parentfcode, comeFrom, currPage);
}


FileUtilObj.prototype.createSharedFileArrayRequest = function (friendnumber, parentfcode, comeFrom, currPage) {
    //this.currParentFcode = parentfcode;
    //alert('level='+_fileUtil.currLevel+'  '+this.currParentFcode+'=='+parentfcode);
    _fileUtil.friendNumber = friendnumber;// 
    //alert('createSharedFileArray='+_fileUtil.currParentFcode);
    this.comeFrom = comeFrom;// 1-���繲��2-���� _fileUtil.comeFrom
    this.searchFlag = 0;


    if (undefined == currPage) {
        this.currPage = 1;
    } else {
        this.currPage = currPage;
    }
    //
    //alert(this.pos);
    var url = _common.getCurrServerPath() + "/teacher/getFileList.do?1=1";

    if ('' == parentfcode) url += "&sharetype=1";//ֻ�е�һ����Ҫ��֤����

    url += "&parentfcode=" + parentfcode;
    url += "&teachnumber=" + friendnumber;
    url += "&ajaxdate=" + new Date();
    //alert(url);
    _fileUtil.currParentFcode = parentfcode;
    sendRequest(this.parseFileXmlToObject, url);/**/
}

function getXMLText(xmlNode) {
    var text = '';
    if (window.ActiveXObject) {
        text = xmlNode[0].text;
    } else {
        text = xmlNode[0].textContent;
    }
    return text;
}

//_fileUtil ����������Ŀ��������Ŀ(���)
FileUtilObj.prototype.parseFileXmlToObject = function (xmldoc) {
    //alert(_fileUtil.pos);
    //alert(xmldoc.xml);

    var parentDir = '';
    try {
        parentDir = getXMLText(xmldoc.selectNodes("//VCOM/parentDir"));
    } catch (e) {
    }

    _fileUtil.parentDir = parentDir;


    var fileNodes = xmldoc.selectNodes("//VCOM/files/file");//��ȡ
    //alert(fileNodes.length);
    _fileUtil.fileList.length = 0;//�����ʷ��¼

    for (var i = 0; i < fileNodes.length; i++) {
        var fileNode = fileNodes[i];


        var id = i;
        var fCode = "";//
        var fileName = "";//
        var fileType = "";//
        var fileSize = "";// 
        var type = "";// 
        var dir = "";// 
        var shareType = "";// 
        var sharePassword = "";// 
        var c6 = "";
        var c7 = "";
        try {
            shareType = getXMLText(fileNode.selectNodes("shareType")); // 
            //alert('shareType='+shareType); 
        } catch (e) {
            //alert(e.message);
        }
        try {
            sharePassword = getXMLText(fileNode.selectNodes("sharePassword")); // 
            //alert('sharePassword='+sharePassword);
        } catch (e) {
            //alert(e.message);
        }
        try {
            fileName = getXMLText(fileNode.selectNodes("fileName")); // 

            //alert(fileName);
        } catch (e) {
            //alert(e.message);
        }

        try {
            fileType = getXMLText(fileNode.selectNodes("fileType")); // 
        } catch (e) {
            //alert(e.message);
        }

        try {
            fCode = getXMLText(fileNode.selectNodes("fCode")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }
        try {
            type = getXMLText(fileNode.selectNodes("type")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }

        try {
            fileSize = getXMLText(fileNode.selectNodes("filesize")); // 
            //alert(fileSize);
        } catch (e) {

        }

        try {
            dir = getXMLText(fileNode.selectNodes("dir")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }

        try {
            c6 = getXMLText(fileNode.selectNodes("c6")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }
        try {
            c7 = getXMLText(fileNode.selectNodes("c7")); // 
            //alert(fCode);
        } catch (e) {
            //alert(e.message);
        }
        //alert(fileName+'  sharePassword='+sharePassword);
        var areaCode = "0"
        try {
            areaCode = getXMLText(fileNode.selectNodes("areaCode"));

        } catch (e) {
        }
        var selfCode = "0"
        try {
            selfCode = getXMLText(fileNode.selectNodes("selfCode"));

        } catch (e) {

        }


        var fileObj = new FileObj(id, fCode, fileName, fileType, fileSize, type, dir, shareType, sharePassword, c6, c7);
        //alert(fileObj.dir);
        fileObj.areaCode = areaCode;
        fileObj.selfCode = selfCode;
        _fileUtil.addFile(fileObj);
    }// end of for
    //alert(_fileUtil.fileList.length);
    /****������ҳ�� begin******/
    var pageSize = _fileUtil.pageSize;
    if (_fileUtil.fileList.length / (pageSize) > parseInt(_fileUtil.fileList.length / pageSize)) {
        _fileUtil.pageNum = parseInt(_fileUtil.fileList.length / pageSize) + 1;
    } else {
        _fileUtil.pageNum = parseInt(_fileUtil.fileList.length / pageSize);
    }
    //alert(_fileUtil.pageNum); return;
    /*****������ҳ�� end*****/


    //_dirUtil.addDir(new DirObj(level,parentFcode, currPage));


    _fileUtil.showFileList(_fileUtil.currPage);

    /**
     if(_fileUtil.pos=='left'){
			    _fileUtil.showLeftFileTree();
			 }else{
		    	_fileUtil.showFileList(1);
		     }*/

};// end of


//����ͼƬ·��
FileUtilObj.prototype.createIconPath = function (fileType) {
    fileType = fileType.toLowerCase();
    var arr = ['264avi', '264ts', 'avi', 'bmp', 'chm', 'doc', 'docx', 'exe', 'flv', 'gif', 'htm',
        'html', 'jpg', 'jpeg', 'mp3', 'pdf', 'png', 'ppt', 'pptx', 'rar', 'rm', 'rmvb', 'swf',
        'txt', 'wav', 'wma', 'xls', 'xlsx', 'zip', 'mp4'];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == fileType) {
            return _common.getCurrServerPath() + "/teacher/icon/" + fileType + ".png";
        }
    }
    fileType = 'other';
    return _common.getCurrServerPath() + "/teacher/icon/" + fileType + ".png";


}

//_fileUtil.createSearchFileArray(keyword,currPage);
FileUtilObj.prototype.createSearchFileArray = function (keyword, currPage) {
    this.createSearchFileArrayRequest(keyword, currPage);
}

//_fileUtil.createSearchFileArrayRequest(keyword,currPage);
FileUtilObj.prototype.createSearchFileArrayRequest = function (keyword, currPage) {


    this.searchFlag = 1;


    if (undefined == currPage) {
        this.currPage = 1;
    } else {
        this.currPage = currPage;
    }

    //
    //alert(this.pos);
    var url = _common.getCurrServerPath() + "/teacher/searchFileList.do?1=1";


    //url += "&keyword=" +  encodeURIComponent(encodeURIComponent(keyword));;
    url += "&keyword=" + keyword;
    ;
    url += "&teachnumber=" + _common.getTeacherId();
    url += "&ajaxdate=" + new Date();
    //alert(url);
    sendRequest(this.parseFileXmlToObject, url);/**/
}

/********    end*********/

