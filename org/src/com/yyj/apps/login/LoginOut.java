package com.yyj.apps.login;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.apps.org.model.Orguser;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * 获取登录用户信息
 */
public class LoginOut {
    private Map params;
    private HttpServletRequest request;

    public LoginOut(Map params, HttpServletRequest request) {
        this.params =params;
        this.request=request;
    }

    public Object execute() throws Exception {
        request.getSession().removeAttribute("loginUser");
        request.getSession().removeAttribute("loginid");
        request.getSession().invalidate();
        return true;
    }
}
