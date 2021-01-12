import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Head } from 'components/Head';
import { signIn, setApiData } from 'actions'

class headContainer extends PureComponent {
  render(){
    const { loginData, users, SignIn, setApiData, apiData } = this.props
    return (
      <Head Login={loginData} users={users} SignIn={SignIn} setAPI = {setApiData} API={apiData}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  const users = state.data.getIn(['entries', 'users']).toList().toJS()
  const loginData = state.data.getIn(['entries', 'profile']).toJS();
  const apiData = state.data.getIn(['entries', 'currentApi']).toJS()
  return {
    loginData,
    users,
    apiData
  }
}
function mapDispatchToProps(dispatch){
  return {
    SignIn: (data) => dispatch(signIn(data)),
    setApiData: (data) => dispatch(setApiData(data)) 
  }
}

export const headRedux = connect(mapStateToProps, mapDispatchToProps)(headContainer)