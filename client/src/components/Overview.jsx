/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';
import StylesList from './StylesList.jsx';
import ImageView from './ImageView.jsx';
import CartSelector from './CartSelector.jsx';
import ExpandedView from './ExpandedView.jsx';
import Price from './Price.jsx';

const imageViewStyles = {
  background: '#ddd',
  margin: '40px auto',
  display: 'flex',
};

const calculateReviewCount = (data) => {
  const { ratings } = data;
  let total = 0;
  Object.keys(ratings).forEach((key) => {
    total += parseInt(ratings[key], 10);
  });
  return total;
};

const getDefaultStyle = (data) => {
  let result = data[0];
  data.forEach((element) => {
    if (element['default?'] === true) {
      result = element;
    }
  });
  return result;
};

function Overview(props) {
  const [reviewCount, setReviewCount] = useState('reviewCount');
  const [reviewAverage, setAverage] = useState('reviewAverage');
  const [productInfo, setProductInfo] = useState('productInfo');
  const [stylesInfo, setStylesInfo] = useState('stylesInfo');
  const [currentStyle, setCurrentStyle] = useState('currentStyle');
  const [displayType, setDisplayType] = useState('visible');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/reviews/meta?product_id=${props.productId}`,
      success: (data) => {
        setReviewCount(calculateReviewCount(data));
        setAverage(calculateAverage(data));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/products/${props.productId}`,
      success: (data) => {
        setProductInfo(data);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/products/${props.productId}/styles/`,
      success: (styles) => {
        setStylesInfo(styles.results);
        const defaultStyle = getDefaultStyle(styles.results);
        setCurrentStyle(defaultStyle);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [props.productId]);

  if (displayType === 'none') {
    return (
      <div style={{ flex: '100%' }}>
        <ExpandedView
          currentStyle={currentStyle}
          productId={props.productId}
          setDisplayType={setDisplayType}
          displayType={displayType}
          currentImageIdx={currentImageIdx}
          setCurrentImageIdx={setCurrentImageIdx}
        />
      </div>
    );
  }

  return (
    <div onClick={(e, moduleElem) => props.handleClick(e, 'Overview')}>
      <div style={imageViewStyles}>
        {/* Left Side */}
        <div style={{ flex: '40%' }}>
          <ImageView
            currentStyle={currentStyle}
            productId={props.productId}
            setDisplayType={setDisplayType}
            displayType={displayType}
            currentImageIdx={currentImageIdx}
            setCurrentImageIdx={setCurrentImageIdx}
          />
          <p>{productInfo.description}</p>
          <span>Share on Social Media! &nbsp;</span>
          <a href="javascript:void(0)">Facebook</a>
          <span>&nbsp;</span>
          <a href="javascript:void(0)">Twitter</a>
          <span>&nbsp;</span>
          <a href="javascript:void(0)">Pinterest</a>

        </div>

        {/* Right Side */}
        <div style={{ flex: '60%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StarRating rating={reviewAverage} />
            <span> &ensp; Read all {reviewCount} Reviews&nbsp;</span>
            <a href="javascript:void(0)">here</a>
          </div>

          <h3>{productInfo.category}</h3>
          <h2>{productInfo.name}</h2>
          <Price currentStyle={currentStyle} />

          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontWeight: 'bold', float: 'left' }}>{'Styles >'} &ensp;</p>
            <p style={{ float: 'left' }}>{currentStyle.name}</p>
          </div>

          <StylesList
            styles={stylesInfo}
            changeStyle={setCurrentStyle}
            currentStyleID={currentStyle.style_id}
          />

          <CartSelector
            productId={props.productId}
            currentStyleID={currentStyle.style_id}
            currentStyle={currentStyle}
          />

        </div>
      </div>
    </div>
  );
}

export default Overview;
