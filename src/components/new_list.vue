<template>
    <div class="new_list">
      <div v-if="hasSucc" class="box">
        <img src="../assets/loading.gif" alt="">
      </div>
      <h2 style="text-align: center;margin-top: 50px;color: #158fe1" v-if="list.length==0">正在加载中，请稍后。。。</h2>
      <ul v-if="state==0">
        <li v-for="item in list">
          <router-link :to="{name:'album',params:{id:item.id}}">
            <img :src="item.blurPicUrl" alt="">
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-for="item in list">
          <router-link :to="{name:'mvPlay',params:{id:item.id}}">
            <img :src="item.cover" alt="">
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
      <p v-if="state==0">
        <button v-if="page" @click="page-=15;add();hasSucc=true">上一页</button>
        <button @click="page+=15;add();hasSucc=true">下一页</button>
      </p>
    </div>
</template>

<script>
export default {
  name: "new_list",
  data () {
    return {
      new_n: 0,
      url: 'http://ruidong.cloudno.de',
      list: [],
      state: this.$route.params.type,
      page: this.$route.params.page,
      hasSucc: true
    }
  },
  methods: {
    add: function () {
      let that = this
      if (!this.state) {
        $.get(that.url + '/top/album?offset=' + that.page + '&limit=15',
          function (data) {
            that.hasSucc = false;
            if (data.albums.length === 0) {
              alert('没有更多数据了');
              return false
            }
            that.list = data.albums
          }
        )
      } else {
        $.get(that.url + '/mv/first?offset=' + that.page + '&limit=50',
          function (data) {
            that.hasSucc = false;
            // console.log(data.data)
            if (data.data.length==0) {
              alert('没有更多数据了');
              return false
            }
            that.list = data.data
          }
        )
      }
    }
  },
  mounted: function () {
    this.add()
  }
}
</script>

<style scoped>
  .new_list ul img{
    width: 100%;
    height: 200px;
  }
  .new_list li{
    width: 200px;
    display: inline-block;
    vertical-align: top;
    height: 250px;
    margin: 20px;
  }
  .new_list li p{
    text-align: center;
  }
  .new_list{
    width: 1200px;
    margin: 0 auto;
  }
  .new_list>p>button{
    border: 0;
    background: #009af3;
    color: #fff;
    padding: 5px 10px;
    margin: 20px;
    border-radius: 3px;
  }
  .new_list>p{
    text-align: center;
  }
</style>
