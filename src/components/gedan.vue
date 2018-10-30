<template>
  <div class="album">
    <div v-if="list.length==0" class="box">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="info">
      <div>
        <img :src="img" alt="">
      </div>
      <div>
        <h2>专辑：{{alb}}</h2>
        <p>歌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手:&nbsp;&nbsp;{{author}}</p>
        <p>更新时间:&nbsp;&nbsp;{{pushlistTime}}</p>
        <p>标签:&nbsp;&nbsp;<span v-for="tag in tags">{{tag}}</span></p>
      </div>
    </div>
    <div class="description">
      <h3>专辑介绍：</h3>
      <p>{{description}}</p>
    </div>
    <h3>播放列表&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 14px">共{{list.length}}首歌</span></h3>
    <div class="song">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>歌名</th>
          <th>时长</th>
          <th>歌手</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,key) in list">
          <td>{{key+1}}</td>
          <td>{{item.name}}<span class="alia" v-if="item.alia.length!=0">-({{item.alia}})</span><router-link :to="{name: 'mvPlay',params: {id:item.mv}}" class="mv" v-if="item.mv!=0"></router-link></td>
          <td>{{item.dt | time}}</td>
          <td>{{item.ar[0].name}}</td>
          <td><router-link :to="{name:'songPlay',params:{id:item.id}}">▶</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "album",
    data() {
      return {
        url: 'http://ruidong.cloudno.de',
        id: this.$route.params.id,
        list: '',
        author: '',
        alb: '',
        publishTime: '',
        description: '',
        img: '',
        tags: ''
      }
    },
    filters: {
      time: function (value) {
        let time = parseInt(value / 1000);
        let m = parseInt(time / 60);
        let s = time % 60;
        m<10?m='0'+m:m=m;
        s<10?s='0'+s:s=s;
        return m+':'+s;
      }
    },
    mounted: function () {
      let that = this
      $.get(that.url + '/playlist/detail?id=' + that.id,
        function (data) {
        let playlist = data.playlist;
          that.list = playlist.tracks;
          that.author = playlist.creator.nickname;
          that.alb = playlist.name;
          that.pushlistTime = new Date(playlist.updateTime).toLocaleDateString();
          that.description = playlist.description;
          that.img = playlist.coverImgUrl;
          that.tags = playlist.tags;
        }
      )
    }
  }
</script>

<style scoped>
  @import "../assets/album.css";
  .info>div>p>span{
    margin: 0 10px;
  }
  .mv{
    display: inline-block;
    width: 23px;
    height: 17px;
    background: url("../assets/table.png") no-repeat 0 -151px;
  }
  .alia{
    font-size: 12px;
    color: #999999;
  }
</style>
