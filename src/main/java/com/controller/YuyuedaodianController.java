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

import com.entity.YuyuedaodianEntity;
import com.entity.view.YuyuedaodianView;

import com.service.YuyuedaodianService;
import com.service.TokenService;
import com.utils.PageUtils;
import com.utils.R;
import com.utils.MD5Util;
import com.utils.MPUtil;
import com.utils.CommonUtil;


/**
 * 预约到店
 * 后端接口
 * @author 
 * @email 
 * @date 2021-03-09 14:36:01
 */
@RestController
@RequestMapping("/yuyuedaodian")
public class YuyuedaodianController {
    @Autowired
    private YuyuedaodianService yuyuedaodianService;
    


    /**
     * 后端列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,YuyuedaodianEntity yuyuedaodian, HttpServletRequest request){

		String tableName = request.getSession().getAttribute("tableName").toString();
		if(tableName.equals("yonghu")) {
			yuyuedaodian.setYonghuming((String)request.getSession().getAttribute("username"));
		}
        EntityWrapper<YuyuedaodianEntity> ew = new EntityWrapper<YuyuedaodianEntity>();
    	PageUtils page = yuyuedaodianService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, yuyuedaodian), params), params));
		request.setAttribute("data", page);
        return R.ok().put("data", page);
    }
    
    /**
     * 前端列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,YuyuedaodianEntity yuyuedaodian, HttpServletRequest request){
        EntityWrapper<YuyuedaodianEntity> ew = new EntityWrapper<YuyuedaodianEntity>();
    	PageUtils page = yuyuedaodianService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, yuyuedaodian), params), params));
		request.setAttribute("data", page);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( YuyuedaodianEntity yuyuedaodian){
       	EntityWrapper<YuyuedaodianEntity> ew = new EntityWrapper<YuyuedaodianEntity>();
      	ew.allEq(MPUtil.allEQMapPre( yuyuedaodian, "yuyuedaodian")); 
        return R.ok().put("data", yuyuedaodianService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(YuyuedaodianEntity yuyuedaodian){
        EntityWrapper< YuyuedaodianEntity> ew = new EntityWrapper< YuyuedaodianEntity>();
 		ew.allEq(MPUtil.allEQMapPre( yuyuedaodian, "yuyuedaodian")); 
		YuyuedaodianView yuyuedaodianView =  yuyuedaodianService.selectView(ew);
		return R.ok("查询预约到店成功").put("data", yuyuedaodianView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        YuyuedaodianEntity yuyuedaodian = yuyuedaodianService.selectById(id);
        return R.ok().put("data", yuyuedaodian);
    }

    /**
     * 前端详情
     */
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        YuyuedaodianEntity yuyuedaodian = yuyuedaodianService.selectById(id);
        return R.ok().put("data", yuyuedaodian);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody YuyuedaodianEntity yuyuedaodian, HttpServletRequest request){
    	yuyuedaodian.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(yuyuedaodian);

        yuyuedaodianService.insert(yuyuedaodian);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @RequestMapping("/add")
    public R add(@RequestBody YuyuedaodianEntity yuyuedaodian, HttpServletRequest request){
    	yuyuedaodian.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(yuyuedaodian);

        yuyuedaodianService.insert(yuyuedaodian);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody YuyuedaodianEntity yuyuedaodian, HttpServletRequest request){
        //ValidatorUtils.validateEntity(yuyuedaodian);
        yuyuedaodianService.updateById(yuyuedaodian);//全部更新
        return R.ok();
    }
    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        yuyuedaodianService.deleteBatchIds(Arrays.asList(ids));
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
		
		Wrapper<YuyuedaodianEntity> wrapper = new EntityWrapper<YuyuedaodianEntity>();
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

		int count = yuyuedaodianService.selectCount(wrapper);
		return R.ok().put("count", count);
	}
	
	


}
