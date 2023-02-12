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
 * 二手车信息
 * 数据库通用操作实体类（普通增删改查）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("ershouchexinxi")
public class ErshouchexinxiEntity<T> implements Serializable {
	private static final long serialVersionUID = 1L;


	public ErshouchexinxiEntity() {
		
	}
	
	public ErshouchexinxiEntity(T t) {
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
	 * 图片
	 */
					
	private String tupian;
	
	/**
	 * 品牌
	 */
					
	private String pinpai;
	
	/**
	 * 分类
	 */
					
	private String fenlei;
	
	/**
	 * 车身颜色
	 */
					
	private String cheshenyanse;
	
	/**
	 * 上牌时间
	 */
				
	@JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
	@DateTimeFormat 		
	private Date shangpaishijian;
	
	/**
	 * 行驶里程
	 */
					
	private String xingshilicheng;
	
	/**
	 * 售价
	 */
					
	private String shoujia;
	
	/**
	 * 车况描述
	 */
					
	private String chekuangmiaoshu;
	
	
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
	 * 设置：图片
	 */
	public void setTupian(String tupian) {
		this.tupian = tupian;
	}
	/**
	 * 获取：图片
	 */
	public String getTupian() {
		return tupian;
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
	 * 设置：分类
	 */
	public void setFenlei(String fenlei) {
		this.fenlei = fenlei;
	}
	/**
	 * 获取：分类
	 */
	public String getFenlei() {
		return fenlei;
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
	public void setShangpaishijian(Date shangpaishijian) {
		this.shangpaishijian = shangpaishijian;
	}
	/**
	 * 获取：上牌时间
	 */
	public Date getShangpaishijian() {
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
	 * 设置：售价
	 */
	public void setShoujia(String shoujia) {
		this.shoujia = shoujia;
	}
	/**
	 * 获取：售价
	 */
	public String getShoujia() {
		return shoujia;
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

}
