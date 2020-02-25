import {mapGetters, mapActions} from 'vuex'
import {addCss, removeAllCss, themeList} from './book';
import {getReadTime, saveLocation} from "./localStorage";

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case "Default":
          addCss(`http://192.168.0.102:8383/theme/theme_default.css`)
          break
        case "Eye":
          addCss(`http://192.168.0.102:8383/theme/theme_eye.css`)
          break
        case "Gold":
          addCss(`http://192.168.0.102:8383/theme/theme_gold.css`)
          break
        case "Night":
          addCss(`http://192.168.0.102:8383/theme/theme_night.css`)
          break
        default:
          addCss(`http://192.168.0.102:8383/theme/theme_default.css`)
          break
      }
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
      }
    },
    display(target,cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if(cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if(cb) cb()
        })
      }
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1',this.getReadTimeByMinute(this.fileName))
    },
    getReadTimeByMinute(fileName) {
      const readTime = getReadTime(fileName)
      if(!readTime) {
        return 0
      } else {
        return Math.ceil(readTime / 60)
      }
    }
  },
}
