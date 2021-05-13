<template>
    <!-- 添加或修改客户端资源对话框 -->
    <!-- 
        client_id
        WhjBb19tTknoYw9qiqW2
        client_secret
        LQQPLXcXQIt18Fb7OCeX
        resource_ids
        scope
        grant_typesauthorization_coderefresh_tokenpasswordimplicitclient_credentials
        redirect_uri
        http://...
        roles
        指定客户端所拥有的Shiro Role,可选; 尚未使用
        access_token_validity
        设定有效时间值(单位:秒)
        refresh_token_validity
        设定有效时间值(单位:秒)
        client_name
        请填写client名称
        client_uri
        http://...
        client_icon_uri
        http://...
        description
        请填写Client的描述
        trusted


     -->
    <a-drawer
    :title="name?'修改客户端资源':'新增客户端资源'"
    width='550px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item  label='client_id'>
            <a-input disabled v-decorator="[ 'clientId' ]" />
        </a-form-item>
        <a-form-item  label='client_secret'>
            <a-input disabled v-decorator="[ 'clientSecret' ]" />
        </a-form-item>
        <a-form-item  label='resource_ids' >
            <a-input  v-decorator="[ 'resourceIds' ]" />
        </a-form-item>
        <a-form-item  label='scope'>
            <a-input  v-decorator="[ 'scope' ]" />
        </a-form-item>
        <a-form-item  label=' grant_type'>
            <a-input  v-decorator="[ 'grantTypes' ]" />
        </a-form-item>
        <a-form-item  label='redirect_uri'>
            <a-input placeholder='请输入http://...' v-decorator="[ 'redirectUri' ]" />
        </a-form-item>
        <a-form-item  label='roles'>
            <a-input placeholder='指定客户端所拥有的Shiro Role' v-decorator="[ 'roles' ]" />
        </a-form-item>
        <a-form-item  label='access_token_validity'>
            <a-input placeholder='设定有效时间值(单位:秒)' v-decorator="[ 'accessTokenValidity' ]" />
        </a-form-item>
        <a-form-item  label='refresh_token_validity'>
            <a-input placeholder='设定有效时间值(单位:秒)' v-decorator="[ 'refreshTokenValidity' ]" />
        </a-form-item>
        <a-form-item  label='client_name'>
            <a-input placeholder='请填写client名称' v-decorator="[ 'clientName' ]" />
        </a-form-item>
        <a-form-item  label='client_uri'>
            <a-input placeholder='请输入http://...' v-decorator="[ 'clientUri' ]" />
        </a-form-item>
        <a-form-item  label='client_icon_uri'>
            <a-input placeholder='请输入http://...' v-decorator="[ 'clientIconUri' ]" />
        </a-form-item>
        <a-form-item  label='description'>
            <a-input placeholder='请输入client的描述' v-decorator="[ 'description' ]" />
        </a-form-item>
        <a-form-item  label='trusted'>
            <a-input placeholder='请输入描述' v-decorator="[ 'trusted' ]" />
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
            layout: { labelCol: { span: 7 }, wrapperCol: { span: 16 } }
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