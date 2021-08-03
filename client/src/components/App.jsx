/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QA from './QA.jsx';
import Overview from './Overview.jsx';
import RelatedProduct from './RelatedProduct.jsx';
import Outfit from './Outfit.jsx';

// should put default back to 20100 before pull request
const DEFAULT_PRODUCT_ID = 20100;

const App = ({trackPageView}) => {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    trackPageView(1, 1);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]))
    }
    setOutfits(JSON.parse(localStorage.getItem('outfits')))
  }, []);

  const handleChangeOverview = (productId) => {
    // console.log('productId', productId)
    setProductId(productId)
  }

  const handleAddOutfits = () => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/fullProducts/${productId}`,
      success: (product) => {
        // console.log(product);
        const currentOutfits = JSON.parse(localStorage.getItem('outfits'))
        if (currentOutfits.map(fullProduct => fullProduct.id).indexOf(productId) === -1) {
          currentOutfits.push(product)
          localStorage.setItem('outfits', JSON.stringify(currentOutfits))
          setOutfits(JSON.parse(localStorage.getItem('outfits')))
        }
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }

  const handleDeleteOutfit = (deleteId) => {
    let products = JSON.parse(localStorage.getItem('outfits'));
    products = products.filter(product => product.id !== deleteId);
    localStorage.setItem('outfits', JSON.stringify(products));
    setOutfits(products);
  }


 const handleClick = (e, moduleElem) => {
   console.log(e.target);
   console.log(new Date());
   console.log(moduleElem);
 }

  return (
    <div>
      <Overview productId={productId} handleClick={handleClick} />
      <RelatedProduct productId={productId} handleChangeOverview={handleChangeOverview} handleClick={handleClick} />
      <Outfit outfits={outfits} productId={productId} handleAddOutfits={handleAddOutfits} handleDeleteOutfit={handleDeleteOutfit} handleClick={handleClick} />
      <QA productId={productId} handleClick={handleClick} />
    </div>
  );
};

export default App;
