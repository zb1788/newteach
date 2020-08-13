var progress1array = new Array();
var currentfile;
var uploadfiletype = 0;
var __filepatrn = /[&><?"*:\/|\\]/;

function $(en) {
    try {
        var el = document.getElementById(en);
        if (el) return el;
        return false;
    } catch (e) {
        return false;
    }
}

function clearAFile() {
    for (var i = 0; i < aFile.length; i++) {
        if (swfu.getFile(aFile[i].index).filestatus != -4) {
            swfu.cancelUpload(aFile[i].id);
            aFile.splice(i, 1);
            clearAFile();
            break;
        }
    }
}

function cleartable() {
    document.getElementById("uploadlist").innerHTML = "";
}

var aFile = new Array();//��������ļ�,�����Ѿ��ϴ��Ĳ��ֺ�δ�ϴ���

function fileQueued(file) {
    try {
        var bFile = true;
        for (var i = 0; i < aFile.length; i++) {
            if (aFile[i].name == file.name && aFile[i].type == file.type && aFile[i].size == file.size)//�����Ѿ��ڶ���������Ѿ��ϴ������ļ�
            {
                swfu.cancelUpload(file.id);
                aFile.splice(i, 1);
                bFile = false;
                alert("�ļ���[" + file.name + "]���ϴ����벻Ҫ�ظ�!");
            }
        }
        if (bFile) {
            if ((parseFloat(allusesize) / 1024) / 1024 > parseFloat(allsize) * 0.9) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�������ռ�����,��ͣ�ϴ��ļ�!");
                return;
            }
            if (__filepatrn.exec(file.name)) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�ļ�����" + file.name + "���в�������������ַ�!");
                return;
            }
            if (file.name.length > 50) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�ļ�����" + file.name + "������ܳ���50���ַ�!");
                return;
            }
            if (file.size > 1024 * 1024 * 1024) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�������ϴ�������1G���ļ���" + file.name + "��!");
                return;
            }
            if (_fileUtil.isContainFileName(file.name)) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�ļ���[" + file.name + "]���ϴ����벻Ҫ�ظ�!");
                return;
            }
            if ((parseFloat(usesize) + file.size / 1024) / 1024 > parseFloat(teachersize) * 1024) {
                swfu.cancelUpload(file.id);
                uploadfiletype = 1;
                alert("�ļ���" + file.name + "��̫�󣬳���ʣ��ռ��С!");
                return;
            }
            uploadfiletype = 0;
            usesize = parseFloat(usesize) + file.size / 1024;
            getchangeusesizestate(usesize);
            aFile[aFile.length] = file;
            var progress = new FileProgress(file, this.customSettings.progressTarget);
            progress.setStatus("�ȴ���...");
            progress.toggleCancel(true, this);
        }

    } catch (ex) {
        this.debug(ex);
    }

}

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
            document.getElementById("errmessage").style.display = "";
            $("#errmessage").show();
            $("#togetuplaod").attr("disabled", true);
        } else if ((parseFloat(allusesize) / 1024) / 1024 > parseFloat(allsize) * 0.7) {
            $("#errtext").html("��������Դʹ���Ѿ�����70%,����ϵ����Ա��չӲ��!");
            document.getElementById("errmessage").style.display = "";
            $("#errmessage").show();
            //$("#togetuplaod").attr("disabled",true);
        }
    } catch (e) {
    }


}

function backusesize() {
    var _type = 0;
    for (var i = 0; i < aFile.length; i++) {
        if (aFile[i].filestatus == -1) {
            usesize = parseFloat(usesize) - (aFile[i].size / 1024);
            _type = 1;
        }
    }
    if (_type == 1) {
        _fileUtil.createFileArray(_fileUtil.currParentFcode);
    }
    getchangeusesizestate(usesize);
}

