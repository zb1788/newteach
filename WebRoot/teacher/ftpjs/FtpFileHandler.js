var ftpFileHandler = new FtpFileHandler();

function FtpFileHandler() {
    this.ftpFiles = new Array();
    this.currentIndex = 0;
}

FtpFileHandler.prototype.addFtpFile = function (tmpFile) {

    if (!this.isContain(tmpFile)) {
        var ftpFile = new FtpFile(tmpFile.id, tmpFile.name, tmpFile.path, tmpFile.size, tmpFile.type);
        this.ftpFiles[this.ftpFiles.length] = ftpFile;

        FtpFileProgress(ftpFile, this);

    }
};

//ɾ����Ϊ������ֻ���ϴ�ʧ�ܺ�û���ϴ��Ĳ�����ɾ����
FtpFileHandler.prototype.removeFile = function (tmpPath) {
    var index = -1;
    for (var i = 0; i < this.ftpFiles.length; i++) {
        if (this.ftpFiles[i].path == tmpPath) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        var tmpFile = this.ftpFiles[index];
        if (tmpFile.status == FTP_UP_INS || tmpFile.status == FTP_UP_FAIL || tmpFile.status == FTP_UP_DOING) {
            alert("ȡ���ϴ�");
            this.ftpFiles.splice(index, 1);
            if (index < this.currentIndex) this.currentIndex--;
            if (ftpocx.DeleteUploadFile(tmpPath)) {
                document.getElementById(tmpPath + "_img").src = 'images/err.gif';
                document.getElementById(tmpPath + "_sta").innerHTML = "��ȡ���ϴ�....";
                tmpFile.status = FTP_DEL_PRE;
                // if(tmpFile.status==FTP_UP_DOING)
                //   this.startUp();
            }
        } else if (tmpFile.status == FTP_DEL_PRE) {
            if (ftpocx.DeleteUploadFile(tmpPath)) {
                //this.ftpFiles.splice(index,1);    
                document.getElementById(tmpPath).parentElement.outerHTML = "";
                //this.startUp();
            }
        }
    }

};

FtpFileHandler.prototype.updateProgress = function (tmpFtpFile) {

    //var percent = Math.ceil(tmpFtpFile.currentSize* 100 / tmpFtpFile.totalSize);
    if (tmpFtpFile) {
        //alert(tmpFtpFile.percent);
        var tmpPercent = Math.ceil(tmpFtpFile.percent * 100);
        tmpFtpFile.progress.setPosition(tmpPercent);
        var d = (new Date).getTime();

        if (d - tmpFtpFile.lastTime > 0) {

            var g = d - tmpFtpFile.lastTime;
            var spead = tmpFtpFile.currentSize / g * 1000;

            document.getElementById(tmpFtpFile.path + "_sta").innerHTML = "���ϴ�: " + tmpPercent + "%    �ٶ�: " + this.getSpeedSize(spead) + "/S";
            //document.getElementById(tmpFtpFile.path+"_sta").innerHTML="���ϴ�: "+tmpPercent+"%  �Ѵ���С:"+tmpFtpFile.currentSize;
        }
        if (tmpFtpFile.percent >= 1) {
            this.ftpFiles[this.currentIndex].status = FTP_UP_SUCCESS;
            document.getElementById(tmpFtpFile.path + "_sta").innerHTML = "�ļ��ϴ��ɹ�!";
            document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").src = "images/success.gif";
            //ftpocx.DeleteUploadFile(result[i].path);

        }
    }


};

FtpFileHandler.prototype.getSpeedSize = function (size) {
    if (size > 1024 * 1024) {
        size = (size / (1024 * 1024));
        size = size.toFixed(2) + "M";
    } else if (size > 1024) {
        size = (size / 1024);
        size = size.toFixed(2) + "K"
    } else {
        size = size.toFixed(2) + "B";
    }
    return size;
};

