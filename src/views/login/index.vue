<template>
  <div>
    <van-nav-bar title="登录" />
    <van-row justify="center" align="center" style="padding-top: 100px">
      <van-form @submit="doLogin">
        <van-cell-group inset>
          <van-field
            v-model="loginInfo.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginInfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-row>
  </div>
</template>

<script>
// 使用vant 组件
import { Button, CellGroup, Col, Field, Form, Row, NavBar, Toast } from 'vant'
// 接口
import { loginById } from '@/api/auth'

export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin() {
      loginById(this.loginInfo)
        .then(response => {
          console.log(response)
          Toast.success('登录成功')
          this.$router.push('/')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped></style>
