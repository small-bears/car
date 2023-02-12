package com.entity.view;

import com.entity.QichepingguEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
 

/**
 * 汽车评估
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("qichepinggu")
public class QichepingguView  extends QichepingguEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public QichepingguView(){
	}
 
 	public QichepingguView(QichepingguEntity qichepingguEntity){
 	try {
			BeanUtils.copyProperties(this, qichepingguEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}
}
