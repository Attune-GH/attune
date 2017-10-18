'use strict'
import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import store from './store'
import {Provider} from 'react-redux'
import Routes from './routes'

import firebase from 'APP/fire'

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)
