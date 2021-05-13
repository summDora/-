import Vue from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import "./theme/index.less";
import Antd from "ant-design-vue";
import Viser from "viser-vue";
import store from "./store";
import "animate.css/source/animate.css";
import Plugins from "@/plugins";
import { initI18n } from "@/utils/i18n";
import bootstrap from "@/bootstrap";
import "moment/locale/zh-cn";

const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n("zh-CN", "zh-CN");

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import FormMaking from "../lib/form-making";
import {MakingForm, GenerateAntdForm} from "../lib/form-making";
import "../lib/form-making/dist/FormMaking.css";


import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '9f8fcff5493827d96b59efa38c4982c2',
  plugin: [//高德地图扩展插件(按需添加)
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.MarkerClusterer', // 圆形编辑器插件
    'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  uiVersion: '1.1', // ui库版本，不配置不加载,
  v: '2.0'
})

// cf08e66ea01da0bd2d2d992a441c2db3

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

Vue.use(Antd);
import VueEditor from "vue2-editor";
Vue.use(VueEditor)



// 自定义公共组件
import { ArchivesView,CourseView,CoachView,SelectList } from '@/components/publicView'
Vue.component(ArchivesView.name, ArchivesView);
Vue.component(CourseView.name, CourseView);
Vue.component(CoachView.name, CoachView);
Vue.component(SelectList.name, SelectList);


Vue.use(FormMaking, { lang: "zh-CN", i18n });
Vue.component(MakingForm.name, MakingForm);
Vue.component(GenerateAntdForm.name, GenerateAntdForm);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);
bootstrap({ router, store, i18n, message: Vue.prototype.$message });

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
