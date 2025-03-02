import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
import Chapter from "../page/Chapter/Chapter";
const publicRoutes = [
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
