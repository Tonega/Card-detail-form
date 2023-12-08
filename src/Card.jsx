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

  const [formValidity, setFormValidity] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

  useEffect(() => {
    updateCardExpDate();
    validateForm();
  }, [mm, yy, num, name, cvv]);

  const validateForm = () => {
    const isValid =
      name.trim() !== '' &&
      num.trim() !== '' &&
      mm.trim() !== '' &&
      yy.trim() !== '' &&
      cvv.trim() !== '' &&
      !nameError &&
      !numError &&
      !mmError &&
      !yyError &&
      !cvvError;

    setFormValidity(isValid);
  };

  const handleNumChange = (event) => {
    const newNum = event.target.value;
    const formattedNum = newNum.replace(/\D/g, '');
    const spacedNum = formattedNum.replace(/(\d{4})/g, '$1 ').trim();
  
    // Limit the card number to 16 digits
    const limitedNum = spacedNum.slice(0, 19);
  
    setNum(limitedNum);
    setNumError('');
    setNumBorder('1px solid rgb(208, 208, 208)');
    updateCardNum(limitedNum);
    validateForm();
  };

  const updateCardNum = (newNum) => {
    const numCardElement = document.getElementById('numcard');
    if (numCardElement) {
      numCardElement.textContent = newNum || '0000 0000 0000 0000';
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
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
    const newMm = event.target.value;
    const formattedMm = newMm.replace(/\D/g, ''); // Remove non-numeric characters
    const limitedMm = formattedMm.slice(0, 2); // Limit to two digits
  
    setMm(limitedMm);
    setMmError('');
    setMmBorder('1px solid rgb(208, 208, 208)');
  };
  const handleYyChange = (event) => {
    const newYy = event.target.value;
    const formattedYy = newYy.replace(/\D/g, ''); // Remove non-numeric characters
    const limitedYy = formattedYy.slice(0, 2); // Limit to two digits
  
    setYy(limitedYy);
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
    const formattedCvv = newCvv.replace(/\D/g, ''); // Remove non-numeric characters
    const limitedCvv = formattedCvv.slice(0, 3); // Limit to three digits
  
    setCvv(limitedCvv);
    setCvvError('');
    setCvvBorder('1px solid rgb(208, 208, 208)');
    updateCardCvv(limitedCvv);
  };

  const updateCardCvv = (newCvv) => {
    const cvvCardElement = document.getElementById('cvvcard');
    if (cvvCardElement) {
      cvvCardElement.textContent = newCvv || '000';
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Add this line to prevent the default form submission behavior

    namecheck();
    numcheck();
    mmcheck();
    yycheck();
    cvvcheck();

    if (formValidity) {
      const cardDetails = { name, cardNumber: num, expiryDate: `${mm}/${yy}`, cvv };
      setCardDetails(cardDetails);
      setFormSubmitted(true);
    }
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
      setNumError('Wrong format, Numbers only');
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
    } else {
      const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
      const yyValue = parseInt(yy, 10);
    
      if (yyValue < 24 || yyValue > 99 || (yyValue === currentYear && mm >= 9)) {
        setYyError('Invalid year');
        setYyBorder('1px solid red');
      } else {
        setYyError('');
        setYyBorder('1px solid rgb(208, 208, 208)');
      }
    
      // Additional check for card expiration
      if (yyValue < currentYear + 24) {
        setYyError('Expired Card');
        setYyBorder('1px solid red');
      } else if (yyValue === currentYear && mm < 9) {
        setYyError('Expired Card');
        setYyBorder('1px solid red');
      }
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

          <form className='form' onSubmit={handleFormSubmit}>
            <div className='container'>
              <p className='card'>Cardholder Name</p>
              <input type="text" className='name' id="name" placeholder='e.g. Jane Appleseed' onChange={handleNameChange} value={name || ''} style={{ border: nameBorder }} />
              <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {nameError || ''} </p>
              <p>Card Number</p>
              <input type="text" className='num' id="num" placeholder='e.g. 1234 5678 9123 0000' onChange={handleNumChange} value={num || ''} style={{ border: numBorder }} />
              <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {numError || ''} </p>
              <div className="container2">
                <div className="texts">
                  <p>Exp. Date (MM/YY)</p>
                  <p>CVV</p>
                </div>
                <div className="inputs">
                  <input type="text" className='mm' id="mm" placeholder='MM' onChange={handleMmChange} value={mm || ''} style={{ border: mmBorder }} />
                  <input type="text" className='yy' id="yy" placeholder='YY' onChange={handleYyChange} value={yy || ''} style={{ border: yyBorder }} />
                  <input type="text" className='cvv' id="cvv" placeholder='e.g. 123' onChange={handleCvvChange} value={cvv || ''} style={{ border: cvvBorder }} />
                </div>
                <div id="errtexts">
                  <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {mmError || ''} </p>
                  <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {yyError || ''} </p>
                  <p className='errtext' style={{ color: 'red', marginTop: '3px', marginBottom: '15px', fontSize: '11px', fontWeight: '500' }}> {cvvError || ''} </p>
                </div>
                <input type="submit" id='confirm' value="confirm" />
              </div>
            </div>
          </form>

        </main>
      )}
    </>
  );
}

export default Card;