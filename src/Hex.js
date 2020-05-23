import React from 'react';
import './Hex.css';

function Hex(props) {
  return (
    <ul
      className={"Hex " + props.className}
      onClick={() => props.onClick(props.row, props.col)}
      disabled={'disabled'}
    >
      {props.value}
    </ul>
  );
}

export default Hex;
