<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="../../elementui/elementui.css" />
		<style>
			.chat-content {
			  margin-left: 80px;
			  padding-bottom: 60px;
			  width: 500px;
			  margin-bottom: 30px;
			  max-height: 300px;
			  height: 300px;
			  overflow-y: scroll;
			  border: 1px solid #eeeeee;
			}
			.left-content {
			  float: left;
			  margin-bottom: 10px;
			  padding: 10px;
			}
			.right-content {
			  float: right;
			  margin-bottom: 10px;
			  padding: 10px;
			  margin-top: 40px;
			}
			.clear-float {
			  clear: both;
			}
		</style>
	</head>
	<body style="overflow-y: hidden;overflow-x: hidden;">
		<div id="app">
			<el-form class="detail-form-content" ref="ruleForm" label-width="80px">
				<div class="chat-content">
					<div v-bind:key="item.id" v-for="item in dataList">
						<div v-if="item.ask" class="left-content">
							<el-alert class="text-content" :title="item.ask" :closable="false" type="success"></el-alert>
						</div>
						<div v-if="item.reply" class="right-content">
							<el-alert class="text-content" :title="item.reply" :closable="false" type="warning"></el-alert>
						</div>
						<div class="clear-float"></div>
					</div>
				</div>
				<div class="clear-float"></div>
				<el-form-item label="发布" prop="ask">
					<el-input v-model="ruleForm.ask" placeholder="发布" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">发布</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- layui -->
		<script src="../../layui/layui.js"></script>
		<!-- vue -->
		<script src="../../js/vue.js"></script>
		<!-- elementui -->
		<script src="../../elementui/elementui.js"></script>
		<!-- 组件配置信息 -->
		<script src="../../js/config.js"></script>
		<!-- 扩展插件配置信息 -->
		<script src="../../modules/config.js"></script>
		<!-- 工具方法 -->
		<script src="../../js/utils.js"></script>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data() {
					return {
						id: "",
						ruleForm: {},
						dataList: [],
						inter: null
					}
				},
				methods: {
					// 初始化
					init(id) {
						this.getList();
						this.id = id;
						var that = this;
						var inter = setInterval(function() {
							that.getList();
						}, 10000)
						this.inter = inter;
					},
					getList() {
						layui.http.request('chat/list', 'get', {
							userid: localStorage.getItem('userid'),
							sort: 'addtime',
							order: 'asc'
						}, (res) => {
							this.dataList = res.data.list;
						})
					},
					// 提交
					onSubmit() {
						if (!this.ruleForm.ask) {
							layer.msg('请输入内容', {
								time: 2000,
								icon: 5
							});
							return
						}
						layui.http.requestJson('chat/add', 'post', {
							userid: localStorage.getItem('userid'),
							ask: this.ruleForm.ask
						}, (res) => {
							this.getList();
						});
					}
				}
			})

			layui.use(['layer', 'element', 'http', 'jquery'], function() {
				var layer = layui.layer;
				var element = layui.element;
				var http = layui.http;
				var jquery = layui.jquery;
				app.init();
			});
		</script>
	</body>
</html>
