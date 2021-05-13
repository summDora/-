<template>
    <!-- 添加或修改客户端资源对话框 -->
    <a-drawer
    :title="name?'修改客户端资源':'新增客户端资源'"
    width='550px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item  label='包名'>
            <a-input  v-decorator="[ 'packageName' ]" />
        </a-form-item>
        <a-form-item  label='版本名称'>
            <a-input  v-decorator="[ 'name' ]" />
        </a-form-item>
        <a-form-item  label='版本号' >
            <a-input  v-decorator="[ 'code' ]" />
        </a-form-item>
        <a-form-item  label='md5'>
            <a-input  v-decorator="[ 'scope' ]" />
        </a-form-item>
        <a-form-item  label=' 跑步机类型'>
            <a-input  v-decorator="[ 'type' ]" />
        </a-form-item>
        <a-form-item  label='更新类型'>
            <a-input v-decorator="[ 'redirectUri' ]" />
        </a-form-item>
        <a-form-item  label='投放类型'>
            <a-input  v-decorator="[ 'roles' ]" />
        </a-form-item>
        <a-form-item  label='下载地址'>
            <a-input placeholder='请填写下载地址' v-decorator="[ 'downUrl' ]" />
        </a-form-item>
        <a-form-item  label='是否强制更新'>
            <a-input placeholder='设定有效时间值(单位:秒)' v-decorator="[ 'force' ]" />
        </a-form-item>
        <a-form-item  label='更新介绍'>
            <a-input placeholder='请填写更新介绍' v-decorator="[ 'clientName' ]" />
        </a-form-item>
        <a-form-item  label='指定跑步机更新SN'>
            <a-input placeholder='指定更新跑步机' v-decorator="[ 'clientUri' ]" />
        </a-form-item>
        <a-form-item  label='针对未更新OTA'>
            <a-input placeholder='固件填写2，28版本填写3' v-decorator="[ 'clientIconUri' ]" />
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
            background:'white',
            zIndex: 1,
        }">
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">
        取 消
        </a-button>
        <a-button type="primary" @click="submit">
        提 交
        </a-button>
    </div>
    </a-drawer>
</template>
<script>
import { addDict } from "@/assets/api/api-sys/sys";
export default {
    props:{
        menutype:String
    },
    data() {
        return {
            visible:false,
            name:false,
            selectType:null,
            form:this.$form.createForm(this),
            layout: { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
        }
    },

    methods: {
        init(isEdit,row){
            this.visible=true
            this.name=isEdit
            this.form.resetFields()
            if (row != undefined) {
                if (isEdit) {
                    // 编辑
                    setTimeout(() => {
                        this.form.setFieldsValue(row)
                    }, 100);
                } else {
                    // 新增
                    setTimeout(() => {
                        this.form.setFieldsValue({id:row.id})
                    }, 100);
                }
            }else{
                setTimeout(() => {
                    // this.form.setFieldsValue({status:'1'})
                }, 100);
            }
        },
        submit(){
            this.form.validateFields((err, values) => {
                if(err){
                    return ;
                }
                addDict(values).then(res=>{
                    console.log(res)
                    this.visible=false
                    this.$message.success('操作成功');
                    this.$emit('refreshDataList')
                })
            })
        }
    },
}
</script>