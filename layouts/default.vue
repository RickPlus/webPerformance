<template>
  <Layout class="main" :style="{height: '100%'}">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :collapsed="collapsed"></side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <div class="header-bar">
          <a @click="collapsed = !collapsed" type="text" :class="['side-trigger-a', collapsed ? 'collapsed' : '']"><Icon type="md-menu" :size="26" /></a>
          <div class="custom-content-con">
            <div class="user-avator-dropdown">
              <Dropdown>
                <Avatar :src="require('~/assets/images/home.gif')"></Avatar>
                <Icon :size="18" type="md-arrow-dropdown"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem name="logout" @click.native="loginOut">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
      <Content>
        <nuxt />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from '~/components/layout/SideMenu'
export default {
  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    loginOut () {
      window.Cookie.remove('token')
      location.href = '/login'
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
}
</style>
