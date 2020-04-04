package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.*;

/**
 * Created by yyj on 2018/4/30.
 */
public class ListUser {
    private String sqlPath="";
    private Map params;

    public ListUser(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        if(params.get("start")==null|| params.get("limit")==null){
            return DbUtils.$queryForLisFtl(this.sqlPath+"listUser.sql",params);
        }
        return DbUtils.$asPageFtl(this.sqlPath+"listUser.sql",params);
    }
}
