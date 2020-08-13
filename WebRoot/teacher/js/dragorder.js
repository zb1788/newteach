/**/
/** Ŀ����� */
var tarElement = null;
/**/
/** ʵ�ʱ��϶���� */
var dragElement = null;
/**/
/** ����Ԫ��λ�� */
var downX, downY, tmp_o_x, tmp_o_y;

var refElement = null;
var dragActive = 0;//�϶�״̬�Ƿ�1�����϶��У�0�����϶����
var dragendtype = 0;
var targetobject;
/**/
/** �Ƿ����ƶ��� 1Ϊ�� */
var draging = 0;

function getEventElement(event) {
    if (event == null) {
        event = window.event;
    }
    return (event.srcElement ? event.srcElement : event.target);
}

/**/
/**
 * onMouseDown�����¼�
 */
function readyDrag(event) {
    //testdragΪ���Դ�ӡ��־��Ϣ

    if (_fileUtil.comeFrom == 0 && _fileUtil.searchFlag == 0) ;
    else {
        return;
    }
    if (dragActive == 1) return;
    dragActive = 1;
    var eventObj = getEventElement(event);
    // ��DIVԪ�ز��ܱ��϶�
    //if(eventObj.tagName != "LI") return;

    // ��Ŀ��Ԫ�ظ���dragElement

    dragElement = eventObj;
    while (dragElement.tagName != "LI" && dragElement.tagName != "BODY") {
        dragElement = dragElement.parentNode;
    }
    //alert(dragElement.outerHTML);
    // ����һ��tmpElement��Ŀ�����
    tarElement = dragElement.cloneNode(true);
    // TODO alpha(opacity=50)����IE֧��
    //tarElement.style.filter="alpha(opacity=70)"
    tarElement.style.zIndex = 2;
    tarElement.oncontextmenu = null;
    tarElement.ondblclick = null;
    tarElement.onMouseDown = null;
    tarElement.onclick = null;
    tarElement.onmousedown = null;
    //tarElement.onmouseOut="testmouceout()";
    //tarElement.attachEvent("onmouseout",testmouceout);
    //tarElement.style.top=dragElement.getBoundingClientRect().top+200;
    //tarElement.style.left=dragElement.getBoundingClientRect().left;
    //alert(dragElement.getBoundingClientRect().top);
    //dragElement.style.zIndxe=1;

    tarElement.style.position = "absolute";

    //if(dragElement.parentNode.tagName != "BODY"){
    // ��ѡ�п��϶�Ԫ��ʱ,��ʼ���϶�Ԫ�صĳ�ʼλ��
    // TODO pixelLeft����IE֧��
    //dragElement.style.left = dragElement.offsetLeft + dragElement.parentNode.style.pixelLeft;
    // dragElement.style.top = dragElement.offsetTop + dragElement.parentNode.style.pixelTop;
    //}

    //ȡ�õ�ǰ���ľ���λ��
    downX = event.clientX;
    downY = event.clientY;
    //ȡ���϶�Ԫ�ص�ǰ�ľ���λ��
    tmp_o_x = dragElement.getBoundingClientRect().left - 5;
    tmp_o_y = dragElement.getBoundingClientRect().top - 7;
    tarElement.style.visibility = "hidden";

    folderList.appendChild(tarElement);
    ___fcode = null;

    testdrag.innerHTML = "1";
    document.onmousemove = startDrag;
    document.onmouseup = endDrag;
}

function testmouceout() {
    testdrag.innerHTML = "__f";
    //endDrag();
}

/**/
/**
 * onMouseOver�¼�����
 */
function startDrag() {
    testdrag.innerHTML = "2";
    //testdrag.innerHTML=new Date(); 
    if (dragActive == 1 && event.button == 1 && dragElement != null && tarElement != null) {
        testdrag.innerHTML = "3";
        //���϶��������С�mouse button pressed���϶�������ڡ�Ŀ�������ڵ������
        if (Math.abs(tmp_o_y - (tmp_o_y + event.clientY - downY)) > 5 || Math.abs(tmp_o_x - (tmp_o_x + event.clientX - downX)) > 5) {
            tarElement.style.visibility = "visible";
            tarElement.style.left = tmp_o_x + event.clientX - downX;
            tarElement.style.top = tmp_o_y + event.clientY - downY;
            //dragElement.style.backgroundColor="#CCCCCC";
            //�α���ʽ
            //document.body.style.cursor="move";
            draging = 1;
            dragendtype = 1;
            mathposition(tarElement);
        } else {
            dragendtype = 0;
            tosetallselect();
            testdrag.innerHTML = "a";
            //endDrag();
        }

    } else {
        dragendtype = 0;
        tosetallselect();
        testdrag.innerHTML = "b";
        //endDrag();
    }
}

var ___fcode;

