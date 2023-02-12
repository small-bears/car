<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!-- 订单 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>订单</title>
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
			<h2 style="margin-top: 20px;" class="index-title">USER / ORDER</h2>
			<div class="line-container">
				<p class="line" style="background: #EEEEEE;"> 我的订单 </p>
			</div>
			<!-- 标题 -->

			<div class="center-container" style="width: 1024px;">
				<!-- 个人中心菜单 config.js-->
				<!-- <div class="left-container">
					<ul class="layui-nav layui-nav-tree">
						<li v-for="(item,index) in centerMenu" v-bind:key="index" class="layui-nav-item" :class="item.url=='../order/list.jsp'?'layui-this':''">
							<a :href="'javascript:jump(\''+item.url+'\')'">{{item.name}}</a>
						</li>
					</ul>
				</div> -->
				<!-- 个人中心菜单 -->
				<div class="right-container" style="padding-top: 0;">
					<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
						<ul class="layui-tab-title">
							<li @click="pageList('未支付')" class="layui-this">未支付</li>
							<li @click="pageList('已支付')">已支付</li>
							<li @click="pageList('已发货')">已发货</li>
							<li @click="pageList('已完成')">已完成</li>
							<li @click="pageList('已退款')">已退款</li>
							<li @click="pageList('已取消')">已取消</li>
						</ul>
						<div class="layui-tab-content">
							<table class="layui-table" lay-skin="nob">
								<thead>
									<tr>
										<th>订单编号</th>
										<th>商品</th>
										<th>价格</th>
										<th>数量</th>
										<th>总价</th>
										<th>地址</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) in dataList" v-bind:key="index">
										<td style="width: 50px;">
											{{item.orderid}}
										</td>
										<td style="display: flex;text-align: left;width: 250px;">
											<img :src="item.picture" style="width: 100px;height: 100px;object-fit: cover;">
											<div style="margin-left: 10px;margin-top: 10px;">
												{{item.goodname}}
											</div>
										</td>
										<td style="width: 100px;">{{item.price}} RMB</td>
										<td style="width: 50px;">
											{{item.buynumber}}
										</td>
										<td style="width: 100px;">{{item.price*item.buynumber}} RMB</td>
										<td style="width: 200px;">
											{{item.address}}
										</td>
										<td style="width: 100px;">
											<button v-if="item.status=='未支付'" @click="pay(item)" type="button" class="layui-btn layui-btn-sm layui-btn-radius btn-theme">
												<i class="layui-icon">&#xe65e;</i> 支付
											</button>
											<button v-if="item.status=='已支付'" @click="refund(item)" type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-warm">
												<i class="layui-icon">&#xe65e;</i> 退款
											</button>
											<button v-if="item.status=='已发货'" @click="confirm(item)" type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-bg-green">
												<i class="layui-icon">&#xe65e;</i> 确认收货
											</button>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="pager" id="pager"></div>
						</div>
					</div>
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
					centerMenu: centerMenu,
					status: '未支付',
					limit: 10,
					user: {}
				},
				methods: {
					jump(url) {
						jump(url)
					},
					pageList(status) {
						this.status = status;
						console.log(layui)
						// 获取列表数据
						layui.http.request('orders/list', 'get', {
							page: 1,
							limit: this.limit,
							userid: localStorage.getItem('userid'),
							status: vue.status
						}, function(res) {
							vue.dataList = res.data.list
							// 分页
							layui.laypage.render({
								elem: 'pager',
								count: res.data.total,
								limit: this.limit,
								jump: function(obj, first) {
									//首次不执行
									if (!first) {
										layui.http.request('orders/list', 'get', {
											page: obj.curr,
											limit: obj.limit,
											userid: localStorage.getItem('userid'),
											status: this.status
										}, function(res) {
											this.dataList = res.data.list
										})
									}
								}
							});
						})
					},
					// 支付
					pay(item) {
						// 获取商品详情信息
						layui.http.request(`${item.tablename}/info/${item.goodid}`, 'get', {}, (res) => {
							// 商品信息
							let data = res.data;
							// 用户当前用户信息
							let table = localStorage.getItem("userTable");
							layui.http.request(`${table}/session`, 'get', {}, function(data) {
								this.user = data.data;
								// 判断余额是否充足
								if (this.user.money < this.totalPrice) {
									layui.layer.msg('余额不足，请先充值', {
										time: 2000,
										icon: 5
									});
									return
								}
								// 如果该商品存在积分
								if (data.jifen) {
									this.user.jifen = Number(this.user.jifen) + Number(data.jifen * item.buynumber);
								}
								this.user.money = this.user.money - this.totalPrice;
								// 更新用户余额
								layui.http.requestJson(`${localStorage.getItem("userTable")}/update`, 'post', this.user, (res) => {
									item.status = '已支付'
									layui.http.requestJson(`orders/update`, 'post', item, (res) => {
										layui.layer.msg('支付成功', {
											time: 2000,
											icon: 6
										}, function() {
											window.location.reload();
										});
									});
								});
							});
						});
					},
					// 退款
					refund(item) {
						// 获取商品详情信息
						layui.http.request(`${item.tablename}/info/${item.goodid}`, 'get', {}, (res) => {
							// 商品信息
							let data = res.data;
							// 用户当前用户信息
							let table = localStorage.getItem("userTable");
							layui.http.request(`${table}/session`, 'get', {}, function(data) {
								this.user = data.data;
								// 如果该商品存在积分
								if (data.jifen) {
									this.user.jifen = Number(this.user.jifen) - Number(data.jifen * item.buynumber);
								}
								this.user.money = this.user.money + this.totalPrice;
								// 更新用户余额
								layui.http.requestJson(`${localStorage.getItem("userTable")}/update`, 'post', this.user, (res) => {
									item.status = '已退款'
									layui.http.requestJson(`orders/update`, 'post', item, (res) => {
										layui.layer.msg('退款成功', {
											time: 2000,
											icon: 6
										}, function() {
											window.location.reload();
										});
									});
								});
							});
						});
					},
					confirm(item){
						item.status = '已完成'
						layui.http.requestJson(`orders/update`, 'post', item, (res) => {
							layui.layer.msg('确认收货成功', {
								time: 2000,
								icon: 6
							}, function() {
								window.location.reload();
							});
						});
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
				http.request('orders/list', 'get', {
					page: 1,
					limit: limit,
					userid: localStorage.getItem('userid'),
					status: vue.status
				}, function(res) {
					vue.dataList = res.data.list
					// 分页
					laypage.render({
						elem: 'pager',
						count: res.data.total,
						limit: vue.limit,
						jump: function(obj, first) {
							//首次不执行
							if (!first) {
								http.request('orders/list', 'get', {
									page: obj.curr,
									limit: obj.limit,
									userid: localStorage.getItem('userid'),
									status: vue.status
								}, function(res) {
									vue.dataList = res.data.list
								})
							}
						}
					});
				})

			});
		</script>
	</body>
</html>
