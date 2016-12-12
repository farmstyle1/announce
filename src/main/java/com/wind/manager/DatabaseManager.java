package com.wind.manager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.google.gson.Gson;
import com.mysql.jdbc.Statement;
import com.wind.bean.AnnounceBean;
import com.wind.bean.AnnounceGroupBean;
import com.wind.bean.AnnounceListBean;
import com.wind.bean.ClientGroupBean;
import com.wind.bean.ClientGroupListBean;

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
	
	public int saveAnnounce(AnnounceBean bean) throws ClassNotFoundException{
		int lastInsertId = 0;
		String sql = "INSERT INTO Announce " +
				"(announce_detail, announce_subject, announce_image, announce_group) VALUES (?, ?, ?, ?)";
		Connection conn = null;

		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, bean.getAnnounceDetail());
				ps.setString(2, bean.getAnnounceSubject());
				ps.setString(3, bean.getAnnounceImage());
				ps.setString(4, new Gson().toJson(bean.getAnnounceGroup()));
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
		
		return lastInsertId;
	}
	
// Save Announce And Return Last ID Insert
//	public int saveAnnounce(AnnounceBean bean) throws ClassNotFoundException{
//		int lastInsertId = 0;
//		String sql = "INSERT INTO Announce " +
//				"(announce_detail, announce_subject, announce_image) VALUES (?, ?, ?)";
//		Connection conn = null;
//
//		try {
//			conn = getConnection();
//			if(conn!=null){
//				PreparedStatement ps = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
//				ps.setString(1, bean.getAnnounceDetail());
//				ps.setString(2, bean.getAnnounceSubject());
//				ps.setString(3, bean.getAnnounceImage());
//				ps.executeUpdate();
//				
//				
//				ResultSet generatedKeys = ps.getGeneratedKeys();
//				
//				if (generatedKeys.next()) {
//					lastInsertId = generatedKeys.getInt(1);
//	            }
//				
//				ps.close();
//				
//			}
//	
//		} catch (SQLException e) {
//			throw new RuntimeException(e);
//			
//		} finally {
//			if (conn != null) {
//				try {
//					conn.close();
//				} catch (SQLException e) {}
//			}
//		}
//		
//		return lastInsertId;
//	}
	
	public void updateAnnounce(AnnounceBean bean) throws ClassNotFoundException{
		
		String sql = "UPDATE Announce SET "
				+ "announce_detail = ? , "
				+ "announce_subject = ? , "
				+ "announce_image = ? ,"
				+ "announce_group = ? "
				+ "WHERE announce_id = ? ";
				
				;
		Connection conn = null;

		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, bean.getAnnounceDetail());
				ps.setString(2, bean.getAnnounceSubject());
				ps.setString(3, bean.getAnnounceImage());
				ps.setString(4, new Gson().toJson(bean.getAnnounceGroup()));
				ps.setString(5, bean.getAnnounceId());
				
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
				ps.setString(2, new Gson().toJson(bean.getGroupId()));
				
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
	
	public ClientGroupBean loadClientGroup(String clientId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Client_Group WHERE client_id = ?";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, clientId);
				rs=ps.executeQuery();
				
				ClientGroupBean clientGroupBean = new ClientGroupBean();
				
				while(rs.next()){
					
					clientGroupBean.setClientId(rs.getString("client_id"));
					clientGroupBean.setGroupId(new  Gson().fromJson(rs.getString("group_id"), ArrayList.class));
				
				}

				ps.close();
				
			
				
				return clientGroupBean;
				
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
		return new ClientGroupBean();
	}
	
	public AnnounceListBean loadAllAnnounceData() throws ClassNotFoundException{

		String sql = "SELECT * FROM Announce ORDER BY announce_id DESC ";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				rs=ps.executeQuery();
				
				
				AnnounceListBean announceListBean = new AnnounceListBean();
				List<AnnounceBean> listAnnounceBean = new ArrayList<AnnounceBean>();
				
				while(rs.next()){
					AnnounceBean announceBean = new AnnounceBean();
					announceBean.setAnnounceId(String.valueOf(rs.getInt("announce_id")));
					announceBean.setAnnounceSubject(rs.getString("announce_subject"));
					announceBean.setAnnounceImage(rs.getString("announce_image"));
					announceBean.setAnnounceDetail(rs.getString("announce_detail"));
					announceBean.setAnnounceGroup(new Gson().fromJson(rs.getString("announce_group"), ArrayList.class));
					listAnnounceBean.add(announceBean);
					
				}
				

				ps.close();
				
				announceListBean.setAnnounceListBean(listAnnounceBean);
				
				return announceListBean;
				
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
		return new AnnounceListBean();
	}
	
	public AnnounceBean loadAnnounceById(String announceId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Announce WHERE announce_id = ? ";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, announceId);
				rs=ps.executeQuery();
				
				
				AnnounceBean announceBean = new AnnounceBean();
				
				while(rs.next()){
					
					announceBean.setAnnounceId(String.valueOf(rs.getInt("announce_id")));
					announceBean.setAnnounceSubject(rs.getString("announce_subject"));
					announceBean.setAnnounceImage(rs.getString("announce_image"));
					announceBean.setAnnounceDetail(rs.getString("announce_detail"));
					announceBean.setAnnounceGroup(new Gson().fromJson(rs.getString("announce_group"), ArrayList.class));

				}
				

				ps.close();
				
				return announceBean;
				
				
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
		return new AnnounceBean();
	}
	
	public AnnounceListBean loadAnnounceByGroupId(String groupId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Announce WHERE announce_group LIKE ? ";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, "%"+groupId+"%");
				rs=ps.executeQuery();
				
				AnnounceListBean announceListBean = new AnnounceListBean();
				List<AnnounceBean> listAnnounceBean = new ArrayList<AnnounceBean>();
				
				
				while(rs.next()){
					AnnounceBean announceBean = new AnnounceBean();
					announceBean.setAnnounceId(String.valueOf(rs.getInt("announce_id")));
					announceBean.setAnnounceSubject(rs.getString("announce_subject"));
					announceBean.setAnnounceImage(rs.getString("announce_image"));
					announceBean.setAnnounceDetail(rs.getString("announce_detail"));
					announceBean.setAnnounceGroup(new Gson().fromJson(rs.getString("announce_group"), ArrayList.class));
					listAnnounceBean.add(announceBean);
					

				}
				

				ps.close();
				
				announceListBean.setAnnounceListBean(listAnnounceBean);
				return announceListBean;
				
				
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
		return new AnnounceListBean();
	}
	
	public void deleteAnnounceById(String announceId) throws ClassNotFoundException{

		String sql = "DELETE FROM Announce WHERE announce_id = ? ";
		Connection conn = null;
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, announceId);
				ps.execute();
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
	
	public List<String> loadAnnounceGroup(String announceId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Announce_Group WHERE announce_id = ?";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, announceId);
				rs=ps.executeQuery();
				
				
				List<String> announceGroup = new ArrayList<String>();
				
				while(rs.next()){
					String groupId = rs.getString("group_id");
					announceGroup.add(groupId);
				}

				ps.close();
				
				
				
				return announceGroup;
				
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
		return new ArrayList<String>();
	}
	
	public ClientGroupListBean loadAnnounceData(String clientId) throws ClassNotFoundException{

		String sql = "SELECT * FROM Client_Group INNER JOIN Announce_Group "
				+ "ON Client_Group.group_id = Announce_Group.group_id "
				+ "WHERE Client_Group.client_id = ? ";
		Connection conn = null;
		ResultSet rs = null; 
		try {
			conn = getConnection();
			if(conn!=null){
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, clientId);
				rs=ps.executeQuery();
				
				
			
				
				while(rs.next()){
					System.out.println(rs.getString("announce_id"));
				}

				ps.close();
				
			
				
				return new ClientGroupListBean();
				
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
		loadAnnounceByGroupId("audi");
	}
	
}
