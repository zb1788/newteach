function playRes(data) {
    if (data == null || data == undefined || data.length == 0) {
        return;
    }
    playurl = data[0].path;
    delayInit();
}

function delayInit() {
    setTimeout("playEpt()", 2000);
}

function playEpt() {
    var ept = document.getElementById("eptviewer");
    if (eptFlag == '2') {
        if (ept) {
            try {
                ept.OpenEPT(eptpath, "aa", playurl, "");
            } catch (e) {
                _filename.innerHTML = "[û�пɲ��ŵ���Դ]";
            }
        } else {
            insertplayerobject(true);
        }
    } else if (eptFlag == '1') {
        window.location.href = "mybrowser://width:620&&height:590@vcomept@@" + playurl + '@@@@' + eptpath;
    }
}

function ReleasePlayer() {
}

function tocloseorbg(obj, type) {
    if (type == 1) {
        window.location.href = "close://";
    } else {
        if (obj.className.indexOf("btnA") >= 0) {
            window.location.href = "max://";
            obj.className = "btnBH";
        } else {
            obj.className = "btnAH";
            window.location.href = "recover://";
        }
    }
}

function tochangebg(obj, type) {
    if (type == 1 || type == 2) {
        if (obj.className == "btnA") {
            obj.className = "btnAH";
        } else if (obj.className == "btnAH") {
            obj.className = "btnA";
        } else if (obj.className == "btnB") {
            obj.className = "btnBH";
        } else if (obj.className == "btnBH") {
            obj.className = "btnB";
        } else if (obj.className == "btnC") {
            obj.className = "btnCH";
        } else if (obj.className == "btnCH") {
            obj.className = "btnC";
        }
    }
}