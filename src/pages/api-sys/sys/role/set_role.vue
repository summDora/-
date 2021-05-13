<template>
    <!-- 添加或修改角色对话框 -->
    <a-drawer
    title="权限分配"
    width='450px'
    :maskClosable="false"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="visible = false">
        <a-tree-select
            v-model="ids"
            style="width: 100%"
            :tree-data="treeData"
            tree-checkable
            allow-clear
            :maxTagCount='20'
            :dropdown-style="{ maxHeight: '600px', overflow: 'auto' }"
            placeholder="请选择需分配的权限"
        />
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
    // sysMenuList,saleMenuList,gameMenuList,liveMenuList,
import { getRole,setRole,allMenuList } from "@/assets/api/api-sys/sys";
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
    data() {
        return {
            visible:false,
            id:null,
            treeData:[],
            name:false,
            ids:[],
            SHOW_PARENT,
            layout: { labelCol: { span: 4 }, wrapperCol: { span: 16 } }
        }
    },

    methods: {
        init(id){
            this.visible=true
            this.id=id
            this.ids=[]
            this.getTreeData()
            getRole(id).then(res=>{
                let data=res.data.content
                data.map(item=>{
                    this.ids.push(item.menu_id)
                })
            })
        },
        getTreeData(){
            this.treeData=[]
            allMenuList().then(res=>{
                this.treeType(res.data.content)
            })
        },
        treeType(data){
            const sys=[],sale=[],game=[],live=[];
            data.map(item=>{
                if(item.type==1) sys.push(item)
                if(item.type==2) sale.push(item)
                if(item.type==3) game.push(item)
                if(item.type==4) live.push(item)
            })
            this.dataChildren(sys,'系统模块',1)
            this.dataChildren(sale,'销售模块',2)
            this.dataChildren(game,'游戏模块',3)
            this.dataChildren(live,'直播模块',4)

        },
        dataChildren(data,module,remark) {
        const menu = [],cata = [],button = [];
            data.map((item) => {
                if (item.status == 1) {
                    if(item.pcode==0){
                        menu.push({ children: [], ...item });
                    }else{
                        cata.push({ children: [], ...item });
                    }
                } else if (item.status == 2) {
                    button.push(item);
                }
            });
            cata.map((c) => [
                button.map((b) => {
                if (b.pcode == c.id) {
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
                if (c.pcode == m.id) {
                    m.children.push(c);
                }
                });
            });
            menu.map(m=>{
                if(m.children.length==0){
                    delete m['children']
                }
            })
            let returndata=[{
                children:this.convertToTreedata(menu),
                title:module,
                key:remark,
                value:remark
            }]
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
            if(this.ids.length==0){
                this.$message({
                    message:'请选择至少一个权限',
                    type:'error'
                })
                return false
            }
            let params={
                    id:this.id,
                    ids:this.ids.join(',')
                }
            setRole(params).then(()=>{
                this.visible=false
                this.$message.success('操作成功');
                this.$emit('refreshDataList')
            })
        },
    },
}
</script>