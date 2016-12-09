package com.wind.manager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;

import com.wind.bean.AnnounceBean;

import java.sql.PreparedStatement;



public class DatabaseManager {

	CallableStatement statement =null;
	ResultSet rs = null; 
	
	private Connection getConnection() throws ClassNotFoundException {		
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			return DriverManager.getConnection("jdbc:mysql://localhost:3306/announce?user=root&password=root");

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return null;
		
	}
	
	public void insertAnnounce(AnnounceBean bean) throws ClassNotFoundException{

		String sql = "INSERT INTO Announce " +
				"(announce_id, announce_detail, announce_subject, announce_image) VALUES (?, ?, ?, ?)";
		Connection conn = null;

		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, bean.getAnnounceId());
				ps.setString(2, bean.getAnnounceDetail());
				ps.setString(3, bean.getAnnounceSubject());
				ps.setString(4, bean.getAnnounceImage());
				ps.executeUpdate();
				ps.close();
			}
			

			
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	
	@Test
	public void main() throws ClassNotFoundException{
		AnnounceBean bean = new AnnounceBean();
		bean.setAnnounceId("AN005");
		bean.setAnnounceDetail("Test");
		insertAnnounce(bean);
	}
	
	
}
