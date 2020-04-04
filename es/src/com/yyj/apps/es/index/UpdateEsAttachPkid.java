package com.yyj.apps.es.index;
import com.yyj.commonservice.CommonCmd;
import java.util.Map;
/**
 * Created by yyj on 2018/9/8.
 * 更新附件pkId
 */
public class UpdateEsAttachPkid extends CommonCmd {
    private Map params;
    public UpdateEsAttachPkid(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String oldpkid = (String) params.get("oldpkid");
        String pkid = (String) params.get("pkid");
        if(oldpkid==null||pkid==null) return null;
        return $asUpdateFtl("updateEsAttachPkid.sql",params);
    }
}
