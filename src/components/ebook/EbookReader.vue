<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import {ebookMixin} from "../../utils/mixin";
  import Epub from "epubjs";
  import {
    getFontFamily,
    getFontSize,
    getLocalStorage, getLocation, getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from "../../utils/localStorage";
  import {flatten} from "../../utils/book";

  global.ePub = Epub;
  export default {
    mixins: [ebookMixin],
    methods: {
      initRedition() {
        this.rendition = this.book.renderTo("read", {
          width: window.innerWidth,
          height: window.innerHeight,
        });
        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initFontSize()
          this.initFontFamily()
          this.initTheme()
          this.initGlobalStyle()
        })
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => {
            console.log("are you ok")
          })
        })
      },
      initGesture() {
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

        });
      },
      parseBook() {
        this.book.loaded.cover.then((cover) => {
          this.book.archive.createUrl(cover).then((url) => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc)
          function find(item, level = 0) {
            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }
          navItem.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItem)
        })
      },
      initEpub(url) {
        const baseUrl =
          "http://192.168.0.102:8383/epub/" + this.fileName + ".epub";
        this.book = new Epub(baseUrl)
        this.setCurrentBook(this.book)
        this.initRedition()
        this.initGesture()
        this.parseBook()
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then((locations) => {
          this.setBookAvailable(true);
          this.refreshLocation()
        })
      },
      initFontSize() {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(fontSize + "px")
          this.setDefaultFontSize(fontSize)
        }
      },
      initFontFamily() {
        let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initTheme() {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(defaultTheme)
      },
      prevPage() {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu();
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu();
        }
      },
      toggleTitleAndMenu() {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
      },
    },
    mounted() {
      const fileName = this.$route.params.fileName.split("|").join("/");
      this.setFileName(fileName).then(() => {
        this.initEpub();
      });
    }
  };
</script>
