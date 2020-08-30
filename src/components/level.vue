<template>
  <div class="level-container">
    <div class="level-title">难度选择</div>
    <div class="level-item" @click="ChangeLevel(0)">初级</div>
    <div class="level-item" @click="ChangeLevel(1)">中级</div>
    <div class="level-item" @click="ChangeLevel(2)">高级</div>
  </div>
</template>

<script>

export default {
    methods:{
      ChangeLevel:function(index){
        this.$bus.$emit('changelevel', index )
      },
    },
}
</script>

<style lang="scss" scoped>
.level-container{
    padding: 35% 0;
}
.level-title{
    font-size: 1rem;
    text-align: center;
}
.level-item{
    width: 40%;
    height: 10vw;
    margin: 10vw auto;
    line-height: 10vw;
    border: 1px solid black;
}

</style>
