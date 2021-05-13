<template>
  <a-drawer
      :title="name?'修改菜单':'新增菜单'"
      width="30%"
      :maskClosable="false"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false">
    <a-form :form="form" v-bind="layout">
                                  <a-form-item hidden label="设备唯一标示">
                <a-input placeholder="请输入设备唯一标示" v-decorator="['id']"/>
              </a-form-item>
                                
              <a-form-item label="所属点位">
                <a-input placeholder="请输入所属点位" v-decorator="['pointId']"/>
              </a-form-item>

                                
              <a-form-item label="唯一标示">
                <a-input placeholder="请输入唯一标示" v-decorator="['sn']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机名称">
                <a-input placeholder="请输入跑步机名称" v-decorator="['name']"/>
              </a-form-item>

                                
              <a-form-item label="机器类型:1.QRTT1(15.6) 2.QRTX1(21.5) 3.QRTM1(23.8) 4.未识别机型">
                <a-input placeholder="请输入机器类型:1.QRTT1(15.6) 2.QRTX1(21.5) 3.QRTM1(23.8) 4.未识别机型" v-decorator="['hardVersion']"/>
              </a-form-item>

                                
              <a-form-item label="APP版本">
                <a-input placeholder="请输入APP版本" v-decorator="['appVersion']"/>
              </a-form-item>

                                
              <a-form-item label="系统版本">
                <a-input placeholder="请输入系统版本" v-decorator="['systemVersion']"/>
              </a-form-item>

                                
              <a-form-item label="总里程">
                <a-input placeholder="请输入总里程" v-decorator="['totalMileage']"/>
              </a-form-item>

                                
              <a-form-item label="上次加油里程">
                <a-input placeholder="请输入上次加油里程" v-decorator="['lastLube']"/>
              </a-form-item>

                                
              <a-form-item label="故障码">
                <a-input placeholder="请输入故障码" v-decorator="['faultCodes']"/>
              </a-form-item>

                                
              <a-form-item label="状态,1待机中,2,已启动,3,维护中,4离线">
                <a-input placeholder="请输入状态,1待机中,2,已启动,3,维护中,4离线" v-decorator="['status']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机类型: 1,家庭跑步机">
                <a-input placeholder="请输入跑步机类型: 1,家庭跑步机" v-decorator="['type']"/>
              </a-form-item>

                                
              <a-form-item label="是否需要交纳押金:1,不需要,2需要">
                <a-input placeholder="请输入是否需要交纳押金:1,不需要,2需要" v-decorator="['deposit']"/>
              </a-form-item>

                                
              <a-form-item label="电控版本(下控)">
                <a-input placeholder="请输入电控版本(下控)" v-decorator="['electricVersion']"/>
              </a-form-item>

                                
              <a-form-item label="经度">
                <a-input placeholder="请输入经度" v-decorator="['lng']"/>
              </a-form-item>

                                
              <a-form-item label="维度">
                <a-input placeholder="请输入维度" v-decorator="['lat']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机当前作业">
                <a-input placeholder="请输入跑步机当前作业" v-decorator="['currentJob']"/>
              </a-form-item>

                                
              <a-form-item label="跑步机最大速度">
                <a-input placeholder="请输入跑步机最大速度" v-decorator="['maxSpeed']"/>
              </a-form-item>

                                
              <a-form-item label="用戶ID">
                <a-input placeholder="请输入用戶ID" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="">
                <a-input placeholder="请输入" v-decorator="['appStoreVersion']"/>
              </a-form-item>

                                
              <a-form-item label="VIP是否到期(0,1)">
                <a-input placeholder="请输入VIP是否到期(0,1)" v-decorator="['vipFlag']"/>
              </a-form-item>

                                
              <a-form-item label="开始时间">
                <a-input placeholder="请输入开始时间" v-decorator="['vipStartDate']"/>
              </a-form-item>

                                
              <a-form-item label="到期时间">
                <a-input placeholder="请输入到期时间" v-decorator="['vipEndDate']"/>
              </a-form-item>

                                
              <a-form-item label="此跑步机是否被领取VIP(0,1)">
                <a-input placeholder="请输入此跑步机是否被领取VIP(0,1)" v-decorator="['presentVip']"/>
              </a-form-item>

                                
              <a-form-item label="激活时间">
                <a-input placeholder="请输入激活时间" v-decorator="['presentDate']"/>
              </a-form-item>

                                
              <a-form-item label="保修截止日期(默认一年)">
                <a-input placeholder="请输入保修截止日期(默认一年)" v-decorator="['effectiveDate']"/>
              </a-form-item>

                                
              <a-form-item label="省">
                <a-input placeholder="请输入省" v-decorator="['province']"/>
              </a-form-item>

                                
              <a-form-item label="市">
                <a-input placeholder="请输入市" v-decorator="['city']"/>
              </a-form-item>

                                
              <a-form-item label="区">
                <a-input placeholder="请输入区" v-decorator="['district']"/>
              </a-form-item>

                                
              <a-form-item label="详细地址">
                <a-input placeholder="请输入详细地址" v-decorator="['formattedAddress']"/>
              </a-form-item>

                                
              <a-form-item label="投放类型0,普通,1,门店,2,测试,3,特殊">
                <a-input placeholder="请输入投放类型0,普通,1,门店,2,测试,3,特殊" v-decorator="['putType']"/>
              </a-form-item>

                                
              <a-form-item label="系统固件版本">
                <a-input placeholder="请输入系统固件版本" v-decorator="['osVersion']"/>
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
            post('/treadmill/treadmill/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/treadmill/treadmill/add', values).then(() => {

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
