<template>
  <div class="login">
    <div class="login-con">
      <Card
        :bordered="false"
        icon="log-in"
        title="欢迎登录"
      >
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/login/LoginForm'
import { mapState } from 'vuex'

export default {
  components: {
    LoginForm
  },
  layout: 'blank',
  computed: {
    ...mapState('auth', ['token'])
  },
  methods: {
    async handleSubmit (data) {
      await this.$store.dispatch('auth/login', data)
      if (this.token) {
        window.Cookie.set('token', this.token)
        await this.$store.dispatch('auth/getCurrentUserInfo')
        await this.$store.dispatch('settings/getAppIdTableList')
        this.$router.push(this.$route.query.r || '/')
      }
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  &-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
