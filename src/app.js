import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/img/favicon.ico";
import "./assets/scss/main.scss";
import Async from "react-code-splitting";
import { connect } from "react-redux";

import { updateUser } from "./actions/userActions";
import Logo from "./components/leftPanel/logo";
import { addAnimate } from "./components/HOC/animate";

import NavMenu from "./components/leftPanel/navMenu";
import Header from "./components/header";
import Dashboard from "./components/rightPanel/dashboard";
import Posts from "./components/rightPanel/posts";
import Albums from "./components/rightPanel/albums";
import Comments from "./components/rightPanel/comments";
import Photos from "./components/rightPanel/photos";
import Todos from "./components/rightPanel/todos";

const Users = () => (
  <Async
    load={import(
      /* webpackChunkName: "Users" */ "./components/rightPanel/users"
    )}
  />
);
const Jquery = () => (
  <Async
    load={import(
      /* webpackChunkName: "jquery" */ "./components/rightPanel/jquery"
    )}
  />
);
const Products = () => (
  <Async
    load={import(
      /* webpackChunkName: "products" */ "./components/rightPanel/products"
    )}
  />
);

class App extends Component {
  state = {
    posts: [],
    isLoading: true,
    animationName: "flipInX",
    animationSpeed: "faster",
  };

  dataFromPost = appData => {
    this.setState({
      posts: appData,
      isLoading: false,
    });
  };

  _updateUser = e => {
    this.props._updateUser("Mete");
    addAnimate(e.target, this.state.animationName, this.state.animationSpeed);
  };

  render() {
    console.log("App.js > this.props in render : ", this);
    const { fetching } = this.props.albums;
    return (
      <Router>
        <div className="row align-items-stretch">
          <div className="col-xl-2 col-lg-2 col-1 leftPanel">
            <Logo />
            <hr />
            <NavMenu {...this.props} />
            <h2 className="text-center d-none d-sm-none">{this.props.user}</h2>
            <button
              className={`btn ${
                fetching ? "btn-success " : "btn-danger "
              } btn-block d-none d-sm-none`}
              type="button"
              onClick={this._updateUser}
            >
              {fetching ? "Loading..." : "Warning"}
            </button>
          </div>
          <div className="col-xl-10 col-lg-10 col-11 rightPanel">
            <Header {...this.props} />

            <div className="listContainer">
              <Route
                path="/"
                exact
                render={() => <Dashboard {...this.props} />}
              />
              <Route
                path="/posts"
                exact
                render={() => (
                  <Posts {...this.state} dataFromPost={this.dataFromPost} />
                )}
              />
              <Route
                path="/comments"
                exact
                render={() => (
                  <Comments
                    comments={this.state.comments}
                    isLoading={this.state.isLoading}
                  />
                )}
              />
              <Route
                path="/albums"
                exact
                render={() => <Albums {...this.props} />}
              />
              <Route
                path="/photos"
                exact
                render={() => <Photos {...this.props} />}
              />
              <Route
                path="/todos"
                exact
                render={() => <Todos {...this.state} />}
              />
              <Route
                path="/users"
                exact
                component={Users}
                render={() => <Users {...this.props} />}
              />
              <Route path="/jquery" exact component={Jquery} />
              <Route
                path="/products"
                exact
                render={() => <Products {...this.props} />}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  _updateUser: updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
