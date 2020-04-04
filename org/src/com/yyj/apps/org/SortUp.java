package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdeptuser;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SortUp {
    private Map params;

    public SortUp(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String deptid= (String) params.get("deptid");
         int fldsn=Integer.parseInt((String) params.get("fldsn"));
         String down=(String) params.get("down");
         Orgdeptuser self=DbUtils.$get(Orgdeptuser.class,deptid);
         String fldbmid=self.getFldbmid();
         if(self==null) return true;
         if(down==null&&fldsn<=1) return true;
         if(down==null){
             if(deptid!=null&&fldsn>1){
                 List<Orgdeptuser> orgdeptuserList=DbUtils.$find(Orgdeptuser.class, "fldsn", fldsn-1,"fldbmid",fldbmid);
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Orgdeptuser one:orgdeptuserList){
                         DbUtils.$update(Orgdeptuser.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 DbUtils.$update(Orgdeptuser.class,deptid,"fldsn",fldsn-1);
             }
         }else{
             if(deptid!=null&&fldsn>0){
                 List<Orgdeptuser> orgdeptuserList=DbUtils.$find(Orgdeptuser.class, "fldsn", fldsn+1,"fldbmid",fldbmid);
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Orgdeptuser one:orgdeptuserList){
                         DbUtils.$update(Orgdeptuser.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 DbUtils.$update(Orgdeptuser.class,deptid,"fldsn",fldsn+1);
             }
         }
         return true;
    }
}
