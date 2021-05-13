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
                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['platformName']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['platformId']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="关联时间">
                <a-input placeholder="请输入关联时间" v-decorator="['bindDate']"/>
              </a-form-item>

                                
              <a-form-item label="真实姓名">
                <a-input placeholder="请输入真实姓名" v-decorator="['reUserName']"/>
              </a-form-item>

                                
              <a-form-item label="手机号">
                <a-input placeholder="请输入手机号" v-decorator="['mobile']"/>
              </a-form-item>

                                
              <a-form-item label="支付宝账户">
                <a-input placeholder="请输入支付宝账户" v-decorator="['alipayNo']"/>
              </a-form-item>

                                
              <a-form-item label="状态">
                <a-input placeholder="请输入状态" v-decorator="['status']"/>
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
            post('/app/appuserbind/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserbind/add', values).then(() => {

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
