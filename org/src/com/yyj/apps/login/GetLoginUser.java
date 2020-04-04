package com.yyj.apps.login;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.apps.org.model.Orguser;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * 获取登录用户信息
 */
public class GetLoginUser {
    private Map params;
    private HttpServletRequest request;

    public GetLoginUser(Map params, HttpServletRequest request) {
        this.params =params;
        this.request=request;
    }

    public Object execute() throws Exception {
        if(request.getSession().getAttribute("loginUser")==null){
            String loginid= (String) request.getSession().getAttribute("loginid");
            if(loginid==null) return "notlogin";
            List<Orguser> orguserList=DbUtils.$find(Orguser.class, "fldloginid",loginid);
            if(orguserList!=null&&orguserList.size()>0){
                Map loginUser= BeanUtils.ObjectToMap(orguserList.get(0));
                String fldzsbmid= (String) loginUser.get("fldzsbmid");
                Orgdept d=DbUtils.$get(Orgdept.class,fldzsbmid);
                if("3".equals(d.getFldtype())){
                    loginUser.put("deptid",d.getId());
                    loginUser.put("deptname",d.getFldname());
                    Orgdept parentd=DbUtils.$get(Orgdept.class,d.getFldparentid());
                    if(parentd!=null){
                        loginUser.put("bmid", parentd.getId());
                        loginUser.put("bmname", parentd.getFldname());
                    }
                    Orgdept parentd2=DbUtils.$get(Orgdept.class,parentd.getFldparentid());
                    if(parentd2!=null){
                        loginUser.put("unitid", parentd2.getId());
                        loginUser.put("unitname",parentd2.getFldname());
                    }
                }
                if("2".equals(d.getFldtype())){
                    loginUser.put("deptid",d.getId());
                    loginUser.put("deptname",d.getFldname());
                    loginUser.put("bmid", d.getId());
                    loginUser.put("bmname", d.getFldname());
                    Orgdept parentd2=DbUtils.$get(Orgdept.class,d.getFldparentid());
                    if(parentd2!=null){
                        loginUser.put("unitid", parentd2.getId());
                        loginUser.put("unitname",parentd2.getFldname());
                    }
                }
                if("1".equals(d.getFldtype())){
                    loginUser.put("deptid",d.getId());
                    loginUser.put("deptname",d.getFldname());
                    loginUser.put("bmid", d.getId());
                    loginUser.put("bmname", d.getFldname());
                    loginUser.put("unitid", d.getId());
                    loginUser.put("unitname",d.getFldname());
                }
                request.getSession().setAttribute("loginUser",loginUser);
            }
        }
        return request.getSession().getAttribute("loginUser");
    }
}
