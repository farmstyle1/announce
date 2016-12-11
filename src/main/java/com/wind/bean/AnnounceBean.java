package com.wind.bean;

import java.util.List;

public class AnnounceBean {
	private String announceId;
	private String announceSubject;
	private String announceImage;
	private String announceDetail;
	private List<String> announceGroup;
	
	
	
	
	public List<String> getAnnounceGroup() {
		return announceGroup;
	}
	public void setAnnounceGroup(List<String> announceGroup) {
		this.announceGroup = announceGroup;
	}
	public String getAnnounceId() {
		return announceId;
	}
	public void setAnnounceId(String announceId) {
		this.announceId = announceId;
	}
	public String getAnnounceDetail() {
		return announceDetail;
	}
	public void setAnnounceDetail(String announceDetail) {
		this.announceDetail = announceDetail;
	}
	public String getAnnounceSubject() {
		return announceSubject;
	}
	public void setAnnounceSubject(String announceSubject) {
		this.announceSubject = announceSubject;
	}
	public String getAnnounceImage() {
		return announceImage;
	}
	public void setAnnounceImage(String announceImage) {
		this.announceImage = announceImage;
	}
	
	
}
