/*
* 依赖Ext JS Library 2.1
* add：刘志强<liuzhiqiang@zzvcom.com>
* 支持的编码utf-8
*
*
* 功能点有： 
* 一、grid实现动态table效果 
* 二、参数说明
*	@id为gird容器对应的div的id(必选)
*		title为grid标题(必选)
*		selfName为页面上new的grid名称，当页面上需要显示多个grid的时间，此名称不能重复(必选)
*		readerline为从json中所取的制(必选)
*		column为设置标题(必选)
*		myData初始化需要的数据(必选)
*		splitpage初始化分页参数，如果为null，则表明不需要显示分页
*		CheckboxSelectionModel允许不允许多行选中(可选)，允许的值：true单选、false多选、null不进行选择
*		topbar定义头部按钮区域(可选)，如果不需要请设置为null
*		heigth设置grid的高度(可选)，如果不设定默认为300
* 三、扩展功能
*		1、对原有的grid的分页进行了重写，对外抛出分页按钮动作，和分页参数。
*		2、如果想动态改变某列，比如改变某列的颜色，可以在定义表头的时间renderer设定调用的方法。
*				比如renderer:change
*				function change(val){
*			        if(val > 0){
*			            return '<span style="color:green;">' + val + '</span>';
*			        }else if(val < 0){
*			            return '<span style="color:red;">' + val + '</span>';
*			        }
*			        return val;
*				}
* 四、exemple
*		var myData = <s:property value="listjson" escape="false"/>;
*		var sp=<s:property value="pagejson" escape="false"/>;
*		设置从json中所取的列
*		var readerline=[
*					  {name:'id'},
*					  {name:'title'},
*				      {name:'comfrom'},
*				      {name:'person'},
*				      {name:'persionorg'},
*				      {name:'time'}
*				];
*		设置从grid表头	
*		var column=[new Ext.grid.RowNumberer(),
*	        		new Ext.grid.CheckboxSelectionModel(),
*		            {header: "标题", width: 360, sortable: true, dataIndex: 'title'},
*		            {header: "来源", width: 75, sortable: true, renderer: null, dataIndex: 'comfrom'},
*		            {header: "添加人", width: 75, sortable: true, renderer: null, dataIndex: 'person'},
*		            {header: "所在机构", width: 75, sortable: true, renderer: null, dataIndex: 'persionorg'},
*		            {header: "添加时间", width: 85, sortable: true, renderer: null, dataIndex: 'time'}
*		        ];
*		功能按钮区域
*		var splitbar=new Ext.Toolbar({items: [
*		    		 	{text: '删除模板',iconCls:'remove',handler: null},'-',
*		    		 	{text: '文件管理',iconCls:'remove',handler: tomanage}
*		    		 	]});
*		定义grid
*		var table=new grid('grid-example',"文章列表","table",readerline,column,myData,sp,true,splitbar,300);
*		分页回调
*		var _page=1;
*		table.turnPage(function(iPage){
*			_page=iPage;
*		    searchs();
*			});
*		选中某行的时间进行回调
*		var selectid="";
*		table.selectRow(function(select){
*			for(var i=0;i<select.length;i++){
*				selectid=select[i].get("id");
*			}
*		});
*/

var $ = function (id) {
    return document.getElementById(id);
}

