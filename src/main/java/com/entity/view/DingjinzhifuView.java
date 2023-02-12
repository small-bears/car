package com.entity.view;

import com.entity.DingjinzhifuEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
 

/**
 * 定金支付
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@TableName("dingjinzhifu")
public class DingjinzhifuView  extends DingjinzhifuEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public DingjinzhifuView(){
	}
 
 	public DingjinzhifuView(DingjinzhifuEntity dingjinzhifuEntity){
 	try {
			BeanUtils.copyProperties(this, dingjinzhifuEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}
}
