package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
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
public class SaveUser {
    private Map params;

    public SaveUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Orguser org=new Orguser();
        org=BeanUtils.MapToObject(org,params);
        String fldloginid= (String) params.get("fldloginid");
        List<Orguser> alreadyLoginid=DbUtils.$find(Orguser.class,"fldloginid",fldloginid);
        if(alreadyLoginid!=null&&alreadyLoginid.size()>0){
            Map r=new HashMap<>();
            r.put("msg","账号已经存在了，请修改账号");
            return r;
        }
        Orguser orguser=DbUtils.$save(org);
        String needfldsn= (String) params.get("needfldsn");
        if(needfldsn!=null&&!"".equals(needfldsn)){
            List<Orgdeptuser> alreadyeist=DbUtils.$find(Orgdeptuser.class, "fldbmid", orguser.getFldzsbmid(), "fldyhid", orguser.getId());
            if(alreadyeist!=null&&alreadyeist.size()>0){
                return orguser;
            }
            Map snM=new HashMap<>();
            snM.put("fldbmid",org.getFldzsbmid());
            int fldsn= (int) new GetMaxUserSn(snM).execute();
            fldsn=fldsn+1;
            Orgdeptuser orgdeptuser=new Orgdeptuser();
            orgdeptuser.setFldbmid(org.getFldzsbmid());
            orgdeptuser.setFldbmmc(org.getFldzsbmmc());
            orgdeptuser.setFldyhid(orguser.getId());
            orgdeptuser.setFldyhmc(orguser.getFldname());
            orgdeptuser.setFldsn(fldsn);
            DbUtils.$save(orgdeptuser);
        }
        return orguser;
    }
}
