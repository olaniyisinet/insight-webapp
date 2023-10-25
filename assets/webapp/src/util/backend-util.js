export const getRequestUrl = (path) => {
    return import.meta.env.VITE_USER_BACKEND_URL + path;
}