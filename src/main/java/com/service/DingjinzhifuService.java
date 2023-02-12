package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.DingjinzhifuEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.DingjinzhifuVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.DingjinzhifuView;


/**
 * 定金支付
 *
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface DingjinzhifuService extends IService<DingjinzhifuEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<DingjinzhifuVO> selectListVO(Wrapper<DingjinzhifuEntity> wrapper);
   	
   	DingjinzhifuVO selectVO(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
   	
   	List<DingjinzhifuView> selectListView(Wrapper<DingjinzhifuEntity> wrapper);
   	
   	DingjinzhifuView selectView(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<DingjinzhifuEntity> wrapper);
   	
}

