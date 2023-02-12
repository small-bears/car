package com.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.beanutils.BeanUtils;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.baomidou.mybatisplus.enums.IdType;


/**
 * 评估报价
 * 数据库通用操作实体类（普通增删改查）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("pinggubaojia")
public class PinggubaojiaEntity<T> implements Serializable {
	private static final long serialVersionUID = 1L;


	public PinggubaojiaEntity() {
		
	}
	
	public PinggubaojiaEntity(T t) {
		try {
			BeanUtils.copyProperties(this, t);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 主键id
	 */
	@TableId
	private Long id;
	/**
	 * 车型
	 */
					
	private String chexing;
	
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
	
	
	@JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
	@DateTimeFormat
	private Date addtime;

	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 设置：车型
	 */
	public void setChexing(String chexing) {
		this.chexing = chexing;
	}
	/**
	 * 获取：车型
	 */
	public String getChexing() {
		return chexing;
	}
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
