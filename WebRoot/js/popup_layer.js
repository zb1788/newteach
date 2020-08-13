Function.prototype.binding = function () {
    if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
    var __method = this, args = jQuery.makeArray(arguments), object = args.shift();
    return function () {
        return __method.apply(object, args.concat(jQuery.makeArray(arguments)));
    }
}

var Class = function (subclass) {
    subclass.setOptions = function (options) {
        this.options = jQuery.extend({}, this.options, options);
        for (var key in options) {
            if (/^on[A-Z][A-Za-z]*$/.test(key)) {
                $(this).bind(key, options[key]);
            }
        }
    }
    var fn = function () {
        if (subclass._init && typeof subclass._init == 'function') {
            this._init.apply(this, arguments);
        }
    }
    if (typeof subclass == 'object') {
        fn.prototype = subclass;
    }
    return fn;
}

var PopupLayer = new Class({
    options: {
        trigger: null,                            //������Ԫ�ػ�id,�������
        popupBlk: null,                           //�������ݲ�Ԫ�ػ�id,�������
        closeBtn: null,
        recommendpath: "",
        playcount: 0,                         //�Ƿ������Զ���
        popupLayerClass: "popupLayer",            //������������class����
        eventType: "click",                       //�����¼�������
        offsets: {                                //����������λ�õĵ���ֵ
            x: 0,
            y: 0
        },
        useFx: false,                             //�Ƿ�ʹ����Ч
        useOverlay: false,                        //�Ƿ�ʹ��ȫ������
        usePopupIframe: false,                     //�Ƿ�ʹ����������
        isresize: true,                           //�Ƿ��window�����resize�¼�
        onBeforeStart: function () {
        }            //�Զ����¼�
    },
    _init: function (options) {
        this.setOptions(options);                //��������
        this.isSetPosition = this.isDoPopup = this.isOverlay = true;    //����һЩ����
        this.popupLayer = $(document.createElement("div")).addClass(this.options.popupLayerClass);     //��ʼ�����������
        this.popupIframe = $(document.createElement("iframe")).attr({border: 0, frameborder: 0});         //��������,��������ie6�µ�select
        this.trigger = $(this.options.trigger);                         //�Ѵ���Ԫ�ط�װ��ʵ����һ�����ԣ�����ʹ�ü����
        this.popupBlk = $(this.options.popupBlk);                       //�ѵ������ݲ�Ԫ�ط�װ��ʵ����һ������
        this.closeBtn = $(this.options.closeBtn);                       //�ѹرհ�ť�ط�װ��ʵ����һ������
        $(this).trigger("onBeforeStart");                               //ִ���Զ����¼���
        this._construct();
        if (this.options.recommendpath != "") {
            if (this.options.playcount == 0) this.show();
            else this.showdiv();
        }
        //((this.options.recommendpath!="")&&(this.options.playcount==0))?this.show():this.showdiv();		
        this.isresize ? $(window).bind("resize", this.doresize.binding(this)) : null;
        this.options.closeBtn ? this.closeBtn.bind("click", this.close.binding(this)) : null;   //����йرհ�ť������رհ�ť�󶨹ر��¼�
        this.options.trigger ? this.trigger.bind("click", this.show.binding(this)) : null;   //����йرհ�ť������رհ�ť�󶨹ر��¼�
    },
    show: function () {
        document.getElementById("emample9").style.display = "none";
        if (this.isSetPosition) {
            this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
        }
        this.options.useOverlay ? this._loadOverlay() : null;               //���ʹ���������������Ԫ��
        (this.isOverlay && this.options.useOverlay) ? this.overlay.show() : null;
        if (this.isDoPopup && (this.popupLayer.css("display") == "none")) {
            this.options.useFx ? this.affff("open") : this.popupLayer.show();
        }
    },
    affff: function (way) {
        if (way == "open") {
            this.popupLayer.css({opacity: 0.3}).show(400, function () {
                this.popupLayer.animate({
                    left: ($(document).width() - this.popupLayer.width()) / 2,
                    top: (document.documentElement.clientHeight - this.popupLayer.height()) / 2 + $(document).scrollTop(),
                    opacity: 0.8
                }, 1000, function () {
                    this.popupLayer.css("opacity", 1)
                }.binding(this));
            }.binding(this));
        } else {
            this.popupLayer.animate({
                left: this.trigger.offset().left,
                top: this.trigger.offset().top,
                opacity: 0.1
            }, {
                duration: 500, complete: function () {
                    this.popupLayer.css("opacity", 1);
                    this.popupLayer.hide()
                }.binding(this)
            });
        }
    },
    _construct: function () {                  //���쵯����
        this.popupBlk.show();
        this.popupLayer.append(this.popupBlk.css({opacity: 1})).appendTo($(document.body)).css({
            position: "absolute",
            'z-index': 2,
            width: this.popupBlk.get(0).offsetWidth,
            height: this.popupBlk.get(0).offsetHeight
        });
        this.options.usePopupIframe ? this.popupLayer.append(this.popupIframe) : null;
        this.recalculatePopupIframe();
        this.popupLayer.hide();
    },
    _loadOverlay: function () {                //��������
        pageWidth = ($.browser.version == "6.0") ? $(document).width() - 21 : $(document).width();
        this.overlay ? this.overlay.remove() : null;
        this.overlay = $(document.createElement("div"));
        this.overlay.css({
            position: "absolute",
            "z-index": 1,
            left: 0,
            top: 0,
            zoom: 1,
            display: "none",
            width: pageWidth,
            height: $(document).height()
        }).appendTo($(document.body)).append("<div style='position:absolute;z-index:2;width:100%;height:100%;left:0;top:0;opacity:0.3;filter:Alpha(opacity=30);background:#000'></div><iframe frameborder='0' border='0' style='width:100%;height:100%;position:absolute;z-index:1;left:0;top:0;filter:Alpha(opacity=0);'></iframe>")
    },
    doresize: function () {
        this.overlay ? this.overlay.css({
            width: ($.browser.version == "6.0") ? $(document).width() - 21 : $(document).width(),
            height: ($.browser.version == "6.0") ? $(document).height() - 4 : $(document).height()
        }) : null;
        if (this.isSetPosition) {
            this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
        }
    },
    setPosition: function (left, top) {          //ͨ������Ĳ���ֵ�ı䵯�����λ��
        this.popupLayer.css({left: left, top: top});
    },
    doEffects: function (way) {                //����Ч
        way == "open" ? this.popupLayer.show("slow") : this.popupLayer.hide("slow");

    },
    recalculatePopupIframe: function () {     //�ػ�popupIframe,�����֪��ô�Ľ���ֻ������������취��
        this.popupIframe.css({
            position: "absolute",
            'z-index': -1,
            left: 0,
            top: 0,
            opacity: 0,
            width: this.popupBlk.get(0).offsetWidth,
            height: this.popupBlk.get(0).offsetHeight
        });
    },
    close: function () {                      //�رշ���
        this.showdiv();
        this.options.useOverlay ? this.overlay.hide() : null;
        this.options.useFx ? this.doEffects("close") : this.popupLayer.hide();
    }
    , showdiv: function () {
        document.getElementById("emample9").style.display = "";
    }
});

