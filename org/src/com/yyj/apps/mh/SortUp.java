package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mharticle;
import com.yyj.commonservice.CommonCmd;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SortUp extends CommonCmd {
    private Map params;

    public SortUp(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String id=(String) params.get("id");
         String fldlmid= (String) params.get("fldlmid");
         int fldsn=Integer.parseInt((String) params.get("fldsn"));
         String down=(String) params.get("down");
         if(down==null&&fldsn<=1) return true;
         if(down==null){
             if(fldlmid!=null&&fldsn>1){
                 List<Mharticle> orgdeptuserList=$find(Mharticle.class, "fldsn", fldsn-1,"fldlmid",fldlmid);
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Mharticle one:orgdeptuserList){
                         $update(Mharticle.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 $update(Mharticle.class,id,"fldsn",fldsn-1);
             }
         }else{
             if(fldlmid!=null&&fldsn>0){
                 List<Mharticle> orgdeptuserList=$find(Mharticle.class, "fldsn", fldsn+1,"fldlmid",fldlmid);
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Mharticle one:orgdeptuserList){
                         $update(Mharticle.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 $update(Mharticle.class,id,"fldsn",fldsn+1);
             }
         }
         return true;
    }
}
