<template>
  <a-card class="codeGenerate">
    <a-row type="flex" align="top">
      <a-space>
        <a-select
          v-model="q.dsName"
          style="width: 150px"
          placeholder="请选择数据源"
        >
          <a-select-option
            v-for="item in dataSourceList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-input v-model="q.tableName" placeholder="表名称" />
        <a-button icon="search" style="margin:0px 12px" @click="getList"
          >搜索</a-button
        >
        <a-button icon="download" type="primary" @click="openBatch"
          >批量生成</a-button
        >
      </a-space>
    </a-row>
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
    <div>
      <a-table
        :columns="columns"
        rowKey="tableName"
        :data-source="dataSource"
        :pagination="listQuery"
        @change="handleTableChange"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <div slot="action" slot-scope="text, record">
          <a style="margin-right: 15px" @click="handleDown(record)">
            <a-icon type="check" />生成
          </a>
          <a @click="handleDesign(record)"> <a-icon type="edit" />设计 </a>
        </div>
      </a-table>
    </div>
    <el-dialog
      :title="preview.title"
      :visible.sync="preview.open"
      width="80%"
      top="5vh"
      append-to-body
    >
    <Preview :queryData="this.form" v-if="preview.open" />
    </el-dialog>
    <a-modal v-model="box" width="50%" title="生成配置">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
      <a-row>
        <a-col :span="12" v-if="!downColletion">
          <a-form-model-item label="表名称">
            <a-input v-model="form.tableName" disabled />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" v-else >
          <a-form-model-item v-bind="{ labelCol: { span: 2 }, wrapperCol: { span: 21 } }" label="表名称">
            <a-textarea  v-model="form.tableName" disabled  :rows='4'/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="包名" >
            <a-input v-model="form.packageName" :placeholder="holder"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="作者">
            <a-input v-model="form.author" :placeholder="holder" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="模块">
            <a-input v-model="form.moduleName" :placeholder="holder" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="表前缀">
            <a-input v-model="form.tablePrefix" :placeholder="holder"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="注释">
            <a-input v-model="form.comments" :placeholder="holder"/>
          </a-form-model-item>
        </a-col>
      </a-row>
        <a-form-model-item :wrapper-col="{ span: 16, offset: 8 }">
          <a-button icon="eye" type="primary" @click="handleView()">
            预览
          </a-button>
          <a-button icon="check" style="margin-left: 10px;" @click="gen()">
            下载
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer"><span></span></template>
    </a-modal>
  </a-card>
</template>
<script>
import { fetchList, fetchSelectDsList, handleDown } from "@/assets/api/gen/gen";
import Preview from "./preview";
export default {
  name: "codeGenetator",
  components: { Preview },
  data() {
    return {
      q: {},
      dataSourceList: [],
      box: false,
      formData: {},
      jsonData: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      holder:'可为空，加载系统默认配置',
      downColletion:false,
      form: {
        tableName: "",
        region: undefined,
        packageName: undefined,
        author: undefined,
        tablePrefix: undefined,
        moduleName: undefined,
        comments: undefined,
      },
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: 60,
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: " 表名称 ",
          dataIndex: "tableName",
          key: "tableName",
        },
        {
          title: " 表注释 ",
          dataIndex: "tableComment",
          key: "tableComment",
        },
        {
          title: " 创建时间 ",
          dataIndex: "tableCollation",
          key: "tableCollation",
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
      dataSource: [],
      selectedRowKeys: [],
      listQuery: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total) => `共有 ${total} 条数据`,
      },
      // 预览参数
      preview: {
        open: false,
        title: "代码预览",
      },
    };
  },
  created() {
    this.getdataSourceList();
    this.columns.map((item) => {
      if (item.sorter) {
        item.sorter = function(a, b) {
          let aItem = a[item.dataIndex] || 0;
          let bItem = b[item.dataIndex] || 0;
          return aItem - bItem;
        };
      }
    });
  },
  mounted() {
    this.getList();
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
    // 设计
    handleDesign: function(row) {
      this.$router.push({
        path: "/gen/demo",
        query: { tableName: row.tableName, dsName: this.q.dsName },
      });
    },
    // 预览
    handleView: function () {
      this.formData.dsName = this.q.dsName;
      console.log(this.formData)
      this.preview.open = true;
    },
    // 生成
    handleDown: function(row) {
      this.form={
        tableName: row.tableName,
        region: undefined,
        packageName: undefined,
        author: undefined,
        tablePrefix: undefined,
        moduleName: undefined,
        comments: undefined,
      },
      this.box = true;
    },
    // 下载
    gen(form, done) {
      // this.formData.dsName = this.q.dsName;
      handleDown(this.form)
        .then(() => {
          done();
          this.box = false;
        })
        .catch(() => {
          done();
        });
    },
    // 搜索数据源
    getdataSourceList() {
      fetchSelectDsList().then((response) => {
        this.dataSourceList = response.data.data;
      });
    },
    getList() {
      fetchList(
        Object.assign(
          {
            size: this.listQuery.pageSize,
            current: this.listQuery.current,
          },
          this.q
        )
      ).then((response) => {
        this.dataSource = response.data.data.records;
        this.listQuery.total = response.data.data.total;
      });
    },
    // 批量生成
    openBatch() {
      this.downColletion=true
      if (
        this.selectedRowKeys.length <= 1
      ) {
        this.$message.error("选中表数量不合法，数量最少2个");
        return false;
      }
      let tableName = [];
      for (const table of this.selectedRowKeys) {
        tableName.push(table);
      }
      this.form={
        tableName: tableName.join("-"),
        region: undefined,
        packageName: undefined,
        author: undefined,
        tablePrefix: undefined,
        moduleName: undefined,
        comments: undefined,
      },
      this.box = true;
    },
    submit() {
      this.formData.dsName = this.q.dsName;
      this.preview.open = true;
    },
    handleTableChange(x) {
      this.listQuery.pageSize=x.pageSize
      this.listQuery.current = x.current;
      this.getList();
    },
  },
};
</script>
