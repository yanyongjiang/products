package com.yyj.config;

import java.io.IOException;
import java.util.Properties;

/**
 * ҵ��ģ������:���������ӡ�
 * ����: ��ӵ��
 * ����: 2018/04/15 11:50
 */
public class Server {
    public static Properties prop;

    public static String getProperty(String key) throws IOException {
        if(prop==null){
            prop = new Properties();
            prop.load(Server.class.getResourceAsStream("/config.properties"));
        }
        return prop.getProperty(key);
    }
}