function grid(id, title, selfName, readerline, column, myData, splitpage, CheckboxSelectionModel, topbar, heigth, selectionnumber, type) {
    var ___index = id;
    this._doTurnPage = null;
    this.selfName = selfName;
    this.sp = splitpage;
    this.selectionnumber = selectionnumber;
    this.heigth = heigth;
    this.id = id;
    this.readerline = readerline;
    this.column = column;
    this.colModel = null;
    this.myData = myData;
    this._grid_splitpage_tools = null;
    this.curResetData;
    this.store = null;
    this.grids = null;
    this.type = type;
    var _this = this;

    function showpage() {//自定义分页标记模块
        var pagehtml = "<div id=\"splitPage_" + ___index + "\"><TABLE cellSpacing=0>" +
            "<TBODY>" +
            "<TR>" +
            "<TD>" +
            "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + ((_this.sp.currentPage == 1 || _this.sp.currentPage == 0)
        "x-item-disabled"
    :
        ""
    )
        +"\" id=ext-comp-1003_" + ___index + " style=\"WIDTH: auto\" cellSpacing=0 cellPadding=0 border=0>" +
        "<TBODY>" +
        "<TR>" +
        "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
        "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + ((_this.sp.currentPage == 1 || _this.sp.currentPage == 0)
        "disabled"
    :
        ""
    )
        +" class=\"x-btn-text x-tbar-page-first\" id=ext-gen14_" + ___index + " qtip=\"第一页\" onclick=\"_turnPage(1," + selfName + "._doTurnPage)\">　</BUTTON></EM></TD>" +
        "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
        "<TD id=ext-gen20>" +
        "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + ((_this.sp.currentPage == 1 || _this.sp.currentPage == 0)
        "x-item-disabled"
    :
        ""
    )
        +"\" id=ext-comp-1004_" + ___index + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
        "<TBODY>" +
        "<TR>" +
        "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
        "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + ((_this.sp.currentPage == 1 || _this.sp.currentPage == 0)
        "disabled"
    :
        ""
    )
        +" class=\"x-btn-text x-tbar-page-prev\" id=ext-gen22_" + ___index + " qtip=\"上一页\" onclick=\"_turnPage(" + selfName + ".sp.previewPage," + selfName + "._doTurnPage)\">　</BUTTON></EM></TD>" +
        "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
        "<TD><SPAN class=ytb-sep></SPAN></TD>" +
        "<TD><SPAN class=ytb-text>当前页</SPAN></TD>" +
        "<TD><SPAN class=ytb-text> <span id=\"splitPage_CUR_S" + ___index + "\">" + _this.sp.currentPage + "</span></SPAN></TD>" +
        "<TD><SPAN class=ytb-text>/ 共 <span id=\"splitPage_All_" + ___index + "\">" + _this.sp.pageCount + "</span></SPAN>页</TD>" +
        "<TD><SPAN class=ytb-sep></SPAN></TD>" +
        "<TD>" +
        "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.sp.currentPage == _this.sp.pageCount
        "x-item-disabled"
    :
        ""
    )
        +"\" id=ext-comp-1005_" + ___index + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
        "<TBODY>" +
        "<TR>" +
        "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
        "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.sp.currentPage == _this.sp.pageCount
        "disabled"
    :
        ""
    )
        +" class=\"x-btn-text x-tbar-page-next\" id=ext-gen34_" + ___index + " qtip=\"下一页\" onclick=\"_turnPage(" + selfName + ".sp.nextPage," + selfName + "._doTurnPage)\">　</BUTTON></EM></TD>" +
        "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
        "<TD>" +
        "<TABLE class=\"x-btn-wrap x-btn x-btn-icon " + (_this.sp.currentPage == _this.sp.pageCount
        "x-item-disabled"
    :
        ""
    )
        +"\" id=ext-comp-1006_" + ___index + " style=\"WIDTH: auto\"cellSpacing=0 cellPadding=0 border=0>" +
        "<TBODY>" +
        "<TR>" +
        "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
        "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON " + (_this.sp.currentPage == _this.sp.pageCount
        "disabled"
    :
        ""
    )
        +" class=\"x-btn-text x-tbar-page-last\" id=ext-gen45_" + ___index + " qtip=\"最后一页\" onclick=\"_turnPage(" + selfName + ".sp.pageCount," + selfName + "._doTurnPage)\">　</BUTTON></EM></TD>" +
        "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD>" +
        "<TD><SPAN class=ytb-sep></SPAN></TD>" +
        "<TD>" +
        "<TABLE class=\"x-btn-wrap x-btn x-btn-icon\" style=\"WIDTH: auto\" cellSpacing=0 cellPadding=0 border=0>" +
        "<TBODY>" +
        "<TR>" +
        "<TD>跳转到<INPUT class=x-tbar-page-number id=\"splitPage_CUR_" + ___index + "\" style=\"HEIGHT: 18px\" size=3 value=" + _this.sp.currentPage + " onkeyup=\"this.value=__check(this.value," + selfName + "._doTurnPage)\">页</TD>" +
        "<TD class=x-btn-left><I>&nbsp;</I></TD>" +
        "<TD class=x-btn-center><EM unselectable=\"on\"><BUTTON class=\"x-btn-text x-tbar-loading\" qtip=\"确定\" onclick=_turnPage($('splitPage_CUR_" + ___index + "').value," + selfName + "._doTurnPage)>　</BUTTON></EM></TD>" +
        "<TD class=x-btn-right><I>&nbsp;</I></TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE></div>";
        //初始化各tools
        return pagehtml;
    }

    //设置分页实现（往页面传参数）
    grid.prototype.turnPage = function (f) {
        if (typeof (f) == 'function') this._doTurnPage = f;
    }
    //重新设置分页参数
    grid.prototype.changeSplitPage = function (sps) {
        this.sp = sps;
        var pe = _grid_splitpage_tools;
        pe.CURlement.value = this.sp.currentPage;
        pe.Alllement.innerText = this.sp.pageCount;
        pe.CURSlement.innerText = this.sp.currentPage;
        pe.All_Startelement.innerText = (this.sp.recordCount != 0(this.sp.startRecord + 1)
    :
        0
    )
        ;
        pe.All_Endelement.innerText = this.sp.startRecord + this.sp.pageSize > this.sp.recordCount
        this.sp.recordCount
    :
        (this.sp.startRecord + this.sp.pageSize);
        pe.All_Countelement.innerText = this.sp.recordCount;
        if (this.sp.currentPage == 1 || this.sp.currentPage == 0) {
            pe.ext_comp_1003.className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            pe.ext_gen14.disabled = true;
            pe.ext_comp_1004.className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            pe.ext_gen22.disabled = true;
        } else {
            pe.ext_comp_1003.className = "x-btn-wrap x-btn x-btn-icon";
            pe.ext_gen14.disabled = false;
            pe.ext_comp_1004.className = "x-btn-wrap x-btn x-btn-icon";
            pe.ext_gen22.disabled = false;
        }
        if (this.sp.currentPage == this.sp.pageCount) {
            pe.ext_comp_1005.className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            pe.ext_gen34.disabled = true;
            pe.ext_comp_1006.className = "x-btn-wrap x-btn x-btn-icon x-item-disabled";
            pe.ext_gen45.disabled = true;
        } else {
            pe.ext_comp_1005.className = "x-btn-wrap x-btn x-btn-icon";
            pe.ext_gen34.disabled = false;
            pe.ext_comp_1006.className = "x-btn-wrap x-btn x-btn-icon";
            pe.ext_gen45.disabled = false;
        }
    };
    grid.prototype.reloadData = function (myData) {
        this.store.loadData(myData);
        if (CheckboxSelectionModel == false) {
            try {
                this.grids.el.child('div.x-grid3-hd-checker:has(a)').removeClass('x-grid3-hd-checker-on');
            } catch (e) {

            }
        }
        if (this.selectionnumber) {
            var i = 0, m = 0, select = [];
            this.grids.getStore().each(
                function (fs) {
                    if (fs.data.selected) select[m++] = i;
                    i++;
                }
            );
            this.grids.getSelectionModel().selectRows(select, true);
        }
    }
    grid.prototype.reloadSelect = function (myData) {
        this.grids.getSelectionModel().selectRows(myData.split(","), true);
    }

    //当选择某行的时间触发事件
    grid.prototype.selectRow = function (cur) {
        this.curResetData = cur;
    }
    Ext.onReady(function () {
        // create the data store
        _this.store = new Ext.data.Store({
            //proxy: new Ext.ux.DWRDataProxy({dwrMethod: 'Param.findParams'}),   
            reader: new Ext.data.JsonReader({}, _this.readerline)
        });
        _this.store.loadData(_this.myData);
        var example = Ext.get(id);  //展示grid的容器
        // create the Grid
        var splitbar = splitpage == null
        null
    :
        new Ext.Toolbar({items: ["显示第 <span id=\"splitPage_All_Start_" + ___index + "\">" + (_this.sp.recordCount != 0(_this.sp.startRecord + 1)
    :
        0
    )
        +"</span> 条到 <span id=\"splitPage_All_End_" + ___index + "\">" + (_this.sp.startRecord + _this.sp.pageSize > _this.sp.recordCount
        _this.sp.recordCount
    :
        (_this.sp.startRecord + _this.sp.pageSize)
    )
        +"</span> 条记录，一共 <span id=\"splitPage_All_Count_" + ___index + "\">" + _this.sp.recordCount + "</span> 条", '->', showpage() + ""
    ]
    })
        ;
        //选择模式
        var selMode = new Ext.grid.CheckboxSelectionModel({singleSelect: CheckboxSelectionModel || false});
        //选中grid某行显示对应的编辑项
        selMode.on("rowselect", function (o, i) {
            //var rec=store.getAt(i);
            if (typeof (_this.curResetData) == "function")
                _this.curResetData(_this.grids.getSelectionModel().getSelections(), i);
            //alert(grids.getSelectionModel().getSelections()[0].get("title"));

            //_this.grids.getSelectionModel().deselectRow(i);
        });
        selMode.on("rowdeselect", function (o, i) {
            var rec = _this.store.getAt(i);
            if (typeof (_this.curResetData) == "function")
                _this.curResetData(_this.grids.getSelectionModel().getSelections());
            //alert(grids.getSelectionModel().getSelections()[0].get("title"));
        });
        for (var m = 0; m < _this.column.length; m++) {
            if (_this.column[m].dataIndex) {
                var location = window.location + "";
                _this.column[m].id = location.replace(/[\/|\ |\:|\.| |\&]/g, "") + m;
            }
        }
        _this.colModel = new Ext.grid.ColumnModel(_this.column);
        var hi = document.body.clientHeight - example.getTop() - 2;
        _this.width = example.getComputedWidth();
        _this.grids = new Ext.grid.GridPanel({
            store: _this.store,
            cm: _this.colModel,
            sm: CheckboxSelectionModel == null null: selMode,
            stripeRows: true,
            //autoExpandColumn: 'company',
            width: example.getComputedWidth(),
            height: _this.type == true _this.heigth
    :
        hi,
            enableDragDrop
    :
        true,
            autoScroll
    :
        true,
            title
    :
        title,
            types
    :
        'grids',
            stateful
    :
        false,
            stateId
    :
        null,
            collapsible
    :
        true,
            loadMask
    :
        {
            msg:'正在加载数据，请稍侯……'
        }
    ,
        bbar:splitpage == null
        null
    :
        splitbar,
            tbar
    :
        topbar,
            listeners
    :
        {
            afteredit: function (e) {
                //commit changes
            }
        ,
            render: function (g) {
                // Best to create the drop target after render, so we don't need to worry about whether grid.el is null

                // constructor parameters:
                //    grid (required): GridPanel or EditorGridPanel (with enableDragDrop set to true and optionally a value specified for ddGroup, which defaults to 'GridDD')
                //    config (optional): config object
                // valid config params:
                //    anything accepted by DropTarget
                //    listeners: listeners object. There are 4 valid listeners, all listed in the example below
                //    copy: boolean. Determines whether to move (false) or copy (true) the row(s) (defaults to false for move)
                var ddrow = new Ext.ux.dd.GridReorderDropTarget(g, {
                    copy: false
                    , listeners: {
                        beforerowmove: function (objThis, oldIndex, newIndex, records) {
                            // code goes here
                            // return false to cancel the move
                        }
                        , afterrowmove: function (objThis, oldIndex, newIndex, records) {
                            _this.grids.getView().refresh();
                            //alert(objThis.getTarget().currentRowEl);
                            //
                        }
                        , beforerowcopy: function (objThis, oldIndex, newIndex, records) {
                            // code goes here
                            // return false to cancel the copy
                        }
                        , afterrowcopy: function (objThis, oldIndex, newIndex, records) {
                            // code goes here
                        }
                    }
                });
                // if you need scrolling, register the grid view's scroller with the scroll manager
                Ext.dd.ScrollManager.register(g.getView().getEditorParent());
            }
        ,
            beforedestroy: function (g) {
                // if you previously registered with the scroll manager, unregister it (if you don't it will lead to problems in IE)
                Ext.dd.ScrollManager.unregister(g.getView().getEditorParent());
            }
        }
    })
        ;
        if (_this.grids.width == 0) {
            setTimeout(function () {
                _this.grids.setWidth(example.getComputedWidth());
            }, 1000);
        }
        _this.grids.render(example);
        this._grid_splitpage_tools = {
            CURlement: $("splitPage_CUR_" + ___index),
            CURSlement: $("splitPage_CUR_S" + ___index),
            Alllement: $("splitPage_All_" + ___index),
            All_Startelement: $("splitPage_All_Start_" + ___index),
            All_Endelement: $("splitPage_All_End_" + ___index),
            All_Countelement: $("splitPage_All_Count_" + ___index),
            ext_comp_1003: $("ext-comp-1003_" + ___index),
            ext_comp_1004: $("ext-comp-1004_" + ___index),
            ext_comp_1005: $("ext-comp-1005_" + ___index),
            ext_comp_1006: $("ext-comp-1006_" + ___index),
            ext_gen14: $("ext-gen14_" + ___index),
            ext_gen22: $("ext-gen22_" + ___index),
            ext_gen34: $("ext-gen34_" + ___index),
            ext_gen45: $("ext-gen45_" + ___index)
        }
        if (_this.selectionnumber) {
            var i = 0, m = 0, select = [];
            _this.grids.getStore().each(
                function (fs) {
                    if (fs.data.selected) select[m++] = i;
                    i++;
                }
            );
            _this.grids.getSelectionModel().selectRows(select, true);

        }
        ____object[____object.length] = _this;
    });
}

//参数 页码 , 接口实现
function _turnPage(iPage, fun) {
    //跳转到第N页
    if (fun != null) fun(iPage);
}

function __check(f, v) {
    if (event.keyCode == 13) {
        _turnPage(f, v);
    }
    var value = f.replace(/[^\d]/g, '');
    if (value == "") {
        return "";
    } else return value;
}


