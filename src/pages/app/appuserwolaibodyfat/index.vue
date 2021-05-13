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
  import { post, get } from "@/assets/api/index";
  import TableForm from './AppUserWolaiBodyFatForm'
  const Columns = [
              {
          title: "id",
          dataIndex: "id",
          key: "id",
        },              {
          title: "type",
          dataIndex: "type",
          key: "type",
        },              {
          title: "user_id",
          dataIndex: "userId",
          key: "userId",
        },              {
          title: "sn",
          dataIndex: "sn",
          key: "sn",
        },              {
          title: "height",
          dataIndex: "height",
          key: "height",
        },              {
          title: "age",
          dataIndex: "age",
          key: "age",
        },              {
          title: "sex",
          dataIndex: "sex",
          key: "sex",
        },              {
          title: "weight",
          dataIndex: "weight",
          key: "weight",
        },              {
          title: "electrode",
          dataIndex: "electrode",
          key: "electrode",
        },              {
          title: "bmi",
          dataIndex: "bmi",
          key: "bmi",
        },              {
          title: "bfp",
          dataIndex: "bfp",
          key: "bfp",
        },              {
          title: "sfp",
          dataIndex: "sfp",
          key: "sfp",
        },              {
          title: "vfr",
          dataIndex: "vfr",
          key: "vfr",
        },              {
          title: "mp",
          dataIndex: "mp",
          key: "mp",
        },              {
          title: "bmr",
          dataIndex: "bmr",
          key: "bmr",
        },              {
          title: "bone_mass",
          dataIndex: "boneMass",
          key: "boneMass",
        },              {
          title: "bwp",
          dataIndex: "bwp",
          key: "bwp",
        },              {
          title: "ma",
          dataIndex: "ma",
          key: "ma",
        },              {
          title: "pp",
          dataIndex: "pp",
          key: "pp",
        },              {
          title: "smp",
          dataIndex: "smp",
          key: "smp",
        },              {
          title: "sbc",
          dataIndex: "sbc",
          key: "sbc",
        },              {
          title: "temperature",
          dataIndex: "temperature",
          key: "temperature",
        },              {
          title: "hr",
          dataIndex: "hr",
          key: "hr",
        },              {
          title: "imp",
          dataIndex: "imp",
          key: "imp",
        },              {
          title: "imp_left_hand",
          dataIndex: "impLeftHand",
          key: "impLeftHand",
        },              {
          title: "imp_right_hand",
          dataIndex: "impRightHand",
          key: "impRightHand",
        },              {
          title: "imp_left_feet",
          dataIndex: "impLeftFeet",
          key: "impLeftFeet",
        },              {
          title: "imp_right_feet",
          dataIndex: "impRightFeet",
          key: "impRightFeet",
        },              {
          title: "left_arm",
          dataIndex: "leftArm",
          key: "leftArm",
        },              {
          title: "right_arm",
          dataIndex: "rightArm",
          key: "rightArm",
        },              {
          title: "left_leg",
          dataIndex: "leftLeg",
          key: "leftLeg",
        },              {
          title: "right_leg",
          dataIndex: "rightLeg",
          key: "rightLeg",
        },              {
          title: "all_body",
          dataIndex: "allBody",
          key: "allBody",
        },              {
          title: "left_arm_muscle",
          dataIndex: "leftArmMuscle",
          key: "leftArmMuscle",
        },              {
          title: "right_arm_muscle",
          dataIndex: "rightArmMuscle",
          key: "rightArmMuscle",
        },              {
          title: "left_leg_muscle",
          dataIndex: "leftLegMuscle",
          key: "leftLegMuscle",
        },              {
          title: "right_leg_muscle",
          dataIndex: "rightLegMuscle",
          key: "rightLegMuscle",
        },              {
          title: "all_body_muscle",
          dataIndex: "allBodyMuscle",
          key: "allBodyMuscle",
        }      ,
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
          type:'',
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
          if(this.CdtionSearch.content){
              params[this.CdtionSearch.type]=this.CdtionSearch.content
          }
        post("/app/appuserwolaibodyfat/page", params).then((res) => {
          this.dataSource = res.data.records;
          this.listQuery.total = res.data.total;
        });
      },
      // 新增菜单
      addRecord(isEdit,row){
        this.addOrUpdateVisible=true
        this.$nextTick(() => {
          this.$refs.addOrUpdate
                  .init(isEdit, row ,this.dataSource)
        })
      },
      // 删除菜单
      deleteRecord(id) {
        post("/app/appuserwolaibodyfat/delete", [id]).then((res) => {
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
      select(){
        console.log(this.CdtionSearch)
        get('/app/appuserwolaibodyfat/select',this.CdtionSearch).then(res=>{
          console.log(res)
        })
      }

    },
  };
</script>