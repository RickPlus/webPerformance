<template>
  <div class="side-menu-wrapper">
    <div class="logo-con">
      <p v-if="!collapsed">performance</p>
      <p v-else>wp</p>
    </div>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="(item, index) in menuList">
        <template v-if="item.children && item.children.length">
          <Submenu :name="`${index + 1}`" :key="index">
            <template slot="title">
              <Icon :type="item.icon" />
              {{item.name}}
            </template>
            <MenuItem v-for="(sub, subIndex) in item.children" :name="`${index + 1}-${subIndex + 1}`" :key="subIndex" :to="sub.path">
              <Icon :type="sub.icon" />
              {{sub.name}}
            </MenuItem>
          </Submenu>
        </template>
        <template v-else>
          <MenuItem :key="index" :name="`${index + 1}`" :to="item.path">
            <Icon :type="item.icon" :key="index" />
            {{item.name}}
          </MenuItem>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed">
      <template v-for="(item, index) in menuList">
        <template v-if="item.children && item.children.length">
          <Dropdown :key="index" transfer placement="right-start">
            <a href="javascript:void(0)" class="drop-menu-a">
              <Icon :type="item.icon" :size="iconSize" :color="iconColor" />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(sub, subIndex) in item.children" :key="subIndex">
                <nuxt-link :to="sub.path">
                  {{sub.name}}
                </nuxt-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
        <template v-else>
          <Tooltip transfer :key="index" placement="right" :content="item.name">
            <nuxt-link :to="item.path" class="drop-menu-a">
              <Icon :type="item.icon" :size="iconSize" :color="iconColor" />
            </nuxt-link>
          </Tooltip>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import MenuList from '~/utils/client/menu'

export default {
  name: 'sideMenu',
  data () {
    return {
      menuList: MenuList,
      iconSize: 20,
      iconColor: '#fff'
    }
  },
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: {
      type: Boolean
    },
    accordion: {
      type: Boolean
    }
  },
  computed: {
    menuFormat () {
      let arr = []
      MenuList.forEach((o, i) => {
        arr.push(Object.assign({}, o, {
          activeName: `${i + 1}`
        }))
        o.children && o.children.length && o.children.forEach((s, j) => {
          arr.push(Object.assign({}, s, {
            activeName: `${i + 1}-${j + 1}`,
            openedNames: [`${i + 1}`]
          }))
        })
      })
      return arr
    },
    activeName () {
      let { path } = this.$route
      let menu = this.menuFormat.find(o => o.path === path)
      return menu.activeName
    },
    openedNames () {
      let { path } = this.$route
      let menu = this.menuFormat.find(o => o.path === path)
      return menu.openedNames || []
    }
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    }
  }
}
</script>
<style lang="less">
.side-menu-wrapper{
  user-select: none;
  .menu-collapsed{
    padding-top: 10px;

    .ivu-dropdown{
      width: 100%;
      .ivu-dropdown-rel a{
        width: 100%;
      }
    }
    .ivu-tooltip{
      width: 100%;
      .ivu-tooltip-rel{
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content{
        .ivu-tooltip-arrow{
          border-right-color: #fff;
        }
        .ivu-tooltip-inner{
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a{
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
}
  .menu-title{
    padding-left: 6px;
  }

</style>
