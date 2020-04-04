package com.yyj.commonservice;


import com.yyj.utils.db.DbUtils;
import java.util.Map;

/**
 * 业务模块描述:【根据id获取记录】
 * 作者: 严拥江
 * 日期: 2018/04/21 11:50
 */
public class GetById {
    private Map params;

    public GetById(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String id= (String) params.get("id");
        String className= (String) params.get("className");
        Class classobj=Class.forName(className);
        return DbUtils.$get(classobj,id);
    }
}
