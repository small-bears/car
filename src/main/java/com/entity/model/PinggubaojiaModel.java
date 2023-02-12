package com.entity.model;

import com.entity.PinggubaojiaEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import java.io.Serializable;
 

/**
 * 评估报价
 * 接收传参的实体类  
 *（实际开发中配合移动端接口开发手动去掉些没用的字段， 后端一般用entity就够用了） 
 * 取自ModelAndView 的model名称
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public class PinggubaojiaModel  implements Serializable {
	private static final long serialVersionUID = 1L;

	 			
	/**
	 * 品牌
	 */
	
	private String pinpai;
		
	/**
	 * 车身颜色
	 */
	
	private String cheshenyanse;
		
	/**
	 * 上牌时间
	 */
	
	private String shangpaishijian;
		
	/**
	 * 行驶里程
	 */
	
	private String xingshilicheng;
		
	/**
	 * 车况描述
	 */
	
	private String chekuangmiaoshu;
		
	/**
	 * 评估价
	 */
	
	private String pinggujia;
		
	/**
	 * 用户名
	 */
	
	private String yonghuming;
		
	/**
	 * 姓名
	 */
	
	private String xingming;
		
	/**
	 * 联系方式
	 */
	
	private String lianxifangshi;
				
	
	/**
	 * 设置：品牌
	 */
	 
	public void setPinpai(String pinpai) {
		this.pinpai = pinpai;
	}
	
	/**
	 * 获取：品牌
	 */
	public String getPinpai() {
		return pinpai;
	}
				
	
	/**
	 * 设置：车身颜色
	 */
	 
	public void setCheshenyanse(String cheshenyanse) {
		this.cheshenyanse = cheshenyanse;
	}
	
	/**
	 * 获取：车身颜色
	 */
	public String getCheshenyanse() {
		return cheshenyanse;
	}
				
	
	/**
	 * 设置：上牌时间
	 */
	 
	public void setShangpaishijian(String shangpaishijian) {
		this.shangpaishijian = shangpaishijian;
	}
	
	/**
	 * 获取：上牌时间
	 */
	public String getShangpaishijian() {
		return shangpaishijian;
	}
				
	
	/**
	 * 设置：行驶里程
	 */
	 
	public void setXingshilicheng(String xingshilicheng) {
		this.xingshilicheng = xingshilicheng;
	}
	
	/**
	 * 获取：行驶里程
	 */
	public String getXingshilicheng() {
		return xingshilicheng;
	}
				
	
	/**
	 * 设置：车况描述
	 */
	 
	public void setChekuangmiaoshu(String chekuangmiaoshu) {
		this.chekuangmiaoshu = chekuangmiaoshu;
	}
	
	/**
	 * 获取：车况描述
	 */
	public String getChekuangmiaoshu() {
		return chekuangmiaoshu;
	}
				
	
	/**
	 * 设置：评估价
	 */
	 
	public void setPinggujia(String pinggujia) {
		this.pinggujia = pinggujia;
	}
	
	/**
	 * 获取：评估价
	 */
	public String getPinggujia() {
		return pinggujia;
	}
				
	
	/**
	 * 设置：用户名
	 */
	 
	public void setYonghuming(String yonghuming) {
		this.yonghuming = yonghuming;
	}
	
	/**
	 * 获取：用户名
	 */
	public String getYonghuming() {
		return yonghuming;
	}
				
	
	/**
	 * 设置：姓名
	 */
	 
	public void setXingming(String xingming) {
		this.xingming = xingming;
	}
	
	/**
	 * 获取：姓名
	 */
	public String getXingming() {
		return xingming;
	}
				
	
	/**
	 * 设置：联系方式
	 */
	 
	public void setLianxifangshi(String lianxifangshi) {
		this.lianxifangshi = lianxifangshi;
	}
	
	/**
	 * 获取：联系方式
	 */
	public String getLianxifangshi() {
		return lianxifangshi;
	}
			
}
