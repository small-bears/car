package com.dao;

import com.entity.DingjinzhifuEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.DingjinzhifuVO;
import com.entity.view.DingjinzhifuView;


/**
 * 定金支付
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface DingjinzhifuDao extends BaseMapper<DingjinzhifuEntity> {
	
	List<DingjinzhifuVO> selectListVO(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
	
	DingjinzhifuVO selectVO(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
	
	List<DingjinzhifuView> selectListView(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);

	List<DingjinzhifuView> selectListView(Pagination page,@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
	
	DingjinzhifuView selectView(@Param("ew") Wrapper<DingjinzhifuEntity> wrapper);
	
}
