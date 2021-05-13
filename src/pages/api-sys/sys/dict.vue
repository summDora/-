<template>
  <a-card class="dict">
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
      :rowClassName="(record, index) => (index % 2 === 1 ? 'odd' : 'even')"
      rowKey="id"
    >
      <a-space slot="action" slot-scope="text, record">
        <a @click="addRecord(true, record)"><a-icon type="edit" />编辑</a>
        <a @click="deleterow(record.id)"> <a-icon type="delete" />删除 </a>
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
import { dictList, delDict } from "@/assets/api/api-sys/sys";
import TableForm from "./dict_form";
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
        { key: "label", dataIndex: "label", title: "标签" },
        { key: "sort", dataIndex: "sort", title: "排序", sorter: true },
        { key: "value", dataIndex: "value", title: "键值" },
        { key: "type", dataIndex: "type", title: "类型" },
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
      let params = {
        size: 200,
        current: 1,
      };
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      dictList(params).then((result) => {
        this.dataSource = result.data.content.records;
      });
    },
    // 编辑字典
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },
    // 删除字典
    deleterow(id) {
      delDict(id).then((res) => {
        console.log(res);
        this.$message({ message: "删除成功", type: "success" });
        this.getTableData();
      });
    },
  },
};
</script>
