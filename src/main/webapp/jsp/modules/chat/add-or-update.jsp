<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
<%@ include file="../../static/head.jsp"%>
<link
	href="http://www.bootcss.com/p/bootstrap-datetimepicker/bootstrap-datetimepicker/css/datetimepicker.css"
	rel="stylesheet">
<script type="text/javascript" charset="utf-8">
	window.UEDITOR_HOME_URL = "${pageContext.request.contextPath}/resources/ueditor/"; //UEDITOR_HOME_URL、config、all这三个顺序不能改变
</script>
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/resources/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/resources/ueditor/ueditor.all.min.js"></script>
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/resources/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<style>
.error {
	color: red;
}
</style>
<body>
	<!-- Pre Loader -->
	<div class="loading">
		<div class="spinner">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
	</div>
	<!--/Pre Loader -->
	<div class="wrapper">
		<!-- Page Content -->
		<div id="content">
			<!-- Top Navigation -->
			<%@ include file="../../static/topNav.jsp"%>
			<!-- Menu -->
			<div class="container menu-nav">
				<nav class="navbar navbar-expand-lg lochana-bg text-white">
					<button class="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent" aria-expanded="false"
						aria-label="Toggle navigation">
						<span class="ti-menu text-white"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<!-- <div class="z-navbar-nav-title">$template2.back.menu.title.text</div> -->
						<ul id="navUl" class="navbar-nav mr-auto">

						</ul>
					</div>
				</nav>
			</div>
			<!-- /Menu -->
			<!-- Breadcrumb -->
			<!-- Page Title -->
			<div class="container mt-0">
				<div class="row breadcrumb-bar">
					<div class="col-md-6">
						<h3 class="block-title">编辑客服聊天表</h3>
					</div>
					<div class="col-md-6">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a
								href="${pageContext.request.contextPath}/index.jsp"> <span
									class="ti-home"></span>
							</a></li>
							<li class="breadcrumb-item"><span>客服聊天表管理</span></li>
							<li class="breadcrumb-item active"><span>编辑客服聊天表</span></li>
						</ol>
					</div>
				</div>
			</div>
			<!-- /Page Title -->

			<!-- /Breadcrumb -->
			<!-- Main Content -->
			<div class="container">

				<div class="row">
					<!-- Widget Item -->
					<div class="col-md-12">
						<div class="widget-area-2 lochana-box-shadow">
							<h3 class="widget-title">客服聊天表信息</h3>
							<form id="addOrUpdateForm">
								<div class="form-row">
									<input id="updateId" name="id" type="hidden">
									<div class="form-group col-md-6">
										<label>用户id</label> <input id="userid" name="userid"
											class="form-control" placeholder="用户id">
									</div>

									<input type="hidden" id="isreply" name="isreply" value="0">
									
									<div class="form-group  col-md-12">
										<label>提问</label>
										<script id="askEditor" type="text/plain"
											style="width: 800px; height: 230px;"></script>
										<script type="text/javascript">
											//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
											//相见文档配置属于你自己的编译器
											var askUe = UE.getEditor(
													'askEditor', {
														toolbars : [ [ 'undo', //撤销
														'bold', //加粗
														'redo', //重做
														'underline', //下划线
														'horizontal', //分隔线
														'inserttitle', //插入标题
														'cleardoc', //清空文档
														'fontfamily', //字体
														'fontsize', //字号
														'paragraph', //段落格式
														'inserttable', //插入表格
														'justifyleft', //居左对齐
														'justifyright', //居右对齐
														'justifycenter', //居中对
														'justifyjustify', //两端对齐
														'forecolor', //字体颜色
														'fullscreen', //全屏
														'edittip ', //编辑提示
														'customstyle', //自定义标题
														] ]
													});
										</script>
										<input type="hidden" name="ask" id="ask-input">
									</div>
									<div class="form-group  col-md-12">
										<label>回复</label>
										<script id="replyEditor" type="text/plain"
											style="width: 800px; height: 230px;"></script>
										<script type="text/javascript">
											//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
											//相见文档配置属于你自己的编译器
											var replyUe = UE.getEditor(
													'replyEditor', {
														toolbars : [ [ 'undo', //撤销
														'bold', //加粗
														'redo', //重做
														'underline', //下划线
														'horizontal', //分隔线
														'inserttitle', //插入标题
														'cleardoc', //清空文档
														'fontfamily', //字体
														'fontsize', //字号
														'paragraph', //段落格式
														'inserttable', //插入表格
														'justifyleft', //居左对齐
														'justifyright', //居右对齐
														'justifycenter', //居中对
														'justifyjustify', //两端对齐
														'forecolor', //字体颜色
														'fullscreen', //全屏
														'edittip ', //编辑提示
														'customstyle', //自定义标题
														] ]
													});
										</script>
										<input type="hidden" name="reply" id="reply-input">
									</div>
									<div class="form-group col-md-6 mb-3">
										<button id="submitBtn" type="button"
											class="btn btn-primary btn-lg">提交</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<!-- /Widget Item -->
				</div>
			</div>
			<!-- /Main Content -->
		</div>
		<!-- /Page Content -->
	</div>
	<!-- Back to Top -->
	<a id="back-to-top" href="#" class="back-to-top"> <span
		class="ti-angle-up"></span>
	</a>
	<!-- /Back to Top -->
	<%@ include file="../../static/foot.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/vue.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/jquery.ui.widget.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/jquery.fileupload.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/jquery.form.js"></script>
	<script type="text/javascript" charset="utf-8"
		src="${pageContext.request.contextPath}/resources/js/validate/jquery.validate.min.js"></script>
	<script type="text/javascript" charset="utf-8"
		src="${pageContext.request.contextPath}/resources/js/validate/messages_zh.js"></script>
	<script type="text/javascript" charset="utf-8"
		src="${pageContext.request.contextPath}/resources/js/validate/card.js"></script>
	<script type="text/javascript" charset="utf-8"
		src="${pageContext.request.contextPath}/resources/js/datetimepicker/bootstrap-datetimepicker.min.js"></script>

	<script>
		
	<%@ include file="../../utils/menu.jsp"%>
		
	<%@ include file="../../static/setMenu.js"%>
		
	<%@ include file="../../utils/baseUrl.jsp"%>
		var tableName = "chat";
		var pageType = "add-or-update";
		var updateId = "";
		var ruleForm = {};

		// 表单提交
		function submit() {
			if (validform() == true) {
				let data = {};
				getContent();
				let value = $('#addOrUpdateForm').serializeArray();
				$.each(value, function(index, item) {
					data[item.name] = item.value;
				});
				let json = JSON.stringify(data);
				//console.log('json : ',json);
				var urlParam;
				var successMes = '';
				if (updateId != null && updateId != "null" && updateId != '') {
					urlParam = 'update';
					successMes = '修改成功';
				} else {

					urlParam = 'save';
					successMes = '添加成功';
				}
				$
						.ajax({
							type : "POST",
							url : baseUrl + "chat/" + urlParam,
							contentType : "application/json",
							data : json,
							beforeSend : function(xhr) {
								xhr.setRequestHeader("token",
										window.sessionStorage.getItem('token'));
							},
							success : function(res) {
								if (res.code == 0) {
									window.sessionStorage.removeItem('id');
									alert(successMes);
									console.log(window.sessionStorage
											.getItem('onlyme'))
									if (window.sessionStorage.getItem('onlyme') != null
											&& window.sessionStorage
													.getItem('onlyme') == "true") {
										window.sessionStorage
												.removeItem('onlyme');
										window.location.href = "${pageContext.request.contextPath}/index.jsp";
									} else {
										window.location.href = "list.jsp";
									}

								} else if (res.code == 401) {
	<%@ include file="../../static/toLogin.jsp"%>
		} else {
									alert(res.msg)
								}
							},
						});
			} else {
				alert("表单未填完整或有错误");
			}
		}

		// 填充富文本框
		function setContent() {
			if (ruleForm.ask != null && ruleForm.ask != 'null'
					&& ruleForm.ask != '') {
				var askMes = '' + ruleForm.ask;
				var askUeditor = UE.getEditor('askEditor');
				askUeditor.ready(function() {
					askUeditor.setContent(askMes);
					askUeditor.setDisabled('fullscreen');
				});
			}
			if (ruleForm.reply != null && ruleForm.reply != 'null'
					&& ruleForm.reply != '') {
				var replyMes = '' + ruleForm.reply;
				var replyUeditor = UE.getEditor('replyEditor');
				replyUeditor.ready(function() {
					replyUeditor.setContent(replyMes);
				});
			}
		}

		// 获取富文本框内容
		function getContent() {
			if (UE.getEditor('askEditor').hasContents()) {
				$('#ask-input').attr('value',
						UE.getEditor('askEditor').getPlainTxt());
			}
			if (UE.getEditor('replyEditor').hasContents()) {
				$('#reply-input').attr('value',
						UE.getEditor('replyEditor').getPlainTxt());
			}
		}

		// 表单校验
		function validform() {
			return $("#addOrUpdateForm").validate({
				rules : {},
				messages : {}
			}).form();
		}

		// 获取当前详情
		function getDetails() {
			var id = window.sessionStorage.getItem("id");
			if (id != null && id != "" && id != "null") {
				updateId = id;
				window.sessionStorage.removeItem('id');
				$.ajax({
					type : "GET",
					url : baseUrl + "chat/info/" + id,
					beforeSend : function(xhr) {
						xhr.setRequestHeader("token", window.sessionStorage
								.getItem('token'));
					},
					success : function(res) {
						if (res.code == 0) {
							ruleForm = res.data;
							// 数据填充
							dataBind();
							// 富文本框回显	
							setContent();
							//注册表单验证
							$(validform());
						} else if (res.code == 401) {
	<%@ include file="../../static/toLogin.jsp"%>
		} else {
							alert(res.msg);
						}
					},
				});
			} else {
				//注册表单验证
				$(validform());
			}
		}
		function dataBind() {
			$("#updateId").val(ruleForm.id);
			$("#ask-input").val(ruleForm.ask);
			$("#reply-input").val(ruleForm.reply);
			$("#userid").val(ruleForm.userid);
		}
		$(document).ready(
				function() {
					//设置右上角用户名
					$('.dropdown-menu h5').html(
					window.sessionStorage.getItem('username'))
					//设置项目名
					$('.sidebar-header h3 a').html(projectName)
					//设置导航栏菜单
					setMenu();
					getDetails();
	<%@ include file="../../static/myInfo.js"%>
		$('#submitBtn').on('click', function(e) {
						e.preventDefault();
						//console.log("点击了...提交按钮");
						submit();
					});
				});
		// 用户登出
	<%@ include file="../../static/logout.jsp"%>
		
	</script>
</body>

</html>
