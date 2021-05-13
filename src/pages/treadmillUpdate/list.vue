<template>
  <a-card class="client">
    <a-space>
      <a-button @click="addRecord(false)" type="primary">新建</a-button>
      <a-button @click="sendNew()" type="primary">发送更新</a-button>
    </a-space>
    <a-space style="float:right;marginBottom:18px">
      <a-select
        v-model="CdtionSearch.type"
        placeholder="请选择搜索条件"
        style="width:150px"
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
import { treadmillUpdate } from "@/assets/api/api-sys/sys";
import TableForm from "./treadmillUpdata_form";
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
        { key: "packageName", dataIndex: "packageName", title: "包名" },
        { key: "name", dataIndex: "name", title: "版本名称" },
        { key: "code", dataIndex: "code", title: "版本号" },
        { key: "type", dataIndex: "type", title: "跑步机类型" },
        { key: "downUrl", dataIndex: "downUrl", title: "下载地址" },
        { key: "force", dataIndex: "force", title: "是否强制更新" },
        { key: "flag", dataIndex: "flag", title: "2是为了更新OTA" },
        { key: "updateDate", dataIndex: "updateDate", title: "更新时间" },
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
      this.treeData = [];
      let params = { };
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      treadmillUpdate(params).then((result) => {
          this.dataSource=result.data.content.records
      });
    },
    sendNew(){},
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },

  },
};
</script>
