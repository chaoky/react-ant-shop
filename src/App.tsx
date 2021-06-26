import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'wouter';

import Home from './Pages/Home';
import ShopCart from './SideBar';

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout style={{ height: '100vh' }}>
          <ShopCart />
          <Home />
        </Layout>
      </Route>
      <Route>404, Not Found!</Route>
    </Switch>
  );
}
