<template>
    <div class="bd">
      <div>
        <h2>mv 排行</h2>
        <ul>
          <li v-if="mv.length==0">
            <h5 style="text-align: center;margin-top: 50px;color: #158fe1">正在加载中，请稍后。。。</h5>
          </li>
          <li v-for="items in mv">
            <router-link :to="{name:'mvPlay',params:{id:items.id}}">
              <img :src="items.cover" alt="">
              <span>{{items.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h2>云音乐新歌榜</h2>
        <ul>
          <li v-if="new1.length==0">
            <h5 style="text-align: center;margin-top: 50px;color: #158fe1">正在加载中，请稍后。。。</h5>
          </li>
          <li v-for="items in new1">
            <router-link :to="{name:'album',params:{id:items.al.id}}">
              <img :src="items.al.picUrl" alt="">
              <span>{{items.al.name}}--{{items.ar[0].name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h2>云音乐飙升榜</h2>
        <ul>
          <li v-if="hot.length==0">
            <h5 style="text-align: center;margin-top: 50px;color: #158fe1">正在加载中，请稍后。。。</h5>
          </li>
          <li v-for="items in hot">
            <router-link :to="{name:'album',params:{id:items.al.id}}">
              <img :src="items.al.picUrl" alt="">
              <span>{{items.al.name}}--{{items.ar[0].name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    name: "bangdan",
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      hot: '',
      new1: '',
      mv: ''
    }
  },
  mounted: function () {
      let that=this;
    $.get(this.url + '/top/mv?limit=100',function (data) {
      that.mv = data.data;
    });
    $.get(this.url + '/top/list?idx=0',function (data) {
      that.new1 = data.playlist.tracks;
    });
    $.get(this.url + '/top/list?idx=1',function (data) {
      that.hot = data.playlist.tracks;
    });
  }
}
</script>

<style scoped>
.bd>div{
  width: 32.5%;
  display: inline-block;
  vertical-align: top;
}
  .bd img{
    height: 100%;
  }
.bd li{
  height: 50px;
  margin: 10px 0;
}
  .bd{
    width: 1200px;
    margin: 0 auto;
  }
.bd li>a>*{
  vertical-align: top;
}
.bd li>a>span{
  display: inline-block;
  width: 74%;
}
</style>
