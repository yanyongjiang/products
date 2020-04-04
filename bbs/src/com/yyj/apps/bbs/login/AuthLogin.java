package com.yyj.apps.bbs.login;

import com.yyj.apps.bbs.postreplay.model.Bbsuser;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * ��¼��֤
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
        List<Bbsuser> orguserList=DbUtils.$find(Bbsuser.class, "fldloginid",loginid,"fldpassword",fldpassword);
        if(orguserList!=null&&orguserList.size()>0){
            request.getSession().setAttribute("bbsloginid",loginid);
            return true;
        }
        return false;
    }
}
