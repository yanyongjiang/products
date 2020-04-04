package com.yyj.apps.bbs.chat;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.Paging;

import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【列出已读内容列表】
 * 作者: 严拥江
 * 日期: 2018/08/27 11:50
 */
public class ListRendCont extends CommonCmd {
    private Map params;

    public ListRendCont(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params.get("start")==null|| params.get("limit")==null) return null;
        Paging<Map<String, Object>> paging=$asPageFtl("listRendCont.sql", params);
        return paging;
    }
}
