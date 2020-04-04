package com.yyj.apps.es.search;

import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Search extends CommonCmd {
    private Map params;

    public Search(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String qcon = (String) params.get("qcon");
        String start = (String) params.get("start");
        String limit = (String) params.get("limit");
        String pagePerGroup = (String) params.get("pagePerGroup");
        String esclustername = Server.getProperty("es.cluster.name");
        String esip = Server.getProperty("es.ip");
        String esport = Server.getProperty("es.port");
        Settings esSettings = Settings.builder()
                .put("cluster.name", esclustername)
                .put("client.transport.sniff", true)
                .build();
        TransportClient client = new PreBuiltTransportClient(esSettings);
        client.addTransportAddress(new TransportAddress(InetAddress.getByName(esip), Integer.parseInt(esport)));
        HighlightBuilder hiBuilder = new HighlightBuilder();
        hiBuilder.preTags("<span style=\"color:red;\">");
        hiBuilder.postTags("</span>");
        hiBuilder.field("fldtm");
        hiBuilder.field("fldtext");//fldattach
        hiBuilder.field("fldattach");
        SearchResponse response = client.prepareSearch("esindex")
                .setTypes("estype")
                .setQuery(QueryBuilders.multiMatchQuery(qcon, "fldtm", "fldtext", "fldattach")).highlighter(hiBuilder)
                .setFrom(Integer.parseInt(start)).setSize(Integer.parseInt(limit)).setExplain(true)
                .get();
        Long totalCount = response.getHits().getTotalHits().value;
        EsPagingImpl<Map> paging = new EsPagingImpl(Integer.parseInt(start), Integer.parseInt(limit), totalCount, Integer.parseInt(pagePerGroup));
        if(totalCount==0) return paging;
        List<Map> r = new ArrayList<>();
        for (SearchHit hit : response.getHits()) {
            Map one = new HashMap();
            String id=hit.getId();
            one.put("id",id);
            String fldngdate= (String) hit.getSourceAsMap().get("fldngdate");
            one.put("fldngdate",fldngdate);

            StringBuilder fldtm = new StringBuilder();
            StringBuilder fldtext = new StringBuilder();
            StringBuilder fldattach = new StringBuilder();
            if(hit.getHighlightFields().get("fldtm")!=null){
                Text[] text = hit.getHighlightFields().get("fldtm").getFragments();
                for (Text str : text) {
                    fldtm.append(str);
                }
            }else{
                fldtm.append(hit.getSourceAsMap().get("fldtm"));
            }
            if(hit.getHighlightFields().get("fldtext")!=null){
                Text[] text2 = hit.getHighlightFields().get("fldtext").getFragments();
                for (Text str : text2) {
                    fldtext.append(str);
                }
            }else{
                fldtext.append(hit.getSourceAsMap().get("fldtext"));
            }

            if(hit.getHighlightFields().get("fldattach")!=null){
                Text[] text3 = hit.getHighlightFields().get("fldattach").getFragments();
                for (Text str : text3) {
                    fldattach.append(str);
                }
            }else{
                String fldattachStr= (String) hit.getSourceAsMap().get("fldattach");
                if(fldattachStr!=null&&fldattachStr.length()>360) fldattachStr=fldattachStr.substring(0,360)+"...";
                fldattach.append(fldattachStr);
            }
            one.put("fldtm",fldtm.toString());
            one.put("fldtext",fldtext.toString());
            one.put("fldattach",fldattach.toString());
            r.add(one);
        }
        paging.setData(r);
        return paging;
    }
}
