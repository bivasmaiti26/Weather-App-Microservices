package com.blitzkrieg.sessionmanagement;

import com.blitzkrieg.sessionmanagement.zookeeper.ZookeeperHelper;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.Watcher.Event.KeeperState;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SessionmanagementApplication {
	private static ZooKeeper zk;

	private static ZookeeperHelper zoo;
	// Method to create znode in zookeeper ensemble

	public static void main(String[] args) {

		try {
			zoo = new ZookeeperHelper();
			zk = zoo.connect("zookeeper");
			byte[] data = "{\"host\":\"session-management\", \"port\":\"8084\"}".getBytes();
			Stat stat = zoo.znode_exists(zk,"/session-management"); // Stat checks the path of the znode

			if(stat != null) {
				System.out.println("Node exists and the node version is " + stat.getVersion());
				zk.setData("/session-management", data, zk.exists("/session-management",true).getVersion());

			} else {
				System.out.println("Creating new Node session_management");
				zoo.create(zk,"/session-management",data);
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
