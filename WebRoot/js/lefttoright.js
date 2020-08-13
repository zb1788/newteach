var _left = 0, _bottom = 0;

function toreset() {
    _left = 0;
    _bottom = 0;
}

function tobackset() {
    if (document.activeElement.id) {
        var id = document.activeElement.id;
        if (id.indexOf("index_") >= 0) {
            var v_bottom = id.substring(6, id.lastIndexOf("_"));
            var v_left = id.substring(id.lastIndexOf("_") + 1, id.length);
            if (parseInt(v_bottom) == parseInt(_bottom) && parseInt(v_left) == parseInt(_left)) {

            } else {
                _bottom = parseInt(v_bottom);
                _left = parseInt(v_left);
            }
        } else {
            toreset();
        }

    } else {
        toreset();
    }
}

document.onkeydown = function () {
    try {
        if (upload.style.display == "") return;
    } catch (e) {
    }
    var keyval = event.keyCode;
    if (keyval == 8) {
        if (document.activeElement) {
            if (document.activeElement.tagName != "INPUT") {
                return false;//��������˼��� ��ʱ���ε�
            }
        }
    }
    if (_mask.isVisible()) return;
    if (event.keyCode == 33) {//��һҳ
        if (document.activeElement) {
            try {
                var move = document.activeElement.move;
                if (move) {
                    if (move == "left") {
                        if (document.getElementById("_leftpropage")) {
                            document.getElementById("_leftpropage").onclick();
                        }
                    } else if (move == "right") {
                        if (document.getElementById("_rightpropage")) {
                            document.getElementById("_rightpropage").onclick();
                        }
                    }
                } else {
                    if (document.getElementById("_leftpropage")) {
                        document.getElementById("_leftpropage").onclick();
                    }
                }
            } catch (e) {
            }
        } else {
            if (document.getElementById("_leftpropage")) {
                document.getElementById("_leftpropage").onclick();
            }
        }
    } else if (event.keyCode == 34) {//��һҳ
        if (document.activeElement) {
            try {
                var move = document.activeElement.move;
                if (move) {
                    if (move == "left") {
                        if (document.getElementById("_leftnextpage")) {
                            document.getElementById("_leftnextpage").onclick();
                        }
                    } else if (move == "right") {
                        if (document.getElementById("_rightnextpage")) {
                            document.getElementById("_rightnextpage").onclick();
                        }
                    }
                } else {
                    if (document.getElementById("_leftnextpage")) {
                        document.getElementById("_leftnextpage").onclick();
                    }
                }
            } catch (e) {
            }
        } else {
            if (document.getElementById("_leftnextpage")) {
                document.getElementById("_leftnextpage").onclick();
            }
        }
    }
    if (templateId == 1) {
        //return;
    } else {

    }
    if (document.activeElement) {//�ж���������Ԫ�أ�ͬ���������
        tobackset();
    } else {
        toreset();
    }
    var keyval = event.keyCode;
    if (keyval == 38) {//�ϼ�ͷ
        try {
            if ((templateId == 1) && ((_bottom - 1) == 0)) {
                return;
            }
            var obj = document.getElementById("index_" + (_bottom - 1) + "_" + _left);
            if (obj) {
                tochangecolor(targetobj, obj);
                targetobj = obj;
                obj.focus();
                _bottom--;
            } else {
                while ((_left--) >= 0) {
                    if ((templateId == 1) && _bottom == 0) {
                        break;
                    }
                    var obj = document.getElementById("index_" + (_bottom - 1) + "_" + _left);
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        _bottom--;
                        obj.focus();
                        break;
                    }
                }
                tobackset();
            }
        } catch (e) {
        }
    } else if (keyval == 40) {//�¼�ͷ
        try {
            var obj = document.getElementById("index_" + (_bottom + 1) + "_" + _left);
            if (obj) {
                tochangecolor(targetobj, obj);
                targetobj = obj;
                obj.focus();
                _bottom++;
            } else {
                //if((templateId==1)){
                //return;
                //}
                while ((_left--) >= 0) {
                    var obj = document.getElementById("index_" + (_bottom + 1) + "_" + _left);
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        _bottom++;
                        obj.focus();
                        break;
                    }
                }
                tobackset();
            }
        } catch (e) {
        }
    } else if (keyval == 37) {//���ͷ
        try {
            var obj = document.getElementById("index_" + _bottom + "_" + (_left - 1));
            if (obj) {
                tochangecolor(targetobj, obj);
                targetobj = obj;
                obj.focus();
                _left--;
            } else if (_bottom == 0) {

            } else {
                var obj = document.getElementById("index_" + _bottom + "_" + (_left - 2));
                if (obj) {
                    tochangecolor(targetobj, obj);
                    targetobj = obj;
                    obj.focus();
                    _left = _left - 2;
                    return;
                }
                while ((_bottom--) >= 0) {
                    if ((templateId == 1) && _bottom == 0) {
                        break;
                    }
                    var obj = document.getElementById("index_" + _bottom + "_" + (_left - 1));
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        obj.focus();
                        _left--;
                        break;
                    }
                }
                tobackset();
                while ((_bottom--) >= 0) {
                    if ((templateId == 1) && _bottom == 0) {
                        break;
                    }
                    var obj = document.getElementById("index_" + _bottom + "_" + (_left - 2));
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        obj.focus();
                        _left = _left - 2;
                        break;
                    }
                }
                tobackset();

            }
        } catch (e) {
        }
    } else if (keyval == 39) {//�Ҽ�ͷ
        try {
            var obj = document.getElementById("index_" + _bottom + "_" + (_left + 1));
            if (obj) {
                tochangecolor(targetobj, obj);
                targetobj = obj;
                obj.focus();
                _left++;
            } else if (_left > 5) {

            } else {
                var obj = document.getElementById("index_" + _bottom + "_" + (_left + 2));
                if (obj) {
                    tochangecolor(targetobj, obj);
                    targetobj = obj;
                    obj.focus();
                    _left = _left + 2;
                    return;
                }
                while ((_bottom--) >= 0) {
                    if ((templateId == 1) && _bottom == 0) {
                        break;
                    }
                    var obj = document.getElementById("index_" + _bottom + "_" + (_left + 1));
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        obj.focus();
                        _left++;
                        break;
                    }
                }
                tobackset();
                while ((_bottom--) >= 0) {
                    if ((templateId == 1) && _bottom == 0) {
                        break;
                    }
                    var obj = document.getElementById("index_" + _bottom + "_" + (_left + 2));
                    if (obj) {
                        tochangecolor(targetobj, obj);
                        targetobj = obj;
                        obj.focus();
                        _left = _left + 2;
                        break;
                    }
                }
                tobackset();
            }
        } catch (e) {
        }
    }
}

function tochangecolor(parentobj, obj) {

}