<template>
  <div class="hello container">
    <div class="new_n">
      <h2 :class="new_n==0?'active':''" @click="new_song(0)">新歌首发</h2>
      <h2 :class="new_n==1?'active':''" @click="new_song(1)">最新MV</h2>
      <router-link :to="{name: 'newList',params: {type:new_n,page:0}}" style="float: right;font-size: 14px;margin-right: 20px">查看更多>></router-link>
    </div>
    <div>
      <div v-if="new_n==0" class="song">
        <h2 style="text-align: center;margin-top: 50px;color: #158fe1" v-if="song_list.length==0">正在加载中，请稍后。。。</h2>
        <ul>
          <li v-for="item in song_list">
            <router-link :to="{name:'album',params:{id:item.id}}">
              <img :src="item.blurPicUrl" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="new_n==1" class="mv">
        <ul>
          <li v-for="item in mv_list">
            <router-link :to="{name:'mvPlay',params:{id:item.id}}">
              <img :src="item.cover" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      new_n: 0,
      url: 'http://ruidong.cloudno.de',
      song_list: [],
      mv_list: []
    }
  },
  methods: {
    new_song: function (i) {
      this.new_n = i
    }
  },
  mounted: function () {
    let that = this
    $.get(that.url + '/top/album?offset=0&limit=10',
      function (data) {
        //console.log(data)
        that.song_list = data.albums
      }
    )
    $.get(that.url + '/mv/first?limit=10',
      function (data) {
        console.log(data)
        that.mv_list = data.data
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/index.css";
  .new_n>*{
    cursor: pointer;
  }
</style>
