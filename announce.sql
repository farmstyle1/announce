-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- โฮสต์: localhost
-- เวลาในการสร้าง: 
-- รุ่นของเซิร์ฟเวอร์: 5.0.51
-- รุ่นของ PHP: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- ฐานข้อมูล: `announce`
-- 

-- --------------------------------------------------------

-- 
-- โครงสร้างตาราง `announce`
-- 

CREATE TABLE `announce` (
  `announce_id` varchar(10) default NULL,
  `announce_detail` varchar(500) default NULL,
  `announce_subject` varchar(100) default NULL,
  `announce_image` varchar(200) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- dump ตาราง `announce`
-- 


-- --------------------------------------------------------

-- 
-- โครงสร้างตาราง `announce_group`
-- 

CREATE TABLE `announce_group` (
  `announce_id` varchar(10) default NULL,
  `group_id` varchar(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- dump ตาราง `announce_group`
-- 

INSERT INTO `announce_group` VALUES ('1150', 'spike');

-- --------------------------------------------------------

-- 
-- โครงสร้างตาราง `client_group`
-- 

CREATE TABLE `client_group` (
  `client_id` varchar(10) default NULL,
  `group_id` varchar(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- dump ตาราง `client_group`
-- 

INSERT INTO `client_group` VALUES ('farm', 'wind');
