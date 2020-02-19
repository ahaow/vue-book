<template>
  <div class="home">
    <span class="text">abcdefg</span>
    <div class="icon-bookmark"></div>
    <div id="read"></div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from "epubjs"
global.ePub = Epub
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['test'])
  },
  mounted() {
    this.$store.dispatch('setTest',10).then(() => {
      console.log(this.test)
    })

    this.book = new Epub('/2013_Book_AgriculturalImplicationsOfTheF.epub')
    console.log(this.book)
    this.book.renderTo('read',{
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>

<style lang="scss" scoped>
  .home {
    .text {
      // font-family: 'Days One';
      font-family: 'Cabin';
      color: orange;
      font-size: 22px;
    }
    .icon-bookmark {
      font-size: 50px;
    }
  }
</style>
