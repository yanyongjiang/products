/**
 * Created by yanyongjiang on 2018/3/17.
 */
Bbs = {
    ueditorconfig: /* 前后端通信相关的配置,注释只允许使用多行方式 */
        {
            /* 上传图片配置项 */
            "imageActionName": "uploadimage", /*执行上传图片的action名称 */
            "imageFieldName": "upfile", /* 提交的图片表单名称 */
            "imageMaxSize": 92048000, /* 上传大小限制，单位B */
            "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
            "imageCompressEnable": true, /* 是否压缩图片,默认是true */
            "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
            "imageInsertAlign": "none", /* 插入的图片浮动方式 */
            "imageUrlPrefix": "", /* 图片访问路径前缀 */
            "imagePathFormat": "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
            /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
            /* {time} 会替换成时间戳 */
            /* {yyyy} 会替换成四位年份 */
            /* {yy} 会替换成两位年份 */
            /* {mm} 会替换成两位月份 */
            /* {dd} 会替换成两位日期 */
            /* {hh} 会替换成两位小时 */
            /* {ii} 会替换成两位分钟 */
            /* {ss} 会替换成两位秒 */
            /* 非法字符 \ : * ? " < > | */
            /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

            /* 涂鸦图片上传配置项 */
            "scrawlActionName": "uploadscrawl", /* 执行上传涂鸦的action名称 */
            "scrawlFieldName": "upfile", /* 提交的图片表单名称 */
            "scrawlPathFormat": "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "scrawlMaxSize": 2048000, /* 上传大小限制，单位B */
            "scrawlUrlPrefix": "", /* 图片访问路径前缀 */
            "scrawlInsertAlign": "none",

            /* 截图工具上传 */
            "snapscreenActionName": "uploadimage", /* 执行上传截图的action名称 */
            "snapscreenPathFormat": "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "snapscreenUrlPrefix": "", /* 图片访问路径前缀 */
            "snapscreenInsertAlign": "none", /* 插入的图片浮动方式 */

            /* 抓取远程图片配置 */
            "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
            "catcherActionName": "catchimage", /* 执行抓取远程图片的action名称 */
            "catcherFieldName": "source", /* 提交的图片列表表单名称 */
            "catcherPathFormat": "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "catcherUrlPrefix": "", /* 图片访问路径前缀 */
            "catcherMaxSize": 2048000, /* 上传大小限制，单位B */
            "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 抓取图片格式显示 */

            /* 上传视频配置 */
            "videoActionName": "uploadvideo", /* 执行上传视频的action名称 */
            "videoFieldName": "upfile", /* 提交的视频表单名称 */
            "videoPathFormat": "/ueditor/jsp/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "videoUrlPrefix": "", /* 视频访问路径前缀 */
            "videoMaxSize": 102400000, /* 上传大小限制，单位B，默认100MB */
            "videoAllowFiles": [
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */

            /* 上传文件配置 */
            "fileActionName": "uploadfile", /* controller里,执行上传视频的action名称 */
            "fileFieldName": "upfile", /* 提交的文件表单名称 */
            "filePathFormat": "/ueditor/jsp/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "fileUrlPrefix": "", /* 文件访问路径前缀 */
            "fileMaxSize": 51200000, /* 上传大小限制，单位B，默认50MB */
            "fileAllowFiles": [
                ".png", ".jpg", ".jpeg", ".gif", ".bmp",
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
                ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
                ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
            ], /* 上传文件格式显示 */

            /* 列出指定目录下的图片 */
            "imageManagerActionName": "listimage", /* 执行图片管理的action名称 */
            "imageManagerListPath": "/ueditor/jsp/upload/image/", /* 指定要列出图片的目录 */
            "imageManagerListSize": 20, /* 每次列出文件数量 */
            "imageManagerUrlPrefix": "", /* 图片访问路径前缀 */
            "imageManagerInsertAlign": "none", /* 插入的图片浮动方式 */
            "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 列出的文件类型 */

            /* 列出指定目录下的文件 */
            "fileManagerActionName": "listfile", /* 执行文件管理的action名称 */
            "fileManagerListPath": "/ueditor/jsp/upload/file/", /* 指定要列出文件的目录 */
            "fileManagerUrlPrefix": "", /* 文件访问路径前缀 */
            "fileManagerListSize": 20, /* 每次列出文件数量 */
            "fileManagerAllowFiles": [
                ".png", ".jpg", ".jpeg", ".gif", ".bmp",
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
                ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
                ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
            ] /* 列出的文件类型 */

        },
    //初始化百度编辑器
    initUmeditor: function (contentid, callback) {
        var prePaths = [];
        prePaths.push('/ueditor/ueditor.config.js');
        prePaths.push('/ueditor/ueditor.all.min.js');
        prePaths.push('/ueditor/lang/zh-cn/zh-cn.js');
        Platform.loadScripts(prePaths, function () {
            window.UEDITOR_CONFIG.serverUrl = "/service/bbs-postreplay-saveUeAttach";
            var containerId = "umeditor-" + contentid;
            $("#" + contentid).html('<script type="text/plain" id="' + containerId + '" style="width:100%;height:240px;"></script>');
            //不用异步去请求config.json配置，改成直接读取js
            UE.Editor.prototype.loadServerConfig = function () {
                var me = this;
                setTimeout(function () {
                    try {
                        me.options.imageUrl && me.setOpt('serverUrl', me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2'));
                        var configUrl = me.getActionUrl('config'),
                            isJsonp = UE.utils.isCrossDomainUrl(configUrl);
                        /* 发出ajax请求 */
                        me._serverConfigLoaded = false;
                        //UE.utils
                        UE.utils.extend(me.options, Bbs.ueditorconfig);
                        me.fireEvent('serverConfigLoaded');
                        me._serverConfigLoaded = true;
                    } catch (e) {
                        showErrorMsg(me.getLang('loadconfigError'));
                    }
                });

                function showErrorMsg(msg) {
                    console && console.error(msg);
                }
            };
            var config={
                toolbars: [
                    ['undo', 'redo',
                        '|', 'bold', 'italic', 'underline',
                        '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
                        '|', 'fontfamily', 'fontsize', 'forecolor', 'backcolor',
                        '|', 'insertorderedlist', 'insertunorderedlist','emotion', 'simpleupload','insertimage','scrawl','insertvideo','map','attachment','fullscreen'] //'|', 'insertimage'
                ]
            };
            var um = UE.getEditor(containerId,config);
            um.ready(function () {
                $("#id").val(Platform.uuid());
                um.execCommand('serverparam', function (editor) {
                    return {
                        'pkid': $("#id").val()
                    };
                });
                if (callback && $.isFunction(callback)) {
                    callback.call(Bbs, um);
                }
            });
            Bbs.um = um;
        });
    },
    init: function (editorContenid) {
        Bbs.initUmeditor(editorContenid);
        Bbs.limit = 10;
        Bbs.pagePerGroup = 10;
        Bbs.listPost();
        Bbs.postSearch();
        //初始化账号信息
        Bbs.initLoginUser();
    },
    postSearch: function () {
        $("#postsearchbutton").unbind("click").click(function () {
            Bbs.listPost();
        });
        $('#postsearchinput').bind('keypress', function (event) {
            if (event.keyCode == 13) {
                Bbs.listPost();
            }
        });
    },
    listPost: function (start, limit, pagePerGroup) {
        Platform.srv("bbs-postreplay-listPost", {
            start: start ? start : '0',
            limit: limit ? limit : Bbs.limit,
            pagePerGroup: pagePerGroup ? pagePerGroup : Bbs.pagePerGroup,
            qcon: $("#postsearchinput").val(),
            contentcut: 480
        }, function (r) {
            if (r.totalCount > 0) {
                Bbs.listData = r;
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
                        if (Bbs.listData.pageGroup == 1) {
                            alert("没有上一页了");
                            return;
                        }
                        var current = Bbs.listData.page;
                        var s = (Bbs.listData.previousPageGroupLastPage - r.pagePerGroup) * Bbs.limit;
                        if (s < 0) s = 0;
                        Bbs.listPost(s, Bbs.limit);
                    } else if (page == "next") {

                        if (Bbs.listData.pageGroupCount == Bbs.listData.pageGroup) {
                            alert("没有下一页了");
                            return;
                        }
                        var s = (Bbs.listData.nextPageGroupFirstPage - 1) * Bbs.limit;
                        Bbs.listPost(s, Bbs.limit);
                    } else if (page == "first") {
                        Bbs.listPost(0, Bbs.limit);
                    } else {
                        var s = (page - 1) * Bbs.limit;
                        Bbs.listPost(s, Bbs.limit);
                    }
                });
                if (r && r.data) {
                    var data = r.data;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var fldtm = data[i].fldtm;
                        var fldcontent = data[i].fldtext;
                        if(data[i].fldcontent) fldcontent += '<br>'+(data[i].fldcontent||"");
                        var fldname = data[i].fldname;
                        var fldngdate = data[i].fldngdate;
                        var flduserid = data[i].flduserid;
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
                        html += '<div style="" class="list-group-item"><h4 class="list-group-item-heading" style="height:19px;"><a href="replay.html?postid=' + data[i].id + '" target="_blank" style="float:left;">' + fldtm + '</a>' + '<span style="float:right;">&nbsp;&nbsp;' + fldngdate + '</span><span name="chatUser" style="float:right;cursor: pointer" fldname="' + fldname + '" flduserid="' + flduserid + '" title="私信' + fldname + '">' + fldname + '</span></h4><p class="list-group-item-text bbs-list-item-text">' + fldcontent + '</p></div>';
                    }
                    $("#postlist").html("");
                    $("#postlist").append(html);
                    $("span[name=chatUser]").unbind("click").click(function () {
                        if (!window.loginUser || !window.loginUser.id) return;
                        var flduserid = $(this).attr("flduserid");
                        var fldname = $(this).attr("fldname");
                        if (window.loginUser.id == flduserid) return;
                        var addPar = {
                            flduserid: window.loginUser.id,
                            fldfriendid: flduserid,
                            fldngdate: Platform.getCurrentDate(2)
                        }
                        Platform.srv("bbs-chat-addFriendUser", addPar, function (r) {
                            Bbs.chat(flduserid);
                        });
                    });
                }
            } else {
                $("#pagelist").html("");
                $("#postlist").html("无内容");
            }
        });
    },
    chat: function (flduserid) {
        function initChatSocket() {
            if (Bbs.Chat) return;
            var Chat = {};
            Chat.connect = (function (host) {
                if ('WebSocket' in window) {
                    Chat.socket = new WebSocket(host);
                } else if ('MozWebSocket' in window) {
                    Chat.socket = new MozWebSocket(host);
                } else {
                    return;
                }

                Chat.socket.onopen = function () {
                    //连接成功绑定发送按钮
                    //document.getElementById('chat').onkeydown = function(event) {
                    //    if (event.keyCode == 13) {
                    //        Chat.sendMessage();
                    //    }
                    //};
                    toChat();
                };

                Chat.socket.onclose = function () {
                    //监听连接关闭
                    Chat.socket = null;
                    Bbs.Chat = null;
                };

                Chat.socket.onmessage = function (message) {
                    //服务器发送过来的消息
                    var data = message.data;
                    if (data) {
                        var data0 = JSON.parse(message.data);
                        var ids = data0.ids;
                        if (ids) {
                            var idsA = ids.split(",");
                            var name = loginUser.fldname + '<已读>';
                            $.each(idsA, function (index, v) {
                                $("span[textid=" + v + "]").text(name);
                            });
                            return;
                        }
                        var from = data0.fldfrom;
                        var to = data0.fldto;
                        if (from == window.loginUser.id) {
                            var nowto = $('a[name=current]').attr("fldfriendid");
                            if (to == nowto) {

                                var text = data0.fldtext;
                                var name = loginUser.fldname;
                                if (data0.fldrdate) {
                                    name += '<已读>';
                                }
                                var html = '<li class="list-group-item" style="overflow: auto;border-top-width: 0px;border-bottom-width: 0px;" >\
                                            <div style="float: right;width: 100%;"><span style="float: right;" textid="' + data0.id + '">' + name + '</span></div>\
                                            <div style="margin-right: 10px;">\
                                            <div style="float:right;background-color: #e2e2e2;color: #333;border-radius: 5px;">' + text + '</div>\
                                            </div>\
                                            <div style="float: right;position: absolute;top: 30px;right: 16px;width:0;height:0;font-size:0;border:solid 8px;border-color: #e2e2e2 rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(255,255,255,.15);"></div>\
                                            </li>';
                                $("#chatContent").append(html);
                                $("#message").val('');
                            }
                        }
                        if (to == window.loginUser.id) {
                            var nowto = $('a[name=current]').attr("fldfriendid");
                            if (from == nowto) {
                                var text = data0.fldtext;
                                var nowtoUser = $("#ToChatUser").text();
                                var html = '<li class="list-group-item" style="overflow: auto;border-top-width: 0px;border-bottom-width: 0px;" >\
                                            <div style="float: left;width: 100%;"><span style="float: left;" textid="' + data0.id + '">' + nowtoUser + '</span></div>\
                                            <div style="margin-left: 10px;" textid="' + data0.id + '">\
                                            <div style="float:left;background-color: #5FB878;color: #fff;border-radius: 5px;">' + text + '</div>\
                                            </div>\
                                            <div style="float: left;position: absolute;top: 30px;left: 16px;width:0;height:0;font-size:0;border:solid 8px;border-color: #5FB878 rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(255,255,255,.15);"></div>\
                                            </li>';
                                $("#chatContent").append(html);
                            }
                        }
                        calUlh();
                        var ulH = $("ul.list-group").height();
                        var divUlh = $("ul.list-group").parent().height();
                        if (ulH > divUlh) {
                            $("ul.list-group").parent().scrollTop($("ul.list-group").parent()[0].scrollHeight);
                        }
                    }
                };
            });
            Chat.initialize = function () {
                if (window.location.protocol == 'http:') {
                    Chat.connect('ws://' + window.location.host + '/websocket/chat/' + window.loginUser.id);
                } else {
                    Chat.connect('wss://' + window.location.host + '/websocket/chat/' + window.loginUser.id);
                }
            };
            if (!Chat.socket) {
                Chat.socket = null;
                Chat.initialize();
            }
            Bbs.Chat = Chat;
        }

        //计算li的高度，如果高度总和超过ul的高度则改一下样式。
        function calUlh() {
            var li = $("ul.list-group").find('li');
            var contH = 0;
            var ulH = $("ul.list-group").height();
            for (var i = 0; i < li.length; i++) {
                contH += li.eq(i).height() + 20;
            }
            if (contH > ulH) {
                $("ul.list-group").css("height", contH + "px");
                $("ul.list-group").parent().css("padding-right", "0px");
            }
        }

        function toChat() {
            var chartUi='chatUi.html';
            if($(window).width()<1000) chartUi='MchatUi.html';
            Platform.hrv('/bbs/form/chat/'+chartUi, function (html) {
                var w = 1000;
                if($(window).width()<1000) w=$(window).width()-42;
                var h = $(window).height() - 40 - 16 - 2 - 42 + 2;

                var d = dialog({
                    title: '私信',
                    width: w,
                    height: h,
                    content: html,
                    onremove: function () {
                        if (Bbs.Chat) {
                            Bbs.Chat.socket.close();
                            Bbs.Chat.socket = null;
                            Bbs.Chat = null;
                        }
                    },
                    onshow: function () {
                        $('#chatForm').closest('table').find('.ui-dialog-title').before('<button name="max" class="ui-dialog-close glyphicon glyphicon-resize-full"></button>');
                        $('#chatForm').closest('table').find('.ui-dialog-title').before('<button name="mix" class="ui-dialog-close glyphicon glyphicon glyphicon-resize-small"></button>');
                        $('#chatForm').closest('table').find("button[name=max]").unbind('click').click(function () {
                            var w = $(window).width() - 42 - 17 + 8 + 4;
                            var h = $(window).height() - 40 - 16 - 2 - 42 + 2;
                            d.height(h);
                            d.width(w);
                            $('#chatForm').closest('table').find("button[name=mix]").show();
                            $('#chatForm').closest('table').find("button[name=max]").hide();
                            $('#chatForm').closest('table').find("ul.list-group").parent().height(h - 32 - 36 - 150 - 34);
                        });
                        $('#chatForm').closest('table').find("button[name=mix]").unbind('click').click(function () {
                            var w = 1000;
                            if($(window).width()<1000) w=$(window).width()-42;
                            var h = $(window).height() - 40 - 16 - 2 - 42 + 2;
                            d.height(h);
                            d.width(w);
                            $('#chatForm').closest('table').find("button[name=mix]").hide();
                            $('#chatForm').closest('table').find("button[name=max]").show();
                            $('#chatForm').closest('table').find("ul.list-group").parent().height(h - 32 - 36 - 150 - 34);
                        });
                        $('#chatForm').closest('table').find("button[name=mix]").hide();
                    }
                });
                d.show();
                $("ul.list-group").parent().height(h - 32 - 36 - 150 - 34);
                //查出好友列表
                $("#sendButton").unbind('click').click(function () {
                    var text = $("#message").val();
                    if (!text) return;
                    var m = {
                        fldfrom: window.loginUser.id,
                        fldto: $('a[name=current]').attr("fldfriendid"),
                        fldtext: text
                    };

                    Bbs.Chat.socket.send(JSON.stringify(m));
                });
                $("#message").unbind('keydown').keydown(function (event) {
                    if (event.altKey == true && event.keyCode == 83) {// Ctrl+S
                        event.returnvalue = false;
                        var text = $("#message").val();
                        if (!text) return;
                        var m = {
                            fldfrom: window.loginUser.id,
                            fldto: $('a[name=current]').attr("fldfriendid"),
                            fldtext: text
                        };
                        Bbs.Chat.socket.send(JSON.stringify(m));
                        return false;
                    }
                });
                //绑定搜索按钮
                $("button[name=searchbtn]").unbind('click').click(function () {
                    var params = {
                        flduserid: window.loginUser.id,
                        qcon: $("#qcon").val()
                    }
                    listFr(params);
                });
                $('#qcon').bind('keypress', function (event) {
                    if (event.keyCode == 13) {
                        var params = {
                            flduserid: window.loginUser.id,
                            qcon: $("#qcon").val()
                        }
                        listFr(params);
                    }
                });

                $("button[name=chathist]").unbind('click').click(function () {
                    var params = {
                        fldfrom: window.loginUser.id,
                        fldto: $('a[name=current]').attr("fldfriendid")
                    }
                    Bbs.viewHisChat(params);
                });
                listFr();
            });
        }

        function listFr(params) {
            $("#friend").html('');
            Platform.srv("bbs-chat-listFriendUser", params || {flduserid: window.loginUser.id}, function (us) {
                if (us && us.length > 0) {
                    var html = '';
                    var nowChatUser;
                    $.each(us, function (i, v) {
                        html += '<a  href="#" nameattr="fldfrienda" unread="' + v.unread + '" fldname="' + v.fldname + '" fldfriendid="' + v.fldfriendid + '" class="list-group-item';
                        if (v.fldfriendid == flduserid) {
                            html += ' active" name=current';
                            nowChatUser = v;
                        } else {
                            html += '"';
                        }
                        html += '><h4 class="list-group-item-heading">' + v.fldname;
                        if (v.unread && v.unread > 0) {
                            html += '<span name="unreadspan" class="badge" style="background-color: #da2323;float:right;">' + v.unread + '</span>';
                        }
                        html += '</h4></a>';
                    });

                    $("#friend").append(html);

                    function clickOneFriend(us, athis) {
                        $("ul.list-group").css("height", "100%");
                        $("ul.list-group").parent().css("padding-right", "15px");
                        $("#chatContent").html("");
                        $("#chatContent").attr("nextstart", 0);
                        $("#friend").find("a[name=current]").attr("class", "list-group-item");
                        $("#friend").find("a[name=current]").removeAttr("name");
                        athis.attr("class", "list-group-item active");
                        athis.attr("name", "current");
                        $("#ToChatUser").text(us[0].fldname);

                        //有未读数据列出未读数据
                        if (us[0].unread && us[0].unread > 0) {
                            Platform.srv("bbs-chat-listUnRendCont", {
                                fldfrom: us[0].fldfriendid,
                                fldto: loginUser.id
                            }, function (r) {
                                if (r && r.length > 0) {
                                    var rid = [];
                                    var chtml = '';
                                    $.each(r, function (index, data0) {
                                        var text = data0.fldtext;
                                        rid.push(data0.id);
                                        var nowtoUser = $("#ToChatUser").text();
                                        chtml += '<li class="list-group-item" style="overflow: auto;border-top-width: 0px;border-bottom-width: 0px;" >\
                                            <div style="float: left;width: 100%;"><span style="float: left;" textid="' + data0.id + '">' + nowtoUser + '</span></div>\
                                            <div style="margin-left: 10px;" textid="' + data0.id + '">\
                                            <div style="float:left;background-color: #5FB878;color: #fff;border-radius: 5px;">' + text + '</div>\
                                            </div>\
                                            <div style="float: left;position: absolute;top: 30px;left: 16px;width:0;height:0;font-size:0;border:solid 8px;border-color: #5FB878 rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(255,255,255,.15);"></div>\
                                            </li>';
                                    });
                                    $("#chatContent").append(chtml);
                                    //通过websocket告诉对方已读了
                                    if (Bbs.Chat) {
                                        var m2 = {
                                            ids: rid.join(','),
                                            fldrdate: Platform.getCurrentDate(2),
                                            fldto: us[0].fldfriendid
                                        };
                                        Bbs.Chat.socket.send(JSON.stringify(m2));
                                    }
                                    athis.find("span[name=unreadspan]").html("");
                                }
                            });
                        }
                    }

                    if (nowChatUser) {
                        $("#ToChatUser").text(nowChatUser.fldname);
                    } else { //设置第一个好友为高亮
                        clickOneFriend(us, $("#friend").find(".list-group-item").eq(0));
                    }

                    //绑定点击好友事件
                    $("a[nameattr=fldfrienda]").unbind("click").click(function () {
                        var unread = $(this).attr("unread") || "";
                        var fldname = $(this).attr("fldname");
                        var fldfriendid = $(this).attr("fldfriendid");
                        var o = {
                            unread: unread,
                            fldname: fldname,
                            fldfriendid: fldfriendid
                        }
                        clickOneFriend([o], $(this));
                    });

                    function addEvent(obj, xEvent, fn) {
                        if (obj.attachEvent) {
                            obj.attachEvent('on' + xEvent, fn);
                        } else {
                            obj.addEventListener(xEvent, fn, false);
                        }
                    }

                    var oDiv = document.getElementById('chatContent');

                    function onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/

                        var ev = ev || window.event;
                        var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
                        down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
                        if (down) {

                        } else {
                            var loading = $("#chatContent").attr("loading");
                            if ("1" == loading) return false;
                            var start = 0;
                            if ($("#chatContent").attr("nextstart")) {
                                start = parseInt($("#chatContent").attr("nextstart"));
                            }
                            var limit = 10;
                            var scrollTop = $("#chatContent").parent().scrollTop();
                            if (scrollTop != 0) return false;
                            loading = $("#chatContent").attr("loading", "1");
                            Platform.srv("bbs-chat-listRendCont", {
                                fldfrom: us[0].fldfriendid,
                                fldto: loginUser.id,
                                start: start,
                                limit: limit
                            }, function (r) {
                                $("#chatContent").attr("loading", "0");
                                if (r && r.data && r.data.length > 0) {
                                    $("#chatContent").attr("nextstart", start + limit);
                                    $.each(r.data, function (index, data0) {
                                        var from = data0.fldfrom;
                                        var to = data0.fldto;
                                        if (from == window.loginUser.id) {
                                            var text = data0.fldtext;
                                            var name = loginUser.fldname;
                                            if (data0.fldrdate) {
                                                name += '<已读>';
                                            }
                                            var html = '<li class="list-group-item" style="overflow: auto;border-top-width: 0px;border-bottom-width: 0px;" >\
                                                    <div style="float: right;width: 100%;"><span style="float: right;" textid="' + data0.id + '">' + name + '</span></div>\
                                                    <div style="margin-right: 10px;" textid="' + data0.id + '">\
                                                    <div style="float:right;background-color: #e2e2e2;color: #333;border-radius: 5px;">' + text + '</div>\
                                                    </div>\
                                                    <div style="float: right;position: absolute;top: 30px;right: 16px;width:0;height:0;font-size:0;border:solid 8px;border-color: #e2e2e2 rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(255,255,255,.15);"></div>\
                                                    </li>';
                                            $("#chatContent").prepend(html);

                                        }
                                        if (to == window.loginUser.id) {

                                            var text = data0.fldtext;
                                            var nowtoUser = $("#ToChatUser").text();
                                            var html = '<li class="list-group-item" style="overflow: auto;border-top-width: 0px;border-bottom-width: 0px;" >\
                                                        <div style="float: left;width: 100%;"><span style="float: left;" textid="' + data0.id + '">' + nowtoUser + '</span></div>\
                                                        <div style="margin-left: 10px;" textid="' + data0.id + '">\
                                                        <div style="float:left;background-color: #5FB878;color: #fff;border-radius: 5px;">' + text + '</div>\
                                                        </div>\
                                                        <div style="float: left;position: absolute;top: 30px;left: 16px;width:0;height:0;font-size:0;border:solid 8px;border-color: #5FB878 rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(255,255,255,.15);"></div>\
                                                        </li>';
                                            $("#chatContent").prepend(html);
                                        }
                                    });

                                    calUlh();
                                } else {
                                    if (!Bbs.notChatd) {
                                        Bbs.notChatd = bootbox.dialog({message: "没有聊天记录数据了"});
                                        setTimeout(function () {
                                            Bbs.notChatd.modal('hide');
                                            Bbs.notChatd = null;
                                        }, 2000);
                                    }
                                }
                            });
                        }
                        return false;
                    }

                    addEvent(oDiv, 'mousewheel', onMouseWheel);
                    addEvent(oDiv, 'DOMMouseScroll', onMouseWheel);
                }
            });
        }

        initChatSocket();
    },
    viewHisChat: function (params) {
        var w = 1000;
        if($(window).width()<1000) w=$(window).width()-42;
        var h = 500;
        var d = dialog({
            title: '聊天记录',
            width: w,
            height: h,
            content: '<div class="" id="hisChatgriddiv" style="margin: -20px;">\
            <div class="btn-group btn-group-sm" role="group" aria-label="..." style="width:100%;">\
            <button class="btn btn-success" id="hisChatsearchbutton" style="float:right;">搜索</button>\
            <input type="text" class="form-control" id="hisChatsearchinput" placeholder="请输入标题" style="height:30px;width:300px;float:right;">\
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
                url: '/service/bbs-chat-listHisCont',
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
                    {label: '发送人', name: 'fldfromname', width: 50},
                    {label: '内容', name: 'fldtext'},
                    {label: '接收人', name: 'fldtoname', width: 50}
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
                    delete data.result;
                },
                onCellSelect: function (rowid, iCol, cellcontent, e) {

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
    submitPost: function (e) {
        var me = this;
        var fldtm = $(e).parent().find('form').find('#fldtm').val();
        if (!fldtm) {
            alert("请输入标题");
            return;
        }
        var id = $(e).parent().find('form').find('#id').val();
        var content = me.um.getContent();
        if (!content) {
            alert("请输入内容");
            return;
        }
        if (!window.loginUser || !window.loginUser.id) {
            var d = dialog({
                width:600,
                title: '请先注册账号或登录,您才能发帖',
                content: "<div id=\"buts\" style=\"text-align: center;\"><button name=\"reg\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">注册</button><button name=\"tologin\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">登录</button><button name=\"cancel\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">取消</button></div>",
            });
            d.show();
            $("#buts button").unbind("click").click(function () {
                var name = $(this).attr("name");
                if ("reg" == name) {
                    Bbs.registe(function () {
                        Bbs.initLoginUser();
                        $("#toregiste").remove();
                        $("#tologin").remove();
                    });
                    d.close().remove();
                }
                if ("tologin" == name) {
                    Bbs.login(null,function(){
                        Bbs.initLoginUser();
                    });
                    d.close().remove();
                }
                if ("cancel" == name) {
                    d.close().remove();
                }
            });
            return;
        }

        var text = me.um.getContentTxt();
        var params = {
            id: id,
            fldtm: fldtm,
            fldcontent: content,
            fldtext: text,
            flduserid: window.loginUser.id
        }
        Platform.srv("bbs-postreplay-savePost", params, function (r) {
            window.location.reload();
        });
    },
    initReplay: function () {
        var url = window.location.search;
        Bbs.limit = 10;
        Bbs.pagePerGroup = 10;
        url = url.substring(1);
        var urlpar = url.split("&");
        var postid, start, fldreplayid;
        $.each(urlpar, function (index, v) {
            if (v.indexOf("postid") != -1) {
                postid = v.substring(6 + 1);
            }
            if (v.indexOf("start") != -1) {
                start = v.substring(5 + 1);
            }
            if (v.indexOf("fldreplayid") != -1) {
                fldreplayid = v.substring(11 + 1);
            }
        });
        Bbs.getOnePost(postid);
        Bbs.initUmeditor('EditorContainer', function () {
            $("#fldfromid").val(postid);
            if (fldreplayid) {
                Bbs.listReplay(start, null, null, fldreplayid);
            } else {
                Bbs.listReplay();
            }
        });
        Platform.srv("bbs-login-getLoginUser", {}, function (r) {
            if (r && r.fldloginid) {
                window.loginUser = r;
            }
        });
    },
    getOnePost: function (postid) {
        Platform.srv("commonservice-getById", {
            className: "com.yyj.apps.bbs.postreplay.model.Bbspost",
            id: postid
        }, function (r) {
            if (r && r.fldcontent) {
                var html = '<div class="panel panel-default">\
                    <div class="panel-heading" style="text-align: center">' + (r.fldtm || "") + '</div>\
                <div class="panel-body">' + (r.fldcontent || "") +
                    '</div>\
                    </div>';
                $("#postdiv").append(html);
                var imgNum=$('#postdiv img').length;
                if(imgNum>0){
                    var waitDialog = dialog({
                        content: '正在加载中...'
                    });
                    waitDialog.show();
                    function knowImgSize(id) {
                        $(id + ' img').each(function(index,img){
                            var idWidth = $(this).parent().width(),
                                idHeight = $(id).parent().height();
                            var img_w = $(this).width(),
                                img_h = $(this).height();
                            if(img_w > idWidth) {
                                var height = img_h * idWidth / img_w;
                                $(this).css({"width":idWidth, "height":height});
                            }
                        });

                    }

                    $('#postdiv img').each(function(){
                        this.onload=function(){
                            if(!--imgNum){
                                knowImgSize('#postdiv');
                                waitDialog.close().remove();
                            }
                        }
                    });
                }
            }
        });
    },
    listReplay: function (start, limit, pagePerGroup, fldreplayid) {
        Platform.srv("bbs-postreplay-listReplay", {
            start: start ? start : '0',
            limit: limit ? limit : Bbs.limit,
            pagePerGroup: pagePerGroup ? pagePerGroup : Bbs.pagePerGroup,
            fldfromid: $("#fldfromid").val()
        }, function (r) {
            Bbs.listReplayData = r;
            if (r && r.totalCount > 0 && r.pageCount > 1) {
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
                $("#replaypagelist").html("");
                $("#replaypagelist").append(pagehtml);
                $("#replaypagelist").find("a").unbind("click").click(function () {
                    var page = $(this).attr("page");
                    if (page == "last") {
                        if (Bbs.listReplayData.pageGroup == 1) {
                            alert("没有上一页了");
                            return;
                        }
                        var current = Bbs.listReplayData.page;
                        var s = (Bbs.listReplayData.previousPageGroupLastPage - r.pagePerGroup) * Bbs.limit;
                        if (s < 0) s = 0;
                        Bbs.listReplay(s, Bbs.limit);
                    } else if (page == "next") {

                        if (Bbs.listReplayData.pageGroupCount == Bbs.listReplayData.pageGroup) {
                            alert("没有下一页了");
                            return;
                        }
                        var s = (Bbs.listReplayData.nextPageGroupFirstPage - 1) * Bbs.limit;
                        Bbs.listReplay(s, Bbs.limit);
                    } else if (page == "first") {
                        Bbs.listReplay(0, Bbs.limit);
                    } else {
                        var s = (page - 1) * Bbs.limit;
                        Bbs.listReplay(s, Bbs.limit);
                    }
                });
            }
            if (r && r.data) {
                var data = r.data;
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    //  var fldtm = data[i].fldtm;
                    var fldcontent = data[i].fldcontent;
                    var fldsn = data[i].fldsn;
                    var fldname = data[i].fldname;
                    var fldngdate = data[i].fldngdate;
                    var year = new Date().getFullYear();
                    if (fldngdate.indexOf(year) != -1) {
                        fldngdate = fldngdate.replace(year + "-", "");
                    }
                    fldngdate = fldngdate.substring(0, fldngdate.length - 3);
                    html += '<ul class="media-list" style="border: 1px solid #ddd;">\
                                <li class="media">\
                                <div class="media-body">\
                                <div class="media-heading" style="background-color: #f5f5f5;border-color: #ddd;"><span>' + fldname + '</span><span>&nbsp;&nbsp;' + fldngdate + '</span><span>&nbsp;&nbsp;' + (fldsn + '楼') + '&nbsp;&nbsp;</span><span name="replayspan" style="cursor: pointer;color: #337ab7;" fldfromid="' + data[i].fldfromid + '" replayid="' + data[i].id + '" fldname="' + fldname + '">回复</span></div>\
                                <div>' + fldcontent + '</div>';

                    function getChildHtml(child) {
                        var html = "";
                        for (var i = 0; i < child.length; i++) {
                            var fldcontent = child[i].fldcontent;
                            // var fldsn = data[i].fldsn;
                            var fldname = child[i].fldname;
                            var fldngdate = child[i].fldngdate;
                            var year = new Date().getFullYear();
                            if (fldngdate.indexOf(year) != -1) {
                                fldngdate = fldngdate.replace(year + "-", "");
                            }
                            fldngdate = fldngdate.substring(0, fldngdate.length - 3);
                            html += '<div class="media" style="margin-left: 15px;margin-top: 0px;">\
                                    <div class="media-body">\
                                    <div class="media-heading" style="background-color: #f5f5f5;border-color: #ddd;"><span>' + fldname + '</span><span>&nbsp;&nbsp;' + fldngdate + '&nbsp;&nbsp;</span><span name="replayspan" style="cursor: pointer;color: #337ab7;" fldfromid="' + child[i].fldfromid + '" replayid="' + child[i].id + '" fldname="' + fldname + '">回复</span></div>\
                                    <div>' + fldcontent + '</div>';
                            var child2 = child[i].child;
                            if (child2 && child2.length > 0) {
                                html += getChildHtml(child2);
                            }

                            html += '</div></div>';
                        }
                        return html;
                    }

                    var child = data[i].child;
                    if (child && child.length > 0) {
                        html += getChildHtml(child);
                    }
                    html += '</div>\
                            </li>\
                            </ul>';
                }
                $("#replaydiv").html("");
                $("#replaydiv").append(html);
                $("span[name=replayspan]").unbind('click').click(function () {
                    if (!window.loginUser || !window.loginUser.id) {
                        bootbox.alert('请您先在网站首页注册账号登录之后，重新打开贴子，进行回复');
                        return;
                    }
                    var fldfromid = $(this).attr("fldfromid");
                    var replayid = $(this).attr("replayid");
                    var fldname = $(this).attr("fldname");
                    var formid = 'bbsreplayfrom';
                    var html = '\
                                <div class="container" style="width: 100%;">\
                                    <div class="row clearfix">\
                                        <div class="col-md-12 column">\
                                            <form class="form-horizontal" role="form" id="' + formid + '">\
                                                <input type="hidden" id="id">\
                                                <div class="form-group">\
                                                    <div class="col-sm-12">\
                                                        <textarea type="text" class="form-control" id="fldcontent" />\
                                                    </div>\
                                                </div>\
                                                <div class="form-group">\
                                                    <div class="col-sm-offset-2 col-sm-10">\
                                                    <span id="bbsreplayBtn" class="btn btn-default" style="float: right;">发表</span>\
                                                    </div>\
                                                </div>\
                                            </form>\
                                        </div>\
                                    </div>\
                                </div>\
                                ';
                    var title = '回复';
                    var d = dialog({
                        title: title,
                        width: 560,
                        content: html
                    });
                    d.show();
                    $("#" + formid).find('textarea').val("回复" + fldname + ":");

                    $("#bbsreplayBtn").unbind('click').click(function () {

                        var content = $("#" + formid).find('textarea').val();
                        if (!content) {
                            bootbox.alert('请您输入回复内容');
                            return;
                        }
                        var params = {
                            fldreplayid: replayid,
                            fldfromid: fldfromid,
                            fldcontent: content,
                            flduserid: window.loginUser.id
                        }
                        Platform.srv("bbs-postreplay-saveReplay", params, function (r) {
                            d.close().remove();
                            var page = Bbs.listReplayData.page;
                            var s = (page - 1) * Bbs.limit;
                            Bbs.listReplay(s, Bbs.limit);
                        });
                    });


                });

                if (fldreplayid) {
                    var sollTop = $('span[replayid=' + fldreplayid + ']').offset().top - 300;
                    if (sollTop > 0)
                        $('html,body').animate({scrollTop: sollTop});
                }
            }
        });
    },
    submitReplay: function (e) {
        if (!window.loginUser || !window.loginUser.id) {
            var d = dialog({
                width:600,
                title: '请先注册账号或登录,您才能进行回复',
                content: "<div id=\"buts\" style=\"text-align: center;\"><button name=\"reg\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">注册</button><button name=\"tologin\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">登录</button><button name=\"cancel\" type=\"button\" class=\"btn btn-info\" style=\"margin: 5px;\">取消</button></div>",
            });
            d.show();
            $("#buts button").unbind("click").click(function () {
                var name = $(this).attr("name");
                if ("reg" == name) {
                    Bbs.registe(function () {
                        Platform.srv("bbs-login-getLoginUser", {}, function (r) {
                            if (r && r.fldloginid) {
                                window.loginUser = r;
                            }
                        });
                        $("#toregiste").remove();
                        $("#tologin").remove();
                    });
                    d.close().remove();
                }
                if ("tologin" == name) {
                    Bbs.login(null,function(){
                        Platform.srv("bbs-login-getLoginUser", {}, function (r) {
                            if (r && r.fldloginid) {
                                window.loginUser = r;
                            }
                        });
                    });
                    d.close().remove();
                }
                if ("cancel" == name) {
                    d.close().remove();
                }
            });
            return;
        }
        var me = this;
        var fldfromid = $(e).parent().find('form').find('#fldfromid').val();
        var id = $(e).parent().find('form').find('#id').val();
        var content = me.um.getContent();
        if (!content) {
            alert("请输入内容");
            return;
        }
        var params = {
            id: id,
            fldfromid: fldfromid,
            fldcontent: content,
            flduserid: window.loginUser.id
        }
        Platform.srv("bbs-postreplay-saveReplay", params, function (r) {
            if (Bbs.um) {
                Bbs.um.destroy();
                $("#EditorContainer").html('');
                $("#umeditor-EditorContainer").remove('');
                Bbs.initUmeditor('EditorContainer', function () {
                    $("#fldfromid").val(fldfromid);
                });
            }
            var page = parseInt(Bbs.listReplayData.totalCount / Bbs.listReplayData.pagePerGroup);
            page++;
            var s = (page - 1) * Bbs.limit;
            Bbs.listReplay(s, Bbs.limit, null, r.id);
        });
    },
    initManage: function () {
        Bbs.postmanage = {};
        $("#jqGrid").jqGrid({
            multiselect: true,
            url: '/service/bbs-postreplay-listPost',
            mtype: "post",
            styleUI: 'Bootstrap',
            datatype: "json",
            postData: {
                notfldstatus: true
            },
            beforeRequest: function () {
                var grid = $(this).jqGrid();
                var postData = grid.getGridParam('postData');
                if (Bbs.postmanage.gridTotalNum && postData.page > Bbs.postmanage.gridTotalNum) {
                    postData.page = Bbs.postmanage.gridTotalNum;
                }
                if (postData.sorts && $.isArray(postData.sorts)) {
                    postData.sorts = JSON.stringify(postData.sorts);
                }
                postData.start = (postData.page - 1) * postData.rows;
                Bbs.postmanage.currentPage = postData.page;
                postData.limit = postData.rows;
                Bbs.postmanage.rowNum = postData.limit;
                // delete parameters that you don't need
                delete postData.rows;
                delete postData.page;
                postData.qcon = $("#postsearchinput").val();
                postData.notCutContent="1";
                //if(me.fireEvent("beforeload",postData)===false) return false;
            },
            colModel: [
                //  { label: 'id', name: 'id',  width: 145 },
                {label: '题名', name: 'fldtm'},
                {label: '内容', name: 'fldtext', width: 350},
                {label: '创建时间', name: 'fldngdate', width: 100},
                {
                    label: '状态', name: 'fldstatus', width: 30, formatter: function (cellValue, options, rowObject) {
                        if (cellValue == '1') return '显示';
                        if (cellValue == '2') return '隐藏';
                        return cellValue || "";
                    }
                }
            ],
            autowidth: true,
            viewrecords: true,
            height: $(window).height() - 34 - 38 - 38 - 6,
            pager: "#jqGridPager",
            rowNum: Bbs.postmanage.rowNum || 20,
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
                Bbs.postmanage.rawRecordsMap = {};
                if (data.result.data && data.result.data.length > 0) {
                    $.each(data.result.data, function (index, r) {
                        Bbs.postmanage.rawRecordsMap[r.id] = r;
                    });
                }
                delete data.result;
                $.extend(Bbs.postmanage.data, data);
            }
        });
        Bbs.postmanage.grid = $("#jqGrid");
        $("#hidepost").unbind('click').click(function () {
            var ids = Bbs.postmanage.grid.jqGrid('getGridParam', 'selarrrow');
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.bbs.postreplay.model.Bbspost",
                ids: ids.join(','),
                updateParams: "fldstatus,2"
            }, function (r) {
                Bbs.postmanage.grid.trigger("reloadGrid");
            });
        });
        //showpost
        $("#showpost").unbind('click').click(function () {
            var ids = Bbs.postmanage.grid.jqGrid('getGridParam', 'selarrrow');
            Platform.srv("commonservice-updateByIds", {
                className: "com.yyj.apps.bbs.postreplay.model.Bbspost",
                ids: ids.join(','),
                updateParams: "fldstatus,1"
            }, function (r) {
                Bbs.postmanage.grid.trigger("reloadGrid");
            });
        });

        $("#editpost").unbind('click').click(function () {

            var ids = Bbs.postmanage.grid.jqGrid('getGridParam', 'selarrrow');
            if (!ids || ids.length > 1) {
                bootbox.alert('请选择一条数据');
                return;
            }
            var r = Bbs.postmanage.rawRecordsMap[ids[0]];
            if (!r) return;
            Platform.hrv('/bbs/form/post/postedit.html', function (html) {
                var formid = "postedit";
                var w = 1000;
                var h = $(window).height() - 40 - 16 - 2 - 42 - 54 + 2;
                var d = dialog({
                    title: '编辑帖子',
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
                    button: [
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
                                    fromValues.fldtext = text;
                                }
                                Platform.srv("bbs-postreplay-savePost", fromValues, function (workr) {
                                    Bbs.postmanage.grid.trigger("reloadGrid");
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
                $("#postEditorContainer").height(h - 40);
                Platform.setFromValues(r, formid);
                var um;
                Platform.initUmeditor("postEditorContainer", {
                    serverUrl: "/service/bbs-postreplay-saveUeAttach",
                    zIndex: 9999,
                    readonly: false,
                    enableAutoSave: false, //禁止自动保存
                    autoSyncData: false,//自动同步编辑器要提交的数据
                    initialFrameHeight: h - 40,//355
                    toolbars: [[
                        'fullscreen','source','undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload','insertimage','emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map','pagebreak', 'template', 'background', '|',
                        'horizontal', 'date', 'time', 'spechars','|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace'
                    ]]
                    }, function (editor) {
                    um = editor;
                    if (r && r.fldcontent)
                        editor.setContent(r.fldcontent);
                    um.execCommand('serverparam', function (editor) {
                        return {
                            'pkid': $("#id").val()
                        };
                    });
                });
            });
        });

        $("#postsearchbutton").unbind("click").click(function () {
            Bbs.postmanage.grid.trigger("reloadGrid");
        });
        $('#postsearchinput').bind('keypress', function (event) {
            if (event.keyCode == 13) {
                Bbs.postmanage.grid.trigger("reloadGrid");
            }
        });
    },
    changeUserMess: function (callback) {
        var formid = 'changeUserfrom';
        var html = '\
            <div class="container" style="width: 100%;">\
                <div class="row clearfix">\
                    <div class="col-md-12 column">\
                        <form class="form-horizontal" role="form" id="' + formid + '">\
                            <input type="hidden" id="id" value="">\
                            <input type="hidden" id="fldloginid" value="">\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label">用户名</label>\
                                <div class="col-sm-10">\
                                    <input type="text" class="form-control" id="fldname" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label">密码</label>\
                                <div class="col-sm-10">\
                                    <input type="text" class="form-control" id="fldpassword" />\
                                </div>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            ';
        var title = '修改用户';
        var width=560;
        if($(window).width()<560) width=$(window).width()-42;
        var d = dialog({
            title: title,
            width: width,
            content: html,
            button: [
                {
                    value: '确定',
                    callback: function () {
                        var fldloginId = $('#fldloginid').val();
                        if (!fldloginId) {
                            alert("请输入登录账号");
                            return;
                        }
                        var fldname = $('#fldname').val();
                        if (!fldname) {
                            alert("请输入用户名");
                            return;
                        }
                        var fldpassword = $('#fldpassword').val();
                        if (!fldpassword) {
                            alert("请输入密码");
                            return;
                        }
                        var params = Platform.getFromValues(formid);
                        Platform.srv("bbs-postreplay-updateUser", params, function (r) {
                            if (r && r.msg) {
                                alert(r.msg);
                                return;
                            }
                            d.close().remove();
                            if (Platform.getCookie("bbsfldloginid")) {
                                Platform.setCookie("bbsfldloginid", r.fldloginId);
                            }
                            if (Platform.getCookie("bbsfldpassword")) {
                                Platform.setCookie("bbsfldpassword", r.fldpassword);
                            }
                            window.location.href = '/bbs.html';
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
        $("#" + formid).find("#id").val(loginUser.id);
        $("#" + formid).find("#fldloginid").val(loginUser.fldloginid);
        $("#" + formid).find("#fldname").val(loginUser.fldname);
        $("#" + formid).find("#fldpassword").val(loginUser.fldpassword);
        $('#fldloginid').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldname').focus();
            }
        });
        //fldname
        $('#fldname').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldpassword').focus();
            }
        });
    },
    registe: function (callback) {
        var formid = 'bbsUserfrom';
        var html = '\
            <div class="container" style="width: 100%;">\
                <div class="row clearfix">\
                    <div class="col-md-12 column">\
                        <form class="form-horizontal" role="form" id="' + formid + '">\
                            <input type="hidden" id="id">\
                            <div class="form-group">\
                                <label class="col-sm-2 control-label" style="padding-right: 15px;padding-left: 15px;">登录账号</label>\
                                <div class="col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                    <input type="text" class="form-control" id="fldloginid" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;padding-left: 15px;">用户名</label>\
                                <div class="col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                    <input type="text" class="form-control" id="fldname" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;padding-left: 15px;">密码</label>\
                                <div class="col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                    <input type="text" class="form-control" id="fldpassword" />\
                                </div>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            ';
        var title = '注册用户';
        var width=560;
        if($(window).width()<560) width=$(window).width()-42;
        var d = dialog({
            title: title,
            width: width,
            content: html,
            button: [
                {
                    value: '确定',
                    callback: function () {
                        var fldloginId = $('#fldloginid').val();
                        if (!fldloginId) {
                            alert("请输入登录账号");
                            return;
                        }
                        var fldname = $('#fldname').val();
                        if (!fldname) {
                            alert("请输入用户名");
                            return;
                        }
                        var fldpassword = $('#fldpassword').val();
                        if (!fldpassword) {
                            alert("请输入密码");
                            return;
                        }
                        var params = Platform.getFromValues(formid);
                        Platform.srv("bbs-postreplay-saveUser", params, function (r) {
                            if (r && r.msg) {
                                alert(r.msg);
                                return;
                            }
                            d.close().remove();
                            Bbs.login(fldloginId, callback);
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
        $('#fldloginid').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldname').focus();
            }
        });
        //fldname
        $('#fldname').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldpassword').focus();
            }
        });
    },
    login: function (fldloginid, callback) {
        var formid = 'bbsUserLoginfrom';
        var html = '\
            <div class="container" style="width: 100%;">\
                <div class="row clearfix">\
                    <div class="col-md-12 column">\
                        <form class="form-horizontal" role="form" id="' + formid + '">\
                            <input type="hidden" id="id">\
                            <div class="form-group">\
                                <label class="col-sm-2 control-label" style="padding-right: 15px;padding-left: 15px;">账号</label>\
                                <div class="col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                    <input type="text" class="form-control" id="fldloginid" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label for="inputPassword3" class="col-sm-2 control-label" style="padding-right: 15px;padding-left: 15px;">密码</label>\
                                <div class="col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                    <input type="password" class="form-control" id="fldpassword" />\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <div class="col-sm-offset-2 col-sm-10" style="padding-right: 15px;padding-left: 15px;">\
                                <div class="checkbox" style="float: left;">\
                                <label><input type="checkbox">下次自动登录</label>\
                                </div>\
                                <span id="bbsLogin" class="btn btn-default" style="float: right;">登录</span>\
                                </div>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            ';
        var title = '登录';
        var width=560;
        if($(window).width()<560) width=$(window).width()-42;
        var d = dialog({
            title: title,
            width: width,
            content: html
        });
        d.show();
        if (fldloginid) $('#fldloginid').val(fldloginid);

        $('#fldloginid').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                $('#fldpassword').focus();
            }
        });
        $('#fldpassword').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                login();
            }
        });

        function login() {
            var fldloginId = $('#fldloginid').val();
            if (!fldloginId) {
                alert("请输入登录账号");
                return;
            }
            var fldpassword = $('#fldpassword').val();
            if (!fldpassword) {
                alert("请输入密码");
                return;
            }
            var params = Platform.getFromValues(formid);
            Platform.srv("bbs-login-authLogin", params, function (r) {
                if (r) {
                    if ($("#" + formid).find("input[type=checkbox]").is(':checked')) {
                        Platform.setCookie("bbsfldloginid", fldloginId);
                        Platform.setCookie("bbsfldpassword", fldpassword);
                    } else {
                        Platform.clearCookie("bbsfldloginid");
                        Platform.clearCookie("bbsfldpassword");
                    }
                    d.close().remove();
                    if (callback && $.isFunction(callback)) {
                        callback.call();
                    } else {
                        var toUrl='/bbs.html';
                        if($(window).width()<560) toUrl='/bbsM.html';
                        window.location.href = toUrl;
                    }
                } else {
                    bootbox.alert('账名或密码不正确');
                    return;
                }
            });
        }

        $("#bbsLogin").unbind("click").click(function () {
            login();
            return false;
        });
    },
    initLoginUser: function () {
        function getLoginUser() {
            Platform.srv("bbs-login-getLoginUser", {}, function (r) {
                if (r && r.fldloginid) {
                    window.loginUser = r;
                    $("#loginUserspan").text(r.fldname);
                    $("#loginUserspan").parent().show();
                    Bbs.getTipNum();
                    var intTipNum = self.setInterval(function () {
                        Bbs.getTipNum();
                    }, 10000);
                    $("#quit").click(function () {
                        Platform.srv("bbs-login-loginOut", {}, function (r) {
                            Platform.clearCookie("bbsfldloginid");
                            Platform.clearCookie("bbsfldpassword");
                            window.clearInterval(intTipNum);
                            var toUrl='/bbs.html';
                            if($(window).width()<560) toUrl='/bbsM.html';
                            window.location.href = toUrl;
                        });
                    });
                    //绑定私信按钮
                    $("li[name=viewchat]").unbind('click').click(function () {
                        Bbs.chat();
                    });
                    //修改账号密码
                    $("#loginUserspan").unbind('click').click(function () {
                        Bbs.changeUserMess()
                    });
                } else {
                    $("#loginBtn").show();
                    $("#registeBtn").show();

                    $("#newpostlabel").html('发布新帖&nbsp;&nbsp;<a id="toregiste" style="cursor: pointer;">请注册</a>&nbsp;&nbsp;<a id="tologin" style="cursor: pointer;">或请登录</a>');

                    $("#toregiste").unbind('click').click(function () {
                        Bbs.registe(function () {
                            getLoginUser();
                            $("#toregiste").remove();
                            $("#tologin").remove();
                        });
                    });

                    $("#tologin").unbind('click').click(function () {
                        Bbs.login(null, function () {
                            getLoginUser();
                            $("#toregiste").remove();
                            $("#tologin").remove();
                        });
                    });
                }
            });
        }

        var fldloginid = Platform.getCookie("bbsfldloginid");
        var fldpassword = Platform.getCookie("bbsfldpassword");
        if (fldloginid && fldloginid) {
            var params = {};
            params.fldloginid = fldloginid;
            params.fldpassword = fldpassword;
            Platform.srv("bbs-login-authLogin", params, function (r) {
                getLoginUser();
            });
        } else {
            getLoginUser();
        }
    },
    getTipNum: function () {
        if (window.loginUser && window.loginUser.id) {
            Platform.srv("bbs-postreplay-getTipNum", {fldtipuserid: window.loginUser.id}, function (r) {
                var tol = 0;
                if (r && r.replayNum > 0) {
                    tol += r.replayNum;
                    $("span[name=viewreplayspan]").text('(' + r.replayNum + ')');
                }
                if (r && r.chatNum > 0) {
                    tol += r.chatNum;
                    $("span[name=viewchatspan]").text('(' + r.chatNum + ')');
                }
                if (tol > 0)
                    $("span[name=numspan]").text('(' + tol + ')');
            });
        }
    },
    initReplayTips: function (start, limit, pagePerGroup) {
        if (!window.loginUser) {
            Platform.srv("bbs-login-getLoginUser", {}, function (r) {
                if (r && r.fldloginid) {
                    window.loginUser = r;
                }
            }, true);
        }
        if (!window.loginUser) return;
        if (!Bbs.limit) Bbs.limit = 10;
        if (!Bbs.pagePerGroup) Bbs.pagePerGroup = 10;
        Platform.srv("bbs-postreplay-listReplayTips", {
            start: start ? start : '0',
            limit: limit ? limit : Bbs.limit,
            pagePerGroup: pagePerGroup ? pagePerGroup : Bbs.pagePerGroup,
            fldtipuserid: window.loginUser.id
        }, function (r) {
            Bbs.ListReplayTipsData = r;
            if (r && r.totalCount > 0 && r.pageCount > 1) {
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
                $("#replaypageTipslist").html("");
                $("#replaypageTipslist").append(pagehtml);
                $("#replaypageTipslist").find("a").unbind("click").click(function () {
                    var page = $(this).attr("page");
                    if (page == "last") {
                        if (Bbs.ListReplayTipsData.pageGroup == 1) {
                            alert("没有上一页了");
                            return;
                        }
                        var current = Bbs.ListReplayTipsData.page;
                        var s = (Bbs.ListReplayTipsData.previousPageGroupLastPage - r.pagePerGroup) * Bbs.limit;
                        if (s < 0) s = 0;
                        Bbs.initReplayTips(s, Bbs.limit);
                    } else if (page == "next") {

                        if (Bbs.ListReplayTipsData.pageGroupCount == Bbs.ListReplayTipsData.pageGroup) {
                            alert("没有下一页了");
                            return;
                        }
                        var s = (Bbs.ListReplayTipsData.nextPageGroupFirstPage - 1) * Bbs.limit;
                        Bbs.initReplayTips(s, Bbs.limit);
                    } else if (page == "first") {
                        Bbs.initReplayTips(0, Bbs.limit);
                    } else {
                        var s = (page - 1) * Bbs.limit;
                        Bbs.initReplayTips(s, Bbs.limit);
                    }
                });
            }
            if (r && r.data) {
                var updateIds = [];
                var data = r.data;
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    //  var fldtm = data[i].fldtm;
                    var fldcontent = data[i].fldcontent;
                    var fldsn = data[i].fldsn;
                    var fldname = data[i].fldname;
                    var fldngdate = data[i].fldngdate;
                    var fldtm = '<回复我的主题：' + data[i].fldtm + '>';
                    var year = new Date().getFullYear();
                    if (fldngdate.indexOf(year) != -1) {
                        fldngdate = fldngdate.replace(year + "-", "");
                    }
                    if (!data[i].fldreaddate) {
                        updateIds.push(data[i].id);
                    }
                    fldngdate = fldngdate.substring(0, fldngdate.length - 3);
                    html += '<ul class="media-list" style="border: 1px solid #ddd;">\
                                <li class="media">\
                                <div class="media-body">\
                                <div class="media-heading" style="background-color: #f5f5f5;border-color: #ddd;"><span>' + fldname + '</span><span>&nbsp;&nbsp;' + fldngdate + '</span>&nbsp;&nbsp;<span>' + fldtm + '</span>&nbsp;&nbsp;<span name="replaystipspan" style="cursor: pointer;color: #337ab7;" fldpostid="' + data[i].fldpostid + '" fldreplayid="' + data[i].fldreplayid + '" fldreplayrid="' + data[i].fldreplayrid + '">回复</span></div>\
                                <div>' + fldcontent + '</div>';
                    html += '</div>\
                            </li>\
                            </ul>';
                }
                $("#replayTipsdiv").html("");
                $("#replayTipsdiv").append(html);

                $("span[name=replaystipspan]").unbind('click').click(function () {
                    var fldpostid = $(this).attr("fldpostid");
                    var fldreplayid = $(this).attr("fldreplayid");
                    var fldreplayrid = $(this).attr("fldreplayrid");

                    Platform.srv("bbs-postreplay-toReplay", {
                        fldpostid: fldpostid,
                        fldreplayid: fldreplayid
                    }, function (r) {
                        if (r || r == 0) {
                            var url = "/replay.html?postid=" + fldpostid + "&fldreplayid=" + fldreplayid + "&start=" + r;
                            window.open(url);
                        }
                    });
                });

                if (updateIds.length > 0) {
                    Platform.srv("commonservice-updateByIds", {
                        className: "com.yyj.apps.bbs.postreplay.model.Bbsreplaytips",
                        ids: updateIds.join(","),
                        fldreaddate: Platform.getCurrentDate(2)
                    }, function (r) {

                    });
                }
            }
        });
    }
}