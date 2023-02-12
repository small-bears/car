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


import com.dao.ErshouchexinxiDao;
import com.entity.ErshouchexinxiEntity;
import com.service.ErshouchexinxiService;
import com.entity.vo.ErshouchexinxiVO;
import com.entity.view.ErshouchexinxiView;

@Service("ershouchexinxiService")
public class ErshouchexinxiServiceImpl extends ServiceImpl<ErshouchexinxiDao, ErshouchexinxiEntity> implements ErshouchexinxiService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<ErshouchexinxiEntity> page = this.selectPage(
                new Query<ErshouchexinxiEntity>(params).getPage(),
                new EntityWrapper<ErshouchexinxiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<ErshouchexinxiEntity> wrapper) {
		  Page<ErshouchexinxiView> page =new Query<ErshouchexinxiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<ErshouchexinxiVO> selectListVO(Wrapper<ErshouchexinxiEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public ErshouchexinxiVO selectVO(Wrapper<ErshouchexinxiEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<ErshouchexinxiView> selectListView(Wrapper<ErshouchexinxiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public ErshouchexinxiView selectView(Wrapper<ErshouchexinxiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
