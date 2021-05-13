<template>
  <a-card class="client">
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
      rowKey="id"
    >
      <a-space slot="action" slot-scope="text, record">
        <a @click="addRecord(true, record)"><a-icon type="edit" />编辑</a>
      </a-space>
    </a-table>
    <TableForm
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getTableData"
    />
  </a-card>
</template>
<script>
import { oauthClient } from "@/assets/api/api-sys/sys";
import TableForm from "./client_form";
export default {
  components: { TableForm },
  data() {
    return {
      dataSource: [],
      addOrUpdateVisible: false,
      CdtionSearch: {
        type: null,
        content: null,
      },
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: 70,
          customRender: (text, record, index) => `${index + 1}`,
        },
        { key: "resourceIds", dataIndex: "resourceIds", title: "资源名称" },
        { key: "clientId", dataIndex: "clientId", title: "client_id" },
        { key: "clientSecret", dataIndex: "clientSecret", title: "client_secret" },
        { key: "scope", dataIndex: "scope", title: "scope" },
        { key: "grantTypes", dataIndex: "grantTypes", title: "grant_type" },
        { key: "clientName", dataIndex: "clientName", title: "client_name" },
        { key: "clientUri", dataIndex: "clientUri", title: "client_uri" },
        { key: "description", dataIndex: "description", title: "descri" },
        {
          key: "action",
          dataIndex: "action",
          title: "操作",
          width: 200,
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
    // 获取table数据
    getTableData() {
      let params = {};
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      oauthClient(params).then((result) => {
        this.dataSource=result.data.content.records
      });
    },
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },
  },
};
</script>
