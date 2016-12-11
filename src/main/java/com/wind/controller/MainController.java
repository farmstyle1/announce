package com.wind.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wind.bean.AnnounceBean;
import com.wind.bean.AnnounceListBean;
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
	
	
	
}
