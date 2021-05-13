<template>
  <div>
    <a-space size="large" @mouseleave="hiddenDrop()">
      <a href="#" @mouseenter="openDrop('sys')" @click="swithAdmin('sys')" >系统后台</a>
      <a href="#" @mouseenter="openDrop('game')" @click="swithAdmin('game')">游戏后台</a>
      <a href="#" @mouseenter="openDrop('live')" @click="swithAdmin('live')">直播后台</a>
      <a href="#" @mouseenter="openDrop('sale')" @click="swithAdmin('sale')">销售后台</a>
      <a-card
        class="dropmenu"
        @mouseenter="openDrop()"
        v-show="dropmenuVisible"
      >
        <a-row type="flex" justify="space-around">
          <div class="rout" v-for="(item, index) in menuData" :key="index">
            <p class="itemtitle">{{ item.name }}</p>
            <div class="children" v-if="item.children.length > 0">
              <li
                v-for="(child, j) in item.children"
                :key="j"
                @click="dropmenuVisible = false"
              >
                <router-link :to="{ path: child.path }">{{child.name}}</router-link>
              </li>
            </div>
          </div>
        </a-row>
      </a-card>
    </a-space>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderMenu",
  data() {
    return {
      dropmenuVisible: false,
    };
  },
  computed: {
    ...mapGetters("setting", ["menuData"]),
  },

  methods: {
    openDrop() {
      this.dropmenuVisible = true;
    },
    hiddenDrop() {
      this.dropmenuVisible = false;
    }
  },
};
</script>
<style lang="less" scoped>
.dropmenu {
  width: calc(100vw - 262px);
  height: 450px;
  position: absolute;
  top: 60px;
  left: -128px;
  padding: 10px 20px;
  overflow-y: scroll;
  box-shadow: 20px 10px 25px #c9c9c9;
  .rout {
    width: 200px;
    margin: 0px 10px 0px 0px;
    p {
      font-size: 16px;
      color: #fe0000;
    }
    li {
      font-size: 14px;
      line-height: 28px;
      a {
        color: #000000a6;
      }
      a:hover {
            color: #fe0000;
            cursor: pointer;
        }
    }
  }
}
.dropmenu::-webkit-scrollbar {
    width: 7px;
    height: 1px;
}

.dropmenu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px #fa8b8b;
    background: #fe0000;
}
.dropmenu::-webkit-scrollbar-track {
    -webkit-box-shadow: outset 0 0 5px #fdeded;
    border-radius: 10px;
    background: #fa8b8b;
}
</style>
