FlowDesign = {
    init: function () {
        var h = $(window).height();
        $('.flow_work_inner').height(h - 36-52);
        $('.flow_left_tasknode').height(h - 36-52);
        $('.flow_right_property').height(h - 36-52);
        jsPlumb.ready(function () {

        });
        FlowDesign.bindMove();
    },
    uuid16: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + S4() + S4());
    },
    bindMove: function () {
        var jsPlumbinstance = jsPlumb.getInstance();
        FlowDesign.jsPlumbinstance=jsPlumbinstance;
        var connectorPaintStyle = {
            joinstyle: 'round',
            stroke: "#61B7CF",
            strokeWidth: 2
        };
        // 鼠标悬浮在连接线上的样式
        var connectorHoverStyle = {
            stroke: "red",
            strokeWidth: 2,
        };

        var hollowCircle = {
            DragOptions: {cursor: 'pointer', zIndex: 2000},
            endpoint: ["Dot", {radius: 7}],  //端点的形状
            connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
            connectorHoverStyle: connectorHoverStyle,
            paintStyle: {
                stroke: '#1e8151',
                radius: 6,
                strokeWidth: 2
            },        //端点的颜色样式
            isSource: true,    //是否可以拖动（作为连线起点）
            connector: ["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
            isTarget: true,    //是否可以放置（连线终点）
            maxConnections: -1,    // 设置连接点最多可以连接几条线
            connectorOverlays: [["Arrow", {width: 10, length: 10, location: 1}]]
        };

        function nodedown(e, htmldiv, uid, divleft, divtop) {
            var moreE = null;
            var _x, _y;//鼠标离控件左上角的相对位置
            e.preventDefault();
            $('body').append(htmldiv);
            _x = e.pageX - parseInt(divleft);
            _y = e.pageY - parseInt(divtop);
            moreE = "#" + uid;
            $(moreE).css({
                'left': _x,
                'top': _y
            });
            $(moreE).show();

            $(document).unbind("mousemove").unbind("mouseup");
            $(document).mousemove(function (e) {
                var x = (e.pageX - 50) + 'px';
                var y = (e.pageY - 20) + 'px';
                if (moreE) {
                    $(moreE).css({
                        'left': x,
                        'top': y
                    })
                }
            }).mouseup(function () {
                $(moreE).appendTo("#flow_work_inner");
                var nowX = parseInt($(moreE).css("left"));
                var nowY = parseInt($(moreE).css("top"));
                nowX = nowX - ($(window).width() - $('.container').width()) - $('.container').width() * 2 / 12;
                $(moreE).css({
                    'left': nowX,
                    'top': nowY-52-30
                });

                jsPlumbinstance.draggable(uid, {
                    containment: "parent"
                });

                jsPlumbinstance.addEndpoint(uid, {anchors: "TopCenter"}, hollowCircle);
                jsPlumbinstance.addEndpoint(uid, {anchors: "RightMiddle"}, hollowCircle);
                jsPlumbinstance.addEndpoint(uid, {anchors: "BottomCenter"}, hollowCircle);
                jsPlumbinstance.addEndpoint(uid, {anchors: "LeftMiddle"}, hollowCircle);
                $(document).unbind("mousemove").unbind("mouseup");
            });

            //开始节点绑定右键
            FlowDesign.bindNodesClick();
            $(document).click(function () {
                $("#flowrightmemu").hide();
            });
        }

        $("#startdiv").unbind("mousedown").mousedown(function (e) {
            var uid = "startnode" + FlowDesign.uuid16();
            var htmldiv = '<div name="flow_start_node_div" class="list-group flow_start_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                '    <a href="#" class="btn btn-primary">开始</a>\n' +
                '</div>';
            var divleft = $("#startdiv").css("left");
            var divtop = $("#startdiv").css("top");
            nodedown(e, htmldiv, uid, divleft, divtop);
        });

        $("#enddiv").unbind("mousedown").mousedown(function (e) {
            var uid = "endnode" + FlowDesign.uuid16();
            var htmldiv = '<div name="flow_end_node_div" class="list-group flow_end_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                '    <a href="#" class="btn btn-primary">结束</a>\n' +
                '</div>';
            var divleft = $("#enddiv").css("left");
            var divtop = $("#enddiv").css("top");
            nodedown(e, htmldiv, uid, divleft, divtop);
        });

        $("#taskdiv").unbind("mousedown").mousedown(function (e) {
            var uid = "tasknode" + FlowDesign.uuid16();
            var htmldiv = '<div name="flow_task_node_div" class="list-group flow_task_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                '    <a href="#" class="btn btn-primary">用户任务</a>\n' +
                '</div>';
            var divleft = $("#taskdiv").css("left");
            var divtop = $("#taskdiv").css("top");
            nodedown(e, htmldiv, uid, divleft, divtop);
        });

        jsPlumbinstance.unbind("connection").bind("connection", function (conn, originalEvent) {
            //查看被连接的两个点间是否已经连接过
            var conns = jsPlumbinstance.getConnections({
                source: conn.connection.sourceId,
                target: conn.connection.targetId
            });
            //如果大于1条，则不在进行连接
            if (conns.length > 1) {
                jsPlumbinstance.deleteConnection(conn.connection);
                return;
            }
            var lineId = "line" + FlowDesign.uuid16();
            conn.connection.setParameter("id", lineId);
        });
        jsPlumbinstance.unbind("click").bind("click", function (conn, originalEvent) {
            var connid=conn.getParameter("id");
            $("div[name=flow_task_node_div]").find('a').css('background-color','#337ab7');
            FlowDesign.showFp(connid);
        });
        //contextmenu
        jsPlumbinstance.unbind("contextmenu").bind("contextmenu", function (conn, originalEvent) {
            var memu = '\
                         <ul id="flowditrightmemu" class="dropdown-menu" style="display: none;min-width: 80px;">\
                            <li action="del"><a href="#">删除</a></li>\
                          </ul>\
                        ';
            if ($('#flowditrightmemu').length == 0) {
                $('body').append(memu);
            }
            $('#flowditrightmemu').css('left', originalEvent.clientX + 'px');
            $('#flowditrightmemu').css('top', originalEvent.clientY + 'px');
            $('#flowditrightmemu').show();
            $('#flowrightmemu').hide();
            $('#flowditrightmemu').find('li').unbind('click').click(function () {
                var action = $(this).attr('action');
                if ("del" == action) {
                    if (confirm("确定要删除吗?")) {
                        jsPlumbinstance.deleteConnection(conn);
                    }
                }
            });

            $("#flowditrightmemu").unbind('mouseleave').on('mouseleave', function () {
                $(this).hide();
                return false;
            });
            originalEvent.preventDefault();
            return false;
        });
        $("#flow_work_inner").unbind("click").click(function () {
             FlowDesign.showAp();
        });
    },
    bindNodesClick:function(){

        function rightDel(e) {
            var memu = '\
                         <ul id="flowrightmemu" class="dropdown-menu" style="display: none;min-width: 80px;">\
                            <li action="del"><a href="#">删除</a></li>\
                          </ul>\
                        ';
            if ($('#flowrightmemu').length == 0) {
                $('body').append(memu);
            }
            var nodeId = $(e.target).attr("id");
            if (!nodeId) nodeId = $(e.target).parent().attr("id");
            $('#flowrightmemu').css('left', e.clientX + 'px');
            $('#flowrightmemu').css('top', e.clientY + 'px');
            $('#flowrightmemu').show();
            $('#flowditrightmemu').hide();
            $('#flowrightmemu').find('li').unbind('click').click(function () {
                var action = $(this).attr('action');
                if ("del" == action) {
                    if (confirm("确定要删除吗?")) {
                        FlowDesign.jsPlumbinstance.removeAllEndpoints(nodeId);
                        $("#" + nodeId).remove();
                    }
                }
            });

            $("#flowrightmemu").unbind('mouseleave').on('mouseleave', function () {
                $(this).hide();
                return false;
            });

        }

        $("div[name=flow_start_node_div]").unbind(".contextmenu").bind("contextmenu", function (e) {
            rightDel(e);
            return false;
        });
        $("div[name=flow_task_node_div]").unbind(".contextmenu").bind("contextmenu", function (e) {
            rightDel(e);
            return false;
        });
        $("div[name=flow_task_node_div]").unbind("click").click(function (e) {
            var taskid=$(this).attr("id");//#337ab7
            $("div[name=flow_task_node_div]").find('a').css('background-color','#337ab7');
            $(this).find('a').css('background-color','red');
            FlowDesign.showTp(taskid);
            return false;
        });
        $("div[name=flow_end_node_div]").unbind(".contextmenu").bind("contextmenu", function (e) {
            rightDel(e);
            return false;
        });

    },
    flowset: function () {
        $("#menu").find("li").removeAttr("class");
        $("#columnset").attr("class", "active");
        var treeId = 'treeDept';
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-2 column" id="orgbuttondiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="...">\
            <button type="button" class="btn btn-primary" onclick="FlowDesign.addCatB();">新建</button>\
            <button type="button" class="btn btn-success" onclick="FlowDesign.editCatB();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="FlowDesign.delCatB();">删除</button>\
            </div>\
            <div>\
            <ul id="treeDept" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-10 column">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button type="button" class="btn btn-primary" onclick="FlowDesign.addFlow();">新建</button>\
            <button type="button" class="btn btn-success" onclick="FlowDesign.editData();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="FlowDesign.delFlowd();">删除</button>\
            <button type="button" class="btn btn-info" onclick="FlowDesign.sort();">排序</button>\
            <button type="button" class="btn btn-info" onclick="FlowDesign.sortUp();">上移</button>\
            <button type="button" class="btn btn-info" onclick="FlowDesign.sortDown();">下移</button>\
            <button type="button" class="btn btn-primary" onclick="FlowDesign.viewHisFlow();">历史版本</button>\
            <button type="button" class="btn btn-primary" onclick="FlowDesign.movelm();">移动栏目</button>\
            <button class="btn btn-success" id="usersearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="usersearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width:99.8%;"><table id="peopleGrid"></table>\
            <div id="peopleGridPager"></div></div>\
            </div>\
            </div>\
            </div>');
        if (FlowDesign.zTreeObj) {
            FlowDesign.zTreeObj.destroy();
            FlowDesign.zTreeObj=null;
        }
        FlowDesign.initgrid();
        FlowDesign.initCattree(treeId);
    },
    initCattree: function (treeId) {
        if (FlowDesign.zTreeObj) {
            FlowDesign.zTreeObj.destroy();
            FlowDesign.zTreeObj=null;
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
                url: "/service/flowd-listFlowCat",
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
                    var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
                    if (!nodes2 || nodes2.length == 0) {
                        $('#orgmemu').find('li').eq(1).hide();
                        $('#orgmemu').find('li').eq(2).hide();
                    } else {
                        $('#orgmemu').find('li').eq(1).show();
                        $('#orgmemu').find('li').eq(2).show();
                    }
                    $('#orgmemu').show();
                    $('#orgmemu').find('li').unbind('click').click(function () {

                        var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
                        var node;
                        if (nodes2 && nodes2.length > 0) {
                            node = nodes2[0];
                        }
                        var action = $(this).attr('action');
                        if ("add" == action) {
                            FlowDesign.addCat(null, node);
                        }
                        if ("edit" == action) {
                            if (nodes2[0]) {
                                FlowDesign.addCat(nodes2[0].id, null, true);
                            }
                        }
                        if ("del" == action) {
                            if (nodes2[0]) {
                                FlowDesign.delCat(nodes2[0]);
                            }
                        }
                    });

                    $("#orgmemu").unbind('mouseleave').on('mouseleave', function () {
                        $(this).hide();
                        return false;
                    });
                },
                onAsyncSuccess: function (event, treeId) {
                    if (FlowDesign.zTreeObj.isFirstChild) {
                        var zTree = FlowDesign.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        if(nodeList&&nodeList[0]&&nodeList[0].children[0])
                            zTree.selectNode(nodeList[0].children[0]);
                        else if(nodeList&&nodeList[0])
                            zTree.selectNode(nodeList[0]);

                        if (FlowDesign.flowd && FlowDesign.flowd.grid) {
                            FlowDesign.flowd.grid.trigger("reloadGrid");
                        }
                        FlowDesign.zTreeObj.isFirstChild = false;
                    }

                    if (FlowDesign.zTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = FlowDesign.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        if(nodeList&&nodeList[0]){
                            if(nodeList[0].isParent){
                                zTree.expandNode(nodeList[0], true);
                            }else{
                                zTree.selectNode(nodeList[0]);
                                if (FlowDesign.flowd && FlowDesign.flowd.grid) {
                                    FlowDesign.flowd.grid.trigger("reloadGrid");
                                }
                            }
                        }
                        FlowDesign.zTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        FlowDesign.zTreeObj.isFirst = false;
                    }

                },
                onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    if (!targetNode) return;
                    if (treeNodes[0].getParentNode()) {
                        var children = treeNodes[0].getParentNode().children;
                        if (children && children.length > 0) {
                            var updateM = [];
                            var fldparentid = treeNodes[0].getParentNode().id;
                            var fldparentname = treeNodes[0].getParentNode().name;
                            $.each(children, function (i, n) {
                                updateM.push({
                                    id: n.id,
                                    fldsn: (i + 1),
                                    fldparentid: fldparentid,
                                    fldparentname: fldparentname
                                });
                            })
                            Platform.srv("flowd-updateCatfldsn", updateM, function (r) {

                            });
                        }
                    } else {
                        var zTree = FlowDesign.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        var updateM = [];
                        $.each(nodeList, function (i, n) {
                            updateM.push({id: n.id, fldsn: (i + 1), fldparentid: "", fldparentname: ""});
                        });
                        Platform.srv("flowd-updateCatfldsn", updateM, function (r) {

                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        FlowDesign.flowd.grid.trigger("reloadGrid");
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
        FlowDesign.zTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        FlowDesign.zTreeObj.isFirst = true;
        $(document).click(function () {
            $("#orgmemu").hide();
        });
    },
    initgrid: function () {
        FlowDesign.flowd = {};
        $("#peopleGrid").jqGrid({
            multiselect: true,
            url: '/service/flowd-listFlowD',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {},
            beforeRequest: function () {
                var treeObj = FlowDesign.zTreeObj;
                if (!treeObj) return false;
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');

                var nodes = treeObj.getSelectedNodes();
                if ($("#usersearchinput").val()) {
                    postData.qcon = $("#usersearchinput").val();
                    postData.start = 0;
                    FlowDesign.flowd.currentPage = 1;
                    postData.limit = postData.rows;
                    delete postData.fldlmid;
                }
                else if (nodes.length > 0) {
                    if (FlowDesign.flowd.gridTotalNum && postData.page > FlowDesign.flowd.gridTotalNum) {
                        postData.page = FlowDesign.flowd.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    FlowDesign.flowd.currentPage = postData.page;
                    postData.limit = postData.rows;
                    FlowDesign.flowd.rowNum = postData.limit;
                    postData.fldcatid = nodes[0].id;
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                } else {
                    return false;
                }
            },
            colModel: [
                {label: '序号', name: 'fldsn', width: 30},
                {
                    label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                    }
                },
                {label: '版本', name: 'fldver', width: 100},
                {label: '创建人', name: 'initusername', width: 100},
                {label: '创建时间', name: 'fldngdate', width: 80, formatter: function (cellValue, options, rowObject) {
                        if (cellValue) return cellValue.substring(0, 10);
                        return '';
                    }
                },
                {label: '修改人', name: 'fldmdusername', width: 100},
                {label: '修改时间', name: 'fldmddate', width: 80, formatter: function (cellValue, options, rowObject) {
                        if (cellValue) return cellValue.substring(0, 10);
                        return '';
                    }
                }
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#peopleGridPager",
            rowNum: FlowDesign.flowd.rowNum || 20,
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
                FlowDesign.flowd.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        FlowDesign.flowd.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '2') {
                    FlowDesign.addFlow(FlowDesign.flowd.rawRecordsMap[rowid]);
                }
            }
        });
        FlowDesign.flowd.grid = $("#peopleGrid");

        $('#usersearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                FlowDesign.flowd.grid.trigger("reloadGrid");
            }
        });
        $('#usersearchbutton').unbind('click').bind('click', function (event) {
            FlowDesign.flowd.grid.trigger("reloadGrid");
        });
    },
    addCat: function (treeId, treeNode, edit,freshall) {
        Platform.hrv('/jsplumb/form/cat.html', function (html) {
            var oldfldpic = '';
            var formid = 'deptfrom';
            var title = '新增分类';
            if (treeId)
                title = '编辑分类';
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
                                alert("请输入分类名称");
                                return;
                            }
                            var fromValues = Platform.getFromValues(formid);
                            Platform.srv("flowd-saveCat", fromValues, function (r) {

                                var treeObj = FlowDesign.zTreeObj;
                                var nodes = treeObj.getSelectedNodes();
                                if(freshall){
                                    treeObj.isFirst = true;
                                    treeObj.reAsyncChildNodes(null, "refresh");
                                }
                                else if (nodes.length > 0) {
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
                                d.close().remove();

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
                    className: "com.yyj.apps.flowd.model.Flowcatalog",
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
                        fldparentname: treeNode.fldname,
                        state: '1',
                        fldngdate: Platform.getCurrentDate(2),
                    }
                    Platform.setFromValues(fromV, formid);
                } else {
                    var fromV = {
                        state: '1',
                        fldngdate: Platform.getCurrentDate(2)
                    }
                    Platform.setFromValues(fromV, formid);
                }
                //设置序号值
                Platform.srv("flowd-getMaxCatSn", maxSn, function (r) {
                    if (r && r > 0)
                        $('#' + formid).find('#fldsn').val(r + 1);
                    else
                        $('#' + formid).find('#fldsn').val(1);
                });
                $("#" + formid).find('input[id=' + 'initbmid' + ']').val(window.loginUser.bmid);
                $("#" + formid).find('input[id=' + 'initbm' + ']').val(window.loginUser.bmname);
                $("#" + formid).find('input[id=' + 'initdeptid' + ']').val(window.loginUser.deptid);
                $("#" + formid).find('input[id=' + 'initdeptname' + ']').val(window.loginUser.deptname);
                $("#" + formid).find('input[id=' + 'initunitid' + ']').val(window.loginUser.unitid);
                $("#" + formid).find('input[id=' + 'initunitname' + ']').val(window.loginUser.unitname);
                $("#" + formid).find('input[id=' + 'inituserid' + ']').val(window.loginUser.id);
                $("#" + formid).find('input[id=' + 'initusername' + ']').val(window.loginUser.fldname);
            }
        });
    },
    delCat: function (treeNode) {
        if (treeNode && treeNode.id) {
            //设置序号值
            bootbox.confirm("确定要删除该分类和该分类所属子分类吗？", function (result) {

                if (result) {
                    Platform.srv("flowd-delCat", {deptid: treeNode.id}, function (r) {

                        var treeObj = FlowDesign.zTreeObj;
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
    addCatB: function () {
        FlowDesign.addCat();
    },
    editCatB: function () {
        var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
        if (nodes2 &&nodes2[0]) {
            FlowDesign.addCat(nodes2[0].id, null, true);
        }
    },
    delCatB: function () {
        var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
        if (nodes2 &&nodes2[0]) {
            FlowDesign.delCat(nodes2[0]);
        }
    },
    addFlow:function (record,editmode) {
        if(record){
            FlowDesign.flowdata={};
            FlowDesign.oldflowdata={};
            $.extend(FlowDesign.flowdata,record);
            delete FlowDesign.flowdata.fldcontent;
            $.extend(FlowDesign.flowdata,JSON.parse(record.fldcontent));
            $.extend(FlowDesign.oldflowdata,FlowDesign.flowdata);
        }else{
            var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
            if (nodes2 && nodes2.length > 0) {
                FlowDesign.flowdata={
                    fldcatid:nodes2[0].id,
                    fldcatname:nodes2[0].name
                }
            }
        }
        if (FlowDesign.zTreeObj) {
            FlowDesign.zTreeObj.destroy();
        }
        Platform.hrv('/jsplumb/form/flowd.html', function (html) {
            $('div[name=content]').html("");
            $('div[name=content]').html(html);
            FlowDesign.init();
            FlowDesign.showAp();
            if(record){
                FlowDesign.loadFlowData();
                FlowDesign.bindNodesClick();
            }
        });
    },
    showAp:function () {
        var formid="flowAp";
        FlowDesign.saveFlowPd();
        Platform.hrv('/jsplumb/form/flowAp.html', function (html) {
            $('div[name=property]').html("");
            $('div[name=property]').html(html);
            Platform.setFromValues(FlowDesign.flowdata,formid);
            $("#fldcatbutton").unbind("click").click(function () {
                var treehtml = '<div>\
                <ul id="treeCatChose" class="ztree"></ul>\
                </div>';
                var treed = dialog({
                    title: '选择分类',
                    width: 280,
                    height: 180,
                    content: treehtml,
                    button: [
                        {
                            value: '确定',
                            callback: function () {
                                var treeObj = treeCatChose;
                                var nodes = treeObj.getSelectedNodes();
                                if (nodes&&nodes.length > 0) {
                                    $("#fldcatid").val(nodes[0].id);
                                    FlowDesign.flowdata.fldcatid=nodes[0].id;
                                    $("#fldcatname").val(nodes[0].name);
                                    FlowDesign.flowdata.fldcatname=nodes[0].name;
                                } else {
                                    bootbox.alert("请选择一个分类");
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
                var treeId = 'treeCatChose';
                var treeCatChose = FlowDesign.getCatTree(treeId);
            })
        });
    },
    getCatTree: function (treeId, nodeselectCallback) {
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
                url: "/service/flowd-listFlowCat",
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
    showTp:function (taskid) {
        var formid="flowTp_"+taskid;
        FlowDesign.saveFlowPd();
        Platform.hrv('/jsplumb/form/flowTp.html', function (html) {
            $('div[name=property]').html("");
            $('div[name=property]').html(html);
            $("div[name=property] #flowTp").attr("id",formid);
            if(FlowDesign.flowdata[formid])
            Platform.setFromValues(FlowDesign.flowdata[formid],formid);
            $("#fldflowTaskname").unbind("change").change(function () {
                 var text=$(this).val();
                 $('#'+taskid).find("a").text(text);
                 FlowDesign.jsPlumbinstance.repaintEverything();
                 //FlowDesign.repaint();
            });
        });
    },
    showFp:function (taskid) {
        var formid="flowFp_"+taskid;
        FlowDesign.saveFlowPd();
        Platform.hrv('/jsplumb/form/flowFp.html', function (html) {
            $('div[name=property]').html("");
            $('div[name=property]').html(html);
            $("div[name=property] #flowFp").attr("id",formid);
            if(FlowDesign.flowdata[formid])
                Platform.setFromValues(FlowDesign.flowdata[formid],formid);
        });
    },
    saveFlowPd:function () {
        var divp=$('div[name=property]').find("div");
        if(divp&&divp.length>0){
            var divpid=divp.attr("id");
            if(divpid=='flowAp'){
                if($("#"+divpid)&&$("#"+divpid).length>0){
                    var vals = Platform.getFromValues(divpid);
                    $.extend(FlowDesign.flowdata, vals);
                }
            }
            if(divpid.indexOf("flowTp_")!=-1){
                if(!FlowDesign.flowdata[divpid]){
                    FlowDesign.flowdata[divpid]={};
                }
                if($("#"+divpid)&&$("#"+divpid).length>0){
                    var vals = Platform.getFromValues(divpid);
                    $.extend(FlowDesign.flowdata[divpid], vals);
                }
            }
            if(divpid.indexOf("flowFp_")!=-1){
                if(!FlowDesign.flowdata[divpid]){
                    FlowDesign.flowdata[divpid]={};
                }
                if($("#"+divpid)&&$("#"+divpid).length>0){
                    var vals = Platform.getFromValues(divpid);
                    $.extend(FlowDesign.flowdata[divpid], vals);
                }
            }
        }
    },
    loadFlowData:function () {
        var nodes=[];
        var connections=[];
        if(FlowDesign.flowdata&&FlowDesign.flowdata.nodes){
            nodes=FlowDesign.flowdata.nodes;
        }
        if(FlowDesign.flowdata&&FlowDesign.flowdata.connections){
            connections=FlowDesign.flowdata.connections;
        }
        if(nodes.length==0&&connections.length==0) return;
        //重画流程
        var connectorPaintStyle = {
            joinstyle: 'round',
            stroke: "#61B7CF",
            strokeWidth: 2
        };
        // 鼠标悬浮在连接线上的样式
        var connectorHoverStyle = {
            stroke: "red",
            strokeWidth: 2,
        };

        var hollowCircle = {
            DragOptions: {cursor: 'pointer', zIndex: 2000},
            endpoint: ["Dot", {radius: 7}],  //端点的形状
            connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
            connectorHoverStyle: connectorHoverStyle,
            paintStyle: {
                stroke: '#1e8151',
                radius: 6,
                strokeWidth: 2
            },        //端点的颜色样式
            isSource: true,    //是否可以拖动（作为连线起点）
            connector: ["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
            isTarget: true,    //是否可以放置（连线终点）
            maxConnections: -1,    // 设置连接点最多可以连接几条线
            connectorOverlays: [["Arrow", {width: 10, length: 10, location: 1}]]
        };

        FlowDesign.jsPlumbinstance.empty("flow_work_inner");
      //  FlowDesign.jsPlumbinstance = jsPlumb.getInstance();
        $("#flow_work_inner").html("");
        $.each(nodes, function( index, elem ) {
            var htmldiv;
            var uid=elem.blockId;
            if(elem.nodetype === 'flow_start_node_div'){
                htmldiv = '<div name="flow_start_node_div" id="'+elem.blockId+'" class="list-group flow_start_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                    '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                    '</div>';
            }else if(elem.nodetype === 'flow_task_node_div'){
                htmldiv = '<div name="flow_task_node_div" id="'+elem.blockId+'"  class="list-group flow_task_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                    '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                    '</div>';
            }else if(elem.nodetype === 'flow_end_node_div'){
                htmldiv = '<div name="flow_end_node_div" id="'+elem.blockId+'"  class="list-group flow_end_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                    '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                    '</div>';
            }
            $(htmldiv).appendTo("#flow_work_inner");
            $("#"+elem.blockId).css({
                'left': elem.positionX,
                'top': elem.positionY
            });
            $("#"+elem.blockId).show();

            FlowDesign.jsPlumbinstance.draggable(uid, {
               containment: "parent"
            });

            FlowDesign.jsPlumbinstance.addEndpoint(uid, {anchors: "TopCenter"}, hollowCircle);
            FlowDesign.jsPlumbinstance.addEndpoint(uid, {anchors: "RightMiddle"}, hollowCircle);
            FlowDesign.jsPlumbinstance.addEndpoint(uid, {anchors: "BottomCenter"}, hollowCircle);
            FlowDesign.jsPlumbinstance.addEndpoint(uid, {anchors: "LeftMiddle"}, hollowCircle);
        });
        var stateMachineConnector = {
            //连接器
            connector:["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],
            //连接器样式
            paintStyle: connectorPaintStyle,
            //鼠标悬浮样式
            hoverPaintStyle:connectorHoverStyle,
            //端点为空
            endpoint:"Blank",
            //锚位置
            anchor:"Continuous",
            //覆盖物
            overlays: [["Arrow", {width: 10, length: 10, location: 1}]]
        };
        $.each(connections, function( index, elem ) {
            var connection1 = FlowDesign.jsPlumbinstance.connect({
                source: elem.pageSourceId,
                target: elem.pageTargetId,
                anchors: elem.anchors
            },stateMachineConnector);
            connection1.setParameter("id",elem.connectionlineId);
        });
    },
    getNodes:function(){
        var nodes = [];
        var startdiv=$("#flow_work_inner").find("div[name=flow_start_node_div]");
        //flow_task_node_div
        var taskdiv=$("#flow_work_inner").find("div[name=flow_task_node_div]");
        //flow_end_node_div
        var enddiv=$("#flow_work_inner").find("div[name=flow_end_node_div]");
        function getnodes(idx, elem) {
            var $elem = $(elem);
            nodes.push({
                blockId: $elem.attr('id'),
                nodetype: $elem.attr('name'),
                nodetext: $elem.find('a').text(),
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10)
            });
        }
        if(startdiv.length>0){
            startdiv.each(function (idx, elem) {
                getnodes(idx,elem);
            });
        }
        if(taskdiv.length>0){
            taskdiv.each(function (idx, elem) {
                getnodes(idx,elem);
            });
        }
        if(enddiv.length>0){
            enddiv.each(function (idx, elem) {
                getnodes(idx,elem);
            });
        }
        return nodes;
    },
    getConnections:function(){
        var connections=[];
        $.each(FlowDesign.jsPlumbinstance.getConnections(), function (idx, connection) {
            connections.push({
                connectionlineId:connection.getParameter("id"),
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId,
                anchors: $.map(connection.endpoints, function(endpoint) {

                    return [[endpoint.anchor.x,
                        endpoint.anchor.y,
                        endpoint.anchor.orientation[0],
                        endpoint.anchor.orientation[1],
                        endpoint.anchor.offsets[0],
                        endpoint.anchor.offsets[1]]];

                })
            });
        });
        return connections;
    },
    saveData:function () {
        if(!FlowDesign.flowdata||!FlowDesign.flowdata.fldflowname){
            bootbox.alert("请填写流程名称");
            return;
        }
        var nodes=FlowDesign.getNodes();
        var connections=FlowDesign.getConnections();
        var dModel={};
        if(!FlowDesign.flowdata.id){
            FlowDesign.flowdata.nodes=nodes;
            FlowDesign.flowdata.connections=connections;
            dModel={
                fldngdate:Platform.getCurrentDate(),
                fldcontent:JSON.stringify(FlowDesign.flowdata),
                fldsn:1,
                fldver:1,
                state:"1"
            };
            dModel.initbmid=window.loginUser.bmid;
            dModel.initbm=window.loginUser.bmname;
            dModel.initdeptid=window.loginUser.deptid;
            dModel.initdeptname=window.loginUser.deptname;
            dModel.initunitid=window.loginUser.unitid;
            dModel.initunitname=window.loginUser.unitname;
            dModel.inituserid=window.loginUser.id;
            dModel.initusername=window.loginUser.fldname;
            dModel.fldtype=Platform.uuid();
        }else{
            var oldnodes=FlowDesign.oldflowdata.nodes;
            var oldconnections=FlowDesign.oldflowdata.connections;
            var change=false;
            if((oldnodes.length!=nodes.length)||(oldconnections.length!=connections.length)){
                change=true;
            }else{
                var oldnodeids=[];
                var oldconids=[];
                $.each(oldnodes,function(index,value){
                    oldnodeids.push(value.id);
                });
                $.each(nodes,function (index,value) {
                    if(oldnodeids.indexOf(value.id)==-1){
                        change=true;
                    }
                });
                $.each(oldconnections,function(index,value){
                    oldconids.push(value.id);
                });
                $.each(connections,function (index,value) {
                    if(oldconids.indexOf(value.id)==-1){
                        change=true;
                    }
                });

            }
            if(change){
                FlowDesign.flowdata.fldver=parseInt(FlowDesign.flowdata.fldver)+1;
                FlowDesign.flowdata.id=Platform.uuid();
            }
            delete FlowDesign.flowdata.nodes;
            delete FlowDesign.flowdata.connections;
            $.extend(dModel,FlowDesign.flowdata);
            FlowDesign.flowdata.nodes=nodes;
            FlowDesign.flowdata.connections=connections;
            dModel.fldcontent=JSON.stringify(FlowDesign.flowdata);
            for(var key in dModel){
                if(key.indexOf("flowFp_line")!=-1||key.indexOf("flowTp_tasknode")!=-1)
                {
                    delete dModel[key];
                }
            }
        }
        dModel.fldtm=FlowDesign.flowdata.fldflowname;
        dModel.fldcatid=FlowDesign.flowdata.fldcatid;
        dModel.fldmduserid=window.loginUser.id;
        dModel.fldmdusername=window.loginUser.fldname;
        dModel.fldmddate=Platform.getCurrentDate(),
        Platform.srv("flowd-saveFlowD", dModel, function (r) {
            FlowDesign.flowset();
        });
    },
    editData:function(){
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length > 1||ids.length==0) {
            bootbox.alert('请选择一条数据');
            return;
        } else {
            FlowDesign.addFlow(FlowDesign.flowd.rawRecordsMap[ids[0]]);
        }
    },
    delFlowd: function () {
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.flowd.model.Flowdef",
            ids: ids.join(','),
            state: "3"
        }, function (r) {
            FlowDesign.flowd.grid.trigger("reloadGrid");
        });
    },
    closeFd:function () {
        FlowDesign.flowset();
    },
    showData:function (flowdata) {
        var h = $(window).height();
        var hstr="";
        var formatJson = function(msg) {
            var rep = "~";
            var jsonStr = JSON.stringify(msg, null, rep)
            var str = "";
            for (var i = 0; i < jsonStr.length; i++) {
                var text2 = jsonStr.charAt(i)
                if (i > 1) {
                    var text = jsonStr.charAt(i - 1)
                    if (rep != text && rep == text2) {
                        str += "<br/>"
                    }
                }
                str += text2;
            }
            jsonStr = "";
            for (var i = 0; i < str.length; i++) {
                var text = str.charAt(i);
                if (rep == text)
                    jsonStr += "    "
                else {
                    jsonStr += text;
                }
                if (i == str.length - 2)
                    jsonStr += "<br/>"
            }
            return jsonStr;
        }
        hstr="<div id='jsondata'>"+(flowdata?formatJson(flowdata):formatJson(FlowDesign.flowdata))+"</div>";
        var treed = dialog({
            title: '流程数据',
            width: 880,
            height: h-50-54-40-4,
            content: hstr,
            button: [
                {
                    value: '关闭',
                    callback: function () {
                    }
                }
            ]
        });
        treed.show();
        $('#jsondata').closest('.ui-dialog-body').css('overflow','auto');
    },
    lookData:function(flowdata){
        var h = $(window).height();
        Platform.hrv('/jsplumb/form/flowL.html', function (html) {
            var jsPlumbinstanceL = jsPlumb.getInstance();
            var flowLd = dialog({
                title: '流程图',
                width: 880,
                height: h-50-54-40-4,
                content: html,
                button: [
                    {
                        value: '关闭',
                        callback: function () {
                            jsPlumbinstanceL.clear();
                        }
                    }
                ]
            });
            flowLd.show();
            var nodes=flowdata?flowdata.nodes:FlowDesign.getNodes();
            var connections=flowdata?flowdata.connections:FlowDesign.getConnections();
            if(nodes.length==0&&connections.length==0) return;
            //重画流程
            var connectorPaintStyle = {
                joinstyle: 'round',
                stroke: "#61B7CF",
                strokeWidth: 2
            };
            // 鼠标悬浮在连接线上的样式
            var connectorHoverStyle = {
                stroke: "red",
                strokeWidth: 2,
            };

            var hollowCircle = {
                DragOptions: {cursor: 'pointer', zIndex: 2000},
                endpoint: ["Dot", {radius: 7}],  //端点的形状
                connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
                connectorHoverStyle: connectorHoverStyle,
                paintStyle: {
                    stroke: '#1e8151',
                    radius: 6,
                    strokeWidth: 2
                },        //端点的颜色样式
                isSource: true,    //是否可以拖动（作为连线起点）
                connector: ["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
                isTarget: true,    //是否可以放置（连线终点）
                maxConnections: -1,    // 设置连接点最多可以连接几条线
                connectorOverlays: [["Arrow", {width: 10, length: 10, location: 1}]]
            };

            jsPlumbinstanceL.empty("flow_work_inner_l");
            $("#flow_work_inner_l").html("");
            $.each(nodes, function(index, elem ) {
                var htmldiv;
                var uid=elem.blockId+"L";
                if(elem.nodetype === 'flow_start_node_div'){
                    htmldiv = '<div name="flow_start_node_div" class="list-group flow_start_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }else if(elem.nodetype === 'flow_task_node_div'){
                    htmldiv = '<div name="flow_task_node_div"  class="list-group flow_task_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }else if(elem.nodetype === 'flow_end_node_div'){
                    htmldiv = '<div name="flow_end_node_div"  class="list-group flow_end_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }
                $(htmldiv).appendTo("#flow_work_inner_l");
                $("#"+uid).css({
                    'left': elem.positionX,
                    'top': elem.positionY
                });
                $("#"+uid).show();
             });
            var stateMachineConnector = {
                //连接器
                connector:["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],
                //连接器样式
                paintStyle: connectorPaintStyle,
                //鼠标悬浮样式
                hoverPaintStyle:connectorHoverStyle,
                //端点为空
                endpoint:"Blank",
                //锚位置
                anchor:"Continuous",
                //覆盖物
                overlays: [["Arrow", {width: 10, length: 10, location: 1}]]
            };
            $.each(connections, function( index, elem ) {
                var connection1 = jsPlumbinstanceL.connect({
                    source: elem.pageSourceId+"L",
                    target: elem.pageTargetId+"L",
                    anchors: elem.anchors
                },stateMachineConnector);
            });
        });
    },
    sort: function () {
        var nodes2 = FlowDesign.zTreeObj.getSelectedNodes();
        if (nodes2 && nodes2.length > 0) {
            Platform.srv("flowd-sortFlowD", {colid: nodes2[0].id}, function (r) {
                FlowDesign.flowd.grid.trigger("reloadGrid");
            });
        }
    },
    sortUp: function () {
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (FlowDesign.flowd.rawRecordsMap[ids[0]]) {
            var r = FlowDesign.flowd.rawRecordsMap[ids[0]];
            var params = {
                id:r.id,
                fldlmid: r.fldcatid,
                fldsn: r.fldsn
            };
            Platform.srv("flowd-sortUp", params, function (r) {
                FlowDesign.flowd.grid.trigger("reloadGrid");
            });
        }
    },
    sortDown: function () {
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (FlowDesign.flowd.rawRecordsMap[ids[0]]) {
            var r = FlowDesign.flowd.rawRecordsMap[ids[0]];
            var params = {
                id:r.id,
                fldlmid: r.fldcatid,
                fldsn: r.fldsn,
                down: '1'
            };
            Platform.srv("flowd-sortUp", params, function (r) {
                FlowDesign.flowd.grid.trigger("reloadGrid");
            });
        }
    },
    movelm:function(){
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择至少一条数据');
            return;
        }
        var treehtml = '<div>\
                <ul id="treeColChose" class="ztree"></ul>\
                </div>';
        var treed = dialog({
            title: '选择分类',
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
                            var fldlmid=nodes[0].id;
                            Platform.srv("commonservice-updateByIds", {
                                className: "com.yyj.apps.flowd.model.Flowdef",
                                ids: ids.join(','),
                                fldcatid:fldlmid
                            }, function (r) {
                                FlowDesign.flowd.grid.trigger("reloadGrid");
                            });
                        } else {
                            alert("请选择一个分类");
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
        var treeId = 'treeColChose';
        var treeDeptChose = FlowDesign.getColTree(treeId);
    },
    getColTree: function (treeId, nodeselectCallback) {
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
                url: "/service/flowd-listFlowCat",
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
    viewHisFlow: function () {
        var params={};
        var ids = FlowDesign.flowd.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择至少一条数据');
            return;
        }if (FlowDesign.flowd.rawRecordsMap[ids[0]]) {
            var r = FlowDesign.flowd.rawRecordsMap[ids[0]];
            params.fldtype=r.fldtype;
            params.state="2";
            params.orderby="order by fldver desc";
        }

        var w = 1000;
        var h = 500;
        var d = dialog({
            title: '流程历史版本',
            width: w,
            height: h,
            content: '<div class="" id="hisChatgriddiv" style="margin: -20px;">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button class="btn btn-success" id="hisChatsearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="hisChatsearchinput" placeholder="标题,流程内容,版本" style="height:30px;width:300px;float:right;">\
            </div>\
            <table id="hisChatGrid"></table>\
            <div id="hisChatGridPager"></div>\
            </div>',
            onremove: function () {
            },
            onshow: function () {
                $('#hisChatgriddiv').closest('table').find('.ui-dialog-title').before('<button name="max" class="ui-dialog-close glyphicon glyphicon-resize-full"></button>');
                $('#hisChatgriddiv').closest('table').find('.ui-dialog-title').before('<button name="mix" class="ui-dialog-close glyphicon glyphicon glyphicon-resize-small"></button>');
                $('#hisChatgriddiv').closest('table').find("button[name=max]").unbind('click').click(function () {
                    var w = $(window).width() - 46;
                    var h = $(window).height() - 94;
                    d.height(h);
                    d.width(w);
                    $('#hisChatgriddiv').closest('table').find("button[name=mix]").show();
                    $('#hisChatgriddiv').closest('table').find("button[name=max]").hide();
                    initChatGrid(h - 66);
                });
                $('#hisChatgriddiv').closest('table').find("button[name=mix]").unbind('click').click(function () {
                    var w = 1000;
                    var h = 500;
                    d.height(h);
                    d.width(w);
                    $('#hisChatgriddiv').closest('table').find("button[name=mix]").hide();
                    $('#hisChatgriddiv').closest('table').find("button[name=max]").show();
                    initChatGrid(h - 66);
                });
                $('#hisChatgriddiv').closest('table').find("button[name=mix]").hide();
                // $("#hisChatgriddiv").closest(".ui-dialog-content").css("margin","-20px");
            }
        });
        d.show();


        var chatlist = {};

        function initChatGrid(height) {
            if (chatlist.grid) {
                $.jgrid.gridDestroy("hisChatGrid");
                $('#hisChatgriddiv').append('<table id="hisChatGrid"></table><div id="hisChatGridPager"></div>');
                chatlist.grid = null;
            }
            $("#hisChatGrid").jqGrid({
                multiselect: false,
                url: '/service/flowd-listFlowD',
                mtype: "post",
                styleUI: 'Bootstrap',
                datatype: "json",
                postData: params,
                beforeRequest: function () {
                    var grid = $(this).jqGrid();
                    var postData = grid.getGridParam('postData');
                    postData.start = (postData.page - 1) * postData.rows;
                    postData.limit = postData.rows;
                    delete postData.qcon;
                    if ($("#hisChatsearchinput").val()) {
                        postData.qcon = $("#hisChatsearchinput").val();
                    }
                },
                colModel: [
                    {label: '序号', name: 'fldsn', width: 30},
                    {
                        label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                            return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                        }
                    },
                    {label: '版本', name: 'fldver', width: 100},
                    {label: '创建人', name: 'initusername', width: 100},
                    {label: '创建时间', name: 'fldngdate', width: 80, formatter: function (cellValue, options, rowObject) {
                            if (cellValue) return cellValue.substring(0, 10);
                            return '';
                        }
                    },
                    {label: '修改人', name: 'fldmdusername', width: 100},
                    {label: '修改时间', name: 'fldmddate', width: 80, formatter: function (cellValue, options, rowObject) {
                            if (cellValue) return cellValue.substring(0, 10);
                            return '';
                        }
                    }
                ],
                autowidth: true,
                viewrecords: true,
                height: height,
                pager: "#hisChatGridPager",
                rowNum: 10,
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
                    chatlist.rawRecordsMap = {};
                    if (data.result.data && data.result.data.length > 0) {
                        $.each(data.result.data, function (index, r) {
                            chatlist.rawRecordsMap[r.id] = r;
                        });
                    }
                    delete data.result;
                },
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (iCol == '1') {
                        FlowDesign.showHisFlow(chatlist.rawRecordsMap[rowid]);
                    }
                }
            });
            chatlist.grid = $("#hisChatGrid");
        }

        initChatGrid(434);
        $('#hisChatsearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                chatlist.grid.trigger("reloadGrid");
            }
        });
        $('#hisChatsearchbutton').unbind('click').bind('click', function (event) {
            chatlist.grid.trigger("reloadGrid");
        });
    },
    showHisFlow:function (record) {
        debugger
        var h = $(window).height();
        var conid=record.id+"_shf";
        Platform.hrv('/jsplumb/form/flowHis.html', function (html) {
            var jsPlumbinstanceL = jsPlumb.getInstance();
            var flowLd = dialog({
                title: '流程图',
                width: 1080,
                height: h-50-54-40-4,
                content: "<div id="+conid+" style='height:100%;'>"+html+"</div>",
                button: [
                    {
                        value: '关闭',
                        callback: function () {
                            jsPlumbinstanceL.empty("flow_work_inner_lhis");
                            jsPlumbinstanceL.clear();
                        }
                    }
                ]
            });
            flowLd.show();
            var flowdata=JSON.parse(record.fldcontent)
            var nodes=flowdata.nodes;
            var connections=flowdata.connections;
            if(nodes.length==0&&connections.length==0) return;
            //重画流程
            var connectorPaintStyle = {
                joinstyle: 'round',
                stroke: "#61B7CF",
                strokeWidth: 2
            };
            // 鼠标悬浮在连接线上的样式
            var connectorHoverStyle = {
                stroke: "red",
                strokeWidth: 2,
            };

            var hollowCircle = {
                DragOptions: {cursor: 'pointer', zIndex: 2000},
                endpoint: ["Dot", {radius: 7}],  //端点的形状
                connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
                connectorHoverStyle: connectorHoverStyle,
                paintStyle: {
                    stroke: '#1e8151',
                    radius: 6,
                    strokeWidth: 2
                },        //端点的颜色样式
                isSource: true,    //是否可以拖动（作为连线起点）
                connector: ["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
                isTarget: true,    //是否可以放置（连线终点）
                maxConnections: -1,    // 设置连接点最多可以连接几条线
                connectorOverlays: [["Arrow", {width: 10, length: 10, location: 1}]]
            };

            jsPlumbinstanceL.empty("flow_work_inner_lhis");
            $("#flow_work_inner_lhis").html("");
            $("#flow_work_inner_lhis").height(h-50-54-40-4);
            $.each(nodes, function( index, elem ) {
                var htmldiv;
                var uid=elem.blockId+"Lhis";
                if(elem.nodetype === 'flow_start_node_div'){
                    htmldiv = '<div name="flow_start_node_div" class="list-group flow_start_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }else if(elem.nodetype === 'flow_task_node_div'){
                    htmldiv = '<div name="flow_task_node_div"  class="list-group flow_task_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }else if(elem.nodetype === 'flow_end_node_div'){
                    htmldiv = '<div name="flow_end_node_div" class="list-group flow_end_node" id="' + uid + '" style="position: absolute;display: none;">\n' +
                        '    <a href="#" class="btn btn-primary">'+elem.nodetext+'</a>\n' +
                        '</div>';
                }
                $(htmldiv).appendTo("#flow_work_inner_lhis");
                $("#"+uid).css({
                    'left': elem.positionX,
                    'top': elem.positionY
                });
                $("#"+uid).show();
            });
            var stateMachineConnector = {
                //连接器
                connector:["Flowchart", {gap: 0, cornerRadius: 6, alwaysRespectStubs: true}],
                //连接器样式
                paintStyle: connectorPaintStyle,
                //鼠标悬浮样式
                hoverPaintStyle:connectorHoverStyle,
                //端点为空
                endpoint:"Blank",
                //锚位置
                anchor:"Continuous",
                //覆盖物
                overlays: [["Arrow", {width: 10, length: 10, location: 1}]]
            };
            $.each(connections, function( index, elem ) {
                var connection1 = jsPlumbinstanceL.connect({
                    source: elem.pageSourceId+"Lhis",
                    target: elem.pageTargetId+"Lhis",
                    anchors: elem.anchors
                },stateMachineConnector);
                connection1.setParameter("id",elem.connectionlineId);
            });

            $("#hisclose").unbind('click').click(function(){
                jsPlumbinstanceL.empty("flow_work_inner_lhis");
                jsPlumbinstanceL.clear();
                flowLd.remove();
                flowLd.close();
            });
            $("#hisshowdata").unbind('click').click(function(){
                FlowDesign.showData(flowdata);
            });
            $("#hisviewdata").unbind('click').click(function(){
                FlowDesign.lookData(flowdata);
            });
            function showAp() {
                var formid="flowApHis";
                Platform.hrv('/jsplumb/form/flowApHis.html', function (html) {
                    $('div[name=property]').html("");
                    $('div[name=property]').html(html);
                    Platform.setFromValues(flowdata,formid);
                });
            }
            showAp();
            function showTp(taskid) {
                var formid="flowTp_"+taskid;
                Platform.hrv('/jsplumb/form/flowTp.html', function (html) {
                    $('div[name=property]').html("");
                    $('div[name=property]').html(html);
                    $("div[name=property] #flowTp").attr("id",formid);
                    if(flowdata[formid])
                        Platform.setFromValues(flowdata[formid],formid);
                });
            }

            function showFp(taskid) {
                var formid="flowFp_"+taskid;
                Platform.hrv('/jsplumb/form/flowFp.html', function (html) {
                    $('div[name=property]').html("");
                    $('div[name=property]').html(html);
                    $("div[name=property] #flowFp").attr("id",formid);
                    if(flowdata[formid])
                        Platform.setFromValues(flowdata[formid],formid);
                });
            }

            $("div[name=flow_task_node_div]").unbind("click").click(function (e) {
                var taskid=$(this).attr("id");//#337ab7
                $("div[name=flow_task_node_div]").find('a').css('background-color','#337ab7');
                $(this).find('a').css('background-color','red');
                taskid=taskid.substring(0,taskid.length-4);
                showTp(taskid);
                return false;
            });
            jsPlumbinstanceL.unbind("click").bind("click", function (conn, originalEvent) {
                var connid=conn.getParameter("id");
                $("div[name=flow_task_node_div]").find('a').css('background-color','#337ab7');
                showFp(connid);
            });
        });
    }


}