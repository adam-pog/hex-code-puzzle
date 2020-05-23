import React from 'react';
import './Hex.css';

function Hex(props) {
  return (
    <td
      className={"Hex " + props.hexClass}
      onClick={() => props.onClick && props.onClick(props.row, props.col)}
    >
      <p className={props.textClass}>{props.value || '\u2022'}</p>
    </td>
  );
}

export default Hex;
