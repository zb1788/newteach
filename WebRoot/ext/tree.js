/*
* ����Ext JS Library 2.1
* add����־ǿ<liuzhiqiang@zzvcom.com>
* ֧�ֵı���utf-8
*
*
* ���ܵ��У� 
* һ����checkbox����
* ��������tree-expend-checkbox.js
* ��������˵��
*	@idΪ��ʾ����id(��ѡ)
*		typeΪ������������(��ѡ)1Ϊ�ӳټ�������2Ϊ�첽������
*		treejson��ʼ�������Ľڵ�(��ѡ)
*		treeurl��typeΪ2�ǵ��õ�url��ַ(��typeΪ2��ѡ��typeΪ1�ǿ�����Ϊnull)
*		functions������Ľڵ���ִ�еĶ���
*		checkModelΪѡ������singleΪ��ѡ��cascadeΪ����ѡ��
*		onlyLeafCheckableΪ�Ƿ�ֻ����ѡ��Ҷ��		
* �ġ�exemple
*			var treejson= [{text:"��Ϣ����",icon:"..\/etc\/images\/im2.gif",depth:1,parentid:0,leaf:false,draggable:false,id:1,children:[{text:"�Ҽ��˵�",href:"rightmenu.html",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:1,leaf:true,draggable:false,id:25,children:[]},{text:"grid������ʾ��ʽ��",href:"articleGridManage1.action",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:1,leaf:true,draggable:false,id:26,children:[]},{text:"��ʽ�ļ�",href:"css.jsp",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:1,leaf:true,draggable:false,id:6,children:[]},{text:"ext���ݱ��",href:"articleGridManage.action",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:1,leaf:true,draggable:false,id:5,children:[]},{text:"��Ϣ����",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:1,leaf:false,draggable:false,id:4,children:[{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:23,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:22,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:21,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:20,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:19,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:17,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:16,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:15,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:14,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:13,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:12,children:[]},{text:"�첽���ز���",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:11,children:[]},{text:"��Ϣ�����б�",href:"articleManage.action",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:8,children:[]},{text:"������Ϣ����",href:"addarticle.html",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:4,leaf:true,draggable:false,id:7,children:[]}]}]},{text:"ϵͳӦ��",icon:"..\/etc\/images\/im2.gif",depth:1,parentid:0,leaf:false,draggable:false,id:2,children:[{text:"ϵͳ����",href:"http:\/\/www.baidu.com",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:2,leaf:false,draggable:false,id:9,children:[{text:"ϵͳ����",icon:"..\/etc\/images\/im2.gif",depth:3,parentid:9,leaf:true,draggable:false,id:24,children:[]}]}]},{text:"ϵͳ����",icon:"..\/etc\/images\/im2.gif",depth:1,parentid:0,leaf:false,draggable:false,id:3,children:[{text:"���ð���",href:"http:\/\/www.baidu.com",icon:"..\/etc\/images\/im2.gif",depth:2,parentid:3,leaf:true,draggable:false,id:10,children:[]}]}]
*			//��ͨ������֧���Ҽ����ɾ����֧���첽���غ��ӳټ���
*			var checkboxtree=new checkboxtree('menuTree',1,treejson,null,toclick,'cascade',false);
*/
function checkboxtree(id, type, treejson, treeurl, functions, checkModel, onlyLeafCheckable, checkfunction, loadfunction) {
    this.tree = null;
    this.type = type;
    this.treejson = treejson;
    this.treeurl = treeurl;
    this.checkModel = checkModel;
    this.root = null;
    var _this = this;
    Ext.onReady(function () {
        _this.root = new Ext.tree.AsyncTreeNode({
            id: 'root',
            text: "���ڵ�",
            children: _this.treejson
        });
        var load3 = new Ext.tree.TreeLoader({baseAttrs: {uiProvider: Ext.tree.TreeCheckNodeUI}});
        var load4 = new Ext.tree.TreeLoader({
            dataUrl: _this.treeurl,
            baseAttrs: {uiProvider: Ext.tree.TreeCheckNodeUI}
        })
        _this.tree = new Ext.tree.TreePanel({
            renderTo: id,
            root: _this.root,//��λ�����ڵ�
            animate: true,//��������Ч��
            enableDD: false,//�������ӽڵ��϶�
            border: false,//û�б߿�
            checkModel: _this.checkModel || 'cascade', //�����ļ�����ѡ 
            onlyLeafCheckable: onlyLeafCheckable || false,//�������н�㶼��ѡ 
            rootVisible: false,//��Ϊfalse�����ظ��ڵ㣬�ܶ�����£�����ѡ�����ظ��ڵ�����������
            loader: _this.type == 1 ? load3 : load4
        });
        //_this.tree.expandAll();
        //_this.tree.collapseAll();
        if (functions)
            _this.tree.on("click", functions);
        load4.on("beforeload", function (treeLoader, node) {
            treeLoader.baseParams.scode = node.attributes.scode;
        }, this);
        if (loadfunction) {
            _this.tree.on("load", function (node) {
                loadfunction(node);
            });
        }

        if (checkfunction) {
            _this.tree.on("check", function (v) {
                checkfunction(v);
            });
        }

    });
    //���ض����tree�����׳�����ӿ�getChecked
    checkboxtree.prototype.trees = function () {
        return this.tree;
    }
    checkboxtree.prototype.Checked = function (value) {
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
        this.root.reload();
        this.tree.expandAll();
        this.tree.collapseAll();
    }
    //��ȡѡ�е�checkboxֵ
    checkboxtree.prototype.getCheckedValue = function () {
        //this.tree.expandAll();
        //this.tree.collapseAll();
        var checkedbox = this.tree.getChecked();
        var value = "";
        for (var i = 0; i < checkedbox.length; i++) {
            value = value + checkedbox[i].id + ",";
        }
        return value.replace(/,$/, "");
    }
}

