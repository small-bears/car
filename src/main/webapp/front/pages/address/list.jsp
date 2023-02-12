<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!-- 收货地址 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>收货地址</title>
		<link rel="stylesheet" href="../../layui/css/layui.css">
		<!-- 样式 -->
		<link rel="stylesheet" href="../../css/style.css" />
		<!-- 主题（主要颜色设置） -->
		<link rel="stylesheet" href="../../css/theme.css" />
		<!-- 通用的css -->
		<link rel="stylesheet" href="../../css/common.css" />
	</head>
	<body style="background: #EEEEEE;">

		<div id="app">
			<!-- 轮播图 -->
			<div class="layui-carousel" id="swiper">
				<div carousel-item id="swiper-item">
					<div v-for="(item,index) in swiperList" v-bind:key="index">
						<img class="swiper-item" :src="item.img">
					</div>
				</div>
			</div>
			<!-- 轮播图 -->

			<!-- 标题 -->
			<h2 style="margin-top: 20px;" class="index-title">USER ADDRESS</h2>
			<div class="line-container">
				<p class="line" style="background: #EEEEEE;"> 收货地址 </p>
			</div>
			<!-- 标题 -->

			<div class="center-container">
				<!-- 个人中心菜单 config.js-->
				<div class="left-container">
					<ul class="layui-nav layui-nav-tree">
						<li v-for="(item,index) in centerMenu" v-bind:key="index" class="layui-nav-item" :class="item.url=='../address/list.jsp'?'layui-this':''">
							<a :href="'javascript:jump(\''+item.url+'\')'">{{item.name}}</a>
						</li>
					</ul>
				</div>
				<!-- 个人中心菜单 -->
				<div class="right-container" style="padding-top: 0;">
					<div class="btn-container" style="margin-bottom: 0;">
						<button id="btn-add" type="button" class="layui-btn layui-btn-lg btn-theme">
							<i class="layui-icon">&#xe654;</i> 添加新地址
						</button>
					</div>
					<table class="layui-table" lay-skin="nob">
						<thead>
							<tr>
								<th>联系人</th>
								<th>手机号码</th>
								<th>地址</th>
								<th>默认</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in dataList" v-bind:key="index">
								<td style="width: 80px;">{{item.name}}</td>
								<td style="width: 100px;">{{item.phone}}</td>
								<td>{{item.address}}</td>
								<td style="width: 50px;">{{item.isdefault}}</td>
								<td style="width: 150px;">
									<button @click="updateClick(item.id)" type="button" class="layui-btn layui-btn-radius layui-btn-sm layui-btn-warm">
										<i class="layui-icon">&#xe642;</i> 修改
									</button>
									<button @click="deleteClick(item.id)" type="button" class="layui-btn layui-btn-radius layui-btn-sm btn-theme">
										<i class="layui-icon">&#xe640;</i> 删除
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="pager" id="pager"></div>
				</div>
			</div>
		</div>

		<!-- layui -->
		<script src="../../layui/layui.js"></script>
		<!-- vue -->
		<script src="../../js/vue.js"></script>
		<!-- 组件配置信息 -->
		<script src="../../js/config.js"></script>
		<!-- 扩展插件配置信息 -->
		<script src="../../modules/config.js"></script>
		<!-- 工具方法 -->
		<script src="../../js/utils.js"></script>
		<!-- 校验格式工具类 -->
		<script src="../../js/validate.js"></script>

		<script>
			var vue = new Vue({
				el: '#app',
				data: {
					// 轮播图
					swiperList: [{
						img: '../../img/banner.jpg'
					}],
					dataList: [],
					centerMenu: centerMenu
				},
				methods: {
					jump(url) {
						jump(url)
					},
					deleteClick(id) {
						layui.layer.confirm('是否确认删除？', {
							btn: ['删除', '取消'] //按钮
						}, function() {
							layui.http.requestJson(`address/delete`, 'post', [id], function(res) {
								layer.msg('删除成功', {
									time: 2000,
									icon: 6
								}, function(res) {
									window.location.reload();
								});
							})
						});
					},
					updateClick(id) {
						window.location.href = './update.jsp?id=' + id;
					}
				}
			})

			layui.use(['layer', 'element', 'carousel', 'http', 'jquery', 'form', 'laypage'], function() {
				var layer = layui.layer;
				var element = layui.element;
				var carousel = layui.carousel;
				var http = layui.http;
				var jquery = layui.jquery;
				var laypage = layui.laypage;
				var form = layui.form;

				var limit = 10;

				// 获取轮播图 数据
				http.request('config/list', 'get', {
					page: 1,
					limit: 5
				}, function(res) {
					if (res.data.list.length > 0) {
						var swiperItemHtml = '';
						for (let item of res.data.list) {
							if (item.name.indexOf('picture') >= 0 && item.value && item.value != "" && item.value != null) {
								swiperItemHtml +=
									'<div>' +
									'<img class="swiper-item" src="' + item.value + '">' +
									'</div>';
							}
						}
						jquery('#swiper-item').html(swiperItemHtml);
						// 轮播图
						carousel.render({
							elem: '#swiper',
							width: swiper.width,height:swiper.height,
							arrow: swiper.arrow,
							anim: swiper.anim,
							interval: swiper.interval,
							indicator: "none"
						});
					}
				});

				// 获取列表数据
				http.request('address/list', 'get', {
					page: 1,
					limit: limit,
					userid: localStorage.getItem('userid')
				}, function(res) {
					vue.dataList = res.data.list
					// 分页
					laypage.render({
						elem: 'pager',
						count: res.data.total,
						limit: limit,
						jump: function(obj, first) {
							//首次不执行
							if (!first) {
								http.request('address/list', 'get', {
									page: obj.curr,
									limit: obj.limit,
									userid: localStorage.getItem('userid')
								}, function(res) {
									vue.dataList = res.data.list
								})
							}
						}
					});
				})

				// 添加地址
				jquery('#btn-add').click(function(e) {
					window.location.href = './add.jsp';
				});

			});
		</script>
	</body>
</html>
