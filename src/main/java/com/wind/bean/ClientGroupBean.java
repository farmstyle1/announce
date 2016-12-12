package com.wind.bean;

import java.util.List;

public class ClientGroupBean {
	private String clientId;
	private List<String> groupId;
	

	public List<String> getGroupId() {
		return groupId;
	}
	public void setGroupId(List<String> groupId) {
		this.groupId = groupId;
	}
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	
	
}
