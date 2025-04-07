import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
import Chapter from "../page/Chapter/Chapter";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import HomeLayout from "../layout/HomeLayout";
import ResultSearch from "../page/Result/ResultSearch";
import Favorite from "../page/My/Favorite";
import History from "../page/My/History";
import List from "../page/My/Story/List";
import CreateStory from "../page/My/Story/CreateStory";

const RoutesConfig = () => {
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
      layout: HomeLayout,
    },
    {
      path: "/filter",
      component: ResultSearch,
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
    {
      path: "/my/favorite",
      component: Favorite,
      layout: Header,
    },
    {
      path: "/my/history",
      component: History,
      layout: Header,
    },
    {
      path: "/my/stories",
      component: List,
      layout: Header,
    },
    {
      path: "/my/stories/create",
      component: CreateStory,
      layout: Header,
    },
  ];

  const privateRoutes = [
    {
      path: "/user/profile",
      component: () => <div>Profile Page</div>,
      layout: Header,
    },
    {
      path: "/user/settings",
      component: () => <div>Settings Page</div>,
      layout: Header,
    },
  ];

  return { publicRoutes, privateRoutes };
};

export default RoutesConfig;
