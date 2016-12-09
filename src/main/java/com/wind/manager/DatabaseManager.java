package com.wind.manager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.wind.bean.AnnounceBean;
import com.wind.bean.AnnounceGroupBean;
import com.wind.bean.ClientGroupBean;
import com.wind.bean.ClientGroupListBean;

import sun.security.krb5.internal.crypto.CksumType;

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
	
	public void saveAnnounce(AnnounceBean bean) throws ClassNotFoundException{

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
	
	public void saveAnnounceGroup(AnnounceGroupBean bean) throws ClassNotFoundException{

		String sql = "INSERT INTO Announce_Group " +
				"(announce_id, group_id) VALUES (?, ?)";
		Connection conn = null;

		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, bean.getAnnounceId());
				ps.setString(2, bean.getGroupId());
				
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
	
	public void saveClientGroup(ClientGroupBean bean) throws ClassNotFoundException{

		String sql = "INSERT INTO Client_Group " +
				"(client_id, group_id) VALUES (?, ?)";
		Connection conn = null;

		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, bean.getClientId());
				ps.setString(2, bean.getGroupId());
				
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
	
	public ClientGroupListBean loadClientGroup(String clientId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Client_Group WHERE client_id = ?";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, clientId);
				rs=ps.executeQuery();
				
				
				ClientGroupListBean clientGroupListBean = new ClientGroupListBean();
				List<ClientGroupBean> listClientGroupBean = new ArrayList<ClientGroupBean>();
				
				while(rs.next()){
					ClientGroupBean clientGroupBean = new ClientGroupBean();
					clientGroupBean.setClientId(rs.getString("client_id"));
					clientGroupBean.setGroupId(rs.getString("group_id"));
					listClientGroupBean.add(clientGroupBean);
				}

				ps.close();
				
				clientGroupListBean.setClientGroupListBean(listClientGroupBean);
				
				return clientGroupListBean;
				
			}
	
		} catch (SQLException e) {
			throw new RuntimeException(e);
			
		} finally {
			if (conn != null) {
				try {
					rs.close();
					conn.close();
					
				} catch (SQLException e) {}
			}
		}
		return new ClientGroupListBean();
	}
	
	
	@Test
	public void main() throws ClassNotFoundException{
		loadClientGroup("farm");
	}
	
	
}
