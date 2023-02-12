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


import com.dao.ErshouchefenleiDao;
import com.entity.ErshouchefenleiEntity;
import com.service.ErshouchefenleiService;
import com.entity.vo.ErshouchefenleiVO;
import com.entity.view.ErshouchefenleiView;

@Service("ershouchefenleiService")
public class ErshouchefenleiServiceImpl extends ServiceImpl<ErshouchefenleiDao, ErshouchefenleiEntity> implements ErshouchefenleiService {


    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<ErshouchefenleiEntity> page = this.selectPage(
                new Query<ErshouchefenleiEntity>(params).getPage(),
                new EntityWrapper<ErshouchefenleiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<ErshouchefenleiEntity> wrapper) {
		  Page<ErshouchefenleiView> page =new Query<ErshouchefenleiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<ErshouchefenleiVO> selectListVO(Wrapper<ErshouchefenleiEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public ErshouchefenleiVO selectVO(Wrapper<ErshouchefenleiEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<ErshouchefenleiView> selectListView(Wrapper<ErshouchefenleiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public ErshouchefenleiView selectView(Wrapper<ErshouchefenleiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

}
