<template>
  <a-card class="role">
    <a-space>
      <a-button @click="addRecord(false)" type="primary">新建</a-button>
    </a-space>
    <a-space style="float:right;marginBottom:18px">
      <a-select
        v-model="CdtionSearch.type"
        placeholder="请选择搜索条件"
        style="width:100px"
      >
        <a-select-option
          v-for="(item, i) in columns.filter((item) => item.key != 'action')"
          :key="i"
          :value="item.key"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
      <a-input
        width="100"
        placeholder="请输入搜索内容"
        v-model="CdtionSearch.content"
      ></a-input>
      <a-button @click="getTableData()">搜 索</a-button>
    </a-space>
    <a-table
      bordered
      :columns="columns"
      :data-source="dataSource"
      :pagination="listQuery"
      :rowClassName="(record, index) => (index % 2 === 1 ? 'odd' : 'even')"
      rowKey="id"
      @change="handleTableChange"
    >
      <a-space slot="action" slot-scope="text, record">
        <a @click="setRole(record.id)" style="color:rgb(250, 84, 28);marginRight:20px"><a-icon type="sound" /> 权限配置</a>
        <a @click="addRecord(true, record)"><a-icon type="edit" /> 编辑</a>
        <a @click="deleterow(record.id)"> <a-icon type="delete" /> 删除 </a>
      </a-space>
    </a-table>
    <TableForm
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      :treeData='treeData'
      @refreshDataList="getTableData"
    />
    <SetRole
      v-if="setRoleModalVisible"
      ref="setRoleModal"
      @refreshDataList="getTableData"
    />
  </a-card>
</template>
<script>
import { roleList, delRole } from "@/assets/api/api-sys/sys";
import TableForm from "./role_form";
import SetRole from "./set_role";
export default {
  components: { TableForm,SetRole },
  data() {
    return {
      dataSource: [],
      treeData: [],
      addOrUpdateVisible: false,
      setRoleModalVisible: false,
        listQuery: {
          total: 0,
          current: 1,
          pageSize: 10,
          showTotal: (total) => `共有 ${total} 条数据`,
        },
      CdtionSearch: {
        type: null,
        content: null,
      },
      columns: [
        { key: "name", dataIndex: "name", title: "名称" },
        { key: "enName", dataIndex: "enName", title: "别名" },
        { key: "remark", dataIndex: "remark", title: "备注" },
        {
          key: "action",
          dataIndex: "action",
          title: "操作",
          width: 300,
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  created() {
    this.columns.map((item) => {
      if (item.sorter) {
        item.sorter = function(a, b) {
          let aItem = a[item.dataIndex] || 0;
          let bItem = b[item.dataIndex] || 0;
          return aItem - bItem;
        };
      }
    });
    this.getTableData();
  },
  methods: {
    // 获取table数据
    getTableData() {
        this.treeData=[]
      let params = {
        pageSize: this.listQuery.pageSize,
        pageIndex: this.listQuery.current,
      };
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      roleList(params).then((result) => {
        this.listQuery.total=result.data.content.total
        this.dataChildren(this.unique(result.data.content.records))
      });
    },
    // 处理table数据
    dataChildren(data) {
      const menu = [],cata = [];
      data.map((item) => {
        if(item.pid==0){
            menu.push({ children: [], ...item });
        }else{
            cata.push({ children: [], ...item });
        }
      })
      cata.map(c=>{
          if(c.children.length==0){
            delete c['children']
          }
      })
      menu.map((m) => {
        cata.map((c) => {
          if (c.pid == m.id) {
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
    // 去重
    unique(arr){
        var hash = {};
        arr = arr.reduce(function(item, next) {
            hash[next.name] ? '' : hash[next.name] = true && item.push(next);
            return item
        }, [])
        return arr

    },
    // 编辑角色
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },
    // 删除角色
    deleterow(id) {
      delRole(id).then((res) => {
        console.log(res);
        this.$message({ message: "删除成功", type: "success" });
        this.getTableData();
      });
    },
    // 权限分配
    setRole(id) {
        this.setRoleModalVisible = true;
        this.$nextTick(() => {
            this.$refs.setRoleModal.init(id);
        });
    },
    // 分页
    handleTableChange(x) {
      this.listQuery.pageSize=x.pageSize
      this.listQuery.current = x.current;
      this.getTableData();
    },
  },
};
</script>
