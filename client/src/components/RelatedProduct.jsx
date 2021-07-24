import React, { useState, useEffect } from 'react';
import RelatedProductItem from './RelatedProductItem.jsx';
import $ from 'jquery';

const RelatedProduct = (props) => {
  const [realatedProducts, setRealatedProducts] = useState([]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/${props.productId}/related/`,
      success: (products) => {
        setRealatedProducts(products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }, []);

  return (
    <div>
      {realatedProducts.map(product =>
        <RelatedProductItem product={product}/>
      )}
    </div>
  );
}

export default RelatedProduct;