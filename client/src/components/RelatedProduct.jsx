import React, { useState, useEffect } from 'react';
import RelatedProductItem from './RelatedProductItem.jsx';
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

const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 4%;
  margin-bottom: 2%;
  font-color: #696969;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25em;
`

const RelatedProduct = (props) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [isLeftButtonShown, setIsLeftButtonShown] = useState(false);
  const [isRightButtonShown, setIsRightButtonShown] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const CAROUSEL_WIDTH = 3;
  // const [productReviews, setProductReviews] = useState({});

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/${props.productId}/related/`,
      success: (products) => {
        // console.log(products);
        setRelatedProducts(products);
        setProductIndex(0)
        setIsLeftButtonShown(false);
        if (products.length > CAROUSEL_WIDTH) {
          setIsRightButtonShown(true);
        }
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, [props.productId]);

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

  const handleClick = (isRight) => {
    if (isRight) {
      setProductIndex(productIndex + 1)
      setIsLeftButtonShown(true);
      if (productIndex + 1 + CAROUSEL_WIDTH >= relatedProducts.length) {
        setIsRightButtonShown(false);
      }
    } else {
      setProductIndex(productIndex - 1)
      setIsRightButtonShown(true);
      if (productIndex - 1 <= 0) {
        setIsLeftButtonShown(false);
      }
    }
  }
  // console.log(props);
  return (
    <div>
      <Wrapper>RELATED PRODUCTS</Wrapper>
      <CarouselContainer>
        <FaAngleLeft size={30} onClick={() => handleClick(false)} style={{visibility: isLeftButtonShown ? 'visible' : 'hidden' }} />
        <CardContainer>
          {relatedProducts.slice(productIndex, productIndex + CAROUSEL_WIDTH).map(product => <RelatedProductItem product={product}
          currentProduct={currentProduct} handleChangeOverview={props.handleChangeOverview} />)}
        </CardContainer>
        <FaAngleRight size={30} onClick={() => handleClick(true)} style={{visibility: isRightButtonShown ? 'visible' : 'hidden' }} />
      </CarouselContainer>
    </div>
  );
}

export default RelatedProduct;