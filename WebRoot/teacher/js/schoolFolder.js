function SchoolFolder() {
}

SchoolFolder.prototype.arra;

var _schoolFolder = new SchoolFolder();
SchoolFolder.prototype.showList = function (schoolIp, teacherNumber, parentFcode) {
    if (parentFcode == "0") {
        this.arra = new Array();
    }
    if (this.arra[this.arra.length - 1] != parentFcode) {
        this.arra[this.arra.length] = parentFcode;
    }
    var param = {"schoolIp": schoolIp, "teachnumber": teacherNumber, "parentfcode": parentFcode};
    var url = _common.getCurrServerPath() + "/teacherfile/getSchoolFileInterface.do";
    ajaxJsonJK(url, param, this.showListJson, this.showErorr);


}
SchoolFolder.prototype.showErorr = function (result) {
    //alert("ѧУ���粻ͨ��ѧУ��������δ������");
    $("#folderList").html("<font color='red'>ѧУ���粻ͨ��ѧУ������δ������</font>");
}

SchoolFolder.prototype.showListJson = function (result) {

    //alert(JSON.stringify(result));
    var backResult = result.back;
    var h = '';
    for (var i = 0; i < backResult.length; i++) {

        var item = backResult[i];
        var fileName = item.filename;
        var noforder = item.noforder;
        var filetype = item.filetype;
        var fcode = item.fcode;
        var parentfcode = item.parentfcode;
        var iconPath = 'images/folder.gif';
        var dclick = '';
        var sclick = "javascript:void(0);";//���� 
        if (1 == noforder) {//�ļ���

            dclick = "_schoolFolder.showList('" + schoolIp + "','" + teachernumber + "','" + fcode + "');";
        } else {
            iconPath = _fileUtil.createIconPath(filetype);
        }
        var pId_str = 'pid_' + i;
        var liId_str = 'liId_' + i;
        h += '<li  title="' + fileName + '" filetype="' + filetype + '" index="' + i + '" fcode="' + fcode + '"  ondrag="return false;"  ondblclick="' + dclick + '"  onclick="' + sclick + '"><p id="' + pId_str + '"  index="' + i + '"><img  index="' + i + '" src="' + iconPath + '" /></p>' + fileName + '</li>';
    }
    //var folderList= document.getElementById("folderList");
    //folderList.innerHTML=h;
    if (parentfcode != "0") {
        $("#backDirSchool").unbind("click");
        hiddenIdUtil("backDirSchool", "");
        $("#backDirSchool").bind("click", function (ev) {

            var lenth = _schoolFolder.arra.length;

            var tmpParentCode = _schoolFolder.arra[lenth - 2];
            _schoolFolder.arra.splice(lenth - 1, 1);//ɾ�����һ����
            _schoolFolder.showList(schoolIp, teachernumber, tmpParentCode);
        });
    } else {
        hiddenIdUtil("backDirSchool", "none");
    }
    $("#folderList").html(h);
}

function print(arra) {
    alert(arra);
//var tmp="";
    //for(var i=0;i<arra.length;i++)
    //{
    //tmp=tmp+arra[i]+",";
    // }
// alert(tmp);
}