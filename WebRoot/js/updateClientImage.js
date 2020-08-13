var imgMagage = new ImgManage();

function ImgManage() {//ͼƬ�������
    var appPath = null;
    var localThemePath = null;//����ͼƬ·��
    var localThemeTime = null;//����ͼƬ���¸���ʱ��

    var localBGPath = null;//����ͼƬ·��
    var localBGTime = null;//����ͼƬ����ʱ��

    var cmsThemePath = null;
    var cmsBGPath = null;
    var cmsPublicTime = null;
}

//��������ͼƬ������ͼƬ
ImgManage.prototype.update = function () {
    try {
        this.appPath = ocx.GetSpecialFolderPath(100);        //Ӧ�ó���·��
        this.localThemePath = this.appPath + "/images/pic.png";//����ͼƬ·��
        this.localBGPath = this.appPath + "/images/pic_bg.jpg";//����ͼƬ·��
        this.localThemeTime = this.getFileLastTime(this.localThemePath);//����ͼƬ���¸���ʱ��    
        this.localBGTime = this.getFileLastTime(this.localBGPath);
        ;//����ͼƬ����ʱ��
        if (this.appPath == null || this.appPath == "" || this.appPath == undefined) {
            return;
        }
    } catch (e) {//
        return;
    }
    var url = transferProtocol_web + _config["CMS"] + "/A01/A01079/list.json";
    $.getScript(url, imgMagage.getCMSFileInfo);
}
//��ȡcms�ϵ�ͼƬ��Ϣ
ImgManage.prototype.getCMSFileInfo = function () {
    try {
        if (infolistA01079 && infolistA01079.infosList && infolistA01079.infosList.length > 0) {
            var info = infolistA01079.infosList[0];
            if (info.outfiles != null && info.outfiles != "null") {
                imgMagage.cmsThemePath = transferProtocol_web + _config["CMS"] + info.outfiles;
            }
            if (info.abbrevpic != null && info.abbrevpic != "null") {
                imgMagage.cmsBGPath = transferProtocol_web + _config["CMS"] + info.abbrevpic;
            }
            if (info.pubtime != null && info.pubtime != "null") {
                imgMagage.cmsPublicTime = imgMagage.getDateFromString(info.pubtime);
            }
        } else {
            return;
        }
    } catch (e) {
        //infolistA01079 �����쳣
    }
    if (imgMagage.cmsThemePath != null && imgMagage.localThemeTime < imgMagage.cmsPublicTime) {
        ocx.DownloadFile(imgMagage.cmsThemePath, imgMagage.localThemePath);
    }
    if (imgMagage.cmsBGPath &= null && imgMagage.localBGTime < imgMagage.cmsPublicTime) {
        ocx.DownloadFile(imgMagage.cmsBGPath, imgMagage.localBGPath);
    }
}
//�����ļ�·����ȡ�ļ��ĸ���ʱ��
ImgManage.prototype.getFileLastTime = function (path) {
    var str = ocx.GetFileInfo(path);
    str = str.replaceAll("\\\"", "");
    var fileInfo = str.split(",");
    var lastTimeInfo = fileInfo[3].split(" ")
    var date = this.getDateFromString(lastTimeInfo[1]);
    return date;
}
//��ʱ���ַ���ת��Ϊʱ��
ImgManage.prototype.getDateFromString = function (str) {
    str = str.replaceAll("\-", "/");
    var date = new Date(str);
    return date;
}

function testDownLoad(path1, path2) {
    ocx.DownloadFile(path1, path2);
}