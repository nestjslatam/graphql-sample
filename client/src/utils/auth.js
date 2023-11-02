import axios from 'axios';

export const addAxiosRequestInterceptor = (context) => {
  const { token } = context;

  axios.interceptors.request.use(
    (request) => {
      if (request.url.includes('tags')) {
        request.headers['trackId'] = context.trackId;
        request.headers.Authorization = `Bearer ${token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const addAxiosResponceInterceptor = (context) => {
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err.response.status === 401 || err.response.data.messsage === '401 Unauthorized') {
      console.log(err);
    }
    return Promise.reject(err);
  });
};
