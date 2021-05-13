<template>
  <a-drawer
   :title="name?'修改菜单':'新增菜单'"
    width="30%"
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
    <a-form :form="form"  v-bind="layout">
      <a-form-item hidden label="id">
        <a-input placeholder="请输入ID" v-decorator="['id']" />
      </a-form-item>
      <a-form-item label="比赛名称">
        <a-input-search
          placeholder="请输入比赛名称"
          v-decorator="['name']"
          enter-button
          @search="openSelectModal"
          @click="openSelectModal"
        />
      </a-form-item>
      <a-form-item label="比赛ID">
        <a-input placeholder="请输入比赛ID" v-decorator="['id']" />
      </a-form-item>
      <a-form-item label="比赛日期">
        <a-date-picker
          style="width:100%"
          show-time
          v-decorator="[ 'date',]"
          :placeholder="`请选择比赛日期`"
        />
      </a-form-item>
      <a-form-item label="日期范围">
        <a-range-picker style="width:100%" show-time v-decorator="['range']" />
      </a-form-item>
      <a-form-item label="性别">
        <a-select
          v-decorator="['sex']"
          placeholder="请选择性别"
          @focus="getSelectOption('sex')"
        >
          <a-select-option
            v-for="(op, i) in selectOption"
            :key="i"
            :value="op.value"
          >
            {{ op.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="比赛图片">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          v-decorator="['image']"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="比赛类型">
        <a-select placeholder="请选择比赛类型" v-decorator="['type']">
          <a-select-option value="1">
            跑步
          </a-select-option>
          <a-select-option value="2">
            跳绳
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="长文本">
        <a-textarea
          :placeholder="`请输入长文本`"
          :auto-size="{ minRows: 2, maxRows: 4 }"
          v-decorator="['textarea']"
        />
      </a-form-item>
      <a-form-item label="单选框">
        <a-radio-group
          v-decorator="['radio']"
          :placeholder="`请选择单选框内容`"
        >
          <a-radio value="1">
            内容1
          </a-radio>
          <a-radio value="2">
            内容2
          </a-radio>
        </a-radio-group>
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
import { get,post } from "@/assets/api/index";
export default {
    props:{
        menutype:String
    },
    data() {
        return {
            visible:false,
            name:false,
            form:this.$form.createForm(this),
            selectOption: [], // 下拉框选项
            fileList: [],
            layout: { labelCol: { span: 4 }, wrapperCol: { span: 16 } },
            rootAdd:true
        }
    },
    methods: {
        // 数据回显
        init(isEdit,row){
            this.visible=true
            this.name=isEdit
            this.form.resetFields()
            if (row != undefined) {
                this.rootAdd=false
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
            }else{
                // 顶部新增
                this.rootAdd=true
                setTimeout(() => {
                    this.form.setFieldsValue()
                }, 100);
            }
        },
        openSelectModal() {
            this.$refs.selectlist.openSelectModal();
        },
        selectItem(val) {
            this.form.setFieldsValue({ name: val.name, id: val.cocahId });
        },
        getSelectOption(val) {
            get(`/sysDictDetail/dict?dictType=` + val).then((res) => {
                this.selectOption = res.data;
            });
        },
        // 数据提交
        submit(){
            this.form.validateFields((err, values) => {
                if(err){
                    return ;
                }
                console.log(values)
                if(this.name){
                    post('/update',values).then(res=>{
                        console.log(res)
                        this.visible=false
                        this.$message.success('操作成功');
                        this.$emit('refreshDataList')
                    })
                }else{
                    post('/add',values).then(res=>{
                        console.log(res)
                        this.visible=false
                        this.$message.success('操作成功');
                        this.$emit('refreshDataList')
                    })
                }
            })
        }

    }
}
</script>
