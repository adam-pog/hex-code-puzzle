import React from 'react';
import './HexRow.css';
import Hex from './Hex'

function HexRow(props) {
  return (
    <div className="HexRow">
      {
        props.row.map((hexValue, i) => (
          <Hex
            value={hexValue}
            key={i}
            onClick={props.onClick}
            index={i}
          >
          </Hex>
        ))
      }
    </div>
  )
}

export default HexRow;
