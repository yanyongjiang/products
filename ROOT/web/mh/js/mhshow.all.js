MhShow = {
    limit: 20,
    pagePerGroup: 10,
    //获取栏目头数据。
    getHeaderCol: function () {
        Platform.srv("mh-listShowCol", {start: 0, limit: 6}, function (r) {
            if (r && r.length > 0) {
                var h = '';
                $.each(r, function (index, value) {
                    h += '<li lmid="' + value.id + '"role="presentation" class="active"><a href="#">' + value.fldname + '</a></li>'
                });
                $("#headerCol").append(h);
                $("#headerCol li").unbind('click').click(function () {
                    var lmid = $(this).attr("lmid");
                    if (lmid)
                        window.open("/mhnotice.html?lmid=" + lmid);
                    else
                        window.open("/mhnotice.html");
                });
            }
        });
    },
    showFirst: function () {
        //获得左侧滚动图片
        function getScrollImg() {
            var fldlmid = '282d87740fde43bd9f1c88b32a18a40f';
            var params = {
                fldpicnotnull: true,
                fldtype: 'pic',
                needAttach: true,
                notpage: true,
                start: 0,
                limit: 7,
                fldlmid: fldlmid,
                fldisfb: '1',
                orderby: 'order by fldfbsj desc'
            };
            Platform.srv("mh-listArticle", params, function (r) {
                if (r && r.length > 0) {
                    var linkList = [];
                    $.each(r, function (index, value) {
                        var at = value.attachs;
                        if (at) {
                            var imgurl = '/service/mh-downArtAttach?id=' + at[0].id;
                            value.imgurl = imgurl;
                            linkList.push(value);
                        }
                    });
                    var originalImagesCount = linkList.length;
                    var circleCount = originalImagesCount;
                    var leftNum = 585;
                    var linkListStr = "<div style='width:" + leftNum + "px; margin:0 auto;' class='zt_bg_side '>  "
                    linkListStr += "<ul id='smallSlideUl' class='info-btn clearfix' style='padding-left: 0px;'>"
                    for (var j = 0; j < circleCount; j++) {
                        var id = "mypic" + (j);
                        if (j == 0) {
                            linkListStr += "<li class='info-cur' id='" + id + "' sid='" + j + "'><span>" + (j + 1) + "</span></li>"
                        } else {
                            linkListStr += "<li id='" + id + "' sid='" + j + "'><span>" + (j + 1) + "</span></li>"
                        }
                    }
                    linkListStr += "</ul>"
                    linkListStr += "</div>"
                    linkListStr += "<div style='clear:both; height:0px; line-height:0px;'></div>"
                    linkListStr += "<div>"
                    linkListStr += "<div class='slide'>"
                    linkListStr += "<ul id='bigSlideUl' class='slide-ul' style='width:" + (originalImagesCount * leftNum) + "px;'>"
                    for (var i = 0; i < linkList.length; i++) {
                        //var url = "/sys/service/sys-cmsshow-service.cmsViewRender?$$vid=sys-cms-index9.second.html&menuId=" + linkList[i].id + "&showway=" + linkList[i].showway + "&indexPages=sys-cms-index9.html&secondIndex=sys-cms-index9.second.html&threeIndex=sys-cms-index9.three.html&navText=" + linkList[i].name + ""
                        var url="/mhnotice.html?dataid=" + linkList[i].id;
                        linkListStr += "<li>"
                        linkListStr += "<a target='_blank' href='" + url + "'>"
                        linkListStr += "<img src='" + linkList[i].imgurl + "'/>"
                        linkListStr += "<span class='pic-txt'>" + linkList[i].fldtm + "</span>"
                        linkListStr += "</a></li>"
                    }
                    linkListStr += "</ul>"
                    linkListStr += "</div>"
                    linkListStr += "</div>"
                    $("#wrapperClearfix").empty().append(linkListStr);
                    var leftNum = 585;
                    var _focus_num = $("#smallSlideUl > li").length;
                    var _focus_direction = true;
                    var _focus_pos = 0;
                    var _focus_max_length = _focus_num * leftNum;
                    var _focus_li_length = leftNum;
                    var _focus_dsq = null;
                    var _focus_lock = true;
                    autoExecAnimate = function () {
                        $("#mypic" + _focus_pos).addClass("info-cur").siblings("li.info-cur").removeClass("info-cur");
                        var moveLen = _focus_pos * _focus_li_length;
                        if ($("#bigSlideUl")[0] && $("#bigSlideUl")[0].getElementsByTagName("li").length > 1)
                            $("#bigSlideUl").animate({
                                    left: "-" + moveLen + "px"
                                },
                                5000);

                        if (_focus_pos == (_focus_num - 1)) {
                            _focus_direction = false
                        }
                        if (_focus_pos == 0) {
                            _focus_direction = true
                        }
                        if (_focus_direction) {
                            _focus_pos++
                        } else {
                            _focus_pos--
                        }
                    }
                    _focus_dsq = setInterval("autoExecAnimate()", 6000);
                    $("#smallSlideUl > li").hover(function () {
                            _focus_pos = parseInt($(this).attr("sid"));
                            if (_focus_lock) {
                                clearInterval(_focus_dsq);
                                _focus_lock = false
                            }
                            $("#mypic" + _focus_pos).addClass("info-cur").siblings("li.info-cur").removeClass("info-cur");
                            var moveLen = _focus_pos * _focus_li_length;
                            $("#bigSlideUl").stop(true, true).animate({
                                    left: "-" + moveLen + "px"
                                },
                                5000)
                        },
                        function () {
                            if (_focus_lock == false) {
                                _focus_dsq = setInterval("autoExecAnimate()", 6000);
                                _focus_lock = true
                            }
                        });
                    $("#bigSlideUl").hover(function () {
                            if (_focus_lock) {
                                clearInterval(_focus_dsq);
                                _focus_lock = false
                            }
                        },
                        function () {
                            if (_focus_lock == false) {
                                _focus_dsq = setInterval("autoExecAnimate()", 6000);
                                _focus_lock = true
                            }
                        });
                }
            });
        }

        //越秀快讯
        function getYxdt(fldparentid, divId, limit_) {
            var par = {
                start: 0,
                limit: 4,
                artlimit: 7,
                fldparentid: '64e7b55641f349c6a6ad5175bc68f25b',
                needarticle: true,
                fldisfb: '1'
            };
            if (fldparentid) par.fldparentid = fldparentid;
            if (limit_) par.limit = limit_;
            var divid = "yxdt";
            if (divId) divid = divId;
            Platform.srv("mh-listShowCol", par, function (r) {
                if (r && r.length > 0) {
                    var h = '<ul class="nav nav-tabs mh_ul">';
                    $.each(r, function (index, value) {
                        if (index == 0)
                            h += '<li role="presentation" class="active" colid="' + value.id + '"><a style="cursor: pointer" target="_blank" href="/mhnotice.html?lmid='+value.fldparentid+'&slmid='+ value.id+'">' + value.fldname + '</a></li>';
                        else
                            h += '<li role="presentation" colid="' + value.id + '"><a style="cursor: pointer" target="_blank" href="/mhnotice.html?lmid='+value.fldparentid+'&slmid='+ value.id+'">' + value.fldname + '</a></li>';
                    });
                    h += '</ul>';
                    $("#" + divid).append(h);
                    $.each(r, function (index, value) {
                        if (index == 0) {
                            h = '<ul colid="' + value.id + '" class="list-group" style="display: block;">';
                        } else {
                            h = '<ul colid="' + value.id + '" class="list-group" style="display: none;" >';
                        }
                        var artlist = value.artlist;
                        $.each(artlist, function (index, value) {
                            var fldfbsj = value.fldfbsj;
                            if (fldfbsj && fldfbsj.length > 10) fldfbsj = fldfbsj.substring(0, 10);
                            h += '<li class="list-group-item" style="cursor: pointer;" title="'+value.fldtm+'"><span class="badge">' + fldfbsj + '</span><a style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" target="_blank" href="/mhnotice.html?dataid='+ value.id+'">' + value.fldtm + '</a></li>';
                        })
                        h += '</ul>';
                        $("#" + divid).append(h);
                        $("#" + divid).find('.nav li').unbind('mouseover').mouseover(function () {
                            $("#" + divid).find('.nav li').removeClass('active');
                            var colid = $(this).attr("colid");
                            $(this).attr('class', 'active');
                            $("#" + divid).find('.list-group').hide();
                            $("#" + divid).find('ul[colid=' + colid + ']').show();
                        });
                    });
                }
            });
        }

        //动态图片
        function getGdtp() {
            Platform.srv("mh-listShowCol", {
                start: 0,
                limit: 7,
                fldparentid: 'b9dfa482da8b470690e91ac0e80fdf06',
                fldpicnotnull: true,
                fldtype:'pic'
            }, function (r) {
                if (r && r.length > 0) {
                    var linkList = [];
                    $.each(r, function (index, value) {
                        var at = value.attachs;
                        if (at) {
                            var imgurl = '/service/mh-downArtAttach?id=' + at[0].id;
                            value.imgurl = imgurl;
                            linkList.push(value);
                        }
                    });
                    var h = '';
                    var leftNum = ($("#gdtp").parent().width()) / 4;
                    $.each(linkList, function (index, value) {
                        var url="/mhnotice.html?lmid=" +value.fldparentid+"&slmid="+value.id;
                        h += '<div style="float:left;"><a target="_blank" href="'+url+'"><img src="' + value.imgurl + '" style="width: ' + leftNum + 'px; height: 100px;"></a></div>';
                    });
                    var originalImagesCount = linkList.length;
                    $("#gdtp").append(h);
                    $("#gdtp").width(originalImagesCount * leftNum);
                    var _focus_num = $("#gdtp > div").length;
                    var _focus_direction = true;
                    var _focus_pos = 0;
                    var _focus_max_length = _focus_num * leftNum;
                    var _focus_li_length = leftNum;
                    var _focus_dsq = null;
                    var _focus_lock = true;
                    autoExecAnimate2 = function () {
                        var moveLen = _focus_pos * _focus_li_length;
                        if ($("#gdtp")[0] && $("#gdtp")[0].getElementsByTagName("div").length > 1)
                            $("#gdtp").animate({
                                    left: "-" + moveLen + "px"
                                },
                                5000);
                        if (_focus_pos == (_focus_num - 4)) {
                            _focus_direction = false
                        }
                        if (_focus_pos == 0) {
                            _focus_direction = true
                        }
                        if (_focus_direction) {
                            _focus_pos++
                        } else {
                            _focus_pos--
                        }
                    }
                    _focus_dsq = setInterval("autoExecAnimate2()", 6000);
                    $("#gdtp").hover(function () {
                            if (_focus_lock) {
                                clearInterval(_focus_dsq);
                                _focus_lock = false
                            }
                        },
                        function () {
                            if (_focus_lock == false) {
                                _focus_dsq = setInterval("autoExecAnimate2()", 6000);
                                _focus_lock = true
                            }
                        });
                }
            });
        }

        //工作机构
        function getGzjg() {
            function getChildGzjg(fldparentid, display) {
                if (!display) display = 'none';
                Platform.srv("mh-listShowCol", {start: 0, limit: 30, fldparentid: fldparentid}, function (r) {
                    if (r && r.length > 0) {
                        var h = '<ul name="childgzjgul" fldparentid="' + fldparentid + '" style="display: ' + display + ';">';
                        $.each(r, function (index, value) {
                            h += '<li style="float: left;width: 25%;"><a target="_blank" href="/mhnotice.html?lmid=' + value.id + '">' + value.fldname + ' </a></li>'
                        });
                        h += '</ul>';
                        $("#gzjglist").append(h);
                    }
                });
            }

            Platform.srv("mh-listShowCol", {
                start: 0,
                limit: 8,
                fldparentid: '7cfb970d4781441a8ec6d7ffc081c232'
            }, function (r) {
                if (r && r.length > 0) {
                    var h = '';
                    $.each(r, function (index, value) {
                        if (index == 0)
                            getChildGzjg(value.id, "block");
                        else
                            getChildGzjg(value.id);
                        h += '<li class="dropdown" lmid="' + value.id + '" style="cursor: pointer;"><a class="dropdown-toggle">' + value.fldname + ' <span class="caret"></span></a></li>';
                    });
                    $("#gzjg").append(h);
                    $("#gzjg li").unbind('mouseover').mouseover(function () {
                        $('ul[name=childgzjgul]').hide();
                        var lmid = $(this).attr("lmid");
                        $('ul[fldparentid=' + lmid + ']').show();
                    });
                }
            });
        }

        Platform.hrv('/mh/form/mhfirstshow.html', function (html) {
            $('div[name=content]').html(html);
            MhShow.getHeaderCol();
            getScrollImg();
            //越秀快讯
            getYxdt();
            //走进越秀，zjyx
            getYxdt("d17c457d223e418faa55e091fb3e664b", "zjyx", 3);
            //投资越秀，f2ec5f07af504673b9171cb260f0a1f2
            getYxdt("f2ec5f07af504673b9171cb260f0a1f2", "tzyx", 3);
            //滚动图片
            getGdtp();
            //工作机构
            getGzjg();
        });
    },
    showSecond: function (lmid, slmid) {
        MhShow.getHeaderCol();
        Platform.hrv('/mh/form/mhsecondshow.html', function (html) {
            $('div[name=content]').html(html);
            if (lmid) {
                Platform.srv("commonservice-getById", {
                    className: "com.yyj.apps.mh.model.Mhcolumn",
                    id: lmid
                }, function (lmidr) {
                    if (lmidr) {
                        $('.mh_second_lmname').find('span').eq(0).text(lmidr.fldname);
                        $('span[name=lmfa]').html(lmidr.fldname + ">>");
                    }
                });
                //列出子栏目
                var par = {
                    start: 0,
                    limit: 100,
                    fldparentid: lmid,
                    fldisfb: '1'
                };
                var secondLmid = '';
                Platform.srv("mh-listShowCol", par, function (r) {
                    if (r && r.length > 0) {
                        var h = '';
                        $.each(r, function (index, value) {
                            var fldname=value.fldname;
                            if(fldname.length>17){
                                h += '<div role="presentation" class="mh_second_lmlist" colname="' + value.fldname + '" colid="' + value.id + '" style="padding-top: 10px;"><a href="#">' + value.fldname + '</a></div>';
                            }else{
                                h += '<div role="presentation" class="mh_second_lmlist" colname="' + value.fldname + '" colid="' + value.id + '"><a href="#">' + value.fldname + '</a></div>';
                            }
                        });
                        secondLmid = r[0].id;
                        if (slmid) secondLmid = slmid;
                        $('span[name=lmsa]').html(r[0].fldname);
                        $("#secondmenu").append(h);
                        $("#secondmenu").find('div[colid=' + secondLmid + ']').attr('class', 'mh_second_lmlist_active');

                        MhShow.listLmArticle(secondLmid);

                        $("#secondmenu").find('div').unbind('click').click(function () {
                            $("#secondmenu").find('div[role=presentation]').attr('class', 'mh_second_lmlist');
                            var colid = $(this).attr("colid");
                            var colname = $(this).attr("colname");
                            $('span[name=lmsa]').html(colname);
                            $(this).attr('class', 'mh_second_lmlist_active');
                            MhShow.listLmArticle(colid);
                        });
                    }
                });
            }
        });
    },
    listLmArticle: function (lmid, start, limit, pagePerGroup) {
        //列出第一个栏目的文章，articlelist,mh-listArticle
        var par = {
            start: start ? start : '0',
            limit: limit ? limit : MhShow.limit,
            pagePerGroup: pagePerGroup ? pagePerGroup : MhShow.pagePerGroup,
            fldisfb: '1',
            fldlmid: lmid
        };
        Platform.srv("mh-listArticle", par, function (r) {
            if (r.totalCount > 0) {
                MhShow.listArtData = r;
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
                        if (MhShow.listArtData.pageGroup == 1) {
                            alert("没有上一页了");
                            return;
                        }
                        var current = MhShow.listArtData.page;
                        var s = (MhShow.listArtData.previousPageGroupLastPage - r.pagePerGroup) * MhShow.limit;
                        if (s < 0) s = 0;
                        MhShow.listLmArticle(lmid, s, MhShow.limit);
                    } else if (page == "next") {

                        if (MhShow.listArtData.pageGroupCount == MhShow.listArtData.pageGroup) {
                            alert("没有下一页了");
                            return;
                        }
                        var s = (MhShow.listArtData.nextPageGroupFirstPage - 1) * MhShow.limit;
                        MhShow.listLmArticle(lmid, s, MhShow.limit);
                    } else if (page == "first") {
                        MhShow.listLmArticle(lmid, 0, MhShow.limit);
                    } else {
                        var s = (parseInt(page) - 1) * MhShow.limit;
                        MhShow.listLmArticle(lmid, s, MhShow.limit);
                    }
                });
                if (r && r.data) {
                    var data = r.data;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var fldtm = data[i].fldtm;
                        var fldfbsj = data[i].fldfbsj;
                        if (fldfbsj.length > 10) fldfbsj = fldfbsj.substring(0, 10);
                        html += '<li class="list-group-item" style="cursor: pointer;"><a name="fldtma" dataid="' + data[i].id + '"  style="cursor: pointer;">' + fldtm + '</a>' + '<span style="float:right;">&nbsp;&nbsp;' + fldfbsj + '</span></li>';
                    }
                    $("#articlelist").html("");
                    $("#articlelist").append(html);

                    $("#articlelist").find("a[name=fldtma]").unbind("click").click(function () {
                        var dataid = $(this).attr("dataid");
                        window.open("/mhnotice.html?dataid=" + dataid);
                    });
                }
            } else {
                $("#pagelist").html("");
                $("#articlelist").html("无内容");
            }

        });
    },
    showThird: function (dataid) {
        MhShow.getHeaderCol();
        Platform.hrv('/mh/form/mhthirdshow.html', function (html) {
            $('div[name=content]').html(html);
            var lmid;
            if (dataid) {
                Platform.srv("commonservice-getById", {
                    className: "com.yyj.apps.mh.model.Mharticle",
                    id: dataid
                }, function (articler) {
                    lmid = articler.fldlmid;
                    if (articler) {
                        var fldtm = articler.fldtm;
                        var fldfbsj = articler.fldfbsj;
                        var initusername = articler.initusername;
                        var fldcontent = articler.fldcontent;
                        $('.mh_third_artTitle').find('.title').html(fldtm);
                        $('.mh_third_artTitle').find('.time').html('发布日期:' + fldfbsj);
                        $('.mh_third_artTitle').find('.issuer').html('发布人:' + initusername);
                        $('.mh_third_artContent').html(fldcontent);
                        //取附件
                        MhShow.initAttachList(articler.id);
                    }

                    if (lmid) {
                        Platform.srv("commonservice-getById", {
                            className: "com.yyj.apps.mh.model.Mhcolumn",
                            id: lmid
                        }, function (lmidr) {
                            if (lmidr) {
                                var parentlmid = lmidr.fldparentid;
                                var parentlmname = lmidr.fldparentname;
                                //"/mhnotice.html?lmid="+lmid ,lmsa
                                var lmsahtml = '<a href="/mhnotice.html?lmid=' + parentlmid + '&slmid=' + lmid + '">' + lmidr.fldname + '</a>';
                                var lmfahtml = '<a href="/mhnotice.html?lmid=' + parentlmid + '">' + parentlmname + '</a>';
                                $('span[name=lmsa]').html(lmsahtml);
                                $('span[name=lmfa]').html(lmfahtml + ">>");
                            }
                        });
                    }
                });

            }
        });
    },
    initAttachList: function (pkid) {
        var params = {
            pkid: pkid
        }
        Platform.srv("mh-listArtAttach", params, function (r) {
            var attachhtml = "";
            if (r && r.length > 0) {
                $.each(r, function (index, v) {
                    attachhtml += '<li><a href="#" class=""><span name="fileName" fileid="' + v.id + '">' + v.fldfilename + '</span></a></li>';
                });
                $("#efilesul").append(attachhtml);
                $("#efilesul").show();
            } else {
                $("#efilesul").hide();
            }

            $("#efilesul").find('span[name=fileName]').unbind('click').click(function () {
                var span = $(this);
                var fileid = $(this).attr('fileid');
                var url = '/service/mh-downArtAttach?id=' + fileid;
                Platform.download(url);
            });
        });
    }
}