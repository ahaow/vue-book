<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  mixins: [ebookMixin],
  methods: {
    initEpub(url) {
      const baseUrl =
        "http://192.168.0.101:8383/epub/" + this.fileName + ".epub";
      this.book = new Epub(baseUrl)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      this.rendition.display();
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        event.preventDefault();
        event.stopPropagation();
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        // console.log("offsetX",offsetX)
        // console.log("time",time)
        // 从左往右 进入上一页
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          // 从右往左 进入下一页
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => { console.log("are you ok") })
        })
      });
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
        this.hideTitleAndMenu();
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
        this.hideTitleAndMenu();
      }
    },
    toggleTitleAndMenu() {
      if(this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split("|").join("/");
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  }
};
</script>
