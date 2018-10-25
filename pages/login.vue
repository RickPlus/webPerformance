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
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit () {}
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
