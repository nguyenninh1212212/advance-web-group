import ComicDetail from "../page/ComicDetail";
import Header from "../layout/Header";
const comicRoutes = [
    { 
        path: "/", component: ComicDetail, 
        layout: Header 
    },  
    {
        path: '/comicdetail/:id',
        component: ComicDetail,
    },
];

export default comicRoutes;