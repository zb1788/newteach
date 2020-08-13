var xmlHttp = null;

/*�õ�http���� begin*/
function getXmlHttpObject() {

    try {// Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {// Internet Explorer        
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    if (xmlHttp == null) {
        alert("error:the XMLHttpRequest is null!")
        return;
    }
    return xmlHttp;
}

/*�õ�http���� end*/

/**/
function sendRequest(callback, url, method, xml) {
    /**
     var _method="get";
     if(null!=method)
     _method=method;
     xmlHttp=getXmlHttpObject();
     xmlHttp.open(_method,url,true);
     xmlHttp.onreadystatechange=callback;
     xmlHttp.send(null);
     */

    $.ajax({
        url: url,
        type: method,
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 30000,
        data: xml,
        error: function (xml) {
            //maskAllall.style.display="none";
            //_loginObj.error('��¼��ʱ��');
            //alert('ajax����ʱ��');
            //alert('����ʱ��');
            _common.timeout(null);//��ʱ
        },
        success: function (xml) {
            if ('string' == typeof (xml)) {
                //alert('string'==typeof(xml));
                if (xml.indexOf('window.parent.parent') > 0) {
                    //alert('��¼��ʱ�������µ�¼��');
                    alert('����ʱ��');
                    _common.timeout(null);//��ʱ
                    return;
                }
            }

            callback(xml);
        }
    })
}

function sendJsonRequest(callback, url, method, xml) {
    /**
     var _method="get";
     if(null!=method)
     _method=method;
     xmlHttp=getXmlHttpObject();
     xmlHttp.open(_method,url,true);
     xmlHttp.onreadystatechange=callback;
     xmlHttp.send(null);
     */

    $.ajax({
        url: url,
        type: method,
        dataType: 'json',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 30000,
        data: xml,
        error: function (e) {
            //maskAllall.style.display="none";
            //_loginObj.error('��¼��ʱ��');
            //alert('ajax����ʱ��');
            //alert('����ʱ��');
            _common.timeout(null);//��ʱ
        },
        success: function (data) {
            if ('string' == typeof (data)) {
                //alert('string'==typeof(xml));
                if (data.indexOf('window.parent.parent') > 0) {
                    //alert('��¼��ʱ�������µ�¼��');
                    alert('����ʱ��');
                    _common.timeout(null);//��ʱ
                    return;
                }
            }

            callback(data);
        }
    })
}

var isCasShow = true;//������ʾ
//var isCas=true;//��������ʾ

function ajaxMessage(str) {
    if ('' == str || undefined == str)
        alert('Ajax�����쳣!');
}