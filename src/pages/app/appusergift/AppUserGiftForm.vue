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
                                                          <a-form-item label="gift_type">
                <a-input placeholder="gift_type" v-decorator="['giftType']"/>
              </a-form-item>
                                      <a-form-item label='gift_type'>
                <a-input-number v-decorator="['giftType' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="gift_type">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'giftType',]"
                    :placeholder="`gift_type`"/>
              </a-form-item>
                                                          <a-form-item label="gain_access">
                <a-input placeholder="gain_access" v-decorator="['gainAccess']"/>
              </a-form-item>
                                      <a-form-item label='gain_access'>
                <a-input-number v-decorator="['gainAccess' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="gain_access">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'gainAccess',]"
                    :placeholder="`gain_access`"/>
              </a-form-item>
                                                          <a-form-item label="gain_condition">
                <a-input placeholder="gain_condition" v-decorator="['gainCondition']"/>
              </a-form-item>
                                      <a-form-item label='gain_condition'>
                <a-input-number v-decorator="['gainCondition' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="gain_condition">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'gainCondition',]"
                    :placeholder="`gain_condition`"/>
              </a-form-item>
                                                          <a-form-item label="award_name">
                <a-input placeholder="award_name" v-decorator="['awardName']"/>
              </a-form-item>
                                      <a-form-item label='award_name'>
                <a-input-number v-decorator="['awardName' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="award_name">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'awardName',]"
                    :placeholder="`award_name`"/>
              </a-form-item>
                                                          <a-form-item label="award_image">
                <a-input placeholder="award_image" v-decorator="['awardImage']"/>
              </a-form-item>
                                      <a-form-item label='award_image'>
                <a-input-number v-decorator="['awardImage' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="award_image">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'awardImage',]"
                    :placeholder="`award_image`"/>
              </a-form-item>
                                                          <a-form-item label="award_count">
                <a-input placeholder="award_count" v-decorator="['awardCount']"/>
              </a-form-item>
                                      <a-form-item label='award_count'>
                <a-input-number v-decorator="['awardCount' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="award_count">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'awardCount',]"
                    :placeholder="`award_count`"/>
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
                                                          <a-form-item label="remark">
                <a-input placeholder="remark" v-decorator="['remark']"/>
              </a-form-item>
                                      <a-form-item label='remark'>
                <a-input-number v-decorator="['remark' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="remark">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'remark',]"
                    :placeholder="`remark`"/>
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
            post('/app/appusergift/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appusergift/add', values).then(() => {

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
