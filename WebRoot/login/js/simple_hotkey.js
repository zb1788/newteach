var _simpleHotKey = new SimpleHotkey(null);// ;
/**
 $(document).ready(function() {
    
    _simpleHotKey=new SimpleHotkey(null);// 
    
 
});*/

$(document).bind('keydown', {combi: 'right', disableInInput: false}, function () {
    _simpleHotKey.moveRight()
});
$(document).bind('keydown', {combi: 'left', disableInInput: false}, function () {
    _simpleHotKey.moveLeft()
});
$(document).bind('keydown', {combi: 'down', disableInInput: false}, function () {
    _simpleHotKey.moveDown()
});
$(document).bind('keydown', {combi: 'up', disableInInput: false}, function () {
    _simpleHotKey.moveUp()
});
$(document).bind('keydown', {combi: 'up2', disableInInput: false}, function () {
    _simpleHotKey.hotKey()
});
$(document).bind('keydown', {combi: 'enter', disableInInput: false}, function () {
    _simpleHotKey.quickEnter()
});

//


/*****��ҳ�ȼ����� begin *********/
function SimpleHotkey(pid) {
    this.errD = 7;//������
    this.pid = pid;
    this.pobj = null;
    this.targetTagNames = new Array('input', 'a');


    // var hao=this;l
    //this.headMenuHotkey=new HeadMenuHotkey();
}

//�û����ȷ��
SimpleHotkey.prototype.quickEnter = function () {
    //alert('sb'+event.keyCode);
    if ('13' == event.keyCode && _mask.isVisible()) {//�û����»س�
        //alert('�û����»س�');

        if ('sysConfig.passwdWindow' == this.pid) {
            //ϵͳ��������
        } else if ('net.teachUrlConfigWindow' == this.pid) {
            //�ڿ�IP
        } else {
            return;
        }

        try {
            //ֻ������������򡢺��ı������enter�Ż�ֱ�ӵ��ȷ����ť
            var actObj = document.activeElement;
            if (('password' != actObj.type) && ('text' != actObj.type)) {
                return
            }
            ;
        } catch (e) {
        }
        var obj = document.getElementById(this.pid).getElementsByTagName("a");
        for (var i = 0; i < obj.length; i++) {
            var currObj = obj[i];
            var text = currObj.innerHTML.replace(/\s/g, "");
            //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
            if (text == "ȷ��") {
                currObj.click();
                window.event.returnValue = false;//ֹͣ�¼�����
                break;
            }
        }//end of for


    }//end of if
}//end of functon
SimpleHotkey.prototype.hotKey = function () {
    //_pm.putActMainPage(1) �ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-ר��(֪ʶ��չ)3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ�� 8-��ϸҳ�� 9-ֱ������ҳ��
    if (9 == _pm.getActMainPage()) _liveUtil.livePageHotkey();
    //alert(event.keyCode); 
    if (4 == _pm.getActMainPage() && '8' == event.keyCode) {
        //alert();
        if (_fileUtil.currLevel > 0) _fileUtil.backDir();//��ʦ�ļ��У�������һ��Ŀ¼
        window.event.returnValue = false;//ֹͣ�¼�����
    }

    if ('13' == event.keyCode && 'a' != document.activeElement.tagName.toLowerCase())
        document.activeElement.click();
    /*******��USB begin   Ctrl+Shift+9****/
    if (event.ctrlKey && event.shiftKey && '57' == event.keyCode) {
        //��һҳ
        _naUtil.setMenuSelectStatus(this);
        _pMain.usbStyle();
        _usbObj.createUSBHtml();
    }
    /*******��USB end****/

    /*******ϵͳ���� Ctrl+Shift+6 begin****/
    if (event.ctrlKey && event.shiftKey && '54' == event.keyCode) {//��һҳ 
        _sysConfg.openWindow();
    }
    /*******ϵͳ����  end****/

    /*******��¼begin CTRL+SHIFT+8������̣�****/
    if (event.ctrlKey && event.shiftKey && '56' == event.keyCode) {
        //��һҳ 
        location.href = _common.getCurrServerPath() + '/newteach/index.html';
    }
    /*******��¼  end****/
    /*******����ҳbegin CTRL+SHIFT+H****/
    if (event.ctrlKey && event.shiftKey && '72' == event.keyCode) {
        //��һҳ 
        location.href = _common.getCurrServerPath() + '/newteach/index.do';
    }
    /*******����ҳ end****/
    //��ҳ
    if ('33' == event.keyCode || '34' == event.keyCode) {
        this.pageDownOrUp(event.keyCode);
    }
}
//��ҳ
SimpleHotkey.prototype.pageDownOrUp = function (keyCode) {
    //alert(global_divId);
    var obj = null;
    //alert(_mask.isVisible());
    if (!_mask.isVisible()) {//δ�������ֲ�
        // �ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-֪ʶ��չ 3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ��  _pm.putActMainPage(1)
        //alert(_pm.getActMainPage());
        if (2 == _pm.getActMainPage() || 6 == _pm.getActMainPage())
            obj = new KEContentObj();
        if (5 == _pm.getActMainPage())
            obj = new XiaobenContentObj();
        if (7 == _pm.getActMainPage())
            obj = new LiveUtilObj();
        if (4 == _pm.getActMainPage())
            obj = new FileUtilObj();


    } else {
        if (global_divId.startWith("subject")) {//��Ŀ�����ڵķ�ҳ
            obj = new VersionnameSetObj();
        }
        if (global_divId.startWith("selectPanel")) {//��Ŀ�����ڵķ�ҳ
            obj = _vsp;

        } else if (global_divId == "divid_gradediv") {//�꼶���ò��ڵط�ҳ
            checkGradeInput();
            return;
        }
    }

    //��һҳ
    if ('33' == keyCode) try {
        obj.upPage(global_divId);
    } catch (e) {
    }
    //��һҳ
    if ('34' == keyCode) try {
        obj.nextPage(global_divId);
    } catch (e) {
    }


}// end of pageDownOrUp


