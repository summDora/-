<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo_black.png" />
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">木卫六 重新定义跑步机 帮您一年运动100次</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="sp_123456"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <!-- <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="请输入验证码"  v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码', whitespace: true}]}]">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <img :src="codeImg" @click="getCode" class="codeimg" alt="验证码">
                </a-col>
              </a-row>
            </a-form-item> -->
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
// import {login, getRoutesConfig} from '@/services/user'
// import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

import { getVerify,get,getAccessToken } from '@/assets/api/index'
import {setToken} from '@/utils/auth'


export default {
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      codeImg:''
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  created() {
    // this.getCode();
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    getCode(){
      getVerify().then(res=>{
        console.log(res);
        this.codeImg=window.URL.createObjectURL(res)
      })
    },
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          getAccessToken(this.form.getFieldValue('name'),this.form.getFieldValue('password'),).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res
      console.log(res);
        let token=loginRes.token_type+' '+loginRes.access_token
        this.setUser(this.form.getFieldValue('name'))
        this.setPermissions(' ')
        this.setRoles(' ')
        setToken(token)
        console.log(this.$store)
        // setAuthorization({token: loginRes.data.accessToken})
        // 获取路由配置
        get('/api-sys/sys/menu/current').then(result => {
          console.log(result,'--')
          let list=[]
          let iconList=['alert','api','appstore','bank','book','bug','build','cloud','crown','dashboard','container','gift','user','project','hdd','rest','rocket','skin','tool','gateway','global']
          let index=0;
          result.content.map(item=>{
            if(item.pcode && item.pcode==0 && item.type==1){
              let btn=true
              list.map(i=>{
                if(i.id==item.id){
                  btn=false
                }
              })
              if(btn){
                item.children=[]
                item.icon=iconList[index]
                list.push(item)
                index++;
              }
            }
          })
          result.content.map(item=>{
            let btn=true
            if(item.pcode!=0){
              list.map(parent=>{
                if(parent.id==item.pcode && item.type==1){
                  parent.children.map(son=>{
                    if(son.id==item.id){
                      btn=false
                    }
                  })
                  if(btn){
                    item.icon=null
                    parent.children.push(item)
                  }
                }
              })
            }
          })
          console.log(list,'----------------')
          const routesConfig = list
          loadRoutes(routesConfig)
          this.$router.push({ path: '/welcome' })
          this.$message.success('登录成功', 3)
        })
    },
    onClose() {
      this.error = false
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
  .codeimg{
    height: 40px;
    margin-top: -5px;
  }
</style>
