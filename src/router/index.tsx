import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
import Chapter from "../page/Chapter/Chapter";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
const publicRoutes = [
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/register",
    component: Register,
  },
  {
    path: "/",
    component: Home,
    layout: Header,
  },
];
const privateRoutes = [
  {
    path: "/:name/detail/:id",
    component: ComicDetail,
    layout: Header,
  },
  {
    path: "/:name/chapter/:id/:number",
    component: Chapter,
    layout: Header,
  },
];

export { publicRoutes, privateRoutes };
