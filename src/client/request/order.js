import axios from "axios";

export const createOrderRequest = (groupId, details, totalPrice) => {
  return axios
    .post(`${process.env.API_URL}/api/orders/new`, {
      groupId,
      details,
      totalPrice,
    })
    .then((res) => {
      return { status: true, message: "Add success", newOrder: res.data };
    })
    .catch((err) => {
      if (err.response.status == 401) {
        window.location.replace(process.env.FRONT_END_URL);
      }
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
      // return { status: false, message: err.response.data.message };
    });
};

export const getOrderByGroupIdRequest = (groupId) => {
  return axios
    .get(`${process.env.API_URL}/api/orders/group/${groupId}`)
    .then((res) => {
      return { status: true, groupOrdersData: res.data };
    })
    .catch((err) => {
      if (err.response.status == 401) {
        window.location.replace(process.env.FRONT_END_URL);
      }
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
