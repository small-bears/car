package com.dao;

import com.entity.ErshouchefenleiEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.ErshouchefenleiVO;
import com.entity.view.ErshouchefenleiView;


/**
 * 二手车分类
 * 
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
public interface ErshouchefenleiDao extends BaseMapper<ErshouchefenleiEntity> {
	
	List<ErshouchefenleiVO> selectListVO(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
	
	ErshouchefenleiVO selectVO(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
	
	List<ErshouchefenleiView> selectListView(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);

	List<ErshouchefenleiView> selectListView(Pagination page,@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
	
	ErshouchefenleiView selectView(@Param("ew") Wrapper<ErshouchefenleiEntity> wrapper);
	
}
