package com.yyj.apps.mh;
import com.yyj.apps.mh.model.Mharticle;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;

import java.util.Map;

public class SaveArticle extends CommonCmd {
    private Map params;

    public SaveArticle(Map params) {
        this.params = params;
    }
    public Object execute() throws Exception {
        Mharticle esdata=new Mharticle();
        esdata= BeanUtils.MapToObject(esdata,params);
        return $save(esdata);
    }
}
