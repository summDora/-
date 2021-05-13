<template>
  <div>
    <fm-making-form
      ref="makingform"
      style="height: 100vh"
      generate-code
      generate-json
      @ready="handleFormReady"
    >
      <template slot="action"></template>
    </fm-making-form>
  </div>
</template>

<script>
import { getForm, postForm } from "@/assets/api/gen/gen";
export default {
  data() {
    return {
      options: {},
    };
  },
  created() {
    this.getFormInfo();
  },
  methods: {
    //   判空
    validatenull(val) {
      if (typeof val === "boolean") {
        return false;
      }
      if (typeof val === "number") {
        return false;
      }
      console.log(val);
      if (val instanceof Array) {
        if (val.length == 0) return true;
      } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}") return true;
      } else {
        if (
          val == "null" ||
          val == null ||
          val == "undefined" ||
          val == undefined ||
          val == ""
        )
          return true;
        return false;
      }
      return false;
    },
    getFormInfo() {
      let params = this.$route.query;
      if (this.validatenull(params)) {
        return false;
      }
      getForm(params.tableName, params.dsName).then((response) => {
        console.log(response);
        this.options = JSON.parse(response.data.data);
        this.handleFormReady();
      });
    },
    handleSubmit(json) {
      let params = this.$route.query;
      let result = JSON.stringify(json);
      postForm(result, params.tableName, params.dsName).then(() => {
        this.$message.success("生成并保存成功");
      });
    },
    handleFormReady() {
        console.log(this.options)
      this.options.list.map((item) => {
        item.options = {
          width: "",
          defaultValue: undefined,
          required: false,
          dataType: "string",
          pattern: "",
          placeholder: "",
          customClass: "",
          disabled: false,
          labelWidth: 100,
          isLabelWidth: false,
          hidden: false,
          dataBind: true,
          showPassword: false,
        };
        if(item.model=='id'){
            item.options.hidden=true
        }
      });
      console.log(this.options);
      this.$refs.makingform.setJSON(this.options);
    },
  },
};

</script>



