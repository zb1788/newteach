function FtpFileProgress(file, ftpFileHandler) {
    this.ftpFileHandler = ftpFileHandler;
    this.fileProgressID = file.path;
    this.opacity = 100;
    this.height = 0;
    this.fileProgressWrapper = document.getElementById(this.fileProgressID);

    if (!this.fileProgressWrapper) {
        //alert(file.type);
        var table = '<div id="' + this.fileProgressID + '" path="' + file.path + '" type="0"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" >' + '<tr>' + '<td>' + '<p>' + file.name + '</p>' + '<p id="' + this.fileProgressID + '_pro" ></p>' + '<p id="' + this.fileProgressID + '_sta" style="color:green;font-size:12px;">���ϴ�0%</p>' + '</td>' + '<td class="kd2">' + getsize(parseInt(file.size)) + '</td>'
            + '<td class="kd2"><img src="images/laji.gif" id="' + this.fileProgressID + '_img" width="10" style="cursor: pointer" onclick="removeFile(\'' + file.path + '\')"></td>'
            + '<td id="tjData" class="kd2">';
        if (file.type == "0") {
            table = table + '<input type="checkbox" fileName="' + file.name + '" path="' + file.path + '" onclick="showTj(\'' + this.fileProgressID + '\',this);" name="tjCheckBox" />';
        } else {
            table = table + '&nbsp;'
        }
        table = table + '</td>'
            + '</tr>'
            + '</table></div>';
        var creatdiv = document.createElement("div");
        creatdiv.id = this.fileProgressID + "_div";
        startuploadlist.appendChild(creatdiv);

        document.getElementById(this.fileProgressID + "_div").innerHTML = table;
        var progress1 = new Progress(this.fileProgressID + "_pro", 0, 100, 0, 1, new ProgressStyle(350, 10, "#009999", "#00CCCC"));
        progress1.create();
        file.progress = progress1;
        ftpFileHandler.updateFtpFile(file);
        if (usertype != '2' && usertype != '3') {
            $('#tjData').html('&nbsp;');
            $('#tjHead').html('&nbsp;');
        }
    } else {
        alert(this.fileProgressID);
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

function removeFile(tmpPath) {
    this.ftpFileHandler.removeFile(tmpPath);
}


