package com.entity.view;

import com.entity.YuyuedaodianEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
 

/**
 * 预约到店
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("yuyuedaodian")
public class YuyuedaodianView  extends YuyuedaodianEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public YuyuedaodianView(){
	}
 
 	public YuyuedaodianView(YuyuedaodianEntity yuyuedaodianEntity){
 	try {
			BeanUtils.copyProperties(this, yuyuedaodianEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}
}
