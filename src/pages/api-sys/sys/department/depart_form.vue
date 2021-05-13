<template>
    <!-- 添加或修改部门对话框 -->
    <a-drawer
    :title="name?'修改部门':'新增部门'"
    width='450px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
      <a-form :form="form" v-bind="layout">
        <a-form-item  label='id' hidden>
            <a-input v-decorator="[ 'id' ]"></a-input>
        </a-form-item>

        <a-form-item  label='上级部门'>
            <a-tree-select
                placeholder='请选择上级部门' v-decorator="[ 'parentId' ]"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                :tree-data="treeData"
            >
            </a-tree-select>
        </a-form-item>
        <a-form-item  label='部门名称'>
            <a-input placeholder='请填写账号'  v-decorator="[ 'name', {
              rules: [{ required: true, message: '部门名称能为空!' }]
            } ]" />
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
import { addDepart ,departList } from "@/assets/api/api-sys/sys";
export default {
    props:{
        menutype:String
    },
    data() {
        return {
            visible:false,
            name:false,
            treeData:[],
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
            this.treeData=[]
            departList().then(res=>{
                this.dataChildren(res.data.content.records)
            })
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
        dataChildren(data) {
            const menu = [],cata = [];
            data.map((item) => {
                if(item.parentId==null){
                    menu.push({ children: [], ...item });
                }else{
                    cata.push({ children: [], ...item });
                }
            });
            cata.map((c) => [
                cata.map((b) => {
                if (b.parentId == c.id) {
                    c.children.push(b);
                }
                }),
            ]);
            cata.map(c=>{
                if(c.children.length==0){
                    delete c['children']
                }
            })
            menu.map((m) => {
                cata.map((c) => {
                if (c.parentId == m.id) {
                    m.children.push(c);
                }
                });
            });
            menu.map(m=>{
                if(m.children.length==0){
                    delete m['children']
                }
            })
            let returndata=this.convertToTreedata(menu)
            this.treeData.push(...returndata)
        },
        convertToTreedata(data){
        let returnData=[]
            data.map(item=>{
                let temp={
                    title:item.name,
                    value:item.id,
                    key:item.id
                }
                if('children' in item){
                    temp.children=this.convertToTreedata(item.children)
                }
                returnData.push(temp);
            })
            return returnData;
        },
        submit(){
            this.form.validateFields((err, values) => {
                if(err){
                    return ;
                }
                if(!this.name){
                    values.id=null
                }
                if(!values.parentId){
                    values.parentId=null
                }
                addDepart(values).then(res=>{
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