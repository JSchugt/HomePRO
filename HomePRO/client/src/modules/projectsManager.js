import { getToken } from "./authManager";

const _apiUrl = "/api/project";

export const getProjectByUserId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/user/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Failed: no projects by user id were returned");
                }
            })
    })
}

export const getProjectByProjectId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/project/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Failed: no projects by user id were returned");
                }
            })
    })
}