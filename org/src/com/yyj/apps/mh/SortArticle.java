package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mharticle;
import com.yyj.commonservice.CommonCmd;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SortArticle extends CommonCmd {
    private Map params;

    public SortArticle(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String deptids= (String) params.get("colid");
         if(deptids!=null){
             List<Mharticle> orgdeptuserList=$findOrder(Mharticle.class,"order by fldsn","fldlmid", deptids);
             if(orgdeptuserList!=null&&orgdeptuserList.size()>1){
                 int i=1;
                 for(Mharticle one:orgdeptuserList){
                     $update(Mharticle.class,one.getId(),"fldsn",i);
                     i++;
                 }
             }
         }
         return true;
    }
}
