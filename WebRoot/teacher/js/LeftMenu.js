var d11 = null;
var __filepatrn = /[&><?"*:\/|\\]/;
var _leftTree = new LeftTreeObj();

function LeftTreeObj() {
    this.dirList = new Array();
}

var errarray = "";
LeftTreeObj.prototype.createFileArray = function (parentfcode, pos) {
    //alert('createFileArray');
    var url = _common.getCurrServerPath() + "/teacher/getFileList.do?1=1";

    url += "&parentfcode=0";
    url += "&teachnumber=" + _common.getTeacherId();
    url += "&ajaxdate=" + new Date();
    //alert(url);
    sendRequest(this.createTree, url);/**/
    //this.parseFileXmlToObject();
};//end of ����ֱ������
//��ʦ�ļ�����Դ����_leftTree.mySerach();
LeftTreeObj.prototype.mySerach = function () {
    try {
        var res_tite = $(".sou_box").attr("value");
        if (res_tite == "������ؼ���") {
            alert("������ؼ���!");
            return;
        }
        ;
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        if (_fileUtil.comeFrom == 0) _fileUtil.createSearchFileArray(res_tite);
        else _teacherUtil.createHasSharedTeacherArrayRequest();
    } catch (e) {
        window.status = '���س���';
    }
}//end of
//�ҵ��ļ���  _leftTree.myFolder();
LeftTreeObj.prototype.myFolder = function (obj) {

    hiddenIdUtil("schoolForder.title", "none");
    hiddenIdUtil("schoolTipHead", "none");
    hiddenIdUtil("backDirSchool", "none");
    hiddenIdUtil("searchDivId", "");
    clearIdUtil("folderList");

    try {
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        _fileUtil.currLevel = 0;
        _fileUtil.createFileArrayByLeft(0);
        this.changebg(obj);
    } catch (e) {
        window.status = '���س���';
    }

}//end of


//���繲��  _leftTree.netShare();
LeftTreeObj.prototype.netShare = function (obj) {
    hiddenIdUtil("schoolForder.title", "none");
    hiddenIdUtil("schoolTipHead", "none");
    hiddenIdUtil("backDirSchool", "none");
    hiddenIdUtil("searchDivId", "");
    clearIdUtil("folderList");
    try {
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        var res_tite = $(".sou_box").attr("value");
        if (res_tite != "������ؼ���") {
            $(".sou_box").attr("value", "������ؼ���")
        }
        ;
        _teacherUtil.createHasSharedTeacherArrayRequest();
        this.changebg(obj);
    } catch (e) {
        window.status = '���س���';
    }


}//end of 

//�ڿ��ļ�����ʾ

LeftTreeObj.prototype.showSchoolTeachFile = function (obj) {
    hiddenIdUtil("btns", "");
    hiddenIdUtil("schoolForder.title", "");
    hiddenIdUtil("btns.1", "none");
    hiddenIdUtil("btns.2", "none");
    hiddenIdUtil("btns.3", "none");
    hiddenIdUtil("btns.4", "none");
    hiddenIdUtil("btns.5", "none");
    hiddenIdUtil("btns.6", "none");
    hiddenIdUtil("btns.7", "none");
    hiddenIdUtil("btns.8", "none");
    hiddenIdUtil("netshare.title", "none");
    hiddenIdUtil("teachersize", "none");
    hiddenIdUtil("backDir", "none");
    hiddenIdUtil("searchDivId", "none");
    hiddenIdUtil("schoolTipHead", "");
    clearIdUtil("folderList");

    _fileUtil.comeFrom = 3;//��ʾ��Դ�����ļ��С�
    _rightMenu.setActiveStatus(0);
    _rightMenu.hideRightMenu();
    _schoolFolder.showList(schoolIp, teachernumber, "0");
    this.changebg(obj);


}

//����
function hiddenIdUtil(compId, flag) {
    if (document.getElementById(compId)) {
        document.getElementById(compId).style.display = flag;
    }
}

//�������folderList
function clearIdUtil(compId) {
    if (document.getElementById(compId)) {
        document.getElementById(compId).innerHTML = "";
    }
}

LeftTreeObj.prototype.changebg = function (obj) {
    $(".menu2 li").each(function () {
        $(this).removeClass("sel_t");
    });
    $(obj).parent().addClass("sel_t");
}
//�ҵĺ��� _leftTree.myFriend();
LeftTreeObj.prototype.myFriend = function (obj) {
    try {
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        _teacherUtil.createfriendlist();
        this.changebg(obj);
    } catch (e) {
        window.status = '���س���';
    }
}//end of 
//�ҵ��Ƽ�����Դ _leftTree.myRecommend();
LeftTreeObj.prototype.myRecommend = function () {
    try {
        //�����Ҽ��˵�
        if (parent.newRight._rightMenu) {
            toswitch(1);
        } else {

        }
    } catch (e) {
        window.status = '�Ҳ�ҳ����δ�����꣬���Եȣ�';
    }
}//end of 
LeftTreeObj.prototype.createTree = function (xmldoc) {
    //alert(_fileUtil.pos);
    var fileNodes = xmldoc.selectNodes("//VCOM/files/file");//��ȡ
    //alert(fileNodes.length);
    d11 = new dTree('d11');

    d11.config.useCookies = false;
    //d11.config.folderLinks = false;
    d11.config.target = "_self";


    var jsStr = '';
    jsStr = 'javascript:_leftTree.myFolder();';
    //alert(jsStr);
    d11.add(0, -1, '�ҵ��ļ���', jsStr, '', '');


    //
    jsStr = '';
    jsStr = 'javascript:_leftTree.netShare();';

    d11.add('���繲��', -1, '���繲��', jsStr, '', '');

    //
    jsStr = '';
    jsStr = 'javascript: _leftTree.myFriend();';

    d11.add('�ҵĺ���', -1, '�ҵĺ���', jsStr, '', '');

    jsStr = 'javascript: _leftTree.myRecommend();';

    d11.add('���Ƽ�����Դ', -1, '���Ƽ�����Դ', jsStr, '', '');
    /*********
     for (var i = 0; i < fileNodes.length; i++) {
				var fileNode = fileNodes[i];
				
				
				var id=i;
				var fCode= "";//
				var fileName= "";//
				var fileType= "";//
				var fileSize= "";// 
				var type = "";// 
				 
				try {
					fileName=fileNode.selectNodes("fileName")[0].text; // 
					
					//alert(fileName);
				}catch (e) {
					//alert(e.message);
				}	
					
				try {	
					fileType  = fileNode.selectNodes("fileType")[0].text; // 
				}catch (e) {
					//alert(e.message);
				}
				
				try {	
					fCode  = fileNode.selectNodes("fCode")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				try {	
					type  = fileNode.selectNodes("type")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				
				try {	
					fileSize  = fileNode.selectNodes("fileSize")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				 
				if(1==type){
				   //jsStr='javascript:alert();';
				   jsStr='';
				   jsStr='javascript:'; 
				   jsStr+='parent.newRight._fileUtil.currLevel=1;';
				   
				   var navStr='�ҵ��ļ���/'+fileName;
				   jsStr+='parent.newRight._fileUtil.createFileArrayByLeft(\''+fCode+'\',1,\''+navStr+'\');';
				   
				   
				   //jsStr+='parent.newRight._fileUtil.setPathNav(\''+navStr+'\');alert();';//��ʾ����·��
				   //alert(jsStr);
				   var name=fileName;
				   if(name.length>14)
				      name=name.substring(0,13)+'��';
				   d11.add(fCode,0,name,jsStr,'','');
				   //d11.add(fCode,0,fileName,jsStr,'img/folder.gif','img/folder.gif');
	            }  
			   
			}// end of for
     **/
    //leftTree.innerHTML=d11;
    //alert('??'+d11);
};// end of
function getchangeusesizestate(usize) {
    try {
        if (usize > 1024 * 1024) {
            document.getElementById("allfile").innerHTML = "�ռ��С" + teachersize + "G,��ʹ��<span id='usesize'>" + (usize / (1024 * 1024)).toFixed(2) + "G</span>";
            document.getElementById("teachersize").innerHTML = "�ռ��С" + teachersize + "G;��ʹ��" + ((usize / (1024 * 1024)).toFixed(2)) + "G";
        } else if (usize > 1024) {
            document.getElementById("allfile").innerHTML = "�ռ��С" + teachersize + "G,��ʹ��<span id='usesize'>" + (usize / 1024).toFixed(2) + "M</span>";
            document.getElementById("teachersize").innerHTML = "�ռ��С" + teachersize + "G;��ʹ��" + ((usize / 1024).toFixed(2)) + "M";
        } else {
            document.getElementById("allfile").innerHTML = "�ռ��С" + teachersize + "G,��ʹ��<span id='usesize'>" + usize.toFixed(2) + "K</span>";
            document.getElementById("teachersize").innerHTML = "�ռ��С" + teachersize + "G;��ʹ��" + (usize.toFixed(2)) + "K";
        }
        if ((parseFloat(allusesize) / 1024) / 1024 > parseFloat(allsize) * 0.9) {
            $("#errmessage").show();
            $("#btns\\.1").attr("disabled", true);
        } else if ((parseFloat(allusesize) / 1024) / 1024 > parseFloat(allsize) * 0.7) {
            $("#errtext").html("��������Դʹ���Ѿ�����70%,����ϵ����Ա��չӲ��!");
            $("#errmessage").show();
            //$("#togetuplaod").attr("disabled",true);
        }
    } catch (e) {
    }


}

function conectionFtp(path) {
    ftpocx.InitInternet(ip, port, user, password, teacherforder + path + "/");

}

function createMenu() {

    ftpocx.InitInternet(ip, port, user, password, "/test/11/33/���/");
    // var status= ftpocx.SetUploadDirectory("/test/11/33/");
    //  alert("status="+status);
    ftpocx.ReleaseConnect();

}

function deleteMenu() {
    //ftpocx.InitInternet("192.168.104.250","21", "RMS", "RMS", "");
    conectionFtp(_fileUtil.parentDir.replace("�ҵ��ļ���", ""));
    var status = ftpocx.DeleteFtpFile("/persionfile/" + teacherjyjg + "/" + teachernumber + path + "/" + _fileUtil.parentDir.replace("�ҵ��ļ���", ""));
    //alert("delete status="+status);
    ftpocx.ReleaseConnect();

}

function openFile() {
    errarray = "";
    var strList = ftpocx.OpenSelFileDlg();
    strList = strList.replace(/\\/g, '/');
    //alert(strList);
    if (strList == null || strList == "")
        return;
    if (errarray != "") {
        alert(errarray + "���ļ����ڿո�������ַ�");
        return;
    }
    var result = eval('(' + strList + ')');
    for (var i = 0; i < result.length; i++) {
        if (_fileUtil.isContainFileName(result[i].name)) {
            alert("�ļ���[" + result[i].name + "]�Ѵ��ڣ��벻Ҫ�ظ��ϴ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (parseInt(result[i].size) < 2) {
            alert("�ļ���[" + result[i].name + "]�ļ�̫С����ֹ�ϴ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (__filepatrn.exec(result[i].name)) {
            alert("�ļ�����" + result[i].name + "���в�������������ַ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (result[i].name.length > 50) {
            alert("�ļ�����" + result[i].name + "������ܳ���50���ַ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (result[i].size > 1024 * 1024 * 1024) {
            alert("�������ϴ�������1G���ļ���" + result[i].name + "��!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else {
            ftpFileHandler.addFtpFile(result[i]);
        }

    }
}

function openDir() {
    errarray = "";
    var strList = ftpocx.SelectFolder();
    //alert(strList);
    strList = strList.replace(/\\/g, '/');

    if (strList == null || strList == "")
        return;
    if (errarray != "") {
        alert(errarray + "���ļ����ڿո�������ַ�");
        if (result == null) {

        } else {
            for (var i = 0; i < result.length; i++) {
                ftpocx.DeleteUploadFile(result[i].path);
            }
        }

        return;
    }
    var result = eval('(' + strList + ')');
    //alert(result);
    for (var i = 0; i < result.length; i++) {
        if (_fileUtil.isContainFileName(result[i].name)) {
            alert("�ļ���[" + result[i].name + "]�Ѵ��ڣ��벻Ҫ�ظ��ϴ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (parseInt(result[i].size) < 2) {
            alert("�ļ���[" + result[i].name + "]�ļ�̫С����ֹ�ϴ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (__filepatrn.exec(result[i].name)) {
            alert("�ļ��С�" + result[i].name + "���в�������������ַ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (result[i].name.length > 50) {
            alert("�ļ��С�" + result[i].name + "������ܳ���50���ַ�!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else if (result[i].size > 1024 * 1024 * 1024) {
            alert("�������ϴ�������1G���ļ���" + result[i].name + "��!");
            ftpocx.DeleteUploadFile(result[i].path);
        } else {
            ftpFileHandler.addFtpFile(result[i]);
        }

    }
}

var i = 1;
  