<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<title>注册</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<!-- Le styles -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/assets2/js/jquery.min.js"></script>

<!--  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/assets2/css/style.css"> -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/assets2/css/loader-style.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/assets2/css/bootstrap.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/assets2/css/signin.css">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
<!-- Fav and touch icons -->
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/resources/assets2/ico/minus.png">
</head>

<style>
	.error{
		color:red;
	}
	
	html {
		width: 100%;
		height: 100%;
	}
	body {
				background-image: url(http://codegen.caihongy.cn/20210307/d09089cb94194cdfb0a53c2edeb87136.jpg) !important;
				background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden !important;
		width: 100%;
		height: 100%;
	}
	.container {
		padding: 0;
		margin: 0;
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	
	#login-wrapper {
		display: flex;
		flex-direction: column;
		position: inherit;
		height: auto;
		width: 400px;
		margin: 0;
		padding: 0 0 20px 0;
		border-radius: 40px 50px 20px 20px;
		border-width: 0;
		border-style: solid;
		border-color: rgba(0,0,0,.3);
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0 0 0px 0rgba(30, 144, 255, .8);
	}
	
	#login-wrapper h1 {
				line-height: 60px;
		width: 100%;
		color: #fff;
		font-size: 20px;
		margin: 0 0 10px 0;
		padding: 0 10px;
		border-radius: 20px 50px 20px 50px;
		border-width: 0px 0px 5px 0px;
		border-style: solid;
		border-color: rgba(0,0,0,.3);
		background-color: rgba(21, 168, 72, 1);
		box-shadow: 0 0 6px rgba(30, 144, 255, 0);
		text-align: center;
	}
	
	#registerForm .form-group-l-r {
		display: flex;
		flex-wrap: wrap;
	}
	
	#registerForm .form-group {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		height: auto;
		width: 80%;
		margin: 0 auto;
		padding: 0;
		border-radius: 0;
		border-width: 0;
		border-style: solid;
		border-color: rgba(0,0,0,1);
		background-color: rgba(0,0,0,0);
		box-shadow: 0 0 6px rgba(255,0,0,0);
	}
	
	#registerForm .form-group .label {
				display:none;
				width: 72px;
		line-height: 44px;
		margin: 0;
		color: #1e90ff;
		font-size: 16px;
		padding: 0;
		border-radius: 0;
		border-width: 0;
		border-style: solid;
		border-color: rgba(0,0,0,0);
		background-color: transparent;
		box-shadow: 0 0 6px rgba(255,0,0,0);
		text-align: left;
	}
	
	#registerForm .form-group .form-control-i {
		width: 100%;
		height: 44px;
		margin: 10px 0 0 0;
		color: rgba(28, 28, 28, 1);
		font-size: 14px;
		padding: 0 10px;
		border-radius: 8px;
		border-width: 0;
		border-style: solid;
		border-color: #ccc;
		background-color: rgba(255, 255, 255, .8);
		box-shadow: 0 0 6px #1C1C1C;
		text-align: left;
	}
	
	#registerForm .form-group .form-control-i:focus {
	    outline: 0 none;
	}
	
	#registerForm button.pull-right {
		outline: none;
		width: 40%;
		height: 44px;
		margin: 20px auto 0;
		color: #fff;
		font-size: 14px;
		padding: 0 10px;
		border-radius: 52px 52px 24px 24px;
		border-width: 0;
		border-style: solid;
		border-color: #ccc;
		background-color: rgba(255,0,0,.8);
		box-shadow: 0 0 6px rgba(30, 144, 255, .5);
	}
	
</style>

