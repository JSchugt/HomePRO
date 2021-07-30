import { getToken } from "./authManager";

const _apiUrl = "/api/Step";
export const getStepByProjectId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/ProjectSteps/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Failed: no steps by project id were returned");
            }
        })
    })
}

// }
// export const getProjectByUserId = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/user/${id}`,
//             {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             }).then(resp => {
//                 if (resp.ok) {
//                     return resp.json();
//                 } else {
//                     throw new Error("Failed: no projects by user id were returned");
//                 }
//             })
//     })
// }

// export const deleteProjectByProjectId = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${id}`,
//             {
//                 method: "DELETE",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 }
//             })
//     })

// }
// export const getProjectByProjectId = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${id}`,
//             {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             }).then(resp => {
//                 if (resp.ok) {
//                     return resp.json();
//                 } else {
//                     throw new Error("Failed: no projects by project id were returned");
//                 }
//             })
//     })
// }