<template>
  <div class="headtop-container">
    <div class="headitem back" @click="handleclick"><span class="iconfont icon-arrow-left"></span></div>
    <div class="headitem time">
      <div class="iconfont icon-clock"></div>
      <div class="hour">{{hour}}:</div>
      <div class="min">{{min}}:</div>
      <div class="sec">{{sec}}</div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      timekeeping: null,
      time: 0
    }
  },
  methods:{
    handleclick: function(){
      this.$bus.$emit('selectlevel')
    },
    start: function(){
      this.$bus.time = {
        successed:0,
        hour:'00',
        min:'00',
        sec:'00'
      }
      this.timekeeping = setInterval(() => {
        this.time++
      }, 1000);
    },
    stop: function(state){
      this.$bus.time = {
        successed:state,
        hour:this.hour,
        min:this.min,
        sec:this.sec
      }
      clearInterval(this.timekeeping)
    }
  },
  computed:{
    hour: function () {
        let a = Math.floor(this.time / 3600)
        let tens = Math.floor(a / 10).toString()
        let units = (a % 10).toString()
        return tens+units
    },
    min: function () {
        let a = Math.floor((this.time % 3600) / 60)
        let tens = Math.floor(a / 10).toString()
        let units = (a % 10).toString()
        return tens+units
    },
    sec: function () {
        let a = Math.floor((this.time % 3600) % 60)
        let tens = Math.floor(a / 10).toString()
        let units = (a % 10).toString()
        return tens+units
    }
  },
  created: function(){
    this.$bus.$once('start', this.start)
    this.$bus.$once('stop', this.stop)
  }
}
</script>

<style lang="scss">
.headtop-container{
  position: fixed;
  top: 0;
  height: 11vw;
  line-height: 11vw;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0 0 1vw 1vw;
  box-shadow: 0 .5vw rgba($color: #666666, $alpha: .4);
  background-color: #fff;
  display: flex;
  flex-wrap: nowrap;
  .headitem{
    width: 33.3%;
    text-align: left ;
  }
  .back{
    padding-left: 3vw;
  }
  .time{
    display: flex;
    align-items: center;
  }
}

</style>
