//--------------ȫ�ֱ���-yangweiming---------2015-01-01--------
var currentTop = 0;
var currentEvent = null;
var artAlert;
var closeAllArtDialog;
var loadingTxt = '<img src="/images/loading.gif"/>';
loadingTxt += '<label class=loadingTxt>&nbsp;&nbsp;&nbsp;&nbsp;���ڴ������Ժ�... </label>';
var imgScrBoy = 'src="/public/images/teacher/boy2.png"';
var imgScrGirl = 'src="/public/images/teacher/girl2.png"';

function getCurrentTop(evt, offsetHeight) {
    var isSame = currentEvent == evt;
    if (currentEvent != evt) {
        currentEvent = evt || window.event;
        currentTop = currentEvent.clientY - (offsetHeight || 150);
    }
    return currentTop;
}

//-------------------loading����--------------------
function showLoading(evt) {
    return artAlert(evt, '', loadingTxt, 6000, false);//��ʾloadingͼ��
}

$(function () {
    var artDefaults = art.dialog.defaults;
    artDefaults.title = "��ʾ";
    artDefaults.width = 300;
    artDefaults.height = 100;
    artDefaults.lock = true;
    artDefaults.fixed = true; //ʼ�վ�����ʾ
    artDefaults.esc = false;//esc�رմ���
    artDefaults.drag = true;
    artDefaults.resize = false;
    artDefaults.opacity = 0;//͸����
    //-------------------�ر�����artDialog,�����loading����------
    closeAllArtDialog = function () {
        var list = art.dialog.list;
        for (var i in list) {
            if (list[i].title().innerHTML == artDefaults.title)
                list[i].close();
        }
        ;
    }
    //�������ֵ�����ʾ��
    artAlert = function (evt, myIcon, myContent, showTime, isShowCancel) {
        art.dialog({
            top: getCurrentTop(evt),
            icon: myIcon,
            content: myContent + '',
            time: showTime || 2,
            cancel: isShowCancel
        });
    }
    //���½ǵ�����ʾ��
    artDialog.notice = function (options) {
        var opt = options || {},
            api, aConfig, hide, wrap, top,
            duration = 500;
        var config = {
            //id: 'Notice',//����ID��ͬʱֻ�ܳ���һ��notice
            left: '100%',
            top: '100%',
            width: 240,// ����ָ��һ�����ؿ��ֵ���߰ٷֱȣ�������������ڸı���ܵ���artDialog����
            height: 100,
            drag: false,
            follow: null,
            lock: false,
            icon: 'warning',
            time: 5,
            init: function (here) {
                api = this;
                aConfig = api.config;
                wrap = api.DOM.wrap;
                top = parseInt(wrap[0].style.top);
                hide = top + wrap[0].offsetHeight;
                wrap.css('top', hide + 'px')
                    .animate({top: top + 'px'}, duration, function () {
                        opt.init && opt.init.call(api, here);
                    });
            },
            close: function (here) {
                wrap.animate({top: hide + 'px'}, duration, function () {
                    opt.close && opt.close.call(this, here);
                    aConfig.close = $.noop;
                    api.close();
                });
                return false;
            }
        };
        for (var i in opt) {
            if (config[i] === undefined) config[i] = opt[i];
        }
        ;
        return artDialog(config);
    };
});
/***********************END artDialog**********************/
//-------------------�л�ѡ��״̬--------------------
var $checkBox;

function toggleCheck(obj) {
    $checkBox = $(obj).find('input').eq(0);
    if (!$checkBox.prop('disabled'))//û�н������л�
        $checkBox.prop('checked', !$checkBox.prop('checked'));
}

//-------------------���ֱ�ӵ����ѡ��״̬����-------------------
function clickCheckBox(obj) {
    if ($(obj).prop("checked") == true || $(obj).prop("checked") == "checked")
        $(obj).prop("checked", false);
    else $(obj).prop("checked", true);
}

//-------------------��ʽ����Ա���֣����������ص�-------------------
function formatTruename(truename) {
    return truename.substr(0, 10);
}