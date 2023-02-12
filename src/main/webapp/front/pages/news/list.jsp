<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="true" %>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="UTF-8">
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>新闻资讯列表</title>
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

    <div class="newsBox" style="margin-top: 50px;padding-bottom: 0;">
      <div class="newsBoxL">
        <div class="newsBoxL_3">
          <ul>
            <li v-for="(item,index) in dataList" v-bind:key="index">
              <div class="newl">
                <a :href="'../news/detail.jsp?id='+item.id">
                  <div class="newimg" style="background-size: cover;background-repeat: no-repeat;background-position: center;">
                    <img width="300" height="200" class="fl" :src="item.picture" />
                  </div>
                </a>
              </div>
              <div class="newr">
                <div class="tit"><a :href="'../news/detail.jsp?id='+item.id">{{item.title}}</a></div>
                <div class="date">
                  <span>发布时间：{{item.addtime}}</span>
                </div>
                <div class="sub">
                  {{item.content|newsDesc}}...
                </div>
                <div class="xq">
                  <a :href="'../news/detail.jsp?id='+item.id">查看详情</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="newsBoxR">
        <div class="boxR">
          <img src="../../xznstatic/images/bg.jpg" height="500px" />
        </div>
      </div>
      <div class="clear"></div>
      <div class="pages" style="text-align: center;margin-top: 30px;">
        <div class="pager" id="pager"></div>
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
        dataList: []
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
    })

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

      // 获取列表数据
      http.request('news/list', 'get', {
        page: 1,
        limit: 5
      }, function(res) {
        vue.dataList = res.data.list
        // 分页
        laypage.render({
          elem: 'pager',
          count: res.data.total,
          limit: 5,
          jump: function(obj, first) {
            //首次不执行
            if (!first) {
              http.request('news/list', 'get', {
                page: obj.curr,
                limit: obj.limit
              }, function(res) {
                vue.dataList = res.data.list;
              })
            }
          }
        });
      })
    });
  </script>
</body>

</html>