function FtpFile(id, name, path, size, totalSize, currentSize, percent, status) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.size = size;
    this.totalSize = totalSize;
    this.currentSize = currentSize;
    this.percent = percent;
    this.status = status;

}

function FtpFile(id, name, path, size, type) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.size = size;
    this.totalSize = 0;
    this.currentSize = 0;
    this.percent = 0;
    this.status = FTP_UP_INS;
    this.type = type;
}

var FTP_UP_WAIT = 0;
var FTP_UP_DOING = 1;
var FTP_UP_SUCCESS = 2;
var FTP_UP_FAIL = 3;
var FTP_UP_INS = 4;


var FTP_DEL_PRE = -1;
