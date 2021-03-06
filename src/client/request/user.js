import axios from "axios";

export const getUserRequest = () => {
  return axios
    .get(`${process.env.API_URL}/api/users`)
    .then((res) => {
      return { status: true, userData: res.data };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
