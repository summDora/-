<template>
    <div>
        <a-modal v-model="selectModal" title="查询列表"
        on-ok="handleOk"
        :style="{zIndex: 2999,position: 'fixed'}" width="80%">
            <select style="width:120px;height:25px;" v-model="selectType">
                <option value="name">标题</option>
                <option value="id">id</option>
                <option value="type">类型</option>
            </select>
            <a-input-search style="width: 20%;"  v-decorator="[ 'name' ]" enter-button @search="getTableData" @change='(e)=>selectContent=e.target.value' />
            <a-table bordered
            :data-source="selectSource"
            :rowKey="(record,index)=>{return index}"
            :pagination="listQuery"
            @change="handleTableChange"
            :customRow="handleClickRow"
            :rowClassName="(record,index)=>{ return (index===selectIndex)?'active':' '}"
            :columns="selectColumns" />
            <template slot="footer">
                <a-button key="submit" type="primary" @click="handleOk">
                确 认
                </a-button>
            </template>

        </a-modal>
    </div>
</template>
<script>

import { post } from "@/assets/api/index";
export default {
    name:'SelectList',
    data() {
        return {
            selectColumns: [
                { title: "id", dataIndex: "cocahId"},
                { title: "课程类型", dataIndex: "typeId"},
                { title: "训练项目", dataIndex: "itemId"},
                { title: "课程名称", dataIndex: "name"},
                { title: "课程介绍", dataIndex: "introduce"},
                { title: "课程建议", dataIndex: "propose" },
                { title: "比赛目标", dataIndex: "manTarget" }
            ],
            selectModal:false, //弹框
            selectSource:[], //table 数据
            selectContent:undefined, // input value
            selectType:undefined, // select value
            listQuery: {
                total: 0,
                current:1,
                pageSize: 10,
                showSizeChanger: true,
            },
            selectIndex:null,  // 选中行的index
            selectRecord:undefined, // 选中行
        }
    },
    methods: {
        handleTableChange(x){
            this.listQuery.current=x.current
            this.getTableData()
        },
        getTableData(){
            let params={
                limit:this.listQuery.pageSize,
                page:this.listQuery.current
            }
            if(this.selectType && this.selectContent){
                // 有搜索条件
                params[this.selectType]=this.selectContent
                // { id : "123" , limit : 10 , page : 1 }
            }
            post("/course/listByPage", params).then(res => {
                this.selectSource = res.data.records;
                this.listQuery.total=res.data.total
            });
        },
        openSelectModal(){
            this.selectModal=true
            this.getTableData()
        },
        handleClickRow(record, index){
            return {
                on: {
                    click: () => {
                        this.selectIndex=index
                        this.selectRecord=record
                    }
                }
            }
        },
        handleOk(){
            this.selectModal=false
            this.$emit('selectItem',this.selectRecord)
        }
    },
}
</script>
<style lang="less">
select{
    border:0.1px solid rgb(216, 216, 216);
    height:32px !important;
    padding:0px 10px
}
.active{
    background-color:#f1f1f1
}
</style>