/*
* ����Ext JS Library 2.1
* add����־ǿ<liuzhiqiang@zzvcom.com>
* ֧�ֵı���utf-8
*
*
* ���ܵ��У� 
* һ��ģ��selectЧ��
* ��������˵��
*	@idΪcombobox������Ӧ��div��id(��ѡ)
*		textΪ��ʾ��Ϣ(��ѡ)
*		values�����б��Ӧ��ѡ�json��ʽ[{value:"25%", text:"25%"}, {value:"25%", text:"25%"}]
*		selfNameΪ��Ϊ���������(��ѡ)
*		widthΪ���ÿ��(��ѡ)
*		heigthΪ���ø߶�(��ѡ)
*		pagesizeÿҳ��ʾ����(),���Ϊnull���ʾ����ҳ
*		editable�Ƿ�����ɱ༭
*		defalutvalue�趨Ĭ��ֵ
*		text1�Զ���json����value�ֶ�
*		text2�Զ���json����text�ֶ�
*		jilianobject�������Ķ��������ѡ��ĳ��ֵ�����ķ���
*		jilianvalue�����������ݣ��������������õ��Ǽ����ķ�������ɱ���Ϊnull��
* ������չ����
*		1������˷�ҳ�������Զ���ʵ���˷�ҳ���ݣ�Ŀǰ��֧���첽��ҳ��
*		2��֧�ֵ��ֹ�������Ϣ���˺�������б�ķ�ҳ
*		3��֧��ͨ�������Ƿ���ʾ��ҳ
*		5��֧��ͨ���趨value�Զ�ѡ��
*		6��֧��ͨ���趨ֵ�Զ���λ�趨ֵ���ڵ�ҳ
*		
* �ġ�ע������
		1������ü���select��ע���ҳ����������Ϊnull����������֧�ַ�ҳ����
		2��������ó�����������õĲ������Ƿ�������
* �塢exemple
*		��ͨselect
*		var value=[{value:"25%", text:"25%"}, {value:"25%", text:"25%"}, {value:"25%", text:"25%"},{value:"25%", text:"25%"}, {value:"50%", text:"50%"}, {value:"50%", text:"50%"}, {value:"50%", text:"50%"},{value:"50%", text:"50%"},{value:"53%", text:"53%"}];
*		var combobox=new combobox("percent","���״̬",value,"combobox",270,200,4);
*			combobox.getValue();//ȡѡ�е�ֵ��value
*			combobox.getText();//ȡѡ��ֵ��text
*			combobox.setValues("9");//�趨Ĭ��ֵ
*		����select
*		var value5=[{value:"1", text:"����"}, 
*				{value:"2", text:"֣��"},
*				{value:"3", text:"����"},
*				{value:"4", text:"����"}];
*		var value4=[[{value:'1',text:'����'}],
*				[{value:'1',text:'����'}],
*				[{value:'1',text:'����'}],
*				[{value:'1',text:'ĵ��'}]
*		];
*		//������select ע�⣺������λ�ò��ܷŷ���
*		var jiliancombobox2=new combobox("jilianpagepercent2","���״̬2",value4[0],"jiliancombobox2",270,200,null,true,null);
*		//����select
*		var jiliancombobox1=new combobox("jilianpagepercent1","���״̬2",value5,"jiliancombobox1",270,200,null,true,null,null,null,jiliancombobox2,value4);
*	
*/
function combobox(ids, text, values, selfName, width, heigth, pagesize, editable, defalutvalue, text1, text2, object, jilianvalue, type, disable) {
    //��ҳʵ��
    this.pagesize = pagesize;
    this.data = values;
    this.width = width;
    this.heigth = heigth;
    this.values = values;
    this.disable = disable;
    this.defalutvalue = defalutvalue;
    this.id = ids;
    this.text = text;
    this.type = type;
    this.jilianobject = object;
    this.jilianvalue = jilianvalue;
    this.text1 = text1;
    this.text2 = text2;
    combobox.prototype.initvalue = function () {
        if (this.text1 && this.text2) {
            var valuearray = new Array();
            for (var i = 0; i < this.values.length; i++) {
                if (this.values[i].pinyin) {
                    var _value = {
                        value: eval("this.values[" + i + "]." + this.text1),
                        text: eval("this.values[" + i + "]." + this.text2),
                        pinyin: this.values[i].pinyin
                    };
                    valuearray[i] = _value;
                } else {
                    var _value = {
                        value: eval("this.values[" + i + "]." + this.text1),
                        text: eval("this.values[" + i + "]." + this.text2)
                    };
                    valuearray[i] = _value;
                }
            }
            this.values = valuearray;
        }
    }
    this.initvalue();

    var comboboxindex = ids;
    var $ = function (id) {
        return document.getElementById(id);
    }
    var store, comwithpa, percent;
    this.store = null;
    this.comwithpa = null;
    //����comboBox������
    combobox.prototype.combobox = function () {
        return this.comwithpa;
    }
    combobox.prototype.markInvalid = function (text) {
        return this.comwithpa.markInvalid(text);
    }
    //����comboBoxѡ�е�ֵvalue
    combobox.prototype.getValue = function () {
        return this.comwithpa.getValue();
    }
    //����comboBoxѡ�е�ֵtext
    combobox.prototype.getText = function () {
        return this.comwithpa.getRawValue();
    }
    combobox.prototype.setDisabled = function (obj) {
        this.comwithpa.setDisabled(obj);
    }
    //�����Ƿ���Ա༭
    combobox.prototype.setEditable = function (obj) {
        this.comwithpa.setEditable(obj);
    }
    //������Ⱦ����
    combobox.prototype.loadData = function (val) {
        this.comwithpa.clearValue();
        this.data = val;
        this.values = val;
        this.initvalue();
        if (this.pagesize) {
            this.comwithpa.onFocus();
            this.comwithpa.expand();
            this.initpage(this.values, this.pagesize, 1);
            this.turnPage(1);
            this.comwithpa.collapse();
        } else {
            var newarray = new Array();
            for (var i = 0; i < this.values.length; i++) {
                newarray.push([this.values[i].value, this.values[i].text]);
            }
            this.store.loadData(newarray);
        }

    }
    //�趨Ĭ��ѡ��ֵ
    combobox.prototype.setValues = function (value) {
        if (this.pagesize) {
            var index = 0;
            for (var i = 0; i < this.values.length; i++) {
                if (this.values[i].value == value) {
                    index = i;
                    break;
                }
            }
            var sp = Math.ceil((index + 1) / this.pagesize);
            this.comwithpa.onFocus();
            this.comwithpa.expand();

            this.turnPage(sp);
            this.comwithpa.collapse();
            this.comwithpa.setValue(value);
            //this.comwithpa.reset();
        } else {
            this.comwithpa.setValue(value);
        }
    }
    //��ȡ��ǰid
    combobox.prototype.getComboBox = function () {
        return this.comwithpa;
    }
    var _this = this;
    this.splitpage = {
        currentPage: 0,
        pageSize: 15,
        pageCount: 1,
        recordCount: 1,
        nextPage: 1,
        previewPage: 1,
        startRecord: 1
    }
    this._splitpage_tools = {
        CURlement: "comboboxPage_CUR_" + comboboxindex,
        Alllement: "comboboxPage_All_" + comboboxindex,
        pageCount: "comboboxPage_All",
        ext_comp_1003: "combobox-ext-comp-1003_" + comboboxindex,
        ext_comp_1004: "combobox-ext-comp-1004_" + comboboxindex,
        ext_comp_1005: "combobox-ext-comp-1005_" + comboboxindex,
        ext_comp_1006: "combobox-ext-comp-1006_" + comboboxindex,
        ext_gen14: "combobox-ext-gen14_" + comboboxindex,
        ext_gen22: "combobox-ext-gen22_" + comboboxindex,
        ext_gen34: "combobox-ext-gen37_" + comboboxindex,
        ext_gen45: "combobox-ext-gen45_" + comboboxindex
    }
    combobox.prototype.expand = function () {
        this.comwithpa.expand();
    }
    //����select
    combobox.prototype.jilian = function (value) {
        this.jilianobject.values = value;
        var valuearray = new Array();
        if (this.jilianobject.type == 1) {
            valuearray.push(["", vcomframe.combobox_emptyText + (this.texts || "...")]);
        }
        if (this.jilianobject.text1 && this.jilianobject.text2) {
            for (var i = 0; i < this.jilianobject.values.length; i++) {
                var _value = [eval("this.jilianobject.values[" + i + "]." + this.jilianobject.text1), eval("this.jilianobject.values[" + i + "]." + this.jilianobject.text2)];
                valuearray.push(_value);
            }
        } else {
            for (var i = 0; i < this.jilianobject.values.length; i++) {
                var _value = [this.jilianobject.values[i].value, this.jilianobject.values[i].text];
                valuearray.push(_value);
            }
        }
        this.jilianobject.combobox().clearValue();
        this.jilianobject.store.loadData(valuearray);
    }
    //�׳���ҳ�ӿ�
    combobox.prototype.turnPage = function (f) {
        //alert(pagesize)
        this.initpage(this.data, this.pagesize, f);
        percent.length = 0;
        if (_this.type == 1) {
            percent.push(["", vcomframe.combobox_emptyText + (this.texts || "...")]);
        }
        for (var i = this.splitpage.startRecord; i < this.splitpage.startRecord + ((this.splitpage.recordCount - this.splitpage.startRecord) >= this.splitpage.pageSize ? this.splitpage.pageSize : (this.splitpage.recordCount - this.splitpage.startRecord)); i++) {
            percent.push([this.data[i].value, this.data[i].text]);
        }
        if (percent.length != 0) {
            this.store.loadData(percent);
        }
        //$(this._splitpage_tools.CURlement).value=this.splitpage.currentPage;
        $(this._splitpage_tools.Alllement).innerHTML = this.splitpage.currentPage;
        $(this._splitpage_tools.pageCount).innerHTML = this.splitpage.pageCount;
        if (this.splitpage.currentPage == 1) {
            $(this._splitpage_tools.ext_comp_1003).className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            $(this._splitpage_tools.ext_gen14).disabled = true;
            $(this._splitpage_tools.ext_comp_1004).className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            $(this._splitpage_tools.ext_gen22).disabled = true;
        } else {
            $(this._splitpage_tools.ext_comp_1003).className = "x-btn-wrap x-btn x-btn-icon";
            $(this._splitpage_tools.ext_gen14).disabled = false;
            $(this._splitpage_tools.ext_comp_1004).className = "x-btn-wrap x-btn x-btn-icon";
            $(this._splitpage_tools.ext_gen22).disabled = false;
        }
        if (this.splitpage.currentPage == this.splitpage.pageCount) {
            $(this._splitpage_tools.ext_comp_1005).className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            $(this._splitpage_tools.ext_gen34).disabled = true;
            $(this._splitpage_tools.ext_comp_1006).className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            $(this._splitpage_tools.ext_gen45).disabled = true;
        } else {
            $(this._splitpage_tools.ext_comp_1005).className = "x-btn-wrap x-btn x-btn-icon";
            $(this._splitpage_tools.ext_gen34).disabled = false;
            $(this._splitpage_tools.ext_comp_1006).className = "x-btn-wrap x-btn x-btn-icon";
            $(this._splitpage_tools.ext_gen45).disabled = false;
        }
    }
    //��ʼ����ҳ��Ϣ(��һ������ʹ��)
    combobox.prototype.initpage = function (values, pagesize, cupage) {
        this.splitpage.pageSize = pagesize;
        this.splitpage.recordCount = values.length;
        this.splitpage.currentPage = cupage;
        this.splitpage.pageCount = Math.ceil(this.splitpage.recordCount / this.splitpage.pageSize);
        if (this.splitpage.currentPage > this.splitpage.pageCount) this.splitpage.currentPage = this.splitpage.pageCount;
        this.splitpage.nextPage = (this.splitpage.currentPage < this.splitpage.pageCount ? this.splitpage.currentPage + 1 : this.splitpage.pageCount);
        this.splitpage.previewPage = (this.splitpage.currentPage - 1 > 1 ? this.splitpage.currentPage - 1 : 1);
        this.splitpage.startRecord = (this.splitpage.currentPage - 1) * this.splitpage.pageSize;
        if (this.splitpage.currentPage > this.splitpage.pageCount) this.splitpage.currentPage = this.splitpage.pageCount;
    }
    if (this.pagesize)
        this.initpage(this.values, this.pagesize, 1);

    //�Զ����ҳʵ��
    function showpage() {//�Զ����ҳ���ģ��
        var pagehtml = "<div id=\"splitPage_" + comboboxindex + "\"><DIV class=\"x-toolbar x-small-editor\" id=ext-comp-1002><TABLE cellSpacing=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD>" +
            "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.splitpage.currentPage == 1 ? "x-item-disabled" : "") + "\" id=combobox-ext-comp-1003_" + comboboxindex + " style=\"WIDTH: auto\" cellSpacing=0 cellPadding=0 border=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
            "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.splitpage.currentPage == 1 ? "disabled" : "") + " class=\"x-btn-text x-tbar-page-first\" id=combobox-ext-gen14_" + comboboxindex + " qtip=\"��һҳ\" onclick=\"" + selfName + ".turnPage(1)\">��</BUTTON></EM></TD>" +
            "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
            "<TD>" +
            "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.splitpage.currentPage == 1 ? "x-item-disabled" : "") + "\" id=combobox-ext-comp-1004_" + comboboxindex + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
            "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.splitpage.currentPage == 1 ? "disabled" : "") + " class=\"x-btn-text x-tbar-page-prev\" id=combobox-ext-gen22_" + comboboxindex + " qtip=\"��һҳ\" onclick=\"" + selfName + ".turnPage(" + selfName + ".splitpage.previewPage)\">��</BUTTON></EM></TD>" +
            "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
            "<TD><SPAN class=ytb-sep ></SPAN></TD>" +
            "<TD><SPAN class=ytb-text><span id=\"comboboxPage_All_" + comboboxindex + "\">" + eval(selfName + ".splitpage.currentPage") + "</span></SPAN></TD>" +
            //"<TD><INPUT class=x-tbar-page-number id=\"comboboxPage_CUR_" + comboboxindex + "\" style=\"HEIGHT: 18px\" size=3 value=" + _this.splitpage.currentPage + "></TD>"+
            "<TD><SPAN class=ytb-text>/ <span id=\"comboboxPage_All\">" + eval(selfName + ".splitpage.pageCount") + "</span></SPAN></TD>" +
            "<TD><SPAN class=ytb-sep></SPAN></TD>" +
            "<TD id=ext-gen35>" +
            "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.splitpage.currentPage == _this.splitpage.pageCount ? "x-item-disabled" : "") + "\" id=combobox-ext-comp-1005_" + comboboxindex + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
            "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.splitpage.currentPage == _this.splitpage.pageCount ? "disabled" : "") + " class=\"x-btn-text x-tbar-page-next\" id=combobox-ext-gen37_" + comboboxindex + " qtip=\"��һҳ\" onclick=\"" + selfName + ".turnPage(" + selfName + ".splitpage.nextPage)\">��</BUTTON></EM></TD>" +
            "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
            "<TD id=ext-gen43>" +
            "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.splitpage.currentPage == _this.splitpage.pageCount ? "x-item-disabled" : "") + "\" id=combobox-ext-comp-1006_" + comboboxindex + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
            "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.splitpage.currentPage == _this.splitpage.pageCount ? "disabled" : "") + " class=\"x-btn-text x-tbar-page-last\" id=combobox-ext-gen45_" + comboboxindex + " qtip=\"���һҳ\" onclick=\"" + selfName + ".turnPage(" + selfName + ".splitpage.pageCount)\">��</BUTTON></EM></TD>" +
            "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
            "<TD><SPAN class=ytb-sep></SPAN></TD>" +
            "</TR></TBODY></TABLE></div></div>";
        //��ʼ����tools
        return pagehtml;
    }

    //����select
    combobox.prototype.initCheckBox = function (id, texts, width, heigth, values, pagesize) {
        Ext.onReady(function () {
            Ext.namespace("Ext.comboData");
            percent = Ext.comboData.percent = [];//���״̬
            if (_this.type == 1) {
                percent.push(["", vcomframe.combobox_emptyText + (this.texts || "...")]);
            }
            if (_this.pagesize && !_this.defalutvalue) {
                for (var i = 0; i < (values.length > _this.pagesize ? _this.pagesize : values.length); i++) {
                    percent.push([values[i].value, values[i].text]);
                }
            } else if (_this.pagesize && _this.defalutvalue) {
                var index = 0;
                for (var j = 0; j < values.length; j++) {
                    if (values[j].value == _this.defalutvalue) {
                        index = j;
                        break;
                    }
                }
                var sp = Math.ceil((index + 1) / pagesize);
                _this.initpage(_this.values, _this.pagesize, sp);
                for (var i = _this.splitpage.startRecord; i < _this.splitpage.startRecord + ((_this.splitpage.recordCount - _this.splitpage.startRecord) >= _this.splitpage.pageSize ? _this.splitpage.pageSize : (_this.splitpage.recordCount - _this.splitpage.startRecord)); i++) {
                    percent.push([values[i].value, values[i].text]);
                }
            } else {
                for (var i = 0; i < values.length; i++) {
                    percent.push([values[i].value, values[i].text]);
                }
            }
            _this.store = new Ext.data.SimpleStore({fields: ["value", "text"], data: percent || [["", ""]]});
            _this.comwithpa = new Ext.form.ComboBox({
                store: _this.store,
                editable: editable || false,
                displayField: "text",
                valueField: "value",
                listClass: "alignLeft",
                hiddenName: id,
                id: id + "_1",
                maxHeight: _this.heigth || 300,
                width: (Ext.get(id).getComputedWidth() == 0 ? (width || 150) : (Ext.get(id).getComputedWidth())),
                heigth: _this.heigth || 300,
                typeAhead: true,
                mode: "local",
                types: 'ComboBoxs',
                stateful: false,
                stateId: null,
                disabled: _this.disable || false,
                resizable: false,
                triggerAction: "all",
                forceSelection: true,
                emptyText: vcomframe.combobox_emptyText + (texts || "..."),
                tpl: _this.pagesize == null ? null : "<tpl for=\".\"><div class=\"x-combo-list-item\">{text}</div></tpl><div >" + showpage() + "</div>",
                renderTo: ids
            });
            _this.comwithpa.on('expand', function () {
                this.restrictHeight()
            });
            if (_this.pagesize) {
                _this.comwithpa.on("beforequery", function (query) {
                    var index = 0;
                    _index = 0;
                    //var _data=new Array();//���ذ���ƴ����ѯ
                    _this.data = new Array();
                    if (query.query != "") {
                        for (var i = 0; i < _this.values.length; i++) {//����textѡ��
                            if (_this.values[i] != null)
                                if (_this.values[i].text.indexOf(query.query) == 0) {
                                    _this.data[index++] = _this.values[i]
                                }
                        }
                    } else {
                        _this.data = _this.values;
                    }
                    if (_this.data.length == 0) {
                        _this.data[0] = {value: "", text: ""}
                    }
                    ;
                    //_this.comwithpa.onFocus();
                    //_this.comwithpa.expand();
                    //_this.comwithpa.el.focus();
                    //_this.setValue(_this.data[0].value)
                    //alert(_this.data.length);
                    if (query.query != "") {
                        _this.turnPage(1);
                        _this.comwithpa.view.tpl = new Ext.XTemplate("<tpl for=\".\"><div class=\"x-combo-list-item\">{text}</div></tpl><div >" + showpage() + "</div>");
                    }
                });
            } else {
                if (_this.values.length > 0 && _this.values[0].pinyin) {

                }

            }
            if (_this.defalutvalue) _this.comwithpa.setValue(_this.defalutvalue);
            if (_this.jilianobject) {
                _this.comwithpa.on("select", function (o, record, index) {
                    if (typeof (_this.jilianobject) == "object") {
                        if (_this.type == 1) {
                            if (index == 0) {
                                _this.jilian([])
                            } else
                                _this.jilian(_this.jilianvalue[index - 1]);
                        } else {
                            _this.jilian(_this.jilianvalue[index]);
                        }
                    } else if (typeof (_this.jilianobject) == "function") {
                        _this.jilianobject(o, record, index);
                    }
                });
            }
            ____object[____object.length] = _this.comwithpa;
            //comwithpa.onFocus();
            //comwithpa.expand();
            //comwithpa.el.focus();
        });
    }
    this.initCheckBox(this.id, this.text, this.width, this.heigth, this.values, this.pagesize);
}

