package com.yyj.apps.email;
import com.yyj.apps.email.model.Orgemail;
import com.yyj.apps.email.model.Orgemailcon;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import java.util.Map;
/**
 * 业务模块描述:【保存邮件】
 * 作者: 严拥江
 * 日期: 2018/10/21 11:50
 */
public class SaveDraft extends CommonCmd {
    private Map params;

    public SaveDraft(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Orgemailcon con=new Orgemailcon();
        con= BeanUtils.MapToObject(con,params);
        con=$save(con);
        //创建发件人记录
        Orgemail existEmail=$findOne(Orgemail.class,"fldsjrid",con.getInituserid(),"fldcontentid",con.getId());
        if(existEmail==null){
            Orgemail email=new Orgemail();
            email.setFldcontentid(con.getId());
            email.setState("1");
            email.setFldsjr(con.getInitusername());
            email.setFldsjrid(con.getInituserid());
            email.setFldtype("1");
            email.setFldboxid("draft");//Draft
            $save(email);
        }
        return con;
    }
}
