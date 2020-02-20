<template>
  <div>
    <ebook-title></ebook-title>
    <router-view></router-view>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookTitle from "../../components/ebook/EbookTitle.vue";
import EbookMenu from "../../components/ebook/EbookMenu.vue";
export default {
  name: "ebook",
  components: {
    EbookTitle,
    EbookMenu
  }
};
</script>