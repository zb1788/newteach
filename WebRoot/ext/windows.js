/*
 * Copyright(c) 2008, Vcom
 * add����־ǿ<liuzhiqiang@zzvcom.com>
 * ˵����
 *	1������������Ext JS Library 2.1
 *  2��֧�ֵı���Ϊutf-8
 */
//ȡ��Ԫ��
var $ = function (id) {
    return document.getElementById(id);
}
var vcomframe = {
    //path:top.path,
    allpath: '',
    sigpath: '',
    timeout: 30000,
    //combobox
    manange_alert: '����',
    manange_message: '�򿪵�ҳ�泬�������ƣ���رղ���Ҫ��ҳ��!',
    combobox_emptyText: '\u8bf7\u9009\u62e9',
    activecombobox_emptyText: '������',
    treecombobox_emptyText: '\u8bf7\u9009\u62e9',
    //openwindow
    openwindow_yes: 'ȷ��',
    openwindow_no: 'ȡ��'
}
var ____object = [];

/*
* ���ܵ��У� 
* һ����ӳ�����ʽjs���� 
* ����objΪ�����id������name
*    <input type="text" name="title" id="title1"> 
*		��obj����Ϊ
*			document.all.title��
*			document.all.title1��
*			document.getElementById("title1")��
*			document.getElementsByName("title")
* ����exemple
		errstyle(objField);
*/
function errstyle(obj) {
    Ext.onReady(function () {
        Ext.get(obj).addClass("form-invalid");
        var index = 0;
        var select = 0;
        var childnote = Ext.get(obj).dom.parentElement;
        while (childnote.tagName != "TD") {
            childnote = childnote.parentElement;
        }
        childnote.className = "errstyle";
        //Ext.get(obj).dom.parentElement.childNodes[1]="<img id='__errpic' src='"+vcomframe.path+"/etc/images/drop-no.gif' class='tdpic'>"
        //Ext.get(obj).dom.outerHTML=Ext.get(obj).dom.outerHTML+"<img id='__errpic' src='"+vcomframe.path+"/etc/images/drop-no.gif' class='tdpic'>";
    });

}

function qtip(obj, text, type) {
    if (type == 0) {
        Ext.onReady(function () {
            Ext.get(obj).dom.qtip = text;
            Ext.get(obj).dom.qclass = "x-form-invalid-tip";
        });
    } else {
        Ext.onReady(function () {
            Ext.get(obj).dom.qtip = "";
            Ext.get(obj).dom.qclass = "";
        });
    }
}

/*
* ���ܵ��У� 
* һ��ȡ��������ʽjs���� 
* ����objΪ�����id������name
*	<input type="text" name="title" id="title1"> 
*		��obj����Ϊ
*			document.all.title��
*			document.all.title1��
*			document.getElementById("title1")��
*			document.getElementsByName("title")
* ����exemple
		cancelerrstyle(objField);
*/
function cancelerrstyle(obj) {
    Ext.onReady(function () {
        Ext.get(obj).removeClass("form-invalid");
        var childnote = Ext.get(obj).dom.parentElement;
        while (childnote.tagName != "TD") {
            childnote = childnote.parentElement;
        }
        childnote.className = "successstyle";
        //if(Ext.get(obj).dom.parentElement.getElementsByTagName("img")[0])
        //Ext.get(obj).dom.parentElement.getElementsByTagName("img")[0].outerHTML="<img id='__errpic' src='"+vcomframe.path+"/etc/images/drop-yes.gif' class='tdpic'>";
    });
}

/*
* ���ܵ��У� 
* һ�������趨��ֵ����ԭ��ԭʼ״̬ 
* ����objΪ�����id������name
*	<form name="myform">
*		��obj����Ϊ
*			myform
* ����exemple
		reset(myform);
*/
function reset(obj) {
    obj.reset();
    var img = document.all.__errpic;
    if (img) {
        if (!img.length) {
            img.outerHTML = "";
        } else {
            for (var i = 0; i < img.length; i++) {
                img[i].src = "vcomframe/images/s.gif";
            }
        }
    }
}

