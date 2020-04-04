package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£¥Ê ¬œÓ
 */
public class UpdateComTipTime {
    private Map params;
    private String sqlPath="";

    public UpdateComTipTime(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        return DbUtils.$asUpdateFtl(this.sqlPath+"updateComTipTime.sql",params);
    }
}
