<template>
  <Header class="header-con">
    <div class="header-bar">
      <a @click="trigger" type="text" :class="['side-trigger-a', collapsed ? 'collapsed' : '']"><Icon type="md-menu" size="26" /></a>
      <div class="custom-content-con">
        <div class="user-avator-dropdown">
          <Dropdown>
            <Avatar :src="require('~/assets/images/home.gif')"></Avatar>
            <Icon size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="logout" @click.native="loginOut">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Dropdown trigger="click" @on-click="select" v-if="appIdTableList && appIdTableList.length">
            <a href="javascript:void(0)">
              {{title}}
              <Icon size="18" type="md-arrow-dropdown" />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item, index) in appIdTableList" :key="index" :name="item.id">{{ item.desc }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  </Header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ContentHeader',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  computed: {
    ...mapState('settings', ['appIdTableList']),
    ...mapState('auth', ['default_app_id']),
    title () {
      let item = this.appIdTableList.find(o => o.id === this.default_app_id)
      return item ? item.desc : ''
    }
  },
  methods: {
    loginOut () {
      window.Cookie.remove('token')
      location.href = '/login'
    },
    trigger () {
      this.$emit('changeStatus')
    },
    select (id) {
      this.$store.dispatch('auth/clientSelectAppId', id)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
.custom-content-con>* {
  float: right;
  margin-right: 10px;
  &:first-child{
    margin-right:0;
  }
}
</style>

<style scoped>

</style>