/*
* ���ܵ��У� 
* һ��ģ��google��Ϣ��ʾ
* ��������˵��
*	@idΪcombobox������Ӧ��div��id(��ѡ)
*		textΪΪ�յ�ʱ����ʾ��ʾ��Ϣ��Ϣ(��ѡ)
*		widthΪ���ÿ��(��ѡ)
*		heigthΪ���ø߶�(��ѡ)
*		pagesizeÿҳ��ʾ����(������ajax��ʱ����Ч),���Ϊnull���ʾ����ҳ��
*		url����ajax��Ҫ��url��ַ��
*		value����ģ��ƴ���������ݣ������ط�ҳ���������ajax��˲�����Ҫ����Ϊnull
*		defalutvalue����Ĭ��ֵ��ʽΪ{value:'2',text:'����'}
*		text1�Զ���json����value�ֶ�
*		text2�Զ���json����text�ֶ�
* ������չ����
*		1��֧���첽��ҳ��
*		2��֧�ֵ��ֹ�������Ϣ���˺�������б�ķ�ҳ
*		3��֧��ͨ�������Ƿ���ʾ��ҳ
*		6��֧������ƴ����ѯ
*		
* ����exemple
*			var value3=[{value:'1',text:'����',pinyin:'henan'},
*							{value:'2',text:'����',pinyin:'nanyang'},
*							{value:'3',text:'�ӱ�',pinyin:'hebei'},
*							{value:'4',text:'����',pinyin:'xinyang'},
*							{value:'5',text:'����',pinyin:'shangqiu'}
*							];
*			var activebox=new activecombobox("pagepercent1","ʡ��","100%",150,5,"ComboBox.action",value3);
*			activebox.getValue();//ȡѡ�е�ֵ��value
*			activebox.getText();//ȡѡ��ֵ��text
*/
function activecombobox(id, texts, width, heigth, pagesize, url, value, defalutvalue, text1, text2, pinyin) {
    this.id = id;
    this.width = width;
    this.heigth = heigth;
    this.pagesize = pagesize;
    this.text1 = text1;
    this.text2 = text2;
    this.pinyin = pinyin;
    this.value = value;
    if (this.text1 && this.text2) {
        var valuearray = new Array();
        for (var i = 0; i < this.value.length; i++) {
            var _value = {
                value: eval("this.value[" + i + "]." + this.text1),
                text: eval("this.value[" + i + "]." + this.text2),
                pinyin: eval("this.value[" + i + "]." + this.pinyin) || ''
            };
            valuearray[i] = _value;
        }
        this.value = valuearray;
    }
    this.url = url;
    var _this = this;
    this.defalutvalue = defalutvalue;
    this.dsSupplier = null;
    this.supplierCmb = null;
    //����comboBoxѡ�е�ֵvalue
    activecombobox.prototype.getValue = function () {
        return this.supplierCmb.getValue();
    }
    //����comboBoxѡ�е�ֵtext
    activecombobox.prototype.getText = function () {
        return this.supplierCmb.getRawValue();
    }
    //�趨Ĭ��ѡ��ֵ
    activecombobox.prototype.setValues = function (value) {
        this.supplierCmb.setValue(value);
    }
    //��ȡ��ǰid
    activecombobox.prototype.getComboBox = function () {
        return this.supplierCmb;
    }
    Ext.onReady(function () {
        var urlstore = new Ext.data.HttpProxy({
            url: _this.url
        });
        _this.dsSupplier = new Ext.data.Store({
            proxy: urlstore,
            reader: new Ext.data.JsonReader({
                root: 'gridRows',
                totalProperty: 'totalCount'
            }, [
                {name: 'value', mapping: 'value'},
                {name: 'text', mapping: 'text'}
            ])
        });
        _this.supplierCmb = new Ext.form.ComboBox({
            store: _this.dsSupplier,
            displayField: 'text',
            valueField: 'value',
            typeAhead: true,
            loadingText: 'loading...',
            maxHeight: _this.heigth || 300,
            width: (Ext.get(_this.id).getComputedWidth() == 0 ? (_this.width || 150) : (Ext.get(_this.id).getComputedWidth())),
            hiddenName: _this.id,
            id: _this.id + "_1",
            //hideTrigger:true,
            minChars: 1,
            types: 'ComboBoxs',
            resizable: false,
            stateful: false,
            stateId: null,
            pageSize: _this.value != null ? null : _this.pagesize,
            forceSelection: true,
            triggerAction: 'all',
            lazyInit: false,
            emptyText: vcomframe.activecombobox_emptyText + (texts || "..."),
            renderTo: _this.id
        });
        if (_this.defalutvalue) {
            _this.supplierCmb.setValue(_this.defalutvalue.value);
            Ext.get(_this.id + "_1").dom.value = _this.defalutvalue.text;
        }
        ;
        _this.supplierCmb.on("beforequery", function (query) {
            if (_this.value) {
                var value = {gridRows: [], totalCount: '1'};
                var values = new Array();
                var index = 0;
                for (var i = 0; i < _this.value.length; i++) {
                    if (_this.value[i].pinyin.indexOf(query.query) == 0 || _this.value[i].text.indexOf(query.query) == 0) {
                        values[index++] = _this.value[i]
                    }
                }
                value.gridRows = values;
                _this.dsSupplier.proxy = new Ext.data.MemoryProxy(value);
            }

            //alert(query.query);

        })
    })

}

