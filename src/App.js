import React, { Component } from "react"
import { Route, Switch } from "react-router"
import AuthWrapper from "./components/AuthWrapper"
import OauthRedirect from "./components/OauthRedirect"
import "font-awesome/css/font-awesome.min.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/redirect" render={() => <OauthRedirect />} />
        <Route>
          <AuthWrapper />
        </Route>
      </Switch>
    )
  }
}

export default App
