import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const styles = {
  paddingTop: '1.25em',
  paddingLeft: '1.25em',
  width: '75%',
};


function Size(props) {
  const [sizeOptions, setSizeOptions] = useState([{ value: 'Loading', label: 'Loading' }]);

  useEffect(() => {
    const newSizeOptions = [];
    props.sizes.forEach((size) => {
      newSizeOptions.push({ value: size, label: size });
    });
    setSizeOptions(newSizeOptions);
  }, [props.sizes]);

  const onInputChange = (options, { action }) => {
    if (action === 'menu-close') {
      props.setIsMenuOpen(false);
    }
  };

  const onChange = (selectedOption) => {
    props.setCurrentSize(selectedOption.value);
    props.selectRef.blur();
  };

  if (props.sizes[1] === undefined || props.sizes[1] === null) {
    return (
      <div>
        <div style={{fontSize: '90%'}} >
          <p>{props.sizeMessage}</p>
        </div>
        <div style={styles}>
          <Select

            ref={(r) => {
              props.setSelectRef(r);
            }}
            id="sizeSelect"
            options={sizeOptions}
            onClick={props.openMenu}
            onFocus={props.openMenu}
            onInputChange={onInputChange}
            onChange={onChange}
            menuIsOpen={props.isMenuOpen}
          />
        </div>

      </div>
    );
  }

  return (
    <div>
        <div style={{fontSize: '90%'}} >
          <div>{props.sizeMessage}</div>
        </div>
      <div style={styles}>
        <Select
          ref={(r) => {
            props.setSelectRef(r);
          }}
          id="sizeSelect"
          options={sizeOptions}
          onFocus={props.openMenu}
          onInputChange={onInputChange}
          onChange={onChange}
          menuIsOpen={props.isMenuOpen}
        />
      </div>
    </div>
  );
}

export default Size;
