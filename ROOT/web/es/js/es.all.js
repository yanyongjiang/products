Es={
    listToImportWork:function () {
        $("#menu").find("li").removeAttr("class");
        $("#ToImportWork").attr("class","active");

        if(Es.importWorkzTreeObj)
            Es.importWorkzTreeObj.destroy();
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-1 column" id="importWorktreediv">\
            <div>\
            <ul id="importWorktree" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-11 column">\
            <div class="btn-group btn-group-sm" role="group" style="width:100%;">\
            <button type="button" class="btn btn-primary" onclick="Es.addData();">新建</button>\
            <button type="button" class="btn btn-success" onclick="Es.editData();">编辑</button>\
            <button type="button" class="btn btn-danger" onclick="Es.delData();">删除</button>\
            <button type="button" class="btn btn-warning" onclick="Es.impData();">导入</button>\
            <button type="button" class="btn btn-info" onclick="Es.copyData();">复制</button>\
            <button class="btn btn-success" id="importWorksearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="importWorksearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width: 99.8%;"><table id="importWorkGrid"></table>\
            <div id="importWorkGridPager"></div></div>\
            </div>\
            </div>\
            </div>');
        var treeId='importWorktree';
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
                url: "/service/es-index-listEsDataTree",
                autoParam: ["id", "name=year", "level=lv"],
                dataFilter: filter
            },
            callback: {
                beforeAsync:function(treeId,treeNode){
                    var obj = this.getZTreeObj(treeId);
                    var params  =  obj ? obj.setting.async.otherParam : {};
                    params.push("fldstatus");
                    params.push("1");
                },
                onRightClick: function (e, treeId, treeNode) {

                },
                onAsyncSuccess: function (event, treeId) {
                    if (Es.importWorkzTreeObj.isFirstChild) {
                        var zTree = Es.importWorkzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        if(nodeList[0].children&&nodeList[0].children[0]){
                            zTree.selectNode(nodeList[0].children[0]);
                            if (Es.importWorkGrid && Es.importWorkGrid.grid) {
                                Es.importWorkGrid.grid.trigger("reloadGrid");
                            }
                            Es.importWorkzTreeObj.isFirstChild = false;
                        }
                    }

                    if (Es.importWorkzTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = Es.importWorkzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Es.importWorkzTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Es.importWorkzTreeObj.isFirst = false;
                    }

                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        Es.importWorkGrid.grid.trigger("reloadGrid");
                    }
                }
            }
        };
        function filter(treeId, parentNode, responseData) {
            if (responseData.result.length > 0) {
                $.each(responseData.result, function (index, r) {
                    if (r.isParent=='true') r.isParent = true;
                    else r.isParent = false;
                });
            }
            return responseData.result;
        }
        $("#" + treeId).height($(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20+30+68);
        Es.importWorkzTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        Es.importWorkzTreeObj.isFirst = true;
        Es.importWorkGrid = {};
        $("#importWorkGrid").jqGrid({
            multiselect: true,
            url: '/service/es-index-listEsData',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {
                notfldstatus: true
            },
            beforeRequest: function () {
                var treeObj = Es.importWorkzTreeObj;
                if (!treeObj) return false;
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length > 0) {
                    var grid = $(this).jqGrid();
                    var postData = grid.getGridParam('postData');
                    if (Es.importWorkGrid.gridTotalNum && postData.page > Es.importWorkGrid.gridTotalNum) {
                        postData.page = Es.importWorkGrid.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    Es.importWorkGrid.currentPage = postData.page;
                    postData.limit = postData.rows;
                    Es.importWorkGrid.rowNum = postData.limit;
                    postData.yearmon = nodes[0].name;
                    if(nodes[0].getParentNode()){
                        postData.yearmon=nodes[0].getParentNode().name+"-"+postData.yearmon;
                    }
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                    if($("#importWorksearchinput").val()){
                        postData.qcon=$("#importWorksearchinput").val();
                    }
                    postData.fldstatus="1";
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
                {label: '内容', name: 'fldtext', width: 100, formatter: function (cellValue, options, rowObject) {
                    if(cellValue.length>100) return cellValue.substring(0,100);
                    return cellValue||"";
                }}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#importWorkGridPager",
            rowNum: Es.importWorkGrid.rowNum || 20,
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
                Es.importWorkGrid.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Es.importWorkGrid.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') {
                    var r={};
                    $.extend(r,Es.importWorkGrid.rawRecordsMap[rowid]);
                    Es.addData(r);
                }
            }
        });
        Es.importWorkGrid.grid = $("#importWorkGrid");
        $('#importWorksearchinput').unbind('keypress').bind('keypress', function(event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Es.importWorkGrid.grid.trigger("reloadGrid");
            }
        });
        $('#importWorksearchbutton').unbind('click').bind('click', function(event) {
            Es.importWorkGrid.grid.trigger("reloadGrid");
        });
    },
    listImportedWork:function () {
        $("#menu").find("li").removeAttr("class");
        $("#ImportedWork").attr("class","active");
        if(Es.importedWorkzTreeObj)
            Es.importedWorkzTreeObj.destroy();
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-11 column">\
            <div class="row clearfix">\
            <div class="col-md-1 column" id="importedWorktreediv">\
            <div>\
            <ul id="importedWorktree" class="ztree"></ul>\
            </div>\
            </div>\
            <div class="col-md-11 column">\
            <div class="btn-group btn-group-sm" role="group" style="width:100%;">\
            <button type="button" class="btn btn-danger" id="importedWorkDe">删除</button>\
            <button type="button" class="btn btn-warning" id="recoveryImportWork">恢复到待导入</button>\
            <button type="button" class="btn btn-danger" id="clearIndex">清空索引</button>\
            <button class="btn btn-success" id="importedWorksearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="importedWorksearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width: 99.8%;"><table id="importedWorkGrid"></table>\
            <div id="importedWorkGridPager"></div></div>\
            </div>\
            </div>\
            </div>');
        $('#recoveryImportWork').unbind('click').bind('click', function(event) {
            var grid=Es.importedWorkGrid.grid;
            var ids = grid.getGridParam("selarrrow");
            if (!ids || ids.length == 0) {
                bootbox.alert('请选择一条数据');
                return;
            }
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.es.index.model.Esdata",
                ids:ids.join(","),
                fldstatus: "1"
            }, function (r) {
                grid.trigger("reloadGrid");
            });

        });
        $('#importedWorkDe').unbind('click').bind('click', function(event) {
            Es.delData(Es.importedWorkGrid,true);
        });
        //clearIndex
        $('#clearIndex').unbind('click').bind('click', function(event) {
                Platform.srv("es-index-clearIndex", {}, function (workr) {
                    bootbox.alert('已清空索引');
                    return;
                });
        });

        var treeId='importedWorktree';
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
                url: "/service/es-index-listEsDataTree",
                autoParam: ["id", "name=year", "level=lv"],
                dataFilter: filter
            },
            callback: {
                beforeAsync:function(treeId,treeNode){
                    var obj = this.getZTreeObj(treeId);
                    var params  =  obj ? obj.setting.async.otherParam : {};
                    params.push("fldstatus");
                    params.push("2");
                },
                onRightClick: function (e, treeId, treeNode) {

                },
                onAsyncSuccess: function (event, treeId) {
                    if (Es.importedWorkzTreeObj.isFirstChild) {
                        var zTree = Es.importedWorkzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.selectNode(nodeList[0].children[0]);
                        if (Es.importedWorkGrid && Es.importedWorkGrid.grid) {
                            Es.importedWorkGrid.grid.trigger("reloadGrid");
                        }
                        Es.importedWorkzTreeObj.isFirstChild = false;
                    }

                    if (Es.importedWorkzTreeObj.isFirst) {
                        //获得树形图对象
                        var zTree = Es.importedWorkzTreeObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Es.importedWorkzTreeObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Es.importedWorkzTreeObj.isFirst = false;
                    }

                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.tId) {
                        Es.importedWorkGrid.grid.trigger("reloadGrid");
                    }
                }
            }
        };
        function filter(treeId, parentNode, responseData) {
            if (responseData.result.length > 0) {
                $.each(responseData.result, function (index, r) {
                    if (r.isParent=='true') r.isParent = true;
                    else r.isParent = false;
                });
            }
            return responseData.result;
        }
        $("#" + treeId).height($(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20+30+68);
        Es.importedWorkzTreeObj = $.fn.zTree.init($("#" + treeId), setting);
        Es.importedWorkzTreeObj.isFirst = true;
        Es.importedWorkGrid = {};
        $("#importedWorkGrid").jqGrid({
            multiselect: true,
            url: '/service/es-index-listEsData',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {
                notfldstatus: true
            },
            beforeRequest: function () {
                var treeObj = Es.importedWorkzTreeObj;
                if (!treeObj) return false;
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length > 0) {
                    var grid = $(this).jqGrid();
                    var postData = grid.getGridParam('postData');
                    if (Es.importedWorkGrid.gridTotalNum && postData.page > Es.importedWorkGrid.gridTotalNum) {
                        postData.page = Es.importedWorkGrid.gridTotalNum;
                    }
                    if (postData.sorts && $.isArray(postData.sorts)) {
                        postData.sorts = JSON.stringify(postData.sorts);
                    }
                    postData.start = (postData.page - 1) * postData.rows;
                    Es.importedWorkGrid.currentPage = postData.page;
                    postData.limit = postData.rows;
                    Es.importedWorkGrid.rowNum = postData.limit;
                    postData.yearmon = nodes[0].name;
                    if(nodes[0].getParentNode()){
                        postData.yearmon=nodes[0].getParentNode().name+"-"+postData.yearmon;
                    }
                    delete postData.rows;
                    delete postData.page;
                    delete postData.qcon;
                    if($("#importedWorksearchinput").val()){
                        postData.qcon=$("#importedWorksearchinput").val();
                    }
                    postData.fldstatus="2";
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
                {label: '内容', name: 'fldtext', width: 100}
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#importedWorkGridPager",
            rowNum: Es.importedWorkGrid.rowNum || 20,
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
                Es.importedWorkGrid.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Es.importedWorkGrid.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '1') {
                    var r={};
                    $.extend(r,Es.importedWorkGrid.rawRecordsMap[rowid]);
                    Es.addData(r,'0');
                }
            }
        });
        Es.importedWorkGrid.grid = $("#importedWorkGrid");
        $('#importedWorksearchinput').unbind('keypress').bind('keypress', function(event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Es.importedWorkGrid.grid.trigger("reloadGrid");
            }
        });
        $('#importedWorksearchbutton').unbind('click').bind('click', function(event) {
            Es.importedWorkGrid.grid.trigger("reloadGrid");
        });


    },
    addData:function (record,editmode) {
        Platform.hrv('/es/form/data.html', function (html) {
            var formid="dataForm";
            var w = $(window).width() * 0.96;
            var h = $(window).height() - 40 - 16 - 2 - 42-54 + 2;

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
                                var text = um.getContentTxt();
                                fromValues.fldtext=text;
                            }
                            Platform.srv("es-index-saveData", fromValues, function (workr) {
                                var treeObj = Es.importWorkzTreeObj;
                                if(workr&& workr.msg){
                                    alert(workr.msg);
                                    return;
                                }
                                var pkid = $("#pkid").val();
                                if (pkid && pkid != workr.id) {
                                    $("#pkid").val(workr.id);
                                    Platform.srv("es-index-updateEsAttachPkid", {oldpkid: pkid, pkid: workr.id}, function (r3) {

                                    });
                                }
                                Es.importWorkzTreeObj.isFirst = true;
                                treeObj.reAsyncChildNodes(null, "refresh");
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
            $('#'+formid).closest('.ui-dialog-body').css('overflow','auto');
            if(editmode=='0'){
                $('#'+formid).find("#fldtm").attr("readonly", "readonly");
            }
            if(record){
                Platform.setFromValues(record,formid);
                $("#" + formid).find("#pkid").val(record.id);
            }else{
                $("#" + formid).find("#pkid").val(Platform.uuid());
                $("#" + formid).find('input[id=' + 'fldngdate' + ']').val(Platform.getCurrentDate(2));
                $("#" + formid).find("#fldstatus").val("1");
            }
            //初始化百度编辑器
            var um;
            $("#dataEditorContainer").height(h-103-49);
            $("#dataEditorContainer").width($("#dataEditorContainer").parent().width()-59)
            $("#dataEditorContainerText").height(h-103-49);
            Platform.initUmeditor("dataEditorContainer", {
                zIndex:9999,
                readonly: editmode=='0'?true:false,
                enableAutoSave: false, //禁止自动保存
                autoSyncData: false,//自动同步编辑器要提交的数据
                initialFrameHeight: h-103-49-(editmode=='0'?6:35),//355,
                toolbars: editmode=='0'?[]:[
                    ['undo', 'redo',
                        '|', 'bold', 'italic', 'underline',
                        '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
                        '|', 'fontfamily', 'fontsize', 'forecolor', 'backcolor',
                        '|', 'insertorderedlist', 'insertunorderedlist', 'simpleupload'] //'|', 'insertimage'
                ]
            }, function (editor) {
                um = editor;
                if(record&&record.fldcontent)
                editor.setContent(record.fldcontent);
            });
            Es.initAttachList(formid,editmode);
            Es.initWordUpAttach(formid,editmode);
        });
    },
    editData:function () {
        var ids = Es.importWorkGrid.grid.getGridParam("selarrrow");
        if (!ids || ids.length > 1) {
            bootbox.alert('请选择一条数据');
            return;
        } else {
            Es.addData(Es.importWorkGrid.rawRecordsMap[ids[0]]);
        }
    },
    delData:function (obj,deleteIndex) {
        var grid=obj?obj.grid:Es.importWorkGrid.grid;
        var ids = grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.es.index.model.Esdata",
            ids:ids.join(","),
            fldstatus: "3"
        }, function (r) {
                if(deleteIndex){
                    Platform.srv("es-index-RemoveEsIndex", {ids:ids.join(",")},function(){
                        grid.trigger("reloadGrid");
                        var treeObj = Es.importWorkzTreeObj;
                        Es.importWorkzTreeObj.isFirst = true;
                        treeObj.reAsyncChildNodes(null, "refresh");
                    });
                }else{
                    grid.trigger("reloadGrid");
                    var treeObj = Es.importWorkzTreeObj;
                    Es.importWorkzTreeObj.isFirst = true;
                    treeObj.reAsyncChildNodes(null, "refresh");
                }
        },true);
    },
    copyData:function (obj) {
        var grid=obj?obj.grid:Es.importWorkGrid.grid;
        var ids = grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("es-index-copyData",{ids:ids.join(",")}, function (r) {
            grid.trigger("reloadGrid");
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
                formData: {"pkid": $("#pkid").val()},//参数列表
                // 文件接收服务端。
                server: '/service/es-index-saveEsAttach',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#attachUpload',
                auto: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });
            uploader.on('uploadSuccess', function (file) {
                Es.initAttachList(formid);
            });
            $("#attachUpload").find('.webuploader-pick').css('padding-bottom', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-top', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-left', '10px');
            $("#attachUpload").find('.webuploader-pick').css('padding-right', '10px');
            $("#attachUpload").find('.webuploader-pick').css('overflow', 'visible');
        });
    },
    initAttachList: function (formid, editmode) {
        var params = {
            pkid: $("#pkid").val()
        }
        Platform.srv("es-index-listEsAttach", params, function (r) {
            var attachhtml = "";
            if (r && r.length > 0) {
                $.each(r, function (index, v) {
                    var fldngdate = v.fldngdate.substring(0, 16);
                    var delspan = '<span name="attDel"  style="float:right;margin-left: 5px;color: blue;" fileid="' + v.id + '">删除</span>';
                    if (editmode=='0') delspan = "";
                    attachhtml += '<a href="#" class="list-group-item">' + delspan + '<span style="float:right;margin-left: 5px;">' + fldngdate + '</span><span style="float:right;">' + (v.fldusername||"") + '</span><span name="fileName" fileid="' + v.id + '">' + v.fldfilename + '</span></a>'
                });
                $("#attachlist").html(attachhtml);
            } else {
                $("#attachlist").html("");
            }

            $("#attachlist").find('span[name=attDel]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                if (fileid) {
                    Platform.srv("es-index-removeEsAttach", {id: fileid}, function (r) {
                        if (r) span.parent().remove();
                    });
                }
            });
            $("#attachlist").find('span[name=fileName]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                var url = '/service/es-index-downEsAttach?id=' + fileid;
                Platform.download(url);
            });
        });
    },
    impData:function (obj) {
        var grid=obj?obj.grid:Es.importWorkGrid.grid;
        var ids = grid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("es-index-impData",{ids:ids.join(",")}, function (r) {
            grid.trigger("reloadGrid");
        });
    },
    initSearch:function(){

        function ToSearch(){
            var qcon=$("#fldesqcon").val();
            if(!qcon){
                bootbox.alert('请输入搜索词');
                return ;
            }
            window.location.href = '/essearch.html?qcon='+escape(qcon);
        }
        //回车事件绑定
        $('#fldesqcon').bind('keypress', function(event) {
            if (event.keyCode == "13") {
                ToSearch();
            }
        });
        $('#IndexToSearch').bind('click').click(function(event) {
            ToSearch();
        });
    },
    toSearchView:function () {
        var url = window.location.search;
        Es.limit = 10;
        Es.pagePerGroup = 10;
        url = url.substring(1);
        var urlpar = url.split("&");
        var qcon;
        $.each(urlpar, function (index, v) {
            if (v.indexOf("qcon") != -1) {
                qcon =unescape(v.substring(5)) ;
            }
        });
        $("#essearchinput").val(qcon);
        Es.listEs(0,Es.limit);

        $('#essearchinput').bind('keypress', function(event) {
            if (event.keyCode == "13") {
                Es.listEs(0,Es.limit);
            }
        });
        $('#essearchbutton').bind('click').click(function(event) {
            Es.listEs(0,Es.limit);
        });
    },
    listEs: function (start, limit, pagePerGroup) {
        var waitDialog = dialog({
            content: '读取中...'
        });
        waitDialog.show();
        Platform.srv("es-search-search", {
            start: start ? start : '0',
            limit: limit ? limit : Es.limit,
            pagePerGroup: pagePerGroup ? pagePerGroup : Es.pagePerGroup,
            qcon: $("#essearchinput").val(),
            contentcut: 120
        }, function (r) {
            waitDialog.close().remove();
            if (r.totalCount > 0) {
                $("#tolspan").text("共搜索到相关数据"+r.totalCount+"条");
                Es.listData = r;
                var pagehtml = '<li>\
                           <a href="#" page="first">首页</a>\
                           </li>\
                           <li>\
                           <a href="#" page="last">上一页</a>\
                           </li>';
                if (r && r.pagePerGroup > 0) {
                    for (var j = r.groupStartPage; j <= r.groupEndPage; j++) {
                        if (j == r.page) {
                            pagehtml += '<li class="active">\
                               <a href="#" page="' + (j) + '">' + (j) + '</a>\
                               </li>';
                        } else {
                            pagehtml += '<li>\
                               <a href="#" page="' + (j) + '">' + (j) + '</a>\
                               </li>';
                        }

                    }
                }
                pagehtml += '<li>\
                       <a href="#" page="next">下一页</a>\
                       </li>';
                $("#pagelist").html("");
                $("#pagelist").append(pagehtml);
                $("#pagelist").find("a").unbind("click").click(function () {
                    var page = $(this).attr("page");
                    if (page == "last") {
                        if (Es.listData.pageGroup == 1) {
                            alert("没有上一页了");
                            return;
                        }
                        var current = Es.listData.page;
                        var s = (Es.listData.previousPageGroupLastPage - r.pagePerGroup) * Es.limit;
                        if (s < 0) s = 0;
                        Es.listEs(s, Es.limit);
                    } else if (page == "next") {

                        if (Es.listData.pageGroupCount == Es.listData.pageGroup) {
                            alert("没有下一页了");
                            return;
                        }
                        var s = (Es.listData.nextPageGroupFirstPage - 1) * Es.limit;
                        Es.listEs(s, Es.limit);
                    } else if (page == "first") {
                        Es.listEs(0, Es.limit);
                    } else {
                        var s = (page - 1) * Es.limit;
                        Es.listEs(s, Es.limit);
                    }
                });
                if (r && r.data) {
                    var data = r.data;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var fldtm = data[i].fldtm;
                        var fldattach = data[i].fldattach;
                        var fldcontent = data[i].fldtext || "内容是视频或图片....";
                        var fldngdate = data[i].fldngdate;
                        var year = new Date().getFullYear();
                        if (fldngdate.indexOf(year) != -1) {
                            fldngdate = fldngdate.replace(year + "-", "");
                        }
                        fldngdate = fldngdate.substring(0, fldngdate.length - 3);
                        if (!fldtm) {
                            if (data[i].fldcontent.length > 60)
                                fldtm = data[i].fldcontent.substring(0, 60);
                            else fldtm = data[i].fldcontent
                        }
                        html += '<div style="" class="list-group-item"><h4 class="list-group-item-heading" style="height:19px;"><a name="fldtma" dataid="'+ data[i].id + '"  style="float:left;cursor: pointer;">' + fldtm + '</a>' + '<span style="float:right;">&nbsp;&nbsp;' + fldngdate + '</span></h4><p class="list-group-item-text"><span style="color:#337ab7;">[内容]:</span>' + fldcontent + '</p><p class="list-group-item-text"><span style="color:#337ab7;">[附件]:</span>' + (fldattach?fldattach:"无") + '</p></div>';
                    }
                    $("#eslist").html("");
                    $("#eslist").append(html);

                    $("#eslist").find("a[name=fldtma]").unbind("click").click(function () {
                        var id=$(this).attr("dataid");
                        Platform.srv("commonservice-getById", {
                            className: "com.yyj.apps.es.index.model.Esdata",
                            id: id
                        }, function (r) {
                           Es.addData(r,'0');
                        });
                    });
                }
            } else {
                $("#pagelist").html("");
                $("#eslist").html("无内容");
            }
        });
    }

}