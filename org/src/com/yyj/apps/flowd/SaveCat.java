package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowcatalog;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;

import java.util.Map;

/**
 * Created by yyj on 2019/2/17.
 */
public class SaveCat extends CommonCmd {
    private Map params;

    public SaveCat(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Flowcatalog fcat=new Flowcatalog();
        fcat=BeanUtils.MapToObject(fcat,params);
        return $save(fcat);
    }
}
