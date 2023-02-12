<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
var baseUrl = "http://localhost:8080/jspmin18p/";
var projectName = "二手车交易网站"

/**
 * 网络请求
 * @param {Object} url		地址
 * @param {Object} method	get/post
 * @param {Object} param	参数
 * @param {Object} callback	回调函数
 */
function http(url, type, data, callback) {
	url = baseUrl + url;
	$.ajax({
		url: url,
		beforeSend: function(request) {
			request.setRequestHeader("token", window.sessionStorage.getItem("token"));
		},
		contentType: 'application/x-www-form-urlencoded',
		data: data,
		dataType: 'json',
		type: type,
		success: function(result, status, xhr) {
			if (result.code == 0) {
				callback(result);
			} else if (result.code == 401) {
				window.location.href = '${pageContext.request.contextPath}/jsp/login.jsp';
			} else {
				alert(result.msg)
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error)
		}
	});
}

function httpJson(url, type, data, callback) {
	url = baseUrl + url;
	var params = null;
	if (data) {
		var params = JSON.stringify(data);
	}
	$.ajax({
		url: url,
		beforeSend: function(request) {
			request.setRequestHeader("token", window.sessionStorage.getItem("token"));
		},
		contentType: 'application/json',
		data: params,
		dataType: 'json',
		type: type,
		success: function(result, status, xhr) {
			if (result.code == 0) {
				callback(result);
			} else if (result.code == 401) {
				window.location.href = '${pageContext.request.contextPath}/jsp/login.jsp';
			} else {
				alert(result.msg)
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error)
		}
	});
}
