package com.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.utils.ValidatorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.annotation.IgnoreAuth;

import com.entity.DingjinzhifuEntity;
import com.entity.view.DingjinzhifuView;

import com.service.DingjinzhifuService;
import com.service.TokenService;
import com.utils.PageUtils;
import com.utils.R;
import com.utils.MD5Util;
import com.utils.MPUtil;
import com.utils.CommonUtil;


/**
 * 定金支付
 * 后端接口
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@RestController
@RequestMapping("/dingjinzhifu")
public class DingjinzhifuController {
    @Autowired
    private DingjinzhifuService dingjinzhifuService;
    


    /**
     * 后端列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,DingjinzhifuEntity dingjinzhifu, HttpServletRequest request){

		String tableName = request.getSession().getAttribute("tableName").toString();
		if(tableName.equals("yonghu")) {
			dingjinzhifu.setYonghuming((String)request.getSession().getAttribute("username"));
		}
        EntityWrapper<DingjinzhifuEntity> ew = new EntityWrapper<DingjinzhifuEntity>();
    	PageUtils page = dingjinzhifuService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, dingjinzhifu), params), params));
		request.setAttribute("data", page);
        return R.ok().put("data", page);
    }
    
    /**
     * 前端列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,DingjinzhifuEntity dingjinzhifu, HttpServletRequest request){
        EntityWrapper<DingjinzhifuEntity> ew = new EntityWrapper<DingjinzhifuEntity>();
    	PageUtils page = dingjinzhifuService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, dingjinzhifu), params), params));
		request.setAttribute("data", page);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( DingjinzhifuEntity dingjinzhifu){
       	EntityWrapper<DingjinzhifuEntity> ew = new EntityWrapper<DingjinzhifuEntity>();
      	ew.allEq(MPUtil.allEQMapPre( dingjinzhifu, "dingjinzhifu")); 
        return R.ok().put("data", dingjinzhifuService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(DingjinzhifuEntity dingjinzhifu){
        EntityWrapper< DingjinzhifuEntity> ew = new EntityWrapper< DingjinzhifuEntity>();
 		ew.allEq(MPUtil.allEQMapPre( dingjinzhifu, "dingjinzhifu")); 
		DingjinzhifuView dingjinzhifuView =  dingjinzhifuService.selectView(ew);
		return R.ok("查询定金支付成功").put("data", dingjinzhifuView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        DingjinzhifuEntity dingjinzhifu = dingjinzhifuService.selectById(id);
        return R.ok().put("data", dingjinzhifu);
    }

    /**
     * 前端详情
     */
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        DingjinzhifuEntity dingjinzhifu = dingjinzhifuService.selectById(id);
        return R.ok().put("data", dingjinzhifu);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody DingjinzhifuEntity dingjinzhifu, HttpServletRequest request){
    	dingjinzhifu.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(dingjinzhifu);

        dingjinzhifuService.insert(dingjinzhifu);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @RequestMapping("/add")
    public R add(@RequestBody DingjinzhifuEntity dingjinzhifu, HttpServletRequest request){
    	dingjinzhifu.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(dingjinzhifu);

        dingjinzhifuService.insert(dingjinzhifu);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody DingjinzhifuEntity dingjinzhifu, HttpServletRequest request){
        //ValidatorUtils.validateEntity(dingjinzhifu);
        dingjinzhifuService.updateById(dingjinzhifu);//全部更新
        return R.ok();
    }
    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        dingjinzhifuService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }
    
    /**
     * 提醒接口
     */
	@RequestMapping("/remind/{columnName}/{type}")
	public R remindCount(@PathVariable("columnName") String columnName, HttpServletRequest request, 
						 @PathVariable("type") String type,@RequestParam Map<String, Object> map) {
		map.put("column", columnName);
		map.put("type", type);
		
		if(type.equals("2")) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			Date remindStartDate = null;
			Date remindEndDate = null;
			if(map.get("remindstart")!=null) {
				Integer remindStart = Integer.parseInt(map.get("remindstart").toString());
				c.setTime(new Date()); 
				c.add(Calendar.DAY_OF_MONTH,remindStart);
				remindStartDate = c.getTime();
				map.put("remindstart", sdf.format(remindStartDate));
			}
			if(map.get("remindend")!=null) {
				Integer remindEnd = Integer.parseInt(map.get("remindend").toString());
				c.setTime(new Date());
				c.add(Calendar.DAY_OF_MONTH,remindEnd);
				remindEndDate = c.getTime();
				map.put("remindend", sdf.format(remindEndDate));
			}
		}
		
		Wrapper<DingjinzhifuEntity> wrapper = new EntityWrapper<DingjinzhifuEntity>();
		if(map.get("remindstart")!=null) {
			wrapper.ge(columnName, map.get("remindstart"));
		}
		if(map.get("remindend")!=null) {
			wrapper.le(columnName, map.get("remindend"));
		}

		String tableName = request.getSession().getAttribute("tableName").toString();
		if(tableName.equals("yonghu")) {
			wrapper.eq("yonghuming", (String)request.getSession().getAttribute("username"));
		}

		int count = dingjinzhifuService.selectCount(wrapper);
		return R.ok().put("count", count);
	}
	
	


}
