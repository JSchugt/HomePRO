import { getToken } from "./authManager";

const _apiUrl = "/api/ProjectMaterials";

export const deleteByProjectIdAndMaterialId = (projId, matId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/Material/${projId}/${matId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
    })
}
// export const getProjectMaterialsByProjectid = (id) => {

//     return getToken().then((token) => {
//         return fetch(`/api/ProjectMaterials/1`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error("Failed: no materials were return by project id");

//             }
//         })
//     })
// }
export const getProjectMaterialsByProjectid = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.status === 204) {
                return 204
            }
            else if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Failed: no materials by project id were returned");
            }
        })
    })
}