<body>
	<!-- Preloader -->
	<div id="preloader">
		<div id="status">&nbsp;</div>
	</div>

	<div class="container">

		<div class="" id="login-wrapper">
			
			<!-- <div class="row">
				<div class="col-md-4 col-md-offset-4">
					<div id="logo-login">
						
					</div>
				</div>
			</div> -->
			
			<h1>注册</h1>
			<form id="registerForm" action="" method="post">
								<div class="form-group-l-r">
					<button id="submitBtn" class="btn btn btn-primary pull-right" type="button">注 册</button>
				</div>
			</form>
			
			<!-- <div class="row">
				<div class="col-md-4 col-md-offset-4">
					<div class="account-box">
						

						<div class="row-block">
							<div class="row"></div>
						</div>
					</div>
				</div>
			</div> -->
		</div>

		<p>&nbsp;</p>


	</div>

	<!--  END OF PAPER WRAP -->

	<!-- MAIN EFFECT -->
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets2/js/preloader.js"></script>-->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/assets2/js/bootstrap.js"></script>
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets2/js/app.js"></script>-->
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets2/js/load.js"></script>-->
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets2/js/main.js"></script>-->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/jquery.form.js"></script>

	<!--<script src="http://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script> -->
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets2/js/map/gmap3.js"></script> -->
	<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/resources/js/validate/jquery.validate.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/resources/js/validate/messages_zh.js"></script>
	<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/resources/js/validate/card.js"></script>
	<script type="text/javascript">
		
	<%@ include file="../../utils/menu.jsp"%>
		
	<%@ include file="../../utils/baseUrl.jsp"%>

		// 表单校验
		function validform() {
			return $("#registerForm").validate({ 
				rules: {
																													mima: {
															required: true,
														},
																								xingming: {
															required: true,
														},
																								touxiang: {
														},
																								xingbie: {
														},
																								lianxifangshi: {
															isPhone: true,
														},
																								youxiang: {
															email: true,
														},
															},
				messages: {
																													mima: {
															required: "密码不能为空",
														},
																								xingming: {
															required: "姓名不能为空",
														},
																								touxiang: {
														},
																								xingbie: {
														},
																								lianxifangshi: {
														},
																								youxiang: {
															email: "请输入正确格式的邮箱",
														},
															}
			}).form();
		}
		// 添加表单校验方法
		function addValidation(){
			jQuery.validator.addMethod("isPhone", function(value, element) {
					var length = value.length;
					var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
					return this.optional(element) || (length == 11 && mobile.test(value));
			}, "请填写正确的手机号码");
			jQuery.validator.addMethod("isIdCardNo", function(value, element) {
				return this.optional(element) || value.length == 18;
			}, "请正确输入您的身份证号码");
			jQuery.validator.addMethod("isTel", function(value, element) {
		          var length = value.length;
		          var phone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
		          return this.optional(element) || (phone.test(value));
		         }, "请填写正确的固定电话");//可以自定义默认提示信息
		}

		// 表单提交
		function submit() {
			if(validform() ==true){
				let data = {};
				let value = $('#registerForm').serializeArray();
				$.each(value, function (index, item) { 
							data[item.name] = item.value;
						});
				let json = JSON.stringify(data);
				//console.log('json : ',json);
				$.ajax({ 
					type: "POST",
					url: baseUrl + "yonghu/register",
					contentType: "application/json",
					data:json,
					beforeSend: function(xhr) {xhr.setRequestHeader("token", window.sessionStorage.getItem('token'));},
					success: function(res){    
						if(res.code == 0){
						alert("注册成功!");
						window.location.href="${pageContext.request.contextPath}/jsp/login.jsp";
						}else if(res.code == 401){
							<%@ include file="../../static/toLogin.jsp"%> 	
						}else{
							alert(res.msg)
						}
					},
				});      
			}else{
				alert("表单未填完整或有错误");
			}
		}    

		function ready() {
			addValidation();
			//注册表单验证
		    // $(validform());
			$('#submitBtn').on('click', function(e) {
				e.preventDefault();
				//console.log("点击了...提交按钮");
				submit();
			});
		}
		document.addEventListener("DOMContentLoaded", ready);
	</script>

</body>

</html>
