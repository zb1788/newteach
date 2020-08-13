<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<div class="floatDiv" id="file.activeRecommedOther" style="display: none">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeRecommedActiveOther();"><img
                src="images/x.gif"/> </a>
        <span id="file.activeTitleOther">备课资源审核</span>
    </div>
    <span class="clearfix"></span>

    <table width="90%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB">

        <tr>
            <td>
                <div id="activeOtherTree">

                </div>
            </td>
        </tr>
        <tr>

            <td class="kd4 up">
                <button onclick="_fileUtil.saveRecommendActiveOther();">
                    确定
                </button>
                <button onclick="_fileUtil.closeRecommedActiveOther();">
                    取消
                </button>

            </td>
        </tr>


        <%-- <tr>
            <td class="text">
                <div id="file.otherDivInput">
                    <input type="text" size="45" id="file.folderName" maxlength="50"
                        onKeyDown="if(event.keyCode==13) _fileWindow.enter();"
                        onblur="this.value=this.value.replace(/(^\s*)|(\s*$)/g, '');" />
                </div>
            </td>
            <td class="kd4 up">

                <button id="file.move"
                    onclick="_fileUtil.renameFile(document.getElementById('file.folderName').value);">
                    移动
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    取消
                </button>
            </td>
        </tr>--%>
    </table>