/*
*	����ɶ�̬��ӽڵ����
*	@idΪ��ʾ����id(��ѡ)
*		treejson��ʼ�������Ľڵ�(��ѡ)
*		functions������Ľڵ���ִ�еĶ���
*		rightfunction����Ҽ��˵�ִ�еĶ���
*/
function activetree(id, treejson, functions, rightfunction) {
    this.root = null;
    this.tree = null;
    var _this = this;
    this.treejson = treejson;
    Ext.onReady(function () {
        this.root = new Ext.tree.TreeNode({
            id: "root",//���ڵ�id
            text: "Ȩ�޿���"
        });
        for (var i = 0; i < this.treejson.length; i++) {
            var tree = new Ext.tree.TreeNode({
                id: this.treejson[i].id,
                text: this.treejson[i].text,
                icon: this.treejson[i].icon,
                href: this.treejson[i].href,
                leaf: this.treejson[i].leaf
            });
            this.root.appendChild(tree);
            //�����Ҽ�����¼�
            if (typeof (rightfunction) != "function") rightfunction = function () {
            };
            tree.on('contextmenu', rightfunction); //�����Ҽ��˵�����
            if (this.treejson[i].children) toaddtree(tree, this.treejson[i].children);
        }

        function toaddtree(roots, json) {
            for (var i = 0; i < json.length; i++) {
                var tree = new Ext.tree.TreeNode({
                    id: json[i].id,
                    text: json[i].text,
                    icon: json[i].icon,
                    href: json[i].href,
                    leaf: json[i].leaf
                });
                roots.appendChild(tree);
                if (typeof (rightfunction) != "function") rightfunction = function () {
                };
                tree.on('contextmenu', rightfunction); //�����Ҽ��˵����� 
                if (json[i].children) toaddtree(tree, json[i].children);
            }
        }

        //�����������
        _this.tree = new Ext.tree.TreePanel({
            renderTo: id,
            root: root,//��λ�����ڵ�
            animate: true,//��������Ч��
            enableDD: false,//�������ӽڵ��϶�
            border: false,//û�б߿�
            rootVisible: false//��Ϊfalse�����ظ��ڵ㣬�ܶ�����£�����ѡ�����ظ��ڵ�����������
        });
        if (typeof (functions) != "function") functions = function () {
        };
        _this.tree.on("click", functions);
    });
    //���ض����tree�����׳�����ӿ�
    activetree.prototype.tree = function () {
        return this.tree;
    }
    //���һ���µĽڵ�
    activetree.prototype.addnode = function (node, json) {
        node.leaf = false;
        var tree = new Ext.tree.TreeNode({
            id: json.id,
            text: json.text,
            icon: json.icon,
            href: json.href,
            leaf: json.leaf
        });
        node.appendChild(tree);
        if (typeof (rightfunction) != "function") rightfunction = function () {
        };
        tree.on('contextmenu', rightfunction); //�����Ҽ��˵����� 
    }
    //ɾ��һ���ڵ�
    activetree.prototype.delnode = function (node) {
        node.remove();
    }
}

/*
	
*	@idΪ��ʾ����id(��ѡ)
*		typeΪ������������(��ѡ)1Ϊ�ӳټ�������2Ϊ�첽������
*		treejson��ʼ�������Ľڵ�(��ѡ)
*		treeurl��typeΪ2�ǵ��õ�url��ַ(��typeΪ2��ѡ��typeΪ1�ǿ�����Ϊnull)
*		functions������Ľڵ���ִ�еĶ���
*/
function customtree(id, type, treejson, treeurl, functions, expend) {
    this.tree = null;
    this.treejson = treejson;
    this.treeurl = treeurl;
    this.expend = expend;
    this.root = null;
    this.type = type;
    var _this = this;
    Ext.onReady(function () {
        _this.root = new Ext.tree.AsyncTreeNode({
            id: 'root',
            text: "���ڵ�",
            children: _this.treejson
        });
        var load1 = new Ext.tree.TreeLoader();
        var load2 = new Ext.tree.TreeLoader({
            dataUrl: _this.treeurl
        })
        _this.tree = new Ext.tree.TreePanel({
            renderTo: id,
            root: _this.root,//��λ�����ڵ�
            animate: true,//��������Ч��
            enableDD: false,//�������ӽڵ��϶�
            border: false,//û�б߿�
            rootVisible: false,//��Ϊfalse�����ظ��ڵ㣬�ܶ�����£�����ѡ�����ظ��ڵ�����������
            loader: _this.type == 1 ? load1 : load2
        });
        if (_this.expend) {
            _this.tree.expandAll();
        }
        if (typeof (functions) != "function") functions = function () {
        };
        _this.tree.on("click", functions);
    });
    //���ض����tree�����׳�����ӿ�
    customtree.prototype.tree = function () {
        return this.tree;
    }
    //���һ���µĽڵ�
    customtree.prototype.addnode = function (node, json) {
        node.leaf = false;
        var trees = new Ext.tree.TreeNode({
            id: json.id,
            text: json.text,
            icon: json.icon,
            leaf: json.leaf
        });
        node.appendChild(trees);
    }
    //ɾ��һ���ڵ�
    customtree.prototype.delnode = function (node) {
        node.remove();
    }
}