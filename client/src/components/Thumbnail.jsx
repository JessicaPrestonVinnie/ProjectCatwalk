/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const styles = {
  height: '100%',
  width: '100%',

  background: '#333',
  position: 'relative',
};

function Thumbnail(props) {
  return (
    <div style={styles}>
      <img
        src={props.imgSrc}
        style={{
          width: '100%',
          height: '100%',
        }}
        alt="no_img"
      />
    </div>
  );
}

export default Thumbnail;