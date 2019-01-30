<template>
  <div class="swiper-container">
    <login v-if="login"></login>
    <hotelPage v-if="hotelPage"></hotelPage>

  </div>
</template>

<script>
  import login     from "./login"
  import hotelPage from "./hotelPage"

  export default {
    name: "index",
    mounted() {
      this.run();
    },
    components: {
      login,
      hotelPage
    },
    data() {
      return {
          login: false,
          hotelPage: true
      };
    },
    methods: {
      run () {


      }
    }
  };

</script>

<style scoped lang="scss">
  .swiper-container {
    width: 100%;
    height: 100%;
  }

</style>
