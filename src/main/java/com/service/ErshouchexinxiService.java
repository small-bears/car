package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.ErshouchexinxiEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.ErshouchexinxiVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.ErshouchexinxiView;


/**
 * 二手车信息
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface ErshouchexinxiService extends IService<ErshouchexinxiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ErshouchexinxiVO> selectListVO(Wrapper<ErshouchexinxiEntity> wrapper);
   	
   	ErshouchexinxiVO selectVO(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
   	
   	List<ErshouchexinxiView> selectListView(Wrapper<ErshouchexinxiEntity> wrapper);
   	
   	ErshouchexinxiView selectView(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ErshouchexinxiEntity> wrapper);
   	
}

