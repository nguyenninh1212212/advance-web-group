import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
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
];

export default publicRoutes;
