import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
         

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        
        return Promise.reject(error);
    }
);

//response
api.interceptors.response.use(

    (response) => response,
    async (error) => {
        const originalRequest = error.config;
       

        if (error.response || error.code == "ERR_NETWORK" && !originalRequest._retry) {
       
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error("Refresh token cannot found");
                }//new acces token request
                const response = await axios.post('http://localhost:8080/refreshToken', {

                    refreshToken: refreshToken

                });

                const accessToken = response.data.data.accessToken;
                const newRefreshToken = response.data.data.refreshToken;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken",newRefreshToken );
                console.log(response.data.data);
                //axios header update
                api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                originalRequest._retry = true

                console.error("Session error", refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';


            }

        }
        return Promise.reject(error);
    }
)
export default api;