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
                                
              <a-form-item label="跑步机sn">
                <a-input placeholder="请输入跑步机sn" v-decorator="['sn']"/>
              </a-form-item>

                                
              <a-form-item label="vipId(预留)">
                <a-input placeholder="请输入vipId(预留)" v-decorator="['vipId']"/>
              </a-form-item>

                                
              <a-form-item label="用户ID">
                <a-input placeholder="请输入用户ID" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="VIP开始时间">
                <a-input placeholder="请输入VIP开始时间" v-decorator="['vipStartDate']"/>
              </a-form-item>

                                
              <a-form-item label="VIP结束时间">
                <a-input placeholder="请输入VIP结束时间" v-decorator="['vipEndDate']"/>
              </a-form-item>

                                
              <a-form-item label="1.领取 2.购买">
                <a-input placeholder="请输入1.领取 2.购买" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="消费单号">
                <a-input placeholder="请输入消费单号" v-decorator="['costNum']"/>
              </a-form-item>

                                
              <a-form-item label="星星数量">
                <a-input placeholder="请输入星星数量" v-decorator="['missionNum']"/>
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
            post('/treadmill/treadmillviplog/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmillviplog/add', values).then(() => {

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
