package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbsuser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【保存注册用户】
 * 作者: 严拥江
 * 日期: 2018/03/04 11:50
 */
public class SaveUser extends CommonCmd {
    private Map params;

    public SaveUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Bbsuser user = new Bbsuser();
        user = BeanUtils.MapToObject(user, params);
        String fldloginid = (String) params.get("fldloginid");
        Map checkM=new HashMap();
        checkM.put("fldloginid",fldloginid);
        int count=$asIntFtl("checkUserExist.sql",checkM);
        if(count>0){
            Map r = new HashMap<>();
            r.put("msg", "账号已经存在了，请修改账号");
            return r;
        }
        String fldname = (String) params.get("fldname");
        checkM.put("fldname",fldname);
        checkM.remove("fldloginid");
        count=$asIntFtl("checkUserExist.sql",checkM);
        if(count>0){
            Map r = new HashMap<>();
            r.put("msg", "用户名已经存在了，请修改用户名");
            return r;
        }
        return DbUtils.$save(user);
    }
}
