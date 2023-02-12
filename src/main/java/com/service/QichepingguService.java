package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.QichepingguEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.QichepingguVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.QichepingguView;


/**
 * 汽车评估
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface QichepingguService extends IService<QichepingguEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<QichepingguVO> selectListVO(Wrapper<QichepingguEntity> wrapper);
   	
   	QichepingguVO selectVO(@Param("ew") Wrapper<QichepingguEntity> wrapper);
   	
   	List<QichepingguView> selectListView(Wrapper<QichepingguEntity> wrapper);
   	
   	QichepingguView selectView(@Param("ew") Wrapper<QichepingguEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<QichepingguEntity> wrapper);
   	
}

