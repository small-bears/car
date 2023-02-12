<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="UTF-8">
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>轮播图管理列表页</title>
  <link rel="stylesheet" href="../../layui/css/layui.css">
  <link type="text/css" rel="stylesheet" href="../../xznstatic/css/style.css" />
  <script type="text/javascript" src="../../xznstatic/js/jquery-1.8.2.min.js"></script>
  <script type="text/javascript" src="../../xznstatic/js/banner.js"></script>
  <script type="text/javascript" src="../../xznstatic/js/my.js"></script>
</head>

<body>
  <div id="app">
    <div class="layui-carousel" id="swiper">
      <div carousel-item id="swiper-item">
        <div v-for="(item,index) in swiperList" v-bind:key="index">
          <img class="swiper-item" :src="item.img" width="100%" height="400px">
        </div>
      </div>
    </div>

    <fieldset class="search-container" style="text-align: center;margin: 50px 0;">
      <form class="layui-form" style="margin: 10px 0;">
        <div class="layui-inline">
          <label class="layui-form-label">名称</label>
          <div class="layui-input-inline">
            <input type="text" name="name" id="name" placeholder="名称" autocomplete="off" class="layui-input">
          </div>
        </div>   
        <div class="layui-inline" style="margin-left: 30px;">
          <button id="btn-search" type="button" class="layui-btn" style="background-color: #000000;">
            搜索
          </button>
          <button v-if="isAuth('config','新增')" @click="jump('../config/add.jsp')" type="button" class="layui-btn btn-theme">
            <i class="layui-icon">&#xe654;</i> 添加
          </button>
        </div>
      </form>
    </fieldset>

    <div class="product">
      <div class="proBox" v-for="(item,index) in dataList" v-bind:key="index">
        <div class="proBoximg">
          <div class="primg" style="background-size: cover;background-repeat: no-repeat;background-position: center;">
          </div>
        </div>
        <div class="proBoxtxt">
          <a :href="'../config/detail.jsp?id='+item.id">查看详情</a>
        </div>
      </div>
      <div class="clear"></div>
      <div class="pages" style="text-align: center;margin-top: 30px;">
        <div class="pager" id="pager"></div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="footer" style="background-color: #000000;margin-top: 50px;">
      <div class="foot_bottom" v-text="projectName"></div>
    </div>
  </div>

  <script src="../../layui/layui.js"></script>
  <script src="../../js/vue.js"></script>
  <script src="../../js/config.js"></script>
  <script src="../../modules/config.js"></script>
  <script src="../../js/utils.js"></script>

  <script>
    var vue = new Vue({
      el: '#app',
      data: {
        projectName: projectName,
        swiperList: [{
          img: '../../img/banner.jpg'
        }],
        dataList: [],
      },
      methods: {
        isAuth(tablename, button) {
          return isFrontAuth(tablename, button)
        },
        jump(url) {
          jump(url)
        }
      }
    });

    layui.use(['layer', 'element', 'carousel', 'laypage', 'http', 'jquery'], function() {
      var layer = layui.layer;
      var element = layui.element;
      var carousel = layui.carousel;
      var laypage = layui.laypage;
      var http = layui.http;
      var jquery = layui.jquery;

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
                '<img class="swiper-item" src="' + item.value + '" width="100%" height="400px">' +
                '</div>';
            }
          }
          jquery('#swiper-item').html(swiperItemHtml);
          // 轮播图
          carousel.render({
            elem: '#swiper',
            width: '100%',
            height: '400px',
            arrow: 'always',
            anim: 'fade',
            interval: 1800,
            indicator: 'inside'
          });
        }
      });

      // 分页列表
      pageList();

      // 搜索按钮
      jquery('#btn-search').click(function(e) {
        pageList();
      });

      function pageList() {
        var param = {
          page: 1,
          limit: 6
        };
        if (jquery('#name').val()) {
          param['name'] = jquery('#name').val() ? '%' + jquery('#name').val() + '%' : '';
        }  
        // 获取列表数据
        http.request('config/list', 'get', param, function(res) {
          vue.dataList = res.data.list
          // 分页
          laypage.render({
            elem: 'pager',
            count: res.data.total,
            limit: 6,
            jump: function(obj, first) {
              param.page = obj.curr;
              //首次不执行
              if (!first) {
                http.request('config/list', 'get', param, function(res) {
                  vue.dataList = res.data.list;
                })
              }
            }
          });
        })
      }
    });
  </script>
</body>

</html>