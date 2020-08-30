<template>
  <div id="app">
    <Test v-show="false"></Test>
    <Level v-if="!levelselect"></Level>
    <Mine v-if="!!levelselect" :level="level" :key="levelselect"></Mine>
  </div>
</template>

<script>
import Test from './components/test'
import Level from './components/level'
import Mine from './components/mine'



export default {
  name: 'App',
  data(){
    return{
      testshow:false,
      levelselect: 0,
      level:1,
    }
  },
  components: {
    Test,
    Level,
    Mine,
  },
  methods:{
    changeLevel: function (index) {
      this.levelselect = 1;
      this.level = index;
    },
    selectlevel: function () {
      this.levelselect = 0;
    },
    restart: function () {
      this.levelselect++;
      console.log(this.levelselect);
    },
    clickhandle(){
      this.levelselect = !this.levelselect
    }
  },
  created: function () {
    this.$bus.$on('changelevel', this.changeLevel)
    this.$bus.$on('selectlevel', this.selectlevel)
    this.$bus.$on('restart', this.restart)
  },
  mounted: function () {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
