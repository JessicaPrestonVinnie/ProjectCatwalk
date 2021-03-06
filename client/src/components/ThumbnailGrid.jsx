import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import Thumbnail from './Thumbnail.jsx';

const Parent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Child = styled.div`
  margin: 5px;
  margin-bottom: 20px;
  width: 80px;
  height: 80px;
`;

const styles = {
  height: '100%',
  width: '100%',
  position: 'relative',
};

const gridStyle = {
  paddingTop: '45px',
};

// window for which ones are displayed
// default window to be 0-4

function ThumbnailGrid(props) {
  let numThumbs = 999;
  if (props.thumbnails !== undefined && typeof props.thumbnails !== 'string') {
    numThumbs = props.thumbnails.length;
  }

  if (numThumbs < 6) {
    return (
      <div>
        <Parent>
          {props.thumbnails.map((element, index) => (
            <Child>
              <Thumbnail
                imgSrc={element.thumbnail_url}
                imageIdx={index}
                currentImageIdx={props.currentImageIdx}
                setCurrentImageIdx={props.setCurrentImageIdx}
              />
            </Child>
          ))}
        </Parent>
      </div>
    );
  }

  const [windowStart, setWindowStart] = useState('windowStart');
  const [windowEnd, setWindowEnd] = useState('windowEnd');

  const handlePressUp = () => {
    const newStart = windowStart - 1;
    const newEnd = windowEnd - 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
  };

  const handlePressDown = () => {
    const newStart = windowStart + 1;
    const newEnd = windowEnd + 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
  };

  useEffect(() => {
    setWindowStart(0);
    setWindowEnd(4);
  }, []);

  useEffect(() => {
    setWindowStart(0);
    setWindowEnd(4);
  }, [props.productId]);

  useEffect(() => {
    if (props.currentImageIdx < windowStart) {
      setWindowStart(windowStart - 1);
      setWindowEnd(windowEnd - 1);
    }

    if (props.currentImageIdx > windowEnd) {
      setWindowStart(windowStart + 1);
      setWindowEnd(windowEnd + 1);
    }
  }, [props.currentImageIdx]);

  const needUpArrow = windowStart > 0;
  const needDownArrow = windowEnd < numThumbs - 1;

  if (typeof windowStart !== 'string' && typeof windowEnd !== 'string') {
    return (
      <div style={gridStyle}>
        <Parent>
          {/* Do first thumbnail determine if it needs an arrow */}
          {needUpArrow
            ? (
              <div style={styles}>
                <span>
                  <Child>
                    <Thumbnail
                      imgSrc={props.thumbnails[windowStart].thumbnail_url}
                      imageIdx={windowStart}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>

                  <div style={{ position: 'absolute', left: '1.35em', bottom: '5.25em' }}>
                    <svg width="35px" height="19px" style={{ border: '3px solid #17a1b3' }}>
                      <rect fill="#231c44" id="box" x="0" y="0" width="35" height="35" />
                    </svg>
                  </div>
                  <FaAngleUp
                    onClick={handlePressUp}
                    size={35}
                    style={{
                      fill: '#e72169', position: 'absolute', left: '1.5em', bottom: '5.25em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Thumbnail
                    imgSrc={props.thumbnails[windowStart].thumbnail_url}
                    imageIdx={windowStart}
                    currentImageIdx={props.currentImageIdx}
                    setCurrentImageIdx={props.setCurrentImageIdx}
                  />
                </Child>
              </div>
            )}

          {/* Do next three thumbnails */}
          {props.thumbnails.slice(windowStart + 1, windowStart + 4).map((element, index) => (
            <Child>
              <Thumbnail
                imgSrc={element.thumbnail_url}
                imageIdx={index + windowStart + 1}
                currentImageIdx={props.currentImageIdx}
                setCurrentImageIdx={props.setCurrentImageIdx}
              />
            </Child>
          ))}

          {/* Do last thumbnail determine if it needs an arrow */}
          {needDownArrow
            ? (
              <div style={styles}>
                <span>
                  <Child>
                    <Thumbnail
                      imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                      imageIdx={windowEnd}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>


                  <div style={{ position: 'absolute', left: '1.35em', bottom: '-1.5em' }}>
                    <svg width="35px" height="19px" style={{ border: '3px solid #17a1b3' }}>
                      <rect fill="#231c44" id="box" x="0" y="0" width="35" height="35" />
                    </svg>
                  </div>
                  <FaAngleDown
                    onClick={handlePressDown}
                    size={35}
                    style={{
                      fill: '#e72169', position: 'absolute', left: '1.5em', bottom: '-1.5em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Thumbnail
                    imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                    imageIdx={windowEnd}
                    currentImageIdx={props.currentImageIdx}
                    setCurrentImageIdx={props.setCurrentImageIdx}
                  />
                </Child>
              </div>
            )}

        </Parent>
      </div>
    );
  }

  return (
    <div>
      <h5>Loading</h5>
    </div>
  );
}

export default ThumbnailGrid;
