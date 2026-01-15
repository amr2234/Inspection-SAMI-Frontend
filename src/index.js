/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/inspection-form
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/inspection-form/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './i18n'; // Import i18n configuration
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import AuthLayout from "layouts/Auth.js";
import RTLLayout from "layouts/RTL.js";
import FormLayout from "layouts/Form.js";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/form`} component={FormLayout} />
        <Route path={`/admin`} component={RTLLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