FtpFileHandler.prototype.isContain = function (tmpFile) {
    // alert(tmpFile.path);

    for (var i = 0; i < this.ftpFiles.length; i++) {
        if (this.ftpFiles[i].path == tmpFile.path) {  //alert(this.ftpFiles[i].path);
            return true;
        }
    }
    return false;
};


FtpFileHandler.prototype.restartUpLoad = function () {
    this.ftpItems = new FtpItems();
    this.currentIndex = 0;
    this.startUpNew();
};

FtpFileHandler.prototype.startUpNew = function () {
    if (this.currentIndex >= this.ftpFiles.length) {
        return;
    }

    if (this.ftpFiles[this.currentIndex].status == FTP_UP_SUCCESS || this.ftpFiles[this.currentIndex].status == FTP_UP_FAIL) {
        this.currentIndex++;
        this.startUpNew();
    } else {
        this.ftpFiles[this.currentIndex].lastTime = (new Date).getTime();
        var status = ftpocx.StartUpload(this.ftpFiles[this.currentIndex].path);
        document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").src = "images/lodding.gif";
        document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").onclick = function () {
        };
        if (!status)//������ʧ�ܣ�������һ����ӡ�
        {
            this.ftpFiles[this.currentIndex].status = FTP_UP_FAIL;
            if (document.getElementById(this.ftpFiles[this.currentIndex].path + "_img") != null)
                document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").src = "images/x.gif";
            if (document.getElementById(this.ftpFiles[this.currentIndex].path + "_sta") != null)
                document.getElementById(this.ftpFiles[this.currentIndex].path + "_sta").innerHTML = "���ʧ��";


        }
    }
};
FtpFileHandler.prototype.startUpNext = function () {
    this.currentIndex++;
    if (this.currentIndex < this.ftpFiles.length)
        this.startUpNew();
};
//����ʹ��
FtpFileHandler.prototype.startUp = function () {

    if (this.ftpFiles.length > 0) {
        if (this.currentIndex < this.ftpFiles.length) {

            if (this.ftpFiles[this.currentIndex].status == FTP_DEL_PRE || this.ftpFiles[this.currentIndex].status == FTP_UP_SUCCESS || this.ftpFiles[this.currentIndex].status == FTP_UP_FAIL) {
                this.currentIndex++;
                this.startUp();
            } else {

                this.ftpFiles[this.currentIndex].lastTime = (new Date).getTime();
                // alert(this.ftpFiles[this.currentIndex].path);
                var status = ftpocx.StartUpload(this.ftpFiles[this.currentIndex].path);
                // alert(status);
                if (!status)//������ʧ�ܣ�������һ����ӡ�
                {
                    this.ftpFiles[this.currentIndex].status = FTP_UP_FAIL;
                    document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").src = "images/x.gif";
                    document.getElementById(this.ftpFiles[this.currentIndex].path + "_sta").innerHTML = "���ʧ��";
                    this.startUp();
                }

            }
        }
    }
};

FtpFileHandler.prototype.updateFtpFile = function () {

    this.updateProgress(this.ftpFiles[this.currentIndex]);
    try {
        if (this.ftpFiles[this.currentIndex].status == FTP_UP_FAIL) {
            document.getElementById(this.ftpFiles[this.currentIndex].path + "_img").src = "images/x.gif";
            document.getElementById(this.ftpFiles[this.currentIndex].path + "_sta").innerHTML = "�ϴ�ʧ��";
            //this.startUp();
        }
    } catch (e) {
    }
};


FtpFileHandler.prototype.clearALL = function () {
    var len = this.ftpFiles.length;
    try {
        ftpocx.ClearFileList();
    } catch (e) {
        for (var i = 0; i < len; i++) {
            ftpocx.DeleteUploadFile(this.ftpFiles[i].path);
        }
    }
    this.ftpFiles.length = 0;
    document.getElementById("startuploadlist").innerHTML = "";
    this.currentIndex = 0;
    //if(this.ftpFiles.length==0)
    //{
    //document.getElementById("startuploadlist").innerHTML="";
    //this.currentIndex=0;
    //}
};
