import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { getToken, setToken as saveToken, removeToken } from "@/utils";

const modules = import.meta.glob("../views/**/*.vue");

function initState() {
  return {
    isCollapse: false, // 侧边栏是否收起
    tags: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ], // 页面标签
    currentMenu: "home", // 当前激活的菜单
    menuList: [], // 动态菜单列表（根据权限生成）
    token: getToken(), // 登录令牌
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = reactive(initState());

  /**
   * 切换菜单时，如果该菜单不在 tags 标签页中，则加入
   */
  function selectMenu(val) {
    if (!state.tags.find((item) => item.name === val.name)) {
      state.tags.push(val);
    }
  }

  /**
   * 移除标签页中的某个 tag
   */
  function updateTags(tag) {
    const index = state.tags.findIndex((item) => item.name === tag.name);
    state.tags.splice(index, 1);
    // 如果当前菜单正好是被删除的，则切换到前一个
    if (state.currentMenu === tag.name) {
      state.currentMenu = state.tags[Math.max(0, index - 1)].name;
    }
  }

  /**
   * 更新菜单列表，并同步保存到 localStorage
   */
  function updateMenuList(val) {
    state.menuList = val;
    localStorage.setItem("menuList", JSON.stringify(val));
  }

  /**
   * 设置 token，并保存到 localStorage
   */
  function setToken(token) {
    state.token = token;
    saveToken(token);
  }

  /**
   * 动态添加路由：
   * 从 localStorage 获取菜单权限数据，根据菜单生成的页面路径，
   * 动态 import 对应的 Vue 文件并注册到 Vue Router 中。
   * ⚠️ 注意：文件名必须与 name 字段一致，且组件文件名首字母大写
   */
  function addMenu(router) {
    const menu = JSON.parse(localStorage.getItem("menuList"));
    if (!menu || !menu.length) return;

    state.menuList = menu;

    const routers = router.getRoutes();

    // 清除多余的路由
    routers.forEach((item) => {
      if (["main", "login", "error404"].includes(item.name)) return;
      router.removeRoute(item.name);
    });

    // 找到主路由（main 是布局页）
    const mainRoute = routers.find((r) => r.name === "main");
    if (!mainRoute) return;

    menu.forEach((item) => {
      if (item.children && item.children.length) {
        item.children.forEach((child) => {
          const route = {
            path: child.path,
            name: child.name,
            // 动态 import 组件
            component: () => importViewByName(child.name),
          };
          // 挂在主路由下
          if (!router.hasRoute(child.name)) {
            router.addRoute("main", route);
          }
        });
      } else {
        const route = {
          path: item.path,
          name: item.name,
          component: () => importViewByName(item.name),
        };
        if (!router.hasRoute(item.name)) {
          router.addRoute("main", route);
        }
      }
    });
  }

  /**
   * 动态导入页面组件，文件必须位于 @/views，文件名需首字母大写
   * 比如：menu 的 name 为 "user"，那么必须有 views/User.vue
   */
  function importViewByName(name) {
    const fileName = name.charAt(0).toUpperCase() + name.slice(1);
    const path = `../views/${fileName}.vue`;
    const importFn = modules[path];
    if (!importFn) {
      console.error(`找不到视图文件: ${path}`);
      return null;
    }
    return importFn();
  }

  /**
   *
   * 重置pinia和路由，清空缓存
   *
   */
  function clean(router) {
    const routers = router.getRoutes();
    routers.forEach((item) => {
      if (["main", "login", "error404"].includes(item.name)) return;
      router.removeRoute(item.name);
    });

    localStorage.removeItem("menuList");
    removeToken();
    Object.assign(state, initState());
  }

  return {
    ...toRefs(state),
    selectMenu,
    updateTags,
    updateMenuList,
    addMenu,
    setToken,
    clean,
  };
});
