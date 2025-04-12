import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoutesConfig from "./router/index";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./router/PrivateRouter";
import { useSelector } from "react-redux";
import { selectTheme } from "./redux/slices/themeSlice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

interface RouteType {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.FC<{ children: React.ReactNode }> | null;
  children?: RouteType[];
}

const App: React.FC = () => {
  const { publicRoutes, privateRoutes } = RoutesConfig();
  const theme = useSelector(selectTheme);

  const renderRoutes = (routes: RouteType[], isPrivate: boolean) => {
    return routes.map((route, index) => {
      const Page = route.component;
      const Layout = route.layout;

      return (
        <Route
          key={index}
          path={route.path}
          element={
            isPrivate == true ? (
              <PrivateRoute>
                {Layout ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Page />
                )}
              </PrivateRoute>
            ) : Layout ? (
              <Layout>
                <Page />
                {route.children && renderRoutes(route.children, isPrivate)}
              </Layout>
            ) : (
              <>
                <Page />
                {route.children && renderRoutes(route.children, isPrivate)}
              </>
            )
          }
        />
      );
    });
  };

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${theme.background} ${theme.border_bottom} ${theme.text}`}
        >
          <Routes>
            {renderRoutes(publicRoutes, false)}
            {renderRoutes(privateRoutes, true)}
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
