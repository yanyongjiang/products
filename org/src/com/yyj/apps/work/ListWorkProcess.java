package com.yyj.apps.work;

import com.yyj.apps.login.GetLoginUser;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/07/14.
 */
public class ListWorkProcess {
    private String sqlPath="";
    private Map params;

    public ListWorkProcess(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String buk = (String) params.get("buk");
        if(buk!=null){
            return DbUtils.$queryForLisFtl(this.sqlPath+"listWorkProcess.sql",params);
        }
        return null;
    }
}