SimpleHotkey.prototype.factory = function () {
    if (null != this.pid) {
        return new DefaultHotkey();
    } else {
        this.pobj = new NothingHotkey();
        // alert('');
    }

    return this.pobj;

}// end of factory

SimpleHotkey.prototype.allowFocus = function (obj) {
    if (obj.currentStyle.display == "none") {
        alert(obj.currentStyle.display + "ss");
        return false;
    }

    return true;
}
//ˮƽ�ƶ�
SimpleHotkey.prototype.moveFocus = function (direction) {
    var pid = this.getPId();//��õ�ǰ���id

    //alert(pid);
    var obj = document.getElementById(pid);

    var posList = new PositionObjList();

    var actObj = document.activeElement;
    if (('password' == actObj.type) || ('text' == actObj.type)) {//�����������(���������Ҽ��Ծɿ����ƶ�)
        if (('left' == direction) || ('right' == direction)) return;
    }


    var actX = _posUtil.getX(actObj);
    var actY = _posUtil.getY(actObj);
    //����ѭ�����µ����б�ǩԪ�� 
    for (var t = 0; t < this.targetTagNames.length; t++) {


        var tagName = this.targetTagNames[t];
        var length = obj.getElementsByTagName(tagName).length;

        //alert(length);
        //����ĳ����ǩԪ�أ���a
        for (var i = 0; i < length; i++) {
            var currObj = obj.getElementsByTagName(tagName)[i];
            if (!this.allowFocus(currObj)) continue;//�ж��Ƿ�����õ�����
            var x = _posUtil.getX(currObj);
            var y = _posUtil.getY(currObj);
            //alert('x='+x +' y='+y+' '+currObj.innerHTML);

            /******�����ʵı�ǩ���뵽���󼯺��� begin******/
            if (actObj != currObj) {

                if ('up' == direction && actY > y) {//����
                    //alert('x='+x +' y='+y+' '+currObj.innerHTML);
                    posList.add(x, y, currObj);
                } else if ('down' == direction && actY < y) {//����
                    //alert(y +'t:'+t);
                    //alert('x='+x +' y='+y+' '+currObj.parentElement.innerHTML);
                    posList.add(x, y, currObj);
                } else if ('left' == direction) {//����
                    //alert('left');
                    //alert('x='+x +' y='+y+' '+currObj.parentElement.innerHTML);
                    if (actX > x && (Math.abs(actY - y) < this.errD)) posList.add(x, y, currObj);
                } else if ('right' == direction) {//����
                    //ѡ��ǰԪ����࣬�����¾��벻��̫���׵�Ԫ�ء�
                    if (actX < x && (Math.abs(actY - y) < this.errD)) posList.add(x, y, currObj);
                }
            }
            /******�����ʵı�ǩ���뵽���󼯺��� end******/
        }// end of inner for

    }//outer for
    var dis = 9999999999;
    var nextObj = null;
    //alert(direction+'  '+posList.getLength());
    window.status = "����" + direction + "��������������" + posList.getLength();
    for (var i = 0; i < posList.getLength(); i++) {
        var tmpX = posList.get(i).x;
        var tmpY = posList.get(i).y;

        tempdis = Math.abs(Math.pow(Math.abs(tmpX - actX), 2) + Math.pow(Math.abs(tmpY - actY), 2));
        //alert(tmpY +'  '+tempdis);
        // alert('tempdis='+tempdis+' x='+tmpX +' y='+tmpY+' '+posList.get(i).obj.parentElement.innerHTML);
        if (tempdis < dis) {
            dis = tempdis;
            //alert('OK'+'tempdis='+tempdis+' x='+tmpX +' y='+tmpY+' '+posList.get(i).obj.parentElement.innerHTML);
            nextObj = posList.get(i).obj;
            //alert(nextObj);
            window.status = "�ҵ����ʵĽ������" + nextObj.parentElement.innerHTML;
        }
        //alert(tempdis);
    }
    // alert(posList.getLength()+' '+posList.postions.length);
    if (null != nextObj) {
        try {
            //alert();
            nextObj.focus();
            //alert('���óɹ���');
            var pos = "(" + _posUtil.getX(nextObj) + "," + _posUtil.getY(nextObj) + ")"
            //window.status=pos+"���ý���ɹ���"+(nextObj.parentElement.innerHTML="test");
            window.status = pos + "���ý���ɹ���" + nextObj.parentElement.innerHTML;
            //return;
        } catch (e) {
            //alert(e +' '+this.getPId()+' '+nextObj.outerHTML);
            window.status = "���ý����쳣��" + this.pid;
        }
    } else {
        window.status = "nextObj is null ����ʧ�ܣ�" + this.pid;
        ;
        // return;
    }
    window.event.returnValue = false;//ֹͣ�¼�����

}


