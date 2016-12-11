package com.wind.bean;

public class AnnounceGroupBean {
	private String announceId;
	private String groupId;
	
	public AnnounceGroupBean() {
		super();
	}

	public AnnounceGroupBean(String announceId, String groupId) {
		super();
		this.announceId = announceId;
		this.groupId = groupId;
	}
	
	public String getAnnounceId() {
		return announceId;
	}
	public void setAnnounceId(String announceId) {
		this.announceId = announceId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	
	
}
