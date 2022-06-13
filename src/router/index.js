import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";


const routes = [
    {
        path : "/",
        name : "HomePage",
        component : () => import("@/views/Home")
    },
    {
        path : "/login",
        name : "LoginPage",
        component : () => import("@/views/Login")
    },
    {
        path : "/register",
        name : "RegisterPage",
        component : () => import("@/views/Register")
    },
    {
        path : "/newblog",
        name : "NewBlogPage",
        component : () => import("@/views/NewBlog")
    },
    {
        path : "/likes",
        name : "Likes",
        component : () => import("@/views/Account")
    },
    {
        path : "/favorites",
        name : "Favorites",
        component : () => import("@/views/Account")
    },
    {
        path : "/settings",
        name : "Settings",
        component : () => import("@/views/Account")
    },
]

const router = createRouter({
    routes,
    history : createWebHashHistory()
})

router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ["HomePage"];
    const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
    const _isAuthenticated = store.getters._isAuthenticated;
  
    if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);
  
    if (authRequiredRoutes.indexOf(to.name) > -1) {
      if (_isAuthenticated) next();
      else next({ name: "LoginPage" });
    } else {
      next();
    }
  });

export default router;

