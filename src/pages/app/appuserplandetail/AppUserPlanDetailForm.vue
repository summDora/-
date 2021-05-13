<template>
  <a-drawer
      :title="name?'修改菜单':'新增菜单'"
      width="30%"
      :maskClosable="false"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false">
    <a-form :form="form" v-bind="layout">
                                  <a-form-item hidden label="id">
                <a-input placeholder="请输入id" v-decorator="['id']"/>
              </a-form-item>
                                      <a-form-item label="id">
                <a-input placeholder="id" v-decorator="['id']"/>
              </a-form-item>
                                      <a-form-item label='id'>
                <a-input-number v-decorator="['id' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="id">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'id',]"
                    :placeholder="`id`"/>
              </a-form-item>
                                                          <a-form-item label="user_id">
                <a-input placeholder="user_id" v-decorator="['userId']"/>
              </a-form-item>
                                      <a-form-item label='user_id'>
                <a-input-number v-decorator="['userId' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="user_id">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'userId',]"
                    :placeholder="`user_id`"/>
              </a-form-item>
                                                          <a-form-item label="plan_id">
                <a-input placeholder="plan_id" v-decorator="['planId']"/>
              </a-form-item>
                                      <a-form-item label='plan_id'>
                <a-input-number v-decorator="['planId' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="plan_id">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'planId',]"
                    :placeholder="`plan_id`"/>
              </a-form-item>
                                                          <a-form-item label="article_id">
                <a-input placeholder="article_id" v-decorator="['articleId']"/>
              </a-form-item>
                                      <a-form-item label='article_id'>
                <a-input-number v-decorator="['articleId' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="article_id">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'articleId',]"
                    :placeholder="`article_id`"/>
              </a-form-item>
                                                          <a-form-item label="step_name">
                <a-input placeholder="step_name" v-decorator="['stepName']"/>
              </a-form-item>
                                      <a-form-item label='step_name'>
                <a-input-number v-decorator="['stepName' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="step_name">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'stepName',]"
                    :placeholder="`step_name`"/>
              </a-form-item>
                                                          <a-form-item label="step_sort">
                <a-input placeholder="step_sort" v-decorator="['stepSort']"/>
              </a-form-item>
                                      <a-form-item label='step_sort'>
                <a-input-number v-decorator="['stepSort' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="step_sort">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'stepSort',]"
                    :placeholder="`step_sort`"/>
              </a-form-item>
                                                          <a-form-item label="source">
                <a-input placeholder="source" v-decorator="['source']"/>
              </a-form-item>
                                      <a-form-item label='source'>
                <a-input-number v-decorator="['source' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="source">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'source',]"
                    :placeholder="`source`"/>
              </a-form-item>
                                                          <a-form-item label="status">
                <a-input placeholder="status" v-decorator="['status']"/>
              </a-form-item>
                                      <a-form-item label='status'>
                <a-input-number v-decorator="['status' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="status">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'status',]"
                    :placeholder="`status`"/>
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
            post('/app/appuserplandetail/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserplandetail/add', values).then(() => {

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
