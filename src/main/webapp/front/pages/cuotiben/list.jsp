<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!doctype html>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>boo02</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" type="image/x-icon" href="../../assets/img/favicon.ico">
		<!-- Place favicon.ico in the root directory -->

		<!-- all css here -->
		<!-- bootstrap v3.3.6 css -->
		<link rel="stylesheet" href="../../assets/css/original/bootstrap.min.css">
		<!-- animate css -->
		<link rel="stylesheet" href="../../assets/css/original/animate.css">
		<!-- jquery-ui.min css -->
		<link rel="stylesheet" href="../../assets/css/original/jquery-ui.min.css">
		<!-- meanmenu css -->
		<link rel="stylesheet" href="../../assets/css/original/meanmenu.min.css">
		<!-- owl.carousel css -->
		<link rel="stylesheet" href="../../assets/css/original/owl.carousel.css">
		<!-- font-awesome css -->
		<link rel="stylesheet" href="../../assets/css/original/font-awesome.min.css">
		<!-- style css -->
		<link rel="stylesheet" href="../../assets/css/original/style.css">
		<!-- responsive css -->
		<link rel="stylesheet" href="../../assets/css/original/responsive.css">
		<!-- pagechange css -->
		<link rel="stylesheet" type="text/css" href="../../assets/css/page/page_common.css" />
		<!-- modernizr js -->
		<script src="../../assets/js/relys/modernizr-2.8.3.min.js"></script>
		<style type="text/css">
			.product-thumbnail img {
				width: 130px;
				height: 130px;
				object-fit: cover;
			}

			.product-add-to-cart button {
				padding: 0 30px;
				line-height: 40px;
				background-color: #252525;
				text-align: center;
				border: 0;
				color: #fff;
			}

			.product-add-to-cart button:first-of-type {
				margin-bottom: 10px;
			}

			.product-add-to-cart button:last-of-type {
				margin-bottom: 0px;
			}

			.product-add-to-cart button:hover {
				background-color: #fe4847;
			}

			.product-name,
			.product-address {
				max-width: 125px;
			}

			.order-tab {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: center;
				background-color: #222;
			}

			.order-tab li {
				background-color: #222;
				color: #fff;
				font-size: 18px;
				line-height: 50px;
				width: 100px;
				text-align: center;
				cursor: default;
			}

			.order-tab li:hover {
				color: #fe4847;
			}

			.order-tab li.active {
				color: #FE4847;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<!-- page-title-area start -->
			<div class="page-title-area">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="title-heading text-center">
								<h1>错题本</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- page-title-area end -->
			<div class="wishlist-area" style="padding-bottom: 0;">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="wishlist-content">
								<div class="wishlist-table table-responsive">

									<table>
										<thead>
											<tr>
												<!-- <th class="product-name"><span class="nobr">用户id</span></th> -->
												<th class="product-name"><span class="nobr">试卷名称</span></th>
												<th class="product-name"><span class="nobr">试题</span></th>
												<th class="product-name"><span class="nobr">分值</span></th>
												<th class="product-name"><span class="nobr">正确答案</span></th>
												<th class="product-name"><span class="nobr">考生答案</span></th>
												<th class="product-price"><span class="nobr"> 考试得分</span></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list" :key="item.id">
												<!-- <td class="product-name"><span class="amount">{{item.userid}}</span></td> -->
												<td class="product-name"><span class="amount">{{item.papername}}</span></td>
												<td class="product-name"><span class="amount">{{item.questionname}}</span></td>
												<td class="product-name"><span class="amount">{{item.score}}</span></td>
												<td class="product-name"><span class="amount">{{item.answer}}</span></td>
												<td class="product-name"><span class="amount">{{item.myanswer}}</span></td>
												<td class="product-price"><span class="amount">{{item.myscore}}分</span></td>
											</tr>
										</tbody>
									</table>

									<div style="display: flex;width: 100%;justify-content: center;margin-top: 50px;">
										<div id="pagechange"></div>
									</div>
									<div class="clear"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- shop-area end -->
			</div>
			<!-- jquery latest version -->
			<script src="../../assets/js/relys/jquery-1.12.0.min.js"></script>
			<!-- pagechange js -->
			<script src="../../assets/js/page/page_common.js"></script>
			<!-- vue js -->
			<script src="../../assets/js/api/api.js"></script>
			<script src="../../assets/js/api/tplist.js"></script>
			<script src="../../assets/js/vue.min.js"></script>
			<script src="../../assets/js/relys/utils.js"></script>
			<script type="text/javascript">
				// 初始化 分页
				var page_s1 = createPage('#pagechange');
				var app = new Vue({
					el: "#app",
					data: {
						group: false,
						first: true,
						list: [],
						page: {
							page: 1,
							limit: 16,
							total: 0
						}
					},
					methods: {
						onExamTap(item) {
							window.location.href = `./detail.jsp?paperid=${item.paperid}&userid=${item.userid}`;
						},
						onPageTap(url) {
							window.location.href = url;
						},
						getList() {
							return new Promise((resolve) => {
								http('examrecord/page', "get", {
									page: this.page.page,
									limit: this.page.limit,
									sort: "id",
									myscore: 0
								}, (res) => {
									if (res.code == 0) {
										this.$nextTick(() => {
											this.list = res.data.list
											this.page.total = res.data.total
											var that = this
											// 设置分页
											setPage(page_s1, {
												pageTotal: that.page.total, // 数据总条数   
												pageSize: that.page.limit, // 每页显示条数
												pageCurrent: that.page.page, //  当前页
												maxBtnNum: 5, // 最多按钮个数  （最少5个）
												change: function(e) { // 页数变化回调函数（返回当前页码）
													$('#pagechange').html(e)
													that.page.page = e
													that.getList()
												},
											})
											resolve(res.data)
										})
									}
								})
							})
						},
					},
					async created() {
						this.getList()
					}
				})
			</script>

			<!-- all js here -->
			<!-- bootstrap js -->
			<script src="../../assets/js/relys/bootstrap.min.js"></script>
			<!-- owl.carousel js -->
			<script src="../../assets/js/relys/owl.carousel.min.js"></script>
			<!-- meanmenu js -->
			<script src="../../assets/js/relys/jquery.meanmenu.js"></script>
			<!-- jquery-ui js -->
			<script src="../../assets/js/relys/jquery-ui.min.js"></script>
			<!-- wow js -->
			<script src="../../assets/js/relys/wow.min.js"></script>
			<!-- plugins js -->
			<script src="../../assets/js/relys/plugins.js"></script>
			<!-- main js -->
			<script src="../../assets/js/relys/main.js"></script>
	</body>
</html>
