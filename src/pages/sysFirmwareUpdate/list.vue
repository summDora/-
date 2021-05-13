<template>
  <a-card class="client">
    <a-space>
      <a-button @click="addRecord(false)" type="primary">新建</a-button>
      <a-button @click="sendNew()" type="primary">配置更新</a-button>
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
    <div style="margin-top: 18px;">
      <a-button
        type="primary"
        :disabled="selectedRowKeys.length == 0"
        @click="reload"
      >
        清 空
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="selectedRowKeys.length > 0">
          已选择
          <a-button type="link" style="font-weight:bold" size="small">
            {{ selectedRowKeys.length }}
          </a-button>
          条数据
        </template>
      </span>
    </div>
    <a-table
      bordered
      :columns="columns"
      :data-source="dataSource"
      :pagination="listQuery"
      :rowClassName="(record, index) => (index % 2 === 1 ? 'odd' : 'even')"
      :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
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
import { sysFirmwareUpdate } from "@/assets/api/api-sys/sys";
import TableForm from "./sysFirmwareUpdate_form";
export default {
  components: { TableForm },
  data() {
    return {
      dataSource: [],
      addOrUpdateVisible: false,
      selectedRowKeys: [],
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
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: 70,
          customRender: (text, record, index) => `${index + 1}`,
        },
        { key: "packageName", dataIndex: "packageName", title: "产品" },
        { key: "code", dataIndex: "code", title: "版本号" },
        { key: "name", dataIndex: "name", title: "版本代码" },
        { key: "type", dataIndex: "type", title: "国家" },
        { key: "downUrl", dataIndex: "downUrl", title: "语言" },
        { key: "force", dataIndex: "force", title: "固件机器类型" },
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
    // table 多选框
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 清空 table 多选框
    reload() {
      this.selectedRowKeys = [];
    },
    // 获取table数据
    getTableData() {
      this.treeData = [];
      let params = {
        size: this.listQuery.pageSize,
        current: this.listQuery.current,
      };
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      sysFirmwareUpdate(params).then((result) => {
        this.dataSource = result.data.content.records;
      });
    },
    sendNew() {},
  },
};
</script>
