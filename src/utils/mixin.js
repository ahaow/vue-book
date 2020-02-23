import {mapGetters, mapActions} from 'vuex'
import {addCss, removeAllCss, themeList} from './book';

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
  },
}
