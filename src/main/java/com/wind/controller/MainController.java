package com.wind.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.wind.bean.AnnounceBean;
import com.wind.bean.AnnounceListBean;
import com.wind.bean.ClientGroupBean;
import com.wind.bean.ClientGroupListBean;
import com.wind.manager.DatabaseManager;


@RestController
public class MainController {

	@CrossOrigin
	@RequestMapping(value="/saveAnnounce",method = RequestMethod.POST)
	@ResponseBody
	public void saveAnnounce(@RequestBody AnnounceBean announceBean){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
			dbManager.saveAnnounce(announceBean);
		
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/updateAnnounce",method = RequestMethod.POST)
	@ResponseBody
	public void updateAnnounce(@RequestBody AnnounceBean announceBean){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
			dbManager.updateAnnounce(announceBean);
			

			
			
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/loadAllAnnounce",method = RequestMethod.GET)
	@ResponseBody
	public AnnounceListBean loadAllAnnounce(){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
			AnnounceListBean announceListBean = dbManager.loadAllAnnounceData();
		
			return announceListBean;
			
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		return new AnnounceListBean();
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/loadAnnounceById/{announceId}",method = RequestMethod.GET)
	@ResponseBody
	public AnnounceBean loadAnnounceById(@PathVariable String announceId ){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
				AnnounceBean announceBean = dbManager.loadAnnounceById(announceId);
			 
				return announceBean;
				
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		return new AnnounceBean();
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/deleteAnnounceById/{announceId}",method = RequestMethod.GET)
	@ResponseBody
	public void deleteAnnounceById(@PathVariable String announceId ){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
				dbManager.deleteAnnounceById(announceId);
			 
				
				
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/saveClientGroup",method = RequestMethod.POST)
	@ResponseBody
	public void saveClientGroup(@RequestBody ClientGroupBean clientGroupBean){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
			dbManager.saveClientGroup(clientGroupBean);
		
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
	}
	
	@CrossOrigin
	@RequestMapping(value="/loadAnnounceByClientId/{clientId}",method = RequestMethod.GET)
	@ResponseBody
	public AnnounceListBean loadAnnounceByClientId(@PathVariable String clientId ){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
				AnnounceListBean announceListBean = new AnnounceListBean();
				
				ClientGroupBean clientGroupBean = dbManager.loadClientGroup(clientId);
				
				// Unique Announce
				List<String> uniqueAnnounceId = new ArrayList<String>();
				AnnounceBean uniqueAnnounceBean = new AnnounceBean();
				List<AnnounceBean> listUniqueAnnounceBean = new ArrayList<AnnounceBean>();
				AnnounceListBean uniqueAnnounceListBean = new AnnounceListBean();
				
				for (String s : clientGroupBean.getGroupId()) {
					
					 announceListBean = dbManager.loadAnnounceByGroupId(s);
					 for (AnnounceBean ss : announceListBean.getAnnounceListBean()) {
							if(!uniqueAnnounceId.contains(ss.getAnnounceId())){
								uniqueAnnounceId.add(ss.getAnnounceId());
								uniqueAnnounceBean = ss;
								listUniqueAnnounceBean.add(uniqueAnnounceBean);
							}
						}
				}
				
				
				
				
				
				uniqueAnnounceListBean.setAnnounceListBean(listUniqueAnnounceBean);
				
				return uniqueAnnounceListBean;
				
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		return new AnnounceListBean();
		
	}
	
	
	
}
