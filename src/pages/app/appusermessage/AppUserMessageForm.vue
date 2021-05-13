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
                                                          <a-form-item label="message_id">
                <a-input placeholder="message_id" v-decorator="['messageId']"/>
              </a-form-item>
                                      <a-form-item label='message_id'>
                <a-input-number v-decorator="['messageId' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="message_id">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'messageId',]"
                    :placeholder="`message_id`"/>
              </a-form-item>
                                                          <a-form-item label="send_time">
                <a-input placeholder="send_time" v-decorator="['sendTime']"/>
              </a-form-item>
                                      <a-form-item label='send_time'>
                <a-input-number v-decorator="['sendTime' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="send_time">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'sendTime',]"
                    :placeholder="`send_time`"/>
              </a-form-item>
                                                          <a-form-item label="title">
                <a-input placeholder="title" v-decorator="['title']"/>
              </a-form-item>
                                      <a-form-item label='title'>
                <a-input-number v-decorator="['title' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="title">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'title',]"
                    :placeholder="`title`"/>
              </a-form-item>
                                                          <a-form-item label="summary">
                <a-input placeholder="summary" v-decorator="['summary']"/>
              </a-form-item>
                                      <a-form-item label='summary'>
                <a-input-number v-decorator="['summary' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="summary">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'summary',]"
                    :placeholder="`summary`"/>
              </a-form-item>
                                                          <a-form-item label="content">
                <a-input placeholder="content" v-decorator="['content']"/>
              </a-form-item>
                                      <a-form-item label='content'>
                <a-input-number v-decorator="['content' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="content">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'content',]"
                    :placeholder="`content`"/>
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
                                                          <a-form-item label="type">
                <a-input placeholder="type" v-decorator="['type']"/>
              </a-form-item>
                                      <a-form-item label='type'>
                <a-input-number v-decorator="['type' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="type">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'type',]"
                    :placeholder="`type`"/>
              </a-form-item>
                                                          <a-form-item label="start_date">
                <a-input placeholder="start_date" v-decorator="['startDate']"/>
              </a-form-item>
                                      <a-form-item label='start_date'>
                <a-input-number v-decorator="['startDate' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="start_date">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'startDate',]"
                    :placeholder="`start_date`"/>
              </a-form-item>
                                                          <a-form-item label="end_date">
                <a-input placeholder="end_date" v-decorator="['endDate']"/>
              </a-form-item>
                                      <a-form-item label='end_date'>
                <a-input-number v-decorator="['endDate' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="end_date">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'endDate',]"
                    :placeholder="`end_date`"/>
              </a-form-item>
                                                          <a-form-item label="cover_photo">
                <a-input placeholder="cover_photo" v-decorator="['coverPhoto']"/>
              </a-form-item>
                                      <a-form-item label='cover_photo'>
                <a-input-number v-decorator="['coverPhoto' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="cover_photo">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'coverPhoto',]"
                    :placeholder="`cover_photo`"/>
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
            post('/app/appusermessage/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appusermessage/add', values).then(() => {

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
