package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdeptuser;
import com.yyj.apps.org.model.Orguser;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SortUser {
    private Map params;

    public SortUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String deptids= (String) params.get("deptids");
         if(deptids!=null){
             List<Orgdeptuser> orgdeptuserList=DbUtils.$findOrder(Orgdeptuser.class,"order by fldsn","fldbmid", deptids);
             if(orgdeptuserList!=null&&orgdeptuserList.size()>1){
                 int i=1;
                 for(Orgdeptuser one:orgdeptuserList){
                     DbUtils.$update(Orgdeptuser.class,one.getId(),"fldsn",i);
                     i++;
                 }
             }
         }
         return true;
    }
}
