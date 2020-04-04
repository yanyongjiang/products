package com.yyj.apps.bbs.postreplay;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.Paging;

import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【列出回复列表】
 * 作者: 严拥江
 * 日期: 2018/08/21 11:50
 */
public class ListReplayTips extends CommonCmd {
    private Map params;

    public ListReplayTips(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params.get("start")==null|| params.get("limit")==null) return null;
        Paging<Map<String, Object>> paging=$asPageFtl("listReplayTips.sql", params);
        return paging;
    }
}
