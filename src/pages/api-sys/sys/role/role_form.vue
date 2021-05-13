<template>
    <!-- 添加或修改角色对话框 -->
    <a-drawer
    :title="name?'修改角色':'新增角色'"
    width='450px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item  label='id' hidden>
            <a-input v-decorator="[ 'id' ]"></a-input>
        </a-form-item>
        <a-form-item  label='角色名称'>
            <a-input placeholder='请输入角色名称' v-decorator="[ 'name' ]" />
        </a-form-item>
        <a-form-item  label='上级角色'>
            <a-tree-select
                placeholder='请选择上级菜单' v-decorator="[ 'pid' ]"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                :tree-data="treeData"
            >
            </a-tree-select>
        </a-form-item>
        <a-form-item  label='别名' >
            <a-input placeholder='请输入别名' v-decorator="[ 'enName' ]" />
        </a-form-item>
        <a-form-item  label='备注'>
            <a-input placeholder='请输入备注' v-decorator="[ 'remark' ]" />
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
import { addRole } from "@/assets/api/api-sys/sys";
export default {
    props:{
        menutype:String ,
        treeData:Array
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
            if (row != undefined && isEdit) {
                // 编 辑
                setTimeout(() => {
                    this.form.setFieldsValue(row)
                }, 100);
            }
        },
        submit(){
            this.form.validateFields((err, values) => {
                if(err){
                    return ;
                }
                if(values.pid==null){
                    values.pid=0
                }
                addRole(values).then(()=>{
                    this.visible=false
                    this.$message.success('操作成功');
                    this.$emit('refreshDataList')
                })
            })
        }
    },
}
</script>