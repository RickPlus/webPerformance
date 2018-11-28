<template>
  <div class="pageSettingsAppId">
    <p class="search-con">
      <Button icon="md-add" type="primary" @click="modify">添加appId</Button>
    </p>
    <Table border :columns="tableType" :data="appIdTableList"></Table>
    <Modal v-model="showConfirmModal" title="描述信息" @on-ok="confirm">
      <Input v-model="appIdDesc" placeholder="描述"/>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'appId',
  data () {
    return {
      tableType: [
        {
          title: '描述',
          key: 'desc'
        },
        {
          title: 'appId',
          key: 'id'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modify(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: params.row.is_default
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setDefault(params)
                  }
                }
              }, '设为默认'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showScript(params)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      showConfirmModal: false,
      appId: '',
      appIdDesc: ''
    }
  },
  computed: {
    ...mapState('settings', ['appIdTableList']),
    ...mapState('auth', ['default_app_id'])
  },
  methods: {
    modify (params) {
      this.appId = params && params.row && params.row.id ? params.row.id : ''
      this.appIdDesc = params && params.row && params.row.id ? params.row.desc : ''
      this.showConfirmModal = true
    },
    async confirm () {
      let data = { desc: this.appIdDesc }
      this.appId ? await this.$store.dispatch('settings/modifyAppId', { ...data, id: this.appId }) : await this.$store.dispatch('settings/addAppId', data)
      if (this.appIdTableList.length === 1) {
        this.$store.dispatch('auth/clientSelectAppId', this.appIdTableList[0].id)
      }
      this.showConfirmModal = false
    },
    async setDefault (params) {
      await this.$store.dispatch('auth/modifyUserInfo', {
        default_app_id: params.row.id
      })
      location.reload()
    },
    showScript (params) {
      this.$Modal.info({
        title: '脚本',
        width: 600,
        content: `
          &lt;script src="${location.origin}/p.js" type="text/javascript" crossorigin &gt;&lt;/script&gt;
          <br />
          &lt;script type="text/javascript" &gt;
          <br />
          window.PERFORMANCE_MONITOR_APPID = "${params.row.id}"
          <br />
          &lt;/script&gt;
        `
      })
    }
  }
}
</script>

<style>

</style>
