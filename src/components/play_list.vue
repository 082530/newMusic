<template>
  <div class="play_list">
    <div class="nav1">
      <div class="type">
        <div>
          <h3 @click="cli('')" style="cursor: pointer">全部</h3>
        </div>
        <div>
          <span :style="style==0?'color:#009af3;font-weight:bold':''" @click="fenlei(0)">热门</span>
          <span :style="style==1?'color:#009af3;font-weight:bold':''" @click="fenlei(1)">最新</span>
        </div>
      </div>
      <div class="select">
        <ul v-for="(item,key) in type">
          <li>
            <span>{{item}}</span>
          </li>
          <li>
            <span @click="cli(items.name);page=0" :class="nam==items.name?'active':''" v-for="items in type_list[key]">{{items.name}}</span>
          </li>
        </ul>
      </div>
      <div class="list">
        <div v-if="hasSucc" class="box">
          <img src="../assets/loading.gif" alt="">
        </div>
        <h2 style="text-align: center;margin-top: 50px;color: #158fe1" v-if="list.length==0">正在加载中，请稍后。。。</h2>
        <ul>
          <li v-for="items in list">
            <router-link :to="{name:'gedan',params:{id:items.id}}">
              <img :src="items.coverImgUrl" alt="">
              <p>{{items.name}}</p>
            </router-link>
          </li>
        </ul>
        <p>
          <button v-if="page" @click="page-=15;cli(nam);hasSucc=true">上一页</button>
          <button @click="page+=15;cli(nam);hasSucc=true">下一页</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "play_list",
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      m_name: '',
      type: [],
      type_list: [[],[],[],[],[]],
      nam: '',
      list: '',
      page: 0,
      style: 0,
      order: '',
      hasSucc: false
    }
  },
  methods: {
    cli: function (na) {
      this.nam = na;
      let that = this;
      console.log(that.order)
      $.get(that.url + '/top/playlist?limit=12&cat=' + na + '&offset=' + that.page + '&order=' + this.order, function (data) {
        that.hasSucc = false;
        that.list = data.playlists;
      })
    },
    fenlei: function (value) {
      if (value) {
        this.style = 1;
        this.order = 'new'
      } else {
        this.style = 0;
        this.order = 'hot';
      }
      this.cli('');
      this.page = 0;
      this.nam = '';
    }
  },
  mounted: function () {
    let that = this;
    $.ajax({
      url: that.url + '/playlist/catlist',
      async: false,
      type: 'GET',
      success: function (data) {
        let key;
        for (key in data.categories) {
          that.type.push(data.categories[key])
        }
        for (let i = 0, n = data.sub.length; i < n; i++) {
          switch (data.sub[i].category) {
            case 0: that.type_list[0].push(data.sub[i]);break;
            case 1: that.type_list[1].push(data.sub[i]);break;
            case 2: that.type_list[2].push(data.sub[i]);break;
            case 3: that.type_list[3].push(data.sub[i]);break;
            case 4: that.type_list[4].push(data.sub[i]);break;
          }
        }
      }
    })
    this.cli('')
  }
}
</script>

<style scoped>
@import "../assets/playlist.css";
  .box{
    top: 0;
  }
</style>
