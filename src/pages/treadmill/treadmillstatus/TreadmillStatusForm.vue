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
                                
              <a-form-item label="用户ID">
                <a-input placeholder="请输入用户ID" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="sn">
                <a-input placeholder="请输入sn" v-decorator="['sn']"/>
              </a-form-item>

                                
              <a-form-item label="状态">
                <a-input placeholder="请输入状态" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="里程">
                <a-input placeholder="请输入里程" v-decorator="['mileage']"/>
              </a-form-item>

                                
              <a-form-item label="头像">
                <a-input placeholder="请输入头像" v-decorator="['headImg']"/>
              </a-form-item>

                                
              <a-form-item label="昵称">
                <a-input placeholder="请输入昵称" v-decorator="['nickname']"/>
              </a-form-item>

                                
              <a-form-item label="性别">
                <a-input placeholder="请输入性别" v-decorator="['sex']"/>
              </a-form-item>

                                
              <a-form-item label="动作名称">
                <a-input placeholder="请输入动作名称" v-decorator="['actionName']"/>
              </a-form-item>

                                
              <a-form-item label="指定房间ID如果有">
                <a-input placeholder="请输入指定房间ID如果有" v-decorator="['actionId']"/>
              </a-form-item>

                                
              <a-form-item label="步数">
                <a-input placeholder="请输入步数" v-decorator="['step']"/>
              </a-form-item>

                                
              <a-form-item label="卡路里">
                <a-input placeholder="请输入卡路里" v-decorator="['cal']"/>
              </a-form-item>

                                
              <a-form-item label="停留时长">
                <a-input placeholder="请输入停留时长" v-decorator="['duration']"/>
              </a-form-item>

                                
              <a-form-item label="0.无效数据 1.有效数据">
                <a-input placeholder="请输入0.无效数据 1.有效数据" v-decorator="['flag']"/>
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
            post('/treadmill/treadmillstatus/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmillstatus/add', values).then(() => {

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
