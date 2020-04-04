package com.yyj.apps.email;

import com.yyj.apps.email.model.Orgemail;
import com.yyj.apps.email.model.Orgemailcon;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;

import java.util.Map;

/**
 * 业务模块描述:【发送邮件】
 * 作者: 严拥江
 * 日期: 2018/10/27 11:50
 */
public class SendMail extends CommonCmd {
    private Map params;

    public SendMail(Map params) {
        this.params = params;
    }


    public void saveInbox(String fldsjrids,String fldsjrs,Orgemailcon con,String fldtype) throws IllegalAccessException {
        if (fldsjrids != null && fldsjrs != null) {
            String[] fldsjridsA = fldsjrids.split(",");
            String[] fldsjrsA = fldsjrs.split(",");
            for (int i = 0; i < fldsjridsA.length; i++) {
                String onesjr = fldsjridsA[i];
                //创建发件人记录
                Orgemail existEmail = $findOne(Orgemail.class, "fldsjrid", onesjr, "fldcontentid", con.getId(),"fldtype","!='1'");
                if (existEmail == null) {
                    Orgemail email = new Orgemail();
                    email.setFldcontentid(con.getId());
                    email.setState("1");
                    email.setFldsjr(fldsjrsA[i]);
                    email.setFldsjrid(onesjr);
                    email.setFldtype(fldtype);
                    email.setFldboxid("inbox");//Draft
                    $save(email);
                }
            }
        }
    }
    public Object execute() throws Exception {
        String fldcontentid = (String) params.get("fldcontentid");
        if (fldcontentid == null) return null;
        Orgemailcon con = $get(Orgemailcon.class, fldcontentid);
        String fldsjrids = con.getFldsjrids();
        String fldsjrs = con.getFldsjrs();
        if (con == null) return null;
        saveInbox(fldsjrids,fldsjrs,con,"2");
        String fldcjrids =  con.getFldcsrids();
        String fldcjrs =con.getFldcsrs();
        saveInbox(fldcjrids,fldcjrs,con,"3");
        String fldmjrids = con.getFldmsrids();
        String fldmjrs = con.getFldmsrs();
        saveInbox(fldmjrids,fldmjrs,con,"4");
        Orgemail orgemail=$findOne(Orgemail.class,"fldcontentid",fldcontentid,"fldtype","1","fldsjrid",con.getInituserid());
        if(orgemail!=null)
        $update(Orgemail.class,orgemail.getId(),"fldboxid","send");
        return true;
    }
}
