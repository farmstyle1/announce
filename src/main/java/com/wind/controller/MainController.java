package com.wind.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.wind.bean.AnnounceBean;
import com.wind.manager.DatabaseManager;


@RestController
public class MainController {
	
	
	
	@RequestMapping(value="/",method = RequestMethod.GET)
	public ModelAndView main(){
		
		return new ModelAndView("index");
	}
	
	@RequestMapping(value="/saveAnnounce",method = RequestMethod.POST)
	@ResponseBody
	public void mainRest(@RequestBody AnnounceBean announceBean){
		
		DatabaseManager dbManager = new DatabaseManager();
		try {
			
			dbManager.insertAnnounce(announceBean);
			
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
		
	}
	
	
}
