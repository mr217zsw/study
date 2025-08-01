/**
 * 整个项目api的统一管理
 */
import request from "./request";

export default {
  getTableData() {
    return request({
      url: "/home/getTableData",
      method: "get",
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
      method: "get",
    });
  },
  getUserData(data) {
    return request({
      url: "/user/getUserList",
      method: "get",
      data,
    });
  },
  deleteUser(data) {
    return request({
      url: "/user/deleteUser",
      method: "get",
      data,
    });
  },
  addUser(data) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },
  updateUser(data) {
    return request({
      url: "/user/updateUser",
      method: "post",
      data,
    });
  },
  getMenu(data) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data,
    });
  },
};
