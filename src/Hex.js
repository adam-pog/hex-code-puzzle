import React from 'react';
import './Hex.css';
import config from './config'

function Hex(props) {
  return (
    <td
      className={"Hex " + props.hexClass}
      onClick={() => props.onClick && props.onClick(props.row, props.col)}
    >
      <p className={props.textClass}>{props.value || config.selectedChar}</p>
    </td>
  );
}

export default Hex;
