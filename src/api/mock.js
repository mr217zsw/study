import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import menuApi from "./mockData/permission";
/**
 * 参数
 * 1.拦截路径
 * 2.拦截方法
 * 3.生成的假数据
 */
// 首页接口
Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);
// 用户页面接口
Mock.mock(/api\/user\/getUserList/, "get", userApi.getUserList);
Mock.mock(/api\/user\/addUser/, "post", userApi.addUser);
Mock.mock(/api\/user\/updateUser/, "post", userApi.updateUser);
Mock.mock(/api\/user\/deleteUser/, "get", userApi.deleteUser);
// 登录页面接口
Mock.mock(/api\/permission\/getMenu/, "post", menuApi.getMenu);
