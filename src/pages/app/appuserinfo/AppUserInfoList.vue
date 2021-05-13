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
            style="width:180px"
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
  import { post,postForm } from "@/assets/api/index";
  import TableForm from './AppUserInfoForm'
  const Columns = [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
              {
          title: "用户id",
          dataIndex: "userId",
          key: "userId",
        },
              {
          title: "总跑步里程",
          dataIndex: "totalMileage",
          key: "totalMileage",
        },
              {
          title: "总跑步步数",
          dataIndex: "totalStep",
          key: "totalStep",
        },
              {
          title: "总消耗卡路里",
          dataIndex: "totalCal",
          key: "totalCal",
        },
              {
          title: "总跑步时间",
          dataIndex: "totalDuration",
          key: "totalDuration",
        },
              {
          title: "上次身体得分",
          dataIndex: "lastBodyScore",
          key: "lastBodyScore",
        },
              {
          title: "上次检测bmi",
          dataIndex: "lastBmi",
          key: "lastBmi",
        },
              {
          title: "上次体脂率",
          dataIndex: "lastFatRate",
          key: "lastFatRate",
        },
              {
          title: "上次基础代谢率",
          dataIndex: "lastBasalMetabolism",
          key: "lastBasalMetabolism",
        },
              {
          title: "上次运动里程",
          dataIndex: "lastMileage",
          key: "lastMileage",
        },
              {
          title: "上次运动步数",
          dataIndex: "lastStep",
          key: "lastStep",
        },
              {
          title: "上次消耗卡路里",
          dataIndex: "lastCal",
          key: "lastCal",
        },
              {
          title: "上次运动时长",
          dataIndex: "lastDuration",
          key: "lastDuration",
        },
              {
          title: "上次运动开始时间",
          dataIndex: "lastStartTime",
          key: "lastStartTime",
        },
              {
          title: "上次运动结束时间",
          dataIndex: "lastEndTime",
          key: "lastEndTime",
        },
              {
          title: "总使用次数",
          dataIndex: "useNum",
          key: "useNum",
        },
              {
          title: "总使用时长",
          dataIndex: "useDuration",
          key: "useDuration",
        },
              {
          title: "累计充值",
          dataIndex: "totalRecharge",
          key: "totalRecharge",
        },
              {
          title: "累计消费",
          dataIndex: "totalCost",
          key: "totalCost",
        },
              {
          title: "累计获取赠送/红包金额",
          dataIndex: "totalGitft",
          key: "totalGitft",
        },
              {
          title: "运动目标",
          dataIndex: "target",
          key: "target",
        },
              {
          title: "运动天数",
          dataIndex: "runDays",
          key: "runDays",
        },
              {
          title: "游戏总时长",
          dataIndex: "gameTotalDuration",
          key: "gameTotalDuration",
        },
              {
          title: "游戏总卡路里",
          dataIndex: "gameTotalCal",
          key: "gameTotalCal",
        },
              {
          title: "游戏总步数",
          dataIndex: "gameTotalStep",
          key: "gameTotalStep",
        },
              {
          title: "游戏总里程",
          dataIndex: "gameTotalMileage",
          key: "gameTotalMileage",
        },
              {
          title: "连续天数",
          dataIndex: "continuityDays",
          key: "continuityDays",
        },
              {
          title: "观看直播总时长(分钟)",
          dataIndex: "liveTotalDuration",
          key: "liveTotalDuration",
        },
              {
          title: "课程消耗cal",
          dataIndex: "liveTotalCal",
          key: "liveTotalCal",
        },
              {
          title: "观看直播/回放总次数",
          dataIndex: "liveTotalNum",
          key: "liveTotalNum",
        },
              {
          title: "直播跑步里程",
          dataIndex: "liveTotalMileage",
          key: "liveTotalMileage",
        },
              {
          title: "普通跑步里程",
          dataIndex: "commonTotalMileage",
          key: "commonTotalMileage",
        },
              {
          title: "完成VIP任务次数",
          dataIndex: "finishMissionNum",
          key: "finishMissionNum",
        },
              {
          title: "当前等级",
          dataIndex: "currentLevel",
          key: "currentLevel",
        },
              {
          title: "好友数量",
          dataIndex: "friendNum",
          key: "friendNum",
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
          postForm("/app/appuserinfo/page", params,).then((res) => {
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
        post("/app/appuserinfo/delete", [id]).then((res) => {
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