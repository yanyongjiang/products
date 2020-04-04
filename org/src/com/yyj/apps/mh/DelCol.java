package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mhcolumn;
import com.yyj.apps.org.model.Orgdept;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/6/17.
 */
public class DelCol extends CommonCmd {
    private Map params;

    public DelCol(Map params) {
        this.params = params;
    }

    public void recursion(String deptid){
        Mhcolumn org=$get(Mhcolumn.class,deptid);
        if(org!=null){
            List<Mhcolumn> children=DbUtils.$find(Mhcolumn.class, "fldparentid",org.getId());
            if(children!=null&&children.size()>0){
                for(Mhcolumn one:children){
                    recursion(one.getId());
                }
            }
            $update(Mhcolumn.class,org.getId(),"state","2");
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
