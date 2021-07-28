import React, { useState, useEffect } from 'react';
import OutfitItem from './OutfitItem.jsx';
import styled from 'styled-components';
import $ from 'jquery';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Helvetica, Arial, sans-serif;
  margin-right: 25%;
  margin-left: 25%;
  align-items: center;
  justify-content: center;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Card = styled.div`
  border-style: groove;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  width: 200px;
  text-align: center;
  line-height: 350px;
`

const Outfit = (props) => {
  const [productIndex, setProductIndex] = useState(0);
  const [isLeftButtonShown, setIsLeftButtonShown] = useState(false);
  const [isRightButtonShown, setIsRightButtonShown] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({});

  const CAROUSEL_WIDTH = 2;

  const handleClick = (isRight) => {
    if (isRight) {
      setProductIndex(productIndex + 1)
      setIsLeftButtonShown(true);
      if (productIndex + 1 + CAROUSEL_WIDTH >= props.outfits.length) {
        setIsRightButtonShown(false);
      } else {
        setIsRightButtonShown(true);
      }
    } else {
      setProductIndex(productIndex - 1)
      setIsRightButtonShown(true);
      if (productIndex - 1 <= 0) {
        setIsLeftButtonShown(false);
      } else {
        setIsLeftButtonShown(true);
      }
    }
  }

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/${props.productId}/`,
      success: (product) => {
        // console.log(product);
        setCurrentProduct(product);
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, []);

  return (
    <div>
      <h5>YOUR OUTFIT</h5>
      <CarouselContainer>
        <button onClick={() => handleClick(false)} style={{visibility: isLeftButtonShown ? 'visible' : 'hidden' }}>left</button>
        <CardContainer>
          <Card onClick={() => props.handleAddOutfits()}>Add to Outfit</Card>
          {props.outfits.slice(productIndex, productIndex + CAROUSEL_WIDTH).map(product => <OutfitItem product={product} />)}
        </CardContainer>
        <button onClick={() => handleClick(true)} style={{visibility: isRightButtonShown ? 'visible' : 'hidden' }}>right</button>
      </CarouselContainer>
    </div>
  );
}

export default Outfit;