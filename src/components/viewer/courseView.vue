<template>
  <div>


    <a-drawer
      title="课程详情"
      width="35%"
      :maskClosable="true"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="visible = false"
    >
      <a-descriptions title="课程详情" bordered>
        <a-descriptions-item label="课程名称">
          {{course.name}}
        </a-descriptions-item>
        <a-descriptions-item label="课程类型">
          {{course.typeName}}
        </a-descriptions-item>
        <a-descriptions-item label="目标类型">
          {{course.targetType}}
        </a-descriptions-item>
        <a-descriptions-item label="开始时间">
          {{course.startDate}}
        </a-descriptions-item>
        <a-descriptions-item label="结束时间" :span="2">
          {{course.endDate}}
        </a-descriptions-item>
        <a-descriptions-item label="直播地址" :span="3">
          {{course.address}}
        </a-descriptions-item>

        <a-descriptions-item label="上课目标男">
          {{course.manTarget}}
        </a-descriptions-item>
        <a-descriptions-item label="上课目标女" :span="2">
          {{course.womanTarget}}
        </a-descriptions-item>
        <a-descriptions-item label="课程介绍" :span="3">
          {{course.introduce}}
        </a-descriptions-item>
        <a-descriptions-item label="注意事项" :span="3">
          {{course.remember}}
        </a-descriptions-item>
        <a-descriptions-item label="报名人数">
          {{course.studentNum}}
        </a-descriptions-item>
        <a-descriptions-item label="最大报名人数">
          {{course.maxStudent}}
        </a-descriptions-item>
        <a-descriptions-item label="当前直播间学员数量">
          {{course.nowStudent}}
        </a-descriptions-item>
        <a-descriptions-item label="课程能力图">
          <div id="gcharts"></div>
        </a-descriptions-item>

      </a-descriptions>


      <a-divider style="margin-bottom: 32px"/>


    </a-drawer>
  </div>
</template>

<script>
import { get } from "@/assets/api/index";

import {DataView} from '@antv/data-set';
import { Chart } from '@antv/g2';


export default {
  name: "CourseView",
  components: {

  },
  data() {
    return {
      chart:null,
      id:null,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      charData:[
        // { item: '心肺', a: 5 },
        // { item: '力量', a: 2 },
        // { item: '耐力', a: 3 },
        // { item: '跳跃', a: 4 },
        // { item: '柔韧', a: 5 }
        { item: '心肺', a: 4, b: 5 },
        { item: '跳跃', a: 4, b: 2 },
        { item: '柔韧', a: 2, b: 1 },
        { item: '力量', a: 6, b: 4 },
        { item: '耐力', a: 6, b: 3 },
      ],
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },

     visible:false,
     course:{}
    };
  },

  methods: {
    handleOpen(val){
      this.visible = true;
      this.id=val
      this.getData(val)
    },
    getData(id){

      get(`a/course/view?courseId=${id}`).then(res=>{

        this.charData=res.data
        this.course=res.data
        if (this.course.targetType==1){
          this.course.targetType="跑步"
        }else {
          this.course.targetType="跳绳"
        }


      })

    },
    drawChart() {
      const dv = new DataView().source(this.charData);
      dv.transform({
        type: 'fold',
        fields: ['a'], //['a','b']
        key: 'user', // key字段
        value: 'score', // value字段
      });
      this.chart = new Chart({
        container: document.getElementById("gcharts"),
        autoFit: true,
        height: 300,
      })
      this.chart.data(dv.rows);
      this.chart.legend(false) //不显示图例
      this.chart.scale('score', {
        min: 0,
        max: 6,
        tickCount:6
      });
      this.chart.coordinate('polar', { radius: 0.8 });
      this.chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: '#333'
              // stroke: '#333'
            }
          }
        }
      });
      this.chart.axis('item', {
        line: null, tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      this.chart.axis('score', {
        line: null, tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null
            },
          },
        },
      });
      // 图像边缘线
      // this.chart.line().position('item*score').color('user').size(2);
      this.chart.line().position('item*score').color('#FF6716').size(2);
      // 图像边缘点
      this.chart.point().position('item*score').color('#FF6716').shape('circle').size(4).style({
        stroke: '#fff',
        lineWidth: 2,
        fillOpacity: 1,
      });
      this.chart.area().position('item*score').color('#FF6716').style({
        fillOpacity:0.5
      });
      this.chart.render()
      const e = document.createEvent('Event')
      e.initEvent('resize', true, true)
      window.dispatchEvent(e)
    }
  },

};
</script>
