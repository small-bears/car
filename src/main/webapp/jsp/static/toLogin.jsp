<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- token过期或未登录时强制跳转到登录页 -->
alert('token过期或未登录!')
window.location.href="${pageContext.request.contextPath}/jsp/login.jsp"