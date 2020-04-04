Mh={
    columnset: function () {
        $("#menu").find("li").removeAttr("class");
        $("#columnset").attr("class", "active");
        var treeId = 'treeDept';
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-2 column" id="orgbuttondiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="...">\
            <button type="button" class="btn btn-primary" onclick="Mh.addColB();">新建</button>\
            <button type="button" class="btn btn-success" onclick="Mh.editColB();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="Mh.delColB();">删除</button>\
            </div>\
            <div>\
            <ul id="treeDept" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-10 column">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button type="button" class="btn btn-primary" onclick="Mh.addArticle();">新建</button>\
            <button type="button" class="btn btn-success" onclick="Mh.editArticle();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="Mh.delArticle();">删除</button>\
            <button type="button" class="btn btn-info" onclick="Mh.sort();">排序</button>\
            <button type="button" class="btn btn-info" onclick="Mh.sortUp();">上移</button>\
            <button type="button" class="btn btn-info" onclick="Mh.sortDown();">下移</button>\
            <button type="button" class="btn btn-primary" onclick="Mh.public();">发布</button>\
            <button type="button" class="btn btn-primary" onclick="Mh.cancelpublic();">取消发布</button>\
            <button type="button" class="btn btn-primary" onclick="Mh.movelm();">移动栏目</button>\
            <button class="btn btn-success" id="usersearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="usersearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width:99.8%;"><table id="peopleGrid"></table>\
            <div id="peopleGridPager"></div></div>\
            </div>\
            </div>\
            </div>');

        Mh.initgrid();
        Mh.initColtree(treeId);
    },
    initColtree: function (treeId) {
        if (Mh.zTreeObj) {
            Mh.zTreeObj.destroy();
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
                url: "/service/mh-listCol",
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
                    var nodes2 = Mh.zTreeObj.getSelectedNodes();
                    if (!nodes2 || nodes2.length == 0) {
                        $('#orgmemu').find('li').eq(1).hide();
                        $('#orgmemu').find('li').eq(2).hide();
                    } else {
                        $('#orgmemu').find('li').eq(1).show();
                        $('#orgmemu').find('li').eq(2).show();
                    }
                    $('#orgmemu').show();
                    $('#orgmemu').find('li').unbind('click').click(function () {

                        var nodes2 = Mh.zTreeObj.getSelectedNodes();
                        var node;
                        if (nodes2 && nodes2.length > 0) {
                            node = nodes2[0];
                        }
                        var action = $(this).attr('action');
                        if ("add" == action) {
                            Mh.addCol(null, node);
                        }
                        if ("edit" == action) {
                            if (nodes2[0]) {
                                Mh.addCol(nodes2[0].id, null, true);
                            }
                        }
                        if ("del" == action) {
                            if (nodes2[0]) {
                                Mh.delCol(nodes2[0]);
                            }
                        }
                    });

                    $("#orgmemu").unbind('mouseleave').on('mouseleave', function () {
                        $(this).hide();
                        return false;
                    });
                },
                onAsyncSuccess: function (event, treeId) {
                    if (Mh.zTreeObj.isFirstChild) {
                        var zTree = Mh.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.selectNode(nodeList[0].children[0]);
                        if (Mh.article && Mh.article.grid) {
                            Mh.article.grid.trigger("reloadGrid");
                        }
                        Mh.zTreeObj.isFirstChild = false;
                    }

                    if (Mh.zTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = Mh.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Mh.zTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Mh.zTreeObj.isFirst = false;
                    }

                },
                onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    if (!targetNode) return;
                    if(treeNodes[0].getParentNode()){
                        var children = treeNodes[0].getParentNode().children;
                        if (children && children.length > 0) {
                            var updateM = [];
                            var fldparentid=treeNodes[0].getParentNode().id;
                            var fldparentname=treeNodes[0].getParentNode().name;
                            $.each(children, function (i, n) {
                                updateM.push({id: n.id, fldsn: (i + 1),fldparentid:fldparentid,fldparentname:fldparentname});
                            })
                            Platform.srv("mh-updatefldsn", updateM, function (r) {

                            });
                        }
                    }else{
                        var zTree = Mh.zTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        var updateM = [];
                        $.each(nodeList, function (i, n) {
                            updateM.push({id: n.id, fldsn: (i + 1),fldparentid:"",fldparentname:""});
                        });
                        Platform.srv("mh-updatefldsn", updateM, function (r) {

                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        Mh.article.grid.trigger("reloadGrid");
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
        Mh.zTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        Mh.zTreeObj.isFirst = true;
        $(document).click(function () {
            $("#orgmemu").hide();
        });
    },
    initgrid: function () {
        Mh.article = {};
        $("#peopleGrid").jqGrid({
            multiselect: true,
            url: '/service/mh-listArticle',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {},
            beforeRequest: function () {
                var treeObj = Mh.zTreeObj;
                if (!treeObj) return false;
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');

                var nodes = treeObj.getSelectedNodes();
                if ($("#usersearchinput").val()) {
                    postData.qcon = $("#usersearchinput").val();
                    postData.start =0;
                    Mh.article.currentPage = 1;
                    postData.limit = postData.rows;
                    delete postData.fldlmid;
                }
                else if (nodes.length > 0) {
                    if (Mh.article.gridTotalNum && postData.page > Mh.article.gridTotalNum) {
                        postData.page = Mh.article.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    Mh.article.currentPage = postData.page;
                    postData.limit = postData.rows;
                    Mh.article.rowNum = postData.limit;
                    postData.fldlmid = nodes[0].id;
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                } else {
                    return false;
                }
            },
            colModel: [
                {label: '序号', name: 'fldsn', width: 30},
                {label: '标题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        return '<span style="color:blue;cursor: pointer;">' + cellValue + '</span>';
                }},
                {label: '链接', name: 'fldlink', width: 100},
                {label: '图片', name: 'fldpic', width: 100},
                {label: '创建人', name: 'initusername', width: 100},
                {label: '创建时间', name: 'fldngdate', width: 80, formatter: function (cellValue, options, rowObject) {
                        if(cellValue) return cellValue.substring(0,10);
                        return '';
                }},
                {label: '是否发布', name: 'fldisfb', width: 60, formatter: function (cellValue, options, rowObject) {
                        if(cellValue=='1') return '是';
                        return '否';
                }},
                {label: '发布时间', name: 'fldfbsj', width: 80, formatter: function (cellValue, options, rowObject) {
                        if(cellValue) return cellValue.substring(0,10);
                        return '';
                }}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#peopleGridPager",
            rowNum: Mh.article.rowNum || 20,
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
                Mh.article.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Mh.article.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '2') {
                    Mh.addArticle(Mh.article.rawRecordsMap[rowid]);
                }
            }
        });
        Mh.article.grid = $("#peopleGrid");

        $('#usersearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Mh.article.grid.trigger("reloadGrid");
            }
        });
        $('#usersearchbutton').unbind('click').bind('click', function (event) {
            Mh.article.grid.trigger("reloadGrid");
        });
    },
    addColB: function () {
        var nodes2 = Mh.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        Mh.addCol(null, node);
    },
    addCol: function (treeId, treeNode, edit) {
        Platform.hrv('/mh/form/col.html', function (html) {
            var oldfldpic='';
            var formid = 'deptfrom';
            var title = '新增栏目';
            if (treeId)
                title = '编辑栏目';
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
                                alert("请输入栏目名称");
                                return;
                            }
                            var fromValues = Platform.getFromValues(formid);
                            Platform.srv("mh-saveColumn", fromValues, function (r) {
                                function afterSavePic(){
                                    var treeObj = Mh.zTreeObj;
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
                                    d.close().remove();
                                }

                                if(fromValues.fldpic&&fromValues.fldpic!=oldfldpic){
                                    var removeoldpic="0";
                                    if(oldfldpic){
                                        removeoldpic="1";
                                    }
                                    var options = {
                                        type: 'post',
                                        data: {
                                            'fldtype': 'pic',
                                            'pkid': r.id,
                                            'flduserid':loginUser.id,
                                            'fldusername':loginUser.fldname,
                                            'removeoldpic':removeoldpic
                                        },
                                        url: '/service/mh-saveArtAttach',
                                        success: function(ret) {
                                            afterSavePic();
                                        },
                                        error: function(ret) {

                                        }
                                    };
                                    $("#"+formid).find("#fldpicform").ajaxSubmit(options);
                                }else if(oldfldpic&&!fromValues.fldpic){
                                    var params = {
                                        pkid: r.id,
                                        fldtype:"pic"
                                    }
                                    Platform.srv("mh-listArtAttach", params, function (r2) {
                                        if(r2&&r2[0]){
                                            Platform.srv("mh-removeArtAttach", {id: r2[0].id}, function (r3) {
                                                afterSavePic();
                                            });
                                        }else{
                                            afterSavePic();
                                        }
                                    });
                                }else{
                                    afterSavePic();
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
            d.show();
            if (treeId) {
                //获取表单数据
                Platform.srv("commonservice-getById", {
                    className: "com.yyj.apps.mh.model.Mhcolumn",
                    id: treeId
                }, function (r) {
                    if (r) {
                        Platform.setFromValues(r, formid);
                        if(r&&r.fldpic) oldfldpic=r.fldpic;
                    }
                });
            } else {
                var maxSn = {};
                if (treeNode) {
                    maxSn.fldparentid = treeNode.id;
                    var fromV = {
                        fldparentid: treeNode.id,
                        fldparentname: treeNode.fldname,
                        state:'1',
                        fldngdate:Platform.getCurrentDate(2)
                    }
                    Platform.setFromValues(fromV, formid);
                }else{
                    var fromV = {
                        state:'1',
                        fldngdate:Platform.getCurrentDate(2)
                    }
                    Platform.setFromValues(fromV, formid);
                }
                //设置序号值
                Platform.srv("mh-getMaxColSn", maxSn, function (r) {
                    if (r && r > 0)
                        $('#' + formid).find('#fldsn').val(r + 1);
                    else
                        $('#' + formid).find('#fldsn').val(1);
                });
            }

            $("#picData").unbind("change").change(function (file) {
                $("#fldpic").val($(this).val());
            });
            $("#clearPic").unbind("click").click(function () {
                $("#fldpic").val("");
            });
        });
    },
    editColB: function () {
        var nodes2 = Mh.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        if (nodes2[0]) {
            Mh.addCol(nodes2[0].id, null, true);
        }
    },
    delColB: function () {
        var nodes2 = Mh.zTreeObj.getSelectedNodes();
        var node;
        if (nodes2 && nodes2.length > 0) {
            node = nodes2[0];
        }
        if (nodes2[0]) {
            Mh.delCol(nodes2[0]);
        }
    },
    delCol: function (treeNode) {
        if (treeNode && treeNode.id) {
            //设置序号值
            bootbox.confirm("确定要删除该栏目和该栏目所属子栏目吗？", function (result) {

                if (result) {
                    Platform.srv("mh-delCol", {deptid: treeNode.id}, function (r) {

                        var treeObj = Mh.zTreeObj;
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
    addArticle:function (record,editmode) {
        Platform.hrv('/mh/form/article.html', function (html) {
            var oldfldpic='';
            var formid="articleformid";
            var w = $(window).width()-50-30;
            var h = $(window).height()-145-20;

            var title=record?'编辑':'新建';
            if(editmode=='0'){
                title='查看';
                h+=54;
            }
            var d = dialog({
                title: title,
                width: w,
                height: h,
                content: html,
                onremove: function () {
                    if (um) {
                        um.destroy();
                    }
                },
                onshow: function () {

                },
                button: editmode=='0'?[]:[
                    {
                        value: '保存',
                        callback: function () {
                            var fromValues = Platform.getFromValues(formid);
                            if (!fromValues.fldtm) {
                                bootbox.alert('请输入标题');
                                return;
                            }
                            if (um) {
                                fromValues.fldcontent = um.getContent();
                            }
                            Platform.srv("mh-saveArticle", fromValues, function (workr) {
                                if(workr&& workr.msg){
                                    alert(workr.msg);
                                    return;
                                }
                                var pkid = $("#pkid").val();
                                if (pkid && pkid != workr.id) {
                                    $("#pkid").val(workr.id);
                                    Platform.srv("mh-updateMhAttachPkid", {oldpkid: pkid, pkid: workr.id}, function (r3) {

                                    });
                                };
                                if(fromValues.fldpic&&fromValues.fldpic!=oldfldpic){
                                    var removeoldpic="0";
                                    if(oldfldpic){
                                        removeoldpic="1";
                                    }
                                    var options = {
                                        type: 'post',
                                        data: {
                                            'fldtype': 'pic',
                                            'pkid': workr.id,
                                            'flduserid':loginUser.id,
                                            'fldusername':loginUser.fldname,
                                            'removeoldpic':removeoldpic
                                        },
                                        url: '/service/mh-saveArtAttach',
                                        success: function(ret) {
                                            Mh.article.grid.trigger("reloadGrid");
                                            d.close().remove();
                                        },
                                        error: function(ret) {

                                        }
                                    };
                                    $("#"+formid).find("#fldpicform").ajaxSubmit(options);
                                }else if(oldfldpic&&!fromValues.fldpic){
                                    var params = {
                                        pkid: $("#pkid").val(),
                                        fldtype:"pic"
                                    }
                                    Platform.srv("mh-listArtAttach", params, function (r) {
                                        if(r&&r[0]){
                                            Platform.srv("mh-removeArtAttach", {id: r[0].id}, function (r2) {

                                            });
                                        }
                                        Mh.article.grid.trigger("reloadGrid");
                                        d.close().remove();
                                    });
                                }else{
                                    Mh.article.grid.trigger("reloadGrid");
                                    d.close().remove();
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
            d.show();
            $('#'+formid).closest('.ui-dialog-body').css('overflow','auto');
            if(editmode=='0'){
                $('#'+formid).find("#fldtm").attr("readonly", "readonly");
            }
            if(record){
                Platform.setFromValues(record,formid);
                $("#" + formid).find("#pkid").val(record.id);
                if(record&&record.fldpic) oldfldpic=record.fldpic;
            }else{
                var nodes2 = Mh.zTreeObj.getSelectedNodes();
                var node;
                if (nodes2 && nodes2.length > 0) {
                    node = nodes2[0];
                    $("#" + formid).find("#fldlmid").val(node.id);
                    //设置序号值
                    Platform.srv("mh-getMaxArticleSn", {fldlmid:node.id}, function (r) {
                        if (r && r > 0)
                            $('#' + formid).find('#fldsn').val(r + 1);
                        else
                            $('#' + formid).find('#fldsn').val(1);
                    });
                }
                $("#" + formid).find("#pkid").val(Platform.uuid());
                if (window.loginUser) {
                    $("#" + formid).find('input[id=' + 'initbmid' + ']').val(window.loginUser.bmid);
                    $("#" + formid).find('input[id=' + 'initbm' + ']').val(window.loginUser.bmname);
                    $("#" + formid).find('input[id=' + 'initdeptid' + ']').val(window.loginUser.deptid);
                    $("#" + formid).find('input[id=' + 'initdeptname' + ']').val(window.loginUser.deptname);
                    $("#" + formid).find('input[id=' + 'initunitid' + ']').val(window.loginUser.unitid);
                    $("#" + formid).find('input[id=' + 'initunitname' + ']').val(window.loginUser.unitname);
                    $("#" + formid).find('input[id=' + 'inituserid' + ']').val(window.loginUser.id);
                    $("#" + formid).find('input[id=' + 'initusername' + ']').val(window.loginUser.fldname);
                    $("#" + formid).find('input[id=' + 'fldngdate' + ']').val(Platform.getCurrentDate(2));
                    $("#" + formid).find('input[id=' + 'state' + ']').val("1");
                }

            }
            //初始化百度编辑器
            var um;
            $("#mhEditorContainer").height(h-34*3-63);
            $("#mhEditorContainer").width($("#mhEditorContainer").parent().width()-59)
            $("#mhEditorContainerText").height(h-34*3-63);
            Platform.initUmeditor("mhEditorContainer", {
                zIndex:9999,
                readonly: editmode=='0'?true:false,
                enableAutoSave: false, //禁止自动保存
                autoSyncData: false,//自动同步编辑器要提交的数据
                initialFrameHeight: h-34*3-63-(editmode=='0'?6:35),//355,
                toolbars: editmode=='0'?[]:[
                    ['undo', 'redo',
                        '|', 'bold', 'italic', 'underline',
                        '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
                        '|', 'fontfamily', 'fontsize', 'forecolor', 'backcolor',
                        '|', 'insertorderedlist', 'insertunorderedlist', 'simpleupload',
                        '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'] //'|', 'insertimage'
                ]
            }, function (editor) {
                um = editor;
                if(record&&record.fldcontent)
                    editor.setContent(record.fldcontent);
            });
            Mh.initAttachList(formid,editmode);
            Mh.initWordUpAttach(formid,editmode);
        });

        $("#picData").unbind("change").change(function (file) {
            $("#fldpic").val($(this).val());
        });
        $("#clearPic").unbind("click").click(function () {
            $("#fldpic").val("");
        });
    },
    initAttachList: function (formid, editmode) {
        var params = {
            pkid: $("#pkid").val()
        }
        Platform.srv("mh-listArtAttach", params, function (r) {
            var attachhtml = "";
            if (r && r.length > 0) {
                $.each(r, function (index, v) {
                    var fldngdate = v.fldngdate.substring(0, 16);
                    var delspan = '<span name="attDel"  style="float:right;padding-left: 5px;color: blue;" fileid="' + v.id + '">删除</span>';
                    if (editmode=='0') delspan = "";
                    attachhtml += '<a href="#" class="list-group-item">' + delspan + '<span style="float:right;padding-left: 5px;">' + fldngdate + '</span><span style="float:right;">' + (v.fldusername||"") + '</span><span name="fileName" fileid="' + v.id + '">' + v.fldfilename + '</span></a>'
                });
                $("#attachlist").html(attachhtml);
            } else {
                $("#attachlist").html("");
            }

            $("#attachlist").find('span[name=attDel]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                if (fileid) {
                    Platform.srv("mh-removeArtAttach", {id: fileid}, function (r) {
                        if (r) span.parent().remove();
                    });
                }
            });
            $("#attachlist").find('span[name=fileName]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                var url = '/service/mh-downArtAttach?id=' + fileid;
                Platform.download(url);
            });
        });
    },
    initWordUpAttach: function (formid,editmode) {
        if(editmode=='0'){
            $("#attachUpload").hide();
            return;
        }
        Platform.loadCss('/ueditor/third-party/webuploader/webuploader.css');
        var prePaths = [];
        prePaths.push('/ueditor/third-party/webuploader/webuploader.min.js');
        Platform.loadScripts(prePaths, function () {
            var uploader = WebUploader.create({
                swf: '/ueditor/third-party/webuploader/Uploader.swf',
                formData: {"pkid": $("#pkid").val(), flduserid: loginUser.id, fldusername: loginUser.fldname},//参数列表
                // 文件接收服务端。
                server: '/service/mh-saveArtAttach',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#attachUpload',
                auto: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });
            uploader.on('uploadSuccess', function (file) {
                Mh.initAttachList(formid);
            });
            $("#attachUpload").find('.webuploader-pick').css('padding-bottom', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-top', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-left', '10px');
            $("#attachUpload").find('.webuploader-pick').css('padding-right', '10px');
            $("#attachUpload").find('.webuploader-pick').css('overflow', 'visible');
        });
    },
    editArticle: function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length > 1||ids.length==0) {
            bootbox.alert('请选择一条数据');
            return;
        } else {
            Mh.addArticle(Mh.article.rawRecordsMap[ids[0]]);
        }
    },
    delArticle: function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.mh.model.Mharticle",
            ids: ids.join(','),
            state: "2"
        }, function (r) {
            Mh.article.grid.trigger("reloadGrid");
        });
    },
    sort: function () {
        var nodes2 = Mh.zTreeObj.getSelectedNodes();
        if (nodes2 && nodes2.length > 0) {
            Platform.srv("mh-sortArticle", {colid: nodes2[0].id}, function (r) {
                Mh.article.grid.trigger("reloadGrid");
            });
        }
    },
    sortUp: function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (Mh.article.rawRecordsMap[ids[0]]) {
            var r = Mh.article.rawRecordsMap[ids[0]];
            var params = {
                id:r.id,
                fldlmid: r.fldlmid,
                fldsn: r.fldsn
            };
            Platform.srv("mh-sortUp", params, function (r) {
                Mh.article.grid.trigger("reloadGrid");
            });
        }
    },
    sortDown: function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0 || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        if (Mh.article.rawRecordsMap[ids[0]]) {
            var r = Mh.article.rawRecordsMap[ids[0]];
            var params = {
                id:r.id,
                fldlmid: r.fldlmid,
                fldsn: r.fldsn,
                down: '1'
            };
            Platform.srv("org-sortUp", params, function (r) {
                Mh.article.grid.trigger("reloadGrid");
            });
        }
    },
    movelm:function(){
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择至少一条数据');
            return;
        }
        var treehtml = '<div>\
                <ul id="treeColChose" class="ztree"></ul>\
                </div>';
        var treed = dialog({
            title: '选择栏目',
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
                                className: "com.yyj.apps.mh.model.Mharticle",
                                ids: ids.join(','),
                                fldlmid:fldlmid
                            }, function (r) {
                                Mh.article.grid.trigger("reloadGrid");
                            });
                        } else {
                            alert("请选择一个栏目");
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
        var treeDeptChose = Mh.getColTree(treeId);
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
                url: "/service/mh-listCol",
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
    public:function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.mh.model.Mharticle",
            ids: ids.join(','),
            fldisfb: "1",
            fldfbsj:Platform.getCurrentDate()
        }, function (r) {
            Mh.article.grid.trigger("reloadGrid");
        });
    },
    cancelpublic:function () {
        var ids = Mh.article.grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.mh.model.Mharticle",
            ids: ids.join(','),
            fldisfb: "0",
            fldfbsj:"null"
        }, function (r) {
            Mh.article.grid.trigger("reloadGrid");
        });
    }
}