//����
SimpleHotkey.prototype.moveUp = function () {
//  var actEle=document.activeElement;
    var keycode = event.keyCode;
    //alert(keycode);
    if ('38' != keycode)
        return;

    this.factory().moveUp();

}//end of moveDown


//����
SimpleHotkey.prototype.moveDown = function () {
//  var actEle=document.activeElement;
    var keycode = event.keyCode;
    //alert(keycode);
    if ('40' != keycode)
        return;

    this.factory().moveDown();

}//end of moveDown


//����
SimpleHotkey.prototype.moveLeft = function () {
//  var actEle=document.activeElement;
    var keycode = event.keyCode;
    // alert(keycode);
    if ('37' != keycode)
        return;

    this.factory().moveLeft();
    //window.event.returnValue=true;
}//end of moveLeft

//����
SimpleHotkey.prototype.moveRight = function () {
//  var actEle=document.activeElement;
    var keycode = event.keyCode;
    if ('39' != keycode)
        return;


    this.factory().moveRight();
    // window.event.returnValue=true;
    //this.moveFocus("right");

}//end of moveRight


//��ø���id  PID=ParentElementId;
SimpleHotkey.prototype.getPId = function () {
    return this.pid;
}
//���ø���id  PID=ParentElementId;
SimpleHotkey.prototype.setPId = function (pid) {
    this.pid = pid;
}

/*****��ҳ�ȼ����� end *********/


/*******DefaultHotkey begin *****/
function DefaultHotkey() {

}

DefaultHotkey.prototype.moveRight = function () {
    _simpleHotKey.moveFocus("right");
}

//����
DefaultHotkey.prototype.moveLeft = function () {
    _simpleHotKey.moveFocus("left");

}//end of moveLeft

//����
DefaultHotkey.prototype.moveDown = function () {
    _simpleHotKey.moveFocus("down");
    // alert();

    // var pid= _simpleHotKey.setPId("subject_0");//��õ�ǰ���id

}//end of moveDown
//����
DefaultHotkey.prototype.moveUp = function () {
    _simpleHotKey.moveFocus("up");

}//end of moveUp

/*******DefaultHotkey end *****/

/*******�洢������� begin *****/
var _posUtil = new PositionUtil();

function PositionUtil() {
}

PositionUtil.prototype.getX = function (obj) {
    /**
     var element=obj;
     var actualLeft = element.offsetLeft;
     ��������var current = element.offsetParent;

     ��������while (current !== null){
������������actualLeft += current.offsetLeft;
������������current = current.offsetParent;
��������}

     ��������return actualLeft;*/
    //return obj.offsetLeft;
    //return  obj.getBoundingClientRect().left+document.documentElement.scrollLeft;

    return obj.getBoundingClientRect().left;
}
PositionUtil.prototype.getY = function (obj) {
    /**
     var element=obj;
     var actualTop = element.offsetTop;
     �� var current = element.offsetParent;

     ��������while (current !== null){
������������actualTop += current.offsetTop;
������������current = current.offsetParent;
��������}
     //alert(actualTop);
     ��������return actualTop;*/
    // return obj.offsetTop;


    return obj.getBoundingClientRect().top + document.documentElement.scrollTop;
}

function PositionObjList() {
    this.postions = new Array();
    //this.length=this.postions.length;
}

PositionObjList.prototype.add = function (x, y, obj) {
    //alert(x);
    this.postions[this.postions.length] = new PositionObj(x, y, obj);
}
PositionObjList.prototype.get = function (i) {
    return this.postions[i];
}
PositionObjList.prototype.getLength = function () {
    return this.postions.length;
}

function PositionObj(x, y, obj) {
    this.x = x;
    this.y = y;
    this.obj = obj;
}

/*******�洢������� end *****/
/*******NothingHotkey begin *****/
function NothingHotkey() {

}

NothingHotkey.prototype.moveRight = function () {

}

//����
NothingHotkey.prototype.moveLeft = function () {


}//end of moveLeft

//����
NothingHotkey.prototype.moveDown = function () {

}//end of moveDown
//����
NothingHotkey.prototype.moveUp = function () {


}//end of moveUp

/*******NothingHotkey end *****/