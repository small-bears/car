package com.dao;

import com.entity.QichepingguEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.QichepingguVO;
import com.entity.view.QichepingguView;


/**
 * 汽车评估
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface QichepingguDao extends BaseMapper<QichepingguEntity> {
	
	List<QichepingguVO> selectListVO(@Param("ew") Wrapper<QichepingguEntity> wrapper);
	
	QichepingguVO selectVO(@Param("ew") Wrapper<QichepingguEntity> wrapper);
	
	List<QichepingguView> selectListView(@Param("ew") Wrapper<QichepingguEntity> wrapper);

	List<QichepingguView> selectListView(Pagination page,@Param("ew") Wrapper<QichepingguEntity> wrapper);
	
	QichepingguView selectView(@Param("ew") Wrapper<QichepingguEntity> wrapper);
	
}
