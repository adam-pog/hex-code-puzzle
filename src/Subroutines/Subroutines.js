import React from 'react';
import './Subroutines.css';

function Subroutines(props) {
  return (
    <div className={"Subroutines " + props.className}>
      <h4 className='subroutineHeader'>Subroutines</h4>
      <div className='subroutinesContainer'>
        {
          props.subroutines.map((subroutine, subroutineIndex) => {
            const terminate = props.terminate &&
              props.subroutinesProgress[subroutineIndex].length !== subroutine.length

            const terminateClass = terminate ? 'subroutineTerminate ' : ''
            const animateClass = props.terminate ? 'subroutineNoAnimation' : ''

            return (
              <div
                key={subroutineIndex}
                className={
                  'subroutine ' + terminateClass  +animateClass
                }
              >
                <div className='subroutineValues'>
                  {
                    subroutine.map((value, valueIndex) => {
                      const highlight = props.subroutinesProgress[subroutineIndex][valueIndex] === value
                        ? 'subroutineObjectiveHighlight'
                        : ''

                      return(
                        <div
                          className={"subroutineTextContainer " + highlight}
                          key={valueIndex}
                        >
                          <p key={valueIndex}>{value}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Subroutines;
