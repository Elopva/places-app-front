import React,{Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//import Users from "./User/pages/Users";
//import UserPlaces from "./Places/pages/UserPlaces";
//import NewPlace from "./Places/pages/NewPlace";
//import UpdatePlace from "./Places/pages/UpdatePlace";
//import Auth from "./User/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/Spinner/LoadingSpinner";

import { useAuth } from './shared/hooks/auth-hook';

import { AuthContext } from "./shared/context/auth-contex";

const Users = React.lazy(() => import("./User/pages/Users"));
const NewPlace = React.lazy(() => import("./Places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./Places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./Places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./User/pages/Auth"));


const App = () => {
  const {token, login, logout, userId} = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
