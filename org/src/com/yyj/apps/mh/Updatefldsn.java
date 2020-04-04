package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mhcolumn;
import com.yyj.apps.org.model.Orgdept;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class Updatefldsn extends CommonCmd {
    private List<Map> params;

    public Updatefldsn(List<Map> params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params!=null&&params.size()>0){
            for(Map one:params){
               String id= (String) one.get("id");
               int fldsn= (int) one.get("fldsn");
               String fldparentid= (String) one.get("fldparentid");
               String fldparentname= (String) one.get("fldparentname");
               $update(Mhcolumn.class,id,"fldsn",fldsn,"fldparentid",fldparentid,"fldparentname",fldparentname);
            }
        }
        return true;
    }
}
