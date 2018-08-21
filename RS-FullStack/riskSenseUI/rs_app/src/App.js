import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import MainPage from './containers/MainPage/index';
import '../node_modules/react-vis/dist/style.css';

import './App.css';

//setting the theme for UX
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238'
    },
    secondary: {
      main: '#B0BEC5'
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
            <MainPage>
            </MainPage>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
