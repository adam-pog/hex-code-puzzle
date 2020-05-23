import React from 'react';
import './Hex.css';

function Hex(props) {
  return (
    <ul
      className="Hex"
      onClick={() => props.onClick(props.index)}
    >
      {props.value}
    </ul>
  );
}

export default Hex;
