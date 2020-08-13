var global_spe_ids = '00011101,00011102,00011103';//���ݵ�����id,�����̶��İ������������ʽ����ȵ�
//var global_spe_ids='00010c,00010d,00010e';//���ݵ�����id,�����̶��İ������������ʽ����ȵ�
var global_headMenuFlag = 1;//��Դ���� 1-������Դ ��2-�μ���Դ����ʦ�ղأ�
var global_lineRow = 1;

var global_currentKsId = "error";
var global_max_menu_size = 9;//һҳ������ʾ�����˵�����


var isAllowSimpleHotKey = true;//������ȼ�
var global_support_key = false;//�Ƿ� ֧�ּ���

var global_usbflag = 0;//�Ƿ� ֧�ּ���

var global_currpage = 0;//��ǰҳ�� 0-δ֪ 1-index.jsp 2-sub.jsp 3.login.jsp


var global_divId = "";

function setGlobal_divId(divid) {
    global_divId = divid;
}


/****�����Ҫ��������·��*****/
var main_teach_path = "error";//�û����õķ�����·������192.168.15.116��Ĭ��Ϊerror


function getMainTeachSeverPath() {

    return main_teach_path;
}

//���������ε�ַ
function setMainTeachSeverPath(str) {
    if ('' != str && null != str && 'null' != str)
        main_teach_path = str;
    //alert(str+'  '+main_teach_path);
}

String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}