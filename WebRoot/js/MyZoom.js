var maxZoom = 3;
var minZoom = 1.5;
var myZoom = new Zoom();

function Zoom() {
    this.zoom = 1;
    this.baseWidth = 1024;
    this.baseHeight = 768;
    this.extraHeight = 0;
    this.toolHeight = 0;
}

Zoom.prototype.setZoom = function (selector) {

    //���ֱ��ʱ���С��4:3ʱ����4:3����
    if (screen.width >= 1024 && screen.width / screen.height >= 4 / 3) {
        myZoom.baseWidth = screen.width / screen.height * 768;
    }

    //�������߶�
    myZoom.toolHeight = screen.height - screen.availHeight;


    //�ڿ�Ԥ��
    if (loginStyle == 1 || ieBrowser == "true") {
        myZoom.toolHeight = myZoom.toolHeight + (screen.availHeight - document.documentElement.clientHeight - 8);
    }

    myZoom.baseWidth = myZoom.baseWidth;
    myZoom.baseHeight = myZoom.baseHeight - myZoom.toolHeight;
    var width = screen.width;
    var height = screen.height - myZoom.toolHeight;
    var widthZoom = width / myZoom.baseWidth;
    var heightZoom = height / myZoom.baseHeight;

    //alert("width:"+width+"basewidth:"+myZoom.baseWidth+"height:"+height+"baseheight:"+myZoom.baseHeight);
    if (widthZoom < heightZoom) {
        zoom = widthZoom;

        myZoom.extraHeight = height - widthZoom * myZoom.baseHeight;
        myZoom.extraHeight = myZoom.extraHeight / zoom;
    } else {
        zoom = heightZoom;
    }
    myZoom.zoom = zoom;
    zoomStart(zoom, selector);
}

function zoomIn(selector) {
    zoom = (Math.round(zoom * 10) + 1) / 10;
    if (zoom > maxZoom) {
        zoom = maxZoom;
    }
    zoomStart(zoom, selector);
}

function zoomOut(selector) {
    zoom = (Math.round(zoom * 10) - 1) / 10;
    if (zoom < minZoom) {
        zoom = minZoom
    }
    zoomStart(0.8, selector);
}

function zoomStart(zoom, selector) {
    var _el = $(selector);
    var w = Math.round(_el.attr('_width') / zoom);
    _el.children().each(function () {
        var _el_2 = $(this), _pd = Math.round(_el_2.attr('_pd') / zoom);
        _el_2.width(Math.round(_el_2.attr('_width') / zoom));
        _el_2.css('margin-left', _pd).css('margin-right', _pd);
    });
    var _pd = Math.round(($(window).width() - 40 - w * zoom) / 2 / zoom);
    _el.width(w).css('margin-left', _pd).css('margin-right', _pd);
    $(selector).css("zoom", zoom);
    _el.find('textarea').each(function () {
        var _tEl = $(this);
        _tEl.width(_tEl.parents('.sc_wrap').width());
    });
}

//����myZoom.zoom�����������
function zoomWidth(orgWidth) {
    return Math.round(orgWidth / myZoom.zoom)
}