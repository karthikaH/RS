import React, { Component } from 'react';
import './AppBar.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class AppBarComp extends Component {
  constructor(props){
    super(props);
  }
    render() {
      return (
        <div>
          <AppBar position="static" color="primary" className="appBarClass appbarWh">
            <Toolbar>
              <Typography variant="title" color="inherit" className="titleAlign flex">
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }

  export default AppBarComp;
