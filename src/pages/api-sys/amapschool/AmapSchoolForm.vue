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
                                
              <a-form-item label="学校名称">
                <a-input placeholder="请输入学校名称" v-decorator="['name']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['type']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['typecode']"/>
              </a-form-item>

                                
              <a-form-item label="学校地址">
                <a-input placeholder="请输入学校地址" v-decorator="['address']"/>
              </a-form-item>

                                
              <a-form-item label="定位">
                <a-input placeholder="请输入定位" v-decorator="['location']"/>
              </a-form-item>

                                
              <a-form-item label="省code">
                <a-input placeholder="请输入省code" v-decorator="['pcode']"/>
              </a-form-item>

                                
              <a-form-item label="省名称">
                <a-input placeholder="请输入省名称" v-decorator="['pname']"/>
              </a-form-item>

                                
              <a-form-item label="市code">
                <a-input placeholder="请输入市code" v-decorator="['citycode']"/>
              </a-form-item>

                                
              <a-form-item label="市名称">
                <a-input placeholder="请输入市名称" v-decorator="['cityname']"/>
              </a-form-item>

                                
              <a-form-item label="地区code">
                <a-input placeholder="请输入地区code" v-decorator="['adcode']"/>
              </a-form-item>

                                
              <a-form-item label="地区名称">
                <a-input placeholder="请输入地区名称" v-decorator="['adname']"/>
              </a-form-item>

                                
              <a-form-item label="学校,1小学,2初中,3 高中,4小学中学,5.初中高中,6.小初高">
                <a-input placeholder="请输入学校,1小学,2初中,3 高中,4小学中学,5.初中高中,6.小初高" v-decorator="['schoolType']"/>
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
            post('/system/amapSchool/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/system/amapSchool/add', values).then(() => {

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
