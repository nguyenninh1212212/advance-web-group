import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoutes from "./router";
import "./App.css";

interface RouteType {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.FC<{ children: React.ReactNode }> | null;
  children?: RouteType[];
}

const App: React.FC = () => {
  const renderRoutes = (routes: RouteType[]) => {
    return routes.map((route, index) => {
      const Page = route.component;
      const Layout = route.layout;

      if (route.children) {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              Layout ? (
                <Layout>
                  <Page />
                </Layout>
              ) : (
                <Page />
              )
            }
          >
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={index}
          path={route.path}
          element={
            Layout ? (
              <Layout>
                <Page />
              </Layout>
            ) : (
              <Page />
            )
          }
        />
      );
    });
  };

  return (
    <Router>
      <div className="App overflow-auto scrollbar-hide">
        <Routes>{renderRoutes(publicRoutes)}</Routes>
      </div>
    </Router>
  );
};

export default App;
