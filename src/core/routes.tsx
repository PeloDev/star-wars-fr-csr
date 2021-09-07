import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CharacterProfilePage from "../pages/CharacterProfilePage";
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";

interface IRoute {
  layout: any;
  subRoutes: Array<any>;
}

export default function Routes() {
  const routes: Array<IRoute> = [
    {
      layout: Main,
      subRoutes: [
        {
          exact: true,
          path: "/",
          component: Main
        },
        {
          exact: true,
          path: "/:page",
          component: Main
        }
      ]
    },
    {
      layout: CharacterProfilePage,
      subRoutes: [
        {
          exact: true,
          path: "/character/:id",
          component: CharacterProfilePage
        }
      ]
    }
  ];

  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={route.subRoutes.some((r) => r.exact)}
            path={route.subRoutes.map((r) => r.path)}
          >
            <route.layout>
              {route.subRoutes.map((subRoute, i) => (
                <Route key={i} {...subRoute} />
              ))}
            </route.layout>
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
