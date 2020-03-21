<template>
   <ul class="list">
       <li class="item" v-for="item of letters" :key="item"
       :ref="item"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd"
       @click="handleLetterClick">
       <!-- 绑定事件 -->
       {{item}}
       </li>     
   </ul>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';
export default {
    name: 'CityAlphabet',
    props: {
        cities: Object
    },
    computed: {
        letters () {
            const letters = []
            for (let i in this.cities) {
                letters.push(i)
            }
            return letters
        }
    },
    data () {
        return {
            touchStatus: false,
            startY:0,
            timer:null
        }
    },
    update () {
        this.startY=this.$refs['A'] [0].offsetTop
    },
    methods: {
        handleLetterClick (e) {
            console.log(e)
            console.log(e.target.innerText)
            this.$emit('change',e.target.innerText)   //向外触发事件
        },
        handleTouchStart () {
            this.touchStatus=true
        },
        handleTouchMove (e) {
            if (this.touchStatus) {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    const touchY = e.touches[0].clientY - 79
                    const index = Math.floor((touchY- this.startY) / 20)
                    if (index >= 0 && index <this.letters.length) {
                    this.$emit('change', this.letters[index])
                    }
                }, 16)
            }
        },
        handleTouchEnd () {
            this.touchStatus = false
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .list
        display: flex
        flex-direction :column
        justify-content :center
        position: absolute
        // top: 1.58rem
        top:1.58rem
        right: 0
        bottom :0
        width :.4rem
        .item
            line-height :.6rem
            text-align :center
            color: $bgColor
            font-size: 0.5rem;
</style>