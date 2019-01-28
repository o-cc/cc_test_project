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


  .search {
    width: 95%;
    height: 1.5rem;
    margin: 0rem auto 0;
    position: relative;

    .weui-search-bar {
      padding: 0;
      background: none;

      .weui-search-bar__form {
        padding: 8px 10px;

        .weui-search-bar__label {
          display: flex;
          justify-content: center;
          align-items: center;

        }
      }

      .weui-search-bar__cancel-btn {
        display: none !important;
      }

    }

  }


</style>
