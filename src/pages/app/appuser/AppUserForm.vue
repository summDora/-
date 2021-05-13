<template>
  <a-drawer
      :title="name?'修改菜单':'新增菜单'"
      width="30%"
      :maskClosable="false"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false">
    <a-form :form="form" v-bind="layout">
                                  <a-form-item hidden label="">
                <a-input placeholder="请输入" v-decorator="['id']"/>
              </a-form-item>
                                
              <a-form-item label="手机号">
                <a-input placeholder="请输入手机号" v-decorator="['phone']"/>
              </a-form-item>

                                
              <a-form-item label="昵称">
                <a-input placeholder="请输入昵称" v-decorator="['nickname']"/>
              </a-form-item>

                                
              <a-form-item label="姓名">
                <a-input placeholder="请输入姓名" v-decorator="['name']"/>
              </a-form-item>

                                
              <a-form-item label="密码">
                <a-input placeholder="请输入密码" v-decorator="['password']"/>
              </a-form-item>

                                
              <a-form-item label="邮箱">
                <a-input placeholder="请输入邮箱" v-decorator="['email']"/>
              </a-form-item>

                                
              <a-form-item label="性别 1男2 女">
                <a-input placeholder="请输入性别 1男2 女" v-decorator="['sex']"/>
              </a-form-item>

                                
              <a-form-item label="年龄">
                <a-input placeholder="请输入年龄" v-decorator="['age']"/>
              </a-form-item>

                                
              <a-form-item label="体重">
                <a-input placeholder="请输入体重" v-decorator="['weight']"/>
              </a-form-item>

                                
              <a-form-item label="身高">
                <a-input placeholder="请输入身高" v-decorator="['height']"/>
              </a-form-item>

                                
              <a-form-item label="头像">
                <a-input placeholder="请输入头像" v-decorator="['headImg']"/>
              </a-form-item>

                                
              <a-form-item label="身份证号">
                <a-input placeholder="请输入身份证号" v-decorator="['idCard']"/>
              </a-form-item>

                                
              <a-form-item label="状态,1,新用户,2,老用户,3禁用">
                <a-input placeholder="请输入状态,1,新用户,2,老用户,3禁用" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="是否已缴纳押金,0 未缴纳,1 已缴纳 ,2 已退押金">
                <a-input placeholder="请输入是否已缴纳押金,0 未缴纳,1 已缴纳 ,2 已退押金" v-decorator="['deposit']"/>
              </a-form-item>

                                
              <a-form-item label="余额">
                <a-input placeholder="请输入余额" v-decorator="['money']"/>
              </a-form-item>

                                
              <a-form-item label="实际充值金额">
                <a-input placeholder="请输入实际充值金额" v-decorator="['inMoney']"/>
              </a-form-item>

                                
              <a-form-item label="赠送金额">
                <a-input placeholder="请输入赠送金额" v-decorator="['largessMoney']"/>
              </a-form-item>

                                
              <a-form-item label="押金金额">
                <a-input placeholder="请输入押金金额" v-decorator="['depositMoney']"/>
              </a-form-item>

                                
              <a-form-item label="点位Id">
                <a-input placeholder="请输入点位Id" v-decorator="['pointId']"/>
              </a-form-item>

                                
              <a-form-item label="点位名称">
                <a-input placeholder="请输入点位名称" v-decorator="['pointName']"/>
              </a-form-item>

                                
              <a-form-item label="云信accid">
                <a-input placeholder="请输入云信accid" v-decorator="['socialUid']"/>
              </a-form-item>

                                
              <a-form-item label="云信token">
                <a-input placeholder="请输入云信token" v-decorator="['socialToken']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['pushToken']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['uuid']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['source']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['socialSource']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['lng']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['lat']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['province']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['city']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['area']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['addrDetail']"/>
              </a-form-item>

                                
              <a-form-item label="保险信息是否填写0,未填写,1已填写,2,跳过">
                <a-input placeholder="请输入保险信息是否填写0,未填写,1已填写,2,跳过" v-decorator="['insuranceStatus']"/>
              </a-form-item>

                                
              <a-form-item label="生日">
                <a-input placeholder="请输入生日" v-decorator="['birthday']"/>
              </a-form-item>

                                
              <a-form-item label="个性签名">
                <a-input placeholder="请输入个性签名" v-decorator="['idiograph']"/>
              </a-form-item>

                                
              <a-form-item label="是否已阅读跑步机引导">
                <a-input placeholder="请输入是否已阅读跑步机引导" v-decorator="['treadmillStatus']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['redpacketMoney']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['withdrawableRedpacketMoney']"/>
              </a-form-item>

                                
              <a-form-item label="家乐币">
                <a-input placeholder="请输入家乐币" v-decorator="['fitcoin']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机唯一标识Sn">
                <a-input placeholder="请输入跑步机唯一标识Sn" v-decorator="['sn']"/>
              </a-form-item>

                                
              <a-form-item label="正在做什么">
                <a-input placeholder="请输入正在做什么" v-decorator="['doing']"/>
              </a-form-item>

                                
              <a-form-item label="是否領取VIP(0,1)">
                <a-input placeholder="请输入是否領取VIP(0,1)" v-decorator="['presentVip']"/>
              </a-form-item>

                                
              <a-form-item label="微信openId">
                <a-input placeholder="请输入微信openId" v-decorator="['openId']"/>
              </a-form-item>

                                
              <a-form-item label="注册时间">
                <a-input placeholder="请输入注册时间" v-decorator="['registerDate']"/>
              </a-form-item>

                                
              <a-form-item label="在线状态(1.在线 2.空闲 3.离线)">
                <a-input placeholder="请输入在线状态(1.在线 2.空闲 3.离线)" v-decorator="['online']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机所在城市">
                <a-input placeholder="请输入跑步机所在城市" v-decorator="['treadCity']"/>
              </a-form-item>

                                
              <a-form-item label="用户类型0 普通用户,1,管理员,2,机器人">
                <a-input placeholder="请输入用户类型0 普通用户,1,管理员,2,机器人" v-decorator="['userType']"/>
              </a-form-item>

                                
              <a-form-item label="粉丝人数">
                <a-input placeholder="请输入粉丝人数" v-decorator="['fansNum']"/>
              </a-form-item>

                                
              <a-form-item label="关注人数">
                <a-input placeholder="请输入关注人数" v-decorator="['attentionNum']"/>
              </a-form-item>

                                
              <a-form-item label="1.成年人 2.青少年">
                <a-input placeholder="请输入1.成年人 2.青少年" v-decorator="['flag']"/>
              </a-form-item>

                                
              <a-form-item label="年级(1.一年级...12.高三)">
                <a-input placeholder="请输入年级(1.一年级...12.高三)" v-decorator="['grade']"/>
              </a-form-item>

                                
              <a-form-item label="学校">
                <a-input placeholder="请输入学校" v-decorator="['schoolId']"/>
              </a-form-item>

                                
              <a-form-item label="学校名称">
                <a-input placeholder="请输入学校名称" v-decorator="['schoolName']"/>
              </a-form-item>

                        </a-form>
    <div
        :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        textAlign: 'right',
        background: 'white',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="visible = false">
        取 消
      </a-button>
      <a-button type="primary" @click="submit">
        提 交
      </a-button>
    </div>
    <select-list ref="selectlist" @selectItem="selectItem"></select-list>
  </a-drawer>
</template>
<script>
  import { post} from "@/assets/api/index";

  export default {
    props: {
      menutype: String
    },
    data() {
      return {
        visible: false,
        name: false,
        form: this.$form.createForm(this),
        selectOption: [], // 下拉框选项
        fileList: [],
        layout: {labelCol: {span: 4}, wrapperCol: {span: 16}},
        rootAdd: true
      }
    },
    methods: {
      // 数据回显
      init(isEdit, row) {
        this.visible = true
        this.name = isEdit
        this.form.resetFields()
        if (row != undefined) {
          this.rootAdd = false
          if (isEdit) {
            // table编辑
            setTimeout(() => {
              this.form.setFieldsValue(row)
            }, 100);
          } else {
            // table新增
            setTimeout(() => {
              this.form.setFieldsValue()
            }, 100);
          }
        } else {
          // 顶部新增
          this.rootAdd = true
          setTimeout(() => {
            this.form.setFieldsValue()
          }, 100);
        }
      },


      // 数据提交
      submit() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          }

          if (this.name) {
            post('/app/appuser/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuser/add', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          }
        })
      }

    }
  }
</script>
