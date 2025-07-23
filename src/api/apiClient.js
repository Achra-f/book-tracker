import {API_BASE_URL} from "./api.js";

let logoutCallback = null;

export const setLogoutCallback = (user) => {
    logoutCallback = user;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const handleResponse = async (res) => {
    const data = await res.json();

    if (res.status === 401 || res.status === 403) {
        if (logoutCallback) logoutCallback();
        return;
    }

    if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

export const apiClient = {
    get: async (path) => {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },

    post: async (path, body) => {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(res);
    },

    patch: async (path, body) => {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(res);
    },

    delete: async (path) => {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },
};
