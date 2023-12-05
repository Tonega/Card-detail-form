import React, { useState, useEffect } from 'react';
import './Card.css';
import img from './assets/images/bg-card-back.png';
import img1 from './assets/images/bg-card-front.png';
import ThankYou from './ThankYou';

const Card = () => {
  const [num, setNum] = useState('');
  const [name, setName] = useState('');
  const [mm, setMm] = useState('');
  const [yy, setYy] = useState('');
  const [cvv, setCvv] = useState('');

  const [nameError, setNameError] = useState('');
  const [numError, setNumError] = useState('');
  const [mmError, setMmError] = useState('');
  const [yyError, setYyError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const [nameBorder, setNameBorder] = useState('1px solid rgb(208, 208, 208)');
  const [numBorder, setNumBorder] = useState('1px solid rgb(208, 208, 208)');
  const [mmBorder, setMmBorder] = useState('1px solid rgb(208, 208, 208)');
  const [yyBorder, setYyBorder] = useState('1px solid rgb(208, 208, 208)');
  const [cvvBorder, setCvvBorder] = useState('1px solid rgb(208, 208, 208)');

   const [formSubmitted, setFormSubmitted] = useState(false);
   const [cardDetails, setCardDetails] = useState({});

  
  useEffect(() => {
    updateCardExpDate();
  }, [mm, yy]);

  const handleNumChange = (event) => {
    const newNum = event.target.value;
    // Remove non-digit characters
    const formattedNum = newNum.replace(/\D/g, '');
    // Add spaces after every 4 digits
    const spacedNum = formattedNum.replace(/(\d{4})/g, '$1 ').trim();
    setNum(spacedNum);
    setNumError('');
    setNumBorder('1px solid rgb(208, 208, 208)');
    updateCardNum(spacedNum);
  }
  
0
  const updateCardNum = (newNum) => {
    const numCardElement = document.getElementById('numcard');
    if (numCardElement) {
      numCardElement.textContent = newNum || '0000 0000 0000 0000';
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    const newName = event.target.value;
    setNameError('');
    setNameBorder('1px solid rgb(208, 208, 208)');
    updateCardName(newName);
  };

  const updateCardName = (newName) => {
    const nameCardElement = document.getElementById('namecard');
    if (nameCardElement) {
      nameCardElement.textContent = newName || 'Jane Appleseed';
    }
  };

  const handleMmChange = (event) => {
    setMm(event.target.value);
    setMmError('');
    setMmBorder('1px solid rgb(208, 208, 208)');
  };

  const handleYyChange = (event) => {
    setYy(event.target.value);
    setYyError('');
    setYyBorder('1px solid rgb(208, 208, 208)');
  };

  const updateCardExpDate = () => {
    const mmCardElement = document.getElementById('expcard');
    if (mmCardElement) {
      const mmValue = mm || '00';
      const yyValue = yy || '00';
      mmCardElement.textContent = `${mmValue}/${yyValue}`;
    }
  };

  const handleCvvChange = (event) => {
    const newCvv = event.target.value;
    setCvv(newCvv);
    setCvvError('');
    setCvvBorder('1px solid rgb(208, 208, 208)');
    updateCardCvv(newCvv);
  };

  const updateCardCvv = (newCvv) => {
    const cvvCardElement = document.getElementById('cvvcard');
    if (cvvCardElement) {
      cvvCardElement.textContent = newCvv || '000';
    }
  };
  

  const handleFormSubmit = () => {
    namecheck();
    numcheck();
    mmcheck();
    yycheck();
    cvvcheck();

    if (!nameError && !numError && !mmError && !yyError && !cvvError) {
      setFormSubmitted(true);
    }
    const cardDetails = { name, cardNumber: num, expiryDate: `${mm}/${yy}`, cvv };
      setCardDetails(cardDetails);
  };

  const namecheck = () => {
    if (!name.trim()) {
      setNameError('Name can\'t be blank');
      setNameBorder('1px solid red');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Invalid name');
      setNameBorder('1px solid red');
    } else if (name.split(' ').length < 2) {
      setNameError('Name is incomplete');
      setNameBorder('1px solid red');
      
    }
  };

  const numcheck = () => {
    if (!num.trim()) {
      setNumError('Card number can\'t be blank');
      setNumBorder('1px solid red');
    } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(num)) {
      setNumError('Invalid card number format');
      setNumBorder('1px solid red');
    }
  };

  const mmcheck = () => {
    if (!mm.trim()) {
      setMmError('Can\'t be blank');
      setMmBorder('1px solid red');
    } else if (!/^\d{1,2}$/.test(mm) || mm < 1 || mm > 12) {
      setMmError('Invalid month');
      setMmBorder('1px solid red');
    }
  };

  const yycheck = () => {
    if (!yy.trim()) {
      setYyError('Can\'t be blank');
      setYyBorder('1px solid red'); 
    } else if (!/^\d{2}$/.test(yy) || (yy < 22) || (yy === '22' && mm >= 9)) {
      setYyError('Card expired');
      setYyBorder('1px solid red'); 
    }
  };

  const cvvcheck = () => {
    if (!cvv.trim()) {
      setCvvError('Can\'t be blank');
      setCvvBorder('1px solid red');
    } else if (!/^\d{3}$/.test(cvv)) {
      setCvvError('Invalid CVV');
      setCvvBorder('1px solid red');
    }
  };

  return (
    <>
    {formSubmitted ? (
        <ThankYou cardDetails={cardDetails} />
      ) : (
      <main>
      
        <div className='bg'>
        <div className='cardback'>
        <img className='back-img' src={img} alt="" />
        <p id="cvvcard" className='cvvcard'>000</p>
      </div>
      <div className='cardfront'>
        <img className='front-img' src={img1} alt="" />
        <p id="numcard" className='numcard'>0000 0000 0000 0000</p>
        <p id="namecard" className='namecard'>Jane Appleseed</p>
        <p id="expcard" className='expcard'>00/00</p>
        <div id="emblems">
            <div id="circlebig"></div>
            <div id="circlesmall"></div>
        </div>
      </div>
        </div>

        <div className='form'>
          <div className='container'>
            <p className='card'>Cardholder Name</p>
            <input type="text" className='name' id="name" placeholder='e.g. Jane Appleseed' onChange={handleNameChange} style={{ border: nameBorder }} />
            <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {nameError} </p>
            <p>Card Number</p>
            <input type="text" className='num' id="num" placeholder='e.g. 1234 5678 9123 0000' onChange={handleNumChange} value={num} style={{ border: numBorder }} />
            <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {numError} </p>
            <div className="container2">
              <div className="texts">
                <p>Exp. Date (MM/YY)</p>
                <p>CVV</p>
              </div>
              <div className="inputs">
                <input type="text" className='mm' id="mm" placeholder='MM' onChange={handleMmChange} style={{ border: mmBorder }} />
                <input type="text" className='yy' id="yy" placeholder='YY' onChange={handleYyChange} style={{ border: yyBorder }} />
                <input type="text" className='cvv' id="cvv" placeholder='e.g. 123' onChange={handleCvvChange} style={{ border: cvvBorder }} />
              </div>
              <div id="errtexts">
              <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {mmError} </p>
              <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {yyError} </p>
              <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {cvvError} </p>
              </div>
              <input type="button" id='confirm' value="confirm" onClick={handleFormSubmit} />
            </div>
          </div>
        </div>
      
      </main>
      )}
    </>

  );
}

export default Card;
