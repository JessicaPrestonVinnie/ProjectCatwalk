import React from 'react';

const ProductComparison = (props) => {
  // console.log(props);
  const features = {};
  props.currentProduct.features.forEach(f => {
    if (!features[f.feature]) {
      features[f.feature] = {}
    }
    features[f.feature].current = f.value;
  })
  props.comparedProduct.features.forEach(f => {
    if (!features[f.feature]) {
      features[f.feature] = {}
    }
    features[f.feature].compared = f.value;
  })
  console.log(features);
  console.log(Object.entries(features).map(([key, value]) => key + value));
  return (
      // <div>{props.product.default_price}</div>
      <table striped bordered hover>
      <thead>
        <tr>
          <th>{props.currentProduct.name}</th>
          <th>Characteristic</th>
          <th>{props.comparedProduct.name}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(features).map(([key, value]) => <tr><td>{value.current}</td><td>{key}</td><td>{value.compared}</td></tr>)}
      </tbody>
    </table>
  );
}

export default ProductComparison;