var ____node = "";

function treecombobox(id, texts, width, heigth, value, treeurl, defalutvalue, type, rootvis, onlyLeafCheckable, functions) {
    this.comboxWithTree = null;
    this.id = id;
    this.defalutvalue = defalutvalue;
    this.texts = texts;
    this.width = width;
    this.rootvis = rootvis;
    this.onlyLeafCheckable = onlyLeafCheckable;
    this.heigth = heigth;
    this.value = value;
    this.functions = functions;
    var _this = this;
    Ext.onReady(function () {
        _this.comboxWithTree = new Ext.form.ComboBox({
            store: new Ext.data.SimpleStore({fields: [], data: [[]]}),
            editable: false,
            shadow: false,
            mode: 'local',
            displayField: 'text',
            valueField: 'value',
            hiddenName: _this.id,
            id: _this.id + "_1",
            width: (Ext.get(_this.id).getComputedWidth() == 0 ? (_this.width || 150) : (Ext.get(_this.id).getComputedWidth())),
            triggerAction: 'all',
            types: 'ComboBoxs',
            resizable: false,
            stateful: false,
            stateId: null,
            maxHeight: _this.heigth || 200,
            emptyText: vcomframe.treecombobox_emptyText + (texts || "..."),
            tpl: '<tpl for="."><div style="height:' + (_this.heigth - 10) + 'px"><div id="' + _this.id + '__tree1"></div></div></tpl>',
            selectedClass: '',
            onSelect: Ext.emptyFn,
            renderTo: _this.id
        });
        if (_this.defalutvalue) {
            _this.comboxWithTree.setValue(_this.defalutvalue.value);
            Ext.get(_this.id + "_1").dom.value = _this.defalutvalue.text;

        }
        ;
        var root = new Ext.tree.AsyncTreeNode({
            id: 'root',
            text: "���ڵ�",
            scode: "00",
            children: value
        });
        var load1 = new Ext.tree.TreeLoader();
        var load2 = new Ext.tree.TreeLoader({
            dataUrl: treeurl
        })
        var tree = new Ext.tree.TreePanel({
            root: root,//��λ�����ڵ�
            animate: true,//��������Ч��
            enableDD: false,//�������ӽڵ��϶�
            border: false,//û�б߿�
            rootVisible: _this.rootvis || false,//��Ϊfalse�����ظ��ڵ㣬�ܶ�����£�����ѡ�����ظ��ڵ�����������
            loader: treeurl == null ? load1 : load2
        });
        load2.on("beforeload", function (treeLoader, node) {
            treeLoader.baseParams.scode = node.attributes.scode;
        }, this);
        tree.on('click', function (node, e) {
            e.stopEvent();
            if (_this.onlyLeafCheckable)
                if (!node.leaf) {
                    node.expand();
                    return
                }
            if (node.disabled) return;
            ____node = node;
            if (type) {
                _this.comboxWithTree.setValue(node.id);
                Ext.get(_this.id + "_1").dom.value = node.text;
            } else {
                var _node = node;
                var _value = "";
                var _text = "";
                while (_node.id != "root") {
                    _text = _node.text + "/" + _text;
                    _value = _node.id + "/" + _value;
                    _node = _node.parentNode;
                }
                _this.comboxWithTree.setValue(_value);
                Ext.get(_this.id + "_1").dom.value = _text;
            }

            _this.comboxWithTree.collapse();
            if (_this.functions) {
                _this.functions(node, e);
            }
        });
        _this.comboxWithTree.on('expand', function () {
            tree.render(_this.id + '__tree1');
        });
        ____object[____object.length] = _this.comboxWithTree;
    })
    //����comboBoxѡ�е�ֵvalue
    treecombobox.prototype.getValue = function () {
        return this.comboxWithTree.getValue();
    }
    //����comboBoxѡ�е�ֵtext
    treecombobox.prototype.getText = function () {
        return this.comboxWithTree.getRawValue();
    }
    //�趨Ĭ��ѡ��ֵ
    treecombobox.prototype.setValues = function (node) {
        this.comboxWithTree.setValue(node.value);
        Ext.get(this.id + "_1").dom.value = node.text;
    }
    //����comboBox������
    treecombobox.prototype.getComboBox = function () {
        return this.comboxWithTree;
    }
    //��ȡ��ǰid
    treecombobox.prototype.getId = function () {
        return this.id;
    }
}

