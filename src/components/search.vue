<template>
  <div class="search">
      <div><input type="text"><button>搜索</button></div>
    <div class="type">
      <span :style="type==1?'color:#0576DA;font-weight:bold':''" @click="type=1;find()">歌</span><span :style="type==1006?'color:#0576DA;font-weight:bold':''" @click="type=1006;find()">MV</span>
    </div>
    <div class="list">
      <ul v-if="type==1">
        <li v-for="item in list">
          <router-link :to="{name:'songPlay',params:{id:item.id}}">
            <span>{{item.name}}--{{item.artists[0].name}}</span>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-for="item in list" v-if="item.mvid">
          <router-link :to="{name:'mvPlay',params:{id:item.mvid}}">
            <span>{{item.name}}--{{item.artists[0].name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      keywords: this.$route.params.keywords,
      type: 1,
      list: [],
      offset: 0
    }
  },
  methods: {
    find: function () {
      let that = this;
      $.get(this.url + '/search?keywords=' + this.keywords + '&offset=' + this.offset + '&type=' + this.type, function (data) {
        that.list = data.result.songs;
        console.log(that.list)
      })
    }
  },
  mounted: function () {
    this.find()
  }
}
</script>

<style scoped>
.search{
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
}
  .search input{
    border: 1px solid #999999;
    width: 500px;
    height: 30px;
    border-radius: 5px;
  }
.search button{
  border: none;
  background: #009af3;
  color: #ffffff;
  padding: 8px 10px;
  margin-left: 20px;
  border-radius: 5px;
}
  .list li{
    text-align: left;
    height: 30px;
  }
.list li:hover{
  background: #999999;
}
</style>
