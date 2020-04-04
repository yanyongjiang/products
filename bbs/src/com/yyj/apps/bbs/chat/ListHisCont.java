package com.yyj.apps.bbs.chat;

import com.yyj.apps.bbs.chat.model.Bbschartcont;
import com.yyj.commonservice.CommonCmd;

import java.util.Map;

/**
 * 业务模块描述:【列出帖子列表】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class ListHisCont extends CommonCmd {
    private Map params;

    public ListHisCont(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String fldfrom = (String) params.get("fldfrom");
        String fldto = (String) params.get("fldto");
        if(fldto==null||fldfrom==null) return null;
        return $asPageFtl("listHisCont.sql",params);
    }
}
