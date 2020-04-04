package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * 保存事项
 */
public class UpdateAttachPkid {
    private Map params;
    private String sqlPath="";
    public UpdateAttachPkid(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String oldpkid = (String) params.get("oldpkid");
        String pkid = (String) params.get("pkid");
        if(oldpkid==null||pkid==null) return null;
        return DbUtils.$asUpdateFtl(this.sqlPath+"updateAttachPkid.sql",params);
    }
}
