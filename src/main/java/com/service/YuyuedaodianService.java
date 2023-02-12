package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.YuyuedaodianEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.YuyuedaodianVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.YuyuedaodianView;


/**
 * 预约到店
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface YuyuedaodianService extends IService<YuyuedaodianEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<YuyuedaodianVO> selectListVO(Wrapper<YuyuedaodianEntity> wrapper);
   	
   	YuyuedaodianVO selectVO(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
   	
   	List<YuyuedaodianView> selectListView(Wrapper<YuyuedaodianEntity> wrapper);
   	
   	YuyuedaodianView selectView(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<YuyuedaodianEntity> wrapper);
   	
}

