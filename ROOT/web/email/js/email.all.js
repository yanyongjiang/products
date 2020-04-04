Em = {
    init: function () {
        //绑定菜单点击事件
        $("#sendemail").unbind('click').click(function () {
            Em.sendMail();
        });
        $("#draftbox").unbind('click').click(function () {
            Em.beforeMenu = "draftbox";
            var post = {
                fldboxid: "draft",
                fldsjrid: loginUser.id
            }
            Em.listDraft(post, "#draftbox");
        });
        $("#deled").unbind('click').click(function () {
            Em.beforeMenu = "deled";
            var post = {
                fldboxid: "del",
                fldsjrid: loginUser.id
            }
            Em.listDraft(post, "#deled");
        });
        //inbox
        $("#inbox").unbind('click').click(function () {
            Em.beforeMenu = "inbox";
            var post = {
                fldboxid: "inbox",
                fldsjrid: loginUser.id
            }
            Em.listDraft(post, "#inbox");
        });
        $("#sended").unbind('click').click(function () {
            Em.beforeMenu = "sended";
            var post = {
                fldboxid: "send",
                fldsjrid: loginUser.id
            }
            Em.listDraft(post, "#sended");
        });

        var post = {
            fldboxid: "inbox",
            fldsjrid: loginUser.id
        }
        Em.listDraft(post, "#inbox");
        Em.beforeMenu = "inbox";

        //文件夹
        $("#folderaddcut").unbind('click').click(function (){
             var textClass=$(this).attr("class");
             if("glyphicon glyphicon-plus"==textClass){
                 Em.initFoldertree("treeFolder");
                 $(this).attr("class","glyphicon glyphicon-minus");
             }else{
                 $(this).attr("class","glyphicon glyphicon-plus");
                 if (Em.zTreeFolderObj) {
                     Em.zTreeFolderObj.destroy();
                 }
             }
        });
    },
    sendMail: function (record, showparams) {
        $("#menu").find("li").removeAttr("class");
        $("#sendemail").attr("class", "active");
        $('div[name=content]').html("");
        Platform.hrv('/email/form/mailsend.html', function (html) {
            var formid = "dataMailForm";
            $('div[name=content]').html(html);
            var height = $(window).height() - 52 - 34 - 49 - 49 - 63 - 30;
            $('#mailText').height(height);
            $('#fldcontent').height(height);
            //收件人选择
            $("#fldsjrbutton").unbind('click').click(function () {
                Em.chosepeo("fldsjr");
            });
            $("#sendDraft").unbind('click').click(function () {
                function toSend() {
                    Platform.srv("email-sendMail", {fldcontentid: $("#" + formid).find("#id").val()}, function (r) {
                        if (r) {
                            $("#" + Em.beforeMenu).click();
                        }
                    });
                }

                Em.saveDraft(function () {
                    toSend();
                });
            });
            $("#saveDraft").unbind('click').click(function () {
                Em.saveDraft();
            });
            $("#closeDraft").unbind('click').click(function () {
                if (showparams&&showparams.record) {
                    $("#menu").find("li").removeAttr("class");
                    $(showparams.draftboxid).attr("class", "active");
                    Em.showOnedraftbox(showparams.record, showparams.draftboxid, showparams.nowpostData);
                }else if(showparams&&showparams.draftboxid&&showparams.nowpostData) {
                    Em.listDraft(showparams.nowpostData, showparams.draftboxid);
                }
                else {
                    $("#" + Em.beforeMenu).click();
                }
            });
            $("#addCs").unbind('click').click(function () {
                var text = $(this).text();
                if ("添加抄送" == text) {
                    $("#fldcsrdiv").show();
                    $(this).text("删除抄送");
                } else {
                    $("#fldcsrdiv").hide();
                    $(this).text("添加抄送");
                }
            });
            $("#fldcjrbutton").unbind('click').click(function () {
                Em.chosepeo("fldcjr");
            });
            $("#addMs").unbind('click').click(function () {
                var text = $(this).text();
                if ("添加密送" == text) {
                    $("#fldmsrdiv").show();
                    $(this).text("删除密送");
                } else {
                    $("#fldmsrdiv").hide();
                    $(this).text("添加密送");
                }
            });
            $("#fldmjrbutton").unbind('click').click(function () {
                Em.chosepeo("fldmjr");
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
                $("#" + formid).find('input[id=' + 'state' + ']').val("1");
            }
            $("#" + formid).find("#pkid").val(Platform.uuid());
            Em.initUpAttach(formid, "1");

            if (record) {
                Platform.setFromValues(record, formid);

                function setShj(fldsjrids, fldsjrs, fldsjr) {
                    if (!fldsjrs || !fldsjrids) return;
                    var fldsjrsA = fldsjrs.split(",");
                    var fldsjridsA = fldsjrids.split(",");
                    $.each(fldsjrsA, function (index, value) {
                        var v = fldsjridsA[index];
                        var n = value;
                        $("#" + fldsjr).append('<a class="btn" type="button" name="usera" fldname="' + n + '" userid="' + v + '">' + n + '<span class="glyphicon glyphicon-remove"></span></a>')
                    });
                    $("#" + fldsjr).find('a[name=usera]').unbind('click').click(function () {
                        $(this).remove();
                    });
                }

                var fldsjrs = record.fldsjrs;
                var fldsjrids = record.fldsjrids;
                setShj(fldsjrids, fldsjrs, "fldsjr");
            }

            function autoncomplete(fldsjrautocomplete,fldsjr) {
                var $input = $("#"+fldsjrautocomplete);
                $input.typeahead({
                    matcher: function (item) {
                        return true;
                    },
                    source: function (query, process) {
                        Platform.srv('org-listUser', {qcon:query}, function (r) {
                            var rs=[];
                            if(r&&r.length>0){
                                $.each(r,function(index,value){
                                    var o={
                                        id:value.id,
                                        name:value.fldname
                                    }
                                    rs.push(o);
                                });
                            }
                            process(rs);
                        });
                    },
                    autoSelect: true,
                    afterSelect:function(value){
                        var n=value.name;
                        var v=value.id;
                        $("#"+fldsjrautocomplete).before('<a class="btn" type="button" name="usera" fldname="' + n + '" userid="' + v + '">' + n + '<span class="glyphicon glyphicon-remove"></span></a>')
                        $("#"+fldsjr).find('a[name=usera]').unbind('click').click(function () {
                            $(this).remove();
                        });
                        $("#"+fldsjrautocomplete).val("");
                        $("#"+fldsjrautocomplete).focus();
                    }
                });
            }

            autoncomplete("fldsjrautocomplete","fldsjr");
            autoncomplete("fldcjrautocomplete","fldcjr");
            autoncomplete("fldmjrautocomplete","fldmjr");

            $("#fldsjr").parent().unbind('click').click(function(){
                $("#fldsjrautocomplete").focus();
            });
            $("#fldcjr").parent().unbind('click').click(function(){
                $("#fldcjrautocomplete").focus();
            });
            $("#fldmjr").parent().unbind('click').click(function(){
                $("#fldmjrautocomplete").focus();
            });
        });
    },
    chosepeo: function (fldsjr) {
        Platform.hrv('/email/form/chosepeo.html', function (html) {
            var senddialog = dialog({
                title: '选择收件人',
                width: 680,
                height: 480,
                content: html,
                button: [
                    {
                        value: '确定',
                        callback: function () {
                            $("#" + fldsjr).find('a[name=usera]').remove();
                            $('span[name=rightUsers]').each(function (k) {
                                var v = $(this).attr('value');
                                var n = $(this).attr('fldname');
                                $("#" + fldsjr).find('input').before('<a class="btn" type="button" name="usera" fldname="' + n + '" userid="' + v + '">' + n + '<span class="glyphicon glyphicon-remove"></span></a>')
                            });
                            $("#" + fldsjr).find('a[name=usera]').unbind('click').click(function () {
                                $(this).remove();
                            });
                            return true;
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

            $("#chosepeo").closest(".ui-dialog-body").css('padding-left', '0px');
            $("#chosepeo").closest(".ui-dialog-body").css('padding-right', '0px');
            $("#chosepeo").closest(".ui-dialog-body").css('padding-top', '0px');
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
                    var one = {
                        id: $(this).attr("value"),
                        fldname: $(this).attr('fldname')
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
                        fldname: $(this).attr('fldname')
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
                                            <span type="checkbox" name="rightUsers" fldname="' + v.fldname + '" value="' + v.id + '">' + v.fldname +
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
            var choseA = $("#" + fldsjr).find('a[name=usera]');
            if (choseA && choseA.length > 0) {
                var userHtml = '';
                for (var i = 0; i < choseA.length; i++) {
                    var id = choseA.eq(i).attr("userid");
                    var fldname = choseA.eq(i).attr("fldname");
                    userHtml += '<div class="checkbox">\
                                            <label style="padding-left: 0px;">\
                                            <span type="checkbox" name="rightUsers" fldname="' + fldname + '" value="' + id + '">' + fldname +
                        '</span></label><span type="button" name="delSpan" class="glyphicon glyphicon-remove" style="color: red;float: right;"></span>\
                        </div>';
                }
                $("#sendToChoseUsers").html("");
                $("#sendToChoseUsers").html(userHtml);
                $("#sendToChoseUsers").find('span[name=delSpan]').unbind('click').click(function () {
                    var value = $(this).parent().find('span[name=rightUsers]').attr("value");
                    $("#sendToUsers").find('input[value=' + value + ']').prop("checked", false);
                    $(this).parent().remove();
                });
            }
        });
    },
    saveDraft: function (callback) {
        var params = Platform.getFromValues("dataMailForm");
        //取收件人
        var choseA = $("#fldsjr").find('a[name=usera]');//[name=usera]
        var fldsjrs = [];
        var fldsjrids = [];
        if (choseA && choseA.length > 0) {
            for (var i = 0; i < choseA.length; i++) {
                var id = choseA.eq(i).attr("userid");
                var fldname = choseA.eq(i).attr("fldname");
                fldsjrs.push(fldname);
                fldsjrids.push(id);
            }
        }
        params.fldsjrs = fldsjrs.join(",");
        params.fldsjrids = fldsjrids.join(",");

        if ($("#fldcsrdiv").is(':visible')) {
            choseA = $("#fldcjr").find('a[name=usera]');
            fldsjrs = [];
            fldsjrids = [];
            if (choseA && choseA.length > 0) {
                for (var i = 0; i < choseA.length; i++) {
                    var id = choseA.eq(i).attr("userid");
                    var fldname = choseA.eq(i).attr("fldname");
                    fldsjrs.push(fldname);
                    fldsjrids.push(id);
                }
            }
            params.fldcsrs = fldsjrs.join(",");
            params.fldcsrids = fldsjrids.join(",");
        }

        if ($("#fldmsrdiv").is(':visible')) {
            choseA = $("#fldmjr").find('a[name=usera]');
            fldsjrs = [];
            fldsjrids = [];
            if (choseA && choseA.length > 0) {
                for (var i = 0; i < choseA.length; i++) {
                    var id = choseA.eq(i).attr("userid");
                    var fldname = choseA.eq(i).attr("fldname");
                    fldsjrs.push(fldname);
                    fldsjrids.push(id);
                }
            }
            params.fldmsrs = fldsjrs.join(",");
            params.fldmsrids = fldsjrids.join(",");
        }

        Platform.srv("email-saveDraft", params, function (r) {
            if (r) {
                $("#dataMailForm").find("#id").val(r.id);
                $("#dataMailForm").find("#saveDraftTip").show();
                setTimeout(function () {
                    $("#dataMailForm").find("#saveDraftTip").hide();
                }, 5000);
                var pkid = $("#pkid").val();
                if (pkid && pkid != r.id) {
                    $("#pkid").val(r.id);
                    Platform.srv("email-updateEmAttachPkid", {oldpkid: pkid, pkid: r.id}, function (r3) {
                        if (callback && $.isFunction(callback)) {
                            callback.call(Em, r);
                        }
                    });
                } else {
                    if (callback && $.isFunction(callback)) {
                        callback.call(Em, r);
                    }
                }
            }
        });
    },
    listDraft: function (postData, draftboxid) {
        $("#menu").find("li").removeAttr("class");
        $(draftboxid).attr("class", "active");
        $('div[name=content]').html("");
        $('div[name=content]').html('<div class="col-md-12 column" id="draftboxgriddiv">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button type="button" class="btn btn-danger" id="todel" onclick="Em.deleteDraft();">删除</button>\
            <button type="button" class="btn btn-danger" onclick="Em.deleteCDraft();">彻底删除</button>\
            <button type="button" class="btn btn-default" onclick="Em.changSend();">转发</button>\
            <div style="display: inline-block;" id="movelist"></div>\
            <button class="btn btn-success" id="draftboxsearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="draftboxsearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
            </div>\
            <div style="width:99.8%;"><table id="draftboxGrid"></table>\
            <div id="draftboxGridPager"></div></div>\
            </div>');
        Em.draftbox = {};
        $("#draftboxGrid").jqGrid({
            multiselect: true,
            url: '/service/email-listDraft',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: postData ? postData : {},
            beforeRequest: function () {
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                postData.start = (postData.page - 1) * postData.rows;
                postData.limit = postData.rows;
                delete postData.qcon;
                if ($("#draftboxsearchinput").val()) {
                    postData.qcon = $("#draftboxsearchinput").val();
                }
            },
            colModel: [
                {label: '收件人', name: 'fldsjrs', width: 50},
                {
                    label: '主题', name: 'fldtm', formatter: function (cellValue, options, rowObject) {
                        var color='blue';
                        if(draftboxid=="#inbox"&&!rowObject.fldreadtime){
                            color='red';
                        }
                        return '<span style="color:'+color+';cursor: pointer;">' + (cellValue || "") + '</span>';
                    }
                },
                {
                    label: '时间', name: 'fldngtime', width: 30, formatter: function (cellValue, options, rowObject) {
                        return cellValue || "";
                    }
                }
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6 - 38 - 34 + 20,
            pager: "#draftboxGridPager",
            rowNum: Em.draftbox.rowNum || 20,
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
                Em.draftbox.rawRecordsMap = {};
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                var sn = postData.start;
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        r.sn = sn + index;
                        Em.draftbox.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == '2') {
                var grid = $(this).jqGrid();
                var nowpostData = grid.getGridParam('postData');
                Em.showOnedraftbox(Em.draftbox.rawRecordsMap[rowid], draftboxid, nowpostData);
                }
            }
        });
        Em.draftbox.todogrid = $("#draftboxGrid");
        $('#draftboxsearchinput').unbind('keypress').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                Em.draftbox.todogrid.trigger("reloadGrid");
            }
        });
        $('#draftboxsearchbutton').unbind('click').bind('click', function (event) {
            Em.draftbox.todogrid.trigger("reloadGrid");
        });
        Em.addboxlist("movelist");
        if (draftboxid == '#deled') {
            $('#todel').hide();
        }
    },
    deleteDraft: function () {
        var ids = Em.draftbox.todogrid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }
        Platform.srv("commonservice-updateByIds", {
            className: "com.yyj.apps.email.model.Orgemail",
            ids: ids.join(","),
            fldboxid: "del"
        }, function (r) {
            Em.draftbox.todogrid.trigger("reloadGrid");
        });
    },
    deleteCDraft: function () {
        var ids = Em.draftbox.todogrid.getGridParam("selarrrow");
        if (!ids || ids.length == 0) {
            bootbox.alert('请选择一条数据');
            return;
        }

        bootbox.confirm({
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-default'
                }
            },
            message: '请问，确定彻底删除吗？',
            callback: function (result) {
                if (result) {
                    Platform.srv("commonservice-updateByIds", {
                        className: "com.yyj.apps.email.model.Orgemail",
                        ids:ids.join(","),
                        state: "2"
                    }, function (r) {
                        Em.draftbox.todogrid.trigger("reloadGrid");
                    });
                } else {
                }
            },
        });
    },
    initUpAttach: function (formid, editmode) {
        Platform.loadCss('/ueditor/third-party/webuploader/webuploader.css');
        var prePaths = [];
        prePaths.push('/ueditor/third-party/webuploader/webuploader.min.js');
        Platform.loadScripts(prePaths, function () {
            var uploader = WebUploader.create({
                swf: '/ueditor/third-party/webuploader/Uploader.swf',
                formData: {"pkid": $("#pkid").val(), flduserid: loginUser.id, fldusername: loginUser.fldname},//参数列表
                // 文件接收服务端。
                server: '/service/email-saveEmAttach',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#attachUpload',
                auto: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                duplicate: true
            });
            uploader.on('uploadSuccess', function (file) {
                Em.initAttachList(formid, editmode, function (r) {
                    if (r && r[r.length - 1]) {
                        var fldfilename = r[r.length - 1].fldfilename;
                        if (fldfilename)
                            $("#" + formid).find("#fldtm").val(fldfilename.substring(0, fldfilename.lastIndexOf(".")));
                    }
                });
            });
            $("#attachUpload").find('.webuploader-pick').css('padding-bottom', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-top', '0px');
            $("#attachUpload").find('.webuploader-pick').css('padding-left', '5px');
            $("#attachUpload").find('.webuploader-pick').css('padding-right', '5px');
            $("#attachUpload").find('.webuploader-pick').css('overflow', 'visible');
        });
    },
    initAttachList: function (formid, editmode, callback) {
        var pkid = $("#" + formid).find("#pkid").val();
        if (!pkid) pkid = $("#" + formid).find("#id").val();
        var params = {
            pkid: pkid
        }
        Platform.srv("email-listEmAttach", params, function (r) {
            var attachhtml = "";
            if (r && r.length > 0) {
                $.each(r, function (index, v) {
                    var fldngdate = v.fldngdate.substring(0, 16);
                    var delspan = '<span name="attDel"  style="float:right;margin-left: 5px;color: blue;" fileid="' + v.id + '">删除</span>';
                    if (editmode == '0') delspan = "";
                    attachhtml += '<a href="#" class="list-group-item">' + delspan + '<span style="float:right;margin-left: 5px;">' + fldngdate + '</span><span style="float:right;">' + (v.fldusername || "") + '</span><span name="fileName" fileid="' + v.id + '">' + v.fldfilename + '</span></a>'
                });
                $("#attachlist").html(attachhtml);
            } else {
                $("#attachlist").html("");
            }

            $("#attachlist").find('span[name=attDel]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                if (fileid) {
                    Platform.srv("email-removeEmAttach", {id: fileid}, function (r) {
                        if (r) span.parent().remove();
                    });
                }
            });
            $("#attachlist").find('span[name=fileName]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                var url = '/service/email-downEmAttach?id=' + fileid;
                Platform.download(url);
            });
            if (callback && $.isFunction(callback)) {
                callback.call(Em, r);
            }
        });
    },
    showOnedraftbox: function (record, draftboxid, nowpostData) {
        var sn = record.sn;
        Platform.hrv('/email/form/mailshow.html', function (html) {
            var formid = "dataMailFormshow";
            $('div[name=content]').html(html);
            var height = $(window).height() - 52 - 34 - 49 - 49 - 63 - 30 - 49;

            $("#toback").unbind('click').click(function () {
                Em.listDraft(nowpostData, draftboxid);
            });
            $("#toreplay").unbind('click').click(function () {
                var fldcontent = "\n\n\n\n\n\n------------------ 原始邮件 ------------------" + "\n";
                fldcontent += "发件人: " + record.initusername + "\n";
                fldcontent += "发送时间: " + record.fldngtime + "\n";
                fldcontent += "收件人: " + record.fldsjrs + "\n";
                fldcontent += "主题: " + record.fldtm + "\n";
                fldcontent += "主题: " + record.fldcontent + "\n";
                var par = {
                    fldtm: "回复:" + record.fldtm,
                    fldcontent: fldcontent,
                    fldsjrs: record.initusername,
                    fldsjrids: record.inituserid
                }
                var showp = {
                    record: record,
                    draftboxid: draftboxid,
                    nowpostData: nowpostData
                }
                Em.sendMail(par, showp);
            });
            $("#toreplayAll").unbind('click').click(function () {
                var fldcontent = "\n\n\n\n\n\n------------------ 原始邮件 ------------------" + "\n";
                fldcontent += "发件人: " + record.initusername + "\n";
                fldcontent += "发送时间: " + record.fldngtime + "\n";
                fldcontent += "收件人: " + record.fldsjrs + "\n";
                fldcontent += "主题: " + record.fldtm + "\n";
                fldcontent += "主题: " + record.fldcontent + "\n";
                var sjrs=[];
                var sjrids=[];
                var fldsjrids=record.fldsjrids;
                var fldsjrs=record.fldsjrs;

                function setReplallAllsjr(fldsjrids,fldsjrs){
                    if(fldsjrids&&fldsjrs){
                        var fldsjridsA=fldsjrids.split(",");
                        var fldsjrsA=fldsjrs.split(",");
                        for(var i=0;i<fldsjridsA.length;i++){
                            if(sjrids.indexOf(fldsjridsA[i])==-1){
                                sjrids.push(fldsjridsA[i]);
                                sjrs.push(fldsjrsA[i]);
                            }
                        }
                    }
                }
                setReplallAllsjr(fldsjrids,fldsjrs);
                setReplallAllsjr(record.inituserid,record.initusername);
                var par = {
                    fldtm: "回复:" + record.fldtm,
                    fldcontent: fldcontent,
                    fldsjrs: sjrs.join(","),
                    fldsjrids: sjrids.join(",")
                }
                var showp = {
                    record: record,
                    draftboxid: draftboxid,
                    nowpostData: nowpostData
                }
                Em.sendMail(par, showp);
            });
            $("#changsend").unbind('click').click(function () {
                var fldcontent = "\n\n\n\n\n\n------------------ 原始邮件 ------------------" + "\n";
                fldcontent += "发件人: " + record.initusername + "\n";
                fldcontent += "发送时间: " + record.fldngtime + "\n";
                fldcontent += "收件人: " + record.fldsjrs + "\n";
                fldcontent += "主题: " + record.fldtm + "\n";
                fldcontent += "主题: " + record.fldcontent + "\n";
                var par = {
                    fldtm: "转发:" + record.fldtm,
                    fldcontent: fldcontent
                }
                var showp = {
                    record: record,
                    draftboxid: draftboxid,
                    nowpostData: nowpostData
                }
                Em.sendMail(par, showp);
            });
            //删除
            $("#todel").unbind('click').click(function () {
                Platform.srv("commonservice-updateByIds", {
                    className: "com.yyj.apps.email.model.Orgemail",
                    ids: record.id,
                    fldboxid: "del"
                }, function (r) {
                    var pos = {};
                    $.extend(pos, nowpostData);
                    pos.start = sn;
                    pos.limit = 1;
                    Platform.srv("email-listDraft", pos, function (r) {
                        if (r && r.data[0]) {
                            var nowr = r.data[0];
                            nowr.sn = sn;
                            Em.showOnedraftbox(nowr, draftboxid, nowpostData);
                        } else {
                            // bootbox.alert('已经是最后一封了');
                            Em.listDraft(nowpostData, draftboxid);
                            return;
                        }
                    });
                });
            });
            $("#toCdel").unbind('click').click(function () {
                bootbox.confirm({
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-primary'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-default'
                        }
                    },
                    message: '请问，确定彻底删除吗？',
                    callback: function (result) {
                        if (result) {
                            Platform.srv("commonservice-updateByIds", {
                                className: "com.yyj.apps.email.model.Orgemail",
                                ids: record.id,
                                state: "2"
                            }, function (r) {
                                var pos = {};
                                $.extend(pos, nowpostData);
                                pos.start = sn;
                                pos.limit = 1;
                                Platform.srv("email-listDraft", pos, function (r) {
                                    if (r && r.data[0]) {
                                        var nowr = r.data[0];
                                        nowr.sn = sn;
                                        Em.showOnedraftbox(nowr, draftboxid, nowpostData);
                                    } else {
                                        // bootbox.alert('已经是最后一封了');
                                        Em.listDraft(nowpostData, draftboxid);
                                        return;
                                    }
                                });
                            });
                        } else {
                        }
                    },
                });

            });
            $("#toNext").unbind('click').click(function () {
                var pos = {};
                $.extend(pos, nowpostData);
                pos.start = sn + 1;
                pos.limit = 1;
                Platform.srv("email-listDraft", pos, function (r) {
                    if (r && r.data[0]) {
                        var nowr = r.data[0];
                        nowr.sn = sn + 1;
                        Em.showOnedraftbox(nowr, draftboxid, nowpostData);
                    } else {
                        bootbox.alert('没有下一封了');
                        return;
                    }
                });
            });
            $("#toLast").unbind('click').click(function () {
                if (sn == 0) {
                    bootbox.alert('没有上一封了');
                    return;
                }
                var pos = {};
                $.extend(pos, nowpostData);
                pos.start = sn - 1;
                pos.limit = 1;
                Platform.srv("email-listDraft", pos, function (r) {
                    if (r && r.data[0]) {
                        var nowr = r.data[0];
                        nowr.sn = sn - 1;
                        Em.showOnedraftbox(nowr, draftboxid, nowpostData);
                    } else {
                        bootbox.alert('没有上一封了');
                        return;
                    }
                });
            });

            $("#fldmjrbutton").unbind('click').click(function () {
                Em.chosepeo("fldmjr");
            });
            Platform.setFromValues(record, formid);
            $("#" + formid).find("#emailid").val(record.id);
            $("#" + formid).find("#pkid").val(record.fldcontentid);
            function setShj(fldsjrs, fldsjr) {
                if (!fldsjrs) return;
                var fldsjrsA = fldsjrs.split(",");
                $.each(fldsjrsA, function (index, value) {
                    $("#" + fldsjr).append('<a class="btn" type="button">' + value + '</a>');
                });
            }

            var fldsjrs = record.fldsjrs;
            setShj(fldsjrs, "fldsjr");
            var fldcjrs = record.fldcsrs;
            if (fldcjrs) {
                $("#fldcsrdiv").show();
                setShj(fldcjrs, "fldcjr");
            }
            var fldmjrids = record.fldmsrids;
            if(fldmjrids && record.inituserid==loginUser.id){
                $("#fldmsrdiv").show();
                setShj(record.fldmsrs, "fldmjr");
            }
            else if (fldmjrids && fldmjrids.indexOf(loginUser.id) != -1) {
                $("#fldmsrdiv").show();
                setShj(loginUser.fldname, "fldmjr");
            }
            Em.initAttachList(formid, "0", function (r) {
                if (!r || r.length == 0) {
                    $("#attachlistdiv").hide();
                    height = height + 63;
                    $('#mailText').height(height);
                    $('#fldcontent').height(height);
                } else {
                    $('#mailText').height(height);
                    $('#fldcontent').height(height);
                }
            });

            if (draftboxid == '#deled') {
                $('#todel').hide();
            }
            Em.addboxlist("movelist",function () {
                var pos = {};
                $.extend(pos, nowpostData);
                pos.start = sn;
                pos.limit = 1;
                Platform.srv("email-listDraft", pos, function (r) {
                    if (r && r.data[0]) {
                        var nowr = r.data[0];
                        nowr.sn = sn + 1;
                        Em.showOnedraftbox(nowr, draftboxid, nowpostData);
                    } else {
                        Em.listDraft(nowpostData, draftboxid);
                        return;
                    }
                });
            });
            if(record&&!record.fldreadtime){
                Platform.srv("commonservice-updateByIds", {
                    className: "com.yyj.apps.email.model.Orgemail",
                    ids: record.id,
                    fldreadtime: Platform.getCurrentDate(2)
                }, function (r) {

                });
            }
        });
    },
    addboxlist: function (movelist,callback) {
        var html = ' <div class="dropdown" style="display: inline-block;">\n' +
            '<a class="btn btn-default dropdown-toggle" style="padding-top: 5px;padding-bottom: 5px;border-bottom-width: 0px;border-top-width: 0px;" id="toMove" data-toggle="dropdown"\n' +
            'aria-haspopup="true" aria-expanded="false">移动到<span class="glyphicon glyphicon-menu-down"></span></a>\n' +
            '<ul id="folderul" class="dropdown-menu" aria-labelledby="toMove" style="min-width:80px;">\n' + '</ul>\n' +
            '</div>';

        var params = {
            "inituserid":window.loginUser.id
        }
        Platform.srv("email-listFolder", params, function (r) {
            var folderhtml='';
            if(r&&r.length>0){
                $.each(r,function(index,value){
                    folderhtml+='<li name="folderli" folderid="'+value.id+'"><a href="#">'+value.fldname+'</a></li>';
                });
            }
            var folderlis= '<li name="folderli" folderid="'+'inbox'+'"><a href="#">'+'收件箱'+'</a></li> '+
                '<li name="folderli" folderid="'+'draft'+'"><a href="#">'+'草稿箱'+'</a></li> '+
                '<li name="folderli" folderid="'+'send'+'"><a href="#">'+'已发送'+'</a></li> '+
                '<li name="folderli" folderid="'+'del'+'"><a href="#">'+'已删除'+'</a></li> '+folderhtml+
                '<li role="separator" class="divider"></li>' +
                '    <li id="addfolder"><a href="#">新建文件夹...</a></li>'
            $("#"+movelist).html("");
            $("#"+movelist).append(html);
            $("#folderul").html("");
            $("#folderul").append(folderlis);
            $("#addfolder").unbind('click').click(function () {
                Em.addFolder();
            });
            $("li[name=folderli]").unbind('click').click(function () {
                var ids=[];
                var folderid=$(this).attr("folderid");
                if($("#dataMailFormshow").find("#emailid").val()){
                    ids.push($("#dataMailFormshow").find("#emailid").val());
                }else{
                    if(!Em.draftbox||!Em.draftbox.todogrid) return;
                    ids = Em.draftbox.todogrid.getGridParam("selarrrow");
                    if (!ids || ids.length == 0) {
                        bootbox.alert('请选择一条数据');
                        return;
                    }
                }
                Platform.srv("commonservice-updateByIds", {
                    className: "com.yyj.apps.email.model.Orgemail",
                    ids:ids.join(","),
                    fldboxid:folderid
                }, function (r) {
                    if (callback && $.isFunction(callback)) {
                        callback.call(Em, r);
                    }else{
                        Em.draftbox.todogrid.trigger("reloadGrid");
                    }
                });
            });
        });

    },
    changSend:function () {
        var ids = Em.draftbox.todogrid.getGridParam("selarrrow");
        if (!ids || ids.length == 0||ids.length>1) {
            bootbox.alert('请选择一条数据');
            return;
        }
        var rowid=ids[0];
        var nowpostData = Em.draftbox.todogrid.getGridParam('postData');
        var record=Em.draftbox.rawRecordsMap[rowid];
        var draftboxid="#inbox";
        //$("#menu").find(".active").attr("id")
        if($("#menu").find(".active").length>0){
            draftboxid="#"+$("#menu").find(".active").eq(0).attr("id");
        }
        var fldcontent = "\n\n\n\n\n\n------------------ 原始邮件 ------------------" + "\n";
        fldcontent += "发件人: " + record.initusername + "\n";
        fldcontent += "发送时间: " + record.fldngtime + "\n";
        fldcontent += "收件人: " + record.fldsjrs + "\n";
        fldcontent += "主题: " + record.fldtm + "\n";
        fldcontent += "主题: " + record.fldcontent + "\n";
        var par = {
            fldtm: "转发:" + record.fldtm,
            fldcontent: fldcontent
        }
        var showp = {
            draftboxid: draftboxid,
            nowpostData: nowpostData
        }
        Em.sendMail(par, showp);
    },
    initFoldertree: function (treeId) {
        if (Em.zTreeFolderObj) {
            Em.zTreeFolderObj.destroy();
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
                url: "/service/email-listFolder",
                autoParam: ["id", "name=n", "level=lv"],
                dataFilter: filter,
                otherParam:{"inituserid":function(){return window.loginUser.id}}
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
                    var nodes2 = Em.zTreeFolderObj.getSelectedNodes();
                    if (!nodes2 || nodes2.length == 0) {
                        $('#orgmemu').find('li').eq(1).hide();
                        $('#orgmemu').find('li').eq(2).hide();
                    } else {
                        $('#orgmemu').find('li').eq(1).show();
                        $('#orgmemu').find('li').eq(2).show();
                    }
                    $('#orgmemu').show();
                    $('#orgmemu').find('li').unbind('click').click(function () {
                        var treeObj=Em.zTreeFolderObj;
                        var nodes2 = treeObj.getSelectedNodes();
                        var action = $(this).attr('action');
                        if ("add" == action) {
                            Em.addFolder(null,null,function(){
                                treeObj.reAsyncChildNodes(null, "refresh");
                            });
                        }
                        if ("edit" == action) {
                            if (nodes2[0]) {
                                Em.addFolder(null, nodes2[0],function(r){
                                    nodes2[0].name = r.fldname;
                                    treeObj.updateNode(nodes2[0]);
                                });
                            }
                        }
                        if ("del" == action) {
                            if (nodes2[0]) {
                                Platform.srv("commonservice-updateByIds", {
                                    className: "com.yyj.apps.email.model.Orgemailfolder",
                                    ids: nodes2[0].id,
                                    state: "2"
                                }, function (r) {
                                    treeObj.reAsyncChildNodes(null, "refresh");                                });
                                }
                        }
                    });

                    $("#orgmemu").unbind('mouseleave').on('mouseleave', function () {
                        $(this).hide();
                        return false;
                    });
                },
                onAsyncSuccess: function (event, treeId) {
                    if (Em.zTreeFolderObj.isFirstChild) {
                        var zTree = Em.zTreeFolderObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.selectNode(nodeList[0].children[0]);
                        // if (Org.user && Org.user.grid) {
                        //     Org.user.grid.trigger("reloadGrid");
                        // }
                        Em.zTreeFolderObj.isFirstChild = false;
                    }

                    if (Em.zTreeFolderObj.isFirst) {
                        //获得树形图对象
                        var zTree = Em.zTreeFolderObj;
                        //获取根节点个数,getNodes获取的是根节点的集合
                        var nodeList = zTree.getNodes();
                        //展开第一个根节点
                        zTree.expandNode(nodeList[0], true);
                        Em.zTreeFolderObj.isFirstChild = true;
                        //当再次点击节点时条件不符合,直接跳出方法
                        Em.zTreeFolderObj.isFirst = false;
                    }

                },
                onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    if (!targetNode) return;
                    var children = Em.zTreeFolderObj.getNodes();;
                    if (children && children.length > 0) {
                        var updateM = [];
                        $.each(children, function (i, n) {
                            updateM.push({id: n.id, fldsn: (i + 1)});
                        })
                        Platform.srv("email-updateFolderfldsn", updateM, function (r) {

                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    if (treeNode.id) {
                        var post = {
                            fldboxid: treeNode.id,
                            fldsjrid: loginUser.id
                        }
                        Em.listDraft(post, "#"+treeNode.id);
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
        $("#" + treeId).parent().height($(window).height() - $('#folderaddcut').parent().height() - $('#orgtitldiv').height()-$('#menu').height()-18);
        Em.zTreeFolderObj = $.fn.zTree.init($("#" + treeId), setting);
        Em.zTreeFolderObj.isFirst = true;
        $(document).click(function () {
            $("#orgmemu").hide();
        });
    },
    addFolder: function (movelist,record,callback) {
        var formid = 'folderfrom';
        var html = '\
            <div class="container" style="width: 100%;">\
                <div class="row clearfix">\
                    <div class="col-md-12 column">\
                        <form class="form-horizontal" role="form" id="' + formid + '">\
                            <input type="hidden" id="id">\
                            <input type="hidden" id="fldparentid">\
                            <input type="hidden" id="fldparentname">\
                            <input type="hidden" id="fldparentname">\
                            <input type="hidden" id="initbmid">\
                            <input type="hidden" id="initbm">\
                            <input type="hidden" id="initdeptid">\
                            <input type="hidden" id="initdeptname">\
                            <input type="hidden" id="initunitid">\
                            <input type="hidden" id="initunitname">\
                            <input type="hidden" id="inituserid">\
                            <input type="hidden" id="initusername">\
                            <input type="hidden" id="fldngtime">\
                            <input type="hidden" id="state">\
                            <input type="hidden" id="fldsn" />\
                            <div class="form-group">\
                                <div class="col-sm-12">请您输入文件夹名称</div>\
                                <div class="col-sm-12">\
                                    <input type="text" class="form-control" id="fldname" />\
                                </div>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            ';
        var title = '新建文件夹';
        if (record)
             title = '编辑文件夹';
        var d = dialog({
            title: title,
            width: 360,
            content: html,
            button: [
                {
                    value: '保存',
                    callback: function () {
                        var fldname = $('#fldname').val();
                        if (!fldname) {
                            alert("请输入文件夹名称");
                            return;
                        }
                        var params = Platform.getFromValues(formid);
                        Platform.srv("email-saveFolder", params, function (r) {
                            d.close().remove();
                            if(movelist)
                            Em.addboxlist(movelist);
                            if (callback && $.isFunction(callback)) {
                                callback.call(Em, r);
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
        if(record){
            Platform.setFromValues(record,formid);
        }
        else if (window.loginUser) {
            $("#" + formid).find('input[id=' + 'initbmid' + ']').val(window.loginUser.bmid);
            $("#" + formid).find('input[id=' + 'initbm' + ']').val(window.loginUser.bmname);
            $("#" + formid).find('input[id=' + 'initdeptid' + ']').val(window.loginUser.deptid);
            $("#" + formid).find('input[id=' + 'initdeptname' + ']').val(window.loginUser.deptname);
            $("#" + formid).find('input[id=' + 'initunitid' + ']').val(window.loginUser.unitid);
            $("#" + formid).find('input[id=' + 'initunitname' + ']').val(window.loginUser.unitname);
            $("#" + formid).find('input[id=' + 'inituserid' + ']').val(window.loginUser.id);
            $("#" + formid).find('input[id=' + 'initusername' + ']').val(window.loginUser.fldname);
            $("#" + formid).find('input[id=' + 'fldngtime' + ']').val(Platform.getCurrentDate(2));
            $("#" + formid).find('input[id=' + 'state' + ']').val("1");
            //设置序号值
            Platform.srv("email-getMaxFolderSn", {inituserid:loginUser.id}, function (r) {
                if (r && r > 0)
                    $('#' + formid).find('#fldsn').val(r + 1);
                else
                    $('#' + formid).find('#fldsn').val(1);
            });
        }
    },
}