package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdeptuser;
import com.yyj.apps.org.model.Orguser;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class DelUser {
    private Map params;

    public DelUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String deptids= (String) params.get("deptids");
         if(deptids!=null){
             String[] deptidsA=deptids.split(",");
             for(String id:deptidsA){
                 Orgdeptuser orgdeptuser=DbUtils.$get(Orgdeptuser.class,id);
                 if(orgdeptuser!=null){
                     String fldyhid=orgdeptuser.getFldyhid();
                     List<Orgdeptuser> orgdeptuserList=DbUtils.$find(Orgdeptuser.class,"fldyhid",fldyhid);
                     if(orgdeptuserList!=null&&orgdeptuserList.size()>1){
                     }else{ //把用户表记录也删除
                         DbUtils.$remove(Orguser.class, fldyhid);
                     }
                     DbUtils.$remove(Orgdeptuser.class, id);
                 }

             }
         }
         return true;
    }
}
