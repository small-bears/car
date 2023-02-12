<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!-- 在线留言 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>在线留言</title>
		<link rel="stylesheet" href="../../layui/css/layui.css">
		<!-- 样式 -->
		<link rel="stylesheet" href="../../css/style.css" />
		<!-- 主题（主要颜色设置） -->
		<link rel="stylesheet" href="../../css/theme.css" />
		<!-- 通用的css -->
		<link rel="stylesheet" href="../../css/common.css" />
	</head>
	<body>

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
			<h2 class="index-title">MESSAGES / ADVICE</h2>
			<div class="line-container">
				<p class="line"> 留言反馈 </p>
			</div>
			<!-- 标题 -->

			<!-- banner -->
			<div class="banner"></div>
			<!-- banner -->

			<div class="message-container">
				<form class="layui-form message-form">
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">留言</label>
						<div class="layui-input-block">
							<textarea name="content" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn btn-submit" lay-submit lay-filter="*">立即提交</button>
							<button type="reset" class="layui-btn layui-btn-primary">重置</button>
						</div>
					</div>
				</form>
				<div class="message-list">
					<div class="message-item" v-for="(item,index) in dataList" v-bind:key="index" >
						<div class="username-container">
							<img class="avator" src="../../img/avator.png">
							<span class="username">用户：{{item.username}}</span>
						</div>
						<div class="content">
							<span class="message">
								{{item.content}}
							</span>
						</div>
						<div v-if="item.reply" class="replay">
							<span class="label">回复：</span>
							<span class="message">
								{{item.reply}}
							</span>
						</div>
					</div>
				</div>
				<div class="pager" id="pager"></div>
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

		<script>
			var vue = new Vue({
				el: '#app',
				data: {
					// 轮播图
					swiperList: [{
						img: '../../img/banner.jpg'
					}],
					dataList: []
				},
				filters: {
					newsDesc: function(val) {
						if (val) {
							if (val.length > 200) {
								return val.substring(0, 200).replace(/<[^>]*>/g).replace(/undefined/g, '');
							} else {
								return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
							}
						}
						return '';
					}
				},
				methods: {
					jump(url) {
						jump(url)
					}
				}
			})

			layui.use(['layer', 'element', 'carousel', 'laypage', 'http', 'jquery', 'form'], function() {
				var layer = layui.layer;
				var element = layui.element;
				var carousel = layui.carousel;
				var laypage = layui.laypage;
				var http = layui.http;
				var form = layui.form;
				var jquery = layui.jquery;

				var limit = 5;

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
							indicator: swiper.indicator
						});
					}
				});

				// 获取列表数据
				init();

				function init() {
					// 获取列表数据
					http.request('messages/list', 'get', {
						page: 1,
						limit: limit
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
									http.request('messages/list', 'get', {
										page: obj.curr,
										limit: obj.limit
									}, function(res) {
										vue.dataList = res.data.list
									})
								}
							}
						});
					})
				}

				// 提交数据
				form.on('submit(*)', function(data) {
					data = data.field;
					data.userid = localStorage.getItem('userid')
					data.username = localStorage.getItem('adminName')
					http.requestJson('messages/add', 'post', data, function(res) {
						layer.msg('留言成功', {
							time: 2000,
							icon: 6
						}, function() {
							window.location.reload();
						});
						return false
					});
					return false
				});

			});
		</script>
	</body>
</html>
