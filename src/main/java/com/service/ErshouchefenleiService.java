package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.ErshouchefenleiEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.ErshouchefenleiVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.ErshouchefenleiView;


/**
 * 二手车分类
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface ErshouchefenleiService extends IService<ErshouchefenleiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ErshouchefenleiVO> selectListVO(Wrapper<ErshouchefenleiEntity> wrapper);
   	
   	ErshouchefenleiVO selectVO(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
   	
   	List<ErshouchefenleiView> selectListView(Wrapper<ErshouchefenleiEntity> wrapper);
   	
   	ErshouchefenleiView selectView(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ErshouchefenleiEntity> wrapper);
   	
}

