<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: #f8f8f8;
    width: 100%;
    height: 100%;
   
  }

  *{ touch-action: none;  }
  @media  screen and (min-width: 780px) {
     #app {
        width: 780px;
        margin: 0 auto;
     }
     body {
      background: #f8f8f8;
     }
  }

</style>
