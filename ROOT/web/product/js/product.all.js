Product={
    showPro:function (from,id) {
        var h=$(window).height()-102;
        $("#menu").find("li").removeAttr("class");
        $("#"+id).attr("class","active");
        Platform.hrv('/product/form/'+from, function (html) {
            if(html)
            $('div[name=content]').html(html);
            $('div[name=content]').height(h);
        });
    }
}