</div>
<script type="text/javascript">
    <!--
    function clickKs(ksId, userName) {
        // alert(ksId+"-"+userName);
    }

    var tree;

    function initTree() {

        var Tree = Ext.tree;
        Ext.BLANK_IMAGE_URL = '<%= path%>/etc/images/s.gif';
        var rootNode = new Ext.tree.TreeNode({
            id: teachernumber,
            text: teachername,
            leaf: false,
            myType: teacherNodeType
        });
        tree = new Tree.TreePanel({
            el: 'activeOtherTree',
            useArrows: true,
            autoScroll: true,
            animate: true,
            containerScroll: true,
            rootVisible: true,
            height: 300,
            border: false,
            rootVisible: false,
            checkModel: 'single', // 对树的级联多选
            onlyLeafCheckable: false// 对树所有结点都可选

        });


        tree.setRootNode(rootNode);
        tree.render();
    }

    function startRecommendTree() {
        if (!tree) {
            initTree();
            var parentNode = tree.getRootNode();
            showTeacherVersion(parentNode);
        } else {
            clearSelectRecommedActiveOther();
        }
    }

    // 添加子节点事件实现
    function appendNodeAction(selectedNode, node, autoChild) {


        if (selectedNode.isLeaf()) {
            selectedNode.leaf = false;
        }
        var newNode = selectedNode.appendChild(node);

        try {
            if (autoChild) {
                var tmpid = newNode.id + "_auto";
                var tmpNode = new Ext.tree.TreeNode({
                    text: "加载中....",
                    id: tmpid,
                    leaf: true
                });
                appendNodeAction(newNode, tmpNode);
            }
        } catch (e) {
        }
    }

    var teacherNodeType = 3;
    var versionType = 4;
    var ksType = 5;

    function showVersionKs(verisonNode) {

        var autoNode = tree.getNodeById(verisonNode.id + "_auto");

        if (autoNode) {

            var myId = verisonNode.attributes.myId;
            var strArray = myId.split(".");

            var section = "";
            if (strArray[0]) {
                section = strArray[0];
            }
            var grade = "";
            if (strArray[1]) {
                grade = strArray[1];
            }

            var volume = "";
            if (strArray[2]) {
                volume = strArray[2];
            }
            var subject = "";
            if (strArray[3]) {
                subject = strArray[3];
            }
            var versions = "";
            if (strArray[4]) {
                versions = strArray[4];
            }
            var rxiu = "";
            if (strArray[5]) {
                rxiu = strArray[5];
            }
            // alert(myId);
            <%-- var url=interurll+'PLS.105';--%>
            var param = {
                'listType': '1',
                'section': section,
                'grade': grade,
                'volume': volume,
                'subject': subject,
                'versions': versions,
                'rxiu': rxiu
            };
            <%-- var paramStr=getDataStr(param);--%>

            var url = "<%=path%>/youjiao/baceContent.do";
            var paramStr = param;
            var myUser = "";
            var teacherNode = verisonNode.parentNode;
            myUser = teacherNode.id;

            jQuery(function ($) {
                $.getJSON(url + "?reqEncoding=GBK&jsoncallback=?", paramStr, function (resultData) {

                    verisonNode.removeChild(autoNode);
                    if (resultData) {

                        var menuCode = resultData.menuCode;
                        var tmpList = resultData.classes;
                        if (tmpList) {
                            var len = tmpList.length;
                            for (var i = 0; i < len; i++) {
                                var item = tmpList[i];
                                if (menuCode == item.code) {
                                    continue;
                                }


                                var id = verisonNode.id + "_" + item.code;
                                var text = item.name;
                                var myId = item.code;

                                var tmpNode;
                                if (item.isUnit == '0') {
                                    tmpNode = new Ext.tree.TreeNode({
                                        text: text,
                                        id: id,
                                        leaf: true,
                                        myType: ksType,
                                        myId: myId,
                                        myUser: myUser,
                                        checked: false
                                    });
                                } else {
                                    tmpNode = new Ext.tree.TreeNode({
                                        text: text,
                                        id: id,
                                        leaf: true,
                                        myType: ksType,
                                        myId: myId,
                                        myUser: myUser
                                    });
                                }
                                tmpNode.on('click', function (node) {
                                    var tmpKsId = node.attributes.myId;
                                    var username = node.attributes.myUser;
                                    clickKs(tmpKsId, username);
                                });

                                appendNodeAction(verisonNode, tmpNode);
                            }
                        }
                    }
                    verisonNode.expand();
                });
            });
        }

    }

    function showTeacherVersion(teacherNode) {

        // var autoNode= tree.getNodeById(teacherNode.id+"_auto");
        // if(autoNode)
        // {

        <%-- var url=interurll+'TMS.601';--%>
        var param = {
            "areaId": "",
            "queryType": "byUser",
            "schoolClassId": "",
            "schoolId": "",
            "username": teacherNode.id
        };
        <%--  var paramStr=getDataStr(param);--%>
        var url = "${applicationScope.ipPathMap['TMS.601']}";
        var paramStr = param;
        jQuery(function ($) {

            //alert("tt");
            $.getJSON(url + "?reqEncoding=GBK&jsoncallback=?", paramStr, function (resultData) {


                    var rtnArray = resultData.rtnArray;

                    if (rtnArray) {
                        for (var i = 0; i < rtnArray.length; i++) {
                            var item = rtnArray[i];

                            var versionC = "";
                            var myIdC = "";
                            var studyStage = item.studyStage;//学段
                            var studyStageCode = item.studyStageCode;
                            if (studyStage) {
                                versionC += studyStage;
                            }
                            if (studyStageCode) {
                                myIdC += studyStageCode;
                            } else {
                                myIdC += "";
                            }

                            var grade = item.grade;//年级
                            var gradeCode = item.gradeCode;
                            if (grade) {
                                versionC += "." + grade;
                            }
                            if (gradeCode) {
                                myIdC += "." + gradeCode;
                            } else {
                                myIdC += ".";
                            }

                            var term = item.term;//学期
                            var termCode = item.termCode;
                            if (term && term != "") {
                                versionC += "." + term;
                            }
                            if (termCode) {
                                myIdC += "." + termCode;
                            } else {
                                myIdC += ".";
                            }

                            var subject = item.subject;
                            var subjectCode = item.subjectCode;
                            if (subject) {
                                versionC += "." + subject;
                            }
                            if (subjectCode) {
                                myIdC += "." + subjectCode;
                            } else {
                                myIdC += ".";
                            }

                            var version = item.version;//版本
                            var versionCode = item.versionCode;
                            if (version) {
                                versionC += "." + version;
                            }
                            if (versionCode) {
                                myIdC += "." + versionCode;
                            } else {
                                myIdC += ".";
                            }

                            var bookOptionName = item.bookOptionName;//选秀必修。
                            var bookOptionCode = item.bookOptionCode;
                            if (bookOptionName && bookOptionName != "") {
                                versionC += "." + bookOptionName;
                            }
                            if (bookOptionCode) {
                                myIdC += "." + bookOptionCode;
                            } else {
                                myIdC += ".";
                            }

                            var tmpId = teacherNode.id + "-" + item.bookId;
                            var tmpNode = new Ext.tree.TreeNode({
                                text: versionC,
                                id: tmpId,
                                leaf: false,
                                myType: versionType,
                                myId: myIdC
                            });
                            tmpNode.on('beforeexpand', function (node) {
                                // alert(node.id+","+node.attributes.myType+","+node.attributes.myId);
                                showVersionKs(node);
                            });
                            appendNodeAction(teacherNode, tmpNode, true);
                        }
                    }
                    teacherNode.expand();

                }
            );
        });


        // }
    }


    FileUtilObj.prototype.openRecommedActiveOther = function (activeType) {
        global_activeType = activeType;
        var index;
        if (undefined == index) {
            if (_fileUtil.getSelectedFileObjCount() > 1) {
                alert('每次只能推荐一个文件!');
                return;
            }

            index = _fileUtil.getSelectedFileObjIndex();
            if (index < 0) {
                alert('请先选择文件!');
                return;
            }
        }
        var selectFile = _fileUtil.fileList[parseInt(index)];
        if (selectFile.type == 1) {
            alert("只能推荐文件！");
            return;
        }


        startRecommendTree();
        mask.style.display = "";
        document.getElementById("file.activeRecommedOther").style.display = '';

    };


    FileUtilObj.prototype.saveRecommendActiveOther = function () {

        var checkedbox = tree.getChecked();
        if (checkedbox.length < 0) {
            alert("请选择推荐目录");
            return;
        }
        var tmpKsIds = "";
        for (var i = 0; i < checkedbox.length; i++) {
            var tmpNode = checkedbox[i];
            // alert(tmpNode.attributes.myId+"-"+tmpNode.text);

            tmpKsIds += tmpNode.attributes.myId + ",";
        }
        if (tmpKsIds == "") {
            alert("请选择推荐目录!");
            return;
        }
        var index = _fileUtil.getSelectedFileObjIndex();
        var selectFile = _fileUtil.fileList[parseInt(index)];
        tmpKsIds = tmpKsIds.substring(0, tmpKsIds.length - 1);
        var myDate = new Date();
        var postData = {
            "fcode": selectFile.fCode,
            "filename": encodeURIComponent(encodeURIComponent(selectFile.fileName)),
            "ksid": tmpKsIds,
            "username": teachernumber,
            "type": "0"
        };
        <%--
          var paramStr=getDataStr(postData);
           // alert(paramStr);
         var addActivesUrlOther=interurll+"VERIFY.ADD";
           --%>
        var paramStr = postData;
        var addActivesUrlOther = "${applicationScope.ipPathMap['VERIFY.ADD']}";
        $.getJSON(addActivesUrlOther + "?time=" + myDate.getSeconds() + "&reqEncoding=GBK&jsoncallback=?", paramStr, function (resultData) {


            //alert(getDataStr(resultData));
            if (!resultData) {
                alert("接口不通，请与客户联系！！");
                return;
            }
            if (resultData) {
                if (resultData.status) {
                    if (resultData.status == -1) {
                        alert("接口不通，请与客户联系！");
                        return;
                    }

                }
                if (resultData.done == 0) {
                    alert("操作成功！");

                } else {
                    alert(resultData.msg);
                }
            }
        });

    };

    function clearSelectRecommedActiveOther() {
        var checkedbox = tree.getChecked();
        for (var i = 0; i < checkedbox.length; i++) {
            var tmpNode = checkedbox[i];
            tmpNode.getUI().toggleCheck(false);
            tmpNode.attributes.checked = false;
        }
    }

    FileUtilObj.prototype.closeRecommedActiveOther = function () {
        mask.style.display = "none";
        document.getElementById('file.activeRecommedOther').style.display = 'none';

    };

    //-->
</script>

