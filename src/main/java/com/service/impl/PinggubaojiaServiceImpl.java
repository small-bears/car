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


import com.dao.PinggubaojiaDao;
import com.entity.PinggubaojiaEntity;
import com.service.PinggubaojiaService;
import com.entity.vo.PinggubaojiaVO;
import com.entity.view.PinggubaojiaView;

@Service("pinggubaojiaService")
public class PinggubaojiaServiceImpl extends ServiceImpl<PinggubaojiaDao, PinggubaojiaEntity> implements PinggubaojiaService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<PinggubaojiaEntity> page = this.selectPage(
                new Query<PinggubaojiaEntity>(params).getPage(),
                new EntityWrapper<PinggubaojiaEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<PinggubaojiaEntity> wrapper) {
		  Page<PinggubaojiaView> page =new Query<PinggubaojiaView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<PinggubaojiaVO> selectListVO(Wrapper<PinggubaojiaEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public PinggubaojiaVO selectVO(Wrapper<PinggubaojiaEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<PinggubaojiaView> selectListView(Wrapper<PinggubaojiaEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public PinggubaojiaView selectView(Wrapper<PinggubaojiaEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
