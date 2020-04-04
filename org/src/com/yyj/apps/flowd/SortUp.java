package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowdef;
import com.yyj.commonservice.CommonCmd;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2019/5/1.
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
                 List<Flowdef> orgdeptuserList=$find(Flowdef.class, "fldsn", fldsn-1,"fldcatid",fldlmid,"state","1");
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Flowdef one:orgdeptuserList){
                         $update(Flowdef.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 $update(Flowdef.class,id,"fldsn",fldsn-1);
             }
         }else{
             if(fldlmid!=null&&fldsn>0){
                 List<Flowdef> orgdeptuserList=$find(Flowdef.class, "fldsn", fldsn+1,"fldcatid",fldlmid,"state","1");
                 if(orgdeptuserList!=null&&orgdeptuserList.size()>0){
                     for(Flowdef one:orgdeptuserList){
                         $update(Flowdef.class,one.getId(),"fldsn",fldsn);
                     }
                 }
                 $update(Flowdef.class,id,"fldsn",fldsn+1);
             }
         }
         return true;
    }
}
