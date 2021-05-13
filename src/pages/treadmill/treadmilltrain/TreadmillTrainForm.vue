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
                                
              <a-form-item label="训练名称">
                <a-input placeholder="请输入训练名称" v-decorator="['trainName']"/>
              </a-form-item>

                                
              <a-form-item label="最大速度">
                <a-input placeholder="请输入最大速度" v-decorator="['maxSpeed']"/>
              </a-form-item>

                                
              <a-form-item label="最小时间">
                <a-input placeholder="请输入最小时间" v-decorator="['minDuration']"/>
              </a-form-item>

                                
              <a-form-item label="最大时间">
                <a-input placeholder="请输入最大时间" v-decorator="['maxDuration']"/>
              </a-form-item>

                                
              <a-form-item label="最大坡度">
                <a-input placeholder="请输入最大坡度" v-decorator="['maxSlope']"/>
              </a-form-item>

                                
              <a-form-item label="最大距离">
                <a-input placeholder="请输入最大距离" v-decorator="['maxMileage']"/>
              </a-form-item>

                                
              <a-form-item label="训练图片">
                <a-input placeholder="请输入训练图片" v-decorator="['trainImg']"/>
              </a-form-item>

                                
              <a-form-item label="训练视频">
                <a-input placeholder="请输入训练视频" v-decorator="['trainVideo']"/>
              </a-form-item>

                                
              <a-form-item label="类型1 普通训练,2 视频训练">
                <a-input placeholder="请输入类型1 普通训练,2 视频训练" v-decorator="['type']"/>
              </a-form-item>

                                
              <a-form-item label="排序">
                <a-input placeholder="请输入排序" v-decorator="['sort']"/>
              </a-form-item>

                                
              <a-form-item label="状态">
                <a-input placeholder="请输入状态" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="时间线">
                <a-input placeholder="请输入时间线" v-decorator="['timeLine']"/>
              </a-form-item>

                                
              <a-form-item label="速度线">
                <a-input placeholder="请输入速度线" v-decorator="['speedLine']"/>
              </a-form-item>

                                
              <a-form-item label="坡度线">
                <a-input placeholder="请输入坡度线" v-decorator="['slopeLine']"/>
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
            post('/treadmill/treadmilltrain/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmilltrain/add', values).then(() => {

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
