<template>
<div>
  <headtop></headtop>
  <div class="mine-container">
    <div class="mine-item"
      v-for="(item, index) in this.minelist" :key="index"

      @touchstart="gotouchstart(index)" @touchmove="gotouchmove" @touchend="gotouchend(index)"
      ref="list"
    >
      <!-- {{item.mineNum}}       @click="clickbox(index);start()"-->
    </div>
    <!-- <span :class="{'visible': true}">{{item.mineNum?item.mineNum:0}}</span> -->
  </div>
  <endtop v-if="end" :level='level'></endtop>

</div>



</template>

<script>
import headtop from '@/components/headtop'
import endtop from "@/components/endtop"
import Mineobj from "@/assets/js/newMineObj.js"

export default {
  data(){
    return{
      levellist:[
        {
          box:100,
          mine:10
        },
        {
          box:200,
          mine:30
        },
        {
          box:300,
          mine:50
        },
      ],
      minelist:[],
      levelinit: this.level,
      end:false,
      buff:0,
      timeoutevent:null
    }
  },
  components:{
    headtop,
    endtop
  },
  props:{
    level: {
      type: Number
    }
  },
  methods:{
    init(){
      this.end = false
      this.createbox();
      this.setmine();
      console.log(this.buff);
    },
    createbox(){
      this.minelist = []
      this.box = this.levellist[this.levelinit].box
      for (let index = 0; index <  this.box; index++) {
        this.minelist[index] = new Mineobj();
      }
    },
    setmine(){
      this.mine = this.levellist[this.levelinit].mine
      this.buff = this.levellist[this.levelinit].box - this.mine
      for (let i = 0; i < this.mine; i++) {
        let x = Math.floor(Math.random()*(this.box-1))
        if (this.minelist[x].mineNum === -1) {
          i--
        } else {
          this.minelist[x].mineNum = -1;
          this.countmine(x);
        }
      }
    },
    countmine(index){
      for (let i = index-11; i < index-8; i++) {
        for (let j = 0; j < 3; j++) {
          let pos = i+j*10
          if (pos>=0 && pos < this.box) {
            let a = index % 10
            let b = pos % 10
            if (b >= (a-1) && b <= (a+1)) {
              if (this.minelist[pos].mineNum != -1) {
                this.minelist[pos].mineNum += 1
              }
            }
          }
        }
      }
    },
    clickbox(index){
      if (this.minelist[index].isOpen === 0) {
        let minenum = this.minelist[index].mineNum
        switch(minenum) {
          case -1:
            this.$bus.$emit('stop',0)
            this.end = true
            break;
          case 0:
            this.openbox(index,minenum)
            this.openblank(index);
            break;
          default:
            this.openbox(index,minenum);
        }
      }
    },
    openbox(index,num){
      this.minelist[index].isOpen = 2
      let minenum = (num >= 0 && num <= 5) ? num : 5
      if (minenum!=0) {
        this.$refs.list[index].innerText = minenum
      }
      this.$refs.list[index].classList.add('item-opened')
      this.$refs.list[index].classList.add('num'+minenum)
      this.buff--
    },
    openblank(index){
      for (let i = index-11; i < index-8; i++) {
        for (let j = 0; j < 3; j++) {
          let pos = i+j*10
          if (pos >= 0 && pos < this.box) {
            let a = index % 10
            let b = pos % 10
            if (b >= (a-1) && b <= (a+1)) {
              if (this.minelist[pos].isOpen === 0) {
                this.clickbox(pos)
              }
            }
          }
        }
      }
    },
    placeflag(index){
      if (this.minelist[index].isOpen === 0) {
        this.$refs.list[index].classList.add('iconfont','icon-qizi')
        this.minelist[index].isOpen = 1
        return
      }
      if (this.minelist[index].isOpen === 1) {
        this.$refs.list[index].classList.remove('iconfont','icon-qizi')
        this.minelist[index].isOpen = 0
        return
      }

    },
    start(){
      this.$bus.$emit('start')
    },
    //长按插旗事件
    gotouchstart(index){
      let that = this
      clearTimeout(this.timeoutevent)
      this.timeoutevent = setTimeout(function(){
        that.timeoutevent = 0;
        console.log('changan');
        that.placeflag(index)
      },300);
    },
    gotouchend(index){
      clearTimeout(this.timeoutevent)
      if(this.timeoutevent!=0){
        this.clickbox(index)
        this.start()
        console.log('duanan');
      }
    },

    gotouchmove(){
      clearTimeout(this.timeoutevent);
      this.timeoutevent = 0;
    },

  },
  created: function () {
    this.init();
  },
  watch:{
    level: function () {
      this.init()
    },
    buff: function (val) {
      if (val === 0) {
        this.$bus.$emit('stop',1)
        this.end = true
      }
    }
  }
}
</script>

<style lang="scss">
.mine-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 95vw;
  margin: 15vw auto 1vw;
  background-color: #696969;
  .mine-item{
    box-sizing: border-box;
    display: inline-block;
    height: 9vw;
    width: 9vw;
    margin: .25vw;
    line-height: 9vw;
    background-color: 	#F8F8FF;
    border-radius: .5vw;
    box-shadow: inset -1vw -1vw 1vw 0px #DCDCDC;
    font-size: 1.5rem;
    font-weight: 900;
  }
  .item-opened{
    background-color:#4F4F4F;
    box-shadow: inset -.2vw -.2vw 2vw 0px rgba($color: #000000, $alpha: .5),
                inset .2vw .2vw 2vw 0px rgba($color: #000000, $alpha: .5);
  }
  .num1{
    color: rgb(28, 175, 224);
  }
  .num2{
    color: rgb(214, 154, 25);
  }
  .num3{
    color: rgb(96, 250, 96);
  }
  .num4{
    color: rgb(51, 99, 196);
  }
  .num5{
    color: rgb(196, 51, 51);
  }
  .num0{
    font-size: 0;
  }
  .icon-qizi{
    color: #D2691E;
  }
}


</style>
