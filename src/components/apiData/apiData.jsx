import React, { Component } from 'react';
import './apiData.css'
import { Header } from 'components/pagesHeader'
export class  ApiData extends Component {

  componentDidMount(){
    const { API } = this.props
    if (API[0]){
      if (API[0].char_id){
        const data = API
        for (let key in data){
          const card = document.createElement('div');
          const cardHead = document.createElement('div');
          const desc = document.createElement('div');
          const img = document.createElement('img');
          const title = document.createElement('span');
          const descItem1 = document.createElement('div');
          img.setAttribute('src', data[key].img)
          
          descItem1.classList.add('api-card-item');
          img.classList.add('card-img')
          card.classList.add('api-card');
          cardHead.classList.add('api-card-head');
          desc.classList.add('api-card-items');
  
          title.append(data[key].name);
          title.append(data[key].birthday);
          descItem1.append(data[key].occupation[0])
  
          cardHead.append(img);
          cardHead.append(title)
          desc.append(descItem1)
          card.append(cardHead);
          card.append(desc);
          document.querySelector('.api-data-container').append(card)
        }
      }
    }else if (API.status == null){
      for (let key in API){
        const card = document.createElement('div');
        const cardHead = document.createElement('div');
        const desc = document.createElement('div');
        card.classList.add('api-card');
        cardHead.classList.add('api-card-head');
        desc.classList.add('api-card-items');

        cardHead.append(API[key].Name)
        desc.append(API[key].Description)
        card.append(cardHead)
        card.append(desc)

        document.querySelector('.api-data-container').append(card)
      }
    }else if (API.status === 'ok'){
      API.articles.forEach((el, idx) => {
        const card = document.createElement('div');
        const cardHead = document.createElement('div');
        const desc = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('span');

        img.classList.add('card-img')
        card.classList.add('api-card');
        cardHead.classList.add('api-card-head');
        desc.classList.add('api-card-items');

        img.setAttribute('src', el.urlToImage)
        title.append(el.title)
        cardHead.append(img)
        cardHead.append(title)
        desc.append(el.description)

        card.append(cardHead)
        card.append(desc)
        document.querySelector('.api-data-container').append(card)
      })
    }
  }
  render(){
    const { users, Login, SignIn } = this.props
    return(
      <div>
        <Header  users={users} Login={Login} SignIn={SignIn}/>
        <div>
          <div className="api-data-container"></div>
        </div>
      </div>
    )
  }
}