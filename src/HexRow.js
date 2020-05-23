import React from 'react';
import './HexRow.css';
import Hex from './Hex'

function HexRow(props) {
  const highlightRowClass = props.highlightRow === props.row ? 'highlight' : ''

  return (
    <tr className={'HexRow ' + highlightRowClass}>
      {
        props.hexValues.map((hexValue, i) => {
          const highlightColClass = props.highlightCol === i ? 'highlight' : ''
          let hoverable = false;

          if (
            hexValue != null &&
            (props.highlightRow === props.row ||
            props.highlightCol === i)
          ) {
            hoverable = true
          }

          return <Hex
            value={hexValue}
            key={i}
            onClick={hoverable && props.onClick}
            row={props.row}
            col={i}
            textClass={(hexValue === null ?  'greyText ' : '')}
            hexClass={(hoverable ? 'hoverable ' : '') + highlightColClass}
          >
          </Hex>
        })
      }
    </tr>
  )
}

export default HexRow;
