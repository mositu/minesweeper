<template>
    <div class="mine-container">
        <div class="mine-item"
        v-for="(item, index) in list" :key="index"
        @click="clickbox(index)"
        :ref="listttt"
        >{{item.mineNum?item.mineNum:0}}</div>
    </div>
</template>

<script>
import scroll from "@/components/scroll";
import Mineobj from "@/assets/js/newMineObj.js";
export default {
    data(){
        return {
            show:true,
        }
    },
    components:{
        scroll,
    },
    computed:{
        mine:function () {
            return Math.random();
        }
    },
    methods:{
        setbomb(level){
            for (let i = 0; i < level*19-10; i++) {
                let x = Math.floor(Math.random()*(this.box-1))
                if (this.list[x].mineNum === -1) {
                    i--
                } else {
                    this.list[x].mineNum = -1;
                    this.countBomb(x);
                }

            }
        },
        countBomb(x){
            for (let i = x-10; i < x-7; i++) {
                for (let j = 0; j < 3; j++) {
                    let m = i+j*9;
                    // console.log(m);
                    if ( m>=0 && m< this.box) {
                        let a = ( x===0 ) ? 1 :  x%9
                        let b = ( m===0 ) ? 1 :  m%9
                        if (b>=(a-1)&& b <= (a+1)) {
                           if (this.list[m].mineNum != -1) {
                                this.list[m].mineNum = (!this.list[m].mineNum) ? 1 : this.list[m].mineNum+1
                            }
                        }
                    }
                }
            }
        },
        clickbox(i){
            // console.log(event.target.classList);
            if (!this.list[i].isOpen) {
                switch(this.list[i].mineNum) {
                    case -1:
                        alert("boom!!")
                        this.$emit("reset", true)
                        break;
                    case 0:
                        this.openblank(i);
                        break;
                    case 1:
                        this.openbox(i,1);
                        break;
                    case 2:
                        this.openbox(i,2);
                        break;
                    case 3:
                        this.openbox(i,3);
                        break;
                    default:
                        this.openbox(i,4);
                }
            }
        },
        openbox(i,className = 0){
            var clist = ['open-0','open-1','open-2','open-3','open-4']
            this.domlist[i].classList.add(clist[className])
            this.list[i].isOpen = true;
            this.minebuff -= 1
            console.log(this.minebuff);
            if(this.minebuff === 0){
                setTimeout(() => {
                    alert('u win!!!')
                    this.$emit("reset", true)
                }, 0);

            }
        },
        openblank(x){
            for (let i = x-10; i < x-7; i++) {
                for (let j = 0; j < 3; j++) {
                    let m = i+j*9;
                    if ( m>=0 && m< this.box) {
                        let a = ( x===0 ) ? 1 :  x%9
                        let b = ( m===0 ) ? 1 :  m%9
                        if (b>=(a-1)&& b <= (a+1)) {
                            if (this.list[m].mineNum === 0 && !this.list[m].isOpen) {
                                this.openbox(m)
                                this.openblank(m);
                            }else{
                                this.clickbox(m);
                            }
                        }
                    }
                }
            }
            this.domlist[x].classList.add('open-0');
            this.list[x].isOpen = true;

        },
        init(){
            this.box = this.level*90
            this.minebuff = this.level*71+10
            this.list =  new Array(this.box)
            for (let i = 0; i < this.box; i++) {
                this.list[i] = new Mineobj();
            }
            this.setbomb(this.level)

        },

    },
    props:{
        level: {
            type: Number
        }
    },
    created:function (){
         this.init();
    },
    mounted:function(){
        // console.log(this.list);
        this.domlist = document.querySelectorAll('.mine-item')
        //  console.log(this.$refs.container.appendChild);


    }

}
</script>

<style lang="scss" scoped>
.mine-container{
    width: 90%;
    margin: 5vw auto;
    text-align: center;

    .open-1{
        font-size: 16px;
        background-color: #555;
        color: rgb(28, 175, 224);
        font-weight: bold;
    }
    .open-2{
        font-size: 16px;
        background-color: #555;
        color: rgb(214, 154, 25);
        font-weight: bold;
    }
    .open-3{
        font-size: 16px;
        background-color: #555;
        color: rgb(96, 250, 96);
        font-weight: bold;
    }
    .open-4{
        font-size: 16px;
        background-color: #555;
        color: rgb(51, 99, 196);
        font-weight: bold;
    }
    .open-0{
        font-size: 0;
        background-color: #555;
    }
}
.mine-item{
    display: inline-block;
    width: 8vw;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    border: 1px black solid;
    margin: 1px;
    border-radius: 5px;
    font-size: 0;
    vertical-align: top;
    background-color: #fff;
}

</style>
