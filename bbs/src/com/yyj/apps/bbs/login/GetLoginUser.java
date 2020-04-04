package com.yyj.apps.bbs.login;

import com.yyj.apps.bbs.postreplay.model.Bbsuser;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/7/7.
 * ��ȡ��¼�û���Ϣ
 */
public class GetLoginUser {
    private Map params;
    private HttpServletRequest request;

    public GetLoginUser(Map params, HttpServletRequest request) {
        this.params =params;
        this.request=request;
    }

    public Object execute() throws Exception {
        if(request.getSession().getAttribute("bbsloginUser")==null){
            String loginid= (String) request.getSession().getAttribute("bbsloginid");
            if(loginid==null) return "notlogin";
            List<Bbsuser> orguserList=DbUtils.$find(Bbsuser.class, "fldloginid",loginid);
            if(orguserList!=null&&orguserList.size()>0){
                Map loginUser= BeanUtils.ObjectToMap(orguserList.get(0));
                request.getSession().setAttribute("bbsloginUser",loginUser);
            }
        }
        return request.getSession().getAttribute("bbsloginUser");
    }
}