function mathposition(object) {
    testdrag.innerHTML = "4";
    try {
        if (targetobject) {
            targetobject.childNodes(0).className = "";
        }
    } catch (e) {
    }

    targetobject = null;
    var ilinesize = parseInt(folderList.offsetWidth / 104);
    var ifilesize = folderList.children.length;
    var itop = folderList.getBoundingClientRect().top;
    var ileft = folderList.getBoundingClientRect().left;
    //itop=parseInt(itop)+parseInt(folderList.scrollTop);

    var itopline = parseInt((parseInt(object.style.top) + parseInt(folderList.scrollTop) - parseInt(itop) + 30) / 137);
    var ileftline = parseInt((parseInt(object.style.left) - parseInt(ileft)) / 104);
    var currentsize = itopline * ilinesize + ileftline;
    if (currentsize < ifilesize && currentsize >= 0) {
        try {
            targetobject = folderList.childNodes(currentsize);
            if (targetobject.filetype == "") {
                targetobject.childNodes(0).className = "oninto";
            } else {
                targetobject.childNodes(0).className = "onmove";
            }

            //__object.className="onmove";
            if (!___fcode) {
                ___fcode = targetobject;
            } else if (___fcode.fcode != targetobject.fcode) {
                ___fcode.childNodes(0).className = "";
                ___fcode = targetobject;
            }
        } catch (e) {

        }
        testdrag.innerHTML = "4a";
    }
    testdrag.innerHTML = "7";
    if (parseInt(object.style.left) < 20 || parseInt(object.style.left) > document.body.clientWidth - 100 || parseInt(object.style.top) < 20 || parseInt(object.style.top) > document.body.clientHeight - 100) {
        testdrag.innerHTML = "4b";
        endDrag();
        return;
    }
    testdrag.innerHTML = "4c";
    //testdrag.innerHTML=itopline*ilinesize+ileftline+""+folderList.childNodes(currentsize).outerHTML;
}

/**/
/**
 * onMouseUpʱ�䴥��
 */
function endDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
    testdrag.innerHTML = "5";
    try {
        targetobject.childNodes(0).className = "";
    } catch (e) {
    }
    if (dragActive == 1 && tarElement != null) {
        //���϶��������С�Ŀ�������ڵ������
        if (draging == 1) {
            // �����崦���ƶ�״̬�У���ԭ������Ƴ� 
            //tarElement.removeNode(true);
            //tarElement.style.visibility="hidden";
            draging = 0;
        }

        //tarElement.style.filter="alpha(opacity=100)";
        //tarElement.style.zIndex=1;
        //document.body.style.cursor="default";
        //window.resizeBy(0,1);
    }
    if (tarElement) {
        tarElement.removeNode(true);
        tarElement = null;
    }
    //alert(document.body.clientWidth+"dd"+folderList.getBoundingClientRect().left+"ss"+folderList.getBoundingClientRect().right+"bb"+folderList.offsetWidth);
    //alert(folderList.offsetWidth/114)
    if (!targetobject || dragElement.fcode == targetobject.fcode) {
        dragActive = 0;
        tosetallselect();
        return
    }
    ;
    if (dragendtype == 1) {
        if (targetobject) {

            if (targetobject.filetype == "") {
                var targetpath = teacherforder + _fileUtil.getFileObjByFcode(targetobject.fcode).dir.replace("�ҵ��ļ���/", "");
                var dragfile = _fileUtil.getFileObjByFcode(dragElement.fcode);
                var dragpath = "";
                if (dragfile.fileType == "") {
                    dragpath = teacherforder + dragfile.dir.replace("�ҵ��ļ���/", "");
                } else {
                    dragpath = teacherforder + dragfile.dir.replace("�ҵ��ļ���/", "") + dragfile.fileName;
                }
                _fileUtil.dragmoveFile(dragpath, targetpath, dragElement.fcode, targetobject.fcode);
            } else {
                if (targetobject.getBoundingClientRect().top < dragElement.getBoundingClientRect().top) {
                    targetobject.outerHTML = dragElement.outerHTML + targetobject.outerHTML;
                } else if (targetobject.getBoundingClientRect().top > dragElement.getBoundingClientRect().top) {
                    targetobject.outerHTML = targetobject.outerHTML + dragElement.outerHTML;
                } else if (targetobject.getBoundingClientRect().left > dragElement.getBoundingClientRect().left) {
                    targetobject.outerHTML = targetobject.outerHTML + dragElement.outerHTML;
                } else {
                    targetobject.outerHTML = dragElement.outerHTML + targetobject.outerHTML;
                }
                savesort();
            }


            dragElement.removeNode(true);
            dragElement = null;
            //tarElement=null;
            dragActive = 0;


            // for(var i=0;i<folderList.children.length;
            //
            //alert(this.pos);

            // alert(targetobject.outerHTML);
        }
        dragendtype = 0;
        dragActive = 0;
    } else {
        dragendtype = 0;
        dragActive = 0;
    }
    tosetallselect();
}

function tosetallselect() {
    try {
        for (var i = 0; i < _fileUtil.fileList.length; i++) {
            _fileUtil.setSelectStatusCss(_fileUtil.fileList[i].id);
        }
    } catch (e) {
    }
}

function savesort() {
    var fcodes = "";
    for (var i = 0; i < folderList.children.length; i++) {
        fcodes = fcodes + folderList.children(i).fcode + ",";
    }
    if (fcodes == "") return;
    else {
        fcodes = fcodes.replace(/,$/g, "");
    }
    var url = _common.getCurrServerPath() + "/teacherfile/tosaveSort.do";
    url += "?ajaxdate=" + new Date();
    var objectdate = {"parentfcode": _fileUtil.currParentFcode, "teachnumber": teachernumber, "fcodes": fcodes};
    sendRequest(function (xml) {
        //alert(xml);
    }, url, "post", objectdate);/**/
}

function gettargetobject() {
    //targetobject=event.srcElement;
    //testdrag.innerHTML=targetobject.outerHTML
}


document.onselectstart = function () {
    return false;
}