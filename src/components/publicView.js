// 档案详情页
import ArchivesView from './viewer/archivesView.vue'
// 教练详情页
import CoachView from './viewer/coachView.vue'
// 课程详情页
import CourseView from './viewer/courseView.vue'
// 课程列表页
import SelectList from './selectList/selectList.vue'

ArchivesView.install = function(Vue) {
  Vue.component(ArchivesView.name, ArchivesView);
};
CoachView.install = function(Vue) {
  Vue.component(CoachView.name, CoachView);
};
CourseView.install = function(Vue) {
  Vue.component(CourseView.name, CourseView);
};
SelectList.install = function(Vue) {
  Vue.component(SelectList.name, SelectList);
};

export { ArchivesView,CourseView,CoachView,SelectList };