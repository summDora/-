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
                                                          <a-form-item label="type">
                <a-input placeholder="type" v-decorator="['type']"/>
              </a-form-item>
                                      <a-form-item label='type'>
                <a-input-number v-decorator="['type' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="type">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'type',]"
                    :placeholder="`type`"/>
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
                                                          <a-form-item label="sn">
                <a-input placeholder="sn" v-decorator="['sn']"/>
              </a-form-item>
                                      <a-form-item label='sn'>
                <a-input-number v-decorator="['sn' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="sn">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'sn',]"
                    :placeholder="`sn`"/>
              </a-form-item>
                                                          <a-form-item label="height">
                <a-input placeholder="height" v-decorator="['height']"/>
              </a-form-item>
                                      <a-form-item label='height'>
                <a-input-number v-decorator="['height' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="height">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'height',]"
                    :placeholder="`height`"/>
              </a-form-item>
                                                          <a-form-item label="age">
                <a-input placeholder="age" v-decorator="['age']"/>
              </a-form-item>
                                      <a-form-item label='age'>
                <a-input-number v-decorator="['age' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="age">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'age',]"
                    :placeholder="`age`"/>
              </a-form-item>
                                                          <a-form-item label="sex">
                <a-input placeholder="sex" v-decorator="['sex']"/>
              </a-form-item>
                                      <a-form-item label='sex'>
                <a-input-number v-decorator="['sex' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="sex">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'sex',]"
                    :placeholder="`sex`"/>
              </a-form-item>
                                                          <a-form-item label="weight">
                <a-input placeholder="weight" v-decorator="['weight']"/>
              </a-form-item>
                                      <a-form-item label='weight'>
                <a-input-number v-decorator="['weight' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="weight">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'weight',]"
                    :placeholder="`weight`"/>
              </a-form-item>
                                                          <a-form-item label="electrode">
                <a-input placeholder="electrode" v-decorator="['electrode']"/>
              </a-form-item>
                                      <a-form-item label='electrode'>
                <a-input-number v-decorator="['electrode' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="electrode">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'electrode',]"
                    :placeholder="`electrode`"/>
              </a-form-item>
                                                          <a-form-item label="bmi">
                <a-input placeholder="bmi" v-decorator="['bmi']"/>
              </a-form-item>
                                      <a-form-item label='bmi'>
                <a-input-number v-decorator="['bmi' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="bmi">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'bmi',]"
                    :placeholder="`bmi`"/>
              </a-form-item>
                                                          <a-form-item label="bfp">
                <a-input placeholder="bfp" v-decorator="['bfp']"/>
              </a-form-item>
                                      <a-form-item label='bfp'>
                <a-input-number v-decorator="['bfp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="bfp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'bfp',]"
                    :placeholder="`bfp`"/>
              </a-form-item>
                                                          <a-form-item label="sfp">
                <a-input placeholder="sfp" v-decorator="['sfp']"/>
              </a-form-item>
                                      <a-form-item label='sfp'>
                <a-input-number v-decorator="['sfp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="sfp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'sfp',]"
                    :placeholder="`sfp`"/>
              </a-form-item>
                                                          <a-form-item label="vfr">
                <a-input placeholder="vfr" v-decorator="['vfr']"/>
              </a-form-item>
                                      <a-form-item label='vfr'>
                <a-input-number v-decorator="['vfr' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="vfr">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'vfr',]"
                    :placeholder="`vfr`"/>
              </a-form-item>
                                                          <a-form-item label="mp">
                <a-input placeholder="mp" v-decorator="['mp']"/>
              </a-form-item>
                                      <a-form-item label='mp'>
                <a-input-number v-decorator="['mp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="mp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'mp',]"
                    :placeholder="`mp`"/>
              </a-form-item>
                                                          <a-form-item label="bmr">
                <a-input placeholder="bmr" v-decorator="['bmr']"/>
              </a-form-item>
                                      <a-form-item label='bmr'>
                <a-input-number v-decorator="['bmr' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="bmr">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'bmr',]"
                    :placeholder="`bmr`"/>
              </a-form-item>
                                                          <a-form-item label="bone_mass">
                <a-input placeholder="bone_mass" v-decorator="['boneMass']"/>
              </a-form-item>
                                      <a-form-item label='bone_mass'>
                <a-input-number v-decorator="['boneMass' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="bone_mass">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'boneMass',]"
                    :placeholder="`bone_mass`"/>
              </a-form-item>
                                                          <a-form-item label="bwp">
                <a-input placeholder="bwp" v-decorator="['bwp']"/>
              </a-form-item>
                                      <a-form-item label='bwp'>
                <a-input-number v-decorator="['bwp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="bwp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'bwp',]"
                    :placeholder="`bwp`"/>
              </a-form-item>
                                                          <a-form-item label="ma">
                <a-input placeholder="ma" v-decorator="['ma']"/>
              </a-form-item>
                                      <a-form-item label='ma'>
                <a-input-number v-decorator="['ma' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="ma">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'ma',]"
                    :placeholder="`ma`"/>
              </a-form-item>
                                                          <a-form-item label="pp">
                <a-input placeholder="pp" v-decorator="['pp']"/>
              </a-form-item>
                                      <a-form-item label='pp'>
                <a-input-number v-decorator="['pp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="pp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'pp',]"
                    :placeholder="`pp`"/>
              </a-form-item>
                                                          <a-form-item label="smp">
                <a-input placeholder="smp" v-decorator="['smp']"/>
              </a-form-item>
                                      <a-form-item label='smp'>
                <a-input-number v-decorator="['smp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="smp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'smp',]"
                    :placeholder="`smp`"/>
              </a-form-item>
                                                          <a-form-item label="sbc">
                <a-input placeholder="sbc" v-decorator="['sbc']"/>
              </a-form-item>
                                      <a-form-item label='sbc'>
                <a-input-number v-decorator="['sbc' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="sbc">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'sbc',]"
                    :placeholder="`sbc`"/>
              </a-form-item>
                                                          <a-form-item label="temperature">
                <a-input placeholder="temperature" v-decorator="['temperature']"/>
              </a-form-item>
                                      <a-form-item label='temperature'>
                <a-input-number v-decorator="['temperature' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="temperature">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'temperature',]"
                    :placeholder="`temperature`"/>
              </a-form-item>
                                                          <a-form-item label="hr">
                <a-input placeholder="hr" v-decorator="['hr']"/>
              </a-form-item>
                                      <a-form-item label='hr'>
                <a-input-number v-decorator="['hr' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="hr">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'hr',]"
                    :placeholder="`hr`"/>
              </a-form-item>
                                                          <a-form-item label="imp">
                <a-input placeholder="imp" v-decorator="['imp']"/>
              </a-form-item>
                                      <a-form-item label='imp'>
                <a-input-number v-decorator="['imp' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="imp">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'imp',]"
                    :placeholder="`imp`"/>
              </a-form-item>
                                                          <a-form-item label="imp_left_hand">
                <a-input placeholder="imp_left_hand" v-decorator="['impLeftHand']"/>
              </a-form-item>
                                      <a-form-item label='imp_left_hand'>
                <a-input-number v-decorator="['impLeftHand' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="imp_left_hand">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'impLeftHand',]"
                    :placeholder="`imp_left_hand`"/>
              </a-form-item>
                                                          <a-form-item label="imp_right_hand">
                <a-input placeholder="imp_right_hand" v-decorator="['impRightHand']"/>
              </a-form-item>
                                      <a-form-item label='imp_right_hand'>
                <a-input-number v-decorator="['impRightHand' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="imp_right_hand">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'impRightHand',]"
                    :placeholder="`imp_right_hand`"/>
              </a-form-item>
                                                          <a-form-item label="imp_left_feet">
                <a-input placeholder="imp_left_feet" v-decorator="['impLeftFeet']"/>
              </a-form-item>
                                      <a-form-item label='imp_left_feet'>
                <a-input-number v-decorator="['impLeftFeet' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="imp_left_feet">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'impLeftFeet',]"
                    :placeholder="`imp_left_feet`"/>
              </a-form-item>
                                                          <a-form-item label="imp_right_feet">
                <a-input placeholder="imp_right_feet" v-decorator="['impRightFeet']"/>
              </a-form-item>
                                      <a-form-item label='imp_right_feet'>
                <a-input-number v-decorator="['impRightFeet' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="imp_right_feet">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'impRightFeet',]"
                    :placeholder="`imp_right_feet`"/>
              </a-form-item>
                                                          <a-form-item label="left_arm">
                <a-input placeholder="left_arm" v-decorator="['leftArm']"/>
              </a-form-item>
                                      <a-form-item label='left_arm'>
                <a-input-number v-decorator="['leftArm' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="left_arm">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'leftArm',]"
                    :placeholder="`left_arm`"/>
              </a-form-item>
                                                          <a-form-item label="right_arm">
                <a-input placeholder="right_arm" v-decorator="['rightArm']"/>
              </a-form-item>
                                      <a-form-item label='right_arm'>
                <a-input-number v-decorator="['rightArm' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="right_arm">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'rightArm',]"
                    :placeholder="`right_arm`"/>
              </a-form-item>
                                                          <a-form-item label="left_leg">
                <a-input placeholder="left_leg" v-decorator="['leftLeg']"/>
              </a-form-item>
                                      <a-form-item label='left_leg'>
                <a-input-number v-decorator="['leftLeg' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="left_leg">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'leftLeg',]"
                    :placeholder="`left_leg`"/>
              </a-form-item>
                                                          <a-form-item label="right_leg">
                <a-input placeholder="right_leg" v-decorator="['rightLeg']"/>
              </a-form-item>
                                      <a-form-item label='right_leg'>
                <a-input-number v-decorator="['rightLeg' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="right_leg">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'rightLeg',]"
                    :placeholder="`right_leg`"/>
              </a-form-item>
                                                          <a-form-item label="all_body">
                <a-input placeholder="all_body" v-decorator="['allBody']"/>
              </a-form-item>
                                      <a-form-item label='all_body'>
                <a-input-number v-decorator="['allBody' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="all_body">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'allBody',]"
                    :placeholder="`all_body`"/>
              </a-form-item>
                                                          <a-form-item label="left_arm_muscle">
                <a-input placeholder="left_arm_muscle" v-decorator="['leftArmMuscle']"/>
              </a-form-item>
                                      <a-form-item label='left_arm_muscle'>
                <a-input-number v-decorator="['leftArmMuscle' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="left_arm_muscle">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'leftArmMuscle',]"
                    :placeholder="`left_arm_muscle`"/>
              </a-form-item>
                                                          <a-form-item label="right_arm_muscle">
                <a-input placeholder="right_arm_muscle" v-decorator="['rightArmMuscle']"/>
              </a-form-item>
                                      <a-form-item label='right_arm_muscle'>
                <a-input-number v-decorator="['rightArmMuscle' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="right_arm_muscle">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'rightArmMuscle',]"
                    :placeholder="`right_arm_muscle`"/>
              </a-form-item>
                                                          <a-form-item label="left_leg_muscle">
                <a-input placeholder="left_leg_muscle" v-decorator="['leftLegMuscle']"/>
              </a-form-item>
                                      <a-form-item label='left_leg_muscle'>
                <a-input-number v-decorator="['leftLegMuscle' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="left_leg_muscle">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'leftLegMuscle',]"
                    :placeholder="`left_leg_muscle`"/>
              </a-form-item>
                                                          <a-form-item label="right_leg_muscle">
                <a-input placeholder="right_leg_muscle" v-decorator="['rightLegMuscle']"/>
              </a-form-item>
                                      <a-form-item label='right_leg_muscle'>
                <a-input-number v-decorator="['rightLegMuscle' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="right_leg_muscle">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'rightLegMuscle',]"
                    :placeholder="`right_leg_muscle`"/>
              </a-form-item>
                                                          <a-form-item label="all_body_muscle">
                <a-input placeholder="all_body_muscle" v-decorator="['allBodyMuscle']"/>
              </a-form-item>
                                      <a-form-item label='all_body_muscle'>
                <a-input-number v-decorator="['allBodyMuscle' ]" :min="1" :max="999"/>
              </a-form-item>
                                      <a-form-item label="all_body_muscle">
                <a-date-picker
                    style="width:100%"
                    show-time
                    v-decorator="[ 'allBodyMuscle',]"
                    :placeholder="`all_body_muscle`"/>
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
            post('/app/appuserwolaibodyfat/update', values).then(() => {

              this.visible = false
              this.$message.success('操作成功');
              this.$emit('refreshDataList')
            })
          } else {
            post('/app/appuserwolaibodyfat/add', values).then(() => {

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
