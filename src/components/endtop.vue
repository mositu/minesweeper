<template>
  <div class="endtop-container">
    <div class="msg-container">
      <div class="result">
        <div class="iconfont" :class="biaoqing[this.$bus.time.successed]"></div>
        {{result[this.$bus.time.successed]}}
      </div>
      <div class="time">{{this.time.hour}}:{{this.time.min}}:{{this.time.sec}}</div>
      <div class="button">
        <div class="home" @click="back"><div class="iconfont icon-home"></div></div>
        <div class="restart" @click="restart"><div class="iconfont icon-icon_refresh"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      result:['u lose!!!!','u win!!!!'],
      time:this.$bus.time,
      biaoqing:['icon-ku','icon-xiaolian']
    }
  },
  methods:{
    back: function () {
      this.$bus.$emit('selectlevel')
    },
    restart: function () {
      this.$bus.$emit('restart')
    },
  }
}
</script>

<style lang='scss'>
.endtop-container{
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 99;
  .msg-container{
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .result{
      box-sizing: border-box;
      padding: 10vw 0;
      font-size: 1.5rem;
      .iconfont{
        font-size: 7rem;
      }
    }
    .time{
      padding-bottom: 10vw;
      font-size: 1.5rem;
    }
    .button{
      display: flex;
      justify-content: space-around;
      padding-bottom: 5vw;
    }
  }
}
</style>
