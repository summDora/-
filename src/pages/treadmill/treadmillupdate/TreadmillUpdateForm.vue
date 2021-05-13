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
                                
              <a-form-item label="包名">
                <a-input placeholder="请输入包名" v-decorator="['packageName']"/>
              </a-form-item>

                                
              <a-form-item label="版本名称">
                <a-input placeholder="请输入版本名称" v-decorator="['name']"/>
              </a-form-item>

                                
              <a-form-item label="版本号">
                <a-input placeholder="请输入版本号" v-decorator="['code']"/>
              </a-form-item>

                                
              <a-form-item label="1.家庭 2.其他 3.全部">
                <a-input placeholder="请输入1.家庭 2.其他 3.全部" v-decorator="['type']"/>
              </a-form-item>

                                
              <a-form-item label="下载地址">
                <a-input placeholder="请输入下载地址" v-decorator="['downUrl']"/>
              </a-form-item>

                                
              <a-form-item label="是否强制更新">
                <a-input placeholder="请输入是否强制更新" v-decorator="['force']"/>
              </a-form-item>

                                
              <a-form-item label="md5">
                <a-input placeholder="请输入md5" v-decorator="['md5']"/>
              </a-form-item>

                                
              <a-form-item label="apk大小字节（B）">
                <a-input placeholder="请输入apk大小字节（B）" v-decorator="['size']"/>
              </a-form-item>

                                
              <a-form-item label="照顾老版本1.更新ota可用 2.没有更新ota的runhome">
                <a-input placeholder="请输入照顾老版本1.更新ota可用 2.没有更新ota的runhome" v-decorator="['flag']"/>
              </a-form-item>

                                
              <a-form-item label="更新介绍">
                <a-input placeholder="请输入更新介绍" v-decorator="['info']"/>
              </a-form-item>

                                
              <a-form-item label="0.开机引导 1.系统APK 2.协控 3.单片机驱动4.应用商店5.自由跑步6.目标跑步7.帮助 8.瑜伽 9.搏击 10.智能计划 11.活动 12.饮食管理 13.智能变速跑 14.投影 15.木卫六宣传 16.爱奇艺 17.腾讯视频 18.QQ音乐 19.酷我音乐">
                <a-input placeholder="请输入0.开机引导 1.系统APK 2.协控 3.单片机驱动4.应用商店5.自由跑步6.目标跑步7.帮助 8.瑜伽 9.搏击 10.智能计划 11.活动 12.饮食管理 13.智能变速跑 14.投影 15.木卫六宣传 16.爱奇艺 17.腾讯视频 18.QQ音乐 19.酷我音乐" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="投放类型0,普通,1,门店,2,测试,3,特殊">
                <a-input placeholder="请输入投放类型0,普通,1,门店,2,测试,3,特殊" v-decorator="['putType']"/>
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
            post('/treadmill/treadmillupdate/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmillupdate/add', values).then(() => {

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
