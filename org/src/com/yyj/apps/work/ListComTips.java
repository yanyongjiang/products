package com.yyj.apps.work;

import com.yyj.apps.login.GetLoginUser;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/07/28.
 */
public class ListComTips {
    private String sqlPath="";
    private Map params;
    private HttpServletRequest request;

    public ListComTips(Map params, HttpServletRequest request) {
        this.params = params;
        this.request=request;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        Map loginUser= (Map) new GetLoginUser(new HashMap<>(),request).execute();
        if(loginUser!=null){
            params.put("fldtipuserid",loginUser.get("id"));
            return DbUtils.$asPageFtl(this.sqlPath+"listComTips.sql",params);
        }
        return null;
    }
}
