package com.entity.view;

import com.entity.ErshouchefenleiEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
 

/**
 * 二手车分类
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("ershouchefenlei")
public class ErshouchefenleiView  extends ErshouchefenleiEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public ErshouchefenleiView(){
	}
 
 	public ErshouchefenleiView(ErshouchefenleiEntity ershouchefenleiEntity){
 	try {
			BeanUtils.copyProperties(this, ershouchefenleiEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}
}
