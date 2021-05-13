<template>
  <div>
    <a-drawer
      title="教练档案"
      width="25%"
      :maskClosable="true"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false"
    >
     <h2>
        <p>ID：{{id}}</p>
        <!-- <p>名称：{{coach.name}}</p>
        <p>标题：{{coach.title}}</p>
        <p>描述：{{coach.desc}}</p> -->
     </h2>
    </a-drawer>
  </div>
</template>

<script>
import { get } from "@/assets/api/index";
export default {
  name: "CoachView",
  data() {
    return {
     visible:false,
     id:null,
     coach:{}
    };
  },

  methods: {
    handleOpen(val){
      this.visible = true;
      this.id=val;
      this.getData(val)
    },
    getData(id){
      get(`a/coach/view?coachId=${id}`).then(res=>{
        this.coach=res.data
      })
    }
  },
};
</script>
