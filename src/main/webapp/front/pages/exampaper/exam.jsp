<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!doctype html>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>考试</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="../../elementui/elementui.css" />
		<style type="text/css">
			.container {
				border: 1px solid #eeeeee;
			}

			.tip-text {
				font-size: 24px;
				color: #f96332;
			}

			.top-content {
				display: flex;
				justify-content: space-between;
				padding: 10px;
				font-size: 18px;
				background: #409eff;
				color: #ffffff;
				border-radius: 20px;
			}

			.detail-content {
				padding: 20px;
				color: #333333;
			}

			.detail-content .item-content {
				padding: 20px;
			}
		</style>
	</head>
	<body>
		<div id="app" class="container">
			<div class="top-content">
				<div class="left-content">
					当前第
					<span class="tip-text">{{currentIndex+1}}</span> 道题。未答题目：
					<span class="tip-text">{{dataList.length - currentIndex-1}}</span> 道，总题目：
					<span class="tip-text">{{dataList.length}}</span> 道。
				</div>
				<div class="right-content">
					考试剩余时间：
					<span class="tip-text">{{SecondToDate}}</span>
				</div>
				<div class="right-content">
					<el-button type="danger" round @click="leaveTap">结束考试</el-button>
				</div>
			</div>
			<div class="detail-content" v-if="!isEndFlag">
				<div class="item-content">
					<span class="label">
						题目
						(
						<span v-if="ruleForm.type==0">单选题</span>
						<span v-if="ruleForm.type==1">多选题</span>
						<span v-if="ruleForm.type==2">判断题</span>
						<span v-if="ruleForm.type==3">填空题</span>
						)
						({{ruleForm.score}}分)：
					</span>
					<span class="content">{{ruleForm.questionname}}</span>
				</div>
				<div v-if="(ruleForm.type==0||ruleForm.type==2)&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">选择答案：</span>
					<span class="content">
						<el-select v-model="answer">
							<el-option :label="item.text" :value="item.code" v-for="(item,index) in options" v-bind:key="index"></el-option>
						</el-select>
					</span>
				</div>
				<div v-if="ruleForm.type==3&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">填写答案：</span>
					<span class="content">
						<el-input v-model="answer" style="width:300px" placeholder="填写答案" clearable></el-input>
					</span>
				</div>
				<div v-if="ruleForm.type==1&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">选择答案：</span>
					<span class="content">
						<el-select v-model="answer" multiple>
							<el-option :label="item.text" :value="item.code" v-for="(item,index) in options" v-bind:key="index"></el-option>
						</el-select>
					</span>
				</div>
				<div v-if="isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">填写答案：</span>
					<span class="content">{{answer}}</span>
				</div>
				<div v-if="isSubmitFlag" class="item-content" style="color:#888888">
					<span class="label" style="color:red;margin-right:20px">{{answer==this.ruleForm.answer?'正确':'错误'}}</span>
					<span class="label">解析：</span>
					<span class="content">{{ruleForm.analysis}}</span>
				</div>
				<div class="item-content" style="color:#888888">
					<el-button v-if="!isSubmitFlag" @click="submitTap" type="primary">提交答案</el-button>
					<el-button v-if="isSubmitFlag" @click="nextTap" type="success">下一题</el-button>
				</div>
			</div>
			<div class="detail-content" v-if="isEndFlag">
				<div class="item-content">
					<span class="label">
						考试成绩：
						<span style="font-size:24px;font-weight:blod;color:red">{{this.score}}</span>
					</span>
					<span class="content">分</span>
				</div>
				<div class="item-content" style="color:#888888">
					<el-button @click="finishTap" type="primary">结束考试</el-button>
				</div>
			</div>
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
						dataList: [],
						// 当前题目
						paper: {},
						// 当前答题下标
						currentIndex: 0,
						ruleForm: {},
						// 倒计时定时器
						inter: null,
						// 倒计时时间
						count: 0,
						// 选项
						options: null,
						// 用户选择答案
						answer: "",
						// 是否提交点击下一题
						isSubmitFlag: false,
						// 得分
						score: 0,
						user: {},
						// 考试是否结束
						isEndFlag: false
					};
				},
				computed: {
					SecondToDate: function() {
						var time = this.count;
						if (null != time && "" != time) {
							if (time > 60 && time < 60 * 60) {
								time =
									parseInt(time / 60.0) +
									"分钟" +
									parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
									"秒";
							} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
								time =
									parseInt(time / 3600.0) +
									"小时" +
									parseInt(
										(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
									) +
									"分钟" +
									parseInt(
										(parseFloat(
												(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
											) -
											parseInt(
												(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
											)) *
										60
									) +
									"秒";
							} else if (time >= 60 * 60 * 24) {
								time =
									parseInt(time / 3600.0 / 24) +
									"天" +
									parseInt(
										(parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) *
										24
									) +
									"小时" +
									parseInt(
										(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
									) +
									"分钟" +
									parseInt(
										(parseFloat(
												(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
											) -
											parseInt(
												(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
											)) *
										60
									) +
									"秒";
							} else {
								time = parseInt(time) + "秒";
							}
						}
						return time;
					}
				},
				destroyed: function() {
					window.clearInterval(this.inter);
				},
				mounted() {

				},
				methods: {
					init() {
						let _this = this;
						let id = layui.http.getParam("id");
						let table = localStorage.getItem("userTable");
						layui.http.request(`${table}/session`, 'get', {}, function(data) {
							_this.user = data.data;
						});
						// 获取 试题
						var params = {
							page: 1,
							limit: 999,
							sort: "sequence",
							paperid: id
						};
						layui.http.request(`examquestion/page`, 'get', params, function(data) {
							_this.dataList = data.data.list;
							_this.ruleForm = _this.dataList[_this.currentIndex];
							_this.options = JSON.parse(_this.ruleForm.options);
							_this.dataListLoading = false;
						});
						layui.http.request(`exampaper/info/${id}`, 'get', {}, function(data) {
							_this.paper = data.data;
							if (_this.paper.time) {
								_this.count = _this.paper.time;
								if (_this.count > 0) {
									_this.inter = window.setInterval(function() {
										_this.count = _this.count - 1;
										if (_this.count < 0) {
											window.clearInterval(_this.inter);
											_this.isEndFlag = true;
										}
									}, 1000);
								}
							}
						});
					},
					leaveTap() {
						this.$confirm(`确定离开考试?未答题目按0分计算`, "提示", {
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							type: "warning"
						}).then(() => {
							this.isEndFlag = true;
						});
					},
					finishTap() {
						window.history.back();
					},
					submitTap() {
						let myscore = 0;
						if (this.ruleForm.type == 1) {
							console.log(this.answer);
							this.answer = this.answer.join(",");
						}
						this.isSubmitFlag = true;
						if (this.answer == this.ruleForm.answer) {
							this.score = Number(this.score) + Number(this.ruleForm.score);
							myscore = this.ruleForm.score;
						}
						console.log(this.score);
						// 保存答题记录
						let record = {
							userid: this.user.id,
							paperid: this.paper.id,
							papername: this.paper.name,
							questionid: this.ruleForm.id,
							questionname: this.ruleForm.questionname,
							options: this.ruleForm.options,
							score: this.ruleForm.score,
							answer: this.ruleForm.answer,
							analysis: this.ruleForm.analysis,
							myscore: myscore,
							myanswer: this.answer
						};
						layui.http.requestJson(`examrecord/save`, 'post', record, function(res) {});
					},
					nextTap() {
						if (this.currentIndex == this.dataList.length - 1) {
							this.isEndFlag = true;
						} else {
							this.currentIndex = this.currentIndex + 1;
							this.ruleForm = this.dataList[this.currentIndex];
							this.options = JSON.parse(this.ruleForm.options);
							this.isSubmitFlag = false;
						}
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
