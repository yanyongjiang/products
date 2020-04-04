package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowcatalog;
import com.yyj.commonservice.CommonCmd;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2019/2/17.
 */
public class UpdateCatfldsn extends CommonCmd {
    private List<Map> params;

    public UpdateCatfldsn(List<Map> params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params!=null&&params.size()>0){
            for(Map one:params){
               String id= (String) one.get("id");
               int fldsn= (int) one.get("fldsn");
               String fldparentid= (String) one.get("fldparentid");
               String fldparentname= (String) one.get("fldparentname");
               $update(Flowcatalog.class,id,"fldsn",fldsn,"fldparentid",fldparentid,"fldparentname",fldparentname);
            }
        }
        return true;
    }
}
