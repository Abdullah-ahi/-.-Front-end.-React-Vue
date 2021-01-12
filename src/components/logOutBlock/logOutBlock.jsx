import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
export class LogOutBlock extends Component{
  render(){
    return(
      <div className="log-out-block">
        <h3 className="log-out-message">Авторизуйтесь, чтобы получить доступ к данному разделу</h3>
        <Link to='/' className="log-out-block-link">
          <Button className="log-out-block-btn" variant="outlined" color="inherit">LOG IN</Button>
        </Link>
      </div>
    )
  }
}