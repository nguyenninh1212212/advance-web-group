import Home from "../page/Home/Home";
import Header from "../layout/Header";
import ComicDetail from "../page/Comic/ComicDetail";
import Chapter from "../page/Chapter/Chapter";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import ForgotPassword from "../page/Auth/ForgotPassword";
import ResetPassword from "../page/Auth/ResetPassword";
import HomeLayout from "../layout/HomeLayout";
import ResultSearch from "../page/Result/ResultSearch";
import Favorite from "../page/My/Favorite";
import History from "../page/My/History";
import List from "../page/My/Story/List";
import CreateStory from "../page/My/Story/CreateStory";
import CreateChapter from "../page/My/Story/CreateChapter";
import SubscriptionPlan from "../page/Subscription/SubscriptionPlan";
import PaymentHistory from "../page/My/Payment/PaymentHistory";
import TrashList from "../page/My/Story/TrashList";
import AuthorDetail from "../page/Comic/AuthorDetail";
import { Profile } from "../page/My/Profile";
import OAuth2RedirectHandler from "../page/Auth/OAuth2RedirectHandler";
import TopUpPage from "../page/My/Payment/TopUpPage";
import VnpayReturn from "../page/My/Payment/VNPayReturn";

const RoutesConfig = () => {
  const publicRoutes = [
    {
      path: "/auth/login",
      component: Login,
    },
    {
      path: "/auth/forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/auth/reset-password",
      component: ResetPassword,
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
      path: "/author/detail/:id",
      component: AuthorDetail,
      layout: Header,
    },
    {
      path: "/:name/chapter/:id",
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
      path: "/my/list",
      component: List,
      layout: Header,
    },
    {
      path: "/my/list/trash",
      component: TrashList,
      layout: Header,
    },
    {
      path: "/my/list/create",
      component: CreateStory,
      layout: Header,
    },
    {
      path: "/my/list/:name/chapter/add",
      component: CreateChapter,
      layout: Header,
    },
    {
      path: "/subscription-plan",
      component: SubscriptionPlan,
      layout: Header,
    },
    {
      path: "/my/payment-history",
      component: PaymentHistory,
      layout: Header,
    },
    {
      path: "/oauth2/redirect",
      component: OAuth2RedirectHandler,
    },
  ];

  const privateRoutes = [
    {
      path: "/my/profile",
      component: Profile,
      layout: Header,
    },

    {
      path: "/payment/to-up",
      component: TopUpPage,
      layout: Header,
    },
    {
      path: "payment/vnpay-return",
      component: VnpayReturn,
      layout: Header,
    },
  ];

  return { publicRoutes, privateRoutes };
};

export default RoutesConfig;
