<template>
  <a-card class="user">
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
        <a @click="setRole(record.id)" style="color:rgb(250, 84, 28);marginRight:20px"><a-icon type="sound" /> 角色分配</a>
        <a @click="addRecord(true, record)"><a-icon type="edit" />编辑</a>
        <a @click="deleterow(record.id)"> <a-icon type="delete" />删除 </a>
      </a-space>
    </a-table>
    <TableForm
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
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
import { userList, delUser } from "@/assets/api/api-sys/sys";
import TableForm from "./user_form";
import SetRole from "./set_role";
export default {
  components: { TableForm,SetRole },
  data() {
    return {
      dataSource: [],
      addOrUpdateVisible: false,
      setRoleModalVisible: false,
        listQuery: {
          total: 0,
          current: 0,
          pageSize: 10,
          showTotal: (total) => `共有 ${total} 条数据`,
        },
      CdtionSearch: {
        type: null,
        content: null,
      },
      columns: [
        { key: "account", dataIndex: "account", title: "账号" },
        { key: "userName", dataIndex: "userName", title: "用户名称" },
        { key: "email", dataIndex: "email", title: "邮箱" },
        { key: "phone", dataIndex: "phone", title: "手机号码" },
        { key: "enable", dataIndex: "enable", title: "状态",align:'center' },
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
      let params = {};
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      userList(params).then((result) => {
        this.dataSource = result.data.content.records;
      });
    },
    // 编辑用户
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },
    // 删除用户
    deleterow(id) {
      delUser({ids:id}).then((res) => {
        console.log(res);
        this.$message({ message: "删除成功", type: "success" });
        this.getTableData();
      });
    },
    // juesefen
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
    },
  },
};
</script>
