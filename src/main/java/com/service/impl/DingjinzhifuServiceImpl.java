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


import com.dao.DingjinzhifuDao;
import com.entity.DingjinzhifuEntity;
import com.service.DingjinzhifuService;
import com.entity.vo.DingjinzhifuVO;
import com.entity.view.DingjinzhifuView;

@Service("dingjinzhifuService")
public class DingjinzhifuServiceImpl extends ServiceImpl<DingjinzhifuDao, DingjinzhifuEntity> implements DingjinzhifuService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<DingjinzhifuEntity> page = this.selectPage(
                new Query<DingjinzhifuEntity>(params).getPage(),
                new EntityWrapper<DingjinzhifuEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<DingjinzhifuEntity> wrapper) {
		  Page<DingjinzhifuView> page =new Query<DingjinzhifuView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<DingjinzhifuVO> selectListVO(Wrapper<DingjinzhifuEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public DingjinzhifuVO selectVO(Wrapper<DingjinzhifuEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<DingjinzhifuView> selectListView(Wrapper<DingjinzhifuEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public DingjinzhifuView selectView(Wrapper<DingjinzhifuEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
