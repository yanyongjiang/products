package com.yyj.apps.email;

import com.yyj.apps.email.model.Orgemail;
import com.yyj.apps.email.model.Orgemailcon;
import com.yyj.apps.login.GetLoginUser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 业务模块描述:【列出草稿】
 * 作者: 严拥江
 * 日期: 2018/10/21 11:50
 */
public class ListDraft extends CommonCmd {
    private Map params;

    public ListDraft(Map params, HttpServletRequest request) {
        this.params = params;
    }

    public Object execute() throws Exception {
        return $asPageFtl("listDraft.sql",params);
    }
}
