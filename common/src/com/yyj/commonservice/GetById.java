package com.yyj.commonservice;


import com.yyj.utils.db.DbUtils;
import java.util.Map;

/**
 * ҵ��ģ������:������id��ȡ��¼��
 * ����: ��ӵ��
 * ����: 2018/04/21 11:50
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
