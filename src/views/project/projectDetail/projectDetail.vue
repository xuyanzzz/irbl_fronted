import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <!--    url和文件上传-->
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title">
                <span class="title-head">Project：{{this.currentProjectDetail.projectName}}  &nbsp;{{this.currentProjectDetail.tag}}</span>
            </div>
            <div class="layout-content">
                <div class="side-content" style="margin-bottom: 22px;width: 50px">
                <span class="side-content-tool">
                    <Poptip trigger="hover" content="create project" placement="right">
                    <a-icon type="plus-circle" @click="jumpToCreate"/>
                    </Poptip>
                </span>
                    <span class="side-content-tool">
                        <Poptip trigger="hover" content="create issue" placement="right">
                    <a-icon type="form" @click="jumpToCreateIssue"/>
                        </Poptip>
                </span>
                    <span class="side-content-tool">
                        <Poptip trigger="hover" content="update project information" placement="right">
                    <a-icon type="container" @click="updateProjectPop"/>
                        </Poptip>
                </span>
                    <span class="side-content-tool">
                        <Poptip trigger="hover" content="upload local file" placement="right">
                    <a-icon type="cloud-upload" @click="jumpToLocal"/>
                        </Poptip>
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
                            <div slot="firstPane" class="first-pane" style="width: 100%;height:100%;text-align: left">
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Files" :disabled="false"
                                                      :style="collapseStyle">
                                        <div class="no-file" v-if="this.treeData===[]">
                                            <span>还没有导入文件</span>
                                            <div>
                                                <Button>Import</Button>
                                            </div>
                                        </div>
                                        <vue-scroll>
                                            <projectTree></projectTree>
                                        </vue-scroll>
                                    </a-collapse-panel>
<!--                                    <a-collapse-panel key="2" header="todo" :style="collapseStyle">-->
<!--                                        <div class="toolbar" style="height: 100px;">-->
<!--                                            <li>-->
<!--                                                <Button @click="getRepoAllIssues1()">getRepoAllIssues</Button>-->
<!--                                                <Button @click="saveRepoAllIssues1()">saveRepoAllIssues</Button>-->
<!--                                            </li>-->
<!--                                        </div>-->
<!--                                    </a-collapse-panel>-->
                                </a-collapse>

                            </div>
                            <div slot="secondPane" class="second-pane"
                                 style="padding-right: 30px;width: 100%;text-align: left">
                                <detail-table style="width:100%">
                                </detail-table>
                                <div class="project-information">
                                    <projectDetailInf v-if="this.updateProjectPopV"/>
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
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import projectTree from "../components/projectTree";
    import DetailTable from "../components/detailTable";
    import projectDetailInf from '../components/projectDetailInf';


    export default {
        name: "projectDetail",
        components: {
            DetailTable,
            projectTree,
            projectDetailInf
        },
        data() {
            return {
                split1: 0.5,
                collapseStyle: "background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 0px;border: 1;border-color:#658885;overflow: hidden",
                projectUpdate: {
                    id: 0,
                    projectName: '',
                    projectDescription: '',
                },


            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'addProjectVisible',
                'currentProjectId',
                'currentProjectDetail',
                'panelLeftFirst',
                'size',
                'minSize',
                'tabList',
                'updateProjectPopV',
                'issueShowVisible',
                'treeData'
            ])
        },
        async mounted() {
            this.set_issueShowVisible(true);
        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible',
                'set_panelLeftFirst',
                'set_tabList',
                'set_updateProjectPopV',
                'set_treeData',
                'set_issueShowVisible',
            ]),
            ...mapActions([
                'updateProject',
                'getRepoAllIssues',
                'saveRepoAllIssues'
            ]),
            jumpToCreate() {
                this.set_tabList([]);
                this.set_treeData([]);
                this.$router.push('addProject')
            },
            jumpToLocal(){
                this.$router.push('addProjectFile');
            },
            jumpToList() {
                this.set_tabList([]);
                this.$router.push({name: 'projectList'})
            },
            updateProject1() {
                this.updateProject(this.projectUpdate);
            },
            getRepoAllIssues1() {
                this.getRepoAllIssues(this.currentProjectId);
            },
            saveRepoAllIssues1() {
                this.saveRepoAllIssues(this.currentProjectId);
            },
            jumpToCreateIssue() {
                this.set_tabList([]);
                this.set_treeData([]);
                this.$router.push({name: 'createIssue'})
            },
            updateProjectPop() {
                this.set_updateProjectPopV(true);
            },

        },
    }
</script>

<style scoped>
    .se-header-title {
        position: absolute;
        left: 72px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
    }

    .toolbar {
        margin: 0px;
        color: #6a8bad;
        font-size: 18px;
        height: 58px;
        padding-right: 85%;
    }

    .title-head {
        position: fixed;
        top: 0px;
        left: 130px;
        z-index: 999;
        font-size: 12px;
        color: #fff;
        margin: 25px 8px 0px 25px;
        padding: 2px 8px;
        border: #fff solid 1px;
        border-radius: 5px;
    }

</style>
