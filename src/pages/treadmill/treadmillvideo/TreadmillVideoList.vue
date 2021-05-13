<template>
  <a-card>
    <div>
      <a-space style="marginBottom:18px">
        <a-button @click="addRecord(false)" type="primary">新建</a-button>

      </a-space>
      <a-space style="float:right">
        <a-select
            v-model="CdtionSearch.type"
            placeholder="请选择搜索条件"
            style="width:100px"
        >
          <a-select-option
              v-for="(item, i) in columns.filter(item=>item.key!='action')"
              :key="i"
              :value="item.key"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
        <a-input width='100' placeholder="请输入搜索内容" v-model="CdtionSearch.content"></a-input>
        <a-button type='cyan' @click="getTableData()">搜 索</a-button>
      </a-space>

      <a-table
          :columns="columns"
          rowKey="tableName"
          :data-source="dataSource"
          :pagination="listQuery"
          @change="handleTableChange"
      >
        <a-space slot="action" slot-scope="text, record">
          <a @click="addRecord(true,record)">
            <a-icon type="edit" />编辑
          </a>
          <a @click="deleteRecord(record.id)"> <a-icon type="delete" />删除 </a>
        </a-space>
      </a-table>
      <table-form
          v-if="addOrUpdateVisible"
          ref="addOrUpdate"
          @refreshDataList="getTableData"></table-form>

    </div>
  </a-card>
</template>

<script>
  import { post, postForm } from "@/assets/api/index";
  import TableForm from './TreadmillVideoForm'
  const Columns = [
              {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
              {
          title: "视频名称",
          dataIndex: "videoName",
          key: "videoName",
        },
              {
          title: "视频图片地址",
          dataIndex: "videoImg",
          key: "videoImg",
        },
              {
          title: "视频时长",
          dataIndex: "duration",
          key: "duration",
        },
              {
          title: "视频资源地址",
          dataIndex: "url",
          key: "url",
        },
              {
          title: "视频排序",
          dataIndex: "sort",
          key: "sort",
        },
              {
          title: "1.热身视频  2.实景视频 3.使用教学 4.首页展示",
          dataIndex: "type",
          key: "type",
        },
              {
          title: "1.展示图片 2.展示视频(type =4有效)",
          dataIndex: "status",
          key: "status",
        },
      
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      scopedSlots: { customRender: "action" },
    },
  ];
  export default {
    name: "QueryList",
    components: { TableForm },
    data() {
      return {
        dataSource: [],  // table 数据源
        addOrUpdateVisible:false, // form的显示
        columns: Columns,
        CdtionSearch:{
          type:null,
          content:null
        },
        listQuery: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => `共有 ${total} 条数据`,
        },
        selectOption: [],
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
      // 获取table
      getTableData() {
          let params={
            size: this.listQuery.pageSize,
            current: this.listQuery.current,
          }
          if(this.CdtionSearch.content && this.CdtionSearch.type){
              params[this.CdtionSearch.type]=this.CdtionSearch.content
          }
        postForm("/treadmill/treadmillvideo/page", params).then((res) => {
          this.dataSource = res.data.records;
          this.listQuery.total = res.data.total;
        });
      },
      // 新增
      addRecord(isEdit,row){
        this.addOrUpdateVisible=true
        this.$nextTick(() => {
          this.$refs.addOrUpdate
                  .init(isEdit, row ,this.dataSource)
        })
      },
      // 删除菜单
      deleteRecord(id) {
        post("/treadmill/treadmillvideo/delete", [id]).then((res) => {
          if (res.code == 200) {
            this.getTableData();
            this.$message
                    .success(res.msg);
          } else {
            this.$message
                    .error(res.msg);
          }
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