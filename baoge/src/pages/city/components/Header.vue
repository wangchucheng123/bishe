<template>
   <div class="header">
       城市选择
       <router-link to="/">
       <!-- <router-link to="/">类似于HTML的<a>标签，“/”是返回根路径 -->
       <div class="iconfont header-back">&#xe624;</div>
       </router-link>
   </div>
</template>

<script>
export default {
    name: 'CityHeader'
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
        .header
            position:relative
            overflow: hidden
            height:$headerHeader
            line-height: $headerHeader
            text-align :center
            color:#fff
            background :$bgColor
            font-size:.4rem
            .header-back
                position: absolute
                top:0
                left :0
                width :.64rem
                texe-align:content 
                font-size:.4rem
                color :#fff
</style>