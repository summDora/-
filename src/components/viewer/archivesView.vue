<template>
  <div>
    <a-drawer
      title="档案详情"
      width="25%"
      :maskClosable="true"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false"
    >
      <h2>
        <p>ID：{{ id }}</p>
        <p>名称：{{ archives.name }}</p>
        <p>标题：{{ archives.title }}</p>
        <p>描述：{{ archives.desc }}</p>
      </h2>
    </a-drawer>
  </div>
</template>

<script>
import { get } from "@/assets/api/index";
export default {
  name: "ArchivesView",
  data() {
    return {
      visible: false,
      id: null,
      archives: {},
    };
  },

  methods: {
    handleOpen(val) {
      this.visible = true;
      this.id = val;
      this.getData(val);
    },
    getData(id) {
      get(`/a/archives/view?archivesId=${id}`).then((res) => {
        this.archives = res.data;
        this.archives = {
          name: "name",
          title: "title",
          desc: "desc",
        };
      });
    },
  },
};
</script>
