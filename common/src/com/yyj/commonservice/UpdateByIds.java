package com.yyj.commonservice;

import com.yyj.utils.db.DbUtils;

import java.util.Iterator;
import java.util.Map;

/**
 * 业务模块描述:【根据id更新记录】
 * 作者: 严拥江
 * 日期: 2018/04/21 11:50
 */
public class UpdateByIds {
    private Map params;

    public UpdateByIds(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String ids= (String) params.remove("ids");
        String className= (String) params.remove("className");
        String updateParams= (String) params.get("updateParams");
        if(updateParams==null){
            updateParams=null;
            Iterator<Map.Entry> entries = params.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry entry = entries.next();
                if(updateParams==null) updateParams=entry.getKey()+","+entry.getValue();
                else
                    updateParams+=","+entry.getKey()+","+entry.getValue();
            }
        }
        Class classobj=Class.forName(className);
        return DbUtils.$update(classobj, ids.split(","),updateParams.split(","));
    }
}
