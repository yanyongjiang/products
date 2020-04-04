package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowcatalog;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2019/2/17.
 */
public class DelCat extends CommonCmd {
    private Map params;

    public DelCat(Map params) {
        this.params = params;
    }

    public void recursion(String deptid){
        Flowcatalog org=$get(Flowcatalog.class,deptid);
        if(org!=null){
            List<Flowcatalog> children=DbUtils.$find(Flowcatalog.class, "fldparentid",org.getId());
            if(children!=null&&children.size()>0){
                for(Flowcatalog one:children){
                    recursion(one.getId());
                }
            }
            $update(Flowcatalog.class,org.getId(),"state","2");
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
