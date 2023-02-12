package com.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.utils.PageUtils;
import com.utils.Query;


import com.dao.YuyuedaodianDao;
import com.entity.YuyuedaodianEntity;
import com.service.YuyuedaodianService;
import com.entity.vo.YuyuedaodianVO;
import com.entity.view.YuyuedaodianView;

@Service("yuyuedaodianService")
public class YuyuedaodianServiceImpl extends ServiceImpl<YuyuedaodianDao, YuyuedaodianEntity> implements YuyuedaodianService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<YuyuedaodianEntity> page = this.selectPage(
                new Query<YuyuedaodianEntity>(params).getPage(),
                new EntityWrapper<YuyuedaodianEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<YuyuedaodianEntity> wrapper) {
		  Page<YuyuedaodianView> page =new Query<YuyuedaodianView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<YuyuedaodianVO> selectListVO(Wrapper<YuyuedaodianEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public YuyuedaodianVO selectVO(Wrapper<YuyuedaodianEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<YuyuedaodianView> selectListView(Wrapper<YuyuedaodianEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public YuyuedaodianView selectView(Wrapper<YuyuedaodianEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
