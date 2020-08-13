//_teacherUtil.showTeacherList//��ʾֱ���б�
TeacherUtilObj.prototype.createSharedFile = function (i, friendnumber, parentfcode, comeFrom, currPage) {
    _fileUtil.friendnumber = friendnumber;
    //alert(_fileUtil.teacherName);
    if (0 == parentfcode) {
        _fileUtil.currLevel = 1;
        _fileUtil.createSharedFileArray(friendnumber, parentfcode, comeFrom, currPage);
    } else {
        var index = parseInt(i);
        // alert(index);
        //alert(fileObj.fileName);
        //alert(fileObj.shareType);
        //alert(fileObj.sharePassword);
        // alert(_fileUtil.currLevel);

        if (_fileUtil.currLevel > 1) {
            _fileUtil.createSharedFileArray(friendnumber, parentfcode, comeFrom, currPage); //����㼶����һ����������������
        } else {
            var fileObj = _fileUtil.fileList[index];
            if ('' != fileObj.sharePassword) {
                // alert(_fileUtil.currLevel);
                _sharePwdWindow.openPwdWindow(index);

            } else {
                //_fileUtil.currLevel++;
                _fileUtil.createSharedFileArray(friendnumber, parentfcode, comeFrom, currPage);
            }
        }


    }
}


//_teacherUtil.showTeacherList//��ʾֱ���б�
TeacherUtilObj.prototype.showTeacherList = function (currPage) {
    //alert('test');


    //�ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-ר��(֪ʶ��չ)3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ�� 8-��ϸҳ��
    _pm.putActMainPage(4);

    //alert(_teacherUtil.teacherList.length);

    var h = '';
    for (var i = 0; i < this.teacherList.length; i++) {

        var tempObj = this.teacherList[i];
        var id = tempObj.id;
        var teacherName = tempObj.teacherName;
        var teacherNumber = tempObj.teacherNumber;
        var avatarurl = tempObj.avatarurl;
        var selected = tempObj.selected;
        var shared = tempObj.shared;

        //alert(fileType);  
        //_fileUtil.createSharedFileArray(friendnumber,parentfcode,comeFrom,currPage);  
        var dclick = '_fileUtil.teacherName=\'' + teacherName + '\';';
        dclick += '_fileUtil.createFirstSharedFileArray(\'' + teacherNumber + '\',0,\'' + _teacherUtil.comeFrom + '\');';
        var sclick = "";//����


        var contextmenuStr = "";

        var iconPath = 'images/ren.png';

        sclick += '_teacherUtil.setSelectStatusByIndex(' + i + ');';//��ʾ��ѡ��
        sclick += '_teacherUtil.setSelectStatusCss(\'' + i + '\');';//��ʾ��ѡ��

        var pId_str = 'pid_' + i;
        h += '<li oncontextmenu ="' + contextmenuStr + '" ondblclick="' + dclick + '"  onclick="' + sclick + '"><p id="' + pId_str + '" ><img src="' + iconPath + '" /></p>' + teacherName + '</li>';


    }//end of for


    //alert(_teacherUtil.comeFrom);

    if (2 == _teacherUtil.comeFrom) {//����
        document.getElementById("netshare.btns").style.display = 'none';	//��ʾ���ܰ�ť
        document.getElementById("netshare.title").style.display = 'none';	//

        document.getElementById("friend.title").style.display = '';	//
        document.getElementById("friend.btns").style.display = '';	//

        _fileUtil.setPathNav('�ҵĺ���')//����Ŀ¼����
    } else {
        document.getElementById("netshare.btns").style.display = '';	//��ʾ���ܰ�ť
        document.getElementById("netshare.title").style.display = '';	//

        document.getElementById("friend.title").style.display = 'none';	//
        document.getElementById("friend.btns").style.display = 'none';	//

        _fileUtil.setPathNav('������Ա')//����Ŀ¼����
    }


    document.getElementById("btns").style.display = 'none';	//
    document.getElementById("backDir").style.display = 'none';	//
    document.getElementById("teachersize").style.display = 'none';	//


    var folderListHtmlObj = document.getElementById('folderList');
    folderListHtmlObj.style.height = document.documentElement.clientHeight - 105;

    if (h == "") h = "<li>�������繲��...</li>";
    if (null != folderListHtmlObj) folderListHtmlObj.innerHTML = h;


    //alert(posNow.innerHTML);
    //alert(document.documentElement.clientHeight);

    //alert(posNow.style.offsetHeight);
    //alert(posNow.style.top);

};
TeacherUtilObj.prototype.refreshLeftFolderTree = function () {
    //alert();
    parent.newLeft._leftTree.createFileArray();

}


TeacherUtilObj.prototype.setSelectStatusCss = function (index) {
    var i = parseInt(index);
    var pId_str = 'pid_' + i;
    if (_teacherUtil.teacherList[i].selected == true)
        document.getElementById(pId_str).className = 'sel';
    else
        document.getElementById(pId_str).className = '';

}


//����ѡ��״̬
TeacherUtilObj.prototype.setSelectStatus = function (currObj) {
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
 
 