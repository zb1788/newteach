function isBlank(obj) {
    var flag = false;
    if (null == obj)
        flag = true;
    else if ('' == obj.value)
        flag = true;


    if (flag)
        obj.focus();
    //

    return flag;
}

function isChecked(name) {
    if (null == name)
        var obj = document.getElementsByName("gradeid");
    else
        var obj = document.getElementsByName(name);


    var length = obj.length;
    var flag = false;
    for (var i = 0; i < length; i++) {
        //alert(obj[i].checked);
        if (obj[i].checked) {
            flag = true;
            return true;
        }

    }//end of for
    return flag;
}

function getSelectId(name) {

    var obj = document.getElementsByName(name);
    var length = obj.length;
    var selectids = "";
    var j = 0;
    for (var i = 0; i < length; i++) {
        //alert(obj[i].checked);

        if (obj[i].checked) {
            if (0 != j)
                selectids += ",";
            selectids += obj[i].value;
            j++;
        }

    }//end of for
    return selectids;
}

function getSelectValuesByName(name, sp) {

    var obj = document.getElementsByName(name);
    var length = obj.length;
    var selectids = "";

    var j = 0;
    for (var i = 0; i < length; i++) {
        //alert(obj[i].checked);

        if (obj[i].checked) {
            if (0 != j) {
                //alert("mdmfd");
                selectids += ";";
            }

            selectids += obj[i].value;
            j++;
            // alert(j);
        }

    }//end of for
    return selectids;
}

function getSelectValuesCountByName(name) {

    var obj = document.getElementsByName(name);
    var length = obj.length;

    var j = 0;
    for (var i = 0; i < length; i++) {
        if (obj[i].checked) {
            j++;
        }
    }//end of for
    return j;
}


