<template>
  <a-card class="depart">
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
      @change='handleTableChange'
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
import { departList, delDepart } from "@/assets/api/api-sys/sys";
import TableForm from "./depart_form";
export default {
  components: { TableForm },
  data() {
    return {
      dataSource: [],
      addOrUpdateVisible: false,
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
        { key: "name", dataIndex: "name", title: "部门名称" },
        { key: "sort", dataIndex: "sort", title: "排序", sorter: true },
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
      let params = {
        pageSize: this.listQuery.pageSize,
        pageIndex: this.listQuery.current,
      };
      if (this.CdtionSearch.content && this.CdtionSearch.type) {
        params[this.CdtionSearch.type] = this.CdtionSearch.content;
      }
      departList(params).then((result) => {
        this.dataChildren(result.data.content.records);
      });
    },
    // 处理table数据
    dataChildren(data) {
      const menu = [],
        cata = [];
      data.map((item) => {
        if (item.parentId == null) {
          menu.push({ children: [], ...item });
        } else {
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
      cata.map((c) => {
        if (c.children.length == 0) {
          delete c["children"];
        }
      });
      menu.map((m) => {
        cata.map((c) => {
          if (c.parentId == m.id) {
            m.children.push(c);
          }
        });
      });
      menu.map((m) => {
        if (m.children.length == 0) {
          delete m["children"];
        }
      });
      this.dataSource = menu;
      let returndata = this.convertToTreedata(menu);
      this.treeData.push(...returndata);
    },
    // 获取树数据
    convertToTreedata(data) {
      let returnData = [];
      data.map((item) => {
        let temp = {
          title: item.name,
          value: item.id,
          key: item.id,
        };
        if ("children" in item) {
          temp.children = this.convertToTreedata(item.children);
        }
        returnData.push(temp);
      });
      return returnData;
    },

    // 编辑部门
    addRecord(isEdit, row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, row, this.dataSource);
      });
    },
    // 删除部门
    deleterow(id) {
      delDepart(id).then((res) => {
        console.log(res);
        this.$message({ message: "删除成功", type: "success" });
        this.getTableData();
      });
    },
      // 分页
      handleTableChange(x) {
        this.listQuery.pageSize=x.pageSize
        this.listQuery.current = x.current;
        console.log(x)
    },
  },
};
</script>
