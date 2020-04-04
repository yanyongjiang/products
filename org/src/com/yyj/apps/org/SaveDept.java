package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SaveDept {
    private Map params;

    public SaveDept(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Orgdept org=new Orgdept();
        org=BeanUtils.MapToObject(org,params);
        return DbUtils.$save(org);
    }
}
