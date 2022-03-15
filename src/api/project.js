import { axios } from '@/utils/request'

const api = {
    projectPre: '/api/project'
}

export function addByConfigAPI(data){
    return axios({
        url:`${api.projectPre}/add/Config`,
        method: 'POST',
        data
    })
}

export function addByFileAPI(data){
    return axios({
        url:`${api.projectPre}/add/File`,
        method: 'POST',
        data
    })
}

export function deleteProjectAPI(projectId) {
    return axios({
        url: `${api.projectPre}/${projectId}/delete`,
        method: 'GET',
    })
}

//更新某个项目
export function updateProjectAPI(data){
    return axios({
        url: `${api.projectPre}/${data.projectId}/update`,
        method: 'POST',
        data
    })
}

export function getAllProjectAPI(userId) {
    return axios({
        url: `${api.projectPre}/${userId}/allProjects`,
        method: 'get',
    })
}

//todo:currentProjectDetail 获得某个项目详细信息
export function getProjectDetailByIdAPI(param) {
    return axios({
        url: `${api.projectPre}/${param.projectId}/detail`,
        method: 'GET',
    })
}


