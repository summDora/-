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
                                
              <a-form-item label="用户Id">
                <a-input placeholder="请输入用户Id" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="用户昵称">
                <a-input placeholder="请输入用户昵称" v-decorator="['userName']"/>
              </a-form-item>

                                
              <a-form-item label="用户头像">
                <a-input placeholder="请输入用户头像" v-decorator="['headImg']"/>
              </a-form-item>

                                
              <a-form-item label="用户性别(1.男 2.女)">
                <a-input placeholder="请输入用户性别(1.男 2.女)" v-decorator="['sex']"/>
              </a-form-item>

                                
              <a-form-item label="里程">
                <a-input placeholder="请输入里程" v-decorator="['mileage']"/>
              </a-form-item>

                                
              <a-form-item label="时长">
                <a-input placeholder="请输入时长" v-decorator="['duration']"/>
              </a-form-item>

                                
              <a-form-item label="步数">
                <a-input placeholder="请输入步数" v-decorator="['step']"/>
              </a-form-item>

                                
              <a-form-item label="卡路里">
                <a-input placeholder="请输入卡路里" v-decorator="['cal']"/>
              </a-form-item>

                                
              <a-form-item label="变速CODE">
                <a-input placeholder="请输入变速CODE" v-decorator="['speedCode']"/>
              </a-form-item>

                                
              <a-form-item label="速度类型名称">
                <a-input placeholder="请输入速度类型名称" v-decorator="['speedName']"/>
              </a-form-item>

                                
              <a-form-item label="速度类型时长">
                <a-input placeholder="请输入速度类型时长" v-decorator="['speedDuration']"/>
              </a-form-item>

                                
              <a-form-item label="跟跑率">
                <a-input placeholder="请输入跟跑率" v-decorator="['heelRun']"/>
              </a-form-item>

                                
              <a-form-item label="备用(实际速度逗号间隔)">
                <a-input placeholder="请输入备用(实际速度逗号间隔)" v-decorator="['actualSpeed']"/>
              </a-form-item>

                                
              <a-form-item label="备用(实际时长逗号间隔)">
                <a-input placeholder="请输入备用(实际时长逗号间隔)" v-decorator="['actualDuration']"/>
              </a-form-item>

                                
              <a-form-item label="1.未完成 2.已完成">
                <a-input placeholder="请输入1.未完成 2.已完成" v-decorator="['status']"/>
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
            post('/treadmill/treadmillsmartspeedlog/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmillsmartspeedlog/add', values).then(() => {

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
