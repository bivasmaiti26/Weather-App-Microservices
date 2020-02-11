package com.blitzkrieg.sessionmanagement;

import com.blitzkrieg.sessionmanagement.zookeeper.ZookeeperHelper;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SessionmanagementApplication {
	private static ZooKeeper zk;

	private static ZookeeperHelper zoo;
	// Method to create znode in zookeeper ensemble

	public static void main(String[] args) {

		try {
			zoo = new ZookeeperHelper();
			zk = zoo.connect("localhost");
			byte[] data = "{\"host\":\"localhost\", \"port\":\"8084\"}".getBytes();
			Stat stat = zoo.znode_exists(zk,"/session_management"); // Stat checks the path of the znode

			if(stat != null) {
				System.out.println("Node exists and the node version is " + stat.getVersion());
				zk.setData("/session_management", data, zk.exists("/session_management",true).getVersion());

			} else {
				System.out.println("Creating new Node session_management");
				zoo.create(zk,"/session_management",data);
			}
			 // Create the data to the specified path
			zoo.close();
		} catch (Exception e) {
			System.out.println(e.getMessage()); //Catch error message
		}
		SpringApplication.run(SessionmanagementApplication.class, args);

	}

	//public static register

}
