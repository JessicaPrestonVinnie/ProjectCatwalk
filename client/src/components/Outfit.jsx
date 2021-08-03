import React, { useState, useEffect } from 'react';
import OutfitItem from './OutfitItem.jsx';
import styled from 'styled-components';
import $ from 'jquery';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
  width: 250px;
  text-align: center;
  line-height: 350px;
`
const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 4%;
  margin-bottom: 2%;
  font-color: #696969;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25em;
`

const Outfit = (props) => {
  const [productIndex, setProductIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(2);
  const [showAddToOutfit, setShowAddToOutfit] = useState(true);
  const [isLeftButtonShown, setIsLeftButtonShown] = useState(false);
  const [isRightButtonShown, setIsRightButtonShown] = useState(false);

  const handleClick = (isRight) => {
    if (isRight) {
      if (productIndex === 0 && showAddToOutfit) {
        setCarouselWidth(carouselWidth + 1)
        setShowAddToOutfit(false);
      } else {
        setProductIndex(productIndex + 1)
      }
      setIsLeftButtonShown(true);
      if (productIndex + 1 + carouselWidth >= props.outfits.length) {
        setIsRightButtonShown(false);
      }
    } else {
      if (productIndex === 0 && !showAddToOutfit) {
        setCarouselWidth(carouselWidth - 1)
        setShowAddToOutfit(true);
        setIsLeftButtonShown(false);
      } else {
        setProductIndex(productIndex - 1)
      }
      setIsRightButtonShown(true);
    }
  }

  useEffect(() => {
    if (productIndex + carouselWidth < props.outfits.length) {
      setIsRightButtonShown(true);
    }
  }, [props.outfits]);

  return (
    <div onClick={(e, moduleElem) => props.handleClick(e, 'Outfit')}>
      <Wrapper>YOUR OUTFIT</Wrapper>
      <CarouselContainer>
        <FaAngleLeft size={30} onClick={() => handleClick(false)} style={{visibility: isLeftButtonShown ? 'visible' : 'hidden' }} />
        <CardContainer>
          {showAddToOutfit ? <Card onClick={() => props.handleAddOutfits()}>Add to Outfit</Card> : <div></div>}
          {props.outfits.slice(productIndex, productIndex + carouselWidth).map(product => <OutfitItem product={product}
           handleDeleteOutfit={props.handleDeleteOutfit} />)}
        </CardContainer>
        <FaAngleRight size={30} onClick={() => handleClick(true)} style={{visibility: isRightButtonShown ? 'visible' : 'hidden' }} />
      </CarouselContainer>
    </div>
  );
}

export default Outfit;