import { getToken } from "./authManager";

const _apiUrl = "/api/Materials";

export const getMaterialsByUserId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/UserId/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
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

export const deleteMaterialsByProjectId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
    })

}
export const getMaterialstByMaterialsId = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Failed: no projects by project id were returned");
                }
            })
    })
}