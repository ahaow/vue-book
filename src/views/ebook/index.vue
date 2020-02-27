<template>
  <div class="ebook" ref="ebook">
    <ebook-header></ebook-header>
    <ebook-title></ebook-title>
    <router-view></router-view>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
  import EbookHeader from "../../components/ebook/EbookHeader";
  import EbookFooter from "../../components/ebook/EbookFooter";
  import EbookTitle from "../../components/ebook/EbookTitle";
  import EbookMenu from "../../components/ebook/EbookMenu";
  import EbookBookMark from "../../components/ebook/EbookBookMark";
  import {getReadTime, saveReadTime} from "../../utils/localStorage";
  import {ebookMixin} from "../../utils/mixin";

  export default {
    name: "ebook",
    mixins: [ebookMixin],
    components: {
      EbookFooter,
      EbookHeader,
      EbookTitle,
      EbookMenu,
      EbookBookMark
    },
    watch: {
      offsetY(v) {
        if(!this.menuVisible && this.bookAvailable) {
          if (v > 0) {
            this.move(v)
          } else if (v === 0) {
            this.restore()
          }
        }
      }
    },
    methods: {
      move(v) {
        this.$refs.ebook.style.top = v + "px"
      },
      restore() {
        this.$refs.ebook.style.top = 0
        this.$refs.ebook.style.transition = "all .2s linear"
        setTimeout(() => {
          this.$refs.ebook.style.transition = ""
        },200)
      },
      startLoopReadTime() {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted() {
      this.startLoopReadTime()
    },
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
