<template>
  <a-card>
    <div>
      <a-space style="marginBottom:18px">
        <a-button @click="addRecord(false)" type="primary">新建</a-button>
        <a-button @click="getXiaoxue()" type="primary">获取小学数据</a-button>
        <a-button @click="getMapData()" type="primary">地图标点</a-button>
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
          rowKey="location"
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
        <span slot="schoolType" slot-scope="text">
          <span v-if="text==1">小学</span>
          <span v-if="text==2">初中</span>
          <span v-if="text==3">高中</span>
          <span v-if="text==4">小学中学</span>
          <span v-if="text==5">初中高中</span>
          <span v-if="text==6">小初高</span>
        </span>
      </a-table>
      <table-form
          v-if="addOrUpdateVisible"
          ref="addOrUpdate"
          @refreshDataList="getTableData"></table-form>
      <AmapData v-if="mapDataVisible" ref="mapData"></AmapData>

    </div>
  </a-card>
</template>

<script>
import {get, post, postForm} from "@/assets/api/index";
  import TableForm from './AmapSchoolForm'
  import AmapData from './AmapData'
  const Columns = [

              {
          title: "学校名称",
          dataIndex: "name",
          key: "name",
        },
              {
          title: "",
          dataIndex: "type",
          key: "type",
        },
              {
          title: "",
          dataIndex: "typecode",
          key: "typecode",
        },
              {
          title: "学校地址",
          dataIndex: "address",
          key: "address",
        },
              {
          title: "定位",
          dataIndex: "location",
          key: "location",
        },
              {
          title: "省code",
          dataIndex: "pcode",
          key: "pcode",
        },
              {
          title: "省名称",
          dataIndex: "pname",
          key: "pname",
        },
              {
          title: "市code",
          dataIndex: "citycode",
          key: "citycode",
        },
              {
          title: "市名称",
          dataIndex: "cityname",
          key: "cityname",
        },
              {
          title: "地区code",
          dataIndex: "adcode",
          key: "adcode",
        },
              {
          title: "地区名称",
          dataIndex: "adname",
          key: "adname",
        },
              {
          // schoolType: "学校,1小学,2初中,3 高中,4小学中学,5.初中高中,6.小初高",
          title: "学校类型",
          dataIndex: "schoolType",
          key: "schoolType",
          scopedSlots: { customRender: "schoolType" },
        },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width:180,
      scopedSlots: { customRender: "action" },
    },
  ];
  export default {
    name: "QueryList",
    components: { TableForm,AmapData },
    data() {
      return {
        dataSource: [],  // table 数据源
        addOrUpdateVisible:false, // form的显示
        mapDataVisible:false, // form的显示
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
            // size: 20000,
            current: this.listQuery.current,
          }
          if(this.CdtionSearch.content && this.CdtionSearch.type){
              params[this.CdtionSearch.type]=this.CdtionSearch.content
          }
        postForm("/api-sys/system/amapSchool/page", params).then((res) => {
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
      getXiaoxue(){
        get("/api-sys/system/amapSchool/xiaoxue","");
      },
      // 删除菜单
      deleteRecord(id) {
        post("/api-sys/system/amapSchool/delete", [id]).then((res) => {
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
      getMapData(){
        this.mapDataVisible=true
        this.$nextTick(() => {
          this.$refs.mapData.init()
        })
      }


    },
  };
</script>