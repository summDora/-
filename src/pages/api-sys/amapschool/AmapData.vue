<template>
  <div>
    <a-drawer
      title="学校分布"
      placement="bottom"
      height="100%"
      :visible="visible"
      @close="onClose"
    >
      <div id="schoolmap" style="width: 100%;height: 85vh" />
    </a-drawer>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { get } from "@/assets/api/index";
import schoolData from "@/assets/json/allSchool.json";
export default {
  data() {
    return {
      visible: false,
      dataSource:[],
      map: "",
    };
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("schoolmap", {
        zooms: [3, 18], // 地图缩放范围
        center: new AMap.LngLat(116.397428, 39.90923),
      });
      // 加载海量点组件
      AMapUI.loadUI(["misc/PointSimplifier"], (PointSimplifier) => {
        if (!PointSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }
        // 创建组件实例
        new PointSimplifier({
        // new MarkerClusterer({
          map: this.map,
          // data是海量点的坐标，下面是随机产生点坐标的方法
          data: schoolData,
          compareDataItem: function(a, b, aIndex, bIndex) {
            //数据源中靠后的元素优先，index大的排到前面去
            return aIndex > bIndex ? -1 : 1;
        },
          getPosition: (dataItem) => {
            // return dataItem.position;
            return [dataItem.lng,dataItem.lat];
          },
          getHoverTitle: (dataItem) => {
            //返回数据项的Title信息，鼠标hover时显示
            return dataItem.schoolName;
          },
          topNAreaStyle:{
            content:'circle'
          },
          getNumForTopSelect:(zoom, bounds, descendantsNum, pointSize)=>{
            // var idealNum = (bounds.width * bounds.height) / (pointSize.width * pointSize.height);
            return 100;
          },
          renderOptions: {
            //点的样式
            pointStyle: {
              width:6,
              fillStyle: '#0019ff94' //蓝色填充
            },
            pointPositionStyle:{}
        }
        });
      });
    });
  },
  methods: {
    init() {
      this.visible = true;
    },
    getdata(){
        get("/api-sys/system/amapSchool/page").then((res) => {
          this.dataSource = res.data;
          console.log(res)
        });
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
    .ant-drawer-body{
        padding: 0px !important;
    }
</style>
