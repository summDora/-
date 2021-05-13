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
  import TableForm from './TreadmillUpdateForm'
  const Columns = [
              {
          title: "",
          dataIndex: "id",
          key: "id",
        },
              {
          title: "包名",
          dataIndex: "packageName",
          key: "packageName",
        },
              {
          title: "版本名称",
          dataIndex: "name",
          key: "name",
        },
              {
          title: "版本号",
          dataIndex: "code",
          key: "code",
        },
              {
          title: "1.家庭 2.其他 3.全部",
          dataIndex: "type",
          key: "type",
        },
              {
          title: "下载地址",
          dataIndex: "downUrl",
          key: "downUrl",
        },
              {
          title: "是否强制更新",
          dataIndex: "force",
          key: "force",
        },
              {
          title: "md5",
          dataIndex: "md5",
          key: "md5",
        },
              {
          title: "apk大小字节（B）",
          dataIndex: "size",
          key: "size",
        },
              {
          title: "照顾老版本1.更新ota可用 2.没有更新ota的runhome",
          dataIndex: "flag",
          key: "flag",
        },
              {
          title: "更新介绍",
          dataIndex: "info",
          key: "info",
        },
              {
          title: "0.开机引导 1.系统APK 2.协控 3.单片机驱动4.应用商店5.自由跑步6.目标跑步7.帮助 8.瑜伽 9.搏击 10.智能计划 11.活动 12.饮食管理 13.智能变速跑 14.投影 15.木卫六宣传 16.爱奇艺 17.腾讯视频 18.QQ音乐 19.酷我音乐",
          dataIndex: "status",
          key: "status",
        },
              {
          title: "投放类型0,普通,1,门店,2,测试,3,特殊",
          dataIndex: "putType",
          key: "putType",
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
        postForm("/treadmill/treadmillupdate/page", params).then((res) => {
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
        post("/treadmill/treadmillupdate/delete", [id]).then((res) => {
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