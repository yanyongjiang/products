package com.yyj.apps.es.index;
import com.yyj.commonservice.CommonCmd;
import java.util.Map;

/**
 * Created by yyj on 2018/08/04.
 */
public class ListEsData extends CommonCmd {
    private Map params;

    public ListEsData(Map params) {
        this.params = params;
     }

    public Object execute() throws Exception {
        String year = (String) params.get("yearmon");
        if(year!=null){
            return $asPageFtl("listEsData.sql",params);
        }
        return null;
    }
}
