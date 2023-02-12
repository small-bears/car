<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!-- 论坛详情 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>论坛详情</title>
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
			<h2 class="index-title">FORUM / INFORMATION</h2>
			<div class="line-container">
				<p class="line"> 论坛信息 </p>
			</div>
			<!-- 标题 -->

			<!-- banner -->
			<div class="banner"></div>
			<!-- banner -->

			<div class="forum-container">
				<h1 class="title">{{detail.title}}</h1>
				<div class="auth-container">
					发布人：{{detail.username}} 时间：{{detail.addtime}}
				</div>
				<div class="content" v-html="detail.content">
				</div>

				<div class="bottom-container">
					<div class="title">
						评论列表
					</div>
					<div id="btn-add-win" class="btn">
						点击评论
					</div>
				</div>

				<div class="message-list">
					<div class="message-item" v-for="(item,index) in dataList" v-bind:key="index">
						<div class="username-container">
							<img class="avator" src="../../img/avator.png">
							<span class="username">用户：{{item.username}}</span>
						</div>
						<div class="content">
							<span class="message">
								{{item.content}}
							</span>
						</div>
						<!-- <div class="replay">
							<span class="label">回复：</span>
							<span class="message">
								水资源污染已经严重影响到了我们的身体健康。有研究表明，水资源的污染会造成急性和慢性中毒、诱发致癌、发生以水为媒体的多种传染病等。
							</span>
						</div> -->
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
					detail: {},
					dataList: []
				},
				methods: {
					jump(url) {
						jump(url)
					}
				}
			})

			layui.use(['layer', 'element', 'carousel', 'laypage', 'http', 'jquery'], function() {
				var layer = layui.layer;
				var element = layui.element;
				var carousel = layui.carousel;
				var laypage = layui.laypage;
				var http = layui.http;
				var jquery = layui.jquery;

				var id = http.getParam('id');

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

				// 详情信息
				http.request('forum/list/' + id, 'get', {}, function(res) {
					vue.detail = res.data
					vue.dataList = res.data.childs
				});

				// 添加评论
				jquery('#btn-add-win').click(function(e) {
					layer.open({
						type: 2,
						title: '添加评论',
						area: ['600px', '300px'],
						content: './add-comment.jsp?pid=' + vue.detail.id
					});
				})

			});
		</script>
	</body>
</html>
