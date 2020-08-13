//jQuery(document).bind('keydown', 'right',function (evt){jQuery('#_esc').addClass('dirty'); return false; });

//转换为整数
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}

//获取元素的坐标
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {x: l, y: t, w: w, h: h, wb: wb, hb: hb};
}

//只能跳到以下类型的元素
function Test(tag) {
    var regTag = "INPUT|SELECT|TEXTAREA|BUTTON|A";
    var tags = regTag.split("|");
    for (var i = 0; i < tags.length; i++)
        if (tag == tags[i])
            return true;
    return false;
}

//向前搜索
forewardFn = function () {
    var actEle = document.activeElement;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    for (var i = actIndex + 1; i <= document.all.length; i++) {
        eleVisible = true;
        if (document.all[i] == undefined) {
            return false;
        } else if (Test(document.all[i].tagName.toUpperCase())) {
            window.event.returnValue = false;
            var parentObj = document.all[i].parentNode;
            while (parentObj != null) {
                if (parentObj.display == "none") {
                    //alert("display==none有了");
                    eleVisible = false;
                    break;
                } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                    //alert("currentStyle.display==none有了");
                    eleVisible = false;
                    break;
                } else {
                    parentObj = parentObj.parentNode;
                }
            }
            if (eleVisible == true) {
                document.all[i].focus();
                return false;
            }
            /*
            if(document.all[i].style!=null){
                if(document.all[i].style.display!="none"){
	                try{
	                    document.all[i].focus();
	                } catch(ex){
                        alert(document.all[i].tagName+","+document.all[i].id+","+document.all[i].value);
                        //alert(document.all[i].parentNode.parentNode.parentNode.parentNode.id+","+document.all[i].parentNode.parentNode.parentNode.parentNode.currentStyle.display);
                        alert(document.all[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
	                }
                    return false;
                }
            }
            */
        }
    }
    return false;
}
//向后搜索
backwardFn = function () {
    var actEle = document.activeElement;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    for (var i = actIndex - 1; i >= 0; i--) {
        eleVisible = true;
        if (document.all[i] == undefined) {
            return false;
        } else if (Test(document.all[i].tagName.toUpperCase())) {
            window.event.returnValue = false;
            var parentObj = document.all[i].parentNode;
            while (parentObj != null) {
                if (parentObj.display == "none") {
                    eleVisible = false;
                } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                    eleVisible = false;
                } else {
                    parentObj = parentObj.parentNode;
                }
            }
            if (eleVisible == true) {
                document.all[i].focus();
                return false;
            }
        }
    }
    return false;
}
//向右搜索
rightwardFn = function () {
    var actEle = document.activeElement;
    var actX = getPos(actEle).x;
    var actY = getPos(actEle).y;
    var tmpX = 0;
    var tmpY = 0;
    var spaceXy = 9999;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    var allIndexArr = new Array();
    for (var i = 0; i < document.all.length; i++) {
        eleVisible = true;
        if (document.all[i] != undefined && getPos(document.all[i]).x > actX) {
            if (Test(document.all[i].tagName.toUpperCase())) {
                window.event.returnValue = false;
                var parentObj = document.all[i].parentNode;
                while (parentObj != null) { //元素是否可见
                    if (parentObj.display == "none") {
                        eleVisible = false;
                        break;
                    } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                        eleVisible = false;
                        break;
                    } else {
                        parentObj = parentObj.parentNode;
                    }
                }
                if (eleVisible == true) {
                    allIndexArr.push(i);
                }
            }
        }
    }
    var nextActIndex = actIndex;
    if (allIndexArr.length > 0) {
        for (var i = 0; i < allIndexArr.length; i++) {
            if (i != actIndex) {
                tmpX = getPos(document.all[allIndexArr[i]]).x;
                tmpY = getPos(document.all[allIndexArr[i]]).y;
                if (spaceXy > (Math.abs(tmpX - actX) + Math.abs(tmpY - actY))) {
                    spaceXy = Math.abs(tmpX - actX) + Math.abs(tmpY - actY);
                    nextActIndex = i;
                }
            }
        }
        //alert("444 ["+nextActIndex+"]");
        //alert("555 "+allIndexArr+abc);
        document.all[allIndexArr[nextActIndex]].focus();
    }
    return false;
}
//向左搜索
leftwardFn = function () {
    var actEle = document.activeElement;
    var actX = getPos(actEle).x;
    var actY = getPos(actEle).y;
    var tmpX = 0;
    var tmpY = 0;
    var spaceXy = 9999;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    var allIndexArr = new Array();
    for (var i = 0; i < document.all.length; i++) {
        eleVisible = true;
        if (document.all[i] != undefined && getPos(document.all[i]).x < actX) {
            if (Test(document.all[i].tagName.toUpperCase())) {
                window.event.returnValue = false;
                var parentObj = document.all[i].parentNode;
                while (parentObj != null) { //元素是否可见
                    if (parentObj.display == "none") {
                        eleVisible = false;
                        break;
                    } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                        eleVisible = false;
                        break;
                    } else {
                        parentObj = parentObj.parentNode;
                    }
                }
                if (eleVisible == true) {
                    allIndexArr.push(i);
                }
            }
        }
    }
    var nextActIndex = actIndex;
    if (allIndexArr.length > 0) {
        for (var i = 0; i < allIndexArr.length; i++) {
            if (i != actIndex) {
                tmpX = getPos(document.all[allIndexArr[i]]).x;
                tmpY = getPos(document.all[allIndexArr[i]]).y;
                if (spaceXy > (Math.abs(tmpX - actX) + Math.abs(tmpY - actY))) {
                    spaceXy = Math.abs(tmpX - actX) + Math.abs(tmpY - actY);
                    nextActIndex = i;
                }
            }
        }
        //alert("444 ["+nextActIndex+"]");
        //alert("555 "+allIndexArr+abc);
        document.all[allIndexArr[nextActIndex]].focus();
    }
    return false;
}
//向上搜索
upwardFn = function () {
    var actEle = document.activeElement;
    var actX = getPos(actEle).x;
    var actY = getPos(actEle).y;
    var tmpX = 0;
    var tmpY = 0;
    var spaceXy = 9999;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    var allIndexArr = new Array();
    for (var i = 0; i < document.all.length; i++) {
        eleVisible = true;
        if (document.all[i] != undefined && getPos(document.all[i]).y < actY) {
            if (Test(document.all[i].tagName.toUpperCase())) {
                window.event.returnValue = false;
                var parentObj = document.all[i].parentNode;
                while (parentObj != null) { //元素是否可见
                    if (parentObj.display == "none") {
                        eleVisible = false;
                        break;
                    } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                        eleVisible = false;
                        break;
                    } else {
                        parentObj = parentObj.parentNode;
                    }
                }
                if (eleVisible == true) {
                    allIndexArr.push(i);
                }
            }
        }
    }
    var nextActIndex = actIndex;
    if (allIndexArr.length > 0) {
        for (var i = 0; i < allIndexArr.length; i++) {
            if (i != actIndex) {
                tmpX = getPos(document.all[allIndexArr[i]]).x;
                tmpY = getPos(document.all[allIndexArr[i]]).y;
                if (spaceXy > (Math.abs(tmpX - actX) + Math.abs(tmpY - actY))) {
                    spaceXy = Math.abs(tmpX - actX) + Math.abs(tmpY - actY);
                    nextActIndex = i;
                }
            }
        }
        //alert("444 ["+nextActIndex+"]");
        //alert("555 "+allIndexArr+abc);
        document.all[allIndexArr[nextActIndex]].focus();
    }
    return false;
}
//向下搜索
downwardFn = function () {
    var actEle = document.activeElement;
    var actX = getPos(actEle).x;
    var actY = getPos(actEle).y;
    var tmpX = 0;
    var tmpY = 0;
    var spaceXy = 999999999;
    if (!actEle) {
        document.all[0].focus();
        return;
    }
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    var allIndexArr = new Array();
    for (var i = 0; i < document.all.length; i++) {
        eleVisible = true;
        if (document.all[i] != undefined && getPos(document.all[i]).y > actY) {
            if (Test(document.all[i].tagName.toUpperCase())) {
                window.event.returnValue = false;
                var parentObj = document.all[i].parentNode;
                while (parentObj != null) { //元素是否可见
                    if (parentObj.display == "none") {
                        eleVisible = false;
                        break;
                    } else if (parentObj.currentStyle != undefined && parentObj.currentStyle.display == "none") {
                        eleVisible = false;
                        break;
                    } else {
                        parentObj = parentObj.parentNode;
                    }
                }
                if (eleVisible == true) {
                    allIndexArr.push(i);
                }
            }
        }
    }
    var nextActIndex = actIndex;
    if (allIndexArr.length > 0) {
        for (var i = 0; i < allIndexArr.length; i++) {
            if (i != actIndex) {
                tmpX = getPos(document.all[allIndexArr[i]]).x;
                tmpY = getPos(document.all[allIndexArr[i]]).y;
                if (spaceXy > (Math.abs(tmpX - actX) * Math.abs(tmpY - actY))) {
                    spaceXy = Math.abs(tmpX - actX) * Math.abs(tmpY - actY);
                    nextActIndex = i;
                }
            }
        }
        //alert("444 ["+nextActIndex+"]");
        //alert("555 "+allIndexArr+abc);
        document.all[allIndexArr[nextActIndex]].focus();
    }
    return false;
}
//根据传入的对象，查看该对象是否是可见元素
isDisplayObj = function (obj) {
    if (Test(obj.tagName.toUpperCase())) {
        window.event.returnValue = false;
        var parentObj = obj.parentNode;
        while (parentObj != null) { //元素是否可见
            if (parentObj.display == "none") {
                return false;
            } else if (parentObj.currentStyle !== undefined && parentObj.currentStyle.display == "none") {
                return false;
            } else {
                parentObj = parentObj.parentNode;
            }
        }
        return true;
    }
    return false;
}
//根据方位查找下一个待激活元素
findElementByDirection = function (direction) {
    var actEle = document.activeElement;
    if (!actEle) {
        for (var i = 0; i < document.all.length; i++) {
            if (isDisplayObj(document.all[i])) {
                actEle = document.all[i];
                actEle.focus();
                return;
            }
        }
    }
    var actX = getPos(actEle).x;
    var actY = getPos(actEle).y;
    var tmpX = 0;
    var tmpY = 0;
    var spaceXy = 99999999;
    var needCompare = false;
    var actIndex = actEle.sourceIndex;
    var eleVisible = true;
    var allIndexArr = new Array();
    for (var i = 0; i < document.all.length; i++) {
        var count = 0;
        eleVisible = true;
        switch (direction) {
            case "right":
                needCompare = document.all[i] != undefined && getPos(document.all[i]).x > actX;
                break;
            case "left":
                needCompare = document.all[i] != undefined && getPos(document.all[i]).x < actX;
                break;
            case "down":
                needCompare = document.all[i] != undefined && getPos(document.all[i]).y > actY;
                break;
            case "up":
                needCompare = document.all[i] != undefined && getPos(document.all[i]).y < actY;
                break;
            default:
        }
        if (needCompare) {
            if (isDisplayObj(document.all[i])) {
                allIndexArr.push(i);
            }
        }
    }
    var nextActIndex = actIndex;
    if (allIndexArr.length > 0) {
        for (var i = 0; i < allIndexArr.length; i++) {
            if (i != actIndex) {
                tmpX = getPos(document.all[allIndexArr[i]]).x;
                tmpY = getPos(document.all[allIndexArr[i]]).y;
                if (spaceXy > (Math.pow(Math.abs(tmpX - actX), 2) + Math.pow(Math.abs(tmpY - actY), 2))) {
                    spaceXy = Math.pow(Math.abs(tmpX - actX), 2) + Math.pow(Math.abs(tmpY - actY), 2);
                    nextActIndex = i;
                }
            }
        }
        //alert("444 ["+nextActIndex+"]");
        //alert("555 "+allIndexArr+abc);
        document.all[allIndexArr[nextActIndex]].focus();
    }
    return false;
}
$(document).bind('keydown', {combi: 'right', disableInInput: false}, function () {
    findElementByDirection("right")
});
$(document).bind('keydown', {combi: 'left', disableInInput: false}, function () {
    findElementByDirection("left")
});
$(document).bind('keydown', {combi: 'down', disableInInput: false}, function () {
    findElementByDirection("down")
});
$(document).bind('keydown', {combi: 'up', disableInInput: false}, function () {
    findElementByDirection("up")
});
/*
$(document).bind('keydown', 'ctrl+right', forewardFn);
$(document).bind('keydown', 'ctrl+left', backwardFn);
$(document).bind('keydown', 'ctrl+down', forewardFn);
$(document).bind('keydown', 'ctrl+up', backwardFn);

$(document).bind('keydown', {combi:'right',disableInInput:true}, function(evt){ event.keyCode=9;});
$(document).bind('keydown', {combi:'left',disableInInput:true}, function(evt){ event.keyCode=52;event.keyCode=9;});
$(document).bind('keydown', {combi:'down',disableInInput:true}, function(evt){ event.keyCode=9;});
$(document).bind('keydown', {combi:'up',disableInInput:true}, function(evt){ event.keyCode=52;event.keyCode=9;});
*/