import { API_URL, JWT_TOKEN_KEY } from "./const.js";


export const getLogin = async (token) => {
    try {
        const response = await fetch(`${API_URL}/getLogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        const data = await response.json();
        
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getUser = async (login) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${API_URL}/user/${login}`, {
            method: 'GET',
            headers,
            });

        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
};

export const sendDataUser = async (id, userData) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(userData),
            });

        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
};

export const sendDataWish = async (wishData) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${API_URL}/addWish`, {
            method: 'POST',
            headers,
            body: JSON.stringify(wishData),
            });

        const data = await response.json();
        
        return data;
    } catch (err) {
        console.log(err);
    }
};