package com.yyj.apps.login;

import com.yyj.apps.org.model.Orguser;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * µÇÂ¼ÑéÖ¤
 */
public class AuthLogin {
    private Map params;
    private HttpServletRequest request;

    public AuthLogin(Map params,HttpServletRequest request) {
        this.params =params;
        this.request=request;
    }

    public Object execute() throws Exception {
        String loginid= (String) params.get("fldloginid");
        String fldpassword= (String) params.get("fldpassword");
        List<Orguser> orguserList=DbUtils.$find(Orguser.class, "fldloginid",loginid,"fldpassword",fldpassword);
        if(orguserList!=null&&orguserList.size()>0){
            request.getSession().setAttribute("loginid",loginid);
            return true;
        }
        return false;
    }
}
