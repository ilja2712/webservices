import "./style/styleWidth.css";
import "./style/styleHeight.css";
import "./style/style.css";

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";
import Auth from "./components/auth/Auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { useUserContext } from "./context/userContext";

export default () => {
  const { loading, error, user } = useUserContext();

  return ( 
    <>{ error && <p className="error"></p>}
      {loading ? <h2>Loading...</h2> : <> {user ?
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
      :
      <Auth />} </>}
    </>
  )
};
