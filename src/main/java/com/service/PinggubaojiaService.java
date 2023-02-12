package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.PinggubaojiaEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.PinggubaojiaVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.PinggubaojiaView;


/**
 * 评估报价
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface PinggubaojiaService extends IService<PinggubaojiaEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<PinggubaojiaVO> selectListVO(Wrapper<PinggubaojiaEntity> wrapper);
   	
   	PinggubaojiaVO selectVO(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
   	
   	List<PinggubaojiaView> selectListView(Wrapper<PinggubaojiaEntity> wrapper);
   	
   	PinggubaojiaView selectView(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<PinggubaojiaEntity> wrapper);
   	
}

