package vcom.newteach.report;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeoutException;

import org.apache.log4j.Logger;

import vcom.util.InterfaceCfg;

import com.rabbitmq.client.Address;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import com.rabbitmq.client.Channel;


/**
 * RabbitMQ ��Ϣ����������
 *
 * @author ����ΰ
 * 2017��12��1��
 */
public class RebbitMqBean {

    private static transient Logger log = Logger.getLogger(RebbitMqBean.class);

    /**
     * @Description:rabbitmq ԭ�����ӹ���
     * @Author:����ΰ
     * @Params:@return
     * @Return:ConnectionFactory
     */
    private ConnectionFactory getFactory() {
        String rabbitmq_username = null;
        String rabbitmq_password = null;
        String rabbitmq_virtualHost = null;
        String rabbitmq_NetworkRecoveryInterval = null;

        if (vcom.util.Config.getMessageProperty() != null) {
            rabbitmq_username = vcom.util.Config.getMessageProperty().get("rabbitmq.username");
            rabbitmq_password = vcom.util.Config.getMessageProperty().get("rabbitmq.password");
            rabbitmq_virtualHost = vcom.util.Config.getMessageProperty().get("rabbitmq.virtualHost");
            rabbitmq_NetworkRecoveryInterval = vcom.util.Config.getMessageProperty().get("rabbitmq.NetworkRecoveryInterval");
            log.debug("[RebbitMqBean]  rabbitmq_username -- " + rabbitmq_username);
            log.debug("[RebbitMqBean]  rabbitmq_password -- " + rabbitmq_password);
            log.debug("[RebbitMqBean]  rabbitmq_virtualHost -- " + rabbitmq_virtualHost);
            log.debug("[RebbitMqBean]  rabbitmq_NetworkRecoveryInterval -- " + rabbitmq_NetworkRecoveryInterval);
        } else {
            log.error("*******  GET CONFIG ERROR!  *******");
            return null;
        }

        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername(rabbitmq_username);
        factory.setPassword(rabbitmq_password);
        factory.setVirtualHost(rabbitmq_virtualHost);
        factory.setAutomaticRecoveryEnabled(true);
        //factory.useNio();
        factory.setNetworkRecoveryInterval(Integer.parseInt(rabbitmq_NetworkRecoveryInterval));

        return factory;
    }

    /**
     * @Description:spring ���ӹ���
     * @Author:����ΰ
     * @Params:@return
     * @Return:CachingConnectionFactory
     */
/*	private CachingConnectionFactory getCachingFactory(){
        getFactory();
		CachingConnectionFactory factory = new CachingConnectionFactory(getFactory());
		factory.setAddresses(rabbitmq_address);
		return factory;
	}*/
    public Connection rabbitConnection() throws IOException, TimeoutException {

        String rabbitmq_connnum = null;
        String rabbitmq_port = null;
        String rabbitmq_address = null;

        if (vcom.util.Config.getMessageProperty() != null) {
            rabbitmq_connnum = vcom.util.Config.getMessageProperty().get("rabbitmq.conn.num");
            rabbitmq_port = vcom.util.Config.getMessageProperty().get("rabbitmq.port");
            rabbitmq_address = InterfaceCfg.getSysPath("RABBITMQ_IP").replace("http://", "").replace("https://", "") + ":" + rabbitmq_port;
            log.debug("[RebbitMqBean]  rabbitmq_connnum -- " + rabbitmq_connnum);
            log.debug("[RebbitMqBean]  rabbitmq_port -- " + rabbitmq_port);
            log.debug("[RebbitMqBean]  rabbitmq_address -- " + rabbitmq_address);
        } else {
            log.error("*******  GET CONFIG ERROR!  *******");
            return null;
        }
        ExecutorService es = Executors.newFixedThreadPool(Integer.parseInt(rabbitmq_connnum));
        Address[] addrArr = Address.parseAddresses(rabbitmq_address);
        Connection conn = getFactory().newConnection(es, addrArr);

        return conn;
    }



   /* public RabbitTemplate rabbitTemplate(){
        getCachingFactory();
        RabbitTemplate template = new RabbitTemplate(getCachingFactory());
        return template;
    }*/

    public String rabbitTemplateSend(String queueName, String message) {

        String rdata = "0";

        try {
            Connection connection = rabbitConnection();
            if (connection == null) {
                return rdata;
            }
            Channel channel = connection.createChannel();

            //channel.queueDeclare(queueName, false, false, false, null);
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("x-message-ttl", 17280000);
            channel.queueDeclare("praiseStudentQueue", true, false, false, params);

            channel.basicPublish("", queueName, null, message.getBytes("UTF-8"));

            channel.close();
            connection.close();
            rdata = "1";

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            rdata = "0";
        } catch (TimeoutException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            rdata = "0";
        }

        return rdata;
    }

    /**
     * @Description:������Ϣ����,�������������Ϣ
     * @Author:����ΰ
     * @Params:@return
     * @Return:MessageListenerAdapter
     */
/*	public MessageListenerAdapter praiseMessageListener(){
		MessageListenerAdapter msg = new MessageListenerAdapter();
		msg.setDelegate(new ConsumerPraiseListener());
		return msg;
	}
	
	*//**
     * ��Ϣ��������
     * @Description:
     * @Author:����ΰ
     * @Params:@return
     * @Return:SimpleMessageListenerContainer
     *//*
	public SimpleMessageListenerContainer simpleMessageListenerContainer(){
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
		container.setConnectionFactory(getCachingFactory());
		container.setMessageListener(praiseMessageListener());
		container.setQueueNames("praiseStudentQueue");
		container.setAcknowledgeMode(AcknowledgeMode.AUTO);
		return container;
	}*/


}