/*
* ���ܵ��У� 
* һ��ģ��ȷ�϶Ի��� 
* ����valueΪ������ȷ�Ͽ� ��ʾ��Ϣ��example:"��ȷ���Ƿ�Ҫɾ��ѡ�е�Ԫ��,�˲��ݲ����Իָ�!"
* ����functionsΪ���������ȷ�Ͽ���yes��ȷ����ִ�еķ���
* �ġ�example
*		confirm("��ȷ��Ҫɾ��ѡ�����Ϣ�𣿴˲������ɻָ���",conformback);
*    	function conformback(btn){
*    		if(btn=="yes"){
*    			//code here
*    		}
*    	)
* 
*/
function confirm(value, functions) {
    if (typeof (functions) != "function") {
        functions = function (btn) {
        };
    }
    Ext.onReady(function () {
        if (Ext.MessageBox.isVisible()) {
            window.setTimeout(test, 500);
        } else {
            test();
        }

        function test() {
            Ext.MessageBox.confirm('ȷ��', value, functions);
        }
    });
}

function iframelocation(iframe, url) {
    window.setTimeout(A, 1000);

    function A() {
        iframe.location = url
    }
}

/*
* ���ܵ��У� 
* һ��ģ�����Ի��� 
* ����valueΪ������ȷ�Ͽ� ��ʾ��Ϣ��example:"����������󣬱��ⲻ��Ϊ�գ��޸İ��ϴ�!"
* ����functionsΪ��������Ŀ���yes��ȷ����ִ�еķ���
* �ġ�example
*		err("��ȷ��Ҫɾ��ѡ�����Ϣ�𣿴˲������ɻָ���",conformback);
*    	function conformback(){
*    			//code here
*    	)
* 
*/
function err(value, filed, functions) {
    Ext.onReady(function () {
        if (Ext.MessageBox.isVisible()) {
            window.setTimeout(test, 500);
        } else {
            test();
        }

        function test() {
            if (typeof (functions) != "function") {
                functions = function (btn) {
                    if (filed) Ext.get(filed).focus();
                };
            }
            Ext.MessageBox.show({
                title: '������',
                msg: value,
                buttons: Ext.MessageBox.OK,
                animEl: 'mb9',
                fn: functions,
                icon: Ext.MessageBox.WARNING
            });
        }
    });
}

