<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="UTF-8">
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>首页</title>
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


    <div class="part5" style="margin-top: 50px;">
      <div class="part2_1">
        <div class="tit">
          <b>新闻资讯</b>
          <span>HOME NEWS</span>
        </div>
        <div class="more">
          <a href="#" @click="jump('../news/list.jsp')">MORE>></a>
        </div>
      </div>
      <div class="part5_1" v-for="(item,index) in newsList" v-bind:key="index" @click="jump('../news/detail.jsp?id='+item.id)">
        <div class="tit">
          <div>{{item.title}}</div>
        </div>
        <div class="tu">
          <img :src="item.picture" width="327" height="134" />
        </div>
        <ul>
          {{item.content|newsDesc}}...
        </ul>
        <div class="more">
          <a href="#" @click="jump('../news/detail.jsp?id='+item.id)"></a>
        </div>
      </div>
    </div>
    <div class="clear"></div>

    <div class="part2" style="margin-top: 50px;">
      <div class="part2_1">
        <div class="tit">
            <b>二手车信息展示</b>
            <span>DATA SHOW</span>
        </div>
        <div class="more">
            <a href="#" @click="jump('../ershouchexinxi/list.jsp')">MORE>></a>
        </div>
      </div>
      <div class="part2_2">
        <div class="caseBox" v-for="(item,index) in ershouchexinxiList" v-bind:key="index">
          <div class="caseBox_1">
            <div class="caseImg" style="background-size: cover;background-repeat: no-repeat;background-position: center;"><img :src="item.tupian?item.tupian.split(',')[0]:''" width="390" height="320" /></div>
            <div class="hoverbg" style="display: none;">
                <a :href="'../ershouchexinxi/detail.jsp?id='+item.id">查看详情</a>
            </div>
          </div>
          <div class="caseBox_2">
            <a :href="'../ershouchexinxi/detail.jsp?id='+item.id">{{item.chexing}}<span style="color: red;float: right;" v-if="item.price">{{item.price}} RMB</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>

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

      ershouchexinxiList: [],
        newsList: []
      },
      filters: {
        newsDesc: function(val) {
          if (val) {
            val = val.replace(/<[^<>]+>/g, '').replace(/undefined/g, '');
            if (val.length > 60) {
              val = val.substring(0, 60);
            }

            return val;
          }
          return '';
        }
      },
      methods: {
        jump(url) {
          jump(url)
        }
      }
    });

    layui.use(['layer', 'form', 'element', 'carousel', 'http', 'jquery'], function() {
      var layer = layui.layer;
      var element = layui.element;
      var form = layui.form;
      var carousel = layui.carousel;
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
              
      http.request('news/list', 'get', {
        page: 1,
        limit: 6,
        order: 'desc'
      }, function(res) {
        vue.newsList = res.data.list;
      });


      http.request(`ershouchexinxi/list`, 'get', {
        page: 1,
        limit: 6
      }, function(res) {
        vue.ershouchexinxiList = res.data.list;
      });
    });
  </script>
</body>

</html>