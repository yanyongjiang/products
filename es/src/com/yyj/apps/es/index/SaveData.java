package com.yyj.apps.es.index;

import com.yyj.apps.es.index.model.Esdata;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import java.util.Map;

public class SaveData extends CommonCmd {
    private Map params;

    public SaveData(Map params) {
        this.params = params;
    }
    public Object execute() throws Exception {
        Esdata esdata=new Esdata();
        esdata= BeanUtils.MapToObject(esdata,params);
        return $save(esdata);
    }
}
