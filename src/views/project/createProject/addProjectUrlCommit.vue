import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <!--    url和文件上传-->
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <Affix class="layout-se-header" style="width:100%;background-color:#354A51 " :offset-top="60">
                <div class="se-header-bread">
                    <span class="se-header-title" > Create Project {{this.currentProjectDetail.projectName}}'s File !</span>
                    <span class="se-header-title-right" @click="cancelCreate" > Cancel</span>
                </div>
            </Affix>
            <div class="layout-content" >
                <div class="side-content" style="margin-bottom: 22px;width: 50px">
                <span class="side-content-tool" >
                    <a-icon type="plus-circle" @click="jumpToCreate"/>
                </span>
                    <span class="side-content-tool" >
                    <a-icon type="form"  @click="jumpToCreateIssue"/>
                </span>
                </div>
                <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">
                    <div class="split-content" style="color: #fff">
                        <rs-panes split-to="columns"
                                  style="left:50px"
                                  :allow-resize="true"
                                  :size=this.size
                                  :min-size=this.minSize
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <Card class='upload-options' title="Options" icon="ios-options" :padding="0" shadow>
                                    <CellGroup>
                                        <Cell class="import-from-git" title="Import from github "  />
                                        <Cell class="upload-local" title="Upload local" to="/addProjectFile"/>
                                    </CellGroup>
                                </Card>
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Github Repository Information"
                                                      :style="collapseStyle">
                                        <div class="res-title-style" >
                                            <span> Name :</span>
                                            <span :v-text="this.currentProjectDetail.githubRepoName"></span>
                                        </div>
                                        <div class="res-title-style" >
                                            <span> Owner :</span>
                                            <span :v-text="this.currentProjectDetail.githubRepoOwner"></span>
                                        </div>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" style="padding-right: 30px;width: 100%;text-align: left">
                                <div class="connect-res">
                                    <div class="res-commit-list">
                                        <div class="res-commit-style">
                                            <span>commit records</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </rs-panes>

                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import {Modal} from "ant-design-vue";

    export default {
        name: "addProjectUrlCommit",
        components:{

        },
        data(){
            return{
                //todo:改id
                projectId:'',
                split1:0.5,
                collapseStyle:"background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 24px;border: 1;border-color:#658885;overflow: hidden",

            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'addProjectVisible',
                'currentProjectId',
                'currentProjectDetail',
                'size',
                'minSize',

            ])
        },
        async mounted() {
        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',
            ]),
            ...mapActions([
                'deleteProject',
                'getProjectList'
            ]),
            jumpToDetail(){
                this.set_currentProjectId(this.projectId);
                this.$router.push({name:'projectDetail'})
            },
            jumpToCreate(){
                this.$router.push( 'addProject')
            },
            cancelCreate(){
                Modal.confirm({
                    title: '取消创建项目',
                    content: '确认取消创建该项目？',
                    onOk: () => {
                        this.deleteProject();
                        this.getProjectList(this.userId);
                        this.$router.push({ name: 'projectList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },
            jumpToCreateIssue(){
                this.$router.push( {name:'createIssue'})
            }

        },
    }
</script>

<style scoped>
    .se-header-title{
        position: absolute;
        left:72px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
    }
    .ivu-card-head p, .ivu-card-head-inner{
        color: #fff;
    }
    .upload-options{
        margin-bottom: 12px;
        width: 300px;
        background-color: #354A51
    }
    .import-from-git{
        color: #DBF5E0;
    }
    .res-title-style{
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        line-height: 1;
        margin-bottom: 20px;
    }
    .connect-res{
        margin-left: 50px;
        margin-top: 50px;
        margin-right: 100px;
    }
    .res-commit-style{
        color: #DBF5E0;
        line-height: 1;
        margin-bottom: 20px;
        font-size: 26px;
        font-weight: 400;
        flex: 1 1 auto;
    }
    .se-header-title-right{
        position: absolute;
        right:35px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
        cursor:pointer;
    }

</style>
