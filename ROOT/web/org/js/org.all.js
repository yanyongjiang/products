/**
 * Created by yanyongjiang on 2018/4/22.
 */
Org = {
    init: function () {
        $("#menu").find("li").removeAttr("class");
        $("#orgbut").attr("class", "active");
        var treeId = 'treeDept';
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-2 column" id="orgbuttondiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="...">\
            <button type="button" class="btn btn-primary" onclick="Org.addDeptB();">新建</button>\
            <button type="button" class="btn btn-success" onclick="Org.editDeptB();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="Org.delDeptB();">删除</button>\
            </div>\
            <div>\
            <ul id="treeDept" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-10 column">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button type="button" class="btn btn-primary" onclick="Org.addUser();">新建</button>\
            <button type="button" class="btn btn-success" onclick="Org.editUser();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="Org.delUser();">删除</button>\
            <button type="button" class="btn btn-info" onclick="Org.sort();">排序</button>\
            <button type="button" class="btn btn-info" onclick="Org.sortUp();">上移</button>\
            <button type="button" class="btn btn-info" onclick="Org.sortDown();">下移</button>\
            <button type="button" class="btn btn-info" onclick="Org.setAdmin();"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>管理员</button>\
            <button class="btn btn-success" id="usersearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="usersearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width:99.8%;"><table id="peopleGrid"></table>\
            <div id="peopleGridPager"></div></div>\
            </div>\
            </div>\
            </div>');

        Org.initgrid();
        Org.initDepttree(treeId);
    },
    initDepttree: function (treeId) {
        if (Org.zTreeObj) {
            Org.zTreeObj.destroy();
        }
        var setting = {
            edit: {
                autoExpandTrigger: true,
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
                drag: {
                    prev: true,
                    next: true,
                    inner: false
                }
            },
            async: {
                enable: true,
                url: "/service/org-listDept",
                autoParam: ["id", "name=n", "level=lv"],
                dataFilter: filter
            },
            callback: {
                onRightClick: function (e, treeId, treeNode) {
                    var memu = '\
                         <ul id="orgmemu" class="dropdown-menu" style="display: none;min-width: 80px;">\
                            <li action="add"><a href="#">新建</a></li>\
                            <li action="edit"><a href="#">编辑</a></li>\
                            <li action="del"><a href="#">删除</a></li>\
                          </ul>\
                        '
                    if ($('#orgmemu').length == 0) {
                        $('body').append(memu);
                    }
                    $('#orgmemu').css('left', e.clientX + 'px');
                    $('#orgmemu').css('top', e.clientY + 'px');
                    var nodes2 = Org.zTreeObj.getSelectedNodes();
                    if (!nodes2 || nodes2.length == 0) {
                        $('#orgmemu').find('li').eq(1).hide();
                        $('#orgmemu').find('li').eq(2).hide();
                    } else {
                        $('#orgmemu').find('li').eq(1).show();
                        $('#orgmemu').find('li').eq(2).show();
                    }
                    $('#orgmemu').show();
                    $('#orgmemu').find('li').unbind('click').click(function () {

                        var nodes2 = Org.zTreeObj.getSelectedNodes();
                        var node;
                        if (nodes2 && nodes2.length > 0) {
                            node = nodes2[0];
                        }
                        var action = $(this).attr('action');
                        if ("add" == action) {
                            Org.addDept(null, node);
                        }
                        if ("edit" == action) {
                            if (nodes2[0]) {
                                Org.addDept(nodes2[0].id, null, true);
                            }
                        }
                        if ("del" == action) {
                            if (nodes2[0]) {
                                Org.delDept(nodes2[0]);
                            }
                        }
                    });

                    $("#orgmemu").unbind('mouseleave').on('mouseleave', function () {
                        $(this).hide();
                        return false;
                    });
                },
                onAsyncSuccess: function (event, treeId) {
                    if (Org.zTreeObj.isFirstChild) {
                        var zTree = Org.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.selectNode(nodeList[0].children[0]);
                        if (Org.user && Org.user.grid) {
                            Org.user.grid.trigger("reloadGrid");
                        }
                        Org.zTreeObj.isFirstChild = false;
                    }

                    if (Org.zTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = Org.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Org.zTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Org.zTreeObj.isFirst = false;
                    }

                },
                onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    if (!targetNode) return;
                    var children = treeNodes[0].getParentNode().children;
                    if (children && children.length > 0) {
                        var updateM = [];
                        $.each(children, function (i, n) {
                            updateM.push({id: n.id, fldsn: (i + 1)});
                        })
                        Platform.srv("org-updatefldsn", updateM, function (r) {

                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        Org.user.grid.trigger("reloadGrid");
                    }
                }
            }
        };

        function filter(treeId, parentNode, responseData) {
            if (responseData.result.length > 0) {
                $.each(responseData.result, function (index, r) {
                    if (r.fldname) r.name = r.fldname;
                });
            }
            return responseData.result;
        }

        $("#" + treeId).height($(document).height() - $('#orgbuttondiv').height() - $('#orgtitldiv').height());
        Org.zTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        Org.zTreeObj.isFirst = true;
        $(document).click(function () {
            $("#orgmemu").hide();
        });
    },
    addDept: function (treeId, treeNode, edit) {
        var formid = 'deptfrom';
        var html = '\
            <div class="container" style="width: 100%;">\
                <div class="row clearfix">\
                    <div class="col-md-12 column">\
                        <form class="form-horizontal" role="form" id="' + formid + '">\
                            <input type="hidden" id="id">\
                            <input type="hidden" id="fldparentid">\
                            <input type="hidden" id="fldparentname">\
                            <div class="form-group">\
                                <label class="col-sm-2 control-label" style="padding-right: 15px;">部门名称</label>\
                                <div class="col-sm-10" style="padding-right: 15px;">\
                                    <input type="text" class="form-control" id="fldname" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;">部门简称</label>\
                                <div class="col-sm-10" style="padding-right: 15px;">\
                                    <input type="text" class="form-control" id="fldshortname" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;">部门序号</label>\
                                <div class="col-sm-10" style="padding-right: 15px;">\
                                    <input type="number" class="form-control" id="fldsn" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;">类型</label>\
                                <div class="col-sm-10" style="padding-right: 15px;">\
                                    <label class="radio-inline">\
                                        <input type="radio" value="1" name="fldtype" checked="checked">\
                                        单位\
                                    </label>\
                                    <label class="radio-inline">\
                                        <input type="radio" value="2" name="fldtype">\
                                        部门\
                                    </label>\
                                    <label class="radio-inline">\
                                        <input type="radio" value="3" name="fldtype">\
                                        子部门\
                                    </label>\
                                    <label class="radio-inline">\
                                        <input type="radio" value="4" name="fldtype">\
                                        节点\
                                    </label>\
                                </div>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            ';
        var title = '新增部门';
        if (treeId)
            title = '编辑部门';
        var d = dialog({
            title: title,
            width: 560,
            content: html,
            button: [
                {
                    value: '保存',
                    callback: function () {
                        var fldname = $('#fldname').val();
                        if (!fldname) {
                            alert("请输入部门名称");
                            return;
                        }
                        var params = Platform.getFromValues(formid);
                        Platform.srv("org-saveDept", params, function (r) {
                            var treeObj = Org.zTreeObj;
                            var nodes = treeObj.getSelectedNodes();
                            if (nodes.length > 0) {
                                if (edit) {
                                    nodes[0].name = fldname;
                                    treeObj.updateNode(nodes[0]);
                                } else {
                                    if (!nodes[0].isParent) {
                                        nodes[0].isParent = true;
                                        treeObj.updateNode(nodes[0]);
                                    }
                                    treeObj.reAsyncChildNodes(nodes[0], "refresh");
                                }
                            } else {
                                treeObj.isFirst = true;
                                treeObj.reAsyncChildNodes(null, "refresh");
                            }
                            d.close().remove()
                        });
                        return false;
                    }
                },
                {
                    value: '取消',
                    callback: function () {
                    }
                }
            ]
        });
        d.show();
        if (treeId) {
            //获取表单数据
            Platform.srv("commonservice-getById", {
                className: "com.yyj.apps.org.model.Orgdept",
                id: treeId
            }, function (r) {
                if (r) {
                    Platform.setFromValues(r, formid);
                }
            });
        } else {
            var maxSn = {};
            if (treeNode) {
                maxSn.fldparentid = treeNode.id;
                var fromV = {
                    fldparentid: treeNode.id,
                    fldparentname: treeNode.fldname
                }
                Platform.setFromValues(fromV, formid);
            }
            //设置序号值
            Platform.srv("org-getMaxDeptSn", maxSn, function (r) {
                if (r && r > 0)
                    $('#' + formid).find('#fldsn').val(r + 1);
                else
                    $('#' + formid).find('#fldsn').val(1);
            });
        }
    },
    delDept: function (treeNode) {
        if (treeNode && treeNode.id) {
            //设置序号值
            bootbox.confirm("确定要删除该部门和该部门所属子部门吗？", function (result) {

                if (result) {
                    Platform.srv("org-delDept", {deptid: treeNode.id}, function (r) {

                        var treeObj = Org.zTreeObj;
                        if (treeNode.getParentNode()) {
                            var children = treeNode.getParentNode().children;
                            if (children && children.length == 1) {
                                treeNode.getParentNode().isParent = false;
                                treeObj.updateNode(treeNode.getParentNode());
                            }
                            treeObj.reAsyncChildNodes(treeNode.getParentNode(), "refresh");
                        } else {
                            treeObj.isFirst = true;
                            treeObj.reAsyncChildNodes(null, "refresh");
                        }
                    });
                }
            });

        }
    },
    editDeptB: function () {
        var nodes2 = Org.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        if (nodes2[0]) {
            Org.addDept(nodes2[0].id, null, true);
        }
    },
    delDeptB: function () {
        var nodes2 = Org.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        if (nodes2[0]) {
            Org.delDept(nodes2[0]);
        }
    },
    addDeptB: function () {
        var nodes2 = Org.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        Org.addDept(null, node);
    },
    getDeptTree: function (treeId, nodeselectCallback) {
        var isFirst = true;
        var selectFirst = true;
        var setting = {
            edit: {
                autoExpandTrigger: true,
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
                drag: {
                    prev: true,
                    next: true,
                    inner: false
                }
            },
            async: {
                enable: true,
                url: "/service/org-listDept",
                autoParam: ["id", "name=n", "level=lv"],
                dataFilter: filter
            },
            callback: {
                onAsyncSuccess: function (event, treeId, treeNode) {
                    if (isFirst) {
                        //获得树形图对象
                        var zTree = treeDeptChose;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        //当再次点击节点时条件不符合,直接跳出方法
                        isFirst = false;
                    }
                    if (treeNode && treeNode.children && treeNode.children[0].isParent == true) {
                        zTree.expandNode(nodeList[0], true);
                    }
                    if (treeNode && treeNode.children && treeNode.children[0].isParent == false && selectFirst) {
                        selectFirst = false;
                        treeDeptChose.selectNode(treeNode.children[0]);
                        if (nodeselectCallback && $.isFunction(nodeselectCallback)) {
                            nodeselectCallback.call(treeDeptChose, treeNode.children[0]);
                        }
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    if (nodeselectCallback && $.isFunction(nodeselectCallback)) {
                        nodeselectCallback.call(treeDeptChose, treeNode);
                    }
                }
            }
        };

        function filter(treeId, parentNode, responseData) {
            if (responseData.result.length > 0) {
                $.each(responseData.result, function (index, r) {
                    if (r.fldname) r.name = r.fldname;
                });
            }
            return responseData.result;
        }

        var treeDeptChose = $.fn.zTree.init($("#" + treeId), setting);
        return treeDeptChose;
    },
    initgrid: function () {
        Org.user = {};
        $("#peopleGrid").jqGrid({
            multiselect: true,
            url: '/service/org-listUser',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {
                notfldstatus: true
            },
            beforeRequest: function () {
                var treeObj = Org.zTreeObj;
                if (!treeObj) return false;
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');

                var nodes = treeObj.getSelectedNodes();
                if ($("#usersearchinput").val()) {
                    postData.qcon = $("#usersearchinput").val();
                    postData.start =0;
                    Org.user.currentPage = 1;
                    postData.limit = postData.rows;
                    delete postData.fldbmid;
                }
                else if (nodes.length > 0) {
                    if (Org.user.gridTotalNum && postData.page > Org.user.gridTotalNum) {
                        postData.page = Org.user.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    Org.user.currentPage = postData.page;
                    postData.limit = postData.rows;
                    Org.user.rowNum = postData.limit;
                    postData.fldbmid = nodes[0].id;
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                } else {
                    return false;
                }
            },
            colModel: [
                {label: '序号', name: 'fldsn', width: 26},
                {label: '账号', name: 'fldloginid'},
                {
                    label: '姓名', name: 'fldname', formatter: function (cellValue, options, rowObject) {
                        if (rowObject.fldgly == '1') {
                            return '<span class="glyphicon glyphicon-user" aria-hidden="true"></span><span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                        }
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '职务', name: 'fldzw', width: 350}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 24,
            pager: "#peopleGridPager",
            rowNum: Org.user.rowNum || 20,
            rowList: [5, 10, 20, 50, 100, 250, 500, 1000],
            jsonReader: {
                root: "data",
                page: "page",
                total: "pageCount",
                records: "totalCount",
                repeatitems: false
            },
            rownumbers: this.showRowNo || false,
            beforeProcessing: function (data) {
                $.extend(data, data.result);
                Org.user.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Org.user.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '3') {
                    Org.addUser(Org.user.rawRecordsMap[rowid]);
                }
            }
        });
        Org.user.grid = $("#peopleGrid");

        $('#usersearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Org.user.grid.trigger("reloadGrid");
            }
        });
        $('#usersearchbutton').unbind('click').bind('click', function (event) {
            Org.user.grid.trigger("reloadGrid");
        });
    },
    addUser: function (userData) {
        var formid = "userformid";
        var html = '\
                    <div class="container" style="width: 100%;">\
                      <form class="" role="form" id="' + formid + '">\
                         <input type="hidden" id="id">\
                         <input type="hidden" id="fldzsbmid">\
                         <input type="hidden" id="fldunitid">\
                         <input type="hidden" id="fldunitname">\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">账号<span style="color:red;">*</span></span>\
                                    <input class="form-control" type="text" id="fldloginid">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">姓名&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldname">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">密码<span style="color:red;">*</span></span>\
                                    <input class="form-control" type="text" id="fldpassword">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">邮箱&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldemial">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">职务&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldzw">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">参加工作时间&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldcjgzsj">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">工龄&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldgl">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">学历&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldxl">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">出生日期</span>\
                                    <input class="form-control" type="text" id="fldcsrq">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">身份证&nbsp;</span>\
                                    <input class="form-control" type="text" id="fldsfzh">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">主机电话</span>\
                                    <input class="form-control" type="text" id="fldzjdh">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">移动电话</span>\
                                    <input class="form-control" type="text" id="fldyddh">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">员工号</span>\
                                    <input class="form-control" type="text" id="fldygh">\
                                </div>\
                            </div>\
                            <div class="form-group col-sm-6">\
                                <div class="input-group">\
                                    <span class="input-group-addon">主属部门</span>\
                                    <input class="form-control" type="text" id="fldzsbmmc">\
                                    <span class="input-group-btn">\
                                        <button class="btn btn-default" type="button" id="fldzsbmmcbutton">选择</button>\
                                    </span>\
                                </div>\
                            </div>\
                        </div>\
                        </form>\
                    </div>\
            ';
        var title = '新增用户';
        if (userData)
            title = '编辑用户';
        var d = dialog({
            title: title,
            width: 680,
            content: html,
            button: [
                {
                    value: '保存',
                    callback: function () {
                        var fldloginid = $('#fldloginid').val();
                        if (!fldloginid) {
                            alert("请输入账号");
                            return false;
                        }
                        var fldpassword = $('#fldpassword').val();
                        if (!fldpassword) {
                            alert("请输入密码");
                            return false;
                        }
                        var params = Platform.getFromValues(formid);
                        params.needfldsn = '1';
                        Platform.srv("org-saveUser", params, function (r) {
                            if (r && r.msg) {
                                alert(r.msg);
                                return;
                            }
                            Org.user.grid.trigger("reloadGrid");
                            d.close().remove()
                        });
                        return false;
                    }
                },
                {
                    value: '取消',
                    callback: function () {
                    }
                }
            ]
        });
        d.show();
        //绑定主属部门选择按钮
        $('#' + formid).find('#fldzsbmmcbutton').unbind('click').click(function () {
            var treehtml = '<div>\
                <ul id="treeDeptChose" class="ztree"></ul>\
                </div>';
            var treed = dialog({
                title: '选择部门',
                width: 280,
                height: 180,
                content: treehtml,
                button: [
                    {
                        value: '确定',
                        callback: function () {
                            var treeObj = treeDeptChose;
                            var nodes = treeObj.getSelectedNodes();
                            if (nodes.length > 0) {
                                $('#' + formid).find('#fldzsbmid').val(nodes[0].id);
                                $('#' + formid).find('#fldzsbmmc').val(nodes[0].name);
                                $('#' + formid).find('#fldunitid').val(nodes[0].id);
                                $('#' + formid).find('#fldunitname').val(nodes[0].name);
                                //设置单位的值
                                var parentNode = nodes[0].getParentNode();
                                if (parentNode) {
                                    while (parentNode.fldtype != '1' && parentNode && parentNode.getParentNode()) {
                                        parentNode = parentNode.getParentNode();
                                    }
                                    $('#' + formid).find('#fldunitid').val(parentNode.id);
                                    $('#' + formid).find('#fldunitname').val(parentNode.name);
                                }
                            } else {
                                alert("请选择一个部门");
                                return;
                            }
                            treed.close().remove();
                            return false;
                        }
                    },
                    {
                        value: '取消',
                        callback: function () {
                        }
                    }
                ]
            });
            treed.show();
            var treeId = 'treeDeptChose';
            var treeDeptChose = Org.getDeptTree(treeId);
        });
        jeDate("#fldcsrq", {
            format: "YYYY-MM-DD"
        });
        //fldcjgzsj
        jeDate("#fldcjgzsj", {
            format: "YYYY-MM-DD"
        });
        //设置选择树节点的部门
        if (!userData) {
            var nodes2 = Org.zTreeObj.getSelectedNodes();
            if (nodes2 && nodes2.length > 0) {
                $('#' + formid).find('#fldzsbmid').val(nodes2[0].id);
                $('#' + formid).find('#fldzsbmmc').val(nodes2[0].name);
                //设置单位的值
                var parentNode = nodes2[0].getParentNode();
                while (parentNode.fldtype != '1' && parentNode && parentNode.getParentNode()) {
                    parentNode = parentNode.getParentNode();
                }
                $('#' + formid).find('#fldunitid').val(parentNode.id);
                $('#' + formid).find('#fldunitname').val(parentNode.name);
            }
        } else {
            Platform.setFromValues(userData, formid);
        }
    },
    editUser: function () {
        var ids = Org.user.grid.getGridParam("selarrrow");
        if (!ids || ids.length > 1||ids.length==0) {
            bootbox.alert('请选择一条数据');
            return;
        } else {
            Org.addUser(Org.user.rawRecordsMap[ids[0]]);
        }
    },
    delUser: function () {
        var ids = Org.user.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        var records = [];
        $.each(ids, function (index, v) {
            if (Org.user.rawRecordsMap[v] && Org.user.rawRecordsMap[v].deptid) {
                records.push(Org.user.rawRecordsMap[v].deptid);
            }
        });
        Platform.srv("org-delUser", {deptids: records.join(",")}, function (r) {
            Org.user.grid.trigger("reloadGrid");
        });
    },
    sort: function () {
        var nodes2 = Org.zTreeObj.getSelectedNodes();
        if (nodes2 && nodes2.length > 0) {
            Platform.srv("org-sortUser", {deptids: nodes2[0].id}, function (r) {
                Org.user.grid.trigger("reloadGrid");
            });
        }

    },
    sortUp: function () {
        var ids = Org.user.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (Org.user.rawRecordsMap[ids[0]]) {
            var r = Org.user.rawRecordsMap[ids[0]];
            var params = {
                deptid: r.deptid,
                fldsn: r.fldsn
            };
            Platform.srv("org-sortUp", params, function (r) {
                Org.user.grid.trigger("reloadGrid");
            });
        }
    },
    sortDown: function () {
        var ids = Org.user.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (Org.user.rawRecordsMap[ids[0]]) {
            var r = Org.user.rawRecordsMap[ids[0]];
            var params = {
                deptid: r.deptid,
                fldsn: r.fldsn,
                down: '1'
            };
            Platform.srv("org-sortUp", params, function (r) {
                Org.user.grid.trigger("reloadGrid");
            });
        }
    },
    setAdmin: function () {
        var ids = Org.user.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        var setIds = [];
        var canselIds = [];
        $.each(ids, function (index, id) {
            var r = Org.user.rawRecordsMap[id];
            if (r.fldgly == '1') {
                canselIds.push(id);
            } else {
                setIds.push(id);
            }
        });
        if (setIds.length > 0) {
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.org.model.Orguser",
                ids: setIds.join(","),
                fldgly: "1"
            }, function (r) {

            }, true);
        }
        if (canselIds.length > 0) {
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.org.model.Orguser",
                ids: canselIds.join(","),
                fldgly: "null"
            }, function (r) {

            }, true);
        }
        Org.user.grid.trigger("reloadGrid");
    },
    authlogin: function (dest) {
        var fldloginid = $("#fldloginid").val();
        var fldpassword = $("#fldpassword").val();
        if (!fldloginid) {
            bootbox.alert('请输入用户名');
            return;
        }
        if (!fldpassword) {
            bootbox.alert('请输入密码');
            return;
        }

        if ($("#rember").is(':checked')) {
            Platform.clearCookie('fldloginid');
            Platform.clearCookie('fldpassword');
            Platform.setCookie('fldloginid', fldloginid);
            Platform.setCookie('fldpassword', fldpassword);
        } else {
            Platform.clearCookie('fldloginid');
            Platform.clearCookie('fldpassword');
        }
        var params = {
            fldloginid: fldloginid,
            fldpassword: fldpassword
        };

        Platform.srv("login-authLogin", params, function (r) {
            if (r) {
                if(dest){
                    window.location.href ='/'+dest;
                }else{
                    window.location.href = '/work.html';
                }
            } else {
                bootbox.alert('用户名或密码不正确');
                return;
            }
        });
    },
    initlogin: function () {
        var url = window.location.search;
        url = url.substring(1);
        var urlpar = url.split("&");
        var dest='';
        $.each(urlpar, function (index, v) {
            if (v.indexOf("to") != -1) {
                dest = v.substring(2 + 1);
            }
        });
        var fldloginid = Platform.getCookie("fldloginid");
        var fldpassword = Platform.getCookie("fldpassword");
        if (fldloginid) {
            $("#fldloginid").val(fldloginid);
        }
        if (fldpassword) {
            $("#fldpassword").val(fldpassword);
        }
        if (fldloginid || fldpassword)
            $("#rember").prop("checked", true);
        //回车事件绑定
        $('#fldloginid').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldpassword').focus();
            }
        });
        $('#fldpassword').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Org.authlogin(dest);
            }
        });
        $('#loginbutton').unbind('click').click(function (event) {
            Org.authlogin(dest);
        });

    },
    startWork: function () {
        $("#menu").find("li").removeAttr("class");
        $("#tostwork").attr("class", "active");

        var formid = "startworkformid";
        var h = $(window).height() - 50 - 40 - 5;
        var html = '\
                    <div class="container" style="width: 100%;" id="' + formid + '">\
                     <div class="row">\
                     <div class="col-sm-10">\
                        <form class="" role="form">\
                         <input type="hidden" id="id">\
                         <input type="hidden" id="pkid">\
                         <input type="hidden" id="initbmid">\
                         <input type="hidden" id="initbm">\
                         <input type="hidden" id="initdeptid">\
                         <input type="hidden" id="initdeptname">\
                         <input type="hidden" id="initunitid">\
                         <input type="hidden" id="initunitname">\
                         <input type="hidden" id="inituserid">\
                         <input type="hidden" id="initusername">\
                         <input type="hidden" id="taskid">\
                         <input type="hidden" id="fldngtime">\
                         <input type="hidden" id="state">\
                        <div class="row">\
                            <div class="form-group col-sm-12">\
                                <div class="input-group">\
                                    <span class="input-group-addon">标题<span style="color:red;">*</span></span>\
                                    <input class="form-control" type="text" id="fldtm">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-12">\
                                <div id="workEditorContainerText" class="input-group" style="float: left;width: 59px;">\
                                    <span class="input-group-addon">内容<span style="color:red;">*</span></span>\
                                <span></span>\
                                </div>\
                                <div id="workEditorContainer" style="overflow: auto;float: left;"></div>\
                        </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-12" style="margin-bottom: 0px;">\
                                	<div class="panel panel-default">\
                                        <div class="panel-heading" style="height:41px;">\
                                                      <span style="float:left;">附件</span>\
                                                      <div id="attachUpload" style="position: relative;margin-left: 10px;float: left;">上传</div>\
                                         </div>\
                                        <div class="list-group" id="attachlist">\
                                        </div>\
                                    </div>\
                               </div>\
                            <div class="form-group col-sm-12" style="margin-bottom: 0px;">\
                                	<div class="panel panel-default" style="margin-bottom: 0px;">\
                                    <div class="panel-heading">办理过程</div>\
                                    <table class="table">\
                                        <colgroup width="10"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="160"></colgroup>\
                                        <colgroup></colgroup>\
                                        <tbody><tr><td>序号</td><td>发送人</td><td>办理人</td><td>办理部门</td><td>发送时间</td><td>签收时间</td><td>完成时间</td><td>意见</td></tr>\
                                    </tbody></table>\
                                    <div style="height:' + (h - 602) + 'px;overflow: auto;">\
                                    <table class="table">\
                                        <colgroup width="10"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="160"></colgroup>\
                                        <colgroup></colgroup>\
                                        <tbody id="workprocess"></tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                             </div>\
                        </div>\
                        </form>\
                        </div>\
                         <div class="col-sm-2" style="padding-left: 5px;">\
                        	<form>\
                            <div class="form-group">\
                            <label for="exampleInputEmail1">填写意见</label>\
                               <textarea class="form-control" id="message" placeholder="请填写意见" style="height:450px;"></textarea>\
                            </div>\
                            <span type="submit" class="btn btn-default" id="sendToOther">发送</span>\
                            <span type="submit" class="btn btn-default" id="savework">保存</span>\
                            <span type="submit" class="btn btn-default" id="close">关闭</span>\
                            </form>\
                        </div>\
                        </div>\
                        </div>\
                       </div>\
                    </div>\
            ';
        var title = "发起事项";
        var w = $(window).width() * 0.96;

        var d = dialog({
            title: title,
            width: w,
            height: h,
            content: html,
            onremove: function () {
                if (um) {
                    um.destroy();
                }
                Org.initTodo();
            }
        });
        d.showModal();
        $('#' + formid).closest('.ui-dialog-body').css('overflow', 'auto');
        $("#" + formid).find("#pkid").val(Platform.uuid());
        //初始化百度编辑器
        var um;
        $("#workEditorContainer").height(355 + 35);
        $("#workEditorContainer").width($("#workEditorContainer").parent().width() - 59)
        $("#workEditorContainerText").height(355 + 35);
        Platform.initUmeditor("workEditorContainer", {
            enableAutoSave: false, //禁止自动保存
            autoSyncData: false,//自动同步编辑器要提交的数据
            initialFrameHeight: 355,
            toolbars: [
                ['undo', 'redo',
                    '|', 'bold', 'italic', 'underline',
                    '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
                    '|', 'fontfamily', 'fontsize', 'forecolor', 'backcolor',
                    '|', 'insertorderedlist', 'insertunorderedlist', 'simpleupload'] //'|', 'insertimage'
            ]
        }, function (editor) {
            um = editor;
        });
        if (window.loginUser) {
            $("#" + formid).find('input[id=' + 'initbmid' + ']').val(window.loginUser.bmid);
            $("#" + formid).find('input[id=' + 'initbm' + ']').val(window.loginUser.bmname);
            $("#" + formid).find('input[id=' + 'initdeptid' + ']').val(window.loginUser.deptid);
            $("#" + formid).find('input[id=' + 'initdeptname' + ']').val(window.loginUser.deptname);
            $("#" + formid).find('input[id=' + 'initunitid' + ']').val(window.loginUser.unitid);
            $("#" + formid).find('input[id=' + 'initunitname' + ']').val(window.loginUser.unitname);
            $("#" + formid).find('input[id=' + 'inituserid' + ']').val(window.loginUser.id);
            $("#" + formid).find('input[id=' + 'initusername' + ']').val(window.loginUser.fldname);
            $("#" + formid).find('input[id=' + 'fldngtime' + ']').val(Platform.getCurrentDate(2));
            $("#" + formid).find('input[id=' + 'state' + ']').val("2");
        }
        //绑定保存按钮
        $("#" + formid).find("#savework").unbind('click').click(function () {
            Org.saveWork(formid, um, d, function () {
                Org.listWorkProcess(formid, $("#" + formid).find('input[id=' + 'id' + ']').val());
            });
        });
        //发送按钮 sendToOther
        $("#" + formid).find("#sendToOther").unbind('click').click(function () {
            Org.sendToOther(formid, um, d);
        });
        //附件上传按钮
        Org.initWordUpAttach(formid);
        //关闭按钮
        Org.initcloseWorkBut(formid, um, d);
    },
    saveWork: function (formid, um, d, callback) {
        var fromValues = Platform.getFromValues(formid);
        if (!fromValues.fldtm) {
            bootbox.alert('请输入标题');
            return;
        }
        if (um) {
            fromValues.fldcontent = um.getContent();
        }
        Platform.srv("work-saveWork", fromValues, function (r) {
            var workr, taskr;
            if (r && r.work) workr = r.work;
            if (r && r.task) taskr = r.task;
            if (workr) { //保存意见
                Platform.setFromValues(workr, formid);
                //更新附件id
                var pkid = $("#pkid").val();
                if (pkid && pkid != workr.id) {
                    $("#pkid").val(workr.id);
                    Platform.srv("work-updateAttachPkid", {oldpkid: pkid, pkid: workr.id}, function (r3) {

                    });
                }
            }
            if (taskr) { //保存意见
                $("#taskid").val(taskr.id);
                Org.saveCom(formid, um, d, function () {
                    if (callback && $.isFunction(callback)) {
                        callback.call(d, r, formid, um, d);
                    }
                });
            }
        });
    },
    listTodoWork: function () {
        $("#menu").find("li").removeAttr("class");
        $("#todobut").attr("class", "active");
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column" id="todoworkgriddiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button type="button" class="btn btn-danger" onclick="Org.deleteToDo();">删除</button>\
            <button class="btn btn-success" id="todoworksearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="todoworksearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <table id="todoWorkGrid"></table>\
            <div id="todoWorkGridPager"></div>\
            </div>');
        Org.todowork = {};
        $("#todoWorkGrid").jqGrid({
            multiselect: true,
            url: '/service/work-listUserTasks',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {},
            beforeRequest: function () {
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                postData.start = (postData.page - 1) * postData.rows;
                postData.limit = postData.rows;
                delete postData.qcon;
                if ($("#todoworksearchinput").val()) {
                    postData.qcon = $("#todoworksearchinput").val();
                }
            },
            colModel: [
                {
                    label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        if (!rowObject.fldassgintime) return '<span style="color:red;cursor: pointer;">' + cellValue + '</span>';
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '拟稿人', name: 'initusername', width: 20},
                {label: '拟稿部门', name: 'initbm', width: 50}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#todoWorkGridPager",
            rowNum: Org.todowork.rowNum || 20,
            rowList: [5, 10, 20, 50, 100, 250, 500, 1000],
            jsonReader: {
                root: "data",
                page: "page",
                total: "pageCount",
                records: "totalCount",
                repeatitems: false
            },
            rownumbers: this.showRowNo || false,
            beforeProcessing: function (data) {
                $.extend(data, data.result);
                Org.todowork.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Org.todowork.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') {
                    if (Org.todowork.rawRecordsMap[rowid] && Org.todowork.rawRecordsMap[rowid].state == '2') {
                        Org.showOneToDoWork(Org.todowork.rawRecordsMap[rowid], false, false, true, '1');
                        return;
                    }
                    Org.showOneToDoWork(Org.todowork.rawRecordsMap[rowid]);
                }
            }
        });
        Org.todowork.todogrid = $("#todoWorkGrid");

        $('#todoworksearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Org.todowork.todogrid.trigger("reloadGrid");
            }
        });
        $('#todoworksearchbutton').unbind('click').bind('click', function (event) {
            Org.todowork.todogrid.trigger("reloadGrid");
        });
    },
    sendToOther: function (formid, um, d) {
        function sendToUser() {
            var html = '\
                <div id="senddialog" class="row clearfix" style="height: 100%;margin-left: 0px;margin-right: 0px;">\
                    <div class="col-md-4 column" id="sendToOrgTree" style="border: 1px solid #ccc;height: 100%;">\
                        <ul id="ToOrgTreeDept" class="ztree"></ul>\
                    </div>\
                    <div class="col-md-3 column" id="sendToUsers" style="border: 1px solid #ccc;height: 100%;">\
                    </div>\
                    <div class="col-md-2 column" id="sendToBut" style="border: 1px solid #ccc;height: 100%;text-align: center;">\
                        <div class="col-md-12 column" style="height:45%;"></div>\
                        <div class="col-md-12 column">\
                        <a class="btn btn-default" href="#" role="button" id="chose">移入</a>\
                        </div>\
                        <div class="col-md-12 column">\
                        <a class="btn btn-default" href="#" role="button" id="unchose">移出</a>\
                        </div>\
                    </div>\
                    <div class="col-md-3 column" id="sendToChoseUsers" style="border: 1px solid #ccc;height: 100%;">\
                    </div>\
                </div>\
            ';
            var senddialog = dialog({
                title: '选择发送人',
                width: 680,
                height: 480,
                content: html,
                button: [
                    {
                        value: '确定',
                        callback: function () {
                            var params = {
                                sendUser: loginUser.fldname,
                                sendUserid: loginUser.id,
                                taskid: $("#taskid").val()
                            };
                            var toUserids = [];
                            var toUserNames = [];
                            var toUserfldassginunitnames = [];
                            var toUserfldassginunitids = [];
                            var toUserfldassgindeptnames = [];
                            var toUserfldassgindeptids = [];
                            var toUserfldassginbms = [];
                            var toUserfldassginbmids = [];
                            $('span[name=rightUsers]').each(function (k) {
                                toUserids.push($(this).attr('value'));
                                toUserNames.push($(this).attr('fldname'));
                                toUserfldassginunitnames.push($(this).attr('fldassginunitname'));
                                toUserfldassginunitids.push($(this).attr('fldassginunitid'));
                                toUserfldassgindeptnames.push($(this).attr('fldassgindeptname'));
                                toUserfldassgindeptids.push($(this).attr('fldassgindeptid'));
                                toUserfldassginbms.push($(this).attr('fldassginbm'));
                                toUserfldassginbmids.push($(this).attr('fldassginbmid'));
                            });
                            params.toUserids = toUserids.join(',');
                            params.toUserNames = toUserNames.join(',');
                            params.toUserfldassginunitnames = toUserfldassginunitnames.join(',');
                            params.toUserfldassginunitids = toUserfldassginunitids.join(',');
                            params.toUserfldassgindeptnames = toUserfldassgindeptnames.join(',');
                            params.toUserfldassgindeptids = toUserfldassgindeptids.join(',');
                            params.toUserfldassginbms = toUserfldassginbms.join(',');
                            params.toUserfldassginbmids = toUserfldassginbmids.join(',');
                            Platform.srv("work-sendWorkToOthers", params, function (r) {
                                if (r) {
                                    Org.updateState(formid);
                                }
                                senddialog.close().remove();
                                d.close().remove();
                                if (Org.todowork && Org.todowork.todogrid) {
                                    Org.todowork.todogrid.trigger("reloadGrid");
                                }
                            });

                            return false;
                        }
                    },
                    {
                        value: '取消',
                        callback: function () {
                        }
                    }
                ]
            });
            senddialog.show();
            $("#senddialog").closest(".ui-dialog-body").css('padding-left', '0px');
            $("#senddialog").closest(".ui-dialog-body").css('padding-right', '0px');
            $("#senddialog").closest(".ui-dialog-body").css('padding-top', '0px');
            var treeId = 'ToOrgTreeDept';
            var treeDeptChose = Org.getDeptTree(treeId, function (treenode) {
                var queryUser = {
                    fldbmid: treenode.id
                };
                Platform.srv('org-listUser', queryUser, function (r) {
                    var userHtml = '';
                    if (r && r.length > 0) {
                        $.each(r, function (index, v) {
                            if (v) {
                                userHtml += '<div class="checkbox">\
                                            <label style="padding-top: 4px;">\
                                            <input type="checkbox" name="leftUsers" fldname="' + v.fldname + '" value="' + v.id + '"/></label><span name="namespan" style="cursor: pointer;">' + v.fldname +
                                    '</span>\
                                    </div>';
                            }
                        });
                        $("#sendToUsers").html('');
                        $("#sendToUsers").html(userHtml);
                        $("#sendToUsers").find('span[name=namespan]').unbind('click').click(function (e) {
                            var checkbox = $(this).parent().find('input');
                            if (checkbox.is(':checked')) {
                                checkbox.prop("checked", false);
                                $("#sendToChoseUsers").find('span[value=' + checkbox.val() + ']').parent().parent().remove();
                            } else {
                                checkbox.prop("checked", true);
                                toRight();
                            }
                        });
                        $("#sendToUsers").find('label input').unbind('click').click(function (e) {
                            var checkbox = $(this);
                            if (checkbox.is(':checked')) {
                                toRight();
                            } else {
                                $("#sendToChoseUsers").find('span[value=' + checkbox.val() + ']').parent().parent().remove();
                            }
                        });
                    } else {
                        $("#sendToUsers").html('');
                    }
                });
            });

            function toRight() {
                var users = [];
                $('input:checkbox[name=leftUsers]:checked').each(function (k) {
                    var treeObj = treeDeptChose;
                    var nodes = treeObj.getSelectedNodes();
                    var fldassginbmid, fldassginbm, fldassgindeptid, fldassgindeptname, fldassginunitid,
                        fldassginunitname;
                    if (nodes.length > 0) {
                        if (nodes[0].fldtype == '3') {
                            fldassgindeptid = nodes[0].id;
                            fldassgindeptname = nodes[0].name;
                            var parentNode = nodes[0].getParentNode();
                            if (parentNode) {
                                fldassginbmid = parentNode.id;
                                fldassginbm = parentNode.name;
                            }
                            var unitparentNode = parentNode.getParentNode();
                            if (unitparentNode) {
                                fldassginunitid = unitparentNode.id;
                                fldassginunitname = unitparentNode.name;
                            }
                        }
                        if (nodes[0].fldtype == '2') {
                            fldassgindeptid = nodes[0].id;
                            fldassgindeptname = nodes[0].name;
                            fldassginbmid = nodes[0].id;
                            fldassginbm = nodes[0].name;
                            var unitparentNode = nodes[0].getParentNode();
                            if (unitparentNode) {
                                fldassginunitid = unitparentNode.id;
                                fldassginunitname = unitparentNode.name;
                            }
                        }
                        if (nodes[0].fldtype == '1') {
                            fldassgindeptid = nodes[0].id;
                            fldassgindeptname = nodes[0].name;
                            fldassginbmid = nodes[0].id;
                            fldassginbm = nodes[0].name;
                            fldassginunitid = nodes[0].id;
                            fldassginunitname = nodes[0].name;
                        }
                    }
                    var one = {
                        id: $(this).attr("value"),
                        fldname: $(this).attr('fldname'),
                        fldassginbmid: fldassginbmid,
                        fldassginbm: fldassginbm,
                        fldassgindeptid: fldassgindeptid,
                        fldassgindeptname: fldassgindeptname,
                        fldassginunitid: fldassginunitid,
                        fldassginunitname: fldassginunitname
                    }
                    users.push(one);
                });
                if (users.length == 0) {
                    bootbox.alert('请选择用户');
                    return;
                }
                var rightUsers = [];
                var rightUserids = [];
                $('span[name=rightUsers]').each(function (k) {
                    var one = {
                        id: $(this).attr("value"),
                        fldname: $(this).attr('fldname'),
                        fldassginbmid: $(this).attr('fldassginbmid'),
                        fldassginbm: $(this).attr('fldassginbm'),
                        fldassgindeptid: $(this).attr('fldassgindeptid'),
                        fldassgindeptname: $(this).attr('fldassgindeptname'),
                        fldassginunitid: $(this).attr('fldassginunitid'),
                        fldassginunitname: $(this).attr('fldassginunitname')
                    };
                    rightUserids.push($(this).attr("value"));
                    rightUsers.push(one);
                });
                $.each(users, function (index, v) {
                    if (rightUserids.indexOf(v.id) == -1) {
                        rightUsers.push(v);
                    }
                });
                var userHtml = '';
                $.each(rightUsers, function (index, v) {
                    if (v) {
                        userHtml += '<div class="checkbox">\
                                            <label style="padding-left: 0px;">\
                                            <span type="checkbox" name="rightUsers" fldassginunitid="' + v.fldassginunitid + '" fldassginunitname="' + v.fldassginunitname + '" fldassginbmid="' + v.fldassginbmid + '" fldassginbm="' + v.fldassginbm + '" fldassgindeptid="' + v.fldassgindeptid + '" fldassgindeptname="' + v.fldassgindeptname + '" fldname="' + v.fldname + '" value="' + v.id + '">' + v.fldname +
                            '</span></label><span type="button" name="delSpan" class="glyphicon glyphicon-remove" style="color: red;float: right;"></span>\
                            </div>';
                    }
                });
                $("#sendToChoseUsers").html("");
                $("#sendToChoseUsers").html(userHtml);
                $("#sendToChoseUsers").find('span[name=delSpan]').unbind('click').click(function () {
                    var value = $(this).parent().find('span[name=rightUsers]').attr("value");
                    $("#sendToUsers").find('input[value=' + value + ']').prop("checked", false);
                    $(this).parent().remove();
                });
                $("#sendToChoseUsers").find('.checkbox').unbind('click').click(function () {
                    var value = $(this).find('span[name=rightUsers]').attr("value");
                    $("#sendToUsers").find('input[value=' + value + ']').prop("checked", false);
                    $(this).remove();
                });
            }

            $("#chose").unbind('click').click(function () {
                toRight();
            });

            $("#unchose").unbind('click').click(function () {
                $("#sendToChoseUsers").html("");
            });
        }

        if (!$("#taskid").val()) {
            Org.saveWork(formid, um, d, sendToUser);
        } else {
            sendToUser();
        }
    },
    initWordUpAttach: function (formid) {
        Platform.loadCss('/ueditor/third-party/webuploader/webuploader.css');
        var prePaths = [];
        prePaths.push('/ueditor/third-party/webuploader/webuploader.min.js');
        Platform.loadScripts(prePaths, function () {
            var uploader = WebUploader.create({
                swf: '/ueditor/third-party/webuploader/Uploader.swf',
                formData: {"pkid": $("#pkid").val(), flduserid: loginUser.id, fldusername: loginUser.fldname},//参数列表
                // 文件接收服务端。
                server: '/service/work-saveAttach',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#attachUpload',
                auto: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });
            uploader.on('uploadSuccess', function (file) {
                Org.initAttachList(formid)
            });
            $("#attachUpload").find('.webuploader-pick').css('padding-bottom', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-top', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-left', '10px');
            $("#attachUpload").find('.webuploader-pick').css('padding-right', '10px');
            $("#attachUpload").find('.webuploader-pick').css('overflow', 'visible');
        });
    },
    showOneToDoWork: function (record, finish, formComlist, formToList, editmode) {
        var id = record.fldbuk;
        Platform.srv("commonservice-getById", {
            className: "com.yyj.apps.work.model.Orgwork",
            id: id
        }, function (fromData) {
            var formid = "startworkformid";
            var formcol = "10";
            if (finish) formcol = "12";
            var html = '\
                    <div class="container" style="width: 100%;" id="' + formid + '">\
                     <div class="row">\
                     <div class="col-sm-' + formcol + '">\
                        <form class="" role="form">\
                         <input type="hidden" id="id">\
                         <input type="hidden" id="pkid">\
                         <input type="hidden" id="initbmid">\
                         <input type="hidden" id="initbm">\
                         <input type="hidden" id="initdeptid">\
                         <input type="hidden" id="initdeptname">\
                         <input type="hidden" id="initunitid">\
                         <input type="hidden" id="initunitname">\
                         <input type="hidden" id="inituserid">\
                         <input type="hidden" id="initusername">\
                         <input type="hidden" id="taskid">\
                         <input type="hidden" id="comid">\
                         <input type="hidden" id="state">\
                        <div class="row">\
                            <div class="form-group col-sm-12">\
                                <div class="input-group">\
                                    <span class="input-group-addon">标题<span style="color:red;">*</span></span>\
                                    <input class="form-control" type="text" id="fldtm" readonly="readonly">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-12">\
                                <div id="workEditorContainerText" class="input-group" style="float: left;width: 59px;">\
                                                    <span class="input-group-addon">内容<span style="color:red;">*</span></span>\
                                                <span></span>\
                                               </div>\
                                                <div id="workEditorContainer" style="overflow: auto;float: left;"></div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="form-group col-sm-12">\
                                	<div class="panel panel-default">\
                                        <div class="panel-heading" style="height:41px;">\
                                         <span style="float:left;">附件</span>';
            if (!finish) html += '\<div id="attachUpload" style="position: relative;margin-left: 10px;float: left;">上传</div>';
            html += '</div>\
                                        <div class="list-group" id="attachlist">\
                                        </div>\
                                    </div>\
                               </div>\
                            <div class="form-group col-sm-12" style="margin-bottom: 0px;">\
                                	<div class="panel panel-default">\
                                    <div class="panel-heading">办理过程</div>\
                                    <table class="table">\
                                        <colgroup width="10"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="160"></colgroup>\
                                        <colgroup></colgroup>\
                                        <tbody><tr><td>序号</td><td>发送人</td><td>办理人</td><td>办理部门</td><td>发送时间</td><td>签收时间</td><td>完成时间</td><td>意见</td></tr>\
                                    </tbody></table>\
                                    <div style="height:288px;overflow: auto;">\
                                    <table class="table">\
                                        <colgroup width="10"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="100"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="120"></colgroup>\
                                        <colgroup width="160"></colgroup>\
                                        <colgroup></colgroup>\
                                        <tbody id="workprocess"></tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                             </div>\
                        </div>\
                        </form>\
                        </div>';
            if (!finish) html += '\
                         <div class="col-sm-2" style="padding-left: 5px;">\
                        	<form>\
                            <div class="form-group">\
                            <label for="exampleInputEmail1">填写意见</label>\
                               <textarea class="form-control" id="message" placeholder="请填写意见" style="height:450px;"></textarea>\
                            </div>\
                            <span type="submit" class="btn btn-default" id="completework">完成</span>\
                            <span type="submit" class="btn btn-default" id="sendToOther">发送</span>\
                            <span type="submit" class="btn btn-default" id="savework">保存</span>\
                            <span type="submit" class="btn btn-default" id="close">关闭</span>\
                            </form>\
                        </div>';
            html += '\
                        </div>\
                        </div>\
                       </div>\
                    </div>\
            ';
            var title = fromData.fldtm;
            var w = $(window).width() - 80;
            var h = $(window).height() - 50 - 40 - 5;
            var d = dialog({
                title: title,
                width: w,
                height: h,
                content: html,
                onremove: function () {
                    if (um) {
                        um.destroy();
                    }
                    if (formToList) {
                        Org.initTodo();
                    }
                }
            });
            d.showModal();
            $('#' + formid).closest('.ui-dialog-body').css('overflow', 'auto');
            Platform.setFromValues(fromData, formid);
            $("#taskid").val(record.id);
            $("#pkid").val(fromData.id);
            //初始化百度编辑器
            var um;
            var readonly = true;
            var toolbars = [];
            if (editmode == '1') {
                readonly = false;
                $("#" + formid).find("#fldtm").removeAttr("readonly");
                toolbars = [
                    ['undo', 'redo',
                        '|', 'bold', 'italic', 'underline',
                        '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
                        '|', 'fontfamily', 'fontsize', 'forecolor', 'backcolor',
                        '|', 'insertorderedlist', 'insertunorderedlist', 'simpleupload'] //'|', 'insertimage'
                ];
            }
            $("#workEditorContainer").height(355 + 35);
            $("#workEditorContainer").width($("#workEditorContainer").parent().width() - 59)
            $("#workEditorContainerText").height(355 + 35);

            Platform.initUmeditor("workEditorContainer", {
                readonly: readonly,
                initialFrameHeight: editmode == '1'?355:355+32,
                toolbars: toolbars
            }, function (editor) {
                um = editor;
                editor.setContent(fromData.fldcontent);
            });
            //绑定保存按钮
            $("#" + formid).find("#savework").unbind('click').click(function () {
                Org.saveCom(formid, um, d, function () {
                    Org.listWorkProcess(formid, fromData.id);
                });
            });
            //发送按钮 sendToOther
            $("#" + formid).find("#sendToOther").unbind('click').click(function () {
                Org.sendToOther(formid, um, d);
            });
            //completework
            $("#" + formid).find("#completework").unbind('click').click(function () {
                Org.saveCom(formid, um, d, function () {
                    Org.completework(formid, um, d);
                });
            });
            Org.initAttachList(formid, finish);
            //附件上传按钮
            Org.initWordUpAttach(formid);
            //列出办理过程
            Org.listWorkProcess(formid, fromData.id);
            //签收时间
            Org.claimTask(formid, um, d, finish, record);
            //列出之前填写的意见
            Org.initTaskCom(formid, um, d);
            //关闭按钮
            Org.initcloseWorkBut(formid, um, d);

            //更新当前人员对意见的最后接触时间
            if (fromData && fromData.id) {
                Org.updateComTipTime(fromData.id, formComlist);
            }
        });
    },
    updateComTipTime: function (id, formComlist) {
        var params = {
            fldacctime: Platform.getCurrentDate(2),
            fldtipuserid: loginUser.id,
            fldbuk: id
        }
        Platform.srv("work-updateComTipTime", params, function (r) {
            if (formComlist) {
                Org.initComlist();
            }
        });
    },
    initAttachList: function (formid, finish) {
        var params = {
            pkid: $("#pkid").val()
        }
        Platform.srv("work-listAttach", params, function (r) {
            var attachhtml = "";
            if (r && r.length > 0) {
                $.each(r, function (index, v) {
                    var fldngdate = v.fldngdate.substring(0, 16);
                    var delspan = '<span name="attDel"  style="float:right;margin-left: 5px;color: blue;" fileid="' + v.id + '">删除</span>';
                    if (v.flduserid != loginUser.id || finish) delspan = "";
                    attachhtml += '<a href="#" class="list-group-item">' + delspan + '<span style="float:right;margin-left: 5px;">' + fldngdate + '</span><span style="float:right;">' + v.fldusername + '</span><span name="fileName" fileid="' + v.id + '">' + v.fldfilename + '</span></a>'
                });
                $("#attachlist").html(attachhtml);
            } else {
                $("#attachlist").html("");
            }

            $("#attachlist").find('span[name=attDel]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                if (fileid) {
                    Platform.srv("work-removeAttach", {id: fileid}, function (r) {
                        if (r) span.parent().remove();
                    });
                }
            });
            $("#attachlist").find('span[name=fileName]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                var url = '/service/work-downAttach?id=' + fileid;
                Platform.download(url);
            });
        });
    },
    listWorkProcess: function (formid, buk) {
        Platform.srv("work-listWorkProcess", {buk: buk}, function (r) {
            if (r && r.length > 0) {
                var table = $("#" + formid).find("#workprocess");
                var trs = table.find('tr');
                for (var i = 0; i < trs.length; i++) {
                    trs.eq(i).remove();
                }
                var html = '';
                $.each(r, function (index, v) {
                    var sender = v.fldsend ? v.fldsend : "<开始>";
                    var fldassgin = v.fldassgin;
                    var fldcretime = v.fldcretime;
                    if (fldcretime && fldcretime.length > 16) fldcretime = fldcretime.substring(0, 16);
                    var fldassgintime = v.fldassgintime || "";
                    if (fldassgintime && fldassgintime.length > 16) fldassgintime = fldassgintime.substring(0, 16);
                    var fldfinishtime = v.fldfinishtime || "";
                    if (fldfinishtime && fldfinishtime.length > 16) fldfinishtime = fldfinishtime.substring(0, 16);
                    var fldmessage = v.fldmessage || "";
                    var fldassginbm = v.fldassginbm || "";
                    var sn = (index + 1).toString();
                    if (sn.length == 1) {
                        sn += '&nbsp;&nbsp;&nbsp;';
                    }
                    if (sn.length == 2) {
                        sn += '&nbsp;&nbsp;';
                    }
                    if (sn.length == 3) {
                        sn += '&nbsp;';
                    }
                    html += '<tr><td>' + sn + '</td><td>' + sender + '</td><td>'
                        + fldassgin + '</td><td>' + fldassginbm + '</td><td>' + fldcretime + '</td><td>'
                        + fldassgintime + '</td><td>' + fldfinishtime + '</td><td>'
                        + fldmessage + '</td></tr>';
                });
                table.append(html);
            }
        });
    },
    completework: function (formid, um, d) {
        var params2 = {
            id: $("#" + formid).find("#taskid").val(),
            fldfinishtime: Platform.getCurrentDate(2)
        }
        Platform.srv("work-completeTask", params2, function (r2) {
            Org.updateState(formid);
            d.close().remove();
            if (Org.todowork && Org.todowork.todogrid) {
                Org.todowork.todogrid.trigger("reloadGrid");
            }
        });
    },
    saveCom: function (formid, um, d, callback) {
        var fldmessage = $("#" + formid).find("#message").val();
        var comid = $("#" + formid).find("#comid").val();
        if (fldmessage) {
            var params = {
                fldtaskid: $("#" + formid).find("#taskid").val(),
                fldmessage: fldmessage,
                fldcretime: Platform.getCurrentDate(2)
            };

            if (comid) {
                params.id = comid;
            }
            Platform.srv("work-saveCom", params, function (r) {
                $("#" + formid).find("#comid").val(r.id);
                if (callback && $.isFunction(callback)) {
                    callback.call(d, formid, um, d);
                }
            });
        } else {
            if (comid) {
                Platform.srv("work-removeCom", {id: comid}, function (r) {
                    $("#" + formid).find("#comid").val("");
                    if (callback && $.isFunction(callback)) {
                        callback.call(d, formid, um, d);
                    }
                });
            } else {
                if (callback && $.isFunction(callback)) {
                    callback.call(d, formid, um, d);
                }
            }
        }
    },
    claimTask: function (formid, um, d, finish, record) {
        if (!finish && record.fldassginid && !record.fldassgintime) {
            var params2 = {
                id: $("#" + formid).find("#taskid").val(),
                fldassgintime: Platform.getCurrentDate(2),
                fldbuk: $("#" + formid).find("#id").val(),
                flduserid: loginUser.id
            }
            Platform.srv("work-claimTask", params2, function (r2) {
            });
        }
    },
    initTaskCom: function (formid, um, d) {
        var params2 = {
            id: $("#" + formid).find("#taskid").val()
        }
        Platform.srv("work-getTaskCom", params2, function (r2) {
            if (r2 && r2.length > 0) {
                var r = r2[0];
                $("#" + formid).find("#comid").val(r.id);
                $("#" + formid).find("#message").val(r.fldmessage);
            }
        });
    },
    listFinishWork: function () {
        $("#menu").find("li").removeAttr("class");
        $("#done").attr("class", "active");

        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column" id="finishworkgriddiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button class="btn btn-success" id="finishworksearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="finishworksearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <table id="finishWorkGrid"></table>\
            <div id="finishWorkGridPager"></div>\
            </div>');
        Org.finishwork = {};
        $("#finishWorkGrid").jqGrid({
            multiselect: true,
            url: '/service/work-listFinishUserTasks',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {},
            beforeRequest: function () {
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                postData.start = (postData.page - 1) * postData.rows;
                postData.limit = postData.rows;
                delete postData.qcon;
                if ($("#finishworksearchinput").val()) {
                    postData.qcon = $("#finishworksearchinput").val();
                }
            },
            colModel: [
                {
                    label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '拟稿人', name: 'initusername', width: 20},
                {label: '拟稿部门', name: 'initbm', width: 20},
                {
                    label: '', name: '操作', width: 10, formatter: function (cellValue, options, rowObject) {
                        return '<span name="getBack" style="color:blue;cursor: pointer;">' + '取回' + '</span>';
                    }
                }
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#finishWorkGridPager",
            rowNum: Org.finishwork.rowNum || 20,
            rowList: [5, 10, 20, 50, 100, 250, 500, 1000],
            jsonReader: {
                root: "data",
                page: "page",
                total: "pageCount",
                records: "totalCount",
                repeatitems: false
            },
            rownumbers: this.showRowNo || false,
            beforeProcessing: function (data) {
                $.extend(data, data.result);
                Org.finishwork.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Org.finishwork.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') { //getBack
                    Org.showOneToDoWork(Org.finishwork.rawRecordsMap[rowid], true);
                }
                if (iCol == '4' && $(e.target).attr('name') == "getBack") {
                    Platform.srv("work-getBackTask", {id: rowid}, function (r) {
                        if (r && r.assginTasks) {
                            var assUsers = [];
                            $.each(r.assginTasks, function (index, task) {
                                if (task.fldassgin) {
                                    assUsers.push(task.fldassgin);
                                }
                            });
                            bootbox.alert('文件已被' + assUsers.join(',') + "签收，无法取回");
                            return;
                        } else {
                            Org.finishwork.finishgrid.trigger("reloadGrid");
                        }
                    });
                }
            }
        });
        Org.finishwork.finishgrid = $("#finishWorkGrid");
        $('#finishworksearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Org.finishwork.finishgrid.trigger("reloadGrid");
            }
        });
        $('#finishworksearchbutton').unbind('click').bind('click', function (event) {
            Org.finishwork.finishgrid.trigger("reloadGrid");
        });
    },
    initcloseWorkBut: function (formid, um, d) {
        $("#" + formid).find("#close").unbind('click').click(function () {
            d.close().remove();
            if (Org.todowork && Org.todowork.todogrid) {
                Org.todowork.todogrid.trigger("reloadGrid");
            }
        });
    },
    initContent: function () {
        $("#menu").find("li").removeAttr("class");
        $('div[name=content]').html("");
        var html = '<div class="col-md-5 column" id="todoworklist">\
            <div class="panel panel-default">\
            <div class="panel-heading">待办事项 <span id="todomore" style="float:right;cursor: pointer;">更多</span></div>\
            <ul class="list-group">\
            </ul>\
            </div>\
            </div>';
        html += '<div class="col-md-6 column" id="workcomlist">\
            <div class="panel panel-default">\
            <div class="panel-heading">意见跟踪<span id="workcommore" style="float:right;cursor: pointer;">更多</span></div>\
            <ul class="list-group">\
        </ul>\
        </div>\
        </div>';
        $('div[name=content]').html(html);
        Org.initTodo();
        Org.initComlist();
    },
    initTodo: function () {
        if ($('#todoworklist').length == 0) return;
        $('#todoworklist').find('ul').html('');
        var params2 = {
            start: 0,
            limit: 10
        };
        Platform.srv("work-listUserTasks", params2, function (r) {
            var r2 = r.data;
            if (r2 && r2.length > 0) {
                var html = '';
                var recordsMap = {};

                $.each(r2, function (index, value) {
                    recordsMap[value.id] = value;
                    var color = '#333';
                    if (!value.fldassgintime) color = "red";
                    html += '<li rid="' + value.id + '" class="list-group-item" style="cursor: pointer;color:' + color + '">' + value.fldtm + '</li>';
                });
                $('#todoworklist').find('ul').append(html);
                $('#todoworklist').find('li').unbind('click').click(function () {
                    var rid = $(this).attr("rid");
                    if (recordsMap[rid].state == '2') {
                        Org.showOneToDoWork(recordsMap[rid], false, false, true, '1');
                        return;
                    }
                    Org.showOneToDoWork(recordsMap[rid], false, false, true);
                });
            }
        });

        //绑定更多按钮
        $("#todomore").unbind('click').click(function () {
            Org.listTodoWork();
        });
    },
    initComlist: function () {
        if ($('#workcomlist').length == 0) return;
        $('#workcomlist').find('ul').html('');
        var params2 = {
            start: 0,
            limit: 10
        };
        Platform.srv("work-listComTips", params2, function (r) {
            var r2 = r.data;
            if (r2 && r2.length > 0) {
                var html = '';
                var recordsMap = {};
                $.each(r2, function (index, value) {
                    recordsMap[value.id] = value;
                    html += '<li rid="' + value.id + '" class="list-group-item" style="cursor: pointer;">' + '<span>' + value.fldusername + '</span>&nbsp;对《' + value.fldtm + '》文件填写意见：<span>' + value.fldmessage + '</span></li>';
                });
                $('#workcomlist').find('ul').append(html);
                $('#workcomlist').find('li').unbind('click').click(function () {
                    var rid = $(this).attr("rid");
                    Org.showOneToDoWork(recordsMap[rid], true, true);
                });
            }
        });
        //绑定更多按钮
        $("#workcommore").unbind('click').click(function () {
            Org.listComTips();
        });
    },
    listComTips: function () {
        $("#menu").find("li").removeAttr("class");
        $("#comtrace").attr("class", "active");

        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column" id="comtipsgriddiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="...">\
            <button type="button" class="btn btn-primary" onclick="Org.batchUpdateComTipTime();">阅毕</button>\
            </div>\
            <table id="comtipsGrid"></table>\
            <div id="comtipsGridPager"></div>\
            </div>');
        Org.comtips = {};
        $("#comtipsGrid").jqGrid({
            multiselect: true,
            url: '/service/work-listComTips',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {},
            beforeRequest: function () {
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                postData.start = (postData.page - 1) * postData.rows;
                postData.limit = postData.rows;
            },
            colModel: [
                {
                    label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '姓名', name: 'fldusername', width: 20},
                {label: '意见', name: 'fldmessage', width: 50}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#comtipsGridPager",
            rowNum: Org.comtips.rowNum || 20,
            rowList: [5, 10, 20, 50, 100, 250, 500, 1000],
            jsonReader: {
                root: "data",
                page: "page",
                total: "pageCount",
                records: "totalCount",
                repeatitems: false
            },
            rownumbers: this.showRowNo || false,
            beforeProcessing: function (data) {
                $.extend(data, data.result);
                Org.comtips.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Org.comtips.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') {
                    Org.showOneToDoWork(Org.comtips.rawRecordsMap[rowid]);
                }
            }
        });
        Org.comtips.comtipsgrid = $("#comtipsGrid");
    },
    batchUpdateComTipTime: function () {
        var ids = Org.comtips.comtipsgrid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.work.model.Orgcomtip",
            ids: ids.join(','),
            updateParams: "fldacctime," + Platform.getCurrentDate(2)
        }, function (r) {
            Org.comtips.comtipsgrid.trigger("reloadGrid");
        });
    },
    deleteToDo: function () {
        var ids = Org.todowork.todogrid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        var hasHit = false;
        $.each(ids, function (index, id) {
            var re = Org.todowork.rawRecordsMap[id];
            if (re.inituserid != loginUser.id) {
                hasHit = true;

            }
        });
        if (hasHit) {
            bootbox.alert('请不要勾选不是您起草的文件');
            return;
        }
        bootbox.confirm("请问,您确定删除吗?", function (r) {
            if (r) {
                var params2 = {
                    ids: ids.join(',')
                };
                Platform.srv("work-softRemoveTask", params2, function (r) {
                    Org.todowork.todogrid.trigger("reloadGrid");
                });
            }
        });

    },
    listWorkView: function () {
        $("#menu").find("li").removeAttr("class");
        $("#workls").attr("class", "active");

        if (Org.workViewzTreeObj)
            Org.workViewzTreeObj.destroy();
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-1 column" id="workViewtreediv">\
            <div>\
            <ul id="workViewtree" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-11 column">\
            <div class="btn-group btn-group-sm" role="group" style="width:100%;">\
            <input type="text" class="form-control" id="workViewsearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:left;">\
            <button class="btn btn-success" id="workViewsearchbutton" style="float:left;">搜索</button>\
            </div>\
            <div style="width: 99.8%"><table id="workViewGrid"></table>\
            <div id="workViewGridPager"></div></div>\
            </div>\
            </div>\
            </div>');
        var treeId = 'workViewtree';
        var setting = {
            edit: {
                autoExpandTrigger: true,
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
                drag: {
                    prev: true,
                    next: true,
                    inner: false
                }
            },
            async: {
                enable: true,
                url: "/service/work-listWorkTree",
                autoParam: ["id", "name=year", "level=lv"],
                dataFilter: filter
            },
            callback: {
                beforeAsync: function (treeId, treeNode) {
                    var obj = this.getZTreeObj(treeId);
                    var params = obj ? obj.setting.async.otherParam : {};
                    params.initunitid = window.loginUser.fldunitid;
                },
                onRightClick: function (e, treeId, treeNode) {

                },
                onAsyncSuccess: function (event, treeId) {
                    if (Org.workViewzTreeObj.isFirstChild) {
                        var zTree = Org.workViewzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.selectNode(nodeList[0].children[0]);
                        if (Org.workViewGrid && Org.workViewGrid.grid) {
                            Org.workViewGrid.grid.trigger("reloadGrid");
                        }
                        Org.workViewzTreeObj.isFirstChild = false;
                    }

                    if (Org.workViewzTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = Org.workViewzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Org.workViewzTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Org.workViewzTreeObj.isFirst = false;
                    }

                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        Org.workViewGrid.grid.trigger("reloadGrid");
                    }
                }
            }
        };

        function filter(treeId, parentNode, responseData) {
            if (responseData.result.length > 0) {
                $.each(responseData.result, function (index, r) {
                    if (r.isParent == 'true') r.isParent = true;
                    else r.isParent = false;
                });
            }
            return responseData.result;
        }

        $("#" + treeId).height($(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20 + 30 + 68);
        Org.workViewzTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        Org.workViewzTreeObj.isFirst = true;
        Org.workViewGrid = {};
        $("#workViewGrid").jqGrid({
            multiselect: true,
            url: '/service/work-listWorks',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {
                notfldstatus: true
            },
            beforeRequest: function () {
                var treeObj = Org.workViewzTreeObj;
                if (!treeObj) return false;
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length > 0) {
                    var grid = $(this).jqGrid();
                    var postData = grid.getGridParam('postData');
                    if (Org.workViewGrid.gridTotalNum && postData.page > Org.workViewGrid.gridTotalNum) {
                        postData.page = Org.workViewGrid.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    Org.workViewGrid.currentPage = postData.page;
                    postData.limit = postData.rows;
                    Org.workViewGrid.rowNum = postData.limit;
                    postData.yearmon = nodes[0].name;
                    if (nodes[0].getParentNode()) {
                        postData.yearmon = nodes[0].getParentNode().name + "-" + postData.yearmon;
                    }
                    postData.initunitid = window.loginUser.fldunitid;
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                    if ($("#workViewsearchinput").val()) {
                        postData.qcon = $("#workViewsearchinput").val();
                    }
                } else {
                    return false;
                }
            },
            colModel: [
                {
                    label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '拟稿人', name: 'initusername', width: 20},
                {label: '拟稿部门', name: 'initbm', width: 50}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#workViewGridPager",
            rowNum: Org.workViewGrid.rowNum || 20,
            rowList: [5, 10, 20, 50, 100, 250, 500, 1000],
            jsonReader: {
                root: "data",
                page: "page",
                total: "pageCount",
                records: "totalCount",
                repeatitems: false
            },
            rownumbers: this.showRowNo || false,
            beforeProcessing: function (data) {
                $.extend(data, data.result);
                Org.workViewGrid.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Org.workViewGrid.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') {
                    var r = {};
                    $.extend(r, Org.workViewGrid.rawRecordsMap[rowid]);
                    r.fldbuk = r.id;
                    Org.showOneToDoWork(r, true);
                }
            }
        });
        Org.workViewGrid.grid = $("#workViewGrid");
        $('#workViewsearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Org.workViewGrid.grid.trigger("reloadGrid");
            }
        });
        $('#workViewsearchbutton').unbind('click').bind('click', function (event) {
            Org.workViewGrid.grid.trigger("reloadGrid");
        });
    },
    showMenmu: function () {
        var html = '<li role="presentation" id="orgbut" onclick="Org.init();"><a href="#">组织机构</a></li>';
        if (window.loginUser.fldgly == '1') {
            $("#menu").append(html);
        }
    },
    updateState: function (formid) {
        var state = $("#" + formid).find('input[id=' + 'state' + ']').val();
        if ("2" == state) {
            var id = $("#" + formid).find('input[id=' + 'id' + ']').val();
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.work.model.Orgwork",
                ids: id,
                state: "null"
            }, function (r) {
            });
        }
    }
}