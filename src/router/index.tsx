import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
import Chapter from "../page/Chapter/Chapter";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import ForgotPassword from "../page/Auth/ForgotPassword";
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
    path: "/auth/forgot",
    component: ForgotPassword,
  },
  {
    path: "/",
    component: Home,
    layout: Header,
  },

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

export default publicRoutes;
