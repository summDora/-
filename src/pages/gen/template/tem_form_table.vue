<template>
  <a-card>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
      </a-space>

      <a-table
        :columns="columns"
        rowKey="id"
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
      </a-table>
      <a-drawer
        :title="peonForm.name"
        width="30%"
        :maskClosable="false"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="visible = false"
      >
        <a-form :form="form">
          <a-form-item v-bind="layout" v-show="false" label="id">
            <a-input placeholder="请输入ID" v-decorator="['id']" />
          </a-form-item>
          <a-form-item v-bind="layout" label="比赛名称">
            <a-input-search
              placeholder="请输入比赛名称"
              v-decorator="['name']"
              enter-button
              @search="openSelectModal"
              @click="openSelectModal"
            />
          </a-form-item>
          <a-form-item v-bind="layout" label="比赛ID">
            <a-input placeholder="请输入比赛ID" v-decorator="['id']" />
          </a-form-item>
          <a-form-item v-bind="layout" label="比赛日期">
            <a-date-picker
              style="width:100%"
              show-time
              v-decorator="[
                'date',
                { rules: [{ required: true, message: `请选择比赛日期}` }] },
              ]"
              :placeholder="`请选择比赛日期`"
            />
          </a-form-item>
          <a-form-item v-bind="layout" label="日期范围">
            <a-range-picker
              style="width:100%"
              show-time
              v-decorator="['range']"
            />
          </a-form-item>
          <a-form-item v-bind="layout" label="性别">
            <a-select
              v-decorator="['sex']"
              placeholder="请选择性别"
              @focus="getSelectOption('sex')"
            >
              <a-select-option
                v-for="(op, i) in selectOption"
                :key="i"
                :value="op.value"
              >
                {{ op.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="layout" label="比赛图片">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
              v-decorator="['image']"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item v-bind="layout" label="富文本">
            <mavon-editor
              style="min-height: 350px;width:100%"
              v-decorator="['markdown']"
              v-model="markdown"
              @change="changeHtml"
            />
          </a-form-item>
          <a-form-item v-bind="layout" label="比赛类型">
            <a-select placeholder="请选择比赛类型" v-decorator="['type']">
              <a-select-option value="1">
                跑步
              </a-select-option>
              <a-select-option value="2">
                跳绳
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="layout" label="长文本">
            <a-textarea
              :placeholder="`请输入长文本`"
              :auto-size="{ minRows: 2, maxRows: 4 }"
              v-decorator="['textarea']"
            />
          </a-form-item>
          <a-form-item v-bind="layout" label="单选框">
            <a-radio-group
              v-decorator="['radio']"
              :placeholder="`请选择单选框内容`"
            >
              <a-radio value="1">
                内容1
              </a-radio>
              <a-radio value="2">
                内容2
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
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
      <select-list ref="selectlist" @selectItem="selectItem"></select-list>
    </div>
  </a-card>
</template>

<script>
import { post, get } from "@/assets/api/index";
import selectList from "@/components/selectList/selectList";
const Columns = [
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
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "QueryList",
  components: { selectList },
  data() {
    return {
      filename: "导出文件名",
      visible: false,
      selectModal: false,
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
      form: this.$form.createForm(this),
      layout: { labelCol: { span: 6 }, wrapperCol: { span: 16 } },
      selectOption: [],
      fileList: [],
      markdown: "<span>哈哈哈</span>",
      arhivesDetail: {
        name: "档案详情",
        id: null,
      },
      coachDetail: {
        name: "教练详情",
        id: null,
      },
      courseDetail: {
        name: "课程详情",
        id: null,
      },
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
    getSelectOption(val) {
      get(`/sysDictDetail/dict?dictType=` + val).then((res) => {
        this.selectOption = res.data;
      });
    },
    openArchives(id) {
      this.arhivesDetail.id = id;
      this.$refs.arhivesDetail.handleOpen(id);
    },
    openCoach(id) {
      this.coachDetail.id = id;
      this.$refs.coachDetail.handleOpen(id);
    },
    openCourse(id) {
      this.courseDetail.id = id;
      this.$refs.courseDetail.handleOpen(id);
    },
    getTableData() {
      get("/api-generator/generator/page", {
        size: this.listQuery.pageSize,
        current: this.listQuery.current,
      }).then((res) => {
        this.dataSource = res.data.records;
        this.listQuery.total = res.data.total;
      });
    },
    changeHtml(value, render) {
      this.$emit("markDown", render);
      // this.peonForm.item.target
    },
    editRecord(record) {
      this.peonForm.name = "编辑表单";
      this.form.resetFields();
      this.visible = true;
      console.log(record);
      setTimeout(() => {
        this.form.setFieldsValue(record);
      }, 100);
    },
    deleteRecord(id) {
      post("/match/delete", [id]).then((res) => {
        if (res.code == 200) {
          this.getTableData();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addNew() {
      this.peonForm.name = "新建表单";
      this.form.resetFields();
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue();
      }, 100);
    },

    submit() {
      console.log(this.form);
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        (Object.keys(values) || {}).forEach((key) => {
          if (values[key]) {
            if (typeof values[key] == "object" && values[key]._d) {
              values[key] = values[key].format("YYYY-MM-DD HH:mm:ss");
            }
            if (values[key].length == 2 && values[key][0]._d) {
              values[key][0] = values[key][0].format("YYYY-MM-DD HH:mm:ss");
              values[key][1] = values[key][1].format("YYYY-MM-DD HH:mm:ss");
            }
          }
        });
        if (this.peonForm.name.includes("新建")) {
          post("/match/add", values).then((res) => {
            if (res.code == 200) {
              this.getTableData();
              this.$message.success(res.msg);
              this.visible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          post("/match/update", values).then((res) => {
            if (res.code == 200) {
              this.getTableData();
              this.$message.success(res.msg);
              this.visible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },

    handleTableChange(x) {
      this.listQuery.pageSize = x.pageSize;
      this.listQuery.current = x.current;
      this.getTableData();
    },

    openSelectModal() {
      this.$refs.selectlist.openSelectModal();
    },

    selectItem(val) {
      this.form.setFieldsValue({ name: val.name, id: val.cocahId });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
