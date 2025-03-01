import Home from "../page/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/ComicDetail";
const publicRoutes = [
    { 
        path: "/", component: Home, 
        layout: Header 
    },
    {
        path: '/comicdetail/:id',
        component: ComicDetail,
        layout: Header
    },
];

export default publicRoutes;
