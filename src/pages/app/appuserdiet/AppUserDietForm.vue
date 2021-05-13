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
                <a-input placeholder="请输入id" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="日期">
                <a-input placeholder="请输入日期" v-decorator="['mealDate']"/>
              </a-form-item>

                                
              <a-form-item label="1-早餐 2-午餐 4-晚餐 8-加餐">
                <a-input placeholder="请输入1-早餐 2-午餐 4-晚餐 8-加餐" v-decorator="['mealType']"/>
              </a-form-item>

                                
              <a-form-item label="食谱名称">
                <a-input placeholder="请输入食谱名称" v-decorator="['recipeName']"/>
              </a-form-item>

                                
              <a-form-item label="食物量">
                <a-input placeholder="请输入食物量" v-decorator="['foodCount']"/>
              </a-form-item>

                                
              <a-form-item label="单位名称">
                <a-input placeholder="请输入单位名称" v-decorator="['unit']"/>
              </a-form-item>

                                
              <a-form-item label="摄入的卡路里">
                <a-input placeholder="请输入摄入的卡路里" v-decorator="['cal']"/>
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
            post('/app/appuserdiet/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserdiet/add', values).then(() => {

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