function TB_show(caption, height, width) { //function called when the user clicks on a thickbox link
    try {
        $("#TB_overlay").css("opacity", "0.6");
        $("#TB_overlay").css("filter", "alpha(opacity=60)");
        $("#TB_overlay").css("-moz-opacity", "0.6");
        $(window).resize(TB_position);
        //$("body").append("<div id='TB_load'><div id='TB_loadContent'></div></div>");
        $("#TB_overlay").show();
        TB_WIDTH = width + 4;
        TB_HEIGHT = height + 20;
        ajaxContentW = TB_WIDTH - 4;
        ajaxContentH = TB_HEIGHT - 25;
        //$("#TB_window").append("<div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='"+path+"/web/images/Close.png' width=20/></a></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;'></div>");
        //$("#TB_closeWindowButton").click(TB_remove);
        TB_position();
        //$("#TB_load").remove();
        $("#TB_window").slideDown("normal");

    } catch (e) {
        alert(e);
    }
}

//helper functions below

function TB_remove() {
    // #TB_load removal added by Christian Montoya; solves bug when overlay is closed before image loads
    $("#TB_window").fadeOut("fast", function () {
        $('#TB_window,#TB_overlay').hide();
    });
    return false;
}

function TB_position() {
    var de = document.documentElement;
    var w = self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;

    if (window.innerHeight && window.scrollMaxY) {
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        yScroll = document.body.offsetHeight;
    }
    yScroll = yScroll + 15;

    $("#TB_window").css({
        width: TB_WIDTH + "px",
        left: (parseInt((w - TB_WIDTH) / 2)) + "px", top: "100px"
    });

    $("#upload").css({left: "0px", top: "100px"});
    $("#TB_overlay").css("height", yScroll + "px");
}

function parseQuery(query) {
    var Params = new Object();
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}
