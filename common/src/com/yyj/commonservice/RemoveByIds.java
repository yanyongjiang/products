package com.yyj.commonservice;

import com.yyj.utils.db.DbUtils;

import java.util.Iterator;
import java.util.Map;

/**
 * 业务模块描述:【根据id删除记录】
 * 作者: 严拥江
 * 日期: 2018/09/09 11:50
 */
public class RemoveByIds {
    private Map params;

    public RemoveByIds(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String ids= (String) params.remove("ids");
        String className= (String) params.remove("className");
        Class classobj=Class.forName(className);
        int count=0;
        if(ids!=null){
            String[] idsA=ids.split(",");
            for(String oneid:idsA){
                count+=DbUtils.$removeById(classobj,oneid);
            }
        }
        return count;
      }
}
