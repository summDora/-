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
                                                          <a-form-item label="level_start_name">
                <a-input placeholder="level_start_name" v-decorator="['levelStartName']"/>
              </a-form-item>
                                      <a-form-item label='level_start_name'>
                <a-input-number v-decorator="['levelStartName' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="level_start_name">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'levelStartName',]"
                    :placeholder="`level_start_name`"/>
              </a-form-item>
                                                          <a-form-item label="level_end_name">
                <a-input placeholder="level_end_name" v-decorator="['levelEndName']"/>
              </a-form-item>
                                      <a-form-item label='level_end_name'>
                <a-input-number v-decorator="['levelEndName' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="level_end_name">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'levelEndName',]"
                    :placeholder="`level_end_name`"/>
              </a-form-item>
                                                          <a-form-item label="level_start_exp">
                <a-input placeholder="level_start_exp" v-decorator="['levelStartExp']"/>
              </a-form-item>
                                      <a-form-item label='level_start_exp'>
                <a-input-number v-decorator="['levelStartExp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="level_start_exp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'levelStartExp',]"
                    :placeholder="`level_start_exp`"/>
              </a-form-item>
                                                          <a-form-item label="level_end_exp">
                <a-input placeholder="level_end_exp" v-decorator="['levelEndExp']"/>
              </a-form-item>
                                      <a-form-item label='level_end_exp'>
                <a-input-number v-decorator="['levelEndExp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="level_end_exp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'levelEndExp',]"
                    :placeholder="`level_end_exp`"/>
              </a-form-item>
                                                          <a-form-item label="level_num">
                <a-input placeholder="level_num" v-decorator="['levelNum']"/>
              </a-form-item>
                                      <a-form-item label='level_num'>
                <a-input-number v-decorator="['levelNum' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="level_num">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'levelNum',]"
                    :placeholder="`level_num`"/>
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
            post('/app/appuserlevel/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserlevel/add', values).then(() => {

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
