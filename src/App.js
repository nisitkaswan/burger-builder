import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from '../src/store/actions/index';



class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>

        <Route path="/auth" component={Auth}></Route>
        <Route path="/" component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>

    }

    return <BrowserRouter>
      <div>
        <Layout>
          <p>Test</p>
        </Layout>
        {routes}
      </div></BrowserRouter>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => (dispatch(actions.authCheckState()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
