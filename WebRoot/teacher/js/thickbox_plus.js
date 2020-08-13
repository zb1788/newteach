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
        left: ((w - TB_WIDTH) / 2) + "px", top: ((h - TB_HEIGHT) / 2) + "px"
    });
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
