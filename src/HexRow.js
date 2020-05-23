import React from 'react';
import './HexRow.css';
import Hex from './Hex'

function HexRow(props) {
  return (
    <div className="HexRow">
      {
        props.hexValues.map((hexValue, i) => (
          <Hex
            value={hexValue}
            key={i}
            onClick={props.onClick}
            row={props.row}
            col={i}
          >
          </Hex>
        ))
      }
    </div>
  )
}

export default HexRow;
