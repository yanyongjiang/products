package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/07/15.
 */
public class ListAttach {
    private Map params;
    private String sqlPath="";

    public ListAttach(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String pkid = (String) params.get("pkid");
        if (pkid == null) return null;
        return DbUtils.$queryForLisFtl(this.sqlPath + "listAttach.sql", params);
    }
}
