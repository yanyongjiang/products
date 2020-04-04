package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbsuser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【更新注册用户】
 * 作者: 严拥江
 * 日期: 2018/10/01 11:50
 */
public class UpdateUser extends CommonCmd {
    private Map params;
    private HttpServletRequest request;

    public UpdateUser(Map params,HttpServletRequest request) {
        this.params = params;
        this.request=request;
    }

    public Object execute() throws Exception {
        Bbsuser user = new Bbsuser();
        user = BeanUtils.MapToObject(user, params);
        Map checkM=new HashMap();
        int count=0;
        String fldname = (String) params.get("fldname");
        checkM.put("fldname",fldname);
        checkM.put("notid",user.getId());
        count=$asIntFtl("checkUserExist.sql",checkM);
        if(count>0){
            Map r = new HashMap<>();
            r.put("msg", "用户名已经存在了，请修改用户名");
            return r;
        }
        request.getSession().removeAttribute("bbsloginUser");
        return DbUtils.$save(user);
    }
}
