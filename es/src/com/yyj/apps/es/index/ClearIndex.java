package com.yyj.apps.es.index;

import com.yyj.apps.es.index.model.Esdata;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.bean.BeanUtils;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.net.InetAddress;
import java.util.Map;

public class ClearIndex extends CommonCmd {
    private Map params;

    public ClearIndex(Map params) {
        this.params = params;
    }
    public Object execute() throws Exception {
        String esclustername = Server.getProperty("es.cluster.name");
        String esip = Server.getProperty("es.ip");
        String esport= Server.getProperty("es.port");
        Settings esSettings = Settings.builder()
                .put("cluster.name",esclustername)
                .put("client.transport.sniff", true)
                .build();
        TransportClient client = new PreBuiltTransportClient(esSettings);
        client.addTransportAddress(new TransportAddress(InetAddress.getByName(esip), Integer.parseInt(esport)));
        client.admin().indices().delete(new DeleteIndexRequest("esindex")).actionGet().isAcknowledged();
        return true;
    }
}
