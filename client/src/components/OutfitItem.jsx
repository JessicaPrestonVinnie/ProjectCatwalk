import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';
import { BiXCircle } from 'react-icons/bi';

const StyledImage = styled.img`
  width: 250px;
  height: 250px;
`
const Card = styled.div`
  border-style: groove;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
`

const OutfitItem = (props) => {
  let rating = calculateAverage(props.product.reviews);

  return (
    <Card>
      <BiXCircle style={{position: 'absolute', top: 0, right: 0 }}
      onClick={() => props.handleDeleteOutfit(props.product.id)}/>
      <StyledImage src={props.product.results[0].photos[0].thumbnail_url || 'https://via.placeholder.com/300x300'} alt={props.product.name} />
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
      <StarRating rating={rating}/>
    </Card>
  );
};

export default OutfitItem;