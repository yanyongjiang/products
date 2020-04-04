package com.yyj.apps.org;

import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/4/30.
 */
public class GetMaxUserSn {
    private String sqlPath="";
    private Map params;

    public GetMaxUserSn(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
       return DbUtils.$asIntFtl(this.sqlPath+"getMaxUserSn.sql",params);
    }
}
