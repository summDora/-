<template>
  <a-card class="menulist">
    <a-row class="topLine">
        <a-button type='primary' @click="addrow(false)">新增</a-button>
        <a-radio-group default-value="1" button-style="solid" @change='menuType' style="float:right">
            <a-radio-button value="1">
            系统菜单
            </a-radio-button>
            <a-radio-button value="3">
            游戏菜单
            </a-radio-button>
        </a-radio-group>
    </a-row>
    <div class="tablelist">
      <a-table
        bordered
        :columns="columns"
        :data-source="dataSource"
        :rowClassName="(record, index) => index % 2 === 1 ? 'odd' : 'even'"
        rowKey="id"
      >
        <div slot="status" slot-scope="text">
            <a-tag color="purple" v-if="text==1">左菜单</a-tag>
            <a-tag color="orange" v-else>按钮</a-tag>
        </div>
        <a-space slot="action" slot-scope="text, record">
          <a v-if="record.status==1" @click="addrow(false,record)"><a-icon type="plus" />新增</a>
          <a @click="addrow(true,record)"><a-icon type="edit" />编辑</a>
          <a @click="deleterow(record.id)"> <a-icon type="delete" />删除 </a>
        </a-space >
      </a-table>
    </div>
    <table-form
    v-if="addOrUpdateVisible"
    ref="addOrUpdate"
    :menutype='menutype'
    :treeData='treeData'
    @refreshDataList="getTableData"></table-form>
  </a-card>
</template>
<script>
import { sysMenuList, gameMenuList,delMenu } from "@/assets/api/api-sys/sys";
import TableForm from './menu-form'
export default {
    name: "Menu",
    components: {TableForm},
  data() {
    return {
      dataSource: [],
      addOrUpdateVisible:false,
      treeData:[],
      menutype:"1",
        listQuery: {
          total: 0,
          current: 1,
          pageSize: 10,
          showTotal: (total) => `共有 ${total} 条数据`,
        },
      columns: [
        {
          key: "name",
          dataIndex: "name",
          title: "菜单名称",
          align: "left",
        },
        {
          key: "url",
          dataIndex: "url",
          title: "组件路径",
          align: "center",
        },
        {
          key: "status",
          dataIndex: "status",
          title: "类型",
          width: 70,
          align: "center",
          scopedSlots: { customRender: "status" },
        },
        {
          key: "num",
          dataIndex: "num",
          title: "排序",
          width: 70,
          align: "center",
        },
        {
          key: "alias",
          dataIndex: "alias",
          title: "权限标识",
          width: 200,
          align: "center",
        },
        {
          key: "action",
          dataIndex: "action",
          title: "操作",
          width: 240,
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //   菜单类型切换
    menuType(index){
        this.menutype=index.target.value
        this.getTableData()
    },
    // 获取table数据
    getTableData() {
        this.dataSource=[]
        this.treeData=[]
        if(this.menutype==1){
            sysMenuList().then((res) => {
                this.dataChildren(res.data.content);
            });
        }else{
            gameMenuList().then((res) => {
                this.dataChildren(res.data.content);
            });
        }
    },
    // 获取树数据
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
    // 处理table数据
    dataChildren(data) {
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
      this.dataSource = menu;
      let returndata=this.convertToTreedata(menu)
      this.treeData.push(...returndata)
    },
    // 获取树结构
    // 新增菜单
    addrow(isEdit,row){
        this.addOrUpdateVisible=true
        this.$nextTick(() => {
            this.$refs.addOrUpdate.init(isEdit, row ,this.dataSource)
        })
    },
    // 删除菜单
    deleterow(id){
      delMenu(id).then(res=>{
        console.log(res)
        this.$message({message:res.data.message,type:'success'})
        this.getTableData()
      })
    },

  },
};
</script>
<style lang="less" scoped>
.menulist {
  .topLine {
    padding-bottom: 0px;
  }
  .tablelist {
    min-height: calc(100vh - 200px);
    // padding: 20px 30px;
  }
  .odd{
    background: darkcyan !important;
  }
  .even{
    background: darkgray !important;
  }
}
</style>
