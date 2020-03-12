// ─── UTILITIES ──────────────────────────────────────────────────────────────────
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
import Navbar from './components/Navbar'
import Maintenance from './components/Maintenance'
// ─── USER SIDE ──────────────────────────────────────────────────────────────────
import Index from './client/Index'
import Register from './client/Register'
import Login from './client/Login'
import AddProduct from './client/AddProduct'
import SetupProfile from './client/SetupProfile'
import Profile from './client/Profile'
import ProductDescription from './client/ProductDescription'
import Cart from './client/Cart'
import Checkout from './client/Checkout'
import TransactionList from './client/TransactionList'
// ─── ADMIN SIDE ─────────────────────────────────────────────────────────────────
import UserList from './delta/UserList'
import CartHolder from './delta/CartHolder'
import Dashboard from './delta/Dashboard'
import Transactions from './delta/Transactions'
import Maps from './delta/Maps'
import Notifications from './delta/Notifications'

const Central = () => {
  return (
    <Router>
      <Route exact path="/dashboard" component={Dashboard} />
      <Fragment>
        <Navbar />
        <div className="entry" >
          <Route exact path="/" component={Index} />
        </div>
        <Switch>
          {/* USER SIDE */}
          <Route exact path="/addProduct" component={AddProduct} />
          <Route exact path="/product/description/:id" component={ProductDescription} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/setupProfile" component={SetupProfile} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cartHolder" component={CartHolder} />
          <Route exact path="/transactionList" component={TransactionList} />
          {/* ADMIN SIDE */}
          <Route exact path="/maintenance" component={Maintenance} />
          <Route exact path="/admin/userList" component={UserList} />
          <Route exact path="/admin/transactionList" component={Transactions} />
          <Route exact path="/admin/maps" component={Maps} />
          <Route exact path="/admin/notifications" component={Notifications} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default Central;
