function FtpItemFile(path, size) {
    this.path = path;
    this.size = size;
}


function FtpItems() {
    this.hasFtpItems = new Array();
}

FtpItems.prototype.addFtpFile = function (path, size) {

    if (!this.isContain(path)) {

        var ftpFile = new FtpItemFile(path, size);
        this.hasFtpItems[this.hasFtpItems.length] = ftpFile;
    }
};

FtpItems.prototype.isContain = function (path) {
    // alert(tmpFile.path);

    for (var i = 0; i < this.hasFtpItems.length; i++) {
        if (this.hasFtpItems[i].path == path) {  //alert(this.ftpFiles[i].path);
            return true;
        }
    }
    return false;
};

FtpItems.prototype.clearALL = function () {
    var len = this.hasFtpItems.length;
    this.hasFtpItems.splice(0, len);

};