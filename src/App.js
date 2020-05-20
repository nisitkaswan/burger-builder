import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';



class App extends Component {
  render() {
    return <BrowserRouter>
      <div>
        <Layout>
          <p>Test</p>
        </Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route  path="/" component={BurgerBuilder}></Route>
      </Switch>
      </div></BrowserRouter>
  }
}

export default App;
