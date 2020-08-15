import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const Main = React.lazy(() => import("./Main"));
const Login = React.lazy(() => import("./Auth/Login"));
const Landing = React.lazy(() => import("./Landing"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Group = React.lazy(() => import("./Group"));
const Dish = React.lazy(() => import("./Dish"));
const PageNotFound = React.lazy(() => import("./Common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUser } from "../actions/user";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    axios.defaults.withCredentials = true;
    this.props.setUser();
  }
  render() {
    return (
      <>
        <Suspense fallback={<div className="loader"></div>}>
          <Switch>
            <Route
              path="/main"
              token={this.props.token}
              render={(props) => <Main {...props} />}
              exact
            />
            <Route
              path="/"
              token={this.props.token}
              render={(props) => <Landing {...props} />}
              exact
            />
            <Route
              path="/dish"
              token={this.props.token}
              render={(props) => <Dish {...props} />}
              exact
            />
            <Route
              path="/login"
              token={this.props.token}
              render={(props) => <Login {...props} />}
              exact
            />
            <Route
              path="/signup"
              token={this.props.token}
              render={(props) => <Signup {...props} />}
              exact
            />
            <Route path="/group">
              <Route
                path="/group/:groupId"
                token={this.props.token}
                render={(props) => <Group {...props} />}
                exact
              />
            </Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user._id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
