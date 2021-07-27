import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import ProductComparison from './ProductComparison.jsx';

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`
const Card = styled.div`
  border-style: groove;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
`

Modal.setAppElement('#root');
const RelatedProductItem = (props) => {
  // console.log(props);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let rating = calculateAverage(props.product.reviews);

  return (
    <Card>
      <FaStar size={20} style={{ fill: '#e4e5e9', position: 'absolute', top: 0, right: 0 , stroke: "#ffc107", strokeWidth: 20 }} onClick={() => setModalIsOpen(true)} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style = {
          {
            overlay: { backgroundColor: '#e4e5e9' },
            content: { color: 'black'}
          }
        }
        >
        <h2>Comparing</h2>
        <ProductComparison comparedProduct={props.product} currentProduct={props.currentProduct}/>
      </Modal>
      <StyledImage src={props.product.results[0].photos[0].thumbnail_url || 'https://via.placeholder.com/300x300'} alt={props.product.name} />
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
      <StarRating rating={rating}/>
    </Card>
  );
};

export default RelatedProductItem;