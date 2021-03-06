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
import { setUser, clearUser } from "../actions/user";
import axios from "axios";
import Invite from "./Invite";

class App extends Component {
  constructor(props) {
    super(props);
    axios.defaults.withCredentials = true;
    const { clearUser, history } = this.props;
    window.addEventListener("storage", (e) => {
      if (e.newValue == "false") {
        clearUser();
        history.push("/");
      }
    });
  }
  async componentDidMount() {
    const { setUser, history, token, location } = this.props;
    let isLogin = await setUser();
    if (!isLogin) {
      history.push("/");
    } else {
      if (
        // token &&
        // token != "" &&
        ["/login", "/signup", "/"].includes(location.pathname)
      ) {
        history.push("/main");
      }
    }
  }

  render() {
    const { token } = this.props;
    return (
      <>
        <Suspense fallback={<div className="loader"></div>}>
          <Switch>
            <Route path="/main" render={() => <Main {...this.props} />} exact />
            <Route
              path="/"
              token={token}
              render={() => <Landing {...this.props} />}
              exact
            />
            <Route path="/invite">
              <Route
                path="/invite/:inviteHash"
                render={() => <Invite {...this.props} />}
                exact
              />
            </Route>
            <Route path="/dish" render={() => <Dish {...this.props} />} exact />
            <Route
              path="/login"
              token={this.props.token}
              render={() => <Login {...this.props} />}
              exact
            />
            <Route
              path="/signup"
              token={this.props.token}
              render={() => <Signup {...this.props} />}
              exact
            />
            <Route path="/group">
              <Route
                path="/group/:groupId"
                render={() => <Group {...this.props} />}
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
  return bindActionCreators({ setUser, clearUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
