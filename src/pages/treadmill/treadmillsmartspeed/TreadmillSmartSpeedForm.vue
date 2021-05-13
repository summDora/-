<template>
  <a-drawer
      :title="name?'修改菜单':'新增菜单'"
      width="30%"
      :maskClosable="false"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false">
    <a-form :form="form" v-bind="layout">
                                  <a-form-item hidden label="ID">
                <a-input placeholder="请输入ID" v-decorator="['id']"/>
              </a-form-item>
                                
              <a-form-item label="运动类型名称">
                <a-input placeholder="请输入运动类型名称" v-decorator="['speedName']"/>
              </a-form-item>

                                
              <a-form-item label="运动类型(S1初级 S2中级 S3高级 S4专家)">
                <a-input placeholder="请输入运动类型(S1初级 S2中级 S3高级 S4专家)" v-decorator="['speedCode']"/>
              </a-form-item>

                                
              <a-form-item label="随机code(A1 A2 A3)">
                <a-input placeholder="请输入随机code(A1 A2 A3)" v-decorator="['randomCode']"/>
              </a-form-item>

                                
              <a-form-item label="运动名称(慢走慢跑快跑)">
                <a-input placeholder="请输入运动名称(慢走慢跑快跑)" v-decorator="['sportName']"/>
              </a-form-item>

                                
              <a-form-item label="阶段名称(P1)">
                <a-input placeholder="请输入阶段名称(P1)" v-decorator="['detailName']"/>
              </a-form-item>

                                
              <a-form-item label="总运动时长">
                <a-input placeholder="请输入总运动时长" v-decorator="['totalDuration']"/>
              </a-form-item>

                                
              <a-form-item label="区间时长">
                <a-input placeholder="请输入区间时长" v-decorator="['betweenDuration']"/>
              </a-form-item>

                                
              <a-form-item label="开始时长">
                <a-input placeholder="请输入开始时长" v-decorator="['startDuration']"/>
              </a-form-item>

                                
              <a-form-item label="结束时长">
                <a-input placeholder="请输入结束时长" v-decorator="['endDuration']"/>
              </a-form-item>

                                
              <a-form-item label="排序">
                <a-input placeholder="请输入排序" v-decorator="['sort']"/>
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
            post('/treadmill/treadmillsmartspeed/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmillsmartspeed/add', values).then(() => {

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
