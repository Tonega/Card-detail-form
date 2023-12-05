import React, { useState } from 'react';
import './ThankYou.css'; 
import img from './assets/images/bg-card-back.png'; 
import img1 from './assets/images/bg-card-front.png'; 


const ThankYou = ({ cardDetails }) => {
  const { name, cardNumber, expiryDate, cvv } = cardDetails;

  return (
    <main>
      <div className='bg'>
        <div className='cardback'>
          <img className='back-img' src={img} alt="" />
          <p id="cvvcard" className='cvvcard'>{cvv}</p>
        </div>
        <div className='cardfront'>
          <img className='front-img' src={img1} alt="" />
          <p id="numcard" className='numcard'>{cardNumber}</p>
          <p id="namecard" className='namecard'>{name}</p>
          <p id="expcard" className='expcard'>{expiryDate}</p>
          <div id="emblems">
            <div id="circlebig"></div>
            <div id="circlesmall"></div>
          </div>
        </div>
      </div>

      <div id="thank-you-content">
        <div id="tick-container">
          <div id="tick">✓</div>
        </div>
        <h2 id="ty">THANK YOU!</h2>
        <p id="text-end">We've added your card details</p>
      </div>
    </main>
  );
};

export default ThankYou;
