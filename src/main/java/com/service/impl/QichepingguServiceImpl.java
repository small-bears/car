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


import com.dao.QichepingguDao;
import com.entity.QichepingguEntity;
import com.service.QichepingguService;
import com.entity.vo.QichepingguVO;
import com.entity.view.QichepingguView;

@Service("qichepingguService")
public class QichepingguServiceImpl extends ServiceImpl<QichepingguDao, QichepingguEntity> implements QichepingguService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<QichepingguEntity> page = this.selectPage(
                new Query<QichepingguEntity>(params).getPage(),
                new EntityWrapper<QichepingguEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<QichepingguEntity> wrapper) {
		  Page<QichepingguView> page =new Query<QichepingguView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<QichepingguVO> selectListVO(Wrapper<QichepingguEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public QichepingguVO selectVO(Wrapper<QichepingguEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<QichepingguView> selectListView(Wrapper<QichepingguEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public QichepingguView selectView(Wrapper<QichepingguEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
