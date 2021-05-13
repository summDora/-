<template>
  <div>
    <a-drawer
      :title="formConfig.name"
      width="30%"
      :maskClosable="false"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false"
    >
      <a-form :form="form">
        <div v-for="(item, index) in formConfig.item" :key="index">
          <a-form-item
            v-bind="layout"
            v-show="!item.hidden"
            :label="item.nameCn"
          >
            <a-input
              :placeholder="`请输入${item.nameCn}`"
              v-if="item.type == 'input'"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请输入${item.nameCn}`,
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (item.rule && item.rule.length > 0) {
                          let rgx, errorLog;
                          //  纯数字验证
                          if (item.rule.includes('number')) {
                            rgx = /^-?\d*\.?\d+$/g;
                            errorLog = '只能输入数字';
                          }
                          //  纯字母验证
                          if (item.rule.includes('str')) {
                            rgx = /^[A-Za-z]+$/g;
                            errorLog = '只能输入英文字符';
                          }

                          if (item.rule.includes('phone')) {
                            rgx = /^1[34578]\d{9}$/g;
                            errorLog = '格式不正确';
                          }
                          // email 验证
                          if (item.rule.includes('email')) {
                            rgx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                            errorLog = '格式不正确';
                          }
                          // http 验证
                          if (item.rule.includes('http')) {
                            rgx = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/
                            errorLog = '格式不正确';
                          }
                          const re = new RegExp(rgx);
                          if (re.test(value)) {
                            callback();
                          } else {
                            callback({ message: errorLog });
                          }
                        } else {
                          callback();
                        }
                      },
                    },
                  ],
                },
              ]"
              :disabled="item.disabled"
            />

            <!-- textarea -->
            <a-textarea
              v-if="item.type == 'textarea'"
              :placeholder="`请输入${item.nameCn}`"
              :auto-size="{ minRows: 2, maxRows: 4 }"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请输入${item.nameCn}`,
                    },
                  ],
                },
              ]"
              :disabled="item.disabled"
            />
            <!-- select -->
            <a-select
              v-if="item.type == 'select' && !item.dictType"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请选择${item.nameCn}`,
                    },
                  ],
                },
              ]"
              :placeholder="`请选择${item.nameCn}`"
            >
              <a-select-option
                v-for="(op, i) in item.option"
                :key="i"
                :value="op.value"
              >
                {{ op.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-if="item.type == 'select' && item.dictType"
              @focus="getSelectOption(item.dictType)"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请选择${item.nameCn}`,
                    },
                  ],
                },
              ]"
              :placeholder="`请选择${item.nameCn}`"
            >
              <a-select-option
                v-for="(op, i) in selectOption"
                :key="i"
                :value="op.value"
              >
                {{ op.label }}
              </a-select-option>
            </a-select>
            <!-- radio -->
            <a-radio-group
              v-if="item.type == 'radio'"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请选择${item.nameCn}`,
                    },
                  ],
                },
              ]"
              :placeholder="`请输入${item.nameCn}`"
            >
              <a-radio
                v-for="(op, i) in item.option"
                :key="i"
                :value="op.value"
              >
                {{ op.label }}
              </a-radio>
            </a-radio-group>
            <!-- date -->
            <a-date-picker
              v-if="item.type == 'date' && !item.range"
              :style="{ width: '100%' }"
              show-time
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请选择${item.nameCn}`,

                    },
                  ],
                },
              ]"
              :placeholder="`请输入${item.nameCn}`"
            />
            <a-range-picker
            v-if="item.type == 'date' && item.range"
              :style="{ width: '100%' }"
              show-time
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请选择${item.nameCn}`,

                    },
                  ],
                },
              ]"/>

            <!-- upload -->
            <a-upload
              v-if="item.type == 'upload'"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
              v-decorator="[
                item.name,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `请上传${item.nameCn}`,
                    },
                  ],
                },
              ]"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>

            <!-- markdown 表单 -->
            <mavon-editor
              style="min-height: 250px"
              v-if="item.type == 'markdown'"
              v-model="markdown"
              @change="changeHtml"
            />
          </a-form-item>
        </div>
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
          zIndex: 999,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">
          取 消
        </a-button>
        <a-button type="primary" @click="submit">
          提 交
        </a-button>
      </div>
    </a-drawer>
    <!-- </a-modal> -->
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { get } from "@/assets/api/index";
export default {
  name: "IInput",
  components: { mavonEditor },
  props: {
    formConfig: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      markdown: "",
      fileList: [],
      form: this.$form.createForm(this),
      visible: false,
      layout: { labelCol: { span: 6 }, wrapperCol: { span: 16 } },
      selectOption: [],
    };
  },
  methods: {
    getSelectOption(val) {
      console.log(val)  // val : sex
      get(`/sysDictDetail/dict?dictType=`+val).then(res=>{
        this.selectOption=res.data
      });

    },
    handleOpenForm(obj = []) {
      this.form.resetFields();
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue(obj);
      }, 100);
    },
    changeHtml(value, render) {
      this.$emit("markDown", render);
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        (Object.keys(values) || {}).forEach(key=>{
          if(values[key]){
            if(typeof values[key] == 'object' && values[key]._d){
              values[key]=values[key].format('YYYY-MM-DD HH:mm:ss');
            }
            if(values[key].length==2 && values[key][0]._d){
              values[key][0]=values[key][0].format('YYYY-MM-DD HH:mm:ss');
              values[key][1]=values[key][1].format('YYYY-MM-DD HH:mm:ss');
            }
          }
        })
        this.$emit("submit", values);
      });
    }
  },
};
</script>