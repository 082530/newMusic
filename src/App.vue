<template>
  <div id="app" class="container">
    <div class="header">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo container"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/playList">歌单</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/bangdan">榜单</router-link></el-menu-item>
        <el-input
          placeholder="请输入搜索内容"
          v-model="keywords"
          clearable>
        </el-input>
        <el-button type="primary"><router-link style="color: #ffffff" :to="{name:'search',params:{keywords:keywords}}">搜索</router-link></el-button>
      </el-menu>
    </div>







    <span class="old">
      <!--<a href="/old">返回旧版首页>></a><br>-->
      <a href="/video/index.html">进入视频解析>></a>
    </span>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      stat: 0,
      keywords: '',
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style>
  .header{
    background-color: rgb(84, 92, 100);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .el-menu--horizontal>.el-menu-item a{display: inline-block}
  .el-input{
    width: 200px !important;
    line-height: 60px;
  }
  .old{
    position: fixed;
    right: 3%;
    top: 40%;
    z-index: 999;
  }
  .old a{
    color: #009af3;
    font-weight: bold;
  }
  .nav{
    width: 100%;
    background: #000000;
    height: 50px;
    display: inline-block;
  }
  .nav li{
    text-align: center;
    line-height: 50px;
    width: 10%;
    display: inline-block;
  }
  .nav li:last-child{
    width: 50%;
  }
  .nav li:hover,.nav li.active{
    background: #158fe1;
  }
  .nav li:last-child:hover{background:#000}
  .nav li:last-child *{color:#333}
  .nav li select{
    width: 60px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    height: 25px;
  }
  .nav li input{
    width: 150px;
    border: 0;
    height: 28px;
    border-radius: 14px;
    padding-left: 10px;
  }
  .nav li button{
    border: 0;
    border-radius: 3px;
    padding:5px 10px;
  }
  .nav li *{
    color: #fff;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
  }
.container {
  width: 1200px;
  margin: 0 auto !important;
}
  header>.container {
   width: 1200px;
   margin: 0 auto !important;
 }
  *{
    font-family: 微软雅黑;
    color: #333333;
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  div.box{
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    text-align: center;
    left: 0;
    top: 0;
  }
  div.box>img{
    position: fixed;
    top: 50%;
  }
</style>
