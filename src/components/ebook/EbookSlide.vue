<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item" :class="{'selected': currentTab === 1}"
                   @click="selectTab(1)"
              >{{$t('book.navigation')}}
              </div>
              <div class="content-page-tab-item" :class="{'selected': currentTab === 2}"
                   @click="selectTab(2)">
                {{$t('book.bookmark')}}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>

<script>
  import {ebookMixin} from "../../utils/mixin";
  import EbookSlideContents from './EbookSlideContents'
  import EbookBookMark from './EbookBookMark'
  import EbookLoading from './EbookLoading'

  export default {
    mixins: [ebookMixin],
    name: "EbookSlide",
    components: {
      EbookLoading,
    },
    data() {
      return {
        currentTab: 1,
        content: EbookSlideContents,
        bookmark: EbookBookMark
      }
    },
    methods: {
      selectTab(tab) {
        console.log(tab)
        this.currentTab = tab
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  @import "../../assets/styles/transition.scss";

  .slide-content-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 300;
    display: flex;

    .content {
      flex: 0 0 85%;
      width: 85%;
      height: 100%;

      .content-page-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }

        .content-page-tab {
          display: flex;
          flex: 0 0 px2rem(48);
          width: 100%;
          height: px2rem(48);

          .content-page-tab-item {
            flex: 1;
            font-size: px2rem(12);
            @include center;

            &.selected {
              color: red;
            }
          }
        }
      }

      .content-empty {
        width: 100%;
        height: 100%;
        @include center;
      }
    }

    .content-bg {
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
    }
  }

</style>