//ȡ���ϴ�
function canllfileupload(fillid, obj, size) {
    for (var i = 0; i < aFile.length; i++) {
        if (aFile[i].id == fillid) {
            if (aFile[i].filestatus == -1) {
                aFile[i].filestatus = -5;
                updatefile(aFile[i]);
                swfu.cancelUpload(fillid);
                if (obj.src.indexOf("err.gif") >= 0) {
                    aFile.splice(i, 1);
                    document.getElementById(fillid).parentElement.outerHTML = "";
                } else {
                    obj.src = globalpath + '/teacher/images/err.gif';
                    document.getElementById(fillid + "_sta").innerHTML = "��ȡ���ϴ�....";
                }
                usesize = usesize - parseFloat(size) / 1024;
                getchangeusesizestate(usesize);
            } else if (aFile[i].filestatus == -4) {
                aFile.splice(i, 1);
                swfu.cancelUpload(fillid);
                document.getElementById(fillid).parentElement.outerHTML = "";
            } else if (aFile[i].filestatus == -5) {
                aFile.splice(i, 1);
                swfu.cancelUpload(fillid);
                document.getElementById(fillid).parentElement.outerHTML = "";
            }

        }
    }
}

function uploadStart(file) {
    try {
        //�����ϴι������Զ���������
        var tablelength = startuploadlist.getElementsByTagName("table");
        if (tablelength.length > 3) {
            for (var i = 3; i < tablelength.length; i++) {
                if (tablelength[i].id == file.id) {
                    var e = document.getElementById("startuploadlist")
                    e.scrollTop = (i - 2) * 60 + 25;

                }
            }
        }
    } catch (e) {
    }

    try {
        swfu.addPostParam("upFilename", encodeURIComponent(file.name));
        swfu.addPostParam("parentfcode", _fileUtil.currParentFcode);
        var unzipfile = document.getElementById("unzip_" + file.id);
        if (unzipfile) {
            if (unzipfile.checked == true) {
                swfu.addPostParam("unzip", "1");
            } else {
                swfu.addPostParam("unzip", "0");
            }
        } else {
            swfu.addPostParam("unzip", "0");
        }

        var e = (new Date).getTime();
        for (var i = 0; i < aFile.length; i++) {
            if (aFile[i].id == file.id) {
                currentfile = aFile[i];
                var d = (new Date).getTime();
                currentfile.lasttime = d;
                currentfile.bytesLoaded = 0;
                break;
            }
        }
    } catch (ex) {
    }
    return true;
}

function uploadComplete(file) {
    if (this.getStats().files_queued === 0) {
        //alert("dddd");
        //document.getElementById(this.customSettings.cancelButtonId).disabled = true;
    }
}

function queueComplete(numFilesUploaded) {
    //alert("dddd");
}


