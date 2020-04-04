package com.yyj.apps.email;
import com.yyj.apps.email.model.Orgemailfolder;
import com.yyj.commonservice.CommonCmd;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class UpdateFolderfldsn extends CommonCmd {
    private List<Map> params;

    public UpdateFolderfldsn(List<Map> params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params!=null&&params.size()>0){
            for(Map one:params){
               String id= (String) one.get("id");
               int fldsn= (int) one.get("fldsn");
               $update(Orgemailfolder.class,id,"fldsn",fldsn);
            }
        }
        return true;
    }
}
