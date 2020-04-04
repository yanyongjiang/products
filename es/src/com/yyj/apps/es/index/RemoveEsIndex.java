package com.yyj.apps.es.index;

import com.yyj.apps.es.index.model.Esattach;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.file.FtpUtils;
import org.elasticsearch.action.ActionFuture;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.io.File;
import java.net.InetAddress;
import java.util.Map;

/**
 * 业务模块描述:【删除索引】
 * 作者: 严拥江
 * 日期: 2018/09/52 11:50
 */
public class RemoveEsIndex extends CommonCmd {
    private Map params;

    public RemoveEsIndex(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String ids = (String) params.get("ids");
        if (ids == null) return false;
        String[] idsA = ids.split(",");
        String esclustername = Server.getProperty("es.cluster.name");
        String esip = Server.getProperty("es.ip");
        String esport = Server.getProperty("es.port");
        Settings esSettings = Settings.builder()
                .put("cluster.name", esclustername)
                .put("client.transport.sniff", true)
                .build();
        TransportClient client = new PreBuiltTransportClient(esSettings);
        client.addTransportAddress(new TransportAddress(InetAddress.getByName(esip), Integer.parseInt(esport)));
        BulkRequestBuilder bulkRequest = client.prepareBulk();
        for (String oneid : idsA) {
            bulkRequest.add(client.prepareDelete("esindex", "estype",oneid));
        }
        BulkResponse bulkResponse = bulkRequest.get();
        if (bulkResponse.hasFailures()) {

        }
        client.close();
        return true;
    }
}
