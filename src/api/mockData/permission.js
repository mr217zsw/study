// 模拟用户数据库
const users = [
  {
    username: "admin",
    password: "admin",
    role: "admin",
    token: "admin-token-abc123",
  },
  {
    username: "user",
    password: "123",
    role: "user",
    token: "user-token-def456",
  },
];

// 不同权限对应的菜单
const menus = {
  admin: [
    {
      path: "/home",
      name: "home",
      label: "首页",
      icon: "house",
    },
    {
      path: "/mall",
      name: "mall",
      label: "商品管理",
      icon: "goods",
    },
    {
      path: "/user",
      name: "user",
      label: "用户管理",
      icon: "user",
    },
    {
      path: "other",
      name: "Other",
      label: "其他",
      icon: "setting",
      children: [
        {
          path: "/page1",
          name: "Page1",
          label: "页面1",
          icon: "circlePlus",
        },
        {
          path: "/page2",
          name: "Page2",
          label: "页面2",
          icon: "bell",
        },
      ],
    },
  ],
  user: [
    {
      path: "/home",
      name: "home",
      label: "首页",
      icon: "house",
    },
    {
      path: "/mall",
      name: "mall",
      label: "商品管理",
      icon: "goods",
    },
  ],
};

export default {
  getMenu: (req) => {
    const { username, password } = JSON.parse(req.body);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return {
        code: 200,
        msg: "登录成功",
        data: {
          token: user.token,
          role: user.role,
          menuList: menus[user.role] || [],
        },
      };
    } else {
      return {
        code: 401,
        msg: "用户名或密码错误",
      };
    }
  },
};
