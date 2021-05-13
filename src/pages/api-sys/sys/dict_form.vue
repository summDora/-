<template>
    <!-- 添加或修改字典对话框 -->
    <a-drawer
    :title="name?'修改字典':'新增字典'"
    width='450px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item  label='id' hidden>
            <a-input v-decorator="[ 'id' ]"></a-input>
        </a-form-item>
        <a-form-item  label='键值'>
            <a-input placeholder='请输入键值' v-decorator="[ 'value' ]" />
        </a-form-item>
        <a-form-item  label='类型'>
            <a-input placeholder='请输入类型' v-decorator="[ 'type' ]" />
        </a-form-item>
        <a-form-item  label='标签' >
            <a-input placeholder='请输入标签' v-decorator="[ 'label' ]" />
        </a-form-item>
        <a-form-item  label='描述'>
            <a-input placeholder='请输入描述' v-decorator="[ 'description' ]" />
        </a-form-item>
        <a-form-item  label='排序号'>
            <a-input-number v-decorator="[ 'sort' ]" :min="0" :max="99" />
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
            layout: { labelCol: { span: 4 }, wrapperCol: { span: 16 } }
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