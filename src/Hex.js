import React from 'react';
import './Hex.css';

function Hex(props) {
  return (
    <ul
      className="Hex"
      onClick={() => props.onClick(props.row, props.col)}
    >
      {props.value}
    </ul>
  );
}

export default Hex;
