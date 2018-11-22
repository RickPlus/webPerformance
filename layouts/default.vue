<template>
  <Layout class="main" :style="{height: '100%'}">
    <Sider hide-trigger collapsible width="256" collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :collapsed="collapsed"></side-menu>
    </Sider>
    <Layout>
      <content-header :collapsed="collapsed" @changeStatus="changeStatus"></content-header>
      <Content class="container-wrapper">
        <div class="container">
          <div class="container-body">
            <nuxt />
          </div>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from '~/components/layout/SideMenu'
import ContentHeader from '~/components/layout/ContentHeader'
export default {
  components: {
    SideMenu,
    ContentHeader
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    changeStatus () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less">
.main{
  .logo-con{
    height: 64px;
    line-height: 44px;
    padding: 10px;
    color: #fff;
    text-align: center;
    font-size: 28px;
    img{
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
  .header-con{
    background: #fff;
    padding: 0 20px;
    width: 100%;
    .side-trigger-a{
      padding: 6px;
      width: 40px;
      height: 40px;
      display: inline-block;
      text-align: center;
      color: #5c6b77;
      margin-top: 12px;
      i{
        transition: transform .2s ease;
        vertical-align: top;
      }
      &.collapsed i{
        transform: rotateZ(90deg);
        transition: transform .2s ease;
      }
    }
    .custom-content-con{
      float: right;
      height: auto;
      line-height: 64px;
      padding-right: 20px;
    }
  }
  .main-layout-con{
    height: 100%;
    overflow: hidden;
  }
  .main-content-con{
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }
  .tag-nav-wrapper{
    padding: 0;
    height:40px;
    background:#F0F0F0;
  }
  .content-wrapper{
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
  }
  .left-sider{
    .ivu-layout-sider-children{
      overflow-y: scroll;
      margin-right: -18px;
    }
  }
}
.ivu-menu-item > i{
  margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}
.collased-menu-dropdown{
  width: 100%;
  margin: 0;
  line-height: normal;
  padding: 7px 0 6px 16px;
  clear: both;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover{
    background: rgba(100, 100, 100, 0.1);
  }
  & * {
    color: #515a6e;
  }
  .ivu-menu-item > i{
    margin-right: 12px !important;
  }
  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
}

.ivu-select-dropdown.ivu-dropdown-transfer{
  max-height: 400px;
  a{
    color: #515a6e;
    &.active{
      color: #2d8cf0;
      background: #363e4f;
    }
  }
  .ivu-dropdown-item{
    a.active{
      background: transparent;
    }
  }
}
.container-wrapper {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  .container{
    background: #fff;
    border: 1px solid #e8eaec;
    border-radius: 4px;
    .container-body{
      padding: 20px;
    }
  }
  .search-con{
    padding: 10px 0;
  }
}
</style>
