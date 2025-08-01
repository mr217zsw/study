import Mock from "mockjs";

const TOTAL = 100;

// 初始数据只生成一次，缓存到 window.__mockUserList__
if (!window.__mockUserList__) {
  window.__mockUserList__ = Mock.mock({
    [`list|${TOTAL}`]: [
      {
        "id|+1": 1,
        name: "@cname",
        age: "@integer(18, 50)",
        sex: '@pick(["男", "女"])',
        birth: '@date("yyyy-MM-dd")',
        addr: "@county(true)",
      },
    ],
  }).list;
}

let allData = window.__mockUserList__;

export default {
  // 获取用户列表（支持 GET/POST 混用 + 搜索 + 分页）
  getUserList: (options) => {
    let keyword = "";
    let page = 1;
    let pageSize = 10;

    if (options.method === "get") {
      const url = new URL("http://localhost" + options.url);
      keyword = url.searchParams.get("keyword") || "";
      page = parseInt(url.searchParams.get("page")) || 1;
      pageSize = parseInt(url.searchParams.get("pageSize")) || 10;
    } else {
      const body = JSON.parse(options.body || "{}");
      keyword = body.keyword || "";
      page = body.page || 1;
      pageSize = body.pageSize || 10;
    }

    const filteredList = allData.filter((item) => item.name.includes(keyword));

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageList = filteredList.slice(start, end);

    return {
      code: 200,
      data: {
        count: filteredList.length,
        length: pageList.length,
        list: pageList,
      },
    };
  },

  // 添加用户
  addUser: (options) => {
    const body = JSON.parse(options.body);
    body.birth = new Date(body.birth).toISOString().split("T")[0];
    const newId = allData.length > 0 ? allData[allData.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...body };
    allData.unshift(newUser);
    return {
      code: 200,
      msg: "添加成功",
    };
  },

  // 更新用户
  updateUser: (options) => {
    const body = JSON.parse(options.body);
    body.birth = new Date(body.birth).toISOString().split("T")[0];
    const index = allData.findIndex((item) => item.id === body.id);
    if (index !== -1) {
      allData[index] = { ...allData[index], ...body };
      return {
        code: 200,
        msg: "更新成功",
      };
    }
    return {
      code: 404,
      msg: "用户不存在",
    };
  },

  // 删除用户（支持 GET/POST）
  deleteUser: (options) => {
    let id;
    if (options.method === "get") {
      const url = new URL("http://localhost" + options.url);
      id = parseInt(url.searchParams.get("id"));
    } else {
      const body = JSON.parse(options.body);
      id = parseInt(body.id);
    }

    const beforeLength = allData.length;
    allData = allData.filter((item) => item.id !== id);
    window.__mockUserList__ = allData;

    const deleted = allData.length < beforeLength;

    return {
      code: deleted ? 200 : 404,
      msg: deleted ? "删除成功" : "用户不存在",
    };
  },
};
