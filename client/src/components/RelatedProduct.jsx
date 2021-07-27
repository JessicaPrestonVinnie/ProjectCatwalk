import React, { useState, useEffect } from 'react';
import RelatedProductItem from './RelatedProductItem.jsx';
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
        if (products.length > CAROUSEL_WIDTH) {
          setIsRightButtonShown(true);
        }
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, []);

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
  // console.log('tt',currentProduct);

  const handleClick = (isRight) => {
    if (isRight) {
      setProductIndex(productIndex + 1)
      setIsLeftButtonShown(true);
      if (productIndex + 1 + CAROUSEL_WIDTH >= relatedProducts.length) {
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
  // console.log(props);
  return (
    <div>
      <h5>RELATED PRODUCTS</h5>
      <CarouselContainer>
        <button onClick={() => handleClick(false)} style={{visibility: isLeftButtonShown ? 'visible' : 'hidden' }}>left</button>
        <CardContainer>
          {relatedProducts.slice(productIndex, productIndex + CAROUSEL_WIDTH).map(product => <RelatedProductItem product={product}
          currentProduct={currentProduct} />)}
        </CardContainer>
        <button onClick={() => handleClick(true)} style={{visibility: isRightButtonShown ? 'visible' : 'hidden' }}>right</button>
      </CarouselContainer>
    </div>
  );
}

export default RelatedProduct;