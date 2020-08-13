//_fileUtil.showFileList//��ʾֱ���б�
FileUtilObj.prototype.showFileList = function (currPageNum) {
    //alert(currPageNum);
    this.currPage = currPageNum;

    var pageSize = _fileUtil.pageSize;
    var pageNum = _fileUtil.pageNum;

    //alert(pageNum);
    //alert(pageSize);

    var start = (pageSize) * (currPageNum - 1);
    var end = start + pageSize;


    //�ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-ר��(֪ʶ��չ)3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ�� 8-��ϸҳ��
    _pm.putActMainPage(4);

    //alert(_fileUtil.fileList.length);

    var h = '';
    h += '<ul class="folderList">';
    //for (var i = 0; i < this.fileList.length; i++) {
    var count = 0;
    var row = 0;
    for (var i = start; i < end && i < this.fileList.length; i++) {
        var fileObj = this.fileList[i];
        var id = fileObj.id;
        var fileName = fileObj.fileName;
        if (fileName.length > 10) fileName = fileName.substring(0, 8) + "��";

        var fCode = fileObj.fCode;
        var type = fileObj.type;
        var fileType = fileObj.fileType;

        //alert(type);  
        var dclick = '';
        var sclick = "";//����


        var iconPath = 'images/folder.png';
        var contextmenuStr = "_rightMenu.showRightMenu(" + i + ");";
        if (1 == type) {//1-�ļ��н����½�
            dclick += '_fileUtil.createFileArrayByClick(\'' + fCode + '\');';

        } else {
            iconPath = this.createIconPath(fileType);
            dclick = "dbclicplay('" + fileObj.fCode + "',2,null," + i + ");";
        }

        sclick += '_fileUtil.setSelectStatusByIndex(' + i + ');';//��ʾ��ѡ��
        sclick += '_fileUtil.setSelectStatusCss(\'' + i + '\');';//��ʾ��ѡ��

        var pId_str = 'pid_' + i;
        var line = count % 8;


        if (0 == (count) % 8) row++;
        var key_Id = "index_" + row + "_" + line;

        count++;
        //alert(key_Id);
        h += '<li  title="' + fileObj.fileName + '" ondblclick="' + dclick + '"  onclick="' + sclick + '">';
        h += '<a id="' + key_Id + '" href="#"><p id="' + pId_str + '" ><img src="' + iconPath + '" /></p></a>' + fileName + '</li>';
        //h+='<li><p class="sel"><img src="images/folder.png" /></p>'+fileName+'</li>';   


    }//end of for
    h += '</ul>';


    //


    /*******���ɷ�ҳ begin****/

    var pageStr = "";


    var jsStr = "";

    pageStr += '<div class="page pageRight" id="' + this.pageBarId + '" style="width:340px" >';

    var jsStr = '_fileUtil.backDir();';
    var key_Id = "";
    if (0 != _fileUtil.currLevel) {
        key_Id = "index_" + (row + 1) + "_" + 1;
        pageStr += '<div class="pageNext"><a id="' + key_Id + '"  href="#" onclick="' + jsStr + '">�ϼ�Ŀ¼</a></div>';
    }

    key_Id = "index_" + (row + 1) + "_" + 0;
    pageStr += '<div class="pageNext"><a id="' + key_Id + '" href="#"  onclick="teacherfileplay(_fileUtil.getSelectedFcodes(),2);">���</a></div>';
    //��ʾ��һҳ
    //alert (currPageNum +'< '+pageNum) ;
    if (currPageNum < pageNum) {
        var next = currPageNum + 1;
        jsStr = "_fileUtil.showFileList(" + next + ")";
        pageStr += '<div class="pageNext"><a  href="#" onclick="' + jsStr + '">��һҳ</a></div>';
        //alert(pageStr);
    }
    //��ʾ��һҳ
    if (1 != currPageNum) {
        var up = currPageNum - 1;
        jsStr = "_fileUtil.showFileList(" + up + ")";
        pageStr += '<div class="pageNext"><a  href="#" onclick="' + jsStr + '">��һҳ</a></div>';
        //alert(pageStr);
    }
    pageStr += '<div class="pageNow">' + currPageNum + '/' + _fileUtil.pageNum + '</div>';

    pageStr += '</div>';
    h += pageStr;
    /*******���ɷ�ҳ end****/


    if (null != _pMain.getMain()) {
        try {
            _pMain.getMain().innerHTML = h;
            //alert("h="+h);
            _dirUtil.addDir(new DirObj(_fileUtil.currLevel, _fileUtil.currParentFcode, _fileUtil.currPage));//��¼
            document.getElementById("index_1_0").focus();
        } catch (e) {
            //alert(e);
            window.status = e + "  " + _pMain.getMain() == null;

        }
    }


};


//_fileUtil.clearSelectStatus();//��������ļ���ѡ����ʽ
FileUtilObj.prototype.clearSelectStatus = function () {
    for (var i = 0; i < _fileUtil.fileList.length; i++) {
        _fileUtil.fileList[i].selected = false;//����ѡ����Ϊfalse����δѡ�У�

        //��һ�޸���ʽΪδѡ��
        var pId_str = 'pid_' + i;
        document.getElementById(pId_str).className = '';


    }

}


FileUtilObj.prototype.setSelectStatusCss = function (index) {
    var i = parseInt(index);
    var pId_str = 'pid_' + i;
    //alert("ssxxx="+_fileUtil.fileList[i].selected);
    if (_fileUtil.fileList[i].selected == true)
        document.getElementById(pId_str).className = 'sel';
    else
        document.getElementById(pId_str).className = '';

}


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