package com.yyj.apps.bbs.postreplay;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.Paging;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【获取回复私信数字】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class GetTipNum extends CommonCmd {
    private Map params;

    public GetTipNum(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Map tipNum=new HashMap<>();
        int replayNum=$asIntFtl("GetTipNum.sql",params);
        tipNum.put("replayNum",replayNum);

        int chatNum=$asIntFtl("GetChatNum.sql",params);
        tipNum.put("chatNum",chatNum);
        return tipNum;
    }
}
