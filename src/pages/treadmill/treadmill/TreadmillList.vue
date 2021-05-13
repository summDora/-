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
  import TableForm from './TreadmillForm'
  const Columns = [
              {
          title: "设备唯一标示",
          dataIndex: "id",
          key: "id",
        },
              {
          title: "所属点位",
          dataIndex: "pointId",
          key: "pointId",
        },
              {
          title: "唯一标示",
          dataIndex: "sn",
          key: "sn",
        },
              {
          title: "跑步机名称",
          dataIndex: "name",
          key: "name",
        },
              {
          title: "机器类型:1.QRTT1(15.6) 2.QRTX1(21.5) 3.QRTM1(23.8) 4.未识别机型",
          dataIndex: "hardVersion",
          key: "hardVersion",
        },
              {
          title: "APP版本",
          dataIndex: "appVersion",
          key: "appVersion",
        },
              {
          title: "系统版本",
          dataIndex: "systemVersion",
          key: "systemVersion",
        },
              {
          title: "总里程",
          dataIndex: "totalMileage",
          key: "totalMileage",
        },
              {
          title: "上次加油里程",
          dataIndex: "lastLube",
          key: "lastLube",
        },
              {
          title: "故障码",
          dataIndex: "faultCodes",
          key: "faultCodes",
        },
              {
          title: "状态,1待机中,2,已启动,3,维护中,4离线",
          dataIndex: "status",
          key: "status",
        },
              {
          title: "跑步机类型: 1,家庭跑步机",
          dataIndex: "type",
          key: "type",
        },
              {
          title: "是否需要交纳押金:1,不需要,2需要",
          dataIndex: "deposit",
          key: "deposit",
        },
              {
          title: "电控版本(下控)",
          dataIndex: "electricVersion",
          key: "electricVersion",
        },
              {
          title: "经度",
          dataIndex: "lng",
          key: "lng",
        },
              {
          title: "维度",
          dataIndex: "lat",
          key: "lat",
        },
              {
          title: "跑步机当前作业",
          dataIndex: "currentJob",
          key: "currentJob",
        },
              {
          title: "跑步机最大速度",
          dataIndex: "maxSpeed",
          key: "maxSpeed",
        },
              {
          title: "用戶ID",
          dataIndex: "userId",
          key: "userId",
        },
              {
          title: "",
          dataIndex: "appStoreVersion",
          key: "appStoreVersion",
        },
              {
          title: "VIP是否到期(0,1)",
          dataIndex: "vipFlag",
          key: "vipFlag",
        },
              {
          title: "开始时间",
          dataIndex: "vipStartDate",
          key: "vipStartDate",
        },
              {
          title: "到期时间",
          dataIndex: "vipEndDate",
          key: "vipEndDate",
        },
              {
          title: "此跑步机是否被领取VIP(0,1)",
          dataIndex: "presentVip",
          key: "presentVip",
        },
              {
          title: "激活时间",
          dataIndex: "presentDate",
          key: "presentDate",
        },
              {
          title: "保修截止日期(默认一年)",
          dataIndex: "effectiveDate",
          key: "effectiveDate",
        },
              {
          title: "省",
          dataIndex: "province",
          key: "province",
        },
              {
          title: "市",
          dataIndex: "city",
          key: "city",
        },
              {
          title: "区",
          dataIndex: "district",
          key: "district",
        },
              {
          title: "详细地址",
          dataIndex: "formattedAddress",
          key: "formattedAddress",
        },
              {
          title: "投放类型0,普通,1,门店,2,测试,3,特殊",
          dataIndex: "putType",
          key: "putType",
        },
              {
          title: "系统固件版本",
          dataIndex: "osVersion",
          key: "osVersion",
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
        postForm("/treadmill/treadmill/page", params).then((res) => {
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
        post("/treadmill/treadmill/delete", [id]).then((res) => {
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