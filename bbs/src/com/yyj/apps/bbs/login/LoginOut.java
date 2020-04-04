package com.yyj.apps.bbs.login;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * ��ȡ��¼�û���Ϣ
 */
public class LoginOut {
    private Map params;
    private HttpServletRequest request;

    public LoginOut(Map params, HttpServletRequest request) {
        this.params =params;
        this.request=request;
    }

    public Object execute() throws Exception {
        request.getSession().removeAttribute("bbsloginUser");
        request.getSession().removeAttribute("bbsloginid");
        request.getSession().invalidate();
        return true;
    }
}
