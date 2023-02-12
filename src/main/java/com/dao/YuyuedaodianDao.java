package com.dao;

import com.entity.YuyuedaodianEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.YuyuedaodianVO;
import com.entity.view.YuyuedaodianView;


/**
 * 预约到店
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface YuyuedaodianDao extends BaseMapper<YuyuedaodianEntity> {
	
	List<YuyuedaodianVO> selectListVO(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
	
	YuyuedaodianVO selectVO(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
	
	List<YuyuedaodianView> selectListView(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);

	List<YuyuedaodianView> selectListView(Pagination page,@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
	
	YuyuedaodianView selectView(@Param("ew") Wrapper<YuyuedaodianEntity> wrapper);
	
}
