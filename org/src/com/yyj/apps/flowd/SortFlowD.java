package com.yyj.apps.flowd;
import com.yyj.apps.flowd.model.Flowdef;
import com.yyj.commonservice.CommonCmd;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2019/5/20.
 */
public class SortFlowD extends CommonCmd {
    private Map params;

    public SortFlowD(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String deptids= (String) params.get("colid");
         if(deptids!=null){
             List<Flowdef> orgdeptuserList=$findOrder(Flowdef.class,"order by fldsn","fldcatid", deptids,"state","1");
             if(orgdeptuserList!=null&&orgdeptuserList.size()>1){
                 int i=1;
                 for(Flowdef one:orgdeptuserList){
                     $update(Flowdef.class,one.getId(),"fldsn",i);
                     i++;
                 }
             }
         }
         return true;
    }
}
