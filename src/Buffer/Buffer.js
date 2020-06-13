import React from 'react';
import './Buffer.css';

function Buffer(props) {
  return (
    <div className="Buffer">
      {
        Array(props.bufferLength).fill().map((_,i) => {
            return(
              <div className={"bufferText onBoot-buffer " +  props.className}key={i}>
                {
                  props.buffer.length === i &&
                    <p key={i} className='blink'>{'|'}</p>
                }
                {
                  props.buffer.length !== i &&
                    <p key={i}>{props.buffer[i]}</p>
                }
              </div>
            )
        })
      }
    </div>
  );
}

export default Buffer;
