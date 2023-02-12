package com.dao;

import com.entity.ErshouchexinxiEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.ErshouchexinxiVO;
import com.entity.view.ErshouchexinxiView;


/**
 * 二手车信息
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface ErshouchexinxiDao extends BaseMapper<ErshouchexinxiEntity> {
	
	List<ErshouchexinxiVO> selectListVO(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
	
	ErshouchexinxiVO selectVO(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
	
	List<ErshouchexinxiView> selectListView(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);

	List<ErshouchexinxiView> selectListView(Pagination page,@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
	
	ErshouchexinxiView selectView(@Param("ew") Wrapper<ErshouchexinxiEntity> wrapper);
	
}
