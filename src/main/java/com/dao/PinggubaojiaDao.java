package com.dao;

import com.entity.PinggubaojiaEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.PinggubaojiaVO;
import com.entity.view.PinggubaojiaView;


/**
 * 评估报价
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface PinggubaojiaDao extends BaseMapper<PinggubaojiaEntity> {
	
	List<PinggubaojiaVO> selectListVO(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
	
	PinggubaojiaVO selectVO(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
	
	List<PinggubaojiaView> selectListView(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);

	List<PinggubaojiaView> selectListView(Pagination page,@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
	
	PinggubaojiaView selectView(@Param("ew") Wrapper<PinggubaojiaEntity> wrapper);
	
}