/*
* ���ܵ��У� 
* һ��ģ��ɹ��Ի��� 
* ����valueΪ������ȷ�Ͽ� ��ʾ��Ϣ��example:"�������³ɹ�����ϲ��!"
* ����functionsΪ��������Ŀ���yes��ȷ����ִ�еķ���
* �ġ�example
*		success("�������³ɹ�����ϲ��!",conformback);
*    	function conformback(){
*    			//code here
*    	)
* 
*/
function success(value, functions) {
    if (typeof (functions) != "function") {
        functions = function (btn) {
        };
    }
    Ext.onReady(function () {
        if (Ext.MessageBox.isVisible()) {
            window.setTimeout(test, 500);
        } else {
            test();
        }

        function test() {
            Ext.MessageBox.show({
                title: '�ɹ���Ϣ',
                msg: value,
                buttons: Ext.MessageBox.OK,
                fn: functions,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

function tolocation(url, v) {
    if (url.indexOf("?") >= 0) {
        url = url + "&mid=" + v.mid;
    } else {
        url = url + "?mid=" + v.mid;
    }
    window.location.href = url;
}

/*
* ���ܵ��У� 
* һ�������˵�ʵ�� 
* ����objΪ������this����nameΪ��������name����,json�������ļ��ϡ�
* ����json��ʽ���£������Ҫ�Լ����Ķ�����з�������趨'-#����һ'������һΪ���������
*	var json=[	['-#����һ',{value:'���',text:'���'},{value:'����',text:'����'},'-#�����',{value:'����',text:'����'},{value:'���',text:'���'},'-#������',{value:'����',text:'����'}],
*				[{value:'�������',text:'�������'},{value:'ĵ����',text:'ĵ����'},{value:'����',text:'����'}],
*				[{value:'�ӱ�',text:'�ӱ�'},{value:'����',text:'����'},{value:'��ɽ',text:'��ɽ'}],
*				[{value:'����',text:'����'},{value:'��«��',text:'��«��'},{value:'�̽�',text:'�̽�'}],
*				[{value:'��ɽ',text:'��ɽ'},{value:'�żҿ�',text:'�żҿ�'},{value:'�ȷ�',text:'�ȷ�'}]
*				];
* �ġ�example
*	var json=[	['-#����һ',{value:'���',text:'���'},{value:'����',text:'����'},'-#�����',{value:'����',text:'����'},{value:'���',text:'���'},'-#������',{value:'����',text:'����'}],
*				[{value:'�������',text:'�������'},{value:'ĵ����',text:'ĵ����'},{value:'����',text:'����'}],
*				[{value:'�ӱ�',text:'�ӱ�'},{value:'����',text:'����'},{value:'��ɽ',text:'��ɽ'}],
*				[{value:'����',text:'����'},{value:'��«��',text:'��«��'},{value:'�̽�',text:'�̽�'}],
*				[{value:'��ɽ',text:'��ɽ'},{value:'�żҿ�',text:'�żҿ�'},{value:'�ȷ�',text:'�ȷ�'}]
*				];
*		changeselect(this,json,"city");
* �� ��obj��һ��option��Ҫ�趨Ϊ<option value="">---��ѡ��---</option>��
*/
function changeselect(obj, json, name) {
    var names = eval("document.all." + name);
    var index = obj.selectedIndex;
    names.options.length = 0;
    var lengths = names.children.length;
    while (lengths > 0) {
        names.removeChild(names.children(lengths - 1));
        lengths--;
    }
    if (index == 0) {
        names.options[0] = new Option("---��ѡ��---", "");
        return;
    }
    ;
    if (json.length > index) {
        var j = 0;
        for (var i = 0; i < json[index - 1].length; i++) {
            if (json[index - 1][i].value)
                names.options[j++] = new Option(json[index - 1][i].text, json[index - 1][i].value);
            else {
                var arr = json[index - 1][i].split("#");
                var nies = document.createElement("OPTGROUP");
                nies.style.background = "#808080";
                nies.label = arr[1];
                names.appendChild(nies);
            }
        }
    }
}

var _______shows;
var _______timer;

function ProgressBegin() {
    Ext.onReady(function () {
        _______shows = Ext.MessageBox.show({
            title: '��ȴ�',
            msg: 'Loading ...',
            progressText: 'Initializing...',
            width: 300,
            maxWidth: 300,
            progress: true,
            closable: false,
            animEl: '__mb6'
        });
        _______shows.getDialog().stateful = false
        var v = 1;

        // this hideous block creates the bogus progress
        function fffff() {
            v++;
            var i = v / 11;
            var progress = Math.round(100 * i);
            if (i < 1) {
                Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
            } else {
                window.clearInterval(_______timer);
            }
        };
        fffff();
        _______timer = window.setInterval(fffff, 500);
    })
}

function ProgressEnd() {
    Ext.onReady(function () {
        Ext.MessageBox.updateProgress(10, 100 + '% completed');
        window.clearInterval(_______timer);
        window.setTimeout(____tohide, 500);

        function ____tohide() {
            _______shows.hide();
        }
    });
}

/*
* ���ܵ��У� 
* һ��ext ajax�����
* ������չ�Ĺ��ܵ�ʵ�������ʱ����ذٷֱȹ�����
* ����parsΪ�趨�Ĳ�����ʽ����
*	{
*		url : 'addarticle.action',
*		success : function(response) {
*		        	//code here
*		        },
*		failure : function() {
*		           //code here
*		        },
*		headers: {
*			       'my-header': 'foo'
*			    },
*		method:'post',
*		timeout : 30000,
*		params : {
*				   title:myform.title1.value,
*				   comfrom:myform.comfroms.value
*				 }
*	}
* �ġ�example
*		ajax({
*			url : 'addarticle.action',
*			success : function(response) {
*		        	//code here
*		        },
*			failure : function() {
*		           //code here
*		        },
*			headers: {
*			       'my-header': 'foo'
*			    },
*			method:'post',
*			timeout : 30000,
*			params : {
*				   title:myform.title1.value,
*				   comfrom:myform.comfroms.value
*				 }
*		})
* 
*/
function ajax(pars, Progress) {
    var timer;
    var shows;
    if (Progress == null) Progress = true;
    Ext.onReady(function () {
        if (Progress) {
            shows = Ext.MessageBox.show({
                title: '��ȴ�',
                msg: 'Loading ...',
                progressText: 'Initializing...',
                width: 300,
                maxWidth: 300,
                progress: true,
                closable: false,
                animEl: '_mb6'
            });
            shows.getDialog().stateful = false;
            var v = 1;

            // this hideous block creates the bogus progress
            function fffff() {
                v++;
                var i = v / 11;
                var progress = Math.round(100 * i);
                if (i < 1) {
                    Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
                } else {
                    window.clearInterval(timer);
                }
            };
            fffff();
            timer = window.setInterval(fffff, 500);
        }
        Ext.Ajax.request(pars);
        if (Progress) {
            Ext.Ajax.on('requestcomplete', function () {
                Ext.MessageBox.updateProgress(10, 100 + '% completed');
                window.clearInterval(timer);
                window.setTimeout(tohide, 500);

                function tohide() {
                    shows.hide();
                }

            });
        }
    })
}

/*
* ���ܵ��У� 
* һ��ҳ�������Ϣ�� 
* ����example ��ҳ��body�ڲ��������´��뼴��
*		<div id="loading-mask"></div>
		<div id="loading">
			<div class="loading-indicator">
				<img src="etc/images/extanim32.gif" width="32" height="32"
					style="margin-right:8px;" align="absmiddle" />
				ҳ������У����Ժ�...
			</div>
		</div>
* 
*/
document.onreadystatechange = function () {
    if (document.getElementById("loading")) {
        setTimeout(function () {
            Ext.get('loading').remove();
            Ext.get('loading-mask').remove();
        }, 250);
    }
}

function ___test(obj) {
    if (obj.src.indexOf("panel-1.gif") > 0) {
        obj.src = "vcomframe/images/panel-2.gif"
    } else
        obj.src = "vcomframe/images/panel-1.gif";
    var trel = obj.parentElement.parentElement.parentElement.getElementsByTagName("tr");
    for (var i = 0; i < trel.length; i++) {
        if (trel[i].style.display == "none") {
            trel[i].style.display = ""
            var divs = trel[i].getElementsByTagName("div");
            for (var j = 0; j < divs.length; j++) {
                divs[j].style.display = "";
            }
        } else {
            trel[i].style.display = "none";
            var divs = trel[i].getElementsByTagName("div");

            for (var j = 0; j < divs.length; j++) {
                divs[j].style.display = "none";
            }
        }
        ;
    }
    for (var i = 0; i < ____object.length; i++) {
        try {
            if (____object[i].grids.types == "grids") {
                //____object[i].grids.setWidth(document.body.offsetWidth-4);
                ____object[i].grids.setHeight(document.body.offsetHeight - Ext.get(____object[i].id).getTop() - 2);
            }
        } catch (e) {
        }
    }
}

/*���style*/
function cleantdstyle() {
    var tdlist = document.getElementsByTagName("td");
    for (var i = 0; i < tdlist.length; i++) {
        if (tdlist[i].className == "successstyle" || tdlist[i].className == "errstyle") tdlist[i].className = "";
    }
}

Ext.BLANK_IMAGE_URL = '../images/s.gif';
Ext.onReady(function () {
    Ext.QuickTips.init();
});