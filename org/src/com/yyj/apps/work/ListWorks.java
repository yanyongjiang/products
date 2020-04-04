package com.yyj.apps.work;

import com.yyj.apps.login.GetLoginUser;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/08/04.
 */
public class ListWorks {
    private String sqlPath="";
    private Map params;
    private HttpServletRequest request;

    public ListWorks(Map params, HttpServletRequest request) {
        this.params = params;
        this.request=request;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String year = (String) params.get("yearmon");
        Map loginUser= (Map) new GetLoginUser(new HashMap<>(),request).execute();
        params.put("flduserid",loginUser.get("id"));
        if("1".equals(loginUser.get("fldgly"))){
            params.put("showAll",true);
        }
        if(year!=null){
            return DbUtils.$asPageFtl(this.sqlPath+"listWorks.sql",params);
        }
        return null;
    }
}
