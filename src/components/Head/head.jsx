import React, { Component } from 'react';
import { Header } from 'components/pagesHeader';
import { Link } from 'react-router-dom';
import { LogOutBlock } from 'components/logOutBlock'

import './head.css';
export class Head extends Component {
  state = {
    firstData: {},
    firstAPiName: '',
    firstAPiBirth: '',
    firstAPiImg: 0,
    occupation: [],

    secData: {},
    secApiName: '',
    secApiDesc: '',

    thirdData: {},
    thirdApiTitle: '',
    thirdApiDesc: '',
    thirdApiImg: '',
  }
  componentDidMount(){
    const API1 = 'https://www.breakingbadapi.com/api/characters';
    const API2 = 'https://newsapi.org/v2/everything?q=auto industry&apiKey=4e016d415a11418d81892362337c0730';
    const API3 = 'https://api.covid19api.com/';

    fetch(API1)
      .then(res => res.json())
      .then(data => {
        let idx = Math.floor(Math.random() * data.length - 1)
        if (idx === -1){
          idx = 0
        }
        let res = data[idx]
        this.setState({
          firstData: data,
          firstAPiName: res.name,
          firstAPiBirth: res.birthday,
          firstAPiImg: res.img,
          occupation: res.occupation
        })
        
      })
    
    let keys = []
    fetch(API3)
      .then(res => res.json())
      .then(data => {
        for (let key in data){
          keys.push(key)
        }
        let idx = Math.floor(Math.random() * keys.length - 1)
        if (idx === -1){
          idx = 0
        }
        let res = data[keys[idx]];
        this.setState({
          secData: data,
          secApiName: res.Name,
          secApiDesc: res.Description
        })
      })
    
    fetch(API2)
      .then(res => res.json())
      .then(data => {
        let idx = Math.floor(Math.random() * data.articles.length - 1);
        if (idx === -1){
          idx = 0;
        }
        let res = data.articles[idx];
        this.setState({
          thirdData: data,
          thirdApiTitle: res.title,
          thirdApiDesc: res.description,
          thirdApiImg: res.urlToImage
        })
      })
  }
  setAPI = (data) => {
    const { setAPI } = this.props
    setAPI(data)
  }
  render(){
    const { firstData, secData,  thirdData, firstAPiName, firstAPiBirth, firstAPiImg, occupation, secApiName, secApiDesc, thirdApiTitle, thirdApiDesc, thirdApiImg} = this.state
    const { Login, users, SignIn, API } = this.props
    return(
      users.length
      ?
      <div>
        <Header users={users} Login={Login} SignIn={SignIn}/>
        <main>
          {
            <div className="content-block">
                <div className="api-card">
                  <div className="api-card-head">
                    <img src={firstAPiImg} alt="photo" className="card-img"/>
                     <p>{firstAPiName} {firstAPiBirth}</p>
                     </div>
                  <Link to="/api" onClick = {() => this.setAPI(firstData)} className="api-info-link first-card-link">
                    <button className="api-info-btn">get more</button>
                  </Link>
                  <div className="api-card-items">
                    <div className="api-card-item">{occupation[0]}</div>
                    <div className="api-card-item">{occupation[1]}</div>
                  </div>
                </div>

              <div className="api-card">
                <div className="api-card-head middle-card-head">{secApiName}</div>
                <Link to="/api" onClick = {() => this.setAPI(secData)} className="api-info-link">
                  <button className="api-info-btn">get more</button>
                </Link>
                <div className="api-card-items">{secApiDesc}</div>
              </div>
              
              <div className="api-card">
                <div className="api-card-head">
                  <img className="card-img" src={thirdApiImg ? thirdApiImg : 'https://static.reuters.com/resources/r/?m=02&d=20210101&t=2&i=1546316368&r=LYNXMPEGBU0W7&w=800'} alt="photo"/>
                  <span>{thirdApiTitle}</span>
                  <Link to="/api" onClick = {() => this.setAPI(thirdData)} className="api-info-link">
                    <button className="api-info-btn">get more</button>
                  </Link>
                </div>
                <div className="api-card-items">{thirdApiDesc}</div>
              </div>
            </div>
          }
        </main>
      </div>
      :
      <LogOutBlock/>
    )
  }
}
