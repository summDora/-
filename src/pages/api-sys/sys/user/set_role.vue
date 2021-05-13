<template>
  <div>
    <a-modal
      v-model="visible"
      width="350px"
      title="角色分配"
      :dialog-style="{ top: '90px' }"
      :bodyStyle="{height: 'auto'}"
      ok-text="确认"
      cancel-text="取消"
      @ok="submit"
      @cancel="() => visible=false"
    >
      <a-tree-select
        v-model="ids"
        style="width: 100%"
        :tree-data="treeData"
        tree-checkable
        allow-clear
        :maxTagCount="20"
        :dropdown-style="{ maxHeight: '600px', overflow: 'auto' }"
        placeholder="请选择需分配的角色"
      />
    </a-modal>
  </div>
</template>

<script>
import { roleList,saveAssign,getUserRole } from "@/assets/api/api-sys/sys";
export default {
  data() {
    return {
      visible: false,
      id: null,
      ids:[],
      treeData: [],
      name: false,
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      this.id = id;
      this.ids = [];
      getUserRole(id).then(res=>{
        console.log(res)
        let data=res.data.content
        data.map(item=>{
            this.ids.push(item.roleId)
        })
      })
      this.getTreeData();
    },
    getTreeData() {
      this.treeData = [];
      roleList().then((result) => {
        this.dataChildren(this.unique(result.data.content.records));
      });
    },
    // 处理table数据
    dataChildren(data) {
      const menu = [],
        cata = [];
      data.map((item) => {
        if (item.pid == 0) {
          menu.push({ children: [], ...item });
        } else {
          cata.push({ children: [], ...item });
        }
      });
      cata.map((c) => {
        if (c.children.length == 0) {
          delete c["children"];
        }
      });
      menu.map((m) => {
        cata.map((c) => {
          if (c.pid == m.id) {
            m.children.push(c);
          }
        });
      });
      menu.map((m) => {
        if (m.children.length == 0) {
          delete m["children"];
        }
      });
      let returndata = this.convertToTreedata(menu);
      this.treeData.push(...returndata);
    },
     // 去重
     unique(arr){
        var hash = {};
        arr = arr.reduce(function(item, next) {
            hash[next.name] ? '' : hash[next.name] = true && item.push(next);
            return item
        }, [])
        return arr

    },
    // 获取树数据
    convertToTreedata(data) {
      let returnData = [];
      data.map((item) => {
        let temp = {
          title: item.name,
          value: item.id,
          key: item.id,
        };
        if ("children" in item) {
          temp.children = this.convertToTreedata(item.children);
        }
        returnData.push(temp);
      });
      return returnData;
    },
    submit(){
            if(this.ids.length==0){
                this.$message({
                    message:'请选择至少一个权限',
                    type:'error'
                })
                return false
            }
            let params={
                userId:this.id,
                roleId:this.ids.join(',')
            }
            saveAssign(params).then(()=>{
                this.visible=false
                this.$message.success('操作成功');
                this.$emit('refreshDataList')
            })
        },
  },
};
</script>
