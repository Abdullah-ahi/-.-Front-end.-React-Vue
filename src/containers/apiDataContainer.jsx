import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ApiData } from 'components/apiData';
import { signIn } from 'actions'
class apiDataContainer extends PureComponent {

  render(){
    const { apiData, users, loginData, SignIn } = this.props
    return(
      <ApiData API = {apiData} users={users} Login={loginData} SignIn={SignIn}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  const users = state.data.getIn(['entries', 'users']).toList().toJS()
  const loginData = state.data.getIn(['entries', 'profile']).toJS();
  const apiData = state.data.getIn(['entries', 'currentApi']).toJS()
  return{
    users,
    loginData,
    apiData
  }
}
function mapDispatchToProps(dispatch){
  return{
    SignIn: (data) => dispatch(signIn(data)),
  }
}

export const apiDataRedux = connect(mapStateToProps, mapDispatchToProps)(apiDataContainer)