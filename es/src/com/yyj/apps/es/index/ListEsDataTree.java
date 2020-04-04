package com.yyj.apps.es.index;
import com.yyj.commonservice.CommonCmd;
import java.util.Map;

/**
 * Created by yyj on 2018/08/04.
 */
public class ListEsDataTree extends CommonCmd {
    private Map params;

    public ListEsDataTree(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String year = (String) params.get("year");
        if(year!=null){
            return $queryForLisFtl("listEsDataTreeByYear.sql",params);
        }
        return $queryForLisFtl("listEsDataTree.sql",params);
    }
}
