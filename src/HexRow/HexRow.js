import React from 'react';
import './HexRow.css';
import Hex from './Hex/Hex'
import config from '../config'

function bottomHexClass(props, column) {
  if(props.highlightCol === column && props.row === config.rows - 1) {
    return 'bottomHex '
  } else {
    return ''
  }
}

function topHexClass(props, column) {
  if(props.highlightCol === column && props.row === 0) {
    return 'topHex '
  } else {
    return ''
  }
}

function HexRow(props) {
  const highlightRow = props.highlightRow === props.row

  return (
    <tr className={'HexRow ' + (highlightRow ? 'hexRowHighlight ' : '')}>
      {
        props.hexValues.map((hexValue, column) => {
          const highlightCol = props.highlightCol === column;
          const highlightColClass = highlightCol ? 'hexHighlight ' : '';
          let hoverable = false

          if(hexValue !== config.selectedChar && (highlightRow || highlightCol)) {
            hoverable = true
          }

          return <Hex
            value={hexValue}
            key={column}
            onClick={hoverable && props.onClick}
            row={props.row}
            col={column}
            textClass={(hexValue === null ?  'greyText ' : '')}
            hexClass={
              ((hoverable && 'hoverable ') || '') +
                highlightColClass +
                topHexClass(props, column) +
                bottomHexClass(props, column)
            }
          >
          </Hex>
        })
      }
    </tr>
  )
}

export default HexRow;
