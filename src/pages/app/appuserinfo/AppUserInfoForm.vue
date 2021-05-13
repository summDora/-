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
                                
              <a-form-item label="用户id">
                <a-input placeholder="请输入用户id" v-decorator="['userId']"/>
              </a-form-item>

                                
              <a-form-item label="总跑步里程">
                <a-input placeholder="请输入总跑步里程" v-decorator="['totalMileage']"/>
              </a-form-item>

                                
              <a-form-item label="总跑步步数">
                <a-input placeholder="请输入总跑步步数" v-decorator="['totalStep']"/>
              </a-form-item>

                                
              <a-form-item label="总消耗卡路里">
                <a-input placeholder="请输入总消耗卡路里" v-decorator="['totalCal']"/>
              </a-form-item>

                                
              <a-form-item label="总跑步时间">
                <a-input placeholder="请输入总跑步时间" v-decorator="['totalDuration']"/>
              </a-form-item>

                                
              <a-form-item label="上次身体得分">
                <a-input placeholder="请输入上次身体得分" v-decorator="['lastBodyScore']"/>
              </a-form-item>

                                
              <a-form-item label="上次检测bmi">
                <a-input placeholder="请输入上次检测bmi" v-decorator="['lastBmi']"/>
              </a-form-item>

                                
              <a-form-item label="上次体脂率">
                <a-input placeholder="请输入上次体脂率" v-decorator="['lastFatRate']"/>
              </a-form-item>

                                
              <a-form-item label="上次基础代谢率">
                <a-input placeholder="请输入上次基础代谢率" v-decorator="['lastBasalMetabolism']"/>
              </a-form-item>

                                
              <a-form-item label="上次运动里程">
                <a-input placeholder="请输入上次运动里程" v-decorator="['lastMileage']"/>
              </a-form-item>

                                
              <a-form-item label="上次运动步数">
                <a-input placeholder="请输入上次运动步数" v-decorator="['lastStep']"/>
              </a-form-item>

                                
              <a-form-item label="上次消耗卡路里">
                <a-input placeholder="请输入上次消耗卡路里" v-decorator="['lastCal']"/>
              </a-form-item>

                                
              <a-form-item label="上次运动时长">
                <a-input placeholder="请输入上次运动时长" v-decorator="['lastDuration']"/>
              </a-form-item>

                                
              <a-form-item label="上次运动开始时间">
                <a-input placeholder="请输入上次运动开始时间" v-decorator="['lastStartTime']"/>
              </a-form-item>

                                
              <a-form-item label="上次运动结束时间">
                <a-input placeholder="请输入上次运动结束时间" v-decorator="['lastEndTime']"/>
              </a-form-item>

                                
              <a-form-item label="总使用次数">
                <a-input placeholder="请输入总使用次数" v-decorator="['useNum']"/>
              </a-form-item>

                                
              <a-form-item label="总使用时长">
                <a-input placeholder="请输入总使用时长" v-decorator="['useDuration']"/>
              </a-form-item>

                                
              <a-form-item label="累计充值">
                <a-input placeholder="请输入累计充值" v-decorator="['totalRecharge']"/>
              </a-form-item>

                                
              <a-form-item label="累计消费">
                <a-input placeholder="请输入累计消费" v-decorator="['totalCost']"/>
              </a-form-item>

                                
              <a-form-item label="累计获取赠送/红包金额">
                <a-input placeholder="请输入累计获取赠送/红包金额" v-decorator="['totalGitft']"/>
              </a-form-item>

                                
              <a-form-item label="运动目标">
                <a-input placeholder="请输入运动目标" v-decorator="['target']"/>
              </a-form-item>

                                
              <a-form-item label="运动天数">
                <a-input placeholder="请输入运动天数" v-decorator="['runDays']"/>
              </a-form-item>

                                
              <a-form-item label="游戏总时长">
                <a-input placeholder="请输入游戏总时长" v-decorator="['gameTotalDuration']"/>
              </a-form-item>

                                
              <a-form-item label="游戏总卡路里">
                <a-input placeholder="请输入游戏总卡路里" v-decorator="['gameTotalCal']"/>
              </a-form-item>

                                
              <a-form-item label="游戏总步数">
                <a-input placeholder="请输入游戏总步数" v-decorator="['gameTotalStep']"/>
              </a-form-item>

                                
              <a-form-item label="游戏总里程">
                <a-input placeholder="请输入游戏总里程" v-decorator="['gameTotalMileage']"/>
              </a-form-item>

                                
              <a-form-item label="连续天数">
                <a-input placeholder="请输入连续天数" v-decorator="['continuityDays']"/>
              </a-form-item>

                                
              <a-form-item label="观看直播总时长(分钟)">
                <a-input placeholder="请输入观看直播总时长(分钟)" v-decorator="['liveTotalDuration']"/>
              </a-form-item>

                                
              <a-form-item label="课程消耗cal">
                <a-input placeholder="请输入课程消耗cal" v-decorator="['liveTotalCal']"/>
              </a-form-item>

                                
              <a-form-item label="观看直播/回放总次数">
                <a-input placeholder="请输入观看直播/回放总次数" v-decorator="['liveTotalNum']"/>
              </a-form-item>

                                
              <a-form-item label="直播跑步里程">
                <a-input placeholder="请输入直播跑步里程" v-decorator="['liveTotalMileage']"/>
              </a-form-item>

                                
              <a-form-item label="普通跑步里程">
                <a-input placeholder="请输入普通跑步里程" v-decorator="['commonTotalMileage']"/>
              </a-form-item>

                                
              <a-form-item label="完成VIP任务次数">
                <a-input placeholder="请输入完成VIP任务次数" v-decorator="['finishMissionNum']"/>
              </a-form-item>

                                
              <a-form-item label="当前等级">
                <a-input placeholder="请输入当前等级" v-decorator="['currentLevel']"/>
              </a-form-item>

                                
              <a-form-item label="好友数量">
                <a-input placeholder="请输入好友数量" v-decorator="['friendNum']"/>
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
            post('/app/appuserinfo/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserinfo/add', values).then(() => {

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
