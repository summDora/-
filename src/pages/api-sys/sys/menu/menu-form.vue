<template>
    <!-- 添加或修改菜单对话框 -->
    <a-drawer
    :title="name?'修改菜单':'新增菜单'"
    width='450px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item label= '菜单类型'>
            <a-radio-group button-style="solid" @change='typeChange'
            v-decorator="[ 'status' ]" >
                <a-radio-button value="1">左菜单</a-radio-button>
                <a-radio-button value="2">按钮</a-radio-button>
            </a-radio-group>
        </a-form-item>
        <a-form-item  label='id' hidden >
            <a-input v-decorator="[ 'id' ]"></a-input>
        </a-form-item>
        <a-form-item  label='type' hidden>
            <a-input v-decorator="[ 'type' ]"></a-input>
        </a-form-item>
        <a-form-item  label='上级菜单'>
            <a-tree-select
                placeholder='请选择上级菜单' v-decorator="[ 'pcode' ]"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                :tree-data="treeData"
            >
            </a-tree-select>
        </a-form-item>
        <a-form-item  label='名称'>
            <a-input placeholder='请输入菜单名称' v-decorator="[ 'name' ]"></a-input>
        </a-form-item>
        <a-form-item  label='排序'>
            <a-input-number v-decorator="[ 'num' ]" :min="1" :max="999" />
        </a-form-item>
        <a-form-item  label='层级' >
            <a-input-number v-decorator="[ 'levels' ]" :min="1" :max="99" />
        </a-form-item>
        <a-form-item  label='路由地址' v-show="selectType==1">
            <a-input placeholder='请输入路由地址' v-decorator="[ 'url' ]"></a-input>
        </a-form-item>
        <a-form-item  label='权限标识' v-show="selectType==2">
            <a-input placeholder='请输入权限标识' v-decorator="[ 'alias' ]"></a-input>
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
import { addMenu } from "@/assets/api/api-sys/sys";
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
            this.selectType='1'
            if (row != undefined) {
                // 从table栏目 点击展开
                this.selectType=row.status
                // setTimeout(() => {
                //     this.form.setFieldsValue({pcode:row.id,status:String(row.status)})
                // }, 100);
                if (isEdit) {
                    // 编辑
                    setTimeout(() => {
                        row.status=row.status.toString()
                        this.form.setFieldsValue(row)
                    }, 100);
                } else {
                    // 新增
                    setTimeout(() => {
                        this.form.setFieldsValue({pcode:row.id,status:row.status.toString()})
                    }, 100);
                }
            }else{
                this.selectType='1'
                setTimeout(() => {
                    this.form.setFieldsValue({status:'1'})
                }, 100);
            }
        },
        typeChange(index){
            this.selectType=index.target.value
        },
        submit(){
            this.form.validateFields((err, values) => {
                if(err){
                    return ;
                }
                console.log(values)
                if(values.pcode==null || values.pcode=='根目录'){
                    values.pcode=0
                }
                values.type=this.menutype
                addMenu(values).then(res=>{
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