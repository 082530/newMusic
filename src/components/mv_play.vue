<template>
  <div class="mvplay">
    <h2>{{m_name}}</h2>
    <div id="video" style="width: 600px; height: 400px;"></div>
  </div>
</template>
<script>
export default {
  name: "mvPlay",
  data() {
    return {
      url: 'http://ruidong.cloudno.de',
      id: this.$route.params.id,
      m_name: ''
    }
  },
  mounted: function () {
    let src = [];
    let that = this;
    $.ajax({
      url: this.url + '/mv/detail?mvid=' + this.id,
      type: 'GET',
      async: false,
      success: function (data) {
        // src = [
        //   [data.data.brs['240'], 'video/mp4', '240', 0],
        //   [data.data.brs['480'], 'video/mp4', '480', 0],
        //   [data.data.brs['720'], 'video/mp4', '720', 10],
        //   [data.data.brs['1080'], '', '1080', 0],
        // ];
        for (let key in data.data.brs){
          let arr=[];
          arr.push(data.data.brs[key]);
          arr.push('video/mp4');
          arr.push(key);
          arr.push(0);
          src.push(arr);
        } ;
        that.m_name = data.data.name
      }
    });
    var videoObject = {
      container: '#video',// “#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',// 该属性必需设置，值等于下面的new chplayer()的对象
      // flashplayer:true,// 如果强制使用flashplayer则设置成true

      video: src//视频地址
    };
    let player = new ckplayer(videoObject);
  }
}
</script>

<style scoped>
.mvplay{
  padding-top: 20px;
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}
  #video{
    margin: 0 auto;
  }
</style>
