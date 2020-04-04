package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/6/17.
 */
public class DelDept {
    private Map params;

    public DelDept(Map params) {
        this.params = params;
    }

    public void recursion(String deptid){
        Orgdept org=DbUtils.$get(Orgdept.class,deptid);
        if(org!=null){
            List<Orgdept> children=DbUtils.$find(Orgdept.class, "fldparentid",org.getId());
            if(children!=null&&children.size()>0){
                for(Orgdept one:children){
                    recursion(one.getId());
                }
            }
            DbUtils.$remove(Orgdept.class,org.getId());
        }
    }

    public Object execute() throws Exception {
        String deptid= (String) params.get("deptid");
        if(deptid!=null){
            recursion(deptid);
        }
        return true;
    }
}
