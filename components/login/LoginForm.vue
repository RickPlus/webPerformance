<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="userName">
      <i-input
        v-model="form.name"
        placeholder="请输入用户名"
      >
      <span slot="prepend">
        <Icon
          size="16"
          type="ios-person"
        />
      </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
      >
      <span slot="prepend">
        <Icon
          size="14"
          type="md-lock"
        />
      </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        long
        @click="handleSubmit"
      >登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    nameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  data () {
    return {
      form: {
        name: 'admin',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        name: this.nameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            name: this.form.name,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
