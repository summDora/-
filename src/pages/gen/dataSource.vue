<template>
  <a-card>

    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
      </a-space>
      <a-table
        :columns="columns"
        rowKey="tableName"
        :data-source="dataSource"
        :pagination="listQuery"
        @change="handleTableChange"
      >
        <div slot="action" slot-scope="text, record">
          <a style="margin-right: 8px" @click="editRecord(record)">
            <a-icon type="edit" />编辑
          </a>
          <a @click="deleteRecord(record.id)"> <a-icon type="delete" />删除 </a>
        </div>
        <div slot="datetype" slot-scope="text">
          <span>{{text.year}}-{{text.monthValue>9?text.monthValue:'0'+text.monthValue}}-{{text.monthValue>9?text.monthValue:'0'+text.monthValue}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{{text.hour>9?text:'0'+text.hour}}:{{text.minute>9?text.minute:'0'+text.minute}}:{{text.second>9?text.second:'0'+text.second}}</span>
        </div>
      </a-table>
      <a-drawer
        :title="peonForm.name"
        width="30%"
        :maskClosable="false"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="visible = false"
      >
        <fm-generate-antd-form
          :data="jsonData"
          :remote="remoteFuncs"
          :value="editData"
          :remote-option="dynamicData"
          ref="generateForm"
        >
        </fm-generate-antd-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            textAlign: 'right',
            background: 'white',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="visible = false">
            取 消
          </a-button>
          <a-button type="primary" @click="submit">
            提 交
          </a-button>
        </div>
      </a-drawer>
    </div>
  </a-card>
</template>
<script>
import data_form from "@/assets/json/dataSource.json";
import {get, post} from '@/assets/api/index'
import { fetchDsList } from '@/assets/api/gen/gen'

const Columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 60,
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: " 名称 ",
    dataIndex: "name",
    key: "name",
  },
//   {
//     title: " 类型 ",
//     dataIndex: "tableCollation",
//     key: "tableCollation",
//   },
  {
    title: " 用户名 ",
    dataIndex: "username",
    key: "username",
  },
  {
    title: " 配置方式 ",
    dataIndex: "tableCollation",
    key: "tableCollation",
  },
  {
    title: " 创建时间 ",
    dataIndex: "createDate",
    key: "createDate",
    scopedSlots: { customRender: "datetype" },
  },
  {
    title: " 更新时间 ",
    dataIndex: "updateDate",
    key: "updateDate",
    scopedSlots: { customRender: "datetype" },
  },
  {
    title: "操作",
    width: 180,
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "datasource",
  data() {
    return {
      jsonData: {},
      editData: {},
      remoteFuncs: {},
      dynamicData: {},

      filename: "导出文件名",
      total: 0,
      expandImg: false,
      expandSrc: undefined,
      visible: false,
      columns: Columns,
      dataSource: [],

      listQuery: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total) => `共有 ${total} 条数据`,
      },
      peonForm: {
        name: "新建表单",
      },
      coachDetail: {
        name: "教练详情",
        id: null,
      },
      courseDetail: {
        name: "课程详情",
        id: null,
      },
      form: this.$form.createForm(this),
      layout: { labelCol: { span: 6 }, wrapperCol: { span: 16 } },
      selectOption: [],
      fileList: [],
    };
  },
  created() {
    this.jsonData = data_form;
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
    getTableData() {
        fetchDsList({
        size: this.listQuery.pageSize,
        current: this.listQuery.current,
      }).then((res) => {
          console.log(res)
        this.dataSource = res.data.data.records;
        this.listQuery.total = res.data.data.total;
      });
    },
    addNew() {
      this.peonForm.name = "新建表单";
      this.visible = true;
      this.$refs.generateForm.reset()
    },
    editRecord(record) {
      this.peonForm.name = "编辑表单";
      this.visible = true;
      this.$refs.generateForm.setData(record)
    },
    deleteRecord(id) {
      get("/delete", [id]).then((res) => {
        if (res.code == 200) {
          this.getTableData();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    submit() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          if (this.peonForm.name.includes("新建")) {
            post("/add", data).then((res) => {
              if (res.code == 200) {
                this.getTableData();
                this.$message.success(res.msg);
                this.visible = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            post("/update", data).then((res) => {
              if (res.code == 200) {
                this.getTableData();
                this.$message.success(res.msg);
                this.visible = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleTableChange(x) {
      console.log(x);
      this.listQuery.current = x.current;
      this.getTableData();
    },

    // 导出excel
    download() {
      const tHeader = [];
      const filterVal = [];
      import("@/utils/Export2Excel").then((excel) => {
        this.columns.map((item) => {
          tHeader.push(item.title);
          filterVal.push(item.dataIndex);
        });
        const list = this.dataSource;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j == "sex") {
            return v[j] == 0 ? "男" : "女";
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>
