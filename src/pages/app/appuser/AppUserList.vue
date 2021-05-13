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
  import TableForm from './AppUserForm'
  const Columns = [
              {
          title: "",
          dataIndex: "id",
          key: "id",
        },
              {
          title: "手机号",
          dataIndex: "phone",
          key: "phone",
        },
              {
          title: "昵称",
          dataIndex: "nickname",
          key: "nickname",
        },
              {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
              {
          title: "密码",
          dataIndex: "password",
          key: "password",
        },
              {
          title: "邮箱",
          dataIndex: "email",
          key: "email",
        },
              {
          title: "性别 1男2 女",
          dataIndex: "sex",
          key: "sex",
        },
              {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
              {
          title: "体重",
          dataIndex: "weight",
          key: "weight",
        },
              {
          title: "身高",
          dataIndex: "height",
          key: "height",
        },
              {
          title: "头像",
          dataIndex: "headImg",
          key: "headImg",
        },
              {
          title: "身份证号",
          dataIndex: "idCard",
          key: "idCard",
        },
              {
          title: "状态,1,新用户,2,老用户,3禁用",
          dataIndex: "status",
          key: "status",
        },
              {
          title: "是否已缴纳押金,0 未缴纳,1 已缴纳 ,2 已退押金",
          dataIndex: "deposit",
          key: "deposit",
        },
              {
          title: "余额",
          dataIndex: "money",
          key: "money",
        },
              {
          title: "实际充值金额",
          dataIndex: "inMoney",
          key: "inMoney",
        },
              {
          title: "赠送金额",
          dataIndex: "largessMoney",
          key: "largessMoney",
        },
              {
          title: "押金金额",
          dataIndex: "depositMoney",
          key: "depositMoney",
        },
              {
          title: "点位Id",
          dataIndex: "pointId",
          key: "pointId",
        },
              {
          title: "点位名称",
          dataIndex: "pointName",
          key: "pointName",
        },
              {
          title: "云信accid",
          dataIndex: "socialUid",
          key: "socialUid",
        },
              {
          title: "云信token",
          dataIndex: "socialToken",
          key: "socialToken",
        },
              {
          title: "",
          dataIndex: "pushToken",
          key: "pushToken",
        },
              {
          title: "",
          dataIndex: "uuid",
          key: "uuid",
        },
              {
          title: "",
          dataIndex: "source",
          key: "source",
        },
              {
          title: "",
          dataIndex: "socialSource",
          key: "socialSource",
        },
              {
          title: "",
          dataIndex: "lng",
          key: "lng",
        },
              {
          title: "",
          dataIndex: "lat",
          key: "lat",
        },
              {
          title: "",
          dataIndex: "province",
          key: "province",
        },
              {
          title: "",
          dataIndex: "city",
          key: "city",
        },
              {
          title: "",
          dataIndex: "area",
          key: "area",
        },
              {
          title: "",
          dataIndex: "addrDetail",
          key: "addrDetail",
        },
              {
          title: "保险信息是否填写0,未填写,1已填写,2,跳过",
          dataIndex: "insuranceStatus",
          key: "insuranceStatus",
        },
              {
          title: "生日",
          dataIndex: "birthday",
          key: "birthday",
        },
              {
          title: "个性签名",
          dataIndex: "idiograph",
          key: "idiograph",
        },
              {
          title: "是否已阅读跑步机引导",
          dataIndex: "treadmillStatus",
          key: "treadmillStatus",
        },
              {
          title: "",
          dataIndex: "redpacketMoney",
          key: "redpacketMoney",
        },
              {
          title: "",
          dataIndex: "withdrawableRedpacketMoney",
          key: "withdrawableRedpacketMoney",
        },
              {
          title: "家乐币",
          dataIndex: "fitcoin",
          key: "fitcoin",
        },
              {
          title: "跑步机唯一标识Sn",
          dataIndex: "sn",
          key: "sn",
        },
              {
          title: "正在做什么",
          dataIndex: "doing",
          key: "doing",
        },
              {
          title: "是否領取VIP(0,1)",
          dataIndex: "presentVip",
          key: "presentVip",
        },
              {
          title: "微信openId",
          dataIndex: "openId",
          key: "openId",
        },
              {
          title: "注册时间",
          dataIndex: "registerDate",
          key: "registerDate",
        },
              {
          title: "在线状态(1.在线 2.空闲 3.离线)",
          dataIndex: "online",
          key: "online",
        },
              {
          title: "跑步机所在城市",
          dataIndex: "treadCity",
          key: "treadCity",
        },
              {
          title: "用户类型0 普通用户,1,管理员,2,机器人",
          dataIndex: "userType",
          key: "userType",
        },
              {
          title: "粉丝人数",
          dataIndex: "fansNum",
          key: "fansNum",
        },
              {
          title: "关注人数",
          dataIndex: "attentionNum",
          key: "attentionNum",
        },
              {
          title: "1.成年人 2.青少年",
          dataIndex: "flag",
          key: "flag",
        },
              {
          title: "年级(1.一年级...12.高三)",
          dataIndex: "grade",
          key: "grade",
        },
              {
          title: "学校",
          dataIndex: "schoolId",
          key: "schoolId",
        },
              {
          title: "学校名称",
          dataIndex: "schoolName",
          key: "schoolName",
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
        postForm("/app/appuser/page", params).then((res) => {
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
        post("/app/appuser/delete", [id]).then((res) => {
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