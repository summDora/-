<template>
  <a-card class="region">
    <div class="contentpart">
      <div class="left">
        <a-tree
          placeholder="请选择上级菜单"
          v-decorator="['pcode']"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          :tree-data="treeData"
          @select="getTreeNode"
        >
        </a-tree>
      </div>
      <div class="right">
        <a-table
          bordered
          :columns="columns"
          :data-source="dataSource"
          :rowClassName="(record, index) => (index % 2 === 1 ? 'odd' : 'even')"
          rowKey="regionId"
        >
        </a-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import { getRegion, regionTree } from "@/assets/api/api-sys/sys";
export default {
  data() {
    return {
      dataSource: [],
      treeData: [],
      selectRegionId:'110000',
      columns: [
        {
          title: "序号", dataIndex: "index",
          key: "index",
          align: "center",
          width: 70,
          customRender: (text, record, index) => `${index + 1}`,
        },
        { key: "regionCode", dataIndex: "regionCode", title: "行政区划代码" },
        { key: "regionName", dataIndex: "regionName", title: "行政区划名称" },
        {
          key: "regionLevel",
          dataIndex: "regionLevel",
          title: "层级",
          sorter: true,
        },
        { key: "regionId", dataIndex: "regionId", title: "排序", sorter: true },
        {
          key: "regionNameEn",
          dataIndex: "regionNameEn",
          title: "行政区划英文名称",
        },
        {
          key: "regionShortnameEn",
          dataIndex: "regionShortnameEn",
          title: "行政区划简称",
        }
      ],
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
    this.getReginTree();
  },
  methods: {
    getReginTree() {
      this.treeData = [];
      regionTree().then((res) => {
        this.dataCity(res.data.content);
      });
    },
    // 获取table数据
    getTableData() {
      let params = {
        pageSize:100,
        pageIndex:0,
        regionId: this.selectRegionId
      };
      getRegion(params).then((result) => {
        this.dataSource = result.data.content.records;
      });
    },
    dataCity(data) {
      const province = [],
        city = [],
        county = [];
      data.map((item) => {
        if (item.parentId == 86) {
          item.children = [];
          province.push(item);
        }else{
          county.push(item)
        }
      });
      province.map((p) => {
        county.map((item,index) => {
          if (p.regionId == item.parentId) {
            item.children=[]
            p.children.push(item);
            city.push(item)
            county.splice(index,1)
          }
        });
      });
      city.map(item=>{
        county.map((c,index)=>{
          if(item.regionId==c.parentId){
            item.children.push(c)
            county.splice(index,1)
          }
        })
      })
      console.log(province, city, county);
      let returndata = this.convertToTreedata(province);
      this.treeData.push(...returndata);
    },
    // 获取树数据
    convertToTreedata(data) {
      let returnData = [];
      data.map((item) => {
        let temp = {
          title: item.regionName,
          value: item.regionId,
          key: item.regionId,
        };
        if ("children" in item) {
          temp.children = this.convertToTreedata(item.children);
        }
        returnData.push(temp);
      });
      return returnData;
    },
    getTreeNode(data){
      this.selectRegionId=data[0]
      this.getTableData()
    }
  },
};
</script>
<style lang="less">
.region {
  .contentpart {
    width: 100%;
    min-height: 80vh;
    display: flex;
    .left {
      width: 250px;
      min-width: 200px;
      height: 80vh;
      overflow-y: scroll;
    }
    .left::-webkit-scrollbar {
      /*滚动条整体样式*/

      width: 3px; /*高宽分别对应横竖滚动条的尺寸*/

      height: 1px;
    }

    .left::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px #369e99;
      background: #13c2c2;
    }
    .left::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: outset 0 0 5px #505050;
      border-radius: 10px;
      background: #7ce9e9;
    }
    .right {
      flex: 1;
      margin-left: 20px;
      .ant-table-wrapper {
        margin-top: 0px !important;
      }
    }
  }
}
</style>
