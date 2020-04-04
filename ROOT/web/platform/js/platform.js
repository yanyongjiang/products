/**
 * Created by yanyongjiang on 2018/3/17.
 */
Platform = {
    loadedScripts: {},
    loadCss: function (url) {
        if ($.isArray(url)) {
            url.forEach(function (u) {
                Platform.loadCss(u)
            })
            return;
        }
        if (!this.loadedScripts[url]) {
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', url));
            this.loadedScripts[url] = true;
        }
    },
    loadScripts: function (scripts, callback) {
        var me = this;

        function load(url, callback) {
            if (me.loadedScripts[url]) return setTimeout(function () {
                callback.call(this, true)
            }, 0);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            var onErrorFn = function () {
                callback.call(this, false);
            };
            var onLoadFn = function () {
                me.loadedScripts[url] = true;
                callback.call(this, true);
            };
            script.onerror = onErrorFn;
            if ('addEventListener' in script) {
                script.onload = onLoadFn;
            } else if ('readyState' in script) {
                script.onreadystatechange = function () {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        onLoadFn();
                    }
                };
            } else {
                script.onload = onLoadFn;
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
            return script;
        }

        if (!$.isArray(scripts)) scripts = scripts.split(",")
        var ubound = scripts.length - 1, cursor = 0;
        doLoad();

        function doLoad() {
            if (cursor <= ubound) {
                load(scripts[cursor], function () {
                    cursor++;
                    doLoad();
                });
            } else {
                callback();
            }
        }
    },
    srv: function (serviceName, params, callback, sync_, fullResult_) {
        var sync = true;
        var fullResult = false;
        if (fullResult_) fullResult = fullResult_;
        if (sync_) sync = !sync_;
        var url = '/service/' + serviceName;
        $.ajax({
            url: url,
            type: 'POST',
            async: sync,
            data: $.isArray(params) ? JSON.stringify(params) : params,
            timeout: 50000,
            dataType: 'json',    //json/xml/html/script/jsonp/text
            success: function (r, textStatus, jqXHR) {
                if (!r.success) {
                    alert(r.msg)
                } else {
                    if ($.isFunction(callback)) callback.call(this, (fullResult) ? r : r.result);
                }
            },
            error: function (r, textStatus) {
                alert(r.msg || "请求失败");
            }
        })
    },
    hrv: function (serviceName, callback) {
        var sync = !callback;
        var url = serviceName;
        $.ajax({
            url: url,
            type: 'POST',
            async: sync,
            timeout: 50000,
            dataType: 'html',
            success: function (r) {
                if ($.isFunction(callback)) callback.call(this, r);
                else return r;
            },
            error: function (r, textStatus) {
                alert(r + "请求失败原因：" + textStatus);
            }
        })
    },
    uuid: function () {
        var len = 32;//32长度
        var radix = 16;//16进制
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    setFromValues: function (values, formid) {
        $.each(values, function (key, val) {
                if ($("#" + formid).find('input[id=' + key + ']').length > 0) {
                    $("#" + formid).find('input[id=' + key + ']').val(val);
                } else if ($("#" + formid).find('input[name=' + key + ']').length > 0) {
                    if ($("#" + formid).find('input[name=' + key + ']').attr('type') == 'radio') {
                        $("#" + formid).find("input:radio[name=" + key + "][value=" + val + "]").attr("checked", true);
                    }
                }else if ($("#" + formid).find('textarea[id=' + key + ']').length > 0) {
                    $("#" + formid).find('textarea[id=' + key + ']').val(val);
                }
            }
        )
    },
    getFromValues: function (formid) {
        var fromValues = {};
        if ($("#" + formid).find('input').length > 0) {
            for (var i = 0; i < $("#" + formid).find('input').length; i++) {
                var inputeq = $("#" + formid).find('input').eq(i);
                if (inputeq.attr('type') == 'radio') {
                    if (inputeq.attr("checked")) fromValues[inputeq.attr('name')] = $("#" + formid).find("input[name='" + inputeq.attr('name') + "']:checked").val();

                } else {
                    if (inputeq.attr('id'))
                        fromValues[inputeq.attr('id')] = inputeq.val();
                }
            }
        }
        if ($("#" + formid).find('textarea').length > 0) {
            for (var i = 0; i < $("#" + formid).find('textarea').length; i++) {
                var inputeq = $("#" + formid).find('textarea').eq(i);
                if (inputeq.attr('id'))
                    fromValues[inputeq.attr('id')] = inputeq.val();
            }
        }
        return fromValues;
    },
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
    initUmeditor: function (contentid, ueditorparams, callback) {
        var prePaths = [];
        prePaths.push('/ueditor/ueditor.config.js');
        prePaths.push('/ueditor/ueditor.all.min.js');
        prePaths.push('/ueditor/lang/zh-cn/zh-cn.js');
        Platform.loadScripts(prePaths, function () {
            if (ueditorparams.serverUrl) {
                window.UEDITOR_CONFIG.serverUrl = ueditorparams.serverUrl;
                delete ueditorparams.serverUrl;
            }
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
                        UE.utils.extend(me.options, Platform.ueditorconfig);
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
            var um;
            if (ueditorparams) {
                um = UE.getEditor(containerId, ueditorparams);
            } else {
                um = UE.getEditor(containerId);
            }
            um.ready(function () {
                if (callback && $.isFunction(callback)) {
                    callback.call(um, um);
                }
            });
        });
    },
    getCurrentDate: function (format) //
    {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        var day = now.getDay();//得到周几
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        var time = "";
        //精确到天
        if (format == 1) {
            time = year + "-" + month + "-" + date;
        }
        //精确到分
        else if (format == 2||!format) {
            time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
        }
        return time;
    },
    download: function (url, params) {
        var downurl = url;
        var downloadfrom = $('#download-form');
        if (downloadfrom && downloadfrom.length == 0) {
            var downloadfromHtml = '<form method="POST" style="border:none;padding:0;margin:0;height:0;overflow:hidden" id="download-form" target="download-iframe">\
                                  </form>\
                                  <iframe style="border:none;padding:0;margin:0;height:0;overflow:hidden" id="download-iframe" name="download-iframe"></iframe>';
            $('body').append(downloadfromHtml);
        }
        $("#download-form").html('');
        if (params) {
            $.each(params, function (key, val) {
                $("#download-form").append('<input type="hidden" id="' + key + '" value="' + val + '">');
            });
        }
        var form = $("#download-form").get(0);
        form.action = downurl;
        form.submit();
    },
    setCookie: function (c_name, value, expiredays) {
        var Days = 30; //此 cookie 将被保存 30 天
        if (expiredays) Days = expiredays;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = c_name + "=" + value + "; expires=" + exp.toUTCString();
    },
    clearCookie: function (name) {
        Platform.setCookie(name, "", -1);
    },
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        return ""
    }
}