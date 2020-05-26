import React from 'react';
import './Subroutines.css';

function Subroutines(props) {
  // state = this.initialState()
  //
  // initialState() {
  //   return {
      // subroutines: this.generateSubroutines(this.props.board),
      // subroutinesProgress: [[], [], [], []],
  //   }
  // }
  //
  // generateSubroutines(board) {
  //   return Array(4).fill().map(() => {
  //     let subroutineLength = Math.ceil(Math.random() * 3) + 1
  //
  //     return Array(subroutineLength).fill().map(() => (
  //       board[this.randomIndex()][this.randomIndex()]
  //     ))
  //   })
  // }
  //
  // randomIndex() {
  //   return Math.floor(Math.random() * config.rows)
  // }

  return (
    <div className={"Subroutines " + props.className}>
      <h4 className='subroutineHeader'>Subroutines</h4>
      <div className='subroutinesContainer'>
        {
          props.subroutines.map((subroutine, subroutineIndex) => (
            <div key={subroutineIndex} className='subroutine'>
              <div className='subroutineValues'>
                {
                  subroutine.map((value, valueIndex) => {
                    let className = props.subroutinesProgress[subroutineIndex][valueIndex] === value
                      ? 'subroutineObjectiveHighlight'
                      : ''

                    return(
                      <div className={"subroutineTextContainer " + className} key={valueIndex}>
                        <p key={valueIndex}>{value}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Subroutines;