function fileQueueError(file, errorCode, message) {
    uploadError(file);
    //try {
    //var imageName = "error.gif";
    //var errorName = "";
    //if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
    //errorName = "You have attempted to queue too many files.";
    //}

    //if (errorName !== "") {
    //alert(errorName);
    //return;
    //}

    //switch (errorCode) {
    //case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
    //imageName = "zerobyte.gif";
    //break;
    //case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
    //imageName = "toobig.gif";
    //break;
    //case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
    //case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
    //default:
    //alert(message);
    //break;
    //}

    //addImage("swfupload/images/" + imageName,file.id);

    //} catch (ex) {
    //this.debug(ex);
    //}

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    try {
        if (this.getStats().files_queued > 0) {
            document.getElementById(this.customSettings.cancelButtonId).disabled = false;
            $("btnComplete").disabled = 'disabled';
            $("startUpload").disabled = '';
        }
        //this.startUpload();
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadProgress(file, bytesLoaded) {

    try {
        var percent = Math.ceil((bytesLoaded / file.size) * 100);
        if (currentfile) {
            currentfile.progress.setPosition(percent);
            var d = (new Date).getTime();
            if (d - currentfile.lasttime > 0) {
                var g = d - currentfile.lasttime;
                var h = bytesLoaded - currentfile.bytesLoaded;
                var speadstring = "";
                var spead = bytesLoaded / (d - currentfile.lasttime) * 1000;
                document.getElementById(file.id + "_sta").innerHTML = "���ϴ�: " + percent + "%    �ٶ�: " + getsize(spead) + "/S";
            }
            if (percent == 100) {
                document.getElementById(file.id + "_sta").innerHTML = "���������ڴ������ݣ� ���Ժ�...";
            }
        }

    } catch (ex) {
        this.debug(ex);
    }
}

function updatefile(file) {
    for (var i = 0; i < aFile.length; i++) {
        if (aFile[i].id == file.id) {
            aFile[i] = file;
        }
    }
}

function togetfile(id) {
    for (var i = 0; i < aFile.length; i++) {
        if (aFile[i].id == id) {
            return aFile[i];
        }
    }
}

function uploadSuccess(file, serverData) {
    try {
        if (serverData == "") {
            document.getElementById(file.id + "_sta").innerHTML = "�ϴ��ɹ�!";
            document.getElementById(file.id + "_img").src = globalpath + "/teacher/images/success.gif";
            var unzipfile = document.getElementById("unzip_" + file.id);
            if (unzipfile) {
                if (unzipfile.checked == true) {
                    _fileUtil.refreshLeftFolderTree();
                }
            }
            for (var i = 0; i < aFile.length; i++) {
                if (aFile[i].name == file.name && aFile[i].type == file.type && aFile[i].size == file.size)//�����Ѿ��ڶ���������Ѿ��ϴ������ļ�
                {
                    swfu.cancelUpload(file.id);
                    aFile.splice(i, 1);
                }
            }
        } else if (serverData.substring(0, 7) === "FILEID:") {

        } else {
            addImage("images/error.gif");
            progress.setStatus("Error.");
            progress.toggleCancel(false);
        }


    } catch (ex) {
        this.debug(ex);
    }
}


//���"���"��ť��Ĳ���
function btmComplete() {
    $("btnComplete").disabled = 'disabled';
}

//���"�ϴ�"��ť��Ĳ���
function imgUpoload() {
    //prompt("",encodeURIComponent("������"));
    swfu.addPostParam("username", encodeURIComponent("������"));
    swfu.startUpload();
}

function uploadComplete(file) {
    try {
        /*  I want the next upload to continue automatically so I'll call startUpload here */
        if (this.getStats().files_queued > 0) {
            this.startUpload();
        } else {
            _fileUtil.createFileArray(_fileUtil.currParentFcode);
            //alert("ssss");
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function errstate(file, message) {
    try {
        if (message) {
            document.getElementById(file.id + "_sta").innerHTML = message;
        } else {
            document.getElementById(file.id + "_sta").innerHTML = "�ϴ�ʧ��!";
        }
        document.getElementById(file.id + "_img").src = globalpath + "/teacher/images/err.gif";
    } catch (e) {
    }

}

function uploadError(file, errorCode, message) {
    //var imageName =  "error.gif";
    //var progress;
    try {
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                errstate(file, "��ȡ���ϴ�!");
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                errstate(file, "��ȡ���ϴ�!");
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                errstate(file);
                break;
            default:
                errstate(file);
                break;
        }


    } catch (ex3) {
        //this.debug(ex3);
        errstate(file);
    }

}

function addImage(src, id) {
    var newImg = document.createElement("img");
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).appendChild(newImg);//���ϴ���ͼƬ��ʾ����
    if (newImg.filters) {
        try {
            newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
        } catch (e) {
            newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
        }
    } else {
        newImg.style.opacity = 0;
    }

    newImg.onload = function () {
        fadeIn(newImg, 0);
    };
    newImg.src = src;
}


function fadeIn(element, opacity) {
    var reduceOpacityBy = 5;
    var rate = 30;	// 15 fps


    if (opacity < 100) {
        opacity += reduceOpacityBy;
        if (opacity > 100) {
            opacity = 100;
        }

        if (element.filters) {
            try {
                element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
            } catch (e) {
                element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
            }
        } else {
            element.style.opacity = opacity / 100;
        }
    }

    if (opacity < 100) {
        setTimeout(function () {
            fadeIn(element, opacity);
        }, rate);
    }
}

function tochangebgclour() {
    var _table = startuploadlist.getElementsByTagName("table");
    for (var i = 0; i < _table.length; i++) {
        if (i % 2 == 0)
            _table[i].children(0).children(0).className = "gray";
    }
}

function getsize(size) {
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
}

function checkunzip(name, obj) {
    if (name.toUpperCase().indexOf(".RAR") >= 0 || name.toUpperCase().indexOf(".ZIP") >= 0) {
        if (obj.checked == true) {
            if (_fileUtil.isContainFolderName(name.substring(0, name.indexOf(".")))) {
                alert("��ѹ���ļ����Ѿ�����!");
                obj.checked = false;
            }
        }
    }
}

function FileProgress(file, targetID) {
    if (uploadfiletype == 1) return;
    this.fileProgressID = file.id;

    this.opacity = 100;
    this.height = 0;
    this.fileProgressWrapper = document.getElementById(this.fileProgressID);

    if (!this.fileProgressWrapper) {
        var size = getsize(parseInt(file.size));
        var unzip = "";
        try {
            var lastpath = file.name.substring(file.name.lastIndexOf("."), file.name.length).toUpperCase();
            if (lastpath == ".ZIP" || lastpath == ".RAR") {
                unzip = '<input name="unzip_' + this.fileProgressID + '" id="unzip_' + this.fileProgressID + '" type="checkbox" value="1" onclick="checkunzip(\'' + file.name + '\',this)"/>'
            }
        } catch (e) {
        }

        var table = '<div><table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="' + this.fileProgressID + '">'
            + '<tr>'
            + '<td>'
            + '<p>' + file.name + '</p>'
            + '<p id="' + this.fileProgressID + '_pro" ></p>'
            + '<p id="' + this.fileProgressID + '_sta" style="color:green;font-size:12px;">���ϴ�0%</p>'
            + '</td>'
            + '<td class="kd2">' + size + '</td>'
            + '<td class="kd2"><img src="' + globalpath + '/teacher/images/laji.gif" id="' + this.fileProgressID + '_img" style="cursor: pointer" onclick="canllfileupload(\'' + this.fileProgressID + '\',this,' + file.size + ')"></td>'
            + '<td class="kd2">&nbsp;</td>'
            + '</tr>'
            + '</table></div>';
        var creatdiv = document.createElement("div");
        creatdiv.id = this.fileProgressID + "_div";
        startuploadlist.appendChild(creatdiv);

        document.getElementById(this.fileProgressID + "_div").innerHTML = table;
        var progress1 = new Progress(this.fileProgressID + "_pro", 0, 100, 0, 1, new ProgressStyle(350, 10, "#009999", "#00CCCC"));
        progress1.create();
        file.progress = progress1;
        updatefile(file);
        tochangebgclour();
        //document.getElementById("allfile").innerHTML="��"+uploadlist.getElementsByTagName("table").length+"���ļ�";
    } else {
        this.fileProgressElement = this.fileProgressWrapper.firstChild;
    }

    this.height = this.fileProgressWrapper.offsetHeight;

}

FileProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
    this.fileProgressElement.className = "progressContainer blue";
    this.fileProgressElement.childNodes[3].className = "progressBarComplete";
    this.fileProgressElement.childNodes[3].style.width = "";
};
FileProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    setTimeout(function () {
        oSelf.disappear();
    }, 2000);
};
FileProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfUploadInstance.cancelUpload(fileID);
            for (var i = 0; i < aFile.length; i++) {
                if (aFile[i].id == fileID) {
                    aFile.splice(i, 1);//��aFile��������Ѿ���ȡ�����ļ�
                }
            }
            return false;
        };
    }
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {

    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30;	// 15 fps

    if (this.opacity > 0) {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0;
        }

        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
            } catch (e) {
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100;
        }
    }

    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0;
        }

        this.fileProgressWrapper.style.height = this.height + "px";
    }

    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        setTimeout(function () {
            oSelf.disappear();
        }, rate);
    } else {
        this.fileProgressWrapper.style.display = "none";
    }
};