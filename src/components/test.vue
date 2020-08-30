<template>
<div>
  <div ref="start">start</div>
   <div class="test">
      <div class="item"
      v-for="(item,index) in list" :key="index"
      @click="handleClick(item)"
      ref="list"
      >{{item}}</div>
      <!-- <span :class="{'visible': true}">{{item.mineNum?item.mineNum:0}}</span> -->
  </div>
</div>

</template>

<script>
export default {
  data(){
    return{
      list:[2,2,3,4,5,6,7,8,9]
    }
  },
  methods:{
    myfun(){
      this.$bus.$data.aaa = 1;
      // console.log(this.$bus);
    },
    handleClick(index){
      console.log(index);
    }
  },
  mounted(){
    // this.myfun()
    // console.log('mounted');
    // console.log(this.$refs);
  }
}
</script>

<style lang="scss">
.item{
  display: block;
  height: 100px;
  width: 10rem;
  border: 1px solid black;
  // padding: 10%;
}
.son{
  width: 10%;
  height: 10%;
  padding: 100px;
}
</style>
