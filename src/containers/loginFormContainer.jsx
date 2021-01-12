import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginForm } from 'components/loginForm';
import { signIn, addUser } from 'actions'

class loginFormContainer extends PureComponent {

  render(){
    const { SignIn, loginData, addUser } = this.props
    return(
      <LoginForm SignIn={SignIn} loginData={loginData} addUser={addUser}/>
    )
  }
}

function mapStateToProps(state, ownProps){
  const loginData = state.data.getIn(['entries', 'profile']).toJS()
  return {
    loginData
  }
}
function mapDispatchToProps(dispatch){

  return {
    SignIn: (data) => dispatch(signIn(data)),
    addUser: (userData) => dispatch(addUser(userData))
  }
}

export const loginRedux = connect(mapStateToProps, mapDispatchToProps)(loginFormContainer)