function treecheckpanel(id, texts, width, heigth, valuefield, treejson, type, treeurl, defalutvalue, checkModel, onlyLeafCheckable, panelName, checkfunction) {
    this.comboxWithTree = null;
    this.tree = null;
    this.id = id;
    this.defalutvalue = defalutvalue;
    this.texts = texts;
    this.treejson = treejson;
    this.checkfunction = checkfunction;
    this.type = type;
    this.treeurl = treeurl;
    this.checkModel = checkModel;
    var _this = this;

    Ext.onReady(function () {
        _this.comboxWithTree = new Ext.form.ComboBox({
            store: new Ext.data.SimpleStore({fields: [], data: [[]]}),
            editable: false,
            shadow: false,
            mode: 'local',
            displayField: 'text',
            valueField: 'value',
            inputType: 'text',
            hiddenName: _this.id,
            id: _this.id + "_1",
            types: 'ComboBoxs',
            width: (Ext.get(_this.id).getComputedWidth() == 0 ? (_this.width || 150) : (Ext.get(_this.id).getComputedWidth())),
            triggerAction: 'all',
            resizable: false,
            maxHeight: heigth || 200,
            emptyText: vcomframe.treecombobox_emptyText + (texts || "..."),
            //tpl: '<tpl for="."><div style="height:200px"><div id="'+_this.id+'__tree1"></div></div></tpl>',
            tpl: '<tpl for="."><div style="height:150px;overflow:auto;"><div id="' + _this.id + '_tree1"></div></div></tpl><div align=center><input onclick=\"' + panelName + '.setvalue();\"  class=\"button\" type=\"button\" value=\"ȷ��\">&nbsp;&nbsp;<input  class=\"button\" type=\"button\" value=\"ȡ��\" onclick=\"' + panelName + '.comboxWithTree.collapse();\"></div>',
            selectedClass: '',
            onSelect: Ext.emptyFn,
            renderTo: _this.id
        });


        if (_this.defalutvalue) {
            _this.comboxWithTree.setValue(_this.defalutvalue.value);
            Ext.get(_this.id + "_1").dom.value = _this.defalutvalue.text;

        }
        ;

        _this.root = new Ext.tree.AsyncTreeNode({
            id: 'root',
            text: "���ڵ�",
            children: _this.treejson
        });

        var load3 = new Ext.tree.TreeLoader({baseAttrs: {uiProvider: Ext.tree.TreeCheckNodeUI}});
        var load4 = new Ext.tree.TreeLoader({
            dataUrl: treeurl,
            baseAttrs: {uiProvider: Ext.tree.TreeCheckNodeUI}
        });


        _this.tree = new Ext.tree.TreePanel({
            root: _this.root,//��λ�����ڵ�
            animate: false,//��������Ч��
            enableDD: false,//�������ӽڵ��϶�
            border: false,//û�б߿�
            checkModel: _this.checkModel || 'cascade', //�����ļ�����ѡ 
            onlyLeafCheckable: onlyLeafCheckable || false,//�������н�㶼��ѡ 
            rootVisible: false,//��Ϊfalse�����ظ��ڵ㣬�ܶ�����£�����ѡ�����ظ��ڵ�����������
            loader: _this.type == 1 ? load3 : load4
        });


        _this.comboxWithTree.on('expand', function () {
            _this.tree.render(_this.id + '_tree1');
        });
        ____object[____object.length] = _this.comboxWithTree;
        if (_this.checkfunction) {
            _this.tree.on("check", function (v, m) {
                _this.checkfunction(v, m);
            });
        }

    });


    //���ض����tree�����׳�����ӿ�getChecked
    treecheckpanel.prototype.trees = function () {
        return this.tree;
    }

    treecheckpanel.prototype.collapse = function () {
        return this.tree;
    }

    treecheckpanel.prototype.Checked = function (value) {
        this.comboxWithTree.onFocus();
        this.comboxWithTree.expand();
        //this.comboxWithTree.el.focus();
        this.tree.expandAll();
        var checkedbox = this.tree.getChecked();
        for (var i = 0; i < checkedbox.length; i++) {
            checkedbox[i].attributes.checked = false;
        }
        var valueid = value.split(",");
        for (var j = 0; j < valueid.length; j++) {
            if (valueid[j] != "") {
                var node = this.tree.getNodeById(valueid[j]);
                node.attributes.checked = true;
            }
        }
        //alert();
        this.root.reload();
        this.tree.collapseAll();
        this.comboxWithTree.collapse();

    }
    treecheckpanel.prototype.UnChecked = function () {
        this.comboxWithTree.onFocus();
        this.comboxWithTree.expand();
        var checkedbox = this.tree.getChecked();
        for (var i = 0; i < checkedbox.length; i++) {
            checkedbox[i].attributes.checked = false;
        }

        this.root.reload();
        this.comboxWithTree.collapse();
        //��ֵ
        this.comboxWithTree.setValue("");
        Ext.get(this.id + "_1").dom.value = vcomframe.treecombobox_emptyText + (this.texts || "...");
    }
    //��ȡѡ�е�checkboxֵ
    treecheckpanel.prototype.getCheckedValue = function () {
        //this.tree.expandAll();
        var checkedbox = this.tree.getChecked();
        var value = "";
        for (var i = 0; i < checkedbox.length; i++) {

            value = value + checkedbox[i].id + ",";
        }
        return value.replace(/,$/, "");
    }
    //��ȡѡ�е�checkboxֵ
    treecheckpanel.prototype.getCheckedLeaf = function () {
        //this.tree.expandAll();
        var checkedbox = this.tree.getChecked();
        var value = "";
        for (var i = 0; i < checkedbox.length; i++) {

            value = value + checkedbox[i].leaf + ",";
        }
        return value.replace(/,$/, "");
    }

    //��ȡѡ�е�checkbox����
    treecheckpanel.prototype.getCheckedText = function () {
        //this.tree.expandAll();
        var checkedbox = this.tree.getChecked();
        var value = "";
        for (var i = 0; i < checkedbox.length; i++) {
            value = value + checkedbox[i].text + ",";
        }
        return value.replace(/,$/, "");
    }

    //��ȡѡ�е�checkbox����
    treecheckpanel.prototype.setvalue = function () {
        //��ֵ
        var text = this.getCheckedText();
        var value = this.getCheckedValue();
        //��ֵ
        this.comboxWithTree.setValue(value);
        Ext.get(this.id + "_1").dom.value = text;
        this.comboxWithTree.collapse();

    }
    //��ȡ��ǰid
    treecheckpanel.prototype.getComboBox = function () {
        return this.comboxWithTree;
    }
    treecheckpanel.prototype.getValue = function () {
        return this.comboxWithTree.getValue();
    }
    treecheckpanel.prototype.getText = function () {
        return this.comboxWithTree.getRawValue();
    }
}
